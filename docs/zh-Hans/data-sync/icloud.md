# iCloud 同步

在原生模块可用的 Apple 设备上，如水支持原生 **iCloud / CloudKit** 同步后端。

## 可用平台

- **iPhone / iPad：**在**设置 → 同步**中通过原生 `iCloud` 同步后端使用
- **Android：**不支持
- **Windows / Linux：**不支持
- **macOS 桌面端：**在**设置 → 同步**中通过原生 `iCloud` 同步后端使用

## 同步内容

原生 iCloud 后端会同步与其他结构化后端相同的核心 GTD 数据：

- 任务
- 项目
- 分区
- 领域
- 附件元数据
- 通过 CloudKit asset 同步的附件文件
- 已同步的设置组

它使用 Apple 账户中的 CloudKit 记录和 asset，而不是用户选择的 `data.json` 与 `attachments/` 文件夹。

## 设置

1. 在要同步的设备上登录同一个 Apple ID。
2. 确保这些设备已为如水启用 iCloud。
3. 在 Apple 设备上的如水中打开**设置 → 同步**。
4. 选择 **iCloud** 作为同步后端。
5. 执行一次同步，以写入或拉取数据。

设置完成后，如水会继续采用常规的本地优先合并流程，并在可用时响应 CloudKit 更改通知。

## 平台说明

- 如果非 Apple 构建发现旧的 `cloudkit` 后端值，如水会回退到 `Off`，而不会显示无法使用的 iCloud 选项。
- 如果 macOS 用户偏好基于文件夹的流程，而不是原生 CloudKit 后端，仍可使用 **iCloud Drive + 文件同步**。
- 原生 iCloud 附件同步也仅适用于 Apple 设备。混合平台环境若需要在 Apple 与非 Apple 设备间传输附件，应使用跨平台后端。
- 如需在 Apple 与非 Apple 设备之间同步，请使用 **WebDAV**、**Mindwtr Cloud**、**Dropbox**（受支持的构建）或**文件同步**。

## 何时使用

以下情况适合使用原生 iCloud 同步：

- 参与同步的所有设备都属于 Apple 生态
- 你希望设置过程比选择和维护共享文件夹更简单
- 同一个同步网络中不需要 Android / Windows / Linux 客户端

如需混合平台同步，请参阅[数据与同步](/zh-Hans/data-sync/)。
