# MCP server

Mindwtr can expose a Model Context Protocol server for advanced users who want external tools to read or operate on their task system through a controlled interface.

## When to use this

Use MCP if you already use an MCP-compatible client and want structured access to Mindwtr data for automation, search, or guided task operations.

Skip it if you only need normal task capture, sync, or review.

## What MCP can help with

- Search tasks, projects, and notes
- Create or update tasks through a controlled tool surface
- Inspect GTD lists from an external workspace
- Build personal automations around your Mindwtr data

## Safety model

MCP access is powerful. Treat any connected client as something that can act on your task system.

::: warning Connect deliberately
Only connect clients you trust, and review the exact tools exposed by your current Mindwtr build.
:::

## Setup outline

1. Enable the MCP server in the supported Mindwtr app or companion process.
2. Copy the generated command or connection details.
3. Add that configuration to your MCP-compatible client.
4. Start with read-only or low-risk operations.
5. Confirm changes inside Mindwtr before relying on automation.

## Troubleshooting

- Confirm the Mindwtr app or server process is running.
- Confirm the client uses the correct command, port, or transport.
- Restart the client after changing MCP configuration.
- Check logs for permission or connection errors.

