# 核心 API

`@mindwtr/core` 包的 API 文档。

---

## 安装

核心包供桌面应用和移动应用内部使用：

```typescript
import {
    useTaskStore,
    setStorageAdapter,
    parseQuickAdd,
    mergeAppData
} from '@mindwtr/core';
```

---

## 类型

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

- `strategy: 'strict'` 将计划节奏锚定在日程上。
- `strategy: 'fluid'` 表示“完成后重复”。
- `count` 会在创建指定总数的发生项后结束序列。
- 当下一个生成的任务晚于给定日期/时间时，`until` 会结束序列。
- `completedOccurrences` 是内部使用且同步安全的元数据；客户端在往返传递重复对象时应保留它。
- `showFutureRecurrence` 属于任务，而不属于重复对象。它要求“日历”显示一个仅用于规划的下次发生项；客户端在往返传递任务时应保留这个布尔值。

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

## 存储

### useTaskStore

用于访问状态和操作的 Zustand 存储钩子。

```typescript
import { useTaskStore } from '@mindwtr/core';

function MyComponent() {
    const { tasks, projects, addTask, updateTask } = useTaskStore();
    // ...
}
```

### 存储状态

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `tasks` | `Task[]` | 所有可见（未删除）的任务 |
| `projects` | `Project[]` | 所有可见项目 |
| `areas` | `Area[]` | 所有领域 |
| `people` | `Person[]` | 所有可见的已管理人员 |
| `settings` | `AppData['settings']` | 应用设置 |
| `isLoading` | `boolean` | 加载状态 |
| `error` | `string \| null` | 错误消息 |

### 存储操作

对于普通的验证失败，大多数会改变数据的存储操作会返回结构化结果，而不是抛出异常：

```typescript
type StoreActionResult = {
    success: boolean;
    error?: string;
    id?: string;
};
```

#### 任务操作

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

#### 项目操作

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

#### 领域操作

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

领域删除/恢复有意避免级联墓碑记录。删除领域会清除关联项目中的 `areaId` 和 `areaTitle`，并清除任务中直接设置的 `areaId` 值；分区和项目任务仍归属于其项目。恢复领域不会重新分配在其删除期间已解除关联的子项。

#### 人员操作

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

#### 分区操作

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

#### 标签操作

```typescript
// Delete (from all tasks and projects)
deleteTag(tagId: string): Promise<void>;
```

#### 数据操作

```typescript
// Load
fetchData(): Promise<void>;

// Settings
updateSettings(updates: Partial<AppData['settings']>): Promise<void>;
```

---

## 存储适配器

### setStorageAdapter

配置存储后端。

```typescript
import { setStorageAdapter } from '@mindwtr/core';

// Must be called before using the store
setStorageAdapter(myStorageAdapter);
```

### StorageAdapter 接口

```typescript
interface StorageAdapter {
    getData: () => Promise<AppData>;
    saveData: (data: AppData) => Promise<void>;
    queryTasks?: (options: TaskQueryOptions) => Promise<Task[]>;
}
```

---

## 快速添加解析器

### parseQuickAdd

解析自然语言任务输入。

```typescript
import { parseQuickAdd } from '@mindwtr/core';

const result = parseQuickAdd(input: string, projects?: Project[]);
```

### 语法

| 令牌 | 示例 | 结果 |
| --- | --- | --- |
| `@context` | `@home` | `contexts: ['@home']` |
| `#tag` | `#focused` | `tags: ['#focused']` |
| `+Project` | `+HomeReno` | `projectId: 'matching-id'` |
| `!Area` | `!Work` | `areaId: 'matching-id'` |
| `/area:<name>` | `/area:Personal` | `areaId: 'matching-id'` |
| `%Person` | `%Jim` or `%"Jim Smith"` | `assignedTo: 'Jim'`（已知姓名可通过 `knownPeople` 匹配未加引号的多词姓名） |
| `/due:date` | `/due:friday` | `dueDate: 'ISO string'` |
| `/energy:<level>` | `/energy:high` | `energyLevel: 'high'`（支持 `low`、`medium`、`high`） |
| `/note:text` | `/note:remember X` | `description: 'remember X'` |
| `/status` | `/next` | `status: 'next'`（支持 `/inbox`、`/waiting`、`/someday`、`/done`、`/archived`） |

---

## 同步

### performSyncCycle

执行完整的同步周期（读取本地 -> 读取远程 -> 合并 -> 写回）。

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

使用最后写入胜出机制合并两个 AppData 对象。

```typescript
import { mergeAppData } from '@mindwtr/core';

const merged = mergeAppData(localData: AppData, remoteData: AppData);
```

---

## 国际化

### translations

所有支持语言的翻译字符串。

```typescript
import { translations, Language } from '@mindwtr/core';

translations.en['nav.inbox'];  // 'Inbox'
translations.zh['nav.inbox'];  // '收集箱'
```

---

## 另请参阅

- [架构](/zh-Hans/developers/architecture)
- [开发者指南](/zh-Hans/developers/developer-guide)
- [贡献指南（仓库指南）](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
