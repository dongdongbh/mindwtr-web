# 数据库结构

Mindwtr 有意保持本地数据模型小巧且便于同步。桌面应用使用 SQLite 作为主要存储；在 SQLite 可用的移动端上，也使用相同的核心结构。

SQLite 结构的事实来源位于：

- `packages/core/src/sqlite-schema.ts`
- `packages/core/src/sqlite-adapter.ts`

本页为贡献者提供该结构的实用导览。

---

## 核心表

### `tasks`

主要任务记录，包括 GTD 状态、日程安排字段、清单数据、附件、顺序和同步元数据。

值得注意的列：

- `status`：GTD 分区（`inbox`、`next`、`waiting`、`someday`、`reference`、`done`、`archived`）
- `projectId`、`sectionId`、`areaId`：父级关系
- `dueDate`、`startTime`、`reviewAt`、`completedAt`：基于时间的工作流字段
- `relativeStartOffset`：以 JSON 存储的提前时间规则，会重新计算 `startTime`，其依据是 `dueDate`
- `repeatReminderMinutes`：到期时间重复提醒间隔，仅限支持的预设分钟值
- `location`：用于搜索、由日历创建的任务以及推送到日历的事件的实体/地点信息
- `checklist`、`attachments`、`tags`、`contexts`、`recurrence`：以 JSON 存储的字段
- `showFutureRecurrence`：以整数存储的布尔标记；在日历中启用一个仅供规划的下次发生预览
- `deletedAt`、`purgedAt`：同步使用的删除标记字段
- `rev`、`revBy`、`updatedAt`：合并/冲突元数据

### `projects`

项目容器及其规划元数据。

值得注意的列：

- `status`：`active`、`someday`、`waiting`、`archived`
- `areaId`：可选的父级领域
- `orderNum`：项目在领域内的顺序
- `tagIds`、`attachments`：以 JSON 存储的字段
- `supportNotes`、`reviewAt`：规划/回顾字段
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步元数据

### `sections`

项目内用于任务分组的分区。

值得注意的列：

- `projectId`：所属项目
- `orderNum`：分区在项目内的顺序
- `isCollapsed`：持久保存的 UI 状态
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步元数据

### `areas`

更高层级的 GTD 关注领域。

值得注意的列：

- `name`、`color`、`icon`
- `orderNum`：手动顺序
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步元数据

### `people`

为委派工作/以人员为中心的工作管理的受托人。

值得注意的列：

- `name`：任务受托人建议和 `assigned:` 搜索所使用的显示名称
- `note`、`referenceLink`：可选的人员备注和参考 URL
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步元数据

### `settings`

用于应用设置的单行 JSON 存储。

- `id = 1`
- `data`：序列化的设置对象

### `saved_filters`

专注视图使用的已保存专注筛选器定义。

值得注意的列：

- `name`、`icon`、`view`：显示元数据
- `criteria`：序列化的筛选条件
- `sortBy`、`sortOrder`：可选的已保存顺序
- `createdAt`、`updatedAt`：本地元数据

### `calendar_sync`

设备日历推送同步映射表。

值得注意的列：

- `task_id`：Mindwtr 中的任务 ID
- `calendar_event_id`、`calendar_id`：原生日历标识符
- `platform`：映射的平台命名空间
- `last_synced_at`：上次成功推送的时间戳

### `schema_migrations`

跟踪已应用的结构版本，以支持增量迁移。

---

## 全文搜索表

SQLite FTS5 为桌面端/移动端的本地搜索提供支持。

### `tasks_fts`

建立索引的任务搜索字段：

- `title`
- `description`
- `tags`
- `contexts`
- `location`

### `projects_fts`

建立索引的项目搜索字段：

- `title`
- `supportNotes`
- `tagIds`
- `areaTitle`

FTS 表由 `packages/core/src/sqlite-schema.ts` 中的触发器维护。

---

## 索引

该结构为常用 UI 和同步路径包含了有针对性的索引：

- 任务状态和删除筛选器
- 任务日期查询（`dueDate`、`startTime`、`reviewAt`、`completedAt`）
- 任务分组查询（`projectId`、`areaId`、`sectionId`）
- 项目状态和领域顺序查询

当前索引定义位于 `SQLITE_INDEX_SCHEMA` 中，该常量在 `packages/core/src/sqlite-schema.ts` 内。

---

## 验证规则

SQLite 触发器会在写入时拒绝无效的枚举值和格式错误的 JSON。

当前验证检查包括：

- 有效的任务/项目状态值
- 任务标签、情境、清单、附件、重复规则的 JSON 有效性
- 项目标签 ID 和附件的 JSON 有效性

这使磁盘上的数据库与 TypeScript 模型保持一致，并防止绕过存储层造成部分损坏。

---

## 同步语义

Mindwtr 的核心实体**不**依赖级联关系删除。数据模型使用软删除标记，使删除操作可以在设备之间安全同步。

另请参阅：

- [架构](/zh-Hans/developers/architecture)
- [数据与同步](/zh-Hans/data-sync/)
- [同步算法](/zh-Hans/data-sync/sync-algorithm)
- `docs/adr/0001-sqlite-constraints.md`

---

## 贡献者说明

- 优先采用增量结构更改，而不是破坏性重写。
- 添加字段时，应同时更新结构和适配器映射逻辑。
- 如果新字段会影响搜索，请有意识地更新 FTS 表/触发器。
- 更改约束或删除行为时，应先检查其对同步/删除标记的影响。
