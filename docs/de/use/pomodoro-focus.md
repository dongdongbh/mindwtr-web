# Pomodoro-Fokus

Mindwtr bietet auf dem Desktop und auf Mobilgeräten in der Ansicht **Fokus** optional ein Pomodoro-Zeitgeberfeld.

Diese Funktion ist standardmäßig **deaktiviert**, damit „Fokus“ minimalistisch und ablenkungsfrei bleibt.

---

## Pomodoro aktivieren

### Desktop
1. Öffnen Sie **Einstellungen**.
2. Wechseln Sie zu **GTD**.
3. Aktivieren Sie unter **Funktionen** den **Pomodoro-Zeitgeber**.
4. Öffnen Sie die Ansicht **Fokus**.

### Mobilgeräte
1. Öffnen Sie **Menü → Einstellungen**.
2. Wechseln Sie zu **GTD**.
3. Aktivieren Sie unter **Funktionen** den **Pomodoro-Zeitgeber**.
4. Öffnen Sie den Tab **Fokus**.

---

## Funktionsweise

- Wählen Sie optional eine **Zeitgeberaufgabe** aus den aktuellen Fokuskandidaten oder belassen Sie es bei **Nur Zeitgeber**.
- Wählen Sie eine Voreinstellung: `15/3`, `25/5`, `50/10` oder eine optionale eigene Voreinstellung unter **Einstellungen → GTD**.
- Starten Sie Ihre Fokusphase.
- Nach dem Ende einer Fokusphase wechselt Mindwtr zur Pause und hält an, damit Sie diese bewusst starten können.
- Nach dem Ende einer Pause wechselt es zurück zum Fokus.

Die Aufgabenverknüpfung ist optional und standardmäßig deaktiviert. Aktivieren Sie **Einstellungen → GTD → Pomodoro-Zeitgeber → Zeitgeber mit Aufgabe verknüpfen**, wenn Sie in „Fokus“ die Auswahl der Zeitgeberaufgabe und die Aktion **Aufgabe als erledigt markieren** verwenden möchten.

Auf dem Desktop kann das Feld eingeklappt werden: Der Pfeil in seiner Kopfzeile reduziert es auf eine schmale Zeile, die nur Restzeit und Phase zeigt; der Zeitgeber läuft weiter. Der Einklappzustand wird gespeichert, und beim Drücken der Wiedergabeschaltfläche einer Aufgabe öffnet sich das Feld wieder.

Steuerelemente:
- **Zeitgeber**: Start/Pause, Zurücksetzen und Phase wechseln
- **Aufgabenaktualisierung**: Aufgabe als erledigt markieren; dadurch wird die ausgewählte Zeitgeberaufgabe abgeschlossen

Die Aufgabenauswahl bestimmt, mit welcher Aufgabe das Pomodoro-Feld gegebenenfalls verknüpft ist. Die Zeitgebersteuerung wirkt auf den Zeitgeber. **Aufgabe als erledigt markieren** ist nur bei einer verknüpften Zeitgeberaufgabe verfügbar und verschiebt diese ausgewählte Aufgabe nach „Erledigt“ und entfernt sie aus dem heutigen Fokus.

## Aufgewendete Zeit

Aufgaben besitzen im Aufgabeneditor neben der Zeitschätzung optional den Wert **Aufgewendete Zeit**. „Aufgewendete Zeit“ erfordert v1.1.0 oder neuer; ältere Versionen wie v1.0.5 bieten die Funktion nicht.

„Aufgewendete Zeit“ ist freiwillig und standardmäßig deaktiviert: Die zugehörigen Oberflächen erscheinen nur, wenn sowohl die Funktion **Pomodoro-Zeitgeber** als auch **Zeitgeber mit Aufgabe verknüpfen** aktiviert sind – das Editorfeld und die Aufgabenplakette auf Desktop und Mobilgeräten sowie die Schnellstartschaltfläche auf dem Desktop. Wenn Sie die Funktionen deaktivieren, werden nirgendwo zeitbezogene Angaben angezeigt (aufgezeichnete Werte bleiben erhalten und erscheinen nach erneuter Aktivierung wieder). Wenn Sie das Feld „Zeitschätzung“ im Layout des Aufgabeneditors ausblenden, wird auch „Aufgewendete Zeit“ ausgeblendet.

- Jede abgeschlossene Fokusphase mit verknüpfter Zeitgeberaufgabe addiert die Fokusminuten dieser Phase zur Gesamtsumme der Aufgabe.
- Sie können die Gesamtsumme im Editor auch von Hand festlegen oder korrigieren.
- Aufgaben mit aufgezeichneter Zeit zeigen in Aufgabenlisten auf Desktop und Mobilgeräten eine kleine Plakette. Die Gesamtsumme wird wie jedes andere Aufgabenfeld zwischen Ihren Geräten synchronisiert.

Bewusst nicht vorgesehen sind ein Protokoll einzelner Sitzungen, eine Berichtsansicht oder eine frei laufende Stoppuhr. Die Gesamtsumme ist eine einzelne Zahl pro Aufgabe. Für externe Berichte können Sie `timeSpentMinutes` über die Cloud API oder den MCP-Server auslesen.

## Eine Sitzung von einer Aufgabe aus starten (Desktop)

Wenn sowohl die Pomodoro-Funktion als auch **Zeitgeber mit Aufgabe verknüpfen** aktiviert sind, erscheint beim Bewegen des Mauszeigers über eine Aufgabenzeile eine Wiedergabeschaltfläche:

- Klicken Sie darauf, um die Aufgabe zu verknüpfen und sofort eine Fokusphase zu starten, ohne sie im Auswahlmenü für die Zeitgeberaufgabe suchen zu müssen.
- Die Schaltfläche zeigt außerdem, wie viele Fokusphasen Sie für diese Aufgabe abgeschlossen haben.

---

## Fokus und Nächste Aktionen

Die Ansicht **Fokus** ist keine 1:1-Kopie der vollständigen Liste „Nächste Aktionen“. Sie ist ein Dashboard zum Erledigen:

- **Heutiger Fokus**: Aufgaben, die Sie ausdrücklich für heute markiert haben, bis zum festgelegten Fokuslimit
- **Heute**: nächste Aufgaben, die heute fällig oder überfällig sind oder heute beginnen
- **Nächste Aktionen**: derzeit verfügbare nächste Aufgaben
- **Durchsicht fällig**: Einträge unter „Warten“ oder in der Wiedervorlage, die Aufmerksamkeit benötigen

„Fokus“ blendet Aufgaben mit zukünftigem Startdatum und spätere Aufgaben in sequenziellen Projekten bewusst aus. So bleibt die Ansicht auf Arbeit beschränkt, die Sie jetzt erledigen können. Verwenden Sie **Kontexte**, **Projekte** oder die **Suche**, wenn Sie einen größeren Aufgabenbestand einschließlich künftig beginnender Aufgaben prüfen möchten.

---

## Wann Sie die Funktion verwenden sollten

- Verwenden Sie sie, wenn Sie einen einfachen Zeitgeber möchten, ohne den aktuellen GTD-Fokusablauf zu verlassen.
- Lassen Sie sie deaktiviert, wenn „Fokus“ ausschließlich eine Listenansicht ohne Zeitgeberoberfläche bleiben soll.
- Betrachten Sie sie als Hilfe beim Erledigen der nächsten Aktion, nicht als separates Planungssystem.

## Praktische Muster

- Verwenden Sie `15/3` zum Leeren des Posteingangs, für kleine Verwaltungsaufgaben oder um eine Blockade zu überwinden.
- Verwenden Sie `25/5` als täglichen Standardrhythmus für normale nächste Aktionen.
- Verwenden Sie `50/10` für konzentrierte Projektarbeit, wenn die Aufgabe bereits klar genug zum Beginnen ist.
- Verwenden Sie eine eigene Voreinstellung, wenn Sie einen anderen Rhythmus benötigen, aber halten Sie ihn einfach.
- Verwenden Sie **Aufgabe als erledigt markieren** nur, wenn die verknüpfte Zeitgeberaufgabe tatsächlich fertig ist. Halten Sie andernfalls an oder wechseln Sie die Phase und lassen Sie die Aufgabe aktiv.

---

## Hinweise

- Pomodoro kann als einfacher Zeitgeber laufen. Sie können ihn auch mit einer Zeitgeberaufgabe verknüpfen, wenn Sie die Aufgabe direkt aus dem Feld abschließen möchten.
- Das Feld muss bewusst aktiviert werden, damit Personen, die eine aufgeräumte GTD-Fokusseite bevorzugen, es ausblenden können.
- Die integrierten Voreinstellungen bleiben fest und einfach. Mindwtr erlaubt nur eine optionale eigene Voreinstellung, damit „Fokus“ nicht zu einer Oberfläche zur Zeitgeberanpassung wird.
