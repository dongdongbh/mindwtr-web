# Testing strategy

Mindwtr tests should protect shared behavior first, then platform behavior, then release-specific packaging assumptions.

## Layers

| Layer | What it protects |
| --- | --- |
| Core | Data model, parser, merge, recurrence, visibility, i18n. |
| Desktop | Tauri integration, SQLite persistence, keyboard/UI workflows. |
| Mobile | React Native views, sync service, permissions, platform capture. |
| Cloud | API contracts, auth, snapshot sync, attachment endpoints. |
| MCP | Tool contracts and safe task operations. |

## What to test first

Test shared behavior in core when possible. Add platform tests when the behavior depends on permissions, native storage, packaging, or UI integration.

## Regression checklist

- Reproduce the bug.
- Add a failing test or documented manual repro.
- Fix the root cause.
- Verify the specific regression.
- Run the relevant package checks.

## See also

- [Engineering principles](/developers/engineering-principles)
- [Developer troubleshooting](/developers/troubleshooting)
