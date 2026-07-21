# 發布流程

本頁從實務層面記錄 Mindwtr 的一般發布流程，供從儲存庫進行作業的維護者使用。

---

## 來源檔案

發布自動化與版本中繼資料主要位於：

- `scripts/bump-version.sh`
- `scripts/update-versions.js`
- `docs/release-notes/`
- `docs/release-notes/google-play/`
- `metadata/`
- `metadata/metadata.json`
- `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
- `https://github.com/dongdongbh/mindwtr-web/tree/main/docs`，用於公開文件變更
- `wiki/` 已停用——其中只保留一個指向文件網站的登陸頁；絕不要新增內容頁面
- `.github/workflows/`
- `.github/workflows/release-rc.yml`，用於候選版本自動化

---

## 雙週發布的 RC 列車

一般雙週次要版本應採用候選版本列車。這不是一般性的 Beta 測試計畫。除非測試人員發現阻擋問題，否則 RC 就是預定成為穩定版的建置。

使用 SemVer 預發布版本名稱：

- 第一個候選版本：`v1.1.0-rc.1`
- 後續阻擋問題修正：`v1.1.0-rc.2`
- 最終穩定版本：`v1.1.0`

不要取代已交付測試人員的 RC 成品。此情況應使用下一個 RC 編號向前修正。如果某次執行在 GitHub 發布預發布版本前失敗，請取消執行、修正 `main`、刪除同一個 RC 標籤並在修正後的提交上重新建立，然後再次推送該標籤。

針對 RC 執行 `./scripts/bump-version.sh vX.Y.Z-rc.N`。該指令碼會讓應用程式與套件版本檔案維持在穩定基礎版本（`X.Y.Z`），同時將完整 RC 版本寫入 `apps/mobile/release-version.json`，供不依賴環境變數的 FOSS 建置使用。RC 工作流程會在平台建置開始前檢查這兩個值。

### 何時使用 RC 列車

下列情況應使用完整 RC 列車：

- 排定的雙週次要版本
- 包含跨平台變更的版本
- 涉及同步、儲存、擷取、封裝、權利、更新程式中繼資料或商店中繼資料的版本
- 多個發行成品有所變更的版本

維護者可針對微小的修補版本略過 RC 列車，例如範圍明確的單行修正、純文件修正，或不影響已安裝應用程式行為的純中繼資料更新。略過列車時，應在版本資訊或發布檢查清單中明確說明。

### RC 管道矩陣

RC 建置只發布至能支援測試人員且不會帶來高額維護成本的管道。

| 平台 | RC 管道 | 穩定版行為 |
| --- | --- | --- |
| 所有直接下載 | GitHub 預發布版本 | 最終 GitHub 版本會成為穩定版下載來源。 |
| iOS | TestFlight | App Store 仍為穩定版管道。 |
| macOS App Store 建置 | TestFlight | Mac App Store 仍為穩定版管道。 |
| Android Play 建置 | 預設使用 Google Play 內部測試與公開測試（`beta`）；設定後可使用封閉／自訂測試群組 | 正式環境稍後會收到穩定版上傳，內部測試群組則由穩定版工作流程重新整理。 |
| Linux Flatpak | Flathub beta 分支 | 穩定版會同時發布至 stable 與 beta 分支，避免 Beta 使用者停留在舊版本。 |
| Arch Linux | AUR `mindwtr-bin-beta` | 穩定版發布會重新整理持續性的 Beta 套件。 |
| Debian/Fedora Linux | Beta APT/RPM 儲存庫 | 穩定版套件會保留在個別的穩定版儲存庫目錄中。 |
| Windows 直接下載 | GitHub 預發布安裝程式／可攜版 | 除非日後針對套件發行小眾測試版導入自動化，否則 Microsoft Store 只提供穩定版。 |

除非有明確需求且自動化已就緒，否則下列管道只應保留穩定版：

- F-Droid
- IzzyOnDroid
- Microsoft Store 套件發行小眾測試版
- winget
- Homebrew 穩定版 cask
- Chocolatey
- Scoop 穩定版 bucket
- 穩定版 APT/RPM 儲存庫

未來仍可能新增 Microsoft Store 套件發行小眾測試版。

### 目前的 RC 自動化

RC 工作流程為 `.github/workflows/release-rc.yml`。

推送新的 `vX.Y.Z-rc.N` 標籤會啟動工作流程，並在平台建置開始前驗證標籤、穩定基礎版本、已提交的 FOSS 發布版本與標籤提交。若執行失敗且尚未發布 GitHub 預發布版本，請在修正後的提交上刪除並重新建立同一個標籤以進行復原。如果該標籤已有 GitHub 版本，工作流程只會進行驗證；請使用下一個 RC 編號發布變更。`workflow_dispatch` 只能用於受控的管道重試或非預設管道選擇。

工作流程會在可行情況下重用穩定版管道建置工作，然後從完全相同的 Linux、macOS、Windows、Android 與 Android FOSS 成品建立 GitHub 預發布版本。

它也會將測試人員建置發布至已接通的商店支援管道：

- 預設將 Android AAB 發布至 Google Play `internal` 與公開測試（`beta`）；手動執行可選擇以逗號分隔的 Play 測試群組或 `none`。
- 將 iOS App Store 建置發布至 TestFlight，且停用 App Store 審查提交。
- 將 macOS App Store 建置發布至 TestFlight，且停用 App Store 審查提交。
- 透過共用 Flathub 工作流程建立 Flathub beta 分支更新 PR；若管道尚未設定完成，手動執行可停用此項。
- GitHub 預發布成品存在後更新 AUR `mindwtr-bin-beta`；若套件管道尚未就緒，手動執行可停用此項。
- GitHub 預發布版本存在後更新 Beta APT/RPM 儲存庫；手動執行可停用此項。

穩定版 `release.yml` 仍是穩定版發布工作流程。其防護會阻止預發布標籤發布至僅限穩定版的管道，例如 Google Play 正式環境、Microsoft Store、Snap stable、Linux APT/RPM 儲存庫、Flathub stable、AUR stable、Scoop、winget、Homebrew 或 Chocolatey。

Flathub beta 需要 `flathub/tech.dongdongbh.mindwtr` 中的 beta 分支與權限。AUR beta 需要 `mindwtr-bin-beta` 套件，以及 `AUR_SSH_PRIVATE_KEY`、`AUR_USERNAME` 與 `AUR_EMAIL` 密碼。如果任一管道尚未就緒，請停用對應的 RC 工作流程輸入，而不要將整個 RC 視為失敗。

由於上傳至 Play 測試會耗用一個 Android `versionCode`，每個上傳至 Play 的 RC 都需要新的 `versionCode`。RC 工作流程會在 Android 建置開始前解析一次該代碼，接著 Play 建置與 Android FOSS 建置會使用相同的預檢輸出並平行執行。工作流程會上傳一個 AAB，並將相同的 versionCode 指派至每個已設定的測試群組。目前最終穩定版流程也應使用具有更高 `versionCode` 的全新正式環境上傳，或者未來的穩定版提升工作流程應提升已測試的 Play 建置。除非穩定版工作流程已能提升現有建置，否則不得為 Android `versionCode` 已上傳至 Play 的最終穩定版本加上標籤。


### 時程

審查延遲較長的管道需要提前開始。請採用以下預設時程：

| 日期 | 動作 |
| --- | --- |
| T-7 至 T-5 | 功能凍結。只允許錯誤修正、版本資訊、中繼資料與發布阻擋問題。 |
| T-5 | 建立發布分支、執行 `./scripts/bump-version.sh vX.Y.Z-rc.1`、產生 RC 特定版本資訊（例如 `docs/release-notes/X.Y.Z-rc.1.md`），並加上 `vX.Y.Z-rc.1` 標籤，讓 `release-rc.yml` 上傳已啟用的測試人員管道。 |
| T-4 | 經過審查的建置可供使用時，執行管道成品冒煙檢查。只修正阻擋問題。 |
| T-3 | 確認由 `release-rc.yml` 建立的 GitHub 預發布版本；當對應工作流程輸入已啟用時，驗證 Flathub beta PR 與 `mindwtr-bin-beta` 更新；並向測試人員公告 RC。 |
| T-2 至 T-1 | 分流意見回饋。只有阻擋問題才發布 `rc.2`。非阻擋問題移至下一個週期。 |
| 發布日 | 加上 `vX.Y.Z` 標籤，在所有管道發布穩定版，並將現有的持續性測試管道更新至穩定版本。 |
| T+1 至 T+2 | 監看當機、GitHub 問題、Discord、商店意見回饋與下游套件報告。如有需要，使用下一個修補標籤進行修補，例如發布 `v1.1.1` 作為 `v1.1.0` 的後續版本。 |

### rc.2 的阻擋標準

只有出現下列任一阻擋問題時，才發布另一個 RC：

- 啟動時當機
- 資料遺失或資料損毀
- 同步損毀或可重現的同步失敗
- 安裝、更新、簽署、權利或封裝失敗
- 擷取、任務建立、任務編輯或任務完成損壞
- 從前一個穩定版本遷移損壞
- 支援管道上的嚴重平台特定迴歸

其他所有事項都等到下一個排定版本或後續修補版本。這可避免雙週列車變成沒有終點的 Beta 迴圈。

### 必要的 RC 冒煙閘門

每個發行管道都是不同的執行環境。在 CI 或本機測試所允許的範圍內，從每個 RC 管道取得的成品必須在忠於該管道的環境中完成冒煙啟動，RC 才算就緒。

最低限度的冒煙檢查：

- 啟動使用者實際收到的成品
- 建立、編輯、完成及刪除任務
- 驗證擷取或快速新增能開啟並儲存
- 驗證應用程式能讀取前一個穩定版本的現有資料
- 驗證同步設定能開啟且不會當機
- 在適用情況下驗證更新程式、商店或沙箱特定的啟動行為
- 驗證記錄中沒有致命啟動錯誤

曾發生過失敗的管道應保留管道特定閘門：

- FOSS APK 與 Play APK/AAB 是不同的相依性集合
- Flatpak 必須在 Flatpak 執行環境內啟動
- AUR 套件在發布前必須於乾淨的 Arch 容器中建置
- MSIX/Microsoft Store 套件不得因系統匣、快捷鍵或受沙箱限制的能力而發生致命失敗
- App Store 與 TestFlight 建置必須保留必要權利

### 測試人員公告

RC 公告應簡短且可供採取行動：

- 版本與管道連結
- 主要的使用者可見變更
- 已知風險或需要測試的領域
- 確切的意見回饋管道：GitHub 問題、Discord 頻道或電子郵件
- 提醒這是候選版本，而不是功能預覽

---

## 穩定版發布流程

1. 確認 `main` 處於預定的發布狀態，並先提交任何發布前工作。
   - 如果前一版本已經發布，請將後續修正放在 `docs/release-notes/unreleased.md` 下，並從 `CHANGELOG.md` 連結至該檔案，直到準備下一個修補版本為止，例如準備 `v0.9.1` 作為 `v0.9.0` 的後續版本。
2. 使用以下指令提升版本：

```bash
./scripts/bump-version.sh 0.x.y
```

這會更新工作區套件版本，並提升 Android `versionCode`。

如果 Google Play 因 RC 或測試人員上傳而已有較高的 `versionCode`，請在加上標籤前將該最大值傳入版本提升指令碼：

```bash
ANDROID_REMOTE_MAX_VERSION_CODE=85 ./scripts/bump-version.sh 0.x.y
```

指令碼會寫入高於 Play 最大值且納入追蹤的 `apps/mobile/app.json` 值，讓發布標籤、GitHub APK 與下游可重現建置配方都能看到相同的 Android 中繼資料。穩定版發布 CI 仍會拒絕只存在於 CI 的 `versionCode` 覆寫；加上標籤前應修正來源中繼資料，而不是依靠未受追蹤的工作流程變更。

3. 加上標籤前，先執行發布硬性閘門：
   - 型別／測試閘門：
     - `bun run test`
     - `bun run typecheck`
     - `bun run native:test`
   - FOSS／靜態閘門：
     - 檢查 `git diff vPREV..HEAD -- apps/mobile/package.json`
     - 檢查 F-Droid/FOSS 設定檔（`apps/mobile/plugins/android-manifest-fixes.js`、`apps/mobile/scripts/`、`.github/workflows/release-android-foss.yml`、`config/izzyonandroid.yml`）
     - 執行 `python3 scripts/ci/repair-package-lock.py --check apps/desktop/package-lock.json`
   - CloudKit 結構描述閘門：
     - 將同步的結構描述檔案與前一個標籤比較
     - 如果加入了新的 CloudKit 支援欄位或記錄型別，請在發布前更新／部署正式環境結構描述
4. 準備或更新版本資訊與中繼資料：
   - `docs/release-notes/<version>.md`
   - `docs/release-notes/google-play/<version>.txt`
   - `metadata/*/release_notes.txt`
   - `metadata/*/changelogs/<androidVersionCode>.txt`
   - `metadata/metadata.json`
   - `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
5. 當發布／文件流程細節有所變更時，更新 [Mindwtr Web 文件來源](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)中的公開文件。GitHub Wiki 已停用；不要新增或更新 `wiki/` 內容頁面，也不要在個別 `.wiki` 簽出中執行 git。
6. 仔細檢查產生的版本與中繼資料變更。
7. 提交發布準備：

```bash
git add -A
git commit -m "chore(release): v0.x.y"
```

8. 加上發布標籤：

```bash
git tag v0.x.y
```

9. 推送 `main` 與標籤：

```bash
git push origin main --tags
```

10. 讓 GitHub Actions 發布平台成品與任何下游封裝工作。

---

## 加上標籤前

至少應驗證：

- 版本資訊存在且符合實際變更
- 整個 monorepo 的套件版本一致
- 對於 RC 標籤，`apps/mobile/release-version.json` 包含完整 RC 版本
- Android `versionCode` 已提升
- 桌面套件鎖定檔通過 `repair-package-lock.py --check`
- FOSS 設定仍會移除遭封鎖的權限，並只保留刻意啟用的權限
- CloudKit 支援的結構描述沒有變更，或正式環境結構描述已先更新
- 商店／版本中繼資料變更是刻意且依平台限定範圍
- 主控台中的行動版商店分類仍然正確：Google Play `Productivity > Task Management`，App Store 主要分類為 `Productivity`
- Google Play 語系內文符合 API 500 字元限制

對於較大的版本，還應驗證：

- 桌面版更新程式中繼資料
- 行動版商店中繼資料／Fastlane 輸入
- [Mindwtr Web 文件來源](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)中針對使用者可見功能的文件網站變更
- 使用小型種子資料集進行跨後端同步冒煙測試：新增、更新、刪除與附件傳輸應在雲端、WebDAV／檔案同步，以及發布測試人員可用的任何平台原生後端之間收斂；第二次同步應不再回報新衝突

---

## 版本資訊

版本化的版本資訊位於 `docs/release-notes/`。

準則：

- 最上方摘要應面向使用者
- 重要的修正／功能優先列出
- 有助理解時列出重要提交
- RC 應使用 `docs/release-notes/X.Y.Z-rc.N.md` 或 `docs/release-notes/vX.Y.Z-rc.N.md`，並在第一個標題中包含完整 RC 版本；`docs/release-notes/X.Y.Z.md` 保留給最終穩定版本
- 需要時，讓 `docs/release-notes/google-play/` 中的 Google Play 摘要保持一致
- 更新 `metadata/*/release_notes.txt` 中的 App Store 版本資訊
- 在 `metadata/*/changelogs/<versionCode>.txt` 下新增 Android 變更記錄檔案
- 讓 `metadata/metadata.json` 中的 Microsoft Store 版本資訊與同一版本保持一致
- 在 `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml` 中新增或更新最上方的 AppStream 項目

---

## 發布後檢查

推送標籤後：

- 驗證 GitHub 版本已建立
- 驗證已附加預期的桌面版／行動版成品
- 在適用時驗證商店特定工作流程成功
- 針對新版本抽查更新程式／下載介面
- 驗證穩定版也已發布至現有的持續性測試管道，讓測試人員維持在最新建置

---

## 復原思維

如果偵測到不良版本：

- 在了解失敗模式前，停止新增後續標籤
- 優先快速向前發布修正版，而非重寫已發布歷史
- 在版本資訊中明確說明修正補丁

---

## 相關內容

- [開發者指南](/zh-Hant/developers/developer-guide)
- [Docker 部署](/zh-Hant/power-users/docker-deployment)
- [雲端部署](/zh-Hant/data-sync/cloud-deployment)
- [儲存庫版本資訊](https://github.com/dongdongbh/Mindwtr/tree/main/docs/release-notes)
- [語意化版本](https://semver.org/)
- [GitHub 預發布版本](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Google Play 測試群組](https://support.google.com/googleplay/android-developer/answer/9845334)
- [Apple TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Flathub beta 儲存庫](https://docs.flathub.org/docs/for-app-authors/maintenance)
- [Microsoft Store 套件發行小眾測試版](https://learn.microsoft.com/en-us/windows/apps/publish/package-flights)
