---
description: "Complete guided GTD on iPhone and Android: card-based Inbox processing, the two-minute rule, Focus, Daily Review, and the guided Weekly Review wizard."
---

# User Guide: Mobile

The Mindwtr mobile app provides the complete guided GTD workflow on iPhone and Android: capture, card-based Inbox processing with the two-minute rule, Projects, Focus, Daily Review, and the guided Weekly Review wizard. Android is fully supported; iOS is available on the App Store and via TestFlight beta. Mindwtr is built with React Native and Expo.

## Overview

The mobile app uses bottom tabs for core flows and a Menu page for additional views.

Android navigation adapts to the available app window: roomy windows use a side rail, while narrow or short windows keep compact navigation. Task editors and Quick Capture fit within a usable pane when Android reports a separating or obstructing hinge. There is no foldable mode to enable. Foldable emulator checks cover these layouts; physical Galaxy Z Fold and Z Flip confirmation is still pending.

---

## Interaction Patterns

- **Tap** to open a task. **Settings → Task editor layout → Open tasks in** decides which tab the tap lands on.
- **Swipe** for quick actions (see Swipe Actions section below).
- **Share sheet** adds items directly to your Inbox.

## Navigation

### Bottom Tabs

| Tab            | Description                          |
| -------------- | ------------------------------------ |
| 📥 **Inbox**    | Capture and process incoming items   |
| 🎯 **Focus**    | Daily dashboard and next actions     |
| ➕ **Quick Capture** | Add a task or audio note quickly |
| 📝 **Review**  | Daily + weekly review                |
| ☰ **Menu**     | Access Projects, Board, Calendar, etc. |

Quick Access slots are customizable. In this clip, Review is changed to Projects; Projects then appears in both the bottom navigation and the Menu.

<figure class="docs-demo">
  <video controls playsinline preload="none" width="720" height="1616" poster="/assets/screenshots/articles/quick-access-projects-mobile-poster.webp">
    <source src="/assets/screenshots/articles/quick-access-projects-mobile.mp4" type="video/mp4">
    Your browser does not support the Mindwtr mobile navigation video.
  </video>
  <figcaption>Customize Quick Access, replace Review with Projects, and open the Projects view from the updated navigation.</figcaption>
</figure>

### Menu Tab
 
Tap the **Menu** tab to access additional views:
 
 - 📋 **Board**: Kanban board view with manual drag ordering, search, and context/tag/date/project filters
 - 🗓️ **Calendar**: Time-based view
 - 📁 **Projects**: Multi-step outcomes
 - 🏷️ **Contexts**: Filter by context
 - ⏳ **Waiting For**: Delegated items
 - 💭 **Someday/Maybe**: Future ideas
 - 📚 **Reference**: Reference material
  - 🕘 **History**: Done and Archived tabs — completed tasks, and tasks and projects filed away
 - 🗑️ **Trash**: Deleted tasks and projects
 - ⚙️ **Settings**: App preferences

Open **History**, stay on the **Done** tab, and tap **Select** to choose tasks, then use **Move → Archived** to file them away early. In **Archived**, tap **Select** or **Select All** to move tasks back to Done without changing their completion time, restore them to Inbox, or move them to Trash. Switch to **Projects** to open, restore, or move archived projects to Trash. Manual permanent deletion is available in Trash.

Starting with v1.3.4, **Settings → Data → Archive retention** can automatically remove expired archived tasks and projects. It defaults to **Never**. Choose a positive whole number of days; enabling or shortening the period asks for confirmation and shows the items currently eligible. The policy and resulting deletions sync to your other devices.

The period starts when an item enters Archive, including cancelled items. Older records without a known archive date get a fresh full period when the enabled policy first sees them. Restoring an item ends its archive period; archiving it again starts a new one. Archived tasks in ongoing projects are kept. An archived project is removed together with its contents only when the whole group is eligible; newer or reactivated work and recent edits defer cleanup. Cleanup runs while the app is active and pauses during editing.

This permanently removes contents from the current library. Turning the setting off cannot restore removed items. Minimal deletion markers remain for sync safety; existing backups, recovery snapshots, exports, and provider version history are not erased.

**Archived** has a search box and a **Filters** button in its header. Filters narrows by context, tag, priority, and time estimate, and holds **Sort** and **Group** — both offering **Completion date**, since everything filed here is finished work. The newest completion comes first by default. Filter selections are shared across the task lists, so a context picked elsewhere narrows this list too. Search and filters apply to the Tasks side of the Tasks | Projects switch.

In Done, sort by **Completion date** to show the newest completions first. Group by **Completion date** to split the list into **Today**, **Yesterday**, **Previous 7 days**, one heading per calendar month for anything older (January 2026, December 2025, …), and **Not completed**; empty groups stay hidden, and the ungrouped catch-all group comes last. References, Inbox, Done, and Archive can also group by **Context**. A task with several contexts appears in each matching group, while tasks without one collect under **No context** at the end. Tap any group heading to fold that group — each list remembers which of its groups are folded per grouping mode on that device, and a folded group’s tasks drop out of **Select** and the bulk actions.

Open **Trash** and tap **Select** to manage several deleted tasks and projects. Tap **Select All** or choose items, then restore or permanently delete them in one step. Permanent deletion always asks for confirmation. Items left in Trash are removed for good after 90 days.

---

## Reference

Reference is for notes and material you want to keep. Its rows and editor emphasize the title, description, project or area, people, tags, attachments, and links. Task scheduling and completion controls stay out of the way. Use **Status** in the editor to switch between Reference and task statuses. You can add checklist items even when the reference has no checklist yet. References have no Focus star. A reference's list has checkboxes: tick an entry to record it, for example a movie you have watched. Ticking every entry leaves the item in Reference; it is never marked done and never enters Focus. The ticks stay if you convert the reference to an action.

Search within Reference matches every space-separated term anywhere in the title or description, ignoring case. For example, `ke 1 2` matches `key1 key2 key3`. Terms are literal text; this field does not interpret quick-add or advanced search syntax.

Turn on **Include archived projects** in the Reference filters to find material from completed or archived projects. It starts off and applies only to this view on this device; deleted material stays excluded.

## Bulk Actions

In Inbox, projects, Contexts and the other task lists, long-press a task to start selecting, then tap more tasks and pick an action in the bar at the top. Tap **X** or press Android **Back** to stop selecting. Selecting does not reorder tasks: manual order exists inside a project (project menu → **Reorder**) and among starred tasks in Focus (the **Reorder** button). Other lists, and the rest of Focus, follow their **Sort** and **Group** settings.

For Start, Due, and Review dates in **Bulk organize**, tap the calendar button or choose **Today** or **Tomorrow**. Dates apply only after **Apply to selected** and do not add a time or reminder. Leaving a date blank (or tapping its selected shortcut again) keeps each task's existing date.

In **Bulk organize**, search for a project or area, or type a new name and choose **Create** without losing your task selection or other form fields. Creation saves and selects the destination; tasks move only after **Apply to selected**. Cancelling the bulk edit leaves your tasks unchanged and keeps any destination you created. If creation fails, your selection and form stay available for retry.

---

## Global Search

Tap the **search icon** in the header to open Global Search.

Search hides Done and Archived items by default. When hidden items match your query, a tappable "N more in Done and Archived" hint appears. Tap it to include them, or enable **Include Done and Archived tasks** in the search filters.

### Search Operators

Use operators for powerful filtering:

| Operator    | Example            | Description             |
| ----------- | ------------------ | ----------------------- |
| `status:`   | `status:next`      | Filter by task status   |
| `-status:`  | `-status:done`     | Exclude a status        |
| `context:`  | `context:@home`    | Filter by context       |
| `tag:`      | `tag:#focused`     | Filter by tag           |
| `@` `#` `%` | `@home #focused %Tom` | Short for `context:`, `tag:` and `person:` |
| `assigned:` | `assigned:Tom`     | Filter by person        |
| `project:`  | `project:HomeReno` | Filter by project       |
| `location:` | `location:office`  | Filter by task location |
| `where:`    | `where:office`     | Alias for task location |
| `id:`       | `id:abc123`        | Find an exact task ID   |
| `-id:`      | `-id:abc123`       | Exclude an exact task ID |
| `due:`      | `due:today`        | Tasks due on date       |
| `due:<=`    | `due:<=7d`         | Tasks due within 7 days |
| `start:`    | `start:>=tomorrow` | Tasks starting from date |
| `created:`  | `created:>=30d`    | Tasks created in last 30 days |
| `OR`        | `@home OR @work`   | Match either condition  |

A leading `-` negates any operator, not just the two shown: `-context:@computer` lists only tasks that don't require `@computer`, `-tag:#deep` hides a tag, `-project:HomeReno` excludes a project.

### Saved Searches

Saved Searches are shortcuts for reusable search queries.

1. Enter your search query
2. Tap **"Save Search"**
3. Name your search
4. Access from **Menu → Saved Searches**

**To delete:** Open the saved search, tap the trash icon in the header.

Saved Searches are separate from **Saved Filters** in Focus. Focus filters save criteria such as projects, contexts, tags, priority, energy, and time estimates for the Focus view.

---


## Quick Capture

Mindwtr offers multiple ways to capture tasks quickly on mobile.

The capture screen is input-first. The syntax help is tucked behind a small “?” toggle to keep the interface clean.

For capture bursts, turn on the **Add another** switch in the capture sheet: each Enter saves the task and keeps the sheet open with the keyboard up, ready for the next one. The switch stays on across captures until you turn it off.

### Capture methods at a glance

| Method | iOS | Android | Opens the app? |
| --- | --- | --- | --- |
| Capture screen in the app (text or audio) | Yes | Yes | You are already in it |
| Share sheet from another app | Yes | Yes | Yes, capture screen |
| Home screen widget capture button | Yes | Yes | iOS: yes; for a prompt without the app, use the [one-tap capture shortcut](/power-users/apple-shortcuts). Android: no, native capture window |
| Widget microphone (voice) | No | Yes, with speech-to-text on | No |
| Quick Settings tile | No | Yes | No |
| Notification bar quick capture | No | Yes | No |
| Voice assistant | Siri, through the Shortcuts actions | Gemini/Assistant App Actions | iOS: no with "Add to Mindwtr". Android: yes, confirmation |
| Shortcuts "Add to Mindwtr" (silent, automations) | Yes | No | No |
| Shortcuts "Capture to Mindwtr" (review first) | Yes | No | Yes, capture screen |
| Apple Watch (speak or type) | Yes | No | No, queued to the phone |
| Automation broadcast (Tasker and similar) | No | Yes | No, queued until the app opens |
| URL scheme `mindwtr://capture` | Yes | Yes | Yes, capture screen |
| Apple Reminders import (manual or automatic) | Yes | No | Runs when the app opens |

The in-app capture sheet shows an optional multiline description directly below the title, without opening **More**. Android’s floating capture window also accepts a description, including alongside audio. Enter in the description adds a line break; dates and commands typed there remain note text. Title-only capture and the title field’s existing bulk-paste behavior are unchanged.

### Android launcher shortcuts

Starting with v1.3.4, long-press the Mindwtr app icon to choose **Capture** or **Add task…**. **Capture** keeps the small floating Inbox dialog. **Add task…** opens Mindwtr directly into the existing capture sheet, where you can choose Focus, a project, contexts, dates, and other details before saving.

The new shortcut opens an unsaved draft; cancelling creates no task. Reopening it while the sheet is open preserves your draft. Focus uses the normal task limit and widget filters; it does not add a due date. Widget buttons, the Quick Settings tile, and notification capture keep their lightweight behavior.

### Share Sheet

Capture tasks from any app using the share sheet:

1. In any app (browser, email, notes), find something you want to capture
2. Tap the **Share** button
3. Select **Mindwtr** from the share options
4. Mindwtr opens the capture screen with the shared content attached as notes
5. Add a title, adjust any fields, and save it to your Inbox

Sharing a file (a PDF, image, video, or audio recording) copies it into Mindwtr as an attachment on the new task, with the filename as the starting title. Up to six files can be shared at once.

Great for:
- Saving articles to read later
- Capturing emails as tasks
- Adding links from web browsing
- Filing a PDF or photo as an Inbox task to process later

<span id="android-automation-capture-tasker"></span>

### Android automation capture {#android-automation-capture}

In **Settings → GTD → Capture defaults**, enable **Automation capture** and copy the capture token. This setting and token stay on this device. Give the token only to automation apps you trust; turning the setting off revokes it, and turning it on again creates a new token.

This is a general Android broadcast intent; Tasker is not required. Any app or automation tool that can send an explicit broadcast with String extras can use it. Send the action below to this receiver, with `text` containing the captured text and `token` containing your capture token:

| Field | Value |
| --- | --- |
| Action | `tech.dongdongbh.mindwtr.action.CAPTURE` |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.androidwidget.CaptureIntentReceiver` |
| Target | `Broadcast Receiver` |
| `text` (String) | Text to capture |
| `token` (String) | Your capture token |

#### Tasker example

In Tasker, add **Misc → Send Intent** after the action that produces your dictated text:

| Field | Value |
| --- | --- |
| Action | `tech.dongdongbh.mindwtr.action.CAPTURE` |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.androidwidget.CaptureIntentReceiver` |
| Target | `Broadcast Receiver` |
| Extra | `text:(String) %captured_text` |
| Extra | `token:YOUR_CAPTURE_TOKEN` |

Replace `%captured_text` with your Tasker text variable and `YOUR_CAPTURE_TOKEN` with the copied token. Leave the category, MIME type and data fields empty. Mindwtr Dev uses package `tech.dongdongbh.mindwtr.dev`; the action and class stay the same.

Each accepted capture is queued separately, including repeated text. Open Mindwtr to import the queued captures into Inbox. The intent does not open the app or sync in the background. It accepts nonblank text up to 2,000 characters; it does not accept audio or files. Start by sending two short notes before opening Mindwtr, then check that both arrive. Android force-stop can block broadcasts until you open the app again.

See [Tasker’s intent guide](https://tasker.joaoapps.com/userguide/en/intents.html) for its Send Intent fields.

### Home Widget

Tapping blank space in a Tasks or Compact widget opens Focus on Android and iOS. Task links, completion controls, list selection and quick capture keep their existing actions.

The controls below describe Android. For iOS, see **iOS Home Screen Widget** below.

Add the Mindwtr widget to your home screen for quick access:

1. Long-press on your home screen
2. Select **Widgets**
3. Find **Mindwtr** and add the **Tasks** widget, the one-cell **Quick capture** button or, on Android, the optional smaller **Compact** widget. The Tasks widget shows a **+** button and your tasks, each with its priority colour, its project or area, and its due date. On Android, a newly added Tasks widget shows Focus, with the inbox count in its header and a short view of Today's Focus and Today. Review Due and Upcoming are not included in the default Focus list. Tap the title to open that list in Mindwtr. To switch the widget's list, tap the separate small down arrow. The header follows the same theme background as the widget body. A sheet lists Focus, Inbox, Next Actions, Waiting For, Someday/Maybe and your **Saved Filters**. Tap one and the widget redraws. To show a single project on a widget, save a Focus filter for that project in the app and pick that filter here. This works on every launcher, and some launchers have no edit action of their own for widgets. You can add several Tasks widgets with different lists. After Mindwtr has run and published its first Android widget snapshot, the standard lists are ready for newly added Tasks widgets and list changes without another app launch. Open Mindwtr once before using widgets and again to refresh their data; widgets do not follow background sync in real time. In 1.3.6 and earlier, Mindwtr publishes saved-filter snapshots on demand.
4. On a task-list widget, tap a task to open its small native detail sheet. On Tasks, tap the ring at the start of a row to complete it. Use the capture button on any of the three Android widgets to capture a task.

**Upcoming.** Choose **Upcoming** in the Android Tasks list selector or iOS 17+ **Edit Widget**. It mirrors **Focus → Upcoming**: Next actions starting or recurring on another day within the next seven days, with the same area and Focus filters. Each row shows its start/return date. On Android, tap the circle to complete the task, or tap the row for **Complete** and **Open**, just like other task lists. On iOS, Upcoming remains a preview that opens the task without a completion ring. An empty Upcoming list stays empty; the default Focus and Compact widgets are unchanged. Cached previews are checked against the local date during native refreshes; Android and WidgetKit control refresh timing. Open Mindwtr to publish newly synced tasks and tasks newly entering the seven-day window.

**Contexts and tags.** In the Android Tasks list chooser, select a **Context** or **Tag** directly, without creating a saved filter. These lists include matching unfinished tasks from Inbox, Next Actions, Waiting For and Someday/Maybe, respecting area and project visibility rather than the current Focus criteria. Switching lists does not change your tasks. Mindwtr caches the offered contexts, tags and saved filters together when the app runs; after that refresh, you can switch among them while the app is closed. Open Mindwtr again to refresh new task edits or synced changes. An empty selection stays empty. Compact and iOS widgets are unchanged.

When set to Focus, the Tasks widget prioritizes Today's Focus, followed by Today, including overdue tasks. It does not fill empty space with other next actions. On Android, it follows the Focus screen's filters and sort order. The filters you have set there apply to the widget too: contexts, tags, priority, energy, time estimate and a saved filter. The sort you have chosen on the Focus screen applies as well, and the widget updates when you change either. The area you have selected in the app narrows every widget list.

The Android Compact widget uses smaller text and a flat Focus list for small widget spaces. It shows Today's Focus and Today under the **Today** header. If both are empty and Next Actions are available, the header switches to **Next Actions**. Resizing the widget shows as many task rows as fit, up to the available tasks. It has no list chooser or inline completion control; tapping a task opens the same native detail sheet.

On Android, tapping a task row in Tasks or Compact opens a small task sheet over your home screen, without opening the main app. The sheet shows the title, the project or area, the note, the contexts and tags, the start and due dates, and the priority. **Complete** checks the task off the same way the Tasks ring does, with the same short undo window. **Open** takes you to the task in the app.

On Android, tapping a ring in the Tasks widget crosses out the row immediately. Tap it again within about three seconds to undo. After this window, the row disappears from Tasks and Compact, making room for the remaining tasks without opening the app. The completion stays saved on the device until the next background sync or the next time Mindwtr opens, whichever comes first; Mindwtr then applies it and syncs it to your other devices.

**Widget capture status.** When the Android Tasks widget shows **Inbox**, **Next Actions**, **Waiting For** or **Someday/Maybe**, its capture window starts with that status, which you can change before saving. **Focus**, **Upcoming**, saved filters, contexts and tags default to Inbox. A widget that shows one context or tag opens its capture window with that context or tag already typed in. You can edit or delete it before saving. The widget does not assign other properties automatically. Explicit quick-add metadata can override the inferred default; your explicit status-picker choice takes precedence. Compact, the standalone Quick Capture widget, the tile, notification and Capture shortcut still default to Inbox.

**Contexts button.** The Android capture window has a **Contexts** button when you already use contexts. Tap it to see your contexts with a search box, and type a few letters to narrow the list. Exact names come first, then names that start with what you typed. Tap a context, or press Done to take the first match. Mindwtr types it where your cursor is, for example `@garage` or `@"Two words"`, and returns you to the text. A context already in the text is not offered again. Press Back to close the list without picking one.

On Android, the capture button on any of the three widgets, the Quick Settings tile, the app shortcut and the capture notification open the same native floating capture window on top of whatever you are doing, without opening the main app. **Save** safely queues the capture, shows a short confirmation and closes the window. The chosen status stays with text and audio captures until import; the task may not appear in its list until then. For text captures, Mindwtr then imports the task in the background and syncs it to your other devices, without opening the app. If Android does not allow that background run, the task appears the next time you open Mindwtr. iOS captures through the app as before.

Enabling speech-to-text also adds a microphone button to this native Android window. Record, tap Stop, then Save; the main app stays closed. Recordings are saved on the device and transcribed with your configured provider when Mindwtr next opens or returns to the foreground. F-Droid uses offline Whisper. Failed transcription keeps the recording for another attempt. Recording stops when you leave the window and is limited to five minutes.

On Android, dated rows show **Today**, a weekday for the coming week, or a compact date in the app's date format. Tasks due today or overdue receive extra emphasis.

Android Tasks and Compact lists scroll beyond 20 tasks. For a very large list, **View all** at the bottom opens the full selected list in Mindwtr. No task-count setting is needed.

### iOS Home Screen Widget

Tasks and Compact widgets show each task’s contexts beneath its title. Long context lists fit on one line and may be shortened; tasks without contexts keep their usual layout.

Choose **Tasks** for the regular widget, available in small, medium and large sizes (plus extra-large on supported iPads), or **Compact** for smaller text and a flat Focus list. Compact has no list picker or check-off rings; medium and larger sizes still link to tasks and quick capture.

Tasks and Compact show Today's Focus and Today first, including overdue tasks. When that list is empty, they show Next Actions instead, with a short Today or Next heading to identify the list. They do not mix Next Actions into a nonempty Today list. Rows adapt to the widget's size and text size. The Tasks widget keeps the date, priority rings, project or area labels, and the app's filters, theme and sort order.

On iOS 17 and later, long-press a Tasks widget and choose **Edit Widget** to select Focus, Inbox, Next Actions, Waiting For, Someday/Maybe, or a saved filter. Multiple widgets can show different lists; an explicitly selected list other than Focus never falls back to another list. Tap a ring to queue completion and tap again within three seconds to undo. After that window, the row hides and another cached task can fill the space. WidgetKit may delay the visible refresh. The completion stays safely queued until Mindwtr runs and saves it; completion and sync happen through the app, not directly from the widget.

Tap the heading, empty state, or small widget to open the displayed list. Medium and larger widgets link task rows to their task in Mindwtr and **+** to quick capture (iOS widgets cannot show a capture window; for one-tap capture without opening the app, see the [Shortcuts recipe](/power-users/apple-shortcuts)); small-widget rings remain interactive on iOS 17+. Older iOS versions use the default Today/Next behavior without inline check-off or list configuration. WidgetKit controls refresh timing. Lock screen widgets are unchanged.

### iOS Lock Screen Widget

On iOS 16 and later, Mindwtr offers lock screen widgets that show your current focused task without unlocking the phone:

1. Long-press the lock screen and tap **Customize**
2. Select the widget area and add a **Mindwtr Focus** widget
3. Choose the rectangular widget (top focused task with a Focus caption), the inline one-line widget above the clock, or the circular focused-task counter

Tapping any of them opens the Focus screen. Lock screen widgets follow the system's monochrome lock screen style.

### Android Quick Settings Tile

On Android, add the Mindwtr capture tile to Quick Settings for one-swipe Inbox capture:

1. Open Android Quick Settings edit mode.
2. Add the **Mindwtr** tile.
3. Tap the tile to open the same small capture window described under Home Widget.

### Android Notification Bar Quick Capture

For the fastest capture, one swipe and available from the lock screen, pin a persistent **Quick capture** notification:

1. Open **Settings → Notifications**.
2. Turn on **Quick capture in notification bar**.
3. Tap the notification any time to open the same small capture window described under Home Widget.

The notification is silent and stays out of the way at the bottom of the shade. Turn the toggle off to remove it. (Android only; iOS doesn't support persistent notifications, so use the widget or Shortcuts there.)

### Android Voice App Actions

Android builds expose a capture action to supported assistants, including Gemini/Assistant surfaces that route through Android App Actions. Voice-created captures open Mindwtr's confirmation flow so you can review the title and note before saving.

### Android System Search

Turn on **Settings → General → Expose to system search** (off by default, Android 12+) to let system search and compatible launchers find your tasks, projects, and areas by title. The index stores only titles plus minimal status, due-date, and project/area metadata — never descriptions, notes, or attachments — and nothing leaves the device. Tapping a result opens the item in Mindwtr, and turning the switch off removes everything from the index.

### Android Context Automation Intents

Automation apps such as Tasker, MacroDroid, or Phone Profiles can activate a Mindwtr context. Use the Android broadcast form for background-only triggers. When activated, Mindwtr checks matching `/next` actions that are available now and sends a notification only when there is work to show. Tapping that notification opens the matching Contexts view.

Android broadcast form:

| Field | Value |
| --- | --- |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.ContextAutomationReceiver` |
| Target | Broadcast Receiver |
| Activate action | `tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT` |
| Deactivate action | `tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT` |
| String extra | `context=parents` or `context=@parents` |

ADB examples:

```bash
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT --es context parents
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT --es context parents
```

URL form:

| URL | Action |
| --- | --- |
| `mindwtr://contexts?token=%40parents&contextAction=activate` | Activate `@parents` |
| `mindwtr://contexts?token=%40parents&contextAction=deactivate` | Deactivate `@parents` |

URL examples:

```bash
adb shell am start -a android.intent.action.VIEW -d 'mindwtr://contexts?token=%40parents&contextAction=activate' tech.dongdongbh.mindwtr
```

Notes:
- URL launches may open Mindwtr. Use the broadcast receiver form when the automation should stay in the background.
- Context names are normalized to `@context`, so `parents` and `@parents` both match `@parents`.
- Hierarchical contexts match below the selected context, so `@parents` also matches `@parents/errands`.
- If no currently available `/next` actions match the context, Mindwtr stays silent.
- Deactivation is a silent no-op for now. It acknowledges the automation exit trigger and is reserved for future active-context state; it does not delete, hide, or change tasks.
- On Android, context automation URLs and intents return Mindwtr to the background after handling. Use the notification tap when you want to open the matching Contexts view.
- Mindwtr does not detect locations or device states itself; the automation app owns the trigger.

### Apple Shortcuts

On iPhone and iPad, Mindwtr exposes native Apple Shortcuts actions for Inbox capture and opening GTD views such as Focus, Waiting, Someday, Projects, Review, and Calendar. See [Apple Shortcuts](/power-users/apple-shortcuts) for setup, examples, and v1 limitations.

### Apple Watch companion

The native Apple Watch companion supports watchOS 10 or later and has been tested on a paired physical Watch. Install Mindwtr on the Watch from the iPhone Watch app.

- **Capture:** Tap **Speak to Capture** to record audio on the Watch for iPhone transcription. Tap **Type** to enter text; the iPhone may offer its keyboard as an optional input method. Captures enter Mindwtr's local Inbox, so cloud sync is optional.
- **Focus:** Review Focus tasks, mark one complete, or defer it until tomorrow.
- **Pomodoro:** Start and control the timer linked to Mindwtr on the iPhone.

The Watch keeps captures queued when the phone is unavailable and delivers them when the connection returns.

Open a Focus task on the Watch to read its description and check or uncheck checklist items. Previously received details remain readable offline. Changes are saved on the Watch for later delivery and applied through the iPhone; open Mindwtr on the iPhone after reconnecting. A delivery acknowledgement does not mean the task has been saved yet.

Checklist changes preserve other items added or reordered on the phone. If an item was renamed, removed, or cannot be identified uniquely, refresh from the iPhone rather than applying the change to another item. List-mode tasks follow the same completion rules as on the phone. Details that exceed the Watch payload limit show a message directing you to the iPhone; the Watch never presents a shortened checklist as complete. Description editing, adding/reordering checklist items, and attachments remain on the phone.

### URL Scheme Quick Capture (iOS Shortcuts / Android Automations)

Mindwtr registers the URL scheme `mindwtr://`, so you can capture tasks from iOS Shortcuts, Tasker, or other automation tools.

Supported URLs:

| URL | Action |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Open capture with a title |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Open capture with title and note |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Open capture with project and tags |

Notes:
- `title` is required (alias: `text`).
- `note` is optional (alias: `description`).
- `project` matches an existing active project by title (case-insensitive), or creates it.
- `tags` is comma-separated and normalized to `#tag` format before saving.

iOS Shortcuts example:
1. Open **Shortcuts** and create a shortcut.
2. Add **Ask for Input** (prompt: task title).
3. Add **Open URLs** with: `mindwtr://capture?title=[Provided Input]`.
4. Run the shortcut; Mindwtr opens the capture screen so you can review and save the task.

### Quick-Add Syntax

Mindwtr parses natural language when adding tasks:

| Syntax       | Example           | Result             |
| ------------ | ----------------- | ------------------ |
| `@context`   | `@home`           | Adds context; `@person/todd` adds a nested one |
| `#tag`       | `#focused`        | Adds tag           |
| `+Project`   | `+HomeReno`       | Assigns to project |
| `+Multi Word` | `+New Project`    | Assigns to "New Project" |
| `+"Quoted Name"` | `+"New Project" call Bob` | Quotes delimit a multi-word name mid-sentence (also `!"Area Name"`, `@"Two words"` and `#"two words"`) |
| `!Area`       | `Plan roadmap !Work` | Assigns to area       |
| `%Person`     | `Ask %Jim for budget` | Sets Assigned to (the person the task involves; status is unchanged); `%"Full Name"` for new multi-word names |
| `/area:<name>` | `/area:Personal` | Assigns to area (no spaces) |
| `/due:date`  | `/due:friday`     | Sets due date      |
| `/energy:<level>` | `/energy:medium` | Sets energy level (`low`, `medium`, `high`) |
| `/priority:<level>` | `/priority:high` | Sets priority (`low`, `medium`, `high`, `urgent`) |
| `/estimate:<duration>` | `/estimate:45m` | Sets the time estimate |
| `/note:text` | `/note:call back` | Adds description   |
| `/status`    | `/next`, `/waiting`, `/someday`, `/reference`, `/done`, `/archived`, `/inbox` | Sets status |

`/estimate:5m`, `/estimate:45m`, and `/estimate:1h30m` set estimated effort; `/duration:` is an alias. Custom values keep their exact minutes. Successfully parsed commands are removed from the title; invalid or incomplete commands stay visible. Ordinary prose such as “Watch a 30-minute lecture” does not set an estimate. An estimate selected explicitly in a capture form takes precedence; the calendar composer keeps its selected duration. When **Time estimates** is turned off in Settings, `/estimate:` and `/duration:` are not parsed and stay in the title, and the syntax help does not list them.

**Date formats:** today, tomorrow, friday, next week, in 3 days, 2025-01-15, 26.06., 26.06.2026

A date or time phrase at the end of what you type becomes the due date: `Grab a coffee with Marta Jun 23 6pm` creates a task due June 23 at 6pm. Detection only reads the end of the text, so a title like "Review June report" stays untouched. By default those matched words stay in the title; turn on **Clean up quick add text** (Settings → GTD) to remove them too, leaving "Grab a coffee with Marta". The setting covers only this ambiguous case — syntax the parser recognizes and applies always leaves the title. Turn off **Detect natural-language dates** (Settings → GTD, on by default) to keep date phrases literal with no date set. Explicit tokens like `/due:friday` work regardless and take priority over detection. Both settings sync across your devices. When the app runs in German, Spanish, French, Italian, Japanese, Dutch, Portuguese, Russian, Swedish, or Chinese, date phrases in that language are detected too — English phrases keep working in every language.

---

## Audio Capture

Capture tasks using your voice with AI-powered transcription.

### Setup

1. Go to **Menu → Settings → Advanced → AI Assistant**.
2. Enable **Speech to Text**.
3. Choose a **Provider**:
   - **OpenAI / Gemini**: Cloud-based (requires API key).
   - **Offline (Whisper)**: Runs locally. You can download a model (e.g., Tiny or Base) directly in settings.
4. Set your **Default Capture Method** in **Settings → General** if you prefer audio-first.

### Using Audio Capture

- **Quick Add**: Tap the **Audio** tab in the Quick Capture screen.
- **Record**: Tap the microphone to start.
- **Transcribe**: Stop recording to process the audio.
- **Smart Parse**: If enabled, the app will extract dates and fields automatically.

---

## Inbox

Your capture zone for quick task entry.

Use **Mind Sweep** when you want guided capture prompts for work, home, people, errands, and open loops instead of starting from a blank input.

### Adding Tasks

1. Tap the input field at the bottom
2. Use the share sheet from other apps
3. Tap the home widget
4. Type your task with quick-add syntax
5. Tap the add button or press Enter

### Processing Inbox

Tap **Process Inbox** to start the clarify workflow:

1. **Is this actionable?**
   - Yes → Continue
   - No → Trash or Someday/Maybe

2. **Will it take less than 2 minutes?**
   - Yes → Do it now, mark Done
   - No → Continue

3. **Who should do it?**
   - I'll do it → Add context, move to Next Actions
   - Delegate → Move to Waiting For

4. **Where will you do this?**
   - Select contexts (@home, @work, etc.)
   - Add custom contexts

5. **Assign to a project?** (Optional)
   - Select a project or skip
   - Or choose **Yes, make it a project** when the capture holds several actions: name the project and define its next action. Any further actions you type land back in the Inbox with the project already attached, ready for their own clarify pass

---

## Focus

Starting with v1.3.4, **Settings → GTD → Include tasks starting today in Today** controls whether a start date alone puts a task in Today. It is on by default and syncs across devices. Turn it off to let available next actions stay in Next Actions unless another rule puts them in Today or Review Due. Start dates and times still control availability; due dates, Upcoming previews, and manually starred Today's Focus tasks keep their usual behavior.


Your primary dashboard for doing. Focus is an Engage dashboard, not a full inventory of every task with status `next`.

### Sections

Focus sections appear in this order: **Today's Focus → Today → Next Actions → Review Due → Upcoming**. **Group next actions by** affects only Next Actions.

| Section | Content |
| --- | --- |
| **Today's Focus** | Starred tasks chosen for today whose start day has arrived |
| **Today** | Next actions due today, overdue, or starting today, including later today |
| **Next Actions** | Other available next actions |
| **Review Due** | Open commitments whose review date has arrived; this reminder queue is separate from Weekly Review |
| **Upcoming** | Next actions starting or recurring on another day within 7 days; star a future-start Next action to queue it for Focus on its start day |

Focus keeps future-start tasks and later tasks in sequential projects out of its actionable lists so they stay limited to what you can act on now. A starred future-start Next action stays in **Upcoming** until its start day, then moves to Today's Focus automatically without using a current Focus slot. Recurring tasks without a start date stay as previews and cannot be starred there. Use **Contexts**, **Projects**, or **Search** when you want to inspect the broader task inventory.

Default Next Actions order is due-soon actions first, undated actions next, and far-future due actions last. Within the same bucket, Focus uses priority when enabled, then start time, creation date, title, and id. See [GTD Workflow in Mindwtr](/use/gtd-workflow#how-focus-sorts-available-actions) for the full logic.

The list icon beside **Filters** in the Focus header toggles **Details**: turn it off and every row collapses to its title, hiding the description preview and metadata line, with each device remembering the choice.

### Features

- **Context filter**: Tap a context chip to filter the Next list.
- **Saved Filters**: Save reusable Focus criteria such as projects, contexts, tags, priority, energy level, and time estimates. Tap a saved filter to apply it; tap it again or tap **All** to clear it. To delete a saved filter, long-press its chip and confirm **Delete**. Screen readers also offer a delete action on each saved filter.
- **Swipe to Focus**: Swipe a task right to toggle "Focus" status (moves it to Today).
- **Long-press for a start date**: Long-press a task to set its start date: **Today**, **Tomorrow**, **Next week**, or a custom date. **Today** files the task under Today without starring it as today's focus, as long as **Settings → GTD → Include tasks starting today in Today** is on (the default). With that setting off, the start date alone does not put the task in Today. A later date takes it out of the actionable lists until that day. A task with a due date is only offered start dates on or before that date, and a task that is due today or overdue has no menu.
- **Quick Status**: Tap the status badge to change status.
- **Pomodoro (Optional)**: Enable in **Settings → GTD → Features → Pomodoro timer** to show a compact focus/break timer. Leave it as **Timer only**, or turn on **Link timer to task** to show the Timer task picker and **Mark task done** action. Collapse the card to keep the remaining time, phase, and **Running** or **Paused** status visible in a slim row.

**Task dates.** In **Filters → Task dates**, choose **Today**, **Next 7 days**, **Next 14 days**, **Next 30 days**, or **All upcoming**. A task matches if its start, due, or review date falls in the range. Rolling ranges include today and use local calendar days; All upcoming includes today and later dates. Choose **Any time** to remove this condition. Other filters and the view’s normal visibility rules still apply; this does not change Focus’s Upcoming section or include calendar events.

Save the filter in Focus, then select it under **Saved Filters** in the Android Tasks widget chooser or iOS 17+ **Edit Widget**. The widget shows matching unfinished tasks within its normal area and project scope. Open Mindwtr to refresh the cached list as days pass or after syncing. Update devices that use the filter: older app versions do not apply the new date condition.

---

## Review

Review your tasks and update their status.

- See task details (description, start time, deadline, contexts)
- Quickly mark tasks as done
- Navigate between tasks
- **Select mode**: Batch organize, move, tag, share, or delete tasks
- During Weekly Review, use the **Process Inbox** step to clear captured items before continuing through calendar, waiting-for, projects, and someday review.

---

## Task Editor (Task + View)

The task editor has two modes:

- **Task**: edit fields, checklists, dates, tags, contexts
- **View**: clean read-only summary with tappable checklist

Swipe left/right to switch between **Task** and **View**.

**Settings → GTD → Task editor → Open tasks in** controls the opening mode on this device:

- **Automatic** (default): Inbox tasks open in Edit; other lists open in Preview.
- **Preview**: read the task first.
- **Edit**: go straight to the fields. The keyboard stays closed until you tap a field.

This works the same on Android and iOS. Explicit Edit actions still open Edit, and read-only tasks stay in Preview. Switching tabs for one task does not change this preference.

The editor starts minimal. Tap **More options** to reveal advanced fields; any field with existing content stays visible.

Tap the **Focus** star in the mobile editor to choose whether a task belongs in Today's Focus. The change takes effect when you tap **Save**; leaving the editor without saving discards it. If the task has a future start date, saving the star queues it for that day without using one of today's Focus slots. A due date alone does not defer it.

Description markdown supports unordered lists and task checkboxes (`- item`, `[ ] item`, `[x] item`).
Type `[[` in task descriptions or project notes to link another task or project from the link picker sheet.
Those links are navigational only; they do not sync completion state between tasks.
Markdown checkboxes in the description are notes-only; they do not affect the task checklist.
Pasting multi-line text into a checklist item creates one item per line (bullets, numbering, and `[x]` markers are recognized).
The **Assignee / Person** field stores the person a task involves (delegated, waiting on, or to discuss with) for the People view, suggestions, and `assigned:` search. Manage saved people, notes, and reference links from **Settings → Manage**.

Recurring tasks support two strategies:
- **Strict** (fixed cadence)
- **Repeat after completion** (next date from completion time)
- **Ends: Never / On date / After N occurrences**

In task lists, the recurrence icon stays visible when details are hidden; the full schedule description appears in the task details.

Mindwtr keeps one active instance of a recurring task. The Calendar shows that current instance when it has a due date or start time; future occurrences are not pre-filled until the current one is completed unless **Show future occurrences in Calendar** is enabled for a planning-only preview.

Use the recurrence field in the task editor, then toggle **Repeat after completion** or **Show future occurrences in Calendar** when needed.
The same sheet lets you stop a series on a target date or after a fixed number of total occurrences.

### Attachments

You can attach files or links to a task from the editor. Audio notes can be saved as attachments when **Save audio attachments** is enabled.

See [Attachments](/use/attachments) for details on syncing and cleanup.

---

## AI Assistant (Optional)

Enable in **Settings → Advanced → AI assistant**:

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

## Calendar Integration

Mindwtr can overlay external calendars and push dated Mindwtr tasks to the device calendar. Detailed setup lives in [Calendar Integration](/use/calendar-integration).

To push tasks to Android/Google Calendar or Apple Calendar on iOS:

1. Go to **Menu → Settings → Advanced → Calendar**
2. Enable **Push tasks to calendar**
3. Grant calendar permission
4. Expand **Sync target**
5. Choose a dedicated `Mindwtr` calendar or another writable calendar target

For Android Google Calendar and iOS Apple Calendar target setup, see [Calendar Integration](/use/calendar-integration).

To overlay external calendars with ICS subscriptions:

1. Go to **Menu → Settings → Advanced → Calendar**
2. Add your **ICS URL**
3. Refresh to fetch events

External events are view-only and are not synced back to their source. Tap an external event and choose **Create task** to make a separate Mindwtr task; Mindwtr copies the event title, date/time, location, description, and calendar name where available.

---

## Calendar

In day and week views, deadlines with a time appear as **Due** markers at that time; date-only deadlines stay in the all-day lane. A task can show both its scheduled work block and its deadline. Deadline markers do not reserve time or require an estimate. Select a marker to edit the task; markers cannot be dragged or resized. Month cells keep a compact task row with the due time.

Time-based view with scheduling capabilities.

### Views

- **Month View**: Overview of tasks with due dates
- **Day View**: Detailed timeline with scheduled tasks and external events

### Scheduling Tasks

1. On the Calendar day view, tap **Schedule Tasks**
2. Select from Next Actions (shown first) or search Todo tasks
3. Mindwtr finds the earliest free slot (avoids conflicts with external events)
4. Task gets a start time based on its time estimate

The scheduling panel is the mobile planning surface: use it when you are looking at a day and want to turn unscheduled Next Actions or due-but-unscheduled work into concrete time blocks. Collapse it when you want to focus on the calendar grid.

### Drag to Reschedule

- Long-press a scheduled task block
- Drag to a new time slot (snaps to 5-minute intervals)
- Release to update the start time

### External Calendars (iCal/ICS)

Subscribe to external calendars to see events alongside your tasks:

1. Go to **Menu → Settings → Advanced → Calendar**
2. Enter the calendar URL (ICS/webcal format)
3. Give it a name and tap **Add**
4. External events appear as gray blocks in Day view

---

## Projects

Manage multi-step outcomes.

Open Projects from **Menu → Projects**.

### Project List

- View all active projects
- See task count per project
- Tap to view project details
- Tap the star on a project to mark it as a priority (up to five). Starred projects move to the top of their area
- Long-press a project and choose **Move up** or **Move down** to change its place in its area. Starred and unstarred projects each keep their own order. The order syncs with the order set by dragging on desktop; there is no drag and drop on the phone

### Project Details

- View all tasks in the project
- See the project's reference material in a **References** section below the task list — references whose tags match the project's tags appear there too
- Add new tasks
- Group tasks with **Sections** inside the project. Sections are headings inside one project, not subtasks or separate projects.
- Tap a task to assign a **Section** in the task editor
- Edit project settings (name, color, notes)
- Assign **Area of Focus** (e.g., Work, Personal)
- Add **Project tags** for filtering
- Set sequential or parallel mode
- Set review date
- Reorder project tasks with the drag handle when custom ordering is enabled. Dropping a task under a different section header moves it into that section, and dropping it above the first header clears its section
- Complete the project from **Actions** in the project details — remaining tasks are completed with it, the project moves to the **Completed** section at the bottom of the project list, and **Reactivate** undoes it
- Duplicate the project — swipe its row to the right in the project list, or use **Duplicate** in the project detail sheet — to copy its sections and tasks into a fresh copy (see [Reusable Lists](/use/reusable-lists))

Starting with v1.3.4, **Convert to section…** in the project actions menu moves a simple project into another project. Choose the destination and section name, then review the task count before confirming. Project notes become section notes; all non-deleted tasks move with their contents, status, and relative order intact, including completed and archived tasks. The source project moves to Trash. Moved tasks use the destination’s Area; the source project’s color is not carried over. **Undo** restores the original containers without replacing later edits to task contents.

Conversion requires active projects. Parallel projects can be converted into parallel destinations. A sequential project can also be converted into a destination already set to **Sequential → Within sections**: the new section keeps its task sequence, while other sections continue independently. A sequential project converted into a **Per section** destination becomes a Sequential section. Conversion never changes the destination’s flow mode. The source cannot have sections or project metadata that a section cannot retain, such as attachments, dates, tags, a priority star, or a custom task sort. Task attachments and dates do not block conversion. **Undo** also restores the source project’s sequential mode and task order.

The **Project Section** field in the task editor assigns a task to one of the sections in its current project. It only matters after the task belongs to a project that has sections; otherwise, leave it blank.

### Sequential vs Parallel

| Mode           | Behavior                                             |
| -------------- | ---------------------------------------------------- |
| **Sequential** | Only the first available project task appears in Focus |
| **Parallel**   | All available project tasks can appear in Focus        |
| **Per section** | Each section is Parallel or Sequential; set it in **Sections** |

Sequential projects can run project-wide or section-by-section. Section-scoped sequencing shows the first available task in each project section, so separate phases or workstreams can move forward in parallel without making every task visible.

Set the project's **Flow Mode** to **Per section**. Then open the project details, go to **Sections**, and tap the flow button on a section row to make it Parallel or Sequential. A small label next to the section name shows the choice, only in Per section mode. A Sequential section offers only its first available task, with the same rules as Sequential projects: a Waiting first step holds the slot, and Focus may still show a starred or due task. A Parallel section, and tasks with no section, offer all their tasks. Sections never wait for each other, and section order creates no dependency. Switching from **Sequential → Within sections** starts every section as Sequential; switching from Parallel or **Sequential → Across sections** starts them as Parallel. Section choices are kept if you switch to another mode and back. Older app versions (1.3.6 and earlier) show a Per section project as Parallel.

---

## Swipe Actions

Quickly manage tasks with swipe gestures:

| View             | Swipe Right | Result             |
| ---------------- | ----------- | ------------------ |
| **Inbox**        | Done        | Marks task as done |
| **Focus**        | Focus       | Toggles focus status |

Completing a task stamps the current time. If you actually finished earlier, long-press any **Done** control to pick the real completion time instead: the swipe-revealed Done button, the Done option in the status menu, the Done chip in the task editor, or the status badge in the task preview. You can also tap the **Completed** timestamp on a done or archived task to correct it afterwards.

---

## Contexts

Browse and filter tasks by context.

Tap a context or tag to show only its tasks. Long-press another chip to add it to the selection. With two or more selected, choose **All** or **Any**. Tap the only selected chip again to clear the selection. For nested contexts such as `@person/todd`, see [Contexts and Tags](/use/contexts-tags).

### Location Contexts

- `@home`: Tasks to do at home
- `@work`: Tasks for the office
- `@errands`: Out and about
- `@agendas`: Discussion items
- `@computer`: Need a computer
- `@phone`: Need a phone
- `@anywhere`: Can do anywhere

### Tags

Filter tasks by energy level, mode, or topic:

- `#focused`: Deep work requiring concentration
- `#lowenergy`: Simple tasks for tired moments
- `#creative`: Brainstorming and ideation
- `#routine`: Repetitive/mechanical tasks

---

## Waiting For

Tasks with an assigned person show their name directly in the Waiting For list, even when extra details are hidden.

Track items delegated or waiting on external events.

- View all waiting tasks
- See deadlines
- Move to Next when ready
- Mark as Done when received

---

## Someday/Maybe

Organize tasks into Someday sections directly from this list.

- Open a task’s menu and choose **Move to section…**.
- Select several tasks to move them together with the same action. The picker includes empty sections, **No section**, and **New section…**.
- Use **New section…** in the list to create a heading. When grouped by Someday section, use **Add task** on a heading to create a task in that section.
- A saved move offers **Undo**. Section changes preserve the task’s status, project, project section, and dates. Manage section names and ordering in **Settings → Manage**.
- Someday projects can go in the same sections. When the list is grouped by Someday section, long-press a project row and choose **Move to section…**. The project keeps its tasks, its own sections and its area. Projects without a section appear under **No section**.

Incubate ideas for the future.

- Review periodically during Weekly Review
- Activate by moving to Next status
- Archive if no longer relevant

---

## Notifications & Reminders

Mindwtr sends notifications to keep you on track.

### Types of Notifications

- **Due date reminders**: Alerts when tasks are due
- **Start time alerts**: Reminds you when it's time to begin
- **Recurring task reminders**: Notifications for recurring items

**Repeat reminder** requires an explicit due time. Choose 5, 10, 15, 30, or 60 minutes between alerts, with at most eight additional reminders within two hours after the due time. Repeats do not continue indefinitely until completion. **Repeat reminder: Off** still allows the first due reminder.

**Snooze** postpones the current alert. **Dismiss** closes the current notification; it does not cancel future reminders in the repeat sequence. To stop a task’s start/due reminders and their repeats without changing its dates, set **Start/due reminders → Skip** in the task editor.

**Settings → Notifications → Default task reminders** chooses **Send** or **Skip** for new tasks. Each task has **Start/due reminders**: **Use default** (showing its current effect), **Send**, or **Skip**. Existing tasks keep their previous send/skip behavior until you deliberately choose **Use default**. The initial default is Send.

Skip withdraws pending start/due reminders and their repeats without erasing the repeat interval. Review reminders, daily digests, and Pomodoro alerts are separate. Send still requires an explicit start/due time, enabled task/start/due notifications, and device permission; it does not enable those switches for you.

The default follows the **GTD** settings-sync group; each task's choice syncs with the task. Device notification switches remain local. Upgrade all syncing devices to use inheritance: older versions use the last saved send/skip value, do not follow later default changes, and may lose **Use default** when saving a task.

### App icon badge on iPhone and iPad

Turn on **Settings → Notifications → App icon badge** to show one combined count of tasks due today and overdue on this device. It is off by default, applies only to this device, and works independently of task reminders. The count uses due dates, not start dates, and excludes completed, cancelled, deleted and reference tasks, and tasks in archived or deleted projects.

The badge updates after task changes, when you return to Mindwtr, and at local midnight while the app is running. It may be outdated while the app is closed; updates from another device appear after they sync to this device. Allow badges for Mindwtr in iOS Settings if prompted.

### Test a task reminder

1. Edit a task and set its **Due date** to a time a few minutes ahead. **Date only** gives the task a deadline without scheduling a timed alert.
2. In **Start/due reminders**, choose **Send**. On 1.3.6 and earlier, turn **Skip reminders** off.
3. Tap **Save**. In **Settings → Notifications**, make sure task notifications and due reminders are enabled. On iOS, also allow Mindwtr notifications in the device’s Settings.
4. Wait for the due time. If you changed the task on another device, open Mindwtr on this phone so the new time syncs before the alert.

Tap the notification body to jump directly to the **Review** screen.

Reminders are scheduled on the phone itself. There is no push server. If you complete or reschedule a task on another device (for example, checking off a daily recurring task on desktop), the phone updates its alarms as soon as that change syncs over, so let the phone sync before the next reminder time (opening the app once is enough).

### Permissions

Make sure notifications are enabled:
1. Go to device **Settings → Apps → Mindwtr**
2. Enable **Notifications**
3. Allow alerts and sounds as desired

### Reminders arriving late on Android

Android 12 and later can withhold permission to schedule exact alarms. Without that permission, Android may delay reminders; there is no one-minute limit. Mindwtr shows **Reminders may arrive late** in **Settings → Notifications**, with an **Allow** button. Pomodoro shows its own explanation directly below **Alert when timer ends**, with an **Open Android settings** action. The switch controls whether you receive timer alerts; the Android permission controls their timing. Permission help appears only while Pomodoro alerts are on and the permission is missing.

Tap **Allow** to open the Android permission screen for Mindwtr. You can also reach it at device **Settings → Apps → Mindwtr → Alarms & reminders**. As soon as the permission is granted, Mindwtr reschedules its reminders as exact alarms without restarting the app, and the row goes away. The row never appears before Android 12, where every alarm is already exact.

Starting with v1.3.4, Android discards one-time reminders that arrive more than 24 hours late, including reminders for unfinished tasks. This prevents old alarms from appearing days later after a restart. Reminders delayed by up to 24 hours can still arrive.

---

## Settings

### General

- **Appearance**: System, Light, Dark, Material 3 (Light), Material 3 (Dark), E-Ink, Nord, Catppuccin Macchiato, Dracula, Gruvbox Light, Gruvbox Dark, Sepia, or OLED / Midnight. Choose **System (Light / OLED Dark)** for the normal light palette in light mode and OLED in dark mode. **OLED / Midnight** stays black in either mode.
- **Language**: English, Chinese (Simplified), Chinese (Traditional), Hindi, Spanish, Arabic, French, Portuguese (Brazil), Russian, German, Japanese, Persian, Vietnamese, Turkish, Korean, Italian, Polish, Dutch, Czech, Swedish, Danish, Hungarian, Ukrainian
- **Date format**: On iOS, **System** uses supported Gregorian short-date preferences from the device. After changing the device preference, return to Mindwtr to refresh task dates and the Settings preview. An explicit format overrides System; unsupported patterns use the locale fallback.
- **App lock**: Asks for your device lock (fingerprint, face or passcode) when you open Mindwtr or return to it. It protects what the app shows, not the database on the phone. While App lock is on, **Require unlock** sets how long Mindwtr can stay in the background before it asks again: **Immediately** (the default), **After 1 minute**, **After 5 minutes** or **After 15 minutes**. Opening Mindwtr after it was closed always asks. This setting stays on this phone. It does not sync, and restoring a backup does not change it.

### Notifications

**Task Reminders:**
- Enable/disable notifications for due dates and start times

**Daily Digest:**

Morning and evening digests have their own switches. They work even when **Task Reminders** is off; notification permission is still required.

- **Morning Briefing**: Summary of due today, overdue, and focus tasks
- **Evening Review**: Prompt to review and wrap up the day
- Configure times for each

**Weekly Review:**
- **Reminders**: Get a weekly notification to start your review
- **Time/Day**: Customize when you want to review (e.g., Friday at 4 PM)

### GTD

Customize how Mindwtr works for your GTD workflow:

**Features (Optional):**
- **Priorities**: Show a priority flag on tasks
- **Time Estimates**: Add a duration field for time blocking. The task editor lists the standard durations plus a **Custom** choice, where you type your own, such as `2h30`. There is no setting for which durations are listed.

**Auto-Archive:**
- Automatically move Done tasks to Archived after a set number of days (default: 7 days). Reducing the delay immediately archives existing Done tasks that are now older than the new limit. Otherwise the check runs every time the app starts, and correcting a task's completion time to something older than the limit files it away straight away.
- Set to "Never" to keep completions in the Done list indefinitely

**Inbox Processing:**
- Mobile keeps the card-based inbox processing flow
- The same shared settings can hide or show the 2-minute shortcut, project-first prompt, contexts/tags section, scheduling section, and reference option

**Task Editor Layout:**
- **Open tasks in** decides which tab a normal task tap opens: **Automatic** (Edit from the Inbox, Preview everywhere else), **Preview**, or **Edit**. A read-only task always opens in Preview, and an explicit edit action always opens Edit. The choice stays on this device and is not synced.
- Tap a field to toggle visibility. Hidden fields still show when they have values, except **Status**, which stays hidden. Hiding Status also hides its button on task rows.
- Long-press the drag handle to reorder fields
- Move fields between sections like **Basic**, **Scheduling**, **Organization**, and **Details**
- Choose which collapsible sections open by default
- Hidden fields can be revealed with the **More** button in the editor

**Manage:**
- Use **Settings → Manage** to edit saved **Areas**, **People**, **Contexts**, and **Tags**
- This is the fastest place to clean up duplicates or rename reusable metadata
- See [Areas and People](/use/areas-people) for where to create Areas and People while assigning them

### Data & Sync

See [Data and Sync](/data-sync/) for sync setup.

**Sync Backend:**
- **Cloud Sync**: Dropbox in supported builds, plus iCloud on iOS where available
- **Folder / File Sync**: File sync via a shared JSON file/folder (Google Drive, Syncthing, OneDrive, etc.)
- **Advanced / Custom Server**: WebDAV or Self-Hosted Mindwtr Cloud

**Other Options:**
- **Sync**: Manually trigger sync
- **Last sync status**: View when data was last synced
- **Sync history**: Collapsed by default; tap to expand recent entries
- **Export Backup**: Save data to a file
- **Export Mindwtr CSV**: Save a spreadsheet-friendly task export that can be re-imported without duplicating existing tasks
- **Export TaskNotes**: Save one Markdown file per task in a ZIP for Obsidian's TaskNotes plugin
- **Apple Reminders import**: Choose a Reminders list and import incomplete reminders into Inbox. Imported reminders stay in Apple Reminders unless you turn on **Delete imported reminders**; already imported, completed, or untitled reminders are skipped. An **Import automatically** switch runs the import each time Mindwtr opens.
- **Settings sync options**: Choose which preferences sync across devices (theme, language/date format, GTD defaults, external calendar URLs, AI settings, and Saved Filters). API keys, custom AI endpoint URLs (including the speech-to-text endpoint), extra request parameters, and local model paths are never synced. Enter a custom endpoint once on each device.

**GTD Options:**
- **Focus task limit**: Choose how many tasks can be marked for Today's Focus.

### Advanced

**AI Assistant:**
- Optional BYOK assistant for clarifying and breaking down tasks

**Calendar (ICS/iCal):**
- **Add Calendar**: Enter a name and URL
- **Enable/Disable**: Toggle visibility of each calendar
- **Remove**: Delete a subscription
- **Test**: Verify the calendar loads correctly

### About

- Version number
- Check for updates
- **Send feedback** for bug reports, feature requests, or other notes when the build has feedback enabled. You can include a reply email if you want follow-up.
- Website and GitHub links
- Privacy policy link

---

## See Also

- [Mobile Installation](/start/mobile-installation)
- [Apple Shortcuts](/power-users/apple-shortcuts)
- [Data and Sync](/data-sync/)
- [GTD Workflow in Mindwtr](/use/gtd-workflow)

## Create a project from a checklist {#checklist-project-conversion}

Project conversion can optionally expand a checklist into tasks. The choice starts off each time. See [checklist project conversion](./desktop#checklist-project-conversion) for transferred information, restrictions, and Undo.
