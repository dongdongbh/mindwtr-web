# Fehlerbehebung für Entwickler

Diese Seite fasst die häufigsten Probleme bei der lokalen Entwicklung und den kürzesten Weg zu ihrer Diagnose zusammen.

---

## Probleme mit Abhängigkeiten/Workspace

### `bun install` schlägt fehl oder Pakete scheinen nicht synchron zu sein

- Führen Sie `bun install` im Stammverzeichnis des Repositorys aus, nicht in einem App-Unterverzeichnis.
- Schließen Sie veraltete Annahmen über die Lockdatei aus, bevor Sie Fehler auf Codeebene untersuchen.
- Wenn Versionen gerade angehoben wurden, stellen Sie sicher, dass `bun install` nach dem Skript zur Versionsanhebung abgeschlossen wurde.

### TypeScript kann Workspace-Pakete nicht auflösen

- Prüfen Sie, ob Sie Befehle im Stammverzeichnis des Repositorys ausführen, sofern die Paketdokumentation nichts anderes angibt.
- Führen Sie `bun install` erneut aus.
- Vergewissern Sie sich, dass der Paketfilter dem Workspace-Namen entspricht (`mindwtr`, `mobile`, `@mindwtr/core` usw.).

---

## Probleme beim Desktop-Build

### Tauri-Build schlägt unter Linux fehl

Häufig fehlende Voraussetzungen:

- Rust-Toolchain
- WebKitGTK-Entwicklungspakete
- OpenSSL-Entwicklungspakete
- GTK-Entwicklungspakete

Plattformspezifische Installationsbefehle finden Sie im [Entwicklerleitfaden](/de/developers/developer-guide).

### Desktop-App startet, aber Diagnosedaten fehlen

Diagnosedaten für Releases sind nur verfügbar, wenn die App mit dem Feature `diagnostics` gebaut wurde:

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Unklarheit über Desktop-Daten- oder Konfigurationspfade

Siehe die Hinweise zu Speicherpfaden in `docs/CONTRIBUTING.md` und die Einstellungsansichten in der App.

---

## Probleme bei der mobilen Entwicklung

### Android-/iOS-Werkzeuge werden nicht erkannt

- Prüfen Sie, ob die Pfade zu Android Studio/SDK gesetzt sind
- Prüfen Sie, ob Xcode für die iOS-Entwicklung installiert ist
- Beginnen Sie mit `bun mobile:start` im Stammverzeichnis des Repositorys

### Probleme mit Expo/Metro

- Starten Sie den Expo-Entwicklungsserver neu
- Führen Sie `bun install` erneut aus
- Stellen Sie sicher, dass Sie Installationsabläufe auf Stamm- und App-Ebene nicht vermischen

### Ein nativer/nur auf Geräten auftretender Fehler lässt sich in Tests nicht reproduzieren

- Fügen Sie den kleinstmöglichen Unit-/Integrationstest für die gemeinsame Logik hinzu
- Dokumentieren Sie die manuellen Schritte auf dem Gerät im PR
- Erfassen Sie Protokolle, bevor Sie Verhalten ändern

---

## Fehlersuche bei Synchronisierung/Speicherung

### Weitere Einzelheiten zu Synchronisierungsfehlern werden benötigt

Verwenden Sie den integrierten Diagnoseablauf unter [Diagnose und Protokolle](/de/data-sync/diagnostics-logs).

### Verdacht auf einen Zusammenführungs- oder Datenintegritätsfehler

Beginnen Sie in dieser Reihenfolge:

1. Tests in `packages/core` für die betreffende Hilfsfunktion zur Synchronisierung/Suche/Speicherung
2. Tests der Plattform-Wrapper (Desktop/Mobilgeräte)
3. Lokale Diagnoseprotokolle

Nehmen Sie nicht sofort UI-Änderungen vor, wenn die Fehlerursache tatsächlich in der gemeinsamen Core-Logik liegt.

---

## Testprobleme

### Ein Pakettest schlägt fehl, aber die vollständige App läuft weiterhin

- Behandeln Sie den Testfehler als echte Regression, bis das Gegenteil bewiesen ist.
- Führen Sie zuerst den engsten Test auf Paketebene erneut aus.
- Prüfen Sie, ob der Fehler im App-Code oder in der Testumgebung liegt.

### React-Native-Tests erzeugen viele Meldungen

- Veraltungswarnungen von `react-test-renderer` werden in den aktuellen Mobiltests erwartet.
- Ziehen Sie gezielte Assertions umfangreichen Snapshot-Änderungen vor.

---

## Wann weitere Diagnosedaten hinzugefügt werden sollten

Fügen Sie Protokollierung oder Instrumentierung hinzu, wenn:

- sich der Fehler nicht zuverlässig reproduzieren lässt
- der Fehler Paketgrenzen überschreitet
- der Zeitpunkt der Synchronisierung oder der Speicherzustand relevant ist
- sich eine native Schnittstelle/API je nach Plattform unterschiedlich verhält

Halten Sie Protokolle lokal und schwärzen Sie Geheimnisse/Token.

---

## Verwandte Seiten

- [Entwicklerleitfaden](/de/developers/developer-guide)
- [Teststrategie](/de/developers/testing-strategy)
- [Diagnose und Protokolle](/de/data-sync/diagnostics-logs)
- [Architektur](/de/developers/architecture)
