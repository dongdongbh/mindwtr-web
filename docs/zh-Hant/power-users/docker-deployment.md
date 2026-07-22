# Docker 部署

Mindwtr 正式支援使用 Docker 執行：
- **mindwtr-app**：由 Nginx 提供服務的桌面網頁版／PWA 組建。
- **mindwtr-cloud**：輕量同步伺服器及任務自動化 REST API。

兩者都提供 Docker image，並可使用 Docker Compose 輕鬆編排。

---

## 快速開始（Docker Compose）

您不需要 clone 儲存庫。官方映像已發佈到 GHCR，`compose.yaml` 會自動為您拉取。

1. **下載 compose 檔案**：
   ```bash
   curl -LO https://raw.githubusercontent.com/dongdongbh/Mindwtr/main/docker/compose.yaml
   ```

2. **在旁邊建立 `.env` 檔案**（Docker Compose 會自動讀取）：
   ```dotenv
   MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
   MINDWTR_CLOUD_CORS_ORIGIN=http://localhost:5173
   ```

3. **拉取並啟動服務**：
   ```bash
   docker compose pull
   docker compose up -d
   ```

4. **存取服務**：
   - **PWA（網頁版）：**在瀏覽器中開啟 `http://localhost:5173`。
   - **Cloud 健康狀態檢查：**開啟 `http://localhost:8787/health`。
   - **供本機測試的自行託管 URL：**`http://localhost:8787`
   - **REST API Base URL：**`http://localhost:8787/v1`

若您想從原始碼組建映像，請 clone 儲存庫並在其根目錄執行 `docker compose -f docker/compose.yaml up --build -d`。請參閱下方的[手動組建](#手動組建)。

此預設 compose 檔案只使用 HTTP，適合本機／私人測試。Mindwtr 桌面版及行動版用戶端只會對已辨識為本機／私人目標的位址接受 HTTP，例如 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、loopback／private IPv6 位址、`*.local` 及 `*.home.arpa`。

公用 URL、自訂 DNS 名稱、VPN hostname、Tailscale、ZeroTier，或任何未辨識為本機／私人的名稱，都請使用 HTTPS，或在應用程式的同步設定中開啟**允許不安全連接（HTTP）**，以透過明文 HTTP 接受該主機名稱。開啟後資料會以未加密方式傳輸，請只在信任的網路上使用。

---

## 使用 Caddy 設定 HTTPS

若要供公用桌面版或行動版同步使用，請使用 Caddy 支援的 compose 檔案：

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

檢查伺服器：

```bash
curl https://mindwtr.example.com/health
```

在 Mindwtr 的設定 -> 同步 -> 自行託管中，將自行託管 URL 設為：

```text
https://mindwtr.example.com
```

Mindwtr 會自動附加 `/v1/data`。

### 公用 HTTPS

當 `MINDWTR_CLOUD_DOMAIN` 是指向此 Docker 主機的公用 DNS 名稱時，請使用 `Caddyfile.https`。Port 80 及 443 必須能夠存取，才能自動簽發憑證。Caddy 會取得並續期憑證，再將要求反向代理至 `mindwtr-cloud`。

### 僅限 LAN 的 HTTPS

若 hostname 只在家用網路內解析，請使用 `Caddyfile.local-https`：

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

這會使用 Caddy 的內部憑證授權單位。每台用戶端裝置都必須信任 Caddy 的本機根憑證，Mindwtr 才會接受 HTTPS 連線。對行動版用戶端而言，公用 Let's Encrypt 憑證通常更可靠。

僅限 LAN 的 stack 啟動後，請匯出 Caddy 的本機根憑證：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

在會同步至此 hostname 的每台裝置上，將該憑證安裝為受信任的根憑證。

---

## 組態

### 同步 Token
雲端伺服器需要 token 進行驗證。你必須在環境變數中設定。

在 `docker/compose.yaml` 中（或透過環境變數）設定：

```yaml
MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
```

為維持向後相容，目前仍接受 `MINDWTR_CLOUD_TOKEN`，但已棄用。

若使用 Docker secrets，可掛載檔案並改為指向該檔案：

```yaml
MINDWTR_CLOUD_AUTH_TOKENS_FILE: /run/secrets/mindwtr_cloud_tokens
```

**產生 Token：**
可使用以下命令產生高強度隨機 token：
```bash
cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 50 | head -n 1
```

### 用戶端組態
若要將 Mindwtr 用戶端（桌面版或行動版）連接至這個自行託管雲端：

1. 前往**設定 → 同步**。
2. 選擇**自行託管**（或 Cloud）。
3. 將**自行託管 URL** 設為伺服器的 base endpoint：
   ```
   http://localhost:8787
   ```
   *Mindwtr 會自動將 `/v1/data` 附加至此 URL。*
4. 輸入在 `MINDWTR_CLOUD_AUTH_TOKENS` 中設定的**相同 token**。

若是私人 LAN HTTP，請使用 `http://192.168.1.20:8787` 等本機／私人位址。公用 URL 請使用上述 Caddy HTTPS 設定。

### Dropbox 同步與 Docker PWA

Docker `mindwtr-app` image 提供瀏覽器／PWA 組建。此 runtime 無法使用原生 Dropbox OAuth 同步，因為 Dropbox 連線是由原生桌面版及行動版應用程式實作。透過 `.env`、`env_file`、compose runtime environment 或 Docker build argument 加入 `VITE_DROPBOX_APP_KEY` 或 `DROPBOX_APP_KEY`，都不會在 Docker 中啟用 Dropbox。

Docker 託管的同步請使用隨附的自行託管雲端伺服器或 WebDAV。若自行託管端點位於 Authelia 或其他互動式 SSO proxy 後方，請設定 proxy，讓 Mindwtr 的同步／API 路徑直接使用 Mindwtr 的 bearer token；行動版無法在 `/v1/data` 前方完成 Authelia 瀏覽器登入。

### 任務自動化 API

同一個 `mindwtr-cloud` 容器也會公開供任務自動化使用的 REST API。它採用與同步相同的 base URL 及 bearer token。

常用端點：

- `GET /v1/data` 及 `PUT /v1/data`：同步
- `GET /v1/tasks` 及 `POST /v1/tasks`：列出及建立任務
- `GET /v1/projects`：專案
- `GET /v1/search?query=...`：搜尋任務及專案

範例：

```bash
curl -X POST http://localhost:8787/v1/tasks \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"input":"Review PR @work /due:tomorrow"}'
```

### CORS Origin（正式環境）

雲端伺服器的 CORS 預設為 `http://localhost:5173`。正式環境請設定：

```yaml
MINDWTR_CLOUD_CORS_ORIGIN=https://your-app-domain.example
```

---

## 資料持久化

為了在容器重新啟動時妥善保護雲端資料，請為資料目錄掛載 volume。

在你的 `compose.yaml` 中：

```yaml
volumes:
  - ./data:/app/cloud_data
```

---

## 手動組建

若不使用 Compose，而想自行組建 image：

**組建 PWA：**
```bash
docker build -f docker/app/Dockerfile -t mindwtr-app .
```

**組建 Cloud Server：**
```bash
docker build -f docker/cloud/Dockerfile -t mindwtr-cloud .
```

---

## GitHub Actions 與 GHCR

專案包含 GitHub Actions workflow，會自動組建 image 並推送至 GitHub Container Registry（GHCR）。

**官方 Image：**
- `ghcr.io/dongdongbh/mindwtr-app:latest`
- `ghcr.io/dongdongbh/mindwtr-cloud:latest`

預發行組建可使用浮動的 `beta` tag；它永遠指向最新發行版本（release candidate 或 stable）。也可使用特定版本，例如 `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`。`latest` 永遠維持在 stable。其他平台請參閱[加入測試版管道](/zh-Hant/start/beta-channels)。

`docker/compose.yaml` 檔案預設已設定使用這些 image，因此無須在本機組建，也能輕鬆拉取最新版本。

---

## 技術注意事項

- **PWA 服務：**網頁版使用用戶端渲染。Nginx 容器已設定 `try_files`，將所有要求重新導向至 `index.html`，避免重新整理頁面時出現 404 錯誤。
- **Base Image：**組建使用 Bun（固定為 v1.3），並包含 `better-sqlite3` 所需的 C++20 flags。
