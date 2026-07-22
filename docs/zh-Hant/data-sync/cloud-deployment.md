# 雲端部署

本頁說明如何在類似正式環境的自行託管環境中，可靠地執行 `apps/cloud` 伺服器。

## 範圍

- Mindwtr Cloud 是輕量的自行託管後端，提供 JSON 同步與 token 驗證的任務自動化端點，不是完整的託管應用程式介面。
- 最適合單一租戶或小型的受信任部署。
- 應置於 HTTPS 反向 Proxy 後方，並採用標準伺服器強化控制。

用戶端相容性注意事項：

- Mindwtr Cloud 用戶端要求公開 URL 使用 **HTTPS**。
- 只有 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、loopback/private IPv6 位址、`*.local` 與 `*.home.arpa` 等本機／私人目標接受 HTTP。
- 自訂 DNS、VPN、Tailscale、ZeroTier 或其他未辨識為本機／私人的名稱，請在反向 Proxy 層加入 TLS，或在應用程式的同步設定中開啟**允許不安全連接（HTTP）**，以透過明文 HTTP 接受該主機名稱。此開關預設為關閉，開啟後資料會以未加密方式傳輸，請只在信任的網路上使用。

## 部署拓撲

建議配置：

1. 反向 Proxy（`nginx`、`caddy`、`traefik`）終止 TLS。
2. 雲端伺服器容器／程序在私人介面上監聽。
3. 持久化 volume 儲存 `MINDWTR_CLOUD_DATA_DIR`。
4. 定期備份資料目錄快照。

同一項雲端服務會處理：

- `/v1/data` 下的同步流量
- `/v1/tasks`、`/v1/projects`、`/v1/areas`、`/v1/sections` 與 `/v1/search` 等任務自動化端點

`PUT /v1/data` 採用合併，不會盲目取代。伺服器會讀取目前命名空間快照，使用 Mindwtr 的一般修訂版本感知同步規則與上傳的快照合併、驗證合併資料，再寫回。用戶端上傳較舊或不完整的檢視時，不應預期只靠傳送完整 JSON 承載資料就能抹除較新的遠端記錄。

REST 參考欄位必須指向使用中記錄。例如，建立或修補專案時若 `areaId` 指向已軟刪除的領域，會回傳 `404 Area not found`，而不會將專案連結至刪除標記。請使用 `areaId: null` 清除專案領域；空字串會遭拒絕。

各端點的要求與回應詳情，請參閱[雲端 API](/zh-Hant/developers/cloud-api)。

## 環境基準

最低正式環境基準：

- 將 `MINDWTR_CLOUD_AUTH_TOKENS` 設為一個或多個高強度 token。
- 將 `MINDWTR_CLOUD_CORS_ORIGIN` 設為確切的用戶端 origin。
- 將 `MINDWTR_CLOUD_DATA_DIR` 掛載至持久化儲存空間。
- 依使用情況調整 `MINDWTR_CLOUD_MAX_BODY_BYTES` 與 `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES`。

選用但實用：

- `MINDWTR_CLOUD_RATE_WINDOW_MS`
- `MINDWTR_CLOUD_RATE_MAX`
- `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX`

## 環境變數

### 驗證

| 變數 | 用途 | 注意事項 |
| --- | --- | --- |
| `MINDWTR_CLOUD_AUTH_TOKENS` | 以逗號分隔的 bearer token 允許清單。每個 token 必須由 20-512 個英文字母、數字或 `. _ ~ + / = -` 字元組成，否則伺服器會拒絕啟動。 | 正式環境建議設定。 |
| `MINDWTR_CLOUD_AUTH_TOKENS_FILE` | 含有 bearer token 的檔案路徑。 | 適合 Docker secrets；檔案內容可採用與 `MINDWTR_CLOUD_AUTH_TOKENS` 相同的格式。 |
| `MINDWTR_CLOUD_TOKEN` | 舊版單一 token 別名。 | 為了向後相容仍支援，但已棄用。 |
| `MINDWTR_CLOUD_TOKEN_FILE` | 含有舊版單一 token 的檔案路徑。 | 為了向後相容仍支援，但已棄用。 |
| `MINDWTR_CLOUD_ALLOW_ANY_TOKEN` | 允許任何語法有效的 bearer token。 | 只能明確選用。除受控環境外，最好避免使用。 |
| `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` | 啟用任意 token 模式時，可建立的不同命名空間數量上限。 | 預設為 `32`；只應在受控自動化環境設定。 |

### 網路與儲存空間

| 變數 | 用途 | 預設值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_CORS_ORIGIN` | CORS 允許的瀏覽器 origin。 | 非正式環境中為 `http://localhost:5173` |
| `MINDWTR_CLOUD_DATA_DIR` | JSON 命名空間、附件與鎖定的目錄。 | `./data` |
| `MINDWTR_CLOUD_TRUST_PROXY_HEADERS` | 在驗證失敗的速率限制中信任 `X-Forwarded-For`／Proxy IP 標頭。 | `false` |
| `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` | 信任 Proxy 標頭時使用，以逗號分隔的 Proxy IP 允許清單。 | 空白；除非直接 peer 受信任，否則忽略轉送 IP。 |

### 要求限制

| 變數 | 用途 | 預設值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_MAX_BODY_BYTES` | JSON 要求大小上限。 | `2000000` |
| `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` | 附件上傳大小上限。 | `50000000` |
| `MINDWTR_CLOUD_REQUEST_TIMEOUT_MS` | 雲端處理器的每項要求逾時時間。 | `30000` |
| `MINDWTR_CLOUD_MAX_TASK_TITLE_LENGTH` | 雲端任務端點接受的任務標題長度上限。 | `500` |
| `MINDWTR_CLOUD_MAX_TASK_QUICK_ADD_LENGTH` | 透過雲端建立任務時接受的快速新增輸入長度上限。 | `2000` |
| `MINDWTR_CLOUD_MAX_ITEMS_PER_COLLECTION` | 每個上傳集合的任務／專案／分區／領域數量上限。 | `50000` |

### 分頁與清單形狀

| 變數 | 用途 | 預設值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_LIST_DEFAULT_LIMIT` | 清單端點的預設頁面大小。 | `200` |
| `MINDWTR_CLOUD_LIST_MAX_LIMIT` | 清單端點頁面大小的硬性上限。 | `1000` |

### 速率限制

| 變數 | 用途 | 預設值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_RATE_WINDOW_MS` | 主要速率限制時間範圍長度。 | `60000` |
| `MINDWTR_CLOUD_RATE_MAX` | 每個時間範圍內非附件要求的數量上限。 | `120` |
| `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX` | 每個時間範圍內附件要求的數量上限。 | 與 `MINDWTR_CLOUD_RATE_MAX` 相同 |
| `MINDWTR_CLOUD_RATE_CLEANUP_MS` | 清除過期記憶體內速率限制項目的間隔。 | `60000` |
| `MINDWTR_CLOUD_RATE_MAX_KEYS` | 採用類 LRU 淘汰前，保留的不同記憶體內速率限制鍵數量上限。 | `10000` |
| `MINDWTR_CLOUD_AUTH_FAILURE_RATE_MAX` | 節流前，每個用戶端 IP／時間範圍的未授權嘗試次數上限。 | `30` |

操作建議：

- 讓 Proxy 承載資料限制與 `MINDWTR_CLOUD_MAX_BODY_BYTES` 及 `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` 保持一致。
- 除非伺服器只能透過反向 Proxy 存取，否則請保持 `MINDWTR_CLOUD_TRUST_PROXY_HEADERS=false`。若啟用，請將 `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` 設為允許提供轉送用戶端 IP 的 Proxy 位址。
- 若從 `MINDWTR_CLOUD_TOKEN` 輪替至 `MINDWTR_CLOUD_AUTH_TOKENS`，請記得變更 token 也會變更命名空間鍵。
- 公開部署請避免設定 `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true`。雖然它受 `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` 限制，但正式環境模型仍應使用固定 token 允許清單。

## Docker 操作手冊

支援的 Compose 入口點請先參閱 [Docker 部署](/zh-Hant/power-users/docker-deployment)。本節是同一個雲端容器在類似正式環境中運作的操作檢查清單。

本機只使用 HTTP 的基本測試，請使用 `docker/compose.yaml`。

公開的桌面版或行動版用戶端 URL，請使用 HTTPS stack：

```bash
cp docker/.env.https.example docker/.env.https.local
```

編輯 `docker/.env.https.local`：

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.example.com
MINDWTR_CLOUD_AUTH_TOKENS=your_long_random_token
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.example.com
MINDWTR_CADDYFILE=Caddyfile.https
```

啟動 stack：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

將 Mindwtr 的「自行託管 URL」設為基礎 URL，例如 `https://mindwtr.example.com`。Mindwtr 會自動附加 `/v1/data`。

對於採用 Caddy 內部 CA 的區域網路專用主機名稱，請使用 `Caddyfile.local-https`：

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

每部裝置都必須信任 Caddy 的本機根憑證，用戶端才會接受此憑證。對行動用戶端而言，公開憑證通常較簡單。

區域網路專用 stack 啟動後，匯出本機根憑證：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

在每部將同步至此主機名稱的裝置上，將該憑證安裝為受信任的根憑證。

最小雲端服務配置：

```yaml
services:
  mindwtr-cloud:
    build:
      context: .
      dockerfile: docker/cloud/Dockerfile
    environment:
      MINDWTR_CLOUD_DATA_DIR: /data
      MINDWTR_CLOUD_AUTH_TOKENS: ${MINDWTR_CLOUD_AUTH_TOKENS}
      MINDWTR_CLOUD_CORS_ORIGIN: https://mindwtr.example.com
      MINDWTR_CLOUD_RATE_MAX: "120"
      MINDWTR_CLOUD_ATTACHMENT_RATE_MAX: "120"
    volumes:
      - ./mindwtr-cloud-data:/data
    restart: unless-stopped
```

操作注意事項：

- 儲存庫 Dockerfile 使用多階段 runtime 映像，並以 digest 固定 Bun 基礎映像，讓重複建置具有一致性。
- 將 `/data` 掛載至耐久磁碟，而非暫時性的容器檔案系統。
- 將 token 存在 secrets manager 或 git 之外的 `.env`。
- 若使用 Docker secrets，請用 `MINDWTR_CLOUD_AUTH_TOKENS_FILE`，不要直接在 Compose 中內嵌 token。
- 同一個已部署容器會在相同主機／連接埠上同時提供同步與 REST API 流量。

## 反向 Proxy 檢查清單

在 Proxy 層：

- 強制使用 HTTPS。
- 將要求承載資料大小限制為與雲端限制一致。
- 原樣轉送 `Authorization` 標頭。
- 將要求逾時設得足以處理大型附件上傳。
- 可行時依 IP／VPN 限制存取。

Caddyfile 範例：

```caddyfile
mindwtr.example.com {
  reverse_proxy mindwtr-cloud:8787
}
```

區域網路專用內部憑證：

```caddyfile
mindwtr.home.arpa {
  tls internal
  reverse_proxy mindwtr-cloud:8787
}
```

nginx 片段範例：

```nginx
client_max_body_size 50m;
proxy_read_timeout 120s;
proxy_send_timeout 120s;
proxy_set_header Authorization $http_authorization;
```

## 備份與還原

資料格式是每個 token 一個 JSON 檔案，另加附件檔案。

備份：

1. 建立 `MINDWTR_CLOUD_DATA_DIR` 的快照或封存。
2. 保留時間點備份（每日 + 每週保留）。
3. 定期驗證還原。

還原：

1. 停止伺服器。
2. 將目錄內容還原至 `MINDWTR_CLOUD_DATA_DIR`。
3. 啟動伺服器。
4. 檢查 `GET /health` 並執行用戶端同步驗證。

## 附件清理

使用者刪除附件後，用戶端會保留一筆 `pendingRemoteDeletes` 記錄，直到後端刪除成功。這些待刪除記錄刻意不會隨時間到期，因為遠端刪除成功前若先移除記錄，可能遺留私人檔案。

Mindwtr Cloud 也提供經驗證的孤立檔案清理功能，清除目前 `data.json` 快照不再參照的附件檔案：

```text
POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

若要在伺服器端清理正常用戶端刪除流程之外變得無法存取的檔案，可在還原後執行，或作為定期維護工作。端點只會掃描已驗證 token 的命名空間，並回傳掃描、保留、刪除及失敗檔案路徑的數量。

清理會略過過去五分鐘內修改的附件檔案，以免先上傳、稍後才由 `/v1/data` 參照的檔案遭到同時進行的維護程序刪除。

## 升級程序

安全的漸進程序：

1. 建立備份。
2. 先將新版本部署至 staging 或 canary。
3. 執行基本檢查：
   - `GET /health`
   - 經驗證的 `GET /v1/data`
   - 經驗證的 `GET /v1/tasks`
   - 經驗證的 `GET /v1/projects`、`GET /v1/areas` 與 `GET /v1/sections`
   - 小型及大型附件上傳／下載
4. 部署至正式環境。
5. 監控日誌中的 `rate limit`、`invalid payload` 與 `permission denied` 錯誤。

## Token 輪替

建議輪替流程：

1. 將新 token 與舊 token 一同加入 `MINDWTR_CLOUD_AUTH_TOKENS`。
2. 將用戶端更新為新 token。
3. 遷移期間結束後移除舊 token。

由於 token 雜湊會對應命名空間／檔案，變更 token 也會變更儲存命名空間。如果新 token 必須延續資料，請刻意遷移相應的資料檔案／附件目錄。

## 可觀測性

雲端伺服器會將結構化 JSON 日誌寫入 stdout/stderr。

最低日誌警示：

- 重複出現 `Unauthorized`
- 經常出現 `Rate limit exceeded`
- `Cloud data directory is not writable`
- `Invalid remote sync payload`

加入主機／容器指標：

- CPU 與記憶體
- 資料 volume 的可用磁碟空間
- p95 要求延遲
- 非 2xx 回應率

時鐘注意事項：

- 伺服器會參與 `PUT /v1/data` 的合併與修復，因此主機時鐘偏差仍可能影響要求日誌與速率限制時間範圍。請保持啟用 NTP 或同等時間同步。
- 合併修復時間戳記使用伺服器實際時鐘，避免快了幾分鐘的用戶端時鐘污染伺服器產生的修復中繼資料。

## 失敗模式

- 權限錯誤：volume 擁有者／權限不符。
- CORS 失敗：`MINDWTR_CLOUD_CORS_ORIGIN` 不正確。
- Token 不符：用戶端 token 不在允許清單中。
- 大型承載資料失敗：超出 Proxy 或應用程式層的承載資料限制。

## 相關頁面

- [雲端 API](/zh-Hant/developers/cloud-api)
- [資料與同步](/zh-Hant/data-sync/)
- [Docker 部署](/zh-Hant/power-users/docker-deployment)
