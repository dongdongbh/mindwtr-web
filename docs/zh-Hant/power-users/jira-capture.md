# 從 Jira 收集任務

Mindwtr 沒有內建 Jira 用戶端，也不打算內建。一個受到正式支援的 Jira Cloud 整合意味著註冊並營運一個 OAuth 應用程式，並無限期跟進 Atlassian 的 API 與政策變動，而 Jira 只是眾多工作追蹤工具之一。對一款個人 GTD 應用程式來說，這筆交易不划算。

不過，把工作項收集進收集箱正是 GTD 收集的本意，而 Jira 自己的自動化就能利用現成的元件為 Mindwtr 供料。本頁提供三個作法，從零程式碼到一個小腳本。

相關：[電子郵件收集](/zh-Hant/power-users/email-capture)、[本機 API](/zh-Hant/power-users/local-api)、[雲端 API](/zh-Hant/developers/cloud-api)

這些作法都是單向收集，不是同步。收集到的任務帶有工作項編號、摘要與指回 Jira 的連結；在 Mindwtr 完成任務不會流轉 Jira 上的工作項，Jira 上的變動也不會影響已收集的任務。你像處理其他收集箱項目一樣處理它，需要回 Jira 工作時點開連結即可。

## 每個工作項一封郵件：Jira 自動化

零程式碼作法。Jira 把每個符合的工作項寄給你，Mindwtr 內建的[電子郵件收集](/zh-Hant/power-users/email-capture)把每封郵件變成一條收集箱任務。不需要額外託管任何東西，電腦關機時信箱就是佇列。

1. 在 Mindwtr 桌面版設定[電子郵件收集](/zh-Hant/power-users/email-capture)，監看一個專用資料夾，例如 `Mindwtr`
2. 在 Jira 開啟**專案設定 → 自動化**（或全域自動化），建立一條規則
3. 選一個代表「工作項落到我頭上」的觸發器：**已建立工作項**、**已指派工作項**，或某個狀態流轉
4. 可選擇加上 **JQL 條件**縮小範圍，例如 `assignee = currentUser() AND project = ABC`
5. 新增**傳送電子郵件**動作寄給自己，主旨填 <span v-pre>`{{issue.key}} - {{issue.summary}}`</span>，內文放 <span v-pre>`{{issue.url}}`</span> 以及想進任務描述的欄位
6. 在郵件用戶端建立規則，把這些郵件移入被監看的資料夾

每個符合的事件產生一封郵件，每封郵件成為一條形如 `ABC-123 - Fix the login redirect` 的收集箱任務，連結在描述裡。

請使用自動化規則，而不是已儲存篩選器的訂閱：訂閱是週期性摘要，會把目前所有符合項目塞進一封郵件，只會變成一條沒什麼用的大任務。自動化則是每個工作項觸發一次。

## 直接送到你的伺服器：Send web request

如果你營運[自行託管的雲端伺服器](/zh-Hant/power-users/docker-deployment)，Jira 可以跳過郵件。自動化動作 **Send web request** 把每個工作項送到 [`POST /v1/tasks`](/zh-Hant/developers/cloud-api)，你的裝置會在下次同步時取回任務。

1. 建立與上面相同的自動化規則：觸發器，外加可選的 JQL 條件
2. 新增 **Send web request** 動作：方法 `POST`，URL `https://your-server.example/v1/tasks`
3. 新增標頭 `Authorization: Bearer <你的權杖>`（將值標記為隱藏）與 `Content-Type: application/json`
4. 請求主體選 **Custom data**，填入下面的 JSON

```json
{
  "title": "{{issue.key}} - {{issue.summary.jsonEncode}}",
  "props": { "description": "{{issue.url}}" }
}
```

`.jsonEncode` 函式會跳脫摘要中可能出現的引號等字元，確保請求主體始終是合法的 JSON。規則在 Atlassian 雲端執行，你所有機器都關機時收集照常運作，而且離開 Jira 的只有你對應的欄位。

## 想要完全掌控：寫個腳本

凡是能呼叫 Jira REST API 並發出 HTTP 請求的東西都能當橋：cron 腳本、n8n、Node-RED 或 Zapier。Atlassian 的 API 權杖本來就是給這類個人腳本用的。下面的範例輪詢一條 JQL 查詢並收集新工作項，已送出的會記住：

```bash
#!/usr/bin/env bash
set -euo pipefail
JIRA="https://your-company.atlassian.net"
JQL='assignee = currentUser() AND created >= -1d'
SEEN="$HOME/.cache/jira-mindwtr-seen"
touch "$SEEN"

curl -s -u "you@company.example:$JIRA_TOKEN" \
  "$JIRA/rest/api/3/search/jql" --get \
  --data-urlencode "jql=$JQL" --data-urlencode "fields=summary" |
jq -r '.issues[] | "\(.key)\t\(.fields.summary)"' |
while IFS=$'\t' read -r key summary; do
  grep -qxF "$key" "$SEEN" && continue
  curl -s -X POST "https://your-server.example/v1/tasks" \
    -H "Authorization: Bearer $MINDWTR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg t "$key - $summary" --arg d "$JIRA/browse/$key" \
          '{title: $t, props: {description: $d}}')" > /dev/null
  echo "$key" >> "$SEEN"
done
```

沒有雲端伺服器時，把同一個腳本指向桌面版的[本機 API](/zh-Hant/power-users/local-api)：`http://127.0.0.1:3456/tasks`，同樣的 Bearer 權杖方式，桌面應用程式執行期間可用。

## 其他追蹤工具

除了 smart values，這裡沒有任何 Jira 專屬的東西。GitHub、GitLab、Linear 與大多數其他追蹤工具都能在工作項建立或指派時寄出郵件或發出 HTTP 請求，同樣的三個作法照用。如果你搭了一座值得分享的橋，歡迎發佈到 [GitHub Discussions](https://github.com/dongdongbh/Mindwtr/discussions)，讓其他人也能使用。
