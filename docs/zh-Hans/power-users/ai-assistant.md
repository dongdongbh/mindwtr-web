# AI 助手（BYOK）

Mindwtr 提供可选的 AI 助手，用于明确任务、拆解任务和检查长期未更新的事项。该功能**默认关闭**，并采用<strong>自备密钥（BYOK）</strong>模式。

## 隐私模式

- **本地优先存储**：任务数据库存储在你的设备上。使用可选 AI 提供商时，该请求所需的任务内容会发送给你选择的提供商。
- **按需请求**：只有在你点按 AI 操作或启用 Copilot 建议时才会发送请求。在配置了密钥的情况下打开 AI 设置时，还会向你的服务商查询最新模型列表，让模型选择器保持最新——该请求不包含任何任务数据。
- **范围受限**：助手只会接收完成操作所需的任务数据。

## 支持的服务提供方

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

在桌面端的**设置 → AI 助手**或移动端的**菜单 → 设置 → 高级 → AI 助手**中配置：

- 启用/禁用 AI
- 服务提供方
- 模型
- 可选的自定义 OpenAI 兼容基础 URL
- API 密钥（仅存储在本地）
- 推理强度/思考预算（取决于服务提供方）
- Claude/Gemini 可选的<strong>“启用思考”</strong>开关（增加扩展推理）

## OpenAI 兼容端点（本地或托管）

Mindwtr 可以连接任何提供 **OpenAI 兼容 Chat Completions API** 的服务，包括本地服务器和部分托管服务提供方。

以下情况可使用此设置：

- **官方 OpenAI**：将**自定义基础 URL**留空，并使用你的 OpenAI API 密钥。
- **本地服务器**：llama.cpp、Ollama、LM Studio、LocalAI、vLLM 等。
- **托管的 OpenAI 兼容服务**：例如 xAI（Grok）、GLM，或其他提供 OpenAI 兼容端点的厂商。

1. 如有需要，启动 OpenAI 兼容端点或取得其访问权限。
2. 在桌面端的**设置 → AI 助手**或移动端的**菜单 → 设置 → 高级 → AI 助手**中：
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

xAI（Grok）示例：

- **服务提供方**：`OpenAI`
- **模型**：xAI 模型列表中的 Grok 模型 ID，例如 `grok-4.6`
- **自定义基础 URL**：`https://api.x.ai/v1`
- **API 密钥**：你的 xAI API 密钥

## 慢速模型与请求超时

在桌面端或移动端的 AI 助手设置中打开**高级 → 请求超时**，可选择 **30、60、120 或 300 秒**，默认仍为 30 秒。使用较慢的本地模型时，可以先尝试 120 秒。

此限制适用于 AI 助手和 Copilot 的响应，不影响语音转写或模型列表获取。超时或取消的请求不会自动重试；临时网络或服务器错误仍可能进行有限次数的重试。超时设置遵循现有的 AI 设置同步选项。

### 让本地模型生成更短的响应

延长超时只会给模型更多时间，并不会减少生成量。有些模型会先消耗 token 进行思考，再输出你看到的简短答案。

选择**提供方 → OpenAI**，在 AI 助手设置中打开**额外请求参数**，粘贴 JSON 对象并保存参数。Mindwtr 会将这些字段直接合并到 AI 助手和 Copilot 的请求中，不要再用 `extra_body` 包裹。`model`、`messages` 和 `response_format` 仍由 Mindwtr 控制。

对于**使用 llama.cpp、且聊天模板支持关闭思考的 Qwen 模型**，可以从以下配置开始尝试：

```json
{
  "max_tokens": 512,
  "chat_template_kwargs": {
    "enable_thinking": false
  }
}
```

嵌套的思考参数遵循 [llama.cpp 服务器文档](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)。其他服务器可能需要不同字段或服务端设置；顶层的 `enable_thinking` 与此对象不能互换。请核对服务器版本和模型模板。

- **512 是初始上限，不是目标值。** 如果响应被截断或 Mindwtr 无法解析，可以尝试 1024 或移除上限。回顾分析可能比简短的任务拆解需要更多空间。
- **每次只改一个设置。** 先对同一任务比较关闭思考后的表现，再调整上限。降低 `temperature` 会改变采样方式，并不限制长度。
- **如果仍然超时**，可以尝试更小的模型或 300 秒。清空额外参数并保存，即可恢复 Mindwtr 的默认请求设置。

[HeikoMarkgraf 在讨论 #1188 中分享了可用的 Qwen3.5-4B 配置](https://github.com/dongdongbh/Mindwtr/discussions/1188#discussioncomment-18448971)，报告建议功能约耗时 6.45 秒，任务拆解约耗时 37 秒。这是该环境下的社区反馈，并非对上方精简示例的性能测试。讨论中保留了完整配置；其中一些字段可能只适用于该服务器，或被其他服务器忽略。

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

（可在任务编辑器、桌面列表的快速添加行以及移动端快速收集中使用）

输入时，Mindwtr 可以建议：

- 情境
- 标签
- 时间预估

Copilot 未经你批准绝不会应用更改。

### 语音转文字

将语音笔记转录为任务。

- **离线（Whisper）**：下载模型（Tiny 约 75MB，Base 约 150MB），完全离线转录。
  模型从 Hugging Face（huggingface.co）下载。如果无法访问该站点（在中国大陆较常见），Mindwtr 会接着尝试镜像站 hf-mirror.com。无论从哪里下载，文件在使用前都会用已知的 SHA-256 校验。如果两者都失败，请换一个网络，或改用云端或自托管的语音服务。
- **云端（OpenAI/Gemini）**：使用你的 API 密钥获得高准确度转录。
- **自托管（兼容 OpenAI）**：在 OpenAI 语音提供方下设置自定义基础 URL，即可在你自己的服务器上转录，而不经过 api.openai.com。任何提供 OpenAI `/v1/audio/transcriptions` 接口的服务器都可以（whisper.cpp、Speaches、LocalAI、vLLM）；此时 API 密钥为可选，模型字段也接受你服务器自己的模型名称。
- **模式：**
  - **智能解析**：从自然语音中提取截止日期、项目和优先级（例如“明天买牛奶，优先级高”）。
  - **仅转录**：只生成文字。

#### 自托管转录

将语音提供方设为 OpenAI，然后填写基础 URL：你服务器的根地址，以 `/v1` 结尾（例如 `http://localhost:8000/v1`）。Mindwtr 会像发送给 OpenAI 一样，将录音发送到该地址下的 `/v1/audio/transcriptions`。

- 如果你的服务器不需要密钥，可将 API 密钥留空。
- 模型选择器会显示你的服务器在 `/v1/models` 报告的模型（如果它有响应）；否则回退到建议列表。你随时可以输入任意模型名称——列表并非固定选项。
- 语音服务器只负责转录。**智能解析**需要语言模型，因此若未配置 AI 助手，捕获内容会变成以转录文字为标题的任务，不会从中提取日期、项目和优先级。如果需要这些功能，请单独配置助手。

## 说明

- AI 是**可选功能**。Mindwtr 无需 AI 也能完整工作。
- 响应会按结构化 JSON 解析；如果解析失败，不会应用任何更改。

## Whisper 语言代码

使用 Whisper 离线模型时，可在桌面端的**设置 → AI 助手 → 音频语言**或移动端的**菜单 → 设置 → 高级 → AI 助手 → 音频语言**中明确设置语言代码。
语言列表请参阅 [Whisper language list](https://whisper-api.com/docs/languages/)。

## Apple 模型评估（仅限开发版本）

Apple Foundation Models 尚未作为正式版 AI 提供商开放。iOS 开发原型可在符合条件的设备上提供可选的端侧 Inbox 澄清。建议始终可编辑，且需明确批准；模型不可用时不会阻止手动处理，也不会静默切换到云端推理。

单独启用的 Private Cloud Compute（PCC）评估工具使用固定的合成示例与端侧模型进行对比。它不会读取或上传你的任务、应用建议或更改同步设置。每次 PCC 请求都需要明确同意，并可能使用网络和 Apple 的每日额度；出错后不会自动重试云端或本地推理。

PCC 评估需要 iOS 27 或更高版本、符合条件的设备，以及正确配置描述文件并签名的开发版本。团队获得 entitlement 权限并不证明某个构建已能发起请求。正式版开放、模型质量和真机验证仍待完成。请参阅[开发者评估清单](https://github.com/dongdongbh/Mindwtr/blob/main/docs/development/apple-pcc-evaluation.md)。
