# Local API Server

Mindwtr includes an optional local REST API server for scripting and integrations. On desktop it runs inside the app binary and uses the same local storage paths as the app. The repository also includes a Bun helper for development and advanced scripting.

---

## Desktop Toggle

Desktop builds can start the local REST API without running source code:

- Open **Settings -> Advanced**.
- Enable **Local API server**.
- Keep the default port `3456` or choose another localhost port.
- Copy the generated bearer token from the same settings card.

The app binds to `127.0.0.1` only and requires `Authorization: Bearer <token>` on every request. Mobile binaries do not expose a local REST API surface.

### Development Helper

The repo helper is still available when you want to run the API outside the desktop app or point it at explicit files.

---

## Quick Start

From the desktop app:

```text
Settings -> Advanced -> Enable local API server
```

Default URL:

```text
http://127.0.0.1:3456
```

From the repo root with Bun:

```bash
bun install
MINDWTR_API_TOKEN=replace-with-a-strong-token bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### Options

| Option          | Default          | Description                 |
| --------------- | ---------------- | --------------------------- |
| `--port <n>`    | `4317`           | Server port                 |
| `--host <host>` | `127.0.0.1`      | Bind address                |
| `--data <path>` | Platform default | Override data.json location |
| `--db <path>`   | Platform default | Override mindwtr.db location |
| `--dangerously-disable-auth` | off | Run with no token at all — unsafe, and not browser-safe even on loopback |

### Environment Variables

| Variable            | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `MINDWTR_DATA`      | Override data.json location (if `--data` is omitted) |
| `MINDWTR_DB_PATH`   | Override mindwtr.db location (if `--db` is omitted)  |
| `MINDWTR_API_TOKEN` | **Required.** Bearer token the helper demands on every request; it refuses to start without one unless `--dangerously-disable-auth` is passed |
| `MINDWTR_API_CORS_ORIGIN` | Optional. One exact http(s) origin allowed to call the API; no CORS headers are sent when unset |

By default, the API resolves both `data.json` and `mindwtr.db` using Mindwtr's platform paths (preferring XDG data on Linux).

---

## Authentication

Desktop Local API requests always require the bearer token shown in **Settings -> Advanced**:

```
Authorization: Bearer <token>
```

The Bun helper requires a token too: it exits immediately unless `MINDWTR_API_TOKEN` is set, or you explicitly pass `--dangerously-disable-auth` (intended only for isolated compatibility testing).

---

## Endpoints

| Method   | Endpoint              | Description                   |
| -------- | --------------------- | ----------------------------- |
| `GET`    | `/health`             | Health check → `{ ok: true }` |
| `GET`    | `/tasks`              | List tasks                    |
| `GET`    | `/tasks?status=next`  | Filter by status              |
| `GET`    | `/tasks?query=@work`  | Search tasks                  |
| `GET`    | `/tasks?isFocusedToday=true` | Desktop: filter starred tasks, including queued future starts |
| `GET`    | `/tasks?all=1`        | Include done/archived         |
| `GET`    | `/tasks?deleted=1`    | Include soft-deleted          |
| `POST`   | `/tasks`              | Create task                   |
| `GET`    | `/tasks/:id`          | Get single task               |
| `PATCH`  | `/tasks/:id`          | Update task                   |
| `DELETE` | `/tasks/:id`          | Soft delete task              |
| `POST`   | `/tasks/:id/complete` | Mark as done                  |
| `POST`   | `/tasks/:id/archive`  | Mark as archived              |
| `POST`   | `/tasks/:id/restore`  | Restore a soft-deleted task   |
| `POST` | `/tasks/:id/reopen` | Desktop: reopen an ordinary finished task (next release) |
| `GET`    | `/projects`           | List projects                 |
| `POST` | `/projects` | Desktop: create project |
| `GET` | `/projects/:id` | Desktop: get one project |
| `PATCH` | `/projects/:id` | Desktop: update project |
| `DELETE` | `/projects/:id` | Desktop: soft-delete project |
| `POST` | `/projects/:id/restore` | Desktop: restore project |
| `GET`    | `/areas`              | List areas                    |
| `POST` | `/areas` | Desktop: find, create or restore an area (next release) |
| `GET` | `/areas/:id` | Desktop: get one Area |
| `PATCH` | `/areas/:id` | Desktop: update an Area |
| `GET`    | `/v1/areas`           | Compatibility alias for areas |
| `GET` | `/sections` | List sections, optionally `?projectId=`; desktop support from the next release |
| `GET` | `/people` | Desktop: list managed people (next release) |
| `POST`   | `/sections`           | Helper: create section        |
| `GET`    | `/sections/:id`       | Helper: get single section    |
| `PATCH`  | `/sections/:id`       | Helper: update section        |
| `DELETE` | `/sections/:id`       | Helper: delete section        |
| `GET`    | `/search?query=...`   | Search tasks + projects       |

**Desktop recurring completion.** The desktop API recognizes `daily`, `weekly`, `monthly`, and `yearly` base rules, with `strict` (fixed schedule) or `fluid` (after completion) strategy. Completing an active task with one of these rules returns `409` / `recurrence_requires_app` for a non-null `relativeStartOffset`, nonempty `byDay` or `byMonthDay`, or a nonempty `rrule` string, including `FREQ=DAILY`. Count exhaustion does not bypass these restrictions.

A strict task with `startTime` and no `dueDate` also requires the app when its next start needs missed-occurrence catch-up or cannot be safely computed. A date-only next start on the current local day is allowed; a timed next start must be later than completion. Refusal leaves the task and successors unchanged; complete that occurrence in the app.

An accepted completion creates no successor when count or until ends the series. Completing an already-done task is a no-op; completing an archived task is a correction without a successor. Archiving never creates a successor. Unrecognized stored recurrence rules do not generate a successor.

Rows marked **Desktop** exist only in the desktop app's Local API. Rows marked **Helper** exist only in the Bun helper, which also answers them under a `/v1/` prefix (`/v1/sections`).

The desktop Local API accepts `isFocusedToday=true`/`1` and `isFocusedToday=false`/`0`. With `true` or `1`, it returns starred tasks, including future-start Next actions queued for Focus. With `false` or `0`, it returns unmarked tasks, including older records without the field. Omit the parameter to leave the list unfiltered. Other values return `400`.

`query` here is plain-text matching: the value is lowercased and tested as a substring against the task's title, description, status, tags, contexts, project and area ids, and support notes. It is not the operator language. `status:`, `context:`, `tag:`, `due:<=7d`, quoted phrases and `-negation` belong to the app's search box, the CLI's `--query`, and the MCP server's task listing; sent here they match as literal characters and will usually return nothing.

### Response Shapes

**Task (partial)**
```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "inbox",
  "projectId": "uuid",
  "dueDate": "2026-01-25T12:00:00.000Z",
  "tags": ["#work"],
  "contexts": ["@email"],
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Project (partial)**
```json
{
  "id": "uuid",
  "title": "Project name",
  "status": "active",
  "color": "#94a3b8",
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Area**
```json
{
  "id": "uuid",
  "name": "Area name",
  "color": "#94a3b8",
  "icon": "briefcase",
  "order": 0,
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z"
}
```

### Create Task Body

```json
{
  "input": "Call Alice",
  "title": "Alternative title",
  "props": {
    "status": "next",
    "contexts": ["@phone"],
    "tags": ["#errands"]
  }
}
```

Desktop uses `title` when present, otherwise `input`, and applies explicit `props`. The Bun helper additionally runs `parseQuickAdd` for `input`.

### Safe task writes on desktop (v1.3.8) {#safe-writes}

The built-in desktop API supports the safe-write controls below. The updated Bun helper also supports task-list versions, conditional PATCH/complete/archive, retry-safe creation, and unchanged-PATCH detection. These guarantees do not extend to the CLI or Cloud API.

**Bun helper.** Fetch each opaque version from the server and workspace that will receive the write; desktop and helper tokens are not interchangeable. The helper uses the same response shapes, protected `/v1/tasks` create/PATCH routes and `/v2/tasks/:id/complete` or `/archive` routes, conflict codes, and seven-day/10,000-live-receipt limits described here. Its receipts are separate local SQLite records, excluded from the JSON mirror and device sync. Authenticated health adds `implementation: "bun-helper"`, `apiVersion: 2`, and the four write/version capabilities; it does not advertise `conditionalTaskListGet` or `referenceLists`. Older servers may return only `{ "ok": true }`; that does not establish support.

**Conditional updates.** A single-task read returns `{ "task": { ... }, "version": "sha256-..." }` with an `ETag` header containing the quoted version. Create and PATCH responses also return a version. Treat it as opaque; a task's numeric `rev` alone is not the validator.

Send the version you actually inspected in `If-Match` when updating:

```bash
curl -s -X PATCH "http://127.0.0.1:3456/v1/tasks/$TASK_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -H 'If-Match: "<version-from-read>"' \
  -d '{"description":"Revised description"}'
```

If the task has changed, the server returns `412` with `code: "task_version_conflict"` and does not apply the patch. Read it again and reconcile the changes before trying another update. Omitting `If-Match` retains unconditional behavior. A comma-separated list of entity tags is accepted; weak tags never satisfy the strong comparison. `If-Match: *` checks existence only, so it does not protect against edits to an existing task.

From the next desktop release, `GET /tasks` also returns a sibling `versions` map keyed by task ID: `{ "tasks": [ ... ], "versions": { "task-id": "sha256-..." } }`. Each token matches the same task's single-read token; the task objects themselves are unchanged. Use the token from the list snapshot you inspected before preparing an edit.

**Conditional completion and archive.** The next desktop release accepts `If-Match` on `POST /tasks/:id/complete` and `/archive`. A stale request returns `412` / `task_version_conflict` without changing the task or creating a recurring successor. Successful responses include sibling `version` and a strong `ETag`. Existing recurrence restrictions still apply.

To require this protection when the desktop version is unknown, use `POST /v2/tasks/:id/complete` or `/v2/tasks/:id/archive`; these routes require a valid `If-Match`. Older desktop versions return `404`. Never fall back to the unprotected action after that response. The existing `/v1/tasks/:id/complete` alias is not sufficient: desktop 1.3.8 accepts it without checking `If-Match`.

**Capability detection.** Authenticated `GET /health` reports `apiVersion: 2` and `capabilities: { "taskListVersions": true, "conditionalTaskPatch": true, "idempotentTaskCreate": true, "conditionalTaskActions": true, "conditionalTaskListGet": true, "referenceLists": true, "ordinaryTaskReopen": true, "areaCreate": true }` in the next desktop release. This describes the desktop API contract, not the app's release version. Older servers can return only `{ "ok": true }`; do not infer protection from that response.

**Retry-safe creation.** Supply an `Idempotency-Key` when creating a task:

```bash
curl -s -X POST 'http://127.0.0.1:3456/v1/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: capture-2026-11-04-001' \
  -d '{"title":"Call Alice","props":{"status":"next"}}'
```

Use a new key for each intended creation. If the response is lost, retry with the same key and the same JSON payload. Object field order does not matter; changed values or array order do. The server returns the original creation result without creating another task. Reusing a key with a different payload returns `409` with `code: "idempotency_conflict"`.

Keys must contain 1–128 visible ASCII characters. Receipts survive application restarts and are scoped to the workspace and API credential. Rotating the token or switching workspaces starts a different scope. Receipts remain valid for seven days, with at most 10,000 unexpired receipts per workspace; reaching that limit rejects new keyed creates with `409` / `idempotency_capacity` rather than discarding valid receipts. After expiry, a retry can create a new task. This is not an unlimited exactly-once guarantee.

Receipts store the original creation response locally. They expire after seven days; expired rows are removed during later successful keyed-create transactions. A replay returns the original response even if the task has since been edited, deleted, or purged. It never restores the old task or overwrites those later changes; use a fresh read to inspect its current state.

The regular `/tasks` routes also accept these headers. The `/v1/tasks` create and `/v1/tasks/:id` PATCH aliases let clients require this newer desktop implementation: older desktop versions return `404` instead of silently ignoring the headers. Do not fall back to an unprotected write after that response.

**Unchanged updates.** A valid PATCH whose normalized final state is unchanged succeeds without rewriting the task or advancing `rev`, `revBy`, or `updatedAt`. Normalization that actually repairs or changes a field is still an edit.

**Conditional task lists (next desktop release).** `GET /tasks` and `/v1/tasks` return a strong `ETag` beginning with `task-list-sha256-` and `Cache-Control: private, no-cache`. Send that quoted tag in `If-None-Match` on the same query. An unchanged response is `304` with no body; otherwise the server returns the complete list and a new tag. Weak tags, lists of tags, and `*` are accepted. Authentication is still required; invalid headers or filters return `400`.

The tag covers the effective filters and the full returned snapshot, including task versions. Use `?all=1&deleted=1` to include retained tombstones. This saves transfer, but still reads and hashes the snapshot in O(n); it is not an incremental change feed or REST pagination. Collection tags cannot be used as task write versions.

**Reference lists (next desktop release).** `GET /sections` returns `{ "sections": [ ... ] }`, optionally filtered by an exact `projectId`; `GET /people` returns `{ "people": [ ... ] }`. Both exclude deleted records unless `deleted=1` is supplied, accept `/v1/` aliases, and work with writes disabled. Records retain their fields; these endpoints do not filter by parent-project status.

**Reopening tasks (next desktop release).** `POST /tasks/:id/reopen` accepts an optional body `{ "status": "next" }`. The target defaults to `next`; `inbox`, `waiting`, and `someday` are also supported. It reopens an ordinary `done` or `archived` task, including a cancelled task, keeping its identity and content. It clears the task’s completion/cancellation/archive markers and resets its board ordering as an ordinary status change does. It does not restore Trash or missing/deleted containers.

If needed, reopening reactivates an archived parent project and restores eligible sections deleted by that archive, in one transaction. Other finished tasks stay finished; their archive bookkeeping is retired. Sections independently deleted or changed after the archive are not restored. A terminal task with recurrence metadata returns `409` / `recurrence_requires_app` without touching its successor; this endpoint is not an undo operation for a recurring series.

Use optional `If-Match` for protection against concurrent edits. Success returns `{ "task": { ... }, "version": "sha256-..." }` and an ETag. Repeating the requested active status is a no-op, but a different active status conflicts; use PATCH for ordinary triage. A stale version still returns `412`, even on a same-status retry. Older servers return `404`; never fall back to PATCH to reopen.

**Creating areas (next desktop release).** `POST /areas` accepts `{ "name": "Work", "props": { "color": "#3b82f6", "icon": "Briefcase" } }`; `props` is optional. Success returns `200` with `{ "area": { ... } }`. Names are trimmed and compared case-insensitively. A live match is returned unchanged with response-only `existing: true`, ignoring supplied color/icon. Otherwise, a deleted match is restored with the same ID, or a new area is created.

Restoration follows the app’s existing rules: only children deleted by the same legacy cascade are restored; independently deleted children stay deleted, and detached tasks/projects are not reassigned. Requested metadata changes respect project color overrides. All affected rows commit together.

### Desktop project writes

The built-in desktop API supports creating, reading, updating, soft-deleting, and restoring projects. Project creation requires `title`; `areaId`, `color`, `status`, `isSequential`, and `order` are optional. Updates accept the same editable fields. Create, read, update, and restore responses contain the saved project as `{ "project": { ... } }`; delete returns `{ "ok": true }`.

Send creation options inside `props`, for example `{ "title": "Plan the move", "props": { "isSequential": true } }`; PATCH fields go directly in the request body. `sequentialScope` accepts `project` or `section`. Project `status` accepts `active`, `someday`, `waiting`, or `archived`. Set `areaId` to `null` to remove the area. Archiving and reactivating a project follow the app’s child-task and section rules. For PATCH, missing projects return `404`, while deleted or purged projects return `409`.

`GET /projects/:id` also returns a stored soft-deleted project, which lets a script inspect it before restoring it. `DELETE /projects/:id` soft-deletes the project and its live sections, and detaches live tasks instead of deleting them or changing their status. `POST /projects/:id/restore` restores the project and any children deleted by the same legacy cascade, but it does not reattach tasks detached by a current delete. Repeating delete or restore is safe and leaves the current state unchanged. Lifecycle changes to a purged project return `409`.

**Create a sequential project:**

```bash
curl -s -X POST "http://127.0.0.1:3456/projects" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Plan the move","props":{"isSequential":true}}' | jq .
```

**Change an existing project to parallel:**

```bash
curl -s -X PATCH "http://127.0.0.1:3456/projects/$PROJECT_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"isSequential":false}' | jq .
```

### Edit Areas on desktop

`GET /areas/:id` and `PATCH /areas/:id` return `{ "area": { ... } }`. Both return `404` for unknown or deleted Areas. These endpoints belong to the built-in desktop API, not the Bun helper.

PATCH accepts a nonempty object containing only `name`, `color`, `icon`, and `order`. `name` must be a nonblank string and is trimmed. `color` and `icon` accept strings or `null` to clear the field. `order` must be a finite number; fractional and negative values are allowed. Unknown fields, invalid types, blank names, and an empty patch return `400`.

A name matching another live Area after trimming and case-insensitive comparison returns `409` without changing anything. The API never merges Areas implicitly. Renames and color changes preserve the app’s related-project metadata behavior and are saved together. Clearing an Area’s color also resets its linked projects to the default color (`#94a3b8`). Setting `order` updates this Area’s numeric position; it is not a batch reorder operation. Area creation and deletion are not included.

```bash
curl -s -X PATCH "http://127.0.0.1:3456/areas/$AREA_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Work","color":"#94a3b8","order":2}' | jq .
```

### Desktop task triage

Use `PATCH /tasks/:id` with `status` to move an active task between `inbox`, `next`, `waiting`, `someday`, and `reference`. Continue using the dedicated `/complete`, `/archive`, and `/restore` actions for those operations. Terminal status values are not accepted by PATCH.

PATCH cannot reopen a done or archived task (`409`); reopen it in the app first. Restore a soft-deleted task with `/restore` before triaging it. Purged tasks cannot be triaged.

Moving a task to `inbox`, `next`, `waiting`, or `someday` inside an archived project returns `409`. First reactivate the project with `PATCH /projects/:id` and `{"status":"active"}`, or move the task out of that project in the same task PATCH.

**Move an Inbox task to Next Actions:**

```bash
curl -s -X PATCH "http://127.0.0.1:3456/tasks/$TASK_ID" \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"status":"next"}' | jq .
```

---

## Examples

**List next actions:**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**Create with explicit props:**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**Complete a task:**

```bash
curl -s -X POST "http://127.0.0.1:3456/tasks/$TASK_ID/complete" \
  -H 'Authorization: Bearer <token>' | jq .
```

---

## CLI Tool

A simpler command-line interface is also available:

```bash
# Add a task
bun mindwtr:cli -- add "Call mom @phone #family"

# List active tasks
bun mindwtr:cli -- list

# List with filters
bun mindwtr:cli -- list --status next --query "due:<=7d"

# Read or update a task
bun mindwtr:cli -- get <taskId>
bun mindwtr:cli -- update <taskId> '{"status":"next"}'

# Complete a task
bun mindwtr:cli -- complete <taskId>

# Archive, delete, or restore
bun mindwtr:cli -- archive <taskId>
bun mindwtr:cli -- delete <taskId>
bun mindwtr:cli -- restore <taskId>

# Search
bun mindwtr:cli -- search "@work"

# List projects
bun mindwtr:cli -- projects
```

### CLI Reference

| Command      | Example                                      | Notes                                |
| ------------ | -------------------------------------------- | ------------------------------------ |
| `add`        | `mindwtr:cli -- add "Call mom @phone"`       | Uses quick-add parsing               |
| `list`       | `mindwtr:cli -- list --status next`          | Supports `--all`, `--deleted`, `--query` |
| `get`        | `mindwtr:cli -- get <taskId>`                | Prints full task JSON                |
| `update`     | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | Applies a JSON patch         |
| `search`     | `mindwtr:cli -- search "@work due:<=7d"`     | Searches tasks/projects              |
| `complete`   | `mindwtr:cli -- complete <taskId>`           | Marks task as done                   |
| `archive`    | `mindwtr:cli -- archive <taskId>`            | Marks task as archived               |
| `delete`     | `mindwtr:cli -- delete <taskId>`             | Soft-deletes task                    |
| `restore`    | `mindwtr:cli -- restore <taskId>`            | Restores a deleted task              |
| `projects`   | `mindwtr:cli -- projects`                    | Lists active projects                |

---

## Security Notes

- The server is intended to run on `127.0.0.1` (localhost). Don't expose it publicly unless you understand the risks.
- Desktop API access requires the generated bearer token from Settings. Keep that token private.
- If you need remote access to the Bun helper, set `MINDWTR_API_TOKEN` and place the server behind an authenticated reverse proxy.

---

## See Also

- [Developer Guide](/developers/developer-guide)
- [Cloud API](/developers/cloud-api)
