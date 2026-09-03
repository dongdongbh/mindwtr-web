# Apple-Kurzbefehle

Mindwtr unterstützt Apple-Kurzbefehle auf iPhone und iPad über native App Intents, mit Schwerpunkt auf dem GTD-Erfassungsablauf: offene Punkte schnell in Mindwtr übernehmen und sie anschließend in der App durchsehen und verarbeiten. Version 2 ergänzt die Erfassung im Hintergrund mit Datumsangaben, das Auslesen von Aufgaben in Kurzbefehle und die Spotlight-Suche.

Der Umfang ist bewusst kleiner als das ausgereifte Kurzbefehlsystem von Things. Mindwtr erweitert den Aktionsumfang behutsam, damit die Funktion zuverlässig bleibt und die normalen Abläufe zur Aufgabenerstellung, Revision und Synchronisierung von Mindwtr nie umgeht.

## Verfügbarkeit

Apple-Kurzbefehle werden in iOS-Builds unterstützt, die die App-Intents-Integration von Mindwtr enthalten.

Unterstützte Oberflächen:

| Oberfläche | Unterstützt |
| --- | --- |
| Kurzbefehle-App | Ja |
| Siri | Ja |
| Spotlight/vorgeschlagene Kurzbefehle | Ja |
| Ausführen eines Kurzbefehls über die Aktionstaste | Ja |
| Direkte Aktionen auf der Apple Watch | Über einen Kurzbefehl und den selbst gehosteten Erfassungs-Webhook; keine nativen Watch-Aktionen |
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

### Zu Mindwtr hinzufügen

Verwenden Sie **Zu Mindwtr hinzufügen** (vor v2 **Zum Mindwtr-Posteingang hinzufügen**), um im Hintergrund eine Aufgabe zu erstellen, ohne Mindwtr zu öffnen. Diese Aktion eignet sich für Kurzbefehle-Automationen. Ein Zeit-, Kalender- oder Standortauslöser kann eine Aufgabe hinzufügen, ohne dass jemand das Telefon berührt.

Parameter:

| Parameter | Erforderlich | Hinweise |
| --- | --- | --- |
| Aufgabe | Ja | Der Aufgabentitel. Bei einem leeren Titel schlägt der Kurzbefehl fehl. |
| Notiz | Nein | Wird als Aufgabenbeschreibung hinzugefügt. |
| Tags | Nein | Kommagetrennte Tags. Mindwtr normalisiert sie zu `#tag`. |
| Projekt | Nein | Wird anhand des Titels einem aktiven Projekt zugeordnet. Unbekannte oder archivierte Projekte werden ignoriert; die Aufgabe landet dennoch im Posteingang. |
| Fälligkeitsdatum | Nein | Das Fälligkeitsdatum der Aufgabe. Wird als Datum ohne Uhrzeit gespeichert und plant daher von sich aus nie eine Erinnerung. |
| Startdatum | Nein | Das Startdatum der Aufgabe, wie das Fälligkeitsdatum nur als Datum. |

Der **Aufgabe**-Text unterstützt die vollständige [Schnelleingabe-Syntax](/de/use/mobile#syntax-fur-„schnell-hinzufugen) (`/due:`, `@context`, `#tag`, `+Project` und mehr). Sie wird beim Erstellen der Aufgabe genauso ausgewertet wie im Erfassungsfeld der App; die Einstellung **Schnell-hinzufügen-Text bereinigen** bestimmt, ob die erkannte Syntax aus dem Titel entfernt wird.

Ablauf beim Ausführen:

1. Die Aktion reiht die Erfassung auf dem Gerät ein und wird sofort beendet. Mindwtr bleibt im Hintergrund.
2. Wenn Mindwtr das nächste Mal geöffnet wird oder in den Vordergrund zurückkehrt, wird die eingereihte Aufgabe über den normalen Store- und Synchronisierungsweg im Posteingang erstellt.

Da die Aufgabe erst beim nächsten Öffnen erstellt wird, erscheint sie auf anderen synchronisierten Geräten erst und löst erst dann eine Erinnerung aus, wenn Mindwtr auf diesem iPhone oder iPad erneut ausgeführt wurde. Der Parameter **Projekt** erstellt niemals neue Projekte; ein `+Project` im Aufgabentext folgt jedoch den Schnelleingabe-Regeln und kann eines anlegen.

### Mindwtr-Aufgaben abrufen

Verwenden Sie **Mindwtr-Aufgaben abrufen**, um Aufgaben in einen Kurzbefehl einzulesen, ohne die App zu öffnen – etwa zur Weiterverwendung in anderen Aktionen (vorlesen lassen, als Menü anzeigen, irgendwohin senden).

| Parameter | Erforderlich | Hinweise |
| --- | --- | --- |
| Liste | Ja | Eine von Posteingang, Fokus, Nächste Aktionen, Warten, Irgendwann. |
| Projekt | Nein | Ein aktives Projekt anhand des Titels. Wenn gesetzt, hat es Vorrang vor der Liste. |

Die Ergebnisse stammen aus einer Momentaufnahme, die Mindwtr während der Ausführung pflegt, und sind auf 50 Aufgaben pro Liste oder Projekt begrenzt. Sie geben also den Stand des letzten App-Starts wieder – genauso aktuell wie die Widgets.

### Aufgaben in Spotlight

Ab iOS 18 erscheinen Mindwtr-Aufgaben in der Spotlight-Suche. Wenn Sie eine davon öffnen, gelangen Sie zur zugehörigen Liste in Mindwtr. Der Index wird beim Ausführen der App aktualisiert, genau wie bei Mindwtr-Aufgaben abrufen.

### Beispiel: kalendermäßig ausgelöste Aufgabe

1. Öffnen Sie in der App **Kurzbefehle** den Bereich **Automation** und erstellen Sie eine neue Automation.
2. Wählen Sie einen Auslöser, beispielsweise einen Kalendereintrag, dessen Titel „Müllabfuhr“ enthält.
3. Fügen Sie die Mindwtr-Aktion **Zu Mindwtr hinzufügen** hinzu und setzen Sie **Aufgabe** auf „Müll rausbringen“.
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

### Von der Apple Watch erfassen

Mindwtr hat keine Watch-App, aber ein Kurzbefehl, der auf der Uhr läuft, kann direkt an Ihren eigenen Server senden. So erfassen Sie etwas, ohne das Telefon hervorzuholen. Dieser Weg benötigt den [selbst gehosteten Erfassungs-Webhook](/de/power-users/capture-webhook).

1. Erstellen Sie in Apples App **Kurzbefehle** auf dem iPhone einen Kurzbefehl mit dem Namen „Capture to Mindwtr“.
2. Fügen Sie **Text diktieren** hinzu.
3. Fügen Sie **Inhalte von URL abfragen** hinzu und setzen Sie die URL auf `https://your-server.example/v1/capture`, mit Ihrer eigenen Serveradresse anstelle des Beispiels.
4. Setzen Sie **Methode** auf **POST**.
5. Fügen Sie einen Header namens `Authorization` mit dem Wert `Bearer <token>` hinzu und verwenden Sie eines der Token Ihres Servers.
6. Setzen Sie **Anfragetext** auf **Text** und übergeben Sie den diktierten Text. Für JSON verwenden Sie stattdessen ein Feld `transcription` mit dem diktierten Text und ein Feld `client` mit dem Wert Apple Watch.
7. Öffnen Sie die Details des Kurzbefehls und aktivieren Sie **Auf Apple Watch anzeigen**.
8. Führen Sie ihn auf der Uhr über die App **Kurzbefehle**, eine Komplikation oder den Smart Stack aus. Derselbe Kurzbefehl läuft auch auf dem iPhone, per Siri oder über die Aktionstaste.
9. Der diktierte Text wird zu einer Aufgabe im Posteingang und erreicht Ihre anderen Geräte bei der nächsten Synchronisierung.

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

## Aktuelle Einschränkungen

Die Kurzbefehl-Unterstützung von Mindwtr enthält noch nicht:

- Aktionen zum Bearbeiten, Abschließen, Duplizieren, Löschen oder zur Stapelverarbeitung
- Planung wiederkehrender Aufgaben oder Erinnerungen aus Kurzbefehle (Fälligkeits- und Startdatum sind reine Datumsangaben)
- Eine native Apple-Watch-App und CarPlay

Schreibende Aktionen über die Erfassung hinaus sind als Nächstes geplant, aufbauend auf den mit v2 eingeführten Aufgaben-Entitäten. Sie müssen sorgfältig entworfen werden, da Bearbeitungen und Schreibvorgänge im Hintergrund die Local-First-Synchronisierung und die GTD-Ablaufregeln von Mindwtr erhalten müssen.

## Verwandte Links

- [Benutzerhandbuch für Mobilgeräte](/de/use/mobile)
- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
- [Daten und Synchronisierung](/de/data-sync/)
- [Things: Using Apple Shortcuts](https://culturedcode.com/things/support/articles/2955145/)
- [Things: Shortcuts Actions](https://culturedcode.com/things/support/articles/9596775/)
- [Apple: App Intents overview](https://developer.apple.com/videos/play/wwdc2024/10210/)
