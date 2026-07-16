# DGT-GTD-Import

Mindwtr kann DGT-GTD-Exporte importieren, damit Sie Ihr System nicht von Hand neu aufbauen müssen.

Unterstützte Quellen:

- ein DGT-GTD-Export im Format **JSON**
- ein DGT-GTD-Archiv im Format **ZIP**, das die exportierte JSON-Datei enthält

Der Import ist auf Desktop und Mobilgeräten unter **Einstellungen → Daten → Aus DGT GTD importieren** verfügbar.

---

## Was importiert wird

Mindwtr ordnet DGT-GTD-Exporte mit Blick auf GTD dem eigenen Modell zu:

- DGT-Ordner werden zu **Mindwtr-Bereichen**.
- DGT-Projekte werden zu **Mindwtr-Projekten**.
- DGT-Checklisten werden zu **Checklistenaufgaben**.
- Checklistenpunkte bleiben **Checklistenpunkte**.
- DGT-Kontexte werden zu **Kontexten**.
- DGT-Tags werden zu **Tags**.

Aufgaben behalten ihren zugeordneten Status, sofern Mindwtr ihn zuverlässig darstellen kann. Eigenständige DGT-Aufgaben können außerhalb von Projekten bleiben. So lassen sie sich später organisieren, ohne beim Import eine zusätzliche Struktur zu erzwingen.

---

## Unterstützte DGT-Daten

- Aufgabentitel
- Notizen/Beschreibungen
- Prioritäten
- Fälligkeitsdaten
- Checklistenpunkte
- Ordner, Projekte, Kontexte und Tags
- erledigte Aufgaben
- unterstützte Wiederholungsregeln wie einfache tägliche, wöchentliche, monatliche und jährliche Pläne sowie einige intervallbasierte Wiederholungen

Nicht unterstützte DGT-Wiederholungsmuster werden einmal importiert. Der ursprüngliche Wiederholungstext bleibt in der Beschreibung erhalten, damit Sie die Wiederholung in Mindwtr manuell anpassen können.

---

## Importablauf

1. Öffnen Sie **Aus DGT GTD importieren**.
2. Wählen Sie eine DGT-GTD-JSON- oder -ZIP-Datei.
3. Prüfen Sie die Vorschau.
4. Bestätigen Sie den Import.

Vor dem Import speichert Mindwtr, sofern unterstützt, eine Wiederherstellungsmomentaufnahme Ihrer aktuellen lokalen Daten.

Nach dem Import:

- werden bei Bedarf neue Bereiche und Projekte erstellt,
- bleiben eigenständige Aufgaben für die spätere Organisation verfügbar und
- erscheinen Warnungen bei verlustbehafteten Wiederholungszuordnungen oder übersprungenen Archiveinträgen.

---

## Hinweise zu ZIP-Exporten

Mindwtr liest den ersten gültigen DGT-JSON-Export im Archiv.

Mindwtr überspringt:

- verschachtelte ZIP-Dateien,
- andere Dateien als JSON innerhalb des Archivs und
- fehlerhafte JSON-Dateien, die nicht zuverlässig ausgewertet werden können.

---

## Tipps

- Beginnen Sie zum Prüfen der Zuordnung mit einem kleineren DGT-GTD-Export.
- Bewahren Sie die Wiederherstellungsmomentaufnahme auf, bis Sie das Ergebnis geprüft haben.
- Wenn Sie denselben Export zweimal importieren, können Aufgaben doppelt angelegt werden.

Siehe auch [Daten und Synchronisierung](/de/data-sync/) und [Sichern und Wiederherstellen](/de/data-sync/backup-restore).
