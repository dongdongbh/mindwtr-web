# 发布流程

本页从实践层面记录 Mindwtr 的常规发布流程，供在仓库中工作的维护者使用。

---

## 源文件

发布自动化与版本元数据主要集中在：

- `scripts/bump-version.sh`
- `scripts/update-versions.js`
- `docs/release-notes/`
- `docs/release-notes/google-play/`
- `metadata/`
- `metadata/metadata.json`
- `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
- `https://github.com/dongdongbh/mindwtr-web/tree/main/docs`，用于公共文档更改
- `wiki/` 已停用——其中仅保留一个指向文档站点的着陆页；切勿添加内容页面
- `.github/workflows/`
- `.github/workflows/release-rc.yml`，用于候选发布版本自动化

---

## 双周发布的 RC 列车

常规双周次版本发布采用候选发布版本列车。这不是通用的 Beta 计划。除非测试人员发现阻断问题，否则 RC 就是计划转为稳定版的构建。

使用 SemVer 预发布版本名称：

- 首个候选版本：`v1.1.0-rc.1`
- 后续阻断问题修复：`v1.1.0-rc.2`
- 最终稳定版本：`v1.1.0`

不要替换已经交付测试人员的 RC 工件。应通过下一个 RC 编号修复这种情况。如果某次运行在 GitHub 发布预发布版本之前失败，请取消运行、修复 `main`、删除并在修正后的提交上重新创建同一个 RC 标签，然后再次推送标签。

为 RC 运行 `./scripts/bump-version.sh vX.Y.Z-rc.N`。该脚本会让应用和软件包版本文件保持稳定基础版本（`X.Y.Z`），同时将完整 RC 版本写入 `apps/mobile/release-version.json`，供无环境变量的 FOSS 构建使用。RC 工作流会在平台构建开始前检查这两个值。

### 何时使用 RC 列车

以下情况应使用完整的 RC 列车：

- 计划中的双周次版本发布
- 包含跨平台更改的发布
- 涉及同步、存储、采集、打包、授权、更新程序元数据或商店元数据的发布
- 多个分发工件发生变化的发布

维护者可以为微不足道的补丁版本跳过 RC 列车，例如范围明确的单行修复、仅文档修正，或不影响已安装应用行为的仅元数据更新。跳过列车应在发布说明或发布检查清单中明确记录。

### RC 渠道矩阵

RC 构建只发布到能够支持测试人员且不会产生高额维护开销的渠道。

| 平台 | RC 渠道 | 稳定版行为 |
| --- | --- | --- |
| 所有直接下载 | GitHub 预发布版本 | 最终 GitHub 发布版本成为稳定版下载源。 |
| iOS | TestFlight | App Store 仍为稳定版渠道。 |
| macOS App Store 构建 | TestFlight | Mac App Store 仍为稳定版渠道。 |
| Android Play 构建 | 默认使用 Google Play 内部测试和开放测试（`beta`）；配置后可使用封闭/自定义轨道 | 稍后再向生产轨道上传稳定版，稳定版工作流也会刷新内部测试轨道。 |
| Linux Flatpak | Flathub beta 分支 | 稳定版会同时发布到 stable 和 beta 分支，使 beta 用户不会滞留在旧版本。 |
| Arch Linux | AUR `mindwtr-bin-beta` | 稳定版发布会刷新这个长期存在的 beta 软件包。 |
| Debian/Fedora Linux | Beta APT/RPM 仓库 | 稳定版软件包仍位于单独的稳定版仓库目录中。 |
| Windows 直接下载 | GitHub 预发布版本安装程序/便携版 | 除非日后实现软件包外部测试版的自动发布，否则 Microsoft Store 仍仅提供稳定版。 |

除非需求明确且自动化已经就绪，否则以下渠道应保持仅提供稳定版：

- F-Droid
- IzzyOnDroid
- Microsoft Store 软件包外部测试版
- winget
- Homebrew stable cask
- Chocolatey
- Scoop stable bucket
- 稳定版 APT/RPM 仓库

未来仍可考虑添加 Microsoft Store 软件包外部测试版。

### 当前 RC 自动化

RC 工作流为 `.github/workflows/release-rc.yml`。

推送新的 `vX.Y.Z-rc.N` 标签会启动工作流，并在平台构建开始前验证标签、稳定基础版本、已提交的 FOSS 发布版本以及标签提交。如果运行失败且尚未发布 GitHub 预发布版本，可删除标签并在修正后的提交上重新创建同一个标签来恢复。如果该标签已有 GitHub 发布版本，工作流只进行验证；发布更改应使用下一个 RC 编号。仅将 `workflow_dispatch` 用于受控的渠道重试或选择非默认渠道。

该工作流会在适用时复用稳定版渠道构建作业，然后使用完全相同的 Linux、macOS、Windows、Android 和 Android FOSS 工件创建 GitHub 预发布版本。

它还会将测试构建发布到已经接入的商店支持渠道：

- 默认将 Android AAB 发布到 Google Play `internal` 和开放测试（`beta`）；手动运行时可选择以逗号分隔的 Play 测试轨道或 `none`。
- 将 iOS App Store 构建发布到 TestFlight，并禁用 App Store 审核提交。
- 将 macOS App Store 构建发布到 TestFlight，并禁用 App Store 审核提交。
- 通过共享 Flathub 工作流创建 Flathub beta 分支更新 PR；如果渠道设置尚未就绪，手动运行时可将其禁用。
- GitHub 预发布版本工件存在后更新 AUR `mindwtr-bin-beta`；如果软件包渠道尚未就绪，手动运行时可将其禁用。
- GitHub 预发布版本存在后更新 Beta APT/RPM 仓库；手动运行时可将其禁用。

稳定版 `release.yml` 仍是稳定版发布工作流。它设有保护措施，确保预发布标签不会发布到仅限稳定版的渠道，例如 Google Play 生产轨道、Microsoft Store、Snap stable、Linux APT/RPM 仓库、Flathub stable、AUR stable、Scoop、winget、Homebrew 或 Chocolatey。

Flathub beta 需要 `flathub/tech.dongdongbh.mindwtr` 中的 beta 分支和权限。AUR beta 需要 `mindwtr-bin-beta` 软件包以及 `AUR_SSH_PRIVATE_KEY`、`AUR_USERNAME` 和 `AUR_EMAIL` 密钥。如果任一渠道尚未就绪，应禁用相应的 RC 工作流输入，而不要将整个 RC 视为失败。

由于上传到 Play 测试轨道会消耗一个 Android `versionCode`，每个上传到 Play 的 RC 都需要新的 `versionCode`。RC 工作流会在 Android 构建开始前一次性解析该代码，然后 Play 构建和 Android FOSS 构建使用同一项预检输出并并行运行。工作流上传一个 AAB，并为每个已配置的测试轨道分配相同的 versionCode。当前最终稳定版流程也应使用具有更高 `versionCode` 的全新生产上传，或者未来的稳定版晋级工作流应晋级已经测试的 Play 构建。除非稳定版工作流已能够晋级现有构建，否则不要使用已上传到 Play 的 Android `versionCode` 为最终稳定版本添加标签。


### 时间线

审核延迟较高的渠道需要提前启动。采用以下默认计划：

| 日期 | 操作 |
| --- | --- |
| T-7 至 T-5 | 功能冻结。只允许错误修复、发布说明、元数据和发布阻断问题。 |
| T-5 | 创建发布分支，运行 `./scripts/bump-version.sh vX.Y.Z-rc.1`，生成 RC 专属发布说明（例如 `docs/release-notes/X.Y.Z-rc.1.md`），并添加 `vX.Y.Z-rc.1` 标签，让 `release-rc.yml` 上传已启用的测试渠道。 |
| T-4 | 随着经过审核的构建变得可用，运行渠道工件冒烟检查。只修复阻断问题。 |
| T-3 | 确认 `release-rc.yml` 生成的 GitHub 预发布版本；如果启用了相应工作流输入，验证 Flathub beta PR 和 `mindwtr-bin-beta` 更新；然后向测试人员公告 RC。 |
| T-2 至 T-1 | 分类处理反馈。仅为阻断问题发布 `rc.2`。非阻断问题移至下一个周期。 |
| 发布日 | 添加 `vX.Y.Z` 标签，在所有渠道发布稳定版，并将所有长期存在的测试渠道更新到稳定版本。 |
| T+1 至 T+2 | 关注崩溃、GitHub 议题、Discord、商店反馈和下游软件包报告。如有需要，使用下一个补丁标签进行修补，例如在 `v1.1.0` 后发布 `v1.1.1`。 |

### rc.2 的阻断标准

只有出现以下任一阻断问题时才发布另一个 RC：

- 启动崩溃
- 数据丢失或数据损坏
- 同步损坏或可重复出现的同步失败
- 安装、更新、签名、授权或打包失败
- 采集、任务创建、任务编辑或任务完成失效
- 从上一个稳定版本迁移失败
- 受支持渠道上出现严重的平台特定回归

其他所有问题都等到下一个计划发布或后续补丁处理。这样可以避免双周列车变成没有尽头的 Beta 循环。

### 必需的 RC 冒烟关卡

每个分发渠道都是不同的运行环境。在 CI 或本地测试允许的范围内，只有从各 RC 渠道获得的工件都在忠实还原该渠道的环境中完成冒烟启动，RC 才算就绪。

最低限度的冒烟检查：

- 启动用户实际收到的工件
- 创建、编辑、完成和删除任务
- 验证采集或快速添加能够打开并保存
- 验证应用能够读取上一个稳定版本的现有数据
- 验证同步设置可以打开且不会崩溃
- 在适用情况下验证更新程序、商店或沙盒特有的启动行为
- 验证日志中没有致命启动错误

对于过去曾出现故障的渠道，应保留渠道特定关卡：

- FOSS APK 与 Play APK/AAB 使用不同的依赖集
- Flatpak 必须在 Flatpak 运行时内启动
- AUR 软件包必须先在干净的 Arch 容器中成功构建，再进行发布
- MSIX/Microsoft Store 软件包不能因托盘、快捷方式或受沙盒限制的功能而直接失败
- App Store 和 TestFlight 构建必须保留所需授权

### 测试人员公告

RC 公告应简短且便于行动：

- 版本和渠道链接
- 最重要的用户可见更改
- 已知风险或需要测试的方面
- 明确的反馈途径：GitHub 议题、Discord 频道或电子邮件
- 提醒这是候选发布版本，而不是功能预览版

---

## 稳定版发布流程

1. 确保 `main` 处于预期发布状态，并先提交所有发布前工作。
   - 如果上一个版本已经发布，请将后续修复写入 `docs/release-notes/unreleased.md`，并从 `CHANGELOG.md` 链接到该文件，直到下一个补丁版本准备就绪，例如在 `v0.9.0` 后准备 `v0.9.1`。
2. 使用以下命令提升版本：

```bash
./scripts/bump-version.sh 0.x.y
```

这会更新工作区软件包版本，并提升 Android `versionCode`。

如果 Google Play 中已有来自 RC 或测试人员上传的更高 `versionCode`，请在添加标签前将该最大值传给版本提升脚本：

```bash
ANDROID_REMOTE_MAX_VERSION_CODE=85 ./scripts/bump-version.sh 0.x.y
```

该脚本会在受版本控制的 `apps/mobile/app.json` 中写入一个高于 Play 最大值的值，使发布标签、GitHub APK 和下游可复现构建配方都能看到相同的 Android 元数据。稳定版发布 CI 仍会拒绝仅存在于 CI 中的 `versionCode` 覆盖；应在添加标签前修正源元数据，而不是依赖未受版本控制的工作流变更。

3. 添加标签前运行发布硬性关卡：
   - 类型/测试关卡：
     - `bun run test`
     - `bun run typecheck`
     - `bun run native:test`
   - FOSS/静态关卡：
     - 检查 `git diff vPREV..HEAD -- apps/mobile/package.json`
     - 检查 F-Droid/FOSS 配置文件（`apps/mobile/plugins/android-manifest-fixes.js`、`apps/mobile/scripts/`、`.github/workflows/release-android-foss.yml`、`config/izzyonandroid.yml`）
     - 运行 `python3 scripts/ci/repair-package-lock.py --check apps/desktop/package-lock.json`
   - CloudKit 架构关卡：
     - 对照上一个标签检查已同步的架构文件
     - 如果添加了由 CloudKit 支持的新字段或记录类型，请在发布前更新/部署生产架构
4. 准备或更新发布说明和元数据：
   - `docs/release-notes/<version>.md`
   - `docs/release-notes/google-play/<version>.txt`
   - `metadata/*/release_notes.txt`
   - `metadata/*/changelogs/<androidVersionCode>.txt`
   - `metadata/metadata.json`
   - `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
5. 当发布/文档流程细节发生变化时，更新[Mindwtr Web 公共文档源](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)中的公共文档。GitHub Wiki 已停用；不要添加或更新 `wiki/` 内容页面，也不要在单独的 `.wiki` 检出中运行 git。
6. 仔细审查最终产生的版本和元数据更改。
7. 提交发布准备工作：

```bash
git add -A
git commit -m "chore(release): v0.x.y"
```

8. 为发布添加标签：

```bash
git tag v0.x.y
```

9. 推送 `main` 和标签：

```bash
git push origin main --tags
```

10. 让 GitHub Actions 发布平台工件以及所有下游打包作业。

---

## 添加标签前

至少应验证：

- 发布说明存在且与实际更改一致
- 整个 monorepo 中的软件包版本保持一致
- 对于 RC 标签，`apps/mobile/release-version.json` 包含完整的 RC 版本
- Android `versionCode` 已递增
- 桌面端软件包锁定文件通过 `repair-package-lock.py --check`
- FOSS 配置仍会移除被禁止的权限，并且只保留有意使用的权限
- CloudKit 支持的架构没有发生变化，或已先更新生产架构
- 商店/发布元数据更改是有意的，并且按平台限制在适当范围内
- 控制台中的移动应用商店类别仍然正确：Google Play 为 `Productivity > Task Management`，App Store 主类别为 `Productivity`
- Google Play 各语言区域的正文不超过 500 字符的 API 限制

对于较大的发布，还应验证：

- 桌面端更新程序元数据
- 移动应用商店元数据/Fastlane 输入
- 面向用户的功能在[Mindwtr Web 公共文档源](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)中的文档站点更改
- 使用小型种子数据集进行跨后端同步冒烟测试：添加、更新、删除和附件传输应在云同步、WebDAV/文件同步以及发布测试人员可用的任何平台原生后端之间收敛；第二次同步应报告没有新的冲突

---

## 发布说明

带版本号的发布说明位于 `docs/release-notes/`。

准则：

- 顶部摘要应面向用户
- 重要的修复/功能应排在前面
- 有帮助时列出重要提交
- 对于 RC，使用 `docs/release-notes/X.Y.Z-rc.N.md` 或 `docs/release-notes/vX.Y.Z-rc.N.md`，并在第一个标题中包含完整 RC 版本；`docs/release-notes/X.Y.Z.md` 仅供最终稳定版使用
- 需要时保持 `docs/release-notes/google-play/` 中的 Google Play 简短说明一致
- 更新 `metadata/*/release_notes.txt` 中的 App Store 发布说明
- 在 `metadata/*/changelogs/<versionCode>.txt` 下添加新的 Android 变更日志文件
- 保持 `metadata/metadata.json` 中的 Microsoft Store 发布说明与同一发布一致
- 在 `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml` 中添加或刷新最上方的 AppStream 条目

---

## 发布后检查

推送标签后：

- 验证 GitHub 发布版本已创建
- 验证预期的桌面端/移动端工件已附加
- 在适用时验证商店特定工作流已成功
- 根据新版本抽查更新程序/下载界面
- 验证稳定版也已发布到长期存在的测试渠道，确保测试人员继续使用最新构建

---

## 回滚思路

如果发现有问题的发布：

- 在弄清故障模式之前，停止添加后续标签
- 优先发布快速向前修复版本，而不是重写已发布的历史
- 在发布说明中明确说明修正补丁

---

## 相关内容

- [开发者指南](/zh-Hans/developers/developer-guide)
- [Docker 部署](/zh-Hans/power-users/docker-deployment)
- [云部署](/zh-Hans/data-sync/cloud-deployment)
- [仓库发布说明](https://github.com/dongdongbh/Mindwtr/tree/main/docs/release-notes)
- [语义化版本](https://semver.org/)
- [GitHub 预发布版本](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Google Play 测试轨道](https://support.google.com/googleplay/android-developer/answer/9845334)
- [Apple TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Flathub beta 仓库](https://docs.flathub.org/docs/for-app-authors/maintenance)
- [Microsoft Store 软件包外部测试版](https://learn.microsoft.com/en-us/windows/apps/publish/package-flights)
