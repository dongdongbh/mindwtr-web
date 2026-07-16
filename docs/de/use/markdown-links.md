# Markdown-Links

Mindwtr unterstützt interne Markdown-Links, um Aufgaben und Projekte in Notizen miteinander zu verknüpfen.

## Unterstützte Syntax

Verwenden Sie stabile Mindwtr-IDs statt einfacher Texttitel:

```md
[[task:task-id|Quarterly review]]
[[project:project-id|Website launch]]
```

- Links mit `task:` verweisen über ihre ID auf eine Aufgabe.
- Links mit `project:` verweisen über ihre ID auf ein Projekt.
- Der Text nach `|` ist die im Editor und in der Vorschau angezeigte Beschriftung.

Beim Rendern wandelt Mindwtr diese Token außerdem in reguläre Markdown-Links um:

```md
[Quarterly review](mindwtr://task/task-id)
[Website launch](mindwtr://project/project-id)
```

## Links erstellen

Geben Sie beim Bearbeiten eines unterstützten Markdown-Felds `[[` ein und beginnen Sie zu suchen.

- Die Suche berücksichtigt Aufgaben- und Projekttitel.
- Auf dem Desktop erscheint nahe dem Cursor ein schwebendes Vorschlagsfenster. Bei wenig Platz wechselt es über die Einfügemarke.
- Auf Mobilgeräten erscheinen dieselben Vorschläge in einem Bereich über der Tastatur.
- Aufgaben-Editoren schließen die gerade bearbeitete Aufgabe aus, damit Sie sie nicht versehentlich mit sich selbst verknüpfen.
- Eingefügte Links verwenden stets das stabile Token `[[task:...|label]]` oder `[[project:...|label]]`.
- Inline-Code und eingezäunte Codeblöcke bleiben unverändert.

## Wo Links funktionieren

- Aufgabenbeschreibungen auf Desktop und Mobilgeräten
- Projektnotizen auf Desktop und Mobilgeräten
- Schreibgeschützte Vorschauen, erweiterte Aufgabendetails und die Darstellung „Details ein“ in Fokus/Listen auf dem Desktop
- Vorschau in mobilen Aufgaben- und Projekteditoren

## Was Links nicht leisten

- Markdown-Links sind ausschließlich Navigationsverweise.
- Sie erzeugen keine Abhängigkeitsgraphen, erledigen verknüpfte Aufgaben nicht automatisch und koppeln keine Checklistenstände zwischen Aufgaben.

## Navigationsverhalten

- Aktive Aufgabenlinks öffnen die passende Mindwtr-Ansicht und markieren die Aufgabe.
- Aktive Projektlinks öffnen die Projektansicht und wählen das Projekt aus.
- Externe Links unterstützen weiterhin `http`, `https`, `mailto` und `tel`.

## Gelöschte Einträge

Wenn eine verknüpfte Aufgabe oder ein Projekt gelöscht wurde:

- Mindwtr stellt die Beschriftung durchgestrichen dar.
- Auf dem Desktop erscheint die Aktion **Wiederherstellen**, solange der gelöschte Eintrag noch als Löschmarkierung in den lokalen Daten vorhanden ist.
- Ist die Löschmarkierung nicht mehr vorhanden, bleibt der Link als nicht interaktive Beschriftung für einen gelöschten Eintrag stehen.

## Beispiel

```md
Prepare launch notes for [[project:project-123|Website launch]]

- [ ] Draft intro copy
- [ ] Review [[task:task-456|homepage checklist]]
```

## Verwandte Dokumentation

- [Obsidian-Integration](/de/power-users/obsidian)
- [Core-API](/de/developers/core-api)
