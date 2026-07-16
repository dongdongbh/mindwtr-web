# 附件（檔案、連結、音訊）

Mindwtr 可將檔案與連結附加至**任務**及**專案**。附件是選用功能；啟用同步後，也會在裝置間同步。

---

## 可附加的內容

- **檔案**（PDF、圖片、文件等）
- **連結**（URL、網頁、參考連結）
- **音訊筆記**（啟用「儲存音訊附件」時）
- 桌面版啟用 Obsidian 整合後，可附加 **Obsidian 筆記**

---

## 新增附件

### 桌面版

- 開啟任務或專案。
- 在**附件**中按一下**新增檔案**或**新增連結**。
- 連結可貼上 URL 或本機檔案路徑。
- 任務附件中的**附加 Obsidian 筆記**只會在啟用 Obsidian 整合後出現。

### 行動版

- 開啟任務。
- 使用**新增附件**選取檔案或加入連結。
- 若你錄製語音收集內容並已啟用**儲存音訊附件**，系統會自動加入音訊筆記。

### 副本與連結的差異

- **新增檔案**會把檔案副本存入 Mindwtr 本身的儲存空間。即使原始檔案日後移動、重新命名或刪除，附件仍可使用。移除附件只會刪除 Mindwtr 的副本，不會刪除原始檔案。
- **新增連結**只會儲存指標。若想參照檔案而不複製，可貼上 URL 或本機檔案路徑（桌面版亦可用**連結至檔案…**瀏覽選取）。檔案移動後，路徑連結如預期會失效。
- 每列附件都會顯示其類型：迴紋針代表 Mindwtr 持有檔案副本；連結圖示則代表指標（工具提示會顯示完整目標）。
- 桌面版 v1.1.0 之前加入的檔案附件只參照原始路徑，並未保存副本（會顯示連結圖示）；重新附加檔案即可轉成副本。

---

## 音訊附件

啟用**儲存音訊附件**（設定 → 一般）後，Mindwtr 會在逐字稿旁保留原始語音筆記，方便日後重播或分享錄音。

### Linux 音訊播放相依套件

Linux 上的音訊播放使用 **GStreamer**。若看到 `autoaudiosink not found` 等錯誤，請安裝 GStreamer 外掛程式：

**Arch / Manjaro**
```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav
```

**Debian / Ubuntu / Mint**
```bash
sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav
```

**Fedora**（部分編解碼器需要 RPM Fusion）
```bash
sudo dnf install gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly gstreamer1-libav
```

## 同步行為

- 附件中繼資料會與任務／專案同步。
- 實際檔案在中繼資料之後同步。
- 若本機缺少檔案，附件仍會顯示，並可在檔案可用時重新下載。
- 清理程序只會檢查目前裝置已知的參照。若另一部裝置尚未同步，共享的遠端附件檔案不會在所有裝置間進行全域參照計數。

> 提示：大型檔案會拖慢同步。可行時請優先使用較小的附件或連結。

---

## 清理

Mindwtr 會自動清理**孤立附件**（不再由任何任務／專案參照的檔案）。

- 桌面版：也可在**設定 → 資料 → 附件清理**中手動執行。
- 行動版：同步期間自動執行清理。

---

## 相關頁面

- [資料與同步](/zh-Hant/data-sync/)
- [桌面版使用指南](/zh-Hant/use/desktop)
- [行動版使用指南](/zh-Hant/use/mobile)
