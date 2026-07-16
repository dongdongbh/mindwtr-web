# 诊断与日志

Mindwtr 内置诊断日志，可帮助排查同步和崩溃问题。日志**仅保存在本地**，敏感值会在写入前**脱敏**。

---

## 启用调试日志

### 桌面端

1. 打开**设置 → 数据**
2. 开启**调试日志**
3. 重现问题

**发布版诊断构建：**只有在桌面应用使用 `diagnostics` feature 构建时，开发者工具和额外日志才可用。

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### 移动端

1. 打开**设置 → 数据**
2. 开启**调试日志**
3. 重现问题

---

## 分享或清除日志

### 桌面端

- 日志文件路径显示在**设置 → 数据**中
- 可在同一界面清除日志

### 移动端

- 使用**分享日志**导出日志文件
- 使用**清除日志**删除旧记录

---

## 默认日志位置（桌面端）

| 平台 | 日志文件 |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## 记录哪些内容

- 同步错误和步骤
- 冲突摘要：即使调试日志关闭，已成功解决冲突的合并也始终写入 `mindwtr.log`，便于事后审计解决结果。这些常驻记录包含记录 ID、更改过的字段名和最终采用的一方，但绝不会写入记录内容（标题、备注）。
- 意外的运行时错误

敏感值（API 密钥、令牌、密码、包含凭据的 URL）会自动脱敏。

---

## 相关页面

- [常见问题](/zh-Hans/start/faq)
- [数据与同步](/zh-Hans/data-sync/)
