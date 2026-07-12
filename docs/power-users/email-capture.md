# Email Capture

Turn emails into Inbox tasks. Two paths work today: the phone share sheet for any mail provider, and the Cloud API for self-hosted deployments. A built-in IMAP folder watch is planned but not shipped yet.

Related: [Cloud API](/developers/cloud-api), [Docker deployment](/power-users/docker-deployment)

## Share an email from your phone

Works today on Android and iOS with any mail app that can share text (Outlook, Gmail, Apple Mail, and others):

1. Open the email
2. Tap **Share** and pick **Mindwtr**
3. The capture screen opens with the shared content; save it to your Inbox

This is the fastest path when you process mail on your phone. See [Mobile app](/use/mobile#share-sheet) for details.

## Forward email to a self-hosted server

If you run the [self-hosted cloud server](/power-users/docker-deployment), any automation that can send an HTTP request can create tasks through [`POST /v1/tasks`](/developers/cloud-api). The endpoint accepts a plain `title`, or quick-add `input` with the same syntax as the in-app quick-add bar.

```bash
curl -X POST https://your-server.example/v1/tasks \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Reply to Dana about the contract", "props": {"description": "From: dana@example.com"}}'
```

These recipes carry text only: the subject becomes the `title`, the sender or a snippet goes into `props.description`. To capture an attachment such as a PDF, use the phone share sheet instead.

Point the automation at your cloud server, not at a personal machine. The server is the always-on sync source, so capture keeps working while your workstation and phone are off; devices pick the task up on their next sync.

### Outlook and Microsoft 365: Power Automate

Microsoft accounts work best through Power Automate, since Microsoft no longer allows password-based IMAP access:

1. Create a flow with the trigger **When a new email arrives**, filtered to a flag, category, or a dedicated folder
2. Add an **HTTP** action: method `POST`, your server's `/v1/tasks` URL, an `Authorization: Bearer <token>` header, and a JSON body that maps the email subject to `title` and sender or a snippet to `props.description`
3. Flag an email (or drop it in the folder) and it appears in your Mindwtr Inbox on the next sync

The flow runs in Microsoft's cloud, so capture works even while your computer is off. Only the fields you map leave your mailbox.

### A dedicated capture address: Cloudflare Email Workers

If your domain uses [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/), you can create an address like `todo@your-domain.example` and route it to an Email Worker that posts straight to your server:

```js
export default {
  async email(message, env) {
    const response = await fetch("https://your-server.example/v1/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.MINDWTR_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: message.headers.get("subject") || "Captured email",
        props: { description: `From: ${message.from}` },
      }),
    });
    if (!response.ok) {
      throw new Error(`Mindwtr returned ${response.status}`);
    }
  },
};
```

Store the token as a Worker secret (`wrangler secret put MINDWTR_TOKEN`), never in the script. Throwing on a failed response makes delivery fail visibly so the sending server can retry, instead of the mail vanishing. To include the message body in the description, parse the raw MIME with a library such as [postal-mime](https://github.com/postalsys/postal-mime); the subject-only version above needs no parsing.

Anything you forward to that address becomes an Inbox task. Keep the address private, or add a sender allowlist in the worker, since anyone who discovers it can create tasks.

### Gmail and everything else: n8n, Zapier, scripts, rules

The same pattern works from any automation tool that can read your mailbox (or receive mail directly) and make an HTTP request:

- **n8n / Node-RED**: an IMAP or Gmail trigger node feeding an HTTP request node
- **Zapier**: an *Email by Zapier* inbound address (or Gmail trigger) feeding a *Webhooks by Zapier* POST step
- **A script on any always-on machine**: poll a mailbox folder and post each new message
- **Sieve/procmail on your mail server**: pipe matching mail to a small script

Keep the token secret: anyone holding it can read and write the tasks in that namespace.

## Planned: built-in IMAP folder watch

[Issue #35](https://github.com/dongdongbh/Mindwtr/issues/35) tracks first-party email capture: you point Mindwtr Desktop at a folder in your own mailbox (for example `Mindwtr`), move or forward mail into it from any client, and the app turns each message into an Inbox task. Your mail never touches a third-party server.

Provider notes for when it ships:

- Gmail, iCloud Mail, Fastmail, and standard IMAP servers support app passwords, which is what the first version will target
- Outlook.com and Microsoft 365 have password-based IMAP switched off; use the Power Automate recipe above instead

There is deliberately no Mindwtr-hosted forwarding address: a hosted relay would mean routing your private email through project infrastructure, which does not fit a local-first app.
