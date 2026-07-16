# An den Beta-Kanälen teilnehmen

Mindwtr veröffentlicht Beta- und Release-Candidate-Builds vor der endgültigen stabilen Version. Betas erhalten neue Funktionen und Fehlerbehebungen früher und helfen, plattformspezifische Probleme zu finden, bevor derselbe Build alle Nutzer des stabilen Kanals erreicht.

Sie können dauerhaft in einem Beta-Kanal bleiben. Stabile Versionen werden ebenfalls über die Beta-Kanäle veröffentlicht; nach einem Testzyklus müssen Sie also nicht zurückwechseln, um aktuell zu bleiben.

Wenn Sie den risikoärmsten Build benötigen, verwenden Sie stattdessen die Seiten zur stabilen Installation:

- [Desktop-Installation](/de/start/desktop-installation)
- [Mobile Installation](/de/start/mobile-installation)

## Android – offene Tests bei Google Play

Treten Sie dem offenen Test bei Google Play bei und aktualisieren Sie anschließend wie gewohnt über den Play Store:

- [Auf Android teilnehmen](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)
- [Im Web teilnehmen](https://play.google.com/apps/testing/tech.dongdongbh.mindwtr)

Um die Beta später zu verlassen, öffnen Sie erneut denselben Testlink und wählen **Testprogramm verlassen**.

## iOS, iPadOS und macOS – TestFlight

Installieren Sie TestFlight und treten Sie anschließend der Mindwtr-Beta bei:

- [Mindwtr-TestFlight-Beta](https://testflight.apple.com/join/7SMJCTSR)

Um TestFlight zu verlassen, entfernen Sie Mindwtr aus TestFlight und installieren die stabile Version erneut aus dem App Store oder Mac App Store.

## Linux – AUR-Beta

Unter Arch Linux und davon abgeleiteten Distributionen können Sie das eigene Beta-Paket installieren:

```bash
yay -S mindwtr-bin-beta
```

Paketseite:

- [mindwtr-bin-beta im AUR](https://aur.archlinux.org/packages/mindwtr-bin-beta)

Um zur stabilen Version zurückzukehren, installieren Sie stattdessen `mindwtr-bin`.

## Linux – Flathub-Beta

Fügen Sie einmalig das Flathub-Beta-Remote hinzu und installieren Sie dann den Beta-Zweig:

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta tech.dongdongbh.mindwtr//beta
```

Starten Sie den Beta-Build ausdrücklich mit:

```bash
flatpak run --branch=beta tech.dongdongbh.mindwtr
```

Stabile und Beta-Version können parallel installiert bleiben. Damit der Desktop-Starter den Beta-Zweig öffnet:

```bash
flatpak make-current tech.dongdongbh.mindwtr beta
```

So wechseln Sie den Starter später zurück zur stabilen Version:

```bash
flatpak make-current tech.dongdongbh.mindwtr stable
```

## Linux – Beta-Repositorys für APT und RPM

Unter Debian und Ubuntu können Sie das Beta-APT-Repository hinzufügen. Der Signaturschlüssel wird mit dem stabilen Repository geteilt:

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb-beta ./" | sudo tee /etc/apt/sources.list.d/mindwtr-beta.list
sudo apt update
sudo apt install mindwtr
```

Unter Fedora, RHEL und openSUSE können Sie das Beta-DNF-/YUM-Repository hinzufügen:

```bash
cat <<'EOF' | sudo tee /etc/yum.repos.d/mindwtr-beta.repo
[mindwtr-beta]
name=Mindwtr Beta Repository
baseurl=https://dongdongbh.github.io/Mindwtr/rpm-beta
enabled=1
gpgcheck=0
EOF

sudo dnf install mindwtr
```

Auch stabile Versionen werden in den Beta-Repositorys veröffentlicht. Release Candidates tragen in den Paketmetadaten Versionen wie `1.2.0~rc.3`. APT und DNF sortieren diese unter der endgültigen Version `1.2.0`, sodass reguläre Aktualisierungen automatisch vom Release Candidate zum passenden stabilen Build wechseln.

Um das Beta-Repository zu verlassen, entfernen Sie `/etc/apt/sources.list.d/mindwtr-beta.list` beziehungsweise `/etc/yum.repos.d/mindwtr-beta.repo` und installieren Mindwtr erneut aus dem stabilen Repository.

## Docker – Beta-Tag

Jede Version erscheint mit ihrem Versions-Tag in GHCR. Das gleitende Tag `beta` verweist immer auf die neueste Version (Release Candidate oder stabil), sodass Nutzer von `beta` nie das Tag wechseln müssen. `latest` bleibt bei der neuesten stabilen Version:

```bash
docker pull ghcr.io/dongdongbh/mindwtr-app:beta
docker pull ghcr.io/dongdongbh/mindwtr-cloud:beta
```

Eine bestimmte Vorabversion lässt sich über ihre Version festschreiben, zum Beispiel `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`. Die Compose-Einrichtung finden Sie unter [Docker-Bereitstellung](/de/power-users/docker-deployment).

## Windows, AppImage, FOSS-APK und andere direkte Downloads

Vorabversionen werden unter GitHub Releases veröffentlicht und entsprechend gekennzeichnet:

- [Mindwtr Releases](https://github.com/dongdongbh/Mindwtr/releases)

Achten Sie auf Versionen mit einem Suffix wie `-rc` oder `-beta`. Stabile Versionen bleiben auf derselben Seite verfügbar.

## Probleme mit Beta-Versionen melden

Wenn Sie einen Fehler finden, [eröffnen Sie bitte ein Issue](https://github.com/dongdongbh/Mindwtr/issues/new/choose) und nennen Sie:

- Ihre Plattform
- die Version unter **Einstellungen -> Über**
- das erwartete Verhalten
- das tatsächlich aufgetretene Verhalten

Beta-Feedback ist mit Plattform und genauer Version besonders hilfreich, da Fehlerbehebungen für Release Candidates häufig vom jeweiligen Kanal abhängen.
