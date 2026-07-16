# Dropbox-Synchronisierung

Mindwtr unterstützt in geeigneten Desktop- und Mobil-Builds die direkte Dropbox-Synchronisierung.

Sie verwendet Dropbox OAuth mit Zugriff auf den **App-Ordner**, sodass Mindwtr Daten ausschließlich unter folgenden Pfaden liest und schreibt:

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/*`

---

## Verfügbarkeit

- **Desktop (offizielle Builds):** Unterstützt
- **Mobilgeräte (offizielle Builds):** Unterstützt
- **Expo Go:** Für Dropbox OAuth nicht unterstützt
- **FOSS-Builds:** Die Dropbox-Synchronisierung kann deaktiviert sein
- **Docker-/PWA-Web-Build:** Nicht unterstützt; verwenden Sie stattdessen einen nativen Desktop-/Mobil-Build, eine selbst gehostete Synchronisierung oder WebDAV

Wenn Dropbox in Ihrem Build deaktiviert ist oder Sie die über Docker bereitgestellte PWA verwenden, nutzen Sie stattdessen [Daten und Synchronisierung](/de/data-sync/) (Dateisynchronisierung), [Cloud-Bereitstellung](/de/data-sync/cloud-deployment) (selbst gehostet) oder WebDAV.

---

## Einrichtung für Benutzer offizieller Builds

1. Öffnen Sie **Einstellungen → Synchronisierung**.
2. Wählen Sie in der Auswahl **Synchronisierungs-Backend** die Option **Dropbox**. Mindwtr zeigt den ausgewählten Pfad als **Cloud-Synchronisierung** an.
3. Klicken oder tippen Sie auf **Dropbox verbinden** und schließen Sie OAuth in Ihrem Browser ab.
4. Verwenden Sie zurück in Mindwtr **Verbindung testen**.
5. Führen Sie eine **Synchronisierung** aus.

Prüfen Sie nach der ersten Synchronisierung, ob der App-Ordner in Dropbox vorhanden ist:

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/`

---

## Einrichtung für eigene Builds

Wenn Sie Mindwtr selbst bauen, müssen Sie beim Build einen Dropbox-App-Schlüssel bereitstellen.

### 1. Dropbox-App erstellen

In der Dropbox App Console:

- App-Typ: **Scoped access**
- Zugriffstyp: **App folder**
- Berechtigungsbereiche: `files.content.read`, `files.content.write`, `files.metadata.read`
- Ablauf für öffentliche Clients / PKCE aktivieren

### 2. Umleitungs-URIs hinzufügen

- Mobilgeräte: `mindwtr://redirect`
- Desktop: `http://127.0.0.1:53682/oauth/dropbox/callback`

### 3. App-Schlüssel beim Build einfügen

- Desktop: `VITE_DROPBOX_APP_KEY=<your_app_key>`
- Mobilgeräte: `DROPBOX_APP_KEY=<your_app_key>`

Bei macOS-App-Store-Builds verwendet der Desktop-OAuth-Rückruf einen lokalen Loopback-Listener auf `127.0.0.1:53682`. Daher muss der Berechtigungssatz der App `com.apple.security.network.server` enthalten.

Legen Sie in CI-/Release-Arbeitsabläufen folgende Repository-Variablen oder Geheimnisse fest:

- `VITE_DROPBOX_APP_KEY`
- `DROPBOX_APP_KEY`

---

## Fehlerbehebung

### `Invalid redirect_uri`

Stellen Sie sicher, dass die in Mindwtr angezeigte URI exakt mit den Einstellungen der Dropbox-App übereinstimmt.

### HTTP 401 / Token ungültig

Das Token ist abgelaufen, wurde widerrufen oder für einen anderen App-Schlüssel ausgestellt. Verbinden Sie Dropbox erneut.

### Keine Dropbox-Option in den Einstellungen

In Ihrem Build ist Dropbox wahrscheinlich deaktiviert (häufig bei FOSS-Builds) oder der App-Schlüssel für den Build fehlt.

### App scheint verbunden, aber die Synchronisierung läuft nicht

Verwenden Sie zuerst **Verbindung testen**. Führen Sie bei Erfolg die **Synchronisierung** aus und prüfen Sie die Protokolle unter [Diagnose und Protokolle](/de/data-sync/diagnostics-logs).

---

## Sicherheit und Datenschutz

- Mindwtr fordert nur Zugriff auf den App-Ordner an, nicht auf das gesamte Dropbox-Konto.
- OAuth-Tokens werden lokal auf dem Gerät gespeichert.
- Der Mindwtr-Entwickler leitet Dropbox-Anfragen nicht weiter und erhält Ihr Dropbox-Token nicht.

Siehe:

- [Daten und Synchronisierung](/de/data-sync/)
- [Datenschutzrichtlinie](https://mindwtr.app/privacy)
