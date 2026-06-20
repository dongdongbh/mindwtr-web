# Architecture

Mindwtr is a local-first GTD app with shared core logic across desktop, mobile, cloud, automation, and web surfaces.

## High-level shape

| Area | Role |
| --- | --- |
| Core package | Shared GTD data model, utilities, sync types, import/export logic |
| Desktop app | Native desktop shell and local SQLite-backed experience |
| Mobile app | Native mobile experience, local storage, notifications, widgets |
| Cloud server | Optional self-hosted sync endpoint |
| MCP and APIs | Optional automation surfaces for advanced users |

## Data model

Mindwtr centers on GTD concepts:

- Tasks
- Projects
- Contexts
- Tags
- Notes
- Waiting and someday states
- Review metadata
- Attachments where supported

The product constraint is local-first behavior. Remote sync and automation should not make an account mandatory for normal use.

## Sync design

Mindwtr clients keep local state and synchronize through a selected backend. Supported strategies include provider sync, file-based sync, WebDAV, and self-hosted cloud.

Important sync expectations:

- Preserve local usability when offline.
- Keep backups separate from sync state.
- Treat conflict handling as a user-data safety problem.
- Avoid adding hosted-only requirements to core workflows.

## Contribution boundaries

When changing shared behavior, check every surface that consumes it: desktop, mobile, sync, import/export, and automation. A small core change can affect many user-facing paths.

