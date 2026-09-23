# Diagnostics and Logs

Mindwtr includes built-in diagnostics logging to help troubleshoot sync and crash issues. Logs are **local only**, and sensitive values are **redacted** before writing.

---

## Record with sample data

Choose **Settings → Data → Open sandbox** to try Mindwtr with fictional tasks and projects. A sandbox banner stays visible, with actions to reset the sample data or exit. On mobile, the compact banner reads **Sandbox**, **Reset**, and **Exit**.

The option is near Diagnostics. A confirmation explains the sandbox before you enter; choose **Cancel** to stay in your personal workspace.

The sample workspace includes tasks in different states, areas, projects and sections, recurring tasks, checklists, notes, tags, contexts, people, and date and priority examples. You can edit the examples while recording. Changes are temporary; resetting reloads the original sample set.

Sandbox Settings also lets you temporarily change task editor, display, and date/time preferences. Desktop includes the editor opening mode; mobile includes editor layout presets. These settings are discarded when you exit. Sync, integrations, and device controls are unavailable in the sandbox.

Sample content is available in English, German, French, Spanish, Russian, and Simplified Chinese. It follows your app language, with English used for other languages.

Your personal database stays separate. Exiting the sandbox returns to it, and restarting after the sandbox has opened also returns to your personal workspace. Entry waits for active sync and local writes to finish, and blocks new foreground sync attempts while switching. If the wait times out or a save fails, you stay in your personal workspace. Sandbox edits do not sync or update your widgets, watch, reminders, external calendars, or capture integrations.

Sample data may not reproduce a bug caused by your particular tasks, attachments, or sync history. Review a recording before sharing it: the sandbox does not hide operating-system notifications or other apps.

---

## Enable debug logging

### Desktop
1. Open **Settings → Data**
2. Toggle **Debug logging**
3. Reproduce the issue

**Release diagnostics builds:** Devtools and extra logging are only available if the
desktop app was built with the `diagnostics` feature.

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Mobile
1. Open **Settings → Data**
2. Toggle **Debug logging**
3. Reproduce the issue

---

## Share or clear logs

### Desktop
- Use **Save log** in **Settings → Data → Diagnostics** to save a copy of the log, then attach that file (v1.3.2 and later)
- The log file path is shown on the same screen; on older versions, attach the file at that path
- You can clear logs from the same screen

### Mobile
- Use **Share log** to export a log file
- Use **Clear log** to remove old entries

---

## Default log locations (desktop)

| Platform | Log file |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/data/logs/mindwtr.log` |
| Windows (Microsoft Store) | `%LOCALAPPDATA%/Packages/<package>/LocalCache/Roaming/mindwtr/data/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/data/logs/mindwtr.log` |

The Windows and macOS rows are for v1.3.2 and later. Before v1.3.2 the `logs` folder sat directly in the `mindwtr` folder, for example `%APPDATA%/mindwtr/logs/mindwtr.log`. Linux did not change.

---

## What gets logged

- Sync errors and steps
- Conflict summaries: merges that resolved conflicts are always written to `mindwtr.log`, even with debug logging off, so resolutions stay auditable after the fact. These always-on entries carry record IDs, changed field names, and which side won; record content (titles, notes) is never written.
- Unexpected runtime errors

On mobile, a fatal JavaScript error can leave one local crash record (up to 16 KiB), even with debug logging off. It keeps the time, app/build version, platform, recognized technical error details and bounded stack frames; unrecognized messages are omitted for privacy. On the next successful startup, the record is added to the log. Use **Share log**, or explicitly include diagnostics with feedback, to share it; nothing uploads automatically. **Clear log** also removes the retained crash record. Capture is best effort and does not cover native crashes, system kills or failures before the error handler starts.

Sensitive values (API keys, tokens, passwords, URLs with credentials) are redacted automatically.

---

## Related

- [FAQ](/start/faq)
- [Data and Sync](/data-sync/)
