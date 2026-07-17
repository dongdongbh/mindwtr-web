# Cloud API

Mindwtr Cloud 提供一套小型 bearer-token API，用于同步、任务自动化和附件传输。它面向自托管部署，并与自托管云端后端使用相同的令牌命名空间。

## 认证

每个 `/v1/*` 请求都需发送 bearer token：

```http
Authorization: Bearer <token>
```

生产环境请使用 `MINDWTR_CLOUD_AUTH_TOKENS` 或 `MINDWTR_CLOUD_AUTH_TOKENS_FILE`。`MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` 仅用于受控自动化，并通过 `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` 限制新命名空间数量。

## 健康检查

```text
GET /health
```

无需认证即可返回服务器健康状态。

## 快照同步

```text
GET /v1/data
PUT /v1/data
```

`GET /v1/data` 返回已认证命名空间的快照。如果命名空间不存在且允许写入，服务器会创建空快照。

`PUT /v1/data` 会验证上传的 `AppData`，使用核心同步算法与现有命名空间合并，验证合并结果后再写回。它不是强制覆盖。成功响应返回 `{ ok: true, stats, clockSkewWarning }`，其中 `stats` 与本地同步诊断使用相同的合并统计结构。

## 任务

```text
GET /v1/tasks
POST /v1/tasks
GET /v1/tasks/:id
PATCH /v1/tasks/:id
DELETE /v1/tasks/:id
POST /v1/tasks/:id/complete
POST /v1/tasks/:id/archive
```

列表查询参数：

| 参数 | 用途 |
| --- | --- |
| `query` | 在任务标题和元数据中进行不区分大小写的文本搜索。 |
| `status` | 一种任务状态：`inbox`、`next`、`waiting`、`someday`、`reference`、`done` 或 `archived`。 |
| `all=1` | 包含已完成任务。 |
| `deleted=1` | 包含软删除任务。 |
| `limit`、`offset` | 页面大小与起始偏移。 |

创建操作接受 `title` 或快速添加 `input`，以及可选的 `props`。Patch 接受云端验证层支持的任务字段，并推进同步修订元数据。

## 项目、领域与分区

```text
GET /v1/projects
POST /v1/projects
GET /v1/projects/:id
PATCH /v1/projects/:id
DELETE /v1/projects/:id

GET /v1/areas
POST /v1/areas
GET /v1/areas/:id
PATCH /v1/areas/:id
DELETE /v1/areas/:id

GET /v1/sections
POST /v1/sections
GET /v1/sections/:id
PATCH /v1/sections/:id
DELETE /v1/sections/:id
```

所有列表端点都接受 `limit`、`offset` 和 `deleted=1`。分区还接受 `projectId`。

引用字段必须指向现存记录。项目的 `areaId` 必须引用现存领域。使用 `areaId: null` 清除项目领域；`areaId: ""` 无效。分区的 `projectId` 必须引用现存项目。

删除领域、项目和分区时会使用删除标记与服务器端修复，确保快照对同步仍然有效。

## 搜索

```text
GET /v1/search?query=<text>
```

搜索在不同数组中返回现存任务和项目。它支持共享的 `limit` 与 `offset` 参数，以及独立游标：

| 参数 | 用途 |
| --- | --- |
| `taskLimit`、`taskOffset` | 对任务结果集分页。 |
| `projectLimit`、`projectOffset` | 对项目结果集分页。 |

响应包含 `taskTotal`、`projectTotal` 和实际游标值。

## 附件

```text
GET /v1/attachments/:path
PUT /v1/attachments/:path
DELETE /v1/attachments/:path

POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

附件路径会在已认证令牌命名空间内解析。上传受已配置字节上限和核心附件验证规则约束。

失去关联文件清理端点会扫描命名空间，查找不再被 `data.json` 引用的文件。它会跳过最近五分钟内修改的文件，避免在上传与稍后快照写入竞争时误删。

## MCP 适配器

已发布的 `mindwtr-mcp` 辅助程序可将自托管 Cloud 端点用作后端。通过 `--cloud-url` 和 `--cloud-token`，或 `MINDWTR_MCP_CLOUD_URL` / `MINDWTR_MCP_CLOUD_TOKEN` 环境变量配置。

Cloud 后端 MCP 模式读取 `/v1/data`，并提供任务、项目、分区、领域和人员的读取工具。使用 `--write` 后，任务、项目、分区和领域更改会经过上述逐资源 REST 端点；默认保持只读，也不会把 Mindwtr Cloud 本身变成托管 MCP 服务。

## 相关页面

- [MCP 服务器](/zh-Hans/power-users/mcp)
- [云端部署](/zh-Hans/data-sync/cloud-deployment)
- [同步算法](/zh-Hans/data-sync/sync-algorithm)
