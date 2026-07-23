# 数据与同步

Mindwtr 将数据存储在本地，并支持多种设备间同步方式。

Mindwtr **不**运营托管云服务。同步遵循本地优先并由用户配置：你可以选择如何在设备间移动 `data.json` 文件（以及 `attachments/`）。在你设置下列任一选项之前，不会传输任何内容。配置完成后，同步会自动持续运行。

当前桌面版和移动版将设置分为两个页面：
- **设置 → 同步**：用于后端设置、同步选项、历史记录和恢复快照
- **设置 → 数据**：用于备份/恢复/导入、附件清理和诊断

本页是文档站点面向用户的设置与恢复指南。有关维护者级别的合并规则和诊断字段，请参阅[同步算法](/zh-Hans/data-sync/sync-algorithm)。

有关桌面端仓库导入和笔记深层链接，请参阅 [Obsidian 集成](/zh-Hans/power-users/obsidian)。

---

## 数据存储

### 桌面端

数据存储在本地 SQLite 数据库中，并使用一个 JSON 同步/备份文件：

| 平台 | 数据库 (SQLite) | JSON（同步/备份） |
| ----------- | -------------------------------------------------- | ------------------------------------------------------ |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`                 | `~/.local/share/mindwtr/data.json`                     |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                      | `%APPDATA%/mindwtr/data.json`                          |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db`  | `~/Library/Application Support/mindwtr/data.json`      |

配置单独存储：

| 平台 | 位置 |
| ----------- | --------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`               |
| **Windows** | `%APPDATA%/mindwtr/config.toml`               |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

> 旧版 Tauri 构建在 Linux 上使用 `~/.config/tech.dongdongbh.mindwtr/` 和 `~/.local/share/tech.dongdongbh.mindwtr/`。检测到这些目录时会自动迁移。

### 移动端

数据存储在本地 SQLite 数据库中，并使用一个 JSON 同步/备份文件：

- **SQLite 数据库**：`mindwtr.db`
- **JSON 备份**：`data.json`

---

## 同步后端

Mindwtr 直接支持五种同步后端：

- **原生 iCloud / CloudKit 同步**：仅限 Apple 的原生同步，在可用时同步核心数据和附件资源
- **文件同步**：用户选择的文件夹/文件（`data.json` + `attachments/`）
- **Dropbox OAuth 同步**：在支持的构建中直接同步 Dropbox App Folder
- **WebDAV**：任何兼容的 WebDAV 端点
- **Mindwtr Cloud（自托管）**：你自己的 `apps/cloud` 端点

### 概览

| 后端 | 平台 | 设置难度 | 相对速度 | 冲突处理 | 最适合 |
| --- | --- | --- | --- | --- | --- |
| **文件同步**（文件夹） | 全部 | 低，选择一个文件夹 | 最快（普通文件系统） | 文件级；文件夹提供商看到一个文件 | Syncthing、现有云盘客户端、局域网 |
| **WebDAV** | 全部 | 中等，服务器 URL + 凭据 | 较慢，每次请求都需 HTTP 往返 | 应用控制、逐项合并 | Nextcloud/ownCloud/Fastmail、远程自带存储 |
| **Mindwtr Cloud（自托管）** | 全部 | 较高，部署 `apps/cloud` + 令牌 | 快，单端点，服务器写入时合并 | 应用 + 服务器端合并 | 多台设备并发编辑 |
| **Dropbox** | 支持的构建 | 低，OAuth 登录 | 中等，提供商 API | 应用控制、逐项合并 | 无需自建服务器的最简云端方案 |
| **iCloud / CloudKit** | Apple 构建 | 低，在设置中切换 | 快，逐记录同步 | 逐记录 CloudKit 合并 | 仅由 Apple 设备组成的设备组 |

速度差异在使用大型附件时最为明显，因为 WebDAV 和 Dropbox 会分别上传/下载每个附件。有关同步期间实际传输的内容，请参阅[数据生命周期](/zh-Hans/data-sync/data-lifecycle)。

### 数据控制权

| 模式 | 副本会离开设备吗？ | 由你控制 | 远端副本 |
| --- | --- | --- | --- |
| **关闭同步** | 否 | 设备及其备份 | 无 |
| **文件同步** | 仅当其他工具复制所选文件夹时 | 文件夹，以及同步该文件夹的服务商或设备 | 文件夹中的 `data.json` 和附件文件 |
| **Dropbox** | 是 | 已连接的 Dropbox 账户 | 应用文件夹中的 `/Apps/Mindwtr/data.json` 和附件 |
| **iCloud / CloudKit** | 是 | Apple ID 和 iCloud 账户 | CloudKit 记录和附件资源 |
| **WebDAV** | 是 | 端点、账户和凭据 | 该 WebDAV 服务器上的 `data.json` 和附件 |
| **Mindwtr Cloud（自行托管）** | 是 | 部署、存储和访问令牌 | 该服务器上的同步数据和附件 |

本地 SQLite 数据库始终是数据源。基于文件的同步使用可读的 JSON，并以文件形式保存附件，因此应把所选文件夹、服务商账户或服务器视为可信存储。Mindwtr 不运营托管同步服务。Dropbox 直连请求不经过 Mindwtr 开发者，Dropbox 令牌也只保存在你的设备上。

在**设置 → 同步**中，支持的构建会将这些后端显示在一个后端选择器中，然后说明所选的设置路径：

- **云同步**：Apple 平台上的 **Dropbox** 和 **iCloud**
- **文件夹/文件同步**：**文件**
- **高级/自定义服务器**：**WebDAV** 和**自托管**

现有 Dropbox 设置会继续工作；现在只是在**云同步**说明下显示为顶层 **Dropbox** 后端，而不是嵌套在自托管/云提供商选择器下。

### 直接支持与间接支持的提供商

- **直接支持的提供商/协议**：受支持 Apple 构建中的原生 iCloud / CloudKit、WebDAV 服务器、Mindwtr 自托管端点，以及 Dropbox OAuth（受支持的构建）。
- **间接支持的提供商**：通过文件同步使用 iCloud Drive、Google Drive、OneDrive、Syncthing、网络共享和 Dropbox。
- **重要提示**：原生 iCloud 同步**仅限 Apple**。Android、Windows 和 Linux 应改用文件同步、WebDAV、Mindwtr Cloud 或 Dropbox。

**快速指南：**
- **Dropbox**：受支持构建中最简单的跨平台云端选项；通过 OAuth 连接后，Mindwtr 会使用其 Dropbox App Folder。
- **Syncthing**：设备到设备的文件同步。在同一局域网/子网中效果最佳。若要远程同步，请使用 Syncthing 中继或网状 VPN（Nebula/Tailscale）。
- **WebDAV**：使用支持 WebDAV 的提供商（例如 Nextcloud、ownCloud、Fastmail、自托管服务）。
- **iCloud**：在受支持的 Apple 构建中使用原生 iCloud 同步（包括附件资源），或通过文件同步使用 iCloud Drive。
- **Google Drive/OneDrive**：使用文件同步（需要时配合 Android 桥接应用）。

## 同步建议

- **最简单的即插即用云同步：**受支持构建中的 Dropbox OAuth。
- **最佳纯 Apple 设置：**受支持 Apple 构建中的原生 iCloud / CloudKit。
- **最佳自带存储远程同步：**WebDAV 或 Mindwtr Cloud（自托管）。应用控制同步周期并逐项合并。
- **文件同步（Syncthing/Dropbox 等）：**可以工作，但由于 `data.json` 是单个文件，**冲突是文件级的**。
- **文件同步最佳实践：**避免同时在两台设备上编辑，并等待同步完成后再在另一台设备上打开应用。如果出现冲突，请保留最新的 `data.json`，并删除 `data.json.sync-conflict-*` 副本。

### 桌面端代理

在桌面端，Mindwtr 可以为 WebDAV、Dropbox、自托管云同步和外部日历订阅等网络请求使用可选的 HTTP(S) 代理。

在**设置 → 高级 → 网络 → 代理 URL** 中设置。请使用完整 URL，例如 `http://proxy-host:port` 或 `https://proxy-host:port`。留空则使用默认网络行为，包括任何受支持的 `HTTP_PROXY` / `HTTPS_PROXY` 环境变量。

应用内字段有意保持精简：它只是单个代理 URL，而不是完整的代理管理器。无法在此配置 SOCKS、PAC 文件和逐后端代理规则。此设置不会在设备间同步。

## 冲突恢复

Mindwtr 通常会自动解决项目冲突。如果你删除的任务在同步后又出现，最常见的原因是另一台设备在“删除与现存项”歧义窗口内进行了并发编辑。当修订号相同且操作时间相差不超过 30 秒时，Mindwtr 会保留现存编辑，避免悄无声息地丢弃工作。

处理方法：
1. 打开**设置 → 同步**，检查最新同步状态/历史记录中是否有冲突。
2. 如果仍不需要这个恢复出现的任务，请在所有设备完成同步后再次删除。
3. 如果两台设备仍有分歧，请一次一台地手动同步各设备，然后保留你想要的版本，并再次删除/恢复。
4. 如果需要恢复较旧数据，请先使用**设置 → 数据**或**设置 → 同步 → 恢复快照**，再继续编辑。

### 1. 原生 iCloud / CloudKit 同步（仅限 Apple）

Mindwtr 在受支持的 Apple 构建中包含原生 **iCloud** 后端。

- **指南**：[iCloud 同步](/zh-Hans/data-sync/icloud)
- **最适合**：仅使用 Apple 设备，并希望获得比管理共享文件夹更简单的体验
- **不适合**：同一同步设置中包含 Android、Windows 或 Linux 设备

此后端可在 iPhone、iPad 和 macOS 上使用。如果你更喜欢在 macOS 上采用基于文件夹的设置，仍可改用 **iCloud Drive + 文件同步**。

### 2. 文件同步

通过任何基于文件夹的同步服务，使用共享 JSON 文件进行同步：

- Dropbox
- Google Drive
- Syncthing
- OneDrive
- iCloud Drive
- 任何网络文件夹

#### 将 iCloud Drive 用作文件同步（macOS + iOS）

如果你希望通过共享文件夹同步，而不是使用原生 CloudKit 后端，iCloud Drive 也可通过**文件同步**与 Mindwtr 配合使用。

推荐设置：
1. 在 macOS 上，创建一个类似 `iCloud Drive/Mindwtr` 的文件夹。
2. 在 Mindwtr 桌面版中，将**同步后端 = 文件**并选择该文件夹。
3. 导出一次，以创建 `data.json` 和 `attachments/`。
4. 等待 iCloud Drive 完成上传。
5. 在 iOS 版 Mindwtr 中，前往**设置 → 同步 → 选择文件夹**，在“文件”中选择同一个 iCloud Drive 文件夹。
   - 如果某个提供商在 iOS 文件夹选取器中呈灰色，请选择目标文件夹内的任意 JSON 文件。Mindwtr 仍会使用该文件夹中的 `data.json` 和 `attachments/`。

重要提示：
- 同时同步 `data.json` **和** `attachments/`。附件是同步数据的一部分。
- 不要只移动 `data.json` 而不移动 `attachments/`，否则附件元数据与文件可能出现偏差。
- 如果 iCloud“优化储存空间”卸载了文件，请先让“文件”重新下载，然后再手动同步。

#### iOS 上用于 Google Drive、OneDrive 和其他“文件”提供商的文件书签

在 iOS 上，如果 Google Drive、OneDrive 和类似提供商在“文件”选取器中公开了文件，就可以通过**文件同步**使用它们。如果无法选择文件夹，请选择目标文件夹中的现有 JSON 文件；Mindwtr 会存储一个安全范围书签，用于后续读写。

这种文件范围提供商模式会同步 `data.json`。并非每个“文件”提供商书签都能访问附件文件夹，因此需要可靠同步附件时，请使用原生 iCloud/CloudKit、Dropbox、WebDAV 或自托管云端。如果 iOS 报告书签访问已过期，请在**设置 → 同步**中重新选择同步文件。

#### Syncthing 说明（推荐设置）

Syncthing 与 Mindwtr 配合良好，但初始设置顺序很重要。
设备之间必须能够互相访问：最好位于同一子网/局域网；如需远程同步，则可通过中继/网状 VPN（例如 Nebula 或 Tailscale）连接。

**推荐流程：**
1. 创建一个 Syncthing 文件夹（例如 `Mindwtr/`），并等待它完全同步。
2. 在桌面端选择**文件**后端，然后在**设置 → 同步**中选择该文件夹。
3. 将**导出备份**保存到该文件夹，以创建 `data.json` 和 `attachments/`。
4. 等待 Syncthing 完成向手机的同步。
5. 在移动端的**设置 → 同步**中选择同一文件夹。

**为什么会看到 `attachments (1)` / `attachments (2)`**
当两台设备同时创建或修改同一个文件夹时，Syncthing 会创建重复文件夹。如果两台设备都在初次同步完成前打开 Mindwtr，就经常发生这种情况。

**如何修复重复项：**
1. 选出“真正的”`attachments/` 文件夹（通常是文件更多的那个）。
2. 将 `attachments (1)`/`attachments (2)` 中的文件移入 `attachments/`。
3. 删除重复文件夹，让 Syncthing 收敛。

**重要提示：**不要直接同步 `~/.local/share/mindwtr`。移动端存储位于沙盒中。请改用文件同步文件夹 + `data.json`。
如果你已经同步了应用数据目录，请切换到专用同步文件夹，并在设置中重新选择它。

#### Android 上的 Google Drive（文件同步）和 Dropbox 文件同步回退方案

Google Drive **不**提供 WebDAV。如果你想在 Android 上通过文件同步使用 Google Drive，需要一个桥接应用来保持本地文件夹同步（这样 Mindwtr 才能直接读写 `data.json`）。

Android 上的 Dropbox 用户可以在受支持的构建中使用原生 Dropbox 同步。如果你更喜欢文件同步，同样也可通过桥接应用使用 Dropbox。

示例：
- **Dropsync** (Dropbox)
- **Autosync** (Google Drive)
- **FolderSync** (通用)

然后在**设置 → 同步**中，将 Mindwtr 指向本地同步文件夹。

#### Android 上的 OneDrive（推荐设置）

Android 官方 OneDrive 应用**不会**持续双向同步本地文件夹。
若要在 Android 上可靠地将 OneDrive 与 Mindwtr 搭配使用，请安装一个“桥接”应用：

- **OneSync (Autosync for OneDrive)**
- **FolderSync**

然后：
1. 为 Mindwtr 创建一个 OneDrive 文件夹（在桌面端）。
2. 使用桥接应用将该文件夹同步到 Android 上的本地文件夹。
3. 在 Mindwtr 的**设置 → 同步**中选择该本地文件夹（Mindwtr 将使用其中的 `data.json`）。

### 3. WebDAV 同步

直接同步到 WebDAV 服务器：

- Nextcloud
- ownCloud
- Fastmail
- 任何兼容 WebDAV 的服务器

Mindwtr 现在会在首次 `PUT` 前自动创建缺失的父文件夹，因此你可以将它指向一个新的空文件夹，而无需手动预先创建每一层。

公共 URL 上的 WebDAV 使用 HTTPS。`localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、环回/私有 IPv6 地址、`*.local` 和 `*.home.arpa` 等已识别的本地/私有目标会自动允许普通 HTTP。对于自定义 DNS、VPN 主机名、Tailscale、ZeroTier 以及任何未被识别为本地/私有的名称，请使用 HTTPS，或在同步设置中开启**允许不安全连接（HTTP）**。开启后数据将以未加密方式传输，请仅在可信网络中使用。

### 4. Mindwtr Cloud（自托管）

Mindwtr 为高级用户提供了一个可自行托管的简单同步服务器（`apps/cloud`）。

- **协议**：简单 REST API (GET/PUT)
- **认证**：持有者令牌（映射到服务器上的特定数据文件）
- **部署**：Node.js/Bun
- **Docker 设置**：[Docker 部署](/zh-Hans/power-users/docker-deployment)
- **运维指南**：[云端部署](/zh-Hans/data-sync/cloud-deployment)

重要客户端说明：

- **公共 Mindwtr Cloud URL 必须使用 HTTPS。**`localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、环回/私有 IPv6 地址、`*.local` 和 `*.home.arpa` 等本地/私有目标会自动允许普通 HTTP。
- 如果你在可信局域网之外公开云端，请将服务器置于 `caddy`、`nginx` 或 `traefik` 等使用 HTTPS 的反向代理之后。
- 自定义 DNS、VPN 主机名、Tailscale、ZeroTier 以及任何未被识别为本地/私有的名称都应使用 HTTPS，或在同步设置中开启**允许不安全连接（HTTP）**，以便通过明文 HTTP 接受该主机名。开启后数据将以未加密方式传输，请仅在可信网络中使用。

### 5. Dropbox OAuth 同步

Mindwtr 还支持在受支持的桌面版/移动版构建中直接同步 Dropbox。

- **范围**：Dropbox App Folder (`/Apps/Mindwtr/`)
- **同步的数据**：`data.json` 和 `attachments/*`
- **认证**：OAuth 2.0 + PKCE
- **设置**：在**设置 → 同步**中选择 **Dropbox**，连接你的账户，然后运行**测试连接**
- **指南**：[Dropbox 同步](/zh-Hans/data-sync/dropbox)

---

## 同步的工作原理

### 自动同步

Mindwtr 会在以下情况下自动同步：

- **启动时**：应用启动后不久。
- **数据更改时**：任务/项目更改后不久，并带有短暂防抖，将快速连续编辑一起同步。
- **应用获得焦点时**：桌面应用重新获得焦点时，限流为每 30 秒一次；即使本地没有编辑也会运行，以便及时拉取远程更改。
- **应用失去焦点/进入后台时**：从桌面应用切走时，但仅在有待推送的本地更改时运行。
- **桌面端定期心跳**：Mindwtr 运行期间每 15 分钟一次。

如果自动同步失败，Mindwtr 会暂停自动重试约 60 秒。在此冷却期间仍可手动同步。

### 设置同步选项

Mindwtr 可以在设备间同步部分偏好设置。请在**设置 → 同步 → 设置同步选项**中配置。

可用选项包括：
- **外观**（主题）
- **语言与日期格式**
- **GTD 偏好设置**（默认计划时间和“专注”任务上限）
- **外部日历 URL**（ICS 订阅）
- **AI 设置**（模型/提供商）
- **已保存的筛选器**（“专注”筛选器预设）

> API 密钥和本地模型路径绝不会同步。
> 设置冲突按组解决。如果两台设备几乎同时编辑同一设置组中的不同字段，较新的组更新可能覆盖较旧的更新。

### 合并策略

Mindwtr 对每个项目使用**修订感知的最后写入者胜出 (LWW)**：
- 每个任务、项目、分区和区域都带有 `updatedAt` 时间戳。
- 如果有修订元数据（`rev` 和 `revBy`），会先使用它们，再回退到普通时间戳。
- 保留软删除项目（墓碑记录），使删除操作能正确传播到各设备。

删除与现存项的冲突使用**最后操作时间**，而不只是原始 `updatedAt`：
- 对于已删除项目，Mindwtr 会比较 `deletedAt` 与现存项目的最新更新时间。
- 如果删除与现存编辑相差超过 30 秒，则较新的操作胜出。
- 在这个 30 秒的歧义窗口内，如果有更高的修订号，它仍然胜出。否则，Mindwtr 会保留现存项目，而不是轻易让墓碑记录胜出。
- 实际效果：如果你在一台设备上删除任务的时间，与另一台设备上编辑它的时间相差约 30 秒以内，编辑后的现存任务可能会在同步后重新出现。如果你确实想移除它，请等待设备同步后再次删除。

在合并安全检查期间，超过合并时钟 5 分钟的未来时间戳会被钳制，以免错误的设备时钟永远占据主导地位。如果双方都被钳制到未来，Mindwtr 仍会保留它们的相对顺序，而不会将其视为错误的平局。

详细的合并决胜规则、重试行为和冲突示例请参阅[同步算法](/zh-Hans/data-sync/sync-algorithm)。本页仅保留存储和运维概览。

### 冲突可见性与时钟偏差

每次同步后，Mindwtr 会将同步统计信息存储在设置中：

- **冲突**：冲突总数和一小组冲突 ID 样本
- **时钟偏差**：设备间观测到的最大时间戳偏差
- **时间戳修复**：当 `updatedAt < createdAt` 时，在合并期间修正时间戳

你可以在**设置 → 同步**（桌面端和移动端）查看这些详细信息。偏差值很大通常表示设备时钟不同步。
在移动端，同步历史记录默认折叠；轻点即可展开。

### 附件同步与清理

- 附件在元数据合并**之后**同步。
- 缺失的附件在下载前保留为占位符。
- 自动清理孤立附件（也可在桌面端的**设置 → 数据**中手动触发）。
- 远程附件清理了解本地引用，但不会全局计算引用数。如果两台设备在彼此同步前创建或保留了对同一远程附件的引用，一台设备可能尚不知道另一台设备上的引用。删除共享附件前请先让设备同步；如果清理移除了另一台设备仍需要的远程副本，请重新附加该文件。

---

## 桌面端同步设置

### 文件同步

1. 打开**设置 → 同步**
2. 将**同步后端**设为**文件**
3. 点击**更改位置**，并在同步服务中选择文件夹
4. 点击**保存**

Mindwtr 会在启动时和数据更改时自动同步。

### WebDAV 同步

1. 打开**设置 → 同步**
2. 将**同步后端**设为 **WebDAV**
3. 输入 WebDAV 服务器详细信息：
   - **URL**：文件夹 URL；Mindwtr 会将 `data.json` 存在其中（例如 `https://nextcloud.example.com/remote.php/dav/files/user/Mindwtr`）
   - **用户名**：你的 WebDAV 用户名
   - **密码**：你的 WebDAV 密码
4. 点击**保存 WebDAV**

如果目标文件夹路径尚不存在，Mindwtr 会尝试在上传 `data.json` 前自动创建缺失的父集合。

> **Linux 说明：**如果你的桌面会话未提供 Secret Service 密钥环（例如 `org.freedesktop.secrets` 不可用），Mindwtr 会回退到 `~/.config/mindwtr/secrets.toml` 中的本地密钥存储。

> **提示：**对于 Nextcloud，URL 格式为：
> `https://your-server.com/remote.php/dav/files/USERNAME/path/to/folder`
>
> 支持带显式端口的 URL（例如 `https://example.com:5000/mindwtr`）。

## 移动端同步设置

由于 Android/iOS 的存储限制，移动端同步需要手动选择同步文件夹。

在 iOS 上，某些云提供商可能不会在“文件”中提供文件夹选择。这种情况下，请选择目标同步文件夹中的任意 JSON 文件；Mindwtr 会解析并使用该文件夹路径进行同步。

### 1. 先导出数据

1. 前往**设置 → 数据**
2. 轻点**导出备份**
3. 将文件保存到同步文件夹（例如 Google Drive）

### 2. 选择同步文件夹

1. 在**设置 → 同步**中
2. 轻点**选择文件夹**
3. 导航到同步文件夹
4. 选择包含（或将包含）`data.json` 的文件夹

### 3. 自动同步

移动端现在会自动同步：
- 应用进入后台时
- 数据更改 5 秒后
- 返回应用时（如果已过去 >30 秒）

你也可以随时在设置中轻点**同步**进行手动同步。

---

## SQLite + JSON 同步桥接

Mindwtr 使用 SQLite 作为主要本地存储。`data.json` 是同步和备份快照，而不是地位相同的第二数据源。

- **冷启动/正常读取**：应用读取由本地 SQLite 支持的存储。
- **传出同步**：先刷新待处理的本地保存，然后将当前快照导出到 `data.json` / 远程存储。
- **传入同步**：验证、规范化外部 JSON，并与本地数据合并，然后持久化回由 SQLite 支持的存储。
- **设备本地同步诊断**：`lastSyncStats`、`lastSyncHistory` 等字段和待处理的远程写入恢复元数据保留在本地，并从远程负载中剥离。

桌面端和移动端在同步期间**不会**冻结编辑。相反，如果同步写入过程中本地数据发生变化，应用会中止该周期并将一个新周期加入队列，以免覆盖较新的本地快照。

完整契约请参阅 [ADR 0009](https://github.com/dongdongbh/Mindwtr/blob/main/docs/adr/0009-sqlite-json-sync-bridge.md)。

---

## 同步工作流

### 两台设备

**初始设置：**
1. 在桌面端设置同步文件夹
2. 导出备份并保存到同步文件夹
3. 在移动端选择该文件夹

**日常使用：**
1. 在设备 A 上进行更改
2. 等待同步服务复制
3. 在设备 B 上触发同步（设置 → 同步）

### 多台设备

同样的工作流也适用。请避免同时在多台设备上编辑，以防发生冲突。

---

## 故障排除检查清单

- **确认同步文件夹中存在 `data.json`**，并且它正在更新。
- 在第二台设备上打开 Mindwtr 前，**等待 Syncthing 完全同步**。
- 如需立即拉取/推送，请在设置中手动使用“**同步**”。
- **检查是否有重复的附件文件夹**（`attachments (1)` 等），并将它们合并。
- **确保设备时钟正确**（较大的偏差会导致冲突）。
- **验证文件夹权限**（Android SAF 可能会阻止对某些文件夹的写入访问）。

---

## 备份与导出

### 导出数据

**桌面端：**
- 使用**设置 → 数据 → 导出备份**
- 启用同步后，同步后端也会自动保持 `data.json` 更新

**移动端：**
1. 前往**设置 → 数据**
2. 轻点**导出备份**
3. 保存到所需位置

### 从备份恢复

Mindwtr 可以在桌面端和移动端直接从备份 JSON 文件恢复本地数据。

流程：
1. 打开**设置 → 数据**
2. 选择**恢复备份**
3. 选择一个 Mindwtr 备份 JSON 文件
4. 查看备份摘要并确认

恢复前，Mindwtr 会验证文件，并在平台支持时创建恢复快照。恢复是完全替换本地数据，而不是合并。

- **桌面端**：恢复前，会在应用数据快照文件夹中创建恢复快照
- **移动端**：恢复前，会在应用存储中创建本地恢复快照
- **如果文件无效**：恢复会被阻止，而当前数据保持不变

有关详细流程，请参阅[备份与恢复](/zh-Hans/data-sync/backup-restore)。

## 导入与迁移

将其他应用中的任务数据导入 Mindwtr 时，请使用以下指南。导入会向 Mindwtr 添加数据；不会配置同步。

### TickTick CSV / ZIP 导入

Mindwtr 可以从**设置 → 数据 → 从 TickTick 导入**中导入 TickTick 备份。

- 支持 TickTick **CSV** 备份，以及包含 CSV 导出的 **ZIP** 备份
- 从 TickTick 文件夹创建 Mindwtr 中的区域
- 从 TickTick 列表创建 Mindwtr 中的项目
- 保留受支持的任务状态、日期、优先级、标签、笔记和重复规则
- 将受支持的检查清单/子任务数据转换为 Mindwtr 中的检查清单项目

有关详细信息和支持的映射，请参阅 [TickTick 导入](/zh-Hans/import/ticktick)。

### Todoist CSV / ZIP 导入

Mindwtr 可以从**设置 → 数据 → 从 Todoist 导入**中导入 Todoist 导出数据。

- 支持单个 Todoist CSV 导出，或包含多个项目 CSV 的 ZIP 备份
- 从 Todoist 项目创建 Mindwtr 中的项目
- 将 Todoist 分区保留为 Mindwtr 中的分区
- 将 Todoist 子任务转换为检查清单项目
- 将导入的任务保留在**收集箱**中，以便你通过常规 GTD 流程处理

Todoist 重复计划不会自动重新创建。Mindwtr 会导入一次任务，并将原始重复文本保留在描述中。

有关详细信息和支持的映射，请参阅 [Todoist 导入](/zh-Hans/import/todoist)。

### DGT GTD JSON / ZIP 导入

Mindwtr 可以从**设置 → 数据 → 从 DGT GTD 导入**中导入 DGT GTD 导出数据。

- 支持 DGT GTD JSON 导出，或包含所导出 JSON 文件的 ZIP 归档
- 从 DGT 文件夹创建 Mindwtr 中的区域
- 从 DGT 项目创建 Mindwtr 中的项目
- 将 DGT 检查清单保留为 Mindwtr 中的检查清单任务
- 在导入的任务中保留 DGT 情境和标签
- 保留支持的重复规则；如果某个 DGT 重复模式必须仅导入一次并保留原始文本，则会发出警告

独立的 DGT 任务会保留在 Mindwtr 中，不会被强制放入新项目，以便你之后按需整理。

有关详细信息和支持的映射，请参阅 [DGT GTD 导入](/zh-Hans/import/dgt-gtd)。

### OmniFocus CSV / JSON / ZIP 导入

Mindwtr 可以从**设置 → 数据 → 从 OmniFocus 导入**中导入 OmniFocus 导出数据。

- 支持 OmniFocus **CSV** 导出，包括 UTF-8 和 UTF-16 CSV 文件
- 支持 Omni Automation / Shortcuts **JSON** 导出和 **ZIP** 归档
- 元数据可用时，从 OmniFocus 文件夹创建 Mindwtr 中的区域
- 从 OmniFocus 项目或引用的项目名称创建 Mindwtr 中的项目
- 将独立的 OmniFocus 操作保留在项目之外，以便你稍后整理
- 通过 JSON 路径保留受支持的 OmniFocus 笔记、标签、推迟日期、截止日期、完成状态和重复规则
- 尽可能将简单的嵌套任务转换为检查清单项目，并将更深的层级扁平化，同时保留原始路径

如果重复规则或层级保真度很重要，请优先选择 Omni Automation JSON / ZIP 路径，而不是 CSV。如果 Mindwtr 没有直接对应的字段，计划日期和时长文本会保留在导入的描述中。

有关详细信息和支持的映射，请参阅 [OmniFocus 导入](/zh-Hans/import/omnifocus)。

### Apple 提醒事项导入 (iOS)

在 iPhone 和 iPad 上，Mindwtr 可以从**设置 → 数据 → 从 Apple 提醒事项导入**中导入未完成的 Apple 提醒事项。

- 选择要用作收集来源的 Apple 提醒事项列表
- 将新的未完成提醒事项添加到 Mindwtr 的**收集箱**
- 将提醒事项标题和备注保留为任务标题和描述
- 跳过已完成、无标题和已经导入的提醒事项
- 可以选择在 Mindwtr 将提醒事项添加到收集箱后，将其从 Apple 提醒事项中删除

Apple 提醒事项导入是单向导入路径，不是同步后端。

### 备份策略

- 定期导出到同步文件夹
- 备份本地配置文件夹
- 同步文件同时用作备份
- 在恢复/导入操作前自动保存恢复快照

---

## 故障排除

### 同步无法工作

1. **检查同步文件夹路径**
   - 确保路径存在且可访问
   - 验证权限

2. **检查同步服务**
   - Dropbox/Google Drive 是否正在运行？
   - 文件是否已在设备间同步？

3. **临时文件错误**
   - 如果同步服务正在写入（例如 Syncthing），JSON 可能暂时无效。
   - 稍等片刻，然后再次同步。

4. **手动同步**
   - 点击“立即同步”（桌面端）或“同步”（移动端）
   - 检查是否有错误消息

### 数据冲突

如果看到意外数据：
1. 导出当前数据的备份
2. 检查同步文件夹中的最新文件
3. 根据需要手动检查并合并

### 找不到移动端同步文件

1. 确保云端文件夹中存在该文件
2. 在设置 → 同步中重新选择文件
3. 检查文件权限

### 重置同步

若要从头开始：
1. 删除同步文件夹内容
2. 从一台设备导出
3. 在其他设备上导入/同步

---

## 数据格式

`data.json` 文件结构：

```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "next",
      "contexts": ["@home"],
      "tags": ["#focused"],
      "dueDate": "2025-01-15T09:00:00Z",
      "recurrence": {
        "rule": "weekly",
        "strategy": "strict",
        "byDay": ["MO", "WE"]
      },
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z",
      "deletedAt": null
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "title": "Project name",
      "status": "active",
      "color": "#3B82F6",
      "areaId": "area-uuid",
      "tagIds": ["#client", "#feature"],
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "sections": [
    {
      "id": "uuid",
      "projectId": "project-uuid",
      "title": "Section title",
      "order": 1,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "areas": [
    {
      "id": "uuid",
      "name": "Research",
      "color": "#3B82F6",
      "icon": "🔬",
      "order": 0,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "people": [
    {
      "id": "uuid",
      "name": "Alex",
      "note": "Design lead",
      "referenceLink": "https://example.com/alex",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
```

---

## 隐私

- 所有数据都存储在你的设备本地
- 同步通过你自己的云服务进行
- 任务数据、项目数据、笔记、附件和同步内容不会发送到 Mindwtr 服务器
- 配置了心跳分析的构建可能会发送一个很小的应用健康事件；其中不包含任务、项目、笔记、文件、AI 提示词或账户内容。请参阅[隐私政策](https://mindwtr.app/privacy)。
- 你可以完全掌控自己的数据

---

## 另请参阅

- [桌面端用户指南](/zh-Hans/use/desktop)
- [移动端用户指南](/zh-Hans/use/mobile)
- [入门指南](/zh-Hans/start/getting-started)
- [附件](/zh-Hans/use/attachments)
