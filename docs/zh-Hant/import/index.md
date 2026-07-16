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

## 其他遷移方式

若清單中沒有你的應用程式，請使用以下替代方式。這些方式刻意比原生匯入工具簡單，適合處理匯出純文字、CSV 或 JSON 的眾多其他應用程式。

### 複製與貼上

最快的替代方式，是複製任務清單並貼到快速新增／快速收集。

桌面版：

1. 開啟快速新增。
2. 在任務欄位貼上多行文字。
3. 確認**建立任務**。

行動版：

1. 開啟快速收集。
2. 在任務欄位貼上多行文字。
3. 點選儲存，再確認批次建立提示。

每個非空白行都會成為一項任務。每一行都會依 Mindwtr 的快速新增語法解析，因此可直接在行內加入中繼資料：

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
