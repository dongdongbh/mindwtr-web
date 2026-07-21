# 日历集成（硬景观 + 软景观）

Mindwtr 支持两个方向的日历集成：将外部日历读入规划界面，以及在平台提供可写设备日历时，将 Mindwtr 中的任务推送到其中。

- **移动端（iOS/Android）：**系统已提供的设备日历、ICS 订阅 URL，以及从 Mindwtr 到设备日历的单向推送
- **桌面端（macOS）：**通过 EventKit 读取 Apple Calendar 并单向推送任务，另支持 ICS 订阅 URL
- **桌面端（Linux）：**通过 Evolution Data Server 读取系统日历并单向推送任务，另支持 ICS 订阅 URL
- **桌面端（Windows）和 Web：**ICS 订阅 URL

## 概念

- **硬景观（Hard Landscape）**：外部日历中的会议/课程。
- **软景观（Soft Landscape）**：Mindwtr 中设置了 `startTime` 和 `timeEstimate` 的任务。
- 日历是一个**规划界面**，用于安排现有任务；如果在日历情境中操作最快，也可以直接创建已排期任务。

## GTD 语义

- **`dueDate`** = 截止日期（硬性承诺）。
- **`startTime`** = 提醒/计划开始时间（软性承诺）。
- **`timeEstimate`** = 排期时建议的时长。

## 视图

- **日视图**：显示已排期任务、截止日期和外部事件的时间网格。
- **周视图**：用于浏览当前工作周的七日规划网格。
- **月视图**：通过标记概览截止日期、已排期任务和事件。
- **日程视图**：未来 60 天的滚动列表，显示即将到来的截止日期、已排期任务和外部事件。

在桌面端，当前日历状态会反映在 URL 中：

- `calendarView`：`day`、`week`、`month` 或 `schedule`
- `calendarDate`：选择某一天时的所选日期
- `calendarMonth`：当前可见的日历月份

这样，你可以为特定的规划时间窗口添加书签或分享它，例如当前冲刺周期的周视图，或未来两个月的日程视图。

## Mindwtr 中的重复任务

Mindwtr 中的重复任务会生成为任务实例，而不是展开成日历系列：

- 当活跃任务实例有截止日期或计划开始时间时，日历会显示该实例。
- 默认情况下，Mindwtr 不会在日历中预先填充未来的任务实例。只有当前重复任务完成后，才会创建下一个真实任务实例。
- 如果为重复任务启用了**在日历中显示下一次**，日历可以显示下一次发生时间的一个仅供规划的预览。该预览不是真实任务；移动端/macOS 日历推送会将其写为普通的单次事件，而不是原生重复事件。
- **严格**会保持固定的计划节奏。每月 1 日到期的月度任务会继续锚定在该计划周期，但 Mindwtr 仍只会在每次完成时创建一个下一实例，而不会填满未来的每个月。
- **完成后重复**会根据你完成当前任务的时间计算下一实例。例如，一个普通的月度习惯在 15 日完成，下次就会从 15 日起安排。
- 移动端和 macOS 日历推送会镜像这些具体任务实例。它们不会把 Mindwtr 的重复规则导出为原生日历重复事件。

## 排期工作流程

在桌面端：

1. 选择日期或打开一个时间段。
2. 选择**新任务**以创建已排期任务，或选择**现有任务**以安排尚未排期的任务。
3. 设置开始和结束时间。Mindwtr 会对照已排期任务和可见的外部事件检查该时间段。
4. 保存任务，或稍后从任务编辑器、日视图或所选日期列表调整时间。

在宽屏桌面布局中，**规划下一步行动**会列出所选日期尚未排期的下一步行动，包括已到期但尚未排期的行动。使用它可以直接把下一步行动放入日历，而无需打开搜索。截止日期仍是最后期限；排期操作会添加 `startTime`。

当你希望日历网格占满整个宽度时，可以折叠规划面板。需要浏览所选日期可安排的工作时，再将其展开。

在移动端：

1. 从日视图打开**日历 -> 安排任务**。
2. 选择一个现有任务。
3. Mindwtr 会查找当天最早的空闲时间段，并避开可见的外部事件和已排期任务。

移动端排期面板的用法相同：当你已经在查看某一天时，用它选择尚未排期的工作，然后分配具体的开始时间。

如有 `timeEstimate`，Mindwtr 会将其用作默认时长。如果有冲突，请选择其他时间或缩短时长。

## 外部日历

### 支持矩阵

当前支持：

| 平台 | 支持的日历功能 | 说明 |
| --- | --- | --- |
| iOS/Android 移动端 | 将 Mindwtr 中的任务推送到设备日历 | Android 已通过 Google Calendar 验证。在 iOS 上，请使用 Apple Calendar/EventKit 已经可以访问的日历。 |
| iOS/Android 移动端 | 读取设备日历 | 授予权限后，读取设备日历数据库已经提供的日历。 |
| iOS/Android 移动端 | 直接使用 ICS 订阅 URL | URL 必须返回原始 iCalendar 数据。 |
| macOS 桌面端 | 读取 Apple Calendar 账户 | 授予权限后，通过 macOS EventKit 读取事件。这包括已同步到 Apple Calendar 的日历，例如 iCloud、Google 和 Exchange。 |
| macOS 桌面端 | 将 Mindwtr 中的任务推送到 Apple Calendar | 通过 EventKit 将 Mindwtr 中已排期或到期的任务写入选定的可写 Apple Calendar 目标。 |
| Linux 桌面端 | 读取系统日历账户 | 读取 Evolution Data Server 提供的已启用日历，包括在 Evolution 或 GNOME 在线账户中配置的账户。 |
| Linux 桌面端 | 将 Mindwtr 中的任务推送到系统日历 | 将 Mindwtr 中已排期或到期的任务写入选定的可写 Evolution Data Server 日历。 |
| 桌面端和 Web | 直接使用 ICS 订阅 URL | URL 必须返回原始 iCalendar 数据。 |

当前不支持：

- Windows 原生桌面日历账户。
- CalDAV 账户登录、服务器发现或 DAVx5 专用账户发现。
- 在 Mindwtr 中进行日历提供商 OAuth，例如从 Mindwtr 登录 Google、Microsoft 或 Nextcloud。
- 返回 `HTTP 401` 的需认证/私有 URL，除非日历提供商已将密钥嵌入 URL。
- 日历网页 URL，包括渲染 HTML 而非原始 `.ics` 数据的公开分享页面。
- 从 Mindwtr 编辑外部日历事件。
- 通过 Mindwtr 的同步功能同步外部日历事件。外部事件只会在本地获取和缓存。
- 双向任务/日历同步。推送的日历事件由 Mindwtr 中的任务生成。
- 将重复任务规则导出为原生重复日历事件。

### 可见性

外部日历可见性是本地显示偏好：

- 随设置同步的外部日历订阅会遵循你的同步设置。
- 日历视图中每个日历的显示/隐藏状态存储在当前设备上。
- 隐藏的日历在设置中仍然可用；它们只是不参与该设备上可见的规划界面和空闲时间段检查。

### 移动端：将 Mindwtr 中的任务推送到日历

在 iOS 和 Android 上，Mindwtr 可以将已排期任务和带截止日期的任务推送到选定的设备日历：

- 带具体时间的 `startTime` 任务会成为定时事件。如有 `timeEstimate`，它会用作事件时长。
- `startTime` 仅含日期或只有 `dueDate` 的任务会成为全天事件。
- 已完成、已归档、参考资料或已删除的任务会从推送目标日历中移除。
- 推送到专用的 `Mindwtr` 日历时，Mindwtr 会保留任务标题。如果你选择共享日历目标，推送的事件标题会加上 `Mindwtr: ` 前缀，以便与普通事件并列时仍可识别。
- 任务描述会成为事件备注，任务地点会成为事件地点。
- 如果选择名为 `Mindwtr` 的专用日历，日历应用可以使用该日历自身的颜色显示 Mindwtr 中的项目。

设置：

1. 打开**设置 → 日历**
2. 启用**将任务推送到日历**
3. 授予日历权限
4. 展开**同步目标**
5. 选择 Mindwtr 写入事件的位置

目标选项：

- **专用账户日历**：最适合 Android 上的 Google Calendar 或 iOS 上的 iCloud/Apple Calendar。在该账户中创建名为 `Mindwtr` 的日历，然后选择此专用目标。
- **共享账户日历**：写入现有账户日历，并为事件标题加上 `Mindwtr: ` 前缀。
- **专用本地日历**：仅保留在当前设备上。某些 Android 日历应用会隐藏本地日历，而且本地目标不会出现在 calendar.google.com 或其他账户日历 Web 应用中。
- **共享本地日历**：仅写入本地设备日历。

#### Android：Google Calendar 设置

要在 Android 上使用单独的、由 Google 支持的 `Mindwtr` 日历：

1. 在 Web 上打开 Google Calendar。
2. 在 Android 所用的同一 Google 账户下创建名为 `Mindwtr` 的新日历。
3. 在 Android 上打开 Google Calendar 并刷新账户。确保已在 Android 账户设置中启用日历同步。
4. 在 Google Calendar Android 应用中，启用**与其他应用共享 Google Calendar 数据**，让 Android 向 Mindwtr 提供 Google 日历。
5. 返回 Mindwtr 的**设置 → 日历**，点按**刷新日历**，然后选择显示你的 Google 账户的 `Mindwtr` 目标。

如果由 Google 支持的 `Mindwtr` 日历尚未出现在 Mindwtr 中，说明 Android 还没有通过系统日历提供程序将其提供出来。刷新 Google Calendar，检查 Android 账户同步，在 Google Calendar 中启用**与其他应用共享 Google Calendar 数据**，然后在 Mindwtr 中点按**刷新日历**。

#### iOS：Apple Calendar 设置

要在 iPhone 或 iPad 上使用单独的 Apple Calendar 目标：

1. 打开 Apple Calendar。
2. 创建名为 `Mindwtr` 的新日历。如果希望事件显示在其他 Apple 设备上，请使用 iCloud；如果只想保留在当前设备上，请使用本地日历。
3. 如果使用 iCloud，请确认已在 iOS 的**设置 -> Apple 账户 -> iCloud -> 日历**中启用日历同步。
4. 打开 Mindwtr 的**设置 -> 日历**。
5. 启用**将任务推送到日历**并授予日历权限。
6. 展开**同步目标**，点按**刷新日历**，然后选择 `Mindwtr` Apple Calendar 目标。
7. 在 Apple Calendar 中打开日历列表，并确保所选的 `Mindwtr` 日历可见。

如果 `Mindwtr` 日历没有出现在目标列表中，请先确认它在 Apple Calendar 中可见，然后返回 Mindwtr 并点按**刷新日历**。

### 移动端：读取设备日历

在移动端，Mindwtr 可以从设备日历数据库读取日历：

- **Android：**通过 Android 日历提供程序读取。如果某个同步应用没有通过该提供程序提供日历，Mindwtr 就无法看到它们。
- **iOS：**通过基于 EventKit 的系统日历读取，例如在 iOS 设置中启用后的 iCloud、Google、Exchange 和 Outlook。

设置：

1. 打开**设置 → 日历**
2. 启用**设备日历**
3. 授予日历权限
4. 展开**设备日历**
5. 选择要显示的设备日历

Mindwtr 保持只读，不会针对日历源执行提供商 OAuth。

Mindwtr 会从读取列表中隐藏自己推送的 `Mindwtr` 日历，以避免导入自身创建事件的重复副本。

### macOS：Apple Calendar 集成

在 macOS 桌面端，Mindwtr 可以通过 EventKit 读取 Apple Calendar 事件，并推送 Mindwtr 中已排期或到期的任务：

1. 打开**设置 -> 日历**
2. 请求 Apple Calendar 访问权限
3. 在 macOS 的**系统设置 -> 隐私与安全性 -> 日历**中允许 Mindwtr 访问
4. 如果希望将 Mindwtr 中的任务写入 Apple Calendar，请启用**将任务推送到日历**
5. 选择专用的 `Mindwtr` 日历或其他可写日历目标

此功能只适用于 Apple Calendar 中已经可见的日历。

### Linux：GNOME/Evolution Data Server 集成

在 Linux 上，Mindwtr 可以读取 Evolution Data Server 中已启用的日历，并将已排期或到期的任务推送到可写日历。这包括已在 Evolution 或 GNOME 在线账户中配置、且由 Evolution Data Server 提供的账户。

1. 在 Evolution 或 GNOME 在线账户中配置日历账户，并确认它显示在 Evolution 中。
2. 确保已安装并运行 `evolution-data-server`。
3. 在 Mindwtr 中打开**设置 -> 日历**。
4. 如果希望将 Mindwtr 中的任务写入系统日历，请启用**将任务推送到日历**。
5. 展开**同步目标**，刷新日历，然后选择专用的 `Mindwtr` 日历或其他可写目标。

Linux 不会显示单独的日历权限对话框。只读日历可以显示在 Mindwtr 中，但不会列为推送目标。Flatpak 支持已为下一个 Flathub 版本准备就绪；在安装该版本之前，请使用原生软件包或 AUR 版本来使用此集成。Snap 仍不受支持。

### 桌面端/Web：ICS URL

1. 打开**设置 → 日历**
2. 添加你的 **ICS URL**
3. 刷新以获取事件

事件会缓存在设备上，不会通过 Mindwtr 的同步功能在设备间同步。

### ICS URL 要求

Mindwtr 要求 URL 能获取原始 iCalendar 文本。可用的订阅源通常：

- 以 `BEGIN:VCALENDAR` 开头
- URL 以 `.ics` 结尾，或是日历提供商给出的明确订阅/导出链接
- 无需交互式登录页面或额外标头即可获取

常见示例：

- Google Calendar：使用私有的 **iCal 格式的秘密地址**。
- Nextcloud Calendar：使用日历订阅/导出的 `.ics` 链接，而不是公开日历页面 URL。

如果 Mindwtr 显示 `HTTP 401`，说明服务器正在请求身份验证。日历 URL 不支持用户名/密码提示、CalDAV 登录和 bearer token 标头。请改用提供商的秘密 iCalendar 订阅 URL。

如果某个 URL 在浏览器中打开的是普通网页，它可能不是 ICS 订阅源。请从该页面复制订阅/导出 URL。

### 私有日历（Google Calendar）

你**不需要**公开日历。请改用私有的“秘密地址”：

1. 在 Web 上打开 Google Calendar → **设置**。
2. 在左侧边栏中选择日历。
3. 在**集成日历**中，复制 **iCal 格式的秘密地址**。
4. 将该 URL 粘贴到 Mindwtr 中。

该链接的作用类似密码：只有拥有链接的应用才能查看事件，而日历仍保持私有。

## 说明

- 桌面端和移动端的日历都可以根据外部事件在 Mindwtr 中创建一项独立任务。如可用，Mindwtr 会复制事件标题、日期/时间、地点、描述和日历名称。
- 外部日历在 Mindwtr 中为**只读**。从事件创建任务不会修改原始事件。
- ICS 重复事件支持 `FREQ=DAILY`、`WEEKLY`、`MONTHLY` 和 `YEARLY`，并支持 Mindwtr 能够展开到可见范围内的模式所使用的 `INTERVAL`、`COUNT`、`UNTIL`、`BYDAY`、`BYMONTH` 和 `BYMONTHDAY`。
- 每年重复的全天事件，以及 `FREQ=YEARLY;COUNT=...` 或 `FREQ=YEARLY;BYMONTH=1;BYDAY=3MO` 等年度规则，会在可见的日历时间窗口内展开。
- 目前不会展开 `EXDATE`、`RDATE` 和 `RECURRENCE-ID` 等例外日期与重复覆盖项。
- 带 `RRULE:...;COUNT=...` 的重复事件会在达到原始次数后停止。如果你以前看到过非常久远的重复事件，请在更新到 v0.4.9+ 后重新导入。
