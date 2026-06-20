# Developer guide

This page orients contributors who want to run, test, or change Mindwtr locally.

## Repository shape

Mindwtr is a monorepo with shared core logic and platform-specific apps.

| Area | Purpose |
| --- | --- |
| `packages/core` | Shared task model, parser, store, sync, and i18n behavior. |
| `apps/desktop` | Tauri desktop app. |
| `apps/mobile` | React Native / Expo mobile app. |
| `apps/cloud` | Self-hosted sync service. |
| `apps/mcp-server` | MCP integration surface. |

## Setup

Use the package manager and commands documented in the app repository. Install dependencies from the repo root so workspace packages link correctly.

## Development loop

1. Pick the smallest package or app that owns the behavior.
2. Run the package-local test or dev command.
3. Change shared behavior in core when both desktop and mobile need it.
4. Validate the affected platform surface.
5. Run broader checks before opening a pull request.

## Before contributing

- Keep changes scoped.
- Add or update tests for shared behavior.
- Avoid hard-coded user-facing strings.
- Preserve local-first and no-account-needed behavior.
- Do not commit secrets or local config files.

## See also

- [Contributing](/developers/contributing)
- [Architecture](/developers/architecture)
- [Testing strategy](/developers/testing-strategy)
- [Developer troubleshooting](/developers/troubleshooting)
