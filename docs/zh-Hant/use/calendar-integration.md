# 行事曆整合（硬性與彈性時程）

Mindwtr 支援雙向的行事曆整合用途：將外部行事曆讀入規劃工具，以及在平台提供可寫入裝置行事曆時，將 Mindwtr 任務推送至該行事曆。

- **行動版（iOS/Android）：**系統已公開的裝置行事曆、ICS 訂閱 URL，以及 Mindwtr -> 裝置行事曆的單向推送
- **桌面版（macOS）：**透過 EventKit 讀取 Apple 行事曆並單向推送任務，另支援 ICS 訂閱 URL
- **桌面版（Linux）：**透過 Evolution Data Server 讀取系統行事曆並單向推送任務，另支援 ICS 訂閱 URL
- **桌面版（Windows）與網頁版：**ICS 訂閱 URL

## 概念

- **硬性時程：**外部行事曆中的會議／課程。
- **彈性時程：**以 `startTime` 與 `timeEstimate` 排程的 Mindwtr 任務。
- 行事曆是安排現有任務的**規劃介面**；若在行事曆情境中建立排程任務最快，也可直接在此建立。

## GTD 語意

- **`dueDate`** = 截止期限（硬性承諾）。
- **`startTime`** = 提醒／排定開始時間（彈性承諾）。
- **`timeEstimate`** = 排程時建議的持續時間。

## 檢視

- **日檢視：**時間格線，顯示已排程任務、截止期限與外部事件。
- **週檢視：**七天規劃格線，用於瀏覽目前工作週。
- **月檢視：**以標記呈現截止期限、已排程任務與事件的概覽。
- **行程檢視：**未來 60 天的截止期限、已排程任務與外部事件清單。

桌面版會在 URL 中反映目前的行事曆狀態：

- `calendarView`：`day`、`week`、`month` 或 `schedule`
- `calendarDate`：選取某日後的日期
- `calendarMonth`：目前顯示的行事曆月份

因此可將特定規劃範圍加入書籤或分享，例如目前 sprint 的週檢視，或未來兩個月的行程檢視。

## Mindwtr 的重複任務

Mindwtr 的重複任務會產生任務實例，而不是展開成行事曆系列：

- 使用中的任務實例有截止日期或排定開始時間時，會顯示在行事曆中。
- Mindwtr 預設不會在行事曆中預先建立未來任務。只有完成目前的重複任務後，才會建立下一項真正的任務實例。
- 若為重複任務啟用**在行事曆顯示下一次發生時間**，行事曆可顯示一項僅供規劃的下次發生預覽。該預覽並非真正的任務；行動版／macOS 行事曆推送會將它寫成一般單一事件，而不是原生重複事件。
- **固定排程**會維持固定的排程節奏。每月 1 日截止的任務會固定在規劃週期上，但 Mindwtr 仍然只會在每次完成後建立下一個實例，不會填滿未來每個月份。
- **完成後重複**會依目前任務的完成時間計算下一個實例。例如，一項一般每月習慣若在 15 日完成，下次就會以 15 日為基準排程。
- 行動版與 macOS 行事曆推送會反映這些具體任務實例，不會將 Mindwtr 的重複規則匯出為原生重複行事曆事件。

## 排程工作流程

桌面版：

1. 選擇日期或開啟時段。
2. 選擇**新增**以建立排程任務，或選擇**現有**以安排尚未排程的任務。
3. 設定開始與結束時間。Mindwtr 會比對已排程任務及可見外部事件，檢查時段。
4. 儲存任務；日後也可從任務編輯器、日檢視或所選日期清單調整時間。

在較寬的桌面版面中，**規劃下一步行動**會列出所選日期尚未排程的下一步行動，包括已到期但未排程的行動。可直接將下一步行動放入行事曆，不必開啟搜尋。截止日期仍然是期限；排程只會加入 `startTime`。

想讓行事曆格線使用完整寬度時，可以收合規劃面板。需要瀏覽所選日期的可用工作時，再將它展開。

行動版：

1. 從日檢視開啟**行事曆 -> 排程任務**。
2. 選擇現有任務。
3. Mindwtr 會避開可見外部事件與已排程任務，尋找當天最早的空閒時段。

行動版排程面板也採用相同方式：查看某一天時選擇尚未排程的工作，再指派具體開始時間。

如有 `timeEstimate`，Mindwtr 會以它作為預設持續時間。若發生衝突，請選擇其他時間或縮短持續時間。

## 外部行事曆

### 支援矩陣

目前支援：

| 平台 | 支援的行事曆功能 | 注意事項 |
| --- | --- | --- |
| iOS/Android 行動版 | 將 Mindwtr 任務推送至裝置行事曆 | Android 已透過 Google Calendar 驗證。iOS 請使用已提供給 Apple 行事曆／EventKit 的行事曆。 |
| iOS/Android 行動版 | 讀取裝置行事曆 | 授權後，讀取裝置行事曆資料庫已公開的行事曆。 |
| iOS/Android 行動版 | 直接使用 ICS 訂閱 URL | URL 必須回傳原始 iCalendar 資料。 |
| macOS 桌面版 | 讀取 Apple 行事曆帳號 | 授權後，透過 macOS EventKit 讀取事件，包括同步至 Apple 行事曆的 iCloud、Google 與 Exchange 行事曆。 |
| macOS 桌面版 | 將 Mindwtr 任務推送至 Apple 行事曆 | 透過 EventKit，將已排程／到期的 Mindwtr 任務寫入所選的可寫入 Apple 行事曆。 |
| Linux 桌面版 | 讀取系統行事曆帳號 | 讀取 Evolution Data Server 公開的已啟用行事曆，包括在 Evolution 或 GNOME 線上帳號中設定的帳號。 |
| Linux 桌面版 | 將 Mindwtr 任務推送至系統行事曆 | 將已排程／到期的 Mindwtr 任務寫入所選的可寫入 Evolution Data Server 行事曆。 |
| 桌面版與網頁版 | 直接使用 ICS 訂閱 URL | URL 必須回傳原始 iCalendar 資料。 |

目前不支援：

- Windows 原生桌面行事曆帳號。
- CalDAV 帳號登入、伺服器探索或 DAVx5 特定帳號探索。
- 在 Mindwtr 內進行行事曆供應商 OAuth，例如從 Mindwtr 登入 Google、Microsoft 或 Nextcloud。
- 回傳 `HTTP 401` 的須驗證／私人 URL，除非行事曆供應商已將密鑰嵌入 URL。
- 行事曆網頁 URL，包括顯示 HTML 而非原始 `.ics` 資料的公開分享頁面。
- 從 Mindwtr 編輯外部行事曆事件。
- 透過 Mindwtr 的同步功能同步外部行事曆事件。外部事件只會在本機擷取並快取。
- 任務／行事曆雙向同步。推送的行事曆事件由 Mindwtr 任務產生。
- 將重複任務規則匯出為原生重複行事曆事件。

### 可見性

外部行事曆的可見性是本機顯示偏好：

- 跟隨設定同步的外部行事曆訂閱，會依照你的同步設定。
- 「行事曆」檢視中各行事曆的顯示／隱藏狀態，儲存在目前裝置。
- 隱藏的行事曆仍可在設定中使用，只是在該裝置上排除於可見規劃介面及空閒時段檢查之外。

### 行動版：將 Mindwtr 的任務推送至行事曆

在 iOS 與 Android 上，Mindwtr 可將排定時間或設有截止日期的任務推送至所選裝置行事曆：

- 有具體時間之 `startTime` 的任務會成為定時事件。如有 `timeEstimate`，則用作事件持續時間。
- 只有日期的 `startTime`，或只有 `dueDate` 的任務會成為全天事件。
- 已完成、已歸檔、參考資料或已刪除任務，會從推送目的行事曆移除。
- 推送至專用的 `Mindwtr` 行事曆時，Mindwtr 會保留任務標題。如果選擇共用行事曆，推送事件標題會加上 `Mindwtr: ` 前綴，以便與一般事件區分。
- 任務描述會成為事件筆記，任務地點會成為事件地點。
- 如果選擇名為 `Mindwtr` 的專用行事曆，行事曆應用程式可以用該行事曆本身的色彩顯示 Mindwtr 項目。

設定：

1. 開啟**設定 → 行事曆**
2. 啟用**將任務推送至行事曆**
3. 授予行事曆權限
4. 展開**同步目標**
5. 選擇 Mindwtr 應將事件寫入何處

目標選項：

- **專用帳號行事曆**：最適合 Android 上的 Google Calendar，或 iOS 上的 iCloud／Apple 行事曆。在該帳號建立名為 `Mindwtr` 的行事曆，再選擇該專用目標。
- **共用帳號行事曆**：寫入現有帳號行事曆，並在事件標題加上 `Mindwtr: ` 前綴。
- **專用本機行事曆**：只留在目前裝置。部分 Android 行事曆應用程式會隱藏本機行事曆；本機目標不會出現在 calendar.google.com 或其他帳號行事曆網頁應用程式上。
- **共用本機行事曆**：只寫入裝置的本機行事曆。

#### Android：Google Calendar 設定

若要在 Android 上使用獨立、由 Google 帳號支援的 `Mindwtr` 行事曆：

1. 在網頁上開啟 Google Calendar。
2. 在 Android 所用的同一個 Google 帳號下，建立名為 `Mindwtr` 的新行事曆。
3. 在 Android 上開啟 Google Calendar 並重新整理帳號。確認 Android 帳號設定已啟用行事曆同步。
4. 在 Google Calendar Android 應用程式中啟用**與其他應用程式分享 Google Calendar 資料**，讓 Android 將 Google 行事曆公開給 Mindwtr。
5. 返回 Mindwtr 的**設定 → 行事曆**，點選**重新整理行事曆**，再選擇顯示你 Google 帳號的 `Mindwtr` 目標。

如果 Google 帳號支援的 `Mindwtr` 行事曆尚未出現在 Mindwtr 中，代表 Android 尚未透過系統行事曆供應程式將它公開。請重新整理 Google Calendar、檢查 Android 帳號同步、在 Google Calendar 啟用**與其他應用程式分享 Google Calendar 資料**，再於 Mindwtr 點選**重新整理行事曆**。

#### iOS：Apple 行事曆設定

若要在 iPhone 或 iPad 上使用獨立的 Apple 行事曆目標：

1. 開啟 Apple 行事曆。
2. 建立名為 `Mindwtr` 的新行事曆。若希望事件出現在其他 Apple 裝置上，請使用 iCloud；若只想留在目前裝置，則使用本機行事曆。
3. 若使用 iCloud，請確認 iOS **設定 -> Apple 帳號 -> iCloud -> 行事曆**已啟用行事曆同步。
4. 開啟 Mindwtr 的**設定 -> 行事曆**。
5. 啟用**將任務推送至行事曆**並授予行事曆權限。
6. 展開**同步目標**，點選**重新整理行事曆**，再選擇 `Mindwtr` Apple 行事曆目標。
7. 在 Apple 行事曆中開啟行事曆清單，確認所選的 `Mindwtr` 行事曆可見。

如果目標清單中沒有 `Mindwtr` 行事曆，請先確認它在 Apple 行事曆中可見，再返回 Mindwtr 並點選**重新整理行事曆**。

### 行動版：讀取裝置行事曆

在行動版中，Mindwtr 可從裝置行事曆資料庫讀取行事曆：

- **Android：**透過 Android 行事曆供應程式。若同步應用程式未透過該供應程式公開行事曆，Mindwtr 就無法看見。
- **iOS：**透過以 EventKit 為基礎的系統行事曆，例如已在 iOS 設定中啟用的 iCloud、Google、Exchange 與 Outlook。

設定：

1. 開啟**設定 → 行事曆**
2. 啟用**裝置行事曆**
3. 授予行事曆權限
4. 展開**裝置行事曆**
5. 選擇要顯示的裝置行事曆

Mindwtr 會保持唯讀，不會對行事曆來源執行供應商 OAuth。

Mindwtr 會在讀取清單中隱藏自己推送的 `Mindwtr` 行事曆，以免匯入自己建立事件的重複副本。

### macOS：Apple 行事曆整合

在 macOS 桌面版中，Mindwtr 可透過 EventKit 讀取 Apple 行事曆事件，並推送已排程／到期的 Mindwtr 任務：

1. 開啟**設定 -> 行事曆**
2. 要求 Apple 行事曆存取權
3. 在 macOS **系統設定 -> 隱私權與安全性 -> 行事曆**中允許 Mindwtr
4. 若想將 Mindwtr 任務寫入 Apple 行事曆，啟用**將任務推送至行事曆**
5. 選擇專用的 `Mindwtr` 行事曆或其他可寫入行事曆目標

此功能只適用於 Apple 行事曆中已可見的行事曆。

### Linux：GNOME/Evolution Data Server 整合

在 Linux 上，Mindwtr 可讀取 Evolution Data Server 中已啟用的行事曆，並將已排程／到期的任務推送至可寫入行事曆。這包括已在 Evolution 或 GNOME 線上帳號中設定，且由 Evolution Data Server 公開的帳號。

1. 在 Evolution 或 GNOME 線上帳號中設定行事曆帳號，並確認它顯示在 Evolution 中。
2. 確認已安裝並執行 `evolution-data-server`。
3. 在 Mindwtr 中開啟**設定 -> 行事曆**。
4. 若要將 Mindwtr 任務寫入系統行事曆，請啟用**將任務推送至行事曆**。
5. 展開**同步目標**，重新整理行事曆，然後選擇專用的 `Mindwtr` 行事曆或其他可寫入目標。

Linux 不會顯示獨立的行事曆權限對話框。唯讀行事曆可顯示在 Mindwtr 中，但不會列為推送目標。Flatpak 支援已為下一個 Flathub 版本準備就緒；在安裝該版本之前，請使用原生套件或 AUR 版本來使用此整合。Snap 仍不受支援。

### 桌面版／網頁版：ICS URL

1. 開啟**設定 → 行事曆**
2. 加入你的 **ICS URL**
3. 重新整理以擷取事件

事件會快取在裝置上，不會由 Mindwtr 同步。

### ICS URL 要求

Mindwtr 預期 URL 會擷取原始 iCalendar 文字。可用的 feed 通常：

- 以 `BEGIN:VCALENDAR` 開頭
- URL 以 `.ics` 結尾，或是行事曆供應商提供的明確訂閱／匯出連結
- 不必經過互動式登入頁面或額外標頭即可擷取

常見範例：

- Google Calendar：使用私人**iCal 格式的秘密地址**。
- Nextcloud Calendar：使用行事曆訂閱／匯出的 `.ics` 連結，而不是公開行事曆頁面 URL。

如果 Mindwtr 顯示 `HTTP 401`，代表伺服器要求驗證。行事曆 URL 不支援使用者名稱／密碼提示、CalDAV 登入或 bearer-token 標頭。請改用供應商提供的秘密 iCalendar 訂閱 URL。

如果 URL 在瀏覽器中開啟一般網頁，它很可能不是 ICS feed。請從該頁面複製訂閱／匯出 URL。

### 私人行事曆（Google Calendar）

你**不必**將行事曆設為公開，請改用私人的「秘密地址」：

1. 在網頁上開啟 Google Calendar → **設定**。
2. 在左側邊欄選取行事曆。
3. 在**整合行事曆**中複製**iCal 格式的秘密地址**。
4. 將該 URL 貼入 Mindwtr。

該連結的作用如同密碼：只有持有連結的應用程式能看見事件，行事曆本身仍保持私人。

## 注意事項

- 桌面版與行動版的「行事曆」可從外部事件建立另一項 Mindwtr 任務。Mindwtr 會在可用時複製事件標題、日期／時間、地點、描述與行事曆名稱。
- 外部行事曆在 Mindwtr 中為**唯讀**。從事件建立任務不會修改原始事件。
- ICS 重複事件支援 `FREQ=DAILY`、`WEEKLY`、`MONTHLY` 與 `YEARLY`，包括 Mindwtr 可展開至可見範圍之模式的 `INTERVAL`、`COUNT`、`UNTIL`、`BYDAY`、`BYMONTH` 與 `BYMONTHDAY`。
- 每年全天事件及 `FREQ=YEARLY;COUNT=...` 或 `FREQ=YEARLY;BYMONTH=1;BYDAY=3MO` 等年度規則，會在可見行事曆範圍中展開。
- 目前不會展開 `EXDATE`、`RDATE` 與 `RECURRENCE-ID` 等例外日期及重複覆寫。
- 帶有 `RRULE:...;COUNT=...` 的重複事件會在原始次數後停止。如果曾看見非常久以前的重複事件，請更新至 v0.4.9+ 後重新匯入。
