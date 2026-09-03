# 收集 Webhook

收集 Webhook 可以把一段语音笔记或一小段文字变成收集箱任务。任何能发送 HTTP 请求的设备、应用或脚本，都可以把文字以及可选的录音发送到你自己的云服务器。服务器会创建任务并附上录音，你的设备在下一次同步时就会收到两者。

这需要[自托管云服务器](/zh-Hans/power-users/docker-deployment)。如果你使用 Mindwtr 时没有服务器，请改用手机的分享菜单或 Siri 来收集。

## 端点

```text
POST /v1/capture
```

每个请求都要带上与 API 其余部分相同的 bearer 令牌，放在 `Authorization: Bearer <token>` 请求头中。请求体可以是 `multipart/form-data`、带有相同字段名的 `application/json`，或者 `text/plain`（此时整个请求体就是转写文本）。未知字段会被忽略。

### 只发送文字

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: text/plain" \
  --data "Call the dentist about the crown"
```

### 发送录音和转写文本

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -F "transcription=Call the dentist about the crown" \
  -F "audio=@note.m4a" \
  -F "recordedAt=1756900000000" \
  -F "client=Pebble Index 01"
```

## 字段

| 字段 | 作用 |
| --- | --- |
| `transcription` | 收集到的文字。第一行成为任务标题，全文进入描述。`text` 和 `title` 也是同一个字段的名称。 |
| `audio` | 要附加到任务上的录音。它会像其他附件一样同步到你的设备。 |
| `recordedAt` | 录制的时间，可用毫秒时间戳或 ISO 8601 时间格式。只要它有效且不在将来，就会成为任务的创建时间。 |
| `client` | 发送这次收集的设备或应用的简短名称。它会以 `Captured with <client>` 的形式写在描述末尾。 |

`transcription` 和 `audio` 至少要发送一个。录音可以是 m4a、mp4、aac、mp3、wav、ogg 或 webm。

## 响应

| 状态码 | 含义 |
| --- | --- |
| `201` | 任务已创建。响应体就是这条新任务。 |
| `400` | 既没有转写文本，也没有音频文件。 |
| `401` | 令牌缺失或错误。 |
| `413` | 音频文件超过了服务器的附件大小上限。 |
| `415` | 不支持这种音频文件类型。 |

## Pebble Index 01

Pebble Index 01 的应用发送语音笔记时用的正是这种格式，而且允许你自己添加请求头。所以不需要任何中间代码：你只要填两项设置。

1. 在手机上打开 Pebble 应用，进入语音笔记的 Webhook 设置
2. 把 Webhook 地址设为 `https://your-server.example/v1/capture`，并用你自己的服务器地址替换示例地址
3. 添加一个名为 `Authorization` 的请求头，值为 `Bearer <token>`，使用你服务器上的一个令牌
4. 在手表上录一条笔记。它会在下一次同步时到达收集箱，转写文本成为任务，录音作为附件

## 其他设备与自动化

这些都不是 Pebble 专用的。任何能发出 HTTP POST 的工具用法都一样：

- **iOS 快捷指令**：一个「获取 URL 内容」操作，方法为 POST，带上请求头和一个文本字段
- **Android 自动化应用**（例如 Tasker）：一个 HTTP 请求操作，使用相同的地址和请求头
- **Home Assistant**：一个 `rest_command`，发送自动化或语音助手结果中的文字
- **Shell 脚本与 cron 任务**：上面的 curl 命令，把令牌放在环境变量里

## 相关页面

- [Cloud API](/zh-Hans/developers/cloud-api)
- [邮件收集](/zh-Hans/power-users/email-capture)
- [Docker 部署](/zh-Hans/power-users/docker-deployment)
