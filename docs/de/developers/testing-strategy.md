# Teststrategie

Mindwtr verwendet eine mehrschichtige Teststrategie für `core`, Plattform-Apps und Integrationsflächen.

## Ziele

1. Datenintegrität schützen (Synchronisierung, Speicherung, Zusammenführungsregeln)
2. Regressionen in kritischen Benutzerabläufen erkennen
3. Tests in der CI schnell und deterministisch halten

## Testschichten

## Core (`packages/core`)

- Primäre Abdeckung der Logik (Synchronisierung, Wiederholung, Parsing, Speicher-Hilfsfunktionen)
- Schnelle Unit-Tests mit deterministischen Fixtures
- Die meisten Invarianten der Datenintegrität sollten zuerst hier durchgesetzt werden

## Desktop (`apps/desktop`)

- Tests für Komponenten- und Ansichtsverhalten (Vitest + Testing Library)
- Schwerpunkt auf interaktionsreichen Ansichten und Wrappern für die Synchronisierungsorchestrierung

## Mobilgeräte (`apps/mobile`)

- Tests für Hilfsfunktionen und Orchestrierung
- Smoke-Tests für kritische Abläufe bei Synchronisierung und Aufgabenbearbeitung
- Gerätespezifisches UI-Verhalten ist weiterhin teilweise auf manuelle Überprüfung angewiesen

## Cloud (`apps/cloud`)

- Tests für API-Endpunkte
- Validierung von Authentifizierung, Ratenbegrenzung und Pfaden
- Verhalten von CRUD- und Anhangsendpunkten
- Die Abdeckung konzentriert sich auf die grundlegende Anfrageverarbeitung, nicht auf alle denkbaren Szenarien gleichzeitiger Bereitstellungen

## MCP-Server (`apps/mcp-server`)

- Korrektheit der Abfrageschicht (Suchen, Hinzufügen/Aktualisieren/Löschen/Wiederherstellen)
- Eingabevalidierung und Transaktionsverhalten
- Die Abdeckung konzentriert sich auf Werkzeugverhalten und Validierung, nicht auf vollständige End-to-End-Abläufe mit Editor/LLM

## Derzeitige Abdeckungsgrenzen

- `packages/core` verfügt über die stärkste automatisierte Abdeckung und sollte bei Regressionen der Datenintegrität die erste Verteidigungslinie bleiben.
- Der Desktop hat eine gute Komponentenabdeckung in kritischen Ansichten, aber nicht jeder Interaktionspfad wird End-to-End abgedeckt.
- Die Abdeckung für Mobilgeräte ist bewusst geringer als für Desktop/Core; Barrierefreiheit, Gesten und native Integrationspfade müssen weiterhin manuell auf Geräten geprüft werden.
- Cloud- und MCP-Server-Tests decken die zentralen Handler und Validierungspfade ab, simulieren aber noch nicht jeden Grenzfall bei Parallelität oder Bereitstellung in der Produktion.

## Was zuerst getestet werden sollte

Priorisieren Sie Tests beim Hinzufügen oder Ändern von Verhalten in dieser Reihenfolge:

1. Datenkorrektheit und Zusammenführungssemantik
2. Fehlerpfade und Verhalten bei Wiederholungen/Zeitüberschreitungen
3. Benutzerseitiger Interaktionspfad
4. Leistungsempfindliche Logik (Suche/Synchronisierung/Listentransformationen)

## Regressions-Checkliste

Vor dem Zusammenführen:

1. Tests für das geänderte Verhalten hinzufügen oder aktualisieren
2. Tests der betroffenen Pakete lokal ausführen
3. Bei paketübergreifenden Änderungen umfassendere Workspace-Tests ausführen
4. Sicherstellen, dass keine Kopplung von Snapshots/Zuständen zwischen Tests besteht

## Praktische Regeln

1. Deterministische Zeitstempel/Fixtures der tatsächlichen Uhrzeit vorziehen.
2. Netzwerkabhängigkeiten in Unit-Tests vermeiden.
3. Jeden Test auf ein Verhalten beschränken.
4. Integrationstests für Grenzen von Arbeitsabläufen verwenden, nicht für jeden Zweig.
5. Flaky Tests als Fehler behandeln und ihre Ursache zügig beheben.
6. Wenn ein plattformspezifischer Fehler ohne robuste Automatisierung behoben wird, die erforderlichen manuellen Prüfschritte im PR dokumentieren.

## Verwandte Dokumentation

- [Entwicklerleitfaden](/de/developers/developer-guide)
- [Architektur](/de/developers/architecture)
- [Synchronisierungsalgorithmus](/de/data-sync/sync-algorithm)
- [Daten und Synchronisierung](/de/data-sync/)
