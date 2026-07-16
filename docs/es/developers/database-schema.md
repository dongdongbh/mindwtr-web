# Esquema de la base de datos

Mindwtr mantiene el modelo de datos local intencionadamente pequeño y fácil de sincronizar. La aplicación de escritorio usa SQLite como almacenamiento principal y la aplicación móvil usa el mismo esquema principal cuando SQLite está disponible.

La fuente de verdad del esquema de SQLite se encuentra en:

- `packages/core/src/sqlite-schema.ts`
- `packages/core/src/sqlite-adapter.ts`

Esta página es un mapa práctico de ese esquema para quienes contribuyen al proyecto.

---

## Tablas principales

### `tasks`

Registros principales de tareas, incluidos el estado GTD, los campos de programación, los datos de listas de comprobación, los adjuntos, la ordenación y los metadatos de sincronización.

Columnas destacadas:

- `status`: categoría GTD (`inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived`)
- `projectId`, `sectionId`, `areaId`: relaciones con entidades superiores
- `dueDate`, `startTime`, `reviewAt`, `completedAt`: campos temporales del flujo de trabajo
- `relativeStartOffset`: regla de antelación respaldada por JSON que vuelve a calcular `startTime` a partir de `dueDate`
- `repeatReminderMinutes`: intervalo de repetición del recordatorio a la hora de vencimiento, limitado a los valores predefinidos de minutos admitidos
- `location`: contexto físico o de ubicación para búsquedas, tareas creadas desde el calendario y eventos enviados al calendario
- `checklist`, `attachments`, `tags`, `contexts`, `recurrence`: campos respaldados por JSON
- `showFutureRecurrence`: indicador booleano almacenado como entero; habilita en el Calendario una vista previa de la próxima repetición destinada únicamente a la planificación
- `deletedAt`, `purgedAt`: campos de registros de eliminación usados por la sincronización
- `rev`, `revBy`, `updatedAt`: metadatos de fusión y conflictos

### `projects`

Contenedores de proyectos y sus metadatos de planificación.

Columnas destacadas:

- `status`: `active`, `someday`, `waiting`, `archived`
- `areaId`: área superior opcional
- `orderNum`: orden del proyecto dentro de un área
- `tagIds`, `attachments`: campos respaldados por JSON
- `supportNotes`, `reviewAt`: campos de planificación y revisión
- `deletedAt`, `rev`, `revBy`, `updatedAt`: metadatos de sincronización

### `sections`

Categorías de agrupación de tareas locales a cada proyecto.

Columnas destacadas:

- `projectId`: proyecto propietario
- `orderNum`: orden de la sección dentro del proyecto
- `isCollapsed`: estado persistente de la interfaz
- `deletedAt`, `rev`, `revBy`, `updatedAt`: metadatos de sincronización

### `areas`

Áreas de enfoque GTD de nivel superior.

Columnas destacadas:

- `name`, `color`, `icon`
- `orderNum`: orden manual
- `deletedAt`, `rev`, `revBy`, `updatedAt`: metadatos de sincronización

### `people`

Personas asignadas gestionadas para trabajo delegado o centrado en personas.

Columnas destacadas:

- `name`: nombre visible usado por las sugerencias de personas asignadas a tareas y la búsqueda `assigned:`
- `note`, `referenceLink`: notas opcionales sobre la persona y URL de referencia
- `deletedAt`, `rev`, `revBy`, `updatedAt`: metadatos de sincronización

### `settings`

Almacén JSON de una sola fila para los ajustes de la aplicación.

- `id = 1`
- `data`: objeto de ajustes serializado

### `saved_filters`

Definiciones de filtros de Enfoque guardados que usa la vista Enfoque.

Columnas destacadas:

- `name`, `icon`, `view`: metadatos de presentación
- `criteria`: criterios de filtrado serializados
- `sortBy`, `sortOrder`: orden opcional guardado
- `createdAt`, `updatedAt`: metadatos locales

### `calendar_sync`

Tabla de correspondencias para la sincronización por envío con el calendario del dispositivo.

Columnas destacadas:

- `task_id`: ID de la tarea de Mindwtr
- `calendar_event_id`, `calendar_id`: identificadores del calendario nativo
- `platform`: espacio de nombres de la plataforma para la correspondencia
- `last_synced_at`: marca de tiempo del último envío correcto

### `schema_migrations`

Registra las versiones del esquema aplicadas para migraciones aditivas.

---

## Tablas de búsqueda de texto completo

SQLite FTS5 permite realizar búsquedas locales en las aplicaciones de escritorio y móvil.

### `tasks_fts`

Campos indexados para la búsqueda de tareas:

- `title`
- `description`
- `tags`
- `contexts`
- `location`

### `projects_fts`

Campos indexados para la búsqueda de proyectos:

- `title`
- `supportNotes`
- `tagIds`
- `areaTitle`

Las tablas FTS se mantienen mediante desencadenadores en `packages/core/src/sqlite-schema.ts`.

---

## Índices

El esquema incluye índices específicos para las rutas habituales de la interfaz y la sincronización:

- filtros por estado y eliminación de tareas
- consultas de tareas por fecha (`dueDate`, `startTime`, `reviewAt`, `completedAt`)
- consultas de agrupación de tareas (`projectId`, `areaId`, `sectionId`)
- consultas de proyectos por estado y orden del área

Las definiciones actuales de los índices se encuentran en `SQLITE_INDEX_SCHEMA`, dentro de `packages/core/src/sqlite-schema.ts`.

---

## Reglas de validación

Los desencadenadores de SQLite rechazan al escribir los valores de enumeración no válidos y el JSON con formato incorrecto.

Las comprobaciones de validación actuales incluyen:

- valores de estado válidos para tareas y proyectos
- validez del JSON de las etiquetas, los contextos, las listas de comprobación, los adjuntos y la recurrencia de las tareas
- validez del JSON de los ID de etiquetas y los adjuntos de los proyectos

Esto mantiene la base de datos en disco alineada con el modelo de TypeScript y evita que una corrupción parcial eluda la capa del almacén.

---

## Semántica de sincronización

Mindwtr **no** depende de eliminaciones relacionales en cascada para las entidades principales. El modelo de datos usa registros de eliminación lógica para que las eliminaciones puedan sincronizarse de forma segura entre dispositivos.

Consulta también:

- [Arquitectura](/es/developers/architecture)
- [Datos y sincronización](/es/data-sync/)
- [Algoritmo de sincronización](/es/data-sync/sync-algorithm)
- `docs/adr/0001-sqlite-constraints.md`

---

## Notas para quienes contribuyen

- Es preferible realizar cambios aditivos en el esquema en lugar de reescrituras destructivas.
- Al añadir un campo, actualiza tanto el esquema como la lógica de correspondencia del adaptador.
- Si un campo nuevo afecta a las búsquedas, actualiza deliberadamente las tablas y los desencadenadores FTS.
- Al cambiar las restricciones o el comportamiento de eliminación, comprueba primero las implicaciones para la sincronización y los registros de eliminación.
