# Datenlebenszyklus

Eine häufige Frage lautet: Was lässt `data.json` wachsen, wodurch wird die Datei kleiner und muss etwas manuell bereinigt werden? Die kurze Antwort: Eine manuelle Bereinigung ist nicht nötig. So funktioniert es.

## Wo Ihre Daten gespeichert sind

Die lokale maßgebliche Datenquelle ist eine **SQLite-Datenbank** im Datenverzeichnis der App. Die Datei `data.json` im Synchronisierungsordner ist eine **Momentaufnahme**, die aus dieser Datenbank neu geschrieben wird. Sie dient als Synchronisierungsnutzlast und menschenlesbare Sicherung, nicht als fortlaufendes Protokoll.

Weil die Datei neu geschrieben wird, kann sie zwischen zwei Läufen *kleiner* werden: Abgelaufene Löschmarkierungen und endgültig entfernte Einträge werden einfach nicht mehr geschrieben. Das Löschen von `data.json` „komprimiert“ nichts; die App erzeugt dieselbe Momentaufnahme erneut aus der Datenbank.

## Wodurch die Datei wächst

- Aktive, erledigte und archivierte Aufgaben (Ihr Verlauf bleibt bewusst durchsuchbar)
- Projekte, Abschnitte, Bereiche, Personen und gespeicherte Filter
- **Metadaten** von Anhängen (einige hundert Byte pro Anhang; die eigentlichen Dateien liegen getrennt unter `attachments/`)
- Löschmarkierungen, damit andere Geräte von gelöschten Einträgen erfahren

## Was die Datei automatisch verkleinert

- **Ablauf von Löschmarkierungen**: Löschdatensätze werden nach der Aufbewahrungsfrist entfernt (standardmäßig 90 Tage).
- **Leeren des Papierkorbs**: „Endgültig löschen“ (je Eintrag oder „Alle löschen“) entfernt die Daten sofort. Nur die Löschmarkierung bleibt bis zum Ablauf der Frist erhalten.
- **Bereinigung von Anhängen**: Verwaiste Anhangsmetadaten und veraltete ausstehende Übertragungen werden mit begrenzten Wiederholungsversuchen entfernt. Unter Einstellungen → Daten gibt es auch eine manuelle Bereinigung.

## Warum eine Datei statt getrennter Archive

Archivierte Aufgaben bleiben bewusst im selben synchronisierten Dokument. Datei-Backends wie WebDAV, Ordner und Dropbox laden Dateien unabhängig voneinander hoch. Würden aktive und archivierte Daten auf mehrere Dateien verteilt, wäre das Archivieren und Wiederherstellen eine Transaktion über zwei Dateien. Sie könnte nur teilweise ausgeführt werden und die Geräte auseinanderlaufen lassen. Ein Dokument wird als atomare Einheit zusammengeführt. Langfristig ist eine inkrementelle Synchronisierung einzelner Datensätze auf Grundlage der vorhandenen Revisionsmetadaten geplant, nicht eine Aufteilung auf weitere Dateien. Die Zusammenführungsregeln erklärt der [Synchronisierungsalgorithmus](/de/data-sync/sync-algorithm).

## Was Sie in der Praxis erwarten können

Nach Jahren normaler Aufgabennutzung umfasst die Datei einige hundert Kilobyte bis wenige Megabyte. Das ist wenig im Vergleich zum Ordner `attachments/`, wenn Sie Dateien oder Audio anhängen. Falls Ihnen die Momentaufnahme groß erscheint: Leeren Sie den Papierkorb, führen Sie unter **Einstellungen → Daten** die Anhangsbereinigung aus und prüfen Sie `attachments/`, bevor Sie sich über die JSON-Datei Gedanken machen.
