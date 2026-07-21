# Daten aus anderen Apps importieren

Dieser Leitfaden beschreibt, wie Sie Aufgaben aus einer anderen Aufgabenverwaltung nach Mindwtr übertragen. Er ist für vollständige Migrationen gedacht, nicht für das schnelle, einmalige Erfassen einzelner Aufgaben.

## Vor dem Import

Eine Migration ist ein guter Zeitpunkt, alten Ballast zurückzulassen. Wenn Ihre bisherige App Hunderte veraltete Aufgaben enthält, sollten Sie nur Ihre aktuellen Projekte, aktiven nächsten Aktionen und verlässlichen Referenzeinträge übertragen.

Mindwtr kann vollständige Exporte aus unterstützten Apps importieren. Eine kleinere, bewusst ausgewählte Migration passt jedoch meist besser zu GTD, als jede alte Aufgabe in ein neues System zu kopieren.

## Verfügbare Importer

Mindwtr bietet vollwertige Importer für einige Apps, deren Exportformat strukturiert genug für eine sichere Zuordnung ist:

- [TickTick-Import](/de/import/ticktick) – CSV- oder ZIP-Sicherungen aus TickTick
- [Todoist-Import](/de/import/todoist) – CSV-Exporte oder ZIP-Sicherungen
- [DGT-GTD-Import](/de/import/dgt-gtd) – JSON-Exporte oder ZIP-Sicherungen
- [OmniFocus-Import](/de/import/omnifocus) – CSV-, JSON- oder ZIP-Exporte
- [Import aus Apple Erinnerungen](/de/data-sync/#apple-reminders-import-ios) – nur unter iOS verfügbarer Import unerledigter Erinnerungen aus einer ausgewählten Erinnerungsliste

Öffnen Sie **Einstellungen → Daten** und wählen Sie die passende Importaktion. Mindwtr zeigt eine Vorschau an, bevor Daten hinzugefügt werden.

Native Importer sind die beste Wahl, wenn Ihre bisherige App aufgeführt ist. Sie erhalten mehr Struktur als einfacher Text und berücksichtigen app-spezifische Details wie Ordner, Listen, Tags, Daten, Checklisten und Wiederholungen, sofern der Quellexport diese enthält.

## Importtreue im Überblick

Diese Übersicht wurde am 21. Juli 2026 mit dem Importcode aus Mindwtr-Commit [18b11a6](https://github.com/dongdongbh/Mindwtr/commit/18b11a6814fbde064df627fcaf63143c4279bd5b) abgeglichen. Die Import-Fixtures decken Todoist CSV und ZIP, TickTick 7.1 CSV und ZIP, DGT-Schema Version 3 als JSON und ZIP sowie OmniFocus CSV, UTF-16-CSV, JSON und ZIP ab. Exportformate können sich ändern. Prüfen Sie daher die Vorschau und den jeweiligen App-Leitfaden, bevor Sie den Import bestätigen.

| Quelle | Beste Eingabe | Mindwtr erhält | Nach dem Import prüfen |
| --- | --- | --- | --- |
| [TickTick](/de/import/ticktick) | CSV- oder ZIP-Sicherung | Ordner als Bereiche, Listen als Projekte, Tags, Prioritäten, Daten, Checklisten, Abschlussstatus und unterstützte Wiederholungen | Anhänge, Darstellungsdetails, Warnungen und Zuordnung von über- und untergeordneten Aufgaben |
| [Todoist](/de/import/todoist) | CSV- oder ZIP-Sicherung | Projekte, Abschnitte, aktive Aufgaben, Beschreibungen und Kommentare, Prioritäten, Fälligkeitsdaten, Labels und Unteraufgaben als Checklistenpunkte | Wiederholungen, die einmalig mit dem Originaltext importiert werden; übersprungene oder fehlerhafte Zeilen |
| [DGT GTD](/de/import/dgt-gtd) | JSON- oder ZIP-Sicherung | Ordner als Bereiche, Projekte, Kontexte, Tags, Checklisten, Prioritäten, Fälligkeitsdaten, Abschlussstatus und unterstützte Wiederholungen | Nicht unterstützte Wiederholungen und übersprungene Archiveinträge |
| [OmniFocus](/de/import/omnifocus) | Omni-Automation-JSON oder ZIP für die beste Übernahme; CSV wird unterstützt | Ordner als Bereiche, Projekte, Tags, Kontexte, Notizen, Daten, Abschlussstatus, einfache Verschachtelung und unterstützte Wiederholungen | Tiefe Verschachtelung, geplante Daten und Dauertext sowie CSV-bedingte Verluste |
| [Apple Erinnerungen](/de/data-sync/#apple-reminders-import-ios) | Eine ausgewählte Liste unter iOS | Titel und Notizen unerledigter Erinnerungen | Daten und andere Felder, übersprungene Einträge und die optionale Löschung aus der Quelle |

## Prüfen oder zurücksetzen

1. Bewahren Sie den Originalexport auf und erstellen Sie vor dem Import eine neue [Mindwtr-Sicherung](/de/data-sync/backup-restore).
2. Prüfen Sie die Anzahl und Warnungen in der Vorschau. Brechen Sie ab, wenn die Projekt- oder Aufgabenanzahl falsch wirkt.
3. Vergleichen Sie nach dem Import ein Projekt und einige typische Aufgaben mit der Quelle. Prüfen Sie Titel, Projekt oder Status, Daten, Tags oder Kontexte, Notizen, Checklisten und Wiederholungen.
4. Wenn die Zuordnung falsch ist, stellen Sie den Wiederherstellungspunkt unter **Einstellungen → Synchronisierung → Wiederherstellungspunkte** wieder her, passen Sie den Quellexport an und versuchen Sie es erneut. Bei einigen Importern kann derselbe Export beim zweiten Import Aufgaben duplizieren.

## Alternative Migrationsmethoden

Falls Ihre App nicht aufgeführt ist, verwenden Sie eine der folgenden Ausweichmöglichkeiten. Sie sind bewusst einfacher als native Importer und eignen sich für die vielen Apps, die einfachen Text, CSV oder JSON exportieren.

### Kopieren und Einfügen

Am schnellsten kopieren Sie eine Aufgabenliste und fügen sie in die Schnelleingabe bzw. Schnellerfassung ein.

Desktop:

1. Öffnen Sie die Schnelleingabe.
2. Fügen Sie mehrere Zeilen in das Aufgabenfeld ein.
3. Bestätigen Sie **Aufgaben erstellen**.

Mobilgeräte:

1. Öffnen Sie die Schnellerfassung.
2. Fügen Sie mehrere Zeilen in das Aufgabenfeld ein.
3. Tippen Sie auf Speichern und bestätigen Sie das Erstellen mehrerer Aufgaben.

Jede nicht leere Zeile wird zu einer Aufgabe. Jede Zeile wird mit der Schnelleingabesyntax von Mindwtr ausgewertet, sodass Sie Metadaten direkt einfügen können:

```text
Email Bob about Q3 report +Work @computer #followup /due:friday
Book dentist appointment @phone
Outline conference talk +Speaking #ideas /note:Draft the rough structure first
```

Damit lassen sich keine tiefen Hierarchien oder Wiederholungen rekonstruieren. Für die Übernahme der Aufgaben, die noch wichtig sind, ist es jedoch oft der sauberste Weg.

### Einfacher Text

Wenn Ihre bisherige App eine `.txt`-Datei exportieren kann, verwenden Sie den Textimport in der Erfassungsansicht von Mindwtr.

Desktop:

1. Öffnen Sie die Schnelleingabe.
2. Klicken Sie auf **.txt importieren**.
3. Wählen Sie eine einfache Textdatei aus.
4. Bestätigen Sie das Erstellen mehrerer Aufgaben.

Mobilgeräte:

1. Öffnen Sie die Schnellerfassung.
2. Tippen Sie auf **Mehr**.
3. Tippen Sie auf **.txt importieren**.
4. Wählen Sie eine einfache Textdatei aus.
5. Bestätigen Sie das Erstellen mehrerer Aufgaben.

Verwenden Sie eine Aufgabe pro Zeile. Fügen Sie Schnelleingabe-Tokens in derselben Zeile hinzu, wenn Mindwtr beim Import Metadaten setzen soll:

```text
Pay water bill +Home /due:2026-07-01
Renew passport +Personal @errands #admin
Send slides to Ana +Work /note:Use the final deck from the shared folder
```

Mindwtr verwendet ausdrückliche Schnelleingabebefehle wie `/note:` statt eines verborgenen, tabulatorgetrennten Notizformats. Dadurch bleibt die Textdatei vor dem Import lesbar und verwendet denselben Parser wie die normale Erfassung.

### Skript: CSV in Schnelleingabetext umwandeln

Wenn eine App CSV exportiert, aber keinen nativen Mindwtr-Importer besitzt, wandeln Sie die CSV-Datei in eine einfache Schnelleingabe-Textdatei um und importieren anschließend diese `.txt`-Datei.

Mindwtr enthält dafür ein kleines Hilfsskript ohne Abhängigkeiten:

```bash
node scripts/migration/csv-to-quickadd-text.mjs export.csv \
  --output mindwtr-import.txt \
  --title "Title" \
  --project "Project" \
  --tags "Tags" \
  --contexts "Contexts" \
  --due "Due" \
  --note "Note"
```

Das Skript schreibt für jede CSV-Zeile eine Schnelleingabezeile. Es kann Folgendes zuordnen:

- eine Titelspalte zum Aufgabentitel
- eine Projekt-/Listenspalte zu `+Project`
- durch Kommas oder Semikolons getrennte Tags zu `#tag`
- durch Kommas oder Semikolons getrennte Kontexte zu `@context`
- eine Fälligkeitsspalte zu `/due:...`
- eine Notizspalte zu `/note:...`

Wenn Ihre CSV-Datei andere Spaltennamen verwendet, übergeben Sie diese Namen mit den obigen Optionen. Beispiel:

```bash
node scripts/migration/csv-to-quickadd-text.mjs tasks.csv \
  --output mindwtr-import.txt \
  --title "Task" \
  --project "List" \
  --tags "Categories" \
  --due "Due Date" \
  --note "Notes"
```

Dieses Skript ist ein Ausgangspunkt und kein unterstützter app-spezifischer Importer. Es erhält weder verschachtelte Aufgaben, Anhänge, Wiederholungen noch app-spezifische Felder, sofern Sie es nicht entsprechend anpassen.

### CLI, lokale API und MCP

Technisch versierte Personen können einen eigenen Importer für die Automatisierungsschnittstellen von Mindwtr schreiben:

- [Lokale API](/de/power-users/local-api)
- [MCP-Server](/de/power-users/mcp)
- `bun run mindwtr:cli -- --help` aus dem ausgecheckten Repository

Verwenden Sie diesen Weg, wenn Ihre bisherige App strukturierte JSON- oder CSV-Daten exportiert und Sie mehr Kontrolle benötigen als einfacher Text bietet. Diese Werkzeuge verwenden das normale Datenmodell von Mindwtr; benutzerdefinierte Migrationsskripte müssen Sie jedoch selbst erstellen und betreiben.

## Wenn Ihre App nicht aufgeführt ist

Gehen Sie in dieser Reihenfolge vor:

1. Prüfen Sie, ob Ihre App in ein Format exportieren kann, das Mindwtr bereits importiert.
2. Probieren Sie Kopieren/Einfügen oder einfachen Text für die aktiven Aufgaben aus, die Sie noch benötigen.
3. Verwenden Sie das CSV-Hilfsskript, wenn Ihre App eine einfache Tabelle exportiert.
4. Verwenden Sie die lokale API, CLI oder MCP, wenn Sie eine benutzerdefinierte strukturierte Migration benötigen.

Wenn Sie einen nativen Importer für eine bestimmte App wünschen, eröffnen Sie eine GitHub-Diskussion oder ein Issue mit folgenden Angaben:

- Name der App
- bereitgestelltes Exportformat
- kleines, anonymisiertes Exportbeispiel
- Felder, deren Erhalt am wichtigsten ist

Native Importer werden nach Nachfrage und danach priorisiert, wie eindeutig sich das Quellformat dem GTD-Modell von Mindwtr zuordnen lässt.
