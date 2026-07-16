# OmniFocus-Import

Mindwtr kann OmniFocus-Exporte importieren, sodass Sie Ihr System migrieren können, ohne es von Hand neu aufzubauen.

## Unterstützte Quelldateien

- ein OmniFocus-Export im Format **CSV**
- ein OmniFocus-Export im Format **CSV UTF-16**
- ein **ZIP**-Archiv aus Omni Automation/Kurzbefehle mit `OmniFocus.json` und `metadata.json`
- eine einzelne **JSON**-Datei, wenn Ihr Kurzbefehl Aufgabendaten und Metadaten bereits in einem Dokument zusammenführt

Der Import ist auf Desktop- und Mobilgeräten unter **Einstellungen → Daten → Aus OmniFocus importieren** verfügbar.

## Empfohlenes Quellformat

Wenn Sie nur eine einfache Aufgabenmigration benötigen, eignet sich weiterhin der CSV-Export von OmniFocus.

Für die bestmögliche Originaltreue sollten Sie den JSON-Export über Omni Automation dem CSV-Format vorziehen. Über JSON lassen sich Wiederholungsregeln, Ordnermetadaten und mehr Details der Hierarchie erhalten, als OmniFocus in CSV bereitstellt.

Für den kurzbefehlsbasierten Export eignet sich am besten eine ZIP-Datei mit:

- `OmniFocus.json`
- `metadata.json`

Mindwtr kann CSV-, JSON- und ZIP-Dateien über dieselbe Importaktion automatisch erkennen.

## Zuordnung von OmniFocus-Daten in Mindwtr

Mindwtr ordnet OmniFocus-Exporte mit Schwerpunkt auf GTD seinem eigenen Modell zu:

- OmniFocus-Ordner werden zu **Mindwtr-Bereichen**, wenn Metadaten verfügbar sind
- OmniFocus-Projekte werden zu **Mindwtr-Projekten**
- eigenständige OmniFocus-Aktionen bleiben außerhalb von Projekten, damit Sie sie später verarbeiten können
- OmniFocus-Tags werden zu **Mindwtr-Tags**
- OmniFocus-Kontexte werden zu **Mindwtr-Kontexten**, wenn das Quellformat sie enthält
- OmniFocus-Notizen bleiben in der importierten Beschreibung erhalten
- Zurückstellungsdaten aus OmniFocus werden zu **Startdaten**
- unterstützte Fälligkeitsdaten und der Erledigungsstatus bleiben erhalten
- OmniFocus-Markierungen dienen als **Hinweis auf hohe Priorität**
- einfache, einstufig verschachtelte Aufgaben können zu **Checklistenpunkten** werden
- komplexere oder tiefer verschachtelte Aufgaben werden zu normalen Aufgaben abgeflacht; die ursprüngliche Hierarchie bleibt in Titel und Beschreibung erhalten
- Wiederholungsregeln aus Omni Automation werden, sofern unterstützt, **Mindwtr-Wiederholungen** zugeordnet

Mindwtr besitzt derzeit kein separates, OmniFocus entsprechendes Feld für geplante Daten. Wenn OmniFocus ein geplantes Datum oder eine Dauer als Text enthält, bewahrt Mindwtr diese Information in der importierten Beschreibung auf, statt sie zu verwerfen.

## Unterstützte OmniFocus-Daten

- Ordnernamen, wenn Metadaten verfügbar sind
- Projektnamen
- Aktionstitel
- Notizen
- Tags
- Kontexte, wenn der Export sie enthält
- Zurückstellungs-/Startdaten
- Fälligkeitsdaten
- Erledigungsstatus und, sofern verfügbar, Erledigungsdatum
- Markierungsstatus als Hinweis auf hohe Priorität
- unterstützte Wiederholungen aus JSON-Exporten über Omni Automation
- Umwandlung einfacher verschachtelter Aufgaben in Checklisten

## Importschritte

1. Öffnen Sie **Aus OmniFocus importieren**.
2. Exportieren Sie Ihre Daten aus OmniFocus:
   - Verwenden Sie **CSV**, wenn Sie nur den integrierten Export benötigen.
   - Verwenden Sie **Omni Automation/Kurzbefehle-JSON**, wenn Sie Wiederholungen, Ordner und eine originalgetreuere Hierarchie wünschen.
3. Falls Ihr Kurzbefehl `OmniFocus.json` und `metadata.json` separat erzeugt, legen Sie beide Dateien in ein ZIP-Archiv.
4. Wählen Sie die CSV-, JSON- oder ZIP-Datei in Mindwtr aus.
5. Prüfen Sie die Vorschauzusammenfassung.
6. Bestätigen Sie den Import.

Mindwtr speichert vor dem Import einen Wiederherstellungsschnappschuss, damit Sie die Änderungen bei Bedarf zurücksetzen können.

## Derzeitige Einschränkungen

- Native `.ofocus`-Datenbanken von OmniFocus werden nicht direkt importiert.
- HTML- und einfache Text-Exporte werden nicht importiert.
- CSV-Exporte bleiben gegenüber dem JSON-Export über Omni Automation verlustbehaftet, insbesondere bei Wiederholungen und Verschachtelungen.
- Geplante Daten und Zeitdauern bleiben als Beschreibungstext erhalten, statt eigenen Feldern zugeordnet zu werden.
- Verschachtelte Aufgaben mit eigenen Daten, Notizen, Tags oder Wiederholungen werden abgeflacht und nicht in Checklistenpunkte umgewandelt.
- Wenn Sie nur `OmniFocus.json` ohne die passenden Metadaten importieren, können einige Tag-, Ordner- oder Projektmetadaten fehlen.

## Tipps

- Beginnen Sie mit einem kleineren OmniFocus-Export, wenn Sie die Zuordnung zunächst prüfen möchten.
- Wenn Sie den kurzbefehlsbasierten Export verwenden, bewahren Sie `OmniFocus.json` und `metadata.json` gemeinsam in einer ZIP-Datei auf, um den saubersten Import zu erzielen.
- Wenn Sie sowohl Projektaktionen als auch eigenständige Posteingangsaktionen haben, erhält Mindwtr diese Trennung.
- Wenn Wiederholungen wichtig sind, verwenden Sie statt CSV bevorzugt den JSON-/ZIP-Weg über Omni Automation.
- Prüfen Sie importierte Aufgaben mit hoher Priorität, wenn Sie OmniFocus-Markierungen intensiv genutzt haben.
- Bewahren Sie den Wiederherstellungsschnappschuss auf, bis Sie geprüft haben, ob der Import korrekt aussieht.
