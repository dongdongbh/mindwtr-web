# Obsidian 整合

Mindwtr 桌面版可從 Obsidian vault 匯入任務，在檔案變更時保持更新、回到 Obsidian 開啟來源筆記，並對受支援的任務格式進行嚴格限定範圍的回寫。

相關頁面：[Markdown 連結](/zh-Hant/use/markdown-links)

## 目前範圍

目前桌面版的 Obsidian 支援包括：

- 僅限桌面版
- 自動監看檔案並增量更新
- 以手動重新掃描作為替代方式
- 使用 `obsidian://` 深層連結回到來源筆記
- 對受支援任務格式提供有限的回寫功能
- 支援標準行內 Markdown 任務
- 支援 Mindwtr 的內部 Markdown 任務／專案參照
- 支援 TaskNotes 檔案

不在範圍內：

- 行動版 vault 存取
- 將 Obsidian 當成 Mindwtr 同步後端
- 大幅重寫或重整筆記
- 將 Dataview 當成核心任務格式
- 完整的 Obsidian plugin

## 設計理念

Obsidian 整合是以檔案為基礎的外部整合，而不是新的 Mindwtr 同步後端。

Mindwtr 的同步引擎以 `data.json` 為中心，而 Obsidian 以筆記為中心。為避免破壞性衝突及意外編輯，Mindwtr 會直接讀取 vault 檔案，並刻意嚴格限制寫入權限。

## 設定

在桌面版中：

1. 開啟**設定 -> 整合**
2. 找到 **Obsidian Vault**
3. 選擇 vault 資料夾。在 Obsidian 中註冊的 vault 會自動偵測並提供一鍵選取；其他位置仍可手動瀏覽
4. 啟用整合
5. 也可將掃描範圍限制在特定資料夾
6. 也可設定行內收集箱檔案，預設為 `Mindwtr/Inbox.md`
7. 也可選擇是否包含已封存的 TaskNotes 檔案
8. 也可選擇新任務格式：`auto`、`inline` 或 `tasknotes`
9. 儲存，並執行一次**重新掃描 vault**

初次掃描後，Mindwtr 會監看 vault，並自動更新變更過的檔案。若監看程式漏掉事件，或同步資料夾更新緩慢，手動重新掃描按鈕仍可作為復原方式。

若所選資料夾不含 `.obsidian/` 目錄，Mindwtr 會顯示警告，但仍允許儲存該路徑。

## 支援的任務格式

### 行內 Markdown 任務

若掃描範圍不含 TaskNotes 檔案，Mindwtr 會匯入標準 Markdown 核取方塊：

```md
- [ ] Incomplete task
- [x] Completed task
```

Mindwtr 會保留：

- 巢狀任務縮排
- `#work` 或 `#project/alpha` 等行內標籤
- `[[Meeting Notes]]` 等 wiki-links
- 筆記層級的 YAML frontmatter 標籤

匯入的行內任務會顯示：

- 任務文字
- 完成狀態
- 來源筆記路徑及行號
- **在 Obsidian 中開啟**動作

### TaskNotes

Mindwtr 也支援 [TaskNotes](https://tasknotes.dev/)，它以一項任務一份 Markdown 檔案的方式儲存任務，並使用 YAML frontmatter。

範例：

```md
---
tags:
  - task
title: Review quarterly report
status: in-progress
priority: high
due: 2025-01-15
scheduled: 2025-01-14
contexts:
  - "@office"
projects:
  - "[[Q1 Planning]]"
timeEstimate: 120
---
## Notes
Key points to review
```

在掃描範圍中偵測到 TaskNotes 檔案時，Mindwtr 會將 TaskNotes 視為匯入 Obsidian 任務的資料來源，且**不會**同時匯入其他筆記中的任意行內檢查清單。這可避免 TaskNotes 使用者的一般檢查清單被轉為任務。

Mindwtr 目前會匯入下列 TaskNotes 欄位：

- 標題
- 狀態／完成狀態
- 優先順序
- 截止日期及預定日期
- 標籤
- 情境
- 專案
- 預估時間
- 簡短內文預覽

Mindwtr 會略過 TaskNotes 檢視／組態檔案；除非你在設定中啟用，否則預設隱藏已封存的 TaskNotes 檔案。

## 檔案監看與更新

Mindwtr 會在桌面版監看已設定的 vault，只重新解析變更過的 Markdown 檔案，不會每次都重新掃描整個 vault。

這表示：

- 在 Obsidian 中所做的編輯會自動顯示在 Mindwtr 中
- 刪除來源檔案會移除其匯入任務
- 重新命名檔案等同於刪除後再建立
- 快速連續儲存會先批次處理再更新

若變更跨越行內格式與 TaskNotes 的界線，Mindwtr 會退回完整重新掃描，使匯入模式保持一致。

## 回寫行為

回寫功能刻意受到嚴格限制。

### 行內任務

在 Mindwtr 中切換匯入的 Obsidian 行內任務時，Mindwtr 只會更新該任務所在行的核取方塊標記：

- `- [ ]` -> `- [x]`
- `- [x]` -> `- [ ]`

Mindwtr 不會重寫筆記的其他部分。若儲存的行號已過時，則會改為比對檔案中的任務文字。若有多個相符項目，操作會安全地失敗。

### TaskNotes 任務

在 Mindwtr 中切換匯入的 TaskNotes 任務時，Mindwtr 會更新 frontmatter 狀態，而不編輯筆記內文。它也可能在同一項安全寫入操作中加入或移除 `completedDate`。

Mindwtr 不會重新格式化整份檔案，也不會重寫無關欄位。

### 建立新任務

可用兩種方式建立新的 Obsidian 任務：

- `inline`：在設定的收集箱筆記附加新的 `- [ ] ...` 行
- `tasknotes`：建立新的 TaskNotes Markdown 檔案
- `auto`：依照 vault 偵測到的匯入模式

這能讓建立方式與現有格式一致。

## 略過的內容

Mindwtr 會略過：

- `.obsidian/`
- `.trash/`
- 隱藏檔案／資料夾
- `node_modules/`
- 異常龐大的 Markdown 檔案
- TaskNotes 檢視／組態檔案

## 深層連結

Mindwtr 使用 Obsidian 的 URI scheme 開啟來源筆記：

```text
obsidian://open?vault=VAULT_NAME&file=RELATIVE_PATH_WITHOUT_MD
```

因此不必手動複製檔案路徑，也能在 Obsidian 中檢視相關內容。

## 目前限制

- 僅限桌面版
- 尚未解析 `[due:: ...]` 等 Dataview 風格行內欄位
- 以監看程式為基礎的更新方式，仍保留手動重新掃描作為替代方案
- 若存在 TaskNotes 檔案，Mindwtr 會刻意停止匯入該掃描範圍內的一般行內檢查清單

## 後續規劃

- 選用的 Dataview 相容性
- 評估行動版可行性
- 可能在另一個儲存庫中建立 Obsidian plugin

## 另請參閱

- [資料與同步](/zh-Hant/data-sync/)
- [行事曆整合](/zh-Hant/use/calendar-integration)
