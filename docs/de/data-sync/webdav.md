# WebDAV-Synchronisierung

Die WebDAV-Synchronisierung richtet sich an alle, die einen standardisierten, selbst kontrollierten Speicherendpunkt wünschen, ohne den Mindwtr-Cloud-Server zu betreiben.

## Wann WebDAV sinnvoll ist

Verwenden Sie WebDAV, wenn:

- Sie bereits einen WebDAV-Server betreiben,
- Sie plattformübergreifend synchronisieren möchten,
- Sie eine selbst kontrollierte Infrastruktur bevorzugen und
- Sie mit der Verwaltung von Server-URLs und Zugangsdaten vertraut sind.

## Checkliste zur Einrichtung

1. Exportieren Sie eine Sicherung.
2. Erstellen Sie auf Ihrem WebDAV-Server einen eigenen Ordner für Mindwtr.
3. Geben Sie in Mindwtr die Server-URL und Zugangsdaten ein.
4. Starten Sie auf dem ersten Gerät eine manuelle Synchronisierung.
5. Verbinden Sie ein weiteres Gerät und prüfen Sie mit einer Testaufgabe, ob die Synchronisierung in beide Richtungen funktioniert.

::: tip Eigener Ordner
Verwenden Sie einen Ordner ausschließlich für die Mindwtr-Synchronisierungsdaten. Mischen Sie die Synchronisierungsdateien der App nicht mit anderen Dokumenten.
:::

## Fehlerbehebung

- Prüfen Sie, ob die URL auf einen beschreibbaren Ordner verweist.
- Prüfen Sie die Gültigkeit des Serverzertifikats.
- Vergewissern Sie sich, dass Hochladen und Überschreiben erlaubt sind.
- Achten Sie auf Ratengrenzen oder Dateisperren des Anbieters.
- Exportieren Sie eine Sicherung, bevor Sie Dateien auf dem Server löschen.
