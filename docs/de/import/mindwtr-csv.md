# Mindwtr-CSV-Import

Mindwtr kann eine einfache CSV-Datei importieren, die einem dokumentierten Spaltenlayout folgt. Das ist der generische Weg für Apps ohne eigenen Importer, die aber eine Tabelle exportieren können.

Unterstützte Quellen:

- eine einzelne `.csv`-Datei
- ein `.zip`-Archiv mit einer oder mehreren CSV-Dateien

Der Import steht auf dem Desktop und auf Mobilgeräten unter **Einstellungen → Daten → Aus Mindwtr CSV importieren** bereit. Mindwtr zeigt vorab eine Vorschau mit Anzahlen und Warnungen, bevor etwas geschrieben wird.

## Wann sich dieser Importer eignet

Bevorzugen Sie einen nativen Importer, wenn Ihre App unter [Daten aus anderen Apps importieren](/de/import/) aufgeführt ist. Diese Importer lesen den app-eigenen Export und kennen dessen Eigenheiten bereits.

Greifen Sie zur Mindwtr-CSV, wenn Ihre App nicht aufgeführt ist. Exportieren Sie die CSV-Datei, die Ihre App erzeugt, benennen Sie die Kopfzellen in einem Tabellenprogramm in die unten genannten Spaltennamen um und importieren Sie das Ergebnis. So bleibt weit mehr erhalten als beim Einfügen einer Titelliste: Projekte, Abschnitte, Bereiche, Status, Daten, Tags, Kontexte und Checklisten überstehen den Umzug.

## Dateiformat

- **Kodierung:** UTF-8. Eine Byte-Order-Mark wird automatisch entfernt. Andere Kodierungen werden tolerant gelesen und können Umlaute verlieren. Speichern Sie deshalb nach Möglichkeit als UTF-8.
- **Trennzeichen:** wird anhand der ersten nicht leeren Zeile erkannt. Komma, Semikolon und Tabulator funktionieren gleichermaßen.
- **Anführungszeichen:** übliche CSV-Regeln. Setzen Sie einen Wert in `"`, wenn er das Trennzeichen, einen Zeilenumbruch oder ein Anführungszeichen enthält, und schreiben Sie ein enthaltenes Anführungszeichen als `""`.
- **Kopfzeile:** erforderlich. `Title` muss vorhanden sein, sonst bricht der Import mit einem Fehler ab, statt zu raten.
- **Spaltennamen:** werden unabhängig von Groß- und Kleinschreibung und Reihenfolge erkannt. Es sind stets die englischen Namen von unten, in welcher Sprache die Mindwtr-Oberfläche auch eingestellt ist.
- **Unbekannte Spalten:** werden ignoriert, mit einer Warnung, die deren Anzahl nennt.
- **Leere Zeilen:** werden stillschweigend übersprungen. Eine Zeile mit Inhalt, aber ohne Titel, wird mit einer Warnung übersprungen.
- **NULL-Zellen:** Eine Zelle, die nur `NULL` enthält, wird als leer behandelt. Aus SQL-Datenbanken exportierte CSV-Dateien schreiben fehlende Werte auf diese Weise.

## Spaltenreferenz

Außer `Title` ist jede Spalte optional; Sie brauchen nur die, die Sie tatsächlich verwenden.

| Spalte | Zulässige Werte | Was Mindwtr tut |
| --- | --- | --- |
| `Title` | beliebiger Text | Erforderlich. Der Aufgabentitel. |
| `Description` | beliebiger Text | Die Aufgabenbeschreibung. Zeilenumbrüche bleiben innerhalb eines Werts in Anführungszeichen erhalten. |
| `Status` | `inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived` | Unabhängig von Groß- und Kleinschreibung. Bleibt das Feld leer, wird der Status zu `done`, wenn `Completed At` gesetzt ist, sonst zu `next`, wenn die Zeile ein Projekt nennt, andernfalls zu `inbox`. Ein nicht erkannter Wert wird mit einer Warnung zu `inbox`. |
| `Project` | ein Projektname | Legt das Projekt einmalig an und ordnet die Aufgabe darin ein. Namen werden unabhängig von Groß- und Kleinschreibung abgeglichen. |
| `Section` | ein Abschnittsname innerhalb des Projekts dieser Zeile | Benötigt ein `Project` in derselben Zeile. Fehlt es, wird der Wert mit einer Warnung ignoriert. |
| `Area` | ein Bereichsname | Nennt die Zeile ein `Project`, nimmt der Bereich das Projekt auf. Andernfalls wird die Aufgabe selbst im Bereich abgelegt. |
| `Contexts` | durch Kommas oder Semikolons getrennte Namen | Ergänzt ein fehlendes führendes `@` und entfernt Wiederholungen. |
| `Tags` | durch Kommas oder Semikolons getrennte Namen | Ergänzt ein fehlendes führendes `#`, schreibt den Tag klein und entfernt Wiederholungen. |
| `Assigned To` | ein Personenname | Setzt die zuständige Person, die die Liste „Warten auf“ speist. |
| `Priority` | `high`, `medium`, `low` oder `1`, `2`, `3` | Alles andere lässt die Priorität ungesetzt. |
| `Energy` | `high`, `medium`, `low` | Alles andere lässt das Energieniveau ungesetzt. |
| `Start Date` | ein Datum oder Datum mit Uhrzeit | Das Startdatum. Die Aufgabe bleibt bis dahin aus „Fokus“ ausgeblendet. |
| `Due Date` | ein Datum oder Datum mit Uhrzeit | Die Frist. |
| `Review Date` | ein Datum oder Datum mit Uhrzeit | Das Wiedervorlagedatum für eine spätere Neubewertung. |
| `Completed At` | ein Datum mit Uhrzeit | Der Abschlusszeitpunkt. Er macht außerdem einen leeren `Status` zu `done` und wird nur behalten, wenn der resultierende Status `done` oder `archived` ist. |
| `Created At` | ein Datum mit Uhrzeit | Der Erstellungszeitpunkt. Bleibt er leer, gilt der Zeitpunkt des Imports. |
| `Checklist` | durch Zeilenumbrüche oder `\|` getrennte Einträge | Wird zur Checkliste der Aufgabe. Ein Eintrag wie `[x] Buy stamps` beginnt erledigt; `[ ] Buy stamps` und ein bloßes `Buy stamps` beginnen offen. Eine Aufgabe mit Checklisteneinträgen wird zur Listenaufgabe. |
| `Location` | beliebiger Text | Das Ortsfeld der Aufgabe. |
| `Order` | eine Zahl | Sortiert die Aufgabe unter ihren Geschwistern im selben Projekt, Bereich oder Posteingang. Zeilen ohne Zahl oder mit gleicher Zahl behalten ihre Reihenfolge aus der Datei. |
| `ID` | eine beliebige, stabile Kennung | Gibt der Zeile eine dauerhafte Identität für erneute Importe. Ein Wert, der eine frühere Zeile desselben Imports wiederholt, wird mit einer Warnung verworfen. |
| `Recurrence` | beliebiger Text | Wird erkannt und daher nicht als unbekannte Spalte gemeldet, der Wert wird jedoch mit einer Warnung ignoriert. |

## Daten und Uhrzeiten

- Ein reines Datum wie `2026-09-01` bleibt ein reines Datum. Mindwtr erfindet dafür keine Uhrzeit um Mitternacht.
- Ein Datum mit Uhrzeit ohne Zeitzone, etwa `2026-09-05 14:30`, behält genau diese Uhrzeit als Wanduhrzeit.
- Ein Wert mit `Z` am Ende oder mit einem Versatz wie `+02:00` wird als der genannte exakte Zeitpunkt gespeichert.
- `Created At` und `Completed At` werden immer als exakter Zeitpunkt gespeichert, weil sie festhalten, wann etwas tatsächlich geschehen ist.
- Einen Wert, den Mindwtr nicht lesen kann, lässt es leer, und die Vorschau nennt die Anzahl der übersprungenen Werte.
- SQL-Zeitstempel wie `2026-02-21 22:44:00.6390000 +00:00` werden akzeptiert: Die zusätzlichen Nachkommastellen und das Leerzeichen vor dem Offset werden automatisch bereinigt.

ISO 8601 (`YYYY-MM-DD`) ist die sicherste Schreibweise. Andere Formate werden versucht, aber eine Tabellenspalte mit landesüblichen Datumsangaben ist der häufigste Grund für übersprungene Werte.

## Beispiel

```csv
Title,Description,Status,Project,Section,Area,Contexts,Tags,Priority,Start Date,Due Date,Checklist,ID
Book the venue,Needs 60 seats,next,Team Offsite,Logistics,Work,@phone,#offsite,high,2026-09-01,2026-09-12,[x] Shortlist venues|[ ] Call first choice,offsite-1
Draft the agenda,,next,Team Offsite,Programme,Work,@computer,"#offsite, #writing",medium,,2026-09-20,,offsite-2
Buy a whiteboard,,inbox,,,,@errands,,,,,,offsite-3
```

Diese Datei erzeugt einen Bereich, darin ein Projekt mit zwei Abschnitten, zwei Aufgaben in diesem Projekt, eine zweiteilige Checkliste an der ersten davon und eine lose Posteingangsaufgabe.

## Importablauf

1. Öffnen Sie **Einstellungen → Daten → Aus Mindwtr CSV importieren**.
2. Wählen Sie Ihre `.csv`- oder `.zip`-Datei aus.
3. Lesen Sie die Vorschau. Sie nennt die Anzahl der entstehenden Aufgaben, Bereiche, Projekte, Abschnitte und Checklisteneinträge, wie viele Aufgaben außerhalb von Projekten bleiben, die ersten Projekte mit ihrer Aufgabenzahl sowie jede Warnung.
4. Bestätigen Sie den Import oder brechen Sie ab, wenn die Zahlen nicht stimmen.

Mindwtr legt vor dem Schreiben einen Wiederherstellungspunkt an. Falls das Ergebnis nicht Ihren Vorstellungen entspricht, stellen Sie ihn unter **Einstellungen → Synchronisierung → Wiederherstellungspunkte** wieder her.

## Dieselbe Datei erneut importieren

Mindwtr gibt jeder Zeile eine stabile Identität. Wird dieselbe Datei zweimal importiert, entsteht daher nichts doppelt.

- Mit einer `ID`-Spalte folgt die Identität diesem Wert, sodass ein korrigierter erneuter Export dieselben Aufgaben trifft.
- Ohne `ID`-Spalte richtet sich die Identität nach der Position der Zeile in der Datei (und innerhalb eines ZIP zusätzlich nach der Herkunftsdatei). Exakt dieselbe Datei lässt sich gefahrlos erneut importieren, aber ein Export mit eingefügten oder entfernten Zeilen passt nicht mehr zusammen und erzeugt Duplikate.
- Bereits vorhandene Zeilen werden übersprungen, nicht aktualisiert. Ein Import überschreibt niemals eine Aufgabe, die Sie inzwischen in der App bearbeitet haben.
- Löschungen werden respektiert. Wenn Sie ein importiertes Projekt löschen und die Datei erneut importieren, wird das Projekt nicht neu angelegt, und seine Zeilen kommen ohne dieses Projekt an.
- Gehört der Name eines importierten Bereichs oder Projekts bereits zu etwas anderem, erhält der neue Eintrag den Zusatz `(Mindwtr CSV)` im Namen, und eine Warnung weist darauf hin.

## Was dieser Importer nicht leistet

- **Wiederholungen.** Aus einer CSV entstehen keine Serien. Richten Sie sie nach dem Import in der App ein.
- **Unteraufgaben-Hierarchie.** Es gibt keine Elternspalte. Verwenden Sie `Checklist` für die Schritte innerhalb einer Aufgabe und `Section` zur Gruppierung innerhalb eines Projekts.
- **Anhänge.** Dateipfade oder URLs in einer CSV sind Text; es wird nichts geladen oder kopiert.
- **Export.** Mindwtr schreibt dieses Format derzeit nicht. Verwenden Sie zum Umzug zwischen Mindwtr-Installationen die JSON-[Sicherung](/de/data-sync/backup-restore).

## Mögliche Warnungen

Warnungen werden für den gesamten Import gezählt und einmal mit ihrer Anzahl angezeigt, nie einmal pro Zeile:

- unbekannte Spalten wurden ignoriert
- Status konnten nicht zugeordnet werden und wurden in den Posteingang importiert
- `Section`-Werte wurden ignoriert, weil ihre Zeilen kein `Project` hatten
- `Recurrence`-Werte wurden ignoriert
- Datumswerte konnten nicht gelesen werden und wurden übersprungen
- Zeilen wurden verworfen, weil ihre `ID` eine frühere Zeile wiederholte
- Zeilen ohne Titel wurden übersprungen
- ein importierter Bereich oder ein Projekt wurde umbenannt, um einen Namenskonflikt zu vermeiden
- Nicht-CSV-Dateien in einem ZIP wurden übersprungen
- verschachtelte ZIP-Dateien im Archiv wurden übersprungen
- eine CSV endete mit einem nicht geschlossenen Feld in Anführungszeichen und wurde bestmöglich importiert
- eine CSV-Datei konnte nicht gelesen werden und wurde übersprungen

## Tipps

- Importieren Sie zuerst eine Testdatei mit fünf Zeilen und prüfen Sie die Zuordnung, bevor Sie Hunderte Zeilen übernehmen.
- Ergänzen Sie eine `ID`-Spalte, falls Sie den Export später verfeinern und erneut importieren könnten.
- Lassen Sie `Status` leer, wenn es in Ihrer Quelle nichts Entsprechendes gibt. Die Vorgabe legt Projektarbeit unter „Nächste Schritte“ und alles Übrige in den Posteingang, bereit zum Klären.
- Bewahren Sie den Originalexport und den Wiederherstellungspunkt auf, bis Sie das Ergebnis geprüft haben.
- Importierte Aufgaben mit Status `done` oder `archived` erscheinen in den Ansichten „Erledigt“ und „Archiv“, nicht in der Aufgabenliste ihres Projekts — Projektseiten zeigen nur offene Arbeit.

Siehe auch [Daten aus anderen Apps importieren](/de/import/) und [Sichern und Wiederherstellen](/de/data-sync/backup-restore).
