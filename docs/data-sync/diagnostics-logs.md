# Diagnostics and Logs

Mindwtr includes built-in diagnostics logging to help troubleshoot sync and crash issues. Logs are **local only**, and sensitive values are **redacted** before writing.

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
- The log file path is shown in **Settings → Data**
- You can clear logs from the same screen

### Mobile
- Use **Share log** to export a log file
- Use **Clear log** to remove old entries

---

## Default log locations (desktop)

| Platform | Log file |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## What gets logged

- Sync errors and steps
- Conflict summaries — merges that resolved conflicts are always written to `mindwtr.log`, even with debug logging off, so resolutions stay auditable after the fact. These always-on entries carry record IDs, changed field names, and which side won; record content (titles, notes) is never written.
- Unexpected runtime errors

Sensitive values (API keys, tokens, passwords, URLs with credentials) are redacted automatically.

---

## Related

- [FAQ](/start/faq)
- [Data and Sync](/data-sync/)
