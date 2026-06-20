# Diagnostics and logs

Mindwtr includes local diagnostics logging for troubleshooting sync, storage, and runtime issues.

## Enable debug logging

On desktop and mobile, open Settings, go to Data, and enable debug logging. Reproduce the issue, then export or inspect the log.

## Desktop log locations

| Platform | Default path |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

## Diagnostics builds

Desktop release diagnostics require a build with the diagnostics feature:

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

## Redaction

Logs are local. Sensitive values such as API keys, tokens, passwords, and credential-bearing URLs are redacted before writing.

## Bug reports

When reporting a sync or crash bug, include the platform, version, install channel, sync backend, steps to reproduce, and the relevant redacted log excerpt.

## See also

- [FAQ](/start/faq)
- [Data and sync](/data-sync/)
- [Developer troubleshooting](/developers/troubleshooting)
