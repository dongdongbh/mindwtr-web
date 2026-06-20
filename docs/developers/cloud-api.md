# Cloud API

Mindwtr Cloud exposes the self-hosted sync API used by Mindwtr clients and advanced integrations.

## API areas

| Area | Purpose |
| --- | --- |
| Health | Check whether the server is reachable. |
| Snapshot sync | Upload, download, and merge app-data snapshots. |
| Tasks and projects | Optional structured operations where supported. |
| Search | Query task data through a controlled surface. |
| Attachments | Upload, download, and clean attachment files. |
| MCP adapter | Bridge task data into MCP tools where enabled. |

## Authentication

Self-hosted deployments should use credentials or tokens generated for that deployment. Keep tokens out of git and rotate them if they leak.

## Operational notes

The exact endpoint contract should be checked against the current app repository before building external clients. This page is the orientation layer; the code is the authoritative contract.

## See also

- [Self-hosted cloud deployment](/data-sync/cloud-deployment)
- [Docker deployment](/power-users/docker-deployment)
- [MCP server](/power-users/mcp)
