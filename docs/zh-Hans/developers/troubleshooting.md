# 开发者故障排除

本页汇总最常见的本地开发问题，以及最短诊断路径。

---

## 依赖/工作区问题

### `bun install` 失败或软件包似乎不同步

- 从仓库根目录运行 `bun install`，不要从应用子目录运行。
- 调试代码级故障前，先排除陈旧 lockfile 假设。
- 如果刚提升版本，确认版本脚本之后已完成 `bun install`。

### TypeScript 无法解析工作区软件包

- 除非软件包文档另有说明，否则确认从仓库根目录运行命令。
- 重新运行 `bun install`。
- 确认软件包筛选器与工作区名称一致（`mindwtr`、`mobile`、`@mindwtr/core` 等）。

---

## 桌面端构建问题

### Tauri 在 Linux 上构建失败

常见缺失前置条件：

- Rust 工具链
- WebKitGTK 开发包
- OpenSSL 开发包
- GTK 开发包

各平台的安装命令请参阅[开发者指南](/zh-Hans/developers/developer-guide)。

### 桌面应用可以启动，但缺少诊断功能

只有使用 `diagnostics` feature 构建应用时，发布版诊断功能才可用：

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### 桌面端数据或配置路径不清楚

请参阅 `docs/CONTRIBUTING.md` 中的存储路径说明，以及应用内设置界面。

---

## 移动端开发问题

### 未检测到 Android/iOS 工具

- 确认已设置 Android Studio / SDK 路径
- iOS 开发需确认已安装 Xcode
- 先从仓库根目录运行 `bun mobile:start`

### Expo / Metro 问题

- 重启 Expo 开发服务器
- 重新运行 `bun install`
- 确保没有混用根目录和应用级安装流程

### 测试中无法重现原生/仅设备错误

- 为共享逻辑添加尽可能小的单元/集成测试
- 在 PR 中记录手动设备操作步骤
- 更改行为前先收集日志

---

## 同步/存储调试

### 需要更多同步失败详情

使用[诊断与日志](/zh-Hans/data-sync/diagnostics-logs)中记录的内置诊断流程。

### 怀疑合并或数据完整性错误

按以下顺序开始：

1. 相关同步/搜索/存储辅助函数的 `packages/core` 测试
2. 平台包装层测试（桌面端/移动端）
3. 本地诊断日志

如果故障实际上位于共享核心逻辑中，不要直接跳到 UI 更改。

---

## 测试问题

### 软件包测试失败，但完整应用仍能运行

- 在证明并非如此之前，将测试失败视为真实回归。
- 先重新运行范围最窄的软件包级测试。
- 检查故障来自应用代码还是测试工具。

### React Native 测试输出嘈杂

- 当前移动端测试中出现 `react-test-renderer` 弃用警告是预期行为。
- 优先使用聚焦的断言，避免大范围快照变动。

---

## 何时添加更多诊断

以下情况应添加日志或检测：

- 无法稳定重现故障
- 错误跨越软件包边界
- 同步时机或存储状态很重要
- 原生服务/API 在不同平台上行为不同

日志应保存在本地，并对密钥/令牌脱敏。

---

## 相关页面

- [开发者指南](/zh-Hans/developers/developer-guide)
- [测试策略](/zh-Hans/developers/testing-strategy)
- [诊断与日志](/zh-Hans/data-sync/diagnostics-logs)
- [架构](/zh-Hans/developers/architecture)
