# Self-hosted cloud deployment

Mindwtr Cloud is the self-hosted sync server. Use it when you want a Mindwtr-specific endpoint instead of iCloud, Dropbox, WebDAV, or file sync.

## Deployment shape

A typical deployment has:

- Mindwtr Cloud server.
- Persistent database or storage backend.
- HTTPS reverse proxy.
- Server URL configured in each client.
- Token or credential for your deployment.

## Runbook

1. Export a backup from your main device.
2. Deploy the server from the current repository instructions.
3. Configure environment variables in your hosting platform, not in git.
4. Put HTTPS in front of the service.
5. Check health and logs.
6. Connect one test client.
7. Connect a second device and confirm data appears.

## Operations

Plan for backups, token rotation, upgrade rollback, attachment cleanup, and log review. Treat the server like any other personal data service.

::: warning Keep secrets out of repositories
Do not commit database URLs, API tokens, auth secrets, or provider credentials. Store them in your platform's secret manager or local environment.
:::

## See also

- [Self-hosted cloud](/data-sync/self-hosted-cloud)
- [Docker deployment](/power-users/docker-deployment)
- [Cloud API](/developers/cloud-api)
