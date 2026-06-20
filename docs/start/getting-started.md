# Getting Started

Welcome to Mindwtr! This guide will help you get up and running quickly.

## Installation

### Desktop

| Platform          | Installation                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Arch Linux**    | `mindwtr-bin` prebuilt AUR package, or `mindwtr` source-built AUR package                           |
| **Debian/Ubuntu** | Add the APT repo (recommended) or download `.deb` from [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **Fedora/RHEL**   | Add the DNF repo (recommended) or download `.rpm` from [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **Flatpak**       | Install from [Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr)                            |
| **AppImage**      | Download `.AppImage`, `chmod +x`, and run                                                           |
| **Windows**       | Microsoft Store, Winget, Chocolatey, Scoop, portable ZIP, or installer from [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **macOS**         | [Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144), TestFlight beta, Homebrew, or `.dmg` from [Releases](https://github.com/dongdongbh/Mindwtr/releases) |

See [Desktop Installation](/start/desktop-installation) for detailed instructions.

### Mobile

| Platform    | Installation                                                                 |
| ----------- | ---------------------------------------------------------------------------- |
| **Android** | Google Play, F-Droid, IzzyOnDroid, or APK from [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **iOS**     | App Store, TestFlight beta, or simulator/self-build for development          |

See [Mobile Installation](/start/mobile-installation) for detailed instructions.

### Docker and web app

Run the web app (PWA) and self-hosted sync server with Docker when you want a browser-accessible deployment:

- [Docker Deployment](/power-users/docker-deployment)
- [Web App (PWA)](/power-users/web-app-pwa)

---

## First Launch

On a fresh install, Mindwtr asks whether you want to start fresh, import a backup, or connect sync. After setup, it opens the **Focus** view by default so today's calendar items and next actions are visible first. Capture new work into the **Inbox** whenever you need to park an idea quickly.

### The Basic Workflow

1. **Capture** everything to the Inbox
2. **Clarify** each item using the processing wizard
3. **Organize** into Next Actions, Projects, or Someday/Maybe
4. **Reflect** during your Weekly Review
5. **Engage** with confidence

---

## Quick Add Syntax

Mindwtr supports natural language quick-add. Type directly in the task input:

| Syntax             | Example                    | Result                |
| ------------------ | -------------------------- | --------------------- |
| `@context`         | `Buy milk @errands`        | Adds @errands context |
| `#tag`             | `Research topic #creative` | Adds #creative tag    |
| `+Project`         | `Call vendor +HomeReno`    | Assigns to project    |
| `+Multi Word`      | `+New Project Name`        | Assigns to "New Project Name" |
| `!Area`            | `Plan roadmap !Work`       | Assigns to area       |
| `/area:<name>`     | `/area:Personal`           | Assigns to area (no spaces) |
| `/start:date`      | `Task /start:monday`       | Sets start date       |
| `/due:date`        | `Report /due:friday`       | Sets due date         |
| `/review:date`     | `Task /review:next week`   | Sets review date      |
| `/note:text`       | `Task /note:remember X`    | Adds description      |
| `/status`          | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Sets status |

**Date examples:**
- `/due:today`, `/due:tomorrow`
- `/due:friday`, `/due:next week`
- `/due:in 3 days`, `/due:2025-01-15`
- `/start:tomorrow`, `/review:next week`

Absolute dates use fixed ISO format `YYYY-MM-DD` (for example, `/due:2026-03-15`), regardless of your UI locale/date display format.

**Escaping**
- Use a backslash to keep symbols as plain text: `\\@`, `\\#`, `\\+`, `\\/`
- Example: `Call \\@support /due:tomorrow` → title becomes `Call @support`

**Unicode support**
- Context and tag names accept Unicode letters and numbers (e.g., CJK and accented characters).

> **Tip:** You can also use **Audio Capture** to speak your tasks. Enable it in **Settings → AI Assistant** to use voice-to-text with smart parsing.

---

## Organizing Model

Mindwtr uses four different grouping tools. Use each for what it is good at:

- **Projects**: Multi-step outcomes you want to complete (for example, "Launch v2 website").
- **Areas**: Ongoing responsibility domains with no finish line (for example, "Health", "Family", "Career").
- **Contexts**: Where/how a task can be done (for example, `@home`, `@phone`, `@errands`).
- **Tags**: Flexible labels for energy, theme, or custom grouping (for example, `#focused`, `#lowenergy`).

Practical rule:
- If it has an end state, use a **Project**.
- If it is a long-term life/work domain, use an **Area**.
- If it depends on place/tool/person, use a **Context**.
- If you want optional filtering, use a **Tag**.

---

## Next Steps

- Learn about [GTD Overview](/use/gtd-overview)
- Explore the [User Guide Desktop](/use/desktop) or [User Guide Mobile](/use/mobile)
- Set up [Data and Sync](/data-sync/)
- Enable [AI Assistant](/power-users/ai-assistant) (optional)

---

## Need Help?

- Check the [FAQ](/start/faq)
- [Report an issue](https://github.com/dongdongbh/Mindwtr/issues)
- Read the full [GTD Workflow in Mindwtr](/use/gtd-workflow) guide
