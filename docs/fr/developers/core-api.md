# API du noyau

Documentation de l'API du paquet `@mindwtr/core`.

---

## Installation

Le paquet du noyau est utilisé en interne par les applications de bureau et mobiles :

```typescript
import {
    useTaskStore,
    setStorageAdapter,
    parseQuickAdd,
    mergeAppData
} from '@mindwtr/core';
```

---

## Types

### Task

```typescript
type RelativeStartOffsetUnit = 'minute' | 'hour' | 'day' | 'week';

interface RelativeStartOffset {
    amount: number;                  // Décalage <= 0, par ex. -3 jours avant l'échéance ; 0 = à la date d'échéance
    unit: RelativeStartOffsetUnit;
}

interface Task {
    id: string;                    // UUID
    title: string;                 // Titre de la tâche
    status: TaskStatus;            // Statut actuel
    taskMode?: 'task' | 'list';    // 'list' = tâche centrée sur la liste de contrôle
    priority?: TaskPriority;       // 'low' | 'medium' | 'high' | 'urgent'
    energyLevel?: TaskEnergyLevel; // 'low' | 'medium' | 'high'
    assignedTo?: string;           // Personne dont on attend une réponse
    startTime?: string;            // Chaîne de date ISO
    relativeStartOffset?: RelativeStartOffset; // Recalcule startTime à partir de dueDate
    dueDate?: string;              // Chaîne de date ISO
    recurrence?: Recurrence | RecurrenceRule;
    showFutureRecurrence?: boolean; // Aperçu, dans le calendrier uniquement, de la prochaine occurrence récurrente
    tags: string[];                // par ex. ['#focused']
    contexts: string[];            // par ex. ['@home', '@work']
    checklist?: ChecklistItem[];   // Sous-éléments
    description?: string;          // Notes
    attachments?: Attachment[];    // Fichiers/Liens
    location?: string;             // Emplacement physique
    projectId?: string;            // ID du projet parent
    sectionId?: string;            // ID de la section parente
    areaId?: string;               // ID du domaine parent (regroupement direct facultatif)
    isFocusedToday?: boolean;      // Priorité du jour
    pushCount?: number;            // Nombre de reports de l'échéance à une date ultérieure
    repeatReminderMinutes?: number; // Préréglage de répétition du rappel à l'échéance : 5, 10, 15, 30 ou 60
    textDirection?: 'auto' | 'ltr' | 'rtl';
    timeEstimate?: TimeEstimate;   // '5min' | '10min' | '15min' | '30min' | '1hr' | '2hr' | '3hr' | '4hr' | '4hr+'
    reviewAt?: string;             // Date de rappel différé
    completedAt?: string;          // Date d'achèvement
    rev?: number;                  // Compteur de révision monotone pour la synchronisation
    revBy?: string;                // ID de l'appareil ayant émis `rev`
    createdAt: string;             // Horodatage de création
    updatedAt: string;             // Horodatage de la dernière mise à jour
    deletedAt?: string;            // Horodatage de suppression logique
    purgedAt?: string;             // Suppression définitive (pierre tombale uniquement)
    orderNum?: number;             // Ordre de tri manuel
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
    strategy?: RecurrenceStrategy;      // Valeur par défaut : 'strict'
    byDay?: RecurrenceByDay[];          // Motif hebdomadaire/mensuel de jours de la semaine
    count?: number;                     // Nombre total d'occurrences dans la série, tâche actuelle comprise
    until?: string;                     // Date/date-heure ISO à laquelle la série doit s'arrêter
    completedOccurrences?: number;      // Compteur interne utilisé pour préserver COUNT dans les tâches générées
    rrule?: string;                     // Fragment RFC 5545 facultatif
}
```

- `strategy: 'strict'` maintient la cadence prévue ancrée dans le calendrier.
- `strategy: 'fluid'` signifie « répéter après l'achèvement ».
- `count` arrête la série une fois le nombre total d'occurrences créé.
- `until` arrête la série lorsque la prochaine tâche générée tomberait après la date/l'heure indiquée.
- `completedOccurrences` est une métadonnée interne sûre pour la synchronisation ; les clients doivent la préserver lors des allers-retours des objets de récurrence.
- `showFutureRecurrence` appartient à la tâche, pas à l'objet de récurrence. Il demande au calendrier d'afficher une prochaine occurrence destinée uniquement à la planification ; les clients doivent préserver ce booléen lors des allers-retours des tâches.

### Project

```typescript
interface Project {
    id: string;
    title: string;
    status: 'active' | 'someday' | 'waiting' | 'archived';
    color: string;                 // Code couleur hexadécimal
    areaId?: string;               // ID du domaine parent
    tagIds: string[];              // Étiquettes associées
    order: number;                 // Ordre de tri dans le domaine
    isSequential?: boolean;        // Afficher uniquement la première tâche dans les prochaines actions
    isFocused?: boolean;           // Projet prioritaire (5 au maximum)
    supportNotes?: string;         // Notes de planification
    attachments?: Attachment[];    // Fichiers/Liens
    reviewAt?: string;             // Date de rappel différé
    rev?: number;                  // Compteur de révision monotone pour la synchronisation
    revBy?: string;                // ID de l'appareil ayant émis `rev`
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
    order: number;                 // Ordre de tri dans le projet
    isCollapsed?: boolean;         // État replié dans l'interface
    rev?: number;                  // Compteur de révision monotone pour la synchronisation
    revBy?: string;                // ID de l'appareil ayant émis `rev`
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;            // Horodatage de suppression logique
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
    deletedAt?: string;            // Pierre tombale de suppression logique pour la synchronisation
}
```

### Person

```typescript
interface Person {
    id: string;
    name: string;
    note?: string;
    referenceLink?: string;
    rev?: number;                  // Compteur de révision monotone pour la synchronisation
    revBy?: string;                // ID de l'appareil ayant émis `rev`
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;            // Pierre tombale de suppression logique pour la synchronisation
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
        weekStart?: 'system' | 'monday' | 'sunday' | 'saturday'; // absent ou 'system' = suivre les paramètres régionaux de l'appareil
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

Hook du store Zustand permettant d'accéder à l'état et aux actions.

```typescript
import { useTaskStore } from '@mindwtr/core';

function MyComponent() {
    const { tasks, projects, addTask, updateTask } = useTaskStore();
    // ...
}
```

### État du store

| Propriété   | Type                  | Description                              |
| ----------- | --------------------- | ---------------------------------------- |
| `tasks`     | `Task[]`              | Toutes les tâches visibles (non supprimées) |
| `projects`  | `Project[]`           | Tous les projets visibles                |
| `areas`     | `Area[]`              | Tous les domaines                        |
| `people`    | `Person[]`            | Toutes les personnes gérées visibles     |
| `settings`  | `AppData['settings']` | Paramètres de l'application              |
| `isLoading` | `boolean`             | État de chargement                       |
| `error`     | `string \| null`      | Message d'erreur                         |

### Actions du store

La plupart des actions du store qui effectuent des mutations renvoient un résultat structuré au lieu de lever une exception pour les échecs de validation ordinaires :

```typescript
type StoreActionResult = {
    success: boolean;
    error?: string;
    id?: string;
};
```

#### Opérations sur les tâches

```typescript
// Créer
addTask(title: string, initialProps?: Partial<Task>): Promise<StoreActionResult>;

// Mettre à jour
updateTask(id: string, updates: Partial<Task>): Promise<StoreActionResult>;

// Déplacer
moveTask(id: string, newStatus: TaskStatus): Promise<StoreActionResult>;

// Supprimer (logiquement)
deleteTask(id: string): Promise<StoreActionResult>;

// Restaurer
restoreTask(id: string): Promise<StoreActionResult>;

// Dupliquer
duplicateTask(id: string, asNextAction?: boolean): Promise<StoreActionResult>;

// Réinitialiser la liste de contrôle
resetTaskChecklist(id: string): Promise<StoreActionResult>;

// Opérations par lots
batchUpdateTasks(updates: Array<{ id: string; updates: Partial<Task> }>): Promise<StoreActionResult>;
batchMoveTasks(ids: string[], newStatus: TaskStatus): Promise<StoreActionResult>;
batchDeleteTasks(ids: string[]): Promise<StoreActionResult>;
```

#### Opérations sur les projets

```typescript
// Créer
addProject(title: string, color: string, initialProps?: Partial<Project>): Promise<Project | null>;

// Mettre à jour
updateProject(id: string, updates: Partial<Project>): Promise<StoreActionResult>;

// Supprimer
deleteProject(id: string): Promise<StoreActionResult>;

// Restaurer
restoreProject(id: string): Promise<StoreActionResult>;

// Activer/désactiver la priorité
toggleProjectFocus(id: string): Promise<void>;

// Réordonner
reorderProjects(orderedIds: string[], areaId?: string): Promise<void>;
reorderProjectTasks(projectId: string, orderedIds: string[], sectionId?: string | null): Promise<void>;
```

#### Opérations sur les domaines

```typescript
// Créer
addArea(name: string, initialProps?: Partial<Area>): Promise<Area | null>;

// Mettre à jour
updateArea(id: string, updates: Partial<Area>): Promise<StoreActionResult>;

// Supprimer (logiquement, détache les projets/tâches liés)
deleteArea(id: string): Promise<StoreActionResult>;

// Restaurer (restaure uniquement la pierre tombale du domaine)
restoreArea(id: string): Promise<StoreActionResult>;

// Réordonner
reorderAreas(orderedIds: string[]): Promise<void>;
```

La suppression/restauration d'un domaine évite intentionnellement la propagation des pierres tombales. Supprimer un domaine efface `areaId` et `areaTitle` des projets liés ainsi que les valeurs `areaId` directes des tâches ; les sections et les tâches des projets restent rattachées à leurs projets. Restaurer un domaine ne réaffecte pas les enfants qui ont été détachés pendant sa suppression.

#### Opérations sur les personnes

```typescript
// Créer
addPerson(name: string, initialProps?: Partial<Person>): Promise<Person | null>;

// Mettre à jour les métadonnées
updatePerson(id: string, updates: Partial<Person>): Promise<StoreActionResult>;

// Renommer et, facultativement, mettre à jour les affectations exactes des tâches
renamePerson(id: string, name: string, options?: { updateTasks?: boolean }): Promise<StoreActionResult>;

// Supprimer (logiquement, sans effacer les affectations des tâches)
deletePerson(id: string): Promise<StoreActionResult>;
```

#### Opérations sur les sections

```typescript
// Créer
addSection(projectId: string, title: string, initialProps?: Partial<Section>): Promise<Section | null>;

// Mettre à jour
updateSection(id: string, updates: Partial<Section>): Promise<StoreActionResult>;

// Supprimer
deleteSection(id: string): Promise<StoreActionResult>;

// Restaurer
restoreSection(id: string): Promise<StoreActionResult>;
```

#### Opérations sur les étiquettes

```typescript
// Supprimer (de toutes les tâches et de tous les projets)
deleteTag(tagId: string): Promise<void>;
```

#### Opérations sur les données

```typescript
// Charger
fetchData(): Promise<void>;

// Paramètres
updateSettings(updates: Partial<AppData['settings']>): Promise<void>;
```

---

## Adaptateur de stockage

### setStorageAdapter

Configurer le moteur de stockage.

```typescript
import { setStorageAdapter } from '@mindwtr/core';

// Doit être appelé avant d'utiliser le store
setStorageAdapter(myStorageAdapter);
```

### Interface StorageAdapter

```typescript
interface StorageAdapter {
    getData: () => Promise<AppData>;
    saveData: (data: AppData) => Promise<void>;
    queryTasks?: (options: TaskQueryOptions) => Promise<Task[]>;
}
```

---

## Analyseur d'ajout rapide

### parseQuickAdd

Analyser une saisie de tâche en langage naturel.

```typescript
import { parseQuickAdd } from '@mindwtr/core';

const result = parseQuickAdd(input: string, projects?: Project[]);
```

### Syntaxe

| Jeton             | Exemple                 | Résultat                     |
| ----------------- | ----------------------- | ---------------------------- |
| `@context`        | `@home`                 | `contexts: ['@home']`        |
| `#tag`            | `#focused`              | `tags: ['#focused']`         |
| `+Project`        | `+HomeReno`             | `projectId: 'matching-id'`   |
| `!Area`           | `!Work`                 | `areaId: 'matching-id'`      |
| `/area:<name>`    | `/area:Personal`        | `areaId: 'matching-id'`      |
| `%Person`         | `%Jim` ou `%"Jim Smith"` | `assignedTo: 'Jim'` (les noms connus de plusieurs mots sans guillemets sont reconnus via `knownPeople`) |
| `/due:date`       | `/due:friday`           | `dueDate: 'ISO string'`      |
| `/energy:<level>` | `/energy:high`          | `energyLevel: 'high'` (prend en charge `low`, `medium`, `high`) |
| `/note:text`      | `/note:remember X`      | `description: 'remember X'`  |
| `/status`         | `/next`                 | `status: 'next'` (prend en charge `/inbox`, `/waiting`, `/someday`, `/done`, `/archived`) |

---

## Synchronisation

### performSyncCycle

Exécuter un cycle de synchronisation complet (lire les données locales -> lire les données distantes -> fusionner -> réécrire).

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

Fusionner deux objets AppData selon la stratégie « dernière écriture gagnante ».

```typescript
import { mergeAppData } from '@mindwtr/core';

const merged = mergeAppData(localData: AppData, remoteData: AppData);
```

---

## Internationalisation

### translations

Chaînes de traduction pour toutes les langues prises en charge.

```typescript
import { translations, Language } from '@mindwtr/core';

translations.en['nav.inbox'];  // 'Inbox'
translations.zh['nav.inbox'];  // '收集箱'
```

---

## Voir aussi

- [Architecture](/fr/developers/architecture)
- [Guide du développeur](/fr/developers/developer-guide)
- [Contribuer (guide du dépôt)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
