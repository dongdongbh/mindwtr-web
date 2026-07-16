# AI 助手（BYOK）

Mindwtr 提供可选的 AI 助手，用于明确任务、拆解任务和检查长期未更新的事项。该功能**默认关闭**，并采用**自备密钥（BYOK）**模式。

## 隐私模式

- **本地优先：**数据保留在你的设备上。
- **按需请求：**只有在你点按 AI 操作或启用 Copilot 建议时才会发送请求。
- **范围受限：**助手只会接收完成操作所需的任务数据。

## 支持的服务提供方

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

在**设置 → AI 助手**中配置：

- 启用/禁用 AI
- 服务提供方
- 模型
- 可选的自定义 OpenAI 兼容基础 URL
- API 密钥（仅存储在本地）
- 推理强度/思考预算（取决于服务提供方）
- Claude/Gemini 可选的**“启用思考”**开关（增加扩展推理）

## OpenAI 兼容端点（本地或托管）

Mindwtr 可以连接任何提供 **OpenAI 兼容 Chat Completions API** 的服务，包括本地服务器和部分托管服务提供方。

以下情况可使用此设置：

- **官方 OpenAI：**将**自定义基础 URL**留空，并使用你的 OpenAI API 密钥。
- **本地服务器：**llama.cpp、Ollama、LM Studio、LocalAI、vLLM 等。
- **托管的 OpenAI 兼容服务：**例如 GLM，或其他提供 OpenAI 兼容端点的厂商。

1. 如有需要，启动 OpenAI 兼容端点或取得其访问权限。
2. 在**设置 → AI 助手**中：
   - 将**服务提供方**设为 **OpenAI**
   - 将**模型**设为该服务公开的模型名称
   - 将**自定义基础 URL**设为服务的基础 URL
   - 如果服务要求 bearer auth，请输入 **API 密钥**
3. 只有使用官方 OpenAI 时，才将**自定义基础 URL**留空。
4. 只有自定义端点允许未认证请求时，才将 **API 密钥**留空。

Mindwtr 会自动附加 `/chat/completions`，因此应使用服务提供方的基础 URL，而不是完整的 chat-completions 路径，除非该服务明确要求完整路径。

常用基础 URL：

- **llama.cpp**：`http://localhost:8080/v1`
- **Ollama**：`http://localhost:11434/v1`
- **LM Studio**：`http://localhost:1234/v1`
- **LocalAI / vLLM**：`http://localhost:8080/v1`

GLM 类托管端点示例：

- **服务提供方**：`OpenAI`
- **模型**：服务提供方公开的 GLM 模型 ID，例如 `GLM-4.7`
- **自定义基础 URL**：服务提供方的 OpenAI 兼容基础 URL
- **API 密钥**：服务提供方要求时填写其密钥

## 功能

### 明确

把含糊的任务转化为具体的下一步行动，并建议情境/标签。

### 拆解

为大型任务生成简短的后续步骤检查清单，由你选择要应用的内容。

### 回顾分析

每周回顾期间，助手可以标出长期未更新的任务，并建议如下操作：

- 移至将来/也许
- 归档
- 拆解
- 保留

### Copilot 建议

（仅在收集箱和专注视图中可用）

输入时，Mindwtr 可以建议：

- 情境
- 标签
- 时间预估

Copilot 未经你批准绝不会应用更改。

### 语音转文字

将语音笔记转录为任务。

- **离线（Whisper）：**下载模型（Tiny 约 75MB，Base 约 150MB），完全离线转录。
- **云端（OpenAI/Gemini）：**使用你的 API 密钥获得高准确度转录。
- **模式：**
  - **智能解析：**从自然语音中提取截止日期、项目和优先级（例如“明天买牛奶，优先级高”）。
  - **仅转录：**只生成文字。

## 说明

- AI 是**可选功能**。Mindwtr 无需 AI 也能完整工作。
- 响应会按结构化 JSON 解析；如果解析失败，不会应用任何更改。

## Whisper 语言代码

使用 Whisper 离线模型时，可以在“设置 → AI 助手 → 音频语言”中明确设置语言代码。
语言列表请参阅 [Whisper language list](https://whisper-api.com/docs/languages/)。
