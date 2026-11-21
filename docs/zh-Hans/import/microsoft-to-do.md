# 从 Microsoft To Do 导入

> 此导入功能将在 Mindwtr 桌面版 1.3.9 之后的下一个版本中推出。

Mindwtr 桌面版可以导入从 Windows 经典 Outlook 的**任务**文件夹导出的 CSV 文件。Microsoft To Do 中存储在 Exchange Online 的任务会同步到 Outlook 任务。 [Microsoft To Do 同步说明](https://support.microsoft.com/en-us/todo/syncing-your-microsoft-to-do-account)

## 将任务导出为 CSV

1. 打开 Windows 经典 Outlook，登录你在 Microsoft To Do 中使用的帐户。
2. 打开**文件 → 打开和导出 → 导入/导出**。
3. 选择**导出到文件**，再选择**逗号分隔值**。
4. 选择该帐户下的**任务**文件夹，确认其中包含你要迁移的任务。
5. 指定 CSV 文件的名称和保存位置，然后选择**完成**。 使用你想要的 Mindwtr 项目名称为 CSV 文件命名。为每个导出的 Outlook 文件夹使用不同的文件名。

如果你使用新版 Outlook，请打开经典 Outlook 完成这次导出。向导只能导出它所列文件夹中的任务。如果向导中缺少任务，请确认经典 Outlook 中已添加同一个帐户，并且任务出现在经典 Outlook 的任务视图中。 [切换 Outlook 版本](https://support.microsoft.com/en-us/outlook/getstarted/run-new-outlook-and-classic-outlook-side-by-side) · [Microsoft Q&A 的导出步骤](https://learn.microsoft.com/en-ca/answers/questions/5687598/how-can-i-export-my-microsoft-to-do-list-data-and)

Mindwtr 支持英文和简体中文列标题。如果导出文件使用其他语言，请把 Office 显示语言改为英语，再导出一次。如果 CSV 使用旧版 Windows 编码，请用电子表格应用打开，并另存为 CSV UTF-8 文件。 [更改 Office 显示语言](https://support.microsoft.com/en-us/office/languages/change-the-language-office-uses-in-its-menus-and-proofing-tools)

## 查看预览并导入

1. 在 Mindwtr 桌面版中，打开**设置 → 数据 → 导入数据 → 从 Microsoft To Do 导入**。
2. 选择 Outlook 导出的任务 CSV 文件。
3. 检查预览中的任务数量和警告，然后确认导入。

导入后，抽查几项任务并与原任务对照。如果结果有误，请在结果提示中选择**撤销**。 [备份与恢复](/zh-Hans/data-sync/backup-restore)

## 哪些数据会导入 Mindwtr

如果 Outlook 导出了相应数据，Mindwtr 会导入任务标题、备注、优先级、状态、开始日期、截止日期和完成日期，并将类别转为标签。请查看预览中是否有无法识别的日期。保留原始列表，以便查阅重复规则、提醒、附件和列表结构。

如果已完成的任务缺少完成日期，或 Mindwtr 无法识别该日期，Mindwtr 会将导入时刻记为完成时间。导入前，请将 CSV 文件中的日期转换为 `YYYY-MM-DD` 格式，以保留原日期并避免混淆月份和日期。

每份 CSV 文件都会导入到以该文件命名的项目中。导入会创建一份独立的副本。使用相同文件名重新导入时，Mindwtr 会跳过已导入且内容未变的任务。更改文件名或任务内容可能产生重复项。
