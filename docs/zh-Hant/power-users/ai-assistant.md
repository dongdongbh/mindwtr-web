# AI 助理（BYOK）

Mindwtr 內建選用的 AI 助理，可協助釐清任務、拆解任務，並檢視過時項目。此功能**預設關閉**，採用**自備金鑰（BYOK）**模式。

## 隱私權模式

- **本機優先儲存**：任務資料庫儲存在你的裝置上。使用選用的 AI 供應商時，該要求所需的任務內容會傳送給你選擇的供應商。
- **隨選執行**：只有在你點選 AI 動作或啟用 Copilot 建議時，才會送出要求。在已設定金鑰的情況下開啟 AI 設定時，也會向你的服務商查詢最新的模型清單，讓模型選擇器保持最新——該要求不包含任何任務資料。
- **限定範圍**：助理只會收到所需的任務資料。

## 支援的服務供應商

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

請在桌面版的**設定 → AI 助理**或行動版的**選單 → 設定 → 進階 → AI 助理**中設定：

- 啟用／停用 AI
- 服務供應商
- 模型
- 選用的自訂 OpenAI 相容 base URL
- API key（僅儲存在本機）
- 推理強度／思考額度（依服務供應商而定）
- Claude／Gemini 選用的**「啟用思考」**開關（加入延伸推理）

## OpenAI 相容端點（本機或託管）

Mindwtr 可連接任何公開 **OpenAI 相容 Chat Completions API** 的服務，包括本機伺服器及部分託管服務供應商。

以下情況可使用這項設定：

- **官方 OpenAI**：將**自訂 base URL** 留空，並使用你的 OpenAI API key。
- **本機伺服器**：llama.cpp、Ollama、LM Studio、LocalAI、vLLM 及類似服務。
- **OpenAI 相容託管服務供應商**：例如 xAI（Grok）、GLM，或其他公開 OpenAI 相容端點的供應商。

1. 視需要啟動 OpenAI 相容端點，或取得其存取權。
2. 在桌面版的**設定 → AI 助理**或行動版的**選單 → 設定 → 進階 → AI 助理**中：
   - 將**服務供應商**設為 **OpenAI**
   - 將**模型**設為該服務公開的模型名稱
   - 將**自訂 base URL** 設為該服務的 base URL
   - 若服務要求 bearer auth，請輸入 **API key**
3. 只有使用官方 OpenAI 時，才將**自訂 base URL** 留空。
4. 只有自訂端點允許未經驗證的要求時，才將 **API key** 留空。

Mindwtr 會自動附加 `/chat/completions`，因此除非服務要求完整路徑，否則請使用供應商的 base URL，而非完整的 chat-completions 路徑。

常見 base URL：
- **llama.cpp**：`http://localhost:8080/v1`
- **Ollama**：`http://localhost:11434/v1`
- **LM Studio**：`http://localhost:1234/v1`
- **LocalAI / vLLM**：`http://localhost:8080/v1`

GLM 類託管端點範例：

- **服務供應商**：`OpenAI`
- **模型**：供應商公開的 GLM 模型 id，例如 `GLM-4.7`
- **自訂 base URL**：供應商的 OpenAI 相容 base URL
- **API key**：供應商要求時使用其金鑰

xAI（Grok）範例：

- **服務供應商**：`OpenAI`
- **模型**：xAI 模型清單中的 Grok 模型 id，例如 `grok-4.6`
- **自訂 base URL**：`https://api.x.ai/v1`
- **API key**：你的 xAI API key

## 慢速模型與請求逾時

在桌面版或行動版的 AI 助理設定中開啟**進階 → 請求逾時**，可選擇 **30、60、120 或 300 秒**，預設仍為 30 秒。使用較慢的本機模型時，可先嘗試 120 秒。

此限制適用於 AI 助理與 Copilot 的回應，不影響語音轉錄或模型清單擷取。逾時或取消的請求不會自動重試；暫時的網路或伺服器錯誤仍可能進行有限次數的重試。逾時設定會遵循現有的 AI 設定同步選項。

### 讓本機模型產生更短的回應

延長逾時只會給模型更多時間，並不會減少產生的內容。有些模型會先消耗 token 進行思考，再輸出你看到的簡短答案。

選擇**供應商 → OpenAI**，在 AI 助理設定中開啟**額外請求參數**，貼上 JSON 物件並儲存參數。Mindwtr 會將這些欄位直接合併到 AI 助理與 Copilot 的請求中，不要再用 `extra_body` 包住。`model`、`messages` 和 `response_format` 仍由 Mindwtr 控制。

對於**使用 llama.cpp，且聊天範本支援關閉思考的 Qwen 模型**，可以從以下設定開始嘗試：

```json
{
  "max_tokens": 512,
  "chat_template_kwargs": {
    "enable_thinking": false
  }
}
```

巢狀的思考參數遵循 [llama.cpp 伺服器文件](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)。其他伺服器可能需要不同欄位或伺服器端設定；頂層的 `enable_thinking` 與此物件不能互換。請核對伺服器版本和模型範本。

- **512 是初始上限，不是目標值。** 如果回應被截斷或 Mindwtr 無法解析，可以嘗試 1024 或移除上限。回顧分析可能比簡短的任務拆解需要更多空間。
- **每次只改一個設定。** 先針對同一任務比較關閉思考後的表現，再調整上限。降低 `temperature` 會改變取樣方式，並不限制長度。
- **如果仍然逾時**，可以嘗試更小的模型或 300 秒。清空額外參數並儲存，即可恢復 Mindwtr 的預設請求設定。

[HeikoMarkgraf 在討論 #1188 中分享了可用的 Qwen3.5-4B 設定](https://github.com/dongdongbh/Mindwtr/discussions/1188#discussioncomment-18448971)，回報建議功能約耗時 6.45 秒，任務拆解約耗時 37 秒。這是該環境下的社群回饋，並非對上方精簡範例的效能測試。討論中保留了完整設定；其中一些欄位可能只適用於該伺服器，或被其他伺服器忽略。

## 功能

### 釐清
將模糊任務轉為具體的下一步行動，並建議情境／標籤。

### 拆解
為大型任務產生簡短的後續步驟檢查清單，由你選擇要套用的內容。

### 回顧分析
每週回顧期間，助理可標示過時任務，並建議下列動作：
- 移至將來／也許
- 封存
- 拆解
- 保留

### Copilot 建議
（可在任務編輯器、桌面清單的快速新增列以及行動裝置的快速收集中使用）

輸入內容時，Mindwtr 可建議：
- 情境
- 標籤
- 預估時間

Copilot 絕不會在未經你核准的情況下套用變更。

### 語音轉文字

將語音筆記轉錄為任務。

- **離線（Whisper）**：下載模型（Tiny 約 75MB、Base 約 150MB），即可完全離線轉錄。
- **雲端（OpenAI/Gemini）**：使用你的 API key 進行高準確度轉錄。
- **自架伺服器（相容 OpenAI）**：在 OpenAI 語音提供者下設定自訂基礎 URL，即可在你自己的伺服器上轉錄，而不經過 api.openai.com。任何提供 OpenAI `/v1/audio/transcriptions` 介面的伺服器都可以（whisper.cpp、Speaches、LocalAI、vLLM）；此時 API 金鑰為選填，模型欄位也接受你伺服器自己的模型名稱。
- **模式**：
  - **智慧解析**：從自然口語中擷取截止日期、專案及優先順序（例如「Buy milk tomorrow priority high」）。
  - **僅轉錄**：只產生文字。

#### 自架伺服器轉錄

將語音提供者設為 OpenAI，然後填入 base URL：你伺服器的根目錄，以 `/v1` 結尾（例如 `http://localhost:8000/v1`）。Mindwtr 會像傳送給 OpenAI 一樣，將錄音傳送到該處的 `/v1/audio/transcriptions`。

- 如果你的伺服器不需要金鑰，可將 API key 留空。
- 模型選擇器會顯示你的伺服器在 `/v1/models` 回報的模型（如果它有回應）；否則會退回建議清單。你隨時可以輸入任何模型名稱——清單並非固定清單。
- 語音伺服器只負責轉錄。**智慧解析**需要語言模型，因此若未設定 AI 助理，擷取內容就會變成以轉錄文字為標題的任務，不會從中擷取日期、專案及優先順序。如需這些功能，請另行設定助理。

## 注意事項

- AI 是**選用功能**。Mindwtr 不使用 AI 也能運作。
- 回應會解析為結構化 JSON；若解析失敗，不會套用任何變更。
## Whisper 語言代碼

若使用 Whisper 離線模型，可在桌面版的**設定 → AI 助理 → 音訊語言**或行動版的**選單 → 設定 → 進階 → AI 助理 → 音訊語言**中指定語言代碼。
語言清單請參閱：[Whisper language list](https://whisper-api.com/docs/languages/)。

## Apple 模型評估（僅限開發版本）

Apple Foundation Models 尚未作為正式版 AI 供應商開放。iOS 開發原型可在符合條件的裝置上提供選用的裝置端 Inbox 釐清。建議始終可編輯，且需明確核准；模型無法使用時不會阻止手動處理，也不會悄悄切換到雲端推論。

單獨啟用的 Private Cloud Compute（PCC）評估工具使用固定的合成範例與裝置端模型進行比較。它不會讀取或上傳你的任務、套用建議或變更同步設定。每次 PCC 請求都需要明確同意，並可能使用網路和 Apple 的每日額度；出錯後不會自動重試雲端或本機推論。

PCC 評估需要 iOS 27 或更新版本、符合條件的裝置，以及正確設定佈建描述檔並簽署的開發版本。團隊獲得 entitlement 權限並不代表某個建置已能發出請求。正式版開放、模型品質和實機驗證仍待完成。請參閱[開發者評估清單](https://github.com/dongdongbh/Mindwtr/blob/main/docs/development/apple-pcc-evaluation.md)。
