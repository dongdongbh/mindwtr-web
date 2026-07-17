# Benutzerhandbuch: Desktop

Die Mindwtr-Desktop-App basiert auf [Tauri v2](https://tauri.app/) und bietet unter Windows, macOS und Linux ein leichtgewichtiges, schnelles Erlebnis.

## Überblick

Die Desktop-App besitzt eine Seitenleistennavigation mit allen GTD-Ansichten und einen Hauptinhaltsbereich.

---

## Interaktionsmuster

- **Einfachklick** schaltet Aufgabendetails um.
- **Doppelklick** auf eine Aufgabe öffnet den vollständigen Bearbeitungsmodus. Um nur den Titel direkt umzubenennen, wählen Sie **Aufgabe umbenennen** im `⋯`-Menü der Aufgabe (`Enter` speichert, `Esc` bricht ab).
- **Klick außerhalb** eines geöffneten Aufgabeneditors schließt ihn, solange nichts geändert wurde. Nach einer Änderung sind „Speichern“, „Abbrechen“ oder `Esc` erforderlich.
- **Rechtsklick** öffnet Kontextmenüs (Projekte, Aufgaben).
- **Tastaturorientiert**: Globale Kürzel und Vim-/Emacs-Modi sind für Desktop-Arbeitsabläufe optimiert.

Wenn Sie das Fälligkeitsdatum einer Aufgabe wiederholt nach hinten verschieben, zeigt die Zeile nach der dritten Verschiebung neben dem Datum eine kleine Sanduhr mit der Anzahl. Sie erinnert daran, dass die Aufgabe möglicherweise erneut geklärt, delegiert oder verworfen werden sollte, statt sie erneut aufzuschieben.

Die meisten Aufgabenlisten verwenden dieselbe Steuerungszeile zum Auswählen, Filtern, Sortieren, Gruppieren, Anzeigen von Details und Umschalten der kompakten Dichte. Mit **Gruppieren** ordnen Sie Posteingang, Nächste Aktionen, Warten, Irgendwann/Vielleicht, Referenz, Erledigt und andere Listen nach Metadaten wie Kontext, Bereich, Projekt oder Tag.

## Fokusmodus

Der Fokusmodus blendet die Seitenleiste aus und hält die Liste zentriert (maximal 800 px breit).

- Umschalten mit **Ctrl+\\** (Windows/Linux) oder **Cmd+\\** (macOS)
- Geeignet für konzentrierte Arbeit oder Durchsichten

### Taskleistensymbol

Mindwtr läuft für die automatische Synchronisierung im Hintergrund.

- Beim **Schließen des Fensters** wird die App in die Taskleiste minimiert, statt beendet.
- Ein **Klick auf das Taskleistensymbol** zeigt oder verbirgt das Fenster.
- Ein **Rechtsklick auf das Taskleistensymbol** bietet „Beenden“, um die App vollständig zu schließen.

## Ansichten

### 📥 Posteingang

Ihre Erfassungszone. Alle neuen Aufgaben landen vor der Verarbeitung hier.

- **Aufgaben hinzufügen** über das untere Eingabefeld
- **Syntax für „Schnell hinzufügen“** wird unterstützt (siehe [Erste Schritte](/de/start/getting-started))
- Verwenden Sie den Stern neben dem Eingabefeld, wenn eine neue Aufgabe direkt in **Heutiger Fokus** landen soll. Derselbe Stern befindet sich in der Kopfzeile des Aufgabeneditors. Das Markieren gilt als Klärung: Eine markierte Erfassung wird als **Nächste Aktion** statt als Posteingangseintrag erstellt. Wird eine markierte Aufgabe zurück in den Posteingang verschoben, verliert sie den Stern.
- **Posteingang verarbeiten** mit dem Klärungsablauf
- **Gedankensammlung** führt durch typische Lebens-/Arbeitsbereiche, wenn Sie eine geführte Erfassung statt eines leeren Feldes wünschen.

### 🎯 Fokus

Ihr gemeinsames Dashboard für das tägliche Erledigen. „Fokus“ ist kein vollständiger Bestand aller Aufgaben mit Status `next`, sondern beschränkt die Liste auf jetzt verfügbare Arbeit.

- **Heutiger Fokus**: Mit Stern markierte Prioritätsaufgaben bis zum festgelegten Fokuslimit
- **Überfällig**: Einträge nach ihrem Fälligkeitsdatum
- **Heute fällig**: heute fällige Aufgaben
- **Nächste Aktionen**: ausführbare Aufgaben ohne Fälligkeitsdatum, nach Kontext gefiltert
- **Durchsicht fällig**: Einträge mit Tickler-Datum

„Fokus“ blendet Aufgaben mit zukünftigem Start und spätere Aufgaben sequenzieller Projekte aus. Verwenden Sie **Kontexte**, **Projekte** oder die **Suche** für einen größeren Aufgabenbestand.

**Standardreihenfolge der nächsten Aktionen:** Bald fällige Aktionen zuerst, undatierte danach und weit in der Zukunft fällige zuletzt. Innerhalb derselben Gruppe folgen Priorität (wenn aktiviert), Startzeit, Erstellungsdatum, Titel und ID. Die vollständige Logik steht unter [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow#how-focus-sorts-available-actions).

**Funktionen:**
- **Kontextfilter**: Nächste Aktionen nach Kontext (z. B. @home, @work) oder Tag filtern. Die Auswahl gruppiert Kontexte und Tags, damit lange Metadatenlisten übersichtlich bleiben.
- **Nach Kontext gruppieren**: Nächste Aktionen nach ihrem primären Kontext gruppieren; Aufgaben ohne Kontext erscheinen unter **Kein Kontext**.
- **Gespeicherte Filter**: Wiederverwendbare Fokusbedingungen wie Projekte, Kontexte, Tags, Priorität, Energie und Zeitschätzung speichern.
- **Zen-Modus**: Alles außer den Aufgaben im heutigen Fokus ausblenden.
- **Pomodoro (optional)**: Unter **Einstellungen → GTD → Funktionen → Pomodoro-Zeitgeber** ein Fokus-/Pausenfeld aktivieren (15/3, 25/5, 50/10 und eine optionale eigene Voreinstellung). Belassen Sie es bei **Nur Zeitgeber** oder aktivieren Sie **Zeitgeber mit Aufgabe verknüpfen** für Aufgabenauswahl und **Aufgabe als erledigt markieren**.

### 📁 Projekte

Mehrstufige Ergebnisse mit zusammengehörigen Aufgaben.

- **Sequenzieller Modus**: Nur die erste verfügbare Projektaufgabe erscheint in „Fokus“.
- **Paralleler Modus**: Alle verfügbaren Projektaufgaben können in „Fokus“ erscheinen.
- **Sequenzieller Umfang**: Projektweit oder abschnittsweise; der Abschnittsumfang zeigt die erste verfügbare Aufgabe jedes Abschnitts.
- **Status**: Aktiv, Warten, Irgendwann, Archiviert
- **Fokusbereiche**: Projekte nach übergeordneten Bereichen (z. B. Beruf, Gesundheit) gruppieren. Ziehen Sie ein Projekt auf einen Bereich; beim Ziehen erscheinen auch eingeklappte und leere Bereiche sowie **Kein Bereich** als Ziele.
- **Aufgaben durch Ziehen verschieben**: Ziehen Sie eine Aufgabe aus der geöffneten Projektliste auf ein anderes Projekt in der Seitenleiste (sie landet hinter dessen vorhandenen Aufgaben) oder auf eine Bereichsüberschrift, um sie zur direkten Bereichsaufgabe zu machen. Dies funktioniert in jeder Sortierung. Eine Meldung **Verschoben nach …** bietet Rückgängig; archivierte Projekte nehmen keine Aufgaben an.
- **Projekt-Tags**: Projekte markieren und nach Tags filtern
- **Begleitnotizen**: Planungsnotizen und Referenzmaterial hinzufügen
- **Abschnitte**: Optionale Aufgabengruppen innerhalb eines Projekts (Phasen, Meilensteine, Arbeitsstränge), keine Unteraufgaben oder separaten Projekte
- **Wiedervorlagedatum**: Tickler-Daten für die Projektdurchsicht
- **Archivieren**: Ein Projekt wird durch Archivieren abgeschlossen; übrige Aufgaben werden mit abgeschlossen, **Reaktivieren** macht dies rückgängig.

Das Feld **Projektabschnitt** im Aufgabeneditor weist eine Aufgabe einem Abschnitt ihres aktuellen Projekts zu. Es ist erst sinnvoll, wenn die Aufgabe zu einem Projekt mit Abschnitten gehört.

### 🏷️ Kontexte

Aufgaben nach Orts- oder Werkzeugkontext filtern:

- `@home`, `@work`, `@errands`, `@agendas`
- `@computer`, `@phone`, `@anywhere`

### 🏷️ Tags

Aufgaben nach Energie, Modus oder Thema filtern:

- Energie: `#focused`, `#lowenergy`, `#creative`
- Thema: `#health`, `#finance`

### ⏳ Warten

Delegierte Einträge oder Aufgaben verfolgen, die auf externe Ereignisse warten.

### 💭 Irgendwann/Vielleicht

Ideen reifen lassen, die Sie später verfolgen möchten.

### 🗓️ Kalender

Zeitbasierte Ansicht von Aufgaben mit Fälligkeitsdaten oder Startzeiten.

In breiten Layouts enthält der Kalender für den ausgewählten Tag ein Feld **Nächste Aktionen planen**. Es zeigt ungeplante nächste Aktionen und fällige, aber ungeplante Aufgaben, damit Sie sie direkt in freie Zeiten legen können. Klappen Sie das Feld ein, um mehr Platz für das Tages-/Wochenraster zu erhalten.

### 📋 Board-Ansicht

Kanban-Board mit Ziehen und Ablegen:

- **Posteingang**: Unverarbeitete Einträge
- **Nächste Aktionen**: Arbeitsbereit
- **Warten**: Delegierte Einträge
- **Irgendwann/Vielleicht**: Zurückgestellte Einträge
- **Erledigt**: Abgeschlossene Aufgaben

Ziehen Sie Karten innerhalb einer Spalte, um die manuelle Board-Reihenfolge festzulegen. Beim Wechsel des Status wird die alte Spaltenreihenfolge entfernt, damit die Aufgabe in der neuen Spalte neu eingeordnet werden kann.

Das Board-Suchfeld filtert sichtbare Karten nach Titel, Notizen, Projekt, Kontext oder Tag. Die Filterschaltfläche bietet Schnellfilter für Kontexte, Tags, Fälligkeitsdaten und Projekte; **Filter löschen** entfernt Suchtext und aktive Filter.

### ✅ Erledigt

Kürzlich abgeschlossene Aufgaben als kurzfristiges Abschlussprotokoll für tägliche oder wöchentliche Rückblicke.

Wenn Sie eine Aufgabe früher erledigt haben, als Sie sie markiert haben, klicken Sie auf den Zeitstempel **Abgeschlossen**, um ihn zu korrigieren. Sie können auch auf die Abschlussschaltfläche einer geöffneten Aufgabe rechtsklicken und einen früheren Zeitpunkt wählen. Das hilft bei Aufzeichnungen und Wiederholungen nach Abschluss.

Wählen Sie **Auswählen**, um Aufgaben zu markieren, oder **Alle auswählen**, und verwenden Sie dann **Verschieben → Archiviert**, um die Auswahl vorzeitig abzulegen.

### 📦 Archiviert

Abgelegte abgeschlossene Aufgaben. Sie sind in normalen Listen ausgeblendet, können hier aber gesucht oder wiederhergestellt werden. Klicken Sie zur Korrektur auf den Zeitstempel **Abgeschlossen**.

Wählen Sie **Auswählen**, um Aufgaben zu markieren, oder **Alle auswählen**. Sie können die Auswahl zurück nach Erledigt verschieben, ohne den Abschlusszeitpunkt zu ändern, sie im Posteingang wiederherstellen oder in den Papierkorb verschieben. Mindwtr löscht Aufgaben nur aus dem Papierkorb endgültig.

### 🗑️ Papierkorb

Gelöschte Aufgaben und Projekte, neueste zuerst. Stellen Sie Einträge wieder her, löschen Sie sie endgültig oder leeren Sie alles mit **Papierkorb leeren**. Über **Auswählen** bzw. **Alle auswählen** können mehrere Aufgaben und Projekte gemeinsam wiederhergestellt oder endgültig gelöscht werden. Endgültiges Löschen verlangt immer eine Bestätigung.

### 📝 Wochenrückblick

Geführter GTD-Durchsichtsassistent:

1. Posteingang verarbeiten
2. Kalender prüfen
3. Bei „Warten“ nachfassen
4. Projekte prüfen
5. Irgendwann/Vielleicht prüfen

Verwenden Sie im Rückblick **Posteingang verarbeiten**, bevor Sie mit Kalender, Warten, Projekten und Irgendwann fortfahren.

Ausführliche Hinweise enthält der [Wochenrückblick](/de/use/weekly-review).

---

## KI-Assistent (optional)

Aktivieren Sie ihn unter **Einstellungen → KI-Assistent**:

- **Klären**: unklare Aufgaben in konkrete nächste Aktionen umwandeln
- **Aufteilen**: Checklistenpunkte für große Aufgaben erzeugen
- **Durchsichtsanalyse**: veraltete Aufgaben während der Durchsicht hervorheben
- **Copilot**: beim Tippen Kontext-/Tag-/Zeitvorschläge geben

KI ist optional und läuft nur auf Ihre Anforderung.

---

## Wiederverwendbare Listen

Checklisten als Vorlagen:

- **Aufgabe duplizieren**: eine Stammliste kopieren (Packen, Reisevorbereitung)
- **Checkliste zurücksetzen**: alle Punkte zur Wiederverwendung abwählen (Einkäufe)

---

## Aufgabeneditor (Ansicht + Bearbeitung)

- Klicken Sie auf eine Aufgabe, um eine **schreibgeschützte Ansicht** aller Details zu öffnen.
- Drücken Sie **Bearbeiten** (oder `e`), um in den Bearbeitungsmodus zu wechseln.
- Der Editor beginnt minimalistisch. **Weitere Optionen** zeigt erweiterte Felder.
- **Projektabschnitt** organisiert Aufgaben innerhalb eines unterteilten Projekts. Bei Posteingangsaufgaben, nicht zugewiesenen Aufgaben oder Projekten ohne Abschnitte leer lassen.
- Status, Priorität und Energiestufe verwenden Pillensteuerungen statt Auswahlmenüs.
- Datumsfelder bieten Schnelloptionen für **Heute**, **Morgen**, **+3 Tage**, **Nächste Woche**, **Nächster Monat** und **Kein Datum**.
- Unter **Einstellungen → GTD → Layout des Aufgabeneditors** wählen Sie zwischen seitlicher Vorschau und zentriertem Pop-up.

---

## Kalenderintegration

Mindwtr kann externe Kalender in der Kalenderansicht überlagern. Unter macOS liest es Apple Kalender über EventKit, auf allen Desktop-Plattformen direkte ICS-Abonnement-URLs.
Fügen Sie unter **Einstellungen → Kalender** eine **ICS-URL** hinzu.
Externe Termine sind schreibgeschützt, aber Sie können daraus eine separate Mindwtr-Aufgabe erstellen. Mindwtr kopiert, sofern verfügbar, Titel, Datum/Uhrzeit, Ort, Beschreibung und Kalendername.
Verwenden Sie **Nächste Aktionen planen**, um den ausgewählten Tag als Planungsoberfläche zu nutzen: ungeplante Arbeit prüfen, eine Aufgabe wählen und in ein freies Zeitfenster legen, während Fälligkeitsdaten Fristen bleiben.
Unter macOS kann **Aufgaben in Kalender übertragen** geplante/fällige Aufgaben außerdem in einen beschreibbaren Apple-Kalender schreiben. Einzelheiten enthält die [Kalenderintegration](/de/use/calendar-integration).

### 🔍 Globale Suche

Leistungsfähige Suche mit Operatoren.

**Öffnen:** `/` oder `Ctrl/Cmd + K` drücken oder auf das Suchsymbol klicken.

Suchtext ist optional. Öffnen Sie **Filter**, um passende Einträge nach Status, Umfang, Bereich, Fälligkeitsdatum, Ort, Kontext oder Tag aufzulisten; wählen Sie **Erledigt** und **Archiviert** (oder **Erledigte und archivierte Aufgaben einbeziehen**), wenn Sie abgeschlossene Einträge sehen möchten.

#### Suchoperatoren

| Operator | Beispiel | Beschreibung |
| ----------- | ------------------ | ----------------------------- |
| `status:` | `status:next` | Nach Aufgabenstatus filtern |
| `-status:` | `-status:done` | Status ausschließen |
| `context:` | `context:@home` | Nach Kontext filtern |
| `tag:` | `tag:#focused` | Nach Tag filtern |
| `assigned:` | `assigned:Tom` | Nach verantwortlicher Person filtern |
| `project:` | `project:HomeReno` | Nach Projektname oder ID filtern |
| `location:` | `location:office` | Nach Aufgabenort filtern |
| `where:` | `where:office` | Alias für Aufgabenort |
| `id:` | `id:abc123` | Exakte Aufgaben-ID finden |
| `-id:` | `-id:abc123` | Exakte Aufgaben-ID ausschließen |
| `due:` | `due:today` | An einem Datum fällige Aufgaben |
| `due:<=` | `due:<=7d` | Innerhalb von 7 Tagen fällige Aufgaben |
| `start:` | `start:>=tomorrow` | Ab einem Datum beginnende Aufgaben |
| `created:` | `created:>=30d` | In den letzten 30 Tagen erstellte Aufgaben |
| `OR` | `@home OR @work` | Eine der Bedingungen erfüllen |

**Datumsformate:** `today`, `tomorrow`, `7d` (7 Tage), `2w` (2 Wochen), `1m` (1 Monat), `2025-01-15`

#### Gespeicherte Suchen

Gespeicherte Suchen sind Abkürzungen für wiederverwendbare Suchabfragen:

1. Suchabfrage mit Operatoren eingeben
2. **„Suche speichern“** anklicken
3. Suche benennen (z. B. „Bald fällige Arbeitsaufgaben“)
4. Über **Gespeicherte Suchen** in der Seitenleiste öffnen

**Löschen:** Öffnen Sie die gespeicherte Suche und klicken Sie auf das Papierkorbsymbol.

Gespeicherte Suchen unterscheiden sich von **Gespeicherten Filtern** in „Fokus“. Fokusfilter werden als Kriterien synchronisiert und in der Fokusfiltersteuerung bearbeitet.

---

## Schnellerfassung

### Globales Tastenkürzel

Erfassen Sie Aufgaben von überall auf dem Desktop, ohne das Fenster zu wechseln:

1. Globales Kürzel drücken (`Ctrl+Alt+M`)
2. Aufgabe mit der Schnell-hinzufügen-Syntax eingeben
3. Mit `Enter` zum Posteingang hinzufügen
4. Arbeit fortsetzen

Ändern oder deaktivieren Sie das Kürzel unter **Einstellungen → Allgemein → Eingabe → Globales Kürzel für „Schnell hinzufügen“**.
Standardwerte folgen Plattformkonventionen:
- macOS: `Ctrl+Option+M` (Standard), `Ctrl+Option+N`, `Ctrl+Option+Q` oder das alte `Cmd+Shift+A`
- Linux: `Ctrl+Alt+M` (Standard), `Ctrl+Alt+N`, `Ctrl+Alt+Q` oder das alte `Ctrl+Shift+A`
- Windows: standardmäßig deaktiviert, damit Mindwtr anderen Apps keine Tastenkombination entzieht; `Ctrl+Alt+M` wird bei Aktivierung empfohlen
- Vermeiden Sie `Ctrl+Shift+A`: Chrome, Word und Excel verwenden es, und ein globales Kürzel überschreibt sie systemweit.

**Flatpak-/Wayland-Hinweis:** Einige Compositoren erlauben keine von Apps registrierten globalen Kürzel. Legen Sie dann `flatpak run tech.dongdongbh.mindwtr --quick-add` als Desktop-Kürzel fest.

### Taskleistensymbol

Klicken Sie für sofortige Erfassung auf das Taskleistensymbol:

- Eingabe für „Schnell hinzufügen“ erscheint
- Natürlichsprachliche Syntax verwenden
- Aufgabe landet direkt im Posteingang

### Kürzel im Dialog „Aufgabe hinzufügen“

Der Dialog ist vollständig per Tastatur bedienbar:

- `Enter`: speichern und schließen
- `Shift+Enter`: speichern und für die nächste Aufgabe geöffnet lassen
- `Ctrl+Enter` (`⌘Enter` unter macOS): speichern und im vollständigen Editor öffnen
- `Esc`: ohne Speichern schließen
- Bei geöffneten Vorschlägen (`@`, `#`, `+`, `%`, `!`, `/`) bewegt `↑`/`↓` die Auswahl; `Enter` oder `Tab` fügt sie ein.

<a id="quick-add-syntax"></a>

### Syntax für „Schnell hinzufügen“

Mindwtr wertet beim Hinzufügen natürliche Sprache aus:

| Syntax | Beispiel | Ergebnis |
| ------------ | ----------------- | ------------------- |
| `@context` | `@home` | Kontext hinzufügen |
| `#tag` | `#focused` | Tag hinzufügen |
| `+Project` | `+HomeReno` | Projekt zuweisen |
| `+Multi Word` | `+New Project` | „New Project“ zuweisen |
| `+"Quoted Name"` | `+"New Project" call Bob` | Anführungszeichen begrenzen mehrteilige Namen mitten im Satz (auch `!"Area Name"`) |
| `!Area` | `Plan roadmap !Work` | Bereich zuweisen |
| `%Person` | `Ask %Jim for budget` | „Zugewiesen an“ festlegen; `%"Full Name"` für neue mehrteilige Namen |
| `/area:<name>` | `/area:Personal` | Bereich zuweisen (ohne Leerzeichen) |
| `/due:date` | `/due:friday` | Fälligkeitsdatum festlegen |
| `/energy:<level>` | `/energy:medium` | Energiestufe (`low`, `medium`, `high`) |
| `/note:text` | `/note:call back` | Beschreibung hinzufügen |
| `/status` | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Status festlegen |

**Datumsformate:** today, tomorrow, friday, next week, in 3 days, 2025-01-15

---

## Audioerfassung und Transkription

Aufgaben per Sprache mit KI-gestützter Transkription erfassen.

### Einrichtung

1. **Einstellungen → KI-Assistent** öffnen
2. **Sprache zu Text** aktivieren
3. **Anbieter** wählen:
   - **OpenAI / Gemini**: API-Schlüssel erforderlich (Cloud)
   - **Offline (Whisper)**: läuft lokal; einmalig über **Herunterladen** das Modell abrufen
4. **Verarbeitungsmodus** festlegen:
   - **Intelligent auswerten**: Daten (`tomorrow`), Prioritäten und Projekte aus Sprache extrahieren
   - **Nur Transkript**: wortgetreu in die Aufgabe transkribieren

### Audioerfassung verwenden

- **Schnell hinzufügen**: Modus in der Leiste über das Mikrofonsymbol auf **Audio** stellen
- **Aufnehmen**: Mikrofon anklicken und Aufgabe natürlich sprechen
- **Beenden**: Stopp anklicken; der Text füllt das Eingabefeld
- **Anhänge**: **Audioanhänge speichern** unter **Einstellungen → Allgemein** aktivieren, um die Originalaufnahme zu behalten

---

## Benachrichtigungen und Erinnerungen

Mindwtr sendet Desktop-Benachrichtigungen:

### Arten

- **Fälligkeitserinnerungen**
- **Startzeitwarnungen**
- **Erinnerungen an wiederkehrende Aufgaben**

### Einstellungen

In den Einstellungen:
- Benachrichtigungen aktivieren/deaktivieren
- Erinnerungsvorlauf festlegen

**Plattformhinweise:**
- **macOS** fragt beim ersten Aktivieren nach der Berechtigung.
- **Linux** benötigt einen laufenden Benachrichtigungsdienst (GNOME/KDE usw.).

---

## Aufgabenverwaltung

### Aufgaben erstellen

1. Unteres Eingabefeld einer Listenansicht verwenden
2. Globales Kürzel von überall verwenden
3. Taskleistensymbol anklicken
4. Unter Flatpak/Wayland gegebenenfalls `flatpak run tech.dongdongbh.mindwtr --quick-add` als eigenes Kürzel festlegen
5. Titel mit Schnell-hinzufügen-Syntax eingeben
6. Mit `Enter` hinzufügen

### Aufgaben bearbeiten

- Aufgabe anklicken, um das Bearbeitungsfeld zu öffnen
- Titel, Status, Kontexte, Tags, Beschreibung und Ort bearbeiten
- Fälligkeits-, Start-, Wiedervorlagedatum, Zeitschätzung und Wiederholung festlegen
- Checklistenpunkte verwalten
- Beschreibungs-Markdown unterstützt ungeordnete Listen und Kontrollkästchen (`- item`, `[ ] item`, `[x] item`)
- Bei aktivierter Listenoption **Details** zeigt die Zeile die erste Beschreibungszeile als Markdown; ausklappen für die vollständige Beschreibung
- `[[` in Aufgabenbeschreibungen oder Projektnotizen öffnet eine schwebende Auswahl zum Verknüpfen einer Aufgabe oder eines Projekts
- Links dienen nur der Navigation und synchronisieren keinen Abschlussstatus
- Markdown-Kontrollkästchen in Beschreibungen sind reine Notizen und beeinflussen die Aufgabencheckliste nicht
- Mehrzeiligen Text in einen Checklistenpunkt einfügen, um je Zeile einen Punkt zu erstellen (Aufzählungen, Nummerierungen und `[x]` werden erkannt)
- Projekt zuweisen

### Aufgabeneigenschaften

| Eigenschaft | Beschreibung |
| ----------------- | --------------------------------------------------- |
| **Status** | inbox, next, waiting, someday, done, archived |
| **Priorität** | low, medium, high, urgent |
| **Kontexte** | Orts-/Werkzeug-Tags (z. B. @home, @work) |
| **Tags** | Energie-/Modus-Tags (z. B. #focused, #lowenergy) |
| **Fälligkeitsdatum** | Frist der Aufgabe |
| **Startdatum** | Beginn der Bearbeitung |
| **Wiedervorlagedatum** | Tickler-Datum |
| **Zeitschätzung** | 5min, 10min, 15min, 30min, 1hr, 2hr, 3hr, 4hr, 4hr+ |
| **Wiederholung** | täglich, wöchentlich, monatlich, jährlich + Strategie |
| **Checkliste** | Unterpunkte für mehrstufige Aufgaben |
| **Beschreibung** | Markdown-Notizen mit Vorschau |
| **Anhänge** | Dateien und Links |
| **Ort** | Physischer Ort |
| **Verantwortliche Person** | Delegierte Person für Warten und Suche `assigned:` |
| **Projekt** | Übergeordnetes Projekt |
| **Abschnitt** | Optionale Gruppe in einem Projekt |

**Anhänge:** **Link hinzufügen** akzeptiert URLs und lokale Dateipfade (z. B. `/home/user/doc.pdf`, `C:\Users\you\file.txt` oder `file://...`).
Hinweise zu Synchronisierung, Bereinigung und Audionotizen finden Sie unter [Anhänge](/de/use/attachments).

### Wiederkehrende Aufgaben

Beim Abschluss erzeugt Mindwtr automatisch die nächste Instanz mit aktualisierten Daten.

- **Streng** (Standard): fester Rhythmus, z. B. alle 5 Tage am geplanten Zyklus
- **Nach Abschluss wiederholen**: nächste Fälligkeit ab Abschlusszeit, z. B. in 5 Tagen
- **Endet: Nie / Am Datum / Nach N Vorkommen**: unbegrenzt, an einem Datum oder nach einer Anzahl enden; der Parserwert `After N occurrences` zählt die aktuelle Aufgabe mit.

Mindwtr hält eine aktive Instanz. Der Kalender zeigt sie mit Fälligkeitsdatum oder Startzeit; zukünftige Vorkommen werden bis zum Abschluss nicht vorab angelegt, außer als reine Planungsvorschau mit **Nächstes Vorkommen im Kalender anzeigen**.

Stellen Sie **Nach Abschluss wiederholen**, Enddatum oder Anzahl im Wiederholungsfeld des Aufgabeneditors ein.

---

## Stapelaktionen

Mehrere Aufgaben gemeinsam bearbeiten:

1. **„Auswählen“** in der Listenkopfzeile anklicken
2. Aufgaben auswählen/abwählen
3. In der Aktionsleiste:
   - **Verschieben**: Status aller ausgewählten ändern
   - **Bereich zuweisen**: Bereich setzen oder entfernen
   - **Tag hinzufügen**: Allen ausgewählten Aufgaben einen Tag hinzufügen
   - **Tag entfernen**: Einen Tag von allen ausgewählten Aufgaben entfernen
   - **Kontext hinzufügen**: Allen ausgewählten Aufgaben einen Kontext hinzufügen
   - **Kontext entfernen**: Einen Kontext von allen ausgewählten Aufgaben entfernen
   - **Löschen**
4. Mit **„Fertig“** den Auswahlmodus beenden

### Sortierung

Aufgaben sortieren nach:
- Standard (statusbasiert)
- Fälligkeitsdatum
- Startdatum
- Wiedervorlagedatum
- Titel (alphabetisch)
- Erstellt (älteste/neueste)

---

## Hierarchische Kontexte und Tags

| Beispiel | Entsprechungen |
| ---------------- | ------------------------------- |
| `@work` | `@work`, `@work/meetings` usw. |
| `@work/meetings` | nur `@work/meetings` |
| `#health` | `#health`, `#health/diet` usw. |

Ein Filter auf einen übergeordneten Kontext schließt alle Untergruppen ein.

---

## Tastenkürzel

Mindwtr unterstützt **Standard** (Gmail-/Todoist-Stil), **Vim** und **Emacs**. Ändern Sie die Voreinstellung in den Einstellungen.

Die vollständige Liste enthält [Desktop-Tastenkürzel](/de/use/keyboard-shortcuts).

**Kurzreferenz (Standard):**
- `/`: Suche öffnen
- `?`: Kürzelhilfe
- `gi`: Posteingang
- `gn`: Nächstes
- `gf`: Fokus
- `j/k`: Auswahl abwärts/aufwärts
- `Enter`: ausgewählte Aufgabe öffnen
- `Shift+Enter`: bearbeiten
- `e`: erledigt/nicht erledigt
- `x`: für Stapelaktionen auswählen/abwählen
- `#`: löschen
- `z`: letzten Abschluss/Löschung rückgängig

**Kurzreferenz (Vim):**
- `j/k`: Auswahl abwärts/aufwärts
- `Enter`: öffnen
- `e`: bearbeiten
- `x`: erledigt umschalten
- `dd`: löschen

`Ctrl+Z` / `Cmd+Z` macht in jeder Voreinstellung den letzten Abschluss oder die letzte Löschung rückgängig.

In jeder Voreinstellung setzt `s` plus Buchstabe direkt den Status (`si` Posteingang, `sn` Nächstes, `sw` Warten, `ss` Irgendwann, `sd` Erledigt, `sa` Archiviert) und zeigt eine Rückgängigmeldung. `Insert` springt zur Aufgabeneingabe oder öffnet „Schnell hinzufügen“.

---

## Einstellungen

Über die Seitenleiste öffnen.

### Allgemein
- **Darstellung**: Hell, Dunkel oder System
- **Sprache**: Englisch, Chinesisch (vereinfacht/traditionell), Hindi, Spanisch, Arabisch, Französisch, Portugiesisch, Russisch, Deutsch, Japanisch, Vietnamesisch, Türkisch, Koreanisch, Italienisch, Polnisch, Niederländisch, Tschechisch
- **Tastenkürzel**: Standard, Vim oder Emacs
- **Beim Systemstart öffnen**: Mindwtr nach der Anmeldung automatisch starten

### Benachrichtigungen

**Aufgabenerinnerungen:**
- Benachrichtigungen für Fälligkeit und Startzeit aktivieren/deaktivieren

**Tägliche Übersicht:**
- **Morgenübersicht**: heute fällig, überfällig und Fokusaufgaben
- **Abenddurchsicht**: Aufforderung zum Tagesabschluss
- Zeiten festlegen (z. B. 09:00, 20:00)

**Wochenrückblick:**
- **Erinnerungen**: wöchentliche Benachrichtigung
- **Tag/Uhrzeit** anpassen

### GTD
- **Automatisch archivieren**: Erledigte Aufgaben nach einer Anzahl von Tagen archivieren (Standard: 7) oder mit **Nie** behalten. Wenn Sie die Verzögerung verkürzen, werden vorhandene Erledigt-Aufgaben, die nun älter als der neue Grenzwert sind, sofort archiviert.
- **Fokusaufgabenlimit** festlegen
- **Funktionen**: optionale Signale:
  - **Prioritäten**
  - **Zeitschätzungen**
- **Posteingangsverarbeitung**: Geführten Lernablauf behalten oder standardmäßig **Schnell** für einen kompakten Bildschirm verwenden
  - 2-Minuten-Regel, frühe Projektfrage, Kontexte/Tags, Planung und Referenzangebot konfigurieren
- **Layout des Aufgabeneditors**: Standardfelder, Abschnitte und Reihenfolge festlegen
  - Öffnungsstil **Seitliche Vorschau** oder **Pop-up**
  - Felder wie **Fälligkeitsdatum** verschieben und standardmäßig geöffnete Abschnitte wählen
- **Verwalten**: Wiederverwendbare Metadaten zentral pflegen
  - **Bereiche**, **Personen**, **Kontexte** und **Tags**
  - Personen enthalten wiederverwendbare Namen, Notizen und Referenzlinks
  - Siehe [Bereiche und Personen](/de/use/areas-people)

### Daten und Synchronisierung

**Synchronisierungs-Backend:**
- **Cloud-Synchronisierung**: Dropbox in unterstützten Builds, iCloud auf unterstütztem macOS
- **Ordner-/Dateisynchronisierung**: gemeinsame JSON-Datei/Ordner (Google Drive, Syncthing, OneDrive usw.)
- **Erweitert / Eigener Server**: WebDAV oder selbst gehostete Mindwtr Cloud

**Synchronisierte Einstellungen:**
- Wählen Sie Einstellungen wie Erscheinungsbild, Sprache/Datumsformat, GTD-Standardwerte, externe Kalender-URLs, KI-Einstellungen und gespeicherte Filter.
- API-Schlüssel und lokale Modellpfade werden nie synchronisiert.

**Status:**
- Fußzeile der Seitenleiste zeigt letzte Synchronisierung und Online-/Offline-Status.

Für WebDAV:
- Server-URL (Ordner-URL; Mindwtr speichert darin `data.json`)
- Benutzername und Passwort

Ausführliche Einrichtung: [Daten und Synchronisierung](/de/data-sync/).

### Über
- Versionsinformationen
- Nach Aktualisierungen suchen
- **Feedback senden** für Fehler, Funktionswünsche oder Hinweise, sofern aktiviert; optional Antwort-E-Mail angeben
- Links zu Website und GitHub

---

## Siehe auch

- [Desktop-Installation](/de/start/desktop-installation)
- [Desktop-Tastenkürzel](/de/use/keyboard-shortcuts)
- [Daten und Synchronisierung](/de/data-sync/)
