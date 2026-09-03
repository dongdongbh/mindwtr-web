# Apple Shortcuts

Mindwtr supports Apple Shortcuts through native App Intents on iPhone and iPad, focused on the GTD capture loop: get open loops into Mindwtr quickly, then review and process them inside the app. Version 2 adds silent capture with dates, reading tasks into shortcuts, and Spotlight search.

This is intentionally smaller than Things' mature Shortcuts system. Mindwtr grows the action set carefully so it stays reliable and never bypasses Mindwtr's normal task creation, revision, and sync paths.

## Availability

Apple Shortcuts support is available in iOS builds that include the Mindwtr App Intents integration.

Supported surfaces:

| Surface | Supported |
| --- | --- |
| Shortcuts app | Yes |
| Siri | Yes |
| Spotlight / suggested shortcuts | Yes |
| Action Button running a shortcut | Yes |
| Apple Watch direct actions | Through a shortcut and the self-hosted capture webhook; no native watch actions |
| CarPlay | No, not in v1 |

## Actions

### Capture to Mindwtr

Use **Capture to Mindwtr** to send a task into Mindwtr's Inbox capture confirmation flow.

Parameters:

| Parameter | Required | Notes |
| --- | --- | --- |
| Task | Yes | The task title. Empty titles are rejected. |
| Note | No | Added as the task description. |
| Tags | No | Comma-separated tags. Mindwtr normalizes them to `#tag` when saving. |
| Project | No | Matches an active project by title, or creates the project when the capture is saved. |

What happens when it runs:

1. Shortcuts opens Mindwtr.
2. Mindwtr shows the capture screen with the title and optional metadata filled in.
3. You review the capture and save it through the normal Mindwtr flow.

The task is not written directly from Swift. This keeps task creation inside Mindwtr's existing store, SQLite, revision, and sync logic.

### Open Mindwtr List

Use **Open Mindwtr List** to jump to a GTD view.

Supported destinations:

| List | Opens |
| --- | --- |
| Inbox | Inbox |
| Focus | Focus / Next Actions |
| Waiting | Waiting For |
| Someday | Someday/Maybe |
| Projects | Projects |
| Review | Review |
| Calendar | Calendar |

The shortcut defaults to Inbox if no list is configured.

### Add to Mindwtr

Use **Add to Mindwtr** (called **Add to Mindwtr Inbox** before v2) to create a task silently, without opening Mindwtr. This is the action to use inside Shortcuts Automations. A time, calendar, or location trigger can add a task with no one touching the phone.

Parameters:

| Parameter | Required | Notes |
| --- | --- | --- |
| Task | Yes | The task title. Empty titles fail the shortcut. |
| Note | No | Added as the task description. |
| Tags | No | Comma-separated tags. Mindwtr normalizes them to `#tag`. |
| Project | No | Matches an active project by title. Unknown or archived projects are ignored, and the task still lands in the Inbox. |
| Due date | No | The task's due date. Stored as a date without a time, so it never schedules a reminder by itself. |
| Start date | No | The task's start date, date-only like the due date. |

The **Task** text supports the full [quick-add syntax](/use/mobile#quick-add-syntax) (`/due:`, `@context`, `#tag`, `+Project`, and the rest). It is parsed when the task is created, exactly like the in-app capture box, and the recognized syntax leaves the title just as it does in the app.

What happens when it runs:

1. The action queues the capture on the device and finishes immediately. Mindwtr stays in the background.
2. The next time Mindwtr opens (or returns to the foreground), the queued task is created in the Inbox through the normal store and sync path.

Because the task is created on next open, it does not appear on other synced devices, and no reminder fires, until Mindwtr runs again on that iPhone or iPad. The **Project** parameter never creates new projects, though a `+Project` written in the task text follows quick-add rules and can create one.

### Get Mindwtr Tasks

Use **Get Mindwtr Tasks** to read tasks into a shortcut without opening the app — for chaining into other actions (speak them, show a menu, send them somewhere).

| Parameter | Required | Notes |
| --- | --- | --- |
| List | Yes | One of Inbox, Focus, Next, Waiting, Someday. |
| Project | No | An active project by title. When set, it takes precedence over the list. |

Results come from a snapshot Mindwtr maintains while it runs, capped at 50 tasks per list or project, so they reflect the last time the app was open — same freshness as the widgets.

### Tasks in Spotlight

On iOS 18 and later, Mindwtr tasks appear in Spotlight search. Opening one takes you to the task's list in Mindwtr. The index refreshes when the app runs, like Get Mindwtr Tasks.

### Example: calendar-triggered task

1. In the **Shortcuts** app, open **Automation** and create a new automation.
2. Choose a trigger, for example a calendar event whose title contains "garbage collection".
3. Add Mindwtr's **Add to Mindwtr** action and set **Task** to "Take out the trash".
4. Set the automation to **Run Immediately** so it needs no confirmation.

## Example shortcuts

### Capture from voice

1. Open Apple's **Shortcuts** app.
2. Create a new shortcut.
3. Add **Dictate Text** or **Ask for Input**.
4. Add Mindwtr's **Capture to Mindwtr** action.
5. Pass the dictated text into **Task**.
6. Optionally set **Tags** to something like `phone,errands`.

This is useful for quick capture while walking, commuting, or moving between apps. Siri voice recognition can still miss words in some environments, so review the capture before saving.

### Capture from Apple Watch

Mindwtr has no watch app, but a shortcut that runs on the watch can post straight to your own server, so you can capture without taking out the phone. This recipe needs the [self-hosted capture webhook](/power-users/capture-webhook).

1. In Apple's **Shortcuts** app on the iPhone, create a shortcut and name it "Capture to Mindwtr".
2. Add **Dictate Text**.
3. Add **Get Contents of URL** and set the URL to `https://your-server.example/v1/capture`, with your own server address in place of the example.
4. Set **Method** to **POST**.
5. Add a header named `Authorization` with the value `Bearer <token>`, using one of your server's tokens.
6. Set **Request Body** to **Text** and pass the dictated text into it. To send JSON instead, use a `transcription` field holding the dictated text and a `client` field set to Apple Watch.
7. Open the shortcut details and turn on **Show on Apple Watch**.
8. Run it on the watch from the **Shortcuts** app, a watch face complication, or the Smart Stack. The same shortcut also runs on the iPhone, from Siri or the Action button.
9. The dictated text becomes a task in the Inbox, and it reaches your other devices on the next sync.

### Open Focus from the Action Button

1. Create a shortcut using **Open Mindwtr List**.
2. Set **List** to **Focus**.
3. In iOS Settings, assign that shortcut to the Action Button.

## URL scheme fallback

Mindwtr also supports URL-scheme automation. Use this when another automation tool cannot see native App Intents.

| URL | Action |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Open capture with a title |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Open capture with title and note |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Open capture with project and tags |
| `mindwtr://open-feature?feature=focus` | Open Focus |
| `mindwtr://open-feature?feature=review` | Open Review |

Supported capture aliases:

| Field | Aliases |
| --- | --- |
| Title | `title`, `text`, `name`, `thingName`, `itemListElementName`, `itemListName` |
| Note | `note`, `description`, `body`, `thingDescription`, `itemListDescription` |

## Current limits

Mindwtr's Shortcuts support does not yet include:

- Edit, complete, duplicate, delete, or batch actions.
- Recurring-task or reminder scheduling from Shortcuts (due and start dates are date-only).
- A native Apple Watch app, and CarPlay.

Write actions beyond capture are planned next, built on the task entities introduced in v2 — they need careful design because edits and background writes must preserve Mindwtr's local-first sync and GTD workflow rules.

## Related links

- [User Guide Mobile](/use/mobile)
- [GTD Workflow in Mindwtr](/use/gtd-workflow)
- [Data and Sync](/data-sync/)
- [Things: Using Apple Shortcuts](https://culturedcode.com/things/support/articles/2955145/)
- [Things: Shortcuts Actions](https://culturedcode.com/things/support/articles/9596775/)
- [Apple: App Intents overview](https://developer.apple.com/videos/play/wwdc2024/10210/)
