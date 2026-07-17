# Capture Jira work items

Mindwtr has no built-in Jira client, and none is planned. A properly supported Jira Cloud integration would mean registering and operating an OAuth application and keeping up with Atlassian's API and policy changes indefinitely, for one work tracker among many. That is a poor trade for a personal GTD app.

Capturing work items into your Inbox, though, is exactly what GTD capture is for, and Jira's own automation can feed Mindwtr through pieces that already exist. This page shows three recipes, from no-code to a small script.

Related: [Email capture](/power-users/email-capture), [Local API](/power-users/local-api), [Cloud API](/developers/cloud-api)

All of these are one-way capture, not a sync. A captured task carries the issue key, the summary, and a link back to Jira; completing the task in Mindwtr does not transition the Jira issue, and changes in Jira do not touch tasks you already captured. You process the captured item like any other Inbox entry, and the link takes you back when it is time to work in Jira.

## One email per issue, via Jira Automation

The no-code path. Jira emails you each matching work item, and Mindwtr's built-in [email capture](/power-users/email-capture) turns each message into an Inbox task. Nothing new to host, and the mailbox queues captures while your computer is off.

1. Set up [email capture](/power-users/email-capture) in Mindwtr Desktop, watching a dedicated folder such as `Mindwtr`
2. In Jira, open **Project settings → Automation** (or global automation) and create a rule
3. Pick a trigger that matches "a work item entered my plate": **Issue created**, **Issue assigned**, or a status transition
4. Optionally add a **JQL condition** to narrow the rule, for example `assignee = currentUser() AND project = ABC`
5. Add a **Send email** action to your own address, with subject <span v-pre>`{{issue.key}} - {{issue.summary}}`</span> and a body containing <span v-pre>`{{issue.url}}`</span> plus any fields you want in the task description
6. In your mail client, add a rule that moves those messages into the watched folder

Each matching event produces one email, and each email becomes one Inbox task titled `ABC-123 - Fix the login redirect` with the link in its description.

Use an Automation rule rather than a saved-filter subscription: subscriptions send a periodic digest listing every current match in a single message, which would become a single unhelpful task. Automation fires once per work item.

## Post straight to your server, via Send web request

If you run the [self-hosted cloud server](/power-users/docker-deployment), Jira can skip email entirely. The **Send web request** automation action posts each work item to [`POST /v1/tasks`](/developers/cloud-api), and your devices pick the task up on their next sync.

1. Create the same Automation rule as above: trigger, then an optional JQL condition
2. Add a **Send web request** action: method `POST`, URL `https://your-server.example/v1/tasks`
3. Add headers `Authorization: Bearer <your token>` (mark the value hidden) and `Content-Type: application/json`
4. Set the body to **Custom data** with the JSON below

```json
{
  "title": "{{issue.key}} - {{issue.summary.jsonEncode}}",
  "props": { "description": "{{issue.url}}" }
}
```

The `.jsonEncode` function escapes quotes and other characters a summary may contain, so the request body stays valid JSON. The rule runs in Atlassian's cloud, so capture works with all of your machines off, and only the fields you map leave Jira.

## A script, when you want full control

Anything that can call Jira's REST API and make an HTTP request can be the bridge: a cron script, n8n, Node-RED, or Zapier. Atlassian's API tokens are intended for exactly this kind of personal script. The example below polls a JQL query and captures new work items, remembering what it already sent:

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

Without a cloud server, point the same script at the desktop [Local API](/power-users/local-api) instead: `http://127.0.0.1:3456/tasks`, same bearer token pattern, while the desktop app is running.

## Other trackers

Nothing here is Jira-specific beyond the smart values. GitHub, GitLab, Linear, and most other trackers can send an email or an HTTP request when a work item is created or assigned, and the same three recipes apply. If you build a bridge worth sharing, post it in [GitHub Discussions](https://github.com/dongdongbh/Mindwtr/discussions) so others can pick it up.
