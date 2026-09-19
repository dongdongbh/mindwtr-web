# AI Assistant (BYOK)

Mindwtr includes an optional AI assistant to help clarify tasks, break them down, and review stale items. It is **off by default** and uses a **bring-your-own-key (BYOK)** model.

## Privacy Model

- **Local-first storage**: Your task database is stored on your device. Using an optional AI provider sends the task content needed for that request to the provider you selected.
- **On-demand**: Requests are only sent when you tap AI actions or enable Copilot suggestions. Opening the AI settings with a key configured also asks your provider for its current model list, so the model picker stays up to date — no task data is included in that request.
- **Scoped**: The assistant only receives the task data it needs.

## Supported Providers

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Configure it in **Settings → AI assistant** on desktop or **Menu → Settings → Advanced → AI assistant** on mobile:

- Enable/disable AI
- Provider
- Model
- Optional custom OpenAI-compatible base URL
- API key (stored locally only)
- Reasoning effort / thinking budget (provider-dependent)
- Optional **“Enable thinking”** toggle for Claude/Gemini (adds extended reasoning)

## OpenAI-Compatible Endpoints (Local or Hosted)

Mindwtr can talk to any service that exposes an **OpenAI-compatible Chat Completions API**. This includes local servers and some hosted providers.

Use this setup for:

- **Official OpenAI**: leave **Custom base URL** blank and use your OpenAI API key.
- **Local servers**: llama.cpp, Ollama, LM Studio, LocalAI, vLLM, and similar.
- **Hosted OpenAI-compatible providers**: for example xAI (Grok), GLM, or other vendors that expose an OpenAI-compatible endpoint.

1. If needed, start or obtain access to an OpenAI-compatible endpoint.
2. In **Settings → AI assistant** on desktop or **Menu → Settings → Advanced → AI assistant** on mobile:
   - Set **Provider** to **OpenAI**
   - Set **Model** to the model name exposed by that service
   - Set **Custom base URL** to the service's base URL
   - Enter an **API key** if that service requires bearer auth
3. Leave **Custom base URL** blank only for official OpenAI.
4. Leave **API key** blank only if your custom endpoint allows unauthenticated requests.

Mindwtr appends `/chat/completions` automatically, so use the provider base URL rather than the full chat-completions path unless your service requires the full path.

Common base URLs:
- **llama.cpp**: `http://localhost:8080/v1`
- **Ollama**: `http://localhost:11434/v1`
- **LM Studio**: `http://localhost:1234/v1`
- **LocalAI / vLLM**: `http://localhost:8080/v1`

Example for GLM-style hosted endpoints:

- **Provider**: `OpenAI`
- **Model**: the GLM model id exposed by your provider, such as `GLM-4.7`
- **Custom base URL**: your provider's OpenAI-compatible base URL
- **API key**: your provider key if required

Example for xAI (Grok):

- **Provider**: `OpenAI`
- **Model**: a Grok model id from xAI's model list, such as `grok-4.6`
- **Custom base URL**: `https://api.x.ai/v1`
- **API key**: your xAI API key

## Slow models and request timeouts

Open **Advanced → Request timeout** inside the AI assistant settings on desktop or mobile. Choose **30, 60, 120, or 300 seconds**; the default remains 30 seconds. For a slow local model, try 120 seconds first.

This limit covers AI assistant and Copilot responses, not speech transcription or fetching model lists. A timed-out or cancelled request is not retried automatically. Temporary network or server errors may still receive bounded retries. The timeout follows your existing AI-settings sync preference.

### Shorter responses from local models

A longer timeout gives a model more time; it does not reduce how much it generates. Some models spend tokens on thinking before producing the short answer you see.

With **Provider → OpenAI**, open **Extra request parameters** in the AI assistant settings, paste a JSON object, and choose **Save parameters**. Mindwtr merges these fields directly into AI assistant and Copilot requests; do not wrap them in `extra_body`. The fields `model`, `messages`, and `response_format` remain controlled by Mindwtr.

For **llama.cpp with a Qwen model whose chat template supports disabling thinking**, try this starting point:

```json
{
  "max_tokens": 512,
  "chat_template_kwargs": {
    "enable_thinking": false
  }
}
```

The nested thinking parameter follows the [llama.cpp server documentation](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md). Other servers may require a different field or a server-side setting; a top-level `enable_thinking` is not interchangeable with this object. Check your server version and model template.

- **512 is a starting cap, not a target.** If the response is cut off or Mindwtr cannot parse it, try 1024 or remove the cap. Review analysis may need more space than a short task breakdown.
- **Change one setting at a time.** Compare the same task with thinking disabled, then adjust the cap. Lowering `temperature` changes sampling; it is not a length limit.
- **If it still times out**, try a smaller model or 300 seconds. Clear the extra parameters and save to return to Mindwtr's defaults.

[HeikoMarkgraf shared a working Qwen3.5-4B configuration in discussion #1188](https://github.com/dongdongbh/Mindwtr/discussions/1188#discussioncomment-18448971), reporting about 6.45 seconds for suggestions and 37 seconds for breakdown. Those are community results for that setup, not a benchmark for the smaller example above. The discussion preserves the full configuration; some of its fields may be specific to that server or ignored elsewhere.

## Features

### Clarify
Turn a vague task into a concrete next action with suggested contexts/tags.

### Breakdown
Generate a short checklist of next steps for large tasks. You choose what to apply.

### Review Analysis
During weekly review, the assistant can flag stale tasks and suggest actions like:
- Move to Someday/Maybe
- Archive
- Break down
- Keep

### Copilot Suggestions
(Available in the task editor, the desktop lists' Quick Add row, and mobile quick capture)

As you type, Mindwtr can suggest:
- Contexts
- Tags
- Time estimates

Copilot never applies changes without your approval.

### Speech to Text

Transcribe voice notes into tasks.

- **Offline (Whisper)**: Download a model (~75MB for Tiny, ~150MB for Base) to transcribe fully offline.
  The model is downloaded from Hugging Face (huggingface.co). If that host cannot be reached, which is common in mainland China, Mindwtr tries the mirror hf-mirror.com next. Either way the file is checked against its known SHA-256 before it is used. If both fail, try another network, or use a cloud or self-hosted provider instead.
- **Cloud (OpenAI/Gemini)**: Use your API key for high-accuracy transcription.
- **Self-hosted (OpenAI-compatible)**: Set a custom base URL under the OpenAI speech provider to transcribe on your own server instead of api.openai.com. Anything serving OpenAI's `/v1/audio/transcriptions` works (whisper.cpp, Speaches, LocalAI, vLLM); an API key is optional there, and the model field accepts your server's own model name.
- **Modes**:
  - **Smart Parse**: Extracts due dates, projects, and priorities from natural speech (e.g., "Buy milk tomorrow priority high").
  - **Transcript Only**: Just the text.

#### Self-hosted transcription

Set the speech provider to OpenAI, then fill in the base URL: your server's root, ending in `/v1` (for example `http://localhost:8000/v1`). Mindwtr posts the recording to `/v1/audio/transcriptions` there, exactly as it does to OpenAI.

- Leave the API key empty if your server does not use one.
- The model picker lists whatever your server reports at `/v1/models` when it answers; otherwise it falls back to suggestions. You can always type any model name — the list is not a fixed set.
- Transcription is all a speech server does. **Smart Parse** needs a language model, so without an AI assistant configured a capture becomes a task titled with the transcript, and dates, projects and priorities are not pulled out of it. Configure the assistant separately if you want those.

## Notes

- AI is **optional**. Mindwtr works without it.
- Responses are parsed as structured JSON; if parsing fails, no changes are applied.
## Whisper language codes

If you use the Whisper offline model, set an explicit language code in **Settings → AI Assistant → Audio language** on desktop or **Menu → Settings → Advanced → AI Assistant → Audio language** on mobile.
See the language list here: [Whisper language list](https://whisper-api.com/docs/languages/).

## Apple model evaluations (development builds only)

Apple Foundation Models are not a production AI provider yet. The iOS development prototype offers optional on-device Inbox clarification on eligible devices. Suggestions stay editable and require explicit approval; unavailable models do not block manual processing or silently switch to cloud inference.

A separately enabled Private Cloud Compute (PCC) evaluator compares fixed synthetic examples with the on-device baseline. It does not read or upload your tasks, apply suggestions, or change synced settings. Each PCC request requires explicit consent and may use network access and Apple's daily quota; errors never trigger automatic cloud or local retries.

PCC evaluation requires iOS 27 or later, an eligible device, and a correctly provisioned signed development build. Team entitlement access alone is not proof that a build can make requests. Production access, model quality, and physical-device validation remain open. See the [developer evaluation checklist](https://github.com/dongdongbh/Mindwtr/blob/main/docs/development/apple-pcc-evaluation.md).
