# Entwicklerleitfaden

Dieser Leitfaden behandelt die Einrichtung der Entwicklungsumgebung und Richtlinien für Beiträge zu Mindwtr.

---

## Produktphilosophie

Mindwtr ist so konzipiert, dass es **standardmäßig einfach und bei Bedarf leistungsfähig** ist. Unser Schwerpunkt liegt darauf, die kognitive Belastung zu verringern, Überflüssiges zu entfernen und die Benutzer im Arbeitsfluss zu halten. Jeder Beitrag wird an diesen Grundsätzen gemessen:

- **Progressive Offenlegung**: Erweiterte Optionen bleiben verborgen, bis sie relevant sind.
- **Standardmäßig weniger**: weniger Felder, weniger Stellschrauben, weniger Ablenkungen.
- **Funktionsausweitung vermeiden**: Wir geben Klarheit Vorrang vor Überfrachtung.
- **Automatisch ist besser als manuell**: Wenn sich das richtige Ergebnis ableiten oder vorhersagen lässt — aus Plattform, Installationskanal, vorhandenen Daten oder Kontext —, sollte die App es einfach umsetzen. Das gilt überall, nicht nur für Einstellungen: keine zu konfigurierende Option, keine Frage, die die App selbst beantworten kann, kein zusätzlicher Tipp oder manueller Schritt in einem Arbeitsablauf und keine Benutzeroberfläche, die für das offensichtliche Ergebnis bedient werden muss. Jeder manuelle Schritt verlagert kognitive Belastung von uns (einmal) auf alle Benutzer (für immer). Die Aktualisierungsprüfung dient als Vorbild: Statt eines Schalters „Aktualisierungsprüfungen deaktivieren“ erkennt die App ihre Installationsart und verhält sich je Kanal richtig — Installationen über Paketmanager bleiben von selbst still, ohne dass eine Einstellung ausgeliefert wird. Wenn sich das richtige Verhalten tatsächlich nicht ableiten lässt und eine echte Nachfrage besteht, setzen Sie die Funktion hinter einen vorhandenen Schalter oder eine vorhandene Bedienmöglichkeit, bevor Sie eine neue schaffen.

_Zeig mir kein Cockpit, wenn ich nur Fahrrad fahren möchte._

Die zugrunde liegenden Leitplanken für Datensicherheit und Synchronisierung finden Sie unter [Engineering-Prinzipien](/de/developers/engineering-principles).

---

## Schnellstart

```bash
# Clone repository
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run desktop app (dev mode)
bun desktop:dev

# Run mobile app
bun mobile:start
```

---

## Voraussetzungen

### Alle Plattformen

- [Bun](https://bun.sh/) — Paketmanager und Laufzeit
- [Node.js](https://nodejs.org/) — JavaScript-Laufzeit (für einige Werkzeuge)
- [Git](https://git-scm.com/) — Versionsverwaltung

### Desktop-Entwicklung

- [Rust](https://rustup.rs/) — Für Tauri erforderlich

**Linux (Arch):**
```bash
sudo pacman -S rust webkit2gtk-4.1 base-devel
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential libssl-dev libgtk-3-dev
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**macOS:**
```bash
xcode-select --install
brew install rust
```

**Windows:**
Installieren Sie [Rust](https://rustup.rs/) und die [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/).

### Entwicklung für Mobilgeräte

- [Expo Go](https://expo.dev/client)-App (zum Testen)
- Android Studio (für Emulator-/Geräte-Builds)
- Xcode (für die iOS-Entwicklung)

---

## Projektstruktur

```
Mindwtr/
├── apps/
│   ├── cloud/             # Sync server (Bun)
│   ├── desktop/           # Tauri v2 + React + Vite
│   │   ├── src/           # React source
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── lib/
│   │   │   └── App.tsx
│   │   ├── src-tauri/     # Rust backend
│   │   └── package.json
│   │
│   └── mobile/            # Expo + React Native
│       ├── app/           # Expo Router pages
│       ├── components/
│       ├── contexts/
│       ├── lib/
│       └── package.json
│
├── packages/
│   └── core/              # Shared business logic
│       └── src/
│           ├── store.ts   # Zustand store
│           ├── types.ts   # TypeScript types
│           ├── i18n.ts    # Translations
│           └── ...
│
├── scripts/               # Utility scripts (CLI, API, release)
├── docs/                  # Repository-local docs: ADRs, release notes, contribution docs
├── wiki/                  # Retired GitHub Wiki landing page (points to the docs site)
├── .github/               # CI/CD workflows
└── package.json           # Monorepo root
```

Öffentliche Benutzer- und Entwicklerdokumentation wird im Verzeichnis `docs/` dieses Repositorys gepflegt und unter https://docs.mindwtr.app/ veröffentlicht. Die öffentliche Quelle ist https://github.com/dongdongbh/mindwtr-web/tree/main/docs. Verwenden Sie für neue oder migrierte Leitfadenseiten vorzugsweise dieses Dokumentations-Repository.

Quelle der öffentlichen Dokumentation: https://github.com/dongdongbh/mindwtr-web/tree/main/docs

---

## Verfügbare Skripte

### Stammebene

| Befehl               | Beschreibung              |
| -------------------- | ------------------------ |
| `bun install`        | Alle Abhängigkeiten installieren |
| `bun desktop:dev`    | Desktop im Entwicklungsmodus ausführen  |
| `bun mobile:start`   | Expo-Entwicklungsserver starten    |
| `bun mobile:android` | Unter Android ausführen           |
| `bun mobile:ios`     | Unter iOS ausführen               |
| `bun test`           | Alle Tests ausführen            |
| `bun mindwtr:cli`    | CLI-Werkzeug ausführen             |
| `bun mindwtr:api`    | Lokalen API-Server ausführen     |

### Desktop (`apps/desktop`)

| Befehl      | Beschreibung              |
| ----------- | ------------------------ |
| `bun dev`   | Entwicklungsmodus mit Hot Reload |
| `bun build` | Für die Produktion bauen     |
| `bun test`  | Tests ausführen                |

### Mobilgeräte (`apps/mobile`)

| Befehl          | Beschreibung       |
| --------------- | ----------------- |
| `bun start`     | Expo-Server starten |
| `bun android`   | Unter Android ausführen    |
| `bun ios`       | Unter iOS ausführen        |
| `ARCHS=arm64-v8a bash ./scripts/android_build.sh` | Android-APK bauen |

### Cloud (`apps/cloud`)

| Befehl    | Beschreibung     |
| --------- | --------------- |
| `bun dev` | Synchronisierungsserver ausführen |

### Core (`packages/core`)

| Befehl      | Beschreibung    |
| ----------- | -------------- |
| `bun test`  | Unit-Tests ausführen |
| `bun build` | Paket bauen  |

---

## Technologie-Stack

| Schicht       | Desktop          | Mobilgeräte            | Cloud            |
| ------------- | ---------------- | --------------------- | ---------------- |
| **Framework** | React + Vite     | React Native + Expo   | Bun (Native HTTP)|
| **Styling**   | Tailwind CSS     | NativeWind (Tailwind) | N/A              |
| **Zustand**   | Zustand (gemeinsam) | Zustand (gemeinsam) | N/A              |
| **Plattform** | Tauri v2 (Rust)  | Expo (iOS/Android)    | Bun              |
| **Router**    | React Router     | Expo Router           | N/A              |
| **Sprache**   | TypeScript       | TypeScript            | TypeScript       |

---

## Architekturentscheidungen

Wir halten wichtige technische Entscheidungen als ADRs unter `docs/adr/` fest. Siehe:

- `docs/adr/README.md`

Aktuelle Synchronisierungs-ADRs, die vor einer Änderung des Zusammenführungs- oder Transportverhaltens bekannt sein sollten:

- ADR 0003 definiert revisionsbewusste Synchronisierungsmetadaten (`rev`, `revBy`) und eine deterministische, Tombstone-bewusste Zusammenführung.
- ADR 0007 definiert die ausgelieferte Live-Wins-Regel für mehrdeutige Konflikte zwischen Löschung und aktivem Datensatz.
- ADR 0008 hält fest, dass Mindwtr vorerst bewusst bei der Snapshot-basierten Synchronisierung bleibt, statt ein Delta-Protokoll hinzuzufügen.

Mitwirkende sollten den Snapshot-Transport als bewusste Produktentscheidung behandeln, nicht als fehlende Infrastruktur. Bewerten Sie ADR 0008 nur neu, wenn Snapshot-Dateien regelmäßig 5 MB überschreiten, Synchronisierungs-Roundtrips in typischen Netzwerken länger als 5 Sekunden dauern oder Mindwtr Echtzeit-Streaming zwischen mehreren Geräten benötigt.

---

## Entwicklungsablauf

### Änderungen vornehmen

1. Einen Feature-Branch erstellen
2. Änderungen im betreffenden Paket vornehmen
3. Tests ausführen: `bun test`
4. Auf dem Desktop testen: `bun desktop:dev`
5. Auf Mobilgeräten testen: `bun mobile:start`
6. Mit einer aussagekräftigen Nachricht committen
7. Einen Pull Request öffnen

Aktualisieren Sie beim Hinzufügen eines neuen Entitätstyps auf oberster Ebene in derselben Änderung die gesamte Persistenz- und Synchronisierungsoberfläche: Core-`AppData`-Typen und Normalisierung, Desktop-SQLite-Schema/-Speicher-Roundtrip-Tests, mobiles SQLite-Schema/Wiederherstellung aus Sicherung, Cloud-Validierung/-Normalisierung, MCP-Werkzeuge, sofern verfügbar gemacht, sowie die Quelle der Core-API-Dokumentation unter https://github.com/dongdongbh/mindwtr-web/tree/main/docs.

### Codestil

- TypeScript für den gesamten Code
- Funktionale React-Komponenten
- Benannte Exporte werden bevorzugt
- JSDoc-Kommentare für öffentliche APIs

### Tests

```bash
# Run all tests
bun test

# Run desktop tests
cd apps/desktop && bun test

# Run core tests
cd packages/core && bun test
```

---

## Für die Produktion bauen

### Desktop

```bash
cd apps/desktop
bun run build
# Output: src-tauri/target/release/
```

### Desktop (Diagnose-Build)

Release-Builds deaktivieren die Devtools standardmäßig. Um Diagnose/Devtools zu aktivieren, bauen Sie mit dem
Feature `diagnostics` und stimmen Sie zur Laufzeit ausdrücklich zu:

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Mobilgeräte (Android-APK)

```bash
cd apps/mobile
ARCHS=arm64-v8a bash ./scripts/android_build.sh
```

Ausführliche Build-Anweisungen finden Sie unter [Mobile Installation](/de/start/mobile-installation).

---

## Architekturüberblick

Ausführliche Informationen zum technischen Design finden Sie unter [Architektur](/de/developers/architecture).

### Grundkonzepte

- **Monorepo:** Ein einziges Repository mit gemeinsamen Abhängigkeiten
- **Gemeinsamer Core:** Geschäftslogik in `@mindwtr/core`
- **Plattform-Apps:** Desktop und Mobilgeräte verwenden den gemeinsamen Core
- **Lokaler Speicher:** Daten werden lokal persistent gespeichert
- **Mehrere Synchronisierungsarten:** Datei-, WebDAV- oder Cloud-Synchronisierung

---

## CLI-Werkzeug

Befehlszeilenschnittstelle für Skripting und Automatisierung:

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

**Optionen:**

- `--data <path>` — Speicherort von data.json überschreiben
- `--db <path>` — Speicherort von mindwtr.db überschreiben
- `MINDWTR_DATA` — Umgebungsvariable für den Datenpfad
- `MINDWTR_DB_PATH` — Umgebungsvariable für den DB-Pfad

Auf Desktop-kompatiblen Pfaden hält die CLI `mindwtr.db` und `data.json` synchron, sodass Änderungen vor und nach dem Start der App sichtbar bleiben.

---

## Lokale REST-API

Starten Sie einen lokalen API-Server für Skripting und Integrationen:

```bash
# Start API server
bun mindwtr:api -- --port 4317

# With auth token
MINDWTR_API_TOKEN=secret bun mindwtr:api -- --port 4317
```

Die lokale API verwendet denselben Speichervertrag wie die CLI und hält `mindwtr.db` und `data.json` auf Desktop-kompatiblen Pfaden synchron.

### Endpunkte

| Methode  | Endpunkt              | Beschreibung           |
| -------- | --------------------- | --------------------- |
| `GET`    | `/health`             | Zustandsprüfung          |
| `GET`    | `/tasks`              | Aufgaben auflisten            |
| `GET`    | `/tasks?status=next`  | Nach Status filtern      |
| `GET`    | `/tasks?query=@work`  | Aufgaben suchen          |
| `POST`   | `/tasks`              | Aufgabe erstellen           |
| `PATCH`  | `/tasks/:id`          | Aufgabe aktualisieren           |
| `DELETE` | `/tasks/:id`          | Aufgabe vorläufig löschen      |
| `POST`   | `/tasks/:id/complete` | Aufgabe als erledigt markieren        |
| `POST`   | `/tasks/:id/archive`  | Aufgabe als archiviert markieren    |
| `POST`   | `/tasks/:id/restore`  | Gelöschte Aufgabe wiederherstellen  |
| `GET`    | `/projects`           | Projekte auflisten         |
| `GET`    | `/search?query=...`   | Aufgaben und Projekte suchen |

**Beispiel:**
```bash
# Add task via API
curl -X POST http://localhost:4317/tasks \
  -H "Content-Type: application/json" \
  -d '{"input": "Review PR @work /due:tomorrow"}'

# Complete task
curl -X POST http://localhost:4317/tasks/<id>/complete
```

---

## Cloud-Server

Selbst gehostetes Backend für die Cloud-Synchronisierung:

```bash
# From monorepo root
bun run --filter mindwtr-cloud dev -- --port 8787
```

### Endpunkte

| Methode | Endpunkt   | Beschreibung    |
| ------ | ---------- | -------------- |
| `GET`  | `/health`  | Zustandsprüfung   |
| `HEAD` | `/v1/data` | Snapshot-Metadaten abrufen |
| `GET`  | `/v1/data` | Benutzerdaten abrufen  |
| `PUT`  | `/v1/data` | Benutzerdaten zusammenführen und speichern; gibt Zusammenführungsstatistik zurück |
| `GET`, `POST` | `/v1/tasks` | Aufgaben auflisten oder erstellen |
| `GET`, `PATCH`, `DELETE` | `/v1/tasks/:id` | Aufgabe lesen, aktualisieren oder vorläufig löschen |
| `POST` | `/v1/tasks/:id/complete` | Aufgabe als erledigt markieren |
| `POST` | `/v1/tasks/:id/archive` | Aufgabe archivieren |
| `GET`, `POST` | `/v1/projects` | Projekte auflisten oder erstellen |
| `GET`, `PATCH`, `DELETE` | `/v1/projects/:id` | Projekt lesen, aktualisieren oder vorläufig löschen |
| `GET`, `POST` | `/v1/sections` | Abschnitte auflisten oder erstellen |
| `GET`, `PATCH`, `DELETE` | `/v1/sections/:id` | Abschnitt lesen, aktualisieren oder vorläufig löschen |
| `GET`, `POST` | `/v1/areas` | Bereiche auflisten oder erstellen |
| `GET`, `PATCH`, `DELETE` | `/v1/areas/:id` | Bereich lesen, aktualisieren oder vorläufig löschen |
| `GET` | `/v1/search` | Aufgaben und Projekte suchen |
| `GET`, `PUT`, `DELETE` | `/v1/attachments/*` | Anhangsdateien herunterladen, hochladen oder löschen |
| `POST`, `DELETE` | `/v1/attachments/orphans` | Verwaiste Anhangsdateien suchen oder entfernen |

**Authentifizierung:** `Authorization: Bearer <token>`

Jedes Token erhält eine eigene Datendatei (SHA-256-gehashter Dateiname).

**Umgebung:**

- `PORT` — Server-Port (Standard 8787)
- `HOST` — Bind-Adresse (Standard 0.0.0.0)
- `MINDWTR_CLOUD_DATA_DIR` — Datenverzeichnis

---

## Web-App (PWA)

Führen Sie die Desktop-Benutzeroberfläche mit PWA-Unterstützung in einem Browser aus:

```bash
# Development
bun desktop:web

# Production build
bun desktop:web:build
```

Verwendet localStorage zur Datenspeicherung und bietet Offline-Unterstützung über einen Service Worker.

---

## Siehe auch

- [Architektur](/de/developers/architecture)
- [Core-API](/de/developers/core-api)
- [Mitwirken (Repository-Anleitung)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
