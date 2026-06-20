# Database schema

Mindwtr stores local data in SQLite on native platforms, with JSON snapshots for sync and backup.

## Main entities

- Tasks.
- Projects.
- Sections.
- Areas.
- People.
- Tags and contexts.
- Attachments.
- Settings and app metadata.
- Tombstones for deleted/restorable entities.

## Schema principles

- Local writes must be durable before the UI reports success.
- Entity revisions guard merge behavior.
- Deletes detach and tombstone rather than blindly cascading through shared data.
- Attachments have metadata separate from file bytes.
- App data surfaces such as people and settings must survive backup, restore, and sync normalization.

## Migrations

Schema migrations should be idempotent, testable, and safe on existing user data. Backward-compatible export/import behavior matters because backups and sync snapshots may cross versions.

## See also

- [Core API](/developers/core-api)
- [Sync algorithm](/data-sync/sync-algorithm)
- [Backup and restore](/data-sync/backup-restore)
