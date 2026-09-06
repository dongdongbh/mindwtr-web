# 收集 Webhook

收集 Webhook 可以把一段語音筆記或一小段文字變成收集箱任務。任何能傳送 HTTP 請求的裝置、應用程式或指令碼，都可以把文字以及選用的錄音傳送到你自己的雲端伺服器。伺服器會建立任務並附上錄音，你的裝置在下次同步時就會收到兩者。

這需要[自行託管的雲端伺服器](/zh-Hant/power-users/docker-deployment)。如果你使用 Mindwtr 時沒有伺服器，請改用手機的分享選單或 Siri 來收集。

## 端點

```text
POST /v1/capture
```

每個請求都要帶上與 API 其他部分相同的 bearer 權杖，放在 `Authorization: Bearer <token>` 請求標頭中。請求內容可以是 `multipart/form-data`、使用相同欄位名稱的 `application/json`，或是 `text/plain`（此時整個請求內容就是轉錄文字）。只有 `multipart/form-data` 能夾帶音訊：JSON 與純文字請求只包含文字，JSON 中的 `audio` 欄位會被忽略。未知欄位會被忽略。

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
| `audio` | 要附加到任務上的錄音。它會像其他附件一樣同步到你的裝置。只有 `multipart/form-data` 請求中的錄音才會被讀取。 |
| `recordedAt` | 錄製的時間，可使用毫秒時間戳記或 ISO 8601 時間格式。只要它有效且不在未來，就會成為任務的建立時間。 |
| `client` | 傳送這次收集的裝置或應用程式的簡短名稱。伺服器會接受並忽略它，讓 Pebble 應用程式等傳送方仍能正常運作。 |

`transcription` 與 `audio` 至少要傳送一個。錄音可以是 m4a、mp4、aac、mp3、wav、ogg 或 webm。

## 回應

| 狀態碼 | 意義 |
| --- | --- |
| `201` | 任務已建立。回應內容就是這筆新任務。 |
| `400` | 既沒有轉錄文字，也沒有音訊檔案。 |
| `401` | 權杖遺漏或錯誤。 |
| `413` | 請求超過伺服器的大小上限：音訊超過附件大小上限，或轉錄文字超過文字大小上限。 |
| `415` | 不支援這種音訊檔案類型。 |

## 只能收集的權杖

一台只負責收集的裝置，不應該持有能讀取、修改和刪除你帳號中所有內容的權杖。只能收集的權杖是同一帳號的第二個密鑰。伺服器只在 `POST /v1/capture` 上接受它，其他任何地方都不接受。

用你的完整權杖建立一個。`label` 可以不填。回應只顯示權杖一次。伺服器從不以明文儲存它，所以請立刻複製。

```bash
curl -X POST https://your-server.example/v1/capture-tokens \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"label":"Pebble ring"}'
```

```json
{
  "id": "ct_5f2c9a",
  "token": "mwcap_...",
  "label": "Pebble ring",
  "createdAt": "2026-09-06T10:12:00.000Z"
}
```

列出帳號上的權杖。回應中每個權杖都有 `id`、`label` 和 `createdAt`，不含任何密鑰。

```bash
curl https://your-server.example/v1/capture-tokens \
  -H "Authorization: Bearer $MINDWTR_TOKEN"
```

依 `id` 撤銷一個權杖。

```bash
curl -X DELETE https://your-server.example/v1/capture-tokens/<id> \
  -H "Authorization: Bearer $MINDWTR_TOKEN"
```

- 只能收集的權杖只在 `POST /v1/capture` 上有效。在那裡它的行為和完整權杖完全一樣：相同的請求內容格式、相同的回應、與帳號相同的速率限制。其他所有路由都會回傳 `403`。
- 一個帳號最多可以有 20 個只能收集的權杖。
- 在允許清單模式下，當帳號的完整權杖從允許清單中移除後，只能收集的權杖也會失效。

## Pebble Index 01

Pebble Index 01 的應用程式傳送語音筆記時使用的正是這種格式，而且允許你自行加入請求標頭。因此不需要任何中介程式碼：你只要填兩項設定。

1. 在手機上開啟 Pebble 應用程式，進入語音筆記的 Webhook 設定
2. 將 Webhook 網址設為 `https://your-server.example/v1/capture`，並以你自己的伺服器位址取代範例位址
3. 新增一個名為 `Authorization` 的請求標頭，值為 `Bearer <token>`，並使用上一節建立的只能收集的權杖。完整權杖也能用，但對於只錄筆記的裝置，只能收集的權杖更安全
4. 在手錶上錄一則筆記。它會在下次同步時抵達收集箱，轉錄文字成為任務，錄音則是附件

## 其他裝置與自動化

這些都不是 Pebble 專屬的。任何能送出 HTTP POST 的工具，用法都一樣：

- **iOS 與 Apple Watch 捷徑**：一個「取得 URL 內容」動作，方法為 POST，帶上請求標頭與一個文字欄位。請參閱 Apple 捷徑頁面上的[從 Apple Watch 收集](/zh-Hant/power-users/apple-shortcuts#從-apple-watch-收集)做法
- **Android 自動化應用程式**（例如 Tasker）：一個 HTTP 請求動作，使用相同的網址與請求標頭
- **Home Assistant**：一個 `rest_command`，傳送自動化或語音助理結果中的文字
- **Shell 指令碼與 cron 工作**：上面的 curl 指令，並把權杖放在環境變數中

## 相關頁面

- [雲端 API](/zh-Hant/developers/cloud-api)
- [電子郵件收集](/zh-Hant/power-users/email-capture)
- [Docker 部署](/zh-Hant/power-users/docker-deployment)
