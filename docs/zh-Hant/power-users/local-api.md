# 本機 API 伺服器

Mindwtr 內建選用的本機 REST API 伺服器，供指令碼及整合使用。在桌面版中，它於應用程式 binary 內執行，並採用與應用程式相同的本機儲存路徑。儲存庫也提供 Bun 輔助工具，供開發及進階指令碼使用。

---

## 桌面版開關

桌面版組建無須執行原始碼，即可啟動本機 REST API：

- 開啟**設定 -> 進階**。
- 啟用**本機 API 伺服器**。
- 保留預設 port `3456`，或選擇其他 localhost port。
- 從同一張設定卡複製產生的 bearer token。

應用程式只繫結至 `127.0.0.1`，每項要求都必須包含 `Authorization: Bearer <token>`。行動版 binary 不提供本機 REST API 介面。

### 開發輔助工具

若要在桌面版之外執行 API，或指定明確的檔案，仍可使用儲存庫輔助工具。

---

## 快速開始

從桌面版應用程式：

```text
Settings -> Advanced -> Enable local API server
```

預設 URL：

```text
http://127.0.0.1:3456
```

從儲存庫根目錄使用 Bun：

```bash
bun install
bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### 選項

| 選項            | 預設值           | 說明                       |
| --------------- | ---------------- | -------------------------- |
| `--port <n>`    | `4317`           | 伺服器 port                |
| `--host <host>` | `127.0.0.1`      | 繫結位址                   |
| `--data <path>` | 平台預設值       | 覆寫 data.json 位置        |
| `--db <path>`   | 平台預設值       | 覆寫 mindwtr.db 位置       |

### 環境變數

| 變數                | 說明                                                   |
| ------------------- | ------------------------------------------------------ |
| `MINDWTR_DATA`      | 覆寫 data.json 位置（若省略 `--data`）                 |
| `MINDWTR_DB_PATH`   | 覆寫 mindwtr.db 位置（若省略 `--db`）                  |
| `MINDWTR_API_TOKEN` | 僅供 Bun 輔助工具使用：若設定，要求必須包含 `Authorization: Bearer <token>` |

API 預設會使用 Mindwtr 的平台路徑解析 `data.json` 與 `mindwtr.db`（Linux 上優先使用 XDG data）。

---

## 驗證

桌面版的本機 API 要求一律必須使用**設定 -> 進階**中顯示的 bearer token：

```
Authorization: Bearer <token>
```

Bun 輔助工具只有在設定 `MINDWTR_API_TOKEN` 時才要求 token。

---

## 端點

| 方法     | 端點                  | 說明                         |
| -------- | --------------------- | ---------------------------- |
| `GET`    | `/health`             | 健康狀態檢查 → `{ ok: true }` |
| `GET`    | `/tasks`              | 列出任務                     |
| `GET`    | `/tasks?status=next`  | 依狀態篩選                   |
| `GET`    | `/tasks?query=@work`  | 搜尋任務                     |
| `GET`    | `/tasks?all=1`        | 包含已完成／已封存項目       |
| `GET`    | `/tasks?deleted=1`    | 包含已軟刪除項目             |
| `POST`   | `/tasks`              | 建立任務                     |
| `GET`    | `/tasks/:id`          | 取得單一任務                 |
| `PATCH`  | `/tasks/:id`          | 更新任務                     |
| `DELETE` | `/tasks/:id`          | 軟刪除任務                   |
| `POST`   | `/tasks/:id/complete` | 標記為已完成                 |
| `POST`   | `/tasks/:id/archive`  | 標記為已封存                 |
| `POST`   | `/tasks/:id/restore`  | 還原已軟刪除的任務           |
| `GET`    | `/projects`           | 列出專案                     |
| `GET`    | `/areas`              | 列出領域                     |
| `GET`    | `/v1/areas`           | 領域的相容性別名             |
| `GET`    | `/search?query=...`   | 搜尋任務及專案               |

### 回應結構

**Task（部分）**
```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "inbox",
  "projectId": "uuid",
  "dueDate": "2026-01-25T12:00:00.000Z",
  "tags": ["#work"],
  "contexts": ["@email"],
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Project（部分）**
```json
{
  "id": "uuid",
  "title": "Project name",
  "status": "active",
  "color": "#94a3b8",
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Area**
```json
{
  "id": "uuid",
  "name": "Area name",
  "color": "#94a3b8",
  "icon": "briefcase",
  "order": 0,
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z"
}
```

### 建立任務的 Body

```json
{
  "input": "Call Alice",
  "title": "Alternative title",
  "props": {
    "status": "next",
    "contexts": ["@phone"],
    "tags": ["#errands"]
  }
}
```

桌面版有 `title` 時會使用它，否則使用 `input`，並套用明確的 `props`。Bun 輔助工具還會對 `input` 執行 `parseQuickAdd`。

---

## 範例

**列出下一步行動：**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**使用明確的 props 建立：**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**完成任務：**

```bash
curl -s -X POST "http://127.0.0.1:4317/tasks/$TASK_ID/complete" | jq .
```

---

## CLI 工具

也提供較簡單的命令列介面：

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

### CLI 參考

| 命令         | 範例                                         | 說明                                  |
| ------------ | -------------------------------------------- | ------------------------------------- |
| `add`        | `mindwtr:cli -- add "Call mom @phone"`       | 使用快速新增解析                      |
| `list`       | `mindwtr:cli -- list --status next`          | 支援 `--all`、`--deleted`、`--query`  |
| `get`        | `mindwtr:cli -- get <taskId>`                | 輸出完整任務 JSON                     |
| `update`     | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | 套用 JSON patch              |
| `search`     | `mindwtr:cli -- search "@work due:<=7d"`     | 搜尋任務／專案                        |
| `complete`   | `mindwtr:cli -- complete <taskId>`           | 將任務標記為已完成                    |
| `archive`    | `mindwtr:cli -- archive <taskId>`            | 將任務標記為已封存                    |
| `delete`     | `mindwtr:cli -- delete <taskId>`             | 軟刪除任務                            |
| `restore`    | `mindwtr:cli -- restore <taskId>`            | 還原已刪除的任務                      |
| `projects`   | `mindwtr:cli -- projects`                    | 列出使用中的專案                      |

---

## 安全性注意事項

- 伺服器僅供在 `127.0.0.1`（localhost）上執行。除非瞭解相關風險，否則不要公開。
- 桌面版 API 存取需要「設定」中產生的 bearer token。請將該 token 保密。
- 若需要遠端存取 Bun 輔助工具，請設定 `MINDWTR_API_TOKEN`，並將伺服器置於經過驗證的 reverse proxy 後方。

---

## 另請參閱

- [開發人員指南](/zh-Hant/developers/developer-guide)
- [Cloud API](/zh-Hant/developers/cloud-api)
