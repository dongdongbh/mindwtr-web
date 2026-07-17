# Cloud-Bereitstellung

Diese Seite beschreibt den zuverlässigen Betrieb des Servers `apps/cloud` in produktionsähnlichen selbst gehosteten Umgebungen.

## Umfang

- Mindwtr Cloud ist ein leichtgewichtiges selbst gehostetes Backend für JSON-Synchronisierung und tokenauthentifizierte Endpunkte zur Aufgabenautomatisierung, keine vollständige gehostete App-Oberfläche.
- Es eignet sich am besten für Einzelmandanten oder kleine vertrauenswürdige Bereitstellungen.
- Betreiben Sie es hinter einem HTTPS-Reverse-Proxy und mit üblichen Maßnahmen zur Serverhärtung.

Hinweis zur Client-Kompatibilität:

- Mindwtr-Cloud-Clients verlangen für öffentliche URLs **HTTPS**.
- HTTP wird nur für lokale/private Ziele akzeptiert, etwa `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` bis `172.31.x.x`, `192.168.x.x`, private/Loopback-IPv6-Adressen, `*.local` und `*.home.arpa`.
- Fügen Sie bei eigenem DNS, VPN, Tailscale, ZeroTier oder anderen Namen, die nicht als lokal/privat erkannt werden, TLS auf der Reverse-Proxy-Ebene hinzu.
- **Unsichere Verbindungen (HTTP) erlauben** ist ausschließlich für vertrauenswürdige lokale/private Endpunkte gedacht, nicht als Freigabe für öffentliches HTTP.

## Bereitstellungstopologie

Empfohlener Aufbau:

1. Ein Reverse-Proxy (`nginx`, `caddy`, `traefik`) beendet TLS.
2. Der Cloud-Server-Container/-Prozess lauscht auf einer privaten Schnittstelle.
3. Ein persistentes Volume speichert `MINDWTR_CLOUD_DATA_DIR`.
4. Regelmäßige Sicherungen erfassen das Datenverzeichnis.

Der gleiche Cloud-Dienst verarbeitet:

- Synchronisierungsverkehr unter `/v1/data`
- Endpunkte zur Aufgabenautomatisierung wie `/v1/tasks`, `/v1/projects`, `/v1/areas`, `/v1/sections` und `/v1/search`

`PUT /v1/data` führt zusammen, statt blind zu ersetzen. Der Server liest die aktuelle Namensraum-Momentaufnahme, führt sie mit der hochgeladenen Momentaufnahme anhand der normalen revisionsbewussten Mindwtr-Regeln zusammen, validiert das Ergebnis und schreibt es zurück. Ein Client kann durch das Senden einer vollständigen JSON-Nutzlast nicht erwarten, mit einer älteren oder unvollständigen Ansicht neuere entfernte Datensätze zu löschen.

REST-Referenzfelder müssen auf aktive Datensätze verweisen. Beim Erstellen oder Ändern eines Projekts mit einer `areaId`, deren Bereich weich gelöscht wurde, wird beispielsweise `404 Area not found` zurückgegeben, statt das Projekt einer Löschmarkierung zuzuweisen. Verwenden Sie `areaId: null`, um den Bereich eines Projekts zu entfernen; eine leere Zeichenfolge wird abgelehnt.

Einzelheiten zu Anfragen und Antworten der Endpunkte finden Sie unter [Cloud API](/de/developers/cloud-api).

## Umgebungsgrundlage

Mindestanforderungen für den Produktivbetrieb:

- `MINDWTR_CLOUD_AUTH_TOKENS` auf ein oder mehrere starke Tokens setzen
- `MINDWTR_CLOUD_CORS_ORIGIN` auf den exakten Client-Ursprung setzen
- `MINDWTR_CLOUD_DATA_DIR` in persistenten Speicher einbinden
- `MINDWTR_CLOUD_MAX_BODY_BYTES` und `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` an die Nutzung anpassen

Optional, aber nützlich:

- `MINDWTR_CLOUD_RATE_WINDOW_MS`
- `MINDWTR_CLOUD_RATE_MAX`
- `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX`

## Umgebungsvariablen

### Authentifizierung

| Variable | Zweck | Hinweise |
| --- | --- | --- |
| `MINDWTR_CLOUD_AUTH_TOKENS` | Kommagetrennte Positivliste von Bearer-Tokens. | Empfohlene Produktionseinstellung. |
| `MINDWTR_CLOUD_AUTH_TOKENS_FILE` | Pfad zu einer Datei mit Bearer-Tokens. | Nützlich für Docker Secrets; der Inhalt kann `MINDWTR_CLOUD_AUTH_TOKENS` entsprechen. |
| `MINDWTR_CLOUD_TOKEN` | Älterer Alias für ein einzelnes Token. | Aus Kompatibilitätsgründen weiter unterstützt, aber veraltet. |
| `MINDWTR_CLOUD_TOKEN_FILE` | Pfad zu einer Datei mit dem älteren einzelnen Token. | Aus Kompatibilitätsgründen weiter unterstützt, aber veraltet. |
| `MINDWTR_CLOUD_ALLOW_ANY_TOKEN` | Erlaubt jedes syntaktisch gültige Bearer-Token. | Nur bei ausdrücklicher Aktivierung; außerhalb kontrollierter Umgebungen vermeiden. |
| `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` | Höchstzahl verschiedener Namensräume im Beliebig-Token-Modus. | Standard `32`; nur für kontrollierte Automatisierungsumgebungen setzen. |

### Netzwerk und Speicher

| Variable | Zweck | Standard |
| --- | --- | --- |
| `MINDWTR_CLOUD_CORS_ORIGIN` | Erlaubter Browser-Ursprung für CORS. | `http://localhost:5173` außerhalb der Produktion |
| `MINDWTR_CLOUD_DATA_DIR` | Verzeichnis für JSON-Namensräume, Anhänge und Sperren. | `./data` |
| `MINDWTR_CLOUD_TRUST_PROXY_HEADERS` | `X-Forwarded-For`-/Proxy-IP-Header für die Begrenzung fehlgeschlagener Authentifizierungen vertrauen. | `false` |
| `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` | Kommagetrennte Positivliste vertrauenswürdiger Proxy-IPs. | Leer; weitergeleitete IPs werden ohne vertrauenswürdigen direkten Peer ignoriert. |

### Anfragegrenzen

| Variable | Zweck | Standard |
| --- | --- | --- |
| `MINDWTR_CLOUD_MAX_BODY_BYTES` | Maximale Größe einer JSON-Anfrage. | `2000000` |
| `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` | Maximale Größe eines Anhang-Uploads. | `50000000` |
| `MINDWTR_CLOUD_REQUEST_TIMEOUT_MS` | Zeitlimit je Anfrage für Cloud-Handler. | `30000` |
| `MINDWTR_CLOUD_MAX_TASK_TITLE_LENGTH` | Maximale Aufgabentitellänge für Cloud-Aufgabenendpunkte. | `500` |
| `MINDWTR_CLOUD_MAX_TASK_QUICK_ADD_LENGTH` | Maximale Schnell-hinzufügen-Eingabelänge bei Cloud-Aufgabenerstellung. | `2000` |
| `MINDWTR_CLOUD_MAX_ITEMS_PER_COLLECTION` | Maximale Aufgaben/Projekte/Abschnitte/Bereiche je hochgeladener Sammlung. | `50000` |

### Paginierung und Listengestaltung

| Variable | Zweck | Standard |
| --- | --- | --- |
| `MINDWTR_CLOUD_LIST_DEFAULT_LIMIT` | Standardseitengröße für Listenendpunkte. | `200` |
| `MINDWTR_CLOUD_LIST_MAX_LIMIT` | Harte Obergrenze der Seitengröße. | `1000` |

### Ratenbegrenzung

| Variable | Zweck | Standard |
| --- | --- | --- |
| `MINDWTR_CLOUD_RATE_WINDOW_MS` | Länge des Hauptbegrenzungsfensters. | `60000` |
| `MINDWTR_CLOUD_RATE_MAX` | Maximale Nicht-Anhang-Anfragen je Fenster. | `120` |
| `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX` | Maximale Anhangsanfragen je Fenster. | wie `MINDWTR_CLOUD_RATE_MAX` |
| `MINDWTR_CLOUD_RATE_CLEANUP_MS` | Intervall zum Entfernen abgelaufener In-Memory-Einträge. | `60000` |
| `MINDWTR_CLOUD_RATE_MAX_KEYS` | Maximale Zahl gespeicherter In-Memory-Schlüssel vor LRU-artiger Verdrängung. | `10000` |
| `MINDWTR_CLOUD_AUTH_FAILURE_RATE_MAX` | Maximale unbefugte Versuche je Client-IP/Fenster vor Drosselung. | `30` |

Betriebliche Hinweise:

- Stimmen Sie Proxy-Bodygrenzen auf `MINDWTR_CLOUD_MAX_BODY_BYTES` und `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` ab.
- Lassen Sie `MINDWTR_CLOUD_TRUST_PROXY_HEADERS=false`, sofern der Server nicht ausschließlich über Ihren Reverse-Proxy erreichbar ist. Setzen Sie bei Aktivierung `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` auf die Proxy-Adressen, die Client-IPs weiterleiten dürfen.
- Beim Wechsel von `MINDWTR_CLOUD_TOKEN` zu `MINDWTR_CLOUD_AUTH_TOKENS` ändert ein Tokenwechsel auch den Namensraumschlüssel.
- Vermeiden Sie `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` in öffentlichen Bereitstellungen. Der Modus ist zwar durch `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` begrenzt, für die Produktion sind jedoch feste Token-Positivlisten vorgesehen.

## Docker-Betriebshandbuch

Beginnen Sie mit [Docker-Bereitstellung](/de/power-users/docker-deployment) für die unterstützten Compose-Einstiegspunkte. Dieser Abschnitt ist die Betriebscheckliste für denselben Cloud-Container in produktionsähnlichen Umgebungen.

Verwenden Sie `docker/compose.yaml` für einen lokalen reinen HTTP-Funktionstest.

Verwenden Sie für öffentliche Desktop- oder Mobil-Client-URLs den HTTPS-Stack:

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

Setzen Sie die selbst gehostete URL in Mindwtr auf die Basis-URL, etwa `https://mindwtr.example.com`. Mindwtr hängt `/v1/data` automatisch an.

Verwenden Sie `Caddyfile.local-https` für reine LAN-Hostnamen mit Caddys interner CA:

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

Jedes Gerät muss Caddys lokalem Stammzertifikat vertrauen, bevor der Client dieses Zertifikat akzeptiert. Öffentliche Zertifikate sind für mobile Clients meist einfacher.

Exportieren Sie nach dem Start des LAN-Stacks das lokale Stammzertifikat:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

Installieren Sie dieses Zertifikat auf jedem Gerät, das mit dem Hostnamen synchronisiert, als vertrauenswürdiges Stammzertifikat.

Minimale Form des Cloud-Dienstes:

```yaml
services:
  mindwtr-cloud:
    build:
      context: .
      dockerfile: docker/cloud/Dockerfile
    environment:
      MINDWTR_CLOUD_DATA_DIR: /data
      MINDWTR_CLOUD_AUTH_TOKENS: ${MINDWTR_CLOUD_AUTH_TOKENS}
      MINDWTR_CLOUD_CORS_ORIGIN: https://mindwtr.example.com
      MINDWTR_CLOUD_RATE_MAX: "120"
      MINDWTR_CLOUD_ATTACHMENT_RATE_MAX: "120"
    volumes:
      - ./mindwtr-cloud-data:/data
    restart: unless-stopped
```

Betriebshinweise:

- Das Repository-Dockerfile verwendet ein mehrstufiges Laufzeit-Image und pinnt das Bun-Basis-Image für reproduzierbare Neubuilds per Digest.
- Binden Sie `/data` auf dauerhaftem Speicher ein, nicht im flüchtigen Container-Dateisystem.
- Bewahren Sie Tokens in einem Secret-Manager oder einer `.env` außerhalb von Git auf.
- Verwenden Sie für Docker Secrets `MINDWTR_CLOUD_AUTH_TOKENS_FILE`, statt das Token direkt in Compose einzutragen.
- Derselbe bereitgestellte Container bedient Synchronisierungs- und REST-API-Verkehr auf demselben Host/Port.

## Reverse-Proxy-Checkliste

Auf Proxy-Ebene:

- HTTPS erzwingen
- Anfragegröße entsprechend den Cloud-Grenzen begrenzen
- `Authorization`-Header unverändert weiterleiten
- Zeitlimit für große Anhang-Uploads ausreichend hoch setzen
- Zugriff möglichst per IP/VPN beschränken

Beispiel-Caddyfile:

```caddyfile
mindwtr.example.com {
  reverse_proxy mindwtr-cloud:8787
}
```

Für interne Zertifikate nur im LAN:

```caddyfile
mindwtr.home.arpa {
  tls internal
  reverse_proxy mindwtr-cloud:8787
}
```

Beispiel-nginx-Ausschnitte:

```nginx
client_max_body_size 50m;
proxy_read_timeout 120s;
proxy_send_timeout 120s;
proxy_set_header Authorization $http_authorization;
```

## Sicherung und Wiederherstellung

Das Datenformat besteht aus einer JSON-Datei je Token sowie Anhangsdateien.

Sicherung:

1. `MINDWTR_CLOUD_DATA_DIR` als Momentaufnahme erfassen oder archivieren.
2. Zeitpunktbezogene Sicherungen aufbewahren (tägliche + wöchentliche Aufbewahrung).
3. Wiederherstellung regelmäßig prüfen.

Wiederherstellung:

1. Server stoppen.
2. Verzeichnisinhalt nach `MINDWTR_CLOUD_DATA_DIR` wiederherstellen.
3. Server starten.
4. `GET /health` prüfen und eine Client-Synchronisierungsvalidierung ausführen.

## Anhangsbereinigung

Wenn ein Benutzer einen Anhang löscht, bewahren Clients einen `pendingRemoteDeletes`-Datensatz auf, bis das Löschen im Backend erfolgreich war. Diese Einträge laufen bewusst nicht ab, da ein vorzeitiges Entfernen private Dateien zurücklassen kann.

Mindwtr Cloud bietet außerdem eine authentifizierte Bereinigung verwaister Anhangsdateien, auf die die aktuelle `data.json`-Momentaufnahme nicht mehr verweist:

```text
POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

Führen Sie dies nach Wiederherstellungen oder regelmäßig zur Wartung aus, wenn Dateien serverseitig bereinigt werden sollen, die außerhalb des normalen Client-Löschablaufs unerreichbar wurden. Der Endpunkt durchsucht nur den Namensraum des authentifizierten Tokens und gibt Anzahlen für geprüfte, behaltene, gelöschte und fehlgeschlagene Dateipfade zurück.

Die Bereinigung überspringt Anhangsdateien, die in den letzten fünf Minuten geändert wurden. So kann ein Upload mit späterem `/v1/data`-Verweis nicht durch einen gleichzeitigen Wartungslauf gelöscht werden.

## Aktualisierungsverfahren

Sicheres schrittweises Verfahren:

1. Sicherung erstellen.
2. Neue Version zuerst in Staging oder als Canary bereitstellen.
3. Funktionstests ausführen:
   - `GET /health`
   - authentifiziertes `GET /v1/data`
   - authentifiziertes `GET /v1/tasks`
   - authentifizierte `GET /v1/projects`, `GET /v1/areas` und `GET /v1/sections`
   - kleine und große Anhänge hoch-/herunterladen
4. In Produktion bereitstellen.
5. Protokolle auf Fehler mit `rate limit`, `invalid payload` und `permission denied` überwachen.

## Token-Rotation

Empfohlener Ablauf:

1. Neues Token neben dem alten zu `MINDWTR_CLOUD_AUTH_TOKENS` hinzufügen.
2. Clients auf das neue Token umstellen.
3. Altes Token nach dem Migrationsfenster entfernen.

Da der Token-Hash den Namensraum/die Datei bestimmt, ändert ein Tokenwechsel den Speichernamensraum. Wenn Sie Kontinuität mit einem neuen Token benötigen, migrieren Sie die entsprechende Datendatei und das Anhangsverzeichnis bewusst.

## Beobachtbarkeit

Der Cloud-Server schreibt strukturierte JSON-Protokolle nach stdout/stderr.

Minimale Protokollwarnungen:

- wiederholtes `Unauthorized`
- häufiges `Rate limit exceeded`
- `Cloud data directory is not writable`
- `Invalid remote sync payload`

Host-/Container-Metriken:

- CPU und Arbeitsspeicher
- freier Speicherplatz auf dem Datenvolume
- p95-Anfragelatenz
- Anteil der Nicht-2xx-Antworten

Hinweis zur Uhr:

- Der Server beteiligt sich bei `PUT /v1/data` an Zusammenführung und Reparatur. Eine Abweichung der Host-Uhr kann Anfrageprotokolle und Ratenbegrenzungsfenster beeinflussen. Lassen Sie NTP oder eine gleichwertige Zeitsynchronisierung aktiviert.
- Reparaturzeitstempel verwenden die Serveruhr. So kann eine einige Minuten vorgehende Clientuhr serverseitige Reparaturmetadaten nicht verfälschen.

## Fehlermodi

- Berechtigungsfehler: Eigentümer/Berechtigungen des Volumes stimmen nicht.
- CORS-Fehler: falscher Wert für `MINDWTR_CLOUD_CORS_ORIGIN`.
- Token stimmt nicht: Client-Token fehlt in der Positivliste.
- Fehler bei großen Nutzlasten: Bodygrenzen auf Proxy- oder App-Ebene überschritten.

## Verwandte Seiten

- [Cloud API](/de/developers/cloud-api)
- [Daten und Synchronisierung](/de/data-sync/)
- [Docker-Bereitstellung](/de/power-users/docker-deployment)
