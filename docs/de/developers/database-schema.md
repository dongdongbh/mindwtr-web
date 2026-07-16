# Datenbankschema

Mindwtr hält das lokale Datenmodell bewusst klein und synchronisierungsfreundlich. Die Desktop-App verwendet SQLite als primären Speicher; auf Mobilgeräten kommt dasselbe Core-Schema zum Einsatz, sofern SQLite verfügbar ist.

Die maßgebliche Quelle für das SQLite-Schema befindet sich in:

- `packages/core/src/sqlite-schema.ts`
- `packages/core/src/sqlite-adapter.ts`

Diese Seite bietet Mitwirkenden eine praktische Übersicht über dieses Schema.

---

## Core-Tabellen

### `tasks`

Primäre Aufgabendatensätze einschließlich GTD-Status, Planungsfeldern, Checklisten-Daten, Anhängen, Reihenfolge und Synchronisierungsmetadaten.

Wichtige Spalten:

- `status`: GTD-Spur (`inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived`)
- `projectId`, `sectionId`, `areaId`: übergeordnete Beziehungen
- `dueDate`, `startTime`, `reviewAt`, `completedAt`: zeitbezogene Arbeitsablauffelder
- `relativeStartOffset`: JSON-gestützte Vorlaufregel, die `startTime` anhand von `dueDate` neu berechnet
- `repeatReminderMinutes`: Wiederholungsintervall für Erinnerungen zur Fälligkeitszeit, beschränkt auf unterstützte voreingestellte Minutenwerte
- `location`: physischer/örtlicher Kontext für Suche, vom Kalender erstellte Aufgaben und in den Kalender übertragene Ereignisse
- `checklist`, `attachments`, `tags`, `contexts`, `recurrence`: JSON-gestützte Felder
- `showFutureRecurrence`: als Ganzzahl gespeichertes boolesches Flag; aktiviert im Kalender eine ausschließlich zur Planung dienende Vorschau des nächsten Vorkommens
- `deletedAt`, `purgedAt`: von der Synchronisierung verwendete Tombstone-Felder
- `rev`, `revBy`, `updatedAt`: Metadaten für Zusammenführung/Konflikte

### `projects`

Projektcontainer und ihre Planungsmetadaten.

Wichtige Spalten:

- `status`: `active`, `someday`, `waiting`, `archived`
- `areaId`: optionaler übergeordneter Bereich
- `orderNum`: Projektreihenfolge innerhalb eines Bereichs
- `tagIds`, `attachments`: JSON-gestützte Felder
- `supportNotes`, `reviewAt`: Planungs-/Durchsichtsfelder
- `deletedAt`, `rev`, `revBy`, `updatedAt`: Synchronisierungsmetadaten

### `sections`

Projektinterne Gruppierungsspuren für Aufgaben.

Wichtige Spalten:

- `projectId`: zugehöriges Projekt
- `orderNum`: Abschnittsreihenfolge innerhalb des Projekts
- `isCollapsed`: persistierter UI-Zustand
- `deletedAt`, `rev`, `revBy`, `updatedAt`: Synchronisierungsmetadaten

### `areas`

Übergeordnete GTD-Fokusbereiche.

Wichtige Spalten:

- `name`, `color`, `icon`
- `orderNum`: manuelle Reihenfolge
- `deletedAt`, `rev`, `revBy`, `updatedAt`: Synchronisierungsmetadaten

### `people`

Verwaltete zugewiesene Personen für delegierte oder personenbezogene Arbeit.

Wichtige Spalten:

- `name`: Anzeigename, der für Vorschläge zu Aufgabenzuweisungen und die Suche `assigned:` verwendet wird
- `note`, `referenceLink`: optionale Notizen zur Person und Referenz-URL
- `deletedAt`, `rev`, `revBy`, `updatedAt`: Synchronisierungsmetadaten

### `settings`

Einzeiliger JSON-Speicher für App-Einstellungen.

- `id = 1`
- `data`: serialisiertes Einstellungsobjekt

### `saved_filters`

Gespeicherte Definitionen von Fokusfiltern, die von der Ansicht „Fokus“ verwendet werden.

Wichtige Spalten:

- `name`, `icon`, `view`: Anzeigemetadaten
- `criteria`: serialisierte Filterkriterien
- `sortBy`, `sortOrder`: optionale gespeicherte Sortierung
- `createdAt`, `updatedAt`: lokale Metadaten

### `calendar_sync`

Zuordnungstabelle für die Push-Synchronisierung mit dem Gerätekalender.

Wichtige Spalten:

- `task_id`: Mindwtr-Aufgaben-ID
- `calendar_event_id`, `calendar_id`: native Kalenderkennungen
- `platform`: Plattformnamensraum für die Zuordnung
- `last_synced_at`: Zeitstempel der letzten erfolgreichen Übertragung

### `schema_migrations`

Verzeichnet angewandte Schemaversionen für additive Migrationen.

---

## Volltextsuchtabellen

SQLite FTS5 stellt die lokale Suche auf Desktop und Mobilgeräten bereit.

### `tasks_fts`

Indizierte Suchfelder für Aufgaben:

- `title`
- `description`
- `tags`
- `contexts`
- `location`

### `projects_fts`

Indizierte Suchfelder für Projekte:

- `title`
- `supportNotes`
- `tagIds`
- `areaTitle`

FTS-Tabellen werden durch Trigger in `packages/core/src/sqlite-schema.ts` gepflegt.

---

## Indizes

Das Schema enthält gezielte Indizes für die üblichen UI- und Synchronisierungspfade:

- Filter nach Aufgabenstatus und Löschung
- Datumsabfragen für Aufgaben (`dueDate`, `startTime`, `reviewAt`, `completedAt`)
- Gruppierungsabfragen für Aufgaben (`projectId`, `areaId`, `sectionId`)
- Abfragen nach Projektstatus und Bereichsreihenfolge

Die aktuellen Indexdefinitionen befinden sich in `SQLITE_INDEX_SCHEMA` in `packages/core/src/sqlite-schema.ts`.

---

## Validierungsregeln

SQLite-Trigger lehnen beim Schreiben ungültige Enum-Werte und fehlerhaftes JSON ab.

Die aktuellen Validierungsprüfungen umfassen:

- gültige Statuswerte für Aufgaben/Projekte
- gültiges JSON für Tags, Kontexte, Checklisten, Anhänge und Wiederholungen von Aufgaben
- gültiges JSON für Tag-IDs und Anhänge von Projekten

Dadurch bleibt die Datenbank auf dem Datenträger mit dem TypeScript-Modell abgestimmt, und eine teilweise Beschädigung kann die Speicherschicht nicht umgehen.

---

## Synchronisierungssemantik

Mindwtr verlässt sich bei Core-Entitäten **nicht** auf kaskadierende relationale Löschvorgänge. Das Datenmodell verwendet Tombstones für vorläufiges Löschen, damit Löschungen sicher zwischen Geräten synchronisiert werden können.

Siehe auch:

- [Architektur](/de/developers/architecture)
- [Daten und Synchronisierung](/de/data-sync/)
- [Synchronisierungsalgorithmus](/de/data-sync/sync-algorithm)
- `docs/adr/0001-sqlite-constraints.md`

---

## Hinweise für Mitwirkende

- Ziehen Sie additive Schemaänderungen destruktiven Neufassungen vor.
- Aktualisieren Sie beim Hinzufügen eines Feldes sowohl das Schema als auch die Zuordnungslogik des Adapters.
- Wenn ein neues Feld die Suche beeinflusst, aktualisieren Sie FTS-Tabellen/-Trigger bewusst.
- Prüfen Sie bei Änderungen an Einschränkungen oder Löschverhalten zuerst die Auswirkungen auf Synchronisierung/Tombstones.
