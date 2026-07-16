# Core API

`@mindwtr/core` 套件的 API 文件。

---

## 安裝

核心套件由桌面版與行動版應用程式在內部使用：

```typescript
import {
    useTaskStore,
    setStorageAdapter,
    parseQuickAdd,
    mergeAppData
} from '@mindwtr/core';
```

---

## 型別

### Task

```typescript
type RelativeStartOffsetUnit = 'minute' | 'hour' | 'day' | 'week';

interface RelativeStartOffset {
    amount: number;                  // Offset <= 0, e.g. -3 days before due; 0 = on the due date
    unit: RelativeStartOffsetUnit;
}

interface Task {
    id: string;                    // UUID
    title: string;                 // Task title
    status: TaskStatus;            // Current status
    taskMode?: 'task' | 'list';    // 'list' = checklist-first task
    priority?: TaskPriority;       // 'low' | 'medium' | 'high' | 'urgent'
    energyLevel?: TaskEnergyLevel; // 'low' | 'medium' | 'high'
    assignedTo?: string;           // Waiting-for person
    startTime?: string;            // ISO date string
    relativeStartOffset?: RelativeStartOffset; // Recomputes startTime from dueDate
    dueDate?: string;              // ISO date string
    recurrence?: Recurrence | RecurrenceRule;
    showFutureRecurrence?: boolean; // Calendar-only preview of the next recurring occurrence
    tags: string[];                // e.g., ['#focused']
    contexts: string[];            // e.g., ['@home', '@work']
    checklist?: ChecklistItem[];   // Sub-items
    description?: string;          // Notes
    attachments?: Attachment[];    // Files/Links
    location?: string;             // Physical location
    projectId?: string;            // Parent project ID
    sectionId?: string;            // Parent section ID
    areaId?: string;               // Parent area ID (optional direct grouping)
    isFocusedToday?: boolean;      // Today's priority
    pushCount?: number;            // Number of times due date was pushed later
    repeatReminderMinutes?: number; // Due-time repeat reminder preset: 5, 10, 15, 30, or 60
    textDirection?: 'auto' | 'ltr' | 'rtl';
    timeEstimate?: TimeEstimate;   // '5min' | '10min' | '15min' | '30min' | '1hr' | '2hr' | '3hr' | '4hr' | '4hr+'
    reviewAt?: string;             // Tickler date
    completedAt?: string;          // When completed
    rev?: number;                  // Monotonic revision counter for sync
    revBy?: string;                // Device ID that issued `rev`
    createdAt: string;             // Creation timestamp
    updatedAt: string;             // Last update timestamp
    deletedAt?: string;            // Soft-delete timestamp
    purgedAt?: string;             // Permanently deleted (tombstone only)
    orderNum?: number;             // Manual sort order
}
```

### TaskStatus

```typescript
type TaskStatus =
    | 'inbox'
    | 'next'
    | 'waiting'
    | 'someday'
    | 'reference'
    | 'done'
    | 'archived';
```

### Recurrence

```typescript
type RecurrenceRule = 'daily' | 'weekly' | 'monthly' | 'yearly';
type RecurrenceStrategy = 'strict' | 'fluid';
type RecurrenceWeekday = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
type RecurrenceByDay = RecurrenceWeekday | `${'1' | '2' | '3' | '4' | '-1'}${RecurrenceWeekday}`;

interface Recurrence {
    rule: RecurrenceRule;
    strategy?: RecurrenceStrategy;      // Defaults to 'strict'
    byDay?: RecurrenceByDay[];          // Weekly/monthly weekday pattern
    count?: number;                     // Total occurrences in the series, including the current task
    until?: string;                     // ISO date/datetime when the series should stop
    completedOccurrences?: number;      // Internal counter used to preserve COUNT across generated tasks
    rrule?: string;                     // Optional RFC 5545 fragment
}
```

- `strategy: 'strict'` 會讓規劃頻率固定依循排程。
- `strategy: 'fluid'` 表示「完成後重複」。
- `count` 會在建立指定的發生總次數後停止系列。
- 當下一個產生的任務將落在指定日期／時間之後時，`until` 會停止系列。
- `completedOccurrences` 是內部使用且可安全同步的中繼資料；用戶端在往返傳遞重複規則物件時應予以保留。
- `showFutureRecurrence` 屬於任務，而非重複規則物件。它會要求行事曆顯示一筆僅供規劃的下次發生項目；用戶端在往返傳遞任務時應保留此布林值。

### Project

```typescript
interface Project {
    id: string;
    title: string;
    status: 'active' | 'someday' | 'waiting' | 'archived';
    color: string;                 // Hex color code
    areaId?: string;               // Parent Area ID
    tagIds: string[];              // Associated tags
    order: number;                 // Sort order within area
    isSequential?: boolean;        // Show only first task in Next Actions
    isFocused?: boolean;           // Priority project (max 5)
    supportNotes?: string;         // Planning notes
    attachments?: Attachment[];    // Files/Links
    reviewAt?: string;             // Tickler date
    rev?: number;                  // Monotonic revision counter for sync
    revBy?: string;                // Device ID that issued `rev`
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
```

### Section

```typescript
interface Section {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    order: number;                 // Sort order within project
    isCollapsed?: boolean;         // UI collapsed state
    rev?: number;                  // Monotonic revision counter for sync
    revBy?: string;                // Device ID that issued `rev`
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;            // Soft-delete timestamp
}
```

### Area

```typescript
interface Area {
    id: string;
    name: string;
    color?: string;
    icon?: string;
    order: number;
    rev?: number;
    revBy?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;            // Soft-delete tombstone for sync
}
```

### Person

```typescript
interface Person {
    id: string;
    name: string;
    note?: string;
    referenceLink?: string;
    rev?: number;                  // Monotonic revision counter for sync
    revBy?: string;                // Device ID that issued `rev`
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;            // Soft-delete tombstone for sync
}
```

### Attachment

```typescript
interface Attachment {
    id: string;
    kind: 'file' | 'link';
    title: string;
    uri: string;
    mimeType?: string;
    size?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
```

### AppData

```typescript
interface AppData {
    tasks: Task[];
    projects: Project[];
    sections: Section[];
    areas: Area[];
    people?: Person[];
    settings: {
        theme?: 'light' | 'dark' | 'system';
        language?: 'en' | 'vi' | 'zh' | 'zh-Hant' | 'es' | 'hi' | 'ar' | 'de' | 'ru' | 'ja' | 'fr' | 'pt' | 'pl' | 'ko' | 'cs' | 'it' | 'tr' | 'nl' | 'system';
        weekStart?: 'system' | 'monday' | 'sunday' | 'saturday'; // absent or 'system' = follow the device locale
        dateFormat?: string;
        timeFormat?: string;
        filters?: { areaId?: string };
        syncPreferences?: SettingsSyncPreferences;
        attachments?: {
            lastCleanupAt?: string;
            pendingRemoteDeletes?: PendingRemoteAttachmentDelete[];
        };
        externalCalendars?: ExternalCalendarSubscription[];
        calendar?: { viewMode?: 'month' | 'day' | 'week' | 'schedule' };
        gtd?: {
            defaultScheduleTime?: string;
            inboxProcessing?: InboxProcessingSettings;
            weeklyReview?: { includeContextStep?: boolean };
            dailyReview?: { includeFocusStep?: boolean };
            pomodoro?: PomodoroSettings;
        };
        ai?: {
            enabled?: boolean;
            provider?: 'gemini' | 'openai' | 'anthropic';
            model?: string;
            reasoningEffort?: 'low' | 'medium' | 'high';
            speechToText?: SpeechToTextSettings;
        };
    };
}
```

---

## 儲存區

### useTaskStore

用於存取狀態與動作的 Zustand 儲存區 hook。

```typescript
import { useTaskStore } from '@mindwtr/core';

function MyComponent() {
    const { tasks, projects, addTask, updateTask } = useTaskStore();
    // ...
}
```

### 儲存區狀態

| 屬性        | 型別                  | 說明                         |
| ----------- | --------------------- | ---------------------------- |
| `tasks`     | `Task[]`              | 所有可見（未刪除）的任務     |
| `projects`  | `Project[]`           | 所有可見的專案               |
| `areas`     | `Area[]`              | 所有領域                     |
| `people`    | `Person[]`            | 所有可見的受管理人物         |
| `settings`  | `AppData['settings']` | 應用程式設定                 |
| `isLoading` | `boolean`             | 載入狀態                     |
| `error`     | `string \| null`      | 錯誤訊息                     |

### 儲存區動作

對於一般驗證失敗，大多數會變更資料的儲存區動作會回傳結構化結果，而非擲回錯誤：

```typescript
type StoreActionResult = {
    success: boolean;
    error?: string;
    id?: string;
};
```

#### 任務操作

```typescript
// Create
addTask(title: string, initialProps?: Partial<Task>): Promise<StoreActionResult>;

// Update
updateTask(id: string, updates: Partial<Task>): Promise<StoreActionResult>;

// Move
moveTask(id: string, newStatus: TaskStatus): Promise<StoreActionResult>;

// Delete (Soft)
deleteTask(id: string): Promise<StoreActionResult>;

// Restore
restoreTask(id: string): Promise<StoreActionResult>;

// Duplicate
duplicateTask(id: string, asNextAction?: boolean): Promise<StoreActionResult>;

// Reset Checklist
resetTaskChecklist(id: string): Promise<StoreActionResult>;

// Batch Operations
batchUpdateTasks(updates: Array<{ id: string; updates: Partial<Task> }>): Promise<StoreActionResult>;
batchMoveTasks(ids: string[], newStatus: TaskStatus): Promise<StoreActionResult>;
batchDeleteTasks(ids: string[]): Promise<StoreActionResult>;
```

#### 專案操作

```typescript
// Create
addProject(title: string, color: string, initialProps?: Partial<Project>): Promise<Project | null>;

// Update
updateProject(id: string, updates: Partial<Project>): Promise<StoreActionResult>;

// Delete
deleteProject(id: string): Promise<StoreActionResult>;

// Restore
restoreProject(id: string): Promise<StoreActionResult>;

// Toggle Focus
toggleProjectFocus(id: string): Promise<void>;

// Reorder
reorderProjects(orderedIds: string[], areaId?: string): Promise<void>;
reorderProjectTasks(projectId: string, orderedIds: string[], sectionId?: string | null): Promise<void>;
```

#### 領域操作

```typescript
// Create
addArea(name: string, initialProps?: Partial<Area>): Promise<Area | null>;

// Update
updateArea(id: string, updates: Partial<Area>): Promise<StoreActionResult>;

// Delete (soft, detaches linked projects/tasks)
deleteArea(id: string): Promise<StoreActionResult>;

// Restore (restores the area tombstone only)
restoreArea(id: string): Promise<StoreActionResult>;

// Reorder
reorderAreas(orderedIds: string[]): Promise<void>;
```

領域的刪除／還原刻意避免串聯建立墓碑。刪除領域會清除已連結專案的 `areaId` 與 `areaTitle`，並清除任務直接設定的 `areaId` 值；區段與專案任務仍會附屬於其專案。還原領域不會重新指派在該領域刪除期間被解除關聯的子項目。

#### 人物操作

```typescript
// Create
addPerson(name: string, initialProps?: Partial<Person>): Promise<Person | null>;

// Update metadata
updatePerson(id: string, updates: Partial<Person>): Promise<StoreActionResult>;

// Rename and optionally update exact task assignments
renamePerson(id: string, name: string, options?: { updateTasks?: boolean }): Promise<StoreActionResult>;

// Delete (soft, does not clear task assignments)
deletePerson(id: string): Promise<StoreActionResult>;
```

#### 區段操作

```typescript
// Create
addSection(projectId: string, title: string, initialProps?: Partial<Section>): Promise<Section | null>;

// Update
updateSection(id: string, updates: Partial<Section>): Promise<StoreActionResult>;

// Delete
deleteSection(id: string): Promise<StoreActionResult>;

// Restore
restoreSection(id: string): Promise<StoreActionResult>;
```

#### 標籤操作

```typescript
// Delete (from all tasks and projects)
deleteTag(tagId: string): Promise<void>;
```

#### 資料操作

```typescript
// Load
fetchData(): Promise<void>;

// Settings
updateSettings(updates: Partial<AppData['settings']>): Promise<void>;
```

---

## 儲存配接器

### setStorageAdapter

設定儲存後端。

```typescript
import { setStorageAdapter } from '@mindwtr/core';

// Must be called before using the store
setStorageAdapter(myStorageAdapter);
```

### StorageAdapter 介面

```typescript
interface StorageAdapter {
    getData: () => Promise<AppData>;
    saveData: (data: AppData) => Promise<void>;
    queryTasks?: (options: TaskQueryOptions) => Promise<Task[]>;
}
```

---

## 快速新增剖析器

### parseQuickAdd

剖析自然語言任務輸入。

```typescript
import { parseQuickAdd } from '@mindwtr/core';

const result = parseQuickAdd(input: string, projects?: Project[]);
```

### 語法

| 權杖              | 範例                     | 結果                                                                      |
| ----------------- | ------------------------ | ------------------------------------------------------------------------- |
| `@context`        | `@home`                  | `contexts: ['@home']`                                                     |
| `#tag`            | `#focused`               | `tags: ['#focused']`                                                      |
| `+Project`        | `+HomeReno`              | `projectId: 'matching-id'`                                                |
| `!Area`           | `!Work`                  | `areaId: 'matching-id'`                                                   |
| `/area:<name>`    | `/area:Personal`         | `areaId: 'matching-id'`                                                   |
| `%Person`         | `%Jim` 或 `%"Jim Smith"` | `assignedTo: 'Jim'`（已知名稱會透過 `knownPeople` 比對未加引號的多字名稱） |
| `/due:date`       | `/due:friday`            | `dueDate: 'ISO string'`                                                   |
| `/energy:<level>` | `/energy:high`           | `energyLevel: 'high'`（支援 `low`、`medium`、`high`）                     |
| `/note:text`      | `/note:remember X`       | `description: 'remember X'`                                               |
| `/status`         | `/next`                  | `status: 'next'`（支援 `/inbox`、`/waiting`、`/someday`、`/done`、`/archived`） |

---

## 同步

### performSyncCycle

執行完整的同步週期（讀取本機 → 讀取遠端 → 合併 → 寫回）。

```typescript
import { performSyncCycle } from '@mindwtr/core';

const result = await performSyncCycle({
    readLocal: () => Promise<AppData>,
    readRemote: () => Promise<AppData | null>,
    writeLocal: (data) => Promise<void>,
    writeRemote: (data) => Promise<void>
});
```

### mergeAppData

使用最後寫入者優先合併兩個 AppData 物件。

```typescript
import { mergeAppData } from '@mindwtr/core';

const merged = mergeAppData(localData: AppData, remoteData: AppData);
```

---

## 國際化

### translations

所有支援語言的翻譯字串。

```typescript
import { translations, Language } from '@mindwtr/core';

translations.en['nav.inbox'];  // 'Inbox'
translations.zh['nav.inbox'];  // '收集箱'
```

---

## 另請參閱

- [架構](/zh-Hant/developers/architecture)
- [開發者指南](/zh-Hant/developers/developer-guide)
- [貢獻指南（儲存庫指南）](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
