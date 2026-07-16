# AI 助理（BYOK）

如水內建選用的 AI 助理，可協助釐清任務、拆解任務，並檢視過時項目。此功能**預設關閉**，採用**自備金鑰（BYOK）**模式。

## 隱私權模式

- **在地優先**：資料留在你的裝置上。
- **隨選執行**：只有在你點選 AI 動作或啟用 Copilot 建議時，才會送出要求。
- **限定範圍**：助理只會收到所需的任務資料。

## 支援的服務供應商

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

請在**設定 → AI 助理**中設定：

- 啟用／停用 AI
- 服務供應商
- 模型
- 選用的自訂 OpenAI 相容 base URL
- API key（僅儲存在本機）
- 推理強度／思考額度（依服務供應商而定）
- Claude／Gemini 選用的**「啟用思考」**開關（加入延伸推理）

## OpenAI 相容端點（本機或託管）

如水可連接任何公開 **OpenAI 相容 Chat Completions API** 的服務，包括本機伺服器及部分託管服務供應商。

以下情況可使用這項設定：

- **官方 OpenAI**：將**自訂 base URL** 留空，並使用你的 OpenAI API key。
- **本機伺服器**：llama.cpp、Ollama、LM Studio、LocalAI、vLLM 及類似服務。
- **OpenAI 相容託管服務供應商**：例如 GLM，或其他公開 OpenAI 相容端點的供應商。

1. 視需要啟動 OpenAI 相容端點，或取得其存取權。
2. 在**設定 → AI 助理**中：
   - 將**服務供應商**設為 **OpenAI**
   - 將**模型**設為該服務公開的模型名稱
   - 將**自訂 base URL** 設為該服務的 base URL
   - 若服務要求 bearer auth，請輸入 **API key**
3. 只有使用官方 OpenAI 時，才將**自訂 base URL** 留空。
4. 只有自訂端點允許未經驗證的要求時，才將 **API key** 留空。

如水會自動附加 `/chat/completions`，因此除非服務要求完整路徑，否則請使用供應商的 base URL，而非完整的 chat-completions 路徑。

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
（僅適用於收集箱及專注檢視）

輸入內容時，如水可建議：
- 情境
- 標籤
- 預估時間

Copilot 絕不會在未經你核准的情況下套用變更。

### 語音轉文字

將語音筆記轉錄為任務。

- **離線（Whisper）**：下載模型（Tiny 約 75MB、Base 約 150MB），即可完全離線轉錄。
- **雲端（OpenAI/Gemini）**：使用你的 API key 進行高準確度轉錄。
- **模式**：
  - **智慧解析**：從自然口語中擷取截止日期、專案及優先順序（例如「Buy milk tomorrow priority high」）。
  - **僅轉錄**：只產生文字。

## 注意事項

- AI 是**選用功能**。如水不使用 AI 也能運作。
- 回應會解析為結構化 JSON；若解析失敗，不會套用任何變更。
## Whisper 語言代碼

若使用 Whisper 離線模型，可在設定 → AI 助理 → 音訊語言中指定語言代碼。
語言清單請參閱：[Whisper language list](https://whisper-api.com/docs/languages/)。
