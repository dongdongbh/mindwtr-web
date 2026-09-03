# 收集 Webhook

收集 Webhook 可以把一段語音筆記或一小段文字變成收集箱任務。任何能傳送 HTTP 請求的裝置、應用程式或指令碼，都可以把文字以及選用的錄音傳送到你自己的雲端伺服器。伺服器會建立任務並附上錄音，你的裝置在下次同步時就會收到兩者。

這需要[自行託管的雲端伺服器](/zh-Hant/power-users/docker-deployment)。如果你使用 Mindwtr 時沒有伺服器，請改用手機的分享選單或 Siri 來收集。

## 端點

```text
POST /v1/capture
```

每個請求都要帶上與 API 其他部分相同的 bearer 權杖，放在 `Authorization: Bearer <token>` 請求標頭中。請求內容可以是 `multipart/form-data`、使用相同欄位名稱的 `application/json`，或是 `text/plain`（此時整個請求內容就是轉錄文字）。未知欄位會被忽略。

### 只傳送文字

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: text/plain" \
  --data "Call the dentist about the crown"
```

### 傳送錄音與轉錄文字

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -F "transcription=Call the dentist about the crown" \
  -F "audio=@note.m4a" \
  -F "recordedAt=1756900000000" \
  -F "client=Pebble Index 01"
```

## 欄位

| 欄位 | 作用 |
| --- | --- |
| `transcription` | 收集到的文字。第一行會成為任務標題，全文則進入描述。`text` 與 `title` 也是同一個欄位的名稱。 |
| `audio` | 要附加到任務上的錄音。它會像其他附件一樣同步到你的裝置。 |
| `recordedAt` | 錄製的時間，可使用毫秒時間戳記或 ISO 8601 時間格式。只要它有效且不在未來，就會成為任務的建立時間。 |
| `client` | 傳送這次收集的裝置或應用程式的簡短名稱。它會以 `Captured with <client>` 的形式寫在描述結尾。 |

`transcription` 與 `audio` 至少要傳送一個。錄音可以是 m4a、mp4、aac、mp3、wav、ogg 或 webm。

## 回應

| 狀態碼 | 意義 |
| --- | --- |
| `201` | 任務已建立。回應內容就是這筆新任務。 |
| `400` | 既沒有轉錄文字，也沒有音訊檔案。 |
| `401` | 權杖遺漏或錯誤。 |
| `413` | 音訊檔案超過伺服器的附件大小上限。 |
| `415` | 不支援這種音訊檔案類型。 |

## Pebble Index 01

Pebble Index 01 的應用程式傳送語音筆記時使用的正是這種格式，而且允許你自行加入請求標頭。因此不需要任何中介程式碼：你只要填兩項設定。

1. 在手機上開啟 Pebble 應用程式，進入語音筆記的 Webhook 設定
2. 將 Webhook 網址設為 `https://your-server.example/v1/capture`，並以你自己的伺服器位址取代範例位址
3. 新增一個名為 `Authorization` 的請求標頭，值為 `Bearer <token>`，並使用你伺服器上的其中一個權杖
4. 在手錶上錄一則筆記。它會在下次同步時抵達收集箱，轉錄文字成為任務，錄音則是附件

## 其他裝置與自動化

這些都不是 Pebble 專屬的。任何能送出 HTTP POST 的工具，用法都一樣：

- **iOS 捷徑**：一個「取得 URL 內容」動作，方法為 POST，帶上請求標頭與一個文字欄位
- **Android 自動化應用程式**（例如 Tasker）：一個 HTTP 請求動作，使用相同的網址與請求標頭
- **Home Assistant**：一個 `rest_command`，傳送自動化或語音助理結果中的文字
- **Shell 指令碼與 cron 工作**：上面的 curl 指令，並把權杖放在環境變數中

## 相關頁面

- [雲端 API](/zh-Hant/developers/cloud-api)
- [電子郵件收集](/zh-Hant/power-users/email-capture)
- [Docker 部署](/zh-Hant/power-users/docker-deployment)
