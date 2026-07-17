# 开始使用

欢迎使用 Mindwtr！本指南将帮助你快速上手。

## 安装

### 桌面端

| 平台 | 安装方式 |
| --- | --- |
| **Arch Linux** | `mindwtr-bin` 预构建 AUR 包，或 `mindwtr` 源码构建 AUR 包 |
| **Debian/Ubuntu** | 添加 APT 仓库（推荐），或从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载 `.deb` |
| **Fedora/RHEL** | 添加 DNF 仓库（推荐），或从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载 `.rpm` |
| **Flatpak** | 从 [Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr) 安装 |
| **AppImage** | 下载 `.AppImage`，执行 `chmod +x` 后运行 |
| **Windows** | Microsoft Store、Winget、Chocolatey、Scoop、便携 ZIP，或从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 获取安装程序 |
| **macOS** | [Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144)、TestFlight 测试版、Homebrew，或从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 获取 `.dmg` |

详细说明请参阅[桌面端安装](/zh-Hans/start/desktop-installation)。

### 移动端

| 平台 | 安装方式 |
| --- | --- |
| **Android** | Google Play、F-Droid、IzzyOnDroid，或从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 获取 APK |
| **iOS** | App Store、TestFlight 测试版，或供开发使用的模拟器/自行构建版本 |

详细说明请参阅[移动端安装](/zh-Hans/start/mobile-installation)。

想提前试用新构建？请参阅[加入测试版渠道](/zh-Hans/start/beta-channels)。

### Docker 与 Web 应用

如果希望通过浏览器访问，可以用 Docker 运行 Web 应用（PWA）和自托管同步服务器：

- [Docker 部署](/zh-Hans/power-users/docker-deployment)
- [Web 应用（PWA）](/zh-Hans/power-users/web-app-pwa)

---

## 首次启动

全新安装后，Mindwtr 会询问你要全新开始、导入备份，还是连接同步。设置完成后默认打开**专注**视图，首先显示今天的日历事项和下一步行动。需要快速放下一个想法时，随时把新工作记录到**收集箱**。

### 基本工作流程

1. **记录**一切到收集箱
2. 使用处理向导**明确**每一项内容
3. **整理**为下一步行动、项目或将来/也许
4. 在每周回顾中**回顾**
5. 自信地**执行**

---

## 快速添加语法

Mindwtr 支持自然语言快速添加。直接在任务输入框中输入即可。当你完成项目最后一个行动时出现“下一步行动是什么？”提示，同样可以使用这套语法（例如以 `/waiting` 结尾，把后续事项暂存为等待中）：

| 语法 | 示例 | 结果 |
| --- | --- | --- |
| `@context` | `Buy milk @errands` | 添加 @errands 情境 |
| `#tag` | `Research topic #creative` | 添加 #creative 标签 |
| `+Project` | `Call vendor +HomeReno` | 分配到项目 |
| `+Multi Word` | `+New Project Name` | 分配到 “New Project Name” |
| `+"Quoted Name"` | `+"New Project" call Bob` | 引号可在句子中间界定多词名称（也支持 `!"Area Name"`） |
| `!Area` | `Plan roadmap !Work` | 分配到领域 |
| `%Person` | `Ask %Jim for the budget /waiting` | 设置“分配给”（委派对象/等待事项负责人） |
| `%"Full Name"` | `%"Jim Smith" send report` | 引号界定多词人员名称（已知名称不加引号也可匹配） |
| `/area:<name>` | `/area:Personal` | 分配到领域（不能有空格） |
| `/start:date` | `Task /start:monday` | 设置开始日期 |
| `/due:date` | `Report /due:friday` | 设置截止日期 |
| `/review:date` | `Task /review:next week` | 设置回顾日期 |
| `/energy:<level>` | `Task /energy:low` | 设置精力水平（`low`、`medium`、`high`） |
| `/note:text` | `Task /note:remember X` | 添加描述 |
| `/status` | `/next`、`/waiting`、`/someday`、`/done`、`/archived`、`/inbox` | 设置状态 |

**日期示例：**

- `/due:today`、`/due:tomorrow`
- `/due:friday`、`/due:next week`
- `/due:in 3 days`、`/due:2025-01-15`
- `/start:tomorrow`、`/review:next week`

绝对日期固定使用 ISO 格式 `YYYY-MM-DD`（例如 `/due:2026-03-15`），不受界面语言或日期显示格式影响。

**转义**

- 使用反斜杠将符号保留为普通文字：`\\@`、`\\#`、`\\+`、`\\!`、`\\%`、`\\/`
- 示例：`Call \\@support /due:tomorrow` → 标题变为 `Call @support`

**Unicode 支持**

- 情境和标签名称接受 Unicode 字母与数字（例如中日韩文字和带重音字符）。

> **提示：**还可以使用**语音记录**说出任务。在**设置 → AI 助手**中启用，即可通过智能解析将语音转为文字。

---

## 整理模型

Mindwtr 使用四种不同的分组工具。请各取所长：

- **项目**：你想完成、包含多个步骤的成果（例如“发布 v2 网站”）。
- **领域**：没有终点的持续责任范围（例如“健康”“家庭”“职业”）。
- **情境**：任务可以在何处/以何种方式完成（例如 `@home`、`@phone`、`@errands`）。
- **标签**：用于精力、主题或自定义分组的灵活标记（例如 `#focused`、`#lowenergy`）。

实用规则：

- 有明确终点，就用**项目**。
- 属于长期生活/工作范围，就用**领域**。
- 取决于地点/工具/人员，就用**情境**。
- 只想按需筛选，就用**标签**。

---

## 后续步骤

- 了解 [GTD 概览](/zh-Hans/use/gtd-overview)
- 阅读[桌面端用户指南](/zh-Hans/use/desktop)或[移动端用户指南](/zh-Hans/use/mobile)
- 设置[数据与同步](/zh-Hans/data-sync/)
- 启用 [AI 助手](/zh-Hans/power-users/ai-assistant)（可选）

---

## 需要帮助？

- 报告错误或寻求帮助的最佳位置是 [GitHub issue](https://github.com/dongdongbh/Mindwtr/issues)，便于持续跟踪。
- 已在应用中？使用**设置 → 关于**页面上的**发送反馈**。
- 私密问题请发送邮件至 [support@mindwtr.app](mailto:support@mindwtr.app)。
- 浏览[常见问题](/zh-Hans/start/faq)，或阅读完整的[Mindwtr 中的 GTD 工作流](/zh-Hans/use/gtd-workflow)指南。
