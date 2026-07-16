# Web-App (PWA)

Die Desktop-App von Mindwtr kann mit dem Vite-Build als Browser-App ausgeführt werden. Bei der Ausführung in einem Browser (ohne Tauri) verwendet sie `localStorage` zur dauerhaften Speicherung und registriert einen Service Worker für Offline-/PWA-Unterstützung.

---

## Lokal ausführen

Sie können die PWA mit Bun lokal ausführen oder **Docker** verwenden.

### Docker verwenden (empfohlen)
Anweisungen zum Ausführen des PWA-Containers finden Sie unter [Docker-Bereitstellung](/de/power-users/docker-deployment).

### Bun verwenden
Aus dem Stammverzeichnis des Repositorys:

```bash
bun install
bun desktop:web
```

Dadurch wird Vite unter `http://localhost:5173/` gestartet.

---

## Für das Hosting bauen

```bash
bun desktop:web:build
```

Die Build-Ausgabe liegt in `apps/desktop/dist/` und kann als statische Website gehostet werden.

---

## PWA-Verhalten

- Die App registriert bei der Ausführung im Browser `apps/desktop/public/sw.js`.
- `sw.js` speichert `/`, `/index.html`, `/manifest.webmanifest`, `/icon.png` und `/logo.png` vorab im Cache und speichert weitere GET-Anfragen desselben Ursprungs bei Bedarf.
- Navigationsanfragen greifen offline auf `/index.html` zurück, sodass auch Deep Links weiterhin geladen werden.

---

## Hostinganforderungen

Hosten Sie `apps/desktop/dist/` im Stammverzeichnis (`/`) der Website. Der Service Worker wird von `/sw.js` registriert, und das Manifest verweist auf Stammpfade.

Stellen Sie sicher, dass Ihr statischer Host Folgendes ausliefert:
- `manifest.webmanifest` als `application/manifest+json` (empfohlen)
- `sw.js` als `application/javascript`

Wenn Sie die App unter einem Unterpfad hosten müssen (z. B. `/mindwtr/`), müssen die Registrierung des Service Workers und die Manifestpfade an den Basispfad angepasst werden.

---

## Einschränkungen

- Browser-Builds speichern Daten in `localStorage` (beim Löschen der Websitedaten werden auch die Mindwtr-Daten gelöscht).
- Einige reine Desktop-Funktionen sind im Browser möglicherweise nicht verfügbar, etwa Dateianhänge, die nativen Dateizugriff benötigen.
- Es gibt keine native Unterstützung für Infobereich oder globalen Hotkey.

---

## Siehe auch

- [Entwicklerhandbuch](/de/developers/developer-guide)
- [Daten und Synchronisierung](/de/data-sync/)
