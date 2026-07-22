# Selbst gehostete Mindwtr Cloud

Mindwtr Cloud ist die selbst gehostete Synchronisierungsoption für alle, die statt einer anbietergestützten Synchronisierung einen Mindwtr-spezifischen Server möchten. Das selbst gehostete Cloud-Backend ist ein kleiner Synchronisierungsserver unter `apps/cloud`. Es ist ein Endpunkt für Desktop- und Mobil-Clients, nicht die Benutzeroberfläche der Mindwtr-App.

## Wann diese Option sinnvoll ist

Verwenden Sie die selbst gehostete Cloud, wenn:

- Sie einen eigenen Mindwtr-Synchronisierungsendpunkt möchten,
- Sie einen kleinen Server bereitstellen und aktualisieren können und
- Hostingkonto, Speicherort und Zugriffskontrollen in Ihrer Hand liegen sollen.

Wenn Sie nur dateibasiert synchronisieren möchten, ist [WebDAV](/de/data-sync/webdav) möglicherweise einfacher.

## Maßgebliche Referenzen

- Unter [Daten und Synchronisierung](/de/data-sync/) wählen Sie ein Backend und konfigurieren den Client.
- Die [Cloud-Bereitstellung](/de/data-sync/cloud-deployment) beschreibt Servereinrichtung, Betrieb und Umgebungsvariablen.
- Die [Cloud-API](/de/developers/cloud-api) dokumentiert die `/v1`-Endpunkte.
- Unter [Docker-Bereitstellung](/de/power-users/docker-deployment) finden Sie den Docker-basierten Weg.

## Schnelle Orientierung

- Das selbst gehostete Cloud-Backend speichert pro Bearer-Token einen JSON-Namensraum.
- Clients verwenden die Basis-URL `/v1` und synchronisieren über `GET /v1/data` und `PUT /v1/data`.
- `/v1/data` ist der maßgebliche Synchronisierungsvertrag; Routen für Aufgaben, Projekte, Bereiche, Abschnitte, Suche und Anhänge sind optionale Komfort-APIs.
- Anhangs-APIs liegen unter `/v1/attachments/...`.
- Stellen Sie den Dienst hinter HTTPS bereit und behandeln Sie das Bearer-Token wie ein Passwort.
- Öffentliche URLs erfordern HTTPS. HTTP wird nur für lokale/private Ziele wie `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` bis `172.31.x.x`, `192.168.x.x`, Loopback-/private IPv6-Adressen, `*.local` und `*.home.arpa` akzeptiert.

## Aufbau der Bereitstellung

Eine typische Bereitstellung umfasst:

- den Mindwtr-Cloud-Server,
- eine persistente Datenbank oder ein Speicher-Backend,
- HTTPS vor dem Server,
- eine in jedem Mindwtr-Client eingetragene Server-URL und
- ein selbst erstelltes Token oder andere Zugangsdaten.

## Checkliste zur Einrichtung

1. Exportieren Sie auf Ihrem Hauptgerät eine Sicherung.
2. Stellen Sie den Server anhand der aktuellen Anweisungen im Mindwtr-Repository bereit.
3. Prüfen Sie, ob der Health-Endpunkt über HTTPS antwortet.
4. Konfigurieren Sie Mindwtr mit Server-URL und Zugangsdaten.
5. Starten Sie eine manuelle Synchronisierung und prüfen Sie, ob dieselben Daten auf einem zweiten Gerät erscheinen.

::: warning Geheimnisse der Bereitstellung gehören nicht in Git
Speichern Sie Server-Token, Datenbank-URLs und Zugangsdaten bei Ihrer Hostingplattform oder in einer lokalen Geheimnisverwaltung. Committen Sie sie nicht in ein Repository.
:::

::: tip Server unter einer LAN-Adresse (Heimnetz, Reverse Proxy)
Zeigt die Server-URL auf eine Adresse im lokalen Netzwerk, fragen Apple-Geräte beim ersten Kontakt nach der Berechtigung "Lokales Netzwerk"; bestätigen Sie die Abfrage oder aktivieren Sie Mindwtr später unter Datenschutz & Sicherheit, dann Lokales Netzwerk. Zeigt die Mac-App die Abfrage nie und erreicht den Server nicht, aktualisieren Sie sie: Builds vor v1.1.5 deklarierten die Berechtigung nicht, sodass macOS 15 und neuer lokale Adressen stillschweigend blockierte.
:::
