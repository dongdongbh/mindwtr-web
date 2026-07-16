# API principal

Documentación de la API del paquete `@mindwtr/core`.

---

## Instalación

El paquete principal se utiliza internamente en las aplicaciones de escritorio y móviles:

```typescript
import {
    useTaskStore,
    setStorageAdapter,
    parseQuickAdd,
    mergeAppData
} from '@mindwtr/core';
```

---

## Tipos

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

- `strategy: 'strict'` mantiene la cadencia planificada anclada a la programación.
- `strategy: 'fluid'` significa «repetir después de completar».
- `count` detiene la serie después de que se haya creado el número total de repeticiones.
- `until` detiene la serie cuando la siguiente tarea generada caería después de la fecha/hora indicada.
- `completedOccurrences` son metadatos internos seguros para la sincronización; los clientes deben conservarlos al procesar objetos de recurrencia de ida y vuelta.
- `showFutureRecurrence` pertenece a la tarea, no al objeto de recurrencia. Solicita que el Calendario muestre una siguiente repetición únicamente para planificación; los clientes deben conservar el booleano al procesar tareas de ida y vuelta.

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

## Almacén

### useTaskStore

Hook del almacén Zustand para acceder al estado y las acciones.

```typescript
import { useTaskStore } from '@mindwtr/core';

function MyComponent() {
    const { tasks, projects, addTask, updateTask } = useTaskStore();
    // ...
}
```

### Estado del almacén

| Propiedad   | Tipo                  | Descripción                              |
| ----------- | --------------------- | ---------------------------------------- |
| `tasks`     | `Task[]`              | Todas las tareas visibles (no eliminadas) |
| `projects`  | `Project[]`           | Todos los proyectos visibles             |
| `areas`     | `Area[]`              | Todas las áreas                           |
| `people`    | `Person[]`            | Todas las personas gestionadas visibles   |
| `settings`  | `AppData['settings']` | Ajustes de la aplicación                  |
| `isLoading` | `boolean`             | Estado de carga                           |
| `error`     | `string \| null`      | Mensaje de error                          |

### Acciones del almacén

La mayoría de las acciones del almacén que realizan mutaciones devuelven un resultado estructurado en lugar de lanzar excepciones ante fallos de validación ordinarios:

```typescript
type StoreActionResult = {
    success: boolean;
    error?: string;
    id?: string;
};
```

#### Operaciones de tareas

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

#### Operaciones de proyectos

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

#### Operaciones de áreas

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

La eliminación/restauración de áreas evita intencionadamente propagar marcadores de eliminación. Al eliminar un área se borran `areaId` y `areaTitle` de los proyectos vinculados y los valores directos `areaId` de las tareas; las secciones y las tareas de los proyectos permanecen asociadas a sus proyectos. Restaurar un área no vuelve a asignar los elementos secundarios que se desvincularon mientras estaba eliminada.

#### Operaciones de personas

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

#### Operaciones de secciones

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

#### Operaciones de etiquetas

```typescript
// Delete (from all tasks and projects)
deleteTag(tagId: string): Promise<void>;
```

#### Operaciones de datos

```typescript
// Load
fetchData(): Promise<void>;

// Settings
updateSettings(updates: Partial<AppData['settings']>): Promise<void>;
```

---

## Adaptador de almacenamiento

### setStorageAdapter

Configura el backend de almacenamiento.

```typescript
import { setStorageAdapter } from '@mindwtr/core';

// Must be called before using the store
setStorageAdapter(myStorageAdapter);
```

### Interfaz StorageAdapter

```typescript
interface StorageAdapter {
    getData: () => Promise<AppData>;
    saveData: (data: AppData) => Promise<void>;
    queryTasks?: (options: TaskQueryOptions) => Promise<Task[]>;
}
```

---

## Analizador de adición rápida

### parseQuickAdd

Analiza la entrada de tareas en lenguaje natural.

```typescript
import { parseQuickAdd } from '@mindwtr/core';

const result = parseQuickAdd(input: string, projects?: Project[]);
```

### Sintaxis

| Token        | Ejemplo            | Resultado                    |
| ------------ | ------------------ | ---------------------------- |
| `@context`   | `@home`            | `contexts: ['@home']`        |
| `#tag`       | `#focused`         | `tags: ['#focused']`         |
| `+Project`   | `+HomeReno`        | `projectId: 'matching-id'`   |
| `!Area`      | `!Work`            | `areaId: 'matching-id'`      |
| `/area:<name>` | `/area:Personal` | `areaId: 'matching-id'`      |
| `%Person`    | `%Jim` o `%"Jim Smith"` | `assignedTo: 'Jim'` (los nombres conocidos de varias palabras coinciden sin comillas mediante `knownPeople`) |
| `/due:date`  | `/due:friday`      | `dueDate: 'ISO string'`      |
| `/energy:<level>` | `/energy:high` | `energyLevel: 'high'` (admite `low`, `medium`, `high`) |
| `/note:text` | `/note:remember X` | `description: 'remember X'`  |
| `/status`    | `/next`            | `status: 'next'` (admite `/inbox`, `/waiting`, `/someday`, `/done`, `/archived`) |

---

## Sincronización

### performSyncCycle

Ejecuta un ciclo de sincronización completo (leer local -> leer remoto -> fusionar -> volver a escribir).

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

Fusiona dos objetos AppData mediante «la última escritura prevalece».

```typescript
import { mergeAppData } from '@mindwtr/core';

const merged = mergeAppData(localData: AppData, remoteData: AppData);
```

---

## Internacionalización

### translations

Cadenas de traducción para todos los idiomas compatibles.

```typescript
import { translations, Language } from '@mindwtr/core';

translations.en['nav.inbox'];  // 'Inbox'
translations.zh['nav.inbox'];  // '收集箱'
```

---

## Véase también

- [Arquitectura](/es/developers/architecture)
- [Guía para desarrolladores](/es/developers/developer-guide)
- [Contribuir (guía del repositorio)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
