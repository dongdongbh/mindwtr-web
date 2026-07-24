# 从其他应用导入数据

本指南介绍如何把任务从其他任务管理器迁移到 Mindwtr，适用于完整迁移，而非临时快速记录。

## 导入之前

迁移正是丢下旧杂物的好机会。如果原应用中有几百项过期任务，可以考虑只迁移当前项目、活跃的下一步行动和仍可信的参考资料。

Mindwtr 可以从受支持的应用导入完整导出，但相比把所有旧任务复制进新系统，小而有意的迁移通常更符合 GTD。

## 可用导入器

对于导出格式足够结构化、能够安全映射的少量应用，Mindwtr 提供一等导入器：

- [从 TickTick 导入](/zh-Hans/import/ticktick) - TickTick 的 CSV 或 ZIP 备份
- [从 Todoist 导入](/zh-Hans/import/todoist) - CSV 导出或 ZIP 备份
- [从 DGT GTD 导入](/zh-Hans/import/dgt-gtd) - JSON 导出或 ZIP 备份
- [从 OmniFocus 导入](/zh-Hans/import/omnifocus) - CSV、JSON 或 ZIP 导出
- [从 Apple 提醒事项导入](/zh-Hans/data-sync/#apple-提醒事项导入-ios) - 仅限 iOS，从所选提醒事项列表导入未完成事项

打开**设置 -> 数据**并选择相应的导入操作。Mindwtr 会在添加任何内容前显示预览。

如果旧应用在列表中，原生导入器是最佳路径。相比纯文本，它们能保留更多结构，并处理文件夹、清单、标签、日期、检查清单和重复规则等应用专属细节（前提是源导出提供这些内容）。

## 导入保真度概览

以下范围于 2026 年 7 月 21 日根据 Mindwtr 提交 [18b11a6](https://github.com/dongdongbh/Mindwtr/commit/18b11a6814fbde064df627fcaf63143c4279bd5b) 的导入代码核对。导入测试数据涵盖 Todoist CSV 和 ZIP、TickTick 7.1 CSV 和 ZIP、DGT 第 3 版模式的 JSON 和 ZIP，以及 OmniFocus CSV、UTF-16 CSV、JSON 和 ZIP。导出格式可能变化，请在确认前查看预览和对应应用指南。

| 来源 | 最佳输入 | Mindwtr 会保留 | 导入后检查 |
| --- | --- | --- | --- |
| [TickTick](/zh-Hans/import/ticktick) | CSV 或 ZIP 备份 | 文件夹转为领域、清单转为项目，以及标签、优先级、日期、检查清单、完成状态和受支持的重复规则 | 附件、显示细节、警告，以及父子任务映射 |
| [Todoist](/zh-Hans/import/todoist) | CSV 或 ZIP 备份 | 项目、分区、活跃任务、描述和评论、优先级、截止日期、标签，以及转为检查项的子任务 | 重复规则会连同原文只导入一次；还应检查跳过或损坏的行 |
| [DGT GTD](/zh-Hans/import/dgt-gtd) | JSON 或 ZIP 备份 | 文件夹转为领域，以及项目、情境、标签、检查清单、优先级、截止日期、完成状态和受支持的重复规则 | 不受支持的重复规则和被跳过的压缩包条目 |
| [OmniFocus](/zh-Hans/import/omnifocus) | Omni Automation JSON 或 ZIP 保真度最佳；也支持 CSV | 文件夹转为领域，以及项目、标签、情境、笔记、日期、完成状态、简单嵌套和受支持的重复规则 | 深层嵌套、计划日期和时长文本，以及 CSV 特有的损失 |
| [Apple 提醒事项](/zh-Hans/data-sync/#apple-提醒事项导入-ios) | iOS 上选定的列表 | 未完成提醒事项的标题和备注 | 日期和其他字段、跳过的条目，以及是否删除来源的选项 |

## 验证或回退

1. 保留原始导出，并在导入前新建一份 [Mindwtr 备份](/zh-Hans/data-sync/backup-restore)。
2. 检查预览中的数量和警告。如果项目或任务总数不对，请取消导入。
3. 导入后，将一个项目和几项有代表性的任务与来源进行比较。检查标题、项目或状态、日期、标签或情境、笔记、检查清单和重复规则。
4. 如果映射不正确，请从**设置 → 同步 → 恢复快照**恢复，调整源导出后重试。部分导入器重复导入同一个文件时可能产生重复任务。

## 其他迁移方式

如果应用不在列表中，请使用以下备用路径。它们有意比原生导入器简单，适用于能够导出纯文本、CSV 或 JSON 的众多其他应用。

### 复制与粘贴

最快的备用方式是复制任务列表，再粘贴到快速添加/快速记录中。

Mindwtr 根据空行判断整段文字是一项任务还是一批任务：

- 只要粘贴内容包含空行，Mindwtr 就会将整段内容保留为一项任务，并把所有非空行合并为一个标题。
- 如果没有空行，每个非空行会分别创建为一项任务。

桌面端：

1. 打开快速添加。
2. 将多行文字粘贴到任务字段。
3. 如果 Mindwtr 检测到多项任务，请确认**创建任务**。

移动端：

1. 打开快速记录。
2. 将多行文字粘贴到任务字段。
3. 点按保存；如果 Mindwtr 检测到多项任务，再确认批量创建。

批量创建时，每行都会按 Mindwtr 的快速添加语法解析，因此可以在行内包含元数据：

```text
Email Bob about Q3 report +Work @computer #followup /due:friday
Book dentist appointment @phone
Outline conference talk +Speaking #ideas /note:Draft the rough structure first
```

这种方式不会重建深层层级或重复规则，但通常最适合只迁移仍然重要的任务。

### 纯文本

如果旧应用能导出 `.txt` 文件，请从记录界面使用 Mindwtr 的文本导入。

桌面端：

1. 打开快速添加。
2. 点击**导入 .txt**。
3. 选择纯文本文件。
4. 确认批量创建提示。

移动端：

1. 打开快速记录。
2. 点按**更多**。
3. 点按**导入 .txt**。
4. 选择纯文本文件。
5. 确认批量创建提示。

每行只放一项任务。如果希望 Mindwtr 在导入时设置元数据，请在同一行加入快速添加标记：

```text
Pay water bill +Home /due:2026-07-01
Renew passport +Personal @errands #admin
Send slides to Ana +Work /note:Use the final deck from the shared folder
```

Mindwtr 使用 `/note:` 等明确的快速添加命令，而不是隐藏的制表符备注格式。这样导入前仍可直接阅读文本文件，并与正常记录共用同一个解析器。

### CSV 转快速添加文本脚本

对于能导出 CSV、但没有原生 Mindwtr 导入器的应用，可以先把 CSV 转换为纯文本快速添加文件，再导入该 `.txt` 文件。

Mindwtr 提供一个不含依赖的小型辅助脚本：

```bash
node scripts/migration/csv-to-quickadd-text.mjs export.csv \
  --output mindwtr-import.txt \
  --title "Title" \
  --project "Project" \
  --tags "Tags" \
  --contexts "Contexts" \
  --due "Due" \
  --note "Note"
```

脚本为每个 CSV 行写出一行快速添加文字，可以映射：

- 标题列到任务标题
- 项目/清单列到 `+Project`
- 以逗号或分号分隔的标签到 `#tag`
- 以逗号或分号分隔的情境到 `@context`
- 截止日期列到 `/due:...`
- 备注列到 `/note:...`

如果 CSV 使用其他列名，请通过上述选项传入。例如：

```bash
node scripts/migration/csv-to-quickadd-text.mjs tasks.csv \
  --output mindwtr-import.txt \
  --title "Task" \
  --project "List" \
  --tags "Categories" \
  --due "Due Date" \
  --note "Notes"
```

该脚本只是起点，并非受支持的应用专属导入器。除非自行改造，否则不会保留嵌套任务、附件、重复规则或应用专属字段。

### CLI、本地 API 与 MCP

技术用户可以针对 Mindwtr 的自动化接口自行编写导入器：

- [本地 API](/zh-Hans/power-users/local-api)
- [MCP 服务器](/zh-Hans/power-users/mcp)
- 在仓库检出中运行 `bun run mindwtr:cli -- --help`

如果旧应用导出结构化 JSON 或 CSV，而你需要比纯文本更强的控制，请使用这条路径。这些工具都通过 Mindwtr 的正常数据模型工作，但自定义迁移脚本需自行维护。

## 如果应用不在列表中

请按以下顺序尝试：

1. 检查应用能否导出为 Mindwtr 已经支持的格式。
2. 对仍需保留的活跃任务尝试复制/粘贴或纯文本。
3. 如果应用导出简单电子表格，使用 CSV 辅助脚本。
4. 如果需要自定义结构化迁移，使用本地 API、CLI 或 MCP。

如果希望为特定应用增加原生导入器，请提交 GitHub Discussion 或 issue，并附上：

- 应用名称
- 它提供的导出格式
- 一份经过脱敏的小型导出示例
- 最需要保留的字段

原生导入器会根据需求量，以及源格式能否清晰映射到 Mindwtr 的 GTD 模型来确定优先级。
