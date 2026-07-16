# 开发者指南

本指南介绍 Mindwtr 的开发环境设置和贡献准则。

---

## 产品理念

Mindwtr 致力于做到**默认简洁，需要时强大**。我们专注于减轻认知负担、删繁就简，并让用户保持心流。每一项贡献都会根据以下原则进行权衡：

- **渐进式披露**：高级选项在真正需要时才会出现。
- **默认做减法**：更少的字段、更少的开关、更少的干扰。
- **避免功能蔓延**：我们优先追求清晰，而不是堆砌功能。
- **自动优于手动**：如果可以根据平台、安装渠道、现有数据或上下文推断或预测出正确结果，应用就应该直接完成。这个原则适用于所有地方，不只限于设置：不提供需要配置的开关，不询问应用自己就能回答的问题，不在工作流中增加额外点击或手动步骤，也不添加用户必须操作才能得到显而易见结果的界面。每一个手动步骤，都是把本可由我们承担一次的认知负担转移给每一位用户并让其永久承担。更新检查器就是典范：应用不会提供“禁用更新检查”开关，而是检测自己的安装方式，并针对不同渠道采取正确行为——通过包管理器安装的版本会自动保持安静，无需提供任何设置。只有当正确行为确实无法推断且需求真实存在时，才应优先将功能置于现有开关或交互入口之后，而不是再造一个新开关。

_我只是想骑自行车，别给我摆出一整套驾驶舱。_

有关这些原则背后的数据安全与同步护栏，请参阅[工程原则](/zh-Hans/developers/engineering-principles)。

---

## 快速开始

```bash
# Clone repository
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run desktop app (dev mode)
bun desktop:dev

# Run mobile app
bun mobile:start
```

---

## 前置要求

### 所有平台

- [Bun](https://bun.sh/) — 包管理器和运行时
- [Node.js](https://nodejs.org/) — JavaScript 运行时（部分工具需要）
- [Git](https://git-scm.com/) — 版本控制

### 桌面端开发

- [Rust](https://rustup.rs/) — Tauri 所必需

**Linux（Arch）：**
```bash
sudo pacman -S rust webkit2gtk-4.1 base-devel
```

**Linux（Debian/Ubuntu）：**
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential libssl-dev libgtk-3-dev
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**macOS：**
```bash
xcode-select --install
brew install rust
```

**Windows：**
安装 [Rust](https://rustup.rs/) 和 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)。

### 移动端开发

- [Expo Go](https://expo.dev/client) 应用（用于测试）
- Android Studio（用于模拟器/设备构建）
- Xcode（用于 iOS 开发）

---

## 项目结构

```
Mindwtr/
├── apps/
│   ├── cloud/             # Sync server (Bun)
│   ├── desktop/           # Tauri v2 + React + Vite
│   │   ├── src/           # React source
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── lib/
│   │   │   └── App.tsx
│   │   ├── src-tauri/     # Rust backend
│   │   └── package.json
│   │
│   └── mobile/            # Expo + React Native
│       ├── app/           # Expo Router pages
│       ├── components/
│       ├── contexts/
│       ├── lib/
│       └── package.json
│
├── packages/
│   └── core/              # Shared business logic
│       └── src/
│           ├── store.ts   # Zustand store
│           ├── types.ts   # TypeScript types
│           ├── i18n.ts    # Translations
│           └── ...
│
├── scripts/               # Utility scripts (CLI, API, release)
├── docs/                  # Repository-local docs: ADRs, release notes, contribution docs
├── wiki/                  # Retired GitHub Wiki landing page (points to the docs site)
├── .github/               # CI/CD workflows
└── package.json           # Monorepo root
```

面向公众的用户与开发者文档在本仓库的 `docs/` 目录中维护，并发布到 <https://docs.mindwtr.app/>。公共源代码位于 <https://github.com/dongdongbh/mindwtr-web/tree/main/docs>。新增或迁移指南页面时，请优先使用该文档仓库。

公共文档源：<https://github.com/dongdongbh/mindwtr-web/tree/main/docs>

---

## 可用脚本

### 根目录

| 命令                 | 说明                 |
| -------------------- | -------------------- |
| `bun install`        | 安装所有依赖         |
| `bun desktop:dev`    | 以开发模式运行桌面端 |
| `bun mobile:start`   | 启动 Expo 开发服务器 |
| `bun mobile:android` | 在 Android 上运行    |
| `bun mobile:ios`     | 在 iOS 上运行        |
| `bun test`           | 运行所有测试         |
| `bun mindwtr:cli`    | 运行 CLI 工具         |
| `bun mindwtr:api`    | 运行本地 API 服务器   |

### 桌面端（`apps/desktop`）

| 命令        | 说明                   |
| ----------- | ---------------------- |
| `bun dev`   | 使用热重载的开发模式   |
| `bun build` | 构建生产版本           |
| `bun test`  | 运行测试               |

### 移动端（`apps/mobile`）

| 命令                                              | 说明               |
| ------------------------------------------------- | ------------------ |
| `bun start`                                       | 启动 Expo 服务器   |
| `bun android`                                     | 在 Android 上运行  |
| `bun ios`                                         | 在 iOS 上运行      |
| `ARCHS=arm64-v8a bash ./scripts/android_build.sh` | 构建 Android APK   |

### 云端（`apps/cloud`）

| 命令      | 说明           |
| --------- | -------------- |
| `bun dev` | 运行同步服务器 |

### 核心包（`packages/core`）

| 命令        | 说明         |
| ----------- | ------------ |
| `bun test`  | 运行单元测试 |
| `bun build` | 构建软件包   |

---

## 技术栈

| 层级       | 桌面端           | 移动端                | 云端             |
| ---------- | ---------------- | --------------------- | ---------------- |
| **框架**   | React + Vite     | React Native + Expo   | Bun（原生 HTTP） |
| **样式**   | Tailwind CSS     | NativeWind (Tailwind) | 不适用           |
| **状态**   | Zustand（共享）  | Zustand（共享）       | 不适用           |
| **平台**   | Tauri v2 (Rust)  | Expo (iOS/Android)    | Bun              |
| **路由**   | React Router     | Expo Router           | 不适用           |
| **语言**   | TypeScript       | TypeScript            | TypeScript       |

---

## 架构决策

我们将关键技术决策以 ADR 的形式记录在 `docs/adr/` 下。请参阅：
- `docs/adr/README.md`

在更改合并或传输行为之前，需要了解当前的同步 ADR：
- ADR 0003 定义了可感知修订版本的同步元数据（`rev`、`revBy`）以及可确定处理墓碑记录的合并方式。
- ADR 0007 定义了已发布的“存活记录优先”规则，用于解决含义不明确的删除记录与存活记录冲突。
- ADR 0008 记录了 Mindwtr 目前有意继续采用基于快照的同步，而不添加增量日志。

贡献者应将快照传输视为一项有意为之的产品选择，而不是缺失的基础设施。只有当快照文件经常超过 5 MB、典型网络上的同步往返时间超过 5 秒，或 Mindwtr 需要实时多设备流式同步时，才应重新审视 ADR 0008。

---

## 开发工作流

### 进行更改

1. 创建功能分支
2. 在相关软件包中进行更改
3. 运行测试：`bun test`
4. 在桌面端测试：`bun desktop:dev`
5. 在移动端测试：`bun mobile:start`
6. 使用描述清楚的消息提交更改
7. 创建拉取请求

添加新的顶层实体类型时，应在同一项更改中更新完整的持久化与同步表面：核心 `AppData` 类型和规范化、桌面端 SQLite 架构/存储往返测试、移动端 SQLite 架构/备份恢复、云端验证/规范化、对外提供时的 MCP 工具，以及位于 <https://github.com/dongdongbh/mindwtr-web/tree/main/docs> 的 Core API 文档源。

### 代码风格

- 所有代码均使用 TypeScript
- 使用函数式 React 组件
- 优先使用命名导出
- 公共 API 使用 JSDoc 注释

### 测试

```bash
# Run all tests
bun test

# Run desktop tests
cd apps/desktop && bun test

# Run core tests
cd packages/core && bun test
```

---

## 构建生产版本

### 桌面端

```bash
cd apps/desktop
bun run build
# Output: src-tauri/target/release/
```

### 桌面端（诊断构建）

发布构建默认禁用开发者工具。要启用诊断/开发者工具，请使用
`diagnostics` 功能构建，并在运行时选择启用：

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### 移动端（Android APK）

```bash
cd apps/mobile
ARCHS=arm64-v8a bash ./scripts/android_build.sh
```

有关详细构建说明，请参阅[移动端安装](/zh-Hans/start/mobile-installation)。

---

## 架构概览

有关详细技术设计，请参阅[架构](/zh-Hans/developers/architecture)。

### 核心概念

- **Monorepo：** 使用共享依赖项的单一仓库
- **共享核心：** `@mindwtr/core` 中的业务逻辑
- **平台应用：** 桌面端和移动端使用共享核心
- **本地存储：** 数据在本地持久化
- **多种同步方式：** 文件、WebDAV 或云同步

---

## CLI 工具

用于脚本与自动化的命令行界面：

```bash
# Add a task
bun mindwtr:cli -- add "Call mom @phone #family"

# List active tasks
bun mindwtr:cli -- list

# List with filters
bun mindwtr:cli -- list --status next --query "due:<=7d"

# Read or update a task
bun mindwtr:cli -- get <taskId>
bun mindwtr:cli -- update <taskId> '{"status":"next"}'

# Complete a task
bun mindwtr:cli -- complete <taskId>

# Archive, delete, or restore
bun mindwtr:cli -- archive <taskId>
bun mindwtr:cli -- delete <taskId>
bun mindwtr:cli -- restore <taskId>

# Search
bun mindwtr:cli -- search "@work"

# List projects
bun mindwtr:cli -- projects
```

**选项：**
- `--data <path>` — 覆盖 data.json 位置
- `--db <path>` — 覆盖 mindwtr.db 位置
- `MINDWTR_DATA` — 数据路径的环境变量
- `MINDWTR_DB_PATH` — 数据库路径的环境变量

在与桌面端兼容的路径上，CLI 会保持 `mindwtr.db` 和 `data.json` 一致，让更改在应用启动前后都保持可见。

---

## 本地 REST API

运行本地 API 服务器，以用于脚本和集成：

```bash
# Start API server
bun mindwtr:api -- --port 4317

# With auth token
MINDWTR_API_TOKEN=secret bun mindwtr:api -- --port 4317
```

本地 API 使用与 CLI 相同的存储约定，在与桌面端兼容的路径上保持 `mindwtr.db` 和 `data.json` 同步。

### 端点

| 方法     | 端点                  | 说明             |
| -------- | --------------------- | ---------------- |
| `GET`    | `/health`             | 健康检查         |
| `GET`    | `/tasks`              | 列出任务         |
| `GET`    | `/tasks?status=next`  | 按状态筛选       |
| `GET`    | `/tasks?query=@work`  | 搜索任务         |
| `POST`   | `/tasks`              | 创建任务         |
| `PATCH`  | `/tasks/:id`          | 更新任务         |
| `DELETE` | `/tasks/:id`          | 软删除任务       |
| `POST`   | `/tasks/:id/complete` | 将任务标记为完成 |
| `POST`   | `/tasks/:id/archive`  | 将任务标记为归档 |
| `POST`   | `/tasks/:id/restore`  | 恢复已删除的任务 |
| `GET`    | `/projects`           | 列出项目         |
| `GET`    | `/search?query=...`   | 搜索任务和项目   |

**示例：**
```bash
# Add task via API
curl -X POST http://localhost:4317/tasks \
  -H "Content-Type: application/json" \
  -d '{"input": "Review PR @work /due:tomorrow"}'

# Complete task
curl -X POST http://localhost:4317/tasks/<id>/complete
```

---

## 云服务器

自托管云同步后端：

```bash
# From monorepo root
bun run --filter mindwtr-cloud dev -- --port 8787
```

### 端点

| 方法                     | 端点                       | 说明                         |
| ------------------------ | -------------------------- | ---------------------------- |
| `GET`                    | `/health`                  | 健康检查                     |
| `HEAD`                   | `/v1/data`                 | 获取快照元数据               |
| `GET`                    | `/v1/data`                 | 获取用户数据                 |
| `PUT`                    | `/v1/data`                 | 合并并保存用户数据；返回合并统计信息 |
| `GET`, `POST`            | `/v1/tasks`                | 列出或创建任务               |
| `GET`, `PATCH`, `DELETE` | `/v1/tasks/:id`            | 读取、更新或软删除任务       |
| `POST`                   | `/v1/tasks/:id/complete`   | 将任务标记为完成             |
| `POST`                   | `/v1/tasks/:id/archive`    | 归档任务                     |
| `GET`, `POST`            | `/v1/projects`             | 列出或创建项目               |
| `GET`, `PATCH`, `DELETE` | `/v1/projects/:id`         | 读取、更新或软删除项目       |
| `GET`, `POST`            | `/v1/sections`             | 列出或创建分区               |
| `GET`, `PATCH`, `DELETE` | `/v1/sections/:id`         | 读取、更新或软删除分区       |
| `GET`, `POST`            | `/v1/areas`                | 列出或创建领域               |
| `GET`, `PATCH`, `DELETE` | `/v1/areas/:id`            | 读取、更新或软删除领域       |
| `GET`                    | `/v1/search`               | 搜索任务和项目               |
| `GET`, `PUT`, `DELETE`   | `/v1/attachments/*`        | 下载、上传或删除附件文件     |
| `POST`, `DELETE`         | `/v1/attachments/orphans`  | 扫描或移除孤立附件文件       |

**身份验证：** `Authorization: Bearer <token>`

每个令牌都有自己的数据文件（文件名为 SHA-256 哈希值）。

**环境变量：**
- `PORT` — 服务器端口（默认值 8787）
- `HOST` — 绑定地址（默认值 0.0.0.0）
- `MINDWTR_CLOUD_DATA_DIR` — 数据目录

---

## Web 应用（PWA）

在浏览器中运行支持 PWA 的桌面端界面：

```bash
# Development
bun desktop:web

# Production build
bun desktop:web:build
```

使用 localStorage 存储数据，并通过 service worker 支持离线使用。

---

## 另请参阅

- [架构](/zh-Hans/developers/architecture)
- [Core API](/zh-Hans/developers/core-api)
- [贡献指南（仓库指南）](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
