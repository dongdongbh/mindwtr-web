# Kalenderintegration (harte und weiche Landschaft)

Mindwtr unterstützt die Kalenderintegration in zwei Richtungen: externe Kalender in die Planung einlesen und Mindwtr-Aufgaben in einen beschreibbaren Gerätekalender übertragen, sofern die Plattform einen solchen bereitstellt.

- **Mobilgeräte (iOS/Android):** bereits vom System bereitgestellte Gerätekalender, ICS-Abonnement-URLs und einseitige Übertragung von Mindwtr in den Gerätekalender
- **Desktop (macOS):** Apple Kalender über EventKit zum Lesen und zur einseitigen Aufgabenübertragung sowie ICS-Abonnement-URLs
- **Desktop (Linux):** von Evolution Data Server bereitgestellte Kalender zum Lesen und zur einseitigen Aufgabenübertragung sowie ICS-Abonnement-URLs
- **Desktop (Windows) und Web:** ICS-Abonnement-URLs

## Konzepte

- **Harte Landschaft**: Besprechungen und Unterricht aus externen Kalendern.
- **Weiche Landschaft**: mit `startTime` und `timeEstimate` geplante Mindwtr-Aufgaben.
- Der Kalender ist eine **Planungsoberfläche**, auf der vorhandene Aufgaben angeordnet und geplante Aufgaben erstellt werden können, wenn dies im Kalenderkontext am schnellsten geht.

## GTD-Semantik

- **`dueDate`** = Frist (feste Verpflichtungen).
- **`startTime`** = Wiedervorlage/geplanter Beginn (weiche Verpflichtungen).
- **`timeEstimate`** = Vorgeschlagene Dauer bei der Planung.

## Ansichten

- **Tagesansicht**: Zeitraster mit geplanten Aufgaben, Fristen und externen Terminen.
- **Wochenansicht**: Siebentägiges Planungsraster zur Übersicht über die aktuelle Arbeitswoche.
- **Monatsansicht**: Überblick mit Markierungen für Fristen, geplante Aufgaben und Termine.
- **Terminplanansicht**: Fortlaufende 60-Tage-Liste für anstehende Fristen, geplante Aufgaben und externe Termine.

Auf dem Desktop wird der aktuelle Kalenderzustand in der URL abgebildet:

- `calendarView`: `day`, `week`, `month` oder `schedule`
- `calendarDate`: das ausgewählte Datum, wenn ein Tag ausgewählt ist
- `calendarMonth`: der sichtbare Kalendermonat

Dadurch können Sie ein bestimmtes Planungsfenster als Lesezeichen speichern oder teilen, etwa die Wochenansicht für den aktuellen Sprint oder die Terminplanansicht für die nächsten zwei Monate.

## Wiederkehrende Mindwtr-Aufgaben

Wiederkehrende Mindwtr-Aufgaben werden als Aufgabeninstanzen erzeugt, nicht als ausgeweitete Kalenderserie:

- Der Kalender zeigt die aktive Aufgabeninstanz, wenn sie ein Fälligkeitsdatum oder einen geplanten Startzeitpunkt besitzt.
- Standardmäßig trägt Mindwtr zukünftige Aufgabenvorkommen nicht vorab in den Kalender ein. Die nächste tatsächliche Aufgabeninstanz wird erst erstellt, wenn die aktuelle wiederkehrende Aufgabe abgeschlossen ist.
- Ist für eine wiederkehrende Aufgabe **Nächstes Vorkommen im Kalender anzeigen** aktiviert, kann der Kalender eine reine Planungsvorschau des nächsten Vorkommens zeigen. Diese Vorschau ist keine echte Aufgabe. Bei der Übertragung in mobile oder macOS-Kalender wird sie als normaler einzelner Termin geschrieben, nicht als nativer Serientermin.
- **Streng** behält den festen Planungsrhythmus bei. Eine monatliche Aufgabe, die am 1. fällig ist, bleibt an diesem geplanten Zyklus ausgerichtet. Mindwtr erstellt dennoch nur eine nächste Instanz je Abschluss, statt jeden zukünftigen Monat zu füllen.
- **Nach Abschluss wiederholen** berechnet die nächste Instanz anhand des Abschlusszeitpunkts der aktuellen. Eine einfache monatliche Gewohnheit, die am 15. abgeschlossen wird, wird beispielsweise beim nächsten Mal ab dem 15. geplant.
- Die Übertragung in mobile und macOS-Kalender spiegelt diese konkreten Aufgabeninstanzen. Mindwtr-Wiederholungsregeln werden nicht als native Serientermine exportiert.

## Planungsablauf

Auf dem Desktop:

1. Wählen Sie ein Datum oder öffnen Sie ein Zeitfenster.
2. Wählen Sie **Neu**, um eine geplante Aufgabe zu erstellen, oder **Vorhanden**, um eine ungeplante Aufgabe einzuplanen.
3. Legen Sie Beginn und Ende fest. Mindwtr prüft das Zeitfenster auf Überschneidungen mit geplanten Aufgaben und sichtbaren externen Terminen.
4. Speichern Sie die Aufgabe oder passen Sie ihre Zeit später im Aufgabeneditor, in der Tagesansicht oder in der Liste des ausgewählten Tages an.

In breiten Desktop-Layouts führt **Nächste Aktionen planen** ungeplante nächste Aktionen für den ausgewählten Tag auf, einschließlich fälliger, aber ungeplanter Aktionen. Damit können Sie eine nächste Aktion ohne Suche in den Kalender eintragen. Fälligkeitsdaten bleiben Fristen; durch die Planung wird ein `startTime` ergänzt.

Das Planungsfeld kann eingeklappt werden, damit das Kalenderraster die volle Breite einnimmt. Klappen Sie es wieder aus, wenn Sie die verfügbare Arbeit für das ausgewählte Datum durchsehen möchten.

Auf Mobilgeräten:

1. Öffnen Sie in der Tagesansicht **Kalender → Aufgaben planen**.
2. Wählen Sie eine vorhandene Aufgabe.
3. Mindwtr findet das früheste freie Zeitfenster dieses Tages und vermeidet sichtbare externe Termine und geplante Aufgaben.

Verwenden Sie das mobile Planungsfeld auf dieselbe Weise: Wählen Sie ungeplante Arbeit aus, während Sie bereits den Tag betrachten, und weisen Sie ihr anschließend einen konkreten Startzeitpunkt zu.

Mindwtr verwendet `timeEstimate` als Standarddauer, sofern verfügbar. Wählen Sie bei einer Überschneidung eine andere Zeit oder verkürzen Sie die Dauer.

## Externe Kalender

### Unterstützungsmatrix

Derzeit unterstützt:

| Plattform | Unterstützte Kalenderfunktion | Hinweise |
| --- | --- | --- |
| iOS-/Android-Mobilgeräte | Mindwtr-Aufgaben in einen Gerätekalender übertragen | Android ist mit Google Kalender verifiziert. Verwenden Sie unter iOS Kalender, die Apple Kalender/EventKit bereits zur Verfügung stehen. |
| iOS-/Android-Mobilgeräte | Gerätekalender lesen | Liest Kalender, die nach Erteilung der Berechtigung bereits in der Kalenderdatenbank des Geräts verfügbar sind. |
| iOS-/Android-Mobilgeräte | Direkte ICS-Abonnement-URLs | Die URL muss iCalendar-Rohdaten zurückgeben. |
| macOS-Desktop | Apple-Kalenderkonten lesen | Liest Termine nach Erteilung der Berechtigung über macOS EventKit. Dazu gehören in Apple Kalender synchronisierte Kalender wie iCloud, Google und Exchange. |
| macOS-Desktop | Mindwtr-Aufgaben in Apple Kalender übertragen | Schreibt geplante/fällige Mindwtr-Aufgaben über EventKit in einen ausgewählten beschreibbaren Apple-Kalender. |
| Linux-Desktop | Systemkalenderkonten lesen | Liest aktivierte Kalender, die Evolution Data Server bereitstellt, einschließlich in Evolution oder GNOME Online Accounts eingerichteter Konten. |
| Linux-Desktop | Mindwtr-Aufgaben in einen Systemkalender übertragen | Schreibt geplante/fällige Mindwtr-Aufgaben in einen ausgewählten beschreibbaren Evolution-Data-Server-Kalender. |
| Desktop und Web | Direkte ICS-Abonnement-URLs | Die URL muss iCalendar-Rohdaten zurückgeben. |

Derzeit nicht unterstützt:

- Native Desktop-Kalenderkonten unter Windows.
- Anmeldung an CalDAV-Konten, Servererkennung oder DAVx5-spezifische Kontoerkennung.
- OAuth für Kalenderanbieter innerhalb von Mindwtr, etwa die Anmeldung bei Google, Microsoft oder Nextcloud aus Mindwtr.
- Authentifizierte/private URLs, die `HTTP 401` zurückgeben, sofern das Geheimnis nicht bereits vom Kalenderanbieter in die URL eingebettet wurde.
- Kalenderwebseiten-URLs einschließlich öffentlicher Freigabeseiten, die HTML statt `.ics`-Rohdaten darstellen.
- Bearbeitung externer Kalendertermine aus Mindwtr.
- Synchronisierung externer Kalendertermine über die Mindwtr-Synchronisierung. Externe Termine werden lokal abgerufen und zwischengespeichert.
- Beidseitige Aufgaben-/Kalendersynchronisierung. Übertragene Kalendertermine werden aus Mindwtr-Aufgaben erzeugt.
- Export von Regeln wiederkehrender Aufgaben als native Serientermine.

### Sichtbarkeit

Die Sichtbarkeit externer Kalender ist eine lokale Anzeigeeinstellung:

- Über die Einstellungen synchronisierte externe Kalenderabonnements richten sich nach Ihren Synchronisierungseinstellungen.
- Der Ein-/Ausblendzustand jedes Kalenders in der Kalenderansicht wird auf dem aktuellen Gerät gespeichert.
- Ausgeblendete Kalender bleiben in den Einstellungen verfügbar. Sie werden auf diesem Gerät lediglich von der sichtbaren Planungsoberfläche und der Prüfung freier Zeitfenster ausgeschlossen.

### Mobilgeräte: Mindwtr-Aufgaben in den Kalender übertragen

Unter iOS und Android kann Mindwtr geplante Aufgaben und Aufgaben mit Fälligkeitsdatum in einen ausgewählten Gerätekalender übertragen:

- Aufgaben mit zeitlich festgelegtem `startTime` werden zu Terminen mit Uhrzeit. `timeEstimate` wird, sofern verfügbar, als Termindauer verwendet.
- Aufgaben mit reinem Datum in `startTime` oder ausschließlich einem `dueDate` werden zu ganztägigen Terminen.
- Erledigte, archivierte, als Referenz markierte oder gelöschte Aufgaben werden aus dem Zielkalender entfernt.
- Bei der Übertragung in einen eigenen Kalender namens `Mindwtr` behält Mindwtr die Aufgabentitel bei. Wenn Sie einen gemeinsam verwendeten Zielkalender wählen, wird übertragenen Termintiteln `Mindwtr: ` vorangestellt, damit sie neben normalen Terminen erkennbar bleiben.
- Aufgabenbeschreibungen werden zu Terminnotizen und Aufgabenorte zu Terminorten.
- Wenn Sie einen eigenen Kalender namens `Mindwtr` wählen, kann die Kalender-App Mindwtr-Einträge in der eigenen Farbe dieses Kalenders anzeigen.

Einrichtung:

1. Öffnen Sie **Einstellungen → Kalender**.
2. Aktivieren Sie **Aufgaben in Kalender übertragen**.
3. Erteilen Sie die Kalenderberechtigung.
4. Klappen Sie **Synchronisierungsziel** auf.
5. Wählen Sie, wohin Mindwtr Termine schreiben soll.

Zieloptionen:

- **Eigener Kontokalender**: Am besten für Google Kalender unter Android oder iCloud/Apple Kalender unter iOS. Erstellen Sie in diesem Konto einen Kalender namens `Mindwtr` und wählen Sie anschließend das eigene Ziel.
- **Gemeinsam verwendeter Kontokalender**: Schreibt in einen vorhandenen Kontokalender und stellt Termintiteln `Mindwtr: ` voran.
- **Eigener lokaler Kalender**: Bleibt auf dem aktuellen Gerät. Einige Android-Kalender-Apps blenden lokale Kalender aus. Lokale Ziele erscheinen weder auf calendar.google.com noch in anderen Web-Apps von Kontokalendern.
- **Gemeinsam verwendeter lokaler Kalender**: Schreibt ausschließlich in einen lokalen Gerätekalender.

#### Android: Google Kalender einrichten

So verwenden Sie unter Android einen separaten Google-basierten Kalender `Mindwtr`:

1. Öffnen Sie Google Kalender im Web.
2. Erstellen Sie unter demselben Google-Konto, das Sie unter Android verwenden, einen neuen Kalender namens `Mindwtr`.
3. Öffnen Sie Google Kalender unter Android und aktualisieren Sie das Konto. Stellen Sie sicher, dass die Kalendersynchronisierung in den Android-Kontoeinstellungen aktiviert ist.
4. Aktivieren Sie in der Android-App von Google Kalender **Google-Kalenderdaten mit anderen Apps teilen**, damit Android die Google-Kalender für Mindwtr bereitstellt.
5. Kehren Sie in Mindwtr zu **Einstellungen → Kalender** zurück, tippen Sie auf **Kalender aktualisieren** und wählen Sie das Ziel `Mindwtr`, das Ihr Google-Konto anzeigt.

Wenn der Google-basierte Kalender `Mindwtr` noch nicht in Mindwtr erscheint, hat Android ihn noch nicht über den System-Kalenderanbieter bereitgestellt. Aktualisieren Sie Google Kalender, prüfen Sie die Android-Kontosynchronisierung, aktivieren Sie in Google Kalender **Google-Kalenderdaten mit anderen Apps teilen** und tippen Sie anschließend in Mindwtr auf **Kalender aktualisieren**.

#### iOS: Apple Kalender einrichten

So verwenden Sie auf einem iPhone oder iPad einen separaten Apple-Kalender als Ziel:

1. Öffnen Sie Apple Kalender.
2. Erstellen Sie einen neuen Kalender namens `Mindwtr`. Verwenden Sie iCloud, wenn die Termine auf anderen Apple-Geräten erscheinen sollen, oder einen lokalen Kalender, wenn sie auf dem Gerät bleiben sollen.
3. Wenn Sie iCloud verwenden, prüfen Sie unter iOS **Einstellungen → Apple Account → iCloud → Kalender**, ob die Kalendersynchronisierung aktiviert ist.
4. Öffnen Sie in Mindwtr **Einstellungen → Kalender**.
5. Aktivieren Sie **Aufgaben in Kalender übertragen** und erteilen Sie die Kalenderberechtigung.
6. Klappen Sie **Synchronisierungsziel** auf, tippen Sie auf **Kalender aktualisieren** und wählen Sie den Apple-Kalender `Mindwtr` als Ziel.
7. Öffnen Sie in Apple Kalender die Kalenderliste und stellen Sie sicher, dass der ausgewählte Kalender `Mindwtr` sichtbar ist.

Wenn der Kalender `Mindwtr` nicht in der Zielliste erscheint, stellen Sie zunächst sicher, dass er in Apple Kalender sichtbar ist. Kehren Sie dann zu Mindwtr zurück und tippen Sie auf **Kalender aktualisieren**.

### Mobilgeräte: Gerätekalender lesen

Auf Mobilgeräten kann Mindwtr Kalender aus der Kalenderdatenbank des Geräts lesen:

- **Android:** über den Android-Kalenderanbieter. Wenn eine Synchronisierungs-App Kalender nicht über diesen Anbieter bereitstellt, kann Mindwtr sie nicht sehen.
- **iOS:** über EventKit-basierte Systemkalender wie iCloud, Google, Exchange und Outlook, nachdem sie in den iOS-Einstellungen aktiviert wurden.

Einrichtung:

1. Öffnen Sie **Einstellungen → Kalender**.
2. Aktivieren Sie **Gerätekalender**.
3. Erteilen Sie die Kalenderberechtigung.
4. Klappen Sie **Gerätekalender** auf.
5. Wählen Sie die anzuzeigenden Gerätekalender.

Mindwtr bleibt schreibgeschützt und führt für Kalenderquellen kein Anbieter-OAuth durch.

Mindwtr blendet die eigenen übertragenen `Mindwtr`-Kalender aus der Leseliste aus, um doppelte Kopien der selbst erstellten Termine zu vermeiden.

### macOS: Apple-Kalender-Integration

Auf dem macOS-Desktop kann Mindwtr über EventKit Apple-Kalendertermine lesen und geplante/fällige Mindwtr-Aufgaben übertragen:

1. Öffnen Sie **Einstellungen → Kalender**.
2. Fordern Sie Zugriff auf Apple Kalender an.
3. Erlauben Sie Mindwtr den Zugriff unter macOS **Systemeinstellungen → Datenschutz & Sicherheit → Kalender**.
4. Aktivieren Sie **Aufgaben in Kalender übertragen**, wenn Mindwtr-Aufgaben in Apple Kalender geschrieben werden sollen.
5. Wählen Sie einen eigenen Kalender `Mindwtr` oder einen anderen beschreibbaren Zielkalender.

Dies funktioniert nur mit Kalendern, die bereits in Apple Kalender sichtbar sind.

### Linux: Integration mit GNOME/Evolution Data Server

Unter Linux kann Mindwtr aktivierte Evolution-Data-Server-Kalender lesen und geplante/fällige Aufgaben in beschreibbare Kalender übertragen. Dazu gehören Konten, die bereits in Evolution oder GNOME Online Accounts eingerichtet sind und von Evolution Data Server bereitgestellt werden.

1. Richten Sie das Kalenderkonto in Evolution oder GNOME Online Accounts ein und prüfen Sie, ob es in Evolution erscheint.
2. Stellen Sie sicher, dass `evolution-data-server` installiert ist und läuft.
3. Öffnen Sie in Mindwtr **Einstellungen → Kalender**.
4. Aktivieren Sie **Aufgaben in Kalender übertragen**, wenn Mindwtr-Aufgaben in den Systemkalender geschrieben werden sollen.
5. Klappen Sie **Synchronisierungsziel** auf, aktualisieren Sie die Kalender und wählen Sie einen eigenen Kalender `Mindwtr` oder ein anderes beschreibbares Ziel.

Unter Linux gibt es keinen separaten Kalender-Berechtigungsdialog. Schreibgeschützte Kalender können in Mindwtr erscheinen, werden aber nicht als Übertragungsziel angeboten. Die aktuellen Flatpak- und Snap-Pakete können nicht auf den Evolution Data Server des Hosts zugreifen; verwenden Sie für diese Integration vorerst ein natives Paket oder das AUR-Paket.

### Desktop/Web: ICS-URLs

1. Öffnen Sie **Einstellungen → Kalender**.
2. Fügen Sie Ihre **ICS-URL** hinzu.
3. Aktualisieren Sie, um Termine abzurufen.

Termine werden auf dem Gerät zwischengespeichert und nicht über die Mindwtr-Synchronisierung synchronisiert.

### Anforderungen an ICS-URLs

Mindwtr erwartet, dass die URL iCalendar-Rohtext abruft. Ein funktionierender Feed:

- beginnt üblicherweise mit `BEGIN:VCALENDAR`
- besitzt eine auf `.ics` endende URL oder einen ausdrücklichen Abonnement-/Exportlink des Kalenderanbieters
- kann ohne interaktive Anmeldeseite oder zusätzliche Header abgerufen werden

Häufige Beispiele:

- Google Kalender: Verwenden Sie die private **Geheime Adresse im iCal-Format**.
- Nextcloud Kalender: Verwenden Sie den `.ics`-Abonnement-/Exportlink des Kalenders, nicht die URL der öffentlichen Kalenderseite.

Wenn Mindwtr `HTTP 401` anzeigt, verlangt der Server eine Authentifizierung. Eingabeaufforderungen für Benutzername und Passwort, CalDAV-Anmeldung und Bearer-Token-Header werden für Kalender-URLs nicht unterstützt. Verwenden Sie stattdessen die geheime iCalendar-Abonnement-URL des Anbieters.

Wenn eine URL im Browser eine normale Webseite öffnet, ist sie wahrscheinlich nicht der ICS-Feed. Kopieren Sie den Abonnement-/Exportlink von dieser Seite.

### Private Kalender (Google Kalender)

Sie müssen Ihren Kalender **nicht** öffentlich machen. Verwenden Sie stattdessen die private „Geheime Adresse“:

1. Öffnen Sie Google Kalender im Web → **Einstellungen**.
2. Wählen Sie den Kalender in der linken Seitenleiste.
3. Kopieren Sie unter **Kalender integrieren** die **Geheime Adresse im iCal-Format**.
4. Fügen Sie diese URL in Mindwtr ein.

Dieser Link verhält sich wie ein Passwort: Nur Apps mit dem Link können Termine sehen, während der Kalender privat bleibt.

## Hinweise

- Im Desktop- und mobilen Kalender kann aus einem externen Termin eine separate Mindwtr-Aufgabe erstellt werden. Mindwtr kopiert, sofern verfügbar, Termintitel, Datum/Uhrzeit, Ort, Beschreibung und Kalendernamen.
- Externe Kalender sind innerhalb von Mindwtr **schreibgeschützt**. Das Erstellen einer Aufgabe aus einem Termin verändert den ursprünglichen Termin nicht.
- Wiederkehrende ICS-Termine unterstützen `FREQ=DAILY`, `WEEKLY`, `MONTHLY` und `YEARLY`, einschließlich `INTERVAL`, `COUNT`, `UNTIL`, `BYDAY`, `BYMONTH` und `BYMONTHDAY` für Muster, die Mindwtr im sichtbaren Bereich ausweiten kann.
- Jährliche ganztägige Termine und jährliche Regeln wie `FREQ=YEARLY;COUNT=...` oder `FREQ=YEARLY;BYMONTH=1;BYDAY=3MO` werden im sichtbaren Kalenderfenster ausgeweitet.
- Ausnahmedaten und Wiederholungsüberschreibungen wie `EXDATE`, `RDATE` und `RECURRENCE-ID` werden derzeit nicht ausgeweitet.
- Wiederkehrende Termine mit `RRULE:...;COUNT=...` enden nach ihrer ursprünglichen Anzahl. Wenn Ihnen zuvor sehr alte wiederkehrende Termine angezeigt wurden, importieren Sie sie nach der Aktualisierung auf v0.4.9+ erneut.
