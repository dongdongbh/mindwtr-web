# Core API

The `@mindwtr/core` package holds the shared data model, store logic, quick-add parsing, sync merge behavior, and translations used across Mindwtr apps.

## Main areas

| Area | Purpose |
| --- | --- |
| Types | Tasks, projects, sections, areas, people, attachments, recurrence, and app data. |
| Store | Zustand-based task store and actions. |
| Storage adapter | Platform-specific persistence boundary. |
| Quick-add parser | Parses capture syntax such as context, tag, project, due date, and notes. |
| Sync | Snapshot merge and sync-cycle helpers. |
| i18n | Translation keys and locale data. |

## Design rule

Shared behavior belongs in core. Desktop and mobile should not reimplement visibility predicates, recurrence logic, merge semantics, or parser behavior independently.

## Quick-add syntax

| Syntax | Meaning |
| --- | --- |
| `@context` | Add context. |
| `#tag` | Add tag. |
| `+Project` | Assign or create project. |
| `/due:date` | Set due date. |
| `/next` | Move to Next Actions. |
| `/note:text` | Add note text. |

## See also

- [Architecture](/developers/architecture)
- [Database schema](/developers/database-schema)
- [Engineering principles](/developers/engineering-principles)
