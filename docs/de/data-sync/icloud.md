# iCloud-Synchronisierung

Mindwtr unterstützt auf Apple-Geräten, auf denen das native Modul verfügbar ist, ein natives **iCloud-/CloudKit**-Synchronisierungs-Backend.

## Verfügbarkeit

- **iPhone / iPad:** über das native `iCloud`-Synchronisierungs-Backend unter **Einstellungen → Synchronisierung** unterstützt
- **Android:** nicht unterstützt
- **Windows / Linux:** nicht unterstützt
- **macOS-Desktop:** über das native `iCloud`-Synchronisierungs-Backend unter **Einstellungen → Synchronisierung** unterstützt

## Synchronisierte Daten

Das native iCloud-Backend synchronisiert dieselben GTD-Kerndaten wie die anderen strukturierten Backends:

- Aufgaben
- Projekte
- Abschnitte
- Bereiche
- Anhangsmetadaten
- Anhangsdateien über CloudKit-Assets
- synchronisierte Einstellungsgruppen

Es verwendet CloudKit-Datensätze und -Assets in Ihrem Apple-Konto anstelle einer vom Benutzer ausgewählten Datei `data.json` und eines Ordners `attachments/`.

## Einrichtung

1. Melden Sie sich auf den zu synchronisierenden Geräten mit derselben Apple-ID an.
2. Stellen Sie sicher, dass iCloud auf diesen Geräten für Mindwtr aktiviert ist.
3. Öffnen Sie auf Ihrem Apple-Gerät in Mindwtr **Einstellungen → Synchronisierung**.
4. Wählen Sie **iCloud** als Synchronisierungs-Backend.
5. Führen Sie einmal eine Synchronisierung aus, um Ihre Daten anzulegen oder abzurufen.

Nach der Einrichtung verwendet Mindwtr weiterhin den normalen Local-first-Zusammenführungsablauf und kann auf CloudKit-Änderungsmitteilungen reagieren, sofern verfügbar.

## Plattformhinweise

- Wenn ein Nicht-Apple-Build einen alten Backend-Wert `cloudkit` vorfindet, wechselt Mindwtr auf `Off`, statt eine nicht funktionierende iCloud-Option anzuzeigen.
- macOS-Benutzer können weiterhin **iCloud Drive + Dateisynchronisierung** verwenden, wenn sie einen ordnerbasierten Arbeitsablauf dem nativen CloudKit-Backend vorziehen.
- Auch die native Synchronisierung von iCloud-Anhängen ist Apple-Geräten vorbehalten. Plattformübergreifende Einrichtungen sollten ein plattformübergreifendes Backend verwenden, wenn Anhänge zwischen Apple- und Nicht-Apple-Geräten übertragen werden müssen.
- Wenn Sie ein plattformübergreifendes Backend zwischen Apple- und Nicht-Apple-Geräten benötigen, verwenden Sie **WebDAV**, **Mindwtr Cloud**, **Dropbox** (in unterstützten Builds) oder **Dateisynchronisierung**.

## Wann Sie es verwenden sollten

Verwenden Sie die native iCloud-Synchronisierung, wenn:

- alle beteiligten Geräte zum Apple-Ökosystem gehören
- Sie eine einfachere Einrichtung als das Auswählen und Verwalten eines gemeinsamen Ordners wünschen
- Sie keine Android-, Windows- oder Linux-Clients im selben Synchronisierungsverbund benötigen

Wenn Sie eine plattformübergreifende Synchronisierung benötigen, lesen Sie [Daten und Synchronisierung](/de/data-sync/).
