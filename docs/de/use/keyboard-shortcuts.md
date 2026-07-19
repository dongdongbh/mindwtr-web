# Desktop-Tastenkürzel

Mindwtr unterstützt auf dem Desktop eine tastaturorientierte Bedienung mit den Voreinstellungen Standard (im Stil von Gmail/Todoist), Vim und Emacs. Drücken Sie in der App `?`, um die aktuelle Tastenkürzelhilfe für Ihre Voreinstellung zu öffnen.

## Schnellstart

- Wählen Sie Ihre Voreinstellung unter **Einstellungen → Allgemein → Tastenkürzel**.
- Drücken Sie in der App `?`, um die aktuelle Übersicht für Ihre Voreinstellung zu öffnen. Am Ende der Übersicht steht eine Tabelle zur Syntax von „Schnell hinzufügen“, die alle Tokens aufführt (`/start:`, `/note:`, `@context`, `+Project`, …).
- Verwenden Sie `/` zum Suchen.
- Verwenden Sie `gi` für den Posteingang, `gn` für „Nächste Aktionen“ und `gf` für „Fokus“ (im Standard- und Vim-Modus).
- Verwenden Sie `a`, um eine Aufgabe hinzuzufügen, während Mindwtr im Fokus ist. `o` funktioniert weiterhin für dieselbe app-interne Aktion zum Hinzufügen einer Aufgabe.
- Mit `j` und `k` bewegen Sie die Auswahl und mit `Enter` öffnen Sie die ausgewählte Aufgabe.
- Im Standardmodus markiert `e` eine Aufgabe als erledigt, `x` wählt Aufgaben für Stapelaktionen aus, `Shift+Enter` bearbeitet, `#` löscht und `z` macht rückgängig.
- Im Vim-Modus bearbeitet `e`, `x` schaltet „Erledigt“ um und `dd` löscht.
- Mit `Ctrl+Z` / `Cmd+Z` machen Sie in jeder Voreinstellung den letzten Aufgabenabschluss oder die letzte Löschung rückgängig.
- Verwenden Sie in jeder Voreinstellung `s` gefolgt von einem Buchstaben, um den Status der ausgewählten Aufgabe festzulegen: `si` Posteingang, `sn` Nächstes, `sw` Warten, `ss` Irgendwann, `sd` Erledigt, `sa` Archiviert. Eine Benachrichtigung bestätigt die Änderung und bietet eine Schaltfläche zum Rückgängigmachen.
- Mit `Insert` wechseln Sie zum Eingabefeld zum Hinzufügen einer Aufgabe (in Ansichten ohne dieses Feld wird „Schnell hinzufügen“ geöffnet).
- Drücken Sie `1`–`9` (außerhalb von Textfeldern), um entsprechend der Reihenfolge in der Seitenleiste zu einem Bereich zu wechseln, oder `0`, um den Bereichsfilter zu entfernen; die Tastenfolge `Shift+A` und danach die Zahl funktioniert weiterhin. Ein einfaches `a` öffnet „Schnell hinzufügen“.
- Mit `Ctrl+Alt+S` führen Sie auf dem Desktop eine manuelle Synchronisierung aus.
- Im Kontextmenü über Rechtsklick / `Shift+F10`: ↑/↓ wechselt zwischen Einträgen, → öffnet ein Untermenü und ← kehrt zurück, `Enter` aktiviert, `Esc` schließt das Menü und setzt den Fokus zurück auf die Aufgabe.

Während der Eingabe in bearbeitbaren Feldern werden Tastenkürzel ignoriert, wenn sie mit der Texteingabe in Konflikt geraten würden.

Die Desktop-Anleitung bleibt die maßgebliche Referenz für die aktuellen Tastenkürzeltabellen, die Anpassung von „Schnell hinzufügen“, Hinweise zum Tastaturverhalten und Sonderfälle.

## Globales „Schnell hinzufügen“

Ändern oder deaktivieren Sie das globale Tastenkürzel für „Schnell hinzufügen“ unter **Einstellungen → Allgemein → Eingabe**. Globale Tastenkürzel hängen von den Desktop-Plattformberechtigungen und der Paketierung ab.

Das globale Tastenkürzel für „Schnell hinzufügen“ unterscheidet sich vom app-internen Kürzel `a`. Das globale Kürzel kann aus anderen Apps heraus ausgelöst werden; `a` funktioniert nur, während Mindwtr selbst den Fokus hat und Sie nicht in ein Textfeld eingeben.

## Siehe auch

- [Desktop-Anleitung](/de/use/desktop)
- [Erste Schritte](/de/start/getting-started)
