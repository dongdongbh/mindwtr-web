# 桌面版安裝

各桌面平台的詳細安裝說明。

若要使用候選發行版與測試版組建，請參閱[加入測試版管道](/zh-Hant/start/beta-channels)。

---

## Linux

### Arch Linux（AUR，預先建置）

[![AUR mindwtr-bin Version](https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr-bin)](https://aur.archlinux.org/packages/mindwtr-bin)

在 Arch 系列發行版上，最簡單的安裝方式是使用預先建置的 AUR 套件：

```bash
# Using yay
yay -S mindwtr-bin

# Using paru
paru -S mindwtr-bin

# Using pamac (Manjaro)
pamac install mindwtr-bin
```

[AUR 套件：mindwtr-bin](https://aur.archlinux.org/packages/mindwtr-bin)

### Arch Linux（AUR，從原始碼建置）

[![AUR mindwtr Version](https://img.shields.io/aur/version/mindwtr?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr)](https://aur.archlinux.org/packages/mindwtr)

若偏好在本機建置，請使用從原始碼建置的 AUR 套件：

```bash
# Using yay
yay -S mindwtr

# Using paru
paru -S mindwtr
```

[AUR 套件：mindwtr](https://aur.archlinux.org/packages/mindwtr)

### Debian / Ubuntu

[![APT repo](https://img.shields.io/badge/APT_repo-Install-1f6feb?logo=debian&logoColor=white)](https://dongdongbh.github.io/Mindwtr/deb)

加入 APT 儲存庫（建議）：

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```

手動安裝：從 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載 `.deb`，再執行 `sudo dpkg -i mindwtr_*.deb`。

### Fedora / RHEL / openSUSE

[![RPM repo](https://img.shields.io/badge/RPM_repo-Install-ee0000?logo=redhat&logoColor=white)](https://dongdongbh.github.io/Mindwtr/rpm)

加入 DNF/YUM 儲存庫（建議）：

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

手動安裝：從 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載 `.rpm`，再執行 `sudo rpm -i mindwtr-*.rpm`。

### Flatpak（Flathub）

[![Flathub](https://img.shields.io/badge/Flathub-Install-000000?logo=flathub&logoColor=white)](https://flathub.org/apps/tech.dongdongbh.mindwtr)

從 Flathub 安裝：

```bash
flatpak install flathub tech.dongdongbh.mindwtr
```

啟動方式：

```bash
flatpak run tech.dongdongbh.mindwtr
```

[Flathub 頁面](https://flathub.org/apps/tech.dongdongbh.mindwtr)

### Snap Store

[![Snap Store](https://img.shields.io/badge/Snap_Store-Install-82BEA0?logo=snapcraft&logoColor=white)](https://snapcraft.io/mindwtr)

從 Snap Store 安裝：

```bash
sudo snap install mindwtr
```

[Snap Store 頁面](https://snapcraft.io/mindwtr)

### AppImage（通用）

可在大多數 Linux 發行版上運作：

```bash
# Download the versioned AppImage from:
# https://github.com/dongdongbh/Mindwtr/releases/latest

# Make executable
chmod +x Mindwtr-*.AppImage

# Run
./Mindwtr-*.AppImage
```

> **提示：**使用 [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) 可獲得更好的桌面整合。

### 其他發行版

其他發行版請使用 AppImage，或從原始碼建置（請參閱[開發者指南](/zh-Hant/developers/developer-guide)）。

歡迎提供社群維護的套件（例如 NixOS 的 nixpkgs）。桌面組建已隨附其 TLS 相依套件，因此封裝時不必符合系統的 OpenSSL 版本。如果你在維護套件，請提出 discussion，讓我們能在此加入連結。

---

## Windows

### Microsoft Store（建議）

[![Microsoft Store](https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white)](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare)

從 [Microsoft Store](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare) 安裝。

### Winget

[![Winget Version](https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF)](https://winstall.app/apps/dongdongbh.Mindwtr)

Windows 10 與 11 已內建 Winget。使用以下命令安裝如水：

```powershell
winget install dongdongbh.Mindwtr
```

### Chocolatey

[![Chocolatey Version](https://img.shields.io/chocolatey/v/mindwtr?label=Chocolatey&logo=chocolatey&logoColor=white&color=80B5E3)](https://community.chocolatey.org/packages/mindwtr)

若使用 Chocolatey：

```powershell
choco install mindwtr
```

[Chocolatey 套件](https://community.chocolatey.org/packages/mindwtr)

### Scoop

[![Scoop Version](https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6)](https://github.com/dongdongbh/homebrew-mindwtr)

若使用 Scoop：

```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

### 安裝程式（.msi 或 .exe）

1. 從 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載安裝程式
2. 執行安裝程式
3. 依照安裝精靈操作
4. 從「開始」功能表啟動如水

### 可攜式版本

1. 從 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載 `mindwtr_<version>_windows_x64_portable.zip`。
2. 解壓縮至任何可寫入的資料夾。
3. 將 `portable.txt` 保留在 `mindwtr.exe` 旁。

可攜式模式會將本機狀態儲存在執行檔旁：

- `profile/data/`：SQLite DB、同步 JSON、附件、日誌、快照、音訊收集內容與語音模型
- `profile/config/`：`config.toml` 與 `secrets.toml`
- `profile/webview/`：WebView2 瀏覽器設定檔（快取、本機儲存空間）

仍須安裝 Windows WebView2。v1.1.0 以前的可攜式組建若曾將附件存於 `AppData\Roaming\mindwtr`，第一次啟動時會將附件移至可攜式設定檔；如果同一部電腦也安裝了如水，附件則會改為複製，讓兩種安裝都能繼續運作。

---

## macOS

### Mac App Store（建議）

[![Mac App Store](https://img.shields.io/badge/Mac_App_Store-Install-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

從 Mac App Store 安裝：

[Mac App Store 上的如水](https://apps.apple.com/app/mindwtr/id6758597144)

若想使用由商店管理的更新與經簽署的 App Store 組建，請選擇此方式。

### TestFlight 測試版

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

透過 TestFlight 加入 macOS 測試版：

[如水 TestFlight 測試版](https://testflight.apple.com/join/7SMJCTSR)

其他測試版管道與退出方式，請參閱[加入測試版管道](/zh-Hant/start/beta-channels)。

### Homebrew

[![Homebrew Cask Version](https://img.shields.io/homebrew/cask/v/mindwtr?label=Homebrew&logo=homebrew&logoColor=white)](https://formulae.brew.sh/cask/mindwtr)

使用 [Homebrew](https://brew.sh/) 安裝：

```bash
brew install --cask mindwtr
```

### 磁碟映像檔（.dmg）

1. 從 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載 `.dmg`
2. 開啟磁碟映像檔
3. 將如水拖入「應用程式」資料夾
4. 從「應用程式」或 Spotlight 啟動

---

## 資料位置

安裝後，資料會儲存於：

| 平台        | SQLite DB                                         | 同步 JSON                                        |
| ----------- | ------------------------------------------------- | ------------------------------------------------ |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`               | `~/.local/share/mindwtr/data.json`               |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                    | `%APPDATA%/mindwtr/data.json`                    |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Flatpak 安裝使用 `~/.var/app/tech.dongdongbh.mindwtr/` 下的沙盒 XDG 路徑。你隨時可以在**設定 → 同步 → 本機資料**中查看目前使用的確切路徑。

設定另外儲存於：

| 平台        | 位置                                           |
| ----------- | ---------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`                |
| **Windows** | `%APPDATA%/mindwtr/config.toml`                |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

---

## 更新

更新檢查會辨識發行管道：如水會偵測安裝方式、比對該管道發布的版本，再引導你採用該管道的更新方式。

- **Microsoft Store、Winget、Chocolatey、Homebrew、AUR**：只有你的管道已有新版本時，才會顯示更新提醒；請照常使用套件管理器更新（例如 `winget upgrade dongdongbh.Mindwtr`、`choco upgrade mindwtr`、`brew upgrade --cask mindwtr`）。
- **Scoop**：如水完全不會自動檢查更新，因為任何 bucket 都可能提供 manifest，且更新由 Scoop 負責（`scoop update mindwtr`）。仍可在「設定 → 關於」中手動檢查。
- **Flatpak、Snap 與應用程式商店的自動更新**：更新會自動送達，因此如水不會顯示提醒。
- **直接下載、可攜式版本、AppImage、.deb/.rpm**：請在「設定 → 關於 → 檢查更新」中檢查，再從 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載新版本，覆蓋現有安裝。

更新時會保留你的資料。

---

## 解除安裝

### Linux（套件管理器）
```bash
# AUR
yay -R mindwtr-bin

# Debian/Ubuntu
sudo dpkg -r mindwtr

# Flatpak
flatpak uninstall tech.dongdongbh.mindwtr
```

### Windows
使用 Windows 設定中的「新增或移除程式」。

### macOS
將「應用程式」中的如水拖入垃圾桶。

### 清除資料
若要移除所有資料，請刪除設定與資料目錄：
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

## 疑難排解

### 應用程式無法啟動（Linux）

請確認已安裝 WebKitGTK：
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### 圖示缺失

請安裝完整的圖示主題：
```bash
sudo pacman -S papirus-icon-theme
```

### 空白視窗

嘗試停用 GPU 後執行：
```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 mindwtr
```

---

## 另請參閱

- [開始使用](/zh-Hant/start/getting-started)
- [桌面版使用指南](/zh-Hant/use/desktop)
- [資料與同步](/zh-Hant/data-sync/)
