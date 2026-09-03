# 雲端 API

Mindwtr Cloud 提供一套精簡的 bearer token API，用於同步、任務自動化與附件傳輸。它是為自行託管部署而設計，並使用與自行託管雲端後端相同的 token 命名空間。

![存取 Mindwtr 資料的兩條通道：AI 助理呼叫 MCP 伺服器，由它執行共用的 core 套件；應用程式則帶著 bearer token 存取自行託管的雲端伺服器，雲端伺服器提供同步文件、記錄端點、附件和行事曆訂閱。只有健康檢查不需要 token。](/assets/diagrams/api-surface.svg)

[開啟互動式圖表](/assets/diagrams/api-surface.html)

## 驗證身分

每個 `/v1/*` 請求都要傳送 bearer token：

```http
Authorization: Bearer <token>
```

正式環境請使用 `MINDWTR_CLOUD_AUTH_TOKENS` 或 `MINDWTR_CLOUD_AUTH_TOKENS_FILE`。`MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` 僅適用於受控的自動化流程，並透過 `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` 限制新命名空間數量。

## 健康狀態

```text
GET /health
```

無需驗證身分即可回傳伺服器健康狀態。

## 快照同步

```text
GET /v1/data
PUT /v1/data
```

`GET /v1/data` 回傳已驗證命名空間的快照。若命名空間不存在且允許寫入，伺服器會建立空白快照。

`PUT /v1/data` 會驗證上傳的 `AppData`，以核心同步演算法和現有命名空間合併、驗證合併結果，再將結果寫回。這不是強制覆寫。成功的回應會回傳 `{ ok: true, stats, clockSkewWarning }`，其中 `stats` 的合併統計資料結構與本機同步診斷所用者相同。

## 任務

```text
GET /v1/tasks
POST /v1/tasks
GET /v1/tasks/:id
PATCH /v1/tasks/:id
DELETE /v1/tasks/:id
POST /v1/tasks/:id/complete
POST /v1/tasks/:id/archive
```

清單查詢參數：

| 參數 | 用途 |
| --- | --- |
| `query` | 對任務標題與中繼資料進行不區分大小寫的文字搜尋。 |
| `status` | 一種任務狀態：`inbox`、`next`、`waiting`、`someday`、`reference`、`done` 或 `archived`。 |
| `all=1` | 納入已完成任務。 |
| `deleted=1` | 納入軟刪除任務。 |
| `isFocusedToday` | `true`/`1` 僅回傳標記為今日專注的任務；`false`/`0` 僅回傳其餘任務。省略則不篩選。 |
| `limit`, `offset` | 頁面大小與起始位移。 |

建立時可接受 `title` 或快速新增的 `input`，以及選用的 `props`。修補操作接受雲端驗證層支援的任務欄位，並提高同步修訂版中繼資料。

## 專案、領域與區段

```text
GET /v1/projects
POST /v1/projects
GET /v1/projects/:id
PATCH /v1/projects/:id
DELETE /v1/projects/:id

GET /v1/areas
POST /v1/areas
GET /v1/areas/:id
PATCH /v1/areas/:id
DELETE /v1/areas/:id

GET /v1/sections
POST /v1/sections
GET /v1/sections/:id
PATCH /v1/sections/:id
DELETE /v1/sections/:id
```

所有清單端點都接受 `limit`、`offset` 與 `deleted=1`。區段也接受 `projectId`。

參照欄位必須指向有效記錄。專案的 `areaId` 必須參照有效領域。使用 `areaId: null` 清除專案領域；`areaId: ""` 無效。區段的 `projectId` 必須參照有效專案。

刪除領域、專案與區段時會使用墓碑，並由伺服器端修復，以維持快照可用於同步。

## 搜尋

```text
GET /v1/search?query=<text>
```

搜尋會在個別陣列中回傳有效的任務與專案。它支援共用的 `limit` 與 `offset` 參數，以及個別游標：

| 參數 | 用途 |
| --- | --- |
| `taskLimit`, `taskOffset` | 對任務結果集分頁。 |
| `projectLimit`, `projectOffset` | 對專案結果集分頁。 |

回應包含 `taskTotal`、`projectTotal` 與實際採用的游標值。

## 附件

```text
GET /v1/attachments/:path
PUT /v1/attachments/:path
DELETE /v1/attachments/:path

POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

附件路徑會在已驗證 token 的命名空間內解析。上傳作業會強制執行設定的位元組限制與核心附件驗證規則。

孤立附件清理端點會掃描命名空間，尋找不再被 `data.json` 參照的檔案。它會略過最近五分鐘內修改的檔案，避免與後續快照寫入競爭的上傳遭到移除。

## 行事曆訂閱來源

```text
GET /v1/calendar/feed
POST /v1/calendar/feed
DELETE /v1/calendar/feed

GET /v1/calendar/:token.ics
```

前三個端點需要 bearer 權杖，分別用於讀取、輪換與撤銷該命名空間的訂閱權杖。它們回傳 `{ "feed": { "token", "path", "createdAt" } }`；若尚未發布則回傳 `{ "feed": null }`。對於從未同步過資料的命名空間，`POST` 回傳 `404`。

`GET /v1/calendar/:token.ics` 不需要 `Authorization` 標頭——網址中的權杖就是憑證——並回傳該命名空間的 `text/calendar` 內容。未知權杖回傳 `404`。

訂閱來源為每個已排程的任務（`startTime`）產生一個事件，為每個截止日期（`dueDate`）產生一個事件，與應用程式內行事曆檢視一致：已完成、已封存、參考資料、已刪除以及不在使用中專案的任務都會排除；同一天既已排程又到期的任務只出現一次。事件僅包含穩定的 `UID` 與任務標題，不含描述、清單、附件、標籤或專案資訊。

## MCP 配接器

已發布的 `mindwtr-mcp` 輔助工具可使用自行託管的雲端端點作為後端。請透過 `--cloud-url` 與 `--cloud-token`，或 `MINDWTR_MCP_CLOUD_URL`／`MINDWTR_MCP_CLOUD_TOKEN` 環境變數進行設定。

以雲端為後端的 MCP 模式會讀取 `/v1/data`，並提供任務、專案、區段、領域與人物的讀取工具。加上 `--write` 後，任務、專案、區段與領域的變更會經由上述各資源的 REST 端點；此模式預設維持唯讀，也不會將 Mindwtr Cloud 本身變成託管式 MCP 服務。

## 相關頁面

- [MCP 伺服器](/zh-Hant/power-users/mcp)
- [雲端部署](/zh-Hant/data-sync/cloud-deployment)
- [同步演算法](/zh-Hant/data-sync/sync-algorithm)
