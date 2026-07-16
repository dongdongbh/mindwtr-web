# Kontexte und Tags

Kontexte helfen Ihnen zu erkennen, was Sie **jetzt sofort** erledigen können – abhängig davon, wo Sie sind, welche Werkzeuge Ihnen zur Verfügung stehen oder welchen geistigen Zustand Sie benötigen.

---

## Was sind Kontexte?

In GTD ist ein Kontext eine Voraussetzung für den Abschluss einer Aufgabe: ein Ort, ein Werkzeug oder eine Person.

Wenn Sie nach Kontext filtern, sehen Sie nur Aufgaben, die Sie in Ihrer aktuellen Situation tatsächlich erledigen können.

## Kontexte und Bereiche

Diese beiden GTD-Konzepte werden anfangs besonders leicht verwechselt.

| Konzept | Beantwortete Frage | Häufige Änderung? | Beispiele |
| ----------- | --------------------------------------------------- | -------------- | ----------------------------- |
| **Kontext** | Was kann ich jetzt, an diesem Ort und mit meinen verfügbaren Mitteln erledigen? | Ja | `@computer`, `@phone`, `@home` |
| **Bereich** | Zu welcher dauerhaften Verantwortung gehört dies? | Nein | Beruf, Zuhause, Gesundheit, Finanzen |

Der wesentliche Unterschied:

- **Kontexte** betreffen *Ausführungsvoraussetzungen*. Sie ändern sich im Tagesverlauf.
- **Bereiche** sind *Verantwortungsgruppen*. Sie bestehen so lange wie der entsprechende Teil Ihres Lebens oder Ihrer Arbeit.

### Beispiel: Auftrags- oder Kundenarbeit

Wenn Sie mit mehreren Kunden arbeiten, kann ein eigener **Bereich** für jeden Kunden durchaus sinnvoll sein.

- **Bereich:** Kunde A
- **Projekt:** Backend-Migration
- **Aufgabe:** API-Spezifikation prüfen
- **Kontext:** `@computer`

Damit können Sie zwei unterschiedliche Fragen beantworten:

- Filtern Sie nach **Bereich**, wenn Sie alles zu einem Kunden sehen möchten.
- Filtern Sie nach **Kontext**, wenn Sie unabhängig vom Kunden sehen möchten, was Sie jetzt erledigen können.

Informationen zum direkten Erstellen oder Bearbeiten von Bereichen finden Sie unter [Bereiche und Personen](/de/use/areas-people).

---

## Ortskontexte (@)

Mindwtr enthält folgende voreingestellte Ortskontexte:

| Kontext | Verwendung |
| ----------- | ---------------------------------------- |
| `@home` | Aufgaben, für die Sie zu Hause sein müssen |
| `@work` | Aufgaben für das Büro/den Arbeitsplatz |
| `@errands` | Aufgaben unterwegs (Einkäufe, Termine) |
| `@agendas` | Gesprächspunkte für Besprechungen oder Anrufe |
| `@computer` | Aufgaben, die einen Computer erfordern |
| `@phone` | Aufgaben, die Telefonate erfordern |
| `@anywhere` | Aufgaben ohne Ortsvoraussetzung |

### Beispiele

- `Call mom @phone`
- `Fix leaky faucet @home`
- `Buy office supplies @errands`
- `Deploy update @computer @work`

---

## Tags (#)

Mindwtr enthält Tags zum Filtern nach geistigem Zustand, Modus oder Thema:

| Tag | Verwendung |
| ------------ | --------------------------------- |
| `#focused` | Konzentrierte Arbeit, die Aufmerksamkeit erfordert |
| `#lowenergy` | Einfache Aufgaben für müde Momente |
| `#creative` | Brainstorming oder Ideenfindung |
| `#routine` | Wiederholte/mechanische Aufgaben |

### Beispiele

- `Write proposal #focused @computer`
- `File receipts #lowenergy @home`
- `Brainstorm campaign ideas #creative`
- `Process expenses #routine @computer`

### Warum Tags?

Ihre Leistungsfähigkeit ändert sich im Tagesverlauf:
- **Morgens:** Hohe Konzentration, Aufgaben mit #focused erledigen
- **Nach dem Mittagessen:** Wenig Energie, Aufgaben mit #lowenergy oder #routine erledigen
- **Kreative Zeit:** Wenn Sie inspiriert sind, Aufgaben mit #creative bearbeiten

---

## Kontexte in Mindwtr verwenden

### Kontexte hinzufügen

**Syntax für „Schnell hinzufügen“:**
```
Task title @context1 @context2
Research topic #focused @computer
```
Kontext- und Tag-Namen akzeptieren Unicode-Buchstaben und -Ziffern (einschließlich CJK-Zeichen und Buchstaben mit Akzent).

**Aufgabe bearbeiten:**
1. Öffnen Sie den Aufgabeneditor.
2. Fügen Sie im Feld „Kontexte“ Kontexte hinzu (durch Kommas getrennt).

### Nach Kontext filtern

**Desktop:**
1. Öffnen Sie **Nächste Aktionen** oder die Ansicht **Kontexte**.
2. Klicken Sie zum Filtern auf einen Kontext-Chip.

**Mobilgeräte:**
1. Öffnen Sie den Tab **Nächste Aktionen** oder **Kontexte** im Navigationsmenü.
2. Tippen Sie zum Filtern auf einen Kontext.

### Nach Kontexten oder Tags gruppieren

Die Werkzeugleisten von Aufgabenlisten enthalten außerdem eine Steuerung **Gruppieren**. Damit können Sie größere Listen für Posteingang, Warten, Irgendwann/Vielleicht, Referenz, Erledigt oder Nächste Aktionen nach Kontext, Bereich, Projekt oder Tag gruppieren.

Die Gruppierung nach Tags ist nützlich, wenn Sie einen tagorientierten Arbeitsablauf bevorzugen und Tags als wichtigste Klassifizierungsebene verwenden.

---

## Eigene Kontexte

Sie können eigene Kontexte erstellen:

- `@Bob`: Mit Bob zu besprechende Punkte
- `@waiting-on-vendor`: Auf Antwort des Anbieters warten
- `@car`: Dinge, die im Auto zu erledigen sind
- `@morning`: Punkte der Morgenroutine

### Eigene Kontexte erstellen

Geben Sie den neuen Kontext beim Hinzufügen einer Aufgabe einfach ein:
```
Review contract @legal
```

Der Kontext wird hinzugefügt und steht zum Filtern zur Verfügung.

### Gespeicherte Kontexte und Tags verwalten

Wenn Sie wiederverwendbare Metadaten bereinigen oder umbenennen möchten:

- Öffnen Sie **Einstellungen → Verwalten**.
- Bearbeiten Sie **Kontexte**, **Tags**, **Bereiche** und **Personen** an einer zentralen Stelle.
- Verwenden Sie dies, um Duplikate zusammenzuführen, Namen zu vereinheitlichen oder nicht mehr benötigte Werte zu entfernen.

Bereiche und Personen können auch bei der Zuweisung erstellt werden. Geben Sie einen Namen in die Auswahl **Bereich** oder das Feld **Zugewiesen an** ein und wählen Sie **Erstellen** oder **Neue Person**, wenn es keine genaue Übereinstimmung gibt.

### Kontexte gesammelt bearbeiten

Auf dem Desktop können Sie Kontexte für viele Aufgaben gleichzeitig aktualisieren:

1. Aktivieren Sie in einer Listenansicht den Modus **Auswählen**.
2. Wählen Sie die zu bearbeitenden Aufgaben.
3. Verwenden Sie in der Leiste für Stapelaktionen **Kontext hinzufügen** oder **Kontext entfernen**.

Das ist nützlich, wenn Sie nach einem Wochenrückblick oder einer Projektplanung eine ganze Aufgabengruppe neu klassifizieren möchten.

---

## Hierarchische Kontexte und Tags

Organisieren Sie Kontexte mit Schrägstrichnotation in einer verschachtelten Struktur:

| Syntax | Beispielaufgabe |
| ----------------- | --------------------------- |
| `@work/meetings` | Meeting prep @work/meetings |
| `@home/garage` | Fix shelf @home/garage |
| `#health/fitness` | Morning run #health/fitness |
| `#work/admin` | File reports #work/admin |

### Übergeordnete Filter schließen Untergruppen ein

Wenn Sie nach einem übergeordneten Kontext filtern, werden alle Untergruppen einbezogen:

| Filter | Anzeige |
| --------- | -------------------------------------------- |
| `@work` | `@work`, `@work/meetings`, `@work/calls` |
| `#health` | `#health`, `#health/fitness`, `#health/diet` |

So können Sie grob filtern und dennoch eine genaue Organisation beibehalten.

### Vorteile

- **Organisation**: Verwandte Kontexte übersichtlich gruppieren
- **Flexibilität**: Grob oder gezielt filtern
- **Abwärtskompatibel**: Einfache Kontexte funktionieren weiterhin wie gewohnt

---

## Bewährte Verfahren für Kontexte

### Einfach beginnen

Beginnen Sie mit nur wenigen Kontexten:
- @home
- @work
- @errands
- @computer

Fügen Sie weitere erst bei Bedarf hinzu.

### Einheitlich bleiben

Verwenden Sie immer dieselbe Schreibweise und dasselbe Format:
- ✓ `@home` (immer)
- ✗ `@Home`, `@house`, `home`

### Kontexte kombinieren

Aufgaben können mehrere Kontexte besitzen:
- `@computer @work`: Computer am Arbeitsplatz erforderlich
- `@phone @anywhere`: Telefonat von überall
- `#focused @home`: Konzentrierte Arbeit zu Hause

### Personenkontexte

Fügen Sie Personenkontexte für Gesprächspunkte hinzu:
```
Discuss project timeline @Sarah
Ask about budget @manager
```

Wenn Sie Sarah treffen, suchen Sie nach `@Sarah`, um alle Punkte zu finden.

---

## Kontext-Arbeitsablauf

### Morgenplanung

1. Prüfen Sie, wo Sie heute sein werden.
2. Filtern Sie „Nächste Aktionen“ nach dem passenden Kontext.
3. Wählen Sie Ihre Fokusaufgaben.

### Ortswechsel

Wenn Sie den Ort wechseln:
1. Filtern Sie nach dem neuen Kontext (@work → @home).
2. Prüfen Sie, was Sie hier erledigen können.
3. Wählen Sie die nächste Aufgabe.

### Unerwartetes Gespräch

Wenn jemand unerwartet anruft oder vorbeikommt:
1. Suchen Sie nach dem Namen/Kontext.
2. Prüfen Sie die Gesprächspunkte.
3. Bearbeiten Sie Einträge unter „Warten“.

---

## Kontexte und Tags

In Mindwtr können sowohl `@contexts` als auch `#tags` Aufgaben filtern, sie beantworten jedoch unterschiedliche Fragen:

| Symbol | Beantwortete Frage | Typische Verwendung | Beispiele |
| ------ | ----------------------------- | ------------------------------------ | -------------------------- |
| `@` | Wo/womit kann ich es erledigen? | Einschränkung durch Ort, Werkzeug oder Person | @home, @work, @phone |
| `#` | Worum geht es dabei? | Thema, Energie, Modus oder Kennzeichnung | #focused, #lowenergy |

### Praktische Empfehlung

- Verwenden Sie **`@`-Kontexte** als *Ausführungsfilter* (benötigte Orte/Werkzeuge/Personen).
- Verwenden Sie **`#`-Tags** zur *Kategorisierung* (Energiestufe, Thema oder projektübergreifende Gruppierung).
- Beide unterstützen **Hierarchien** (z. B. `@work/meetings`, `#health/fitness`).

---

## Siehe auch

- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
- [Bereiche und Personen](/de/use/areas-people)
- [Desktop-Benutzerhandbuch](/de/use/desktop)
- [Mobiles Benutzerhandbuch](/de/use/mobile)
