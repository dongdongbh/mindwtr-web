# Apple-Kurzbefehle

Mindwtr unterstützt Apple-Kurzbefehle auf iPhone und iPad über native App Intents. Die erste Version konzentriert sich auf den GTD-Erfassungsablauf: offene Punkte schnell in Mindwtr übernehmen und sie anschließend in der App durchsehen und verarbeiten.

Der Umfang ist bewusst kleiner als das ausgereifte Kurzbefehlsystem von Things. Things bietet Aktionen zum Erstellen, Suchen, Bearbeiten und Anzeigen sowie benutzerdefinierte Aktionen für Einträge und Listen. Mindwtr v1 beginnt mit Erfassung und Navigation, damit die Funktion zuverlässig bleibt und die normalen Abläufe zur Aufgabenerstellung, Revision und Synchronisierung von Mindwtr nicht umgeht.

## Verfügbarkeit

Apple-Kurzbefehle werden in iOS-Builds unterstützt, die die App-Intents-Integration von Mindwtr enthalten.

Unterstützte Oberflächen:

| Oberfläche | Unterstützt |
| --- | --- |
| Kurzbefehle-App | Ja |
| Siri | Ja |
| Spotlight/vorgeschlagene Kurzbefehle | Ja |
| Ausführen eines Kurzbefehls über die Aktionstaste | Ja |
| Direkte Aktionen auf der Apple Watch | Nein, nicht in v1 |
| CarPlay | Nein, nicht in v1 |

## Aktionen

### In Mindwtr erfassen

Verwenden Sie **In Mindwtr erfassen**, um eine Aufgabe an den Bestätigungsablauf zur Erfassung im Mindwtr-Posteingang zu senden.

Parameter:

| Parameter | Erforderlich | Hinweise |
| --- | --- | --- |
| Aufgabe | Ja | Der Aufgabentitel. Leere Titel werden abgelehnt. |
| Notiz | Nein | Wird als Aufgabenbeschreibung hinzugefügt. |
| Tags | Nein | Kommagetrennte Tags. Mindwtr normalisiert sie beim Speichern zu `#tag`. |
| Projekt | Nein | Wird anhand des Titels einem aktiven Projekt zugeordnet oder erstellt das Projekt beim Speichern der Erfassung. |

Ablauf beim Ausführen:

1. Kurzbefehle öffnet Mindwtr.
2. Mindwtr zeigt die Erfassungsansicht mit ausgefülltem Titel und optionalen Metadaten an.
3. Sie prüfen die Erfassung und speichern sie über den normalen Mindwtr-Ablauf.

Die Aufgabe wird nicht direkt aus Swift geschrieben. Dadurch bleibt die Aufgabenerstellung innerhalb der vorhandenen Store-, SQLite-, Revisions- und Synchronisierungslogik von Mindwtr.

### Mindwtr-Liste öffnen

Verwenden Sie **Mindwtr-Liste öffnen**, um zu einer GTD-Ansicht zu wechseln.

Unterstützte Ziele:

| Liste | Öffnet |
| --- | --- |
| Posteingang | Posteingang |
| Fokus | Fokus/Nächste Aktionen |
| Warten | Warten |
| Irgendwann | Irgendwann/Vielleicht |
| Projekte | Projekte |
| Durchsicht | Durchsicht |
| Kalender | Kalender |

Wenn keine Liste konfiguriert ist, verwendet der Kurzbefehl standardmäßig den Posteingang.

### Zum Mindwtr-Posteingang hinzufügen

Verwenden Sie **Zum Mindwtr-Posteingang hinzufügen**, um im Hintergrund eine Aufgabe zu erstellen, ohne Mindwtr zu öffnen. Diese Aktion eignet sich für Kurzbefehle-Automationen. Ein Zeit-, Kalender- oder Standortauslöser kann eine Aufgabe hinzufügen, ohne dass jemand das Telefon berührt.

Parameter:

| Parameter | Erforderlich | Hinweise |
| --- | --- | --- |
| Aufgabe | Ja | Der Aufgabentitel. Bei einem leeren Titel schlägt der Kurzbefehl fehl. |
| Notiz | Nein | Wird als Aufgabenbeschreibung hinzugefügt. |
| Tags | Nein | Kommagetrennte Tags. Mindwtr normalisiert sie zu `#tag`. |
| Projekt | Nein | Wird anhand des Titels einem aktiven Projekt zugeordnet. Unbekannte oder archivierte Projekte werden ignoriert; die Aufgabe landet dennoch im Posteingang. |

Ablauf beim Ausführen:

1. Die Aktion reiht die Erfassung auf dem Gerät ein und wird sofort beendet. Mindwtr bleibt im Hintergrund.
2. Wenn Mindwtr das nächste Mal geöffnet wird oder in den Vordergrund zurückkehrt, wird die eingereihte Aufgabe über den normalen Store- und Synchronisierungsweg im Posteingang erstellt.

Da die Aufgabe erst beim nächsten Öffnen erstellt wird, erscheint sie auf anderen synchronisierten Geräten erst und löst erst dann eine Erinnerung aus, wenn Mindwtr auf diesem iPhone oder iPad erneut ausgeführt wurde. Anders als **In Mindwtr erfassen** erstellt diese Aktion niemals neue Projekte.

### Beispiel: kalendermäßig ausgelöste Aufgabe

1. Öffnen Sie in der App **Kurzbefehle** den Bereich **Automation** und erstellen Sie eine neue Automation.
2. Wählen Sie einen Auslöser, beispielsweise einen Kalendereintrag, dessen Titel „Müllabfuhr“ enthält.
3. Fügen Sie die Mindwtr-Aktion **Zum Mindwtr-Posteingang hinzufügen** hinzu und setzen Sie **Aufgabe** auf „Müll rausbringen“.
4. Stellen Sie die Automation auf **Sofort ausführen**, damit keine Bestätigung erforderlich ist.

## Beispielkurzbefehle

### Per Sprache erfassen

1. Öffnen Sie Apples App **Kurzbefehle**.
2. Erstellen Sie einen neuen Kurzbefehl.
3. Fügen Sie **Text diktieren** oder **Nach Eingabe fragen** hinzu.
4. Fügen Sie die Mindwtr-Aktion **In Mindwtr erfassen** hinzu.
5. Übergeben Sie den diktierten Text an **Aufgabe**.
6. Setzen Sie **Tags** optional beispielsweise auf `phone,errands`.

Dies eignet sich für die schnelle Erfassung beim Gehen, Pendeln oder Wechseln zwischen Apps. Die Spracherkennung von Siri kann in manchen Umgebungen weiterhin Wörter verfehlen. Prüfen Sie die Erfassung daher vor dem Speichern.

### Fokus über die Aktionstaste öffnen

1. Erstellen Sie einen Kurzbefehl mit **Mindwtr-Liste öffnen**.
2. Setzen Sie **Liste** auf **Fokus**.
3. Weisen Sie diesen Kurzbefehl in den iOS-Einstellungen der Aktionstaste zu.

## URL-Schema als Ausweichlösung

Mindwtr unterstützt außerdem Automatisierung über ein URL-Schema. Verwenden Sie dieses, wenn ein anderes Automatisierungswerkzeug native App Intents nicht erkennt.

| URL | Aktion |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Erfassung mit einem Titel öffnen |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Erfassung mit Titel und Notiz öffnen |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Erfassung mit Projekt und Tags öffnen |
| `mindwtr://open-feature?feature=focus` | Fokus öffnen |
| `mindwtr://open-feature?feature=review` | Durchsicht öffnen |

Unterstützte Erfassungsaliase:

| Feld | Aliase |
| --- | --- |
| Titel | `title`, `text`, `name`, `thingName`, `itemListElementName`, `itemListName` |
| Notiz | `note`, `description`, `body`, `thingDescription`, `itemListDescription` |

## Einschränkungen von v1

Mindwtr v1 enthält nicht:

- benutzerdefinierte AppEntity-Aufgaben- oder -Listentypen
- Aktionen zum Suchen, Bearbeiten, Duplizieren, Löschen oder zur Stapelverarbeitung
- direkte Planung wiederkehrender Aufgaben, Erinnerungen oder Daten aus Kurzbefehle
- Unterstützung für Apple Watch oder CarPlay

Dies sind sinnvolle Kandidaten für die Zukunft. Sie müssen jedoch sorgfältig entworfen werden, da Bearbeitungen und Schreibvorgänge im Hintergrund die Local-First-Synchronisierung und die GTD-Ablaufregeln von Mindwtr erhalten müssen.

## Verwandte Links

- [Benutzerhandbuch für Mobilgeräte](/de/use/mobile)
- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
- [Daten und Synchronisierung](/de/data-sync/)
- [Things: Using Apple Shortcuts](https://culturedcode.com/things/support/articles/2955145/)
- [Things: Shortcuts Actions](https://culturedcode.com/things/support/articles/9596775/)
- [Apple: App Intents overview](https://developer.apple.com/videos/play/wwdc2024/10210/)
