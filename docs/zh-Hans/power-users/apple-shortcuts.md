# Apple 快捷指令

Mindwtr 通过 iPhone 和 iPad 上的原生 App Intents 支持 Apple 快捷指令，聚焦 GTD 记录循环：快速把未闭合事项放入 Mindwtr，再在应用内回顾和处理。第 2 版新增了带日期的静默记录、把任务读入快捷指令，以及 Spotlight 搜索。

这套功能有意小于 Things 已成熟的快捷指令系统。Mindwtr 会谨慎地扩充操作集，确保可靠，并且绝不绕过 Mindwtr 的常规任务创建、修订和同步路径。

## 可用范围

包含 Mindwtr 的 App Intents 集成的 iOS 构建可使用 Apple 快捷指令。

支持的界面：

| 界面 | 是否支持 |
| --- | --- |
| 快捷指令应用 | 是 |
| Siri | 是 |
| Spotlight / 建议的快捷指令 | 是 |
| 通过操作按钮运行快捷指令 | 是 |
| Apple Watch 直接操作 | 通过快捷指令和自托管的记录 webhook 实现；没有原生手表操作 |
| CarPlay | 否，v1 不支持 |

## 操作

### 记录到 Mindwtr

使用 **记录到 Mindwtr** 把任务发送到 Mindwtr 的收集箱记录确认流程。

参数：

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| 任务 | 是 | 任务标题。空标题会被拒绝。 |
| 备注 | 否 | 添加为任务描述。 |
| 标签 | 否 | 逗号分隔的标签。Mindwtr 保存时会规范化为 `#tag`。 |
| 项目 | 否 | 按标题匹配活跃项目；保存记录时也可创建项目。 |

运行时会：

1. 快捷指令打开 Mindwtr。
2. Mindwtr 显示记录界面，并填入标题和可选元数据。
3. 你检查记录，再通过 Mindwtr 的常规流程保存。

Swift 不会直接写入任务，因此任务创建始终通过 Mindwtr 现有的存储、SQLite、修订和同步逻辑。

### 打开 Mindwtr 清单

使用**打开 Mindwtr 清单**跳到 GTD 视图。

支持的目标：

| 清单 | 打开位置 |
| --- | --- |
| 收集箱 | 收集箱 |
| 专注 | 专注/下一步行动 |
| 等待 | 等待中 |
| 将来 | 将来/也许 |
| 项目 | 项目 |
| 回顾 | 回顾 |
| 日历 | 日历 |

未配置清单时，快捷指令默认打开收集箱。

### 添加到 Mindwtr

使用**添加到 Mindwtr**（第 2 版之前叫**添加到 Mindwtr 收集箱**）可在不打开 Mindwtr 的情况下静默创建任务。这项操作适合用于快捷指令自动化。时间、日历或位置触发器无需有人操作手机即可添加任务。

参数：

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| 任务 | 是 | 任务标题。空标题会让快捷指令失败。 |
| 备注 | 否 | 添加为任务描述。 |
| 标签 | 否 | 逗号分隔的标签。Mindwtr 会规范化为 `#tag`。 |
| 项目 | 否 | 按标题匹配活跃项目。未知或已归档项目会被忽略，任务仍会进入收集箱。 |
| 截止日期 | 否 | 任务的截止日期。只存日期、不含时间，因此本身绝不会安排提醒。 |
| 开始日期 | 否 | 任务的开始日期，与截止日期一样只含日期。 |

**任务**文本支持完整的[快速添加语法](/zh-Hans/use/mobile#快速添加语法)（`/due:`、`@context`、`#tag`、`+Project` 等）。创建任务时会像应用内捕捉框一样解析这些语法；**整理快速添加文本**设置决定是否从标题中移除识别到的语法。

运行时会：

1. 操作在设备上将记录加入队列并立即结束。Mindwtr 保持在后台。
2. 下次打开 Mindwtr（或返回前台）时，排队的任务会通过常规存储与同步路径创建到收集箱。

由于任务在下次打开应用时才创建，因此在这台 iPhone 或 iPad 上再次运行 Mindwtr 之前，它不会出现在其他已同步设备上，也不会触发提醒。**项目**参数绝不会创建新项目；不过在任务文本中写入 `+Project` 会遵循快速添加规则，可以创建新项目。

### 获取 Mindwtr 任务

使用**获取 Mindwtr 任务**可在不打开应用的情况下把任务读入快捷指令，再接入其他操作（朗读、显示菜单、发送到别处）。

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| 清单 | 是 | 收集箱、专注、下一步行动、等待、将来之一。 |
| 项目 | 否 | 按标题匹配的活跃项目。设置后优先于清单。 |

结果来自 Mindwtr 运行期间维护的快照，每个清单或项目最多 50 条任务，因此反映的是应用最后一次打开时的状态——与小组件的时效性相同。

### Spotlight 中的任务

在 iOS 18 及更高版本上，Mindwtr 任务会出现在 Spotlight 搜索中。打开其中一条会跳到该任务在 Mindwtr 中所属的清单。索引会在应用运行时刷新，和获取 Mindwtr 任务一样。

### 示例：日历触发的任务

1. 在**快捷指令**应用中打开**自动化**并新建自动化。
2. 选择触发器，例如标题包含“garbage collection”的日历事件。
3. 添加 Mindwtr 的**添加到 Mindwtr**操作，将**任务**设为“Take out the trash”。
4. 将自动化设为**立即运行**，无需确认。

## 快捷指令示例

### 通过语音记录

1. 打开 Apple 的**快捷指令**应用。
2. 新建快捷指令。
3. 添加**听写文本**或**询问输入**。
4. 添加 Mindwtr 的 **记录到 Mindwtr** 操作。
5. 把听写文本传入**任务**。
6. 可将**标签**设为 `phone,errands` 等内容。

这适合在步行、通勤或切换应用时快速记录。Siri 语音识别在某些环境中仍可能听错，请在保存前检查记录。

### 从 Apple Watch 记录

Mindwtr 没有手表应用，但在手表上运行的快捷指令可以直接把文本发送到你自己的服务器，这样不用掏出手机也能记录。这条路径需要[自托管的记录 webhook](/zh-Hans/power-users/capture-webhook)。

1. 在 iPhone 上打开 Apple 的**快捷指令**应用，新建一个快捷指令，命名为“Capture to Mindwtr”。
2. 添加**听写文本**。
3. 添加**获取 URL 内容**，把 URL 设为 `https://your-server.example/v1/capture`，并用你自己的服务器地址替换示例地址。
4. 把**方法**设为 **POST**。
5. 添加一个名为 `Authorization` 的请求头，值为 `Bearer <token>`，使用你服务器的其中一个令牌。
6. 把**请求体**设为**文本**，并传入听写文本。若要改发 JSON，请使用一个 `transcription` 字段存放听写文本，再加一个值为 Apple Watch 的 `client` 字段。
7. 打开快捷指令的详细信息，开启**在 Apple Watch 上显示**。
8. 在手表上通过**快捷指令**应用、表盘复杂功能或智能叠放运行它。同一个快捷指令也可在 iPhone 上通过 Siri 或操作按钮运行。
9. 听写文本会成为收集箱中的一个任务，并在下次同步时到达你的其他设备。

### 通过操作按钮打开专注

1. 使用**打开 Mindwtr 清单**创建快捷指令。
2. 将**清单**设为**专注**。
3. 在 iOS 设置中把该快捷指令分配给操作按钮。

## URL scheme 备用方案

Mindwtr 还支持 URL scheme 自动化。其他自动化工具无法发现原生 App Intents 时可使用。

| URL | 操作 |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | 打开记录并填入标题 |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | 打开记录并填入标题和备注 |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | 打开记录并填入项目和标签 |
| `mindwtr://open-feature?feature=focus` | 打开专注 |
| `mindwtr://open-feature?feature=review` | 打开回顾 |

支持的记录别名：

| 字段 | 别名 |
| --- | --- |
| 标题 | `title`、`text`、`name`、`thingName`、`itemListElementName`、`itemListName` |
| 备注 | `note`、`description`、`body`、`thingDescription`、`itemListDescription` |

## 目前的限制

Mindwtr 的快捷指令支持暂不包含：

- 编辑、完成、复制、删除或批量操作。
- 从快捷指令设置重复任务或提醒（截止日期和开始日期只含日期）。
- 原生 Apple Watch 应用，以及 CarPlay。

记录之外的写入操作是接下来的计划，将基于第 2 版引入的任务实体构建；它们需要谨慎设计，因为编辑和后台写入必须保持 Mindwtr 的本地优先同步与 GTD 工作流程规则。

## 相关链接

- [移动端用户指南](/zh-Hans/use/mobile)
- [Mindwtr 中的 GTD 工作流](/zh-Hans/use/gtd-workflow)
- [数据与同步](/zh-Hans/data-sync/)
- [Things：使用 Apple 快捷指令](https://culturedcode.com/things/support/articles/2955145/)
- [Things：快捷指令操作](https://culturedcode.com/things/support/articles/9596775/)
- [Apple：App Intents 概览](https://developer.apple.com/videos/play/wwdc2024/10210/)
