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
- [File sync](#how-file-sync-works)
- [WebDAV](/data-sync/webdav)
- [Self-hosted Mindwtr Cloud](/data-sync/self-hosted-cloud)

## How file sync works

File sync uses a folder you choose. Mindwtr writes a `data.json` sync snapshot and an `attachments/` folder there, then your sync provider moves those files between devices.

This works with folder-based tools such as Syncthing, iCloud Drive, Dropbox folders, Google Drive, OneDrive, network shares, or any provider that exposes a writable local folder or file picker entry to the device.

::: warning Sync both files and attachments
`data.json` stores task, project, area, section, person, note, and settings metadata. `attachments/` stores attachment files. Keep them together; moving only `data.json` can leave attachment records and files out of sync.
:::

### Setup flow

1. Create a dedicated folder for Mindwtr in your sync provider.
2. On desktop, open **Settings -> Sync**, choose **File**, and select that folder.
3. Export or sync once so the folder contains `data.json` and `attachments/`.
4. Wait for your sync provider to finish uploading and downloading those files.
5. On the next device, open **Settings -> Sync** and select the same folder.

On iOS, some Files providers do not allow folder selection. If the provider is greyed out, select an existing JSON file inside the target folder; Mindwtr will use that location for `data.json`. Not every iOS file-provider bookmark exposes attachment folders reliably, so use native iCloud, Dropbox, WebDAV, or self-hosted Cloud when attachment sync must be dependable across devices.

### Provider notes

- **Syncthing:** Use one dedicated `Mindwtr/` folder and let it fully converge before opening Mindwtr on another device. Do not sync the app data directory directly; mobile storage is sandboxed. If Syncthing creates `attachments (1)` or `attachments (2)`, merge those files back into `attachments/`, delete the duplicate folders, and let Syncthing finish.
- **iCloud Drive:** Works through File Sync on macOS and iOS if you prefer folder sync over native CloudKit. Let Files re-download offloaded files before manual sync.
- **Google Drive and OneDrive on Android:** The official apps do not provide a continuous writable local folder for Mindwtr. Use a bridge app such as Autosync, OneSync, or FolderSync, then point Mindwtr at the bridge app's local synced folder.
- **Dropbox:** Use direct Dropbox OAuth in supported builds when possible. File Sync with a local Dropbox folder or bridge app can still work when you prefer that setup.

### Conflict expectations

Mindwtr merges items inside `data.json`, but the sync provider still sees `data.json` as one file. Avoid editing on two devices at the same time, and wait for provider sync to finish before opening Mindwtr on another device.

If your provider creates conflict files such as `data.json.sync-conflict-*`, export a backup first, keep the newest correct `data.json`, remove the conflict copies, then run manual sync one device at a time.

## Recovery first

Before changing sync setup, export a backup. Before restore/import operations, supported builds create recovery snapshots.

::: warning Sync is not a backup strategy by itself
Sync keeps devices aligned. Backups give you a point-in-time recovery path. Use both when your data matters.
:::

## Troubleshooting

Start with these checks:

1. Confirm the sync target exists and is writable.
2. Confirm `data.json` and `attachments/` finished provider-level sync.
3. Check device clocks.
4. Use manual sync once per device.
5. Export a backup before deleting conflict files.
