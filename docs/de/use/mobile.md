---
description: "Geführtes GTD auf iPhone und Android: Eingang Karte für Karte, Zwei-Minuten-Regel, Fokus, tägliche Revision und Wochenrückblick-Assistent."
---

# Benutzerhandbuch: Mobilgeräte

Die mobile Mindwtr-App bietet auf iPhone und Android den vollständigen geführten GTD-Ablauf: Erfassen, kartenweises Abarbeiten des Eingangs mit der Zwei-Minuten-Regel, Projekte, Fokus, tägliche Revision und den geführten Assistenten für die wöchentliche Revision. Android wird vollständig unterstützt; iOS ist im App Store und als TestFlight-Beta verfügbar. Mindwtr basiert auf React Native und Expo.

## Überblick

Die App verwendet untere Tabs für zentrale Abläufe und eine Menüseite für weitere Ansichten.

Unter Android passt sich die Navigation dem verfügbaren App-Fenster an: Geräumige Fenster verwenden eine seitliche Navigationsleiste, schmale oder niedrige Fenster behalten die kompakte Navigation. Aufgabenbearbeitung und Schnellerfassung bleiben in einem nutzbaren Bereich, wenn Android ein trennendes oder verdeckendes Scharnier meldet. Ein eigener Modus für faltbare Geräte muss nicht aktiviert werden. Diese Layouts wurden im Emulator geprüft; die Bestätigung auf physischen Galaxy Z Fold und Z Flip steht noch aus.

---

## Interaktionsmuster

- **Tippen**, um eine Aufgabe zu öffnen. **Einstellungen → Layout des Aufgabeneditors → Aufgaben öffnen in** legt fest, auf welchem Tab das Tippen landet
- **Wischen** für Schnellaktionen (siehe unten)
- Über das **Teilen-Menü** Einträge direkt zum Eingang hinzufügen

## Navigation

### Untere Tabs

| Tab | Beschreibung |
| -------------- | ------------------------------------ |
| 📥 **Eingang** | Eingehende Einträge erfassen und verarbeiten |
| 🎯 **Fokus** | Tagesdashboard und nächste Aktionen |
| ➕ **Schnellerfassung** | Aufgabe oder Audionotiz schnell hinzufügen |
| 📝 **Durchsicht** | Tägliche Durchsicht + Wochenrückblick |
| ☰ **Menü** | Projekte, Board, Kalender usw. öffnen |

Die Schnellzugriffsplätze lassen sich anpassen. In diesem Clip wird „Durchsicht“ durch „Projekte“ ersetzt; anschließend erscheint „Projekte“ sowohl in der unteren Navigation als auch im Menü.

<figure class="docs-demo">
  <video controls playsinline preload="none" width="720" height="1616" poster="/assets/screenshots/articles/quick-access-projects-mobile-poster.webp">
    <source src="/assets/screenshots/articles/quick-access-projects-mobile.mp4" type="video/mp4">
    Ihr Browser unterstützt das Mindwtr-Video zur mobilen Navigation nicht.
  </video>
  <figcaption>Schnellzugriff anpassen: „Durchsicht“ durch „Projekte“ ersetzen und die Projektansicht über die aktualisierte Navigation öffnen.</figcaption>
</figure>

### Tab „Menü“

Tippen Sie auf **Menü**, um weitere Ansichten zu öffnen:

- 📋 **Board**: Kanban-Board mit manueller Ziehreihenfolge, Suche und Kontext-/Tag-/Datums-/Projektfiltern
- 🗓️ **Kalender**: zeitbasierte Ansicht
- 📁 **Projekte**: mehrstufige Ergebnisse
- 🏷️ **Kontexte**: nach Kontext filtern
- ⏳ **Warten**: delegierte Einträge
- 💭 **Irgendwann/Vielleicht**: zukünftige Ideen
- 📚 **Referenz**: Referenzmaterial
- 🕘 **Verlauf**: Registerkarten Erledigt und Archiviert – kürzlich abgeschlossene Aufgaben sowie abgelegte Aufgaben und Projekte
- 🗑️ **Papierkorb**: gelöschte Aufgaben und Projekte
- ⚙️ **Einstellungen**: App-Einstellungen

Öffnen Sie **Verlauf**, bleiben Sie auf der Registerkarte **Erledigt** und tippen Sie auf **Auswählen**, um Aufgaben zu markieren. Verwenden Sie dann **Verschieben → Archiviert**, um sie vorzeitig abzulegen. Unter **Archiviert** können Sie mit **Auswählen** oder **Alle auswählen** Aufgaben zurück nach Erledigt verschieben, ohne den Abschlusszeitpunkt zu ändern, sie im Eingang wiederherstellen oder in den Papierkorb verschieben. Wechseln Sie zu **Projekte**, um archivierte Projekte zu öffnen, wiederherzustellen oder in den Papierkorb zu verschieben. Mindwtr löscht Einträge nur aus dem Papierkorb endgültig.

**Archiviert** hat ein Suchfeld und eine Schaltfläche **Filter** in der Kopfzeile. Filter grenzt nach Kontext, Tag, Priorität und Zeitaufwand ein und enthält **Sortieren** und **Gruppieren** — beide bieten **Abschlussdatum**, da hier ausschließlich abgeschlossene Arbeit abgelegt ist. Standardmäßig steht der neueste Abschluss oben. Filterauswahlen gelten für alle Aufgabenlisten gemeinsam, ein anderswo gewählter Kontext grenzt also auch diese Liste ein. Suche und Filter gelten für die Seite „Aufgaben“ des Umschalters Aufgaben | Projekte.

Unter **Erledigt** zeigt die Sortierung nach **Abschlussdatum** die neuesten Abschlüsse zuerst. Die Gruppierung nach **Abschlussdatum** teilt die Liste in **Heute**, **Gestern**, **Letzte 7 Tage**, je eine Überschrift pro Kalendermonat für ältere Aufgaben (Januar 2026, Dezember 2025, …) und **Nicht abgeschlossen**; leere Gruppen bleiben ausgeblendet, und die Sammelgruppe ohne Zuordnung steht am Ende. Referenz, Eingang, Erledigt und Archiviert lassen sich außerdem nach **Kontext** gruppieren. Eine Aufgabe mit mehreren Kontexten erscheint in jeder passenden Gruppe; Aufgaben ohne Kontext stehen am Ende unter **Kein Kontext**. Tippen Sie auf eine Gruppenüberschrift, um die Gruppe einzuklappen — jede Liste merkt sich pro Gruppierung, welche ihrer Gruppen auf diesem Gerät eingeklappt sind, und die Aufgaben einer eingeklappten Gruppe fallen aus **Auswählen** und den Sammelaktionen heraus.

Öffnen Sie **Papierkorb** und tippen Sie auf **Auswählen**, um mehrere gelöschte Aufgaben und Projekte gemeinsam wiederherzustellen oder endgültig zu löschen. Endgültiges Löschen verlangt immer eine Bestätigung. Einträge, die im Papierkorb bleiben, werden nach 90 Tagen endgültig entfernt.

---

## Referenz

Referenzen sind Notizen und Materialien zum Aufbewahren. Zeilen und Editor stellen Titel, Beschreibung, Projekt oder Bereich, Personen, Tags, Anhänge und Links in den Vordergrund. Planungs- und Erledigungsfunktionen treten zurück. Mit **In nächste Aktion umwandeln** wird eine Referenz zu einer Aufgabe.

Die Suche in Referenz findet alle durch Leerzeichen getrennten Begriffe an beliebiger Stelle im Titel oder in der Beschreibung, unabhängig von Groß- und Kleinschreibung. Zum Beispiel findet `ke 1 2` den Text `key1 key2 key3`. Begriffe gelten als wörtlicher Text; Schnellerfassungs- und erweiterte Suchsyntax werden hier nicht ausgewertet.

Aktivieren Sie **Archivierte Projekte einbeziehen** in den Referenzfiltern, um Material aus abgeschlossenen oder archivierten Projekten zu finden. Die Option ist anfangs aus und gilt nur für diese Ansicht auf diesem Gerät; gelöschtes Material bleibt ausgeschlossen.

## Stapelaktionen

Tippe in **Sammel-Organisation** bei Start-, Fälligkeits- und Überprüfungsdatum auf das Kalendersymbol oder wähle **Heute** oder **Morgen**. Die Daten werden erst mit **Auf Auswahl anwenden** übernommen, ohne Uhrzeit oder Erinnerung hinzuzufügen. Ein leeres Datumsfeld (auch nach erneutem Antippen des ausgewählten Kürzels) behält das bisherige Datum jeder Aufgabe bei.

Suche unter **Sammel-Organisation** nach einem Projekt oder Bereich oder gib einen neuen Namen ein und wähle **Erstellen**, ohne die Aufgabenauswahl oder andere Formularfelder zu verlieren. Das Erstellen speichert und wählt das Ziel; erst **Auf Auswahl anwenden** verschiebt die Aufgaben. Beim Abbrechen bleiben die Aufgaben unverändert und erstellte Ziele erhalten. Schlägt das Erstellen fehl, bleiben Auswahl und Formular für einen erneuten Versuch erhalten.

---

## Globale Suche

Tippen Sie in der Kopfzeile auf das **Suchsymbol**.

Die Suche blendet erledigte und archivierte Einträge standardmäßig aus. Bei Treffern erscheint „N weitere unter Erledigt und Archiviert“. Tippen Sie darauf oder aktivieren Sie **Erledigte und archivierte Aufgaben einbeziehen** in den Suchfiltern.

### Suchoperatoren

| Operator | Beispiel | Beschreibung |
| ----------- | ------------------ | ----------------------- |
| `status:` | `status:next` | Nach Status filtern |
| `-status:` | `-status:done` | Status ausschließen |
| `context:` | `context:@home` | Nach Kontext filtern |
| `tag:` | `tag:#focused` | Nach Tag filtern |
| `@` `#` `%` | `@home #focused %Tom` | Kurzform für `context:`, `tag:` und `person:` |
| `assigned:` | `assigned:Tom` | Nach Person filtern |
| `project:` | `project:HomeReno` | Nach Projekt filtern |
| `location:` | `location:office` | Nach Aufgabenort filtern |
| `where:` | `where:office` | Alias für Aufgabenort |
| `id:` | `id:abc123` | Exakte Aufgaben-ID |
| `-id:` | `-id:abc123` | Exakte Aufgaben-ID ausschließen |
| `due:` | `due:today` | An Datum fällige Aufgaben |
| `due:<=` | `due:<=7d` | Innerhalb 7 Tagen fällig |
| `start:` | `start:>=tomorrow` | Ab Datum beginnende Aufgaben |
| `created:` | `created:>=30d` | In letzten 30 Tagen erstellt |
| `OR` | `@home OR @work` | Eine Bedingung erfüllen |

Ein vorangestelltes `-` negiert jeden Operator, nicht nur die beiden gezeigten: `-context:@computer` listet nur Aufgaben, die kein `@computer` benötigen, `-tag:#deep` blendet ein Tag aus, `-project:HomeReno` schließt ein Projekt aus.

### Gespeicherte Suchen

1. Suchabfrage eingeben
2. **„Suche speichern“** antippen
3. Suche benennen
4. Unter **Menü → Gespeicherte Suchen** öffnen

**Löschen:** Gespeicherte Suche öffnen und Papierkorbsymbol antippen.

Gespeicherte Suchen unterscheiden sich von **Gespeicherten Filtern** in „Fokus“. Fokusfilter speichern Kriterien wie Projekte, Kontexte, Tags, Priorität, Energie und Zeitschätzungen.

---

## Schnellerfassung

Mindwtr bietet mehrere mobile Erfassungswege. Die Erfassungsansicht beginnt mit der Eingabe; die Syntaxhilfe liegt für eine aufgeräumte Oberfläche hinter einem kleinen „?“-Schalter.

Aktivieren Sie für mehrere Erfassungen **Weitere hinzufügen**: Jedes `Enter` speichert und lässt die Ansicht mit geöffneter Tastatur für die nächste Aufgabe offen. Der Schalter bleibt bis zur Deaktivierung eingeschaltet.

### Erfassungswege im Überblick

| Weg | iOS | Android | Öffnet die App? |
| --- | --- | --- | --- |
| Erfassungsbildschirm in der App (Text oder Audio) | Ja | Ja | Sie sind bereits darin |
| Teilen-Menü aus einer anderen App | Ja | Ja | Ja, Erfassungsbildschirm |
| Erfassungsknopf des Startbildschirm-Widgets | Ja | Ja | iOS: ja; für eine Eingabe ohne App nutzen Sie den [Ein-Tipp-Kurzbefehl](/de/power-users/apple-shortcuts). Android: nein, natives Erfassungsfenster |
| Widget-Mikrofon (Sprache) | Nein | Ja, bei aktivierter Spracherkennung | Nein |
| Schnelleinstellungen-Kachel | Nein | Ja | Nein |
| Schnellerfassung in der Benachrichtigungsleiste | Nein | Ja | Nein |
| Sprachassistent | Siri über die Kurzbefehle-Aktionen | Gemini/Assistant App Actions | iOS: nein mit „Add to Mindwtr“. Android: ja, Bestätigung |
| Kurzbefehl „Add to Mindwtr“ (still, Automationen) | Ja | Nein | Nein |
| Kurzbefehl „Capture to Mindwtr“ (erst prüfen) | Ja | Nein | Ja, Erfassungsbildschirm |
| Apple Watch (sprechen oder tippen) | Ja | Nein | Nein, Warteschlange zum iPhone |
| Automations-Broadcast (Tasker und ähnliche) | Nein | Ja | Nein, Warteschlange bis zum Öffnen der App |
| URL-Schema `mindwtr://capture` | Ja | Ja | Ja, Erfassungsbildschirm |
| Import aus Apple Erinnerungen (manuell oder automatisch) | Ja | Nein | Läuft beim Öffnen der App |

### Teilen-Menü

1. In einer App (Browser, E-Mail, Notizen) Inhalt auswählen
2. **Teilen** antippen
3. **Mindwtr** wählen
4. Die Erfassungsansicht öffnet sich mit dem Inhalt als Notiz
5. Titel/Felder anpassen und im Eingang speichern

Beim Teilen einer Datei (PDF, Bild, Video oder Audioaufnahme) wird sie als Anhang der neuen Aufgabe in Mindwtr kopiert; der Dateiname wird zum Anfangstitel. Bis zu sechs Dateien können gleichzeitig geteilt werden.

Geeignet für:
- Artikel zum späteren Lesen
- E-Mails als Aufgaben
- Links aus dem Browser
- PDF oder Foto als später zu verarbeitende Eingangsaufgabe

<span id="android-automatisierung-zur-erfassung-tasker"></span>

### Android-Automatisierung zur Erfassung {#android-automation-capture}

Aktivieren Sie unter **Einstellungen → GTD → Erfassungs-Standardwerte** die **Automatisierte Erfassung** und kopieren Sie den Erfassungstoken. Einstellung und Token bleiben auf diesem Gerät. Geben Sie den Token nur an vertrauenswürdige Automatisierungs-Apps weiter. Ausschalten widerruft ihn; erneutes Einschalten erzeugt einen neuen Token.

Dies ist ein allgemeiner Android-Broadcast-Intent; Tasker ist nicht erforderlich. Jede App oder Automatisierung, die einen expliziten Broadcast mit String-Extras senden kann, kann ihn verwenden. Senden Sie die folgende Aktion an diesen Empfänger: `text` enthält den erfassten Text, `token` Ihren Erfassungstoken.

| Feld | Wert |
| --- | --- |
| Action | `tech.dongdongbh.mindwtr.action.CAPTURE` |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.androidwidget.CaptureIntentReceiver` |
| Target | `Broadcast Receiver` |
| `text` (String) | Zu erfassender Text |
| `token` (String) | Ihr Erfassungstoken |

#### Tasker-Beispiel

Fügen Sie in Tasker nach der Diktataktion **Misc → Send Intent** hinzu:

| Feld | Wert |
| --- | --- |
| Action | `tech.dongdongbh.mindwtr.action.CAPTURE` |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.androidwidget.CaptureIntentReceiver` |
| Target | `Broadcast Receiver` |
| Extra | `text:(String) %captured_text` |
| Extra | `token:YOUR_CAPTURE_TOKEN` |

Ersetzen Sie `%captured_text` durch Ihre Textvariable und `YOUR_CAPTURE_TOKEN` durch den kopierten Token. Kategorie, MIME-Typ und Daten bleiben leer. Mindwtr Dev verwendet das Paket `tech.dongdongbh.mindwtr.dev`; Aktion und Klasse bleiben gleich.

Jede angenommene Erfassung wird separat vorgemerkt, auch bei gleichem Text. Beim nächsten Öffnen importiert Mindwtr sie in den Eingang. Der Intent öffnet die App nicht und synchronisiert nicht im Hintergrund. Er akzeptiert nichtleeren Text mit höchstens 2.000 Zeichen, keine Audioaufnahmen oder Dateien. Senden Sie zum Ausprobieren zwei kurze Notizen, bevor Sie Mindwtr öffnen, und prüfen Sie, ob beide ankommen. Nach einem erzwungenen Stopp kann Android Broadcasts bis zum nächsten Öffnen blockieren.

Weitere Angaben zu den Feldern finden Sie in [Taskers Intent-Anleitung](https://tasker.joaoapps.com/userguide/en/intents.html).

### Startbildschirm-Widget

Ab der nächsten Version öffnet ein Tippen auf eine freie Fläche im Tasks- oder Compact-Widget unter Android und iOS die Fokus-Ansicht. Aufgabenlinks, Erledigen-Schaltflächen, Listenauswahl und Schnellerfassung behalten ihre bisherigen Funktionen.

Die folgenden Bedienelemente gelten für Android. Für iOS siehe **iOS-Widget auf dem Home-Bildschirm** weiter unten.

1. Startbildschirm lange drücken
2. **Widgets** wählen
3. **Mindwtr** suchen und das Widget **Aufgaben**, die einzellige Schaltfläche **Schnellerfassung** oder auf Android das optionale kleinere Widget **Kompakt** hinzufügen. Das Aufgaben-Widget zeigt eine **+**-Schaltfläche und Ihre Aufgaben, jeweils mit Prioritätsfarbe, Projekt oder Bereich und Fälligkeitsdatum. Auf Android zeigt ein neu hinzugefügtes Aufgaben-Widget den Fokus, mit dem Eingangszähler in der Kopfzeile und einer kurzen Ansicht von Heutiger Fokus und Heute. Durchsicht fällig, Nächste Aktionen und Anstehend bleiben in der App. Tippen Sie auf den Titel, um diese Liste in Mindwtr zu öffnen. Um die Widget-Liste zu wechseln, tippen Sie auf den separaten kleinen Pfeil nach unten. Die Kopfzeile verwendet denselben Design-Hintergrund wie der Widget-Inhalt. Es öffnet sich eine Auswahl mit Fokus, Eingang, Nächste Aktionen, Warten auf, Irgendwann/Vielleicht und Ihren **gespeicherten Filtern**. Tippen Sie einen Eintrag an, und das Widget wird neu gezeichnet. Um ein einzelnes Projekt auf einem Widget zu zeigen, speichern Sie in der App einen Fokus-Filter für dieses Projekt und wählen Sie ihn hier aus. Das funktioniert auf jedem Launcher, und manche Launcher bieten selbst keine Bearbeitungsaktion für Widgets. Sie können mehrere Aufgaben-Widgets mit verschiedenen Listen hinzufügen. Nachdem Mindwtr einmal ausgeführt und den ersten Android-Widget-Schnappschuss veröffentlicht hat, stehen die fünf Standardlisten für neu hinzugefügte Aufgaben-Widgets und Listenwechsel bereit, ohne dass die App erneut geöffnet werden muss. Öffnen Sie Mindwtr vor der ersten Widget-Nutzung und später zum Aktualisieren der Widget-Daten; die Widgets übernehmen Hintergrundsynchronisierungen nicht in Echtzeit. Mindwtr veröffentlicht Schnappschüsse für gespeicherte Filter bei Bedarf.
4. Tippen Sie in einem Aufgabenlisten-Widget auf eine Aufgabe, um das kleine native Aufgabenblatt zu öffnen. Im Aufgaben-Widget können Sie die Aufgabe über den Ring am Zeilenanfang abschließen. Über die Erfassungsschaltfläche in jedem der drei Android-Widgets gelangt etwas in den Eingang.

Das Aufgaben-Widget zeigt zuerst Heutiger Fokus, danach Heute einschließlich überfälliger Aufgaben. Leere Plätze werden nicht mit weiteren nächsten Aktionen gefüllt. Auf Android gelten die Filter und die Sortierung des Fokus-Bildschirms. Die dort gesetzten Filter gelten auch für das Widget: Kontexte, Tags, Priorität, Energie, Zeitaufwand und ein gespeicherter Filter. Auch die auf dem Fokus-Bildschirm gewählte Sortierung gilt, und das Widget wird aktualisiert, sobald Sie eines von beidem ändern. Der in der App ausgewählte Bereich schränkt jede Widget-Liste ein.

Das Android-Widget Kompakt verwendet kleinere Schrift und eine flache Fokusliste für kleine Widget-Flächen. Es zeigt Heutiger Fokus und Heute unter der Überschrift **Heute**. Sind beide leer und gibt es Nächste Aktionen, wechselt die Überschrift zu **Nächste Aktionen**. Beim Ändern der Widget-Größe werden so viele Aufgaben angezeigt, wie hineinpassen, höchstens jedoch alle verfügbaren Aufgaben. Es hat weder eine Listenauswahl noch eine direkte Abschluss-Schaltfläche; beim Antippen einer Aufgabe öffnet sich dasselbe native Aufgabenblatt.

Auf Android öffnet ein Tippen auf eine Aufgabenzeile in Aufgaben oder Kompakt ein kleines Aufgabenblatt über dem Startbildschirm, ohne die Haupt-App zu öffnen. Das Blatt zeigt den Titel, das Projekt oder den Bereich, die Notiz, die Kontexte und Tags, das Start- und das Fälligkeitsdatum sowie die Priorität. **Abschließen** hakt die Aufgabe genauso ab wie der Ring im Aufgaben-Widget, mit demselben kurzen Fenster zum Rückgängigmachen. **Öffnen** bringt Sie zur Aufgabe in der App.

Auf Android wird die Zeile beim Tippen auf den Ring im Aufgaben-Widget sofort durchgestrichen. Tippen Sie innerhalb von etwa drei Sekunden erneut darauf, um den Abschluss rückgängig zu machen. Danach verschwindet die Zeile aus den Widgets Aufgaben und Kompakt und schafft Platz für die übrigen Aufgaben, ohne die App zu öffnen. Der Abschluss bleibt auf dem Gerät gespeichert, bis zur nächsten Hintergrundsynchronisierung oder bis Mindwtr das nächste Mal geöffnet wird, je nachdem, was zuerst eintritt; Mindwtr übernimmt ihn dann und synchronisiert ihn mit Ihren anderen Geräten.

Auf Android öffnen die Erfassungsschaltfläche in jedem der drei Widgets, die Schnelleinstellungskachel, die App-Verknüpfung und die Erfassungsbenachrichtigung dasselbe native schwebende Erfassungsfenster über dem, was Sie gerade tun, ohne die Haupt-App zu öffnen. **Speichern** legt die Aufgabe im Eingang ab, zeigt kurz eine Bestätigung und schließt das Fenster; Mindwtr übernimmt die Aufgabe danach im Hintergrund und synchronisiert sie mit Ihren anderen Geräten, ohne die App zu öffnen. Lässt Android diesen Hintergrundlauf nicht zu, erscheint die Aufgabe beim nächsten Öffnen von Mindwtr. iOS erfasst wie bisher über die App.

Bei aktivierter Spracherkennung erscheint auch eine Mikrofontaste in diesem nativen Android-Fenster. Nehmen Sie auf, tippen Sie auf Stopp und dann auf Speichern; die Haupt-App bleibt geschlossen. Aufnahmen werden auf dem Gerät gespeichert und beim nächsten Öffnen von Mindwtr oder bei der Rückkehr in den Vordergrund mit dem konfigurierten Anbieter transkribiert. F-Droid verwendet Offline-Whisper. Schlägt die Transkription fehl, bleibt die Aufnahme für einen weiteren Versuch erhalten. Die Aufnahme endet beim Verlassen des Fensters und ist auf fünf Minuten begrenzt.

Auf Android zeigen Fälligkeitsangaben **Heute**, den Wochentag für Aufgaben innerhalb der nächsten Woche oder ein kompaktes Datum im Datumsformat der App für spätere Aufgaben. Überfällige und heute fällige Aufgaben werden hervorgehoben.

Ab der nächsten Version lassen sich die Listen der Android-Widgets Aufgaben und Kompakt über 20 Aufgaben hinaus scrollen. Bei sehr langen Listen öffnet **Alle anzeigen** am Ende die vollständige ausgewählte Liste in Mindwtr. Eine Einstellung für die Anzahl der Aufgaben ist nicht nötig.

### iOS-Widget auf dem Home-Bildschirm

Wählen Sie **Aufgaben** für das reguläre Widget in klein, mittel oder groß (zusätzlich extragroß auf unterstützten iPads), oder **Kompakt** für kleinere Schrift und eine flache Fokusliste. Kompakt hat weder Listenauswahl noch Abschlussringe; mittlere und größere Varianten öffnen weiterhin Aufgaben und die Schnellerfassung.

Aufgaben und Kompakt zeigen zuerst Heutiger Fokus und Heute einschließlich überfälliger Aufgaben. Ist diese Liste leer, erscheinen stattdessen Nächste Aktionen; die kurze Überschrift Heute oder Nächste zeigt die aktuelle Liste an. Eine nicht leere Heute-Liste wird nicht mit nächsten Aktionen gemischt. Die Zeilenzahl passt sich an Widget- und Schriftgröße an. Das Aufgaben-Widget behält Datum, Prioritätsringe, Projekt oder Bereich sowie Filter, Design und Sortierung der App bei.

Ab iOS 17 wählen Sie durch langes Drücken auf das Aufgaben-Widget und **Widget bearbeiten** zwischen Fokus, Eingang, Nächste Aktionen, Warten auf, Irgendwann/Vielleicht und einem gespeicherten Filter. Mehrere Widgets können unterschiedliche Listen zeigen; eine ausdrücklich gewählte Liste außer Fokus wechselt nie automatisch zu einer anderen Liste. Ein Tippen auf einen Ring merkt den Abschluss vor; erneutes Tippen innerhalb von drei Sekunden macht ihn rückgängig. Danach wird die Zeile ausgeblendet und eine weitere zwischengespeicherte Aufgabe kann nachrücken. WidgetKit kann die sichtbare Aktualisierung verzögern. Der Abschluss bleibt sicher vorgemerkt, bis Mindwtr läuft und ihn speichert; Abschluss und Synchronisierung erfolgen über die App.

Die Überschrift, die Leeransicht und das kleine Widget öffnen beim Tippen die angezeigte Liste. Mittlere und größere Widgets öffnen einzelne Aufgaben in Mindwtr; **+** öffnet die Schnellerfassung. Die Ringe des kleinen Widgets sind ab iOS 17 bedienbar. Ältere iOS-Versionen verwenden das standardmäßige Heute/Nächste-Verhalten ohne direktes Abhaken oder Listenauswahl. WidgetKit bestimmt den Aktualisierungszeitpunkt. Sperrbildschirm-Widgets bleiben unverändert.

### iOS-Sperrbildschirm-Widget

Unter iOS 16 oder neuer zeigt Mindwtr die aktuelle Fokusaufgabe ohne Entsperren:

1. Sperrbildschirm lange drücken und **Anpassen** wählen
2. Widgetbereich auswählen und **Mindwtr Focus** hinzufügen
3. Rechteckiges Widget (oberste Fokusaufgabe), einzeiliges Widget über der Uhr oder runden Fokuszähler wählen

Alle öffnen beim Antippen „Fokus“ und folgen dem monochromen Sperrbildschirmstil.

### Android-Schnelleinstellungskachel

1. Bearbeitungsmodus der Android-Schnelleinstellungen öffnen
2. **Mindwtr**-Kachel hinzufügen
3. Kachel antippen, um dasselbe kleine Erfassungsfenster wie unter „Startbildschirm-Widget“ beschrieben zu öffnen

### Schnellerfassung in der Android-Benachrichtigungsleiste

Für Erfassung mit einem Wischen, auch vom Sperrbildschirm:

1. **Einstellungen → Benachrichtigungen** öffnen
2. **Schnellerfassung in der Benachrichtigungsleiste** aktivieren
3. Benachrichtigung jederzeit antippen, um dasselbe kleine Erfassungsfenster wie unter „Startbildschirm-Widget“ beschrieben zu öffnen

Die Benachrichtigung ist lautlos und bleibt unten. Deaktivieren Sie den Schalter zum Entfernen. iOS unterstützt keine dauerhaften Benachrichtigungen; verwenden Sie dort Widget oder Kurzbefehle.

### Android-Sprach-App-Aktionen

Android-Builds stellen unterstützten Assistenten (einschließlich Gemini-/Assistant-Oberflächen über Android App Actions) eine Erfassungsaktion bereit. Per Sprache erstellte Erfassungen öffnen einen Bestätigungsablauf für Titel und Notiz.

### Android-Systemsuche

Aktiviere **Einstellungen → Allgemein → In der Systemsuche anzeigen** (standardmäßig aus, Android 12+), damit die Systemsuche und kompatible Launcher deine Aufgaben, Projekte und Bereiche über den Titel finden. Der Index enthält nur Titel sowie minimale Status-, Fälligkeits- und Projekt-/Bereichs-Metadaten — niemals Beschreibungen, Notizen oder Anhänge — und nichts verlässt das Gerät. Ein Tipp auf ein Ergebnis öffnet das Element in Mindwtr; wird der Schalter deaktiviert, wird alles aus dem Index entfernt.

### Android-Intents zur Kontextautomatisierung

Automatisierungs-Apps wie Tasker, MacroDroid oder Phone Profiles können einen Mindwtr-Kontext aktivieren. Verwenden Sie für reine Hintergrundauslöser den Android-Broadcast. Mindwtr prüft passende, jetzt verfügbare `/next`-Aktionen und sendet nur bei vorhandener Arbeit eine Benachrichtigung. Diese öffnet die passende Kontextansicht.

| Feld | Wert |
| --- | --- |
| Paket | `tech.dongdongbh.mindwtr` |
| Klasse | `tech.dongdongbh.mindwtr.ContextAutomationReceiver` |
| Ziel | Broadcast Receiver |
| Aktivieren | `tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT` |
| Deaktivieren | `tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT` |
| String-Extra | `context=parents` oder `context=@parents` |

```bash
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT --es context parents
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT --es context parents
```

URL-Form:

| URL | Aktion |
| --- | --- |
| `mindwtr://contexts?token=%40parents&contextAction=activate` | `@parents` aktivieren |
| `mindwtr://contexts?token=%40parents&contextAction=deactivate` | `@parents` deaktivieren |

```bash
adb shell am start -a android.intent.action.VIEW -d 'mindwtr://contexts?token=%40parents&contextAction=activate' tech.dongdongbh.mindwtr
```

Hinweise:
- URLs können Mindwtr öffnen; verwenden Sie für den Hintergrund den Broadcast Receiver.
- Namen werden zu `@context` normalisiert; `parents` und `@parents` entsprechen `@parents`.
- Hierarchische Kontexte schließen Untergruppen ein; `@parents` entspricht auch `@parents/errands`.
- Ohne passende verfügbare `/next`-Aktionen bleibt Mindwtr lautlos.
- Deaktivierung ist derzeit eine lautlose wirkungslose Aktion. Sie bestätigt den Ausstiegsauslöser für einen künftigen aktiven Kontextstatus und löscht, verbirgt oder ändert keine Aufgaben.
- Unter Android kehrt Mindwtr nach Kontextautomatisierungs-URLs/-Intents in den Hintergrund zurück. Tippen Sie auf die Benachrichtigung, um die Kontextansicht zu öffnen.
- Mindwtr erkennt Orte oder Gerätezustände nicht selbst; die Automatisierungs-App bestimmt den Auslöser.

### Apple-Kurzbefehle

Auf iPhone und iPad stellt Mindwtr native Apple-Kurzbefehlsaktionen für Eingangserfassung und GTD-Ansichten wie Fokus, Warten, Irgendwann, Projekte, Durchsicht und Kalender bereit. Siehe [Apple-Kurzbefehle](/de/power-users/apple-shortcuts).

### Apple-Watch-App

Die native Apple-Watch-App wurde auf einer gekoppelten physischen Watch mit watchOS 10 oder neuer getestet und wird ab dem nächsten stabilen App-Store-Release enthalten sein. Installiere Mindwtr über die Watch-App auf dem iPhone auf der Watch.

- **Erfassen:** Tippe auf **Sprechen**, um Audio auf der Watch für die Transkription auf dem iPhone aufzunehmen. Tippe auf **Tippen**, um Text einzugeben; das iPhone kann seine Tastatur als optionale Eingabemethode anbieten. Die Erfassung landet im lokalen Mindwtr-Eingang; Cloud-Synchronisierung ist optional.
- **Fokus:** Prüfe Fokus-Aufgaben, schließe eine ab oder verschiebe sie auf morgen.
- **Pomodoro:** Starte und steuere den mit Mindwtr auf dem iPhone verknüpften Timer.

Die Watch hält Erfassungen bereit, wenn das iPhone nicht verfügbar ist, und übermittelt sie nach der erneuten Verbindung.

### URL-Schema-Schnellerfassung

Mindwtr registriert `mindwtr://` für iOS-Kurzbefehle, Tasker und andere Automatisierungen.

| URL | Aktion |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Erfassung mit Titel öffnen |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Mit Titel und Notiz öffnen |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Mit Projekt und Tags öffnen |

Hinweise:
- `title` ist erforderlich (Alias: `text`).
- `note` ist optional (Alias: `description`).
- `project` findet ein aktives Projekt ohne Beachtung der Groß-/Kleinschreibung oder erstellt es.
- `tags` ist kommagetrennt und wird vor dem Speichern in `#tag` normalisiert.

iOS-Kurzbefehlsbeispiel:
1. **Kurzbefehle** öffnen und Kurzbefehl erstellen.
2. **Nach Eingabe fragen** hinzufügen (Aufgabentitel).
3. **URLs öffnen** mit `mindwtr://capture?title=[Provided Input]`.
4. Ausführen; Mindwtr öffnet die Erfassung zur Prüfung.

### Syntax für „Schnell hinzufügen“

| Syntax | Beispiel | Ergebnis |
| ------------ | ----------------- | ------------------ |
| `@context` | `@home` | Kontext hinzufügen |
| `#tag` | `#focused` | Tag hinzufügen |
| `+Project` | `+HomeReno` | Projekt zuweisen |
| `+Multi Word` | `+New Project` | „New Project“ zuweisen |
| `+"Quoted Name"` | `+"New Project" call Bob` | Anführungszeichen begrenzen mehrteilige Namen (auch `!"Area Name"`) |
| `!Area` | `Plan roadmap !Work` | Bereich zuweisen |
| `%Person` | `Ask %Jim for budget` | „Zugewiesen an“ setzen (die Person, die die Aufgabe betrifft; der Status bleibt unverändert); `%"Full Name"` für neue mehrteilige Namen |
| `/area:<name>` | `/area:Personal` | Bereich zuweisen (ohne Leerzeichen) |
| `/due:date` | `/due:friday` | Fälligkeitsdatum |
| `/energy:<level>` | `/energy:medium` | Energie (`low`, `medium`, `high`) |
| `/priority:<level>` | `/priority:high` | Priorität (`low`, `medium`, `high`, `urgent`) |
| `/note:text` | `/note:call back` | Beschreibung |
| `/status` | `/next`, `/waiting`, `/someday`, `/reference`, `/done`, `/archived`, `/inbox` | Status |

**Datumsformate:** today, tomorrow, friday, next week, in 3 days, 2025-01-15, 26.06., 26.06.2026

Eine Datums- oder Zeitangabe am Ende der Eingabe wird zum Fälligkeitsdatum: `Grab a coffee with Marta Jun 23 6pm` erzeugt eine Aufgabe, fällig am 23. Juni um 18 Uhr. Die Erkennung liest nur das Ende des Textes, ein Titel wie "Review June report" bleibt also unverändert. Standardmäßig bleibt der Titel genau wie eingegeben; aktivieren Sie **Schnell-hinzufügen-Text bereinigen** (Einstellungen → GTD), um die erkannten Wörter zusätzlich zu entfernen, sodass "Grab a coffee with Marta" übrig bleibt. Deaktivieren Sie **Daten in natürlicher Sprache erkennen** (Einstellungen → GTD, standardmäßig aktiviert), damit Datumsangaben reiner Text bleiben und kein Datum gesetzt wird. Explizite Tokens wie `/due:friday` funktionieren unabhängig davon und haben Vorrang vor der Erkennung. Beide Einstellungen werden zwischen Ihren Geräten synchronisiert. Läuft die App auf Deutsch, Spanisch, Französisch, Italienisch, Japanisch, Niederländisch, Portugiesisch, Russisch, Schwedisch oder Chinesisch, werden auch Datumsangaben in dieser Sprache erkannt — englische Formulierungen funktionieren weiterhin in jeder Sprache.

---

## Audioerfassung

### Einrichtung

1. **Menü → Einstellungen → Erweitert → KI-Assistent**
2. **Sprache zu Text** aktivieren
3. **Anbieter**:
   - **OpenAI / Gemini**: Cloud, API-Schlüssel erforderlich
   - **Offline (Whisper)**: lokal; Modell (Tiny oder Base) in den Einstellungen laden
4. Unter **Einstellungen → Allgemein** gegebenenfalls Audio als **Standarderfassung** wählen

### Verwendung

- In der Schnellerfassung den Tab **Audio** öffnen
- Mikrofon zum Aufnehmen antippen
- Aufnahme stoppen, um sie zu transkribieren
- **Intelligent auswerten** extrahiert Daten und Felder automatisch

---

## Eingang

Ihre Erfassungszone. Verwenden Sie **Gedankensammlung** für geführte Fragen zu Beruf, Zuhause, Personen, Besorgungen und offenen Vorgängen.

### Aufgaben hinzufügen

1. Unteres Eingabefeld antippen
2. Teilen-Menü anderer Apps verwenden
3. Startbildschirm-Widget antippen
4. Aufgabe mit Schnell-hinzufügen-Syntax eingeben
5. Hinzufügen oder `Enter`

### Eingang verarbeiten

**Eingang verarbeiten** startet den Klärungsablauf:

1. **Ist eine Handlung erforderlich?**
   - Ja → weiter
   - Nein → Papierkorb oder Irgendwann/Vielleicht
2. **Weniger als 2 Minuten?**
   - Ja → sofort erledigen
   - Nein → weiter
3. **Wer sollte es erledigen?**
   - Ich → Kontext hinzufügen, Nächste Aktionen
   - Delegieren → Warten
4. **Wo?**
   - Kontexte auswählen (`@home`, `@work` usw.)
   - Eigene Kontexte hinzufügen
5. **Projekt zuweisen?** (optional)
   - Projekt wählen/überspringen
   - Oder **Ja, daraus ein Projekt machen** für mehrere Aktionen: Projekt benennen und nächste Aktion definieren. Weitere Aktionen landen mit Projekt im Eingang zur eigenen Klärung.

---

## Fokus

Das zentrale Dashboard zum Erledigen, kein vollständiger Bestand aller `next`-Aufgaben.

### Abschnitte

**Kommende Version:** Die Fokus-Abschnitte erscheinen in dieser Reihenfolge: **Heutiger Fokus → Heute → Nächste Aktionen → Durchsicht fällig → Anstehend**. **Nächste Aktionen gruppieren nach** betrifft nur „Nächste Aktionen“.

| Abschnitt | Inhalt |
| ------------ | ----------------------------------------------------------------------- |
| **Heutiger Fokus** | Für heute markierte Aufgaben, deren Starttag erreicht ist |
| **Heute** | Heute fällige, überfällige oder heute beginnende nächste Aktionen, auch später am Tag |
| **Nächste Aktionen** | Weitere verfügbare nächste Aktionen |
| **Durchsicht fällig** | Offene Verpflichtungen mit fälligem Wiedervorlagedatum; diese Erinnerungswarteschlange ist vom Wochenrückblick getrennt |
| **Anstehend** | Nächste Aktionen, die innerhalb von 7 Tagen starten oder wiederkehren; ein Stern merkt Aufgaben mit künftigem Start für ihren Starttag vor |

Zukünftig beginnende und spätere Aufgaben sequenzieller Projekte bleiben aus den ausführbaren Listen heraus. Eine markierte nächste Aktion mit künftigem Start bleibt bis zu ihrem Starttag unter **Anstehend** und wechselt dann automatisch in den heutigen Fokus, ohne vorher einen Fokusplatz zu belegen. Wiederkehrende Aufgaben ohne Startdatum bleiben reine Vorschau. Verwenden Sie **Kontexte**, **Projekte** oder die **Suche** für den vollständigen Bestand.

Standardsortierung: bald fällig, undatiert, weit in der Zukunft fällig; innerhalb einer Gruppe Priorität (wenn aktiviert), Startzeit, Erstellungsdatum, Titel und ID. Siehe [GTD-Arbeitsablauf](/de/use/gtd-workflow#how-focus-sorts-available-actions).

Das Listensymbol neben **Filter** in der Fokus-Kopfzeile schaltet **Details** um: ausgeschaltet zeigt jede Zeile nur noch ihren Titel, ohne Beschreibungsvorschau und Metadatenzeile — jedes Gerät merkt sich die Auswahl.

### Funktionen

- **Kontextfilter**: Tippen Sie auf einen Kontextchip, um die Liste der Nächsten Aktionen zu filtern.
- **Gespeicherte Filter** für Projekte, Kontexte, Tags, Priorität, Energie und Zeitschätzungen
- **Zum Fokus wischen**: nach rechts wischen, um den Fokusstatus umzuschalten und die Aufgabe nach „Heute“ zu verschieben
- **Langes Drücken für ein Startdatum**: Drücken Sie lange auf eine Aufgabe, um ihr Startdatum zu setzen: **Heute**, **Morgen**, **Nächste Woche** oder ein eigenes Datum. **Heute** ordnet die Aufgabe unter Heute ein, ohne sie als Fokus des Tages zu markieren. Ein späteres Datum nimmt sie bis zu diesem Tag aus den Aktionslisten. Einer Aufgabe mit Fälligkeitsdatum werden nur Startdaten bis zu diesem Datum angeboten, und eine heute fällige oder überfällige Aufgabe hat kein Menü.
- **Schnellstatus**: Statusplakette antippen
- **Pomodoro (optional)** unter **Einstellungen → GTD → Funktionen → Pomodoro-Zeitgeber**; **Nur Zeitgeber** oder **Zeitgeber mit Aufgabe verknüpfen**, um die Aufgabenauswahl des Zeitgebers und die Aktion **Aufgabe als erledigt markieren** anzuzeigen. Eingeklappt zeigt eine schmale Zeile Restzeit, Phase und den Status **Läuft** oder **Pausiert**.

---

## Durchsicht

Aufgaben prüfen und Status aktualisieren:

- Details ansehen
- schnell erledigen
- zwischen Aufgaben navigieren
- im **Auswahlmodus** mehrere Aufgaben organisieren, verschieben, taggen, teilen oder löschen
- im Wochenrückblick zuerst über **Eingang verarbeiten** die Erfassungen klären

---

## Aufgabeneditor (Aufgabe + Ansicht)

Zwei Modi:

- **Aufgabe**: Felder, Checklisten, Daten, Tags und Kontexte bearbeiten
- **Ansicht**: aufgeräumte schreibgeschützte Zusammenfassung mit antippbarer Checkliste

Wischen Sie links/rechts zum Wechsel.

Unter **Einstellungen → GTD → Aufgabeneditor → Aufgaben öffnen in** wählen Sie den Startmodus für dieses Gerät:

- **Automatisch** (Standard): im Eingang Bearbeiten, in anderen Listen Vorschau.
- **Vorschau**: zuerst die Aufgabe lesen.
- **Bearbeiten**: direkt die Felder anzeigen. Die Tastatur öffnet sich erst beim Antippen eines Feldes.

Android und iOS verhalten sich gleich. Ausdrückliche Bearbeiten-Aktionen öffnen weiterhin den Editor; schreibgeschützte Aufgaben bleiben in der Vorschau. Ein Tabwechsel bei einer Aufgabe ändert diese Einstellung nicht.

Der Editor beginnt minimalistisch; **Weitere Optionen** zeigt erweiterte Felder. Felder mit Inhalt bleiben sichtbar.

Beschreibungs-Markdown unterstützt Listen und Kontrollkästchen (`- item`, `[ ] item`, `[x] item`). `[[` öffnet in Beschreibungen/Projektnotizen die Verknüpfungsauswahl. Links dienen nur der Navigation; Markdown-Kontrollkästchen beeinflussen die Aufgabencheckliste nicht. Mehrzeiliges Einfügen in einen Checklistenpunkt erzeugt einen Punkt je Zeile (Aufzählungen, Nummerierungen, `[x]` werden erkannt).

**Verantwortliche Person** speichert die Person, die eine Aufgabe betrifft (delegiert, erwartet oder zu besprechen), für die Personen-Ansicht, Vorschläge und die `assigned:`-Suche. Gespeicherte Personen, Notizen und Referenzlinks verwalten Sie unter **Einstellungen → Verwalten**.

Wiederholungsstrategien:
- **Streng** (fester Rhythmus)
- **Nach Abschluss wiederholen**
- **Endet: Nie / Am Datum / Nach N Vorkommen**

In Aufgabenlisten bleibt das Wiederholungssymbol auch bei ausgeblendeten Details sichtbar; die vollständige Beschreibung des Wiederholungsplans erscheint in den Aufgabendetails.

Mindwtr hält eine aktive Instanz. Der Kalender zeigt diese aktive Instanz, wenn sie ein Fälligkeitsdatum oder eine Startzeit hat. Zukünftige Vorkommen werden bis zum Abschluss nicht vorab angelegt, außer als Planungsvorschau mit **Künftige Wiederholungen im Kalender anzeigen**. Im Wiederholungsfeld können Sie Strategie, Vorschau und Serienende festlegen.

### Anhänge

Dateien und Links können im Editor angehängt werden. Audionotizen lassen sich bei aktivierter Option **Audioanhänge speichern** bewahren. Siehe [Anhänge](/de/use/attachments).

---

## KI-Assistent (optional)

Unter **Einstellungen → Erweitert → KI-Assistent**:

- **Klären**: unklare Aufgaben konkretisieren
- **Aufteilen**: Checklisten erzeugen
- **Durchsichtsanalyse**: veraltete Aufgaben hervorheben
- **Copilot**: Kontext-/Tag-/Zeitvorschläge

KI läuft nur auf Anforderung.

---

## Wiederverwendbare Listen

- **Aufgabe duplizieren**: Stammliste kopieren
- **Checkliste zurücksetzen**: alle Punkte abwählen

---

## Kalenderintegration

Mindwtr kann externe Kalender überlagern und datierte Aufgaben in den Gerätekalender übertragen. Einzelheiten: [Kalenderintegration](/de/use/calendar-integration).

Aufgaben in Android-/Google- oder iOS-/Apple-Kalender übertragen:

1. **Menü → Einstellungen → Erweitert → Kalender**
2. **Aufgaben in Kalender übertragen** aktivieren
3. Berechtigung erteilen
4. **Synchronisierungsziel** öffnen
5. Eigenen `Mindwtr`-Kalender oder anderes beschreibbares Ziel wählen

Hinweise zur Einrichtung von Google Kalender unter Android und Apple Kalender unter iOS finden Sie unter [Kalenderintegration](/de/use/calendar-integration).

ICS-Abonnements:

1. **Menü → Einstellungen → Erweitert → Kalender**
2. **ICS-URL** hinzufügen
3. Termine aktualisieren

Externe Termine sind schreibgeschützt. Über **Aufgabe erstellen** entsteht eine separate Mindwtr-Aufgabe mit, sofern verfügbar, Titel, Datum/Uhrzeit, Ort, Beschreibung und Kalendername.

---

## Kalender

### Ansichten

- **Monatsansicht**: Aufgaben mit Fälligkeitsdaten
- **Tagesansicht**: Zeitachse mit geplanten Aufgaben und externen Terminen

### Aufgaben planen

1. In der Tagesansicht **Aufgaben planen** antippen
2. Nächste Aktionen wählen oder Todo-Aufgaben suchen
3. Mindwtr findet das früheste freie Zeitfenster und vermeidet Konflikte mit sichtbaren externen Terminen und geplanten Aufgaben
4. Startzeit richtet sich nach der Zeitschätzung

Das Planungsfeld wandelt ungeplante nächste Aktionen oder fällige ungeplante Arbeit in konkrete Zeitblöcke um. Klappen Sie es für mehr Kalenderplatz ein.

### Durch Ziehen umplanen

- Geplanten Aufgabenblock lange drücken
- Auf neue Zeit ziehen (5-Minuten-Raster)
- Loslassen, um Startzeit zu aktualisieren

### Externe Kalender (iCal/ICS)

1. **Menü → Einstellungen → Erweitert → Kalender**
2. ICS-/webcal-URL eingeben
3. Namen vergeben und **Hinzufügen**
4. Termine erscheinen grau in der Tagesansicht

---

## Projekte

Unter **Menü → Projekte**.

### Projektliste

- aktive Projekte anzeigen
- Aufgabenanzahl sehen
- Details antippen
- Stern antippen, um ein Projekt als Priorität zu markieren (höchstens fünf). Markierte Projekte stehen in ihrem Bereich oben. Die übrigen folgen der auf dem Desktop per Ziehen festgelegten Reihenfolge, dann dem Namen; auf dem Telefon gibt es kein Ziehen und Ablegen

### Projektdetails

- Alle Aufgaben im Projekt anzeigen
- Referenzmaterial des Projekts in einem **Referenz**-Abschnitt unter der Aufgabenliste sehen — auch Referenzen, deren Tags mit den Projekt-Tags übereinstimmen
- Neue Aufgaben hinzufügen
- Mit **Abschnitten** gruppieren (Überschriften, keine Unteraufgaben/Projekte)
- Aufgabe antippen, um **Abschnitt** zuzuweisen
- Name, Farbe, Notizen bearbeiten
- **Fokusbereich** zuweisen
- **Projekt-Tags** hinzufügen
- Sequenziellen oder parallelen Modus festlegen
- Wiedervorlagedatum festlegen
- Aufgaben bei eigener Sortierung am Griff verschieben; unter eine Abschnittsüberschrift ziehen, um zuzuweisen, oder oberhalb der ersten ablegen, um den Abschnitt zu entfernen
- Projekt über **Aktionen** in den Projektdetails abschließen; übrige Aufgaben werden mit abgeschlossen, das Projekt wandert in den Abschnitt **Abgeschlossen** am Ende der Projektliste, und **Reaktivieren** macht dies rückgängig
- Projekt duplizieren — Projektzeile in der Liste nach rechts wischen oder **Duplizieren** in der Projektdetailansicht verwenden —, um Abschnitte und Aufgaben in eine frische Kopie zu übernehmen (siehe [Wiederverwendbare Listen](/de/use/reusable-lists))

**Projektabschnitt** ist nur bei Aufgaben in Projekten mit Abschnitten relevant.

### Sequenziell und parallel

| Modus | Verhalten |
| -------------- | ---------------------------------------------------- |
| **Sequenziell** | Nur erste verfügbare Projektaufgabe in „Fokus“ |
| **Parallel** | Alle verfügbaren Projektaufgaben können erscheinen |

Sequenzielle Projekte können projektweit oder je Abschnitt laufen. Abschnittsweise wird die erste verfügbare Aufgabe jedes Abschnitts gezeigt.

---

## Wischaktionen

| Ansicht | Nach rechts | Ergebnis |
| ---------------- | ----------- | ------------------ |
| **Eingang** | Erledigt | Aufgabe abschließen |
| **Fokus** | Fokus | Fokusstatus umschalten |

Beim Abschluss wird die aktuelle Zeit gespeichert. Wenn Sie früher fertig waren, drücken Sie eine **Erledigt**-Steuerung lange, um die tatsächliche Zeit zu wählen (Wischschaltfläche, Statusmenü, Editor-Chip oder Vorschauplakette). Der Zeitstempel **Abgeschlossen** lässt sich später ebenfalls korrigieren.

---

## Kontexte

### Ortskontexte

- `@home`: zu Hause
- `@work`: Büro
- `@errands`: unterwegs
- `@agendas`: Gesprächspunkte
- `@computer`: Computer nötig
- `@phone`: Telefon nötig
- `@anywhere`: überall

### Tags

- `#focused`: konzentrierte Arbeit
- `#lowenergy`: einfache Aufgaben
- `#creative`: Ideenfindung
- `#routine`: wiederholte/mechanische Aufgaben

---

## Warten

Ab der nächsten Version erscheint der Name der zugewiesenen Person direkt in der Liste „Warten“, auch wenn zusätzliche Details ausgeblendet sind.

- alle wartenden Aufgaben anzeigen
- Fristen sehen
- bei Bereitschaft nach „Nächstes“ verschieben
- bei Erhalt erledigen

---

## Irgendwann/Vielleicht

Ab v1.3.1: Ordnen Sie Aufgaben direkt in dieser Liste in Irgendwann-Abschnitte ein.

- Öffnen Sie das Menü einer Aufgabe und wählen Sie **In Abschnitt verschieben…**.
- Wählen Sie mehrere Aufgaben aus, um sie mit derselben Aktion gemeinsam zu verschieben. Die Auswahl enthält leere Abschnitte, **Kein Abschnitt** und **Neuer Abschnitt…**.
- Erstellen Sie mit **Neuer Abschnitt…** in der Liste eine Überschrift. Bei Gruppierung nach Irgendwann-Abschnitt erstellt **Aufgabe hinzufügen** an einer Überschrift eine Aufgabe in diesem Abschnitt.
- Nach dem Speichern können Sie die Verschiebung **rückgängig machen**. Status, Projekt, Projektabschnitt und Termine bleiben erhalten. Namen und Reihenfolge der Abschnitte verwalten Sie unter **Einstellungen → Verwalten**.

- im Wochenrückblick regelmäßig prüfen
- durch Verschieben nach „Nächstes“ aktivieren
- archivieren, wenn nicht mehr relevant

---

## Benachrichtigungen und Erinnerungen

### Arten von Benachrichtigungen

- **Fälligkeitserinnerungen**
- **Startzeitwarnungen**
- **Erinnerungen an wiederkehrende Aufgaben**

Bei Aufgaben mit Fälligkeitszeit kann **Erinnerung wiederholen** nach der ersten Fälligkeitserinnerung alle 5, 10, 15, 30 oder 60 Minuten erneut erinnern. **Erinnerungen überspringen** schaltet Start- und Fälligkeitserinnerungen für diese Aufgabe aus. **Erinnerung wiederholen: Aus** schaltet die erste Fälligkeitserinnerung nicht aus.

### Eine Aufgabenerinnerung testen

1. Eine Aufgabe bearbeiten und die **Fälligkeit** auf eine Uhrzeit in wenigen Minuten setzen. **Nur Datum** erzeugt keine zeitgesteuerte Benachrichtigung.
2. **Erinnerungen überspringen** prüfen: **Aus** erlaubt Benachrichtigungen für diese Aufgabe, **An** überspringt sie. In älteren Versionen bedeutet der blaue Rahmen um diese Option **An**.
3. **Speichern** tippen. Unter **Einstellungen → Benachrichtigungen** Aufgaben- und Fälligkeitserinnerungen aktivieren. Auf iOS Mindwtr-Benachrichtigungen auch in den Geräteeinstellungen erlauben.
4. Bis zur Fälligkeitszeit warten. Wurde die Aufgabe auf einem anderen Gerät geändert, Mindwtr auf diesem Telefon öffnen, damit die neue Zeit vorher synchronisiert wird.

Tippen auf den Benachrichtigungstext öffnet **Durchsicht**.

Erinnerungen werden auf dem Telefon geplant; es gibt keinen Push-Server. Wenn Sie eine Aufgabe auf einem anderen Gerät abschließen oder umplanen, aktualisiert das Telefon seine Alarme nach der Synchronisierung. Lassen Sie es daher vor der nächsten Erinnerung synchronisieren (einmaliges Öffnen genügt).

### Berechtigungen

1. Geräte-**Einstellungen → Apps → Mindwtr**
2. **Benachrichtigungen** aktivieren
3. Warnungen und Töne nach Wunsch erlauben

### Verspätete Erinnerungen unter Android

Ab Android 12 kann das System die Berechtigung für exakte Alarme verweigern. Ohne sie können Erinnerungen verspätet eintreffen; eine Grenze von einer Minute gibt es nicht. Unter **Einstellungen → Benachrichtigungen** zeigt Mindwtr den Hinweis **Erinnerungen kommen möglicherweise zu spät** mit **Zulassen**. Die Erklärung für Pomodoro steht direkt unter dem Schalter für Hinweise am Timerende, mit einer Aktion zum Öffnen der Android-Einstellungen. Der Schalter bestimmt, ob der Timer benachrichtigt; die Android-Berechtigung betrifft den Zeitpunkt. Die Hilfe erscheint nur bei eingeschalteten Pomodoro-Hinweisen und fehlender Berechtigung.

Tippen Sie auf **Zulassen**, um den Android-Berechtigungsbildschirm für Mindwtr zu öffnen. Sie erreichen ihn auch über die Geräte-**Einstellungen → Apps → Mindwtr → Wecker und Erinnerungen**. Sobald die Berechtigung erteilt ist, plant Mindwtr die Erinnerungen ohne Neustart als exakte Alarme neu, und die Zeile verschwindet. Vor Android 12 erscheint die Zeile nicht, denn dort ist bereits jeder Alarm exakt.

---

## Einstellungen

### Allgemein

- **Darstellung**: System, Hell, Dunkel, Material 3 (Hell), Material 3 (Dunkel), E-Ink, Nord, Catppuccin Macchiato, Dracula, Sepia oder OLED / Mitternacht. **System (Hell / OLED Dunkel)** verwendet bei hellem Systemdesign das normale helle Design und bei dunklem das OLED-Design. **OLED / Mitternacht** bleibt unabhängig vom Systemdesign schwarz.
- **Sprache**: Englisch, Chinesisch (vereinfacht), Chinesisch (traditionell), Hindi, Spanisch, Arabisch, Französisch, Portugiesisch (Brasilien), Russisch, Deutsch, Japanisch, Persisch, Vietnamesisch, Türkisch, Koreanisch, Italienisch, Polnisch, Niederländisch, Tschechisch, Schwedisch, Dänisch, Ungarisch, Ukrainisch

### Benachrichtigungen

**Aufgabenerinnerungen:**
- Benachrichtigungen für Fälligkeitstermine und Startzeiten aktivieren/deaktivieren

**Tägliche Übersicht:**

Morgenübersicht und Abenddurchsicht haben eigene Schalter. Sie funktionieren auch bei ausgeschalteten **Aufgabenerinnerungen**; die Benachrichtigungsberechtigung ist weiterhin erforderlich.

- **Morgenübersicht**: Zusammenfassung der heute fälligen, überfälligen und Fokusaufgaben
- **Abenddurchsicht**: Aufforderung, den Tag durchzusehen und abzuschließen
- Zeiten für beide festlegen

**Wochenrückblick:**
- **Erinnerungen**: Wöchentliche Benachrichtigung zum Start des Rückblicks erhalten
- **Uhrzeit/Tag**: Gewünschten Zeitpunkt für den Rückblick festlegen (z. B. Freitag um 16 Uhr)

### GTD

**Optionale Funktionen:**
- **Prioritäten**
- **Zeitschätzungen**: Der Aufgabeneditor listet die Standarddauern sowie eine Auswahl **Benutzerdefiniert**, in der Sie eine eigene Dauer eingeben, zum Beispiel `2h30`. Es gibt keine Einstellung dafür, welche Dauern aufgeführt werden.

**Automatisch archivieren:**
- Erledigte Aufgaben nach einer festgelegten Anzahl von Tagen archivieren (Standard: 7). Wenn Sie die Verzögerung verkürzen, werden vorhandene Erledigt-Aufgaben, die nun älter als der neue Grenzwert sind, sofort archiviert. Ansonsten läuft die Prüfung bei jedem Start der App, und wenn Sie die Abschlusszeit einer Aufgabe auf einen Zeitpunkt vor dem Grenzwert korrigieren, wird sie sofort archiviert.
- **Nie** für unbegrenzte Erledigt-Liste

**Eingangsverarbeitung:**
- Mobiler kartenbasierter Ablauf
- Gemeinsame Einstellungen steuern 2-Minuten-Abkürzung, frühe Projektfrage, Kontexte/Tags, Planung und Referenz

**Layout des Aufgabeneditors:**
- **Aufgaben öffnen in** legt fest, welchen Tab ein normales Tippen auf eine Aufgabe öffnet: **Automatisch** (Bearbeiten aus dem Eingang, sonst Vorschau), **Vorschau** oder **Bearbeiten**. Eine schreibgeschützte Aufgabe öffnet immer die Vorschau, eine ausdrückliche Bearbeiten-Aktion immer die Bearbeitung. Die Wahl bleibt auf diesem Gerät und wird nicht synchronisiert
- Felder ein-/ausblenden (mit Wert bleiben sie sichtbar)
- Griff lange drücken zum Sortieren
- Zwischen **Grundlagen**, **Planung**, **Organisation**, **Details** verschieben
- standardmäßig geöffnete Abschnitte wählen
- ausgeblendete Felder über **Mehr**

**Verwalten:**
- Unter **Einstellungen → Verwalten** **Bereiche**, **Personen**, **Kontexte**, **Tags** bearbeiten
- Duplikate bereinigen oder Metadaten umbenennen
- Siehe [Bereiche und Personen](/de/use/areas-people)

### Daten und Synchronisierung

Einrichtung: [Daten und Synchronisierung](/de/data-sync/).

**Backend:**
- **Cloud-Synchronisierung**: Dropbox in unterstützten Builds, iCloud auf unterstütztem iOS
- **Ordner-/Dateisynchronisierung**: gemeinsame JSON-Datei/Ordner
- **Erweitert / Eigener Server**: WebDAV oder selbst gehostete Mindwtr Cloud

**Weitere Optionen:**
- **Synchronisieren**: manuell auslösen
- **Letzter Status**
- **Verlauf**: standardmäßig eingeklappt
- **Sicherung exportieren**
- **Mindwtr-CSV exportieren**: Tabellenfreundliche Aufgabendatei, die ohne Duplikate erneut importiert werden kann
- **TaskNotes exportieren**: Eine Markdown-Datei pro Aufgabe in einem ZIP für das Obsidian-TaskNotes-Plugin
- **Apple-Erinnerungen-Import**: Liste wählen und unerledigte Erinnerungen importieren; sie bleiben in Apple Erinnerungen, sofern Sie nicht **Importierte Erinnerungen löschen** einschalten. Bereits importierte, erledigte oder titellose werden übersprungen. Der Schalter **Automatisch importieren** führt den Import bei jedem Öffnen von Mindwtr aus.
- **Synchronisierte Einstellungen**: Darstellung, Sprache/Datumsformat, GTD-Standardwerte, externe Kalender-URLs, KI-Einstellungen, gespeicherte Filter; niemals API-Schlüssel, eigene KI-Endpunkt-URLs (auch die für Sprache zu Text), zusätzliche Anfrageparameter oder lokale Modellpfade — einen eigenen Endpunkt tragen Sie auf jedem Gerät einmal ein

**GTD-Optionen:**
- **Fokusaufgabenlimit**: Festlegen, wie viele Aufgaben für den heutigen Fokus markiert werden können

### Erweitert

**KI-Assistent:**
- Optionaler BYOK-Assistent zum Klären und Aufteilen von Aufgaben

**Kalender (ICS/iCal):**
- **Kalender hinzufügen**: Namen und URL eingeben
- **Aktivieren/Deaktivieren**: Sichtbarkeit jedes Kalenders umschalten
- **Entfernen**: Ein Abonnement löschen
- **Testen**: Prüfen, ob der Kalender korrekt geladen wird

### Über

- Versionsnummer
- Nach Aktualisierungen suchen
- **Feedback senden**, sofern aktiviert; optionale Antwort-E-Mail
- Website- und GitHub-Links
- Link zur Datenschutzerklärung

---

## Siehe auch

- [Mobile Installation](/de/start/mobile-installation)
- [Apple-Kurzbefehle](/de/power-users/apple-shortcuts)
- [Daten und Synchronisierung](/de/data-sync/)
- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
