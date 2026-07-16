# 開發疑難排解

本頁整理最常見的本機開發問題，以及最短的診斷路徑。

---

## 相依套件／工作區問題

### `bun install` 失敗或套件似乎不同步

- 請從儲存庫根目錄執行 `bun install`，不要從應用程式子目錄執行。
- 在除錯程式碼層級的失敗前，先排除過時鎖定檔假設所造成的問題。
- 若剛提升版本，請確認提升版本指令碼執行後已完成 `bun install`。

### TypeScript 無法解析工作區套件

- 除非套件文件另有說明，請確認你從儲存庫根目錄執行命令。
- 重新執行 `bun install`。
- 確認套件篩選條件符合工作區名稱（`mindwtr`、`mobile`、`@mindwtr/core` 等）。

---

## 桌面版建置問題

### Tauri 在 Linux 上建置失敗

常見的缺少先決條件：

- Rust 工具鏈
- WebKitGTK 開發套件
- OpenSSL 開發套件
- GTK 開發套件

各平台的安裝命令請參閱[開發者指南](/zh-Hant/developers/developer-guide)。

### 桌面應用程式可啟動，但缺少診斷功能

只有使用 `diagnostics` 功能建置應用程式時，發行版才能使用診斷功能：

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### 對桌面版資料或設定路徑感到困惑

請參閱 `docs/CONTRIBUTING.md` 中的儲存路徑說明，以及應用程式內的設定畫面。

---

## 行動版開發問題

### 未偵測到 Android／iOS 工具

- 確認已設定 Android Studio／SDK 路徑
- 若進行 iOS 開發，確認已安裝 Xcode
- 從儲存庫根目錄執行 `bun mobile:start`

### Expo／Metro 問題

- 重新啟動 Expo 開發伺服器
- 重新執行 `bun install`
- 確認沒有混用根目錄與應用程式層級的安裝流程

### 只有原生環境／裝置會發生的錯誤無法在測試中重現

- 為共用邏輯新增最精簡可行的單元／整合測試
- 在 PR 中記錄手動裝置操作步驟
- 變更行為前先擷取日誌

---

## 同步／儲存除錯

### 需要同步失敗的更多詳細資訊

使用[診斷與日誌](/zh-Hant/data-sync/diagnostics-logs)所述的內建診斷流程。

### 懷疑合併或資料完整性錯誤

請依下列順序著手：

1. 針對相關同步／搜尋／儲存輔助函式的 `packages/core` 測試
2. 平台包裝層測試（桌面版／行動版）
3. 本機診斷日誌

若失敗實際發生在共用核心邏輯，請勿直接跳到介面變更。

---

## 測試問題

### 套件測試失敗，但完整應用程式仍可執行

- 在證明並非如此之前，先將測試失敗視為真正的迴歸。
- 先重新執行範圍最小的套件層級測試。
- 檢查失敗位於應用程式碼還是測試框架。

### React Native 測試訊息太多

- 目前的行動版測試預期會出現 `react-test-renderer` 淘汰警告。
- 優先使用目標明確的斷言，避免大量快照變動。

---

## 何時應加入更多診斷資訊

在下列情況加入日誌或檢測：

- 無法穩定重現失敗
- 錯誤橫跨套件邊界
- 同步時序或儲存狀態會影響結果
- 原生供應者／API 在不同平台上的行為不同

日誌應保留在本機，並遮蔽秘密／token。

---

## 相關內容

- [開發者指南](/zh-Hant/developers/developer-guide)
- [測試策略](/zh-Hant/developers/testing-strategy)
- [診斷與日誌](/zh-Hant/data-sync/diagnostics-logs)
- [架構](/zh-Hant/developers/architecture)
