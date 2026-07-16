# Engineering-Prinzipien

Designprinzipien, Einschränkungen und Leitplanken, die aus der vollständigen Issue-/Diskussionshistorie dieses Repositorys abgeleitet wurden (569 Issues, 89 Diskussionen, bis v0.9.10). Jedes Prinzip nennt die Vorfälle, die dazu geführt haben. Neue Funktionen und Fehlerbehebungen sollten vor der Implementierung anhand dieser Seite geprüft werden.

Die mit Abstand wichtigste Erkenntnis aus der Historie: **Fast jeder kritische Fehler (P0/P1) war ein Datenintegritätsfehler in einem Pfad mit mehreren Schreibern** — Synchronisierung vs. UI, Synchronisierung vs. sich selbst, App vs. MCP/CLI, Snapshot vs. inkrementelles Speichern. UI-Fehler waren zahlreich, aber günstig; Fehler in Schreibpfaden kosteten Benutzerdaten und Vertrauen.

---

## 0. Produktphilosophie (vor jeder Engineering-Entscheidung prüfen)

Mindwtr ist **standardmäßig einfach und bei Bedarf leistungsfähig**: progressive Offenlegung (erweiterte Optionen bleiben verborgen, bis sie relevant sind), standardmäßig weniger (weniger Felder, weniger Stellschrauben, weniger Ablenkungen) und keine Funktionsausweitung (Klarheit vor Überfrachtung). *Zeig mir kein Cockpit, wenn ich nur Fahrrad fahren möchte.*

### Automatisch ist besser als manuell — ableiten, nicht fragen

Wenn sich das richtige Ergebnis automatisch bestimmen lässt — aus Plattform, Installationskanal, vorhandenen Daten oder Kontext —, sollte die App es einfach umsetzen. Dies gilt für alles, nicht nur für Einstellungen: Eine Stellschraube, eine Bestätigungsfrage, ein zusätzlicher Tipp in einem Arbeitsablauf oder ein UI-Steuerelement, das der Benutzer bedienen muss, sind derselbe Fehler — die App stellt eine Frage, die sie selbst beantworten könnte. Jeder manuelle Schritt verlagert kognitive Belastung von uns (einmal) auf alle Benutzer (für immer).

- **Aktualisierungsprüfungen:** Ein Benutzer bat um einen Schalter „Aktualisierungsprüfungen deaktivieren“, weil die App einer über den Paketmanager installierten Version ständig GitHub-Downloads anbot. Die Lösung war nicht der Schalter: Die App erkennt jetzt ihren Installationskanal und verhält sich je Kanal richtig — Erinnerungen sind an Kanäle mit einem maßgeblichen Feed gebunden; Kanäle, die ihre Aktualisierungen selbst verwalten, bleiben vollständig still. Es wurde keine Einstellung ausgeliefert.
- **#832:** Der Standard für das globale Tastenkürzel zur Schnelleingabe folgt den Konventionen der jeweiligen Plattform (unter macOS/Linux mit einer sicheren Kombination aktiviert, unter Windows deaktiviert, wo globale Tastenkürzel unbemerkt Tasten abfangen), statt Benutzer dies selbst herausfinden zu lassen.
- **#833:** Abgeschlossene Fokussitzungen rechnen ihre Minuten automatisch der verknüpften Aufgabe zu — die manuelle Eingabe dient als Korrekturpfad, nicht als Arbeitsablauf. Und wenn sich ein Verhalten tatsächlich nicht ableiten lässt und eine echte Nachfrage besteht, setzen Sie es hinter einen *vorhandenen* Schalter, bevor Sie einen neuen schaffen: Die Zeiterfassung für Aufgaben erscheint nur, wenn der vorhandene Pomodoro-Timer und dessen Aufgabenverknüpfung aktiviert sind; es wurde keine neue Einstellung hinzugefügt.

**Leitplanken:** Beweisen Sie vor dem Hinzufügen einer Einstellung, einer Frage oder eines manuellen Arbeitsschritts, dass sich das Ergebnis nicht ableiten oder vorhersagen lässt. Beweisen Sie vor dem Schaffen einer neuen Einstellung oder Bedienmöglichkeit, dass keine vorhandene bereits dieselbe Absicht ausdrückt. Standardwerte folgen bewährten Plattformpraktiken, nicht Neutralität. Manuelle Steuerelemente sind die Ausweichlösung zur Korrektur, niemals der primäre Pfad, wenn Automatisierung möglich ist.

---

## 1. Schreibvorgänge und Persistenz

### P1 — Jeder Schreibvorgang wird durch eine Revision geschützt; der Eingangsreihenfolge wird nie vertraut

Nutzdaten mit einer niedrigeren `rev` dürfen keine Zeile mit höherer `rev` überschreiben können. Dies wird auf der untersten Ebene (dem SQL-Upsert) durchgesetzt, nicht in den Aufrufern.

- **#693 (P1, kritisch):** `updateTask` persistierte über ein Fire-and-Forget-`saveTask`, während ein entprelltes `saveData` für den vollständigen Snapshot später eintreffen und die neuere Zeile überschreiben konnte — der Aufgaben-Upsert hatte keinen Revisionsschutz. In kurzlebigen MCP-Prozessen ging der Schreibvorgang vollständig verloren. Lösung: `WHERE tasks.rev IS NULL OR tasks.rev <= excluded.rev` beim Upsert und Nachverfolgung des laufenden Speichervorgangs in `flushPendingSave()`.
- **#316:** Änderungen, die *während* einer Synchronisierung vorgenommen wurden (Aufgabe erledigen, Bereich wechseln), wurden rückgängig gemacht, als die Aktualisierung der laufenden Synchronisierung eintraf. Es waren drei Korrekturen nötig: veraltete Abrufresultate überspringen, die lokale Änderungsmarke auch bei Änderungen innerhalb derselben Millisekunde erhöhen und anschließend Diagnosedaten hinzufügen, um den Rest zu finden.

**Leitplanke:** Jeder neue Persistenzpfad (neue Entität, neuer Speicheraufruf, neuer Prozess) muss die Frage beantworten: *Was verhindert, dass ältere Nutzdaten neuere überschreiben?* Lautet die Antwort „Timing“, handelt es sich um einen Fehler.

### P2 — Löschungen lösen Zuordnungen, sie kaskadieren nie; Wiederherstellungen übertreffen Tombstones

- **#609 (P0, kritisch):** Beim Löschen eines Bereichs wurden alle darin enthaltenen Aufgaben und Projekte gelöscht. Schlimmer noch: Nachdem der Benutzer eine Sicherung wiederhergestellt hatte, löschten die Tombstones der Synchronisierung die wiederhergestellten Daten bei jedem Zyklus erneut. Lösung: Beim Löschen eines Bereichs wird jetzt nur `areaId` entfernt; die Wiederherstellung einer Sicherung versieht wiederhergestellte Datensätze als neue lokale Daten, sodass veraltete entfernte Tombstones verlieren.

**Leitplanke:** Beim Löschen eines Containers (Bereich/Projekt/Abschnitt/Tag) werden untergeordnete Elemente abgetrennt. Jeder Wiederherstellungs-/Importpfad muss die Daten neu autorisieren (neue rev/updatedAt), damit sie nicht gegen Tombstones verlieren, die durch genau den Fehler erzeugt wurden, von dem sich der Benutzer erholen möchte.

### P3 — Fire-and-Forget-Erfolg ist eine Lüge; erst nach dauerhafter Persistenz antworten

- **#694:** MCP-Schreibwerkzeuge gaben die geänderte Aufgabe aus dem In-Memory-Store zurück, obwohl `saveData` unbemerkt fehlgeschlagen war — Lesevorgänge (andere DB-Verbindung) und die Desktop-App zeigten alte Daten. Das Werkzeug meldete „Erfolg“, obwohl nichts persistiert wurde.
- **#693:** Gleiche Ursache: Der Prozess wurde beendet, bevor das nicht nachverfolgte Speicher-Promise abgeschlossen war.

**Leitplanke:** Eine API-/Werkzeug-/IPC-Antwort, die den Erfolg eines Schreibvorgangs meldet, darf erst gesendet werden, nachdem die Speicherschicht ihn bestätigt hat. Verfolgen Sie jedes Speicher-Promise; `flushPendingSave()` muss *alle* ausstehenden Arbeiten abdecken.

---

## 2. Konvergenz der Synchronisierung

### P4 — Die Zusammenführung muss ein Fixpunkt sein: Erneutes Zusammenführen bereits synchronisierter Daten bewirkt nichts

- **#698:** Ein *entferntes* Legacy-Feld (`showFutureRecurrence`) blieb in gespeicherten Nutzdaten auf einer Seite erhalten. Inhaltssignaturen wurden mit dem Spread `{...task}` erzeugt, sodass der unbekannte Schlüssel bei jeder Synchronisierung **325 dauerhafte Konflikte** mit identischen Revisionen und Zeitstempeln auslöste.
- **#418:** `null` und ein *weggelassenes* optionales Feld wurden unterschiedlich gehasht → endlose Scheinkonflikte plus falsche Warnungen vor „3 Stunden Uhrabweichung“, die von veralteten Entitätszeitstempeln statt von Uhren ausgingen.
- **#142:** Ungültiges Legacy-`revBy` brach die gesamte Zusammenführungsvalidierung ab, bis es bereinigt wurde.

**Leitplanken:**

- Inhaltssignaturen werden anhand einer **expliziten Positivliste von Feldern** berechnet, niemals über Object Spread. Unbekannte/Legacy-Schlüssel fließen nie in den Vergleich ein.
- Die Normalisierung ist idempotent und konvergent: `normalize(normalize(x)) === normalize(x)`, und `null` ≡ fehlend für optionale Felder.
- Wenn ein Feld aus dem Schema entfernt wird, liefern Sie einen Migrations-/Entfernungsschritt aus — alte Nutzdaten bleiben jahrelang in entfernten Speichern.
- Ein Test „Neue Synchronisierung bereits abgeglichener Daten ergibt null Konflikte“ gehört bei jeder Signaturänderung in die Suite.

### P5 — Die eigenen Schreibvorgänge der Synchronisierung müssen für deren Trigger unsichtbar sein

Die Saga „synchronisiert endlos weiter“ aus #718/#725 erforderte **sechs Korrekturen**, jeweils für eine andere Selbstverstärkungsschleife:

1. Synchronisierungspersistenz markierte das Ignorierfenster des SQLite-Watchers nicht → eigener Schreibvorgang wurde als externe Änderung erkannt;
2. Schreibvorgänge für Synchronisierungsstatus/-historie setzten den Datenzustand erneut auf geändert;
3. Statusschreibvorgänge speicherten einen **veralteten In-Memory-Snapshot**, der gerade zusammengeführte Entitäten rückgängig machte (und dieselbe Zusammenführung erneut einreihte);
4. Deduplizierung eines doppelten Bereichsnamens beim Laden schrieb Daten *bei jedem Laden* neu;
5. Personenliste wurde nicht in SQLite persistiert → bei jedem Laden nachgetragen und als geändert markiert;
6. Dateirauschen von `mindwtr.db-shm` wurde als externer Schreibvorgang behandelt.

Frühere Fehler derselben Klasse: **#309** (Watcher führte das app-eigene `data.json` als externe Änderung zurück — benötigt wurde ein *Fenster* kürzlich selbst geschriebener Hashes, nicht nur der letzte), **#502** (ständig sichtbare Synchronisierungsaktivität in der UI).

**Leitplanken:**

- Jedes von der Synchronisierung geschriebene Byte (Daten, Status, Historie, Snapshots) wird für jeden Watcher, der es beobachten könnte, als selbst geschrieben markiert.
- Synchronisierungsmetadaten (Status/Historie) werden auf Grundlage des persistierten Snapshots geschrieben, niemals aus potenziell veraltetem UI-Zustand — besser noch: außerhalb der Benutzerdaten speichern.
- **Das Laden von Daten verändert sie nie.** Migrationen/Deduplizierungen sind explizite einmalige Durchläufe, keine Normalisierung beim Laden, die den Zustand als geändert markiert.
- Jeder automatische Trigger benötigt ein Beendigungsargument: keine Arbeit → kein Lauf (#725), Fehler → Abkühlphase (#718, Korrektur 5; #133 Flugmodus), Erfolg → Leerlauf.

### P6 — Benutzeränderungen während der Synchronisierung sind unantastbar

- **#323:** Das Anklicken des Status-Dropdowns löste eine Synchronisierung bei Fokus/Unschärfe aus, die alle ungespeicherten Änderungen im geöffneten Editor rückgängig machte. Lösung: Die automatische Synchronisierung ignoriert Fokus-/Unschärfe-Trigger, solange ein Editor geöffnet ist.
- **#316 / #128:** „Jede Aktion wurde nach wenigen Sekunden rückgängig gemacht“ — das Symptom mit dem größten Vertrauensverlust in der gesamten Historie.

**Leitplanke:** Jeder neue Synchronisierungstrigger muss auf die Frage geprüft werden: „Was geschieht, wenn der Benutzer gerade bearbeitet?“ Die Seite mit der lokalen Änderung wird erneut eingereiht; sie wird niemals überschrieben. (Dafür gibt es die Mechanik aus `lastDataChangeAt`-Snapshot + `LocalSyncAbort` + Wiedereinreihung — neue Synchronisierungsarbeit muss sie durchlaufen.)

### P7 — Das Synchronisierungsdokument ist eine Zusammenführungseinheit; nicht ohne Transaktionskonzept aufteilen

- **#629 (Diskussion):** Die Aufteilung in `archive.json` wurde verworfen — Archivieren/Wiederherstellen wird zu einer dateiübergreifenden Transaktion; Datei-Backends laden Dateien unabhängig hoch → Split Brain. Dokumentierte Richtung: datensatzbasierte inkrementelle Synchronisierung, nicht mehr Dateien.
- **#113 (Diskussion):** Syncthing-Konflikte sind konstruktionsbedingt dateibasiert; app-gesteuerte Backends (WebDAV/Cloud) sind die empfohlene Antwort, nicht intelligentere Dateinamen.

**Einschränkung:** Funktionen dürfen kein zweites synchronisiertes Dokument (oder Dateien pro Entität) hinzufügen, sofern sie kein atomares Commit-Protokoll für mehrere Dateien mitbringen. Ziehen Sie Felder auf Entitäten neuen Dokumenten auf oberster Ebene vor.

---

## 3. Anhänge (Zweiphasenregel für Binärdaten + Metadaten)

### P8 — Erst Bytes hochladen, dann Metadaten veröffentlichen; 404 ist endgültig

- **#176:** Die Synchronisierung bereinigte den Anhangs-`uri` zu `""` und veröffentlichte Metadaten, *bevor* der Upload abgeschlossen war → Anhänge ohne `cloudKey`, ohne Datei irgendwo, nicht wiederherstellbar. Danach deckte die Korrektur „bis zum Upload blockieren“ Uploads auf, die nie ausgeführt wurden (`content://`-URIs mit fehlenden Größenmetadaten) → Synchronisierung dauerhaft blockiert. Insgesamt vier Korrekturen.
- **#213 / #128:** Veraltete `pendingRemoteDeletes` und Metadaten für fehlende entfernte Dateien verursachten endlose Wiederholungsschleifen; manuelles Löschen der Daten half nicht, weil die Synchronisierung sie wiederherstellte.
- **#399:** SAF-Dokument-URIs mit abschließendem Schrägstrich machten das vorhandene Anhangsverzeichnis unsichtbar → bei jeder Synchronisierung wurde eine *neue vollständige Kopie aller Anhänge* erstellt.
- **#655:** Entferntes 404 wurde endlos wiederholt/abgefragt; darauf folgte `EISDIR` durch eine Kollision mit einer temporären Datei.

**Leitplanken:**

- Die Reihenfolge ist invariant: Bytes hochgeladen → `cloudKey` erfasst → Metadaten veröffentlicht. Niemals umgekehrt.
- Jeder Fehler bei entfernten Dateien wird als wiederholbar (begrenzt, mit Backoff) oder endgültig klassifiziert (404 → als nicht wiederherstellbar markieren, stoppen). Nirgendwo im Anhangscode sind unbegrenzte Wiederholungen zulässig.
- Identitätsprüfungen verwenden maßgebliche IDs/Schlüssel, niemals URI-Zeichenfolgenformen des Anbieters (SAF-Schlussschrägstriche, Besonderheiten von `content://`).
- Anhangsphasen werden übersprungen, wenn die Metadaten keine ausstehende Arbeit zeigen (Leistung *und* Schleifensicherheit).
- Bekannte offene Gefahr (Überprüfung 2026-06): `duplicateTask` teilt `cloudKey` ohne Referenzzähler zwischen Kopien — beim Löschen einer Kopie werden die Bytes der anderen gelöscht. Fügen Sie keine neuen Pfade mit gemeinsamem Schlüssel hinzu.

---

## 4. Mehrprozesszugriff (MCP, CLI, lokale API)

### P9 — Ein maßgeblicher Store, ein serialisierter Schreibpfad; jeder Schreiber ist vollwertig oder schreibgeschützt

- **#179 / #285:** Die CLI schrieb Aufgaben in `data.json` — einen **Exportspiegel**, der beim Start einmal gelesen und anschließend überschrieben wird —, wobei `rev`/`revBy`/`taskMode` fehlten. Selbst bei einem Import verwarf die Zusammenführung sie daher unbemerkt.
- **#722:** Desktop-App + lokales MCP schrieben gleichzeitig in dasselbe SQLite → Sperrkonflikte; der gefährliche Workaround (zwei Schreiber über gemeinsamen Speicher) musste als nicht unterstützt dokumentiert werden. Lösung: Bei gehaltener Schreibsperre sofort fehlschlagen, **aktuelle Daten neu laden, gesamten Vorgang wiederholen** — niemals mit einem Snapshot von vor der Sperre fortfahren.
- **#650:** Ein langlebiger Desktop-WAL-Lesesnapshot sah MCP-Schreibvorgänge erst nach einem Neustart.
- **#367:** Die Sandbox des Mac App Store verschob die DB; die Pfadauflösung von MCP kannte nur Pfade ohne Sandbox.

**Leitplanken:**

- Die Erstellung aller Entitäten läuft durch Core-Factories, die jedes für die Synchronisierung erforderliche Feld setzen (`rev`, `revBy`, `createdAt`, `updatedAt`, Standardwerte). Ein Schreiber, der JSON selbst zusammenstellt, ist ein künftiger Datenverlustfehler. (Dass beim `POST /v1/tasks` des Cloud-Servers keine Revision gesetzt wird, gehört zur selben Klasse — Korrektur ausstehend.)
- Externe Schreiber betten entweder den Core-Store + Speicheradapter ein oder bleiben schreibgeschützt.
- Schreibprotokoll über Prozessgrenzen: Sperre beziehen → (bei Konflikt) neu laden → erneut anwenden → schreiben. Fortsetzen mit einem veralteten Snapshot ist verboten.
- Die Pfadauflösung muss Installationskanäle mit Sandbox aufführen (App-Store-Container, Flatpak usw.).

---

## 5. Datums-, Wiederholungs- und Statussemantik

### P10 — Eine gemeinsame Funktion für die „nächste Instanz“; alle Felder rücken gemeinsam vor; Neuerzeugung ist idempotent

Der Bereich Wiederholungen ist der in der Historie am häufigsten erneut beschädigte Funktionsbereich:

- **#140:** Eine benutzerdefinierte Wiederholung rückte `dueDate`, aber nicht `startTime` vor → die erledigte Aufgabe erschien sofort wieder im Fokus.
- **#241:** Die neu erzeugte Instanz verlor `sectionId`/`areaId`.
- **#187 → #717:** Folgeaufgaben für Wiederholung nach Abschluss landeten sofort unter „Nächstes“ (kein aufgeschobener `startTime`); dasselbe Symptom kehrte einen Versionszyklus später für reine Datumsstartwerte und Moduswechsel zurück.
- **#662:** Das Abschließen erzeugte ein Duplikat, obwohl bereits eine gleichwertige offene Folgeaufgabe existierte.
- **#557:** Eine kleine Projektionsfunktion erforderte **mehr als 7 Folgekorrekturen**: n-ter Wochentag vs. Monatstag, Verankerung ohne Startdatum, Verlust monatlicher Metadaten bei Laden-/Speichern-/Bearbeitungs-Roundtrips, falsch beschriftete Projektionen.
- **#17:** Durch COUNT begrenzte RRULEs wurden „ab dem aktuellen Monat“ erweitert und ließen zehn Jahre alte Serien wiederauferstehen.

**Leitplanken:**

- Genau eine Core-Funktion berechnet die nächste Instanz. Sie muss: Start/Fälligkeit/Wiedervorlage zusammenhängend vorrücken; *alle* Kontextfelder bewahren (Projekt, Abschnitt, Bereich, Kontexte, Tags, Regeln zum Zurücksetzen der Checkliste); reine Datumswerte als reine Datumswerte erhalten; die RRULE-Erweiterung am Serienanfang verankern, nicht an „jetzt“; und idempotent sein (überspringen, wenn eine gleichwertige offene Folgeaufgabe vorhanden ist).
- Wiederholungsmetadaten müssen Roundtrips aus Laden → Speichern → Bearbeiten überstehen; fügen Sie für jedes neue Wiederholungsfeld einen Roundtrip-Test hinzu.
- Regressionsmatrix für jede Wiederholungsänderung: `{strict, after-completion} × {start-only, due-only, both, neither} × {daily, weekly, monthly-day, monthly-nth-weekday, yearly, COUNT-limited} × {date-only, datetime}`.

### P11 — Status hat Vorrang vor Datumswerten; Sichtbarkeitsprädikate liegen einmalig im Core

- **#341:** Eine WAITING-Aufgabe erschien unter NEXT, weil eine Startdatumsregel den Status ignorierte.
- **#237:** Desktop und Mobilgeräte berechneten „Heute“ unterschiedlich; Aufgaben waren auf einer Plattform sichtbar und auf der anderen unsichtbar. Am Ende verwendeten beide Plattformen dieselbe gemeinsame Regel.
- **#144:** Die automatische Hochstufung geplant→nächstes wurde bewusst in der Core-Abrufpflege implementiert, damit beide Apps sie übernehmen.
- **#591:** Die abgeleitete Regel des Repositorys: Datumskohärenz (z. B. `startTime` nach `dueDate`) wird zentral als **abgeleiteter Zustand** in der Core-Normalisierung erkannt, auf *alle* Schreibpfade angewandt — und synchronisierte Eingaben werden als nicht vertrauenswürdig behandelt und erneut geprüft.

**Leitplanken:**

- Jedes Prädikat, das entscheidet, wo eine Aufgabe erscheint (`isToday`, `isAvailable`, aufgeschoben, Wiedervorlage fällig), wird in `packages/core` definiert und von beiden Apps importiert. Wenn eine Ansicht eines davon neu implementiert, ist das ein Fehler, auch wenn es derzeit übereinstimmt.
- Der Status ist die primäre Achse; Datumswerte modifizieren innerhalb eines Status, niemals über Statusgrenzen hinweg.
- Verändern Sie Benutzerdaten nicht automatisch, um Kohärenz durchzusetzen — zeigen Sie stattdessen abgeleitete Warnungen an (Lösung von #591: Ein Benutzer kann eine Aufgabe absichtlich überfällig, aber aufgeschoben halten).

### P12 — Eine aktive Instanz pro wiederkehrender Aufgabe ist eine Produktinvariante

- **#552 → #557:** Das vorzeitige Erstellen echter zukünftiger Instanzen wurde bewusst verworfen („erschwert es, Abschluss, Löschung, Synchronisierung und Duplikatverhalten nachzuvollziehen“); akzeptiert wurde eine **schreibgeschützte Projektion**.

**Einschränkung:** Funktionen, die zukünftige Sichtbarkeit benötigen, erzeugen abgeleitete/projizierte, nicht bearbeitbare Daten — niemals vorzeitig echte Datensätze.

### P13 — Reine Datumswerte erhalten niemals eine implizite Uhrzeit

- **#298 (kritisch):** Reine Datumswerte wurden als *Mitternachtsalarme* geplant und weckten Benutzer nachts; das Entziehen der Benachrichtigungsberechtigung entfernte bereits geplante Alarme nicht, sodass sie ohne sichtbare UI weiter ausgelöst wurden.
- **#205:** Eingegebene Jahreszahlen wurden in 19xx umgewandelt; unvollständige Datumssegmente sprangen zwischen Epochen.

**Leitplanken:** Ein reines Datumsfeld plant nichts, solange der Benutzer keine Uhrzeit festlegt. Beim Entziehen der Berechtigung wird alles bereits Geplante abgebrochen. Die Alarm-/Benachrichtigungsplanung ist idempotent und bei erneuter Registrierung still (Toastschwemme „Dieser Alarm ist bereits gesetzt“ aus #418).

---

## 6. Einstellungen und Zustand außerhalb von Aufgaben

### P14 — Jede Einstellung klassifizieren: synchronisiert / gerätelokal / UI-Sitzung — und Standardwerte gewinnen nie Zusammenführungen

- **#120:** Die Synchronisierung setzte Einstellungen auf Standardwerte zurück (entfernter Standardwert überschrieb expliziten lokalen Wert).
- **#62:** Einstellungen gingen bei einer App-Aktualisierung verloren.
- **#316:** Der *UI-Bereichsfilter* lag an einer Stelle, an der eine Synchronisierungsaktualisierung ihn überschreiben konnte.
- **#488:** Das Ändern der Dichte setzte die Textgröße zurück (der Schreiber einer Einstellung überschrieb Geschwisterwerte).

**Leitplanken:** Neue Einstellungen deklarieren bei ihrer Entstehung ihre Klasse. UI-Sitzungszustand (aktueller Filter, ausgewählte Ansicht) liegt niemals im synchronisierten Einstellungsdokument. Einstellungen werden Feld für Feld zusammengeführt; ein expliziter Wert übertrifft immer einen Standardwert. Einstellungsschreibvorgänge laufen über einen einzigen Aktualisierer, der keine Geschwisterschlüssel verlieren kann.

---

## 7. Release-Engineering und Plattform-Sandboxes

### P15 — Jeder Vertriebskanal ist eine andere Laufzeit; das Kanalartefakt validieren, nicht die Codebasis

- **#715/#674/#723:** Die FOSS-APK v0.9.9 stürzte bei allen F-Droid-/Obtainium-Benutzern beim Start ab (Modul-Interop-Fehler nur in der FOSS-Abhängigkeitsmenge). Die reguläre APK funktionierte — das Testen eines Kanals bewies nichts über den anderen.
- **#583 (P0):** Flatpak startete nicht — die gemeinsam genutzte appindicator-Bibliothek fehlte nur in der Flatpak-Laufzeit.
- **#234:** AUR brach wiederholt (von CI injizierte Tauri-Konfiguration, Besonderheiten der Bun-`overrides`, dann instabile Tests in `check()`); die Lösung war ein **Release-Pipeline-Gate, das das AUR-Paket in einem sauberen Arch-Container baut** — das Vorbild für Kanal-Gates.
- **#539:** Der F-Droid-Patcher für das JVM-Ziel übersah lokale Android-Module.
- **#209:** Windows-Store-Absturz: Die Initialisierung von Tray/globalem Tastenkürzel war in der MSIX-Sandbox fatal; auch ein *Konflikt* eines registrierten Tastenkürzels konnte den Start beenden.
- **#198:** Hermes-Absturz — `setTimeout` wurde auf Modulebene referenziert, bevor Timer-Globals vorhanden waren.

**Leitplanken:**

- Der Start hängt nie zwingend von optionalen Fähigkeiten ab (Tray, globale Tastenkürzel, Schlüsselbund, Benachrichtigungen, Timer auf Modulebene). Erkennen → eingeschränkt fortfahren → protokollieren; niemals beenden.
- Jeder Kanal (FOSS-APK, Play, F-Droid, Flatpak, AUR, MSIX/Store, winget, homebrew, App Store, TestFlight) erhält vor der Veröffentlichung einen Smoke-Start *seines* Artefakts in einer Umgebung, die dem Kanal so genau entspricht, wie es die CI zulässt.
- Kanalspezifische Abhängigkeitsmengen (FOSS vs. nicht FOSS, Flatpak-Lockdateien) werden als separate Build-Ziele mit eigener CI behandelt.

### P16 — Ein getaggtes Release ist unveränderlich

- **#682/#674:** Nach der Behebung des FOSS-Absturzes wurde die korrigierte APK — aus einem *späteren Commit gebaut* — in das vorhandene Release v0.9.9 hochgeladen. Die Reproducible-Build-Prüfung von IzzyOnDroid schlug fehl; das Artefakt musste zurückgezogen und das Release als ersetzt markiert werden.

**Leitplanken:** Korrektur → neuer Tag → neues Release (z. B. v0.9.9.1), niemals Artefakte ersetzen. Halten Sie Build-Schritte in versionierten Repository-Skripten (nicht inline im Workflow-YAML), damit reproduzierbare Downstream-Builder Änderungen automatisch nachverfolgen.

### P17 — Sandboxes verweigern vermeintlich Vorhandenes; eine Konfiguration nie persistieren, bevor sie einmal erfolgreich war

- **#335:** Flatpak hatte keinen Schlüsselbund/DBus → sichere Speicherung schlug fehl; die Korrektur fügte eine Ausweichlösung mit lokalen Geheimnissen hinzu. Eine Abweichung bei ACL/Lockdatei eines Tauri-Plugins beschädigte HTTP im selben Bericht.
- **#343:** Die iOS-Ordnerberechtigung verschwand beim Neustart → Security-Scoped Bookmarks waren erforderlich.
- **#617:** Homebrew-Builds fehlten CloudKit-Entitlements; der Release-Workflow **prüft jetzt Entitlements im signierten Artefakt**.
- **#338:** CloudKit-Schema wurde in Development, aber nicht Production bereitgestellt — für alle App-Store-Benutzer defekt. Zudem wurde das gewählte Backend *vor* der ersten erfolgreichen Synchronisierung in der Konfiguration persistiert, was zu einer Absturzschleife führte. Lösung: Backend bis zum ersten Erfolg vormerken.
- **#727:** Beim Hinzufügen der Entität „Personen“ fehlte ein abfragbarer CloudKit-Index → Synchronisierung nach dem Zurücksetzen von iCloud-Daten defekt.

**Leitplanken:**

- Fähigkeitsmatrix pro Plattform/Kanal: Schlüsselbund, Dateisystempersistenz, Netzwerktransport, Push, CloudKit — jeweils mit Erkennung und Ausweichlösung.
- Die Konfiguration des Synchronisierungs-Backends wird erst nach einem erfolgreichen Roundtrip übernommen.
- Serverseitiges Schema (CloudKit-Datensatztypen, Indizes, Produktionsbereitstellung; Validierung des Cloud-Servers) gehört zur Entitäts- und Release-Checkliste.

### P18 — „Entitätstyp hinzufügen“ ist eine Checkliste, keine Typdefinition

Abgeleitet aus #727 (fehlender CloudKit-Index für Personen), #718-Korrektur 6 (Personen nicht in Desktop-SQLite persistiert → dauerhafte Änderungsschleife), #322 (SQLite-Speicherreihenfolge verletzte Fremdschlüsselreihenfolge und löschte Daten nach einem Neustart von FOSS-Android) und der Lücke beim Setzen der Revision für Cloud-`POST /v1/tasks`.

Neue Entität (oder neues Feld) muss betreffen: Core-Typ + Setzen durch Factory; Normalisierung/Positivliste für Signaturen; SQLite-Schema **und FK-sichere Speicherreihenfolge**; data.json-Export; Synchronisierungszusammenführung + Tombstones; CloudKit-Datensatztyp + Indizes + Produktionsbereitstellung; Validierung/Setzen auf dem Cloud-Server; Stores beider Apps; i18n-Beschriftungen; Tests für Roundtrip und Zusammenführungskonvergenz.

---

## 8. Leistung bei großen Datenmengen

### P19 — Interaktionskosten sind O(sichtbar), nicht O(Store); durch synthetische Budgets für große Stores durchgesetzt

- **#594 (Diskussion) + #643–#649, #195, #224:** Eine normal große Benutzerdatenbank (186 kB JSON!) ließ jeden Tipp bis zu einer Sekunde einfrieren. Gefundene Ursachen: Jede Projektzeile durchsuchte die vollständige Aufgabenliste; das Öffnen des Editors durchsuchte wiederholt alle Aufgaben; vollständige Snapshot-Persistenz bei jeder Änderung; breite Store-Abonnements weckten bei nicht zusammenhängenden Änderungen ganze Ansichten; SAF-Verzeichnis wurde für jeden Anhang neu aufgelistet; Anhangssynchronisierungsphasen wurden ohne ausstehende Arbeit betreten; nicht idempotente Tipp-Handler häuften sich (15 leere Checklistenpunkte durch eingereihte Tipps).

**Leitplanken:**

- Neue Listenansichten werden virtualisiert und mit engen Selektoren ausgeliefert; keine `useTaskStore()`-Abonnements vollständiger Arrays in Ansichten.
- Änderungspersistenz ist inkrementell; vollständige Snapshot-Speichervorgänge sind nur für Lebenszyklus-/Synchronisierungsgrenzen vorgesehen.
- Jede periodische/Synchronisierungsphase hat bei fehlender Arbeit einen frühen Ausstieg.
- Tipp-Handler sind idempotent (eingereihte doppelte Tipps sind harmlos).
- Die Leistungssuite für große Stores (`bun run test:perf`, Budgets in `docs/performance-budgets.md`) erhält bei jedem neuen häufig durchlaufenen Pfad einen Fall.

---

## 9. UI, i18n, Parität

### P20 — Keine hart codierten benutzerseitigen Zeichenfolgen; Schlüssel werden mit der Funktion in allen Gebietsschemas ausgeliefert

Elf separate Issues (#244, #245, #246, #256, #257, #261, #287, #292, #215, #23, #593) betrafen „hart codierte englische Zeichenfolge“ oder „fehlender Schlüssel“ — jeder davon wäre bei der Überprüfung leicht vermeidbar gewesen. Datums-/Wochentagsformatierung erfolgt über gebietsschemabewusste APIs (#375, #287).

### P21 — Desktop-/Mobilgeräte-Parität ist Bestandteil der Funktion, keine Folgearbeit

- **#237** (dieselbe Aufgabe auf Mobilgeräten sichtbar, auf dem Desktop unsichtbar), **#99**, **#149**, **#559**, **#314**: Paritätslücken traten wiederholt als Fehler auf.

**Leitplanke:** Jede Änderung an Aufgabensemantik/-sichtbarkeit landet im Core und wird von beiden Apps im selben Release verwendet, oder die Abweichung wird ausdrücklich als beabsichtigt dokumentiert (wie die bewusste Entscheidung aus #725, dass Mobilgeräte die Lebenszyklus-Synchronisierung beibehalten).

---

## 10. Wiederherstellung, Diagnose und Korrekturablauf

### P22 — Die Wiederherstellung muss den Fehler überwinden, für den sie existiert

- **#236:** „Maximal 5 Snapshots“ stammten alle aus denselben 4 Minuten — für einen echten Vorfall unbrauchbar. Lösung: Aufbewahrung über das Zeitfenster verteilen + Snapshots bei unveränderten Daten überspringen.
- **#609:** Wiederhergestellte Sicherungen wurden von demselben Synchronisierungsfehler erneut gelöscht, der die Daten zerstört hatte, bis die Wiederherstellung lernte, Datensätze neu zu autorisieren.

**Leitplanke:** Testen Sie Wiederherstellungspfade anhand der tatsächlichen Verlustszenarien (kaskadierende Löschung + Tombstone, beschädigter entfernter Speicher, fehlerhafte Zusammenführung), nicht nur auf „Datei vorhanden“.

### P23 — Unsichtbare Entscheidungen diagnostizierbar machen, bevor plausible Ursachen korrigiert werden

- **#698** ließ sich in einem Durchgang lösen, *weil* Diagnosedaten `diffKeys` pro Konflikt offenlegten.
- **#718** verbrauchte drei spekulative Korrekturen, bevor Diagnosedaten die beiden echten Ursachen zeigten (Nachtragen von Personen + `-shm`-Rauschen).
- Die letzte Maßnahme für **#316** bestand darin, Diagnosedaten zur Zusammenführungsauflösung hinzuzufügen (Gewinnerseite, Revisionen, Zeitstempel), statt erneut zu raten.

**Leitplanken:** Zusammenführungs-/Konfliktpfade protokollieren Grund + Stichprobe der Feldschlüssel (geschwärzt); Fehler der Schleifenklasse erhalten *zuerst* Diagnosedaten zur Triggerquelle, dann eine Korrektur. Bei semantischen Fehlern (Wiederholung, Datumslogik) wird die Eingabematrix vor der Korrektur als Tests aufgezählt — die Sagas #187/#717 und #557 waren wiederholte Einzelfallkorrekturen für einen mehrdimensionalen Eingaberaum.

### P24 — Schleife aus Reproduzieren und Bestätigen

Was in dieser Historie nachweislich funktionierte und beibehalten werden sollte: Schweregrad-/Prioritätslabels mit `status:needs-confirmation`; Korrekturen mit vollständigen Commit-Hashes veröffentlichen; Melder um strukturierte Angaben zu Umgebung + Protokollen bitten (Installationskanal ist relevant — #322 trat nur im FOSS-Build auf, #617 nur bei Homebrew); fehlerhafte Artefakte schnell zurückziehen und dies klar benennen (#674/#682).

---

## Kurze Checkliste für neue Funktionen

Beantworten Sie vor der Implementierung:

1. **Schreiber:** Wer schreibt diese Daten sonst noch (Synchronisierung, MCP, CLI, anderes Gerät, ältere App-Version)? Was schützt die Reihenfolge? (P1, P9)
2. **Konvergenz:** Erzeugt eine zweite Synchronisierung nach der ersten null Unterschiede — auch gegenüber einem Gerät mit der vorherigen Version? (P4)
3. **Trigger:** Schreibt mein Code etwas, das ein Watcher/Trigger sehen kann? Ist es als selbst geschrieben markiert? Endet jede Schleife? (P5)
4. **Während der Bearbeitung:** Was geschieht, wenn der Benutzer währenddessen bearbeitet? (P6)
5. **Entitäten/Felder:** Habe ich die Entitätscheckliste abgearbeitet (SQLite + FK-Reihenfolge, Signaturen, CloudKit + Indizes + Produktionsbereitstellung, Cloud-Validierung, Factories)? (P18)
6. **Datumswerte:** Status zuerst? Reines Datum bleibt reines Datum? Core-Prädikat von beiden Apps geteilt? Wiederholungsmatrix abgedeckt? (P10–P13)
7. **Einstellungen:** Synchronisiert, gerätelokal oder sitzungsbezogen? Kann ein Standardwert jemals einen expliziten Wert übertreffen? (P14)
8. **Kanäle:** Betrifft dies Start, native Fähigkeiten oder Abhängigkeiten? Welche Kanäle benötigen einen Smoke-Test? (P15–P17)
9. **Skalierung:** Welche Kosten entstehen bei 5.000 Aufgaben? Gibt es einen frühen Ausstieg bei fehlender Arbeit? (P19)
10. **Fehler:** Ist jede Wiederholung begrenzt, jedes 404 endgültig und jede Wiederherstellung neu autorisiert? (P8, P22)
