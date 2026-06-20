# Docker deployment

Docker is the simplest way to run self-hosted Mindwtr services consistently.

## What Docker can run

- Mindwtr web app.
- Mindwtr Cloud sync server.
- Supporting storage or reverse-proxy services, depending on your deployment.

## Basic workflow

1. Read the current repository deployment instructions.
2. Create environment variables outside git.
3. Start the services.
4. Put HTTPS in front of any browser or sync endpoint.
5. Verify health checks and logs.
6. Connect one test client before moving real data.

## Persistence

Mount persistent storage for database files, uploaded attachments, and any server state. Back up those volumes before upgrades.

## See also

- [Self-hosted cloud deployment](/data-sync/cloud-deployment)
- [Cloud API](/developers/cloud-api)
