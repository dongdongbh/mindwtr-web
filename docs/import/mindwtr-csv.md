# Mindwtr CSV Import

Mindwtr can import a plain CSV file that follows a documented column layout. This is the generic path for apps that have no dedicated importer but can export a spreadsheet.

Supported sources:

- a single `.csv` file
- a `.zip` archive containing one or more CSV files

Import is available on desktop and mobile from **Settings → Data → Import from Mindwtr CSV**. Mindwtr shows a preview with counts and warnings before it writes anything.

## When to Use This Importer

Prefer a native importer when your app is listed on [Importing Data From Other Apps](/import/). Those importers read the app's own export and already understand its quirks.

Reach for Mindwtr CSV when your app is not listed. Export whatever CSV it produces, rename the header cells to the column names below in a spreadsheet editor, and import the result. That preserves far more than pasting a list of titles: projects, sections, areas, statuses, dates, tags, contexts, checklists, and repeat rules all survive the trip.

## File Format

- **Encoding:** UTF-8. A byte-order mark is removed automatically. Other encodings are decoded leniently and may lose accented characters, so save as UTF-8 when your spreadsheet offers the choice.
- **Delimiter:** detected from the first non-empty line. Comma, semicolon, and tab all work.
- **Quoting:** standard CSV. Wrap a value in `"` when it contains the delimiter, a line break, or a quote character, and write an embedded quote as `""`.
- **Header row:** required. `Title` must be present, or the import stops with an error instead of guessing.
- **Column names:** matched without regard to case or order. They are always the English names below, whatever language the Mindwtr interface is set to.
- **Unknown columns:** ignored, with a warning that tells you how many were skipped.
- **Empty rows:** skipped silently. A row that has other content but no title is skipped with a warning.
- **NULL cells:** a cell containing only `NULL` is treated as empty. CSV files exported from SQL databases write missing values that way.

## Column Reference

Every column except `Title` is optional, and you only need the ones you actually use.

| Column | Accepted values | What Mindwtr does |
| --- | --- | --- |
| `Title` | any text | Required. The task title. |
| `Description` | any text | The task description. Line breaks are kept inside a quoted value. |
| `Status` | `inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived` | Case-insensitive. Left empty, the status becomes `done` when `Completed At` is set, otherwise `next` when the row names a project, otherwise `inbox`. A value Mindwtr does not recognize becomes `inbox` with a warning. |
| `Project` | a project name | Creates the project once and puts the task in it. Names are matched without regard to case. |
| `Section` | a section name inside that row's project | Needs a `Project` on the same row. Without one the value is ignored with a warning. |
| `Area` | an area name | With a `Project` on the row, the area holds the project. Without one, the task itself is filed in the area. |
| `Contexts` | names separated by commas or semicolons | Adds a leading `@` when it is missing and drops repeats. |
| `Tags` | names separated by commas or semicolons | Adds a leading `#` when it is missing, lowercases the tag, and drops repeats. |
| `Assigned To` | a person's name | Sets the assignee, which is what feeds the Waiting For list. |
| `Priority` | `high`, `medium`, `low`, or `1`, `2`, `3` | Anything else leaves the priority unset. |
| `Energy` | `high`, `medium`, `low` | Anything else leaves the energy level unset. |
| `Start Date` | a date or date and time | The defer date. The task stays out of Focus until it arrives. |
| `Due Date` | a date or date and time | The deadline. |
| `Review Date` | a date or date and time | The tickler date for a later reconsideration. |
| `Completed At` | a date and time | The completion timestamp. It also turns an empty `Status` into `done`, and it is kept only when the resulting status is `done` or `archived`. |
| `Created At` | a date and time | The creation timestamp. Left empty, the task is created as of the import. |
| `Checklist` | items separated by line breaks or `\|` | Becomes the task's checklist. An item written as `[x] Buy stamps` starts completed; `[ ] Buy stamps` and a bare `Buy stamps` start open. A task with checklist items becomes a list task. |
| `Location` | any text | The task's location field. |
| `Order` | a number | Sorts the task among its siblings in the same project, area, or inbox. Rows with no number, or with the same number, keep the order they had in the file. |
| `ID` | any stable identifier | Gives the row a lasting identity for re-imports. A value that repeats an earlier row in the same import is dropped with a warning. |
| `Recurrence` | a repeat rule such as `FREQ=WEEKLY;BYDAY=MO,TH` | Sets how the task repeats. Add `;X-MINDWTR-STRATEGY=FLUID` for a repeat measured from the day you complete the task instead of from its date. A rule Mindwtr cannot express is skipped with a warning naming the row, and that task arrives without a repeat. |

## Dates and Times

- A date on its own, such as `2026-09-01`, stays a plain date. Mindwtr does not invent a midnight time for it.
- A date and time with no zone, such as `2026-09-05 14:30`, keeps exactly those wall-clock digits.
- A value ending in `Z` or an offset such as `+02:00` is stored as the precise instant it names.
- `Created At` and `Completed At` are always stored as a precise instant, because they record when something really happened.
- A value Mindwtr cannot read is left empty, and the preview reports how many were skipped.
- SQL-style timestamps such as `2026-02-21 22:44:00.6390000 +00:00` are accepted: the extra fractional digits and the space before the offset are normalized away.

ISO 8601 (`YYYY-MM-DD`) is the safest thing to write. Other formats are attempted, but a spreadsheet column still holding locale-specific dates is the most common reason values get skipped.

## Worked Example

```csv
Title,Description,Status,Project,Section,Area,Contexts,Tags,Priority,Start Date,Due Date,Checklist,ID
Book the venue,Needs 60 seats,next,Team Offsite,Logistics,Work,@phone,#offsite,high,2026-09-01,2026-09-12,[x] Shortlist venues|[ ] Call first choice,offsite-1
Draft the agenda,,next,Team Offsite,Programme,Work,@computer,"#offsite, #writing",medium,,2026-09-20,,offsite-2
Buy a whiteboard,,inbox,,,,@errands,,,,,,offsite-3
```

That file creates one area, one project inside it with two sections, two tasks in that project, a two-item checklist on the first of them, and one loose inbox task.

## Import Flow

1. Open **Settings → Data → Import from Mindwtr CSV**.
2. Choose your `.csv` or `.zip` file.
3. Read the preview. It lists how many tasks, areas, projects, sections, and checklist items will be created, how many tasks stay outside projects, the first few projects with their task counts, and every warning.
4. Confirm the import, or cancel if the counts look wrong.

Mindwtr saves a recovery snapshot before it writes. If the result is not what you wanted, restore it from **Settings → Sync → Recovery Snapshots**.

## Re-Importing the Same File

Mindwtr gives every row a stable identity, so importing the same file twice does not duplicate anything.

- With an `ID` column, the identity follows that value, so a corrected re-export lands on the same tasks.
- Without an `ID` column, the identity falls back to the row's position in the file (and, inside a ZIP, the file it came from). Re-importing the very same file is safe, but an export with rows inserted or removed no longer lines up and will create duplicates.
- Rows that already exist are skipped rather than updated. An import never overwrites a task you have edited in the app since.
- Deletions are respected. If you delete an imported project and then import the file again, the project is not recreated and its rows arrive without it.
- If the name of an imported area or project already belongs to something else, the new one gets `(Mindwtr CSV)` appended to its name and a warning says so.

## Exporting From Mindwtr

Mindwtr writes this same format, so the round trip is complete. **Settings → Data → Backup → Export CSV** saves your live tasks as one CSV file, on desktop and mobile.

- The `ID` column is always written, so re-importing an export does not duplicate anything: rows whose `ID` matches a task you already have are skipped with a warning. Edits made to an exported file are **not** pushed back in — change those tasks in the app instead. The identity notes above apply directly.
- Deleted tasks are never exported. The format has no column for them, and such a row would return as a live task on the next import.
- Recurrence is written as the repeat rule the importer reads back, so repeats survive the round trip. How far a counted series has already run is not written, so an imported repeat starts a fresh series.
- For a complete copy including settings and deleted-item history, use the JSON [backup](/data-sync/backup-restore) instead.

## What This Importer Does Not Do

- **Repeat rules Mindwtr cannot express.** A rule built on `BYSETPOS`, or one that repeats more often than daily, is reported with its row and its task arrives without a repeat, never as an approximation of the rule you wrote.
- **Subtask hierarchy.** There is no parent column. Use `Checklist` for the steps inside one task and `Section` for grouping inside a project.
- **Attachments.** File paths or URLs in a CSV are text; nothing is fetched or copied.

## Warnings You May See

Warnings are counted for the whole import and shown once with their count, never once per row. Unreadable repeat rules add one further line naming the first three rows that carried one:

- unknown columns were ignored
- statuses could not be mapped and were imported to Inbox
- `Section` values were ignored because their rows had no `Project`
- `Recurrence` rules could not be understood, and those tasks arrived without a repeat
- date values could not be parsed and were skipped
- rows were dropped because their `ID` repeated an earlier row
- rows with empty titles were skipped
- an imported area or project was renamed to avoid a name conflict
- non-CSV files inside a ZIP were skipped
- nested ZIP files inside the archive were skipped
- a CSV ended with an unclosed quoted field and was imported best-effort
- a CSV file could not be parsed and was skipped

## Tips

- Import a five-row test file first and check the mapping before you bring over hundreds of rows.
- Add an `ID` column if there is any chance you will refine the export and import it again.
- Leave `Status` blank when your source has nothing equivalent. The default puts project work in Next and everything else in the Inbox, ready for you to clarify.
- Keep the original export and the recovery snapshot until you have verified the result.
- Imported `done` and `archived` tasks appear in the Done and Archive views, not in their project's task list — project pages show open work only.

See also [Importing Data From Other Apps](/import/) and [Backup and Restore](/data-sync/backup-restore).
