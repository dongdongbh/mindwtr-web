# Backup and Restore

Mindwtr stores your working data locally and lets you export JSON backups for portability, repair, and migration.

Restore is designed as a **local data replacement** flow:

- You choose a backup JSON file
- Mindwtr validates it before changing anything
- Mindwtr creates a recovery snapshot first when possible
- The selected backup replaces the current local dataset

This keeps restore simple and predictable. It is not a merge operation — for that, use **Merge Backup** instead.

---

## Export Backup

### Desktop

1. Open **Settings → Data**
2. In **Backup**, choose **Export Backup**
3. Save the JSON file where you want

### Mobile

1. Open **Settings → Data**
2. Tap **Export Backup**
3. Save or share the JSON file

The backup format is compatible with Mindwtr’s internal `data.json` structure.

---

## Restore from Backup

### Desktop

1. Open **Settings → Data**
2. In **Backup**, choose **Restore Backup**
3. Select a Mindwtr backup JSON file
4. Review the summary and confirm restore

Before restore, desktop creates a data snapshot in the local snapshot directory when the Tauri runtime is available.

### Mobile

1. Open **Settings → Data**
2. Tap **Restore Backup**
3. Select a Mindwtr backup JSON file
4. Review the summary and confirm restore

Before restore, mobile saves a local recovery snapshot in app storage.

---

## Merge from Backup

**Merge Backup** sits beside Restore on both platforms and combines a backup file with your current data instead of replacing it. It uses the same rules as sync:

- Items only in the backup are added
- Where both copies exist, the newer one wins
- Items only on this device stay
- Items you deleted on this device stay deleted, even if the backup still holds a live copy

After the merge, Mindwtr reports how many tasks were added and updated. A recovery snapshot is saved first when possible, so a merge can be rolled back like a restore.

Use merge to consolidate a second Mindwtr instance (a work phone, a travel laptop) into your main one, or to move changes between devices without wiping either side. Use restore when you want the backup to replace what is on the device.

---

## Recovery Snapshots

Native desktop and mobile apps create recovery snapshots automatically before backup restore and supported data imports, including Settings imports and confirmed bulk text capture. The browser/PWA build has no local snapshot directory.

- **Desktop**: snapshots appear in **Settings → Sync → Recovery Snapshots**
- **Mobile**: snapshots appear in **Settings → Sync → Recovery Snapshots**

Use these when you restored the wrong file or want to roll back a local import/restore operation.

Snapshots contain Mindwtr data only. They cannot restore source items deleted from another app, including reminders removed from Apple Reminders after import.

---

## Validation Rules

Mindwtr validates the selected JSON file before restore:

- the file must be valid JSON
- it must match Mindwtr’s data shape
- item counts and backup metadata are shown when available
- version mismatches produce warnings instead of silent failure

If validation fails, restore is blocked and your current data stays unchanged.

---

## What Restore Does Not Do

- It does **not** merge the backup with your current local data (that is what **Merge Backup** is for)
- It does **not** restore only one task or one project
- It does **not** overwrite remote sync services by itself until your next sync cycle

If you use sync, think of restore as replacing the current local state first. Sync behavior after that depends on your backend and which device syncs next.

---

## Restore and Sync

A restore is treated as a deliberate decision, not as one more edit to be merged:

- Records the backup contains are written back at a revision above whatever the remote holds, so the restored version wins the next merge
- Records the restoring device knew about but the backup does not contain are marked deleted, so the remote does not hand them back on the next sync

That second point is what makes a restore stick. Without it, anything created after the backup was taken still exists on the remote, and the next sync reads its absence as a new record and restores it.

Records this device had never seen are left alone. If another device created tasks while this one was offline, restoring a backup here does not delete them.

Because a restore now propagates those deletions to every synced device, restore on one device and let it sync before using the others.

---

## Tips

- Keep periodic manual exports in addition to sync
- Restore only from backups you trust
- If you are using file sync, wait for the correct `data.json` to finish replicating before syncing another device

See also [Data and Sync](/data-sync/).
