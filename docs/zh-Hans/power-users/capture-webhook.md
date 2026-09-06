# 收集 Webhook

收集 Webhook 可以把一段语音笔记或一小段文字变成收集箱任务。任何能发送 HTTP 请求的设备、应用或脚本，都可以把文字以及可选的录音发送到你自己的云服务器。服务器会创建任务并附上录音，你的设备在下一次同步时就会收到两者。

这需要[自托管云服务器](/zh-Hans/power-users/docker-deployment)。如果你使用 Mindwtr 时没有服务器，请改用手机的分享菜单或 Siri 来收集。

## 端点

```text
POST /v1/capture
```

每个请求都要带上与 API 其余部分相同的 bearer 令牌，放在 `Authorization: Bearer <token>` 请求头中。请求体可以是 `multipart/form-data`、带有相同字段名的 `application/json`，或者 `text/plain`（此时整个请求体就是转写文本）。只有 `multipart/form-data` 能携带音频：JSON 和纯文本请求只包含文本，JSON 里的 `audio` 字段会被忽略。未知字段会被忽略。

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
| `audio` | 要附加到任务上的录音。它会像其他附件一样同步到你的设备。只有 `multipart/form-data` 请求中的录音才会被读取。 |
| `recordedAt` | 录制的时间，可用毫秒时间戳或 ISO 8601 时间格式。只要它有效且不在将来，就会成为任务的创建时间。 |
| `client` | 发送这次收集的设备或应用的简短名称。服务器会接受并忽略它，这样 Pebble 应用等发送方仍能正常工作。 |

`transcription` 和 `audio` 至少要发送一个。录音可以是 m4a、mp4、aac、mp3、wav、ogg 或 webm。

## 响应

| 状态码 | 含义 |
| --- | --- |
| `201` | 任务已创建。响应体就是这条新任务。 |
| `400` | 既没有转写文本，也没有音频文件。 |
| `401` | 令牌缺失或错误。 |
| `413` | 请求超过了服务器的大小上限：音频超过附件大小上限，或者转写文本超过文本大小上限。 |
| `415` | 不支持这种音频文件类型。 |

## 只能收集的令牌

一台只负责收集的设备，不应该持有能读取、修改和删除你账户里所有内容的令牌。只能收集的令牌是同一账户的第二个密钥。服务器只在 `POST /v1/capture` 上接受它，其他任何地方都不接受。

用你的完整令牌创建一个。`label` 可以不填。响应只显示令牌一次。服务器从不明文保存它，所以请立刻复制。

```bash
curl -X POST https://your-server.example/v1/capture-tokens \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"label":"Pebble ring"}'
```

```json
{
  "id": "6f1c2d1e-8a4b-4c3e-9f2a-1b2c3d4e5f60",
  "token": "mwc_…",
  "label": "Pebble ring",
  "createdAt": "2026-09-06T10:12:00.000Z"
}
```

列出账户上的令牌。响应里每个令牌都有 `id`、`label` 和 `createdAt`，不含任何密钥。

```bash
curl https://your-server.example/v1/capture-tokens \
  -H "Authorization: Bearer $MINDWTR_TOKEN"
```

按 `id` 撤销一个令牌。

```bash
curl -X DELETE https://your-server.example/v1/capture-tokens/<id> \
  -H "Authorization: Bearer $MINDWTR_TOKEN"
```

- 只能收集的令牌只在 `POST /v1/capture` 上有效。在那里它的行为和完整令牌完全一样：相同的请求体格式、相同的响应、与账户相同的速率限制。其他所有路由都会返回 `403`。
- 一个账户最多可以有 20 个只能收集的令牌。
- 在允许列表模式下，当账户的完整令牌从允许列表中移除后，只能收集的令牌也会失效。

## Pebble Index 01

Pebble Index 01 的应用发送语音笔记时用的正是这种格式，而且允许你自己添加请求头。所以不需要任何中间代码：你只要填两项设置。

1. 在手机上打开 Pebble 应用，进入语音笔记的 Webhook 设置
2. 把 Webhook 地址设为 `https://your-server.example/v1/capture`，并用你自己的服务器地址替换示例地址
3. 添加一个名为 `Authorization` 的请求头，值为 `Bearer <token>`，使用上一节创建的只能收集的令牌。完整令牌也能用，但对于只录笔记的设备，只能收集的令牌更安全
4. 在手表上录一条笔记。它会在下一次同步时到达收集箱，转写文本成为任务，录音作为附件

## 其他设备与自动化

这些都不是 Pebble 专用的。任何能发出 HTTP POST 的工具用法都一样：

- **iOS 和 Apple Watch 快捷指令**：一个「获取 URL 内容」操作，方法为 POST，带上请求头和一个文本字段。请参阅 Apple 快捷指令页面上的[从 Apple Watch 记录](/zh-Hans/power-users/apple-shortcuts#从-apple-watch-记录)配方
- **Android 自动化应用**（例如 Tasker）：一个 HTTP 请求操作，使用相同的地址和请求头
- **Home Assistant**：一个 `rest_command`，发送自动化或语音助手结果中的文字
- **Shell 脚本与 cron 任务**：上面的 curl 命令，把令牌放在环境变量里

## 相关页面

- [Cloud API](/zh-Hans/developers/cloud-api)
- [邮件收集](/zh-Hans/power-users/email-capture)
- [Docker 部署](/zh-Hans/power-users/docker-deployment)
