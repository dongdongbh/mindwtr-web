# Tägliche Durchsicht

Die tägliche Durchsicht ist ein kurzer Neustart, mit dem Sie zwischen den Wochenrückblicken auf dem aktuellen Stand bleiben. Auf dem Desktop erscheint sie in der Ansicht „Durchsicht“, auf Mobilgeräten als eigene Route.

Es geht nicht um Ordnung um ihrer selbst willen. Wenige Minuten schließen die Lücke zwischen dem, was Ihre Listen behaupten, und dem, was gerade tatsächlich gilt. So können Sie den Listen für den Rest des Tages vertrauen, statt offene Vorgänge im Kopf zu behalten.

## Ablauf

Die Standardreihenfolge lautet:

1. Heute und Kalender
2. Posteingang, sofern aktuelle Einträge vorhanden sind
3. Warten
4. Heutiger Fokus, sofern aktiviert
5. Abschluss

Posteingang und Warten stehen bewusst vor dem Fokus: Neue Einträge werden zuerst geklärt. Aufgaben, auf die Sie gewartet haben, können nach Wegfall der Blockade zu „Nächstes“ wechseln und bei der Wahl des heutigen Fokus berücksichtigt werden. Leere Schritte werden übersprungen.

## Einstellungen

Der Fokus-Schritt wird gesteuert durch:

```typescript
settings.gtd.dailyReview.includeFocusStep
```

Desktop- und Mobil-App zeigen dies in den GTD-Einstellungen als „Fokus-Schritt einbeziehen“ an. Der Schritt ist standardmäßig sichtbar. Setzen Sie den Wert auf `false`, um den kürzeren Ablauf Heute/Posteingang/Warten zu verwenden.

Verwandte Einstellungen:

| Einstellung | Zweck |
| --- | --- |
| `settings.gtd.defaultScheduleTime` | Füllt Felder zur manuellen Terminplanung vor. |
| `settings.weekStart` | Steuert die Anordnung der Kalenderwoche. |
| `settings.calendar.viewMode` | Speichert den andernorts in der App verwendeten Kalendermodus. |

## Verhalten auf dem Desktop

Solange das Fenster geöffnet ist, speichert die Desktop-App den aktuellen Schritt der Durchsicht im lokalen Speicher. Nach Schließen und erneutem Öffnen wird derselbe Schritt fortgesetzt; beim Abschluss wird der gespeicherte Schritt gelöscht.

Aufgabenzeilen in der Durchsicht bieten die normalen Schnellaktionen und Aufgabendetails einschließlich Bereichs- und Projektaktionen, sofern verfügbar.

## Verhalten auf Mobilgeräten

Die mobile App verwendet dieselbe GTD-Einstellung für den Fokus-Schritt und zeigt die Durchsicht als eigene Ansicht. Die beabsichtigten Schritte entsprechen dem Desktop-Ablauf, ergänzt um mobile Navigationssteuerungen.

## Verwandte Seiten

- [Wochenrückblick](/de/use/weekly-review)
- [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow)
- [Kalenderintegration](/de/use/calendar-integration)
