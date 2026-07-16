# 資料庫結構描述

Mindwtr 刻意維持精簡且便於同步的本機資料模型。桌面應用程式以 SQLite 作為主要儲存區；若平台提供 SQLite，行動版也使用相同的核心結構描述。

SQLite 結構描述的單一事實來源位於：

- `packages/core/src/sqlite-schema.ts`
- `packages/core/src/sqlite-adapter.ts`

本頁提供貢獻者一份實用的結構描述導覽。

---

## 核心資料表

### `tasks`

主要任務記錄，包括 GTD 狀態、排程欄位、檢查清單資料、附件、排序與同步中繼資料。

重要欄位：

- `status`：GTD 分類（`inbox`、`next`、`waiting`、`someday`、`reference`、`done`、`archived`）
- `projectId`、`sectionId`、`areaId`：上層關聯
- `dueDate`、`startTime`、`reviewAt`、`completedAt`：以時間為基礎的工作流程欄位
- `relativeStartOffset`：以 JSON 儲存的提前時間規則，會根據 `dueDate` 重新計算 `startTime`
- `repeatReminderMinutes`：到期時間重複提醒間隔，只能使用支援的預設分鐘值
- `location`：供搜尋、由行事曆建立的任務及推送至行事曆的事件使用的實體／地點情境
- `checklist`、`attachments`、`tags`、`contexts`、`recurrence`：以 JSON 儲存的欄位
- `showFutureRecurrence`：以整數儲存的布林旗標；可在行事曆中啟用一筆僅供規劃的下次發生預覽
- `deletedAt`、`purgedAt`：同步使用的墓碑欄位
- `rev`、`revBy`、`updatedAt`：合併／衝突中繼資料

### `projects`

專案容器及其規劃中繼資料。

重要欄位：

- `status`：`active`、`someday`、`waiting`、`archived`
- `areaId`：選用的上層領域
- `orderNum`：專案在領域內的順序
- `tagIds`、`attachments`：以 JSON 儲存的欄位
- `supportNotes`、`reviewAt`：規劃／回顧欄位
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步中繼資料

### `sections`

專案內用於任務分組的區段。

重要欄位：

- `projectId`：所屬專案
- `orderNum`：區段在專案內的順序
- `isCollapsed`：持久保存的介面狀態
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步中繼資料

### `areas`

較高層級的 GTD 關注領域。

重要欄位：

- `name`、`color`、`icon`
- `orderNum`：手動排序
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步中繼資料

### `people`

用於委派或以人物為中心之工作的受管理受指派者。

重要欄位：

- `name`：任務受指派者建議與 `assigned:` 搜尋使用的顯示名稱
- `note`、`referenceLink`：選用的人物筆記與參考 URL
- `deletedAt`、`rev`、`revBy`、`updatedAt`：同步中繼資料

### `settings`

儲存應用程式設定的單列 JSON 資料表。

- `id = 1`
- `data`：序列化的設定物件

### `saved_filters`

供專注檢視使用的已儲存專注篩選條件定義。

重要欄位：

- `name`、`icon`、`view`：顯示中繼資料
- `criteria`：序列化的篩選條件
- `sortBy`、`sortOrder`：選用的已儲存排序方式
- `createdAt`、`updatedAt`：本機中繼資料

### `calendar_sync`

裝置行事曆推送同步的對應資料表。

重要欄位：

- `task_id`：Mindwtr 任務 ID
- `calendar_event_id`、`calendar_id`：原生行事曆識別碼
- `platform`：對應項目的平台命名空間
- `last_synced_at`：上次成功推送的時間戳記

### `schema_migrations`

追蹤已套用的結構描述版本，以支援累加式遷移。

---

## 全文搜尋資料表

SQLite FTS5 提供桌面版／行動版的本機搜尋功能。

### `tasks_fts`

已建立索引的任務搜尋欄位：

- `title`
- `description`
- `tags`
- `contexts`
- `location`

### `projects_fts`

已建立索引的專案搜尋欄位：

- `title`
- `supportNotes`
- `tagIds`
- `areaTitle`

FTS 資料表由 `packages/core/src/sqlite-schema.ts` 中的觸發程序維護。

---

## 索引

結構描述針對常用介面與同步路徑提供專用索引：

- 任務狀態與刪除篩選
- 任務日期查詢（`dueDate`、`startTime`、`reviewAt`、`completedAt`）
- 任務分組查詢（`projectId`、`areaId`、`sectionId`）
- 專案狀態與領域排序查詢

目前的索引定義位於 `packages/core/src/sqlite-schema.ts` 內的 `SQLITE_INDEX_SCHEMA`。

---

## 驗證規則

SQLite 觸發程序會在寫入時拒絕無效的列舉值與格式錯誤的 JSON。

目前的驗證檢查包括：

- 有效的任務／專案狀態值
- 任務標籤、情境、檢查清單、附件與重複規則的 JSON 有效性
- 專案標籤 ID 與附件的 JSON 有效性

這能使磁碟上的資料庫與 TypeScript 模型一致，並防止部分毀損繞過儲存層。

---

## 同步語意

Mindwtr 的核心實體**不**依賴串聯式關聯刪除。資料模型使用軟刪除墓碑，讓刪除操作能安全地跨裝置同步。

另請參閱：

- [架構](/zh-Hant/developers/architecture)
- [資料與同步](/zh-Hant/data-sync/)
- [同步演算法](/zh-Hant/data-sync/sync-algorithm)
- `docs/adr/0001-sqlite-constraints.md`

---

## 貢獻者注意事項

- 優先採用累加式結構描述變更，不要進行破壞性重寫。
- 新增欄位時，同時更新結構描述與配接器對應邏輯。
- 若新欄位會影響搜尋，請明確更新 FTS 資料表／觸發程序。
- 變更限制條件或刪除行為時，先檢查同步／墓碑的影響。
