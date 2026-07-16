# Sicherung und Wiederherstellung

Mindwtr speichert Ihre Arbeitsdaten lokal und ermöglicht den Export von JSON-Sicherungen für Übertragbarkeit, Reparatur und Migration.

Die Wiederherstellung ist als Ablauf zum **Ersetzen lokaler Daten** konzipiert:

- Sie wählen eine JSON-Sicherungsdatei aus.
- Mindwtr validiert sie, bevor Änderungen vorgenommen werden.
- Mindwtr erstellt nach Möglichkeit zuerst eine Wiederherstellungsmomentaufnahme.
- Die ausgewählte Sicherung ersetzt den aktuellen lokalen Datensatz.

Dadurch bleibt die Wiederherstellung einfach und vorhersehbar. Sie ist kein Zusammenführungsvorgang.

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

## Wiederherstellungsmomentaufnahmen

Mindwtr erstellt vor Wiederherstellungs- und Importvorgängen automatisch Wiederherstellungsmomentaufnahmen.

- **Desktop**: Momentaufnahmen erscheinen unter **Einstellungen → Synchronisierung → Wiederherstellungsmomentaufnahmen**.
- **Mobilgeräte**: Momentaufnahmen erscheinen unter **Einstellungen → Synchronisierung → Wiederherstellungsmomentaufnahmen**.

Verwenden Sie sie, wenn Sie die falsche Datei wiederhergestellt haben oder einen lokalen Import-/Wiederherstellungsvorgang zurücknehmen möchten.

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

- Sie führt die Sicherung **nicht** mit Ihren aktuellen lokalen Daten zusammen.
- Sie stellt **nicht** nur eine einzelne Aufgabe oder ein einzelnes Projekt wieder her.
- Sie überschreibt entfernte Synchronisierungsdienste nicht von selbst, bevor der nächste Synchronisierungslauf stattfindet.

Wenn Sie die Synchronisierung verwenden, betrachten Sie die Wiederherstellung zunächst als Ersetzen des aktuellen lokalen Zustands. Das anschließende Synchronisierungsverhalten hängt von Ihrem Backend und davon ab, welches Gerät als Nächstes synchronisiert.

---

## Tipps

- Bewahren Sie zusätzlich zur Synchronisierung regelmäßige manuelle Exporte auf.
- Stellen Sie nur Sicherungen aus vertrauenswürdigen Quellen wieder her.
- Wenn Sie die Dateisynchronisierung verwenden, warten Sie, bis die richtige `data.json` vollständig repliziert wurde, bevor Sie ein weiteres Gerät synchronisieren.

Siehe auch [Daten und Synchronisierung](/de/data-sync/).
