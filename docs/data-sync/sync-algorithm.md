# Sync algorithm

Mindwtr sync moves JSON snapshots between devices through the backend you choose. The local app remains the source of truth for edits on that device.

## Model

- Each device keeps local SQLite data.
- Sync exports a portable app-data snapshot.
- The backend transports snapshots and attachment files.
- Merge logic combines remote and local data before saving a new local state.

## Merge rules

Mindwtr uses revision-aware last-writer-wins behavior with tombstones for deleted entities. Deletes do not blindly erase restored data. Restores and newer revisions can outrank older tombstones.

## Conflict visibility

Clock skew and repeated conflicts can make sync hard to reason about. When troubleshooting, export a backup first, then inspect diagnostics logs and provider state.

## Attachments

Attachment metadata syncs with task/project data. File bytes sync separately. Uploads publish metadata only after bytes are available so another device does not see an attachment it cannot download yet.

## Practical expectations

Sync is not a replacement for backups. Use sync to keep devices aligned and backups for point-in-time recovery.

## See also

- [Data and sync](/data-sync/)
- [Backup and restore](/data-sync/backup-restore)
- [Diagnostics and logs](/data-sync/diagnostics-logs)
