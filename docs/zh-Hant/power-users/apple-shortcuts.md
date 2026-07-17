# Apple 捷徑

Mindwtr 透過原生 App Intents，在 iPhone 及 iPad 上支援 Apple 捷徑。第一個版本著重於 GTD 收集循環：快速將未竟事項放入 Mindwtr，再到應用程式內回顧及處理。

這項功能刻意比 Things 成熟的捷徑系統精簡。Things 提供建立、尋找、編輯、顯示，以及自訂項目／清單動作。Mindwtr v1 從收集及導覽開始，以維持可靠性，也避免繞過 Mindwtr 的一般任務建立、修訂及同步流程。

## 可用範圍

包含 Mindwtr App Intents 整合的 iOS 組建可使用 Apple 捷徑支援。

支援的介面：

| 介面 | 支援狀態 |
| --- | --- |
| 「捷徑」app | 是 |
| Siri | 是 |
| Spotlight／建議的捷徑 | 是 |
| 透過動作按鈕執行捷徑 | 是 |
| Apple Watch 直接動作 | 否，v1 不支援 |
| CarPlay | 否，v1 不支援 |

## 動作

### Capture to Mindwtr

使用 **Capture to Mindwtr**，將任務送入 Mindwtr 的收集箱收集確認流程。

參數：

| 參數 | 必要 | 說明 |
| --- | --- | --- |
| Task | 是 | 任務標題。空白標題會遭拒絕。 |
| Note | 否 | 新增為任務描述。 |
| Tags | 否 | 以逗號分隔的標籤。Mindwtr 儲存時會將其正規化為 `#tag`。 |
| Project | 否 | 依標題比對使用中的專案；若沒有相符專案，儲存收集項目時會建立專案。 |

執行時會發生以下情況：

1. 「捷徑」會開啟 Mindwtr。
2. Mindwtr 顯示收集畫面，並填入標題及選用的中繼資料。
3. 你可以檢視收集項目，再透過 Mindwtr 的一般流程儲存。

任務不會直接從 Swift 寫入。這能讓任務建立留在 Mindwtr 既有的 store、SQLite、修訂及同步邏輯內。

### Open Mindwtr List

使用 **Open Mindwtr List** 跳至 GTD 檢視。

支援的目的地：

| 清單 | 開啟位置 |
| --- | --- |
| Inbox | 收集箱 |
| Focus | 專注／下一步行動 |
| Waiting | 等待中 |
| Someday | 將來／也許 |
| Projects | 專案 |
| Review | 回顧 |
| Calendar | 行事曆 |

若未設定清單，捷徑預設開啟收集箱。

### Add to Mindwtr Inbox

使用 **Add to Mindwtr Inbox** 可安靜建立任務，而不開啟 Mindwtr。這適合在「捷徑」的「自動化」中使用。時間、行事曆或位置觸發條件可以在無人操作手機時新增任務。

參數：

| 參數 | 必要 | 說明 |
| --- | --- | --- |
| Task | 是 | 任務標題。空白標題會讓捷徑失敗。 |
| Note | 否 | 新增為任務描述。 |
| Tags | 否 | 以逗號分隔的標籤。Mindwtr 會將其正規化為 `#tag`。 |
| Project | 否 | 依標題比對使用中的專案。未知或已封存的專案會被忽略，任務仍會進入收集箱。 |

**Task** 文字支援完整的[快速新增語法](/zh-Hant/use/mobile#快速新增語法)（`/due:`、`@context`、`#tag`、`+Project` 等）。建立任務時會像 app 內的收集框一樣解析這些語法；**整理快速新增文字**設定決定是否從標題中移除識別到的語法。

執行時會發生以下情況：

1. 動作會將收集項目排入裝置佇列，隨即完成；Mindwtr 維持在背景執行。
2. 下次 Mindwtr 開啟（或回到前景）時，會透過一般 store 及同步流程，在收集箱中建立佇列內的任務。

由於任務會在下次開啟時建立，因此 Mindwtr 再次於該 iPhone 或 iPad 上執行前，任務不會出現在其他同步裝置上，也不會觸發提醒。**Project** 參數絕不會建立新專案；不過在任務文字中寫入 `+Project` 會遵循快速新增規則，可以建立新專案。

### 範例：行事曆觸發的任務

1. 在**捷徑** app 中開啟**自動化**，並建立新的自動化操作。
2. 選擇觸發條件，例如標題含有「garbage collection」的行事曆事件。
3. 新增 Mindwtr 的 **Add to Mindwtr Inbox** 動作，並將 **Task** 設為「Take out the trash」。
4. 將自動化操作設為**立即執行**，使其無須確認。

## 捷徑範例

### 透過語音收集

1. 開啟 Apple 的**捷徑** app。
2. 建立新捷徑。
3. 新增**聽寫文字**或**要求輸入**。
4. 新增 Mindwtr 的 **Capture to Mindwtr** 動作。
5. 將聽寫的文字傳入 **Task**。
6. 也可將 **Tags** 設為類似 `phone,errands` 的值。

這適合在步行、通勤或切換應用程式時快速收集。在某些環境中，Siri 語音辨識仍可能聽錯字詞，因此請先檢視收集內容再儲存。

### 從動作按鈕開啟專注檢視

1. 使用 **Open Mindwtr List** 建立捷徑。
2. 將 **List** 設為 **Focus**。
3. 在 iOS 設定中，將該捷徑指派給動作按鈕。

## URL scheme 替代方式

Mindwtr 也支援 URL scheme 自動化。當其他自動化工具看不到原生 App Intents 時，可使用此方式。

| URL | 動作 |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | 開啟收集畫面並填入標題 |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | 開啟收集畫面並填入標題及筆記 |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | 開啟收集畫面並填入專案及標籤 |
| `mindwtr://open-feature?feature=focus` | 開啟專注檢視 |
| `mindwtr://open-feature?feature=review` | 開啟回顧 |

支援的收集別名：

| 欄位 | 別名 |
| --- | --- |
| Title | `title`, `text`, `name`, `thingName`, `itemListElementName`, `itemListName` |
| Note | `note`, `description`, `body`, `thingDescription`, `itemListDescription` |

## v1 限制

Mindwtr v1 不包含：

- 自訂 AppEntity 任務或清單類型。
- 尋找、編輯、複製、刪除或批次動作。
- 從「捷徑」直接設定重複任務、提醒或日期排程。
- Apple Watch 或 CarPlay 支援。

這些都是適合未來加入的功能，但仍需仔細設計，因為編輯及背景寫入必須維持 Mindwtr 的在地優先同步及 GTD 工作流程規則。

## 相關連結

- [行動版使用指南](/zh-Hant/use/mobile)
- [Mindwtr 的 GTD 工作流程](/zh-Hant/use/gtd-workflow)
- [資料與同步](/zh-Hant/data-sync/)
- [Things: Using Apple Shortcuts](https://culturedcode.com/things/support/articles/2955145/)
- [Things: Shortcuts Actions](https://culturedcode.com/things/support/articles/9596775/)
- [Apple: App Intents overview](https://developer.apple.com/videos/play/wwdc2024/10210/)
