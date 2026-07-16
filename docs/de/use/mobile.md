# Benutzerhandbuch: Mobilgeräte

Die mobile Mindwtr-App basiert auf React Native und Expo. Android wird vollständig unterstützt; iOS ist im App Store und als TestFlight-Beta verfügbar.

## Überblick

Die App verwendet untere Tabs für zentrale Abläufe und eine Menüseite für weitere Ansichten.

---

## Interaktionsmuster

- **Tippen**, um Aufgaben zu öffnen und zu bearbeiten
- **Wischen** für Schnellaktionen (siehe unten)
- Über das **Teilen-Menü** Einträge direkt zum Posteingang hinzufügen

## Navigation

### Untere Tabs

| Tab | Beschreibung |
| -------------- | ------------------------------------ |
| 📥 **Posteingang** | Eingehende Einträge erfassen und verarbeiten |
| 🎯 **Fokus** | Tagesdashboard und nächste Aktionen |
| ➕ **Schnellerfassung** | Aufgabe oder Audionotiz schnell hinzufügen |
| 📝 **Durchsicht** | Tägliche Durchsicht + Wochenrückblick |
| ☰ **Menü** | Projekte, Board, Kalender usw. öffnen |

### Tab „Menü“

Tippen Sie auf **Menü**, um weitere Ansichten zu öffnen:

- 📋 **Board**: Kanban-Board mit manueller Ziehreihenfolge, Suche und Kontext-/Tag-/Datums-/Projektfiltern
- 🗓️ **Kalender**: zeitbasierte Ansicht
- 📁 **Projekte**: mehrstufige Ergebnisse
- 🏷️ **Kontexte**: nach Kontext filtern
- ⏳ **Warten**: delegierte Einträge
- 💭 **Irgendwann/Vielleicht**: zukünftige Ideen
- 📚 **Referenz**: Referenzmaterial
- ✅ **Erledigt**: kürzlich abgeschlossene Aufgaben
- 📦 **Archiviert**: abgelegte abgeschlossene Aufgaben
- 🗑️ **Papierkorb**: gelöschte Aufgaben und Projekte
- ⚙️ **Einstellungen**: App-Einstellungen

Öffnen Sie **Archiviert** und tippen Sie auf **Auswählen**, um mehrere Aufgaben zu verwalten. Wählen Sie Aufgaben oder **Alle auswählen** und stellen Sie sie im Posteingang wieder her oder verschieben Sie sie in den Papierkorb. Endgültig gelöscht wird nur aus dem Papierkorb.

Öffnen Sie **Papierkorb** und tippen Sie auf **Auswählen**, um mehrere gelöschte Aufgaben und Projekte gemeinsam wiederherzustellen oder endgültig zu löschen. Endgültiges Löschen verlangt immer eine Bestätigung.

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
| `assigned:` | `assigned:Tom` | Nach verantwortlicher Person filtern |
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

### Teilen-Menü

1. In einer App (Browser, E-Mail, Notizen) Inhalt auswählen
2. **Teilen** antippen
3. **Mindwtr** wählen
4. Die Erfassungsansicht öffnet sich mit dem Inhalt als Notiz
5. Titel/Felder anpassen und im Posteingang speichern

Beim Teilen einer Datei (PDF, Bild, Video oder Audioaufnahme) wird sie als Anhang der neuen Aufgabe in Mindwtr kopiert; der Dateiname wird zum Anfangstitel. Bis zu sechs Dateien können gleichzeitig geteilt werden.

Geeignet für:
- Artikel zum späteren Lesen
- E-Mails als Aufgaben
- Links aus dem Browser
- PDF oder Foto als später zu verarbeitende Posteingangsaufgabe

### Startbildschirm-Widget

1. Startbildschirm lange drücken
2. **Widgets** wählen
3. **Mindwtr** hinzufügen
4. Widget für Schnellerfassung oder Fokuseinträge antippen

### iOS-Sperrbildschirm-Widget

Unter iOS 16 oder neuer zeigt Mindwtr die aktuelle Fokusaufgabe ohne Entsperren:

1. Sperrbildschirm lange drücken und **Anpassen** wählen
2. Widgetbereich auswählen und **Mindwtr Focus** hinzufügen
3. Rechteckiges Widget (oberste Fokusaufgabe), einzeiliges Widget über der Uhr oder runden Fokuszähler wählen

Alle öffnen beim Antippen „Fokus“ und folgen dem monochromen Sperrbildschirmstil.

### Android-Schnelleinstellungskachel

1. Bearbeitungsmodus der Android-Schnelleinstellungen öffnen
2. **Mindwtr**-Kachel hinzufügen
3. Kachel für Schnellerfassung antippen

### Schnellerfassung in der Android-Benachrichtigungsleiste

Für Erfassung mit einem Wischen, auch vom Sperrbildschirm:

1. **Einstellungen → Benachrichtigungen** öffnen
2. **Schnellerfassung in der Benachrichtigungsleiste** aktivieren
3. Benachrichtigung jederzeit antippen

Die Benachrichtigung ist lautlos und bleibt unten. Deaktivieren Sie den Schalter zum Entfernen. iOS unterstützt keine dauerhaften Benachrichtigungen; verwenden Sie dort Widget oder Kurzbefehle.

### Android-Sprach-App-Aktionen

Android-Builds stellen unterstützten Assistenten (einschließlich Gemini-/Assistant-Oberflächen über Android App Actions) eine Erfassungsaktion bereit. Per Sprache erstellte Erfassungen öffnen einen Bestätigungsablauf für Titel und Notiz.

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

Auf iPhone und iPad stellt Mindwtr native Apple-Kurzbefehlsaktionen für Posteingangserfassung und GTD-Ansichten wie Fokus, Warten, Irgendwann, Projekte, Durchsicht und Kalender bereit. Siehe [Apple-Kurzbefehle](/de/power-users/apple-shortcuts).

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
| `%Person` | `Ask %Jim for budget` | „Zugewiesen an“ setzen; `%"Full Name"` für neue mehrteilige Namen |
| `/area:<name>` | `/area:Personal` | Bereich zuweisen (ohne Leerzeichen) |
| `/due:date` | `/due:friday` | Fälligkeitsdatum |
| `/energy:<level>` | `/energy:medium` | Energie (`low`, `medium`, `high`) |
| `/note:text` | `/note:call back` | Beschreibung |
| `/status` | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Status |

**Datumsformate:** today, tomorrow, friday, next week, in 3 days

---

## Audioerfassung

### Einrichtung

1. **Menü → Einstellungen → KI-Assistent**
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

## Posteingang

Ihre Erfassungszone. Verwenden Sie **Gedankensammlung** für geführte Fragen zu Beruf, Zuhause, Personen, Besorgungen und offenen Vorgängen.

### Aufgaben hinzufügen

1. Unteres Eingabefeld antippen
2. Teilen-Menü anderer Apps verwenden
3. Startbildschirm-Widget antippen
4. Aufgabe mit Schnell-hinzufügen-Syntax eingeben
5. Hinzufügen oder `Enter`

### Posteingang verarbeiten

**Posteingang verarbeiten** startet den Klärungsablauf:

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
   - Oder **Ja, daraus ein Projekt machen** für mehrere Aktionen: Projekt benennen und nächste Aktion definieren. Weitere Aktionen landen mit Projekt im Posteingang zur eigenen Klärung.

---

## Fokus

Das zentrale Dashboard zum Erledigen, kein vollständiger Bestand aller `next`-Aufgaben.

### Abschnitte

| Abschnitt | Inhalt |
| ------------ | ----------------------------------------------------------------------- |
| **Heute** | Heute fokussierte, heute fällige/überfällige oder heute beginnende Aufgaben |
| **Nächstes** | Verfügbare, nicht blockierte oder zurückgestellte nächste Aktionen |

Zukünftig beginnende und spätere Aufgaben sequenzieller Projekte werden ausgeblendet. Verwenden Sie **Kontexte**, **Projekte** oder die **Suche** für den vollständigen Bestand.

Standardsortierung: bald fällig, undatiert, weit in der Zukunft fällig; innerhalb einer Gruppe Priorität (wenn aktiviert), Startzeit, Erstellungsdatum, Titel und ID. Siehe [GTD-Arbeitsablauf](/de/use/gtd-workflow#how-focus-sorts-available-actions).

### Funktionen

- **Kontextfilter**
- **Gespeicherte Filter** für Projekte, Kontexte, Tags, Priorität, Energie und Zeitschätzungen
- **Zum Fokus wischen**: nach rechts wischen, um Fokusstatus umzuschalten
- **Schnellstatus**: Statusplakette antippen
- **Pomodoro (optional)** unter **Einstellungen → GTD → Funktionen → Pomodoro-Zeitgeber**; **Nur Zeitgeber** oder mit **Zeitgeber mit Aufgabe verknüpfen**

---

## Durchsicht

Aufgaben prüfen und Status aktualisieren:

- Details ansehen
- schnell erledigen
- zwischen Aufgaben navigieren
- im **Auswahlmodus** mehrere Aufgaben teilen
- im Wochenrückblick zuerst über **Posteingang verarbeiten** die Erfassungen klären

---

## Aufgabeneditor (Aufgabe + Ansicht)

Zwei Modi:

- **Aufgabe**: Felder, Checklisten, Daten, Tags und Kontexte bearbeiten
- **Ansicht**: aufgeräumte schreibgeschützte Zusammenfassung mit antippbarer Checkliste

Wischen Sie links/rechts zum Wechsel. Checklistenorientierte Aufgaben öffnen standardmäßig die Ansicht.

Der Editor beginnt minimalistisch; **Weitere Optionen** zeigt erweiterte Felder. Felder mit Inhalt bleiben sichtbar.

Beschreibungs-Markdown unterstützt Listen und Kontrollkästchen (`- item`, `[ ] item`, `[x] item`). `[[` öffnet in Beschreibungen/Projektnotizen die Verknüpfungsauswahl. Links dienen nur der Navigation; Markdown-Kontrollkästchen beeinflussen die Aufgabencheckliste nicht. Mehrzeiliges Einfügen in einen Checklistenpunkt erzeugt einen Punkt je Zeile (Aufzählungen, Nummerierungen, `[x]` werden erkannt).

**Verantwortliche Person** speichert delegierte Personen für Warten, Vorschläge und `assigned:`-Suche. Gespeicherte Personen, Notizen und Referenzlinks verwalten Sie unter **Einstellungen → Verwalten**.

Wiederholungsstrategien:
- **Streng** (fester Rhythmus)
- **Nach Abschluss wiederholen**
- **Endet: Nie / Am Datum / Nach N Vorkommen**

Mindwtr hält eine aktive Instanz. Zukünftige Vorkommen werden bis zum Abschluss nicht vorab angelegt, außer als Planungsvorschau mit **Nächstes Vorkommen im Kalender anzeigen**. Im Wiederholungsfeld können Sie Strategie, Vorschau und Serienende festlegen.

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

1. **Einstellungen → Kalender**
2. **Aufgaben in Kalender übertragen** aktivieren
3. Berechtigung erteilen
4. **Synchronisierungsziel** öffnen
5. Eigenen `Mindwtr`-Kalender oder anderes beschreibbares Ziel wählen

Hinweise zur Einrichtung von Google Kalender unter Android und Apple Kalender unter iOS finden Sie unter [Kalenderintegration](/de/use/calendar-integration).

ICS-Abonnements:

1. **Einstellungen → Kalender**
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
3. Mindwtr findet das früheste freie Zeitfenster
4. Startzeit richtet sich nach der Zeitschätzung

Das Planungsfeld wandelt ungeplante nächste Aktionen oder fällige ungeplante Arbeit in konkrete Zeitblöcke um. Klappen Sie es für mehr Kalenderplatz ein.

### Durch Ziehen umplanen

- Geplanten Aufgabenblock lange drücken
- Auf neue Zeit ziehen (5-Minuten-Raster)
- Loslassen, um Startzeit zu aktualisieren

### Externe Kalender (iCal/ICS)

1. **Einstellungen → Erweitert → Kalender**
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

### Projektdetails

- Alle Aufgaben im Projekt anzeigen
- Neue Aufgaben hinzufügen
- Mit **Abschnitten** gruppieren (Überschriften, keine Unteraufgaben/Projekte)
- Aufgabe antippen, um **Abschnitt** zuzuweisen
- Name, Farbe, Notizen bearbeiten
- **Fokusbereich** zuweisen
- **Projekt-Tags** hinzufügen
- Sequenziellen oder parallelen Modus festlegen
- Wiedervorlagedatum festlegen
- Aufgaben bei eigener Sortierung am Griff verschieben; unter eine Abschnittsüberschrift ziehen, um zuzuweisen, oder oberhalb der ersten ablegen, um den Abschnitt zu entfernen
- Projekt **archivieren**, um es samt übrigen Aufgaben abzuschließen; **Reaktivieren** macht dies rückgängig

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
| **Posteingang** | Erledigt | Aufgabe abschließen |
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

- alle wartenden Aufgaben anzeigen
- Fristen sehen
- bei Bereitschaft nach „Nächstes“ verschieben
- bei Erhalt erledigen

---

## Irgendwann/Vielleicht

- im Wochenrückblick regelmäßig prüfen
- durch Verschieben nach „Nächstes“ aktivieren
- archivieren, wenn nicht mehr relevant

---

## Benachrichtigungen und Erinnerungen

### Arten von Benachrichtigungen

- **Fälligkeitserinnerungen**
- **Startzeitwarnungen**
- **Erinnerungen an wiederkehrende Aufgaben**

Tippen auf den Benachrichtigungstext öffnet **Durchsicht**.

Erinnerungen werden auf dem Telefon geplant; es gibt keinen Push-Server. Wenn Sie eine Aufgabe auf einem anderen Gerät abschließen oder umplanen, aktualisiert das Telefon seine Alarme nach der Synchronisierung. Lassen Sie es daher vor der nächsten Erinnerung synchronisieren (einmaliges Öffnen genügt).

### Berechtigungen

1. Geräte-**Einstellungen → Apps → Mindwtr**
2. **Benachrichtigungen** aktivieren
3. Warnungen und Töne nach Wunsch erlauben

---

## Einstellungen

### Allgemein

- **Darstellung**: System, Hell, Dunkel
- **Sprache**: Englisch, Chinesisch (vereinfacht/traditionell), Hindi, Spanisch, Arabisch, Französisch, Portugiesisch, Russisch, Deutsch, Japanisch, Vietnamesisch, Türkisch, Koreanisch, Italienisch, Polnisch, Niederländisch, Tschechisch

### Benachrichtigungen

**Aufgabenerinnerungen:**
- Benachrichtigungen für Fälligkeitstermine und Startzeiten aktivieren/deaktivieren

**Tägliche Übersicht:**
- **Morgenübersicht**: Zusammenfassung der heute fälligen, überfälligen und Fokusaufgaben
- **Abenddurchsicht**: Aufforderung, den Tag durchzusehen und abzuschließen
- Zeiten für beide festlegen

**Wochenrückblick:**
- **Erinnerungen**: Wöchentliche Benachrichtigung zum Start des Rückblicks erhalten
- **Uhrzeit/Tag**: Gewünschten Zeitpunkt für den Rückblick festlegen (z. B. Freitag um 16 Uhr)

### GTD

**Optionale Funktionen:**
- **Prioritäten**
- **Zeitschätzungen**

**Zeitschätzungsvoreinstellungen:**
- Festlegen, welche Zeitschätzungen im Aufgabeneditor erscheinen
- Optionen: 5m, 10m, 15m, 30m, 1h, 2h, 3h, 4h, 4h+
- Standard: 10m, 30m, 1h, 2h, 3h, 4h, 4h+

**Automatisch archivieren:**
- Erledigte Aufgaben nach Tagen archivieren (Standard 7)
- **Nie** für unbegrenzte Erledigt-Liste

**Posteingangsverarbeitung:**
- Mobiler kartenbasierter Ablauf
- Gemeinsame Einstellungen steuern 2-Minuten-Abkürzung, frühe Projektfrage, Kontexte/Tags, Planung und Referenz

**Layout des Aufgabeneditors:**
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
- **Apple-Erinnerungen-Import**: Liste wählen und unerledigte Erinnerungen importieren; sie bleiben in Apple Erinnerungen, bereits importierte, erledigte oder titellose werden übersprungen
- **Synchronisierte Einstellungen**: Darstellung, Sprache/Datumsformat, GTD-Standardwerte, externe Kalender-URLs, KI-Einstellungen, gespeicherte Filter; niemals API-Schlüssel oder lokale Modellpfade

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

---

## Siehe auch

- [Mobile Installation](/de/start/mobile-installation)
- [Apple-Kurzbefehle](/de/power-users/apple-shortcuts)
- [Daten und Synchronisierung](/de/data-sync/)
- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
