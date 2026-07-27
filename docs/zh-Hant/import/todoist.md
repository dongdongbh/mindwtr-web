# 匯入 Todoist

Mindwtr 可匯入 Todoist 匯出資料，讓你不必手動重建系統即可遷移。

支援的來源：

- 單一 Todoist **CSV** 匯出檔
- 含多個專案 CSV 檔案的 Todoist **ZIP** 備份

桌面版與行動版都可從**設定 → 資料 → 從 Todoist 匯入**執行。

---

## 匯入內容

Mindwtr 以 GTD 優先的原則，將 Todoist 匯出資料對應至 Mindwtr 的模型：

- Todoist 專案會成為 Mindwtr 中的**專案**
- Todoist 分區會成為 Mindwtr 中的**分區**
- Todoist 子任務成為**檢查清單項目**
- Todoist 標籤成為**標籤**
- 每個 Todoist CSV／專案都會成為一個 Mindwtr 專案
- 所有匯入的使用中任務都會成為該專案中的**下一步行動**

匯入器會將每個使用中任務指派到它建立的專案。

---

## 支援的 Todoist 資料

- 任務標題
- 描述
- 優先順序
- 可安全解析的截止日期
- 分區
- 附加於任務的筆記／留言
- 寫在 Todoist 內容中的標籤（例如 `@work`）

Todoist 的重複排程不會自動重建為 Mindwtr 的重複規則。任務只匯入一次，原始 Todoist 重複文字會保留在描述中，讓你自行決定如何在 Mindwtr 中建立規則。

---

## 匯入流程

1. 開啟**從 Todoist 匯入**
2. 選擇 Todoist CSV 或 ZIP 檔案
3. 檢查預覽摘要
4. 確認匯入

在支援的環境中，Mindwtr 會在匯入前保存目前本機資料的復原快照。

匯入後：

- 每個匯入的 Todoist CSV／專案都會建立一個新專案
- 所有匯入的使用中任務都會在這些專案中顯示為**下一步行動**
- 重複任務、略過的資料列或不支援的封存檔項目會顯示警告

---

## ZIP 備份注意事項

Todoist ZIP 備份通常每個專案各有一個 CSV。Mindwtr 會逐一讀取並分別匯入各專案。

Mindwtr 會略過：

- 巢狀 ZIP 檔案
- 封存檔中的非 CSV 檔案
- 無法安全解析的 Todoist 資料列

---

## 提示

- 若想先測試對應結果，可從較小的 Todoist 專案開始
- 確認匯入結果正確前，請保留復原快照
- 重複匯入同一匯出檔可能產生重複任務

另請參閱[資料與同步](/zh-Hant/data-sync/)及[備份與還原](/zh-Hant/data-sync/backup-restore)。
