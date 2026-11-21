# Import from Microsoft To Do

> This importer is coming to Mindwtr Desktop in the next release after 1.3.9.

Mindwtr Desktop imports tasks from a CSV file exported from the **Tasks** folder in classic Outlook for Windows. Microsoft To Do tasks stored in Exchange Online sync to Outlook Tasks. [Microsoft To Do sync](https://support.microsoft.com/en-us/todo/syncing-your-microsoft-to-do-account)

## Export a Tasks CSV

1. Open classic Outlook for Windows and sign in with the account you use for Microsoft To Do.
2. Open **File → Open & Export → Import/Export**.
3. Select **Export to a file**, then **Comma Separated Values**.
4. Select the **Tasks** folder for your account. Check that it contains the tasks you want to move.
5. Choose a name and location for the CSV file, then select **Finish**. Name the CSV after the Mindwtr project you want. Use a different filename for each Outlook folder you export.

If you use new Outlook, open classic Outlook for this export. The wizard can only export tasks in a folder it can see. If your tasks are missing from the wizard, check that you added the same account in classic Outlook and that the tasks appear in its Tasks view. [Switch between Outlook versions](https://support.microsoft.com/en-us/outlook/getstarted/run-new-outlook-and-classic-outlook-side-by-side) · [Microsoft Q&A export steps](https://learn.microsoft.com/en-ca/answers/questions/5687598/how-can-i-export-my-microsoft-to-do-list-data-and)

Mindwtr reads English and Simplified Chinese column headers. For other export languages, set the Office display language to English and export again. If the CSV uses a legacy Windows encoding, open it in a spreadsheet app and save a copy as CSV UTF-8. [Change the Office display language](https://support.microsoft.com/en-us/office/languages/change-the-language-office-uses-in-its-menus-and-proofing-tools)

## Preview and import

1. In Mindwtr Desktop, open **Settings → Data → Import Data → Import from Microsoft To Do**.
2. Choose the Tasks CSV from Outlook.
3. Review the task count and any warnings in the preview, then confirm the import.

Check a few tasks against the original after importing. If the result is wrong, select **Undo** in the import result. [Backup and restore](/data-sync/backup-restore)

## What moves to Mindwtr

Mindwtr imports task titles, notes, categories as tags, priorities, status, and start, due, and completion dates when Outlook includes them. Check the preview for dates Mindwtr could not interpret. Keep the original lists for recurring schedules, reminders, attachments, and list organization.

Each CSV goes into a project named after the file. The import creates a one-time copy. If you import again with the same filename, Mindwtr skips unchanged tasks it already imported. A new filename or changed task details can create duplicates.
