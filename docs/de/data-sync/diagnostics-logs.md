# Diagnose und Protokolle

Mindwtr besitzt eine integrierte Diagnoseprotokollierung zur Fehlersuche bei Synchronisierungsproblemen und Abstürzen. Protokolle bleiben **ausschließlich lokal**; vertrauliche Werte werden vor dem Schreiben **unkenntlich gemacht**.

---

## Debug-Protokollierung aktivieren

### Desktop

1. Öffnen Sie **Einstellungen → Daten**.
2. Aktivieren Sie **Debug-Protokollierung**.
3. Reproduzieren Sie das Problem.

**Diagnose-Builds einer Release-Version:** Entwicklerwerkzeuge und zusätzliche Protokollierung sind nur verfügbar, wenn die Desktop-App mit dem Feature `diagnostics` gebaut wurde.

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Mobilgeräte

1. Öffnen Sie **Einstellungen → Daten**.
2. Aktivieren Sie **Debug-Protokollierung**.
3. Reproduzieren Sie das Problem.

---

## Protokolle teilen oder löschen

### Desktop

- Der Pfad der Protokolldatei wird unter **Einstellungen → Daten** angezeigt.
- Dort können Sie die Protokolle auch löschen.

### Mobilgeräte

- Mit **Protokoll teilen** exportieren Sie eine Protokolldatei.
- Mit **Protokoll löschen** entfernen Sie alte Einträge.

---

## Standardmäßige Protokollpfade (Desktop)

| Plattform | Protokolldatei |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## Was protokolliert wird

- Fehler und Schritte der Synchronisierung
- Konfliktzusammenfassungen: Zusammenführungen mit gelösten Konflikten werden auch bei deaktivierter Debug-Protokollierung immer in `mindwtr.log` geschrieben, damit die Lösung später nachvollziehbar bleibt. Diese Einträge enthalten Datensatz-IDs, Namen geänderter Felder und die gewählte Seite, jedoch niemals Inhalte wie Titel oder Notizen.
- Unerwartete Laufzeitfehler

Vertrauliche Werte wie API-Schlüssel, Token, Passwörter und URLs mit Zugangsdaten werden automatisch unkenntlich gemacht.

---

## Verwandte Seiten

- [FAQ](/de/start/faq)
- [Daten und Synchronisierung](/de/data-sync/)
