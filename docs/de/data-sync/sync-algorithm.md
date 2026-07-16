# Synchronisierungsalgorithmus

Mindwtr verwendet eine Local-first-Synchronisierung mit deterministischer Konfliktbehandlung.

Diese Seite ist die technische Zusammenführungsreferenz für Wartung und Fehlersuche. Einrichtung von Backends, Wiederherstellungsschritte und betriebliche Hinweise für Benutzer finden Sie unter [Daten und Synchronisierung](/de/data-sync/).

## Eingaben und Ausgaben

- Eingabe A: lokale Momentaufnahme (`tasks`, `projects`, `sections`, `areas`, `settings`)
- Eingabe B: entfernte Momentaufnahme (gleiche Struktur)
- Ausgabe: zusammengeführte Momentaufnahme + Zusammenführungsstatistik (`conflicts`, `clockSkew`, `timestampAdjustments`, `futureTimestampClamps`, `conflictIds`, `conflictReasonCounts`, `conflictSamples`, `timestampAdjustmentIds`, `futureTimestampClampIds`) sowie begrenzte Synchronisierungsdiagnoseprotokolle

## Momentaufnahmebasierter Transport

Mindwtr synchronisiert derzeit durch das Zusammenführen vollständiger Momentaufnahmen. Das ist die beabsichtigte Architektur, keine noch nicht umgesetzte Delta-Schicht.

- ADR 0003 und ADR 0007 definieren die revisionsbewusste Zusammenführung auf Grundlage der Momentaufnahme.
- ADR 0008 hält die Transportentscheidung fest, bei der Momentaufnahmesynchronisierung zu bleiben und ein Append-only-Delta-Protokoll aufzuschieben.
- ADR 0009 hält den Vertrag der SQLite-zu-JSON-Brücke fest: SQLite ist der primäre lokale Speicher, `data.json` die Synchronisierungs-/Sicherungsmomentaufnahme.
- Beim aktuellen Umfang bleibt die Synchronisierung dadurch atomar und leichter nachvollziehbar als die Wiedergabe und Verdichtung gerätespezifischer Vorgangsprotokolle.

ADR 0008 sollte erst neu bewertet werden, wenn Momentaufnahmedateien regelmäßig größer als 5 MB sind, Synchronisierungsrundläufe in typischen Netzen länger als 5 Sekunden dauern oder Mindwtr Echtzeitstreaming zwischen mehreren Geräten benötigt. Dann sollte das Delta-Design die vorhandenen Metadaten `rev` und `revBy` erweitern, statt ein paralleles Sequenzschema einzuführen.

## Zusammenführungsregeln

1. Entitäten werden anhand ihrer `id` abgeglichen.
2. Existiert eine Entität nur auf einer Seite, bleibt sie erhalten.
3. Existiert sie auf beiden Seiten, verwendet die Zusammenführung revisionsbewusstes LWW:
   - Sind Revisionsmetadaten vorhanden, wird zuerst `rev` verglichen (höher gewinnt). `rev` ist ein Bearbeitungszähler je Entität, keine Vektoruhr. Mehrere Offline-Bearbeitungen auf einem Gerät können daher eine einzelne neuere Bearbeitung auf einem anderen Gerät schlagen.
   - Bei gleicher Revision wird `updatedAt` verglichen (neuer gewinnt).
   - Bei gleichen Zeitstempeln wird `revBy` lexikografisch verglichen, wenn beide Seiten unterschiedliche Geräte-IDs besitzen. Danach folgt der deterministische Entscheid anhand einer normalisierten Inhaltssignatur. Der `revBy`-Schritt priorisiert keine Geräte; er sorgt dafür, dass Konflikte mit gleicher Revision und gleichem Zeitstempel auf allen Peers vor dem Rückgriff auf die Inhaltssignatur denselben Gewinner erhalten.
   - Bei älteren Entitäten ohne Revisionsmetadaten gelten `updatedAt`-Werte innerhalb der fünfminütigen Uhrabweichungsschwelle als unentschieden; dann gewinnt die deterministische Signatur. Außerhalb dieses Fensters gewinnt das neuere `updatedAt`.
4. Weiche Löschungen verwenden den Vorgangszeitpunkt:
   - Vorgangszeitpunkt = `max(updatedAt, deletedAt)` für Löschmarkierungen.
   - Bei Konflikten zwischen aktiv und gelöscht gewinnt der neuere Vorgangszeitpunkt.
   - Liegen die Vorgangszeiten einer Löschung und eines aktiven Eintrags höchstens 30 Sekunden auseinander und sind die Revisionen gleich, bewahrt Mindwtr den aktiven Eintrag, statt sofort die Löschmarkierung gewinnen zu lassen. Diese bewusste Regel für das Unklarheitsfenster kann dazu führen, dass eine gerade gelöschte Aufgabe nach einer gleichzeitigen Bearbeitung auf einem anderen Gerät wieder erscheint.
   - Unterscheiden sich die Revisionen innerhalb dieses 30-Sekunden-Fensters, gewinnt weiterhin die höhere Revision.
   - Ältere Datensätze ohne Revisionsmetadaten bevorzugen innerhalb desselben Fensters die Löschmarkierung.
   - Die Wiederherstellung einer Sicherung ist die einzige bewusste Ausnahme außerhalb des Unklarheitsfensters: Besitzt die aktive Seite `revBy = "backup-restore"` und ist ihr Vorgangszeitpunkt mindestens so neu wie der der Löschmarkierung, gewinnt der wiederhergestellte aktive Eintrag.
   - Gewinnt eine Löschung gegen eine aktive Bearbeitung, erzeugt Mindwtr einen begrenzten Diagnoseeintrag `syncConflictDiscarded` mit Entitätstyp, ID, Vorgangszeitpunkten und Revisionsmetadaten.
   - Bleibt innerhalb des Unklarheitsfensters der aktive Eintrag erhalten, erzeugt Mindwtr den begrenzten Diagnoseeintrag `Preserved live item during ambiguous delete-vs-live merge` und speichert Konfliktmetadaten im Synchronisierungsverlauf/in den Einstellungen.
5. Ein ungültiges `deletedAt` fällt für eine konservative Vorgangszeitberechnung auf `updatedAt` zurück.
6. Anhänge werden anhand ihrer Anhangs-`id` mit denselben LWW-Regeln zusammengeführt.
7. Metadaten zur Wiederherstellung von Projektarchiven sind opake Synchronisierungsmetadaten:
   - Beim Archivieren eines Projekts werden temporäre Wiederherstellungsmetadaten an den durch die Archivierung geänderten Aufgaben und Abschnitten gespeichert.
   - Diese Metadaten werden von vergleichbaren und deterministischen Synchronisierungssignaturen ignoriert. Reine Archivierungsbuchhaltung erzeugt daher keinen Inhaltskonflikt oder deterministischen Gewinner.
   - Beim Aufheben der Archivierung werden nur Datensätze wiederhergestellt, die noch der durch die Archivierung erzeugten Änderung entsprechen. Gelöschte, manuell geänderte oder in ein anderes Projekt verschobene Aufgaben bleiben unverändert und können die opaken Metadaten behalten, bis der Datensatz durch eine echte Benutzer- oder Synchronisierungsänderung neu geschrieben wird.
8. Bereiche verwenden Löschmarkierungen:
   - Das Löschen eines Bereichs markiert nur den Bereich selbst als gelöscht. Aktive Projekte und Aufgaben darin werden gelöst (ihre `areaId` wird mit einer neuen Revision entfernt) und bleiben aktiv. Eine Bereichslöschung löscht niemals die untergeordneten Einträge.
   - Das Wiederherstellen eines Bereichs weist zuvor gelöste Einträge nicht erneut zu; sie bleiben ohne Bereich aktiv.
   - Verweist eine eingehende Momentaufnahme auf einen fehlenden oder gelöschten Bereich, entfernt die Synchronisierungsreparatur den veralteten `areaId`-Verweis und vergibt eine Reparaturrevision.
   - Die Synchronisierungsreparatur läuft auch für Löschmarkierungen, sodass gelöschte Projekte/Aufgaben keine veralteten Bereichsverknüpfungen behalten, falls sie später wiederhergestellt werden.
   - Fehlende Bereichssortierwerte werden bei der Zusammenführung erzeugt und mit `revBy: "sync-repair"` versehen, damit Peers die Reparatur nicht wiederholt überschreiben.
9. Einstellungen werden entsprechend den Synchronisierungsvorgaben zusammengeführt:
   - Darstellung/Sprache/GTD-Planung/externe Kalender/KI/gespeicherte Filter können unabhängig zusammengeführt werden.
   - Konflikte werden anhand gruppenspezifischer Zeitstempel (`appearance`, `language`, `gtd`, `externalCalendars`, `ai`, `savedFilters`) aufgelöst.
   - Gleichzeitige Änderungen verschiedener Felder derselben Gruppe können weiterhin auf die neuere Gruppenänderung reduziert werden.
   - Gespeicherte Filter werden anhand ihrer Filter-`id` zusammengeführt. Bei Konflikten aktiver gespeicherter Filter wird `updatedAt` strikt verwendet; die deterministische Entscheidung gilt nur bei gleichen oder unbrauchbaren Zeitstempeln.
   - Eine lokale Abwahl in `syncPreferences` wirkt für die Gruppe in beide Richtungen: Mindwtr sendet sie nicht an die Gegenseite und akzeptiert keine eingehenden Änderungen dafür.
   - Geheimnisse (API-Schlüssel, lokale Modellpfade) werden nie synchronisiert.
10. Die Wiederherstellung nach fehlgeschlagenem Schreiben auf die Gegenseite ist ausdrücklich geregelt:
   - Lokale Daten werden zuerst mit `pendingRemoteWriteAt` geschrieben.
   - Bei erfolgreichem Schreiben auf die Gegenseite wird das Kennzeichen entfernt.
   - Fehlgeschlagene Schreibvorgänge werden mit exponentiellem Backoff von 5 Sekunden bis 5 Minuten erneut versucht.
   - Nach 12 fehlgeschlagenen Wiederholungen setzt Mindwtr den Synchronisierungsstatus auf `error` und zeigt den Backend-Fehler an, statt unbegrenzt weiterzuversuchen.
   - Gerätelokale Synchronisierungsdiagnosen bleiben lokal und werden vor Schreibvorgängen auf die Gegenseite entfernt.
11. Telemetrie für Uhrabweichungen:
   - Die Zusammenführungsstatistik zeichnet die größte beobachtete Abweichung auf.
   - Warnungen erscheinen bei mehr als 5 Minuten Abweichung.
   - `updatedAt`-Werte, die mehr als 5 Minuten nach dem Zusammenführungszeitpunkt liegen, werden zum Vergleich begrenzt und in `futureTimestampClamps` gezählt.
   - Werden beide Seiten desselben Datensatzes in der Zukunft begrenzt, erzeugt Mindwtr die begrenzte Diagnose `Both merge candidates had future updatedAt timestamps clamped` mit Datensatz-ID und Begrenzungszeitpunkt.
12. Lokale Änderungen während der Synchronisierung werden nicht durch eine harte Sperre verhindert:
   - Desktop und Mobilgeräte erkennen, wenn sich der lokale Zustand während der Schreibphase verändert hat.
   - In diesem Fall wird der aktuelle Lauf abgebrochen und eine neue Synchronisierung eingereiht, statt die neuere lokale Momentaufnahme zu überschreiben.

## Pseudocode

```text
read local
read remote
validate payload shape
normalize entities (timestamps, revision metadata)

for each entity type in [tasks, projects, sections, areas, people]:
  index local by id
  index remote by id
  for each id in union(localIds, remoteIds):
    if only one side exists: keep it
    else:
      winner = resolveWinner(localItem, remoteItem)
      mergedItem = mergeConflict(localItem, remoteItem, winner) // attachments/settings-specific logic
      push mergedItem

merge settings by sync preferences
validate merged payload
write local
write remote
record sync history and diagnostics
```

## Konfliktbeispiele

### Beispiel 1: Aktiv und gelöscht

- Lokal: Aufgabe `t1` um `10:01` aktualisiert, nicht gelöscht
- Gegenseite: Aufgabe `t1` um `10:03` gelöscht
- Ergebnis: Die gelöschte Version gewinnt (Vorgangszeit `10:03` ist neuer).

### Beispiel 1b: Unklare Löschung gegenüber aktivem Eintrag

- Lokal: Aufgabe `t1` um `10:00:05` bearbeitet, weiterhin aktiv
- Gegenseite: Aufgabe `t1` um `10:00:20` gelöscht
- Beide Datensätze besitzen dieselbe Revisionsnummer.
- Ergebnis: Der aktive Eintrag gewinnt, weil die Vorgänge nur 15 Sekunden auseinanderliegen und die Revisionsmetadaten innerhalb des Unklarheitsfensters gleich sind.

### Beispiel 2: Gleiche Revision und gleicher Zeitstempel

- Lokal und entfernt jeweils `rev=4`, `updatedAt=10:00`
- Inhalte unterscheiden sich (`title`, `tags` usw.).
- Ergebnis: Der deterministische Signaturvergleich wählt auf allen Geräten denselben Gewinner.

### Beispiel 3: Ungültiges deletedAt

- Lokale Löschmarkierung besitzt `deletedAt="invalid-date"` und `updatedAt=09:30`.
- Entfernter aktiver Eintrag besitzt `updatedAt=10:00`.
- Ergebnis: Der aktive Eintrag gewinnt, weil die ungültige Löschung auf `updatedAt` (`09:30`) zurückfällt.

## Anhänge

- Die Metadatenzusammenführung läuft vor dem Abgleich der Dateiübertragung.
- URI/lokaler Status des Gewinneranhangs bleiben erhalten, wenn sie verwendbar sind.
- Besitzt der Gewinner keine verwendbare lokale URI, kann die Zusammenführung auf URI/Status der anderen Seite zurückgreifen.
- Konflikte zwischen gelöschten und aktiven Anhängen verwenden dieselbe Zusammenführung und dieselben `syncConflictDiscarded`-Diagnosen wie Aufgaben/Projekte. Dadurch ist in der Diagnose sichtbar, wenn ein gelöschter Anhang gegen eine gleichzeitige Metadatenbearbeitung gewinnt.
- Fehlende lokale Dateien werden später durch Anhangssynchronisierung/-download behandelt.
- `settings.attachments.pendingRemoteDeletes` zeichnet entfernte Dateien auf, die nach einer lokalen Anhangslöschung noch gelöscht werden müssen.
- Ausstehende Löschungen auf der Gegenseite bleiben erhalten, bis sie erfolgreich sind. Sie werden nicht altersbedingt bereinigt, da ein vorzeitiges Entfernen gelöschte Dateien im Backend verwaisen lassen kann.
- Mindwtr Cloud bietet außerdem einen authentifizierten Endpunkt zur Bereinigung verwaister Anhangsdateien, auf die die aktuelle Momentaufnahme nicht verweist.

## Zusammenführung auf dem Cloud-Server

Mindwtr Cloud ist für `/v1/data` kein einfacher Objektspeicher. Bei einem authentifizierten `PUT /v1/data` liest der Server die vorhandene Namensraum-Momentaufnahme, führt darauf denselben Zusammenführungsalgorithmus mit der eingehenden Momentaufnahme aus, validiert das Ergebnis und schreibt es zurück.

Betriebliche Folgen:

- Das Übertragen einer vollständigen Momentaufnahme ist kein erzwungenes Überschreiben. Vorhandene entfernte Datensätze mit höheren Revisionen, neueren Vorgangszeiten oder gewinnenden Löschmarkierungen können den PUT überstehen.
- Die serverseitige Referenzreparatur kann Folgeaktualisierungen erzeugen, etwa Abschnitte unter gelöschten Projekten als gelöscht markieren.
- Vom Server erzeugte Reparaturzeitstempel verwenden die Serveruhr. Dadurch kann eine vorgehende Clientuhr serverseitige Reparaturmetadaten nicht in die Zukunft verschieben.
- Erfolgreiche Antworten auf `PUT /v1/data` enthalten `{ ok: true, stats, clockSkewWarning }`, damit Clients und Tests das vom Server verwendete Zusammenführungsergebnis prüfen können.

## Schnelle Prüfung auf unveränderte Daten

Cloud-Clients können vor dem Herunterladen einer vollständigen Momentaufnahme `HEAD /v1/data` senden. Der Server gibt `ETag`, `Last-Modified` und `Content-Length` ohne Antworttext zurück. Clients vergleichen diese Metadaten mit der letzten erfolgreichen Synchronisierung und überspringen `GET /v1/data`, wenn der entfernte Namensraum unverändert ist.

Der Server speichert den SHA-256-ETag anhand der Dateistatusmetadaten zwischen, damit wiederholte unveränderte `HEAD`-Prüfungen nicht die gesamte Momentaufnahme erneut hashen.

## Geplante Hintergrundsynchronisierung

Die mobile Hintergrundsynchronisierung wird mit einem vorsichtigen Mindestintervall von 15 Minuten geplant. Die Hintergrundaufgabe lädt Import-/Synchronisierungscode erst bei Bedarf und führt dann dieselbe Momentaufnahmezusammenführung und Wiederholungslogik für entfernte Schreibvorgänge aus.

Hintergrundsynchronisierung ist opportunistisch: Das Betriebssystem kann einen Lauf verzögern oder auslassen. Daher bleiben manuelle Synchronisierung und Vordergrundsynchronisierung die zuverlässigen Wiederherstellungswege, wenn sich Verbindung oder Zugangsdaten geändert haben.

## Wiederherstellung nach Wiederholungen

- Ein fehlgeschlagener entfernter Schreibvorgang verwirft den gerade zusammengeführten lokalen Zustand nicht unbemerkt.
- `pendingRemoteWriteAt`, `pendingRemoteWriteRetryAt` und `pendingRemoteWriteAttempts` werden lokal gespeichert.
- Die nächste Synchronisierung wartet bis zum Ende des Wiederholungsfensters und versucht es dann mit der erhaltenen lokalen Momentaufnahme einschließlich neuerer lokaler Änderungen erneut.
- Nach 12 Versuchen wechselt der Synchronisierungsstatus zu `error`. Die erhaltene Momentaufnahme bleibt lokal; die Statusoberfläche sollte auf die Prüfung von Backend-Verbindung oder Zugangsdaten verweisen.

## Grenze der Löschmarkierungsbereinigung

Löschmarkierungen schützen Löschungen nur während ihrer Aufbewahrung. Die aktuelle Frist wird durch `tombstoneRetentionDays` begrenzt.

Ein Gerät, das länger als diese Frist offline war, kann Datensätze wieder einführen, deren Löschmarkierungen auf anderen Geräten bereits bereinigt wurden. Mindwtr behandelt dies als dokumentierte Konsistenzgrenze der Momentaufnahmesynchronisierung. Benutzer sollten lange offline gewesene Geräte synchronisieren, bevor sie sich auf deren alte lokale Daten verlassen. Künftige Protokollarbeit sollte Momentaufnahmen ablehnen, deren letzte erfolgreiche Synchronisierung vor dem Bereinigungshorizont liegt, falls strengere Garantien nötig werden.

## Einsehbare Diagnosen

- Konfliktanzahl und IDs
- Konfliktursachenzähler und begrenzte Konfliktbeispiele
- größte beobachtete Uhrabweichung
- Anpassungen bei der Zeitstempelnormalisierung
- IDs der Datensätze mit normalisierten Zeitstempeln
- Anzahl und IDs zukünftiger Zeitstempelbegrenzungen
- `syncConflictDiscarded`-Einträge für Löschkonflikte, bei denen die aktive Seite verworfen wurde
- letzter Synchronisierungsstatus/-verlauf in den Einstellungen
- Details je Konflikt unter Einstellungen → Synchronisierung: Name des betroffenen Eintrags, abweichende Felder und gewinnende Geräteversion (begrenzt auf die neuesten Beispiele)
- Konfliktzusammenfassungen in `mindwtr.log`, auch bei deaktivierter Debug-Protokollierung (nur IDs und Feldnamen, niemals Datensatzinhalte)

## Verwandte Dokumentation

- [Daten und Synchronisierung](/de/data-sync/)
- [Cloud API](/de/developers/cloud-api)
- [Cloud-Bereitstellung](/de/data-sync/cloud-deployment)
- [Diagnose und Protokolle](/de/data-sync/diagnostics-logs)
- [Core API](/de/developers/core-api)

## Fehlerbehebung

Wenn Konflikte oder Abweichungswarnungen wiederholt auftreten:

1. Geräteuhren prüfen (automatische Netzwerkzeit aktivieren).
2. Verbindung/Authentifizierung des Synchronisierungs-Backends prüfen.
3. Synchronisierungsdiagnosen in den App-Einstellungen und Protokollen prüfen.
