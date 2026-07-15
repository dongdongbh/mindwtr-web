# User Guide: Desktop

The Mindwtr desktop app is built with [Tauri v2](https://tauri.app/), providing a lightweight, fast experience across Windows, macOS, and Linux.

## Overview

The desktop app features a sidebar navigation with all GTD views and a main content area.

---

## Interaction Patterns

- **Single click** toggles task details.
- **Double click** on a task opens full edit mode. To rename just the title in place, pick **Rename task** from the task's `⋯` menu (Enter saves, Esc cancels).
- **Click outside** an open task editor to close it while nothing was changed; once a field was edited, closing requires Save, Cancel, or Esc.
- **Right click** opens context menus (projects, tasks).
- **Keyboard first**: global shortcuts and Vim/Emacs modes are optimized for desktop workflows.

If you keep pushing a task's due date later, its row shows a small hourglass badge with the number of postponements (after the third push) next to the due date. The badge is a nudge that the task may need re-clarifying, delegating, or dropping instead of another deferral.

Most task lists share the same control row for selecting tasks, filtering, sorting, grouping, showing details, and switching compact density. Use **Group** to organize Inbox, Next, Waiting, Someday/Maybe, Reference, Done, and other list views by metadata such as context, area, project, or tag.

## Focus Mode

Use Focus Mode to hide the sidebar and keep the list centered (800px max width).

- Toggle with **Ctrl+\\** (Windows/Linux) or **Cmd+\\** (macOS)
- Great for deep work or reviews

### System Tray

Mindwtr runs in the background to handle auto-sync.

- **Closing the window** minimizes the app to the system tray instead of quitting.
- **Click the tray icon** to show/hide the window.
- **Right-click the tray icon** to Quit the application completely.

## Views

### 📥 Inbox

Your capture zone. All new tasks land here before processing.

- **Add tasks** using the input field at the bottom
- **Quick-add syntax** is supported (see [Getting Started](/start/getting-started))
- Use the star beside the Quick Add input when a new task should go straight into **Today's Focus**. The same star also sits in the task editor's header. Starring counts as clarifying: a starred capture is created as a **Next Action** rather than an Inbox item, and moving a starred task back to Inbox removes its star.
- **Process Inbox** using the clarify workflow
- **Mind Sweep** prompts you through common life/work areas when you want a guided capture session instead of a blank input.

### 🎯 Focus

Your unified dashboard for daily engagement. Focus is not a full inventory of every task with status `next`; it narrows the list to work that is available now.

- **Today's Focus**: Starred priority tasks for deep work, up to your configured Focus limit.
- **Overdue**: Past due items.
- **Due Today**: Tasks due today.
- **Next Actions**: Ready tasks without due dates, filtered by context.
- **Review Due**: Items with tickler dates.

Focus hides future-start tasks and later tasks in sequential projects. Use **Contexts**, **Projects**, or **Search** when you need to inspect broader task inventory.

**Default Next Actions order:** Focus puts due-soon actions first, undated actions next, and far-future due actions last. Within the same bucket it uses priority when enabled, then start time, creation date, title, and id. See [GTD Workflow in Mindwtr](/use/gtd-workflow#how-focus-sorts-available-actions) for the full logic.

**Features:**
- **Context Filters**: Filter Next Actions by context (e.g., @home, @work) or tag. The filter picker groups contexts and tags so long metadata lists stay scannable.
- **Group by Context**: Use the list grouping control to group Next Actions by primary context, with context-less tasks collected under **No context**.
- **Saved Filters**: Save reusable Focus criteria such as projects, contexts, tags, priority, energy level, and time estimates.
- **Zen Mode**: Toggle to hide everything except Today's Focus tasks.
- **Pomodoro (Optional)**: Enable in **Settings → GTD → Features → Pomodoro timer** to show a focus/break timer panel (15/3, 25/5, 50/10, plus one optional custom preset). Leave it as **Timer only**, or turn on **Link timer to task** to show the Timer task picker and **Mark task done** action.

### 📁 Projects

Multi-step outcomes containing related tasks.

- **Sequential mode**: Only the first available project task appears in Focus
- **Parallel mode**: All available project tasks can appear in Focus
- **Sequential scope**: Sequential projects can advance project-wide or section-by-section; section scope shows the first available task in each section.
- **Status**: Active, Waiting, Someday, Archived
- **Areas of Focus**: Group projects by higher-level areas (e.g., Work, Health) to keep your sidebar organized. Drag a project onto an area to move it there; while dragging, collapsed and empty areas (and **No area**) show up as drop targets too.
- **Move tasks by drag**: Drag a task from the open project's list onto another project in the sidebar to move it there (it lands after the target's existing tasks), or onto an area header to make it a direct area task. Works in every sort mode; a **Moved to …** toast offers one-click Undo, and archived projects don't accept drops.
- **Project tags**: Tag projects and filter by tag
- **Support notes**: Add planning notes and reference material
- **Sections**: Optional task groupings inside a project (phases, milestones, sub-workstreams). Sections are headings inside one project, not subtasks or separate projects.
- **Review date**: Set tickler dates for project review
- **Archive**: Completing a project means archiving it — remaining tasks are completed with it, and **Reactivate** undoes it

The **Project Section** field in the task editor assigns a task to one of the sections in its current project. It only has a useful value after the task belongs to a project that has sections.

### 🏷️ Contexts

Filter tasks by location or tool context:

- `@home`, `@work`, `@errands`, `@agendas`
- `@computer`, `@phone`, `@anywhere`

### 🏷️ Tags

Filter tasks by energy level, mode, or topic:

- Energy: `#focused`, `#lowenergy`, `#creative`
- Topic: `#health`, `#finance`

### ⏳ Waiting For

Track delegated items or tasks waiting on external events.

### 💭 Someday/Maybe

Incubate ideas you might want to pursue later.

### 🗓️ Calendar

Time-based view of tasks with due dates or start times.

On wide layouts, the Calendar includes a **Plan next actions** panel for the selected day. It surfaces unscheduled Next Actions and due-but-unscheduled tasks so you can place them into open time without leaving Calendar. Collapse the panel when you want more room for the day/week grid.

### 📋 Board View

Kanban-style drag-and-drop board with columns:

- **Inbox**: Unprocessed items
- **Next Actions**: Ready to work on
- **Waiting For**: Delegated items
- **Someday/Maybe**: Deferred items
- **Done**: Completed tasks

Drag cards within a column to set manual board order. Moving a task to another status clears its old column order so it can be ordered in the new column.

Use the Board search field to narrow visible cards by title, notes, project, context, or tag. The filter button opens quick filters for contexts, tags, due dates, and projects; **Clear filters** removes both search text and active filters.

### ✅ Done

Recently completed tasks. Use this as your short-term completion log for daily or weekly review.

If you finished a task earlier than you marked it Done, click its **Completed** timestamp to correct it. You can also right-click the complete button on any open task to mark it Done as of an earlier time. This helps when the completion time matters for your records or for "repeat after completion" scheduling.

### 📦 Archived

Completed tasks that have been filed away. Archived tasks are hidden from normal task lists, but you can search or restore them here. Click a task's **Completed** timestamp to correct it.

Choose **Select** to pick tasks or **Select All**. You can restore the selection to Inbox or move it to Trash. Mindwtr permanently deletes tasks only from Trash.

### 🗑️ Trash

Deleted tasks and projects, newest first. Restore items, delete them permanently, or use **Clear Trash** to empty everything at once. Choose **Select** to pick several tasks and projects (or **Select All**) and restore or permanently delete them in one step. Permanent deletion always asks for confirmation.

### 📝 Weekly Review

Guided GTD review wizard with steps:

1. Process Inbox
2. Review Calendar
3. Follow up Waiting For
4. Review Projects
5. Review Someday/Maybe

Use the **Process Inbox** action in the review to clear captured items before continuing through calendar, waiting-for, projects, and someday review.

See [Weekly Review](/use/weekly-review) for detailed guidance.

---

## AI Assistant (Optional)

Enable in **Settings → AI assistant**:

- **Clarify**: turn vague tasks into concrete next actions
- **Break down**: generate checklist steps for big tasks
- **Review analysis**: highlight stale tasks during review
- **Copilot**: context/tag/time suggestions while typing

AI is optional and only runs when you request it.

---

## Reusable Lists

Use checklists as templates:

- **Duplicate task**: copy a master list (packing, travel prep)
- **Reset checklist**: uncheck everything for reuse (groceries)

---

## Task Editor (View + Edit)

- Click a task to open a **read-only view** of all details.
- Press **Edit** (or `e`) to switch to edit mode.
- The editor starts minimal. Use **More options** to reveal advanced fields.
- **Project Section** is an organizational field for tasks inside a sectioned project. Leave it blank for Inbox tasks, unassigned tasks, or projects without sections.
- Status, Priority, and Energy Level use pill controls instead of dropdowns for faster keyboard and pointer selection.
- Date fields include quick chips for **Today**, **Tomorrow**, **+3 days**, **Next week**, **Next month**, and **No date**.
- In **Settings → GTD → Task Editor Layout**, choose whether the desktop editor opens as the inline side peek or a centered pop-up.

---

## Calendar Integration

Mindwtr can overlay external calendars in the Calendar view. On macOS it can read Apple Calendar through EventKit; on all desktop platforms it can read direct ICS subscription URLs.
Add an **ICS URL** in **Settings → Calendar** when you need an ICS subscription.
External events are read-only, but you can create a separate Mindwtr task from an event in Calendar; Mindwtr copies the event title, date/time, location, description, and calendar name where available.
Use **Plan next actions** in Calendar to turn the selected day into a planning surface: review unscheduled work, choose a task, and schedule it into a free slot while keeping due dates as deadlines.
On macOS, **Push tasks to calendar** can also write scheduled/due Mindwtr tasks into a selected writable Apple Calendar target. See [Calendar Integration](/use/calendar-integration) for setup details.

### 🔍 Global Search

Powerful search with operators to find anything instantly.

**Open:** Press `/` or `Ctrl/Cmd + K` or click the search icon.

#### Search Operators

| Operator    | Example            | Description                   |
| ----------- | ------------------ | ----------------------------- |
| `status:`   | `status:next`      | Filter by task status         |
| `-status:`  | `-status:done`     | Exclude a status              |
| `context:`  | `context:@home`    | Filter by context             |
| `tag:`      | `tag:#focused`     | Filter by tag                 |
| `assigned:` | `assigned:Tom`     | Filter by delegated assignee  |
| `project:`  | `project:HomeReno` | Filter by project name or ID  |
| `location:` | `location:office`  | Filter by task location       |
| `where:`    | `where:office`     | Alias for task location       |
| `id:`       | `id:abc123`        | Find an exact task ID         |
| `-id:`      | `-id:abc123`       | Exclude an exact task ID      |
| `due:`      | `due:today`        | Tasks due on date             |
| `due:<=`    | `due:<=7d`         | Tasks due within 7 days       |
| `start:`    | `start:>=tomorrow` | Tasks starting from date      |
| `created:`  | `created:>=30d`    | Tasks created in last 30 days |
| `OR`        | `@home OR @work`   | Match either condition        |

**Date formats:** `today`, `tomorrow`, `7d` (7 days), `2w` (2 weeks), `1m` (1 month), `2025-01-15`

#### Saved Searches

Saved Searches are shortcuts for reusable search queries:

1. Enter your search query with operators
2. Click **"Save Search"** button
3. Name your search (e.g., "Work tasks due soon")
4. Access from the **Saved Searches** section in the sidebar

**To delete a saved search:** Open the saved search, then click the trash icon.

Saved Searches are separate from **Saved Filters** in Focus. Focus Saved Filters sync as filter criteria and are edited from the Focus filter controls.

---

## Quick Capture

### Global Hotkey

Capture tasks from anywhere on your desktop without switching windows:

1. Press the global hotkey (`Ctrl+Alt+M`)
2. Type your task with quick-add syntax
3. Press Enter to add to Inbox
4. Continue what you were doing

You can change or disable this shortcut in **Settings → General → Input → Global quick add shortcut**.
Defaults follow platform conventions:
- macOS: `Ctrl+Option+M` (default), `Ctrl+Option+N`, `Ctrl+Option+Q`, or legacy `Cmd+Shift+A`
- Linux: `Ctrl+Alt+M` (default), `Ctrl+Alt+N`, `Ctrl+Alt+Q`, or legacy `Ctrl+Shift+A`
- Windows: disabled by default so Mindwtr never silently takes a key combination away from other apps; `Ctrl+Alt+M` is the recommended choice when you enable one
- Avoid the legacy `Ctrl+Shift+A` option: Chrome, Word, and Excel all use it, and a global hotkey overrides them system-wide

**Flatpak/Wayland note:** Some compositors do not allow app-registered global shortcuts. In that case, bind your desktop shortcut to `flatpak run tech.dongdongbh.mindwtr --quick-add` instead.

### Tray Icon

Click the system tray icon for instant capture:

- Quick-add input appears
- Use natural language syntax
- Task goes directly to Inbox

### Add Task Dialog Shortcuts

The Add Task dialog is fully keyboard-driven:

- `Enter`: save and close
- `Shift+Enter`: save and keep the dialog open for the next task (batch capture)
- `Ctrl+Enter` (`⌘Enter` on macOS): save and open the task in the full editor
- `Esc`: close without saving
- While a suggestion popup is open (`@`, `#`, `+`, `%`, `!`, `/`), `↑`/`↓` move through the suggestions and `Enter` or `Tab` inserts the highlighted one

### Quick-Add Syntax

Mindwtr parses natural language when adding tasks:

| Syntax       | Example           | Result              |
| ------------ | ----------------- | ------------------- |
| `@context`   | `@home`           | Adds context        |
| `#tag`       | `#focused`        | Adds tag            |
| `+Project`   | `+HomeReno`       | Assigns to project  |
| `+Multi Word` | `+New Project`    | Assigns to "New Project" |
| `+"Quoted Name"` | `+"New Project" call Bob` | Quotes delimit a multi-word name mid-sentence (also `!"Area Name"`) |
| `!Area`       | `Plan roadmap !Work` | Assigns to area       |
| `%Person`     | `Ask %Jim for budget` | Sets Assigned to (delegated / waiting-for owner); `%"Full Name"` for new multi-word names |
| `/area:<name>` | `/area:Personal` | Assigns to area (no spaces) |
| `/due:date`  | `/due:friday`     | Sets due date       |
| `/energy:<level>` | `/energy:medium` | Sets energy level (`low`, `medium`, `high`) |
| `/note:text` | `/note:call back` | Adds description    |
| `/status`    | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Sets status |

**Date formats:** today, tomorrow, friday, next week, in 3 days, 2025-01-15

---

## Audio Capture & Transcription

Capture tasks using your voice with AI-powered transcription.

### Setup

1. Go to **Settings → AI Assistant**.
2. Enable **Speech to Text**.
3. Choose a **Provider**:
   - **OpenAI / Gemini**: Requires an API key (cloud-based).
   - **Offline (Whisper)**: Runs locally on your device. Click **Download** to fetch the model once.
4. Configure **Processing Mode**:
   - **Smart Parse**: Extracts dates (`tomorrow`), priorities, and projects from your speech.
   - **Transcript Only**: Transcribes text verbatim into the task.

### Using Audio Capture

- **Quick Add**: Toggle the capture mode to **Audio** (microphone icon) in the Quick Add bar.
- **Record**: Click the microphone to start recording. Speak your task naturally.
- **Finish**: Click stop to transcribe. The text will populate the input field.
- **Attachments**: Enable "Save audio attachments" in **Settings → General** to keep the original voice note.

---

## Notifications & Reminders

Mindwtr sends desktop notifications to keep you on track:

### Types of Notifications

- **Due date reminders**: Alerts when tasks are due
- **Start time alerts**: Reminds you when it's time to begin
- **Recurring task reminders**: Notifications for recurring items

### Settings

Configure notifications in Settings:
- Enable/disable notifications
- Set reminder lead time

**Platform notes:**
- **macOS** will prompt for notification permission the first time you enable it.
- **Linux** requires a running notification daemon (GNOME/KDE, etc.).

---

## Task Management

### Creating Tasks

1. Use the input field at the bottom of any list view
2. Use the global hotkey from anywhere
3. Click the tray icon for quick capture
4. On Flatpak/Wayland, bind `flatpak run tech.dongdongbh.mindwtr --quick-add` as a custom shortcut if the built-in hotkey is unavailable
5. Type your task title with quick-add syntax
6. Press Enter to add

### Editing Tasks

- Click on a task to open the edit panel
- Edit: title, status, contexts, tags, description, location
- Set: due date, start date, review date, time estimate, recurrence
- Manage checklist items
- Description markdown supports unordered lists and task checkboxes (`- item`, `[ ] item`, `[x] item`)
- With the list **Details** toggle on, task rows show the first description line rendered as Markdown; expand a row to read the full description
- Type `[[` in task descriptions or project notes to link another task or project from a floating picker
- Those links are navigational only; they do not sync completion state between tasks
- Markdown checkboxes in the description are notes-only; they do not affect the task checklist
- Paste multi-line text into a checklist item to create one item per line (bullets, numbering, and `[x]` markers are recognized)
- Assign to a project

### Task Properties

| Property          | Description                                         |
| ----------------- | --------------------------------------------------- |
| **Status**        | inbox, next, waiting, someday, done, archived       |
| **Priority**      | low, medium, high, urgent                           |
| **Contexts**      | Location/tool tags (e.g., @home, @work)             |
| **Tags**          | Energy/mode tags (e.g., #focused, #lowenergy)       |
| **Due Date**      | When the task is due                                |
| **Start Date**    | When to start working on it                         |
| **Review Date**   | Tickler date for review                             |
| **Time Estimate** | 5min, 10min, 15min, 30min, 1hr, 2hr, 3hr, 4hr, 4hr+ |
| **Recurrence**    | daily, weekly, monthly, yearly + strategy           |
| **Checklist**     | Sub-items for multi-step tasks                      |
| **Description**   | Markdown-formatted notes with preview               |
| **Attachments**   | Files and links attached to the task                |
| **Location**      | Physical location                                   |
| **Assignee / Person** | Delegated person for Waiting For and `assigned:` search |
| **Project**       | Parent project assignment                           |
| **Section**       | Optional group within a project                     |

**Attachments:** The **Add link** field accepts both URLs and local file paths (e.g., `/home/user/doc.pdf`, `C:\Users\you\file.txt`, or `file://...`).
See [Attachments](/use/attachments) for sync, cleanup, and audio notes.

### Recurring Tasks

When you complete a recurring task, Mindwtr automatically creates the next instance with updated dates.

- **Strict** (default): keeps a fixed schedule cadence.
  Example: every 5 days remains anchored to the planned cycle.
- **Repeat after completion**: shifts the next due date from completion time.
  Example: complete now, next is due 5 days later.
- **Ends: Never / On date / After N occurrences**: choose whether the series runs forever, stops on a specific date, or stops after a fixed number of occurrences.
  `After N occurrences` counts the current task as part of the series total.

Mindwtr keeps one active instance of a recurring task. The Calendar shows that current instance when it has a due date or start time; future occurrences are not pre-filled until the current one is completed unless **Show next occurrence in Calendar** is enabled for a planning-only preview.

You can toggle this in the task editor recurrence field using **Repeat after completion**.
Use the same recurrence sheet to set an end date or an occurrence count when you need the series to stop automatically.


---

## Bulk Actions

Select multiple tasks to perform batch operations:

1. Click **"Select"** button in the list header
2. Click tasks to select/deselect them
3. Use the action bar to:
   - **Move**: Change status for all selected
   - **Assign Area**: Move all selected tasks under a specific area (or clear the area)
   - **Add Tag**: Add a tag to all selected
   - **Remove Tag**: Remove a tag from all selected tasks
   - **Add Context**: Add a context to all selected tasks
   - **Remove Context**: Remove a context from all selected tasks
   - **Delete**: Delete all selected
4. Click **"Done"** to exit selection mode

### Sorting

Use the sort dropdown to order tasks by:
- Default (status-based)
- Due date
- Start date
- Review date
- Title (alphabetical)
- Created (oldest/newest)

---

## Hierarchical Contexts & Tags

Organize with nested contexts and tags:

| Example          | Matches                         |
| ---------------- | ------------------------------- |
| `@work`          | `@work`, `@work/meetings`, etc. |
| `@work/meetings` | Only `@work/meetings`           |
| `#health`        | `#health`, `#health/diet`, etc. |

Filtering by a parent context includes all children.

---

## Keyboard Shortcuts

Mindwtr supports **Standard** (Gmail/Todoist-style), **Vim**, and **Emacs** keybinding presets. Change in Settings.

See [Desktop Keyboard Shortcuts](/use/keyboard-shortcuts) for the complete list.

**Quick reference (Standard):**
- `/`: Open search
- `?`: Show shortcuts help
- `gi`: Go to Inbox
- `gn`: Go to Next
- `gf`: Go to Focus
- `j/k`: Move selection down/up
- `Enter`: Open selected task
- `Shift+Enter`: Edit selected task
- `e`: Mark done / not done
- `x`: Select / deselect task for batch actions
- `#`: Delete task
- `z`: Undo last complete/delete

**Quick reference (Vim):**
- `j/k`: Move selection down/up
- `Enter`: Open selected task
- `e`: Edit selected task
- `x`: Toggle done
- `dd`: Delete task

`Ctrl+Z` / `Cmd+Z` undoes the last task completion or deletion in every preset.

In every preset, `s` followed by a letter sets the selected task's status directly (`si` Inbox, `sn` Next, `sw` Waiting, `ss` Someday, `sd` Done, `sa` Archived) and shows an undo toast. `Insert` jumps to the add-task input (or opens quick add where a list has none).

---

## Settings

Access Settings from the sidebar.

### General
- **Appearance**: Light, Dark, or System
- **Language**: English, Chinese (Simplified), Chinese (Traditional), Hindi, Spanish, Arabic, French, Portuguese, Russian, German, Japanese, Vietnamese, Turkish, Korean, Italian, Polish, Dutch, Czech
- **Keyboard Shortcuts**: Standard, Vim, or Emacs preset
- **Launch at Startup**: Start Mindwtr automatically when you sign in

### Notifications

**Task Reminders:**
- Enable/disable task notifications for due dates and start times

**Daily Digest:**
- **Morning Briefing**: Summary of due today, overdue, and focus tasks
- **Evening Review**: Prompt to review and wrap up the day
- Configure times (e.g., 9:00 AM, 8:00 PM)

**Weekly Review:**
- **Reminders**: Get a weekly notification to start your review
- **Review Day/Time**: Customize when you want to be reminded

### GTD
- **Auto-Archive**: Automatically move Done tasks to Archived after a set number of days (default: 7 days), or choose **Never** to keep completed tasks in Done
- **Focus task limit**: Choose how many tasks can be marked for Today's Focus
- **Features**: Optional signals you can enable when needed:
  - **Priorities**: Show a priority flag on tasks
  - **Time Estimates**: Add a duration field for time blocking
- **Inbox Processing**: Keep guided inbox processing for teaching GTD, or switch the default to **Quick** mode for a compact one-screen flow
  - Choose whether to show the 2-minute shortcut, ask for project early, include contexts/tags, allow scheduling, and offer reference during processing
- **Task Editor Layout**: Choose which fields are shown by default, move fields between sections, and reorder them
  - Choose the editor opening style: **Side peek** for inline edits or **Pop-up** for focused editing
  - You can move fields like **Due Date** into **Scheduling** and choose which sections expand by default
- **Manage**: Maintain your reusable metadata from one place
  - Edit **Areas**, **People**, **Contexts**, and **Tags** without hunting through individual tasks
  - People keep reusable assignee names, notes, and reference links for delegated work and suggestions
  - See [Areas and People](/use/areas-people) for where to create Areas and People while assigning them

### Data & Sync

**Sync Backend:**
- **Cloud Sync**: Dropbox in supported builds, plus iCloud on macOS where available
- **Folder / File Sync**: File sync via a shared JSON file/folder (Google Drive, Syncthing, OneDrive, etc.)
- **Advanced / Custom Server**: WebDAV or Self-Hosted Mindwtr Cloud

**Settings sync options:**
- Choose which preferences sync across devices (theme, language/date format, GTD defaults, external calendar URLs, AI settings, Saved Filters)
- API keys and local model paths are never synced

**Sync status:**
- Sidebar footer shows last sync time and online/offline status

For WebDAV, configure:
- Server URL (folder URL; Mindwtr stores `data.json` inside)
- Username and Password

See [Data and Sync](/data-sync/) for detailed setup.

### About
- Version info
- Check for updates
- **Send feedback** for bug reports, feature requests, or other notes when the build has feedback enabled. You can include a reply email if you want follow-up.
- Links to website and GitHub

---

## See Also

- [Desktop Installation](/start/desktop-installation)
- [Desktop Keyboard Shortcuts](/use/keyboard-shortcuts)
- [Data and Sync](/data-sync/)
