# Capture Webhook

The capture webhook turns a voice note or a piece of text into an Inbox task. Any device, app, or script that can send an HTTP request posts the text, and optionally an audio recording, to your own cloud server. The server creates the task, attaches the audio, and your devices pick both up on the next sync.

This needs the [self-hosted cloud server](/power-users/docker-deployment). If you run Mindwtr without a server, capture from the phone share sheet or Siri instead.

## The endpoint

```text
POST /v1/capture
```

Every request carries the same bearer token as the rest of the API, in an `Authorization: Bearer <token>` header. The body can be `multipart/form-data`, `application/json` with the same field names, or `text/plain`, where the whole body is the transcription. Unknown fields are ignored.

### Text only

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: text/plain" \
  --data "Call the dentist about the crown"
```

### Audio with a transcription

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -F "transcription=Call the dentist about the crown" \
  -F "audio=@note.m4a" \
  -F "recordedAt=1756900000000" \
  -F "client=Pebble Index 01"
```

## Fields

| Field | What it does |
| --- | --- |
| `transcription` | The captured text. The first line becomes the task title, and the full text becomes the description. `text` and `title` are accepted as other names for the same field. |
| `audio` | The recording to attach to the task. It syncs to your devices like any other attachment. |
| `recordedAt` | When the capture happened, as epoch milliseconds or an ISO 8601 timestamp. It becomes the task's creation time when it is valid and not in the future. |
| `client` | A short label for the device or app that sent the capture. It is noted at the end of the description as `Captured with <client>`. |

Send at least one of `transcription` and `audio`. The recording can be m4a, mp4, aac, mp3, wav, ogg, or webm.

## Responses

| Status | Meaning |
| --- | --- |
| `201` | The task was created. The response body is the new task. |
| `400` | Neither a transcription nor an audio file was sent. |
| `401` | The token is missing or wrong. |
| `413` | The audio file is larger than the server's attachment size limit. |
| `415` | The audio file type is not supported. |

## Pebble Index 01

The Pebble Index 01 app sends voice notes in exactly this format, and it lets you add your own request headers. So there is no glue code: you only fill in two settings.

1. Open the Pebble app on your phone and go to the webhook settings for voice notes
2. Set the webhook URL to `https://your-server.example/v1/capture`, with your own server address in place of the example
3. Add a request header named `Authorization` with the value `Bearer <token>`, using one of your server's tokens
4. Record a note on the watch. It reaches your Inbox on the next sync, with the transcription as the task and the recording attached

## Other devices and automations

Nothing here is Pebble-specific. Anything that can make an HTTP POST works the same way:

- **iOS and Apple Watch Shortcuts**: a *Get contents of URL* action, method POST, with the header and a text field. See the [Capture from Apple Watch](/power-users/apple-shortcuts#capture-from-apple-watch) recipe on the Apple Shortcuts page
- **Android automation apps** such as Tasker: an HTTP Request action with the same URL and header
- **Home Assistant**: a `rest_command` that posts the text of an automation or a voice assistant result
- **Shell scripts and cron jobs**: the curl commands above, with the token in an environment variable

## Related

- [Cloud API](/developers/cloud-api)
- [Email capture](/power-users/email-capture)
- [Docker deployment](/power-users/docker-deployment)
