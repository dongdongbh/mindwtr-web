# Self-hosted Mindwtr Cloud

Mindwtr Cloud is the self-hosted sync option for people who want a Mindwtr-specific server instead of provider-based sync.

## When to use it

Use self-hosted cloud if:

- You want a dedicated Mindwtr sync endpoint
- You are comfortable deploying and updating a small server
- You want to own the hosting account, data location, and access controls

If you only need file-based sync, [WebDAV](/data-sync/webdav) may be simpler.

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

::: warning Keep deployment secrets out of git
Store server tokens, database URLs, and provider credentials in your hosting platform or local secret manager. Do not commit them to a repository.
:::

