# 匯入 OmniFocus

如水可匯入 OmniFocus 匯出資料，讓你無須手動重建系統即可遷移。

## 支援的來源檔案

- OmniFocus **CSV** 匯出檔
- OmniFocus **CSV UTF-16** 匯出檔
- 含有 `OmniFocus.json` 與 `metadata.json` 的 Omni Automation / Shortcuts **ZIP** 封存檔
- 當你的捷徑已將任務資料與中繼資料合併至單一文件時，可使用單一 **JSON** 檔案

桌面版與行動版皆可從**設定 → 資料 → 從 OmniFocus 匯入**進行匯入。

## 建議的來源格式

如果只需要基本的任務遷移，OmniFocus CSV 仍可使用。

如果希望獲得最佳的資料保真度，請優先使用 Omni Automation JSON 匯出，而非 CSV。相較於 OmniFocus CSV 所提供的資料，JSON 路徑可以保留重複規則、資料夾中繼資料與更多階層細節。

針對以捷徑匯出的資料，最佳輸入格式是包含以下檔案的 ZIP：

- `OmniFocus.json`
- `metadata.json`

如水可透過同一個匯入動作自動偵測 CSV、JSON 與 ZIP 檔案。

## 如水如何對應 OmniFocus 資料

如水以 GTD 優先的原則，將 OmniFocus 匯出資料對應至如水的模型：

- 有中繼資料時，OmniFocus 資料夾會成為**如水領域**
- OmniFocus 專案會成為**如水專案**
- OmniFocus 獨立行動會保留在專案之外，讓你稍後處理
- OmniFocus 標籤會成為**如水標籤**
- 當來源格式包含情境時，OmniFocus 情境會成為**如水情境**
- OmniFocus 筆記會保留在匯入後的描述中
- OmniFocus 延後日期會成為**開始日期**
- 受支援的截止日期與完成狀態會予以保留
- OmniFocus 旗標會成為**高優先順序提示**
- 簡單的單層巢狀任務可成為**檢查清單項目**
- 較複雜或更深層的巢狀任務會攤平成一般任務，並在標題與描述中保留原始階層
- 受支援時，Omni Automation 重複規則會對應至**如水重複規則**

如水目前沒有獨立的 OmniFocus 式預定日期欄位。當 OmniFocus 包含預定日期或工期文字時，如水會將該資訊保留在匯入後的描述中，而不會捨棄。

## 支援的 OmniFocus 資料

- 有中繼資料時的資料夾名稱
- 專案名稱
- 行動標題
- 筆記
- 標籤
- 匯出資料包含的情境
- 延後／開始日期
- 截止日期
- 可取得時的完成狀態與完成日期
- 以高優先順序提示表示的旗標狀態
- Omni Automation JSON 匯出資料中的受支援重複規則
- 簡單巢狀任務的檢查清單轉換

## 匯入步驟

1. 開啟**從 OmniFocus 匯入**
2. 從 OmniFocus 匯出資料：
   - 如果只需要內建匯出，請使用 **CSV**
   - 如果需要重複規則、資料夾與更完整的階層保真度，請使用 **Omni Automation / Shortcuts JSON**
3. 如果你的捷徑分別產生 `OmniFocus.json` 與 `metadata.json`，請將兩個檔案放入同一個 ZIP 封存檔
4. 在如水中選擇 CSV、JSON 或 ZIP 檔案
5. 檢查預覽摘要
6. 確認匯入

如水會在匯入前儲存復原快照，讓你可在需要時回復。

## 目前限制

- 無法直接匯入 OmniFocus 原生 `.ofocus` 資料庫
- 不匯入 HTML 與純文字匯出檔
- 相較於 Omni Automation JSON 匯出，CSV 匯出仍會損失較多資訊，尤其是重複規則與巢狀結構
- 預定日期與工期值會保留為描述文字，而不會對應至專用欄位
- 具有自身日期、筆記、標籤或重複規則的巢狀任務會攤平，而不會轉換成檢查清單項目
- 如果只匯入 `OmniFocus.json` 而沒有相符的中繼資料，可能會缺少部分標籤、資料夾或專案中繼資料

## 提示

- 如果想先驗證對應結果，請從較小的 OmniFocus 匯出檔開始
- 如果使用以捷徑為基礎的匯出方式，請將 `OmniFocus.json` 與 `metadata.json` 一併放在同一個 ZIP 中，以獲得最完整的匯入結果
- 如果同時有專案行動與獨立收集箱行動，如水會保留這項區分
- 如果重複規則很重要，請優先使用 Omni Automation JSON / ZIP 路徑，而非 CSV
- 如果大量使用 OmniFocus 旗標，請檢查匯入後的高優先順序任務
- 確認匯入結果符合預期前，請保留復原快照
