# 從 Microsoft To Do 匯入

> 這項匯入功能將在 Mindwtr 桌面版 1.3.9 之後的下一個版本推出。

Mindwtr 桌面版可以匯入從 Windows 傳統版 Outlook 的**工作**資料夾匯出的 CSV 檔案。Microsoft To Do 中儲存在 Exchange Online 的工作會同步到 Outlook 工作。 [Microsoft To Do 同步說明](https://support.microsoft.com/en-us/todo/syncing-your-microsoft-to-do-account)

## 將工作匯出為 CSV

1. 開啟 Windows 傳統版 Outlook，登入你在 Microsoft To Do 使用的帳戶。
2. 開啟**檔案 → 開啟和匯出 → 匯入/匯出**。
3. 選擇**匯出至檔案**，再選擇**逗號分隔值**。
4. 選擇該帳戶底下的**工作**資料夾，確認其中包含你要移轉的工作。
5. 指定 CSV 檔案的名稱及儲存位置，接著選擇**完成**。 使用你想要的 Mindwtr 專案名稱作為 CSV 檔名。為每個匯出的 Outlook 資料夾使用不同的檔名。

如果你使用新版 Outlook，請開啟傳統版 Outlook 進行這次匯出。精靈只能匯出它所列資料夾中的工作。如果精靈缺少工作，請確認傳統版 Outlook 已加入同一個帳戶，且工作已出現在傳統版 Outlook 的工作檢視中。 [切換 Outlook 版本](https://support.microsoft.com/en-us/outlook/getstarted/run-new-outlook-and-classic-outlook-side-by-side) · [Microsoft Q&A 的匯出步驟](https://learn.microsoft.com/en-ca/answers/questions/5687598/how-can-i-export-my-microsoft-to-do-list-data-and)

Mindwtr 支援英文和簡體中文欄位標題。如果匯出檔案使用其他語言，請將 Office 顯示語言改為英文，再匯出一次。如果 CSV 使用舊版 Windows 編碼，請用試算表程式開啟，並另存成 CSV UTF-8 檔案。 [變更 Office 顯示語言](https://support.microsoft.com/en-us/office/languages/change-the-language-office-uses-in-its-menus-and-proofing-tools)

## 查看預覽並匯入

1. 在 Mindwtr 桌面版中，開啟**設置 → 數據 → 導入數據 → 從 Microsoft To Do 匯入**。
2. 選擇 Outlook 匯出的工作 CSV 檔案。
3. 檢查預覽中的任務數量和警告，再確認匯入。

匯入後，抽查幾項任務並與原始工作比對。如果結果有誤，請在結果通知中選擇**復原**。 [備份與還原](/zh-Hant/data-sync/backup-restore)

## 哪些資料會匯入 Mindwtr

如果 Outlook 匯出了對應資料，Mindwtr 會匯入任務標題、備註、優先順序、狀態、開始日期、截止日期和完成日期，並將類別轉為標籤。請查看預覽中是否有無法辨識的日期。保留原始清單，以便查閱重複規則、提醒、附件和清單結構。

每份 CSV 檔案都會匯入以該檔案命名的專案。匯入會建立一份獨立的副本。使用相同檔名再次匯入時，Mindwtr 會略過已匯入且內容相同的任務。變更檔名或任務內容可能產生重複項目。
