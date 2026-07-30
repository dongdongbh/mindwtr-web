# Sicherung und Wiederherstellung

Mindwtr speichert Ihre Arbeitsdaten lokal und ermöglicht den Export von JSON-Sicherungen für Übertragbarkeit, Reparatur und Migration.

Die Wiederherstellung ist als Ablauf zum **Ersetzen lokaler Daten** konzipiert:

- Sie wählen eine JSON-Sicherungsdatei aus.
- Mindwtr validiert sie, bevor Änderungen vorgenommen werden.
- Mindwtr erstellt nach Möglichkeit zuerst eine Wiederherstellungsmomentaufnahme.
- Die ausgewählte Sicherung ersetzt den aktuellen lokalen Datensatz.

Dadurch bleibt die Wiederherstellung einfach und vorhersehbar. Sie ist kein Zusammenführungsvorgang – verwenden Sie dafür **Backup zusammenführen**.

---

## Sicherung exportieren

### Desktop

1. Öffnen Sie **Einstellungen → Daten**.
2. Wählen Sie unter **Datenübertragung** die Option **Sicherung exportieren**.
3. Speichern Sie die JSON-Datei am gewünschten Ort.

### Mobilgeräte

1. Öffnen Sie **Einstellungen → Daten**.
2. Tippen Sie auf **Sicherung exportieren**.
3. Speichern oder teilen Sie die JSON-Datei.

Das Sicherungsformat ist mit der internen `data.json`-Struktur von Mindwtr kompatibel.

---

## Aus einer Sicherung wiederherstellen

### Desktop

1. Öffnen Sie **Einstellungen → Daten**.
2. Wählen Sie unter **Datenübertragung** die Option **Sicherung wiederherstellen**.
3. Wählen Sie eine JSON-Sicherungsdatei von Mindwtr.
4. Prüfen Sie die Zusammenfassung und bestätigen Sie die Wiederherstellung.

Vor der Wiederherstellung erstellt die Desktop-App eine Datenmomentaufnahme im lokalen Momentaufnahmeverzeichnis, sofern die Tauri-Laufzeit verfügbar ist.

### Mobilgeräte

1. Öffnen Sie **Einstellungen → Daten**.
2. Tippen Sie auf **Sicherung wiederherstellen**.
3. Wählen Sie eine JSON-Sicherungsdatei von Mindwtr.
4. Prüfen Sie die Zusammenfassung und bestätigen Sie die Wiederherstellung.

Vor der Wiederherstellung speichert die mobile App eine lokale Wiederherstellungsmomentaufnahme im App-Speicher.

---

## Aus einer Sicherung zusammenführen

**Backup zusammenführen** steht auf beiden Plattformen neben der Wiederherstellung und kombiniert eine Sicherungsdatei mit Ihren aktuellen Daten, statt sie zu ersetzen. Dabei gelten dieselben Regeln wie bei der Synchronisierung:

- Einträge, die es nur in der Sicherung gibt, werden hinzugefügt.
- Gibt es beide Fassungen, gewinnt die neuere.
- Einträge, die es nur auf diesem Gerät gibt, bleiben erhalten.
- Einträge, die Sie auf diesem Gerät gelöscht haben, bleiben gelöscht, auch wenn die Sicherung noch eine aktive Fassung enthält.

Nach dem Zusammenführen meldet Mindwtr, wie viele Aufgaben hinzugefügt und wie viele aktualisiert wurden. Nach Möglichkeit wird zuvor eine Wiederherstellungsmomentaufnahme gespeichert, sodass sich ein Zusammenführen wie eine Wiederherstellung zurücknehmen lässt.

Verwenden Sie das Zusammenführen, um eine zweite Mindwtr-Installation (ein Diensthandy, ein Reise-Laptop) in Ihre Hauptinstallation zu übernehmen oder Änderungen zwischen Geräten zu übertragen, ohne eine der beiden Seiten zu leeren. Verwenden Sie die Wiederherstellung, wenn die Sicherung das ersetzen soll, was auf dem Gerät liegt.

---

## Wiederherstellungsmomentaufnahmen

Die nativen Desktop- und Mobil-Apps erstellen automatisch Wiederherstellungsmomentaufnahmen vor der Wiederherstellung einer Sicherung und vor unterstützten Datenimporten, einschließlich Importen in den Einstellungen und bestätigter Text-Massenerfassung. Der Browser-/PWA-Build besitzt kein lokales Momentaufnahmeverzeichnis.

- **Desktop**: Momentaufnahmen erscheinen unter **Einstellungen → Synchronisierung → Wiederherstellungsmomentaufnahmen**.
- **Mobilgeräte**: Momentaufnahmen erscheinen unter **Einstellungen → Synchronisierung → Wiederherstellungsmomentaufnahmen**.

Verwenden Sie sie, wenn Sie die falsche Datei wiederhergestellt haben oder einen lokalen Import-/Wiederherstellungsvorgang zurücknehmen möchten.

Momentaufnahmen enthalten nur Mindwtr-Daten. Sie können keine in einer anderen App gelöschten Ausgangseinträge wiederherstellen, einschließlich Erinnerungen, die nach dem Import aus Apple Erinnerungen entfernt wurden.

---

## Validierungsregeln

Mindwtr validiert die ausgewählte JSON-Datei vor der Wiederherstellung:

- Die Datei muss gültiges JSON enthalten.
- Sie muss der Datenstruktur von Mindwtr entsprechen.
- Anzahl der Einträge und Sicherungsmetadaten werden angezeigt, sofern verfügbar.
- Bei Versionsabweichungen werden Warnungen ausgegeben, statt unbemerkt zu scheitern.

Schlägt die Validierung fehl, wird die Wiederherstellung blockiert und Ihre aktuellen Daten bleiben unverändert.

---

## Was die Wiederherstellung nicht tut

- Sie führt die Sicherung **nicht** mit Ihren aktuellen lokalen Daten zusammen (dafür ist **Backup zusammenführen** da).
- Sie stellt **nicht** nur eine einzelne Aufgabe oder ein einzelnes Projekt wieder her.
- Sie überschreibt entfernte Synchronisierungsdienste nicht von selbst, bevor der nächste Synchronisierungslauf stattfindet.

Wenn Sie die Synchronisierung verwenden, betrachten Sie die Wiederherstellung zunächst als Ersetzen des aktuellen lokalen Zustands. Das anschließende Synchronisierungsverhalten hängt von Ihrem Backend und davon ab, welches Gerät als Nächstes synchronisiert.

---

## Wiederherstellung und Synchronisierung

Eine Wiederherstellung gilt als bewusste Entscheidung und nicht als weitere Änderung, die zusammengeführt wird:

- Datensätze aus der Sicherung werden mit einer höheren Revision zurückgeschrieben, als die Gegenstelle hat, und gewinnen daher die nächste Zusammenführung.
- Datensätze, die das wiederherstellende Gerät kannte, die aber nicht in der Sicherung enthalten sind, werden als gelöscht markiert, damit die Gegenstelle sie beim nächsten Synchronisieren nicht zurückgibt.

Der zweite Punkt sorgt dafür, dass eine Wiederherstellung Bestand hat. Andernfalls liegt alles, was nach dem Erstellen der Sicherung angelegt wurde, weiterhin auf der Gegenstelle, und der nächste Abgleich wertet das Fehlen als neuen Datensatz und stellt ihn wieder her.

Datensätze, die dieses Gerät nie gesehen hat, bleiben unangetastet. Hat ein anderes Gerät Aufgaben angelegt, während dieses offline war, löscht eine Wiederherstellung hier sie nicht.

Da eine Wiederherstellung diese Löschungen an alle synchronisierten Geräte weitergibt, stellen Sie auf einem Gerät wieder her und lassen Sie es synchronisieren, bevor Sie die anderen verwenden.

---

## Tipps

- Bewahren Sie zusätzlich zur Synchronisierung regelmäßige manuelle Exporte auf.
- Stellen Sie nur Sicherungen aus vertrauenswürdigen Quellen wieder her.
- Wenn Sie die Dateisynchronisierung verwenden, warten Sie, bis die richtige `data.json` vollständig repliziert wurde, bevor Sie ein weiteres Gerät synchronisieren.

Siehe auch [Daten und Synchronisierung](/de/data-sync/).
