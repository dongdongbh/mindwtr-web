# TickTick-Import

Mindwtr kann TickTick-Sicherungen importieren, damit Sie Ihr System nicht von Hand neu aufbauen müssen.

Unterstützte Quellen:

- eine TickTick-Sicherung im Format **CSV**
- eine TickTick-Sicherung im Format **ZIP**, die den CSV-Export enthält

Der Import ist auf Desktop und Mobilgeräten unter **Einstellungen -> Daten -> Aus TickTick importieren** verfügbar.

## Aus TickTick exportieren

TickTick erstellt Sicherungen in der Web-App:

1. Öffnen Sie TickTick in einem Browser und melden Sie sich an.
2. Klicken Sie oben links auf Ihren Avatar.
3. Öffnen Sie **Einstellungen -> Konto -> Sicherung & Import**.
4. Wählen Sie **Sicherung erstellen**.
5. Speichern Sie die heruntergeladene CSV- oder ZIP-Datei.

Öffnen Sie anschließend in Mindwtr **Aus TickTick importieren** und wählen Sie diese Datei.

## Was importiert wird

Mindwtr ordnet TickTick-Sicherungen mit Blick auf GTD dem eigenen Modell zu:

- TickTick-Ordner werden zu **Mindwtr-Bereichen**.
- TickTick-Listen werden zu **Mindwtr-Projekten**.
- Übergeordnete Aufgaben und untergeordnete Zeilen können zu **Checklistenaufgaben** werden.
- Checklisteninhalte bleiben als Checklistenpunkte erhalten.
- TickTick-Tags werden zu **Mindwtr-Tags**.
- Prioritäten werden übernommen, sofern vorhanden.
- Fälligkeitsdaten, Startdaten, ganztägige Daten und Zeitzonen bleiben erhalten, sofern sie zuverlässig gelesen werden können.
- Unterstützte Wiederholungsregeln werden als Mindwtr-Wiederholung importiert.
- Erledigt- und Archivstatus bleiben erhalten, sofern vorhanden.
- Aufgabennotizen und -inhalte bleiben in der Beschreibung erhalten.

Importierte aktive Aufgaben bleiben zur GTD-Verarbeitung verfügbar, statt einen Status zu erhalten, den Mindwtr aus der Sicherung nicht ableiten kann.

## Importablauf

1. Öffnen Sie **Aus TickTick importieren**.
2. Wählen Sie eine TickTick-CSV- oder -ZIP-Sicherung.
3. Prüfen Sie die Vorschau.
4. Bestätigen Sie den Import.

Vor dem Import speichert Mindwtr, sofern unterstützt, eine Wiederherstellungsmomentaufnahme Ihrer aktuellen lokalen Daten.

Nach dem Import:

- werden bei Bedarf neue Bereiche und Projekte erstellt,
- werden Aufgaben, Checklisten, Tags, Daten und Wiederholungen aus der Sicherung hinzugefügt und
- erscheinen Warnungen für übersprungene Zeilen, nicht unterstützte Archiveinträge oder Felder, die Mindwtr nicht zuverlässig zuordnen konnte.

## Hinweise zu TickTick-Sicherungen

TickTick-Sicherungen enthalten vor der eigentlichen CSV-Kopfzeile Metadatenzeilen. Mindwtr erkennt die richtige Kopfzeile automatisch; Sie müssen die Datei vorher nicht bearbeiten.

Mindwtr überspringt:

- verschachtelte ZIP-Dateien,
- andere Dateien als CSV innerhalb des Archivs und
- fehlerhafte Zeilen, die nicht zuverlässig ausgewertet werden können.

TickTick-Sicherungen enthalten nicht den gesamten Zustand der App. Anhänge und einige darstellungsspezifische Details müssen möglicherweise manuell übertragen werden.

## Tipps

- Bewahren Sie die ursprüngliche TickTick-Sicherung auf, bis Sie den Import geprüft haben.
- Beginnen Sie mit der vollständigen Sicherung, prüfen Sie die Zuordnung aber in der Vorschau.
- Wenn Sie dieselbe Sicherung zweimal importieren, können Aufgaben doppelt angelegt werden.
- Unter [Daten aus anderen Apps importieren](/de/import/) finden Sie Ausweichmöglichkeiten für andere Apps.

Siehe auch [Daten und Synchronisierung](/de/data-sync/) und [Sichern und Wiederherstellen](/de/data-sync/backup-restore).
