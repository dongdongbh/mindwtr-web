# 開始使用

歡迎使用 Mindwtr！本指南將協助你快速上手。

## 安裝

### 桌面版

| 平台 | 安裝方式 |
| --- | --- |
| **Arch Linux** | 使用預先建置的 AUR 套件 `mindwtr-bin`，或從原始碼建置的 AUR 套件 `mindwtr` |
| **Debian/Ubuntu** | 加入 APT 儲存庫（建議），或從 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載 `.deb` |
| **Fedora/RHEL** | 加入 DNF 儲存庫（建議），或從 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載 `.rpm` |
| **Flatpak** | 從 [Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr) 安裝 |
| **AppImage** | 下載 `.AppImage`、執行 `chmod +x`，再啟動 |
| **Windows** | Microsoft Store、Winget、Chocolatey、Scoop、可攜式 ZIP，或 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 提供的安裝程式 |
| **macOS** | [Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144)、TestFlight 測試版、Homebrew，或 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 提供的 `.dmg` |

詳細說明請參閱[桌面版安裝](/zh-Hant/start/desktop-installation)。

### 行動版

| 平台 | 安裝方式 |
| --- | --- |
| **Android** | Google Play、F-Droid、IzzyOnDroid，或 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 提供的 APK |
| **iOS** | App Store、TestFlight 測試版，或供開發使用的模擬器／自行建置版本 |

詳細說明請參閱[行動版安裝](/zh-Hant/start/mobile-installation)。

想提早試用新組建？請參閱[加入測試版管道](/zh-Hant/start/beta-channels)。

### Docker 與網頁版

若需要可從瀏覽器存取的部署，可用 Docker 執行網頁版（PWA）與自行託管同步伺服器：

- [Docker 部署](/zh-Hant/power-users/docker-deployment)
- [網頁版（PWA）](/zh-Hant/power-users/web-app-pwa)

---

## 第一次啟動

全新安裝時，Mindwtr 會詢問你要從頭開始、匯入備份，或連接同步。設定完成後，預設開啟**專注**檢視，讓今日行事曆項目與下一步行動優先呈現。需要迅速記下一個想法時，隨時將新工作收進**收集箱**。

### 基本工作流程

1. 將所有事情**收集**到收集箱
2. 使用處理精靈逐項**釐清**
3. **整理**至下一步行動、專案或將來/也許
4. 在每週回顧中**回顧**
5. 安心**執行**

---

## 快速新增語法

Mindwtr 支援自然語言快速新增，直接在任務輸入欄中輸入即可。完成專案最後一項行動時出現的「下一步行動是什麼？」提示也支援相同語法（例如以 `/waiting` 結尾，將後續追蹤設為等待中）：

| 語法 | 範例 | 結果 |
| --- | --- | --- |
| `@context` | `Buy milk @errands` | 加入 @errands 情境 |
| `#tag` | `Research topic #creative` | 加入 #creative 標籤 |
| `+Project` | `Call vendor +HomeReno` | 指派至專案 |
| `+Multi Word` | `+New Project Name` | 指派至 "New Project Name" |
| `+"Quoted Name"` | `+"New Project" call Bob` | 引號界定句子中間的多字名稱（領域亦可寫成 `!"Area Name"`） |
| `!Area` | `Plan roadmap !Work` | 指派至領域 |
| `%Person` | `Ask %Jim for the budget /waiting` | 設定「指派給」（委派／等待對象） |
| `%"Full Name"` | `%"Jim Smith" send report` | 引號界定多字人名（已知名稱也可不加引號） |
| `/area:<name>` | `/area:Personal` | 指派至領域（不能有空格） |
| `/start:date` | `Task /start:monday` | 設定開始日期 |
| `/due:date` | `Report /due:friday` | 設定截止日期 |
| `/review:date` | `Task /review:next week` | 設定回顧日期 |
| `/energy:<level>` | `Task /energy:low` | 設定精力程度（`low`、`medium`、`high`） |
| `/note:text` | `Task /note:remember X` | 加入描述 |
| `/status` | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | 設定狀態 |

**日期範例：**

- `/due:today`、`/due:tomorrow`
- `/due:friday`、`/due:next week`
- `/due:in 3 days`、`/due:2025-01-15`
- `/start:tomorrow`、`/review:next week`

絕對日期一律使用固定 ISO 格式 `YYYY-MM-DD`（例如 `/due:2026-03-15`），不受介面語言或日期顯示格式影響。

**跳脫字元**

- 使用反斜線將符號保留為純文字：`\\@`、`\\#`、`\\+`、`\\!`、`\\%`、`\\/`
- 範例：`Call \\@support /due:tomorrow` → 標題會成為 `Call @support`

**Unicode 支援**

- 情境與標籤名稱可包含 Unicode 字母與數字（例如中日韓文字及帶重音字元）。

> **提示：**也可使用**音訊收集**說出任務。在**設定 → AI 助理**中啟用，以語音轉文字並進行智慧解析。

---

## 整理模型

Mindwtr 提供四種不同的分組工具，請各自用在合適的場合：

- **專案：**想要完成、需要多個步驟的成果（例如「推出 v2 網站」）。
- **領域：**沒有終點的持續責任範圍（例如「健康」、「家庭」、「職涯」）。
- **情境：**可在何處／如何執行任務（例如 `@home`、`@phone`、`@errands`）。
- **標籤：**按精力、主題或自訂方式靈活分組（例如 `#focused`、`#lowenergy`）。

實用原則：

- 有明確完成狀態，就用**專案**。
- 是長期生活／工作範圍，就用**領域**。
- 取決於地點／工具／人物，就用**情境**。
- 只想選擇性篩選，就用**標籤**。

---

## 下一步

- 閱讀 [GTD 概覽](/zh-Hant/use/gtd-overview)
- 探索[桌面版使用指南](/zh-Hant/use/desktop)或[行動版使用指南](/zh-Hant/use/mobile)
- 設定[資料與同步](/zh-Hant/data-sync/)
- 啟用 [AI 助理](/zh-Hant/power-users/ai-assistant)（選用）

---

## 需要協助？

- 回報錯誤或尋求協助的最佳位置是 [GitHub issue](https://github.com/dongdongbh/Mindwtr/issues)，方便持續追蹤。
- 已在應用程式中？請使用**設定 → 關於**頁面的**傳送意見回饋**。
- 私人問題可寄信至 [support@mindwtr.app](mailto:support@mindwtr.app)。
- 瀏覽[常見問題](/zh-Hant/start/faq)，或閱讀完整的[Mindwtr 的 GTD 工作流程指南](/zh-Hant/use/gtd-workflow)。
