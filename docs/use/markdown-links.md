# Markdown links

Mindwtr supports internal Markdown links for cross-referencing tasks and projects inside notes.

## Syntax

Use stable Mindwtr IDs instead of title-only references:

```md
[[task:task-id|Quarterly review]]
[[project:project-id|Website launch]]
```

Mindwtr can render these as app links:

```md
[Quarterly review](mindwtr://task/task-id)
[Website launch](mindwtr://project/project-id)
```

## Where it works

- Task descriptions.
- Project notes.
- Desktop previews and expanded task details.
- Mobile editor previews where supported.

## Behavior

Task links open the task. Project links open the project. Deleted items render as deleted references when enough tombstone data is still available locally.

Markdown links are references. They do not create dependencies, auto-complete linked tasks, or bind checklist state.

## See also

- [Obsidian integration](/power-users/obsidian)
- [Core API](/developers/core-api)
