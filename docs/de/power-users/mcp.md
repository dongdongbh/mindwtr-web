# MCP-Server

Mindwtr bietet einen optionalen **MCP-Server (Model Context Protocol)**. Damit können Sie KI-Agenten wie **Claude Desktop**, **Claude Code**, **OpenAI Codex** oder **Gemini CLI** mit Ihrer lokalen Mindwtr-Datenbank oder einem selbst gehosteten Mindwtr-Cloud-Endpunkt verbinden.

Dies ist ein **stdio**-Server (kein gehosteter HTTP-Endpunkt). MCP-Clients starten ihn als Unterprozess und kommunizieren über JSON-RPC auf stdin/stdout.

> Maßgebliche Referenz: [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md). Halten Sie diese Seite mit jener Datei synchron, wenn sich MCP-Werkzeuge oder Schemas ändern.

---

## App-Binärdateien und MCP-Hilfsprogramm

Die Binärdateien der Desktop- und Mobil-App enthalten die Mindwtr-App, derzeit jedoch **keinen** Desktop-Schalter zum Starten oder Stoppen. Das eigenständige MCP-Hilfsprogramm wird als [`mindwtr-mcp`](https://www.npmjs.com/package/mindwtr-mcp) veröffentlicht und ist im öffentlichen [MCP Registry](https://registry.modelcontextprotocol.io/) aufgeführt.

Sie müssen **nicht** die gesamte App aus dem Quellcode ausführen, um MCP zu verwenden. Verwenden Sie die normale Desktop-App für Ihre Aufgaben und lassen Sie dann Ihren MCP-Client `mindwtr-mcp` über `npx` starten, oder installieren Sie es global mit npm. Verweisen Sie das Hilfsprogramm auf die lokale Datei `mindwtr.db` der Desktop-App.

Auf dem Desktop zeigt die App den genauen lokalen Datenpfad unter **Einstellungen → Synchronisierung → Lokale Daten** an. Binärdateien für Mobilgeräte stellen keinen lokalen MCP-Server bereit.

---

## Voraussetzungen

- **Node.js 22+** für Installationen ohne Compiler: Die SQLite-Abhängigkeit liefert vorkompilierte Binärdateien für Node 22 und neuer. Node 20 kann den Server weiterhin ausführen, benötigt für die Installation aber C++-Buildwerkzeuge.
- **npm** oder einen anderen Node-Package-Runner für das veröffentlichte Paket `mindwtr-mcp`
- eine lokale Mindwtr-Datenbank (`mindwtr.db`) für den lokalen Modus oder eine selbst gehostete Mindwtr-Cloud-URL und ein Bearer-Token für den Cloud-Modus
- **Bun** nur, wenn Sie das Hilfsprogramm aus dem Quellbaum ausführen

### Standardspeicherorte der Datenbank

- **Linux:** `~/.local/share/mindwtr/mindwtr.db`
- **macOS:** `~/Library/Application Support/mindwtr/mindwtr.db`
- **Windows:** `%APPDATA%\mindwtr\mindwtr.db`

Zusätzlicher macOS-Pfad für sandboxed Builds:

- `~/Library/Containers/tech.dongdongbh.mindwtr/Data/Library/Application Support/mindwtr/mindwtr.db`

Sie können den lokalen Datenbankspeicherort überschreiben mit:

- `--db /path/to/mindwtr.db`
- Umgebungsvariable: `MINDWTR_DB_PATH` oder `MINDWTR_DB`

Verwenden Sie für den selbst gehosteten Cloud-Modus:

- `--cloud-url https://mindwtr.example.com` oder `MINDWTR_MCP_CLOUD_URL`
- `--cloud-token <token>` oder `MINDWTR_MCP_CLOUD_TOKEN`
- optional `--cloud-allow-insecure-http=true` für vertrauenswürdige private HTTP-Bereitstellungen

---

## Einrichtung und Konfiguration

MCP-Clients führen den Server als Unterprozess aus. Sie geben ihnen **den Befehl** und übergeben Argumente.

Empfohlener installationsfreier Befehl für MCP-Clients:

```json
{
  "command": "npx",
  "args": [
    "-y",
    "mindwtr-mcp",
    "--db",
    "/path/to/mindwtr.db"
  ]
}
```

Das Paket ist standardmäßig schreibgeschützt. Fügen Sie `--write` nur hinzu, wenn ein KI-Client ausdrücklich Mindwtr-Daten hinzufügen, aktualisieren, erledigen oder löschen können soll.

### Self-Hosted-Cloud-Modus

Verwenden Sie den Cloud-Modus, wenn Sie Ihren eigenen Mindwtr-Cloud-Server betreiben und MCP-Werkzeuge nutzen möchten, ohne eine lokale SQLite-Datei bereitzustellen:

```bash
npx -y mindwtr-mcp \
  --cloud-url "https://mindwtr.example.com" \
  --cloud-token "$MINDWTR_TOKEN"
```

Alternativ verwenden Sie Umgebungsvariablen in der Konfiguration eines MCP-Clients:

```json
{
  "command": "npx",
  "args": ["-y", "mindwtr-mcp"],
  "env": {
    "MINDWTR_MCP_CLOUD_URL": "https://mindwtr.example.com",
    "MINDWTR_MCP_CLOUD_TOKEN": "your-token"
  }
}
```

Der Cloud-Modus liest den aktuellen Schnappschuss von `/v1/data` aus Ihrem selbst gehosteten Cloud-Server und stellt Lesewerkzeuge für Aufgaben, Projekte, Abschnitte, Bereiche und Personen bereit. Mit `--write` laufen Schreibvorgänge für Aufgaben, Projekte, Abschnitte und Bereiche über die ressourcenspezifischen [REST-Endpunkte](../developers/cloud-api.md) des Cloud-Servers (`POST /v1/tasks`, `PATCH /v1/tasks/:id` usw.). Dadurch erhält jede Änderung dieselbe Validierung und Revisionsverfolgung wie Änderungen aus Ihren Apps. Ohne `--write` geben Schreibwerkzeuge `read_only` zurück. Personenänderungen und die Wiederherstellung gelöschter Aufgaben sind im Cloud-Modus noch nicht verfügbar. Verwenden Sie dafür das lokale Datenbankbackend.

Dies ist nicht der blockierte gehostete Mehrmandanten-Connector. Sie betreiben den Cloud-Server und das MCP-Hilfsprogramm weiterhin selbst; Mindwtr betreibt keinen Dienst, der die Aufgabendaten aller Benutzer speichert.

Für eine globale Installation verwenden Sie stattdessen:

```bash
npm install -g mindwtr-mcp
mindwtr-mcp --db "/path/to/mindwtr.db"
```

### Wichtige Argumente

- `--db "/path/to/mindwtr.db"`: Pfad zu Ihrer SQLite-Datenbank für den lokalen Modus.
- `--write`: Aktiviert Schreibvorgänge (hinzufügen, aktualisieren, erledigen, löschen) im lokalen oder Cloud-Modus. **Ohne dieses Flag ist der Server schreibgeschützt.**
- `--cloud-url "https://mindwtr.example.com"`: Verwendet statt einer lokalen Datenbank einen selbst gehosteten Mindwtr-Cloud-Endpunkt.
- `--cloud-token "<token>"`: Bearer-Token für den selbst gehosteten Cloud-Endpunkt.
- `--cloud-allow-insecure-http=true`: Erlaubt vertrauenswürdige private HTTP-Cloud-URLs, wenn Sie bewusst ohne HTTPS arbeiten.

### 1. Claude Desktop

Fügen Sie der Konfigurationsdatei von Claude Desktop einen Servereintrag hinzu.

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "~/.local/share/mindwtr/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

_Hinweis: Ersetzen Sie den DB-Pfad durch den tatsächlichen Pfad Ihrer lokalen Mindwtr-Datenbank._

### 2. Claude Code (CLI)

Sie können den Server über die CLI hinzufügen:

```bash
claude mcp add mindwtr -- \
  npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 3. OpenAI Codex (CLI/IDE-Erweiterung)

Codex liest die MCP-Serverkonfiguration aus `~/.codex/config.toml`. In einem vertrauenswürdigen Projekt können Sie auch eine projektbezogene `.codex/config.toml` verwenden. Codex CLI und IDE-Erweiterung verwenden dieselbe Konfiguration.

**Befehlszeile:**

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db"
```

Fügen Sie `--write` nur hinzu, wenn Codex lokale Mindwtr-Daten verändern können soll:

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

Führen Sie in der Codex-TUI `/mcp` aus, um zu prüfen, ob der Server aktiv ist.

**Manuelle Konfiguration:**

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db"
]
```

Mit Schreibzugriff:

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db",
  "--write"
]
```

### 4. Gemini CLI

Gemini CLI verwendet `settings.json` (Benutzer: `~/.gemini/settings.json` oder Projekt: `.gemini/settings.json`).

**Befehlszeile:**

```bash
gemini mcp add mindwtr \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

**Manuelle Konfiguration:**

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "/path/to/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

---

## Manuell ausführen

Normalerweise müssen Sie dies nicht manuell ausführen (das übernimmt der MCP-Client), für Tests kann es jedoch nützlich sein.

### Aus npm

```bash
# Read-only
npx -y mindwtr-mcp --db "/path/to/mindwtr.db"

# With write access
npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### Aus dem Quellcode (Bun)

```bash
# Read-only
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db"

# With write access
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db" --write
```

### Bauen und ausführen (Node)

```bash
# Build
bun run --filter mindwtr-mcp build

# Run
node apps/mcp-server/dist/index.js --db "/path/to/mindwtr.db"
```

---

## Migration: Werkzeugumbenennung (`mindwtr.*` → `mindwtr_*`)

Werkzeugnamen verwenden jetzt Unterstriche, etwa `mindwtr_list_tasks`. Ältere Namen mit Punkten werden nicht mehr dokumentiert.

---

## Verfügbare Werkzeuge

Nach dem Verbinden kann der KI-Agent auf diese Werkzeuge zugreifen. Standardmäßig ist der Server **schreibgeschützt**; übergeben Sie `--write`, um Schreibwerkzeuge zu aktivieren.
Für den Schreibzugriff wird ausschließlich `--write` unterstützt (keine alternativen Aliase).

| Werkzeug                 | Vorgang                  | Erfordert `--write` |
| ------------------------ | ------------------------ | ------------------- |
| `mindwtr_list_tasks`     | Aufgaben auflisten       | Nein                |
| `mindwtr_list_projects`  | Projekte auflisten       | Nein                |
| `mindwtr_get_project`    | Ein Projekt abrufen      | Nein                |
| `mindwtr_list_sections`  | Abschnitte auflisten     | Nein                |
| `mindwtr_get_section`    | Einen Abschnitt abrufen  | Nein                |
| `mindwtr_list_areas`     | Bereiche auflisten       | Nein                |
| `mindwtr_list_people`    | Personen auflisten       | Nein                |
| `mindwtr_get_person`     | Eine Person abrufen      | Nein                |
| `mindwtr_get_task`       | Eine Aufgabe nach ID abrufen | Nein             |
| `mindwtr_add_task`       | Aufgabe erstellen        | Ja                  |
| `mindwtr_update_task`    | Aufgabe aktualisieren    | Ja                  |
| `mindwtr_complete_task`  | Als erledigt markieren   | Ja                  |
| `mindwtr_delete_task`    | Aufgabe vorläufig löschen | Ja                 |
| `mindwtr_restore_task`   | Aufgabe wiederherstellen | Ja                  |
| `mindwtr_add_project`    | Projekt erstellen        | Ja                  |
| `mindwtr_update_project` | Projekt aktualisieren    | Ja                  |
| `mindwtr_delete_project` | Projekt vorläufig löschen | Ja                 |
| `mindwtr_add_section`    | Abschnitt erstellen      | Ja                  |
| `mindwtr_update_section` | Abschnitt aktualisieren  | Ja                  |
| `mindwtr_delete_section` | Abschnitt vorläufig löschen | Ja                |
| `mindwtr_add_area`       | Bereich erstellen        | Ja                  |
| `mindwtr_update_area`    | Bereich aktualisieren    | Ja                  |
| `mindwtr_delete_area`    | Bereich vorläufig löschen | Ja                 |
| `mindwtr_add_person`     | Person erstellen         | Ja                  |
| `mindwtr_update_person`  | Person aktualisieren     | Ja                  |
| `mindwtr_rename_person`  | Person umbenennen        | Ja                  |
| `mindwtr_delete_person`  | Person vorläufig löschen | Ja                  |

### Lesewerkzeuge

- **`mindwtr_list_tasks`**: Aufgaben mit Filtern auflisten (Status, Projekt, Datumsbereich, Suche).
- **`mindwtr_list_projects`**: Alle Projekte auflisten.
- **`mindwtr_get_project`**: Details eines bestimmten Projekts anhand der ID abrufen.
- **`mindwtr_list_sections`**: Projektabschnitte auflisten, optional nach Projekt gefiltert.
- **`mindwtr_get_section`**: Details eines bestimmten Abschnitts anhand der ID abrufen.
- **`mindwtr_list_areas`**: Alle Bereiche auflisten.
- **`mindwtr_list_people`**: Verwaltete Personendatensätze auflisten.
- **`mindwtr_get_person`**: Details einer bestimmten Person anhand der ID abrufen.
- **`mindwtr_get_task`**: Details einer bestimmten Aufgabe anhand der ID abrufen.

### Schreibwerkzeuge (erfordern `--write`)

Schreibwerkzeuge funktionieren sowohl mit der lokalen Datenbank als auch einem selbst gehosteten Cloud-Backend, mit zwei Ausnahmen im Cloud-Modus: Werkzeuge zum Schreiben von Personen und `mindwtr_restore_task` geben dort einen eindeutigen Fehler zurück, weil die Cloud-API noch keine Endpunkte dafür besitzt.

- **`mindwtr_add_task`**: Erstellt eine neue Aufgabe. Unterstützt natürlichsprachliches `quickAdd` (z. B. „Buy milk @errands /due:tomorrow“).
- **`mindwtr_update_task`**: Aktualisiert eine vorhandene Aufgabe einschließlich Planungsfeldern wie `dueDate`, `startTime`, `reviewAt` und `isFocusedToday` (Felder können mit `null` geleert werden).
- **`mindwtr_complete_task`**: Markiert eine Aufgabe als erledigt.
- **`mindwtr_delete_task`**: Löscht eine Aufgabe vorläufig.
- **`mindwtr_restore_task`**: Stellt eine vorläufig gelöschte Aufgabe wieder her.
- **`mindwtr_add_project`**: Erstellt ein neues Projekt, einschließlich optionalem `dueDate` und `reviewAt`.
- **`mindwtr_update_project`**: Aktualisiert ein Projekt, einschließlich optionalem `dueDate` und `reviewAt`.
- **`mindwtr_delete_project`**: Löscht ein Projekt vorläufig.
- **`mindwtr_add_section`**: Erstellt einen Abschnitt innerhalb eines Projekts.
- **`mindwtr_update_section`**: Aktualisiert einen Projektabschnitt.
- **`mindwtr_delete_section`**: Löscht einen Projektabschnitt vorläufig. Aufgaben in diesem Abschnitt bleiben erhalten und werden von Core in „kein Abschnitt“ verschoben.
- **`mindwtr_add_area`**: Erstellt einen neuen Bereich.
- **`mindwtr_update_area`**: Aktualisiert einen Bereich.
- **`mindwtr_delete_area`**: Löscht einen Bereich vorläufig.
- **`mindwtr_add_person`**: Erstellt eine verwaltete Person für Zuständigkeiten und Aufgaben im Status Warten.
- **`mindwtr_update_person`**: Aktualisiert die Metadaten einer verwalteten Person.
- **`mindwtr_rename_person`**: Benennt eine verwaltete Person um und aktualisiert optional exakt übereinstimmende Aufgabenzuweisungen.
- **`mindwtr_delete_person`**: Löscht eine verwaltete Person vorläufig, ohne Aufgabenzuweisungen zu entfernen.

Schemahinweis:
- Schreibwerkzeuge für Aufgaben umfassen `dueDate`, `startTime` und `reviewAt` (bei Aktualisierung).
- Schreibwerkzeuge für Projekte umfassen sowohl `dueDate` als auch `reviewAt`.
- Schreibwerkzeuge für Personen umfassen `name`, `note`, `referenceLink` und optionale Aktualisierungen von Zuweisungen beim Umbenennen.
- Die genauen maßgeblichen Eingaben finden Sie in [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md).

## Berechtigungsmatrix

Verwenden Sie diese Matrix, um zu entscheiden, ob der Server schreibgeschützt oder mit `--write` ausgeführt werden soll.

| Werkzeug                 | Datenzugriff             | Änderungsart                 | Schreibgeschützter Modus | Modus `--write` |
| ------------------------ | ------------------------ | ---------------------------- | ------------------------ | --------------- |
| `mindwtr_list_tasks`     | Aufgabenzeilen (gefiltert) | Keine                      | Erlaubt                  | Erlaubt         |
| `mindwtr_list_projects`  | Projektzeilen            | Keine                        | Erlaubt                  | Erlaubt         |
| `mindwtr_get_project`    | Einzelnes Projekt nach ID | Keine                       | Erlaubt                  | Erlaubt         |
| `mindwtr_list_sections`  | Abschnittszeilen         | Keine                        | Erlaubt                  | Erlaubt         |
| `mindwtr_get_section`    | Einzelner Abschnitt nach ID | Keine                     | Erlaubt                  | Erlaubt         |
| `mindwtr_list_areas`     | Bereichszeilen           | Keine                        | Erlaubt                  | Erlaubt         |
| `mindwtr_list_people`    | Personenzeilen           | Keine                        | Erlaubt                  | Erlaubt         |
| `mindwtr_get_person`     | Einzelne Person nach ID  | Keine                        | Erlaubt                  | Erlaubt         |
| `mindwtr_get_task`       | Einzelne Aufgabe nach ID | Keine                        | Erlaubt                  | Erlaubt         |
| `mindwtr_add_task`       | Aufgabentabelle          | Einfügen                     | Verweigert               | Erlaubt         |
| `mindwtr_update_task`    | Aufgabentabelle          | Aktualisieren                | Verweigert               | Erlaubt         |
| `mindwtr_complete_task`  | Aufgabentabelle          | Status aktualisieren         | Verweigert               | Erlaubt         |
| `mindwtr_delete_task`    | Aufgabentabelle          | Vorläufig löschen            | Verweigert               | Erlaubt         |
| `mindwtr_restore_task`   | Aufgabentabelle          | Vorläufige Löschung aufheben | Verweigert               | Erlaubt         |
| `mindwtr_add_project`    | Projekttabelle           | Einfügen                     | Verweigert               | Erlaubt         |
| `mindwtr_update_project` | Projekttabelle           | Aktualisieren                | Verweigert               | Erlaubt         |
| `mindwtr_delete_project` | Projekttabelle           | Vorläufig löschen            | Verweigert               | Erlaubt         |
| `mindwtr_add_section`    | Abschnittstabelle        | Einfügen                     | Verweigert               | Erlaubt         |
| `mindwtr_update_section` | Abschnittstabelle        | Aktualisieren                | Verweigert               | Erlaubt         |
| `mindwtr_delete_section` | Abschnittstabelle        | Vorläufig löschen            | Verweigert               | Erlaubt         |
| `mindwtr_add_area`       | Bereichstabelle          | Einfügen                     | Verweigert               | Erlaubt         |
| `mindwtr_update_area`    | Bereichstabelle          | Aktualisieren                | Verweigert               | Erlaubt         |
| `mindwtr_delete_area`    | Bereichstabelle          | Vorläufig löschen            | Verweigert               | Erlaubt         |
| `mindwtr_add_person`     | Personentabelle          | Einfügen                     | Verweigert               | Erlaubt         |
| `mindwtr_update_person`  | Personentabelle          | Aktualisieren                | Verweigert               | Erlaubt         |
| `mindwtr_rename_person`  | Personentabelle/Aufgaben | Umbenennen/Verweise aktualisieren | Verweigert          | Erlaubt         |
| `mindwtr_delete_person`  | Personentabelle          | Vorläufig löschen            | Verweigert               | Erlaubt         |

Praktische Hinweise:

- Verwenden Sie für Erkundung und Berichte standardmäßig den schreibgeschützten Modus.
- Aktivieren Sie `--write` nur für Backends, bei denen Sie dem KI-Client Bearbeitungen anvertrauen: eine lokale Datenbank oder Ihren eigenen Cloud-Server.
- Bevorzugen Sie bei Agentenabläufen eine ausdrückliche Bestätigung vor Lösch-/Erledigungsvorgängen.

## Beispiele für fortgeschrittene Nutzung

### 1) Geführte wöchentliche Durchsicht

1. `mindwtr_list_tasks` mit `status: "waiting"` und `status: "someday"`.
2. Festgefahrene Einträge nach Projekt zusammenfassen.
3. Für ausgewählte Einträge `mindwtr_update_task` aufrufen, um `reviewAt` zu setzen.

### 2) Posteingangssichtung

1. `mindwtr_list_tasks` mit `status: "inbox"` und `sortBy: "createdAt"`.
2. Jede Aufgabe mit `mindwtr_update_task` klassifizieren (`next`, `waiting`, `reference` usw.).
3. Fehlende Metadaten (Projekt, Kontexte, Tags) in einem zweiten Durchlauf hinzufügen.

### 3) Sicheres Muster für massenhaftes Abschließen

Für potenziell destruktive Automatisierungen:

1. Lesephase ausführen: nur IDs der Kandidaten auflisten.
2. Bestätigungszusammenfassung anzeigen (Anzahl und Titel).
3. Schreibvorgänge (`complete_task`/`delete_task`) erst nach ausdrücklicher Zustimmung des Benutzers ausführen.
4. IDs für ein Zurücksetzen über `restore_task` aufbewahren.

### 4) Schnellerfassung mit natürlicher Sprache

Verwenden Sie `mindwtr_add_task` und `quickAdd`:

```json
{
  "quickAdd": "Follow up with Alex +Hiring @work #ops /due:tomorrow 10am"
}
```

Verwenden Sie dies für schnelle Erfassungsabläufe, bei denen Parserbefehle effizienter sind, als jedes Feld einzeln zu setzen.

---

## Werkzeugreferenz

Alle Werkzeuge geben JSON im Feld `content.text` zurück. Parsen Sie das JSON, um die eigentlichen Nutzdaten abzurufen.

## Betriebsgrenzen

Diese Grenzen sind hilfreich, wenn Sie Mindwtr in Agentenabläufe einbinden:

- `mindwtr_list_tasks` verwendet standardmäßig `limit: 200` und begrenzt `limit` auf `500`.
- Aufgabentitel sind bei der MCP-Validierung zum Erstellen/Aktualisieren von Aufgaben auf `500` Zeichen begrenzt.
- Schnelleingaben sind beim Erstellen von MCP-Aufgaben auf `2000` Zeichen begrenzt, entsprechend der Schnelleingabegrenze der Cloud-Aufgaben-API.
- Die SQLite-Schicht verwendet ein `busy_timeout` von 5 Sekunden, sodass eine gesperrte Datenbank fehlschlagen sollte, statt unbegrenzt zu warten.

Wenn Sie mehr als 500 Aufgaben benötigen, blättern Sie mit `limit` und `offset`, statt eine einzige unbegrenzte Antwort zu erwarten.

### `mindwtr_list_tasks`

**Eingabefelder**

- `status`: `inbox | next | waiting | someday | reference | done | archived | all`
- `projectId`: string
- `includeDeleted`: boolean
- `limit`: number
- `offset`: number
- `search`: string
- `dueDateFrom`: ISO date or datetime string (compared by calendar date)
- `dueDateTo`: ISO date or datetime string (compared by calendar date)
- `sortBy`: `updatedAt | createdAt | dueDate | title | priority`
- `sortOrder`: `asc | desc`

**Beispiel**

```json
{
  "status": "next",
  "limit": 20,
  "offset": 0,
  "sortBy": "updatedAt",
  "sortOrder": "desc"
}
```

**Antwort**

```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "title": "Follow up with design",
      "status": "next",
      "updatedAt": "2026-01-25T03:45:57.246Z"
    }
  ]
}
```

### `mindwtr_list_projects`

**Eingabefelder**

- none

**Antwort**

```json
{
  "projects": [
    {
      "id": "project-uuid",
      "title": "Mindwtr",
      "status": "active"
    }
  ]
}
```

### `mindwtr_get_project`

**Eingabefelder**

- `id`: string (project UUID)
- `includeDeleted`: boolean (optional)

**Beispiel**

```json
{ "id": "project-uuid" }
```

### `mindwtr_list_sections`

**Eingabefelder**

- `projectId`: string (optional)
- `includeDeleted`: boolean (optional)

**Antwort**

```json
{
  "sections": [
    {
      "id": "section-uuid",
      "projectId": "project-uuid",
      "title": "Planning"
    }
  ]
}
```

### `mindwtr_get_section`

**Eingabefelder**

- `id`: string (section UUID)
- `includeDeleted`: boolean (optional)

**Beispiel**

```json
{ "id": "section-uuid" }
```

### `mindwtr_list_areas`

**Eingabefelder**

- none

**Antwort**

```json
{
  "areas": [
    {
      "id": "area-uuid",
      "name": "Work"
    }
  ]
}
```

### `mindwtr_list_people`

**Eingabefelder**

- `includeDeleted`: boolean (optional)

**Antwort**

```json
{
  "people": [
    {
      "id": "person-uuid",
      "name": "Alex"
    }
  ]
}
```

### `mindwtr_get_person`

**Eingabefelder**

- `id`: string (person UUID)
- `includeDeleted`: boolean (optional)

**Beispiel**

```json
{ "id": "person-uuid" }
```

### `mindwtr_get_task`

**Eingabefelder**

- `id`: string (task UUID)
- `includeDeleted`: boolean (optional)

**Beispiel**

```json
{ "id": "task-uuid" }
```

### `mindwtr_add_task` (write)

**Eingabefelder**

- `title`: string (required if `quickAdd` omitted)
- `quickAdd`: string (required if `title` omitted)
- `status`: `inbox | next | waiting | someday | reference | done | archived`
- `projectId`: string
- `dueDate`: ISO string
- `startTime`: ISO string
- `contexts`: string[]
- `tags`: string[]
- `description`: string
- `priority`: string
- `timeEstimate`: string (e.g. `30m`, `2h`)

**Beispiel**

```json
{
  "quickAdd": "Send invoice +Acme /due:tomorrow 9am #finance"
}
```

### `mindwtr_update_task` (write)

**Eingabefelder**

- `id`: string (task UUID)
- `title`, `status`, `projectId`, `dueDate`, `startTime`, `contexts`, `tags`, `description`, `priority`, `timeEstimate`, `reviewAt`, `isFocusedToday`

**Hinweise**

- Verwenden Sie `null`, um nullable Felder zu leeren. Dies gilt für Aufgabenfelder wie `projectId`, `dueDate`, `startTime`, `contexts` und `tags`; Projektfelder wie `areaId`, `dueDate`, `reviewAt` und `supportNotes`; `description` von Abschnitten; `color` und `icon` von Bereichen sowie `note` und `referenceLink` von Personen.

**Beispiel**

```json
{
  "id": "task-uuid",
  "status": "waiting",
  "reviewAt": "2026-01-27T09:00:00.000Z"
}
```

### `mindwtr_complete_task` (write)

**Eingabefelder**

- `id`: string (task UUID)

### `mindwtr_delete_task` (write)

**Eingabefelder**

- `id`: string (task UUID)

### `mindwtr_restore_task` (write)

**Eingabefelder**

- `id`: string (task UUID)

### `mindwtr_add_project` (write)

**Eingabefelder**

- `title`: string
- `color`: string (optional)
- `status`: `active | someday | waiting | archived` (optional)
- `areaId`: string or `null`
- `isSequential`: boolean (optional)
- `isFocused`: boolean (optional)
- `dueDate`: ISO string or `null`
- `reviewAt`: ISO string or `null`
- `supportNotes`: string or `null`

### `mindwtr_update_project` (write)

**Eingabefelder**

- `id`: string (project UUID)
- `title`, `color`, `status`, `areaId`, `isSequential`, `isFocused`, `dueDate`, `reviewAt`, `supportNotes`

### `mindwtr_delete_project` (write)

**Eingabefelder**

- `id`: string (project UUID)

### `mindwtr_add_section` (write)

**Eingabefelder**

- `projectId`: string
- `title`: string
- `description`: string or `null` (optional)
- `order`: number (optional)
- `isCollapsed`: boolean (optional)

### `mindwtr_update_section` (write)

**Eingabefelder**

- `id`: string (section UUID)
- `title`, `description`, `order`, `isCollapsed`

### `mindwtr_delete_section` (write)

**Eingabefelder**

- `id`: string (section UUID)

### `mindwtr_add_area` (write)

**Eingabefelder**

- `name`: string
- `color`: string (optional)
- `icon`: string (optional)

### `mindwtr_update_area` (write)

**Eingabefelder**

- `id`: string (area UUID)
- `name`, `color`, `icon`

### `mindwtr_delete_area` (write)

**Eingabefelder**

- `id`: string (area UUID)

### `mindwtr_add_person` (write)

**Eingabefelder**

- `name`: string
- `note`: string or `null` (optional)
- `referenceLink`: string or `null` (optional)

### `mindwtr_update_person` (write)

**Eingabefelder**

- `id`: string (person UUID)
- `name`, `note`, `referenceLink`

### `mindwtr_rename_person` (write)

**Eingabefelder**

- `id`: string (person UUID)
- `name`: string
- `updateTasks`: boolean (optional)

### `mindwtr_delete_person` (write)

**Eingabefelder**

- `id`: string (person UUID)

---

## Hinweise zum Ausgabeformat

- Werkzeugausgaben sind JSON-Strings und keine strukturierten MCP-Werte. Ihr Client sollte `content[0].text` parsen.
- Aufgaben-/Projekt-IDs sind UUIDs aus der lokalen SQLite-Datenbank.
- Daten sind ISO-8601-Strings (UTC).

---

## Sicherheit und Hinweise

- **Parallelität:** Der Server verwendet den SQLite-WAL-Modus. Schreibvorgänge können fehlschlagen, wenn die DB gesperrt ist; Clients sollten es erneut versuchen.
- **Gemeinsame Logik:** Schreibvorgänge verwenden die gemeinsame Bibliothek `@mindwtr/core`, damit Geschäftsregeln durchgesetzt werden.
- **Keep-Alive:** Der Server bleibt aktiv, solange `stdin` geöffnet ist.

## Fehlerbehebung

- **„Command not found“**: Verwenden Sie `npx -y mindwtr-mcp` in MCP-Clientkonfigurationen oder installieren Sie das Paket global mit `npm install -g mindwtr-mcp`.
- **Client-Verbindungsprobleme**: Stellen Sie sicher, dass Sie in Ihrer MCP-Clientkonfiguration NICHT `bun run` als Befehl verwenden, da dadurch zusätzlicher Text ausgegeben werden kann. Bevorzugen Sie `npx -y mindwtr-mcp`; führen Sie bei ausgechecktem Quellcode `bun` direkt mit der Quelldatei oder `node` mit der gebauten Datei aus.
