# Attachments (Files, Links, Audio)

Mindwtr lets you attach files and links to **tasks** and **projects**. Attachments are optional and sync across devices when sync is enabled.

---

## What you can attach

- **Files** (PDFs, images, docs, etc.)
- **Links** (URLs, web pages, reference links)
- **Audio notes** (when "Save audio attachments" is enabled)
- **Obsidian notes** on desktop, when the Obsidian integration is enabled

---

## Add attachments

### Desktop

- Open a task or project.
- In **Attachments**, click **Add file** or **Add link**.
- Or drag files from your file manager onto an open task editor to attach them.
- For links, paste a URL or local file path.
- In task attachments, **Attach Obsidian Note** appears only after you enable the Obsidian integration.

### Mobile

- Open a task.
- Use **Add attachment** to pick a file or add a link.
- Audio notes are added automatically if you record voice capture and **Save audio attachments** is enabled.

### Copies vs. links

- **Add file** stores a copy of the file inside Mindwtr's own storage. The attachment keeps working even if the original file is later moved, renamed, or deleted. Removing the attachment deletes Mindwtr's copy, not your original file.
- **Add link** stores a pointer. Paste a URL or a local file path (or use **Link to file…** on desktop to browse for one) when you want to reference a file without copying it. A path link breaks if the file moves, which is expected of a link.
- Each attachment row shows which one it is: a paperclip means Mindwtr holds a copy of the file, a link icon means it is a pointer (the tooltip shows the full target).
- File attachments added on desktop before v1.1.0 reference the original path instead of holding a copy (they show the link icon); re-attach a file to convert it into a copy.
- **Attachment files are not inside a JSON backup.** The backup stores each attachment's metadata and path only; on desktop the copies themselves live in an `attachments` folder beside `mindwtr.db`, and you have to copy that folder separately. See [Backup and Restore](/data-sync/backup-restore).

---

## Audio attachments

When you enable **Save audio attachments** (Settings → General), Mindwtr keeps the original voice note alongside the transcript. This is useful if you want to replay or share the recording later.

### Linux audio playback dependencies

Audio playback on Linux uses **GStreamer**. If you see errors like `autoaudiosink not found`, install the GStreamer plugins:

**Arch / Manjaro**
```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav
```

**Debian / Ubuntu / Mint**
```bash
sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav
```

**Fedora** (RPM Fusion required for some codecs)
```bash
sudo dnf install gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly gstreamer1-libav
```

## Sync behavior

- Attachment metadata syncs with tasks/projects.
- Actual files sync after metadata.
- An attachment is not a one-time snapshot: editing the file after attaching it propagates the new content. Each sync cycle checks the files it touches for a changed modification time and size, confirms a real change with a content hash, re-uploads that file, and other devices re-download it.
- Detection of edits to **linked** (external-path) files is desktop-first. Phones re-download updated files on every backend, but only detect their own edits to files in the app's own storage, on File Sync, WebDAV, and iCloud.
- If two devices edit the same file before syncing, the file resolves whole-file last-writer-wins — the later edit replaces the earlier one, with no merging inside the file.
- If a file is missing locally, the attachment stays visible and can be re-downloaded when available.
- Cleanup checks references known to the current device. If another device has not synced yet, shared remote attachment files are not globally reference-counted.

> Tip: Large files can slow sync. Prefer smaller attachments or links when possible.

---

## Cleanup

Mindwtr cleans up **orphaned attachments** (files no longer referenced by any task/project). Cleanup removes local copies and sync metadata. Backends with versioned deletion, such as WebDAV, can also remove the remote object.

- Desktop: You can also run cleanup manually in **Settings → Data → Attachment cleanup**.
- Mobile: Cleanup runs automatically during sync.

File Sync keeps immutable attachment generations in the shared folder after cleanup because a lagging device may still reference them. This protects attachment data, but the folder can grow over time. To reclaim space, export a backup and let every device finish syncing before you remove generation files that you have verified are obsolete. Do not delete other Mindwtr sync files or a generation you cannot identify.

---

## Related

- [Data and Sync](/data-sync/)
- [User Guide Desktop](/use/desktop)
- [User Guide Mobile](/use/mobile)
