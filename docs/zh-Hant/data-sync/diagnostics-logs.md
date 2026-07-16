# 診斷與日誌

Mindwtr 內建診斷日誌，可協助排查同步與當機問題。日誌**只儲存在本機**，敏感值在寫入前會先**遮蔽**。

---

## 啟用除錯日誌

### 桌面版

1. 開啟**設定 → 資料**
2. 開啟**除錯日誌**
3. 重現問題

**發行版診斷組建：**只有以 `diagnostics` 功能建置桌面應用程式時，才能使用開發者工具與額外日誌。

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### 行動版

1. 開啟**設定 → 資料**
2. 開啟**除錯日誌**
3. 重現問題

---

## 分享或清除日誌

### 桌面版

- 日誌檔案路徑顯示於**設定 → 資料**
- 也可在同一畫面清除日誌

### 行動版

- 使用**分享日誌**匯出日誌檔案
- 使用**清除日誌**移除舊項目

---

## 預設日誌位置（桌面版）

| 平台 | 日誌檔案 |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## 記錄內容

- 同步錯誤與步驟
- 衝突摘要：即使除錯日誌關閉，解決衝突的合併仍一律寫入 `mindwtr.log`，以便事後稽核。這些常駐項目包含記錄 ID、變更的欄位名稱及採用哪一端；絕不寫入記錄內容（標題、筆記）。
- 未預期的執行階段錯誤

敏感值（API 金鑰、token、密碼及含憑證的 URL）會自動遮蔽。

---

## 相關頁面

- [常見問題](/zh-Hant/start/faq)
- [資料與同步](/zh-Hant/data-sync/)
