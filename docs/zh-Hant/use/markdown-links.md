# Markdown 連結

如水支援內部 Markdown 連結，可在筆記中交互參照任務與專案。

## 支援的語法

請使用穩定的如水 ID，而不是純文字標題：

```md
[[task:task-id|Quarterly review]]
[[project:project-id|Website launch]]
```

- `task:` 連結以 ID 指向任務。
- `project:` 連結以 ID 指向專案。
- `|` 後的文字是編輯器與預覽中顯示的標籤。

呈現內容時，如水也會將這些符記正規化為一般 Markdown 連結：

```md
[Quarterly review](mindwtr://task/task-id)
[Website launch](mindwtr://project/project-id)
```

## 建立連結

編輯支援的 Markdown 欄位時，輸入 `[[` 並開始搜尋。

- 搜尋會比對任務與專案標題。
- 桌面版會在游標附近顯示浮動建議；下方空間不足時會翻至插入點上方。
- 行動版會在鍵盤上方的底部面板顯示相同建議。
- 任務編輯器會排除目前正在編輯的任務，避免意外連回自身。
- 插入的連結一律使用穩定的 `[[task:...|label]]` 或 `[[project:...|label]]` 符記。
- 行內程式碼與程式碼圍欄不受影響。

## 適用位置

- 桌面版與行動版的任務描述
- 桌面版與行動版的專案筆記
- 桌面版唯讀預覽、展開的任務詳情，以及「專注／清單」中開啟「詳情」後的內容
- 行動版任務與專案編輯器內的預覽

## 不會執行的功能

- Markdown 連結只是導覽參照。
- 它不會建立相依關係圖、自動完成已連結任務，也不會讓不同任務的檢查清單狀態互相連動。

## 導覽行為

- 有效的任務連結會開啟如水中正確的檢視並標示該任務。
- 有效的專案連結會開啟「專案」檢視並選取該專案。
- 外部連結仍支援 `http`、`https`、`mailto` 與 `tel`。

## 已刪除項目

若連結指向的任務或專案已刪除：

- 如水會以刪除線顯示標籤。
- 若已刪除項目的刪除標記仍存在本機資料中，桌面版會顯示**還原**動作。
- 若刪除標記也已消失，連結會保留為無法互動的已刪除標籤。

## 範例

```md
Prepare launch notes for [[project:project-123|Website launch]]

- [ ] Draft intro copy
- [ ] Review [[task:task-456|homepage checklist]]
```

## 相關文件

- [Obsidian 整合](/zh-Hant/power-users/obsidian)
- [核心 API](/zh-Hant/developers/core-api)
