# Engineering principles

These are the rules that keep Mindwtr local-first, sync-safe, and maintainable across desktop, mobile, web, cloud, API, and MCP surfaces.

## Persistence

- Every write is revision-guarded.
- UI success should mean durable persistence.
- Deletes detach and tombstone instead of blindly cascading.

## Sync

- Merge should be a fixed point.
- Sync's own writes should not retrigger sync loops.
- User edits during sync are sacred.
- The sync document is one merge unit unless there is a transaction story.

## Attachments

- Upload bytes first.
- Publish metadata second.
- Treat missing bytes as a real failure, not a cosmetic issue.

## Multi-process access

MCP, CLI, local API, and UI writes must respect one canonical store and a serialized write path. If a surface cannot safely write, make it read-only.

## Dates and recurrence

- One shared next-instance function.
- Status outranks dates.
- One active instance per recurring task.
- Date-only values should not gain implicit times.

## Release engineering

Every distribution channel is a different runtime. Validate the channel artifact, not just the source tree.

## See also

- [Testing strategy](/developers/testing-strategy)
- [Performance guide](/developers/performance)
- [Release process](/developers/release-process)
