# 从 OmniFocus 导入

Mindwtr 可以导入 OmniFocus 导出文件，让你无需手动重建整个系统即可迁移。

## 支持的源文件

- OmniFocus **CSV** 导出
- OmniFocus **CSV UTF-16** 导出
- 包含 `OmniFocus.json` 和 `metadata.json` 的 Omni Automation / Shortcuts **ZIP** 归档
- 如果你的快捷指令已把任务数据和元数据合并为一个文档，也可使用单个 **JSON** 文件

桌面端和移动端均可从**设置 → 数据 → 从 OmniFocus 导入**执行导入。

## 推荐的源格式

如果只需迁移基本任务，OmniFocus CSV 仍然可用。

若希望最大程度保真，请优先使用 Omni Automation JSON 导出。相比 OmniFocus CSV，JSON 路径能够保留重复规则、文件夹元数据和更多层级细节。

对于基于快捷指令的导出，最佳输入是包含以下文件的 ZIP：

- `OmniFocus.json`
- `metadata.json`

Mindwtr 可以从同一个导入操作中自动识别 CSV、JSON 和 ZIP 文件。

## Mindwtr 如何映射 OmniFocus 数据

Mindwtr 以 GTD 优先的方式将 OmniFocus 导出映射到自身模型：

- 有元数据时，OmniFocus 文件夹成为 **Mindwtr 中的领域**
- OmniFocus 项目成为 **Mindwtr 中的项目**
- OmniFocus 独立行动保留在项目外，供你之后处理
- OmniFocus 标签成为 **Mindwtr 中的标签**
- 源格式包含情境时，OmniFocus 情境成为 **Mindwtr 中的情境**
- OmniFocus 备注保留在导入后的描述中
- OmniFocus 推迟日期成为**开始日期**
- 支持的截止日期和完成状态会予以保留
- OmniFocus 旗标成为**高优先级提示**
- 简单的单层嵌套任务可成为**检查清单项目**
- 更丰富或更深的嵌套任务会展开为普通任务，并在标题和描述中保留原始层级
- 支持时，Omni Automation 重复规则会映射为 **Mindwtr 中的重复规则**

Mindwtr 目前没有独立的 OmniFocus 式计划日期字段。当 OmniFocus 包含计划日期或时长文字时，Mindwtr 会把这些信息保存在导入后的描述中，而不是丢弃。

## 支持的 OmniFocus 数据

- 有元数据时的文件夹名称
- 项目名称
- 行动标题
- 备注
- 标签
- 导出中包含的情境
- 推迟/开始日期
- 截止日期
- 可用时的完成状态和完成日期
- 作为高优先级提示的旗标状态
- Omni Automation JSON 导出中受支持的重复规则
- 简单嵌套任务的检查清单转换

## 导入步骤

1. 打开**从 OmniFocus 导入**
2. 从 OmniFocus 导出数据：
   - 只需要内置导出时使用 **CSV**
   - 需要重复规则、文件夹和更准确的层级时使用 **Omni Automation / Shortcuts JSON**
3. 如果快捷指令分别生成 `OmniFocus.json` 和 `metadata.json`，请把两个文件放入同一个 ZIP 归档
4. 在 Mindwtr 中选择 CSV、JSON 或 ZIP 文件
5. 检查预览摘要
6. 确认导入

Mindwtr 会在导入前保存恢复快照，以便需要时回滚。

## 当前限制

- 不直接导入 OmniFocus 原生 `.ofocus` 数据库
- 不导入 HTML 和纯文本导出
- 相比 Omni Automation JSON 导出，CSV 导出仍会损失信息，尤其是重复规则和嵌套层级
- 计划日期和时长值作为描述文字保留，不映射到专用字段
- 自身带有日期、备注、标签或重复规则的嵌套任务会展开，而不会转换为检查清单项目
- 如果只导入 `OmniFocus.json` 而没有匹配的元数据，部分标签、文件夹或项目元数据可能缺失

## 提示

- 如果想先验证映射，可从较小的 OmniFocus 导出开始
- 使用快捷指令导出时，请把 `OmniFocus.json` 和 `metadata.json` 一起放在同一个 ZIP 中，以获得最完整的导入结果
- 如果同时有项目行动和独立收集箱行动，Mindwtr 会保留这种区分
- 如果重复规则很重要，请优先使用 Omni Automation JSON / ZIP 路径，而不是 CSV
- 如果经常使用 OmniFocus 旗标，请检查导入后的高优先级任务
- 验证导入结果前请保留恢复快照
