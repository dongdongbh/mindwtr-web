# Join the Beta Channels

Mindwtr publishes beta and release-candidate builds before the final stable release. Betas get new features and bug fixes earlier, and they help catch platform-specific issues before the same build reaches everyone on stable.

You can stay on a beta channel long term. Stable releases are also published to the beta channels, so beta testers do not need to switch back after a test cycle just to stay current.

If you need the lowest-risk build, use the stable installation pages instead:

- [Desktop installation](/start/desktop-installation)
- [Mobile installation](/start/mobile-installation)

## Android - Google Play Open Testing

Join the Google Play open testing track, then update through the Play Store as normal:

- [Join on Android](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)
- [Join on the web](https://play.google.com/apps/testing/tech.dongdongbh.mindwtr)

To leave the beta later, return to the same testing link and choose **Leave the test**.

## iOS, iPadOS, and macOS - TestFlight

Install TestFlight, then join the Mindwtr beta:

- [Mindwtr TestFlight beta](https://testflight.apple.com/join/7SMJCTSR)

To leave TestFlight, remove Mindwtr from TestFlight and reinstall the stable version from the App Store or Mac App Store.

## Linux - AUR Beta

Arch Linux and derivative users can install the dedicated beta package:

```bash
yay -S mindwtr-bin-beta
```

Package page:

- [mindwtr-bin-beta on AUR](https://aur.archlinux.org/packages/mindwtr-bin-beta)

To go back to stable, install `mindwtr-bin` instead.

## Linux - Flathub Beta

Add the Flathub beta remote once, then install the beta branch:

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta tech.dongdongbh.mindwtr//beta
```

Run the beta build explicitly:

```bash
flatpak run --branch=beta tech.dongdongbh.mindwtr
```

You can keep stable and beta installed side by side. To make the desktop launcher open the beta branch:

```bash
flatpak make-current tech.dongdongbh.mindwtr beta
```

To switch the launcher back to stable later:

```bash
flatpak make-current tech.dongdongbh.mindwtr stable
```

## Windows, AppImage, FOSS APK, and Other Direct Downloads

Pre-release builds are published on GitHub Releases and marked as pre-release:

- [Mindwtr Releases](https://github.com/dongdongbh/Mindwtr/releases)

Look for versions with a pre-release suffix such as `-rc` or `-beta`. Stable releases are still available from the same page.

## Reporting Beta Issues

If you hit a bug, please [open an issue](https://github.com/dongdongbh/Mindwtr/issues/new/choose) and include:

- your platform
- the version from **Settings -> About**
- what you expected to happen
- what happened instead

Beta feedback is most useful when it includes the platform and exact version, because release-candidate fixes often vary by channel.
