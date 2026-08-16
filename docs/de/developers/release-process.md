# Release-Prozess

Diese Seite dokumentiert den normalen Mindwtr-Release-Ablauf auf praktischer Ebene. Sie richtet sich an Maintainer, die im Repository arbeiten.

---

## Quelldateien

Release-Automatisierung und Versionsmetadaten konzentrieren sich auf:

- `scripts/bump-version.sh`
- `scripts/update-versions.js`
- `docs/release-notes/`
- `docs/release-notes/google-play/`
- `metadata/`
- `metadata/metadata.json`
- `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
- `https://github.com/dongdongbh/mindwtr-web/tree/main/docs` für Änderungen an der öffentlichen Dokumentation
- `wiki/` wurde eingestellt — es enthält nur eine Zielseite, die auf die Dokumentationswebsite verweist; fügen Sie niemals Inhaltsseiten hinzu
- `.github/workflows/`
- `.github/workflows/release-rc.yml` für die Release-Candidate-Automatisierung

---

## RC-Zug für zweiwöchentliche Releases

Verwenden Sie für normale zweiwöchentliche Minor-Releases einen Release-Candidate-Zug. Dies ist kein allgemeines Beta-Programm. Ein RC ist der Build, der stabil werden soll, sofern Tester keinen Blocker finden.

Verwenden Sie SemVer-Namen für Vorabversionen:

- erster Kandidat: `v1.1.0-rc.1`
- folgende Blockerkorrektur: `v1.1.0-rc.2`
- endgültiges stabiles Release: `v1.1.0`

Ersetzen Sie keine Artefakte für einen RC, der Tester erreicht hat. Beheben Sie einen solchen Fall mit der nächsten RC-Nummer. Wenn ein Lauf fehlschlägt, bevor GitHub das Prerelease veröffentlicht, brechen Sie ihn ab, korrigieren Sie `main`, löschen Sie den betreffenden RC-Tag, erstellen Sie ihn auf dem korrigierten Commit neu und pushen Sie den Tag erneut.

Führen Sie für einen RC `./scripts/bump-version.sh vX.Y.Z-rc.N` aus. Das Skript belässt die Versionsdateien von App und Paketen auf der stabilen Basisversion (`X.Y.Z`) und schreibt zugleich die vollständige RC-Version für FOSS-Builds ohne Umgebungsvariablen in `apps/mobile/release-version.json`. Der RC-Workflow prüft beide Werte, bevor die Plattform-Builds beginnen.

### Wann der RC-Zug verwendet wird

Verwenden Sie den vollständigen RC-Zug für:

- geplante zweiwöchentliche Minor-Releases
- Releases mit plattformübergreifenden Änderungen
- Releases, die Synchronisierung, Speicherung, Erfassung, Paketierung, Entitlements, Updater-Metadaten oder Store-Metadaten betreffen
- Releases, bei denen sich mehrere Vertriebsartefakte geändert haben

Der Maintainer kann den RC-Zug für triviale Patch-Releases überspringen, etwa eine enge einzeilige Korrektur, eine reine Dokumentationskorrektur oder eine reine Metadatenaktualisierung, die das Verhalten der installierten App nicht beeinflusst. Das Überspringen des Zugs sollte in den Versionshinweisen oder der Release-Checkliste ausdrücklich vermerkt werden.

### RC-Kanalmatrix

Veröffentlichen Sie RC-Builds nur in Kanälen, die Tester ohne hohen Wartungsaufwand unterstützen können.

| Plattform | RC-Kanal | Stabiles Verhalten |
| --- | --- | --- |
| Alle direkten Downloads | GitHub-Prerelease | Das endgültige GitHub-Release wird zur stabilen Downloadquelle. |
| iOS | TestFlight | Der App Store bleibt der stabile Kanal. |
| macOS-App-Store-Build | TestFlight | Der Mac App Store bleibt der stabile Kanal. |
| Android-Play-Build | Standardmäßig interne Tests und offene Tests (`beta`) bei Google Play; geschlossene/benutzerdefinierte Tracks, sofern konfiguriert | Production erhält später einen stabilen Upload, und der interne Test-Track wird vom stabilen Workflow aktualisiert. |
| Linux Flatpak | Flathub-Beta-Branch | Stabile Releases werden sowohl im stabilen als auch im Beta-Branch veröffentlicht, damit Beta-Benutzer nicht zurückbleiben. |
| Arch Linux | AUR `mindwtr-bin-beta` | Das stabile Release aktualisiert das dauerhaft bestehende Beta-Paket. |
| Debian/Fedora Linux | Beta-APT-/RPM-Repositorys | Stabile Pakete verbleiben in getrennten Verzeichnissen der stabilen Repositorys. |
| Direkter Windows-Download | Installer/portable Version aus dem GitHub-Prerelease | Microsoft Store bleibt ausschließlich stabil, sofern Paket-Flights nicht später automatisiert werden. |

Halten Sie diese Kanäle ausschließlich stabil, sofern kein klarer Bedarf besteht und die Automatisierung bereits vorhanden ist:

- F-Droid
- IzzyOnDroid
- Microsoft-Store-Paket-Flights
- winget
- stabiler Homebrew-Cask
- Chocolatey
- stabiler Scoop-Bucket
- stabile APT-/RPM-Repositorys

Microsoft-Store-Paket-Flights bleiben eine mögliche künftige Ergänzung.

### Aktuelle RC-Automatisierung

Der RC-Workflow ist `.github/workflows/release-rc.yml`.

Das Pushen eines neuen Tags `vX.Y.Z-rc.N` startet den Workflow. Bevor die Plattform-Builds beginnen, prüft er den Tag, die stabilen Basisversionen, die committete FOSS-Release-Version und den Tag-Commit. Ein fehlgeschlagener Lauf ohne veröffentlichtes GitHub-Prerelease wird wiederhergestellt, indem derselbe Tag gelöscht und auf dem korrigierten Commit neu erstellt wird. Wenn für den Tag bereits ein GitHub-Release vorhanden ist, führt der Workflow nur die Validierung durch; veröffentlichen Sie Änderungen unter der nächsten RC-Nummer. Verwenden Sie `workflow_dispatch` nur für kontrollierte Kanalwiederholungen oder zur Auswahl nicht standardmäßiger Kanäle.

Der Workflow verwendet nach Möglichkeit die Build-Jobs der stabilen Kanäle wieder und erstellt anschließend aus exakt den Linux-, macOS-, Windows-, Android- und Android-FOSS-Artefakten ein GitHub-Prerelease.

Außerdem veröffentlicht er Tester-Builds in den bereits verbundenen Store-gestützten Kanälen:

- Android-AAB standardmäßig in Google Play `internal` und offene Tests (`beta`); manuelle Läufe können kommagetrennte Play-Test-Tracks oder `none` auswählen.
- iOS-App-Store-Build in TestFlight mit deaktivierter Einreichung zur App-Store-Prüfung.
- macOS-App-Store-Build in TestFlight mit deaktivierter Einreichung zur App-Store-Prüfung.
- Pull Requests zur Aktualisierung des Flathub-Beta-Branches über den gemeinsamen Flathub-Workflow; manuelle Läufe können dies deaktivieren, wenn der Kanal noch nicht bereit ist.
- AUR `mindwtr-bin-beta` wird erstellt und geprüft, sobald die GitHub-Prerelease-Artefakte vorhanden sind; danach werden die exakten Dateien `PKGBUILD` und `.SRCINFO` als Prüfartefakt gespeichert. Der RC-Workflow pusht nicht ins AUR.
- Aktualisierungen der Beta-APT-/RPM-Repositorys, nachdem das GitHub-Prerelease vorhanden ist; manuelle Läufe können sie deaktivieren.

Der stabile `release.yml` bleibt der Workflow für stabile Releases. Er ist so geschützt, dass Tags für Vorabversionen keine ausschließlich stabilen Kanäle wie Google Play Production, Microsoft Store, Snap Stable, Linux-APT-/RPM-Repositorys, Flathub Stable, AUR Stable, Scoop, winget, Homebrew oder Chocolatey veröffentlichen.

Flathub Beta erfordert den Beta-Branch und Berechtigungen in `flathub/tech.dongdongbh.mindwtr`. Stabile Releases veröffentlichen die AUR-Pakete `mindwtr-bin` und `mindwtr` nach einer Prüfung in einem sauberen Container und einer Eigentumsprüfung über `release.yml`. Der Workflow speichert den exakten Quellpaketbaum als Artefakt. Bei RC-Builds bleibt `mindwtr-bin-beta` ein reiner Vorschlag; verwenden Sie den durch das Environment `aur-publish` geschützten Wiederherstellungs-Workflow `publish-aur.yml`, sobald das AUR Pushes annimmt. AUR-Wartung kann diesen Kanal verzögern, ohne das Mindwtr-Release fehlschlagen zu lassen.

Da ein Upload in einen Play-Test-Track einen Android-`versionCode` verbraucht, benötigt jeder RC mit Play-Upload einen neuen `versionCode`. Der RC-Workflow ermittelt diesen Code einmal, bevor die Android-Builds beginnen. Anschließend verwenden der Play-Build und der Android-FOSS-Build dieselbe Vorabprüfungsausgabe und laufen parallel. Der Workflow lädt ein AAB hoch und weist allen konfigurierten Test-Tracks denselben versionCode zu. Der aktuelle endgültige Stable-Ablauf sollte ebenfalls einen neuen Production-Upload mit höherem `versionCode` verwenden, oder ein künftiger Stable-Promotion-Workflow sollte den bereits getesteten Play-Build hochstufen. Taggen Sie kein endgültiges Stable-Release mit einem Android-`versionCode`, der bereits zu Play hochgeladen wurde, sofern der Stable-Workflow nicht gelernt hat, diesen vorhandenen Build hochzustufen.

### Zeitplan

Kanäle mit längerer Prüfzeit benötigen Vorlauf. Verwenden Sie diesen Standardzeitplan:

| Tag | Aktion |
| --- | --- |
| T-7 bis T-5 | Feature Freeze. Nur Fehlerbehebungen, Versionshinweise, Metadaten und Release-Blocker sind zulässig. |
| T-5 | Release-Branch erstellen, `./scripts/bump-version.sh vX.Y.Z-rc.1` ausführen, RC-spezifische Versionshinweise wie `docs/release-notes/X.Y.Z-rc.1.md` erzeugen und `vX.Y.Z-rc.1` taggen, damit `release-rc.yml` die aktivierten Testerkanäle beliefert. |
| T-4 | Smoke-Tests der Kanalartefakte ausführen, sobald geprüfte Builds verfügbar werden. Nur Blocker beheben. |
| T-3 | GitHub-Prerelease aus `release-rc.yml` bestätigen, Flathub-Beta-PR und den gespeicherten Vorschlag für `mindwtr-bin-beta` prüfen, wenn diese Workflow-Eingaben aktiviert waren, und den RC für Tester ankündigen. |
| T-2 bis T-1 | Rückmeldungen triagieren. `rc.2` nur bei Blockern erstellen. Nichtblocker wandern in den nächsten Zyklus. |
| Veröffentlichungstag | `vX.Y.Z` taggen, überall stabil veröffentlichen und alle vorhandenen dauerhaften Testkanäle ebenfalls auf die stabile Version aktualisieren. |
| T+1 bis T+2 | Abstürze, GitHub-Issues, Discord, Store-Rückmeldungen und Downstream-Paketberichte beobachten. Bei Bedarf mit dem nächsten Patch-Tag korrigieren, etwa `v1.1.1` nach `v1.1.0`. |

### Blocker-Schwelle für rc.2

Erstellen Sie nur bei einem der folgenden Blocker einen weiteren RC:

- Absturz beim Start
- Datenverlust oder Datenbeschädigung
- Beschädigung oder reproduzierbarer Fehler der Synchronisierung
- Fehler bei Installation, Aktualisierung, Signierung, Entitlements oder Paketierung
- Defekte Erfassung, Aufgabenerstellung, Aufgabenbearbeitung oder Aufgabenerledigung
- Defekte Migration von der vorherigen stabilen Version
- Schwere plattformspezifische Regression auf einem unterstützten Kanal

Alles andere wartet auf das nächste geplante Release oder einen späteren Patch. So wird der zweiwöchentliche Zug nicht zu einer endlosen Beta-Schleife.

### Erforderliche RC-Smoke-Gates

Jeder Vertriebskanal ist eine andere Laufzeit. Der RC ist erst bereit, wenn das Artefakt jedes RC-Kanals in einer möglichst kanalgetreuen Umgebung probeweise gestartet wurde, soweit CI oder lokale Tests dies zulassen.

Mindestens prüfen:

- exakt das Artefakt starten, das Benutzer erhalten
- eine Aufgabe erstellen, bearbeiten, erledigen und löschen
- prüfen, ob Erfassung oder Schnelleingabe geöffnet und gespeichert werden kann
- prüfen, ob die App vorhandene Daten aus der vorherigen stabilen Version lesen kann
- prüfen, ob die Synchronisierungseinstellungen ohne Absturz geöffnet werden
- gegebenenfalls Updater-, Store- oder Sandbox-spezifisches Startverhalten prüfen
- prüfen, dass Protokolle keine fatalen Startfehler zeigen

Behalten Sie für Kanäle mit früheren Fehlern kanalspezifische Gates bei:

- FOSS-APK und Play-APK/-AAB sind getrennte Abhängigkeitsmengen
- Flatpak muss innerhalb der Flatpak-Laufzeit starten
- AUR-Pakete müssen vor der Veröffentlichung in einem sauberen Arch-Container gebaut werden
- MSIX-/Microsoft-Store-Pakete dürfen bei Tray-, Tastenkürzel- oder Sandbox-beschränkten Fähigkeiten nicht hart fehlschlagen
- App-Store- und TestFlight-Builds müssen die erforderlichen Entitlements beibehalten

### Ankündigung für Tester

Die RC-Ankündigung sollte kurz und handlungsorientiert sein:

- Version und Kanallinks
- wichtigste benutzerseitige Änderungen
- bekannte Risiken oder besonders zu testende Bereiche
- genauer Rückmeldepfad: GitHub-Issue, Discord-Kanal oder E-Mail
- Hinweis, dass dies ein Release Candidate und keine Funktionsvorschau ist

---

## Ablauf für stabile Releases

1. Stellen Sie sicher, dass `main` den vorgesehenen Release-Zustand hat, und committen Sie zunächst alle Vorabarbeiten.
   - Wenn die vorherige Version bereits veröffentlicht ist, legen Sie Folgekorrekturen bis zur Vorbereitung der nächsten Patch-Version unter `docs/release-notes/unreleased.md` ab und verlinken Sie sie aus `CHANGELOG.md`, zum Beispiel `v0.9.1` nach `v0.9.0`.
2. Heben Sie die Version an mit:

```bash
./scripts/bump-version.sh 0.x.y
```

Dies aktualisiert die Versionen der Workspace-Pakete und erhöht den Android-`versionCode`.

Wenn Google Play durch RC- oder Tester-Uploads bereits einen höheren `versionCode` hat, übergeben Sie diesen Höchstwert vor dem Taggen an das Skript zur Versionsanhebung:

```bash
ANDROID_REMOTE_MAX_VERSION_CODE=85 ./scripts/bump-version.sh 0.x.y
```

Das Skript schreibt in `apps/mobile/app.json` einen nachverfolgten Wert oberhalb des Play-Höchstwerts, sodass Release-Tag, GitHub-APK und reproduzierbare Downstream-Build-Rezepte dieselben Android-Metadaten sehen. Die CI für stabile Releases lehnt weiterhin reine CI-Überschreibungen von `versionCode` ab; korrigieren Sie die Quellmetadaten vor dem Taggen, statt sich auf eine nicht nachverfolgte Workflow-Änderung zu verlassen.

3. Führen Sie vor dem Taggen die harten Release-Gates aus:
   - Typ-/Test-Gate:
     - `bun run test`
     - `bun run typecheck`
     - `bun run native:test`
   - FOSS-/statisches Gate:
     - `git diff vPREV..HEAD -- apps/mobile/package.json` prüfen
     - F-Droid-/FOSS-Konfigurationsdateien prüfen (`apps/mobile/plugins/android-manifest-fixes.js`, `apps/mobile/scripts/`, `.github/workflows/release-android-foss.yml`, `config/izzyonandroid.yml`)
     - `python3 scripts/ci/repair-package-lock.py --check apps/desktop/package-lock.json` ausführen
   - CloudKit-Schema-Gate:
     - synchronisierte Schemadateien mit dem vorherigen Tag vergleichen
     - wenn ein neues CloudKit-gestütztes Feld oder ein neuer Datensatztyp hinzugefügt wurde, das Produktionsschema vor dem Release aktualisieren/bereitstellen
4. Versionshinweise und Metadaten vorbereiten oder aktualisieren:
   - `docs/release-notes/<version>.md`
   - `docs/release-notes/google-play/<version>.txt`
   - `metadata/*/release_notes.txt`
   - `metadata/*/changelogs/<androidVersionCode>.txt`
   - `metadata/metadata.json`
   - `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
5. Aktualisieren Sie die öffentliche Dokumentation in der [Quelle der Mindwtr-Webdokumentation](https://github.com/dongdongbh/mindwtr-web/tree/main/docs), wenn sich Details des Release-/Dokumentationsprozesses geändert haben. Das GitHub Wiki wurde eingestellt; fügen Sie keine `wiki/`-Inhaltsseiten hinzu oder aktualisieren Sie sie, und führen Sie Git nicht in einem separaten `.wiki`-Checkout aus.
6. Prüfen Sie die entstandenen Versions- und Metadatenänderungen sorgfältig.
7. Committen Sie die Release-Vorbereitung:

```bash
git add -A
git commit -m "chore(release): v0.x.y"
```

8. Taggen Sie das Release:

```bash
git tag v0.x.y
```

9. Pushen Sie `main` und den Tag:

```bash
git push origin main --tags
```

10. Lassen Sie GitHub Actions die Plattformartefakte und alle Downstream-Paketierungsjobs veröffentlichen.

---

## Windows-Codesignierung

Der Release-Workflow ist für die Authenticode-Signierung von Windows-Builds über SignPath Foundation vorbereitet; derzeit ist jedoch kein veröffentlichter Download als signiert bestätigt. Sobald das Release-Zertifikat und die SignPath-Artefaktkonfiguration bereit sind, führt der Signierblock in `.github/workflows/release-windows.yml` pro Release zwei Signierrunden aus, und die Reihenfolge ist entscheidend:

1. `tauri build --no-bundle` hält bei der losen `mindwtr.exe` an, die zuerst signiert wird. Das NSIS-Installationsprogramm bettet eine eigene Kopie dieser Binärdatei ein; ein vor dem Signieren gebündeltes Installationsprogramm würde also auf jedem Rechner eine unsignierte EXE ablegen. Die signierte EXE fließt außerdem in das portable ZIP und das MSIX-Layout ein.
2. `tauri bundle` baut anschließend das Installationsprogramm um die signierte EXE herum, und `mindwtr-setup.exe` wird in einer zweiten Runde signiert.

Jede Runde ist eine eigene SignPath-Einreichung eines ZIPs mit genau einer Datei. Die Richtlinie `release-signing` verlangt daher zwei manuelle Freigaben pro Release, jeweils mit 30 Minuten Zeitlimit, bevor der Build fehlschlägt. Die Runden lassen sich nicht zusammenlegen: Das Installationsprogramm existiert erst, wenn die EXE signiert ist. Sowohl der stabile als auch der RC-Workflow rufen diesen Job auf, ein RC-Tag kostet also dieselben zwei Freigaben.

Der gesamte Block ist daran gebunden, dass das Repository `dongdongbh/Mindwtr` ist, die Repository-Variable `SIGNPATH_SIGNING_ENABLED` auf `true` steht, beide SignPath-Secrets gesetzt sind und ein Tag vorliegt. Forks, Pull Requests und Dispatch-Läufe ohne Tag erzeugen bewusst unsignierte Builds. Die Variable ist der Hauptschalter: Ist sie nicht gesetzt, werden die Signierschritte stillschweigend übersprungen und das Release erscheint unsigniert — ohne fehlschlagende Prüfung, die darauf hinweist.

Vor dem nächsten signierten Release muss die Artefaktkonfiguration in der SignPath-Oberfläche an die zwei Einreichungen mit je einer Datei angepasst werden. Das ist eine Aufgabe der Maintainer außerhalb dieses Repositories — die Workflow-Änderung allein genügt nicht — und sie entwertet den früheren Testsignierlauf, der die alte einzelne Einreichung mit beiden Dateien genutzt hat.

---

## Vor dem Taggen

Prüfen Sie mindestens:

- Versionshinweise sind vorhanden und entsprechen den tatsächlichen Änderungen
- Paketversionen sind im gesamten Monorepo abgestimmt
- `apps/mobile/release-version.json` enthält bei einem RC-Tag die vollständige RC-Version
- Android-`versionCode` wurde erhöht
- Desktop-Paket-Lockdatei besteht `repair-package-lock.py --check`
- FOSS-Konfiguration entfernt weiterhin gesperrte Berechtigungen und behält nur beabsichtigte bei
- CloudKit-gestütztes Schema hat sich nicht geändert, oder das Produktionsschema wurde zuerst aktualisiert
- Änderungen an Store-/Release-Metadaten sind beabsichtigt und je Plattform begrenzt
- Kategorien der mobilen Stores in den Konsolen sind weiterhin korrekt: Google Play `Productivity > Task Management` und primäre App-Store-Kategorie `Productivity`
- Gebietsschemainhalte für Google Play halten die API-Grenze von 500 Zeichen ein
- die SignPath-Artefaktkonfiguration passt zum aktuellen Windows-Signierablauf mit zwei Einreichungen

Prüfen Sie bei größeren Releases außerdem:

- Desktop-Updater-Metadaten
- Metadaten mobiler Stores/Fastlane-Eingaben
- Änderungen der Dokumentationswebsite für benutzerseitige Funktionen in der [Quelle der Mindwtr-Webdokumentation](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)
- Smoke-Test der backendübergreifenden Synchronisierung mit einem kleinen Ausgangsdatensatz: Hinzufügen, Aktualisieren, Löschen und Anhangsübertragung sollten zwischen Cloud, WebDAV-/Dateisynchronisierung und allen für den Release-Tester verfügbaren plattformnativen Backends konvergieren; eine zweite Synchronisierung sollte keine neuen Konflikte melden

---

## Versionshinweise

Versionierte Versionshinweise befinden sich in `docs/release-notes/`.

Richtlinien:

- Zusammenfassung am Anfang benutzerorientiert halten
- wichtige Korrekturen/Funktionen zuerst aufführen
- wichtige Commits auflisten, wenn hilfreich
- für RCs `docs/release-notes/X.Y.Z-rc.N.md` oder `docs/release-notes/vX.Y.Z-rc.N.md` verwenden und die vollständige RC-Version in die erste Überschrift aufnehmen; `docs/release-notes/X.Y.Z.md` für das endgültige stabile Release reservieren
- bei stabilen Releases muss die erste Zeile genau `# Mindwtr X.Y.Z` oder `# Mindwtr vX.Y.Z` lauten; `release.yml` lehnt andere Überschriften ab
- Google-Play-Kurztexte unter `docs/release-notes/google-play/` bei Bedarf abstimmen
- `metadata/*/release_notes.txt` für App-Store-Versionshinweise aktualisieren
- neue Android-Changelog-Datei unter `metadata/*/changelogs/<versionCode>.txt` hinzufügen
- Microsoft-Store-Versionshinweise in `metadata/metadata.json` auf dasselbe Release abstimmen
- obersten AppStream-Eintrag in `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml` hinzufügen oder aktualisieren

---

## Prüfungen nach dem Release

Nach dem Pushen des Tags:

- Erstellung des GitHub-Releases prüfen
- prüfen, ob die erwarteten Desktop-/Mobilgeräte-Artefakte angehängt sind
- gegebenenfalls Erfolg storespezifischer Workflows prüfen
- Updater-/Downloadflächen stichprobenartig gegen die neue Version prüfen
- prüfen, ob Stable auch in vorhandenen dauerhaften Testkanälen veröffentlicht wurde, damit Tester beim neuesten Build bleiben

---

## Haltung zu Rollbacks

Wenn ein fehlerhaftes Release erkannt wird:

- weitere Tags stoppen, bis die Fehlerursache verstanden ist
- ein schnelles vorwärts korrigierendes Release dem Umschreiben der veröffentlichten Historie vorziehen
- Versionshinweise zur korrigierenden Patch-Version eindeutig halten

---

## Verwandte Seiten

- [Entwicklerleitfaden](/de/developers/developer-guide)
- [Docker-Bereitstellung](/de/power-users/docker-deployment)
- [Cloud-Bereitstellung](/de/data-sync/cloud-deployment)
- [Versionshinweise des Repositorys](https://github.com/dongdongbh/Mindwtr/tree/main/docs/release-notes)
- [Semantic Versioning](https://semver.org/)
- [GitHub-Prereleases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Google-Play-Test-Tracks](https://support.google.com/googleplay/android-developer/answer/9845334)
- [Apple TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Flathub-Beta-Repository](https://docs.flathub.org/docs/for-app-authors/maintenance)
- [Microsoft-Store-Paket-Flights](https://learn.microsoft.com/en-us/windows/apps/publish/package-flights)
