# Obsidian-Integration

Mindwtr kann auf dem Desktop Aufgaben aus einem Obsidian-Vault importieren, sie bei Dateiänderungen aktualisieren, die Quellnotiz wieder in Obsidian öffnen und für unterstützte Aufgabenformate gezielte Änderungen zurückschreiben.

Verwandtes Thema: [Markdown-Links](/de/use/markdown-links)

## Derzeitiger Umfang

Die Obsidian-Unterstützung auf dem Desktop umfasst derzeit:

- nur Desktop
- automatische Dateiüberwachung mit inkrementeller Aktualisierung
- manuelles erneutes Einlesen als Ausweichlösung
- Deep Links zurück zur Quellnotiz mit `obsidian://`
- begrenztes Zurückschreiben für unterstützte Aufgabenformate
- Unterstützung für standardmäßige eingebettete Markdown-Aufgaben
- Unterstützung für interne Markdown-Aufgaben-/Projektverweise von Mindwtr
- Unterstützung für TaskNotes-Dateien

Nicht enthalten:

- Zugriff auf Vaults von Mobilgeräten
- Nutzung von Obsidian als Synchronisierungsbackend für Mindwtr
- umfassendes Umschreiben oder Umstrukturieren von Notizen
- Dataview als zentrales Aufgabenformat
- ein vollständiges Obsidian-Plugin

## Grundgedanke

Die Obsidian-Integration ist eine dateibasierte externe Integration und kein neues Synchronisierungsbackend für Mindwtr.

Die Synchronisierungs-Engine von Mindwtr basiert auf `data.json`, während Obsidian notizbasiert arbeitet. Um destruktive Konflikte und unerwartete Bearbeitungen zu vermeiden, liest Mindwtr Vault-Dateien direkt und hält den Schreibzugriff bewusst eng begrenzt.

## Einrichtung

Auf dem Desktop:

1. Öffnen Sie **Einstellungen → Integrationen**.
2. Suchen Sie **Obsidian-Vault**.
3. Wählen Sie Ihren Vault-Ordner. In Obsidian registrierte Vaults werden automatisch erkannt und zur Auswahl mit einem Klick angeboten; für alles Weitere können Sie weiterhin manuell navigieren.
4. Aktivieren Sie die Integration.
5. Begrenzen Sie das Einlesen optional auf bestimmte Ordner.
6. Legen Sie optional die Posteingangsdatei für eingebettete Aufgaben fest; Standard ist `Mindwtr/Inbox.md`.
7. Wählen Sie optional, ob archivierte TaskNotes-Dateien einbezogen werden sollen.
8. Wählen Sie optional das Format für neue Aufgaben: `auto`, `inline` oder `tasknotes`.
9. Speichern Sie und führen Sie einmal **Vault erneut einlesen** aus.

Nach dem ersten Einlesen überwacht Mindwtr den Vault und aktualisiert geänderte Dateien automatisch. Die Schaltfläche zum manuellen erneuten Einlesen bleibt als Wiederherstellungsweg verfügbar, falls die Überwachung ein Ereignis verpasst oder ein synchronisierter Ordner nur langsam aktualisiert wird.

Enthält der ausgewählte Ordner kein Verzeichnis `.obsidian/`, zeigt Mindwtr eine Warnung an, erlaubt aber weiterhin das Speichern des Pfads.

## Unterstützte Aufgabenformate

### Eingebettete Markdown-Aufgaben

Wenn der eingelesene Bereich keine TaskNotes-Dateien enthält, importiert Mindwtr standardmäßige Markdown-Kontrollkästchen:

```md
- [ ] Incomplete task
- [x] Completed task
```

Mindwtr erhält:

- die Einrückung verschachtelter Aufgaben
- eingebettete Tags wie `#work` oder `#project/alpha`
- Wiki-Links wie `[[Meeting Notes]]`
- YAML-Frontmatter-Tags auf Notizebene

Importierte eingebettete Aufgaben zeigen:

- Aufgabentext
- Erledigungsstatus
- Pfad und Zeilennummer der Quellnotiz
- die Aktion **In Obsidian öffnen**

### TaskNotes

Mindwtr unterstützt außerdem [TaskNotes](https://tasknotes.dev/), das jeweils eine Aufgabe pro Markdown-Datei mit YAML-Frontmatter speichert.

Beispiel:

```md
---
tags:
  - task
title: Review quarterly report
status: in-progress
priority: high
due: 2025-01-15
scheduled: 2025-01-14
contexts:
  - "@office"
projects:
  - "[[Q1 Planning]]"
timeEstimate: 120
---
## Notes
Key points to review
```

Wenn im eingelesenen Bereich TaskNotes-Dateien erkannt werden, behandelt Mindwtr TaskNotes als maßgebliche Quelle für importierte Obsidian-Aufgaben und importiert **nicht** zusätzlich beliebige eingebettete Checklisten aus anderen Notizen. So werden für TaskNotes-Benutzer gewöhnliche Checklisten nicht unbeabsichtigt in Aufgaben umgewandelt.

Mindwtr importiert derzeit unter anderem folgende TaskNotes-Felder:

- Titel
- Status/Erledigungsstatus
- Priorität
- Fälligkeits- und geplante Daten
- Tags
- Kontexte
- Projekte
- Zeitschätzung
- kurze Vorschau des Textkörpers

Mindwtr überspringt Ansichts-/Konfigurationsdateien von TaskNotes. Archivierte TaskNotes-Dateien sind standardmäßig ausgeblendet, sofern Sie sie nicht in den Einstellungen aktivieren.

## Dateiüberwachung und Aktualisierung

Mindwtr überwacht den konfigurierten Vault auf dem Desktop und parst nur geänderte Markdown-Dateien neu, statt jedes Mal den gesamten Vault erneut einzulesen.

Das bedeutet:

- Änderungen in Obsidian erscheinen automatisch in Mindwtr.
- Gelöschte Quelldateien entfernen ihre importierten Aufgaben.
- Umbenannte Dateien werden wie Löschen und anschließendes Erstellen behandelt.
- Schnell aufeinanderfolgende Speichervorgänge werden vor der Aktualisierung gebündelt.

Wenn eine Änderung die Grenze zwischen eingebetteten Aufgaben und TaskNotes überschreitet, greift Mindwtr auf ein vollständiges erneutes Einlesen zurück, damit der Importmodus konsistent bleibt.

## Verhalten beim Zurückschreiben

Das Zurückschreiben ist bewusst eingeschränkt.

### Eingebettete Aufgaben

Wenn Sie eine importierte eingebettete Obsidian-Aufgabe in Mindwtr umschalten, aktualisiert Mindwtr nur die Kontrollkästchenmarkierung in dieser Aufgabenzeile:

- `- [ ]` → `- [x]`
- `- [x]` → `- [ ]`

Mindwtr schreibt den Rest der Notiz nicht neu. Ist die gespeicherte Zeilennummer veraltet, versucht Mindwtr stattdessen, den Aufgabentext in der Datei abzugleichen. Bei mehrdeutigen Treffern schlägt der Vorgang sicher fehl.

### TaskNotes-Aufgaben

Wenn Sie eine importierte TaskNotes-Aufgabe in Mindwtr umschalten, aktualisiert Mindwtr den Status im Frontmatter, statt den Notiztext zu bearbeiten. Im Rahmen desselben sicheren Schreibvorgangs kann außerdem `completedDate` hinzugefügt oder entfernt werden.

Mindwtr formatiert weder die gesamte Datei neu noch schreibt es unbeteiligte Felder um.

### Neue Aufgaben erstellen

Neue Obsidian-Aufgaben können auf zwei Arten erstellt werden:

- `inline`: eine neue Zeile `- [ ] ...` an die konfigurierte Posteingangsnotiz anhängen
- `tasknotes`: eine neue TaskNotes-Markdown-Datei erstellen
- `auto`: dem erkannten Importmodus des Vaults folgen

Dadurch entspricht die Erstellung dem bereits verwendeten Format.

## Übersprungene Inhalte

Mindwtr überspringt:

- `.obsidian/`
- `.trash/`
- verborgene Dateien/Ordner
- `node_modules/`
- ungewöhnlich große Markdown-Dateien
- Ansichts-/Konfigurationsdateien von TaskNotes

## Deep Linking

Mindwtr öffnet Quellnotizen mit dem URI-Schema von Obsidian:

```text
obsidian://open?vault=VAULT_NAME&file=RELATIVE_PATH_WITHOUT_MD
```

So können Sie den Kontext in Obsidian prüfen, ohne Dateipfade manuell zu kopieren.

## Derzeitige Einschränkungen

- nur Desktop
- Dataview-artige eingebettete Felder wie `[due:: ...]` werden noch nicht geparst
- bei der überwachungsbasierten Aktualisierung bleibt das manuelle erneute Einlesen als Ausweichlösung verfügbar
- wenn TaskNotes-Dateien vorhanden sind, unterdrückt Mindwtr im eingelesenen Bereich bewusst den Import allgemeiner eingebetteter Checklisten

## Geplante Weiterentwicklungen

- optionale Dataview-Kompatibilität
- Machbarkeitsprüfung für Mobilgeräte
- mögliches Obsidian-Plugin in einem separaten Repository

## Siehe auch

- [Daten und Synchronisierung](/de/data-sync/)
- [Kalenderintegration](/de/use/calendar-integration)
