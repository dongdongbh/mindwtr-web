# Desktop-Installation

Ausführliche Installationsanweisungen für alle Desktop-Plattformen.

Informationen zu Release-Candidate- und Beta-Builds finden Sie unter [An den Beta-Kanälen teilnehmen](/de/start/beta-channels).

---

## Linux

### Arch Linux (AUR, vorgefertigt)

[![AUR mindwtr-bin Version](https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr-bin)](https://aur.archlinux.org/packages/mindwtr-bin)

Am einfachsten installieren Sie Mindwtr auf Arch-basierten Distributionen über das vorgefertigte AUR-Paket:

```bash
# Using yay
yay -S mindwtr-bin

# Using paru
paru -S mindwtr-bin

# Using pamac (Manjaro)
pamac install mindwtr-bin
```

[AUR-Paket: mindwtr-bin](https://aur.archlinux.org/packages/mindwtr-bin)

### Arch Linux (AUR, aus dem Quellcode bauen)

[![AUR mindwtr Version](https://img.shields.io/aur/version/mindwtr?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr)](https://aur.archlinux.org/packages/mindwtr)

Verwenden Sie das aus dem Quellcode gebaute AUR-Paket, wenn Sie lokal bauen möchten:

```bash
# Using yay
yay -S mindwtr

# Using paru
paru -S mindwtr
```

[AUR-Paket: mindwtr](https://aur.archlinux.org/packages/mindwtr)

### Debian / Ubuntu

[![APT repo](https://img.shields.io/badge/APT_repo-Install-1f6feb?logo=debian&logoColor=white)](https://dongdongbh.github.io/Mindwtr/deb)

APT-Repository hinzufügen (empfohlen):

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```

Manuelle Installation: Laden Sie die `.deb`-Datei von [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter und führen Sie `sudo dpkg -i mindwtr_*.deb` aus.

### Fedora / RHEL / openSUSE

[![RPM repo](https://img.shields.io/badge/RPM_repo-Install-ee0000?logo=redhat&logoColor=white)](https://dongdongbh.github.io/Mindwtr/rpm)

DNF-/YUM-Repository hinzufügen (empfohlen):

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

Manuelle Installation: Laden Sie die `.rpm`-Datei von [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter und führen Sie `sudo rpm -i mindwtr-*.rpm` aus.

### Flatpak (Flathub)

[![Flathub](https://img.shields.io/badge/Flathub-Install-000000?logo=flathub&logoColor=white)](https://flathub.org/apps/tech.dongdongbh.mindwtr)

Von Flathub installieren:

```bash
flatpak install flathub tech.dongdongbh.mindwtr
```

Starten mit:

```bash
flatpak run tech.dongdongbh.mindwtr
```

[Flathub-Eintrag](https://flathub.org/apps/tech.dongdongbh.mindwtr)

### Snap Store

[![Snap Store](https://img.shields.io/badge/Snap_Store-Install-82BEA0?logo=snapcraft&logoColor=white)](https://snapcraft.io/mindwtr)

Aus dem Snap Store installieren:

```bash
sudo snap install mindwtr
```

[Snap-Store-Eintrag](https://snapcraft.io/mindwtr)

### AppImage (universell)

Funktioniert auf den meisten Linux-Distributionen:

```bash
# Download the versioned AppImage from:
# https://github.com/dongdongbh/Mindwtr/releases/latest

# Make executable
chmod +x Mindwtr-*.AppImage

# Run
./Mindwtr-*.AppImage
```

> **Tipp:** Verwenden Sie [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) für eine bessere Desktop-Integration.

### Andere Distributionen

Verwenden Sie für andere Distributionen das AppImage oder bauen Sie Mindwtr aus dem Quellcode (siehe [Entwicklerhandbuch](/de/developers/developer-guide)).

Von der Community gepflegte Pakete (zum Beispiel nixpkgs für NixOS) sind willkommen. Der Desktop-Build bringt seine TLS-Abhängigkeit mit, daher muss die Paketierung nicht mit einer systemweiten OpenSSL-Version übereinstimmen. Wenn Sie ein Paket pflegen, eröffnen Sie eine Diskussion, damit es hier verlinkt werden kann.

---

## Windows

### Microsoft Store (empfohlen)

[![Microsoft Store](https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white)](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare)

Installieren Sie Mindwtr aus dem [Microsoft Store](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare).

### Winget

[![Winget Version](https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF)](https://winstall.app/apps/dongdongbh.Mindwtr)

Winget ist in Windows 10 und 11 integriert. Installieren Sie Mindwtr mit:

```powershell
winget install dongdongbh.Mindwtr
```

### Chocolatey

[![Chocolatey Version](https://img.shields.io/chocolatey/v/mindwtr?label=Chocolatey&logo=chocolatey&logoColor=white&color=80B5E3)](https://community.chocolatey.org/packages/mindwtr)

Wenn Sie Chocolatey verwenden:

```powershell
choco install mindwtr
```

[Chocolatey-Paket](https://community.chocolatey.org/packages/mindwtr)

### Scoop

[![Scoop Version](https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6)](https://github.com/dongdongbh/homebrew-mindwtr)

Wenn Sie Scoop verwenden:

```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

### Installationsprogramm (.msi oder .exe)

1. Laden Sie das Installationsprogramm von [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter.
2. Führen Sie das Installationsprogramm aus.
3. Folgen Sie dem Installationsassistenten.
4. Starten Sie Mindwtr über das Startmenü.

### Portable Version

1. Laden Sie `mindwtr_<version>_windows_x64_portable.zip` von [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter.
2. Entpacken Sie die Datei in einen beliebigen beschreibbaren Ordner.
3. Lassen Sie `portable.txt` neben `mindwtr.exe` liegen.

Der portable Modus speichert den lokalen Zustand neben der ausführbaren Datei:

- `profile/data/` für SQLite-Datenbank, Synchronisierungs-JSON, Anhänge, Protokolle, Momentaufnahmen, Audioaufnahmen und Sprachmodelle
- `profile/config/` für `config.toml` und `secrets.toml`
- `profile/webview/` für das WebView2-Browserprofil (Cache, lokaler Speicher)

Windows WebView2 ist weiterhin erforderlich. Anhangsdateien, die ein portabler Build vor v1.1.0 unter `AppData\Roaming\mindwtr` gespeichert hat, werden beim ersten Start in das portable Profil verschoben. Wenn auf demselben Rechner eine installierte Mindwtr-Version vorhanden ist, werden sie stattdessen kopiert, damit beide Installationen weiter funktionieren.

---

## macOS

### Mac App Store (empfohlen)

[![Mac App Store](https://img.shields.io/badge/Mac_App_Store-Install-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

Aus dem Mac App Store installieren:

[Mindwtr im Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144)

Verwenden Sie diese Option, wenn Sie vom Store verwaltete Aktualisierungen und den signierten App-Store-Build wünschen.

### TestFlight-Beta

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

Nehmen Sie über TestFlight an der macOS-Beta teil:

[Mindwtr-TestFlight-Beta](https://testflight.apple.com/join/7SMJCTSR)

Weitere Beta-Kanäle und Anweisungen zum Verlassen der Beta finden Sie unter [An den Beta-Kanälen teilnehmen](/de/start/beta-channels).

### Homebrew

[![Homebrew Cask Version](https://img.shields.io/homebrew/cask/v/mindwtr?label=Homebrew&logo=homebrew&logoColor=white)](https://formulae.brew.sh/cask/mindwtr)

Mit [Homebrew](https://brew.sh/) installieren:

```bash
brew install --cask mindwtr
```

### Disk-Image (.dmg)

1. Laden Sie die `.dmg`-Datei von [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter.
2. Öffnen Sie das Disk-Image.
3. Ziehen Sie Mindwtr in Ihren Programme-Ordner.
4. Starten Sie die App aus „Programme“ oder über Spotlight.

---

## Speicherort der Daten

Nach der Installation werden Ihre Daten hier gespeichert:

| Plattform | SQLite-Datenbank | Synchronisierungs-JSON |
| ----------- | --------------------------------------------- | -------------------------------------------- |
| **Linux** | `~/.local/share/mindwtr/mindwtr.db` | `~/.local/share/mindwtr/data.json` |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db` | `%APPDATA%/mindwtr/data.json` |
| **macOS** | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Flatpak-Installationen verwenden abgeschottete XDG-Pfade unter `~/.var/app/tech.dongdongbh.mindwtr/`. Die genauen aktiven Pfade können Sie jederzeit unter **Einstellungen → Synchronisierung → Lokale Daten** prüfen.

Die Konfiguration wird separat gespeichert:

| Plattform | Speicherort |
| ----------- | ---------------------------------------------- |
| **Linux** | `~/.config/mindwtr/config.toml` |
| **Windows** | `%APPDATA%/mindwtr/config.toml` |
| **macOS** | `~/Library/Application Support/mindwtr/config.toml` |

---

## Aktualisieren

Aktualisierungsprüfungen berücksichtigen den Kanal: Mindwtr erkennt die Installationsart, vergleicht sie mit der für diesen Kanal veröffentlichten Version und verweist auf den entsprechenden Aktualisierungsweg.

- **Microsoft Store, Winget, Chocolatey, Homebrew, AUR**: Die Aktualisierungserinnerung erscheint erst, wenn Ihr Kanal die neue Version anbietet. Aktualisieren Sie wie gewohnt mit Ihrem Paketmanager (zum Beispiel `winget upgrade dongdongbh.Mindwtr`, `choco upgrade mindwtr`, `brew upgrade --cask mindwtr`).
- **Scoop**: Mindwtr führt überhaupt keine automatische Aktualisierungsprüfung aus, da jeder Bucket das Manifest enthalten kann und Scoop Aktualisierungen verwaltet (`scoop update mindwtr`). Die manuelle Prüfung unter Einstellungen → Über funktioniert weiterhin.
- **Flatpak, Snap und automatische Aktualisierung der App-Stores**: Aktualisierungen werden automatisch bereitgestellt, daher zeigt Mindwtr keine Meldung.
- **Direkter Download, portable Version, AppImage, .deb/.rpm**: Prüfen Sie unter Einstellungen → Über → Nach Aktualisierungen suchen, laden Sie anschließend die neue Version von [Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter und installieren Sie sie über die vorhandene Installation.

Ihre Daten bleiben bei Aktualisierungen erhalten.

---

## Deinstallieren

### Linux (Paketmanager)
```bash
# AUR
yay -R mindwtr-bin

# Debian/Ubuntu
sudo dpkg -r mindwtr

# Flatpak
flatpak uninstall tech.dongdongbh.mindwtr
```

### Windows
Verwenden Sie in den Windows-Einstellungen „Apps hinzufügen oder entfernen“.

### macOS
Ziehen Sie Mindwtr aus „Programme“ in den Papierkorb.

### Datenbereinigung
Löschen Sie sowohl das Konfigurations- als auch das Datenverzeichnis, um alle Daten zu entfernen:
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

## Fehlerbehebung

### App startet unter Linux nicht

Stellen Sie sicher, dass WebKitGTK installiert ist:
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### Fehlende Symbole

Installieren Sie ein vollständiges Symbolthema:
```bash
sudo pacman -S papirus-icon-theme
```

### Leeres Fenster

Versuchen Sie den Start mit deaktivierter GPU:
```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 mindwtr
```

---

## Siehe auch

- [Erste Schritte](/de/start/getting-started)
- [Desktop-Benutzerhandbuch](/de/use/desktop)
- [Daten und Synchronisierung](/de/data-sync/)
