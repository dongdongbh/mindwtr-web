# 從其他應用程式匯入資料

本指南說明如何將其他任務管理工具中的任務移入 Mindwtr。這適用於完整遷移，而非快速收集單一項目。

## 匯入前的準備

遷移正是拋開陳年雜務的好時機。若先前的應用程式中有數百項過時任務，建議只移入目前的專案、仍在進行的下一步行動，以及可信賴的參考項目。

Mindwtr 可以匯入受支援應用程式的完整匯出檔，但經過篩選、規模較小的遷移，通常比把所有舊任務複製到新系統更符合 GTD。

## 可用的匯入工具

對於匯出格式結構清楚、能安全對應資料的少數應用程式，Mindwtr 提供完整支援的匯入工具：

- [匯入 TickTick](/zh-Hant/import/ticktick) - TickTick 的 CSV 或 ZIP 備份
- [匯入 Todoist](/zh-Hant/import/todoist) - CSV 匯出檔或 ZIP 備份
- [匯入 DGT GTD](/zh-Hant/import/dgt-gtd) - JSON 匯出檔或 ZIP 備份
- [匯入 OmniFocus](/zh-Hant/import/omnifocus) - CSV、JSON 或 ZIP 匯出檔
- [匯入 Apple 提醒事項](/zh-Hant/data-sync/#apple-提醒事項匯入-ios) - 僅限 iOS，可從所選的「提醒事項」清單匯入未完成的提醒事項

開啟**設定 → 資料**，選擇相應的匯入動作。Mindwtr 會在新增任何內容前顯示預覽。

若清單中有你原本使用的應用程式，原生匯入工具就是最佳選擇。它們能比純文字保留更多結構，也能處理來源匯出檔所提供的應用程式特有資訊，例如資料夾、清單、標籤、日期、檢查清單與重複規則。

## 匯入保真度概覽

以下範圍於 2026 年 7 月 21 日依據 Mindwtr 提交 [18b11a6](https://github.com/dongdongbh/Mindwtr/commit/18b11a6814fbde064df627fcaf63143c4279bd5b) 的匯入程式碼核對。匯入測試資料涵蓋 Todoist CSV 與 ZIP、TickTick 7.1 CSV 與 ZIP、DGT 第 3 版結構的 JSON 與 ZIP，以及 OmniFocus CSV、UTF-16 CSV、JSON 與 ZIP。匯出格式可能改變，請在確認前查看預覽和對應的應用程式指南。

| 來源 | 最佳輸入 | Mindwtr 會保留 | 匯入後檢查 |
| --- | --- | --- | --- |
| [TickTick](/zh-Hant/import/ticktick) | CSV 或 ZIP 備份 | 資料夾轉為領域、清單轉為專案，以及標籤、優先順序、日期、檢查清單、完成狀態和受支援的重複規則 | 附件、顯示細節、警告，以及父子任務對應 |
| [Todoist](/zh-Hant/import/todoist) | CSV 或 ZIP 備份 | 專案、分段、進行中的任務、描述和留言、優先順序、截止日期、標籤，以及轉為檢查項目的子任務 | 重複規則會連同原文只匯入一次；還應檢查略過或損壞的列 |
| [DGT GTD](/zh-Hant/import/dgt-gtd) | JSON 或 ZIP 備份 | 資料夾轉為領域，以及專案、情境、標籤、檢查清單、優先順序、截止日期、完成狀態和受支援的重複規則 | 不受支援的重複規則和略過的壓縮檔項目 |
| [OmniFocus](/zh-Hant/import/omnifocus) | Omni Automation JSON 或 ZIP 保真度最佳；亦支援 CSV | 資料夾轉為領域，以及專案、標籤、情境、筆記、日期、完成狀態、簡單巢狀結構和受支援的重複規則 | 深層巢狀結構、計畫日期和時長文字，以及 CSV 特有的損失 |
| [Apple 提醒事項](/zh-Hant/data-sync/#apple-提醒事項匯入-ios) | iOS 上選定的清單 | 未完成提醒事項的標題和備註 | 日期和其他欄位、略過的項目，以及是否刪除來源的選項 |

## 驗證或回復

1. 保留原始匯出檔，並在匯入前建立一份新的 [Mindwtr 備份](/zh-Hant/data-sync/backup-restore)。
2. 檢查預覽中的數量和警告。如果專案或任務總數不對，請取消匯入。
3. 匯入後，將一個專案和幾項具代表性的任務與來源比較。檢查標題、專案或狀態、日期、標籤或情境、筆記、檢查清單和重複規則。
4. 如果對應不正確，請從**設定 → 同步 → 復原快照**還原，調整來源匯出檔後重試。部分匯入工具重複匯入同一個檔案時可能產生重複任務。

## 其他遷移方式

若清單中沒有你的應用程式，請使用以下替代方式。這些方式刻意比原生匯入工具簡單，適合處理匯出純文字、CSV 或 JSON 的眾多其他應用程式。

### 複製與貼上

最快的替代方式，是複製任務清單並貼到快速新增／快速收集。

Mindwtr 會依空白行判斷整段文字是一項任務或一批任務：

- 只要貼上的內容包含空白行，Mindwtr 就會把整段內容保留為一項任務，並將所有非空白行合併成一個標題。
- 如果沒有空白行，每個非空白行會各自建立為一項任務。

桌面版：

1. 開啟快速新增。
2. 在任務欄位貼上多行文字。
3. 如果 Mindwtr 偵測到多項任務，請確認**建立任務**。

行動版：

1. 開啟快速收集。
2. 在任務欄位貼上多行文字。
3. 點選儲存；如果 Mindwtr 偵測到多項任務，再確認批次建立。

批次建立時，每一行都會依 Mindwtr 的快速新增語法解析，因此可直接在行內加入中繼資料：

```text
Email Bob about Q3 report +Work @computer #followup /due:friday
Book dentist appointment @phone
Outline conference talk +Speaking #ideas /note:Draft the rough structure first
```

這不會重建深層階層或重複規則，但通常是移入仍然重要之任務最乾淨的方式。

### 純文字

若原本的應用程式可匯出 `.txt` 檔案，請從 Mindwtr 的收集介面使用文字匯入功能。

桌面版：

1. 開啟快速新增。
2. 按一下**匯入 .txt**。
3. 選擇純文字檔案。
4. 確認批次建立提示。

行動版：

1. 開啟快速收集。
2. 點選**更多**。
3. 點選**匯入 .txt**。
4. 選擇純文字檔案。
5. 確認批次建立提示。

每行放一項任務。若希望 Mindwtr 在匯入時設定中繼資料，請在同一行加入快速新增符記：

```text
Pay water bill +Home /due:2026-07-01
Renew passport +Personal @errands #admin
Send slides to Ana +Work /note:Use the final deck from the shared folder
```

Mindwtr 使用 `/note:` 等明確的快速新增命令，而不是隱藏的 Tab 字元筆記格式。這讓文字檔在匯入前仍容易閱讀，並採用與一般收集相同的解析器。

### 將 CSV 轉成快速新增文字的指令碼

若應用程式可匯出 CSV，但 Mindwtr 沒有相應的原生匯入工具，可將 CSV 轉成純文字快速新增檔，再匯入該 `.txt` 檔案。

Mindwtr 提供一個無相依套件的小型輔助指令碼：

```bash
node scripts/migration/csv-to-quickadd-text.mjs export.csv \
  --output mindwtr-import.txt \
  --title "Title" \
  --project "Project" \
  --tags "Tags" \
  --contexts "Contexts" \
  --due "Due" \
  --note "Note"
```

指令碼會為每一列 CSV 寫入一行快速新增文字。它可以對應：

- 將標題欄轉為任務標題
- 將專案／清單欄轉為 `+Project`
- 將以逗號或分號分隔的標籤轉為 `#tag`
- 將以逗號或分號分隔的情境轉為 `@context`
- 將截止日期欄轉為 `/due:...`
- 將筆記欄轉為 `/note:...`

若 CSV 使用不同的欄名，請透過上述選項傳入那些名稱。例如：

```bash
node scripts/migration/csv-to-quickadd-text.mjs tasks.csv \
  --output mindwtr-import.txt \
  --title "Task" \
  --project "List" \
  --tags "Categories" \
  --due "Due Date" \
  --note "Notes"
```

此指令碼只是起點，並非正式支援的特定應用程式匯入工具。除非自行調整，否則它無法保留巢狀任務、附件、重複規則或應用程式特有欄位。

### CLI、本機 API 與 MCP

技術使用者可以針對 Mindwtr 的自動化介面編寫自己的匯入工具：

- [本機 API](/zh-Hant/power-users/local-api)
- [MCP 伺服器](/zh-Hant/power-users/mcp)
- 在儲存庫簽出版本中執行 `bun run mindwtr:cli -- --help`

若原本的應用程式可匯出結構化 JSON 或 CSV，而你需要比純文字更大的控制彈性，請使用這種方式。這些工具會經由 Mindwtr 的一般資料模型運作，但自訂遷移指令碼需由你自行維護。

## 若清單中沒有你的應用程式

請依下列順序處理：

1. 確認應用程式能否匯出為 Mindwtr 已支援匯入的格式。
2. 對仍需使用的有效任務，嘗試複製／貼上或純文字方式。
3. 若應用程式匯出的是簡易試算表，請使用 CSV 輔助指令碼。
4. 若需要自訂結構化遷移，請使用本機 API、CLI 或 MCP。

若希望特定應用程式獲得原生匯入支援，請開啟 GitHub Discussion 或 issue，並提供：

- 應用程式名稱
- 它所提供的匯出格式
- 一份經過遮蔽的小型匯出範例
- 最需要保留的欄位

原生匯入工具會依需求量，以及來源格式能否清楚對應至 Mindwtr 的 GTD 模型來排定優先順序。
