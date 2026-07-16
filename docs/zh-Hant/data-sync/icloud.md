# iCloud 同步

在原生模組可用的 Apple 裝置上，如水支援原生 **iCloud / CloudKit** 同步後端。

## 可用平台

- **iPhone / iPad：**可在**設定 → 同步**中使用原生 `iCloud` 同步後端
- **Android：**不支援
- **Windows / Linux：**不支援
- **macOS 桌面版：**可在**設定 → 同步**中使用原生 `iCloud` 同步後端

## 同步內容

原生 iCloud 後端會同步與其他結構化後端相同的核心 GTD 資料：

- 任務
- 專案
- 分區
- 領域
- 附件中繼資料
- 透過 CloudKit asset 儲存的附件檔案
- 已同步的設定群組

它使用你 Apple 帳號中的 CloudKit 記錄與 asset，而不是由使用者選取的 `data.json` 與 `attachments/` 資料夾。

## 設定

1. 在要同步的裝置上登入同一個 Apple ID。
2. 確認這些裝置已為如水啟用 iCloud。
3. 在 Apple 裝置的如水中開啟**設定 → 同步**。
4. 選擇 **iCloud** 作為同步後端。
5. 執行一次同步，以寫入初始資料或拉取既有資料。

設定完成後，如水會繼續採用一般的在地優先合併流程，並在可用時回應 CloudKit 變更通知。

## 平台注意事項

- 若非 Apple 版本讀到舊的 `cloudkit` 後端值，如水會改用「關閉」，而不是顯示無法使用的 iCloud 選項。
- macOS 使用者若偏好資料夾式流程而非原生 CloudKit 後端，仍可使用 **iCloud Drive + 檔案同步**。
- 原生 iCloud 附件同步也僅限 Apple 平台。若附件需在 Apple 與非 Apple 裝置間移動，混合平台設定應改用跨平台後端。
- Apple 與非 Apple 裝置之間需要跨平台後端時，請使用 **WebDAV**、**Mindwtr Cloud**、**Dropbox**（支援的版本）或**檔案同步**。

## 適用時機

符合以下情況時，請使用原生 iCloud 同步：

- 所有參與同步的裝置都在 Apple 生態系中
- 想要比選取及維護共享資料夾更簡單的設定
- 同一同步網路中不需要 Android / Windows / Linux 用戶端

若需要混合平台同步，請參閱[資料與同步](/zh-Hant/data-sync/)。
