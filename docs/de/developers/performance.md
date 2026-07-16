# Leistungsleitfaden

Diese Seite dokumentiert praktische Leistungsmuster für Mindwtr (Desktop, Mobilgeräte und Core).

## Bereiche mit großer Wirkung

- Filtern und Sortieren großer Listen
- Aktualisierungen der Projekt-/Aufgabenreihenfolge
- Synchronisierungszusammenführung und Abgleich von Anhängen
- Wiederholtes Rendern durch breite Store-Abonnements
- SQLite-Abfragemuster (Suche, Datumsfilter, Projekt-/Statusansichten)

## Hinweise zum Rendern der Benutzeroberfläche

1. Bevorzugen Sie enge Store-Selektoren und vermeiden Sie die Auswahl vollständiger Store-Objekte.
2. Gruppieren Sie zusammengehörige Selektoren und memoisieren Sie abgeleitete Sammlungen.
3. Halten Sie Elementkomponenten rein; verschieben Sie aufwendige Transformationen in die Memoisierung auf Listenebene.
4. Verwenden Sie Virtualisierung für große Listen und vermeiden Sie die dynamische Neuberechnung der Höhe in häufig durchlaufenen Pfaden.
5. Vermeiden Sie das Erstellen neuer Inline-Callbacks/-Objekte in großen per Mapping erzeugten Listen.

Die aktuellen Desktop-Listenzeilen stützen sich auf memoisiertes Rendern von `TaskItem`. Halten Sie daher die Props von Aufgabenzeilen stabil, wenn Sie Listen-, Projekt-, Agenda-, Kalender- oder Durchsichtsansichten ändern. Wenn eine Ansicht zusätzliche Metadaten pro Zeile benötigt, leiten Sie diese einmal auf Listenebene ab, statt bei jedem Rendern einer Zeile neue Objekte zu erstellen.

### Vorgehen zur Rendering-Optimierung

Wenn eine Ansicht langsam wirkt, gehen Sie in dieser Reihenfolge vor:

1. Prüfen Sie zuerst die Renderanzahl der Listenelemente (React-DevTools-Profiler).
2. Verschieben Sie statische Konstanten/Stile aus Renderfunktionen heraus.
3. Memoisieren Sie aufwendige Kindkomponenten (`React.memo`) bei Bedarf mit explizitem Props-Vergleich.
4. Teilen Sie große Komponenten nach Verantwortungsbereich auf (Kopfzeile/Formular/Liste/Modale), damit Zustandsaktualisierungen lokal bleiben.
5. Ersetzen Sie breite Abhängigkeitsarrays durch kleinere memoisierte Selektoren/Hilfsfunktionen.

### Virtualisierung von Desktop-Projektlisten

- Verwenden Sie `@tanstack/react-virtual` für große Desktop-Aufgabenlisten, die den Scroll-Container des Hauptarbeitsbereichs gemeinsam nutzen.
- Verwenden Sie auf Aufgaben-IDs basierende Zeilenschlüssel; verwenden Sie niemals Indizes für Aufgabenzeilen, die bearbeitet, ausgewählt, verschoben oder neu angeordnet werden können.
- Messen Sie virtuelle Zeilen, wenn sich die Höhe einer Aufgabenkarte ändern kann, und verwenden Sie eine konservative Zeilenschätzung, damit die Ansicht beim Scrollen nicht springt.
- Bewahren Sie die Semantik von Ziehen/Neuordnen, indem Sie die vorhandene sortierbare Zeilenkomponente virtualisieren, statt eine separate Zeilenoberfläche einzusetzen.
- Vermeiden Sie verschachtelte Scroll-Container innerhalb von Projektabschnitten. Wenn eine virtuelle Liste unter Projektmetadaten oder einer Abschnittsüberschrift liegt, berücksichtigen Sie den Listenversatz mit einem Scroll-Rand.
- Fügen Sie begrenzte Tests der Renderanzahl für Regressionen bei großen Listen hinzu. Ein Test sollte belegen, dass die Anzahl eingebundener Zeilen nahe am sichtbaren Fenster plus Overscan bleibt und nicht der Gesamtzahl der Aufgaben entspricht.

### FlatList-/Virtualisierungsoptimierung (Mobilgeräte)

- Legen Sie `initialNumToRender`, `maxToRenderPerBatch` und `windowSize` bewusst für jede Ansicht fest.
- Stellen Sie `getItemLayout` bereit, wo dies sinnvoll ist (feste oder gemessene Ausweichlösung).
- Aktivieren Sie `removeClippedSubviews` für größere Listen.
- Halten Sie `keyExtractor` stabil und vermeiden Sie Indexschlüssel.
- Vermeiden Sie anonyme Inline-Renderer in tief verschachtelten Elementbäumen.

Verwenden Sie für normale Aufgabenansichten weiterhin `FlatList`. Nutzen Sie für Aufgabenlisten, die in eine vorhandene `ScrollView` eingebettet sind, einen manuellen Ausschnitt des sichtbaren Fensters mit Abstandhalterzeilen, statt eine weitere vertikale virtualisierte Liste zu verschachteln. So behalten Wisch-, Pull-, Tastatur- und Ziehgesten einen einzigen Scroll-Eigentümer.
Kalenderspezifische Regel: Virtualisieren Sie unbegrenzte Ergebnismengen, nicht ein festes Kalendergerüst. Die mobile Zeitplanansicht kann mit jeder sichtbaren Aufgabe/jedem sichtbaren Ereignis wachsen und sollte `FlatList` verwenden. Tages- und Wochenzeitleisten sind durch das sichtbare Stundenraster begrenzt, Monatszellen durch Kalenderwochen. Deshalb ist `ScrollView` dort vertretbar, solange Aufgaben-/Ereigniszeilen außerhalb der Renderschleife vorgefiltert werden.

## Hinweise zur Synchronisierungsleistung

1. Validieren Sie die Form der Nutzdaten vor der Zusammenführung, damit Fehler früh auftreten.
2. Halten Sie die Zusammenführung deterministisch und O(n) bezogen auf die Entitätsanzahl (Zuordnung nach ID, keine verschachtelten Scans).
3. Gleichen Sie zuerst Anhangsmetadaten ab; verschieben Sie Datei-E/A/Netzwerk in eine separate Synchronisierungsphase.
4. Begrenzen Sie Wiederholungen mit Backoff und unterscheiden Sie wiederholbare von endgültigen Fehlern.
5. Cachen Sie Lesezugriffe auf die Backend-Konfiguration während eines Synchronisierungszyklus, um wiederholte Speicherzugriffe zu verringern.

Die Synchronisierungs-Engine pflegt während der Zusammenführung indizierte Konflikt-/Revisionsabfragen. Bewahren Sie beim Hinzufügen neuer synchronisierter Entitätstypen oder Konfliktberichte diese indizierte Struktur, statt für jede Entität erneut vollständige Sammlungen zu durchsuchen.

### Tipps zur Synchronisierungsoptimierung

1. Halten Sie die Parallelität beim Hoch-/Herunterladen von Anhängen in Mobilfunknetzen niedrig.
2. Stimmen Sie Zeitüberschreitungs- und Wiederholungsfenster für Metadaten und Anhänge getrennt ab.
3. Brechen Sie bei einem Wechsel in den Offlinezustand schnell ab; vermeiden Sie lange Wiederholungsketten nach einem Verbindungsverlust.
4. Verwenden Sie Fortschrittsinstrumentierung für lang laufende Anhangsphasen.
5. Erfassen Sie Konfliktanzahl, maximale Uhrabweichung und Zeitstempelkorrekturen pro Synchronisierungslauf.
6. Behandeln Sie Stichproben von Synchronisierungskonflikten als begrenzte Diagnosedaten. Halten Sie Stichprobenanzahl und Grenzen für Diff-Schlüssel klein, damit die Konfliktberichterstattung große Zusammenführungen nicht dominiert.

### Checkliste zur Synchronisierungsdiagnose

Wenn sich die Synchronisierung verlangsamt:

1. Vergleichen Sie lokales Lesen, Zusammenführung, entferntes Schreiben und Anhangsphasen getrennt.
2. Prüfen Sie, ob Antworten wegen Ratenbegrenzung (`429`) kaskadierende Wiederholungen verursachen.
3. Prüfen Sie die Hash-Validierung/Wiederholungen für Anhänge auf wiederholte Fehler.
4. Stellen Sie sicher, dass Größe und Sammlungsanzahlen der entfernten Nutzdaten innerhalb der konfigurierten Grenzen liegen.
5. Erfassen Sie Protokollstichproben mit Zeitstempeln und Anfrage-IDs in den langsamen Zeitfenstern.

## Profiling kritischer Abläufe im Release-Modus

Erstellen Sie Profile echter Release-/Profil-Builds, bevor Sie breit angelegte Leistungsänderungen vornehmen. Entwicklungs-Builds und Test-Runner sind nützlich als Schutzmaßnahmen, können aber die tatsächlich dominierende Schicht verbergen: Datenableitung, React-Rendern/-Commit, Virtualisierung, Persistenz oder Arbeit im nativen/UI-Thread.

### Budgets für kritische Abläufe

Verwenden Sie diese Werte als Budgets für die Triage, nicht als feste Produktgarantien. Erfassen Sie nach Möglichkeit p50 und p95 und halten Sie die Datenstruktur bei jedem Ergebnis fest.

| Ablauf | Android-Release-Budget | Desktop-Release-Budget | Primäres Signal |
| --- | ---: | ---: | --- |
| Schnellerfassung öffnet sich und nimmt den ersten Tastendruck an | <= 500 ms Öffnen, <= 100 ms Eingabelatenz | <= 300 ms Öffnen, <= 100 ms Eingabelatenz | Zeit von Befehl/Tippen bis zur bearbeitbaren Eingabe und zum ersten angenommenen Zeichen |
| Aufgabe erledigen/umschalten | <= 150 ms visuelle Reaktion, <= 500 ms bis Speichern eingereiht | <= 100 ms visuelle Reaktion, <= 300 ms bis Speichern eingereiht | Eingabe bis visuelle Aktualisierung plus Persistenzphase |
| Aufgabenbearbeitung öffnen/speichern/schließen | <= 300 ms Öffnen, <= 300 ms Speichern/Schließen | <= 200 ms Öffnen, <= 200 ms Speichern/Schließen | Commit-Zeit des Modals/Sheets und Leeren der Speicherwarteschlange |
| Projekt mit mehr als 100 Aufgaben öffnen | <= 2.000 ms | <= 1.000 ms | Navigation bis zur interaktiven Aufgabenliste |
| Auswahl öffnen/schließen, während Fokus/Posteingang/Projekte eingebunden ist | <= 200 ms | <= 150 ms | Übergang der Auswahl und Neuberechnung der übergeordneten Ansicht |
| Zwischen Fokus-, Posteingang- und Projektansicht wechseln | <= 500 ms | <= 300 ms | Routen-/Ansichtswechsel bis zum interaktiven Zustand |
| Suche während der Eingabe | <= 150 ms p95 pro Tastendruck | <= 100 ms p95 pro Tastendruck | Tastendruck bis zu aktualisierten sichtbaren Ergebnissen |

### Erfassungsmatrix

Hängen Sie Erfassungen an das Issue oder Folge-Issue an. Jede Erfassung sollte Commit, App-Version, Installationskanal, Gerät, Betriebssystem, Datenstruktur, Ablauf und Artefaktlink nennen.

| Plattform | Erforderlicher Build | Werkzeuge | Erfassungsartefakt | Zu erfassende dominante Schicht |
| --- | --- | --- | --- | --- |
| Android | Release- oder Profil-APK/-AAB mit repräsentativen lokalen Daten | Android-Studio-Profiler, Hermes-Sampling oder Flipper, sofern verfügbar | CPU-Trace oder Hermes-Profil plus Bildschirmaufnahme/Zeitstempel | JavaScript-Ableitung, React-Rendern/-Commit, Listenvirtualisierung, SQLite/Persistenz, nativer/UI-Thread |
| Desktop | Tauri-Release-Build mit repräsentativen lokalen Daten | WebView-DevTools-Leistungsprofiler und App-Diagnoseprotokoll | Leistungs-Trace plus Diagnosezeitstempel | Datenableitung, React-Rendern/-Commit, Webvirtualisierung, SQLite/Persistenz, WebView/native Shell |

### Vorlage für Erfassungshinweise

```markdown
Commit:
Version/channel:
Platform/device/OS:
Dataset:
- tasks:
- projects:
- largest project task count:
- contexts/tags:
Journey:
Tool/artifact:
Observed p50/p95:
Dominant layer:
Notes:
Follow-up issue:
```

### Klassifizierung der Schichten

- Datenableitung: Das Profil zeigt wiederholte Scans des gesamten Stores, Sortierung/Filterung, Zählwertaggregation oder Selektoränderungen, bevor das Rendern beginnt. Bevorzugen Sie abfragebezogene Selektoren und abgeleitete Indizes. In #647 verfolgen.
- React-Rendern/-Commit: Das Profil zeigt lange Commit-Zeiten, wiederholtes Rendern von Zeilen, instabile Props oder breite Abonnements. Memoisieren Sie Zeilen und verengen Sie Abonnements, bevor Sie Datenmodelle ändern.
- Virtualisierung: Das Profil zeigt Tausende eingebundener Zeilenkomponenten für eine sichtbare Liste. Verwenden Sie Plattform-Virtualisierer und begrenzte Tests der Renderanzahl. In #648 verfolgen.
- Persistenz: UI-Blockierungen fallen mit dem Leeren der Speicherwarteschlange, SQLite-Arbeit, Import/Export, Synchronisierungsschreibvorgängen oder JSON-Serialisierung zusammen. Trennen Sie dringende visuelle Aktualisierungen von Speicherarbeit.
- Nativer/UI-Thread: Android-Trace oder Desktop-WebView-Trace zeigt Animations-/Layout-/Eingabeblockierungen außerhalb von JavaScript. Verringern Sie Layoutänderungen, verschachteltes Scrollen oder Datenverkehr über die native Bridge.

Erstellen Sie für die in #643 gemeldete Verzögerung beim Öffnen von Projekten zuerst Android- und Desktop-Erfassungen. Wenn die Ableitung dominiert, verwenden Sie #647. Wenn die Anzahl eingebundener Zeilen dominiert, verwenden Sie #648. Wenn Persistenz oder Blockierungen im nativen/UI-Thread dominieren, öffnen Sie ein kleineres Folge-Issue mit Erfassungsartefakt und genauem Ablauf.

## Hinweise zur Datenbank

1. Verwenden Sie FTS-Indizes für die Freitextsuche, sofern verfügbar.
2. Halten Sie häufig verwendete Status-/Projekt-/Datumsfilter indiziert.
3. Fassen Sie Schreibvorgänge für große Import-/Synchronisierungsspeicherpfade in Transaktionen zusammen.
4. Normalisieren Sie JSON-Spalten an Lesegrenzen und vermeiden Sie wiederholte Parse-/Stringify-Schleifen.

## Profiling-Checkliste

1. Reproduzieren Sie das Verhalten mit einem realistischen Datensatz (Tausende Aufgaben, große Projekte).
2. Messen Sie vorher/nachher (Renderanzahl, Abfragezeiten, Synchronisierungsdauer).
3. Prüfen Sie das Speicherwachstum während langer Sitzungen.
4. Stellen Sie sicher, dass keine Regressionen auf leistungsschwachen Geräten/Simulatoren auftreten.

## Vorschläge für Leistungsbudgets

- Listeninteraktionen sollten reaktionsschnell bleiben (<16-ms-Framebudget, soweit möglich).
- Suchanfragen sollten bei typischen lokalen Datensätzen weniger als 100 ms benötigen.
- Die Synchronisierungszusammenführung sollte linear mit der Entitätsanzahl skalieren.
- Vermeiden Sie das Blockieren von UI-Threads durch Datei-/Netzwerkvorgänge.

## Kontinuierliche Leistungspflege

1. Fügen Sie bei der Behebung von Regressionen gezielte Tests hinzu (wiederholtes Rendern, Zusammenführungskomplexität, Wiederholungsverhalten).
2. Behalten Sie Budgetprüfungen für kritische Ansichten und Synchronisierungspfade in der CI bei.
3. Ziehen Sie kleine messbare Verbesserungen breit angelegten spekulativen Refactorings vor.
4. Erstellen Sie nach jeder Optimierung erneut ein Profil, um die tatsächliche Wirkung zu prüfen.

## Verwandte Dokumentation

- [Architektur](/de/developers/architecture)
- [Core-API](/de/developers/core-api)
- [Daten und Synchronisierung](/de/data-sync/)
- [Diagnose und Protokolle](/de/data-sync/diagnostics-logs)
