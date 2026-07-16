# 網頁版（PWA）

Mindwtr 桌面版可透過 Vite 組建，在瀏覽器中作為網頁應用程式執行。在瀏覽器（非 Tauri）中執行時，它使用 `localStorage` 保存資料，並註冊 service worker 以支援離線／PWA 功能。

---

## 在本機執行

你可以使用 Bun 或 **Docker** 在本機執行 PWA。

### 使用 Docker（建議）
請參閱 [Docker 部署](/zh-Hant/power-users/docker-deployment)，瞭解如何執行 PWA 容器。

### 使用 Bun
從儲存庫根目錄執行：

```bash
bun install
bun desktop:web
```

這會在 `http://localhost:5173/` 啟動 Vite。

---

## 組建以供託管

```bash
bun desktop:web:build
```

組建輸出位於 `apps/desktop/dist/`，可作為靜態網站託管。

---

## PWA 行為

- 在瀏覽器中執行時，應用程式會註冊 `apps/desktop/public/sw.js`
- `sw.js` 會預先快取 `/`、`/index.html`、`/manifest.webmanifest`、`/icon.png` 與 `/logo.png`，並隨選快取其他同源 GET 要求
- 離線時，導覽要求會退回 `/index.html`（因此深層連結仍可載入）

---

## 託管要求

請將 `apps/desktop/dist/` 託管於網站根路徑（`/`）。Service worker 從 `/sw.js` 註冊，manifest 也參照根路徑。

請確認靜態託管服務以下列類型提供檔案：
- `manifest.webmanifest`：`application/manifest+json`（建議）
- `sw.js`：`application/javascript`

若需託管於子路徑（例如 `/mindwtr/`），必須調整 service worker 註冊及 manifest 路徑，使其符合 base path。

---

## 限制

- 瀏覽器組建將資料儲存在 `localStorage`（清除網站資料也會清除 Mindwtr 資料）
- 瀏覽器中可能無法使用部分桌面版專用功能，例如需要原生檔案存取權的檔案附件
- 不支援原生系統匣或全域快速鍵

---

## 另請參閱

- [開發人員指南](/zh-Hant/developers/developer-guide)
- [資料與同步](/zh-Hant/data-sync/)
