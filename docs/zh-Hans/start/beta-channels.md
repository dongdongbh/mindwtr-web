# 加入测试版渠道

如水会在最终稳定版之前发布测试版和候选发布版。测试版能更早获得新功能与错误修复，也有助于在同一构建推送给所有稳定版用户前发现平台特有问题。

你可以长期留在测试版渠道。稳定版也会发布到这些渠道，因此测试者无需在每轮测试后切回稳定渠道才能保持最新。

如果需要风险最低的构建，请改用稳定版安装页面：

- [桌面端安装](/zh-Hans/start/desktop-installation)
- [移动端安装](/zh-Hans/start/mobile-installation)

## Android - Google Play 公开测试

加入 Google Play 公开测试渠道，之后像平常一样通过 Play Store 更新：

- [在 Android 上加入](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)
- [在网页上加入](https://play.google.com/apps/testing/tech.dongdongbh.mindwtr)

之后如需退出测试版，请返回同一个测试链接并选择**退出测试**。

## iOS、iPadOS 与 macOS - TestFlight

安装 TestFlight，然后加入如水测试版：

- [如水 TestFlight 测试版](https://testflight.apple.com/join/7SMJCTSR)

要退出 TestFlight，请从 TestFlight 中移除如水，再从 App Store 或 Mac App Store 重新安装稳定版。

## Linux - AUR Beta

Arch Linux 及其衍生发行版用户可安装专用测试版软件包：

```bash
yay -S mindwtr-bin-beta
```

软件包页面：

- [AUR 上的 mindwtr-bin-beta](https://aur.archlinux.org/packages/mindwtr-bin-beta)

要返回稳定版，请改为安装 `mindwtr-bin`。

## Linux - Flathub Beta

添加一次 Flathub beta remote，然后安装 beta 分支：

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta tech.dongdongbh.mindwtr//beta
```

明确运行测试版构建：

```bash
flatpak run --branch=beta tech.dongdongbh.mindwtr
```

稳定版和测试版可以同时安装。要让桌面启动器打开 beta 分支：

```bash
flatpak make-current tech.dongdongbh.mindwtr beta
```

之后将启动器切回稳定版：

```bash
flatpak make-current tech.dongdongbh.mindwtr stable
```

## Linux - APT 与 RPM Beta 仓库

Debian 和 Ubuntu 用户可以添加 beta APT 仓库（签名密钥与稳定仓库共用）：

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb-beta ./" | sudo tee /etc/apt/sources.list.d/mindwtr-beta.list
sudo apt update
sudo apt install mindwtr
```

Fedora、RHEL 和 openSUSE 用户可以添加 beta DNF/YUM 仓库：

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

稳定版也会发布到 beta 仓库。候选发布版在软件包元数据中采用 `1.2.0~rc.3` 这样的版本号，APT 和 DNF 都会将其排在最终 `1.2.0` 之前，因此常规升级会自动从候选发布版更新到对应稳定版。

要退出 beta 仓库，请删除 `/etc/apt/sources.list.d/mindwtr-beta.list`（或 `/etc/yum.repos.d/mindwtr-beta.repo`），再从稳定仓库重新安装。

## Docker - Beta 标签

每个发布都会以版本标签推送到 GHCR；浮动的 `beta` 标签始终指向最新发布（候选发布版或稳定版），因此 `beta` 用户无需切换标签。`latest` 始终指向最新稳定版：

```bash
docker pull ghcr.io/dongdongbh/mindwtr-app:beta
docker pull ghcr.io/dongdongbh/mindwtr-cloud:beta
```

也可按版本固定某个预发布版本，例如 `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`。Compose 设置请参阅 [Docker 部署](/zh-Hans/power-users/docker-deployment)。

## Windows、AppImage、FOSS APK 与其他直接下载

预发布构建会在 GitHub Releases 上发布，并标记为 pre-release：

- [如水 Releases](https://github.com/dongdongbh/Mindwtr/releases)

请查找带 `-rc` 或 `-beta` 等预发布后缀的版本。稳定版仍可从同一页面下载。

## 报告测试版问题

如果遇到错误，请[提交 issue](https://github.com/dongdongbh/Mindwtr/issues/new/choose)并附上：

- 你的平台
- **设置 -> 关于**中的版本
- 你预期发生的结果
- 实际发生的结果

如果反馈包含平台和准确版本，会最有帮助，因为候选发布版修复往往因渠道而异。
