# 自行託管 Mindwtr Cloud

Mindwtr Cloud 是為需要如水專用伺服器，而不採用服務供應商同步的使用者所設計的自行託管同步選項。如水的自行託管雲端後端是位於 `apps/cloud` 的小型同步伺服器；它為桌面版與行動版用戶端提供同步端點，並不是如水的應用程式介面。

## 適用時機

符合以下情況時，可使用自行託管雲端：

- 需要專屬的如水同步端點
- 能自行部署及更新小型伺服器
- 想掌控託管帳號、資料位置與存取控制

若只需要檔案式同步，[WebDAV](/zh-Hant/data-sync/webdav) 可能更簡單。

## 主要參考文件

- 選擇同步後端及設定用戶端，請參閱[資料與同步](/zh-Hant/data-sync/)。
- 伺服器設定、維運及環境變數，請參閱[雲端部署](/zh-Hant/data-sync/cloud-deployment)。
- `/v1` 端點詳情請參閱[雲端 API](/zh-Hant/developers/cloud-api)。
- 若要採用 Docker 部署路徑，請參閱 [Docker 部署](/zh-Hant/power-users/docker-deployment)。

## 快速認識

- 自行託管雲端後端會為每個 bearer token 儲存一個 JSON 命名空間。
- 用戶端指向 `/v1` 基礎 URL，並透過 `GET /v1/data` 與 `PUT /v1/data` 同步。
- `/v1/data` 是標準同步合約；任務、專案、領域、分區、搜尋及附件路由則是選用的便利 API。
- 附件 API 位於 `/v1/attachments/...`。
- 請在 HTTPS 後方部署，並把 bearer token 視同密碼保護。
- 公開 URL 必須使用 HTTPS。只有 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、loopback/private IPv6 位址、`*.local` 與 `*.home.arpa` 等本機或私有目標可使用 HTTP。

## 部署組成

一般部署包含：

- Mindwtr Cloud 伺服器
- 持久化資料庫或儲存後端
- 位於伺服器前方的 HTTPS
- 在每個如水用戶端中設定的伺服器 URL
- 由你為自己的部署建立的 token 或憑證

## 設定檢查清單

1. 從主要裝置匯出備份。
2. 依如水儲存庫中的最新說明部署伺服器。
3. 確認伺服器健康狀態端點可透過 HTTPS 回應。
4. 使用伺服器 URL 與憑證設定如水。
5. 執行手動同步，並確認第二部裝置顯示相同資料。

::: warning 不要將部署密鑰提交至 git
伺服器 token、資料庫 URL 與服務供應商憑證應存放在託管平台或本機密鑰管理工具中，請勿提交至儲存庫。
:::
