# 附件（文件、链接、音频）

如水允许你为**任务**和**项目**添加文件与链接。附件是可选功能；启用同步后，附件也会跨设备同步。

---

## 可以附加什么

- **文件**（PDF、图片、文档等）
- **链接**（URL、网页、参考链接）
- **音频笔记**（启用“保存音频附件”时）
- 桌面端启用 Obsidian 集成后可附加 **Obsidian 笔记**

---

## 添加附件

### 桌面端

- 打开任务或项目。
- 在**附件**中点击**添加文件**或**添加链接**。
- 添加链接时，粘贴 URL 或本地文件路径。
- 对于任务附件，只有启用 Obsidian 集成后才会显示**附加 Obsidian 笔记**。

### 移动端

- 打开任务。
- 使用**添加附件**选择文件或添加链接。
- 如果你录制语音记录且已启用**保存音频附件**，音频笔记会自动添加。

### 副本与链接

- **添加文件**会把文件副本存入如水自己的存储。即使原文件之后被移动、重命名或删除，附件仍可使用。移除附件会删除如水的副本，不会删除原文件。
- **添加链接**只保存一个指针。如果想引用文件而不复制，请粘贴 URL 或本地文件路径（桌面端也可使用**链接到文件…**浏览选择）。文件移动后路径链接会失效，这是链接的正常行为。
- 每个附件行都会显示类型：回形针表示如水持有文件副本，链接图标表示它是指针（工具提示会显示完整目标）。
- v1.1.0 之前在桌面端添加的文件附件引用原始路径，而不持有副本（显示链接图标）；重新附加即可转换为副本。

---

## 音频附件

启用**保存音频附件**（设置 → 常规）后，如水会在转录文本旁保留原始语音笔记。如果之后想重听或分享录音，这会很有用。

### Linux 音频播放依赖

Linux 上的音频播放使用 **GStreamer**。如果看到 `autoaudiosink not found` 等错误，请安装 GStreamer 插件：

**Arch / Manjaro**
```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav
```

**Debian / Ubuntu / Mint**
```bash
sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav
```

**Fedora**（部分编解码器需要 RPM Fusion）
```bash
sudo dnf install gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly gstreamer1-libav
```

## 同步行为

- 附件元数据随任务/项目同步。
- 实际文件在元数据之后同步。
- 如果本地缺少文件，附件仍会显示，并可在文件可用时重新下载。
- 清理操作会检查当前设备已知的引用。如果另一台设备尚未同步，共享的远程附件文件不会进行全局引用计数。

> 提示：大文件会拖慢同步。请尽量使用较小的附件，或改用链接。

---

## 清理

如水会自动清理**失去关联的附件**（不再被任何任务/项目引用的文件）。

- 桌面端：也可在**设置 → 数据 → 附件清理**中手动运行。
- 移动端：同步期间自动运行清理。

---

## 相关页面

- [数据与同步](/zh-Hans/data-sync/)
- [桌面端用户指南](/zh-Hans/use/desktop)
- [移动端用户指南](/zh-Hans/use/mobile)
