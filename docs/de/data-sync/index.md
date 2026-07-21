# Daten und Synchronisierung

Mindwtr speichert Daten lokal und unterstützt mehrere Möglichkeiten zur Synchronisierung zwischen Geräten.

Mindwtr betreibt **keinen** gehosteten Cloud-Dienst. Die Synchronisierung ist Local-first und wird von Ihnen eingerichtet: Sie bestimmen, wie `data.json` (und `attachments/`) zwischen Geräten übertragen wird. Ohne eine der folgenden Optionen wird nichts übertragen; anschließend arbeitet die Synchronisierung selbstständig.

Aktuelle Desktop- und Mobil-Builds teilen die Einstellungen auf:
- **Einstellungen → Synchronisierung** für Backend, Optionen, Verlauf und Wiederherstellungsmomentaufnahmen
- **Einstellungen → Daten** für Sicherung/Wiederherstellung/Import, Anhangsbereinigung und Diagnose

Diese Seite ist die Einrichtung- und Wiederherstellungsanleitung für Benutzer. Technische Zusammenführungsregeln und Diagnosefelder stehen unter [Synchronisierungsalgorithmus](/de/data-sync/sync-algorithm).

Desktop-Vault-Import und Notiz-Deep-Links: [Obsidian-Integration](/de/power-users/obsidian).

---

## Datenspeicherung

### Desktop

Die Daten liegen in einer lokalen SQLite-Datenbank mit JSON-Datei für Synchronisierung/Sicherung:

| Plattform | Datenbank (SQLite) | JSON (Synchronisierung/Sicherung) |
| ----------- | -------------------------------------------------- | ------------------------------------------------------ |
| **Linux** | `~/.local/share/mindwtr/mindwtr.db` | `~/.local/share/mindwtr/data.json` |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db` | `%APPDATA%/mindwtr/data.json` |
| **macOS** | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Konfiguration wird separat gespeichert:

| Plattform | Speicherort |
| ----------- | --------------------------------------------- |
| **Linux** | `~/.config/mindwtr/config.toml` |
| **Windows** | `%APPDATA%/mindwtr/config.toml` |
| **macOS** | `~/Library/Application Support/mindwtr/config.toml` |

> Ältere Tauri-Builds verwendeten unter Linux `~/.config/tech.dongdongbh.mindwtr/` und `~/.local/share/tech.dongdongbh.mindwtr/`. Erkannte Daten werden automatisch migriert.

### Mobilgeräte

Die Daten liegen in einer lokalen SQLite-Datenbank mit einer JSON-Datei für Synchronisierung und Sicherung:

- **SQLite-Datenbank**: `mindwtr.db`
- **JSON-Sicherung**: `data.json`

---

## Synchronisierungs-Backends

Mindwtr unterstützt direkt fünf Backends:

- **Native iCloud-/CloudKit-Synchronisierung**: nur Apple, für Kerndaten und Anhangsassets
- **Dateisynchronisierung**: ausgewählter Ordner/eine Datei (`data.json` + `attachments/`)
- **Dropbox-OAuth-Synchronisierung**: direkter Dropbox-App-Ordner in unterstützten Builds
- **WebDAV**: kompatibler WebDAV-Endpunkt
- **Mindwtr Cloud (selbst gehostet)**: eigener `apps/cloud`-Endpunkt

### Überblick

| Backend | Plattformen | Einrichtung | Relative Geschwindigkeit | Konflikte | Geeignet für |
| --- | --- | --- | --- | --- | --- |
| **Dateisynchronisierung** (Ordner) | Alle | Niedrig, Ordner auswählen | Am schnellsten (reines Dateisystem) | Dateiebene; der Ordneranbieter sieht eine Datei | Syncthing, vorhandene Cloud-Drive-Clients, LAN |
| **WebDAV** | Alle | Mittel, Server-URL + Zugangsdaten | Langsamer, HTTP-Roundtrip pro Anfrage | App-gesteuerte Zusammenführung je Eintrag | Nextcloud/ownCloud/Fastmail, entferntes BYOS |
| **Mindwtr Cloud (selbst gehostet)** | Alle | Höher, `apps/cloud` + Token bereitstellen | Schnell, ein Endpunkt, Server führt beim Schreiben zusammen | App- + serverseitige Zusammenführung | Mehrere gleichzeitig bearbeitende Geräte |
| **Dropbox** | Unterstützte Builds | Niedrig, OAuth-Anmeldung | Mittel, Anbieter-API | App-gesteuerte Zusammenführung je Eintrag | Einfachste Cloud-Option ohne eigenen Server |
| **iCloud / CloudKit** | Apple-Builds | Niedrig, in den Einstellungen aktivieren | Schnell, Synchronisierung je Datensatz | CloudKit-Zusammenführung je Datensatz | Reine Apple-Gerätegruppen |

Geschwindigkeitsunterschiede fallen vor allem bei großen Anhängen ins Gewicht, die WebDAV und Dropbox als einzelne Uploads und Downloads übertragen. Was bei einer Synchronisierung tatsächlich übertragen wird, beschreibt der [Datenlebenszyklus](/de/data-sync/data-lifecycle).

### Datenhoheit

| Modus | Verlässt eine Kopie das Gerät? | Sie kontrollieren | Externe Kopie |
| --- | --- | --- | --- |
| **Synchronisierung aus** | Nein | Das Gerät und seine Sicherungen | Keine |
| **Dateisynchronisierung** | Nur wenn ein anderes Werkzeug den ausgewählten Ordner repliziert | Den Ordner und jeden Anbieter oder jedes Gerät, der bzw. das ihn synchronisiert | `data.json` und Anhänge in diesem Ordner |
| **Dropbox** | Ja | Das verbundene Dropbox-Konto | `/Apps/Mindwtr/data.json` und Anhänge im App-Ordner |
| **iCloud / CloudKit** | Ja | Apple-ID und iCloud-Konto | CloudKit-Datensätze und Anhänge |
| **WebDAV** | Ja | Endpunkt, Konto und Zugangsdaten | `data.json` und Anhänge auf diesem WebDAV-Server |
| **Mindwtr Cloud (selbst gehostet)** | Ja | Bereitstellung, Speicher und Zugriffstoken | Synchronisierungsdaten und Anhänge auf diesem Server |

Die lokale SQLite-Datenbank bleibt die maßgebliche Quelle. Dateibasierte Synchronisierung verwendet lesbares JSON und speichert Anhänge als Dateien. Behandeln Sie daher den ausgewählten Ordner, das Anbieterkonto oder den Server als vertrauenswürdigen Speicher. Mindwtr betreibt keinen gehosteten Synchronisierungsdienst. Direkte Dropbox-Anfragen laufen nicht über den Mindwtr-Entwickler, und Dropbox-Tokens bleiben auf Ihrem Gerät.

Unter **Einstellungen → Synchronisierung** zeigen unterstützte Builds diese Möglichkeiten in einem gemeinsamen Backend-Auswahlfeld und erklären anschließend den gewählten Einrichtungsweg:

- **Cloud-Synchronisierung**: **Dropbox** und auf Apple-Plattformen **iCloud**
- **Ordner-/Dateisynchronisierung**: **Datei**
- **Erweitert / Eigener Server**: **WebDAV** und **Selbst gehostet**

Vorhandene Dropbox-Einrichtungen funktionieren weiter; sie erscheinen lediglich als eigenständiges **Dropbox**-Backend in der Erklärung zur **Cloud-Synchronisierung**, statt unter einer Auswahl für selbst gehostete Server oder Cloud-Anbieter verschachtelt zu sein.

### Direkte und indirekte Anbieterunterstützung

- **Direkt unterstützte Anbieter/Protokolle**: natives iCloud/CloudKit in unterstützten Apple-Builds, WebDAV-Server, der selbst gehostete Mindwtr-Endpunkt und Dropbox OAuth in unterstützten Builds.
- **Indirekt unterstützte Anbieter**: iCloud Drive, Google Drive, OneDrive, Syncthing, Netzwerkfreigaben und Dropbox über Dateisynchronisierung.
- **Wichtig**: Die native iCloud-Synchronisierung ist **nur für Apple** verfügbar. Android, Windows und Linux sollten stattdessen Dateisynchronisierung, WebDAV, Mindwtr Cloud oder Dropbox verwenden.

**Kurzübersicht:**
- **Dropbox**: einfachste plattformübergreifende Cloud-Option in unterstützten Builds; nach der Verbindung über OAuth verwendet Mindwtr den Dropbox-App-Ordner.
- **Syncthing**: Dateisynchronisierung von Gerät zu Gerät. Am besten im selben LAN/Subnetz. Für die Synchronisierung aus der Ferne ein Syncthing-Relay oder Mesh-VPN wie Nebula/Tailscale verwenden.
- **WebDAV**: einen Anbieter mit WebDAV-Unterstützung verwenden, zum Beispiel Nextcloud, ownCloud, Fastmail oder einen selbst gehosteten Server.
- **iCloud**: in unterstützten Apple-Builds die native iCloud-Synchronisierung einschließlich Anhangsassets oder iCloud Drive über Dateisynchronisierung verwenden.
- **Google Drive/OneDrive**: Dateisynchronisierung verwenden, unter Android bei Bedarf mit einer Brücken-App.

## Empfehlungen

- **Einfachste sofort nutzbare Cloud-Synchronisierung:** Dropbox OAuth in unterstützten Builds.
- **Beste reine Apple-Einrichtung:** natives iCloud/CloudKit in unterstützten Apple-Builds.
- **Bestes entferntes BYOS:** WebDAV oder Mindwtr Cloud (selbst gehostet). Die App steuert den Synchronisierungszyklus und führt Daten je Eintrag zusammen.
- **Dateisynchronisierung (Syncthing/Dropbox usw.):** funktioniert, aber **Konflikte entstehen auf Dateiebene**, da `data.json` eine einzelne Datei ist.
- **Bewährtes Verfahren für Dateisynchronisierung:** nicht gleichzeitig auf zwei Geräten bearbeiten und die Synchronisierung abschließen lassen, bevor die App auf einem anderen Gerät geöffnet wird. Bei Konflikten die neueste `data.json` behalten und die Kopien `data.json.sync-conflict-*` löschen.

### Desktop-Proxy

Mindwtr kann auf dem Desktop einen optionalen HTTP(S)-Proxy für Netzwerkanfragen wie WebDAV, Dropbox, selbst gehostete Cloud-Synchronisierung und externe Kalenderabonnements verwenden.

Legen Sie ihn unter **Einstellungen → Erweitert → Netzwerk → Proxy-URL** fest. Verwenden Sie eine vollständige URL wie `http://proxy-host:port` oder `https://proxy-host:port`. Bleibt das Feld leer, gilt das Standardnetzwerkverhalten einschließlich aller unterstützten Umgebungsvariablen `HTTP_PROXY` und `HTTPS_PROXY`.

Das Feld in der App ist bewusst minimal gehalten: Es nimmt eine einzelne Proxy-URL auf und ist kein vollständiger Proxy-Manager. SOCKS, PAC-Dateien und Proxy-Regeln je Backend werden dort nicht konfiguriert. Die Einstellung wird nicht zwischen Geräten synchronisiert.

## Konfliktwiederherstellung

Mindwtr löst Konflikte zwischen Einträgen normalerweise automatisch. Erscheint eine gelöschte Aufgabe nach der Synchronisierung erneut, ist die häufigste Ursache eine gleichzeitige Bearbeitung auf einem anderen Gerät innerhalb des Unklarheitsfensters zwischen Löschung und aktivem Eintrag. Wenn die Revisionsnummern gleich sind und die Vorgangszeitpunkte höchstens 30 Sekunden auseinanderliegen, bewahrt Mindwtr die aktive Bearbeitung, damit Arbeit nicht unbemerkt verworfen wird.

Vorgehen:
1. Unter **Einstellungen → Synchronisierung** den letzten Synchronisierungsstatus und -verlauf auf Konflikte prüfen.
2. Ist die wieder erschienene Aufgabe weiterhin unerwünscht, sie erneut löschen, nachdem alle Geräte vollständig synchronisiert wurden.
3. Weichen beide Geräte weiterhin voneinander ab, jedes Gerät einzeln und nacheinander manuell synchronisieren, dann die gewünschte Version behalten und noch einmal löschen oder wiederherstellen.
4. Müssen ältere Daten wiederhergestellt werden, vor weiteren Änderungen **Einstellungen → Daten** oder **Einstellungen → Synchronisierung → Wiederherstellungsmomentaufnahmen** verwenden.

### 1. Native iCloud-/CloudKit-Synchronisierung (nur Apple)

Mindwtr enthält in unterstützten Apple-Builds ein natives **iCloud**-Backend.

- **Anleitung**: [iCloud-Synchronisierung](/de/data-sync/icloud)
- **Am besten geeignet für**: reine Apple-Gerätekonfigurationen, bei denen ein gemeinsamer Ordner vermieden werden soll
- **Nicht geeignet für**: Android-, Windows- oder Linux-Geräte im selben Synchronisierungsverbund

Dieses Backend ist auf iPhone, iPad und macOS verfügbar. Wer auf macOS eine ordnerbasierte Einrichtung bevorzugt, kann stattdessen weiterhin **iCloud Drive + Dateisynchronisierung** verwenden.

### 2. Dateisynchronisierung

Synchronisierung über eine gemeinsame JSON-Datei mit jedem ordnerbasierten Synchronisierungsdienst:

- Dropbox
- Google Drive
- Syncthing
- OneDrive
- iCloud Drive
- Jeder Netzwerkordner

#### iCloud Drive als Dateisynchronisierung (macOS + iOS)

iCloud Drive funktioniert über **Dateisynchronisierung** auch mit Mindwtr, wenn statt des nativen CloudKit-Backends ein gemeinsamer Ordner verwendet werden soll.

Empfohlene Einrichtung:
1. Unter macOS einen Ordner wie `iCloud Drive/Mindwtr` erstellen.
2. In Mindwtr Desktop **Synchronisierungs-Backend = Datei** festlegen und diesen Ordner auswählen.
3. Einmal exportieren, um `data.json` und `attachments/` zu erstellen.
4. Warten, bis iCloud Drive den Upload abgeschlossen hat.
5. Unter iOS in Mindwtr unter **Einstellungen → Synchronisierung → Ordner auswählen** denselben iCloud-Drive-Ordner in „Dateien“ wählen.
   - Ist ein Anbieter in der iOS-Ordnerauswahl ausgegraut, eine beliebige JSON-Datei im Zielordner auswählen. Mindwtr verwendet diesen Ordner weiterhin für `data.json` und `attachments/`.

Wichtig:
- `data.json` **und** `attachments/` synchronisieren. Anhänge gehören zu den Synchronisierungsdaten.
- Nicht nur `data.json` ohne `attachments/` verschieben, da Anhangsmetadaten und Dateien sonst auseinanderdriften können.
- Wenn iCloud durch „Speicher optimieren“ Dateien ausgelagert hat, diese vor einer manuellen Synchronisierung in „Dateien“ erneut herunterladen lassen.

#### iOS-Dateilesezeichen für Google Drive, OneDrive und andere Anbieter

Unter iOS können Google Drive, OneDrive und ähnliche Anbieter über **Dateisynchronisierung** verwendet werden, wenn sie eine Datei in der Dateiauswahl bereitstellen. Ist keine Ordnerauswahl möglich, eine vorhandene JSON-Datei im Zielordner auswählen. Mindwtr speichert ein sicherheitsbezogenes Lesezeichen und verwendet es für spätere Lese- und Schreibzugriffe.

Dieser auf eine Datei begrenzte Anbietermodus synchronisiert `data.json`. Nicht jeder „Dateien“-Anbieter stellt Anhangsordner über ein solches Lesezeichen bereit. Wenn Anhänge zuverlässig synchronisiert werden müssen, natives iCloud/CloudKit, Dropbox, WebDAV oder eine selbst gehostete Cloud verwenden. Meldet iOS, dass der Lesezeichenzugriff abgelaufen ist, die Synchronisierungsdatei unter **Einstellungen → Synchronisierung** erneut auswählen.

#### Syncthing-Hinweise (empfohlene Einrichtung)

Syncthing funktioniert gut mit Mindwtr, doch die Reihenfolge bei der Ersteinrichtung ist wichtig. Die Geräte müssen einander erreichen können: am besten im selben Subnetz/LAN, für die Synchronisierung aus der Ferne andernfalls über ein Relay oder Mesh-VPN wie Nebula oder Tailscale.

**Empfohlener Ablauf:**
1. Einen Syncthing-Ordner (z. B. `Mindwtr/`) erstellen und vollständig synchronisieren.
2. Auf dem Desktop diesen Ordner unter **Einstellungen → Synchronisierung** bei ausgewähltem Backend **Datei** wählen.
3. **Sicherung exportieren**, um in diesem Ordner `data.json` und `attachments/` anzulegen.
4. Synchronisierung zum Telefon abwarten.
5. Auf dem Mobilgerät denselben Ordner unter **Einstellungen → Synchronisierung** auswählen.

**Warum erscheinen `attachments (1)` / `attachments (2)`?**
Syncthing erstellt doppelte Ordner, wenn beide Geräte denselben Ordner gleichzeitig erstellen oder ändern. Das passiert häufig, wenn Mindwtr auf beiden Geräten geöffnet wird, bevor die Erstsynchronisierung abgeschlossen ist.

**So werden Duplikate behoben:**
1. Den „echten“ Ordner `attachments/` bestimmen, gewöhnlich den mit mehr Dateien.
2. Dateien aus `attachments (1)`/`attachments (2)` nach `attachments/` verschieben.
3. Die doppelten Ordner löschen und Syncthing die Änderungen abgleichen lassen.

**Wichtig:** Nicht direkt `~/.local/share/mindwtr` synchronisieren. Der Speicher von Mobilgeräten ist abgeschottet. Stattdessen einen eigenen Dateisynchronisierungsordner mit `data.json` verwenden.
Wurde das App-Datenverzeichnis bereits synchronisiert, zu einem eigenen Synchronisierungsordner wechseln und ihn in den Einstellungen erneut auswählen.

#### Google Drive unter Android und Dropbox-Dateifallback

Google Drive bietet **kein** WebDAV. Für die Dateisynchronisierung mit Google Drive unter Android ist eine Brücken-App erforderlich, die einen lokalen Ordner synchron hält, damit Mindwtr `data.json` direkt lesen und schreiben kann.

Dropbox-Benutzer unter Android können in unterstützten Builds die native Dropbox-Synchronisierung verwenden. Wer Dateisynchronisierung bevorzugt, kann für Dropbox denselben Ansatz mit einer Brücken-App nutzen.

Beispiele:

- **Dropsync** (Dropbox)
- **Autosync** (Google Drive)
- **FolderSync** (allgemein)

Wählen Sie diesen lokalen Ordner unter **Einstellungen → Synchronisierung**.

#### OneDrive unter Android

Die offizielle OneDrive-App für Android hält keinen lokalen Ordner fortlaufend in beide Richtungen synchron. Für eine zuverlässige Nutzung von OneDrive mit Mindwtr unter Android eine „Brücken“-App installieren:

- **OneSync (Autosync for OneDrive)**
- **FolderSync**

Dann:
1. Auf dem Desktop einen OneDrive-Ordner für Mindwtr erstellen.
2. Mit der Brücken-App in einen lokalen Android-Ordner synchronisieren.
3. Diesen lokalen Ordner in Mindwtr unter **Einstellungen → Synchronisierung** wählen (`data.json` wird darin verwendet).

### 3. WebDAV-Synchronisierung

Direkte Synchronisierung mit einem WebDAV-Server:

- Nextcloud
- ownCloud
- Fastmail
- Jeder WebDAV-kompatible Server

Mindwtr erstellt fehlende übergeordnete Ordner vor dem ersten `PUT` automatisch. Dadurch kann ein neuer leerer Ordner angegeben werden, ohne jede Ebene vorher manuell anzulegen.

Öffentliche URLs verlangen HTTPS. HTTP ist nur für erkannte lokale/private Ziele erlaubt: `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` bis `172.31.x.x`, `192.168.x.x`, private/Loopback-IPv6-Adressen, `*.local`, `*.home.arpa`. Verwenden Sie HTTPS für eigenes DNS, VPN-Namen, Tailscale, ZeroTier und alle nicht als privat erkannten Namen.

### 4. Mindwtr Cloud (selbst gehostet)

Für fortgeschrittene Benutzer enthält Mindwtr einen einfachen Synchronisierungsserver (`apps/cloud`), der selbst gehostet werden kann.

- **Protokoll**: einfache REST API (GET/PUT)
- **Authentifizierung**: Bearer-Token, das einer bestimmten Datendatei auf dem Server zugeordnet ist
- **Bereitstellung**: Node.js/Bun
- **Docker**: [Docker-Bereitstellung](/de/power-users/docker-deployment)
- **Betrieb**: [Cloud-Bereitstellung](/de/data-sync/cloud-deployment)

Wichtiger Hinweis für Clients:

- **Für öffentliche Mindwtr-Cloud-URLs ist HTTPS erforderlich.** Reines HTTP ist automatisch für lokale/private Ziele wie `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` bis `172.31.x.x`, `192.168.x.x`, private/Loopback-IPv6-Adressen, `*.local` und `*.home.arpa` zulässig.
- Wenn Sie Cloud außerhalb eines vertrauenswürdigen LAN bereitstellen, setzen Sie den Server hinter HTTPS mit einem Reverse-Proxy wie `caddy`, `nginx` oder `traefik`.
- Verwenden Sie HTTPS für eigenes DNS, VPN-Hostnamen, Tailscale, ZeroTier und alle Namen, die nicht als lokal/privat erkannt werden. Die Einstellung **Unsichere Verbindungen (HTTP) erlauben** ist eine Kompatibilitätseinstellung für vertrauenswürdige lokale/private Endpunkte; sie setzt HTTP nicht für öffentliche Endpunkte frei.

### 5. Dropbox-OAuth-Synchronisierung

Mindwtr unterstützt in unterstützten Desktop- und Mobil-Builds auch die direkte Dropbox-Synchronisierung.

- **Umfang**: Dropbox-App-Ordner (`/Apps/Mindwtr/`)
- **Daten**: `data.json` und `attachments/*`
- **Authentifizierung**: OAuth 2.0 + PKCE
- **Einrichtung**: **Dropbox** unter **Einstellungen → Synchronisierung** auswählen, Konto verbinden und dann **Verbindung testen** ausführen
- **Anleitung**: [Dropbox-Synchronisierung](/de/data-sync/dropbox)

---

## Funktionsweise

### Automatische Synchronisierung

Mindwtr synchronisiert in folgenden Situationen automatisch:

- **Beim Start**: kurz nach dem Start der App.
- **Bei Datenänderungen**: kurz nach Änderungen an Aufgaben oder Projekten; eine kurze Entprellung fasst schnelle Bearbeitungen zusammen.
- **Bei App-Fokus**: wenn die Desktop-App wieder den Fokus erhält, auf höchstens einmal alle 30 Sekunden begrenzt. Dies geschieht auch ohne lokale Änderungen, damit entfernte Änderungen zeitnah abgerufen werden.
- **Bei Fokusverlust/Hintergrund**: wenn von der Desktop-App weg gewechselt wird, jedoch nur bei ausstehenden lokalen Änderungen, die übertragen werden müssen.
- **Periodischer Desktop-Heartbeat**: alle 15 Minuten, solange Mindwtr läuft.

Schlägt eine automatische Synchronisierung fehl, pausiert Mindwtr automatische Wiederholungsversuche etwa 60 Sekunden lang. Während dieser Abklingzeit bleibt die manuelle Synchronisierung möglich.

### Synchronisierte Einstellungen

Mindwtr kann ausgewählte Einstellungen zwischen Geräten synchronisieren. Die Konfiguration erfolgt unter **Einstellungen → Synchronisierung → Synchronisierte Einstellungen**.

- **Darstellung** (Design)
- **Sprache und Datumsformat**
- **GTD-Einstellungen** (Standardplanungszeit und Fokuslimit)
- **Externe Kalender-URLs** (ICS-Abonnements)
- **KI-Einstellungen** (Modelle und Anbieter)
- **Gespeicherte Filter** (Fokus-Filtervorgaben)

> API-Schlüssel und lokale Modellpfade werden nie synchronisiert.
> Konflikte werden gruppenweise gelöst. Gleichzeitige Änderungen verschiedener Felder derselben Gruppe können durch die neuere Gruppenänderung überschrieben werden.

### Zusammenführungsstrategie

Mindwtr verwendet revisionsbewusstes **Last-Write-Wins (LWW)** je Eintrag:
- Jede Aufgabe, jedes Projekt, jeder Abschnitt und jeder Bereich trägt einen `updatedAt`-Zeitstempel.
- Wenn vorhanden, werden Revisionsmetadaten (`rev` und `revBy`) verwendet, bevor auf reine Zeitstempel zurückgegriffen wird.
- Weich gelöschte Einträge (Löschmarkierungen) bleiben erhalten, damit Löschungen korrekt zwischen Geräten weitergegeben werden.

Konflikte zwischen Löschung und aktivem Eintrag verwenden den **Zeitpunkt des letzten Vorgangs**, nicht nur den unveränderten Wert von `updatedAt`:
- Bei gelöschten Einträgen vergleicht Mindwtr `deletedAt` mit der letzten Aktualisierung des aktiven Eintrags.
- Liegen Löschung und aktive Bearbeitung mehr als 30 Sekunden auseinander, gewinnt der neuere Vorgang.
- Innerhalb dieses 30-sekündigen Unklarheitsfensters gewinnt eine höhere Revisionsnummer weiterhin, sofern sie verfügbar ist. Andernfalls bewahrt Mindwtr den aktiven Eintrag, statt die Löschmarkierung vorschnell gewinnen zu lassen.
- Praktische Folge: Wird eine Aufgabe auf einem Gerät innerhalb von etwa 30 Sekunden nach ihrer Bearbeitung auf einem anderen Gerät gelöscht, kann die bearbeitete aktive Aufgabe nach der Synchronisierung erneut erscheinen. Wenn sie wirklich entfernt werden soll, nach Abschluss der Gerätesynchronisierung erneut löschen.

Zeitstempel, die aufgrund einer abweichenden Uhr mehr als 5 Minuten vor der Zusammenführungsuhr in der Zukunft liegen, werden bei den Sicherheitsprüfungen der Zusammenführung begrenzt, damit eine falsche Geräteuhr nicht dauerhaft dominiert. Werden beide Seiten auf diese Weise in die Zukunft begrenzt, bewahrt Mindwtr dennoch ihre relative Reihenfolge, statt sie fälschlich als Gleichstand zu behandeln.

Ausführliche Entscheidungsregeln, Wiederholungsverhalten und Konfliktbeispiele enthält der [Synchronisierungsalgorithmus](/de/data-sync/sync-algorithm). Diese Seite beschränkt sich auf den Speicher- und Betriebsüberblick.

### Konfliktsichtbarkeit und Uhrabweichung

Nach jeder Synchronisierung speichert Mindwtr Synchronisierungsstatistiken in den Einstellungen:

- **Konflikte**: Gesamtzahl der Konflikte und eine kleine Auswahl betroffener IDs
- **Uhrabweichung**: größte beobachtete Zeitstempelabweichung zwischen Geräten
- **Zeitstempelkorrekturen**: Bei `updatedAt < createdAt` werden Zeitstempel während der Zusammenführung korrigiert.

Diese Angaben sind auf Desktop und Mobilgeräten unter **Einstellungen → Synchronisierung** sichtbar. Große Abweichungswerte deuten gewöhnlich auf nicht übereinstimmende Geräteuhren hin.
Auf Mobilgeräten sind die Einträge im Synchronisierungsverlauf standardmäßig eingeklappt und lassen sich durch Antippen erweitern.

### Anhangssynchronisierung und -bereinigung

- Anhänge werden **nach** den Metadaten zusammengeführt.
- Fehlende Anhänge bleiben bis zum Download als Platzhalter.
- Verwaiste Anhänge werden automatisch bereinigt; auf dem Desktop kann die Bereinigung auch manuell unter **Einstellungen → Daten** ausgelöst werden.
- Die Bereinigung entfernter Anhänge berücksichtigt lokale Verweise, zählt sie jedoch nicht global. Wenn zwei Geräte Verweise auf denselben entfernten Anhang erstellen oder behalten, bevor sie miteinander synchronisiert wurden, kennt ein Gerät den Verweis des anderen möglicherweise noch nicht. Geräte vor dem Löschen gemeinsam verwendeter Anhänge synchronisieren lassen und die Datei erneut anhängen, falls die Bereinigung eine entfernte Kopie löscht, die ein anderes Gerät noch benötigt.

---

## Desktop-Einrichtung

### Datei

1. **Einstellungen → Synchronisierung**
2. **Backend = Datei**
3. **Speicherort ändern**, Ordner wählen
4. **Speichern**

Mindwtr synchronisiert anschließend automatisch beim Start und bei Datenänderungen.

### WebDAV

1. **Einstellungen → Synchronisierung**
2. **Backend = WebDAV**
3. Angaben:
   - **URL**: Ordner-URL; Mindwtr legt `data.json` darin ab, z. B. `https://nextcloud.example.com/remote.php/dav/files/user/Mindwtr`
   - **Benutzername**
   - **Passwort**
4. **WebDAV speichern**

Existiert der Pfad des Zielordners noch nicht, versucht Mindwtr, die fehlenden übergeordneten Verzeichnisse vor dem Upload von `data.json` automatisch anzulegen.

> **Linux-Hinweis:** Ohne Secret-Service-Schlüsselbund (`org.freedesktop.secrets`) verwendet Mindwtr lokale Geheimnisspeicherung in `~/.config/mindwtr/secrets.toml`.

> **Tipp:** Nextcloud-URL:
> `https://your-server.com/remote.php/dav/files/USERNAME/path/to/folder`
>
> Explizite Ports werden unterstützt, z. B. `https://example.com:5000/mindwtr`.

## Mobile Einrichtung

Wegen Android-/iOS-Speicherbeschränkungen muss für die mobile Synchronisierung manuell ein Synchronisierungsordner ausgewählt werden.

Manche Cloud-Anbieter bieten unter iOS in „Dateien“ keine Ordnerauswahl an. In diesem Fall eine beliebige JSON-Datei im Zielordner auswählen; Mindwtr ermittelt und verwendet den Ordnerpfad für die Synchronisierung.

### 1. Daten zuerst exportieren

1. **Einstellungen → Daten**
2. **Sicherung exportieren**
3. Die Datei im Synchronisierungsordner speichern, zum Beispiel in Google Drive

### 2. Ordner auswählen

1. **Einstellungen → Synchronisierung**
2. **Ordner auswählen**
3. Zum Ordner navigieren
4. Ordner mit (oder künftig mit) `data.json` wählen

### 3. Automatisch synchronisieren

Mobilgeräte synchronisieren jetzt automatisch:

- beim Wechsel in den Hintergrund
- 5 Sekunden nach Datenänderungen
- bei Rückkehr, wenn mehr als 30 Sekunden vergangen sind

Unter „Einstellungen“ kann **Synchronisieren** außerdem jederzeit manuell angetippt werden.

---

## SQLite-JSON-Brücke

SQLite ist der primäre lokale Speicher. `data.json` ist die Synchronisierungs-/Sicherungsmomentaufnahme, keine zweite gleichwertige Datenquelle.

- **Kaltstart/normales Lesen**: aus SQLite-gestütztem Speicher
- **Ausgehend**: ausstehende lokale Speicherungen abschließen, dann Momentaufnahme nach `data.json`/entfernt exportieren
- **Eingehend**: JSON validieren, normalisieren, zusammenführen und in SQLite speichern
- **Lokale Diagnose**: Felder wie `lastSyncStats`, `lastSyncHistory` und Metadaten zur Wiederherstellung ausstehender entfernter Schreibvorgänge bleiben lokal und werden aus entfernten Nutzlasten entfernt

Desktop und Mobilgeräte sperren die Bearbeitung während der Synchronisierung **nicht**. Ändern sich lokale Daten während eines Synchronisierungsschreibvorgangs, bricht die App stattdessen diesen Lauf ab und reiht einen neuen ein, damit die neuere lokale Momentaufnahme nicht überschrieben wird.

Vollständiger Vertrag: [ADR 0009](https://github.com/dongdongbh/Mindwtr/blob/main/docs/adr/0009-sqlite-json-sync-bridge.md).

---

## Synchronisierungsablauf

### Zwei Geräte

**Ersteinrichtung:**
1. Desktop-Ordner einrichten
2. Sicherung dorthin exportieren
3. Mobilgerät: Ordner auswählen

**Täglich:**
1. Auf Gerät A ändern
2. Replikation des Dienstes abwarten
3. Auf Gerät B unter Einstellungen → Synchronisierung auslösen

### Mehrere Geräte

Das gleiche Verfahren gilt. Gleichzeitige Bearbeitung auf mehreren Geräten vermeiden, um Konflikte zu verhindern.

---

## Fehlerbehebungscheckliste

- **Prüfen, ob `data.json` existiert** und im Synchronisierungsordner aktualisiert wird.
- **Syncthing vollständig synchronisieren lassen**, bevor Mindwtr auf dem zweiten Gerät geöffnet wird.
- Für einen sofortigen Abruf oder Upload unter „Einstellungen“ manuell **Synchronisieren** verwenden.
- Nach **doppelten Anhangsordnern** (`attachments (1)` usw.) suchen und sie zusammenführen.
- **Korrekte Geräteuhren sicherstellen**, da große Abweichungen Konflikte verursachen.
- **Ordnerberechtigungen prüfen**, da Android SAF den Schreibzugriff auf manche Ordner blockieren kann.

---

## Sicherung und Export

### Daten exportieren

**Desktop:**
- **Einstellungen → Daten → Sicherung exportieren** verwenden
- Synchronisierungs-Backends halten `data.json` bei aktivierter Synchronisierung ebenfalls automatisch aktuell

**Mobilgeräte:**
1. **Einstellungen → Daten** öffnen
2. Auf **Sicherung exportieren** tippen
3. Am gewünschten Ort speichern

### Aus Sicherung wiederherstellen

Mindwtr kann lokale Daten auf Desktop und Mobilgeräten direkt aus einer JSON-Sicherungsdatei wiederherstellen.

Ablauf:
1. **Einstellungen → Daten**
2. **Sicherung wiederherstellen**
3. Eine Mindwtr-Sicherungsdatei im JSON-Format wählen
4. Zusammenfassung prüfen und bestätigen

Vor der Wiederherstellung validiert Mindwtr die Datei und erstellt eine Wiederherstellungsmomentaufnahme, sofern die Plattform dies unterstützt. Die Wiederherstellung ersetzt lokale Daten vollständig und führt sie nicht zusammen.

- **Desktop**: Vor der Wiederherstellung wird eine Wiederherstellungsmomentaufnahme im Momentaufnahmenordner der App-Daten erstellt.
- **Mobilgeräte**: Vor der Wiederherstellung wird eine lokale Wiederherstellungsmomentaufnahme im App-Speicher erstellt.
- **Ungültige Datei**: Die Wiederherstellung wird blockiert und die aktuellen Daten bleiben unverändert.

Den ausführlichen Ablauf beschreibt [Sicherung und Wiederherstellung](/de/data-sync/backup-restore).

## Importe und Migrationen

Diese Anleitungen helfen beim Übertragen von Aufgabendaten aus einer anderen App nach Mindwtr. Importe fügen Daten zu Mindwtr hinzu, richten aber keine Synchronisierung ein.

### TickTick-CSV-/ZIP-Import

Mindwtr kann TickTick-Sicherungen unter **Einstellungen → Daten → Aus TickTick importieren** importieren.

- CSV oder ZIP mit CSV
- TickTick-Ordner → Bereiche
- TickTick-Listen → Projekte
- Unterstützte Status, Daten, Prioritäten, Tags, Notizen, Wiederholungen bleiben erhalten
- Checklisten/Unteraufgaben → Checklistenpunkte

Einzelheiten und unterstützte Zuordnungen beschreibt der [TickTick-Import](/de/import/ticktick).

### Todoist-CSV-/ZIP-Import

Mindwtr kann Todoist-Exporte unter **Einstellungen → Daten → Aus Todoist importieren** importieren.

- einzelne CSV oder ZIP mit mehreren Projekt-CSVs
- Todoist-Projekte → Projekte
- Todoist-Abschnitte → Abschnitte
- Unteraufgaben → Checklistenpunkte
- importierte Aufgaben bleiben zur GTD-Verarbeitung im **Posteingang**

Wiederkehrende Todoist-Pläne werden nicht automatisch neu erstellt. Mindwtr importiert die Aufgabe einmal und behält den ursprünglichen Wiederholungstext in der Beschreibung.

Einzelheiten und unterstützte Zuordnungen beschreibt der [Todoist-Import](/de/import/todoist).

### DGT-GTD-JSON-/ZIP-Import

Mindwtr kann DGT-GTD-Exporte unter **Einstellungen → Daten → Aus DGT GTD importieren** importieren.

- JSON oder ZIP mit JSON
- DGT-Ordner → Bereiche
- DGT-Projekte → Projekte
- Checklisten → Checklistenaufgaben
- Kontexte/Tags bleiben erhalten
- unterstützte Wiederholungen bleiben; bei nicht unterstützten Mustern weist Mindwtr darauf hin, dass sie einmalig mit Originaltext importiert werden

Eigenständige DGT-Aufgaben bleiben in Mindwtr, ohne in neue Projekte gezwungen zu werden, und können anschließend bei Bedarf organisiert werden.

Einzelheiten und unterstützte Zuordnungen beschreibt der [DGT-GTD-Import](/de/import/dgt-gtd).

### OmniFocus-CSV-/JSON-/ZIP-Import

Mindwtr kann OmniFocus-Exporte unter **Einstellungen → Daten → Aus OmniFocus importieren** importieren.

- OmniFocus-**CSV**-Exporte, einschließlich CSV-Dateien in UTF-8 und UTF-16
- **JSON**-Exporte aus Omni Automation/Kurzbefehlen und **ZIP**-Archive
- Ordner → Bereiche, wenn Metadaten vorhanden
- Projekte/Projektverweise → Projekte
- eigenständige Aktionen bleiben außerhalb von Projekten
- unterstützte Notizen, Tags, Zurückstellungs-/Fälligkeitsdaten, Abschluss und JSON-Wiederholungen bleiben erhalten
- einfache Verschachtelung → Checkliste; tiefere Hierarchie abgeflacht mit Originalpfad

Wenn die genaue Übernahme von Wiederholungen oder Hierarchien wichtig ist, den JSON-/ZIP-Weg über Omni Automation statt CSV verwenden. Geplante Daten und Dauertext bleiben in der importierten Beschreibung erhalten, wenn Mindwtr dafür kein direktes Feld besitzt.

Einzelheiten und unterstützte Zuordnungen beschreibt der [OmniFocus-Import](/de/import/omnifocus).

<a id="apple-reminders-import-ios"></a>

### Import aus Apple Erinnerungen (iOS)

Auf iPhone und iPad kann Mindwtr unerledigte Apple-Erinnerungen unter **Einstellungen → Daten → Aus Apple Erinnerungen importieren** importieren.

- Die Apple-Erinnerungsliste auswählen, die als Erfassungsquelle dienen soll.
- Neue unerledigte Erinnerungen zum Mindwtr-**Posteingang** hinzufügen.
- Titel und Notizen der Erinnerung als Aufgabentitel und -beschreibung übernehmen.
- Erledigte, titellose und bereits importierte Erinnerungen überspringen.
- Importierte Erinnerungen optional aus Apple Erinnerungen löschen, nachdem Mindwtr sie zum Posteingang hinzugefügt hat.

Der Import aus Apple Erinnerungen ist ein einseitiger Importweg und kein Synchronisierungs-Backend.

### Sicherungsstrategie

- regelmäßige Exporte in den Synchronisierungsordner
- lokalen Konfigurationsordner sichern
- Synchronisierungsdatei dient als Sicherung
- automatische Wiederherstellungsmomentaufnahmen vor Wiederherstellung/Import

---

## Fehlerbehebung

### Synchronisierung funktioniert nicht

1. **Pfad des Synchronisierungsordners prüfen**
   - Sicherstellen, dass der Pfad vorhanden und erreichbar ist
   - Berechtigungen prüfen

2. **Synchronisierungsdienst prüfen**
   - Läuft Dropbox/Google Drive?
   - Ist die Datei geräteübergreifend synchronisiert?

3. **Temporäre Dateifehler**
   - Wenn ein Synchronisierungsdienst gerade schreibt (z. B. Syncthing), kann die JSON-Datei vorübergehend ungültig sein.
   - Einen Moment warten und erneut synchronisieren.

4. **Manuell synchronisieren**
   - Auf dem Desktop auf **Jetzt synchronisieren**, auf Mobilgeräten auf **Synchronisieren** klicken
   - Auf Fehlermeldungen achten

### Datenkonflikte

Wenn unerwartete Daten erscheinen:
1. Aktuelle Daten sichern.
2. Neueste Datei im Ordner prüfen.
3. Bei Bedarf manuell zusammenführen.

### Mobile Synchronisierungsdatei fehlt

1. Datei im Cloud-Ordner prüfen.
2. Unter Einstellungen → Synchronisierung erneut auswählen.
3. Berechtigungen prüfen.

### Synchronisierung zurücksetzen

Für einen vollständigen Neustart:
1. Inhalt des Synchronisierungsordners löschen.
2. Von einem Gerät exportieren.
3. Auf anderen Geräten importieren/synchronisieren.

---

## Datenformat

Struktur von `data.json`:

```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "next",
      "contexts": ["@home"],
      "tags": ["#focused"],
      "dueDate": "2025-01-15T09:00:00Z",
      "recurrence": {
        "rule": "weekly",
        "strategy": "strict",
        "byDay": ["MO", "WE"]
      },
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z",
      "deletedAt": null
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "title": "Project name",
      "status": "active",
      "color": "#3B82F6",
      "areaId": "area-uuid",
      "tagIds": ["#client", "#feature"],
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "sections": [
    {
      "id": "uuid",
      "projectId": "project-uuid",
      "title": "Section title",
      "order": 1,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "areas": [
    {
      "id": "uuid",
      "name": "Research",
      "color": "#3B82F6",
      "icon": "🔬",
      "order": 0,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "people": [
    {
      "id": "uuid",
      "name": "Alex",
      "note": "Design lead",
      "referenceLink": "https://example.com/alex",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
```

---

## Datenschutz

- Alle Daten werden lokal auf Ihrem Gerät gespeichert.
- Die Synchronisierung läuft über Ihren eigenen Cloud-Dienst.
- Aufgaben, Projekte, Notizen, Anhänge und Synchronisierungsinhalte werden nicht an Mindwtr-Server gesendet.
- Builds mit Heartbeat-Analyse können ein kleines App-Zustandsereignis senden; es enthält keine Aufgaben, Projekte, Notizen, Dateien, KI-Prompts oder Kontoinhalte. Siehe [Datenschutzrichtlinie](https://mindwtr.app/privacy).
- Sie kontrollieren Ihre Daten vollständig.

---

## Siehe auch

- [Desktop-Benutzerhandbuch](/de/use/desktop)
- [Mobiles Benutzerhandbuch](/de/use/mobile)
- [Erste Schritte](/de/start/getting-started)
- [Anhänge](/de/use/attachments)
