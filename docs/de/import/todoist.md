# Todoist-Import

Mindwtr kann Todoist-Exporte importieren, damit Sie Ihr System nicht von Hand neu aufbauen müssen.

Unterstützte Quellen:

- ein einzelner Todoist-Export im Format **CSV**
- eine Todoist-Sicherung im Format **ZIP** mit mehreren Projekt-CSV-Dateien

Der Import ist auf Desktop und Mobilgeräten unter **Einstellungen → Daten → Aus Todoist importieren** verfügbar.

---

## Was importiert wird

Mindwtr ordnet Todoist-Exporte mit Blick auf GTD dem eigenen Modell zu:

- Todoist-Projekte werden zu **Mindwtr-Projekten**.
- Todoist-Abschnitte werden zu **Mindwtr-Abschnitten**.
- Todoist-Unteraufgaben werden zu **Checklistenpunkten**.
- Todoist-Labels werden zu **Tags**.
- Jede Todoist-CSV bzw. jedes Todoist-Projekt wird zu einem Mindwtr-Projekt.
- Alle importierten aktiven Aufgaben werden in diesem Projekt zu **Nächsten Aktionen**.

Der Importer ordnet jede aktive Aufgabe ihrem neu erzeugten Projekt zu.

---

## Unterstützte Todoist-Daten

- Aufgabentitel
- Beschreibungen
- Prioritäten
- Fälligkeitsdaten, sofern sie zuverlässig aufgelöst werden können
- Abschnitte
- Notizen/Kommentare an Aufgaben
- in Todoist-Inhalten angegebene Labels (zum Beispiel `@work`)

Wiederkehrende Todoist-Termine werden nicht automatisch als Mindwtr-Wiederholungen angelegt. Die Aufgabe wird einmal importiert und der ursprüngliche Wiederholungstext in der Beschreibung bewahrt, damit Sie selbst entscheiden können, wie Sie ihn in Mindwtr abbilden.

---

## Importablauf

1. Öffnen Sie **Aus Todoist importieren**.
2. Wählen Sie eine Todoist-CSV- oder -ZIP-Datei.
3. Prüfen Sie die Vorschau.
4. Bestätigen Sie den Import.

Vor dem Import speichert Mindwtr, sofern unterstützt, eine Wiederherstellungsmomentaufnahme Ihrer aktuellen lokalen Daten.

Nach dem Import:

- wird für jede importierte Todoist-CSV bzw. jedes Todoist-Projekt ein neues Projekt erstellt,
- erscheinen alle importierten aktiven Aufgaben in diesen Projekten als **Nächste Aktionen** und
- werden Warnungen für wiederkehrende Aufgaben, übersprungene Zeilen und nicht unterstützte Archiveinträge angezeigt.

---

## Hinweise zu ZIP-Sicherungen

Todoist-ZIP-Sicherungen enthalten normalerweise eine CSV-Datei je Projekt. Mindwtr liest jede CSV-Datei und importiert die Projekte getrennt.

Mindwtr überspringt:

- verschachtelte ZIP-Dateien,
- andere Dateien als CSV innerhalb des Archivs und
- fehlerhafte Todoist-Zeilen, die nicht zuverlässig ausgewertet werden können.

---

## Tipps

- Beginnen Sie zum Testen der Zuordnung mit einem kleineren Todoist-Projekt.
- Bewahren Sie die Wiederherstellungsmomentaufnahme auf, bis Sie das Ergebnis geprüft haben.
- Wenn Sie denselben Export zweimal importieren, können Aufgaben doppelt angelegt werden.

Siehe auch [Daten und Synchronisierung](/de/data-sync/) und [Sichern und Wiederherstellen](/de/data-sync/backup-restore).
