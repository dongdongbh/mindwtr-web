# WebDAV sync

WebDAV sync is for people who want a standard, self-controlled storage endpoint without running the Mindwtr Cloud server.

## When to use it

Use WebDAV if:

- You already have a WebDAV server
- You want cross-platform sync
- You prefer infrastructure you control
- You are comfortable managing server URLs and credentials

## Setup checklist

1. Export a backup.
2. Create a dedicated folder for Mindwtr on your WebDAV server.
3. Enter the server URL and credentials in Mindwtr.
4. Run manual sync on the first device.
5. Connect one additional device and confirm a test task syncs both ways.

::: tip Dedicated folder
Use a folder reserved for Mindwtr sync data. Do not mix app sync files with unrelated documents.
:::

## Troubleshooting

- Confirm the URL points to a writable folder.
- Check server certificate validity.
- Confirm upload and overwrite permissions.
- Watch for provider-side rate limits or file locking.
- Export a backup before deleting server-side files.

