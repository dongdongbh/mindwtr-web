# 从 Jira 收集任务

Mindwtr 没有内置 Jira 客户端，也不打算内置。一个受到正式支持的 Jira Cloud 集成意味着注册并运营一个 OAuth 应用，并无限期跟进 Atlassian 的 API 和政策变化，而 Jira 只是众多工作跟踪工具之一。对一款个人 GTD 应用来说，这笔交易不划算。

不过，把工作项收集进收集箱正是 GTD 收集的本意，而 Jira 自己的自动化就能借助现成的部件为 Mindwtr 供料。本页给出三个方案，从零代码到一个小脚本。

相关：[邮件收集](/zh-Hans/power-users/email-capture)、[本地 API](/zh-Hans/power-users/local-api)、[云端 API](/zh-Hans/developers/cloud-api)

这些方案都是单向收集，不是同步。收集到的任务带有工作项编号、摘要和指回 Jira 的链接；在 Mindwtr 里完成任务不会流转 Jira 上的工作项，Jira 里的变化也不会影响已收集的任务。你像处理其他收集箱条目一样处理它，需要回 Jira 干活时点开链接即可。

## 每个工作项一封邮件：Jira 自动化

零代码方案。Jira 把每个匹配的工作项发邮件给你，Mindwtr 内置的[邮件收集](/zh-Hans/power-users/email-capture)把每封邮件变成一条收集箱任务。不用额外托管任何东西，电脑关机时邮箱就是队列。

1. 在 Mindwtr 桌面版配置[邮件收集](/zh-Hans/power-users/email-capture)，监视一个专用文件夹，例如 `Mindwtr`
2. 在 Jira 打开**项目设置 → 自动化**（或全局自动化），新建一条规则
3. 选一个表示"工作项落到我头上"的触发器：**已创建工作项**、**已分配工作项**，或某个状态流转
4. 可选加一个 **JQL 条件**收窄规则，例如 `assignee = currentUser() AND project = ABC`
5. 添加**发送电子邮件**动作发给自己，主题填 <span v-pre>`{{issue.key}} - {{issue.summary}}`</span>，正文放 <span v-pre>`{{issue.url}}`</span> 以及想进任务描述的字段
6. 在邮件客户端里建一条规则，把这些邮件移入被监视的文件夹

每个匹配事件产生一封邮件，每封邮件成为一条形如 `ABC-123 - Fix the login redirect` 的收集箱任务，链接在描述里。

请用自动化规则，不要用已保存筛选器的订阅：订阅是周期性摘要，会把当前所有匹配塞进一封邮件，只会变成一条没什么用的大任务。自动化则是每个工作项触发一次。

## 直接发到你的服务器：Send web request

如果你运行[自托管云服务器](/zh-Hans/power-users/docker-deployment)，Jira 可以跳过邮件。自动化动作 **Send web request** 把每个工作项发送到 [`POST /v1/tasks`](/zh-Hans/developers/cloud-api)，你的设备在下次同步时取回任务。

1. 建一条与上面相同的自动化规则：触发器，外加可选的 JQL 条件
2. 添加 **Send web request** 动作：方法 `POST`，URL `https://your-server.example/v1/tasks`
3. 添加请求头 `Authorization: Bearer <你的令牌>`（把值标记为隐藏）和 `Content-Type: application/json`
4. 请求体选 **Custom data**，填入下面的 JSON

```json
{
  "title": "{{issue.key}} - {{issue.summary.jsonEncode}}",
  "props": { "description": "{{issue.url}}" }
}
```

`.jsonEncode` 函数会转义摘要里可能出现的引号等字符，保证请求体始终是合法 JSON。规则在 Atlassian 云端运行，你所有机器都关机时收集也照常工作，而且离开 Jira 的只有你映射的字段。

## 想要完全掌控：写个脚本

凡是能调用 Jira REST API 并发出 HTTP 请求的东西都能当桥：cron 脚本、n8n、Node-RED 或 Zapier。Atlassian 的 API 令牌本来就是给这类个人脚本用的。下面的例子轮询一条 JQL 查询并收集新工作项，已发送过的会记住：

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

没有云服务器时，把同一个脚本指向桌面版的[本地 API](/zh-Hans/power-users/local-api)：`http://127.0.0.1:3456/tasks`，同样的 Bearer 令牌方式，桌面应用运行期间可用。

## 其他跟踪工具

除了 smart values，这里没有任何 Jira 专属的东西。GitHub、GitLab、Linear 和大多数其他跟踪工具都能在工作项创建或分配时发邮件或发 HTTP 请求，同样的三个方案照用。如果你搭了一座值得分享的桥，欢迎发到 [GitHub Discussions](https://github.com/dongdongbh/Mindwtr/discussions)，让别人也能用上。
