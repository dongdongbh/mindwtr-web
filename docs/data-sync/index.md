# Data and sync

Mindwtr is local-first. Your tasks, projects, notes, settings, and attachments start on your device. Sync is optional and uses a backend you choose.

## Quick recommendations

| Need | Best option |
| --- | --- |
| Apple-only devices | Native iCloud / CloudKit |
| Easiest cross-platform cloud sync | Dropbox OAuth in supported builds |
| Self-controlled remote sync | WebDAV or self-hosted Mindwtr Cloud |
| Device-to-device folder sync | File sync with Syncthing or a sync-provider folder |
| Maximum portability | Regular backup export |

## What Mindwtr stores locally

Desktop uses SQLite as the primary local store and exports a JSON snapshot for sync and backup. Mobile also uses local SQLite plus a JSON backup/sync snapshot.

## Sync backends

- [iCloud / CloudKit](/data-sync/icloud)
- [Dropbox OAuth](/data-sync/dropbox)
- File sync
- [WebDAV](/data-sync/webdav)
- [Self-hosted Mindwtr Cloud](/data-sync/self-hosted-cloud)

## Recovery first

Before changing sync setup, export a backup. Before restore/import operations, supported builds create recovery snapshots.

::: warning Sync is not a backup strategy by itself
Sync keeps devices aligned. Backups give you a point-in-time recovery path. Use both when your data matters.
:::

## Troubleshooting

Start with these checks:

1. Confirm the sync target exists and is writable.
2. Confirm all devices finished provider-level sync.
3. Check device clocks.
4. Use manual sync once per device.
5. Export a backup before deleting conflict files.

