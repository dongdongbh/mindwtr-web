# Local API

Mindwtr desktop can expose a local API for advanced personal automation.

## When to use it

Use the local API when you want scripts or trusted local tools to create, inspect, search, or update Mindwtr data without clicking through the UI.

Skip it for normal capture, sync, and review.

## Safety model

The local API can mutate your task system. Enable it deliberately, bind it only where you need it, and avoid exposing it beyond your own machine.

## Common operations

- Add a task.
- List active tasks.
- Filter by status, context, project, or tag.
- Read or update a task.
- Complete, archive, delete, or restore a task.
- Search tasks and projects.

## CLI use

The repository includes local tooling for API-driven workflows. Prefer the current CLI documentation in the app repository when exact flags matter.

## See also

- [MCP server](/power-users/mcp)
- [Core API](/developers/core-api)
- [Engineering principles](/developers/engineering-principles)
