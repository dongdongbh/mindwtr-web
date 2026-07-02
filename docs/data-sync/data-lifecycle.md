# Data Lifecycle

A recurring question: what makes `data.json` grow, what shrinks it, and does anything need manual cleanup? Short answer: nothing needs manual cleanup — here is how it works.

## Where your data lives

The local source of truth is a **SQLite database** inside the app's data directory. The `data.json` file you see in your sync folder is a **snapshot** the app rewrites from that database — it is the sync payload and a human-readable backup, not an append log.

Because it is rewritten, its size can go *down* between runs: expired tombstones and purged items simply stop being written. Deleting `data.json` does not "compact" anything; the app regenerates the same snapshot from the database.

## What makes it grow

- Active, completed, and archived tasks (your history stays searchable by design)
- Projects, sections, areas, people, and saved filters
- Attachment **metadata** (a few hundred bytes per attachment — the file bytes live separately under `attachments/`)
- Tombstones for deleted items, kept so other devices learn about deletions

## What shrinks it automatically

- **Tombstone expiry** — records of deletions are pruned after the retention window (90 days by default).
- **Trash purge** — "Delete forever" (per item or Clear all) removes the data immediately and leaves only a tombstone until retention expires.
- **Attachment cleanup** — orphaned attachment metadata and stale pending transfers are pruned with bounded retries (Settings → Data has a manual cleanup too).

## Why one file instead of an archive split

Archived tasks stay in the same synced document on purpose. File backends (WebDAV, folders, Dropbox) upload files independently — splitting active and archived data across files would make archive/unarchive a two-file transaction that can half-apply and diverge between devices. One document merges as one atomic unit. Long-term payload optimization is planned as incremental record sync on top of the existing revision metadata, not as more files. See [Sync algorithm](/data-sync/sync-algorithm) for the merge rules.

## Practical expectations

Years of normal task use lands in the hundreds of kilobytes to a few megabytes — small compared to the `attachments/` folder if you attach files or audio. If the snapshot feels large: empty the Trash, run attachment cleanup in **Settings → Data**, and check `attachments/` before worrying about the JSON.
