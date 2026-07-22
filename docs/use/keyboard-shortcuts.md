# Desktop keyboard shortcuts

Mindwtr desktop supports keyboard-first use with Standard (Gmail/Todoist-style), Vim, and Emacs presets. Press `?` in the app to open the current shortcut help for the preset you are using.

## Quick start

- Choose your preset in **Settings -> General -> Keyboard Shortcuts**.
- Press `?` in the app to open the current shortcut sheet for the preset you are using. The sheet ends with a quick-add syntax table listing every token (`/start:`, `/note:`, `@context`, `+Project`, …).
- Use `/` to search.
- Use `gi` for Inbox, `gn` for Next Actions, and `gf` for Focus (Standard and Vim modes).
- Use `a` to add a task when Mindwtr is focused. `o` still works for the same app-scoped add-task action.
- Use `j` and `k` to move selection, and `Enter` to open the selected task.
- In Standard mode, use `e` to mark done, `x` to select tasks for batch actions, `S` to add or remove the selected task from today's focus, `F2` to rename it, `Shift+Enter` to edit, `#` to delete, and `z` to undo.
- In Vim mode, use `e` to edit, `x` to toggle done, and `dd` to delete.
- Use `Ctrl+Z` / `Cmd+Z` to undo the last task completion or deletion in any preset.
- Use `s` followed by a letter to set the selected task's status in any preset: `si` Inbox, `sn` Next, `sw` Waiting, `ss` Someday, `sd` Done, `sa` Archived. A toast confirms the change with an undo button.
- Use `Insert` to jump to the add-task input (it opens quick add in views without one).
- Press `1`-`9` (outside any text field) to switch to an Area by sidebar order, and `0` to clear the Area filter; the `Shift+A` chord followed by the number still works too. Plain `a` opens quick add.
- Use `Ctrl+Alt+S` to run manual sync on desktop.
- In the right-click / Shift+F10 context menu: ↑/↓ move between items, → opens a submenu panel and ← comes back, Enter activates, Esc closes and returns focus to the task.

Shortcuts are ignored while typing in editable fields when the shortcut would conflict with text entry.

The desktop guide remains the canonical reference for the current shortcut tables, quick-add customization, keyboard behavior notes, and edge cases.

## Global quick add

Change or disable the global Quick Add shortcut in **Settings -> General -> Input**. Global shortcuts depend on desktop platform permissions and packaging.

The global Quick Add shortcut is different from the app-focused `a` shortcut. The global shortcut can fire from other apps; `a` only works while Mindwtr itself has focus and you are not typing in a text field.

## See also

- [Desktop guide](/use/desktop)
- [Getting started](/start/getting-started)
