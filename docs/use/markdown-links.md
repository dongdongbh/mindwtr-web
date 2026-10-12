# Markdown Links

Mindwtr supports internal Markdown links for cross-referencing tasks and projects inside notes.

## Supported Syntax

Use stable Mindwtr IDs instead of plain text titles:

```md
[[task:task-id|Quarterly review]]
[[project:project-id|Website launch]]
```

- `task:` links point to a task by ID.
- `project:` links point to a project by ID.
- The text after `|` is the label shown in the editor and preview.

Mindwtr also normalizes those tokens into regular Markdown links during rendering:

```md
[Quarterly review](mindwtr://task/task-id)
[Website launch](mindwtr://project/project-id)
```

## Copy a task link or ID

Choose **Copy task link** or **Copy task ID** from the task menu on desktop or mobile. Copying is read-only and does not save pending editor changes. The app-opening link uses this format:

```text
mindwtr://open?task=task-id
```

Open it from another app to find that exact task in Mindwtr, including when Mindwtr is closed. The current library must already contain the task. This is a reference, not a public sharing link: it uploads no task content and grants nobody access to your data. **Copy task ID** provides the plain identifier for scripts or an already authorized API/MCP connection. Internal Markdown references above remain a separate format.

## Creating Links

When editing a supported Markdown field, type `[[` and start searching.

- Search matches task and project titles.
- Desktop shows a floating suggestion popup near the cursor and flips it above the caret when space is tight.
- Mobile shows the same suggestions in a bottom sheet above the keyboard.
- Task editors exclude the task you are currently editing, so you do not link a task to itself by accident.
- Inserted links always use the stable `[[task:...|label]]` or `[[project:...|label]]` token.
- Code spans and fenced code blocks are left untouched.

## Where It Works

- Task descriptions on desktop and mobile
- Project notes on desktop and mobile
- Read-only previews, expanded task details, and Focus/List "Details on" rendering on desktop
- Preview rendering inside the mobile task/project editors

## What It Does Not Do

- Markdown links are navigational references only.
- They do not create dependency graphs, auto-complete linked tasks, or bind checklist state across tasks.

## Navigation Behavior

- Live task links open the right Mindwtr view and highlight the task.
- Live project links open the Projects view and select the project.
- External links still support `http`, `https`, `mailto`, `tel`, and `upnote`.

## Deleted Items

If the linked task or project has been deleted:

- Mindwtr renders the label with strike-through styling.
- Desktop shows a **Restore** action when the deleted item still exists as a tombstone in local data.
- If the tombstone is gone, the link stays as a non-interactive deleted label.

## Example

```md
Prepare launch notes for [[project:project-123|Website launch]]

- [ ] Draft intro copy
- [ ] Review [[task:task-456|homepage checklist]]
```

## Related Docs

- [Obsidian Integration](/power-users/obsidian)
- [Core API](/developers/core-api)

## UpNote links

You can add an UpNote note link through **Add link**, or use an explicit Markdown link in a task description or project note:

```md
[Meeting notes](upnote://x-callback-url/openNote?noteId=NOTE_ID&new_window=true)
```

Mindwtr opens the link only when you click or tap it. UpNote must be installed on that device. If opening fails, Mindwtr offers **Copy link** so you can keep using the original address. Mindwtr stores the link; UpNote manages the note and its synchronization.
