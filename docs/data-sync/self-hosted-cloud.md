# Self-hosted Mindwtr Cloud

Mindwtr Cloud is the self-hosted sync option for people who want a Mindwtr-specific server instead of provider-based sync. Mindwtr's self-hosted cloud backend is a small sync server under `apps/cloud`; it is a sync endpoint for desktop/mobile clients, not the Mindwtr app UI.

## When to use it

Use self-hosted cloud if:

- You want a dedicated Mindwtr sync endpoint
- You are comfortable deploying and updating a small server
- You want to own the hosting account, data location, and access controls

If you only need file-based sync, [WebDAV](/data-sync/webdav) may be simpler.

## Canonical references

- Use [Data and Sync](/data-sync/) for choosing a sync backend and configuring the client.
- Use [Cloud Deployment](/data-sync/cloud-deployment) for server setup, operations, and environment variables.
- Use [Cloud API](/developers/cloud-api) for `/v1` endpoint details.
- Use [Docker Deployment](/power-users/docker-deployment) if you want the Docker-based deployment path.


## Quick orientation

- The self-hosted cloud backend stores one JSON namespace per bearer token.
- Clients point at the `/v1` base URL and sync through `GET /v1/data` and `PUT /v1/data`.
- `/v1/data` is the canonical sync contract; task, project, area, section, search, and attachment routes are optional convenience APIs.
- Attachment APIs live under `/v1/attachments/...`.
- Deploy it behind HTTPS and treat the bearer token like a password.
- HTTPS is required for public URLs. HTTP is accepted only for local/private targets such as `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` through `172.31.x.x`, `192.168.x.x`, loopback/private IPv6 addresses, `*.local`, and `*.home.arpa`.

## Deployment shape

A typical deployment includes:

- The Mindwtr Cloud server
- A persistent database or storage backend
- HTTPS in front of the server
- A server URL configured in each Mindwtr client
- A token or credential you create for your own deployment

## Setup checklist

1. Export a backup from your main device.
2. Deploy the server using the current instructions from the Mindwtr repository.
3. Confirm the server health endpoint responds over HTTPS.
4. Configure Mindwtr with your server URL and credential.
5. Run manual sync and verify the same data appears on a second device.

## Calendar subscription

A self-hosted server can publish a read-only iCalendar feed of your scheduled tasks and deadlines, so any calendar app can subscribe to them.

1. In Mindwtr desktop, open Settings, then Sync, with Self-hosted selected.
2. Under Calendar subscription, choose **Generate URL**.
3. Copy the URL and add it as a subscribed calendar in your calendar app.

The feed shows what the Calendar view shows: scheduled tasks at their start time, deadlines as all-day events on their due date, and nothing that is completed, archived, reference, deleted, or in a non-active project. Events carry the task title only — descriptions, checklists, attachments, tags, and projects are never published.

::: warning Anyone with the URL can read the feed
The URL is the only credential; there is no password on it. Share it the way you would share a secret link, and choose **Regenerate** to invalidate the old URL or **Revoke** to take the feed down entirely.
:::

The feed is read-only. Editing an event in your calendar app does not change the task in Mindwtr, and this is not CalDAV — the feed is one-way.

::: warning Keep deployment secrets out of git
Store server tokens, database URLs, and provider credentials in your hosting platform or local secret manager. Do not commit them to a repository.
:::

::: tip Server on a LAN address (home lab, reverse proxy)
When the server URL points at a local network address, Apple devices ask for Local Network permission on first contact; approve the prompt or enable Mindwtr later under Privacy & Security, then Local Network. If the Mac app never shows the prompt and cannot reach the server, update it: builds before v1.1.5 did not declare the permission, so macOS 15 and later denied local addresses silently.
:::

