# Integrationen für Power-User

Mindwtr verbindet sich mit den Werkzeugen in Ihrer Umgebung, ohne das Local-First-Modell aufzugeben. Diese Seite gruppiert die Integrationen nach dem Ziel, das Sie erreichen möchten. Vier Fragen zeigen für jede Integration, wie viel Vertrauen sie erfordert:

- **Was sie lesen kann** in Ihren Daten
- **Was sie ändern kann**
- **Wo sie ausgeführt wird**
- **Was Ihr Gerät verlässt**

Jede Integration ist optional und bleibt deaktiviert, bis Sie sie einrichten. Die vollständigen Anleitungen finden Sie auf den jeweils verlinkten Seiten.

## Von überall erfassen

### Apple-Kurzbefehle

Senden Sie Aufgaben über Siri, die Kurzbefehle-App, die Aktionstaste oder eine Automation an Ihren Posteingang und wechseln Sie direkt zu einer GTD-Liste.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Nichts. Sie erfasst nur Aufgaben und öffnet Listen. |
| Was sie ändern kann | Fügt Erfassungen zum Posteingang hinzu. Sie kann Aufgaben weder bearbeiten noch erledigen oder löschen. |
| Wo sie ausgeführt wird | Auf Ihrem iPhone oder iPad. |
| Was Ihr Gerät verlässt | Nichts. Erfassungen durchlaufen den normalen Store und die Synchronisierung von Mindwtr; Swift schreibt Aufgaben nie direkt. |

[Anleitung zu Apple-Kurzbefehlen](/de/power-users/apple-shortcuts)

### E-Mail-Erfassung

Verknüpfen Sie die Desktop-App mit einem E-Mail-Ordner. Jede dort eingehende Nachricht wird zu einer Aufgabe im Posteingang. Auf dem Telefon können Sie stattdessen eine E-Mail mit Mindwtr teilen.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Den einen E-Mail-Ordner, den Sie angeben. Der Rest Ihres Postfachs bleibt unberührt. |
| Was sie ändern kann | Erstellt Aufgaben im Posteingang. Ihre E-Mails werden nie verändert, verschoben oder gelöscht. |
| Wo sie ausgeführt wird | Auf Ihrem Desktop und per direkter IMAP-Verbindung mit Ihrem E-Mail-Anbieter. Es gibt kein Drittanbieter-Relay. |
| Was Ihr Gerät verlässt | Nichts gelangt an Dritte. Self-Hosted-Rezepte senden nur die von Ihnen zugeordneten Felder an Ihren eigenen Server. |

[Anleitung zur E-Mail-Erfassung](/de/power-users/email-capture)

### Jira und andere Work-Tracker

Lassen Sie Jiras eigene Automatisierung jeden neuen Vorgang in Ihren Posteingang schicken, per E-Mail oder direkt an Ihren selbst gehosteten Server. In der App steckt kein Jira-Client, und die Erfassung ist einseitig.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Nichts. Jira schickt Vorgänge hinaus; Mindwtr verbindet sich nie mit Jira. |
| Was sie ändern kann | Erstellt Aufgaben im Posteingang. Das Erledigen einer Aufgabe berührt den Jira-Vorgang nie. |
| Wo sie ausgeführt wird | In Jiras eigener Automatisierung, die die E-Mail-Erfassung oder Ihren eigenen Server füttert. |
| Was Ihr Gerät verlässt | Nichts. Ihre Jira-Zugangsdaten bleiben in Jira; Mindwtr speichert kein Tracker-Token. |

[Anleitung zur Jira-Erfassung](/de/power-users/jira-capture)

## Persönliche Werkzeuge verbinden

### Obsidian

Lesen Sie Aufgaben aus einem Obsidian-Vault, halten Sie sie bei Dateiänderungen aktuell und öffnen Sie die Quellnotiz wieder in Obsidian.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Auf dem Desktop die Vault-Dateien in den von Ihnen zugelassenen Ordnern. |
| Was sie ändern kann | Schaltet bei unterstützten Formaten ein Kontrollkästchen oder einen TaskNotes-Status um. Ihre Notizen werden nicht neu geschrieben. |
| Wo sie ausgeführt wird | Nur auf dem Desktop. Sie ist kein Synchronisierungsbackend für Mindwtr. |
| Was Ihr Gerät verlässt | Nichts. Ihre Notizen bleiben in Ihrem Vault. |

[Obsidian-Anleitung](/de/power-users/obsidian)

## Auf Ihrem Computer automatisieren und skripten

### Lokale API

Eine REST-API für Skripte, Kurzbefehle und kleine Werkzeuge, die Ihre Aufgaben lesen und schreiben müssen.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Alle Aufgabendaten sowie schreibgeschützten Zugriff auf Projekte und Bereiche. |
| Was sie ändern kann | Aufgaben erstellen, aktualisieren, erledigen, archivieren, vorläufig löschen und wiederherstellen. Projekte und Bereiche bleiben schreibgeschützt. |
| Wo sie ausgeführt wird | Innerhalb der Desktop-App, gebunden an `127.0.0.1` und bei jeder Anfrage durch ein Bearer-Token geschützt. |
| Was Ihr Gerät verlässt | Nichts. Anfragen bleiben auf localhost. |

[Anleitung zur lokalen API](/de/power-users/local-api)

## Einen KI-Agenten verbinden

### MCP-Server

Erlauben Sie einem KI-Client wie Claude, Codex oder Gemini über das Model Context Protocol den Zugriff auf Ihre Mindwtr-Daten.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Aufgaben, Projekte, Abschnitte, Bereiche und Personen. |
| Was sie ändern kann | Standardmäßig schreibgeschützt. Mit `--write` kann sie hinzufügen, aktualisieren, erledigen und löschen. |
| Wo sie ausgeführt wird | Als lokaler Unterprozess über Ihre SQLite-Datei oder gegen einen von Ihnen selbst gehosteten Cloud-Server. |
| Was Ihr Gerät verlässt | Nur die Daten, die der verbundene KI-Client erhält. Im Cloud-Modus gelangen Änderungen über die validierte API zu Ihrem eigenen Server. |

[Anleitung zum MCP-Server](/de/power-users/mcp)

## KI innerhalb der App

### KI-Assistent

Optionale Unterstützung mit eigenem API-Schlüssel zum Klären und Aufteilen von Aufgaben sowie zur Durchsicht veralteter Einträge.

| Frage | Antwort |
| --- | --- |
| Was sie lesen kann | Nur die Aufgabendaten, die für die ausgeführte Aktion erforderlich sind. |
| Was sie ändern kann | Nur, was Sie prüfen und bestätigen. |
| Wo sie ausgeführt wird | Über den von Ihnen konfigurierten Anbieter. Dies kann ein lokaler Endpunkt wie llama.cpp oder Ollama sein. |
| Was Ihr Gerät verlässt | Nur die begrenzten Daten, die an den ausgewählten Anbieter gesendet werden. Läuft dieser Anbieter lokal, verlässt nichts Ihr Gerät. |

[Anleitung zum KI-Assistenten](/de/power-users/ai-assistant)

## Selbst betreiben

Bevorzugen Sie eine im Browser zugängliche oder selbst gehostete Einrichtung? Diese Seiten behandeln die Bereitstellung statt einer einzelnen Integration:

- [Web-App (PWA)](/de/power-users/web-app-pwa)
- [Docker-Bereitstellung](/de/power-users/docker-deployment)
- [Self-Hosted-Cloud](/de/data-sync/self-hosted-cloud)
