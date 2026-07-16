# Cloud-API

Mindwtr Cloud stellt eine kleine Bearer-Token-API für Synchronisierung, Aufgabenautomatisierung und Anhangsübertragung bereit. Sie ist für selbst gehostete Bereitstellungen ausgelegt und verwendet denselben Token-Namensraum wie das selbst gehostete Cloud-Backend.

## Authentifizierung

Senden Sie bei jeder `/v1/*`-Anfrage ein Bearer-Token:

```http
Authorization: Bearer <token>
```

Verwenden Sie in der Produktion `MINDWTR_CLOUD_AUTH_TOKENS` oder `MINDWTR_CLOUD_AUTH_TOKENS_FILE`. `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` ist nur für kontrollierte Automatisierung vorgesehen und begrenzt neue Namensräume mit `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES`.

## Systemzustand

```text
GET /health
```

Gibt den Zustand des Servers ohne Authentifizierung zurück.

## Snapshot-Synchronisierung

```text
GET /v1/data
PUT /v1/data
```

`GET /v1/data` gibt den Snapshot des authentifizierten Namensraums zurück. Wenn der Namensraum nicht vorhanden ist und Schreibvorgänge zulässig sind, erstellt der Server einen leeren Snapshot.

`PUT /v1/data` validiert die hochgeladenen `AppData`, führt sie mithilfe des Core-Synchronisierungsalgorithmus mit dem vorhandenen Namensraum zusammen, validiert das zusammengeführte Ergebnis und schreibt es zurück. Dies ist kein erzwungenes Überschreiben. Eine erfolgreiche Antwort gibt `{ ok: true, stats, clockSkewWarning }` zurück, wobei `stats` dieselbe Form der Zusammenführungsstatistik hat, die von der lokalen Synchronisierungsdiagnose verwendet wird.

## Aufgaben

```text
GET /v1/tasks
POST /v1/tasks
GET /v1/tasks/:id
PATCH /v1/tasks/:id
DELETE /v1/tasks/:id
POST /v1/tasks/:id/complete
POST /v1/tasks/:id/archive
```

Abfrageparameter für Listen:

| Parameter | Zweck |
| --- | --- |
| `query` | Textsuche ohne Beachtung der Groß-/Kleinschreibung in Aufgabentitel und Metadaten. |
| `status` | Ein Aufgabenstatus: `inbox`, `next`, `waiting`, `someday`, `reference`, `done` oder `archived`. |
| `all=1` | Erledigte Aufgaben einbeziehen. |
| `deleted=1` | Vorläufig gelöschte Aufgaben einbeziehen. |
| `limit`, `offset` | Seitengröße und Startversatz. |

Beim Erstellen werden entweder `title` oder die Schnelleingabe `input` sowie optional `props` akzeptiert. Patch akzeptiert Aufgabenfelder, die von der Cloud-Validierungsschicht unterstützt werden, und erhöht die Metadaten der Synchronisierungsrevision.

## Projekte, Bereiche und Abschnitte

```text
GET /v1/projects
POST /v1/projects
GET /v1/projects/:id
PATCH /v1/projects/:id
DELETE /v1/projects/:id

GET /v1/areas
POST /v1/areas
GET /v1/areas/:id
PATCH /v1/areas/:id
DELETE /v1/areas/:id

GET /v1/sections
POST /v1/sections
GET /v1/sections/:id
PATCH /v1/sections/:id
DELETE /v1/sections/:id
```

Alle Listenendpunkte akzeptieren `limit`, `offset` und `deleted=1`. Abschnitte akzeptieren außerdem `projectId`.

Referenzfelder müssen auf aktive Datensätze verweisen. Die `areaId` eines Projekts muss einen aktiven Bereich referenzieren. Verwenden Sie `areaId: null`, um den Bereich eines Projekts zu entfernen; `areaId: ""` ist ungültig. Die `projectId` eines Abschnitts muss auf ein aktives Projekt verweisen.

Beim Löschen von Bereichen, Projekten und Abschnitten werden Tombstones und eine serverseitige Reparatur verwendet, damit der Snapshot für die Synchronisierung gültig bleibt.

## Suche

```text
GET /v1/search?query=<text>
```

Die Suche gibt aktive Aufgaben und Projekte in getrennten Arrays zurück. Sie unterstützt die gemeinsamen Parameter `limit` und `offset` sowie unabhängige Cursor:

| Parameter | Zweck |
| --- | --- |
| `taskLimit`, `taskOffset` | Seitennavigation durch die Ergebnismenge der Aufgaben. |
| `projectLimit`, `projectOffset` | Seitennavigation durch die Ergebnismenge der Projekte. |

Die Antwort enthält `taskTotal`, `projectTotal` und die tatsächlich verwendeten Cursorwerte.

## Anhänge

```text
GET /v1/attachments/:path
PUT /v1/attachments/:path
DELETE /v1/attachments/:path

POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

Anhangspfade werden innerhalb des authentifizierten Token-Namensraums aufgelöst. Für Uploads gelten die konfigurierte Bytegrenze und die Core-Validierungsregeln für Anhänge.

Der Endpunkt zum Bereinigen verwaister Dateien durchsucht den Namensraum nach Dateien, auf die `data.json` nicht mehr verweist. Dateien, die in den letzten fünf Minuten geändert wurden, werden übersprungen, damit ein Upload, der zeitgleich mit einem späteren Snapshot-Schreibvorgang erfolgt, nicht entfernt wird.

## MCP-Adapter

Die veröffentlichte Hilfsanwendung `mindwtr-mcp` kann einen selbst gehosteten Cloud-Endpunkt als Backend verwenden. Konfigurieren Sie sie mit `--cloud-url` und `--cloud-token` oder den Umgebungsvariablen `MINDWTR_MCP_CLOUD_URL` / `MINDWTR_MCP_CLOUD_TOKEN`.

Der Cloud-gestützte MCP-Modus liest `/v1/data` und stellt Lesewerkzeuge für Aufgaben, Projekte, Abschnitte, Bereiche und Personen bereit. Mit `--write` leitet er Änderungen an Aufgaben, Projekten, Abschnitten und Bereichen über die oben genannten ressourcenspezifischen REST-Endpunkte; standardmäßig bleibt er schreibgeschützt und verwandelt Mindwtr Cloud selbst nicht in einen gehosteten MCP-Dienst.

## Verwandte Seiten

- [MCP-Server](/de/power-users/mcp)
- [Cloud-Bereitstellung](/de/data-sync/cloud-deployment)
- [Cloud-Bereitstellung](/de/data-sync/cloud-deployment)
- [Synchronisierungsalgorithmus](/de/data-sync/sync-algorithm)
