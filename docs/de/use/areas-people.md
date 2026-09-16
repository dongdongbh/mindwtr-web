# Bereiche und Personen

Verwenden Sie **Bereiche** für dauerhafte Verantwortlichkeiten und **Personen** für delegierte oder personenbezogene Arbeit. Beide können direkt bei der Zuweisung erstellt und später in den Einstellungen verwaltet werden.

## Bereiche

Bereiche gruppieren zusammengehörige Projekte und eigenständige Aufgaben unter einer dauerhaften Verantwortung, etwa Beruf, Zuhause, Gesundheit, Forschung oder dem Namen eines Kunden.

Verwenden Sie einen Bereich, wenn Sie die Frage beantworten möchten: „Welche Arbeit gehört zu diesem Teil meines Lebens oder meiner Arbeit?“

### Einen Bereich beim Zuweisen erstellen

Sie müssen den Aufgabenablauf nicht verlassen, um einen Bereich zu erstellen.

1. Öffnen Sie „Schnell hinzufügen“, „Schnellerfassung“ oder den Aufgabeneditor.
2. Öffnen Sie das Feld **Bereich**.
3. Geben Sie den Namen des Bereichs ein.
4. Falls er noch nicht vorhanden ist, wählen Sie **Erstellen**.
5. Der neue Bereich wird für die Aufgabe ausgewählt.

Auf dem Desktop ist dieses Verhalten zum Erstellen während der Eingabe ebenfalls in den Bereichsauswahlen verfügbar. Auf Mobilgeräten können Sie in der Bereichsauswahl der Schnellerfassung und Aufgabenbearbeitung zuerst suchen und den Bereich anschließend erstellen, wenn keine genaue Übereinstimmung vorhanden ist.

### Bereiche in den Einstellungen erstellen oder bearbeiten

Verwenden Sie die Einstellungen, wenn Sie gespeicherte Bereiche direkt verwalten möchten.

1. Öffnen Sie **Einstellungen**.
2. Öffnen Sie **Verwalten**.
3. Klappen Sie **Bereiche** auf.
4. Fügen Sie einen neuen Bereich hinzu, benennen Sie einen um, ändern Sie seine Farbe oder löschen Sie einen nicht mehr benötigten Bereich.

Beim Löschen eines Bereichs bleiben seine Aufgaben und Projekte erhalten. Mindwtr hebt ihre Zuweisung auf, statt die Arbeit zu löschen.

### Nach Bereich filtern

Der Bereichsfilter schränkt Mindwtr auf die Bereiche ein, die Sie gerade sehen wollen. Auf dem Desktop steht er unten in der Seitenleiste, auf dem Mobilgerät oben links in der Kopfzeile des Bildschirms.

Ein Klick auf einen Bereich schaltet ihn durch drei Zustände:

1. **Ausgewählt** – seine Projekte und Aufgaben werden angezeigt.
2. **Ausgeschlossen** – seine Projekte und Aufgaben werden ausgeblendet.
3. **Aus** – der Bereich wirkt sich nicht mehr auf den Filter aus.

Wählen Sie mehrere Bereiche aus, um sie gemeinsam zu sehen, oder schließen Sie einen aus, um alles außer diesem zu sehen. **Keine Bereiche** steht ebenfalls in der Liste, sodass Sie Arbeit ohne Bereich einschließen oder ausschließen können. Die Auswahl gilt in allen Ansichten: Fokus, Nächste Aktionen, Projekte, Kalender, Suche, Rückblick, Board und Kontexte folgen ihr, bis Sie sie zurücksetzen.

**Der Eingang bleibt auf Desktop und Mobilgeräten bereichsübergreifend.** Seine Liste, Anzahl und die Warteschlange von **Eingang verarbeiten** umfassen unabhängig vom Bereichsfilter Einträge aus allen Bereichen, auch solche ohne Bereich. Dasselbe gilt für die Eingangsanzahl und den Verarbeitungsschritt im Rückblick. Der Eingang zeigt **Alle Bereiche** an; beim Öffnen bleiben Ihre Filterauswahl für andere Ansichten und bereits zugewiesene Aufgabenbereiche erhalten.

## Personen

Personen sind wiederverwendbare Namen von Verantwortlichen für delegierte Aufgaben, Einträge unter „Warten“ und personenbezogene Suchen. Sie können außerdem Notizen und Referenzlinks enthalten, etwa eine E-Mail-Adresse, eine Kontaktseite oder einen Obsidian-Link.

Verwenden Sie Personen, wenn Sie die Frage beantworten möchten: „Wer ist dafür verantwortlich, auf wen warte ich oder mit wem sollte ich das besprechen?“

### Eine Person beim Zuweisen erstellen

1. Öffnen Sie eine Aufgabe.
2. Suchen Sie **Zugewiesen an** oder **Verantwortliche Person**.
3. Geben Sie den Namen der Person ein.
4. Falls der Name noch nicht gespeichert ist, wählen Sie **Neue Person**.
5. Die Person wird gespeichert und der Aufgabe zugewiesen.

Sie können einen Namen auch als verantwortliche Person einer Aufgabe eingeben, ohne eine gespeicherte Person zu erstellen. Mit **Neue Person** wird der Name für zukünftige Vorschläge und die Einstellungen wiederverwendbar.

### Eine Person beim Erfassen zuweisen

Geben Sie in „Schnell hinzufügen“ `%` gefolgt vom Namen ein: `Ask %Jim for the budget /waiting`. Bekannte Namen werden ohne Anführungszeichen erkannt (auch mehrteilige Namen); setzen Sie einen neuen mehrteiligen Namen wie `%"Jim Smith"` in Anführungszeichen. Auf dem Desktop öffnet die Eingabe von `%` dieselben Personenvorschläge wie das Feld „Zugewiesen an“.

### Personen in den Einstellungen erstellen oder bearbeiten

1. Öffnen Sie **Einstellungen**.
2. Öffnen Sie **Verwalten**.
3. Klappen Sie **Personen** auf.
4. Fügen Sie eine Person hinzu, benennen Sie sie um, ergänzen Sie Notizen oder einen Referenzlink oder löschen Sie eine nicht mehr benötigte Person.

In der Zeile jeder Person steht, wie viele Aufgaben zu ihr gehören: sowohl die ihr zugewiesenen Aufgaben als auch Aufgaben mit ihrem Kontext `@name`. Tippen oder klicken Sie auf diese Zahl, um die globale Suche mit `person:"Name"` und einschließlich erledigter Aufgaben zu öffnen und alles zu dieser Person in einer Liste zu prüfen.

Beim Löschen einer Person bleiben die Aufgaben erhalten. Mindwtr entfernt den gespeicherten Personendatensatz, statt die Arbeit zu löschen.

### Alle Aufgaben zu einer Person durchsehen

Wählen Sie unter **Einstellungen → Verwalten → Personen** die Aufgabenanzahl einer Person, um ihre gemeinsame Aufgabenliste zu öffnen. Sie enthält Aufgaben, die dieser Person zugewiesen sind, und Aufgaben mit einem passenden Personenkontext, etwa `%Alex` und `@Alex`. Eine Aufgabe mit beiden Angaben erscheint nur einmal.

Sie können auch nach `person:"Alex"` oder `person:"Alex Smith"` suchen und die Suche für regelmäßige Durchsichten speichern. Namen müssen genau übereinstimmen; Groß- und Kleinschreibung sowie zusätzliche Leerzeichen werden ignoriert. `Alex` umfasst weder `Alexander` noch `@Alex/work`. Zuweisungen und Kontexte behalten ihre bisherige Bedeutung. Wenn Sie eine Person umbenennen, benennen Sie auch ihren Kontext um, damit die Namen weiterhin übereinstimmen.

Der Einstieg aus den Einstellungen schließt erledigte und archivierte Aufgaben ein, damit die Ergebnisse zur Anzahl passen. Deaktivieren Sie **Erledigte und archivierte Aufgaben einschließen**, um nur aktuelle Aufgaben durchzusehen.

## Verwandte Felder

| Feld | Verwendung | Wo es erstellt wird |
| --- | --- | --- |
| **Bereich** | Verantwortungsgruppen für Projekte und Aufgaben | Bereichsauswahl, Einstellungen → Verwalten → Bereiche |
| **Person** | Verantwortliche Person für delegierte Aufgaben oder Einträge unter „Warten“ | `%person` in „Schnell hinzufügen“ eingeben, Feld „Zugewiesen an“, Einstellungen → Verwalten → Personen |
| **Kontext** | Wo, mit welchem Werkzeug oder mit wem Sie die Aufgabe erledigen können | `@context` in „Schnell hinzufügen“ oder der Aufgabenbearbeitung eingeben |
| **Tag** | Kennzeichnung für Thema, Energie, Modus oder Gruppierung | `#tag` in „Schnell hinzufügen“ oder der Aufgabenbearbeitung eingeben |

## Siehe auch

- [Kontexte und Tags](/de/use/contexts-tags)
- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
- [Desktop-Anleitung](/de/use/desktop)
- [Mobile Anleitung](/de/use/mobile)
