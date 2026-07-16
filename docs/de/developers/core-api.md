# Core-API

API-Dokumentation für das Paket `@mindwtr/core`.

---

## Installation

Das Core-Paket wird intern von den Desktop- und Mobilgeräte-Apps verwendet:

```typescript
import {
    useTaskStore,
    setStorageAdapter,
    parseQuickAdd,
    mergeAppData
} from '@mindwtr/core';
```

---

## Typen

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

- `strategy: 'strict'` hält den geplanten Rhythmus am Zeitplan verankert.
- `strategy: 'fluid'` bedeutet „nach Abschluss wiederholen“.
- `count` beendet die Serie, nachdem die Gesamtzahl der Vorkommen erstellt wurde.
- `until` beendet die Serie, wenn die nächste erzeugte Aufgabe nach dem angegebenen Datum/der angegebenen Uhrzeit liegen würde.
- `completedOccurrences` sind interne, synchronisierungssichere Metadaten; Clients sollten sie beim Roundtrip von Wiederholungsobjekten beibehalten.
- `showFutureRecurrence` gehört zur Aufgabe, nicht zum Wiederholungsobjekt. Das Feld weist den Kalender an, ein einzelnes, nur zur Planung dienendes nächstes Vorkommen anzuzeigen; Clients sollten den booleschen Wert beim Roundtrip von Aufgaben beibehalten.

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

## Store

### useTaskStore

Zustand-Store-Hook für den Zugriff auf Zustand und Aktionen.

```typescript
import { useTaskStore } from '@mindwtr/core';

function MyComponent() {
    const { tasks, projects, addTask, updateTask } = useTaskStore();
    // ...
}
```

### Store-Zustand

| Eigenschaft | Typ                   | Beschreibung                     |
| ----------- | --------------------- | ------------------------------- |
| `tasks`     | `Task[]`              | Alle sichtbaren (nicht gelöschten) Aufgaben |
| `projects`  | `Project[]`           | Alle sichtbaren Projekte            |
| `areas`     | `Area[]`              | Alle Bereiche                       |
| `people`    | `Person[]`            | Alle sichtbaren verwalteten Personen      |
| `settings`  | `AppData['settings']` | App-Einstellungen                    |
| `isLoading` | `boolean`             | Ladezustand                   |
| `error`     | `string \| null`      | Fehlermeldung                   |

### Store-Aktionen

Die meisten verändernden Store-Aktionen geben bei gewöhnlichen Validierungsfehlern ein strukturiertes Ergebnis zurück, statt eine Ausnahme auszulösen:

```typescript
type StoreActionResult = {
    success: boolean;
    error?: string;
    id?: string;
};
```

#### Aufgabenoperationen

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

#### Projektoperationen

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

#### Bereichsoperationen

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

Beim Löschen/Wiederherstellen eines Bereichs werden absichtlich keine Tombstones kaskadiert. Das Löschen eines Bereichs entfernt `areaId` und `areaTitle` aus verknüpften Projekten sowie direkte `areaId`-Werte von Aufgaben; Abschnitte und Projektaufgaben bleiben ihren Projekten zugeordnet. Beim Wiederherstellen eines Bereichs werden untergeordnete Elemente, deren Zuordnung während der Löschung aufgehoben wurde, nicht erneut zugewiesen.

#### Personenoperationen

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

#### Abschnittsoperationen

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

#### Tag-Operationen

```typescript
// Delete (from all tasks and projects)
deleteTag(tagId: string): Promise<void>;
```

#### Datenoperationen

```typescript
// Load
fetchData(): Promise<void>;

// Settings
updateSettings(updates: Partial<AppData['settings']>): Promise<void>;
```

---

## Speicheradapter

### setStorageAdapter

Konfiguriert das Speicher-Backend.

```typescript
import { setStorageAdapter } from '@mindwtr/core';

// Must be called before using the store
setStorageAdapter(myStorageAdapter);
```

### StorageAdapter-Schnittstelle

```typescript
interface StorageAdapter {
    getData: () => Promise<AppData>;
    saveData: (data: AppData) => Promise<void>;
    queryTasks?: (options: TaskQueryOptions) => Promise<Task[]>;
}
```

---

## Parser für „Schnell hinzufügen“

### parseQuickAdd

Analysiert Aufgabeneingaben in natürlicher Sprache.

```typescript
import { parseQuickAdd } from '@mindwtr/core';

const result = parseQuickAdd(input: string, projects?: Project[]);
```

### Syntax

| Token        | Beispiel            | Ergebnis                      |
| ------------ | ------------------ | --------------------------- |
| `@context`   | `@home`            | `contexts: ['@home']`       |
| `#tag`       | `#focused`         | `tags: ['#focused']`        |
| `+Project`   | `+HomeReno`        | `projectId: 'matching-id'`  |
| `!Area`      | `!Work`            | `areaId: 'matching-id'`     |
| `/area:<name>` | `/area:Personal` | `areaId: 'matching-id'`     |
| `%Person`    | `%Jim` oder `%"Jim Smith"` | `assignedTo: 'Jim'` (bekannte Namen werden über `knownPeople` auch als mehrteilige Namen ohne Anführungszeichen erkannt) |
| `/due:date`  | `/due:friday`      | `dueDate: 'ISO string'`     |
| `/energy:<level>` | `/energy:high` | `energyLevel: 'high'` (unterstützt `low`, `medium`, `high`) |
| `/note:text` | `/note:remember X` | `description: 'remember X'` |
| `/status`    | `/next`            | `status: 'next'` (unterstützt `/inbox`, `/waiting`, `/someday`, `/done`, `/archived`) |

---

## Synchronisierung

### performSyncCycle

Führt einen vollständigen Synchronisierungszyklus aus (lokal lesen -> entfernt lesen -> zusammenführen -> zurückschreiben).

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

Führt zwei AppData-Objekte mithilfe von Last-Write-Wins zusammen.

```typescript
import { mergeAppData } from '@mindwtr/core';

const merged = mergeAppData(localData: AppData, remoteData: AppData);
```

---

## Internationalisierung

### translations

Übersetzungszeichenfolgen für alle unterstützten Sprachen.

```typescript
import { translations, Language } from '@mindwtr/core';

translations.en['nav.inbox'];  // 'Inbox'
translations.zh['nav.inbox'];  // '收集箱'
```

---

## Siehe auch

- [Architektur](/de/developers/architecture)
- [Entwicklerleitfaden](/de/developers/developer-guide)
- [Mitwirken (Repository-Anleitung)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
