# Diagnose und Protokolle

Mindwtr besitzt eine integrierte Diagnoseprotokollierung zur Fehlersuche bei Synchronisierungsproblemen und Abstürzen. Protokolle bleiben **ausschließlich lokal**; vertrauliche Werte werden vor dem Schreiben **unkenntlich gemacht**.

---

## Mit Beispieldaten aufnehmen

Wähle **Einstellungen → Daten → Sandbox öffnen**, um Mindwtr mit erfundenen Aufgaben und Projekten auszuprobieren. Ein Sandbox-Hinweis bleibt sichtbar und bietet Aktionen zum Zurücksetzen der Beispieldaten und Verlassen der Sandbox. Auf Mobilgeräten stehen dort kurz **Sandbox**, **Zurücksetzen** und **Verlassen**.

Die Option steht bei der Diagnose. Vor dem Öffnen erklärt ein Bestätigungsdialog die Sandbox. Mit **Abbrechen** bleibst du in deinem persönlichen Arbeitsbereich.

Der Beispielarbeitsbereich enthält Aufgaben in verschiedenen Status, Bereiche, Projekte und Abschnitte, wiederkehrende Aufgaben, Checklisten, Notizen, Tags, Kontexte, Personen sowie Beispiele für Termine und Prioritäten. Du kannst sie während einer Aufnahme bearbeiten. Änderungen sind vorübergehend; das Zurücksetzen lädt die ursprünglichen Beispieldaten.

Beispielinhalte gibt es auf Englisch, Deutsch, Französisch, Spanisch, Russisch und vereinfachtem Chinesisch. Sie richten sich nach der App-Sprache; für andere Sprachen wird Englisch verwendet.

Deine persönliche Datenbank bleibt getrennt. Beim Verlassen der Sandbox kehrst du zu ihr zurück. Auch ein Neustart nach dem Öffnen der Sandbox führt zum persönlichen Arbeitsbereich zurück. Vor dem Öffnen werden laufende Synchronisation und lokale Schreibvorgänge abgeschlossen; neue Synchronisationsversuche der App bleiben während des Wechsels gesperrt. Bei Zeitüberschreitung oder einem Speicherfehler bleibst du im persönlichen Arbeitsbereich. Sandbox-Änderungen werden weder synchronisiert noch an Widgets, Uhr, Erinnerungen, externe Kalender oder Erfassungsintegrationen übertragen.

Beispieldaten können Fehler mit bestimmten eigenen Aufgaben, Anhängen oder dem Synchronisierungsverlauf möglicherweise nicht nachstellen. Prüfe Aufnahmen vor dem Teilen: Die Sandbox verbirgt keine Betriebssystembenachrichtigungen oder anderen Apps.

---

## Debug-Protokollierung aktivieren

### Desktop

1. Öffnen Sie **Einstellungen → Daten**.
2. Aktivieren Sie **Debug-Protokollierung**.
3. Reproduzieren Sie das Problem.

**Diagnose-Builds einer Release-Version:** Entwicklerwerkzeuge und zusätzliche Protokollierung sind nur verfügbar, wenn die Desktop-App mit dem Feature `diagnostics` gebaut wurde.

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Mobilgeräte

1. Öffnen Sie **Einstellungen → Daten**.
2. Aktivieren Sie **Debug-Protokollierung**.
3. Reproduzieren Sie das Problem.

---

## Protokolle teilen oder löschen

### Desktop

- Der Pfad der Protokolldatei wird unter **Einstellungen → Daten** angezeigt.
- Dort können Sie die Protokolle auch löschen.

### Mobilgeräte

- Mit **Protokoll teilen** exportieren Sie eine Protokolldatei.
- Mit **Protokoll löschen** entfernen Sie alte Einträge.

---

## Standardmäßige Protokollpfade (Desktop)

| Plattform | Protokolldatei |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| Windows (Microsoft Store) | `%LOCALAPPDATA%/Packages/<package>/LocalCache/Roaming/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## Was protokolliert wird

- Fehler und Schritte der Synchronisierung
- Konfliktzusammenfassungen: Zusammenführungen mit gelösten Konflikten werden auch bei deaktivierter Debug-Protokollierung immer in `mindwtr.log` geschrieben, damit die Lösung später nachvollziehbar bleibt. Diese Einträge enthalten Datensatz-IDs, Namen geänderter Felder und die gewählte Seite, jedoch niemals Inhalte wie Titel oder Notizen.
- Unerwartete Laufzeitfehler

Vertrauliche Werte wie API-Schlüssel, Token, Passwörter und URLs mit Zugangsdaten werden automatisch unkenntlich gemacht.

---

## Verwandte Seiten

- [FAQ](/de/start/faq)
- [Daten und Synchronisierung](/de/data-sync/)
