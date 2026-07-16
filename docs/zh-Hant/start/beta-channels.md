# 加入測試版管道

Mindwtr 會在正式穩定版發行前，先發布 beta 與候選發行版組建。測試版能更早取得新功能與錯誤修正，也有助於在同一組建提供給所有穩定版使用者前，找出特定平台的問題。

你可以長期留在測試版管道。穩定版也會發布至測試版管道，因此測試人員不必在測試週期結束後切回穩定版，也能持續使用最新版本。

如果需要風險最低的組建，請改用穩定版安裝頁面：

- [桌面版安裝](/zh-Hant/start/desktop-installation)
- [行動版安裝](/zh-Hant/start/mobile-installation)

## Android - Google Play 公開測試

加入 Google Play 公開測試群組，之後照常透過 Play 商店更新：

- [在 Android 上加入](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)
- [透過網頁加入](https://play.google.com/apps/testing/tech.dongdongbh.mindwtr)

日後若要退出測試版，請返回同一個測試連結並選擇**退出測試**。

## iOS、iPadOS 與 macOS - TestFlight

安裝 TestFlight，然後加入 Mindwtr 測試版：

- [Mindwtr TestFlight 測試版](https://testflight.apple.com/join/7SMJCTSR)

若要退出 TestFlight，請從 TestFlight 移除 Mindwtr，再從 App Store 或 Mac App Store 重新安裝穩定版。

## Linux - AUR 測試版

Arch Linux 及其衍生版本的使用者可安裝專用的測試版套件：

```bash
yay -S mindwtr-bin-beta
```

套件頁面：

- [AUR 上的 mindwtr-bin-beta](https://aur.archlinux.org/packages/mindwtr-bin-beta)

若要回到穩定版，請改為安裝 `mindwtr-bin`。

## Linux - Flathub 測試版

加入一次 Flathub beta remote，再安裝 beta 分支：

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta tech.dongdongbh.mindwtr//beta
```

明確啟動測試版組建：

```bash
flatpak run --branch=beta tech.dongdongbh.mindwtr
```

穩定版與測試版可以並存。若要讓桌面啟動器開啟 beta 分支：

```bash
flatpak make-current tech.dongdongbh.mindwtr beta
```

日後若要讓啟動器切回穩定版：

```bash
flatpak make-current tech.dongdongbh.mindwtr stable
```

## Linux - APT 與 RPM 測試版儲存庫

Debian 與 Ubuntu 使用者可加入 beta APT 儲存庫（簽署金鑰與穩定版儲存庫共用）：

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb-beta ./" | sudo tee /etc/apt/sources.list.d/mindwtr-beta.list
sudo apt update
sudo apt install mindwtr
```

Fedora、RHEL 與 openSUSE 使用者可加入 beta DNF/YUM 儲存庫：

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

穩定版也會發布至測試版儲存庫。候選發行版在套件中採用 `1.2.0~rc.3` 這類版本號；APT 與 DNF 都會將它排在最終版 `1.2.0` 之前，因此一般升級會自動從候選發行版更新至對應的穩定組建。

若要退出測試版儲存庫，請移除 `/etc/apt/sources.list.d/mindwtr-beta.list`（或 `/etc/yum.repos.d/mindwtr-beta.repo`），再從穩定版儲存庫重新安裝。

## Docker - Beta 標籤

每個發行版都會以自身版本標籤發布至 GHCR；浮動的 `beta` 標籤永遠指向最新發行版（候選發行版或穩定版），因此 `beta` 使用者不必切換標籤。`latest` 則會停留在最新穩定版：

```bash
docker pull ghcr.io/dongdongbh/mindwtr-app:beta
docker pull ghcr.io/dongdongbh/mindwtr-cloud:beta
```

也可用版本號鎖定特定預發行版本，例如 `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`。Compose 設定請參閱 [Docker 部署](/zh-Hant/power-users/docker-deployment)。

## Windows、AppImage、FOSS APK 與其他直接下載

預發行組建會發布至 GitHub Releases，並標示為 pre-release：

- [Mindwtr Releases](https://github.com/dongdongbh/Mindwtr/releases)

請尋找帶有 `-rc` 或 `-beta` 等預發行後綴的版本。穩定版仍可在同一頁面取得。

## 回報測試版問題

如果遇到錯誤，請[提出 issue](https://github.com/dongdongbh/Mindwtr/issues/new/choose)，並附上：

- 你的平台
- **設定 -> 關於**中顯示的版本
- 你原本預期會發生什麼
- 實際發生了什麼

若測試意見包含平台與確切版本，最能發揮作用，因為候選發行版的修正經常會因發行管道而異。
