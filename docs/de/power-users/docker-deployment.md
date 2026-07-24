# Docker-Bereitstellung

Mindwtr bietet offizielle Docker-Unterstützung für den Betrieb von:
- **mindwtr-app**: der Desktop-Web-/PWA-Build, bereitgestellt durch Nginx
- **mindwtr-cloud**: der schlanke Synchronisierungsserver und die REST-API zur Aufgabenautomatisierung

Diese sind als Docker-Images verfügbar und lassen sich einfach mit Docker Compose orchestrieren.

---

## Schnellstart (Docker Compose)

Sie müssen das Repository nicht klonen. Die offiziellen Images werden auf GHCR veröffentlicht, und die Datei `compose.yaml` lädt sie für Sie herunter.

1. **Laden Sie die Compose-Datei herunter**:
   ```bash
   curl -LO https://raw.githubusercontent.com/dongdongbh/Mindwtr/main/docker/compose.yaml
   ```

2. **Legen Sie daneben eine `.env`-Datei an** (Docker Compose liest sie automatisch):
   ```dotenv
   MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
   MINDWTR_CLOUD_CORS_ORIGIN=http://localhost:5173
   ```

   `MINDWTR_CLOUD_CORS_ORIGIN` muss exakt der Adresse entsprechen, unter der Sie die PWA im Browser öffnen, einschließlich Schema und Port. `http://localhost:5173` funktioniert nur, wenn der Browser auf dem Docker-Host selbst läuft. Von jedem anderen Gerät aus verwenden Sie die Adresse des Hosts, zum Beispiel `http://192.168.1.20:5173`. Es kann nur eine Origin gesetzt werden.

3. **Laden und starten Sie die Dienste**:
   ```bash
   docker compose pull
   docker compose up -d
   ```

4. **Rufen Sie die Dienste auf**:
   - **PWA (Web-App):** Öffnen Sie `http://localhost:5173` im Browser.
   - **Cloud-Zustandsprüfung:** Öffnen Sie `http://localhost:8787/health`.
   - **Self-Hosted-URL für lokale Tests:** `http://localhost:8787`
   - **Basis-URL der REST-API:** `http://localhost:8787/v1`

Wenn Sie die Images stattdessen aus dem Quellcode bauen möchten, klonen Sie das Repository und führen Sie in dessen Stammverzeichnis `docker compose -f docker/compose.yaml up --build -d` aus. Siehe [Manuell bauen](#manuell-bauen) weiter unten.

Diese standardmäßige Compose-Datei verwendet ausschließlich HTTP und ist für lokale/private Tests vorgesehen. Mindwtr-Clients für Desktop- und Mobilgeräte akzeptieren HTTP nur für erkannte lokale/private Ziele wie `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` bis `172.31.x.x`, `192.168.x.x`, Loopback-/private IPv6-Adressen, `*.local` und `*.home.arpa`.

Verwenden Sie HTTPS für öffentliche URLs, benutzerdefinierte DNS-Namen, VPN-Hostnamen, Tailscale, ZeroTier oder jeden Namen, der nicht als lokal/privat erkannt wird, oder aktivieren Sie **Unsichere Verbindungen (HTTP) zulassen** in den Sync-Einstellungen der App, um diesen Hostnamen über unverschlüsseltes HTTP zu akzeptieren. Die Daten werden dann unverschlüsselt übertragen; nutzen Sie die Option daher nur in einem Netzwerk, dem Sie vertrauen.

---

## HTTPS-Einrichtung mit Caddy

Verwenden Sie für die öffentliche Desktop- oder Mobilsynchronisierung die Compose-Datei mit Caddy:

```bash
cp docker/.env.https.example docker/.env.https.local
```

Bearbeiten Sie `docker/.env.https.local`:

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.example.com
MINDWTR_CLOUD_AUTH_TOKENS=your_long_random_token
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.example.com
MINDWTR_CADDYFILE=Caddyfile.https
```

Starten Sie den Stack:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

Prüfen Sie den Server:

```bash
curl https://mindwtr.example.com/health
```

Setzen Sie in Mindwtr unter Einstellungen → Synchronisierung → Self-Hosted die Self-Hosted-URL auf:

```text
https://mindwtr.example.com
```

Mindwtr hängt `/v1/data` automatisch an.

### Öffentliches HTTPS

Verwenden Sie `Caddyfile.https`, wenn `MINDWTR_CLOUD_DOMAIN` ein öffentlicher DNS-Name ist, der auf diesen Docker-Host verweist. Die Ports 80 und 443 müssen für die automatische Zertifikatsausstellung erreichbar sein. Caddy bezieht und erneuert das Zertifikat und leitet Anfragen per Reverse Proxy an `mindwtr-cloud` weiter.

### HTTPS nur im LAN

Verwenden Sie `Caddyfile.local-https`, wenn der Hostname nur in Ihrem Heimnetz aufgelöst wird:

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

Dies verwendet die interne Zertifizierungsstelle von Caddy. Jedes Clientgerät muss dem lokalen Stammzertifikat von Caddy vertrauen, bevor Mindwtr die HTTPS-Verbindung akzeptiert. Öffentliche Let's-Encrypt-Zertifikate sind für Mobilclients die zuverlässigere Wahl.

Exportieren Sie nach dem Start des reinen LAN-Stacks das lokale Stammzertifikat von Caddy:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

Installieren Sie dieses Zertifikat auf jedem Gerät, das mit diesem Hostnamen synchronisiert, als vertrauenswürdiges Stammzertifikat.

---

## Konfiguration

### Synchronisierungstoken
Der Cloud-Server benötigt ein Token zur Authentifizierung. Sie müssen es in den Umgebungsvariablen festlegen.

Setzen Sie in `docker/compose.yaml` (oder über eine Umgebungsvariable):

```yaml
MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
```

`MINDWTR_CLOUD_TOKEN` wird aus Gründen der Abwärtskompatibilität weiterhin akzeptiert, ist aber veraltet.

Für Docker Secrets können Sie stattdessen eine Datei einbinden und darauf verweisen:

```yaml
MINDWTR_CLOUD_AUTH_TOKENS_FILE: /run/secrets/mindwtr_cloud_tokens
```

**Token erzeugen:**
Mit folgendem Befehl können Sie ein starkes zufälliges Token erzeugen:
```bash
cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 50 | head -n 1
```

### Clientkonfiguration
So verbinden Sie Ihre Mindwtr-Clients (Desktop oder Mobilgerät) mit dieser selbst gehosteten Cloud:

1. Öffnen Sie **Einstellungen → Synchronisierung**.
2. Wählen Sie **Self-Hosted** (oder Cloud).
3. Setzen Sie die **Self-Hosted-URL** auf den Basisendpunkt Ihres Servers:
   ```
   http://localhost:8787
   ```
   *Mindwtr hängt `/v1/data` automatisch an diese URL an.*
4. Geben Sie **dasselbe Token** ein, das Sie in `MINDWTR_CLOUD_AUTH_TOKENS` konfiguriert haben.

Verwenden Sie für privates LAN-HTTP eine lokale/private Adresse wie `http://192.168.1.20:8787`. Verwenden Sie für öffentliche URLs die oben beschriebene HTTPS-Einrichtung mit Caddy.

### Dropbox-Synchronisierung und die Docker-PWA

Das Docker-Image `mindwtr-app` stellt den Browser-/PWA-Build bereit. Die native Dropbox-OAuth-Synchronisierung ist in dieser Laufzeitumgebung nicht verfügbar, da die Dropbox-Verbindung in den nativen Desktop- und Mobil-Apps implementiert ist. Das Hinzufügen von `VITE_DROPBOX_APP_KEY` oder `DROPBOX_APP_KEY` über `.env`, `env_file`, die Compose-Laufzeitumgebung oder ein Docker-Buildargument aktiviert Dropbox in Docker nicht.

Verwenden Sie für eine mit Docker gehostete Synchronisierung den mitgelieferten Self-Hosted-Cloud-Server oder WebDAV. Wenn der Self-Hosted-Endpunkt hinter Authelia oder einem anderen interaktiven SSO-Proxy liegt, konfigurieren Sie den Proxy so, dass der Synchronisierungs-/API-Pfad von Mindwtr das Bearer-Token von Mindwtr direkt verwenden kann. Die Mobil-App kann keine Authelia-Browseranmeldung vor `/v1/data` abschließen.

### API zur Aufgabenautomatisierung

Derselbe Container `mindwtr-cloud` stellt auch die REST-API zur Aufgabenautomatisierung bereit. Sie verwendet dieselbe Basis-URL und dasselbe Bearer-Token wie die Synchronisierung.

Häufig verwendete Endpunkte:

- `GET /v1/data` und `PUT /v1/data` für die Synchronisierung
- `GET /v1/tasks` und `POST /v1/tasks` zum Auflisten und Erstellen von Aufgaben
- `GET /v1/projects` für Projekte
- `GET /v1/search?query=...` zur Suche nach Aufgaben und Projekten

Beispiel:

```bash
curl -X POST http://localhost:8787/v1/tasks \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"input":"Review PR @work /due:tomorrow"}'
```

### CORS-Ursprung (Produktion)

Der Cloud-Server verwendet standardmäßig `http://localhost:5173` für CORS. Setzen Sie für den Produktivbetrieb:

```yaml
MINDWTR_CLOUD_CORS_ORIGIN=https://your-app-domain.example
```

---

## Datenpersistenz

Binden Sie ein Volume für das Datenverzeichnis ein, damit Ihre Cloud-Daten bei Containerneustarts erhalten bleiben.

In Ihrer `compose.yaml`:

```yaml
volumes:
  - ./data:/app/cloud_data
```

---

## Manuell bauen

Wenn Sie die Images ohne Compose selbst bauen möchten:

**PWA bauen:**
```bash
docker build -f docker/app/Dockerfile -t mindwtr-app .
```

**Cloud-Server bauen:**
```bash
docker build -f docker/cloud/Dockerfile -t mindwtr-cloud .
```

---

## GitHub Actions und GHCR

Das Projekt enthält einen GitHub-Actions-Workflow, der Images automatisch baut und an die GitHub Container Registry (GHCR) überträgt.

**Offizielle Images:**
- `ghcr.io/dongdongbh/mindwtr-app:latest`
- `ghcr.io/dongdongbh/mindwtr-cloud:latest`

Vorabversionen sind unter dem beweglichen Tag `beta` verfügbar, der immer auf die neueste Veröffentlichung (Release Candidate oder stabile Version) verweist, oder über eine feste Version, z. B. `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`. `latest` bleibt stets bei der stabilen Version. Weitere Plattformen finden Sie unter [An den Beta-Kanälen teilnehmen](/de/start/beta-channels).

Die Datei `docker/compose.yaml` ist standardmäßig für diese Images konfiguriert, sodass Sie die neueste Version einfach abrufen können, ohne lokal zu bauen.

---

## Technische Hinweise

- **PWA-Bereitstellung:** Die Web-App verwendet clientseitiges Rendering. Der Nginx-Container ist mit `try_files` so konfiguriert, dass alle Anfragen an `index.html` umgeleitet werden. Dadurch entstehen beim Neuladen einer Seite keine 404-Fehler.
- **Basis-Image:** Der Build verwendet Bun (fest auf v1.3 gesetzt) und enthält die für `better-sqlite3` erforderlichen C++20-Flags.
