# 開發者指南

本指南說明 Mindwtr 的開發環境設定與貢獻規範。

---

## 產品理念

Mindwtr 的設計是**預設簡單，需要時強大**。我們著重降低認知負擔、去除贅餘，並讓使用者保持專注。每項貢獻都會依下列原則衡量：

- **漸進式揭露**：進階選項在真正需要前保持隱藏。
- **預設精簡**：更少欄位、更少旋鈕、更少干擾。
- **避免功能蔓延**：清晰優先於繁雜。
- **自動優於手動**：若可從平台、安裝管道、既有資料或情境推斷或預測正確結果，應用程式就應直接處理。這適用於所有地方，不只設定：不要提供需要設定的旋鈕、不要詢問應用程式能自行回答的問題、不要在工作流程中增加額外點按或手動步驟，也不要要求使用者操作介面才能得到顯而易見的結果。每個手動步驟都把原本由我們承擔一次的認知負擔，轉嫁給每位使用者長期承擔。更新檢查器就是典範：應用程式不提供「停用更新檢查」開關，而是偵測安裝方式，依管道採取正確行為——套件管理員安裝會自行保持安靜，不必新增設定。只有在確實無法推斷正確行為且需求真實存在時，才考慮新增設定；在此之前，先將功能置於既有開關或操作介面之後。

_只想騎腳踏車時，別讓我面對駕駛艙。_

這些原則底層的資料安全與同步防護規則，請參閱[工程原則](/zh-Hant/developers/engineering-principles)。

---

## 快速開始

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

## 先決條件

### 所有平台

- [Bun](https://bun.sh/) — 套件管理員與執行階段
- [Node.js](https://nodejs.org/) — JavaScript 執行階段（部分工具使用）
- [Git](https://git-scm.com/) — 版本控制

### 桌面版開發

- [Rust](https://rustup.rs/) — Tauri 必備

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
安裝 [Rust](https://rustup.rs/) 與 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)。

### 行動版開發

- [Expo Go](https://expo.dev/client) 應用程式（用於測試）
- Android Studio（用於模擬器／裝置組建）
- Xcode（用於 iOS 開發）

---

## 專案結構

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

公開的使用者與開發者文件維護於本儲存庫的 `docs/` 目錄，並發布至 [docs.mindwtr.app](https://docs.mindwtr.app/)。公開來源位於 [mindwtr-web 的 `docs/` 目錄](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)。新增或遷移指南頁面時，優先使用該文件儲存庫。

公開文件來源：https://github.com/dongdongbh/mindwtr-web/tree/main/docs

---

## 可用指令碼

### 根目錄層級

| 命令 | 說明 |
| --- | --- |
| `bun install` | 安裝所有相依套件 |
| `bun desktop:dev` | 以開發模式執行桌面版 |
| `bun mobile:start` | 啟動 Expo 開發伺服器 |
| `bun mobile:android` | 在 Android 上執行 |
| `bun mobile:ios` | 在 iOS 上執行 |
| `bun test` | 執行所有測試 |
| `bun mindwtr:cli` | 執行 CLI 工具 |
| `bun mindwtr:api` | 執行本機 API 伺服器 |

### 桌面版（`apps/desktop`）

| 命令 | 說明 |
| --- | --- |
| `bun dev` | 以熱重新載入執行開發模式 |
| `bun build` | 建置正式版本 |
| `bun test` | 執行測試 |

### 行動版（`apps/mobile`）

| 命令 | 說明 |
| --- | --- |
| `bun start` | 啟動 Expo 伺服器 |
| `bun android` | 在 Android 上執行 |
| `bun ios` | 在 iOS 上執行 |
| `ARCHS=arm64-v8a bash ./scripts/android_build.sh` | 建置 Android APK |

### 雲端（`apps/cloud`）

| 命令 | 說明 |
| --- | --- |
| `bun dev` | 執行同步伺服器 |

### 核心（`packages/core`）

| 命令 | 說明 |
| --- | --- |
| `bun test` | 執行單元測試 |
| `bun build` | 建置套件 |

---

## 技術堆疊

| 層級 | 桌面版 | 行動版 | 雲端 |
| --- | --- | --- | --- |
| **框架** | React + Vite | React Native + Expo | Bun (Native HTTP) |
| **樣式** | Tailwind CSS | NativeWind (Tailwind) | N/A |
| **狀態** | Zustand（共用） | Zustand（共用） | N/A |
| **平台** | Tauri v2 (Rust) | Expo (iOS/Android) | Bun |
| **路由器** | React Router | Expo Router | N/A |
| **語言** | TypeScript | TypeScript | TypeScript |

---

## 架構決策

我們在 `docs/adr/` 下以 ADR 追蹤重要技術決策。請參閱：
- `docs/adr/README.md`

變更合併或傳輸行為前應瞭解的現行同步 ADR：
- ADR 0003 定義可識別修訂版的同步中繼資料（`rev`、`revBy`），以及具決定性且可識別墓碑的合併。
- ADR 0007 定義已發布的模糊刪除與有效記錄衝突中「有效記錄優先」規則。
- ADR 0008 記錄 Mindwtr 目前刻意維持快照式同步，而不加入差異日誌。

貢獻者應將快照傳輸視為刻意的產品選擇，而非缺少的基礎設施。只有在快照檔案經常超過 5 MB、一般網路的同步往返時間超過 5 秒，或 Mindwtr 需要即時多裝置串流時，才應重新評估 ADR 0008。

---

## 開發工作流程

### 進行變更

1. 建立功能分支
2. 在相關套件中進行變更
3. 執行測試：`bun test`
4. 測試桌面版：`bun desktop:dev`
5. 測試行動版：`bun mobile:start`
6. 使用具體的訊息提交
7. 建立 pull request

新增頂層實體類型時，請在同一項變更中更新完整的持久保存與同步介面：核心 `AppData` 型別與正規化、桌面版 SQLite 結構描述／儲存往返測試、行動版 SQLite 結構描述／備份還原、雲端驗證／正規化、公開時的 MCP 工具，以及 [mindwtr-web 的 `docs/` 目錄](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)中的核心 API 文件來源。

### 程式碼風格

- 所有程式碼使用 TypeScript
- 使用函式式 React 元件
- 優先使用具名匯出
- 公開 API 使用 JSDoc 註解

### 測試

```bash
# Run all tests
bun test

# Run desktop tests
cd apps/desktop && bun test

# Run core tests
cd packages/core && bun test
```

---

## 建置正式版本

### 桌面版

```bash
cd apps/desktop
bun run build
# Output: src-tauri/target/release/
```

### 桌面版（診斷組建）

發行組建預設停用開發者工具。若要啟用診斷／開發者工具，請以 `diagnostics` 功能建置，並在執行階段選擇啟用：

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### 行動版（Android APK）

```bash
cd apps/mobile
ARCHS=arm64-v8a bash ./scripts/android_build.sh
```

詳細建置說明請參閱[行動版安裝](/zh-Hant/start/mobile-installation)。

---

## 架構概覽

詳細技術設計請參閱[架構](/zh-Hant/developers/architecture)。

### 關鍵概念

- **Monorepo：**含共用相依套件的單一儲存庫
- **共用核心：**`@mindwtr/core` 中的商業邏輯
- **平台應用程式：**桌面版與行動版使用共用核心
- **本機儲存：**資料持久保存在本機
- **多種同步方式：**檔案、WebDAV 或雲端同步

---

## CLI 工具

供指令碼與自動化使用的命令列介面：

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

**選項：**
- `--data <path>` — 覆寫 data.json 位置
- `--db <path>` — 覆寫 mindwtr.db 位置
- `MINDWTR_DATA` — 資料路徑環境變數
- `MINDWTR_DB_PATH` — DB 路徑環境變數

在桌面版相容路徑上，CLI 會維持 `mindwtr.db` 與 `data.json` 一致，使變更在應用程式啟動前後都保持可見。

---

## 本機 REST API

執行供指令碼與整合使用的本機 API 伺服器：

```bash
# Start API server
bun mindwtr:api -- --port 4317

# With auth token
MINDWTR_API_TOKEN=secret bun mindwtr:api -- --port 4317
```

本機 API 使用與 CLI 相同的儲存合約，在桌面版相容路徑上維持 `mindwtr.db` 與 `data.json` 同步。

### 端點

| 方法 | 端點 | 說明 |
| --- | --- | --- |
| `GET` | `/health` | 健康狀態檢查 |
| `GET` | `/tasks` | 列出任務 |
| `GET` | `/tasks?status=next` | 依狀態篩選 |
| `GET` | `/tasks?query=@work` | 搜尋任務 |
| `POST` | `/tasks` | 建立任務 |
| `PATCH` | `/tasks/:id` | 更新任務 |
| `DELETE` | `/tasks/:id` | 軟刪除任務 |
| `POST` | `/tasks/:id/complete` | 將任務標示為完成 |
| `POST` | `/tasks/:id/archive` | 將任務標示為封存 |
| `POST` | `/tasks/:id/restore` | 還原已刪除任務 |
| `GET` | `/projects` | 列出專案 |
| `GET` | `/search?query=...` | 搜尋任務與專案 |

**範例：**
```bash
# Add task via API
curl -X POST http://localhost:4317/tasks \
  -H "Content-Type: application/json" \
  -d '{"input": "Review PR @work /due:tomorrow"}'

# Complete task
curl -X POST http://localhost:4317/tasks/<id>/complete
```

---

## 雲端伺服器

自行託管的雲端同步後端：

```bash
# From monorepo root
bun run --filter mindwtr-cloud dev -- --port 8787
```

### 端點

| 方法 | 端點 | 說明 |
| --- | --- | --- |
| `GET` | `/health` | 健康狀態檢查 |
| `HEAD` | `/v1/data` | 取得快照中繼資料 |
| `GET` | `/v1/data` | 取得使用者資料 |
| `PUT` | `/v1/data` | 合併並儲存使用者資料；回傳合併統計 |
| `GET`, `POST` | `/v1/tasks` | 列出或建立任務 |
| `GET`, `PATCH`, `DELETE` | `/v1/tasks/:id` | 讀取、更新或軟刪除任務 |
| `POST` | `/v1/tasks/:id/complete` | 將任務標示為完成 |
| `POST` | `/v1/tasks/:id/archive` | 封存任務 |
| `GET`, `POST` | `/v1/projects` | 列出或建立專案 |
| `GET`, `PATCH`, `DELETE` | `/v1/projects/:id` | 讀取、更新或軟刪除專案 |
| `GET`, `POST` | `/v1/sections` | 列出或建立區段 |
| `GET`, `PATCH`, `DELETE` | `/v1/sections/:id` | 讀取、更新或軟刪除區段 |
| `GET`, `POST` | `/v1/areas` | 列出或建立領域 |
| `GET`, `PATCH`, `DELETE` | `/v1/areas/:id` | 讀取、更新或軟刪除領域 |
| `GET` | `/v1/search` | 搜尋任務與專案 |
| `GET`, `PUT`, `DELETE` | `/v1/attachments/*` | 下載、上傳或刪除附件檔案 |
| `POST`, `DELETE` | `/v1/attachments/orphans` | 掃描或移除孤立附件檔案 |

**驗證身分：**`Authorization: Bearer <token>`

每個 token 都有各自的資料檔案（檔名經 SHA-256 雜湊）。

**環境：**
- `PORT` — 伺服器連接埠（預設 8787）
- `HOST` — 繫結位址（預設 0.0.0.0）
- `MINDWTR_CLOUD_DATA_DIR` — 資料目錄

---

## 網頁應用程式（PWA）

在瀏覽器中執行支援 PWA 的桌面介面：

```bash
# Development
bun desktop:web

# Production build
bun desktop:web:build
```

使用 localStorage 儲存資料，並透過 service worker 支援離線使用。

---

## 另請參閱

- [架構](/zh-Hant/developers/architecture)
- [核心 API](/zh-Hant/developers/core-api)
- [貢獻指南（儲存庫指南）](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
