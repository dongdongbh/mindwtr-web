# MCP 伺服器

Mindwtr 提供選用的 **MCP（Model Context Protocol）**伺服器。你可以將 AI agent（例如 **Claude Desktop**、**Claude Code**、**OpenAI Codex** 或 **Gemini CLI**）連接至本機 Mindwtr 資料庫，或自行託管的 Mindwtr Cloud 端點。

這是 **stdio** 伺服器（沒有託管的 HTTP 端點）。MCP 用戶端會將它啟動為子程序，並透過 stdin/stdout 使用 JSON-RPC 通訊。

> 標準參考文件：[apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md)。MCP 工具或 schema 變更時，請保持本頁與該檔案一致。

---

## 應用程式 Binary 與 MCP 輔助工具

桌面版與行動版 binary 包含 Mindwtr 應用程式，但目前**不包含**桌面版啟動／停止開關。獨立的 MCP 輔助工具以 [`mindwtr-mcp`](https://www.npmjs.com/package/mindwtr-mcp) 發佈，並已列入公開的 [MCP Registry](https://registry.modelcontextprotocol.io/)。

使用 MCP **不需要**從原始碼執行整個應用程式。你可以使用一般桌面版處理任務，再讓 MCP 用戶端透過 `npx` 啟動 `mindwtr-mcp`，或使用 npm 全域安裝。請將輔助工具指向桌面版的本機 `mindwtr.db`。

在桌面版中，應用程式會於**設定 -> 同步 -> 本機資料**顯示確切的本機資料路徑。行動版 binary 不提供本機 MCP 伺服器介面。

---

## 需求

- **Node.js 22+**，可免編譯安裝：SQLite 相依套件提供 Node 22 以上版本的預先組建 binary。Node 20 仍可執行伺服器，但安裝時需要 C++ build tools
- **npm** 或其他 Node package runner，用來執行已發佈的 `mindwtr-mcp` package
- 本機模式需要本機 Mindwtr 資料庫（`mindwtr.db`）；Cloud 模式則需要自行託管的 Mindwtr Cloud URL 及 bearer token
- 只有從原始碼樹執行輔助工具時才需要 **Bun**

### 預設資料庫位置

- **Linux：**`~/.local/share/mindwtr/mindwtr.db`
- **macOS：**`~/Library/Application Support/mindwtr/mindwtr.db`
- **Windows：**`%APPDATA%\mindwtr\mindwtr.db`

沙盒化組建的其他 macOS 路徑：

- `~/Library/Containers/tech.dongdongbh.mindwtr/Data/Library/Application Support/mindwtr/mindwtr.db`

你可以使用下列方式覆寫本機資料庫位置：

- `--db /path/to/mindwtr.db`
- 環境變數：`MINDWTR_DB_PATH` 或 `MINDWTR_DB`

自行託管的 Cloud 模式請使用：

- `--cloud-url https://mindwtr.example.com` 或 `MINDWTR_MCP_CLOUD_URL`
- `--cloud-token <token>` 或 `MINDWTR_MCP_CLOUD_TOKEN`
- 可信賴的私人 HTTP 部署可選用 `--cloud-allow-insecure-http=true`

---

## 設定與組態

MCP 用戶端會將伺服器當成子程序執行。請指定**命令**並傳入引數。

建議 MCP 用戶端使用下列免安裝命令：

```json
{
  "command": "npx",
  "args": [
    "-y",
    "mindwtr-mcp",
    "--db",
    "/path/to/mindwtr.db"
  ]
}
```

此 package 預設為唯讀。只有明確希望 AI 用戶端新增、更新、完成或刪除 Mindwtr 資料時，才加入 `--write`。

### 自行託管 Cloud 模式

若你執行自己的 Mindwtr Cloud 伺服器，且希望使用 MCP 工具而不公開本機 SQLite 檔案，請使用 Cloud 模式：

```bash
npx -y mindwtr-mcp \
  --cloud-url "https://mindwtr.example.com" \
  --cloud-token "$MINDWTR_TOKEN"
```

也可在 MCP 用戶端組態中使用環境變數：

```json
{
  "command": "npx",
  "args": ["-y", "mindwtr-mcp"],
  "env": {
    "MINDWTR_MCP_CLOUD_URL": "https://mindwtr.example.com",
    "MINDWTR_MCP_CLOUD_TOKEN": "your-token"
  }
}
```

Cloud 模式會從自行託管的 Cloud 伺服器讀取目前的 `/v1/data` 快照，並提供任務、專案、分區、領域及人員的讀取工具。使用 `--write` 時，任務、專案、分區及領域的寫入會經過 Cloud 伺服器各項資源的 [REST 端點](/zh-Hant/developers/cloud-api)（`POST /v1/tasks`、`PATCH /v1/tasks/:id` 等），因此每項編輯都會獲得與應用程式編輯相同的驗證及修訂追蹤。若沒有 `--write`，寫入工具會回傳 `read_only`。Cloud 模式目前無法編輯人員或還原已刪除的任務；這些操作請使用本機資料庫後端。

這並不是目前受阻的託管式多租戶 connector。Cloud 伺服器及 MCP 輔助工具仍由你自行執行；Mindwtr 不會營運儲存所有人任務資料的服務。

若要改用全域安裝：

```bash
npm install -g mindwtr-mcp
mindwtr-mcp --db "/path/to/mindwtr.db"
```

### 主要引數

- `--db "/path/to/mindwtr.db"`：本機模式的 SQLite 資料庫路徑。
- `--write`：在本機或 Cloud 模式中啟用寫入操作（新增、更新、完成、刪除）。**若沒有此 flag，伺服器為唯讀。**
- `--cloud-url "https://mindwtr.example.com"`：使用自行託管的 Mindwtr Cloud 端點，而非本機資料庫。
- `--cloud-token "<token>"`：自行託管 Cloud 端點的 bearer token。
- `--cloud-allow-insecure-http=true`：刻意不使用 HTTPS 時，允許可信賴的私人 HTTP Cloud URL。

### 1. Claude Desktop

在 Claude Desktop 組態檔中加入伺服器項目。

- **macOS：**`~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows：**`%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "~/.local/share/mindwtr/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

_注意：請將 DB 路徑換成實際的本機 Mindwtr 資料庫路徑。_

### 2. Claude Code（CLI）

你可以透過 CLI 加入伺服器：

```bash
claude mcp add mindwtr -- \
  npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 3. OpenAI Codex（CLI／IDE Extension）

Codex 從 `~/.codex/config.toml` 讀取 MCP 伺服器組態。你也可以在受信任的專案中使用專案範圍的 `.codex/config.toml`。Codex CLI 與 IDE extension 共用此組態。

**命令列：**

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db"
```

只有希望 Codex 修改本機 Mindwtr 資料時，才加入 `--write`：

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

在 Codex TUI 中執行 `/mcp`，確認伺服器已啟用。

**手動組態：**

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db"
]
```

具備寫入權限：

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db",
  "--write"
]
```

### 4. Gemini CLI

Gemini CLI 使用 `settings.json`（使用者：`~/.gemini/settings.json`；專案：`.gemini/settings.json`）。

**命令列：**

```bash
gemini mcp add mindwtr \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

**手動組態：**

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "/path/to/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

---

## 手動執行

通常不需要手動執行（MCP 用戶端會代為執行），但手動執行有助於測試。

### 從 npm 執行

```bash
# Read-only
npx -y mindwtr-mcp --db "/path/to/mindwtr.db"

# With write access
npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 從原始碼執行（Bun）

```bash
# Read-only
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db"

# With write access
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db" --write
```

### 組建及執行（Node）

```bash
# Build
bun run --filter mindwtr-mcp build

# Run
node apps/mcp-server/dist/index.js --db "/path/to/mindwtr.db"
```

---

## 遷移：工具重新命名（`mindwtr.*` → `mindwtr_*`）

工具名稱目前採用底線標記法，例如 `mindwtr_list_tasks`；不再記錄舊的點號標記法名稱。

---

## 可用工具

連線後，AI agent 可使用下列工具。伺服器預設為**唯讀**；必須傳入 `--write`，才能啟用任何寫入工具。
寫入權限只支援 `--write`（沒有其他別名）。

| 工具                     | 操作               | 需要 `--write` |
| ------------------------ | ------------------ | -------------- |
| `mindwtr_list_tasks`     | 列出任務           | 否             |
| `mindwtr_list_projects`  | 列出專案           | 否             |
| `mindwtr_get_project`    | 取得單一專案       | 否             |
| `mindwtr_list_sections`  | 列出分區           | 否             |
| `mindwtr_get_section`    | 取得單一分區       | 否             |
| `mindwtr_list_areas`     | 列出領域           | 否             |
| `mindwtr_list_people`    | 列出人員           | 否             |
| `mindwtr_get_person`     | 取得單一人員       | 否             |
| `mindwtr_get_task`       | 依 ID 取得單一任務 | 否             |
| `mindwtr_add_task`       | 建立任務           | 是             |
| `mindwtr_update_task`    | 更新任務           | 是             |
| `mindwtr_complete_task`  | 標記為已完成       | 是             |
| `mindwtr_delete_task`    | 軟刪除任務         | 是             |
| `mindwtr_restore_task`   | 還原任務           | 是             |
| `mindwtr_add_project`    | 建立專案           | 是             |
| `mindwtr_update_project` | 更新專案           | 是             |
| `mindwtr_delete_project` | 軟刪除專案         | 是             |
| `mindwtr_add_section`    | 建立分區           | 是             |
| `mindwtr_update_section` | 更新分區           | 是             |
| `mindwtr_delete_section` | 軟刪除分區         | 是             |
| `mindwtr_add_area`       | 建立領域           | 是             |
| `mindwtr_update_area`    | 更新領域           | 是             |
| `mindwtr_delete_area`    | 軟刪除領域         | 是             |
| `mindwtr_add_person`     | 建立人員           | 是             |
| `mindwtr_update_person`  | 更新人員           | 是             |
| `mindwtr_rename_person`  | 重新命名人員       | 是             |
| `mindwtr_delete_person`  | 軟刪除人員         | 是             |

### 讀取工具

- **`mindwtr_list_tasks`**：使用篩選條件（狀態、專案、日期範圍、搜尋）列出任務。
- **`mindwtr_list_projects`**：列出所有專案。
- **`mindwtr_get_project`**：依 ID 取得特定專案的詳細資料。
- **`mindwtr_list_sections`**：列出專案分區，也可依專案篩選。
- **`mindwtr_get_section`**：依 ID 取得特定分區的詳細資料。
- **`mindwtr_list_areas`**：列出所有領域。
- **`mindwtr_list_people`**：列出受管理的人員記錄。
- **`mindwtr_get_person`**：依 ID 取得特定人員的詳細資料。
- **`mindwtr_get_task`**：依 ID 取得特定任務的詳細資料。

### 寫入工具（需要 `--write`）

寫入工具可用於本機資料庫及自行託管的 Cloud 後端，但 Cloud 模式有兩項例外：人員寫入工具及 `mindwtr_restore_task` 會傳回明確錯誤，因為 Cloud API 目前尚無相應端點。

- **`mindwtr_add_task`**：建立新任務。支援自然語言 `quickAdd`（例如「Buy milk @errands /due:tomorrow」）。
- **`mindwtr_update_task`**：更新現有任務，包括 `dueDate`、`startTime`、`reviewAt` 及 `isFocusedToday` 等排程欄位（支援使用 `null` 清除欄位）。
- **`mindwtr_complete_task`**：將任務標記為已完成。
- **`mindwtr_delete_task`**：軟刪除任務。
- **`mindwtr_restore_task`**：還原已軟刪除的任務。
- **`mindwtr_add_project`**：建立新專案，可選用 `dueDate` 及 `reviewAt`。
- **`mindwtr_update_project`**：更新專案，可選用 `dueDate` 及 `reviewAt`。
- **`mindwtr_delete_project`**：軟刪除專案。
- **`mindwtr_add_section`**：在專案內建立分區。
- **`mindwtr_update_section`**：更新專案分區。
- **`mindwtr_delete_section`**：軟刪除專案分區。該分區中的任務會保留，並由 core 移至無分區狀態。
- **`mindwtr_add_area`**：建立新領域。
- **`mindwtr_update_area`**：更新領域。
- **`mindwtr_delete_area`**：軟刪除領域。
- **`mindwtr_add_person`**：建立受管理的人員，供受指派者及等待中任務使用。
- **`mindwtr_update_person`**：更新受管理人員的中繼資料。
- **`mindwtr_rename_person`**：重新命名受管理人員，也可更新完全相符的任務指派。
- **`mindwtr_delete_person`**：軟刪除受管理人員，但不清除任務指派。

Schema 注意事項：
- 任務寫入工具涵蓋 `dueDate`、`startTime`，更新時也涵蓋 `reviewAt`。
- 專案寫入工具同時涵蓋 `dueDate` 及 `reviewAt`。
- 人員寫入工具涵蓋 `name`、`note`、`referenceLink`，重新命名時也可更新指派。
- 確切的標準輸入請參閱 [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md)。

## 權限矩陣

決定要以唯讀模式或 `--write` 執行伺服器時，請參考此矩陣。

| 工具                     | 資料存取           | 修改類型         | 唯讀模式 | `--write` 模式 |
| ------------------------ | ------------------ | ---------------- | -------- | -------------- |
| `mindwtr_list_tasks`     | 任務列（已篩選）   | 無               | 允許     | 允許           |
| `mindwtr_list_projects`  | 專案列             | 無               | 允許     | 允許           |
| `mindwtr_get_project`    | 依 ID 取得單一專案 | 無               | 允許     | 允許           |
| `mindwtr_list_sections`  | 分區列             | 無               | 允許     | 允許           |
| `mindwtr_get_section`    | 依 ID 取得單一分區 | 無               | 允許     | 允許           |
| `mindwtr_list_areas`     | 領域列             | 無               | 允許     | 允許           |
| `mindwtr_list_people`    | 人員列             | 無               | 允許     | 允許           |
| `mindwtr_get_person`     | 依 ID 取得單一人員 | 無               | 允許     | 允許           |
| `mindwtr_get_task`       | 依 ID 取得單一任務 | 無               | 允許     | 允許           |
| `mindwtr_add_task`       | 任務資料表         | 插入             | 拒絕     | 允許           |
| `mindwtr_update_task`    | 任務資料表         | 更新             | 拒絕     | 允許           |
| `mindwtr_complete_task`  | 任務資料表         | 更新狀態         | 拒絕     | 允許           |
| `mindwtr_delete_task`    | 任務資料表         | 軟刪除           | 拒絕     | 允許           |
| `mindwtr_restore_task`   | 任務資料表         | 還原軟刪除       | 拒絕     | 允許           |
| `mindwtr_add_project`    | 專案資料表         | 插入             | 拒絕     | 允許           |
| `mindwtr_update_project` | 專案資料表         | 更新             | 拒絕     | 允許           |
| `mindwtr_delete_project` | 專案資料表         | 軟刪除           | 拒絕     | 允許           |
| `mindwtr_add_section`    | 分區資料表         | 插入             | 拒絕     | 允許           |
| `mindwtr_update_section` | 分區資料表         | 更新             | 拒絕     | 允許           |
| `mindwtr_delete_section` | 分區資料表         | 軟刪除           | 拒絕     | 允許           |
| `mindwtr_add_area`       | 領域資料表         | 插入             | 拒絕     | 允許           |
| `mindwtr_update_area`    | 領域資料表         | 更新             | 拒絕     | 允許           |
| `mindwtr_delete_area`    | 領域資料表         | 軟刪除           | 拒絕     | 允許           |
| `mindwtr_add_person`     | 人員資料表         | 插入             | 拒絕     | 允許           |
| `mindwtr_update_person`  | 人員資料表         | 更新             | 拒絕     | 允許           |
| `mindwtr_rename_person`  | 人員資料表／任務   | 重新命名／更新參照 | 拒絕   | 允許           |
| `mindwtr_delete_person`  | 人員資料表         | 軟刪除           | 拒絕     | 允許           |

實務建議：

- 探索及製作報告時，預設使用唯讀模式。
- 只有你信任 AI 用戶端可編輯該後端時，才啟用 `--write`：本機資料庫或你自己的 Cloud 伺服器。
- Agent 工作流程在執行刪除／完成操作前，最好要求明確確認。

## 進階使用範例

### 1）引導式每週回顧

1. 呼叫 `mindwtr_list_tasks`，使用 `status: "waiting"` 及 `status: "someday"`。
2. 依專案摘要停滯項目。
3. 對所選項目呼叫 `mindwtr_update_task`，設定 `reviewAt`。

### 2）收集箱分類工作階段

1. 呼叫 `mindwtr_list_tasks`，使用 `status: "inbox"` 及 `sortBy: "createdAt"`。
2. 對每項任務使用 `mindwtr_update_task` 分類（`next`、`waiting`、`reference` 等）。
3. 第二輪再補上缺少的中繼資料（專案、情境、標籤）。

### 3）安全批次關閉模式

對於可能造成破壞的自動化：

1. 執行讀取階段：只列出候選 ID。
2. 顯示確認摘要（數量及標題）。
3. 只有取得使用者明確核准後，才執行寫入（`complete_task`／`delete_task`）。
4. 保留 ID，以便透過 `restore_task` 回復。

### 4）以自然語言快速收集

使用 `mindwtr_add_task` + `quickAdd`：

```json
{
  "quickAdd": "Follow up with Alex +Hiring @work #ops /due:tomorrow 10am"
}
```

若在快速收集流程中，使用解析命令比手動設定每個欄位更有效率，就適合採用此方式。

---

## 工具參考

所有工具都在 `content.text` 欄位中傳回 JSON。請解析 JSON 以取得實際 payload。

## 操作限制

將 Mindwtr 接入 agent 工作流程時，請留意下列限制：

- `mindwtr_list_tasks` 預設為 `limit: 200`，且 `limit` 上限為 `500`。
- MCP 任務建立／更新驗證會將任務標題限制在 `500` 個字元。
- MCP 任務建立會將快速新增輸入限制在 `2000` 個字元，與 cloud task API 的快速新增限制相同。
- SQLite layer 使用 5 秒的 `busy_timeout`，因此資料庫鎖定時應會失敗，而不是無限期停滯。

若需要超過 500 項任務，請以 `limit` + `offset` 分頁，不要期待一次取得無上限的回應。

### `mindwtr_list_tasks`

**輸入欄位**

- `status`：`inbox | next | waiting | someday | reference | done | archived | all`
- `projectId`：string
- `includeDeleted`：boolean
- `limit`：number
- `offset`：number
- `search`：string
- `dueDateFrom`：ISO date 或 datetime string（依日曆日期比較）
- `dueDateTo`：ISO date 或 datetime string（依日曆日期比較）
- `sortBy`：`updatedAt | createdAt | dueDate | title | priority`
- `sortOrder`：`asc | desc`

**範例**

```json
{
  "status": "next",
  "limit": 20,
  "offset": 0,
  "sortBy": "updatedAt",
  "sortOrder": "desc"
}
```

**回應**

```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "title": "Follow up with design",
      "status": "next",
      "updatedAt": "2026-01-25T03:45:57.246Z"
    }
  ]
}
```

### `mindwtr_list_projects`

**輸入欄位**

- 無

**回應**

```json
{
  "projects": [
    {
      "id": "project-uuid",
      "title": "Mindwtr",
      "status": "active"
    }
  ]
}
```

### `mindwtr_get_project`

**輸入欄位**

- `id`：string（project UUID）
- `includeDeleted`：boolean（選用）

**範例**

```json
{ "id": "project-uuid" }
```

### `mindwtr_list_sections`

**輸入欄位**

- `projectId`：string（選用）
- `includeDeleted`：boolean（選用）

**回應**

```json
{
  "sections": [
    {
      "id": "section-uuid",
      "projectId": "project-uuid",
      "title": "Planning"
    }
  ]
}
```

### `mindwtr_get_section`

**輸入欄位**

- `id`：string（section UUID）
- `includeDeleted`：boolean（選用）

**範例**

```json
{ "id": "section-uuid" }
```

### `mindwtr_list_areas`

**輸入欄位**

- 無

**回應**

```json
{
  "areas": [
    {
      "id": "area-uuid",
      "name": "Work"
    }
  ]
}
```

### `mindwtr_list_people`

**輸入欄位**

- `includeDeleted`：boolean（選用）

**回應**

```json
{
  "people": [
    {
      "id": "person-uuid",
      "name": "Alex"
    }
  ]
}
```

### `mindwtr_get_person`

**輸入欄位**

- `id`：string（person UUID）
- `includeDeleted`：boolean（選用）

**範例**

```json
{ "id": "person-uuid" }
```

### `mindwtr_get_task`

**輸入欄位**

- `id`：string（task UUID）
- `includeDeleted`：boolean（選用）

**範例**

```json
{ "id": "task-uuid" }
```

### `mindwtr_add_task`（寫入）

**輸入欄位**

- `title`：string（省略 `quickAdd` 時必填）
- `quickAdd`：string（省略 `title` 時必填）
- `status`：`inbox | next | waiting | someday | reference | done | archived`
- `projectId`：string
- `dueDate`：ISO string
- `startTime`：ISO string
- `contexts`：string[]
- `tags`：string[]
- `description`：string
- `priority`：string
- `timeEstimate`：string（例如 `30m`、`2h`）

**範例**

```json
{
  "quickAdd": "Send invoice +Acme /due:tomorrow 9am #finance"
}
```

### `mindwtr_update_task`（寫入）

**輸入欄位**

- `id`：string（task UUID）
- `title`、`status`、`projectId`、`dueDate`、`startTime`、`contexts`、`tags`、`description`、`priority`、`timeEstimate`、`reviewAt`、`isFocusedToday`

**注意事項**

- 使用 `null` 清除可為 null 的欄位。這適用於 `projectId`、`dueDate`、`startTime`、`contexts` 及 `tags` 等任務欄位；`areaId`、`dueDate`、`reviewAt` 及 `supportNotes` 等專案欄位；分區的 `description`；領域的 `color` 及 `icon`；以及人員的 `note` 及 `referenceLink`。

**範例**

```json
{
  "id": "task-uuid",
  "status": "waiting",
  "reviewAt": "2026-01-27T09:00:00.000Z"
}
```

### `mindwtr_complete_task`（寫入）

**輸入欄位**

- `id`：string（task UUID）

### `mindwtr_delete_task`（寫入）

**輸入欄位**

- `id`：string（task UUID）

### `mindwtr_restore_task`（寫入）

**輸入欄位**

- `id`：string（task UUID）

### `mindwtr_add_project`（寫入）

**輸入欄位**

- `title`：string
- `color`：string（選用）
- `status`：`active | someday | waiting | archived`（選用）
- `areaId`：string 或 `null`
- `isSequential`：boolean（選用）
- `isFocused`：boolean（選用）
- `dueDate`：ISO string 或 `null`
- `reviewAt`：ISO string 或 `null`
- `supportNotes`：string 或 `null`

### `mindwtr_update_project`（寫入）

**輸入欄位**

- `id`：string（project UUID）
- `title`、`color`、`status`、`areaId`、`isSequential`、`isFocused`、`dueDate`、`reviewAt`、`supportNotes`

### `mindwtr_delete_project`（寫入）

**輸入欄位**

- `id`：string（project UUID）

### `mindwtr_add_section`（寫入）

**輸入欄位**

- `projectId`：string
- `title`：string
- `description`：string 或 `null`（選用）
- `order`：number（選用）
- `isCollapsed`：boolean（選用）

### `mindwtr_update_section`（寫入）

**輸入欄位**

- `id`：string（section UUID）
- `title`、`description`、`order`、`isCollapsed`

### `mindwtr_delete_section`（寫入）

**輸入欄位**

- `id`：string（section UUID）

### `mindwtr_add_area`（寫入）

**輸入欄位**

- `name`：string
- `color`：string（選用）
- `icon`：string（選用）

### `mindwtr_update_area`（寫入）

**輸入欄位**

- `id`：string（area UUID）
- `name`、`color`、`icon`

### `mindwtr_delete_area`（寫入）

**輸入欄位**

- `id`：string（area UUID）

### `mindwtr_add_person`（寫入）

**輸入欄位**

- `name`：string
- `note`：string 或 `null`（選用）
- `referenceLink`：string 或 `null`（選用）

### `mindwtr_update_person`（寫入）

**輸入欄位**

- `id`：string（person UUID）
- `name`、`note`、`referenceLink`

### `mindwtr_rename_person`（寫入）

**輸入欄位**

- `id`：string（person UUID）
- `name`：string
- `updateTasks`：boolean（選用）

### `mindwtr_delete_person`（寫入）

**輸入欄位**

- `id`：string（person UUID）

---

## 輸出格式注意事項

- 工具輸出是 JSON string，而非結構化 MCP 值。用戶端應解析 `content[0].text`。
- 任務／專案 ID 是來自本機 SQLite 資料庫的 UUID。
- 日期採用 ISO 8601 string（UTC）。

---

## 安全性與注意事項

- **並行處理：**伺服器使用 SQLite WAL 模式。若 DB 已鎖定，寫入可能失敗；用戶端應重試。
- **共用邏輯：**寫入操作使用共用的 `@mindwtr/core` 函式庫，確保套用商業規則。
- **保持執行：**只要 `stdin` 維持開啟，伺服器就會繼續執行。

## 疑難排解

- **"Command not found"**：在 MCP 用戶端組態中使用 `npx -y mindwtr-mcp`，或使用 `npm install -g mindwtr-mcp` 全域安裝 package。
- **用戶端連線問題**：確認 MCP 用戶端組態中的命令**不是** `bun run`，因為它可能輸出額外文字。建議使用 `npx -y mindwtr-mcp`；若使用原始碼簽出版本，請直接以 `bun` 執行原始碼檔案，或以 `node` 執行組建後的檔案。
