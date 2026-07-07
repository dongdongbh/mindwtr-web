# Desktop Installation

Detailed installation instructions for all desktop platforms.

For release-candidate and beta builds, see [Join the Beta Channels](/start/beta-channels).

---

## Linux

### Arch Linux (AUR, Prebuilt)

[![AUR mindwtr-bin Version](https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr-bin)](https://aur.archlinux.org/packages/mindwtr-bin)

The easiest way to install on Arch-based distributions is the prebuilt AUR package:

```bash
# Using yay
yay -S mindwtr-bin

# Using paru
paru -S mindwtr-bin

# Using pamac (Manjaro)
pamac install mindwtr-bin
```

[AUR package: mindwtr-bin](https://aur.archlinux.org/packages/mindwtr-bin)

### Arch Linux (AUR, Build from Source)

[![AUR mindwtr Version](https://img.shields.io/aur/version/mindwtr?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr)](https://aur.archlinux.org/packages/mindwtr)

Use the source-built AUR package if you prefer to build locally:

```bash
# Using yay
yay -S mindwtr

# Using paru
paru -S mindwtr
```

[AUR package: mindwtr](https://aur.archlinux.org/packages/mindwtr)

### Debian / Ubuntu

[![APT repo](https://img.shields.io/badge/APT_repo-Install-1f6feb?logo=debian&logoColor=white)](https://dongdongbh.github.io/Mindwtr/deb)

Add the APT repo (recommended):

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```

Manual install: download the `.deb` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) and run `sudo dpkg -i mindwtr_*.deb`.

### Fedora / RHEL / openSUSE

[![RPM repo](https://img.shields.io/badge/RPM_repo-Install-ee0000?logo=redhat&logoColor=white)](https://dongdongbh.github.io/Mindwtr/rpm)

Add the DNF/YUM repo (recommended):

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

Manual install: download the `.rpm` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) and run `sudo rpm -i mindwtr-*.rpm`.

### Flatpak (Flathub)

[![Flathub](https://img.shields.io/badge/Flathub-Install-000000?logo=flathub&logoColor=white)](https://flathub.org/apps/tech.dongdongbh.mindwtr)

Install from Flathub:

```bash
flatpak install flathub tech.dongdongbh.mindwtr
```

Run it with:

```bash
flatpak run tech.dongdongbh.mindwtr
```

[Flathub listing](https://flathub.org/apps/tech.dongdongbh.mindwtr)

### Snap Store

[![Snap Store](https://img.shields.io/badge/Snap_Store-Install-82BEA0?logo=snapcraft&logoColor=white)](https://snapcraft.io/mindwtr)

Install from the Snap Store:

```bash
sudo snap install mindwtr
```

[Snap Store listing](https://snapcraft.io/mindwtr)

### AppImage (Universal)

Works on most Linux distributions:

```bash
# Download the versioned AppImage from:
# https://github.com/dongdongbh/Mindwtr/releases/latest

# Make executable
chmod +x Mindwtr-*.AppImage

# Run
./Mindwtr-*.AppImage
```

> **Tip:** Use [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) for better desktop integration.

### Other Distributions

For other distributions, use the AppImage or build from source (see [Developer Guide](/developers/developer-guide)).

Community-maintained packages (for example nixpkgs for NixOS) are welcome — the desktop build vendors its TLS dependency, so packaging does not need a system OpenSSL match. If you maintain one, open a discussion so it can be linked here.

---

## Windows

### Microsoft Store (Recommended)

[![Microsoft Store](https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white)](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare)

Install from the [Microsoft Store](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare).

### Winget

[![Winget Version](https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF)](https://winstall.app/apps/dongdongbh.Mindwtr)

Winget is built into Windows 10 and 11. Install Mindwtr with:

```powershell
winget install dongdongbh.Mindwtr
```

### Chocolatey

[![Chocolatey Version](https://img.shields.io/chocolatey/v/mindwtr?label=Chocolatey&logo=chocolatey&logoColor=white&color=80B5E3)](https://community.chocolatey.org/packages/mindwtr)

If you use Chocolatey:

```powershell
choco install mindwtr
```

[Chocolatey package](https://community.chocolatey.org/packages/mindwtr)

### Scoop

[![Scoop Version](https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6)](https://github.com/dongdongbh/homebrew-mindwtr)

If you use Scoop:

```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

### Installer (.msi or .exe)

1. Download the installer from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. Run the installer
3. Follow the installation wizard
4. Launch Mindwtr from the Start menu

### Portable

1. Download `mindwtr_<version>_windows_x64_portable.zip` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases).
2. Extract it to any writable folder.
3. Keep `portable.txt` next to `mindwtr.exe`.

Portable mode stores local state beside the executable:

- `profile/data/` for the SQLite DB, sync JSON, logs, snapshots, and audio captures
- `profile/config/` for `config.toml` and `secrets.toml`

Windows WebView2 is still required.

---

## macOS

### Mac App Store (Recommended)

[![Mac App Store](https://img.shields.io/badge/Mac_App_Store-Install-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

Install from the Mac App Store:

[Mindwtr on the Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144)

Use this option if you want store-managed updates and the signed App Store build.

### TestFlight Beta

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

Join the macOS beta through TestFlight:

[Mindwtr TestFlight beta](https://testflight.apple.com/join/7SMJCTSR)

More beta channels and leave-beta instructions are covered in [Join the Beta Channels](/start/beta-channels).

### Homebrew

[![Homebrew Cask Version](https://img.shields.io/homebrew/cask/v/mindwtr?label=Homebrew&logo=homebrew&logoColor=white)](https://formulae.brew.sh/cask/mindwtr)

Install using [Homebrew](https://brew.sh/):

```bash
brew install --cask mindwtr
```

### Disk Image (.dmg)

1. Download the `.dmg` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. Open the disk image
3. Drag Mindwtr to your Applications folder
4. Launch from Applications or Spotlight

---

## Data Location

After installation, your data is stored at:

| Platform    | SQLite DB                                     | Sync JSON                                    |
| ----------- | --------------------------------------------- | -------------------------------------------- |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`            | `~/.local/share/mindwtr/data.json`           |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                 | `%APPDATA%/mindwtr/data.json`                |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Flatpak installs use sandboxed XDG paths under `~/.var/app/tech.dongdongbh.mindwtr/`. You can always check the exact active paths in **Settings → Sync → Local Data**.

Config is stored separately:

| Platform    | Location                                       |
| ----------- | ---------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`                |
| **Windows** | `%APPDATA%/mindwtr/config.toml`                |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

---

## Updating

Update checks are channel-aware: Mindwtr detects how it was installed, compares against the version published for that channel, and points you to that channel's update path.

- **Microsoft Store, Winget, Chocolatey, Homebrew, AUR** — the update reminder only appears once your channel has the new version; update with your package manager as usual (for example `winget upgrade dongdongbh.Mindwtr`, `choco upgrade mindwtr`, `brew upgrade --cask mindwtr`).
- **Scoop** — Mindwtr makes no automatic update checks at all, since any bucket can carry the manifest and Scoop owns updates (`scoop update mindwtr`). The manual check in Settings → About still works.
- **Flatpak, Snap, and the app stores' auto-update** — updates arrive automatically, so Mindwtr stays quiet.
- **Direct download, portable, AppImage, .deb/.rpm** — check in Settings → About → Check for Updates, then download the new version from [Releases](https://github.com/dongdongbh/Mindwtr/releases) and install over your existing installation.

Your data is preserved between updates.

---

## Uninstalling

### Linux (Package Manager)
```bash
# AUR
yay -R mindwtr-bin

# Debian/Ubuntu
sudo dpkg -r mindwtr

# Flatpak
flatpak uninstall tech.dongdongbh.mindwtr
```

### Windows
Use "Add or Remove Programs" in Windows Settings.

### macOS
Drag Mindwtr from Applications to Trash.

### Data Cleanup
To remove all data, delete both the config and data directories:
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

## Troubleshooting

### App Won't Start (Linux)

Ensure WebKitGTK is installed:
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### Missing Icons

Install a complete icon theme:
```bash
sudo pacman -S papirus-icon-theme
```

### Blank Window

Try running with GPU disabled:
```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 mindwtr
```

---

## See Also

- [Getting Started](/start/getting-started)
- [User Guide Desktop](/use/desktop)
- [Data and Sync](/data-sync/)
