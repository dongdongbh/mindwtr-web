# Obsidian 集成

如水可以在桌面端从 Obsidian 库导入任务，随文件变化持续刷新，在 Obsidian 中重新打开源笔记，并针对受支持的任务格式执行范围严格受限的回写。

相关：[Markdown 链接](/zh-Hans/use/markdown-links)

## 当前范围

桌面端 Obsidian 支持目前包括：

- 仅限桌面端
- 自动监视文件并进行增量刷新
- 手动重新扫描作为回退方案
- 通过 `obsidian://` 深层链接返回源笔记
- 对受支持的任务格式进行有限回写
- 支持标准行内 Markdown 任务
- 支持如水内部的 Markdown 任务/项目引用
- 支持 TaskNotes 文件

不在范围内：

- 移动端库访问
- 将 Obsidian 视为如水同步后端
- 大范围重写或重组笔记
- 将 Dataview 作为核心任务格式
- 完整的 Obsidian 插件

## 设计理念

Obsidian 集成是基于文件的外部集成，而不是新的如水同步后端。

如水的同步引擎围绕 `data.json` 构建，而 Obsidian 以笔记为基础。为了避免破坏性冲突和意外编辑，如水会直接读取库文件，并有意严格限制写入权限。

## 设置

在桌面端：

1. 打开**设置 -> 集成**
2. 找到 **Obsidian 库**
3. 选择你的库文件夹。系统会检测已在 Obsidian 中注册的库并提供一键选择；对于其他位置，仍可手动浏览
4. 启用集成
5. 可以选择将扫描限制在特定文件夹
6. 可以设置行内任务的收集箱文件，默认为 `Mindwtr/Inbox.md`
7. 可以选择是否包含已归档的 TaskNotes 文件
8. 可以选择新任务格式：`auto`、`inline` 或 `tasknotes`
9. 保存并运行一次**重新扫描库**

初次扫描后，如水会监视库并自动刷新已更改的文件。如果监视器漏掉事件或同步文件夹更新缓慢，手动重新扫描按钮仍可用作恢复路径。

如果所选文件夹不包含 `.obsidian/` 目录，如水会显示警告，但仍允许你保存该路径。

## 支持的任务格式

### 行内 Markdown 任务

如果扫描范围不包含 TaskNotes 文件，如水会导入标准 Markdown 复选框：

```md
- [ ] Incomplete task
- [x] Completed task
```

如水会保留：

- 嵌套任务缩进
- `#work` 或 `#project/alpha` 等行内标签
- `[[Meeting Notes]]` 等 wiki 链接
- 笔记级 YAML frontmatter 标签

导入的行内任务会显示：

- 任务文本
- 完成状态
- 源笔记路径 + 行号
- **在 Obsidian 中打开**操作

### TaskNotes

如水还支持 [TaskNotes](https://tasknotes.dev/)，后者使用 YAML frontmatter 将每个任务存储为单独的 Markdown 文件。

示例：

```md
---
tags:
  - task
title: Review quarterly report
status: in-progress
priority: high
due: 2025-01-15
scheduled: 2025-01-14
contexts:
  - "@office"
projects:
  - "[[Q1 Planning]]"
timeEstimate: 120
---
## Notes
Key points to review
```

在扫描范围内检测到 TaskNotes 文件时，如水会将 TaskNotes 视为导入的 Obsidian 任务的事实来源，并且**不会**再从其他笔记导入零散的行内清单。这可以避免将普通清单变成 TaskNotes 用户的任务。

如水目前会导入以下 TaskNotes 字段：

- 标题
- 状态/完成状态
- 优先级
- 到期日期和安排日期
- 标签
- 情境
- 项目
- 预计时间
- 简短的正文预览

如水会跳过 TaskNotes 视图/配置文件；除非你在设置中启用，否则默认隐藏已归档的 TaskNotes 文件。

## 文件监视和刷新

如水会在桌面端监视配置的库，并仅重新解析已更改的 Markdown 文件，而不是每次都重新扫描整个库。

这意味着：

- 在 Obsidian 中所做的编辑会自动显示在如水中
- 删除源文件会移除其中导入的任务
- 重命名文件的行为类似于删除 + 创建
- 快速保存会先批量汇集，再进行刷新

如果更改跨越行内任务与 TaskNotes 的边界，如水会回退到完整重新扫描，以保持导入模式一致。

## 回写行为

回写会受到有意设置的严格限制。

### 行内任务

在如水中切换导入的 Obsidian 行内任务时，如水只会更新该任务行上的复选框标记：

- `- [ ]` -> `- [x]`
- `- [x]` -> `- [ ]`

如水不会重写笔记的其余部分。如果存储的行号已过期，它会回退到在文件中匹配任务文本。存在歧义的匹配会安全失败。

### TaskNotes 任务

在如水中切换导入的 TaskNotes 任务时，如水会更新 frontmatter 状态，而不是编辑笔记正文。作为同一次安全写入的一部分，它还可能添加或移除 `completedDate`。

如水不会重新格式化整个文件，也不会重写无关字段。

### 创建新任务

可以通过两种方式创建新的 Obsidian 任务：

- `inline`：向配置的收集箱笔记追加新的 `- [ ] ...` 行
- `tasknotes`：创建新的 TaskNotes Markdown 文件
- `auto`：遵循检测到的库导入模式

这使创建行为与已在使用的格式保持一致。

## 会跳过的内容

如水会跳过：

- `.obsidian/`
- `.trash/`
- 隐藏的文件/文件夹
- `node_modules/`
- 异常大的 Markdown 文件
- TaskNotes 视图/配置文件

## 深层链接

如水使用 Obsidian 的 URI 方案打开源笔记：

```text
obsidian://open?vault=VAULT_NAME&file=RELATIVE_PATH_WITHOUT_MD
```

这样无需手动复制文件路径，即可在 Obsidian 中查看上下文。

## 当前限制

- 仅限桌面端
- 尚未解析 `[due:: ...]` 等 Dataview 风格的行内字段
- 基于监视器的刷新仍保留手动重新扫描作为回退方案
- 如果存在 TaskNotes 文件，如水会有意禁止在该扫描范围内导入通用行内清单

## 计划的后续工作

- 可选的 Dataview 兼容性
- 移动端可行性工作
- 可能在单独的仓库中开发 Obsidian 插件

## 另请参阅

- [数据与同步](/zh-Hans/data-sync/)
- [日历集成](/zh-Hans/use/calendar-integration)
