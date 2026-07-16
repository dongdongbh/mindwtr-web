# 桌面端安装

所有桌面平台的详细安装说明。

有关候选发布版和测试版构建，请参阅[加入测试版渠道](/zh-Hans/start/beta-channels)。

---

## Linux

### Arch Linux（AUR，预构建）

[![AUR mindwtr-bin 版本](https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr-bin)](https://aur.archlinux.org/packages/mindwtr-bin)

在基于 Arch 的发行版上，最简单的安装方式是使用预构建 AUR 软件包：

```bash
# 使用 yay
yay -S mindwtr-bin

# 使用 paru
paru -S mindwtr-bin

# 使用 pamac（Manjaro）
pamac install mindwtr-bin
```

[AUR 软件包：mindwtr-bin](https://aur.archlinux.org/packages/mindwtr-bin)

### Arch Linux（AUR，从源码构建）

[![AUR mindwtr 版本](https://img.shields.io/aur/version/mindwtr?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr)](https://aur.archlinux.org/packages/mindwtr)

如果你希望在本地构建，请使用源码构建的 AUR 软件包：

```bash
# 使用 yay
yay -S mindwtr

# 使用 paru
paru -S mindwtr
```

[AUR 软件包：mindwtr](https://aur.archlinux.org/packages/mindwtr)

### Debian / Ubuntu

[![APT 仓库](https://img.shields.io/badge/APT_repo-Install-1f6feb?logo=debian&logoColor=white)](https://dongdongbh.github.io/Mindwtr/deb)

添加 APT 仓库（推荐）：

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```

手动安装：从 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载 `.deb`，然后运行 `sudo dpkg -i mindwtr_*.deb`。

### Fedora / RHEL / openSUSE

[![RPM 仓库](https://img.shields.io/badge/RPM_repo-Install-ee0000?logo=redhat&logoColor=white)](https://dongdongbh.github.io/Mindwtr/rpm)

添加 DNF/YUM 仓库（推荐）：

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

手动安装：从 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载 `.rpm`，然后运行 `sudo rpm -i mindwtr-*.rpm`。

### Flatpak（Flathub）

[![Flathub](https://img.shields.io/badge/Flathub-Install-000000?logo=flathub&logoColor=white)](https://flathub.org/apps/tech.dongdongbh.mindwtr)

从 Flathub 安装：

```bash
flatpak install flathub tech.dongdongbh.mindwtr
```

使用以下命令运行：

```bash
flatpak run tech.dongdongbh.mindwtr
```

[Flathub 页面](https://flathub.org/apps/tech.dongdongbh.mindwtr)

### Snap Store

[![Snap Store](https://img.shields.io/badge/Snap_Store-Install-82BEA0?logo=snapcraft&logoColor=white)](https://snapcraft.io/mindwtr)

从 Snap Store 安装：

```bash
sudo snap install mindwtr
```

[Snap Store 页面](https://snapcraft.io/mindwtr)

### AppImage（通用）

适用于大多数 Linux 发行版：

```bash
# 从以下地址下载带版本号的 AppImage：
# https://github.com/dongdongbh/Mindwtr/releases/latest

# 添加可执行权限
chmod +x Mindwtr-*.AppImage

# 运行
./Mindwtr-*.AppImage
```

> **提示：**使用 [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) 可获得更好的桌面集成体验。

### 其他发行版

对于其他发行版，请使用 AppImage 或从源码构建（参阅[开发者指南](/zh-Hans/developers/developer-guide)）。

欢迎社区维护软件包（例如适用于 NixOS 的 nixpkgs）。桌面构建自带 TLS 依赖，因此打包时无需匹配系统 OpenSSL。如果你维护此类软件包，请发起讨论，以便在此处添加链接。

---

## Windows

### Microsoft Store（推荐）

[![Microsoft Store](https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white)](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare)

从 [Microsoft Store](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare) 安装。

### Winget

[![Winget 版本](https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF)](https://winstall.app/apps/dongdongbh.Mindwtr)

Windows 10 和 11 已内置 Winget。使用以下命令安装如水：

```powershell
winget install dongdongbh.Mindwtr
```

### Chocolatey

[![Chocolatey 版本](https://img.shields.io/chocolatey/v/mindwtr?label=Chocolatey&logo=chocolatey&logoColor=white&color=80B5E3)](https://community.chocolatey.org/packages/mindwtr)

如果你使用 Chocolatey：

```powershell
choco install mindwtr
```

[Chocolatey 软件包](https://community.chocolatey.org/packages/mindwtr)

### Scoop

[![Scoop 版本](https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6)](https://github.com/dongdongbh/homebrew-mindwtr)

如果你使用 Scoop：

```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

### 安装程序（.msi 或 .exe）

1. 从 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载安装程序
2. 运行安装程序
3. 按照安装向导操作
4. 从“开始”菜单启动如水

### 便携版

1. 从 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载 `mindwtr_<version>_windows_x64_portable.zip`。
2. 将其解压到任意可写文件夹。
3. 将 `portable.txt` 与 `mindwtr.exe` 放在同一目录中。

便携模式将本地状态存储在可执行文件旁：

- `profile/data/`：存储 SQLite 数据库、同步 JSON、附件、日志、快照、音频录制和语音模型
- `profile/config/`：存储 `config.toml` 和 `secrets.toml`
- `profile/webview/`：存储 WebView2 浏览器配置文件（缓存、本地存储）

仍然需要 Windows WebView2。低于 v1.1.0 的便携版存储在 `AppData\Roaming\mindwtr` 下的附件文件会在首次启动时移入便携配置文件；如果同一台计算机上还安装了安装版如水，则会改为复制这些文件，以便两个版本都能继续工作。

---

## macOS

### Mac App Store（推荐）

[![Mac App Store](https://img.shields.io/badge/Mac_App_Store-Install-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

从 Mac App Store 安装：

[Mac App Store 上的如水](https://apps.apple.com/app/mindwtr/id6758597144)

如果你希望由商店管理更新并使用经过签名的 App Store 构建，请选择此方式。

### TestFlight 测试版

[![TestFlight 测试版](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

通过 TestFlight 加入 macOS 测试版：

[如水 TestFlight 测试版](https://testflight.apple.com/join/7SMJCTSR)

更多测试版渠道以及退出测试版的说明，请参阅[加入测试版渠道](/zh-Hans/start/beta-channels)。

### Homebrew

[![Homebrew Cask 版本](https://img.shields.io/homebrew/cask/v/mindwtr?label=Homebrew&logo=homebrew&logoColor=white)](https://formulae.brew.sh/cask/mindwtr)

使用 [Homebrew](https://brew.sh/) 安装：

```bash
brew install --cask mindwtr
```

### 磁盘映像（.dmg）

1. 从 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载 `.dmg`
2. 打开磁盘映像
3. 将如水拖到 Applications 文件夹
4. 从 Applications 或 Spotlight 启动

---

## 数据位置

安装后，你的数据存储在：

| 平台        | SQLite 数据库                                     | 同步 JSON                                    |
| ----------- | --------------------------------------------- | -------------------------------------------- |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`            | `~/.local/share/mindwtr/data.json`           |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                 | `%APPDATA%/mindwtr/data.json`                |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Flatpak 安装使用 `~/.var/app/tech.dongdongbh.mindwtr/` 下的沙盒 XDG 路径。你随时可以在**设置 → 同步 → 本地数据**中查看当前使用的确切路径。

配置单独存储：

| 平台        | 位置                                           |
| ----------- | ---------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`                |
| **Windows** | `%APPDATA%/mindwtr/config.toml`                |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

---

## 更新

更新检查会识别安装渠道：如水会检测其安装方式，与该渠道发布的版本进行比较，并将你引导至该渠道的更新方式。

- **Microsoft Store、Winget、Chocolatey、Homebrew、AUR**：只有当你的渠道已有新版本时才会显示更新提醒；请像往常一样使用包管理器更新（例如 `winget upgrade dongdongbh.Mindwtr`、`choco upgrade mindwtr`、`brew upgrade --cask mindwtr`）。
- **Scoop**：如水完全不会自动检查更新，因为任何 bucket 都可以提供清单，且更新由 Scoop 管理（`scoop update mindwtr`）。“设置 → 关于”中的手动检查仍然有效。
- **Flatpak、Snap 和应用商店的自动更新**：更新会自动送达，因此如水不会显示提醒。
- **直接下载、便携版、AppImage、.deb/.rpm**：在“设置 → 关于 → 检查更新”中检查，然后从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载新版本，并覆盖现有安装进行安装。

更新不会影响你的数据。

---

## 卸载

### Linux（包管理器）
```bash
# AUR
yay -R mindwtr-bin

# Debian/Ubuntu
sudo dpkg -r mindwtr

# Flatpak
flatpak uninstall tech.dongdongbh.mindwtr
```

### Windows
使用 Windows 设置中的“添加或删除程序”。

### macOS
将如水从 Applications 拖到废纸篓。

### 清理数据
要删除所有数据，请同时删除配置目录和数据目录：
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

## 故障排除

### 应用无法启动（Linux）

确保已安装 WebKitGTK：
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### 图标缺失

安装完整的图标主题：
```bash
sudo pacman -S papirus-icon-theme
```

### 窗口空白

尝试在禁用 GPU 的情况下运行：
```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 mindwtr
```

---

## 另请参阅

- [开始使用](/zh-Hans/start/getting-started)
- [桌面端用户指南](/zh-Hans/use/desktop)
- [数据与同步](/zh-Hans/data-sync/)
