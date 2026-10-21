# Email Capture

Turn emails into Inbox tasks. Three paths: the built-in IMAP folder capture on desktop, the phone share sheet for any mail provider, and the Cloud API for self-hosted deployments.

Related: [Cloud API](/developers/cloud-api), [Docker deployment](/power-users/docker-deployment)

## Built-in: watch a mail folder from the desktop app

Point Mindwtr Desktop at a folder in your own mailbox, move or forward mail into it from any client, and each message becomes an Inbox task. Your mail never touches a third-party server; the desktop app talks IMAP straight to your mail provider.

Setup, in **Settings → Integrations → Email capture**:

1. Enter your IMAP server (for example `imap.gmail.com`), username, and an **app password**. Regular account passwords usually will not work, and the password is stored in your system keyring
2. Keep the default folder `Mindwtr` or pick your own; it is created in your mailbox if it does not exist
3. Enable the switch and save. Saving verifies the connection and reports any problem right away
4. In your mail client or webmail, add a rule (or drag manually) that moves capture-worthy mail into that folder

While the desktop app is running it checks the folder every few minutes. The subject becomes the task title and the sender plus message body become the description. Capture is read-only: Mindwtr never modifies, moves, or deletes your mail, and it remembers what it already imported so nothing shows up twice. Archive or clean the folder whenever you like.

The mailbox is the queue: mail dropped into the folder while your computer is off simply waits there, and the next time Mindwtr opens it catches up. If you need capture with the desktop off entirely, use the [self-hosted recipes](#forward-email-to-a-self-hosted-server) below.

Provider notes:

- **Gmail**: enable 2-step verification, then create an [app password](https://myaccount.google.com/apppasswords); server `imap.gmail.com`
- **iCloud Mail**: create an [app-specific password](https://support.apple.com/102654); server `imap.mail.me.com`
- **Fastmail and standard IMAP servers**: create an app password; use your provider's IMAP host
- **Outlook.com and Microsoft 365**: Microsoft has switched off password-based IMAP, so use the [Power Automate recipe](#outlook-and-microsoft-365-power-automate) instead

## Gmail prototype: desktop and mobile test builds

Gmail capture is available only in maintainer-configured test builds for designated test accounts. It is not generally enabled in release builds. Google production verification and review of email-derived data flows are still open; follow [#1326](https://github.com/dongdongbh/Mindwtr/issues/1326) for progress.

On desktop, open **Settings → Integrations → Gmail**. In the Android or iOS mobile app, open **Settings → GTD → Capture defaults → Gmail**. Connect with Google's authorization screen, check the connected account, and choose an existing Gmail label. Create the label in Gmail first if needed. Connecting or selecting a label imports nothing: choose **Start capture / save label** to confirm. **Check now** requests a check.

Desktop checks run while Mindwtr is open. Mobile checks run when you open or return to Mindwtr and periodically while it stays in the foreground; they pause when the app moves to the background or closes. Labelled mail waits for the next check. Android FOSS builds do not include Google authorization for this feature.

Google grants read-only access to the **whole mailbox** through `gmail.readonly`; your selected label filters what Mindwtr imports. Mindwtr does not send, change, move, or delete email, change labels, or import file attachments. The subject becomes the task title; sender and bounded message text become the description.

Authorization stays in native platform code. Desktop and iOS keep credentials in the operating system's secure store; Android uses the device's Google authorization service and keeps the selected account locally. Tokens stay outside JavaScript, task data, sync, and ordinary backups/exports. A separate device-local database stores account-scoped message receipts only after task data is saved. These receipts do not sync.

Imported email text is ordinary task data. It follows your existing sync, backup, export, and optional AI configuration and consent. Disconnect does not erase copies already stored with those services. Google policy review of these downstream paths remains a prerequisite for general availability.

Reconnecting the same mailbox or changing labels preserves duplicate prevention, task edits, and retained deletions. Disconnect keeps the imported tasks and receipt history. If you reset the device profile and also purge the tasks and their deletion records, old labelled mail can be imported again; remove its label first. A renamed mailbox address counts as a different account in this prototype.

Disconnect stops further capture and removes the local connection before attempting Google access revocation. A save already in progress may finish. Delete unwanted tasks, remote copies, backups, and exports separately. If Google cannot confirm revocation, remove Mindwtr in your Google Account permissions. Revocation can require reconnecting on another device; reconnect and confirm a label to resume.

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

## Why there is no forwarding address

There is deliberately no Mindwtr-hosted forwarding address: a hosted relay would mean routing your private email through project infrastructure, which does not fit a local-first app. The built-in folder watch keeps your mail between your mail server and your own device.
