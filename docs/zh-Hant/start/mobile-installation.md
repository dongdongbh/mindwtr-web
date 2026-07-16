# 行動版安裝

Android 與 iOS 的詳細安裝說明。

若要使用候選發行版與測試版組建，請參閱[加入測試版管道](/zh-Hant/start/beta-channels)。

---

## Android

### Google Play（建議）

[![Google Play](https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)

如水已在 [Google Play](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr) 上架。

### F-Droid

[![F-Droid Version](https://img.shields.io/f-droid/v/tech.dongdongbh.mindwtr?label=F-Droid&logo=fdroid&logoColor=white&color=1976D2)](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)

從 F-Droid 安裝：

1. 安裝 F-Droid 用戶端。
2. 開啟 [F-Droid 上的如水](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)並安裝。

### IzzyOnDroid

[![IzzyOnDroid](https://img.shields.io/endpoint?url=https://apt.izzysoft.de/fdroid/api/v1/shield/tech.dongdongbh.mindwtr&label=IzzyOnDroid)](https://apt.izzysoft.de/packages/tech.dongdongbh.mindwtr)

若使用 Droid-ify、Neo Store 或 F-Droid 等與 F-Droid 相容的用戶端，可從 IzzyOnDroid 安裝：

1. 加入 IzzyOnDroid 儲存庫：`https://apt.izzysoft.de/fdroid/repo`。
2. 開啟 [IzzyOnDroid 上的如水](https://apt.izzysoft.de/fdroid/index/apk/tech.dongdongbh.mindwtr)並安裝。

### 下載 APK

1. 前往 [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. 下載最新 APK（例如 `mindwtr-<version>.apk`）
3. 在裝置上開啟 APK

### 從未知來源安裝

若系統提示，請允許從未知來源安裝：

1. 前往**設定 → 安全性**（或**設定 → 應用程式 → 特殊存取權**）
2. 允許瀏覽器或檔案管理器**安裝未知應用程式**
3. 返回 APK 並安裝

### 驗證安裝

安裝完成後：
1. 從應用程式抽屜開啟如水
2. 授予要求的權限
3. 開始收集任務！

---

## iOS

### 目前狀態

iOS 版已在 App Store 上架：

[![App Store](https://img.shields.io/badge/App_Store-iOS-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

TestFlight 測試版也可從 https://testflight.apple.com/join/7SMJCTSR 取得。退出測試版的說明與其他平台的測試管道，請參閱[加入測試版管道](/zh-Hant/start/beta-channels)。

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

### 選項

1. **App Store（建議）**：安裝穩定版
2. **TestFlight**：安裝最新 iOS 測試版組建
3. **模擬器組建**：原始碼中提供開發用組建
4. **自行建置**：使用 Xcode 自行建置及簽署應用程式（在實體裝置簽署需有 Apple Developer 帳號）

不過，在 App Store 維護 iOS 版需要一筆可觀的年費（請參閱 [Apple Developer Program](https://developer.apple.com/support/enrollment/)），目前由我自行負擔。

為了確保如水能持續存在並繼續開發，非常感謝你的支持。如果這款應用程式對你有幫助，請考慮透過 [GitHub Sponsors](https://github.com/sponsors/dongdongbh) 或 [Ko-fi](https://ko-fi.com/D1D01T20WK) 支持本專案。

### 建置 iOS 版（開發者）

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

## 資料位置

行動版以 SQLite 為主要儲存區，並另外保存 JSON 備份／同步資料；這些資料都存放在應用程式的內部儲存空間。

---

## 更新

### Android

1. 從 [Releases](https://github.com/dongdongbh/Mindwtr/releases) 下載新的 APK
2. 覆蓋安裝現有應用程式
3. 你的資料會保留

> **提示：**在應用程式中前往**設定 → 關於 → 檢查更新**，即可查看是否有新版本。

---

## 解除安裝

### Android

1. 長按如水圖示
2. 選擇**解除安裝**，或拖曳至垃圾桶

### 清除資料

解除安裝會移除所有本機資料。若要保留資料：
1. 先匯出備份（**設定 → 資料 → 匯出備份**）
2. 儲存匯出的檔案
3. 解除安裝應用程式

---

## 疑難排解

### 應用程式啟動時當機

嘗試清除應用程式資料：
1. 前往**設定 → 應用程式 → 如水**
2. 點選**儲存空間 → 清除資料**
3. 重新開啟應用程式

> **注意：**這會刪除所有本機資料。請從同步或備份還原。

### 同步無法運作

同步問題的排解方式，請參閱[資料與同步](/zh-Hant/data-sync/)。

### APK 無法安裝

- 確認有足夠的儲存空間
- 允許從未知來源安裝
- 嘗試重新下載 APK（檔案可能已損毀）

---

## 另請參閱

- [開始使用](/zh-Hant/start/getting-started)
- [行動版使用指南](/zh-Hant/use/mobile)
- [資料與同步](/zh-Hant/data-sync/)
