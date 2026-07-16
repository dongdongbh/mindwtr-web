# Lokaler API-Server

Mindwtr enthält einen optionalen lokalen REST-API-Server für Skripte und Integrationen. Auf dem Desktop läuft er innerhalb der App-Binärdatei und verwendet dieselben lokalen Speicherpfade wie die App. Das Repository enthält außerdem ein Bun-Hilfsprogramm für Entwicklung und fortgeschrittenes Skripting.

---

## Desktop-Schalter

Desktop-Builds können die lokale REST-API starten, ohne Quellcode auszuführen:

- Öffnen Sie **Einstellungen → Erweitert**.
- Aktivieren Sie **Lokaler API-Server**.
- Behalten Sie den Standardport `3456` bei oder wählen Sie einen anderen localhost-Port.
- Kopieren Sie das erzeugte Bearer-Token von derselben Einstellungskarte.

Die App bindet sich ausschließlich an `127.0.0.1` und verlangt bei jeder Anfrage `Authorization: Bearer <token>`. Binärdateien für Mobilgeräte stellen keine lokale REST-API bereit.

### Hilfsprogramm für die Entwicklung

Das Hilfsprogramm des Repositorys steht weiterhin zur Verfügung, wenn Sie die API außerhalb der Desktop-App ausführen oder ausdrücklich bestimmte Dateien verwenden möchten.

---

## Schnellstart

Aus der Desktop-App:

```text
Settings -> Advanced -> Enable local API server
```

Standard-URL:

```text
http://127.0.0.1:3456
```

Aus dem Stammverzeichnis des Repositorys mit Bun:

```bash
bun install
bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### Optionen

| Option          | Standard         | Beschreibung                         |
| --------------- | ---------------- | ------------------------------------ |
| `--port <n>`    | `4317`           | Serverport                           |
| `--host <host>` | `127.0.0.1`      | Bindungsadresse                      |
| `--data <path>` | Plattformstandard | Speicherort von data.json überschreiben |
| `--db <path>`   | Plattformstandard | Speicherort von mindwtr.db überschreiben |

### Umgebungsvariablen

| Variable            | Beschreibung                                                   |
| ------------------- | -------------------------------------------------------------- |
| `MINDWTR_DATA`      | Speicherort von data.json überschreiben (wenn `--data` fehlt) |
| `MINDWTR_DB_PATH`   | Speicherort von mindwtr.db überschreiben (wenn `--db` fehlt)  |
| `MINDWTR_API_TOKEN` | Nur Bun-Hilfsprogramm: falls gesetzt, `Authorization: Bearer <token>` verlangen |

Standardmäßig ermittelt die API sowohl `data.json` als auch `mindwtr.db` anhand der Plattformpfade von Mindwtr (unter Linux bevorzugt im XDG-Datenverzeichnis).

---

## Authentifizierung

Anfragen an die lokale Desktop-API benötigen immer das Bearer-Token, das unter **Einstellungen → Erweitert** angezeigt wird:

```
Authorization: Bearer <token>
```

Das Bun-Hilfsprogramm verlangt nur dann ein Token, wenn `MINDWTR_API_TOKEN` gesetzt ist.

---

## Endpunkte

| Methode  | Endpunkt              | Beschreibung                         |
| -------- | --------------------- | ------------------------------------ |
| `GET`    | `/health`             | Zustandsprüfung → `{ ok: true }`     |
| `GET`    | `/tasks`              | Aufgaben auflisten                   |
| `GET`    | `/tasks?status=next`  | Nach Status filtern                  |
| `GET`    | `/tasks?query=@work`  | Aufgaben suchen                      |
| `GET`    | `/tasks?all=1`        | Erledigte/archivierte einschließen   |
| `GET`    | `/tasks?deleted=1`    | Vorläufig gelöschte einschließen     |
| `POST`   | `/tasks`              | Aufgabe erstellen                    |
| `GET`    | `/tasks/:id`          | Einzelne Aufgabe abrufen             |
| `PATCH`  | `/tasks/:id`          | Aufgabe aktualisieren                |
| `DELETE` | `/tasks/:id`          | Aufgabe vorläufig löschen            |
| `POST`   | `/tasks/:id/complete` | Als erledigt markieren               |
| `POST`   | `/tasks/:id/archive`  | Als archiviert markieren             |
| `POST`   | `/tasks/:id/restore`  | Vorläufig gelöschte Aufgabe wiederherstellen |
| `GET`    | `/projects`           | Projekte auflisten                   |
| `GET`    | `/areas`              | Bereiche auflisten                   |
| `GET`    | `/v1/areas`           | Kompatibilitätsalias für Bereiche    |
| `GET`    | `/search?query=...`   | Aufgaben und Projekte suchen         |

### Antwortstrukturen

**Aufgabe (Auszug)**
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

**Projekt (Auszug)**
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

**Bereich**
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

### Body zum Erstellen einer Aufgabe

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

Desktop verwendet `title`, wenn vorhanden, andernfalls `input`, und wendet ausdrückliche `props` an. Das Bun-Hilfsprogramm führt zusätzlich `parseQuickAdd` für `input` aus.

---

## Beispiele

**Nächste Aktionen auflisten:**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**Mit ausdrücklichen Eigenschaften erstellen:**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**Eine Aufgabe erledigen:**

```bash
curl -s -X POST "http://127.0.0.1:4317/tasks/$TASK_ID/complete" | jq .
```

---

## CLI-Werkzeug

Außerdem steht eine einfachere Befehlszeilenschnittstelle zur Verfügung:

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

### CLI-Referenz

| Befehl      | Beispiel                                     | Hinweise                                |
| ----------- | -------------------------------------------- | --------------------------------------- |
| `add`       | `mindwtr:cli -- add "Call mom @phone"`      | Verwendet die Schnelleingabeauswertung  |
| `list`      | `mindwtr:cli -- list --status next`          | Unterstützt `--all`, `--deleted`, `--query` |
| `get`       | `mindwtr:cli -- get <taskId>`                | Gibt das vollständige Aufgaben-JSON aus |
| `update`    | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | Wendet einen JSON-Patch an     |
| `search`    | `mindwtr:cli -- search "@work due:<=7d"`    | Durchsucht Aufgaben/Projekte            |
| `complete`  | `mindwtr:cli -- complete <taskId>`           | Markiert die Aufgabe als erledigt       |
| `archive`   | `mindwtr:cli -- archive <taskId>`            | Markiert die Aufgabe als archiviert     |
| `delete`    | `mindwtr:cli -- delete <taskId>`             | Löscht die Aufgabe vorläufig            |
| `restore`   | `mindwtr:cli -- restore <taskId>`            | Stellt eine gelöschte Aufgabe wieder her |
| `projects`  | `mindwtr:cli -- projects`                    | Listet aktive Projekte auf              |

---

## Sicherheitshinweise

- Der Server ist für den Betrieb auf `127.0.0.1` (localhost) vorgesehen. Stellen Sie ihn nur dann öffentlich bereit, wenn Sie die Risiken verstehen.
- Der Zugriff auf die Desktop-API erfordert das unter Einstellungen erzeugte Bearer-Token. Halten Sie dieses Token geheim.
- Wenn Sie Remotezugriff auf das Bun-Hilfsprogramm benötigen, setzen Sie `MINDWTR_API_TOKEN` und platzieren Sie den Server hinter einem authentifizierten Reverse Proxy.

---

## Siehe auch

- [Entwicklerhandbuch](/de/developers/developer-guide)
- [Cloud-API](/de/developers/cloud-api)
