# Installation sur ordinateur

Instructions d’installation détaillées pour toutes les plateformes de bureau.

Pour les versions candidates et bêta, consultez [Rejoindre les canaux bêta](/fr/start/beta-channels).

---

## Linux

### Arch Linux (AUR, paquet précompilé)

[![Version AUR de mindwtr-bin](https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr-bin)](https://aur.archlinux.org/packages/mindwtr-bin)

Le moyen le plus simple d’installer Mindwtr sur une distribution basée sur Arch est d’utiliser le paquet AUR précompilé :

```bash
# Using yay
yay -S mindwtr-bin

# Using paru
paru -S mindwtr-bin

# Using pamac (Manjaro)
pamac install mindwtr-bin
```

[Paquet AUR : mindwtr-bin](https://aur.archlinux.org/packages/mindwtr-bin)

### Arch Linux (AUR, compilation depuis les sources)

[![Version AUR de mindwtr](https://img.shields.io/aur/version/mindwtr?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr)](https://aur.archlinux.org/packages/mindwtr)

Utilisez le paquet AUR compilé depuis les sources si vous préférez effectuer la compilation localement :

```bash
# Using yay
yay -S mindwtr

# Using paru
paru -S mindwtr
```

[Paquet AUR : mindwtr](https://aur.archlinux.org/packages/mindwtr)

### Debian / Ubuntu

[![Dépôt APT](https://img.shields.io/badge/APT_repo-Install-1f6feb?logo=debian&logoColor=white)](https://dongdongbh.github.io/Mindwtr/deb)

Ajoutez le dépôt APT (recommandé) :

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```

Installation manuelle : téléchargez le fichier `.deb` depuis les [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases), puis exécutez `sudo dpkg -i mindwtr_*.deb`.

### Fedora / RHEL / openSUSE

[![Dépôt RPM](https://img.shields.io/badge/RPM_repo-Install-ee0000?logo=redhat&logoColor=white)](https://dongdongbh.github.io/Mindwtr/rpm)

Ajoutez le dépôt DNF/YUM (recommandé) :

```bash
cat <<'EOF' | sudo tee /etc/yum.repos.d/mindwtr.repo
[mindwtr]
name=Mindwtr Repository
baseurl=https://dongdongbh.github.io/Mindwtr/rpm
enabled=1
gpgcheck=0
EOF

sudo dnf install mindwtr
```

Installation manuelle : téléchargez le fichier `.rpm` depuis les [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases), puis exécutez `sudo rpm -i mindwtr-*.rpm`.

### Flatpak (Flathub)

[![Flathub](https://img.shields.io/badge/Flathub-Install-000000?logo=flathub&logoColor=white)](https://flathub.org/apps/tech.dongdongbh.mindwtr)

Installez Mindwtr depuis Flathub :

```bash
flatpak install flathub tech.dongdongbh.mindwtr
```

Lancez-le avec :

```bash
flatpak run tech.dongdongbh.mindwtr
```

[Fiche Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr)

### Snap Store

[![Snap Store](https://img.shields.io/badge/Snap_Store-Install-82BEA0?logo=snapcraft&logoColor=white)](https://snapcraft.io/mindwtr)

Installez Mindwtr depuis le Snap Store :

```bash
sudo snap install mindwtr
```

[Fiche Snap Store](https://snapcraft.io/mindwtr)

### AppImage (universel)

Fonctionne sur la plupart des distributions Linux :

```bash
# Download the versioned AppImage from:
# https://github.com/dongdongbh/Mindwtr/releases/latest

# Make executable
chmod +x Mindwtr-*.AppImage

# Run
./Mindwtr-*.AppImage
```

> **Conseil :** utilisez [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) pour une meilleure intégration au bureau.

### Autres distributions

Pour les autres distributions, utilisez l’AppImage ou compilez depuis les sources (consultez le [Guide du développeur](/fr/developers/developer-guide)).

Les paquets maintenus par la communauté (par exemple nixpkgs pour NixOS) sont les bienvenus. La version de bureau intègre sa dépendance TLS, de sorte que la création du paquet n’exige pas de version système correspondante d’OpenSSL. Si vous en maintenez un, ouvrez une discussion afin qu’il puisse être référencé ici.

---

## Windows

### Microsoft Store (recommandé)

[![Microsoft Store](https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white)](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare)

Installez Mindwtr depuis le [Microsoft Store](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare).

### Winget

[![Version Winget](https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF)](https://winstall.app/apps/dongdongbh.Mindwtr)

Winget est intégré à Windows 10 et 11. Installez Mindwtr avec :

```powershell
winget install dongdongbh.Mindwtr
```

### Chocolatey

[![Version Chocolatey](https://img.shields.io/chocolatey/v/mindwtr?label=Chocolatey&logo=chocolatey&logoColor=white&color=80B5E3)](https://community.chocolatey.org/packages/mindwtr)

Si vous utilisez Chocolatey :

```powershell
choco install mindwtr
```

[Paquet Chocolatey](https://community.chocolatey.org/packages/mindwtr)

### Scoop

[![Version Scoop](https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6)](https://github.com/dongdongbh/homebrew-mindwtr)

Si vous utilisez Scoop :

```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

### Programme d’installation (.msi ou .exe)

1. Téléchargez le programme d’installation depuis les [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases)
2. Exécutez le programme d’installation
3. Suivez les instructions de l’assistant d’installation
4. Lancez Mindwtr depuis le menu Démarrer

### Version portable

1. Téléchargez `mindwtr_<version>_windows_x64_portable.zip` depuis les [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases).
2. Extrayez-le dans n’importe quel dossier accessible en écriture.
3. Conservez `portable.txt` à côté de `mindwtr.exe`.

Le mode portable stocke l’état local à côté de l’exécutable :

- `profile/data/` pour la base de données SQLite, le JSON de synchronisation, les pièces jointes, les journaux, les instantanés, les enregistrements audio et les modèles de reconnaissance vocale
- `profile/config/` pour `config.toml` et `secrets.toml`
- `profile/webview/` pour le profil du navigateur WebView2 (cache, stockage local)

Windows WebView2 reste nécessaire. Les pièces jointes qu’une version portable antérieure à v1.1.0 stockait sous `AppData\Roaming\mindwtr` sont déplacées vers le profil portable au premier lancement ; lorsqu’une version installée de Mindwtr est présente sur la même machine, elles sont copiées à la place, afin que les deux installations continuent de fonctionner.

---

## macOS

### Mac App Store (recommandé)

[![Mac App Store](https://img.shields.io/badge/Mac_App_Store-Install-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

Installez Mindwtr depuis le Mac App Store :

[Mindwtr sur le Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144)

Choisissez cette option si vous souhaitez que les mises à jour soient gérées par le Store et utiliser la version signée de l’App Store.

### Bêta TestFlight

[![Bêta TestFlight](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

Rejoignez la bêta macOS via TestFlight :

[Bêta TestFlight de Mindwtr](https://testflight.apple.com/join/7SMJCTSR)

Les autres canaux bêta et les instructions pour les quitter sont présentés dans [Rejoindre les canaux bêta](/fr/start/beta-channels).

### Homebrew

[![Version du cask Homebrew](https://img.shields.io/homebrew/cask/v/mindwtr?label=Homebrew&logo=homebrew&logoColor=white)](https://formulae.brew.sh/cask/mindwtr)

Installez Mindwtr avec [Homebrew](https://brew.sh/) :

```bash
brew install --cask mindwtr
```

### Image disque (.dmg)

1. Téléchargez le fichier `.dmg` depuis les [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases)
2. Ouvrez l’image disque
3. Faites glisser Mindwtr dans votre dossier Applications
4. Lancez-le depuis Applications ou Spotlight

---

## Emplacement des données

Après l’installation, vos données sont stockées aux emplacements suivants :

| Plateforme  | Base de données SQLite                        | JSON de synchronisation                      |
| ----------- | --------------------------------------------- | -------------------------------------------- |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`            | `~/.local/share/mindwtr/data.json`           |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                 | `%APPDATA%/mindwtr/data.json`                |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Les installations Flatpak utilisent des chemins XDG isolés sous `~/.var/app/tech.dongdongbh.mindwtr/`. Vous pouvez toujours consulter les chemins actifs exacts dans **Paramètres → Synchronisation → Données locales**.

La configuration est stockée séparément :

| Plateforme  | Emplacement                                    |
| ----------- | ---------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`                |
| **Windows** | `%APPDATA%/mindwtr/config.toml`                |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

---

## Mise à jour

La recherche de mises à jour tient compte du canal : Mindwtr détecte son mode d’installation, compare la version installée à celle publiée sur ce canal et vous dirige vers la procédure de mise à jour correspondante.

- **Microsoft Store, Winget, Chocolatey, Homebrew, AUR** : le rappel de mise à jour n’apparaît que lorsque la nouvelle version est disponible sur votre canal ; effectuez la mise à jour avec votre gestionnaire de paquets comme d’habitude (par exemple `winget upgrade dongdongbh.Mindwtr`, `choco upgrade mindwtr`, `brew upgrade --cask mindwtr`).
- **Scoop** : Mindwtr ne recherche aucune mise à jour automatiquement, car n’importe quel bucket peut contenir le manifeste et Scoop gère les mises à jour (`scoop update mindwtr`). La recherche manuelle dans Paramètres → À propos reste disponible.
- **Flatpak, Snap et mise à jour automatique des boutiques d’applications** : les mises à jour arrivent automatiquement ; Mindwtr n’affiche donc aucun rappel.
- **Téléchargement direct, version portable, AppImage, .deb/.rpm** : dans Paramètres → À propos, sélectionnez Rechercher les mises à jour, puis téléchargez la nouvelle version depuis les [versions](https://github.com/dongdongbh/Mindwtr/releases) et installez-la par-dessus votre installation existante.

Vos données sont conservées entre les mises à jour.

---

## Désinstallation

### Linux (gestionnaire de paquets)
```bash
# AUR
yay -R mindwtr-bin

# Debian/Ubuntu
sudo dpkg -r mindwtr

# Flatpak
flatpak uninstall tech.dongdongbh.mindwtr
```

### Windows
Utilisez « Ajouter ou supprimer des programmes » dans les paramètres de Windows.

### macOS
Faites glisser Mindwtr du dossier Applications vers la corbeille.

### Suppression des données
Pour supprimer toutes les données, effacez les dossiers de configuration et de données :
```bash
# Linux
rm -rf ~/.config/mindwtr
rm -rf ~/.local/share/mindwtr

# macOS
rm -rf ~/Library/Application\ Support/mindwtr

# Windows (PowerShell)
Remove-Item -Recurse -Force "$env:APPDATA\\mindwtr"
```

---

## Dépannage

### L’application ne démarre pas (Linux)

Vérifiez que WebKitGTK est installé :
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### Icônes manquantes

Installez un thème d’icônes complet :
```bash
sudo pacman -S papirus-icon-theme
```

### Fenêtre vide

Essayez de lancer l’application en désactivant le GPU :
```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 mindwtr
```

---

## Voir aussi

- [Bien démarrer](/fr/start/getting-started)
- [Guide d’utilisation sur ordinateur](/fr/use/desktop)
- [Données et synchronisation](/fr/data-sync/)
