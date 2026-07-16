# 本地 API 服务器

Mindwtr 提供可选的本地 REST API 服务器，用于脚本和集成。在桌面端，它运行于应用二进制文件内部，并使用与应用相同的本地存储路径。仓库还包含一个 Bun 辅助程序，可用于开发和高级脚本编写。

---

## 桌面端开关

桌面端构建无需运行源代码即可启动本地 REST API：

- 打开**设置 -> 高级**。
- 启用**本地 API 服务器**。
- 保留默认端口 `3456`，或选择其他 localhost 端口。
- 从同一张设置卡片中复制生成的 bearer token。

应用仅绑定至 `127.0.0.1`，并要求每个请求都包含 `Authorization: Bearer <token>`。移动端二进制文件不公开本地 REST API 接口。

### 开发辅助程序

当你希望在桌面端应用之外运行 API，或令其指向明确指定的文件时，仍可使用仓库中的辅助程序。

---

## 快速开始

从桌面端应用启动：

```text
Settings -> Advanced -> Enable local API server
```

默认 URL：

```text
http://127.0.0.1:3456
```

从仓库根目录使用 Bun 启动：

```bash
bun install
bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### 选项

| 选项            | 默认值       | 说明                       |
| --------------- | ------------ | -------------------------- |
| `--port <n>`    | `4317`       | 服务器端口                 |
| `--host <host>` | `127.0.0.1`  | 绑定地址                   |
| `--data <path>` | 平台默认值   | 覆盖 data.json 的位置      |
| `--db <path>`   | 平台默认值   | 覆盖 mindwtr.db 的位置     |

### 环境变量

| 变量                | 说明                                                   |
| ------------------- | ------------------------------------------------------ |
| `MINDWTR_DATA`      | 覆盖 data.json 的位置（如果省略 `--data`）             |
| `MINDWTR_DB_PATH`   | 覆盖 mindwtr.db 的位置（如果省略 `--db`）              |
| `MINDWTR_API_TOKEN` | 仅限 Bun 辅助程序：如果已设置，则要求 `Authorization: Bearer <token>` |

默认情况下，API 会使用 Mindwtr 的平台路径解析 `data.json` 和 `mindwtr.db`（在 Linux 上优先使用 XDG 数据路径）。

---

## 认证

桌面端本地 API 请求始终需要**设置 -> 高级**中显示的 bearer token：

```
Authorization: Bearer <token>
```

Bun 辅助程序仅在设置了 `MINDWTR_API_TOKEN` 时才要求令牌。

---

## 端点

| 方法     | 端点                  | 说明                          |
| -------- | --------------------- | ----------------------------- |
| `GET`    | `/health`             | 健康检查 → `{ ok: true }`     |
| `GET`    | `/tasks`              | 列出任务                      |
| `GET`    | `/tasks?status=next`  | 按状态筛选                    |
| `GET`    | `/tasks?query=@work`  | 搜索任务                      |
| `GET`    | `/tasks?all=1`        | 包含已完成/已归档任务         |
| `GET`    | `/tasks?deleted=1`    | 包含软删除任务                |
| `POST`   | `/tasks`              | 创建任务                      |
| `GET`    | `/tasks/:id`          | 获取单个任务                  |
| `PATCH`  | `/tasks/:id`          | 更新任务                      |
| `DELETE` | `/tasks/:id`          | 软删除任务                    |
| `POST`   | `/tasks/:id/complete` | 标记为已完成                  |
| `POST`   | `/tasks/:id/archive`  | 标记为已归档                  |
| `POST`   | `/tasks/:id/restore`  | 恢复软删除任务                |
| `GET`    | `/projects`           | 列出项目                      |
| `GET`    | `/areas`              | 列出领域                      |
| `GET`    | `/v1/areas`           | 领域端点的兼容别名            |
| `GET`    | `/search?query=...`   | 搜索任务和项目                |

### 响应结构

**任务（部分字段）**
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

**项目（部分字段）**
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

**领域**
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

### 创建任务的请求体

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

桌面端会在存在 `title` 时使用它，否则使用 `input`，并应用明确指定的 `props`。Bun 辅助程序还会对 `input` 运行 `parseQuickAdd`。

---

## 示例

**列出下一步行动：**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**使用明确指定的 props 创建任务：**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**完成任务：**

```bash
curl -s -X POST "http://127.0.0.1:4317/tasks/$TASK_ID/complete" | jq .
```

---

## CLI 工具

还可以使用一个更简单的命令行界面：

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

### CLI 参考

| 命令         | 示例                                              | 说明                              |
| ------------ | ------------------------------------------------- | --------------------------------- |
| `add`        | `mindwtr:cli -- add "Call mom @phone"`           | 使用快速添加解析                  |
| `list`       | `mindwtr:cli -- list --status next`               | 支持 `--all`、`--deleted`、`--query` |
| `get`        | `mindwtr:cli -- get <taskId>`                     | 输出完整任务 JSON                 |
| `update`     | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | 应用 JSON patch               |
| `search`     | `mindwtr:cli -- search "@work due:<=7d"`         | 搜索任务/项目                     |
| `complete`   | `mindwtr:cli -- complete <taskId>`                | 将任务标记为已完成                |
| `archive`    | `mindwtr:cli -- archive <taskId>`                 | 将任务标记为已归档                |
| `delete`     | `mindwtr:cli -- delete <taskId>`                  | 软删除任务                        |
| `restore`    | `mindwtr:cli -- restore <taskId>`                 | 恢复已删除任务                    |
| `projects`   | `mindwtr:cli -- projects`                         | 列出现存项目                      |

---

## 安全说明

- 服务器适合在 `127.0.0.1`（localhost）上运行。除非你了解相关风险，否则不要将其公开。
- 桌面端 API 访问需要“设置”中生成的 bearer token。请妥善保管该令牌。
- 如果需要远程访问 Bun 辅助程序，请设置 `MINDWTR_API_TOKEN`，并将服务器置于经过认证的反向代理之后。

---

## 另请参阅

- [开发者指南](/zh-Hans/developers/developer-guide)
- [Cloud API](/zh-Hans/developers/cloud-api)
