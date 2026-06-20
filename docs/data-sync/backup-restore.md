# Backup and restore

Backups are the safest way to move data between devices, recover from mistakes, or prepare for sync changes.

## When to export a backup

Export a backup before:

- Restoring data
- Importing from another app
- Switching sync backends
- Testing self-hosted sync
- Deleting local app data

## What a backup contains

A Mindwtr backup contains your app data snapshot, including tasks, projects, lists, review data, and settings supported by the current app build. Attachment handling depends on the platform and backup format.

## Restore behavior

Restore replaces the current local data with the selected backup.

::: danger Restore can overwrite local changes
Export a fresh backup first if there is any chance you need the current local state.
:::

## Good recovery workflow

1. Export a backup from the device with the best current data.
2. Store that backup somewhere outside the app.
3. Restore on the target device.
4. Open the app and inspect Inbox, Projects, Next Actions, Waiting For, and settings.
5. Reconnect sync only after the restored data looks correct.

