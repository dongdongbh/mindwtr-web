# Power user integrations

Mindwtr connects to the tools around it without giving up the local-first model. This page groups the integrations by what you want to get done. For each one, four questions tell you how much trust it asks for:

- **What it can read** in your data
- **What it can change**
- **Where it runs**
- **What leaves your device**

Every integration here is optional and stays off until you set it up. Full instructions live on each linked page.

## Capture from anywhere

### Apple Shortcuts

Send tasks into your Inbox from Siri, the Shortcuts app, the Action Button, or an automation, and jump straight to a GTD list.

| Question | Answer |
| --- | --- |
| What it can read | Nothing. It only captures tasks and opens lists. |
| What it can change | Adds Inbox captures. It cannot edit, complete, or delete tasks. |
| Where it runs | On your iPhone or iPad. |
| What leaves your device | Nothing. Captures run through Mindwtr's normal store and sync; Swift never writes tasks directly. |

[Apple Shortcuts guide](/power-users/apple-shortcuts)

### Email capture

Point the desktop app at a mail folder and each message that lands there becomes an Inbox task. On the phone, share an email into Mindwtr instead.

| Question | Answer |
| --- | --- |
| What it can read | The one mail folder you point it at. It leaves the rest of your mailbox alone. |
| What it can change | Creates Inbox tasks. It never modifies, moves, or deletes your mail. |
| Where it runs | On your desktop, talking IMAP directly to your mail provider. No third-party relay. |
| What leaves your device | Nothing to a third party. Self-hosted recipes send only the fields you map, to your own server. |

[Email capture guide](/power-users/email-capture)

### Jira and other work trackers

Let Jira's own automation push each new work item into your Inbox, by email or straight to your self-hosted server. There is no Jira client inside the app, and captures are one-way.

| Question | Answer |
| --- | --- |
| What it can read | Nothing. Jira pushes work items out; Mindwtr never connects to Jira. |
| What it can change | Creates Inbox tasks. Completing a task never touches the Jira issue. |
| Where it runs | Inside Jira's own automation, feeding email capture or your own server. |
| What leaves your device | Nothing. Your Jira credentials stay in Jira; Mindwtr stores no tracker token. |

[Jira capture guide](/power-users/jira-capture)

## Connect your personal tools

### Obsidian

Read tasks out of an Obsidian vault, keep them refreshed as files change, and open the source note back in Obsidian.

| Question | Answer |
| --- | --- |
| What it can read | The vault files in the folders you allow, on desktop. |
| What it can change | Toggles a checkbox or a TaskNotes status for supported formats. It does not rewrite your notes. |
| Where it runs | Desktop only. It is not a Mindwtr sync backend. |
| What leaves your device | Nothing. Your notes stay in your vault. |

[Obsidian guide](/power-users/obsidian)

## Automate and script on your machine

### Local API

A REST API for scripts, shortcuts, and small tools that need to read and write your tasks.

| Question | Answer |
| --- | --- |
| What it can read | All task data, plus read-only access to projects and areas. |
| What it can change | Create, update, complete, archive, soft-delete, and restore tasks. Projects and areas stay read-only. |
| Where it runs | Inside the desktop app, bound to `127.0.0.1` and requiring a bearer token on every request. |
| What leaves your device | Nothing. Requests stay on localhost. |

[Local API guide](/power-users/local-api)

## Connect an AI agent

### MCP server

Let an AI client such as Claude, Codex, or Gemini reach your Mindwtr data through the Model Context Protocol.

| Question | Answer |
| --- | --- |
| What it can read | Tasks, projects, sections, areas, and people. |
| What it can change | Read-only by default. With `--write`, add, update, complete, and delete. |
| Where it runs | As a local subprocess over your SQLite file, or against a Cloud server you host yourself. |
| What leaves your device | Only what the AI client you connect receives. In Cloud mode, edits go to your own server through its validated API. |

[MCP server guide](/power-users/mcp)

## AI inside the app

### AI assistant

Optional, bring-your-own-key help for clarifying tasks, breaking them down, and reviewing stale items.

| Question | Answer |
| --- | --- |
| What it can read | The task data the action you run needs, and no more. |
| What it can change | Only what you review and approve. |
| Where it runs | Through the provider you configure, which can be a local endpoint such as llama.cpp or Ollama. |
| What leaves your device | Only the scoped data, sent to your chosen provider. Nothing leaves if that provider runs locally. |

[AI assistant guide](/power-users/ai-assistant)

## Run it yourself

Prefer a browser-accessible or self-hosted setup? These pages cover deployment rather than a single integration:

- [Web app (PWA)](/power-users/web-app-pwa)
- [Docker deployment](/power-users/docker-deployment)
- [Self-hosted cloud](/data-sync/self-hosted-cloud)
