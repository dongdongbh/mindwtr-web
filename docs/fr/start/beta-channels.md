# Rejoindre les canaux bêta

Mindwtr publie des versions bêta et candidates avant la version stable définitive. Elles reçoivent plus tôt les nouvelles fonctions et corrections, et permettent de repérer les problèmes propres aux plateformes avant leur arrivée dans le canal stable.

Vous pouvez rester durablement sur un canal bêta. Les versions stables y sont également publiées ; les testeurs n’ont donc pas à revenir au canal stable après chaque cycle.

Pour minimiser les risques, utilisez plutôt les pages d’installation stable :

- [Installation sur ordinateur](/fr/start/desktop-installation)
- [Installation sur mobile](/fr/start/mobile-installation)

## Android — test ouvert Google Play

Rejoignez le programme de test ouvert Google Play, puis effectuez les mises à jour normalement depuis le Play Store :

- [Rejoindre depuis Android](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)
- [Rejoindre depuis le web](https://play.google.com/apps/testing/tech.dongdongbh.mindwtr)

Pour quitter ensuite la bêta, revenez au même lien et choisissez **Quitter le programme**.

## iOS, iPadOS et macOS — TestFlight

Installez TestFlight, puis rejoignez la bêta de Mindwtr :

- [Bêta TestFlight de Mindwtr](https://testflight.apple.com/join/7SMJCTSR)

Pour la quitter, retirez Mindwtr de TestFlight et réinstallez la version stable depuis l’App Store ou le Mac App Store.

## Linux — bêta AUR

Sous Arch Linux et ses dérivées, installez le paquet bêta dédié :

```bash
yay -S mindwtr-bin-beta
```

Page du paquet :

- [mindwtr-bin-beta sur AUR](https://aur.archlinux.org/packages/mindwtr-bin-beta)

Pour revenir à la version stable, installez `mindwtr-bin`.

## Linux — bêta Flathub

Ajoutez une fois le dépôt bêta Flathub, puis installez la branche bêta :

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta tech.dongdongbh.mindwtr//beta
```

Lancez explicitement la version bêta :

```bash
flatpak run --branch=beta tech.dongdongbh.mindwtr
```

Les versions stable et bêta peuvent coexister. Pour que le lanceur ouvre la branche bêta :

```bash
flatpak make-current tech.dongdongbh.mindwtr beta
```

Pour remettre ensuite le lanceur sur la version stable :

```bash
flatpak make-current tech.dongdongbh.mindwtr stable
```

## Linux — dépôts bêta APT et RPM

Sous Debian et Ubuntu, ajoutez le dépôt APT bêta ; sa clé de signature est commune au dépôt stable :

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb-beta ./" | sudo tee /etc/apt/sources.list.d/mindwtr-beta.list
sudo apt update
sudo apt install mindwtr
```

Sous Fedora, RHEL et openSUSE, ajoutez le dépôt bêta DNF/YUM :

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

Les versions stables sont aussi publiées dans les dépôts bêta. Les versions candidates sont numérotées comme `1.2.0~rc.3` dans les métadonnées ; APT et DNF les classent avant la version finale `1.2.0`. Une mise à niveau ordinaire vous fait donc automatiquement passer de la candidate à la version stable correspondante.

Pour quitter le dépôt bêta, supprimez `/etc/apt/sources.list.d/mindwtr-beta.list` ou `/etc/yum.repos.d/mindwtr-beta.repo`, puis réinstallez depuis le dépôt stable.

## Docker — étiquette bêta

Chaque version arrive sur GHCR avec son étiquette de version. L’étiquette flottante `beta` pointe toujours vers la version la plus récente, candidate ou stable, de sorte qu’il n’est jamais nécessaire d’en changer. `latest` reste sur la dernière version stable :

```bash
docker pull ghcr.io/dongdongbh/mindwtr-app:beta
docker pull ghcr.io/dongdongbh/mindwtr-cloud:beta
```

Vous pouvez fixer une préversion précise, par exemple `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`. Consultez [Déploiement Docker](/fr/power-users/docker-deployment) pour la configuration Compose.

## Windows, AppImage, APK FOSS et téléchargements directs

Les préversions sont publiées comme telles dans GitHub Releases :

- [Versions de Mindwtr](https://github.com/dongdongbh/Mindwtr/releases)

Recherchez les versions portant un suffixe comme `-rc` ou `-beta`. Les versions stables restent disponibles sur la même page.

## Signaler un problème de bêta

Si vous rencontrez un bogue, [ouvrez un ticket](https://github.com/dongdongbh/Mindwtr/issues/new/choose) en indiquant :

- votre plateforme ;
- la version affichée dans **Paramètres -> À propos** ;
- le comportement attendu ;
- le comportement observé.

Les retours bêta sont particulièrement utiles lorsqu’ils précisent la plateforme et la version exacte, car les corrections des versions candidates varient souvent selon le canal.
