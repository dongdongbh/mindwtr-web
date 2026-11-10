# 本機 API 伺服器

Mindwtr 內建選用的本機 REST API 伺服器，供指令碼及整合使用。在桌面版中，它於應用程式 binary 內執行，並採用與應用程式相同的本機儲存路徑。儲存庫也提供 Bun 輔助工具，供開發及進階指令碼使用。

---

## 桌面版開關

桌面版組建無須執行原始碼，即可啟動本機 REST API：

- 開啟**設定 -> 進階**。
- 啟用**本機 API 伺服器**。
- 保留預設 port `3456`，或選擇其他 localhost port。
- 從同一張設定卡複製產生的 bearer token。

應用程式只繫結至 `127.0.0.1`，每項要求都必須包含 `Authorization: Bearer <token>`。行動版 binary 不提供本機 REST API 介面。

### 開發輔助工具

若要在桌面版之外執行 API，或指定明確的檔案，仍可使用儲存庫輔助工具。

---

## 快速開始

從桌面版應用程式：

```text
Settings -> Advanced -> Enable local API server
```

預設 URL：

```text
http://127.0.0.1:3456
```

從儲存庫根目錄使用 Bun：

```bash
bun install
MINDWTR_API_TOKEN=replace-with-a-strong-token bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### 選項

| 選項            | 預設值           | 說明                       |
| --------------- | ---------------- | -------------------------- |
| `--port <n>`    | `4317`           | 伺服器 port                |
| `--host <host>` | `127.0.0.1`      | 繫結位址                   |
| `--data <path>` | 平台預設值       | 覆寫 data.json 位置        |
| `--db <path>`   | 平台預設值       | 覆寫 mindwtr.db 位置       |
| `--dangerously-disable-auth` | 關閉 | 完全不使用 token 執行——不安全，即使只監聽回送位址對瀏覽器也不安全 |

### 環境變數

| 變數                | 說明                                                   |
| ------------------- | ------------------------------------------------------ |
| `MINDWTR_DATA`      | 覆寫 data.json 位置（若省略 `--data`）                 |
| `MINDWTR_DB_PATH`   | 覆寫 mindwtr.db 位置（若省略 `--db`）                  |
| `MINDWTR_API_TOKEN` | **必要。** 輔助工具對每個請求都要求的 bearer token；未設定時將拒絕啟動，除非傳入 `--dangerously-disable-auth` |
| `MINDWTR_API_CORS_ORIGIN` | 選用。允許呼叫此 API 的單一精確 http(s) 來源；未設定時不會送出 CORS 標頭 |

API 預設會使用 Mindwtr 的平台路徑解析 `data.json` 與 `mindwtr.db`（Linux 上優先使用 XDG data）。

---

## 驗證

桌面版的本機 API 要求一律必須使用**設定 -> 進階**中顯示的 bearer token：

```
Authorization: Bearer <token>
```

Bun 輔助工具同樣要求 token：未設定 `MINDWTR_API_TOKEN` 時會立即結束，除非你明確傳入 `--dangerously-disable-auth`（僅供隔離環境的相容性測試）。

---

## 端點

| 方法     | 端點                  | 說明                         |
| -------- | --------------------- | ---------------------------- |
| `GET`    | `/health`             | 健康狀態檢查 → `{ ok: true }` |
| `GET`    | `/tasks`              | 列出任務                     |
| `GET`    | `/tasks?status=next`  | 依狀態篩選                   |
| `GET`    | `/tasks?query=@work`  | 搜尋任務                     |
| `GET`    | `/tasks?isFocusedToday=true` | 桌面版：篩選加星號任務，包括排隊的未來開始任務 |
| `GET`    | `/tasks?all=1`        | 包含已完成／已封存項目       |
| `GET`    | `/tasks?deleted=1`    | 包含已軟刪除項目             |
| `POST`   | `/tasks`              | 建立任務                     |
| `GET`    | `/tasks/:id`          | 取得單一任務                 |
| `PATCH`  | `/tasks/:id`          | 更新任務                     |
| `DELETE` | `/tasks/:id`          | 軟刪除任務                   |
| `POST`   | `/tasks/:id/complete` | 標記為已完成                 |
| `POST`   | `/tasks/:id/archive`  | 標記為已封存                 |
| `POST`   | `/tasks/:id/restore`  | 還原已軟刪除的任務           |
| `GET`    | `/projects`           | 列出專案                     |
| `POST` | `/projects` | 桌面版：建立專案 |
| `GET` | `/projects/:id` | 桌面版：取得單一專案 |
| `PATCH` | `/projects/:id` | 桌面版：更新專案 |
| `DELETE` | `/projects/:id` | 桌面版：軟刪除專案 |
| `POST` | `/projects/:id/restore` | 桌面版：還原專案 |
| `GET`    | `/areas`              | 列出領域                     |
| `GET` | `/areas/:id` | 桌面端：取得單一領域 |
| `PATCH` | `/areas/:id` | 桌面端：更新領域 |
| `GET`    | `/v1/areas`           | 領域的相容性別名             |
| `GET` | `/sections` | 列出分區，可加 `?projectId=`；下一個桌面版本起支援 |
| `GET` | `/people` | 桌面版：列出受管理的人員（下一個版本） |
| `POST`   | `/sections`           | 輔助工具：建立分區           |
| `GET`    | `/sections/:id`       | 輔助工具：取得單一分區       |
| `PATCH`  | `/sections/:id`       | 輔助工具：更新分區           |
| `DELETE` | `/sections/:id`       | 輔助工具：刪除分區           |
| `GET`    | `/search?query=...`   | 搜尋任務及專案               |

如果完成一個有開始日期、無截止日期的固定週期任務需要跳過已錯過的重複日期，桌面本機 API 會傳回 `409`（`recurrence_requires_app`）。任務保持不變，請在應用程式中完成它。如果下一次重複仍在目前日期或未來，只有開始日期的任務仍受支援。

標示**桌面版**的列只存在於桌面應用程式的本機 API。標示**輔助工具**的列只存在於 Bun 輔助工具，它同時也在 `/v1/` 前綴下回應這些請求（`/v1/sections`）。

桌面版本機 API 接受 `isFocusedToday=true`/`1` 與 `isFocusedToday=false`/`0`。`true` 或 `1` 會傳回加星號任務，包括排隊等待進入專注的未來開始任務；`false` 或 `0` 會傳回未標記的任務，包括沒有該欄位的舊記錄。省略此參數時，API 不會依此欄位篩選。其他值會傳回 `400`。

這裡的 `query` 是純文字比對：該值會轉為小寫，並以子字串方式比對任務的標題、描述、狀態、標籤、情境、專案與領域 ID 以及支援備註。它不是運算子語言。`status:`、`context:`、`tag:`、`due:<=7d`、引號片語與 `-否定` 屬於應用程式的搜尋框、CLI 的 `--query` 以及 MCP 伺服器的任務列表；在這裡送出時會以字面字元比對，通常不會傳回任何結果。

### 回應結構

**Task（部分）**
```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "inbox",
  "projectId": "uuid",
  "dueDate": "2026-01-25T12:00:00.000Z",
  "tags": ["#work"],
  "contexts": ["@email"],
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Project（部分）**
```json
{
  "id": "uuid",
  "title": "Project name",
  "status": "active",
  "color": "#94a3b8",
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Area**
```json
{
  "id": "uuid",
  "name": "Area name",
  "color": "#94a3b8",
  "icon": "briefcase",
  "order": 0,
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z"
}
```

### 建立任務的 Body

```json
{
  "input": "Call Alice",
  "title": "Alternative title",
  "props": {
    "status": "next",
    "contexts": ["@phone"],
    "tags": ["#errands"]
  }
}
```

桌面版有 `title` 時會使用它，否則使用 `input`，並套用明確的 `props`。Bun 輔助工具還會對 `input` 執行 `parseQuickAdd`。

### 桌面版安全任務寫入（v1.3.8） {#safe-writes}

桌面版內建 API 支援下述安全寫入控制。更新後的 Bun 輔助工具也支援任務清單版本、條件式 PATCH/complete/archive、可安全重試的建立以及未變更 PATCH 偵測。這些保證不延伸至 CLI 或 Cloud API。

**Bun 輔助工具。** 每個不透明版本標記都必須從接收寫入的同一伺服器和工作區取得；桌面版與輔助工具的標記不能互換。輔助工具採用此處相同的回應結構、受保護的 `/v1/tasks` 建立/PATCH 路由和 `/v2/tasks/:id/complete` 或 `/archive` 路由、衝突代碼，以及七天/10,000 筆有效回執限制。回執是獨立的本機 SQLite 記錄，不進入 JSON 鏡像或裝置同步。經過驗證的健康檢查增加 `implementation: "bun-helper"`、`apiVersion: 2` 和四項寫入/版本能力；不宣告 `conditionalTaskListGet` 或 `referenceLists`。舊伺服器可能僅傳回 `{ "ok": true }`，這不能證明支援上述能力。

**條件式更新。** 讀取單一任務會傳回 `{ "task": { ... }, "version": "sha256-..." }`，其中 `ETag` 回應標頭包含帶引號的版本值。建立與 PATCH 回應也會傳回版本。請將其視為不透明值；僅憑任務的數字 `rev` 不能用作驗證標記。

更新時，在 `If-Match` 中傳送你實際檢視過的版本：

```bash
curl -s -X PATCH "http://127.0.0.1:3456/v1/tasks/$TASK_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -H 'If-Match: "<version-from-read>"' \
  -d '{"description":"Revised description"}'
```

如果任務已發生變更，伺服器會傳回 `412` 與 `code: "task_version_conflict"`，且不會套用修補。請重新讀取任務並協調這些變更，然後再嘗試更新。省略 `If-Match` 會保留無條件寫入行為。此標頭支援以逗號分隔的實體標記清單；弱標記永遠無法滿足強比較。`If-Match: *` 只檢查任務是否存在，因此無法防止覆蓋對現有任務的編輯。

從下一個桌面版本開始，`GET /tasks` 還會傳回與任務清單同層級的 `versions` 對應表，以任務 ID 為索引鍵：`{ "tasks": [ ... ], "versions": { "task-id": "sha256-..." } }`。每個權杖與單獨讀取同一任務時的權杖一致，任務物件本身不變。準備編輯時，請使用你已查看的清單快照中的權杖。

**有條件地完成和封存。** 下一個桌面版本在 `POST /tasks/:id/complete` 和 `/archive` 上接受 `If-Match`。過期請求會傳回 `412` / `task_version_conflict`，不會修改任務或產生下一次重複任務。成功回應包含同層級的 `version` 和強 `ETag`。現有的重複規則限制仍然適用。

當桌面版本未知時，要確保此保護生效，請使用 `POST /v2/tasks/:id/complete` 或 `/v2/tasks/:id/archive`；這些路由要求提供有效的 `If-Match`。舊桌面版本會傳回 `404`。收到該回應後，絕不要退回無保護的操作。現有的 `/v1/tasks/:id/complete` 別名並不足夠：桌面版 1.3.8 接受該路由，但不檢查 `If-Match`。

**能力偵測。** 下一個桌面版本中，經過驗證的 `GET /health` 會傳回 `apiVersion: 2` 和 `capabilities: { "taskListVersions": true, "conditionalTaskPatch": true, "idempotentTaskCreate": true, "conditionalTaskActions": true, "conditionalTaskListGet": true, "referenceLists": true }`。這描述桌面 API 的介面約定，而不是應用程式的發佈版本。舊伺服器可能只傳回 `{ "ok": true }`；不要據此推斷寫入保護可用。

**可安全重試的建立。** 建立任務時提供 `Idempotency-Key`：

```bash
curl -s -X POST 'http://127.0.0.1:3456/v1/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: capture-2026-11-04-001' \
  -d '{"title":"Call Alice","props":{"status":"next"}}'
```

每次有意建立新任務時都使用一個新鍵。如果回應遺失，請使用相同的鍵與相同的 JSON 酬載重試。物件欄位順序不影響比對，但值或陣列順序的變更會影響比對。伺服器會傳回原始建立結果，而不會再建立一個任務。將同一個鍵用於不同酬載時，會傳回 `409` 與 `code: "idempotency_conflict"`。

鍵必須包含 1–128 個可見 ASCII 字元。回執在應用程式重新啟動後仍會保留，並依工作區與 API 憑證劃定範圍。輪替權杖或切換工作區會啟用不同的範圍。回執的有效期限為七天，每個工作區最多可有 10,000 筆未過期回執；達到此上限後，新的帶鍵建立請求會收到 `409` / `idempotency_capacity` 錯誤，而不是捨棄有效回執。過期後，重試可能建立新任務。這不是無限期的「恰好一次」保證。

回執在本機儲存原始建立回應。它們會在七天後過期；過期記錄會在後續成功的帶鍵建立交易中刪除。重播會傳回原始回應，即使任務此後已被編輯、刪除或徹底清除。它絕不會還原舊任務或覆蓋這些後續變更；請重新讀取任務以檢視其目前狀態。

一般 `/tasks` 路由也接受這些請求標頭。建立任務的 `/v1/tasks` 別名與 PATCH 更新的 `/v1/tasks/:id` 別名讓用戶端可以要求使用此較新的桌面版實作：較舊的桌面版本會傳回 `404`，而不會無聲地忽略標頭。收到此回應後，請勿退回為不受保護的寫入。

**未發生變更的更新。** 如果有效 PATCH 經正規化後的最終狀態未發生變更，則會成功傳回，而不會重寫任務或推進 `rev`、`revBy` 或 `updatedAt`。如果正規化確實修復或變更了欄位，仍會視為一次編輯。

**條件式任務清單（下一個桌面版本）。** `GET /tasks` 和 `/v1/tasks` 傳回以 `task-list-sha256-` 開頭的強 `ETag`，以及 `Cache-Control: private, no-cache`。對相同查詢，將帶引號的標記放入 `If-None-Match`。結果未變時傳回無回應本文的 `304`；否則傳回完整清單和新標記。支援弱標記、標記清單和 `*`。仍需驗證身分；無效標頭或篩選條件傳回 `400`。

標記涵蓋實際篩選條件和完整回應快照，包括任務版本。使用 `?all=1&deleted=1` 可包含仍保留的刪除標記。這減少傳輸量，但仍以 O(n) 讀取快照並計算雜湊；它不是增量變更串流或 REST 分頁。集合標記不能用作任務寫入版本。

**參照清單（下一個桌面版本）。** `GET /sections` 傳回 `{ "sections": [ ... ] }`，可按精確的 `projectId` 篩選；`GET /people` 傳回 `{ "people": [ ... ] }`。兩者預設排除已刪除記錄，傳入 `deleted=1` 可包含它們；支援 `/v1/` 別名，在停用寫入時仍可使用。記錄保留原有欄位，不按父專案狀態篩選。

這些讀取端點不包含重新開啟任務或擴充重複規則支援。

### 桌面版專案寫入

桌面應用程式內建 API 支援建立、取得、更新、軟刪除及還原專案。建立專案時必須提供 `title`；`areaId`、`color`、`status`、`isSequential` 和 `order` 為選填欄位。更新時可使用相同的可編輯欄位。建立、取得、更新和還原都以 `{ "project": { ... } }` 傳回已儲存的專案；刪除傳回 `{ "ok": true }`。

建立選項放在 `props` 中，例如 `{ "title": "Plan the move", "props": { "isSequential": true } }`；PATCH 欄位直接放在請求本文中。`sequentialScope` 支援 `project` 或 `section`，專案 `status` 支援 `active`、`someday`、`waiting` 或 `archived`。將 `areaId` 設為 `null` 可移除領域。專案封存和重新啟用遵循應用程式中對子任務和區段的處理規則。對 PATCH 而言，專案不存在時傳回 `404`，已刪除或已永久刪除時傳回 `409`。

`GET /projects/:id` 也會傳回仍儲存的軟刪除專案，讓指令碼可在還原前檢查。`DELETE /projects/:id` 會軟刪除專案及其使用中的區段，並解除使用中任務的專案關聯，而不會刪除任務或變更任務狀態。`POST /projects/:id/restore` 會還原專案，以及由同一次舊版串聯刪除的子項，但不會重新關聯目前刪除操作已解除關聯的任務。重複刪除或還原是安全的，不會改變目前狀態。對已永久刪除專案執行生命週期變更會傳回 `409`。

**建立循序專案:**

```bash
curl -s -X POST "http://127.0.0.1:3456/projects" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Plan the move","props":{"isSequential":true}}' | jq .
```

**將現有專案改為平行:**

```bash
curl -s -X PATCH "http://127.0.0.1:3456/projects/$PROJECT_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"isSequential":false}' | jq .
```

### 在桌面端編輯領域

`GET /areas/:id` 和 `PATCH /areas/:id` 回傳 `{ "area": { ... } }`。未知或已刪除的領域均回傳 `404`。這些端點屬於桌面應用內建 API，不屬於 Bun 輔助服務。

PATCH 接受僅包含 `name`、`color`、`icon` 和 `order` 的非空物件。`name` 必須是非空白字串，首尾空白會被移除。`color` 和 `icon` 接受字串，也可設為 `null` 以清除欄位。`order` 必須是有限數值，允許小數和負數。未知欄位、無效型別、空白名稱及空物件均回傳 `400`。

移除首尾空白並忽略大小寫後，若名稱與另一個未刪除領域相同，則回傳 `409`，不作任何變更。API 不會隱式合併領域。重新命名和顏色變更會保留應用對關聯專案中繼資料的處理行為，並一併儲存。清除領域顏色也會將關聯專案重設為預設顏色（`#94a3b8`）。設定 `order` 只更新此領域的數值排序位置，並非批次重排操作。不包含領域建立和刪除。

```bash
curl -s -X PATCH "http://127.0.0.1:3456/areas/$AREA_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Work","color":"#94a3b8","order":2}' | jq .
```

### 桌面版任務分類

使用含有 `status` 的 `PATCH /tasks/:id`，可將進行中的任務在 `inbox`、`next`、`waiting`、`someday` 和 `reference` 之間移動。完成、封存和還原仍使用對應的 `/complete`、`/archive` 和 `/restore` 操作。PATCH 不接受終止狀態。

PATCH 無法重新開啟已完成或已封存的任務（傳回 `409`）；請先在應用程式中重新開啟。已刪除任務需先透過 `/restore` 還原，再進行分類。已永久刪除的任務無法分類。

將已封存專案中的任務改為 `inbox`、`next`、`waiting` 或 `someday` 會傳回 `409`。請先透過 `PATCH /projects/:id` 和 `{"status":"active"}` 重新啟用專案，或在同一次任務 PATCH 中將任務移出該專案。

**將收件匣任務移至下一步行動:**

```bash
curl -s -X PATCH "http://127.0.0.1:3456/tasks/$TASK_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"status":"next"}' | jq .
```

---

## 範例

**列出下一步行動：**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**使用明確的 props 建立：**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**完成任務：**

```bash
curl -s -X POST "http://127.0.0.1:3456/tasks/$TASK_ID/complete" \
  -H 'Authorization: Bearer <token>' | jq .
```

---

## CLI 工具

也提供較簡單的命令列介面：

```bash
# Add a task
bun mindwtr:cli -- add "Call mom @phone #family"

# List active tasks
bun mindwtr:cli -- list

# List with filters
bun mindwtr:cli -- list --status next --query "due:<=7d"

# Read or update a task
bun mindwtr:cli -- get <taskId>
bun mindwtr:cli -- update <taskId> '{"status":"next"}'

# Complete a task
bun mindwtr:cli -- complete <taskId>

# Archive, delete, or restore
bun mindwtr:cli -- archive <taskId>
bun mindwtr:cli -- delete <taskId>
bun mindwtr:cli -- restore <taskId>

# Search
bun mindwtr:cli -- search "@work"

# List projects
bun mindwtr:cli -- projects
```

### CLI 參考

| 命令         | 範例                                         | 說明                                  |
| ------------ | -------------------------------------------- | ------------------------------------- |
| `add`        | `mindwtr:cli -- add "Call mom @phone"`       | 使用快速新增解析                      |
| `list`       | `mindwtr:cli -- list --status next`          | 支援 `--all`、`--deleted`、`--query`  |
| `get`        | `mindwtr:cli -- get <taskId>`                | 輸出完整任務 JSON                     |
| `update`     | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | 套用 JSON patch              |
| `search`     | `mindwtr:cli -- search "@work due:<=7d"`     | 搜尋任務／專案                        |
| `complete`   | `mindwtr:cli -- complete <taskId>`           | 將任務標記為已完成                    |
| `archive`    | `mindwtr:cli -- archive <taskId>`            | 將任務標記為已封存                    |
| `delete`     | `mindwtr:cli -- delete <taskId>`             | 軟刪除任務                            |
| `restore`    | `mindwtr:cli -- restore <taskId>`            | 還原已刪除的任務                      |
| `projects`   | `mindwtr:cli -- projects`                    | 列出使用中的專案                      |

---

## 安全性注意事項

- 伺服器僅供在 `127.0.0.1`（localhost）上執行。除非瞭解相關風險，否則不要公開。
- 桌面版 API 存取需要「設定」中產生的 bearer token。請將該 token 保密。
- 若需要遠端存取 Bun 輔助工具，請設定 `MINDWTR_API_TOKEN`，並將伺服器置於經過驗證的 reverse proxy 後方。

---

## 另請參閱

- [開發人員指南](/zh-Hant/developers/developer-guide)
- [Cloud API](/zh-Hant/developers/cloud-api)
