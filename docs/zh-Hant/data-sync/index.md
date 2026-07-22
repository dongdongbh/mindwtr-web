# 資料與同步

Mindwtr 將資料儲存在本機，並支援多種裝置間同步方式。

Mindwtr**不會**營運託管式雲端服務。同步採用在地優先並由使用者設定：由你決定如何在裝置間移動 `data.json` 檔案（以及 `attachments/`）。設定下列其中一種方式前，不會傳送任何內容；完成設定後，系統會自行持續運作。

目前桌面版與行動版將設定分成兩頁：
- **設定 → 同步**：後端設定、同步選項、歷史與復原快照
- **設定 → 資料**：備份／還原／匯入、附件清理與診斷

本頁是文件網站中面向使用者的設定與復原指南。維護者層級的合併規則與診斷欄位，請參閱[同步演算法](/zh-Hant/data-sync/sync-algorithm)。

若要在桌面版匯入 vault 並使用筆記 deep link，請參閱 [Obsidian 整合](/zh-Hant/power-users/obsidian)。

---

## 資料儲存

### 桌面版

資料儲存在本機 SQLite 資料庫中，另有一份 JSON 同步／備份檔案：

| 平台        | 資料庫（SQLite）                                  | JSON（同步／備份）                                     |
| ----------- | ------------------------------------------------- | ------------------------------------------------------ |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`               | `~/.local/share/mindwtr/data.json`                     |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                    | `%APPDATA%/mindwtr/data.json`                          |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json`      |

設定另外儲存於：

| 平台        | 位置                                           |
| ----------- | ---------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`                |
| **Windows** | `%APPDATA%/mindwtr/config.toml`                |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

> 舊版 Tauri 組建在 Linux 上使用 `~/.config/tech.dongdongbh.mindwtr/` 與 `~/.local/share/tech.dongdongbh.mindwtr/`。偵測到這些位置時會自動遷移。

### 行動版

資料儲存在本機 SQLite 資料庫中，另有一份 JSON 同步／備份檔案：

- **SQLite DB**：`mindwtr.db`
- **JSON 備份**：`data.json`

---

## 同步後端

Mindwtr 直接支援五種同步後端：

- **原生 iCloud / CloudKit 同步**：僅限 Apple，在可用時同步核心資料與附件 asset
- **檔案同步**：使用者選取的資料夾／檔案（`data.json` + `attachments/`）
- **Dropbox OAuth 同步**：在支援的組建中直接同步 Dropbox App Folder
- **WebDAV**：任何相容的 WebDAV 端點
- **Mindwtr Cloud（自行託管）**：你自己的 `apps/cloud` 端點

### 快速比較

| 後端 | 平台 | 設定難度 | 相對速度 | 衝突處理 | 最適合 |
| --- | --- | --- | --- | --- | --- |
| **檔案同步**（資料夾） | 全部 | 低，選擇資料夾 | 最快（一般檔案系統） | 檔案層級；資料夾供應商只看見一個檔案 | Syncthing、現有雲端硬碟用戶端、區域網路 |
| **WebDAV** | 全部 | 中等，伺服器 URL + 憑證 | 較慢，每項要求都需 HTTP 往返 | 由應用程式控制，逐項合併 | Nextcloud/ownCloud/Fastmail、遠端 BYOS |
| **Mindwtr Cloud（自行託管）** | 全部 | 較高，部署 `apps/cloud` + token | 快速，單一端點，伺服器寫入時合併 | 應用程式 + 伺服器端合併 | 多部裝置同時編輯 |
| **Dropbox** | 支援的組建 | 低，OAuth 登入 | 中等，供應商 API | 由應用程式控制，逐項合併 | 不自行架設伺服器時最簡單的雲端選項 |
| **iCloud / CloudKit** | Apple 組建 | 低，在設定中切換 | 快速，逐筆記錄同步 | CloudKit 逐筆記錄合併 | 僅使用 Apple 裝置 |

速度差異對大型附件影響最大；WebDAV 與 Dropbox 會逐一上傳／下載附件。實際同步內容請參閱[資料生命週期](/zh-Hant/data-sync/data-lifecycle)。

### 資料控制權

| 模式 | 副本會離開裝置嗎？ | 由你控制 | 遠端副本 |
| --- | --- | --- | --- |
| **關閉同步** | 否 | 裝置及其備份 | 無 |
| **檔案同步** | 僅當其他工具複製所選資料夾時 | 資料夾，以及同步該資料夾的供應商或裝置 | 資料夾中的 `data.json` 和附件檔案 |
| **Dropbox** | 是 | 已連接的 Dropbox 帳戶 | 應用程式資料夾中的 `/Apps/Mindwtr/data.json` 和附件 |
| **iCloud / CloudKit** | 是 | Apple ID 和 iCloud 帳戶 | CloudKit 記錄和附件資產 |
| **WebDAV** | 是 | 端點、帳戶和憑證 | 該 WebDAV 伺服器上的 `data.json` 和附件 |
| **Mindwtr Cloud（自行託管）** | 是 | 部署、儲存空間和存取權杖 | 該伺服器上的同步資料和附件 |

本機 SQLite 資料庫始終是資料來源。檔案式同步使用可讀的 JSON，並以檔案形式儲存附件，因此應把所選資料夾、供應商帳戶或伺服器視為可信任儲存空間。Mindwtr 不營運託管同步服務。Dropbox 直連要求不會經過 Mindwtr 開發者，Dropbox 權杖也只保存在你的裝置上。

在**設定 → 同步**中，支援的組建會以單一後端選擇器顯示這些選項，再說明所選的設定方式：

- **雲端同步**：Apple 平台上的 **Dropbox** 與 **iCloud**
- **資料夾／檔案同步**：**檔案**
- **進階／自訂伺服器**：**WebDAV** 與**自行託管**

現有 Dropbox 設定會繼續運作；現在只會在**雲端同步**說明下，以頂層 **Dropbox** 後端顯示，而不再巢狀放在自行託管／雲端供應商選擇器中。

### 直接與間接供應商支援

- **直接支援的供應商／協定**：支援的 Apple 組建上的原生 iCloud / CloudKit、WebDAV 伺服器、Mindwtr 自行託管端點，以及 Dropbox OAuth（支援的組建）。
- **間接支援的供應商**：透過檔案同步使用 iCloud Drive、Google Drive、OneDrive、Syncthing、網路分享與 Dropbox。
- **重要：**原生 iCloud 同步**僅限 Apple**。Android、Windows 與 Linux 應改用檔案同步、WebDAV、Mindwtr Cloud 或 Dropbox。

**快速建議：**
- **Dropbox**：支援的組建中最簡單的跨平台雲端選項；透過 OAuth 連接後，Mindwtr 會使用其 Dropbox App Folder。
- **Syncthing**：裝置對裝置的檔案同步。同一區域網路／子網路上效果最佳。若需遠端同步，請使用 Syncthing relay 或 mesh VPN（Nebula/Tailscale）。
- **WebDAV**：使用支援 WebDAV 的供應商（例如 Nextcloud、ownCloud、Fastmail、自行託管）。
- **iCloud**：在支援的 Apple 組建上使用原生 iCloud 同步（包括附件 asset），或透過檔案同步使用 iCloud Drive。
- **Google Drive/OneDrive**：使用檔案同步（Android 必要時搭配橋接應用程式）。

## 同步建議

- **最簡單即用的雲端同步：**支援組建中的 Dropbox OAuth。
- **最佳純 Apple 設定：**支援 Apple 組建中的原生 iCloud / CloudKit。
- **最佳 BYOS 遠端同步：**WebDAV 或 Mindwtr Cloud（自行託管）。應用程式控制同步週期並逐項合併。
- **檔案同步（Syncthing/Dropbox 等）：**可以運作，但因 `data.json` 是單一檔案，**衝突發生在檔案層級**。
- **檔案同步最佳做法：**避免同時在兩部裝置編輯；開啟另一部裝置上的應用程式前，請等待同步完成。若發生衝突，保留最新的 `data.json`，並刪除 `data.json.sync-conflict-*` 副本。

### 桌面版 Proxy

桌面版可選用 HTTP(S) Proxy，處理 WebDAV、Dropbox、自行託管 Cloud 同步與外部行事曆訂閱等網路要求。

請在**設定 → 進階 → 網路 → Proxy URL**中設定。使用 `http://proxy-host:port` 或 `https://proxy-host:port` 等完整 URL。留空時採用預設網路行為，包括任何受支援的 `HTTP_PROXY` / `HTTPS_PROXY` 環境變數。

應用程式內欄位刻意保持精簡：它只接受一個 Proxy URL，不是完整的 Proxy 管理器。此處無法設定 SOCKS、PAC 檔案或個別後端 Proxy 規則。此設定不會跨裝置同步。

## 衝突復原

Mindwtr 通常會自動解決項目衝突。若刪除的任務在同步後回來，最常見原因是另一部裝置在刪除與使用中的模糊時間範圍內同時編輯。修訂版本號相同且操作時間相差不超過 30 秒時，Mindwtr 會保留使用中編輯，以免默默丟棄工作。

處理方式：
1. 開啟**設定 → 同步**，查看最新同步狀態／歷史是否有衝突。
2. 如果回來的任務仍不需要，請等所有裝置完成同步後再次刪除。
3. 如果兩部裝置仍有分歧，請逐一在每部裝置上手動同步，再保留所需版本，並再次刪除／還原。
4. 若需復原較舊資料，請先使用**設定 → 資料**或**設定 → 同步 → 復原快照**，再繼續編輯。

### 1. 原生 iCloud / CloudKit 同步（僅限 Apple）

Mindwtr 在支援的 Apple 組建中包含原生 **iCloud** 後端。

- **指南**：[iCloud 同步](/zh-Hant/data-sync/icloud)
- **最適合**：只使用 Apple 裝置，並希望設定比管理共用資料夾簡單
- **不適合**：同一同步設定中包含 Android、Windows 或 Linux 裝置

此後端可在 iPhone、iPad 與 macOS 使用。如果偏好 macOS 上的資料夾式設定，仍可改用 **iCloud Drive + 檔案同步**。

### 2. 檔案同步

透過共用 JSON 檔案，搭配任何資料夾式同步服務：

- Dropbox
- Google Drive
- Syncthing
- OneDrive
- iCloud Drive
- 任何網路資料夾

#### 將 iCloud Drive 作為檔案同步（macOS + iOS）

如果想透過共用資料夾同步，而不是使用原生 CloudKit 後端，iCloud Drive 也能搭配 Mindwtr 的**檔案同步**。

建議設定：
1. 在 macOS 建立 `iCloud Drive/Mindwtr` 等資料夾。
2. 在 Mindwtr 桌面版中設定**同步後端 = 檔案**，並選取該資料夾。
3. 匯出一次，以建立 `data.json` 與 `attachments/`。
4. 等待 iCloud Drive 完成上傳。
5. 在 iOS 版 Mindwtr 的**設定 → 同步 → 選擇資料夾**中，從「檔案」選取同一個 iCloud Drive 資料夾。
   - 若 iOS 資料夾選擇器中的供應商呈灰色，請選取目標資料夾內任一 JSON 檔案。Mindwtr 仍會使用該資料夾中的 `data.json` 與 `attachments/`。

重要：
- 同步 `data.json` **以及** `attachments/`。附件是同步資料的一部分。
- 不要只移動 `data.json` 而不移動 `attachments/`，否則附件中繼資料／檔案可能產生分歧。
- 若 iCloud「最佳化儲存空間」已卸載檔案，執行手動同步前，請先讓「檔案」重新下載。

#### iOS 上 Google Drive、OneDrive 與其他「檔案」供應商的檔案書籤

在 iOS 上，若 Google Drive、OneDrive 與類似供應商會在「檔案」選擇器中公開檔案，就能透過**檔案同步**使用。若無法選擇資料夾，請選取目標資料夾內現有的 JSON 檔案；Mindwtr 會儲存 security-scoped bookmark，供日後讀寫。

這種檔案範圍的供應商模式只同步 `data.json`。並非所有「檔案」供應商書籤都能存取附件資料夾，因此附件需要可靠同步時，請使用原生 iCloud/CloudKit、Dropbox、WebDAV 或自行託管 Cloud。若 iOS 回報書籤存取權已過期，請在**設定 → 同步**中重新選取同步檔案。

#### Syncthing 注意事項（建議設定）

Syncthing 很適合搭配 Mindwtr，但初始設定順序很重要。
裝置必須能互相連線：最好位於相同子網路／區域網路；若需遠端同步，則透過 relay／mesh VPN（例如 Nebula 或 Tailscale）。

**建議流程：**
1. 建立單一 Syncthing 資料夾（例如 `Mindwtr/`），並讓它完成同步。
2. 在桌面版選用**檔案**後端，並於**設定 → 同步**中選擇該資料夾。
3. 將**匯出備份**儲存至該資料夾，以建立 `data.json` 與 `attachments/`。
4. 等待 Syncthing 完成同步至手機。
5. 在行動版的**設定 → 同步**中選取同一資料夾。

**為什麼會看到 `attachments (1)` / `attachments (2)`**
兩部裝置同時建立或修改同一資料夾時，Syncthing 會建立重複資料夾。如果兩部裝置都在初始同步完成前開啟 Mindwtr，經常會發生此情況。

**修正重複項目的方式：**
1. 選出「真正」的 `attachments/` 資料夾（通常是檔案較多的那個）。
2. 將 `attachments (1)`／`attachments (2)` 中的檔案移至 `attachments/`。
3. 刪除重複資料夾，讓 Syncthing 收斂。

**重要：**不要直接同步 `~/.local/share/mindwtr`。行動版儲存空間受沙盒限制。請改用檔案同步資料夾 + `data.json`。
如果已同步應用程式資料目錄，請切換至專用同步資料夾，並在設定中重新選取。

#### Android 上的 Google Drive（檔案同步）與 Dropbox 檔案同步備援

Google Drive **不提供** WebDAV。若要在 Android 上透過檔案同步使用 Google Drive，需要橋接應用程式持續同步本機資料夾（讓 Mindwtr 能直接讀寫 `data.json`）。

支援的組建中，Android Dropbox 使用者可使用原生 Dropbox 同步。若偏好檔案同步，同一種橋接應用程式方式也適用於 Dropbox。

範例：
- **Dropsync**（Dropbox）
- **Autosync**（Google Drive）
- **FolderSync**（通用）

再將 Mindwtr 指向**設定 → 同步**中的本機同步資料夾。

#### Android 上的 OneDrive（建議設定）

Android 官方 OneDrive 應用程式**不會**持續雙向同步本機資料夾。
若要在 Android 上可靠地搭配 Mindwtr 使用 OneDrive，請安裝「橋接」應用程式：

- **OneSync (Autosync for OneDrive)**
- **FolderSync**

接著：
1. 在桌面版為 Mindwtr 建立 OneDrive 資料夾。
2. 使用橋接應用程式，將該資料夾同步至 Android 上的本機資料夾。
3. 在 Mindwtr 的**設定 → 同步**中選取該本機資料夾（Mindwtr 會使用其中的 `data.json`）。

### 3. WebDAV 同步

直接同步至 WebDAV 伺服器：

- Nextcloud
- ownCloud
- Fastmail
- 任何與 WebDAV 相容的伺服器

Mindwtr 現在會在第一次 `PUT` 前自動建立缺少的父資料夾，因此可以指向全新空資料夾，不必手動預先建立每一層。

WebDAV 對公開 URL 使用 HTTPS。只有辨識為本機／私人的 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、loopback/private IPv6 位址、`*.local` 與 `*.home.arpa` 等目標允許一般 HTTP。自訂 DNS、VPN 主機名稱、Tailscale、ZeroTier 及任何未辨識為本機／私人的名稱，都請使用 HTTPS。

### 4. Mindwtr Cloud（自行託管）

Mindwtr 為進階使用者提供可自行託管的簡易同步伺服器（`apps/cloud`）。

- **協定**：簡單 REST API（GET/PUT）
- **驗證**：Bearer token（對應伺服器上的特定資料檔案）
- **部署**：Node.js/Bun
- **Docker 設定**：[Docker 部署](/zh-Hant/power-users/docker-deployment)
- **操作指南**：[雲端部署](/zh-Hant/data-sync/cloud-deployment)

重要用戶端注意事項：

- **公開的 Mindwtr Cloud URL 必須使用 HTTPS。**`localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、loopback/private IPv6 位址、`*.local` 與 `*.home.arpa` 等本機／私人目標會自動允許一般 HTTP。
- 若要在受信任區域網路之外公開 Cloud，請將伺服器放在 `caddy`、`nginx` 或 `traefik` 等 HTTPS 反向 Proxy 後方。
- 自訂 DNS、VPN 主機名稱、Tailscale、ZeroTier 及任何未辨識為本機／私人的名稱，都請使用 HTTPS，或在同步設定中開啟**允許不安全連接（HTTP）**，以透過明文 HTTP 接受該主機名稱。開啟後資料會以未加密方式傳輸，請只在信任的網路上使用。

### 5. Dropbox OAuth 同步

Mindwtr 也支援在受支援的桌面版／行動版組建中直接同步 Dropbox。

- **範圍**：Dropbox App Folder（`/Apps/Mindwtr/`）
- **同步資料**：`data.json` 與 `attachments/*`
- **驗證**：OAuth 2.0 + PKCE
- **設定**：在**設定 → 同步**中選擇 **Dropbox**、連接帳號，再執行**測試連線**
- **指南**：[Dropbox 同步](/zh-Hant/data-sync/dropbox)

---

## 同步運作方式

### 自動同步

Mindwtr 會在以下情況自動同步：

- **啟動時**：應用程式啟動後不久。
- **資料變更時**：任務／專案變更後不久，並有短暫 debounce，讓快速連續編輯合併同步。
- **應用程式取得焦點時**：桌面應用程式重新取得焦點時，最多每 30 秒一次；即使本機沒有編輯也會執行，以便迅速拉取遠端變更。
- **應用程式失去焦點／進入背景時**：離開桌面應用程式時，但只有待推送的本機變更才會執行。
- **桌面版定期 heartbeat**：Mindwtr 執行期間每 15 分鐘一次。

如果自動同步失敗，Mindwtr 會暫停自動重試約 60 秒。冷卻期間仍可手動同步。

### 設定同步選項

Mindwtr 可在裝置間同步所選偏好。請在**設定 → 同步 → 設定同步選項**中設定。

可用選項包括：
- **外觀**（主題）
- **語言與日期格式**
- **GTD 偏好**（預設排程時間與專注任務上限）
- **外部行事曆 URL**（ICS 訂閱）
- **AI 設定**（模型／供應商）
- **已儲存篩選條件**（專注篩選預設）

> API 金鑰與本機模型路徑永遠不會同步。
> 設定衝突以群組為單位解決。若兩部裝置幾乎同時編輯同一設定群組中的不同欄位，較新的群組更新可能覆寫較舊者。

### 合併策略

Mindwtr 對每個項目採用**修訂版本感知的最後寫入優先（LWW）**：
- 每項任務、專案、分區與領域都有 `updatedAt` 時間戳記。
- 可用時先使用修訂版本中繼資料（`rev` 與 `revBy`），再退回一般時間戳記。
- 保留軟刪除項目（刪除標記），讓刪除操作能正確傳播至各裝置。

刪除與使用中的衝突使用**上次操作時間**，而不只是原始 `updatedAt`：
- 對已刪除項目，Mindwtr 會比較 `deletedAt` 與使用中項目的最新更新。
- 刪除與使用中編輯相差超過 30 秒時，較新的操作勝出。
- 在該 30 秒模糊時間範圍內，有較高修訂版本號時仍會勝出；否則，Mindwtr 會保留使用中項目，而不會急著讓刪除標記勝出。
- 實際效果：如果在一部裝置上刪除任務，約 30 秒內又在另一部裝置編輯，已編輯的使用中任務可能在同步後重新出現。若確實想移除，請等裝置完成同步後再次刪除。

合併安全檢查會限制超出合併時鐘 5 分鐘以上的未來時間戳記，避免錯誤的裝置時鐘永久主導。若兩側都受未來時間限制，Mindwtr 仍會保留彼此的相對順序，而不會誤判為平手。

詳細合併平手裁決、重試行為與衝突範例，請參閱[同步演算法](/zh-Hant/data-sync/sync-algorithm)。本頁只保留儲存與操作概覽。

### 衝突可見性與時鐘偏差

每次同步後，Mindwtr 會將同步統計儲存在設定中：

- **衝突**：衝突總數與少量衝突 ID 範例
- **時鐘偏差**：裝置間觀察到的最大時間戳記偏差
- **時間戳記修正**：若 `updatedAt < createdAt`，合併時會修正時間戳記

可在桌面版與行動版的**設定 → 同步**中查看詳情。偏差值很大通常代表裝置時鐘不同步。
行動版預設收合同步歷史項目；點選即可展開。

### 附件同步與清理

- 附件會在中繼資料合併**之後**同步。
- 缺少的附件會保留為預留位置，直到下載完成。
- 系統會自動清理孤立附件（桌面版也可在**設定 → 資料**中手動觸發）。
- 遠端附件清理會感知本機參照，不會跨裝置進行全域參照計數。若兩部裝置在彼此同步前，建立或保留對同一遠端附件的參照，其中一部可能尚不知道另一部的參照。刪除共用附件前請先讓裝置同步；若清理移除了另一部裝置仍需的遠端副本，請重新附加檔案。

---

## 桌面版同步設定

### 檔案同步

1. 開啟**設定 → 同步**
2. 將**同步後端**設為**檔案**
3. 按一下**變更位置**，並選取同步服務中的資料夾
4. 按一下**儲存**

Mindwtr 會在啟動及資料變更時自動同步。

### WebDAV 同步

1. 開啟**設定 → 同步**
2. 將**同步後端**設為 **WebDAV**
3. 輸入 WebDAV 伺服器詳細資料：
   - **URL**：資料夾 URL；Mindwtr 會將 `data.json` 存在其中（例如 `https://nextcloud.example.com/remote.php/dav/files/user/Mindwtr`）
   - **使用者名稱**：WebDAV 使用者名稱
   - **密碼**：WebDAV 密碼
4. 按一下**儲存 WebDAV**

若目標資料夾路徑尚不存在，Mindwtr 會在上傳 `data.json` 前嘗試自動建立缺少的父 collection。

> **Linux 注意事項：**如果桌面工作階段沒有提供 Secret Service keyring（例如無法使用 `org.freedesktop.secrets`），Mindwtr 會退回使用 `~/.config/mindwtr/secrets.toml` 中的本機密鑰儲存空間。

> **提示：**Nextcloud 的 URL 格式為：
> `https://your-server.com/remote.php/dav/files/USERNAME/path/to/folder`
>
> 支援明確指定連接埠的 URL（例如 `https://example.com:5000/mindwtr`）。

## 行動版同步設定

由於 Android/iOS 儲存限制，行動版同步需要手動選取同步資料夾。

在 iOS 上，部分雲端供應商可能不會在「檔案」中提供資料夾選擇。此時請選取目標同步資料夾內任一 JSON 檔案；Mindwtr 會解析並使用該資料夾路徑進行同步。

### 1. 先匯出資料

1. 前往**設定 → 資料**
2. 點選**匯出備份**
3. 將檔案儲存至同步資料夾（例如 Google Drive）

### 2. 選取同步資料夾

1. 在**設定 → 同步**中
2. 點選**選擇資料夾**
3. 前往同步資料夾
4. 選取包含（或將包含）`data.json` 的資料夾

### 3. 自動同步

行動版現在會自動同步：
- 應用程式進入背景時
- 資料變更 5 秒後
- 返回應用程式時（若已超過 30 秒）

也可隨時在設定中點選**同步**，手動執行。

---

## SQLite + JSON 同步橋接

Mindwtr 以 SQLite 作為主要本機儲存區。`data.json` 是同步與備份快照，不是第二個地位相等的單一真實來源。

- **冷啟動／一般讀取**：應用程式讀取以本機 SQLite 為基礎的儲存空間。
- **傳出同步**：先排清待處理的本機儲存，再將目前快照匯出至 `data.json`／遠端儲存空間。
- **傳入同步**：驗證、正規化外部 JSON，再與本機資料合併，並存回以 SQLite 為基礎的儲存空間。
- **裝置本機同步診斷**：`lastSyncStats`、`lastSyncHistory` 與待處理遠端寫入復原中繼資料等欄位保留在本機，且會從遠端承載資料移除。

桌面版與行動版在同步期間都**不會**凍結編輯。若同步寫入進行時本機資料發生變更，應用程式會中止該週期並排入全新同步，避免較新的本機快照遭覆寫。

完整合約請參閱 [ADR 0009](https://github.com/dongdongbh/Mindwtr/blob/main/docs/adr/0009-sqlite-json-sync-bridge.md)。

---

## 同步工作流程

### 兩部裝置

**初始設定：**
1. 為桌面版設定同步資料夾
2. 匯出備份並儲存至同步資料夾
3. 在行動版選取該資料夾

**日常使用：**
1. 在裝置 A 進行變更
2. 等待同步服務複寫
3. 在裝置 B 觸發同步（設定 → 同步）

### 多部裝置

採用相同工作流程。避免同時在多部裝置上編輯，以免發生衝突。

---

## 疑難排解檢查清單

- **確認同步資料夾中有 `data.json`**，且會持續更新。
- 在第二部裝置開啟 Mindwtr 前，**等待 Syncthing 完全同步**。
- 如果想立即拉取／推送，請在設定中手動使用**同步**。
- **檢查重複附件資料夾**（`attachments (1)` 等）並合併。
- **確認裝置時鐘正確**（偏差過大會造成衝突）。
- **確認資料夾權限**（Android SAF 可能阻止寫入部分資料夾）。

---

## 備份與匯出

### 匯出資料

**桌面版：**
- 使用**設定 → 資料 → 匯出備份**
- 啟用同步後，同步後端也會自動更新 `data.json`

**行動版：**
1. 前往**設定 → 資料**
2. 點選**匯出備份**
3. 儲存至所需位置

### 從備份還原

Mindwtr 可在桌面版與行動版直接從備份 JSON 檔案還原本機資料。

流程：
1. 開啟**設定 → 資料**
2. 選擇**還原備份**
3. 選取 Mindwtr 備份 JSON 檔案
4. 檢查備份摘要並確認

還原前，Mindwtr 會驗證檔案，並在平台支援時建立復原快照。還原會完整取代本機資料，不是合併。

- **桌面版**：還原前會在應用程式資料快照資料夾中建立復原快照
- **行動版**：還原前會在應用程式儲存空間建立本機復原快照
- **檔案無效時**：會阻止還原，目前資料不受影響

詳細流程請參閱[備份與還原](/zh-Hant/data-sync/backup-restore)。

## 匯入與遷移

從其他應用程式將任務資料帶入 Mindwtr 時，請使用以下指南。匯入會將資料加入 Mindwtr，不會設定同步。

### TickTick CSV / ZIP 匯入

Mindwtr 可從**設定 → 資料 → 從 TickTick 匯入**匯入 TickTick 備份。

- 支援 TickTick **CSV** 備份，以及含有 CSV 匯出的 **ZIP** 備份
- 將 TickTick 資料夾轉為 Mindwtr 中的領域
- 將 TickTick 清單轉為 Mindwtr 中的專案
- 保留支援的任務狀態、日期、優先順序、標籤、筆記與重複規則
- 將支援的檢查清單／子任務資料轉成 Mindwtr 檢查清單項目

詳細資訊與支援的對應方式，請參閱 [TickTick 匯入](/zh-Hant/import/ticktick)。

### Todoist CSV / ZIP 匯入

Mindwtr 可從**設定 → 資料 → 從 Todoist 匯入**匯入 Todoist 匯出資料。

- 支援單一 Todoist CSV 匯出，或含有多個專案 CSV 的 ZIP 備份
- 將 Todoist 專案轉為 Mindwtr 中的專案
- 將 Todoist 分區保留為 Mindwtr 中的分區
- 將 Todoist 子任務轉成檢查清單項目
- 將匯入任務保留在**收集箱**，讓你透過一般 GTD 流程處理

Todoist 重複排程不會自動重建。Mindwtr 會匯入任務一次，並將原始重複文字保留在描述中。

詳細資訊與支援的對應方式，請參閱 [Todoist 匯入](/zh-Hant/import/todoist)。

### DGT GTD JSON / ZIP 匯入

Mindwtr 可從**設定 → 資料 → 從 DGT GTD 匯入**匯入 DGT GTD 匯出資料。

- 支援 DGT GTD JSON 匯出，或含有匯出 JSON 檔案的 ZIP 封存
- 將 DGT 資料夾轉為 Mindwtr 中的領域
- 將 DGT 專案轉為 Mindwtr 中的專案
- 將 DGT 檢查清單保留為 Mindwtr 檢查清單任務
- 在匯入任務上保留 DGT 情境與標籤
- 保留支援的重複規則；若 DGT 重複模式只能匯入一次並保留原始文字，則顯示警告

獨立 DGT 任務會留在 Mindwtr 中，不會強迫放入新專案，之後可視需要整理。

詳細資訊與支援的對應方式，請參閱 [DGT GTD 匯入](/zh-Hant/import/dgt-gtd)。

### OmniFocus CSV / JSON / ZIP 匯入

Mindwtr 可從**設定 → 資料 → 從 OmniFocus 匯入**匯入 OmniFocus 匯出資料。

- 支援 OmniFocus **CSV** 匯出，包括 UTF-8 與 UTF-16 CSV 檔案
- 支援 Omni Automation / Shortcuts **JSON** 匯出與 **ZIP** 封存
- 中繼資料可用時，將 OmniFocus 資料夾轉為 Mindwtr 中的領域
- 將 OmniFocus 專案或參照的專案名稱轉為 Mindwtr 中的專案
- 將獨立 OmniFocus 行動留在專案之外，供日後整理
- 從 JSON 路徑保留支援的 OmniFocus 筆記、標籤、延後日期、截止日期、完成狀態與重複規則
- 可行時將簡單巢狀任務轉成檢查清單項目，較深的階層則扁平化並保留原始路徑

如果重複規則或階層保真度很重要，請優先使用 Omni Automation JSON / ZIP，而非 CSV。Mindwtr 沒有直接對應欄位時，規劃日期與持續時間文字會保留在匯入描述中。

詳細資訊與支援的對應方式，請參閱 [OmniFocus 匯入](/zh-Hant/import/omnifocus)。

### Apple 提醒事項匯入（iOS）

在 iPhone 與 iPad 上，Mindwtr 可從**設定 → 資料 → 從 Apple 提醒事項匯入**，匯入尚未完成的 Apple 提醒事項。

- 選擇作為收集來源的 Apple 提醒事項清單
- 將新的未完成提醒事項加入 Mindwtr 的**收集箱**
- 將提醒事項標題與筆記保留為任務標題與描述
- 略過已完成、沒有標題及已匯入的提醒事項
- Mindwtr 將項目加入收集箱後，可選擇從 Apple 提醒事項刪除已匯入項目

Apple 提醒事項匯入是單向匯入路徑，不是同步後端。

### 備份策略

- 定期匯出至同步資料夾
- 備份本機設定資料夾
- 同步檔案可作為備份
- 還原／匯入操作前會自動儲存復原快照

---

## 疑難排解

### 同步無法運作

1. **檢查同步資料夾路徑**
   - 確認路徑存在且可存取
   - 確認權限

2. **檢查同步服務**
   - Dropbox/Google Drive 是否正在執行？
   - 檔案是否已在裝置間同步？

3. **暫存檔案錯誤**
   - 同步服務正在寫入時（例如 Syncthing），JSON 可能暫時無效。
   - 請稍候再同步。

4. **手動同步**
   - 按一下「立即同步」（桌面版）或「同步」（行動版）
   - 查看是否有任何錯誤訊息

### 資料衝突

若看見非預期資料：
1. 匯出目前資料的備份
2. 檢查同步資料夾中的最新檔案
3. 視需要手動檢視並合併

### 找不到行動版同步檔案

1. 確認檔案存在於雲端資料夾
2. 在「設定 → 同步」中重新選取檔案
3. 檢查檔案權限

### 重設同步

若要重新開始：
1. 刪除同步資料夾內容
2. 從一部裝置匯出
3. 在其他裝置匯入／同步

---

## 資料格式

`data.json` 檔案結構：

```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "next",
      "contexts": ["@home"],
      "tags": ["#focused"],
      "dueDate": "2025-01-15T09:00:00Z",
      "recurrence": {
        "rule": "weekly",
        "strategy": "strict",
        "byDay": ["MO", "WE"]
      },
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z",
      "deletedAt": null
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "title": "Project name",
      "status": "active",
      "color": "#3B82F6",
      "areaId": "area-uuid",
      "tagIds": ["#client", "#feature"],
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "sections": [
    {
      "id": "uuid",
      "projectId": "project-uuid",
      "title": "Section title",
      "order": 1,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "areas": [
    {
      "id": "uuid",
      "name": "Research",
      "color": "#3B82F6",
      "icon": "🔬",
      "order": 0,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "people": [
    {
      "id": "uuid",
      "name": "Alex",
      "note": "Design lead",
      "referenceLink": "https://example.com/alex",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
```

---

## 隱私權

- 所有資料都儲存在你的裝置本機
- 同步透過你自己的雲端服務進行
- 任務資料、專案資料、筆記、附件與同步內容不會傳送至 Mindwtr 營運的伺服器
- 設有 heartbeat 分析的組建可能會傳送一項小型應用程式健康事件；其中不包含任務、專案、筆記、檔案、AI 提示或帳號內容。請參閱[隱私權政策](https://mindwtr.app/privacy)。
- 你完全掌控自己的資料

---

## 另請參閱

- [桌面版使用指南](/zh-Hant/use/desktop)
- [行動版使用指南](/zh-Hant/use/mobile)
- [開始使用](/zh-Hant/start/getting-started)
- [附件](/zh-Hant/use/attachments)
