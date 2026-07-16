# MCP 服务器

如水提供可选的 **MCP（Model Context Protocol，模型上下文协议）**服务器。它允许你将 AI 智能体（例如 **Claude Desktop**、**Claude Code**、**OpenAI Codex** 或 **Gemini CLI**）连接到本地如水数据库，或连接到自托管的 Mindwtr Cloud 端点。

这是一个 **stdio** 服务器（没有托管的 HTTP 端点）。MCP 客户端将它作为子进程启动，并通过 stdin/stdout 使用 JSON-RPC 通信。

> 规范参考：[apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md)。当 MCP 工具或 schema 发生变化时，请保持此页面与该文件一致。

---

## 应用二进制文件与 MCP 辅助程序

桌面端和移动端应用二进制文件包含如水应用，但目前**不**包含桌面端启动/停止开关。独立 MCP 辅助程序以 [`mindwtr-mcp`](https://www.npmjs.com/package/mindwtr-mcp) 发布，并已列入公共 [MCP Registry](https://registry.modelcontextprotocol.io/)。

你**无需**从源代码运行整个应用即可使用 MCP。正常使用桌面端应用二进制文件管理任务，然后让 MCP 客户端通过 `npx` 启动 `mindwtr-mcp`，或使用 npm 全局安装它。让辅助程序指向桌面端应用的本地 `mindwtr.db`。

在桌面端，应用会在**设置 -> 同步 -> 本地数据**中显示确切的本地数据路径。移动端二进制文件不公开本地 MCP 服务器接口。

---

## 要求

- **Node.js 22+**，用于免编译安装：SQLite 依赖为 Node 22 及更高版本提供预构建二进制文件。Node 20 仍可运行服务器，但安装时需要 C++ 构建工具
- **npm** 或其他 Node 包运行器，用于已发布的 `mindwtr-mcp` 包
- 本地模式需要本地如水数据库（`mindwtr.db`），Cloud 模式则需要自托管的 Mindwtr Cloud URL 和 bearer token
- 仅当从源码树运行辅助程序时才需要 **Bun**

### 默认数据库位置

- **Linux：**`~/.local/share/mindwtr/mindwtr.db`
- **macOS：**`~/Library/Application Support/mindwtr/mindwtr.db`
- **Windows：**`%APPDATA%\mindwtr\mindwtr.db`

沙盒构建在 macOS 上的额外路径：

- `~/Library/Containers/tech.dongdongbh.mindwtr/Data/Library/Application Support/mindwtr/mindwtr.db`

你可以通过以下方式覆盖本地数据库位置：

- `--db /path/to/mindwtr.db`
- 环境变量：`MINDWTR_DB_PATH` 或 `MINDWTR_DB`

对于自托管 Cloud 模式，请使用：

- `--cloud-url https://mindwtr.example.com` 或 `MINDWTR_MCP_CLOUD_URL`
- `--cloud-token <token>` 或 `MINDWTR_MCP_CLOUD_TOKEN`
- 对于可信的私有 HTTP 部署，可选用 `--cloud-allow-insecure-http=true`

---

## 设置与配置

MCP 客户端将服务器作为子进程运行。你需要为客户端指定**命令**并传入参数。

为 MCP 客户端推荐的免安装命令：

```json
{
  "command": "npx",
  "args": [
    "-y",
    "mindwtr-mcp",
    "--db",
    "/path/to/mindwtr.db"
  ]
}
```

该包默认为只读。只有在你明确希望 AI 客户端添加、更新、完成或删除如水数据时，才添加 `--write`。

### 自托管 Cloud 模式

当你运行自己的 Mindwtr Cloud 服务器，并希望在不公开本地 SQLite 文件的情况下使用 MCP 工具时，请使用 Cloud 模式：

```bash
npx -y mindwtr-mcp \
  --cloud-url "https://mindwtr.example.com" \
  --cloud-token "$MINDWTR_TOKEN"
```

也可以在 MCP 客户端配置中使用环境变量：

```json
{
  "command": "npx",
  "args": ["-y", "mindwtr-mcp"],
  "env": {
    "MINDWTR_MCP_CLOUD_URL": "https://mindwtr.example.com",
    "MINDWTR_MCP_CLOUD_TOKEN": "your-token"
  }
}
```

Cloud 模式会从你的自托管 Cloud 服务器读取当前 `/v1/data` 快照，并公开用于任务、项目、分区、领域和人员的读取工具。启用 `--write` 后，对任务、项目、分区和领域的写入会通过 Cloud 服务器的逐资源 [REST 端点](/zh-Hans/developers/cloud-api)（`POST /v1/tasks`、`PATCH /v1/tasks/:id` 等）进行，因此每次编辑都能获得与应用内编辑相同的验证和修订跟踪。若未启用 `--write`，写入工具会返回 `read_only`。Cloud 模式目前还不支持编辑人员和恢复已删除任务。请使用本地数据库后端执行这些操作。

这不是被搁置的托管多租户连接器。Cloud 服务器和 MCP 辅助程序仍由你自行运行；如水并未运营存储所有人任务数据的服务。

如需全局安装，请改用：

```bash
npm install -g mindwtr-mcp
mindwtr-mcp --db "/path/to/mindwtr.db"
```

### 关键参数

- `--db "/path/to/mindwtr.db"`：本地模式下 SQLite 数据库的路径。
- `--write`：在本地或 Cloud 模式下启用写入操作（添加、更新、完成、删除）。**若没有此标志，服务器为只读。**
- `--cloud-url "https://mindwtr.example.com"`：使用自托管的 Mindwtr Cloud 端点，而不是本地数据库。
- `--cloud-token "<token>"`：自托管 Cloud 端点的 bearer token。
- `--cloud-allow-insecure-http=true`：当你有意不使用 HTTPS 时，允许可信的私有 HTTP Cloud URL。

### 1. Claude Desktop

在 Claude Desktop 配置文件中添加服务器条目。

- **macOS：**`~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows：**`%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "~/.local/share/mindwtr/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

_注意：请将数据库路径替换为你实际的本地如水数据库路径。_

### 2. Claude Code（CLI）

你可以通过 CLI 添加服务器：

```bash
claude mcp add mindwtr -- \
  npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 3. OpenAI Codex（CLI / IDE 扩展）

Codex 从 `~/.codex/config.toml` 读取 MCP 服务器配置。你也可以在受信任的项目中使用项目范围的 `.codex/config.toml`。Codex CLI 和 IDE 扩展共享此配置。

**命令行：**

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db"
```

只有当你希望 Codex 修改本地如水数据时，才添加 `--write`：

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

在 Codex TUI 中，运行 `/mcp` 以确认服务器处于活动状态。

**手动配置：**

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db"
]
```

启用写入访问：

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db",
  "--write"
]
```

### 4. Gemini CLI

Gemini CLI 使用 `settings.json`（用户：`~/.gemini/settings.json`；项目：`.gemini/settings.json`）。

**命令行：**

```bash
gemini mcp add mindwtr \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

**手动配置：**

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "/path/to/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

---

## 手动运行

通常无需手动运行（MCP 客户端会代劳），但这对测试很有用。

### 从 npm 运行

```bash
# Read-only
npx -y mindwtr-mcp --db "/path/to/mindwtr.db"

# With write access
npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 从源码运行（Bun）

```bash
# Read-only
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db"

# With write access
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db" --write
```

### 构建并运行（Node）

```bash
# Build
bun run --filter mindwtr-mcp build

# Run
node apps/mcp-server/dist/index.js --db "/path/to/mindwtr.db"
```

---

## 迁移：工具重命名（`mindwtr.*` → `mindwtr_*`）

工具名称现在使用下划线表示法，例如 `mindwtr_list_tasks`；不再记录旧的点号表示法名称。

---

## 可用工具

连接后，AI 智能体可以使用以下工具。服务器默认为**只读**；传入 `--write` 才能启用任何写入工具。
写入访问仅支持 `--write`（没有其他别名）。

| 工具                    | 操作               | 需要 `--write` |
| ----------------------- | ------------------ | -------------- |
| `mindwtr_list_tasks`    | 列出任务           | 否             |
| `mindwtr_list_projects` | 列出项目           | 否             |
| `mindwtr_get_project`   | 获取一个项目       | 否             |
| `mindwtr_list_sections` | 列出分区           | 否             |
| `mindwtr_get_section`   | 获取一个分区       | 否             |
| `mindwtr_list_areas`    | 列出领域           | 否             |
| `mindwtr_list_people`   | 列出人员           | 否             |
| `mindwtr_get_person`    | 获取一个人员       | 否             |
| `mindwtr_get_task`      | 按 ID 获取一个任务 | 否             |
| `mindwtr_add_task`      | 创建任务           | 是             |
| `mindwtr_update_task`   | 更新任务           | 是             |
| `mindwtr_complete_task` | 标记为已完成       | 是             |
| `mindwtr_delete_task`   | 软删除任务         | 是             |
| `mindwtr_restore_task`  | 恢复任务           | 是             |
| `mindwtr_add_project`   | 创建项目           | 是             |
| `mindwtr_update_project`| 更新项目           | 是             |
| `mindwtr_delete_project`| 软删除项目         | 是             |
| `mindwtr_add_section`   | 创建分区           | 是             |
| `mindwtr_update_section`| 更新分区           | 是             |
| `mindwtr_delete_section`| 软删除分区         | 是             |
| `mindwtr_add_area`      | 创建领域           | 是             |
| `mindwtr_update_area`   | 更新领域           | 是             |
| `mindwtr_delete_area`   | 软删除领域         | 是             |
| `mindwtr_add_person`    | 创建人员           | 是             |
| `mindwtr_update_person` | 更新人员           | 是             |
| `mindwtr_rename_person` | 重命名人员         | 是             |
| `mindwtr_delete_person` | 软删除人员         | 是             |

### 读取工具

- **`mindwtr_list_tasks`**：使用筛选条件（状态、项目、日期范围、搜索）列出任务。
- **`mindwtr_list_projects`**：列出所有项目。
- **`mindwtr_get_project`**：按 ID 获取特定项目的详情。
- **`mindwtr_list_sections`**：列出项目分区，可选择按项目筛选。
- **`mindwtr_get_section`**：按 ID 获取特定分区的详情。
- **`mindwtr_list_areas`**：列出所有领域。
- **`mindwtr_list_people`**：列出受管理的人员记录。
- **`mindwtr_get_person`**：按 ID 获取特定人员的详情。
- **`mindwtr_get_task`**：按 ID 获取特定任务的详情。

### 写入工具（需要 `--write`）

写入工具同时支持本地数据库和自托管 Cloud 后端，但 Cloud 模式有两个例外：人员写入工具和 `mindwtr_restore_task` 会在 Cloud 模式下返回明确错误，因为 Cloud API 尚未提供相应端点。

- **`mindwtr_add_task`**：创建新任务。支持自然语言 `quickAdd`（例如“Buy milk @errands /due:tomorrow”）。
- **`mindwtr_update_task`**：更新现有任务，包括 `dueDate`、`startTime`、`reviewAt` 和 `isFocusedToday` 等日程字段（支持使用 `null` 清除字段）。
- **`mindwtr_complete_task`**：将任务标记为已完成。
- **`mindwtr_delete_task`**：软删除任务。
- **`mindwtr_restore_task`**：恢复软删除任务。
- **`mindwtr_add_project`**：创建新项目，包括可选的 `dueDate` 和 `reviewAt`。
- **`mindwtr_update_project`**：更新项目，包括可选的 `dueDate` 和 `reviewAt`。
- **`mindwtr_delete_project`**：软删除项目。
- **`mindwtr_add_section`**：在项目内创建分区。
- **`mindwtr_update_section`**：更新项目分区。
- **`mindwtr_delete_section`**：软删除项目分区。核心逻辑会保留该分区内的任务，并将它们移至无分区状态。
- **`mindwtr_add_area`**：创建新领域。
- **`mindwtr_update_area`**：更新领域。
- **`mindwtr_delete_area`**：软删除领域。
- **`mindwtr_add_person`**：创建受管理的人员，用于任务负责人和等待事项。
- **`mindwtr_update_person`**：更新受管理人员的元数据。
- **`mindwtr_rename_person`**：重命名受管理人员，并可选择更新完全匹配的任务分配。
- **`mindwtr_delete_person`**：软删除受管理人员，但不清除任务分配。

Schema 说明：
- 任务写入工具涵盖 `dueDate`、`startTime`，以及更新时的 `reviewAt`。
- 项目写入工具同时涵盖 `dueDate` 和 `reviewAt`。
- 人员写入工具涵盖 `name`、`note`、`referenceLink`，以及重命名时可选的任务分配更新。
- 确切的规范输入请参阅 [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md)。

## 权限矩阵

在决定以只读模式还是启用 `--write` 运行服务器时，请使用此矩阵。

| 工具                    | 数据访问           | 修改类型          | 只读模式 | `--write` 模式 |
| ----------------------- | ------------------ | ----------------- | -------- | -------------- |
| `mindwtr_list_tasks`    | 任务行（已筛选）   | 无                | 允许     | 允许           |
| `mindwtr_list_projects` | 项目行             | 无                | 允许     | 允许           |
| `mindwtr_get_project`   | 按 ID 获取单个项目 | 无                | 允许     | 允许           |
| `mindwtr_list_sections` | 分区行             | 无                | 允许     | 允许           |
| `mindwtr_get_section`   | 按 ID 获取单个分区 | 无                | 允许     | 允许           |
| `mindwtr_list_areas`    | 领域行             | 无                | 允许     | 允许           |
| `mindwtr_list_people`   | 人员行             | 无                | 允许     | 允许           |
| `mindwtr_get_person`    | 按 ID 获取单个人员 | 无                | 允许     | 允许           |
| `mindwtr_get_task`      | 按 ID 获取单个任务 | 无                | 允许     | 允许           |
| `mindwtr_add_task`      | 任务表             | 插入              | 拒绝     | 允许           |
| `mindwtr_update_task`   | 任务表             | 更新              | 拒绝     | 允许           |
| `mindwtr_complete_task` | 任务表             | 更新状态          | 拒绝     | 允许           |
| `mindwtr_delete_task`   | 任务表             | 软删除            | 拒绝     | 允许           |
| `mindwtr_restore_task`  | 任务表             | 恢复软删除        | 拒绝     | 允许           |
| `mindwtr_add_project`   | 项目表             | 插入              | 拒绝     | 允许           |
| `mindwtr_update_project`| 项目表             | 更新              | 拒绝     | 允许           |
| `mindwtr_delete_project`| 项目表             | 软删除            | 拒绝     | 允许           |
| `mindwtr_add_section`   | 分区表             | 插入              | 拒绝     | 允许           |
| `mindwtr_update_section`| 分区表             | 更新              | 拒绝     | 允许           |
| `mindwtr_delete_section`| 分区表             | 软删除            | 拒绝     | 允许           |
| `mindwtr_add_area`      | 领域表             | 插入              | 拒绝     | 允许           |
| `mindwtr_update_area`   | 领域表             | 更新              | 拒绝     | 允许           |
| `mindwtr_delete_area`   | 领域表             | 软删除            | 拒绝     | 允许           |
| `mindwtr_add_person`    | 人员表             | 插入              | 拒绝     | 允许           |
| `mindwtr_update_person` | 人员表             | 更新              | 拒绝     | 允许           |
| `mindwtr_rename_person` | 人员表/任务        | 重命名/更新引用   | 拒绝     | 允许           |
| `mindwtr_delete_person` | 人员表             | 软删除            | 拒绝     | 允许           |

实用指南：

- 进行探索和报告时，默认使用只读模式。
- 仅对你信任 AI 客户端可编辑的后端启用 `--write`：本地数据库或你自己的 Cloud 服务器。
- 对于智能体工作流，执行删除/完成操作前最好要求明确确认。

## 高级用法示例

### 1）引导式每周回顾

1. 使用 `status: "waiting"` 和 `status: "someday"` 调用 `mindwtr_list_tasks`。
2. 按项目汇总停滞事项。
3. 对选定事项调用 `mindwtr_update_task` 设置 `reviewAt`。

### 2）收集箱整理会话

1. 使用 `status: "inbox"` 和 `sortBy: "createdAt"` 调用 `mindwtr_list_tasks`。
2. 对每项任务使用 `mindwtr_update_task` 进行分类（`next`、`waiting`、`reference` 等）。
3. 第二轮补充缺失的元数据（项目、情境、标签）。

### 3）安全批量关闭模式

对于可能具有破坏性的自动化：

1. 执行读取阶段：只列出候选 ID。
2. 提供确认摘要（数量 + 标题）。
3. 仅在用户明确批准后执行写入（`complete_task` / `delete_task`）。
4. 保留 ID，以便通过 `restore_task` 回滚。

### 4）使用自然语言快速捕获

使用 `mindwtr_add_task` + `quickAdd`：

```json
{
  "quickAdd": "Follow up with Alex +Hiring @work #ops /due:tomorrow 10am"
}
```

这适用于快速捕获流程；此时解析命令比手动设置每个字段更高效。

---

## 工具参考

所有工具都在 `content.text` 字段中返回 JSON。请解析该 JSON 以取得实际 payload。

## 操作限制

将如水接入智能体工作流时，以下限制很有用：

- `mindwtr_list_tasks` 默认为 `limit: 200`，且 `limit` 上限为 `500`。
- MCP 任务创建/更新验证将任务标题限制为 `500` 个字符。
- MCP 任务创建将快速添加输入限制为 `2000` 个字符，与 Cloud 任务 API 的快速添加限制一致。
- SQLite 层使用 5 秒的 `busy_timeout`，因此数据库锁定时应失败，而不是无限期挂起。

如果需要超过 500 项任务，请使用 `limit` + `offset` 分页，而不是期待单次返回无限量响应。

### `mindwtr_list_tasks`

**输入字段**

- `status`：`inbox | next | waiting | someday | reference | done | archived | all`
- `projectId`：string
- `includeDeleted`：boolean
- `limit`：number
- `offset`：number
- `search`：string
- `dueDateFrom`：ISO 日期或日期时间字符串（按日历日期比较）
- `dueDateTo`：ISO 日期或日期时间字符串（按日历日期比较）
- `sortBy`：`updatedAt | createdAt | dueDate | title | priority`
- `sortOrder`：`asc | desc`

**示例**

```json
{
  "status": "next",
  "limit": 20,
  "offset": 0,
  "sortBy": "updatedAt",
  "sortOrder": "desc"
}
```

**响应**

```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "title": "Follow up with design",
      "status": "next",
      "updatedAt": "2026-01-25T03:45:57.246Z"
    }
  ]
}
```

### `mindwtr_list_projects`

**输入字段**

- 无

**响应**

```json
{
  "projects": [
    {
      "id": "project-uuid",
      "title": "Mindwtr",
      "status": "active"
    }
  ]
}
```

### `mindwtr_get_project`

**输入字段**

- `id`：string（项目 UUID）
- `includeDeleted`：boolean（可选）

**示例**

```json
{ "id": "project-uuid" }
```

### `mindwtr_list_sections`

**输入字段**

- `projectId`：string（可选）
- `includeDeleted`：boolean（可选）

**响应**

```json
{
  "sections": [
    {
      "id": "section-uuid",
      "projectId": "project-uuid",
      "title": "Planning"
    }
  ]
}
```

### `mindwtr_get_section`

**输入字段**

- `id`：string（分区 UUID）
- `includeDeleted`：boolean（可选）

**示例**

```json
{ "id": "section-uuid" }
```

### `mindwtr_list_areas`

**输入字段**

- 无

**响应**

```json
{
  "areas": [
    {
      "id": "area-uuid",
      "name": "Work"
    }
  ]
}
```

### `mindwtr_list_people`

**输入字段**

- `includeDeleted`：boolean（可选）

**响应**

```json
{
  "people": [
    {
      "id": "person-uuid",
      "name": "Alex"
    }
  ]
}
```

### `mindwtr_get_person`

**输入字段**

- `id`：string（人员 UUID）
- `includeDeleted`：boolean（可选）

**示例**

```json
{ "id": "person-uuid" }
```

### `mindwtr_get_task`

**输入字段**

- `id`：string（任务 UUID）
- `includeDeleted`：boolean（可选）

**示例**

```json
{ "id": "task-uuid" }
```

### `mindwtr_add_task`（写入）

**输入字段**

- `title`：string（省略 `quickAdd` 时必填）
- `quickAdd`：string（省略 `title` 时必填）
- `status`：`inbox | next | waiting | someday | reference | done | archived`
- `projectId`：string
- `dueDate`：ISO string
- `startTime`：ISO string
- `contexts`：string[]
- `tags`：string[]
- `description`：string
- `priority`：string
- `timeEstimate`：string（例如 `30m`、`2h`）

**示例**

```json
{
  "quickAdd": "Send invoice +Acme /due:tomorrow 9am #finance"
}
```

### `mindwtr_update_task`（写入）

**输入字段**

- `id`：string（任务 UUID）
- `title`、`status`、`projectId`、`dueDate`、`startTime`、`contexts`、`tags`、`description`、`priority`、`timeEstimate`、`reviewAt`、`isFocusedToday`

**说明**

- 使用 `null` 清除可为空的字段。这适用于 `projectId`、`dueDate`、`startTime`、`contexts` 和 `tags` 等任务字段；`areaId`、`dueDate`、`reviewAt` 和 `supportNotes` 等项目字段；分区的 `description`；领域的 `color` 和 `icon`；以及人员的 `note` 和 `referenceLink`。

**示例**

```json
{
  "id": "task-uuid",
  "status": "waiting",
  "reviewAt": "2026-01-27T09:00:00.000Z"
}
```

### `mindwtr_complete_task`（写入）

**输入字段**

- `id`：string（任务 UUID）

### `mindwtr_delete_task`（写入）

**输入字段**

- `id`：string（任务 UUID）

### `mindwtr_restore_task`（写入）

**输入字段**

- `id`：string（任务 UUID）

### `mindwtr_add_project`（写入）

**输入字段**

- `title`：string
- `color`：string（可选）
- `status`：`active | someday | waiting | archived`（可选）
- `areaId`：string 或 `null`
- `isSequential`：boolean（可选）
- `isFocused`：boolean（可选）
- `dueDate`：ISO string 或 `null`
- `reviewAt`：ISO string 或 `null`
- `supportNotes`：string 或 `null`

### `mindwtr_update_project`（写入）

**输入字段**

- `id`：string（项目 UUID）
- `title`、`color`、`status`、`areaId`、`isSequential`、`isFocused`、`dueDate`、`reviewAt`、`supportNotes`

### `mindwtr_delete_project`（写入）

**输入字段**

- `id`：string（项目 UUID）

### `mindwtr_add_section`（写入）

**输入字段**

- `projectId`：string
- `title`：string
- `description`：string 或 `null`（可选）
- `order`：number（可选）
- `isCollapsed`：boolean（可选）

### `mindwtr_update_section`（写入）

**输入字段**

- `id`：string（分区 UUID）
- `title`、`description`、`order`、`isCollapsed`

### `mindwtr_delete_section`（写入）

**输入字段**

- `id`：string（分区 UUID）

### `mindwtr_add_area`（写入）

**输入字段**

- `name`：string
- `color`：string（可选）
- `icon`：string（可选）

### `mindwtr_update_area`（写入）

**输入字段**

- `id`：string（领域 UUID）
- `name`、`color`、`icon`

### `mindwtr_delete_area`（写入）

**输入字段**

- `id`：string（领域 UUID）

### `mindwtr_add_person`（写入）

**输入字段**

- `name`：string
- `note`：string 或 `null`（可选）
- `referenceLink`：string 或 `null`（可选）

### `mindwtr_update_person`（写入）

**输入字段**

- `id`：string（人员 UUID）
- `name`、`note`、`referenceLink`

### `mindwtr_rename_person`（写入）

**输入字段**

- `id`：string（人员 UUID）
- `name`：string
- `updateTasks`：boolean（可选）

### `mindwtr_delete_person`（写入）

**输入字段**

- `id`：string（人员 UUID）

---

## 输出格式说明

- 工具输出是 JSON 字符串，而不是结构化 MCP 值。客户端应解析 `content[0].text`。
- 任务/项目 ID 是本地 SQLite 数据库中的 UUID。
- 日期是 ISO 8601 字符串（UTC）。

---

## 安全与说明

- **并发：**服务器使用 SQLite WAL 模式。如果数据库被锁定，写入可能失败；客户端应进行重试。
- **共享逻辑：**写入操作使用共享的 `@mindwtr/core` 库，以确保执行业务规则。
- **保持活动：**只要 `stdin` 保持打开，服务器就会继续运行。

## 故障排除

- **“Command not found”：**在 MCP 客户端配置中使用 `npx -y mindwtr-mcp`，或使用 `npm install -g mindwtr-mcp` 全局安装该包。
- **客户端连接问题：**请确保没有在 MCP 客户端配置中使用 `bun run` 作为命令，因为它可能输出额外文本。优先使用 `npx -y mindwtr-mcp`；对于源码检出，请直接用 `bun` 运行源文件，或用 `node` 运行构建后的文件。
