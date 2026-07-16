# 移动端安装

Android 与 iOS 的详细安装说明。

候选发布版和测试版构建请参阅[加入测试版渠道](/zh-Hans/start/beta-channels)。

---

## Android

### Google Play（推荐）

[![Google Play](https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)

Mindwtr 已在 [Google Play](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr) 上架。

### F-Droid

[![F-Droid Version](https://img.shields.io/f-droid/v/tech.dongdongbh.mindwtr?label=F-Droid&logo=fdroid&logoColor=white&color=1976D2)](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)

从 F-Droid 安装：

1. 安装 F-Droid 客户端。
2. 打开 [F-Droid 上的 Mindwtr](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)并安装。

### IzzyOnDroid

[![IzzyOnDroid](https://img.shields.io/endpoint?url=https://apt.izzysoft.de/fdroid/api/v1/shield/tech.dongdongbh.mindwtr&label=IzzyOnDroid)](https://apt.izzysoft.de/packages/tech.dongdongbh.mindwtr)

如果使用 Droid-ify、Neo Store 或 F-Droid 等兼容 F-Droid 的客户端，可从 IzzyOnDroid 安装：

1. 添加 IzzyOnDroid 仓库：`https://apt.izzysoft.de/fdroid/repo`。
2. 打开 [IzzyOnDroid 上的 Mindwtr](https://apt.izzysoft.de/fdroid/index/apk/tech.dongdongbh.mindwtr)并安装。

### 下载 APK

1. 前往 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. 下载最新 APK（例如 `mindwtr-<version>.apk`）
3. 在设备上打开 APK

### 允许安装未知来源应用

如果系统提示，请允许安装未知来源应用：

1. 前往**设置 → 安全**（或**设置 → 应用 → 特殊访问权限**）
2. 允许浏览器或文件管理器**安装未知应用**
3. 返回 APK 并安装

### 验证安装

安装后：

1. 从应用抽屉打开 Mindwtr
2. 授予所请求的权限
3. 开始记录任务！

---

## iOS

### 当前状态

iOS 版现已在 App Store 上架：

[![App Store](https://img.shields.io/badge/App_Store-iOS-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

TestFlight 测试版也可通过 https://testflight.apple.com/join/7SMJCTSR 获取。退出测试版的说明和其他平台的测试版渠道请参阅[加入测试版渠道](/zh-Hans/start/beta-channels)。

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

### 选项

1. **App Store（推荐）：**安装稳定版
2. **TestFlight：**安装最新 iOS 测试版构建
3. **模拟器构建：**源代码中提供，用于开发
4. **自行构建：**使用 Xcode 自行构建并签名（设备签名需要 Apple Developer 账户）

不过，在 App Store 上维护 iOS 版本需要每年支付一笔不小的费用（参阅 [Apple Developer Program](https://developer.apple.com/support/enrollment/)），目前由开发者个人承担。

为了确保 Mindwtr 能够持续存在和发展，非常感谢你的支持。如果这款应用对你有价值，请考虑通过 [GitHub Sponsors](https://github.com/sponsors/dongdongbh) 或 [Ko-fi](https://ko-fi.com/D1D01T20WK) 支持项目。

### 为 iOS 构建（开发者）

```bash
# Clone repo
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run on iOS Simulator
bun mobile:ios

# Or open in Xcode for device builds
cd apps/mobile
npx expo prebuild --platform ios
open ios/*.xcworkspace
```

---

## 数据位置

移动端数据保存在应用内部存储中，以 SQLite 为主要存储，并包含用于备份/同步的 JSON 数据。

---

## 更新

### Android

1. 从 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下载新 APK
2. 覆盖现有应用安装
3. 你的数据会予以保留

> **提示：**在应用中前往**设置 → 关于 → 检查更新**，可查看是否有新版本。

---

## 卸载

### Android

1. 长按 Mindwtr 图标
2. 选择**卸载**或拖到垃圾桶

### 清理数据

卸载会移除所有本地数据。如果想保留数据：

1. 先导出备份（**设置 → 数据 → 导出备份**）
2. 保存导出的文件
3. 卸载应用

---

## 故障排除

### 应用启动时崩溃

尝试清除应用数据：

1. 前往**设置 → 应用 → Mindwtr**
2. 点按**存储 → 清除数据**
3. 重新打开应用

> **注意：**这会删除所有本地数据。请从同步或备份恢复。

### 同步无法工作

同步故障排除请参阅[数据与同步](/zh-Hans/data-sync/)。

### APK 无法安装

- 确保有足够的存储空间
- 允许安装未知来源应用
- 尝试重新下载 APK（原文件可能已损坏）

---

## 另请参阅

- [开始使用](/zh-Hans/start/getting-started)
- [移动端用户指南](/zh-Hans/use/mobile)
- [数据与同步](/zh-Hans/data-sync/)
