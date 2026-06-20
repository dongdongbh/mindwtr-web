# FAQ

This page answers the practical questions people usually ask before installing Mindwtr or changing their sync setup.

## Is Mindwtr free?

Yes. Mindwtr is free forever and open source under AGPL-3.0. There is no subscription required to use the app.

## Do I need an account?

No. Mindwtr works locally without an account. Some optional sync providers may require their own account, such as iCloud or Dropbox, but Mindwtr itself does not require one.

## Where is my data stored?

Mindwtr stores data locally first. Desktop and mobile builds use local storage for tasks, projects, notes, settings, and attachments, then export sync snapshots when you enable a sync backend.

## Which sync option should I choose?

Start with the simplest option that matches your devices.

| Need | Recommended path |
| --- | --- |
| Apple-only setup | iCloud / CloudKit |
| Easy cross-platform setup | Dropbox |
| Fully controlled remote | WebDAV or self-hosted Mindwtr Cloud |
| Local network or folder sync | File sync with a provider folder or Syncthing |

See [Data and sync](/data-sync/) before changing sync settings.

## Is Mindwtr a strict GTD app?

Mindwtr is designed around GTD concepts: Inbox, clarify, projects, next actions, contexts, waiting for, someday, and review. You can still use it simply, but the structure is built for a trusted GTD system.

## Does Mindwtr include AI?

AI is optional. Capture and core task management do not depend on AI. Power-user features can use your own AI provider key or compatible local setup when you choose to enable them.

## Can I self-host?

Yes. You can self-host the sync server and web app, or use WebDAV/file sync depending on how much infrastructure you want to manage.

## How do I report a bug or request a feature?

Use the GitHub repository for issues, discussions, and pull requests:

<https://github.com/dongdongbh/Mindwtr>

