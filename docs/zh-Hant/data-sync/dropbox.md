# Dropbox 同步

受支援的桌面版與行動版組建可直接使用 Dropbox 同步。

此功能採用具備 **App Folder** 存取權限的 Dropbox OAuth，因此如水只會讀寫：

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/*`

---

## 可用環境

- **桌面版（官方組建）：**支援
- **行動版（官方組建）：**支援
- **Expo Go：**不支援 Dropbox OAuth
- **FOSS 組建：**可能停用 Dropbox 同步
- **Docker/PWA 網頁組建：**不支援；請改用原生桌面／行動版、自行託管同步或 WebDAV

若組建已停用 Dropbox，或你使用 Docker 提供的 PWA，請改用[資料與同步](/zh-Hant/data-sync/)中的檔案同步、[雲端部署](/zh-Hant/data-sync/cloud-deployment)中的自行託管方式，或 WebDAV。

---

## 使用者設定（官方組建）

1. 開啟**設定 → 同步**。
2. 在**同步後端**選擇器中選擇 **Dropbox**；如水會將所選路徑顯示為**雲端同步**。
3. 按一下／點選**連接 Dropbox**，並在瀏覽器中完成 OAuth。
4. 回到如水，使用**測試連線**。
5. 執行**同步**。

第一次同步後，確認 Dropbox 中有以下應用程式資料夾內容：

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/`

---

## 自行建置設定

若自行建置如水，必須在建置時提供 Dropbox app key。

### 1. 建立 Dropbox App

在 Dropbox App Console 中設定：

- App type: **Scoped access**
- Access type: **App folder**
- Scopes: `files.content.read`, `files.content.write`, `files.metadata.read`
- 啟用 public client / PKCE flow

### 2. 加入重新導向 URI

- Mobile: `mindwtr://redirect`
- Desktop: `http://127.0.0.1:53682/oauth/dropbox/callback`

### 3. 建置時注入 app key

- Desktop: `VITE_DROPBOX_APP_KEY=<your_app_key>`
- Mobile: `DROPBOX_APP_KEY=<your_app_key>`

macOS App Store 組建的桌面 OAuth 回呼會使用 `127.0.0.1:53682` 上的本機 loopback listener，因此應用程式 entitlement 必須包含 `com.apple.security.network.server`。

請在 CI／發行工作流程中設定儲存庫變數或密鑰：

- `VITE_DROPBOX_APP_KEY`
- `DROPBOX_APP_KEY`

---

## 疑難排解

### `Invalid redirect_uri`

確認如水顯示的 URI 與 Dropbox app 設定完全相同。

### HTTP 401 / token invalid

Token 已過期／撤銷，或由不同的 app key 簽發。請重新連接 Dropbox。

### 設定中沒有 Dropbox 選項

組建可能已停用 Dropbox（FOSS 組建常見），或缺少建置階段 app key。

### 顯示已連接，但同步未執行

先使用**測試連線**。若成功，再執行**同步**並查看[診斷與日誌](/zh-Hant/data-sync/diagnostics-logs)。

---

## 安全性與隱私權

- 如水只要求 App Folder 存取權，不會要求整個 Dropbox 帳號的存取權。
- OAuth token 儲存在裝置本機。
- 如水開發者不會代理 Dropbox 要求，也不會收到你的 Dropbox token。

另請參閱：

- [資料與同步](/zh-Hant/data-sync/)
- [隱私權政策](https://mindwtr.app/privacy)
