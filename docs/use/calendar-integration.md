# Calendar Integration (Hard + Soft Landscape)

Mindwtr supports calendar integration in two directions: reading external calendars into the planner, and pushing Mindwtr tasks out to a writable device calendar where the platform exposes one.

- **Mobile (iOS/Android):** device calendars already exposed by the system, ICS subscription URLs, and one-way Mindwtr -> device calendar push
- **Desktop (macOS):** Apple Calendar via EventKit for read and one-way task push, plus ICS subscription URLs
- **Desktop (Linux):** calendars exposed by Evolution Data Server for read and one-way task push, plus ICS subscription URLs
- **Desktop (Windows) and Web:** ICS subscription URLs

## Concepts

- **Hard Landscape**: Meetings/classes from external calendars.
- **Soft Landscape**: Mindwtr tasks scheduled with `startTime` and `timeEstimate`.
- The calendar is a **planning surface** for arranging existing tasks and creating scheduled tasks when the calendar context is the fastest place to do it.

## GTD Semantics

- **`dueDate`** = Deadline (hard commitments).
- **`startTime`** = Tickler/scheduled start (soft commitments).
- **`timeEstimate`** = Suggested duration when scheduling.

## Views

- **Day view**: time grid with scheduled tasks, deadlines, and external events.
- **Week view**: planning grid for scanning a multi-day planning window, showing seven days by default.
- **Month view**: overview with markers for deadlines, scheduled tasks, and events.
- **Schedule view**: rolling 60-day list for upcoming deadlines, scheduled tasks, and external events.

Week view can show anywhere from two to seven days. Step the count with the control that appears in the header on desktop, or by swiping up and down on the timeline on mobile. Fewer days gives each remaining column more width, which helps when titles are long or you are dropping tasks onto specific times. On desktop, shorter views form a continuous rolling range: Previous and Next advance by the visible day count, so every day remains reachable. Mobile keeps the full week available and scrolls the narrower window across it. The count is a per-device layout choice and is not synced.

### Looking back at completed work

By default the calendar shows work that is still ahead of you. The **Completed** toggle in the calendar header also reveals done and archived tasks, placed on the day they were completed rather than on any start or due date they still carry. They are drawn muted and struck through so they never read as outstanding work, and they cannot be dragged to another day — a completion is a record of what happened, not a plan. The **Starts** toggle next to it controls whether tasks appear on their start dates — turn it off to read the calendar as deadlines only.

Tasks archived before Mindwtr recorded completion timestamps fall back to their last-modified date, the same date the Archive list shows for them.

The toggle is a per-device view choice and is not synced, and it never affects a published [calendar subscription feed](/data-sync/self-hosted-cloud) — that feed only ever carries outstanding work.

On desktop, the current calendar state is reflected in the URL:

- `calendarView`: `day`, `week`, `month`, or `schedule`
- `calendarDate`: the selected date, when a day is selected
- `calendarMonth`: the visible calendar month

This lets you bookmark or share a specific planning window, for example a week view for the current sprint or a schedule view for the next two months.

## Recurring Mindwtr Tasks

Recurring Mindwtr tasks are generated as task instances, not as an expanded calendar series:

- The calendar shows the active task instance when it has a due date or scheduled start time.
- By default, Mindwtr does not pre-populate future task occurrences in the calendar. The next real task instance is created only when the current recurring task is completed.
- If **Show future occurrences in Calendar** is enabled on a recurring task, Calendar shows planning-only previews of every occurrence in the visible range. Those previews are not real tasks, and mobile/macOS calendar push still writes only the next occurrence as a normal single event, not as a native recurring event.
- **Strict** keeps the fixed schedule cadence. A monthly task due on the 1st stays anchored to that planned cycle, but Mindwtr still creates one next instance per completion instead of filling every future month.
- **Repeat after completion** calculates the next instance from when you finish the current one. For example, a plain monthly habit completed on the 15th is scheduled from the 15th next time.
- Mobile and macOS calendar push mirror these concrete task instances. They do not export Mindwtr recurrence rules as native recurring calendar events.

## Scheduling Workflow

On desktop:

1. Choose a date or open a time slot.
2. Pick **New** to create a scheduled task, or **Existing** to schedule an unscheduled task.
3. Set start and end times. Mindwtr checks the slot against scheduled tasks and visible external events.
4. Save the task, or adjust timing later from the task editor, day view, or selected-day list.

On wide desktop layouts, **Plan next actions** lists unscheduled next actions for the selected day, including due-but-unscheduled actions. Use it to place a next action into the calendar without opening search. Due dates remain deadlines; scheduling adds a `startTime`.

The planning panel can be collapsed when you want the calendar grid to take the full width. Expand it again when you want to scan available work for the selected date.

On mobile:

1. Open **Calendar -> Schedule Tasks** from the day view.
2. Select an existing task.
3. Mindwtr finds the earliest free slot for that day, avoiding visible external events and scheduled tasks.

Use the mobile scheduling panel the same way: it is for choosing unscheduled work while you are already looking at the day, then assigning a concrete start time.

Mindwtr uses `timeEstimate` as the default duration when available. If there is a conflict, choose another time or shorten the duration.

## External Calendars

### Support Matrix

Supported today:

| Platform | Supported calendar feature | Notes |
| --- | --- | --- |
| iOS/Android mobile | Push Mindwtr tasks to a device calendar | Android is verified with Google Calendar. On iOS, use calendars that are already available to Apple Calendar/EventKit. |
| iOS/Android mobile | Read device calendars | Reads calendars already exposed by the device calendar database after permission is granted. |
| iOS/Android mobile | Direct ICS subscription URLs | The URL must return raw iCalendar data. |
| macOS desktop | Read Apple Calendar accounts | Read events through macOS EventKit after permission is granted. This includes calendars synced into Apple Calendar, such as iCloud, Google, and Exchange. |
| macOS desktop | Push Mindwtr tasks to Apple Calendar | Writes scheduled/due Mindwtr tasks into a selected writable Apple Calendar target through EventKit. |
| Linux desktop | Read system calendar accounts | Reads enabled calendars exposed by Evolution Data Server, including accounts configured in Evolution or GNOME Online Accounts. |
| Linux desktop | Push Mindwtr tasks to a system calendar | Writes scheduled/due Mindwtr tasks into a selected writable Evolution Data Server calendar. |
| Desktop and Web | Direct ICS subscription URLs | The URL must return raw iCalendar data. |

Not supported today:

- Windows native desktop calendar accounts.
- CalDAV account login, server discovery, or DAVx5-specific account discovery.
- Calendar provider OAuth inside Mindwtr, such as signing in to Google, Microsoft, or Nextcloud from Mindwtr.
- Authenticated/private URLs that return `HTTP 401` unless the secret is already embedded in the URL by the calendar provider.
- Calendar web page URLs, including public share pages that render HTML instead of raw `.ics` data.
- Editing external calendar events from Mindwtr.
- Syncing external calendar events through Mindwtr sync. External events are fetched and cached locally.
- Two-way task/calendar sync. Pushed calendar events are generated from Mindwtr tasks.
- Exporting recurring task rules as native recurring calendar events.

### Visibility

External calendar visibility is a local display preference:

- Settings-synced external calendar subscriptions follow your sync settings.
- The per-calendar show/hide state in the Calendar view is stored on the current device.
- Hidden calendars are still available in Settings; they are just excluded from the visible planning surface and free-slot checks on that device.

A subscribed `.ics` feed often holds several logical calendars, told apart by each event's `CATEGORIES` field. Mindwtr splits such a feed automatically: every category becomes its own calendar in the Calendar view, with its own colour and its own show/hide toggle. An event that lists several categories belongs to the first one. Feeds that use `CATEGORIES` as free-form tags are left alone — past eight distinct categories the feed stays a single calendar. Either way the feed keeps one row in Settings, since that is where its URL and Remove button live.

### Calendar colours

Feeds that declare their own colours keep them: Mindwtr reads the standard `COLOR` property, Apple's calendar colour, and per-category colours such as Fossify's, so a subscribed calendar looks the same as it does in the app it came from. A colour you pick yourself in Mindwtr always wins over the feed's, and calendars without any hint get a stable automatically assigned colour. To go back to the feed's own colour after picking one, choose the **Auto** swatch in the subscription's colour picker.

### Mobile: Push Mindwtr Tasks to Calendar

On iOS and Android, Mindwtr can push scheduled tasks and tasks with due dates into a selected device calendar:

- Tasks with a timed `startTime` become timed events. `timeEstimate` is used as the event duration when available.
- Tasks with a date-only `startTime` or only a `dueDate` become all-day events.
- Completed, archived, reference, or deleted tasks are removed from the pushed calendar.
- Mindwtr preserves task titles when pushing into a dedicated `Mindwtr` calendar. If you choose a shared calendar target, pushed event titles are prefixed with `Mindwtr: ` so they remain recognizable beside normal events.
- Task descriptions become event notes, and task locations become event locations.
- If you choose a dedicated calendar named `Mindwtr`, the calendar app can show Mindwtr items with that calendar's own color.

Setup:

1. Open **Menu → Settings → Advanced → Calendar**
2. Enable **Push tasks to calendar**
3. Grant calendar permission
4. Expand **Sync target**
5. Choose where Mindwtr should write events

Target choices:

- **Dedicated account calendar**: best for Google Calendar on Android or iCloud/Apple Calendar on iOS. Create a calendar named `Mindwtr` in that account, then select the dedicated target.
- **Shared account calendar**: writes into an existing account calendar and prefixes event titles with `Mindwtr: `.
- **Dedicated local calendar**: stays on the current device. Some Android calendar apps hide local calendars, and local targets will not appear on calendar.google.com or other account calendar web apps.
- **Shared local calendar**: writes to a local device calendar only.

#### Android: Google Calendar Setup

To use a separate Google-backed `Mindwtr` calendar on Android:

1. Open Google Calendar on the web.
2. Create a new calendar named `Mindwtr` under the same Google account used on Android.
3. On Android, open Google Calendar and refresh the account. Make sure Calendar sync is enabled in Android account settings.
4. In the Google Calendar Android app, enable **Share Google Calendar data with other apps** so Android exposes Google calendars to Mindwtr.
5. Return to Mindwtr **Menu → Settings → Advanced → Calendar**, tap **Refresh calendars**, and select the `Mindwtr` target that shows your Google account.

If the Google-backed `Mindwtr` calendar does not appear in Mindwtr yet, Android has not exposed it through the system calendar provider. Refresh Google Calendar, check Android account sync, enable **Share Google Calendar data with other apps** in Google Calendar, then tap **Refresh calendars** in Mindwtr.

#### iOS: Apple Calendar Setup

To use a separate Apple Calendar target on iPhone or iPad:

1. Open Apple Calendar.
2. Create a new calendar named `Mindwtr`. Use iCloud if you want the events to appear on other Apple devices, or use a local calendar if it should stay on the device.
3. If you use iCloud, confirm Calendar sync is enabled in iOS **Settings -> Apple Account -> iCloud -> Calendar**.
4. Open Mindwtr **Menu → Settings → Advanced → Calendar**.
5. Enable **Push tasks to calendar** and grant calendar permission.
6. Expand **Sync target**, tap **Refresh calendars**, and choose the `Mindwtr` Apple Calendar target.
7. In Apple Calendar, open the calendars list and make sure the selected `Mindwtr` calendar is visible.

If the `Mindwtr` calendar does not appear in the target list, confirm it is visible in Apple Calendar first, then return to Mindwtr and tap **Refresh calendars**.

### Mobile: Read Device Calendars

On mobile, Mindwtr can read calendars from the device calendar database:

- **Android:** via the Android calendar provider. If a sync app does not expose calendars through that provider, Mindwtr cannot see them.
- **iOS:** via EventKit-backed system calendars, such as iCloud, Google, Exchange, and Outlook once enabled in iOS Settings.

Setup:

1. Open **Menu → Settings → Advanced → Calendar**
2. Enable **Device calendars**
3. Grant calendar permission
4. Expand **Device calendars**
5. Choose which device calendars to display

Mindwtr stays read-only and does not perform provider OAuth for calendar sources.

Mindwtr hides its own pushed `Mindwtr` calendars from the read list to avoid importing duplicate copies of the events it created.

### macOS: Apple Calendar Integration

On macOS desktop, Mindwtr can read Apple Calendar events and push scheduled/due Mindwtr tasks through EventKit:

1. Open **Settings → Integrations → Calendar**
2. Request Apple Calendar access
3. Allow Mindwtr in macOS **System Settings -> Privacy & Security -> Calendars**
4. Enable **Push tasks to calendar** if you want Mindwtr tasks written to Apple Calendar
5. Choose a dedicated `Mindwtr` calendar or another writable calendar target

This works only for calendars that are already visible in Apple Calendar.

### Linux: GNOME/Evolution Data Server Integration

On Linux, Mindwtr can read enabled Evolution Data Server calendars and push scheduled/due tasks to writable calendars. This includes accounts already configured in Evolution or GNOME Online Accounts when they are exposed through Evolution Data Server.

1. Configure the calendar account in Evolution or GNOME Online Accounts and confirm it appears in Evolution.
2. Make sure `evolution-data-server` is installed and running.
3. Open **Settings → Integrations → Calendar** in Mindwtr.
4. Enable **Push tasks to calendar** if you want Mindwtr tasks written to the system calendar.
5. Expand **Sync target**, refresh the calendars, and choose a dedicated `Mindwtr` calendar or another writable target.

Linux does not show a separate calendar permission dialog. Subscribed feeds — webcal, weather, contacts and birthdays — are read in Mindwtr but never offered as push targets. A calendar you can read but not write to, such as a CalDAV calendar shared with you, can still appear in the target list, and Mindwtr reports an error when it tries to write there. Flatpak support is prepared for the next Flathub release; until that release is installed, use a native package or the AUR build for this integration. Snap remains unsupported.

### Desktop/Web: ICS URLs

1. Open **Settings → Integrations → Calendar**
2. Add your **ICS URL**
3. Refresh to fetch events

Events are cached on-device and are not synced via Mindwtr sync.

### ICS URL Requirements

Mindwtr expects the URL to fetch raw iCalendar text. A working feed usually:

- starts with `BEGIN:VCALENDAR`
- has a URL ending in `.ics` or an explicit subscription/export link from the calendar provider
- can be fetched without an interactive login page or extra headers

Common examples:

- Google Calendar: use the private **Secret address in iCal format**.
- Nextcloud Calendar: use the calendar subscription/export `.ics` link, not the public calendar page URL.

If Mindwtr shows `HTTP 401`, the server is asking for authentication. Username/password prompts, CalDAV login, and bearer-token headers are not supported for calendar URLs. Use the provider's secret iCalendar subscription URL instead.

If a URL opens a normal web page in a browser, it is probably not the ICS feed. Copy the subscription/export URL from that page.

### Private calendars (Google Calendar)

You **do not** need to make your calendar public. Use the private "Secret address" instead:

1. Open Google Calendar on the web → **Settings**.
2. Select the calendar in the left sidebar.
3. In **Integrate calendar**, copy **Secret address in iCal format**.
4. Paste that URL into Mindwtr.

That link acts like a password: only apps with the link can see events, while the calendar stays private.

## Notes

- Desktop and mobile Calendar can create a separate Mindwtr task from an external event. Mindwtr copies the event title, date/time, location, description, and calendar name where available.
- External calendars are **read-only** inside Mindwtr. Creating a task from an event does not modify the original event.
- ICS recurring events support `FREQ=DAILY`, `WEEKLY`, `MONTHLY`, and `YEARLY`, including `INTERVAL`, `COUNT`, `UNTIL`, `BYDAY`, `BYMONTH`, and `BYMONTHDAY` for the patterns Mindwtr can expand into the visible range.
- Yearly all-day events and yearly rules such as `FREQ=YEARLY;COUNT=...` or `FREQ=YEARLY;BYMONTH=1;BYDAY=3MO` are expanded in the visible calendar window.
- Exception dates and recurrence overrides such as `EXDATE`, `RDATE`, and `RECURRENCE-ID` are not expanded today.
- Recurring events with `RRULE:...;COUNT=...` stop after their original count. If you previously saw very old recurring events, re-import after updating to v0.4.9+.
