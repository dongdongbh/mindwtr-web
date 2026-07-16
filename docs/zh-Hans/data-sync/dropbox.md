# Dropbox 同步

在受支持的桌面端和移动端构建中，如水支持直接通过 Dropbox 同步。

该功能使用具有**应用文件夹**访问权限的 Dropbox OAuth，因此如水只会读写以下路径的数据：

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/*`

---

## 可用平台

- **桌面端（官方构建）：**支持
- **移动端（官方构建）：**支持
- **Expo Go：**不支持 Dropbox OAuth
- **FOSS 构建：**可能禁用 Dropbox 同步
- **Docker/PWA Web 构建：**不支持；请改用原生桌面端/移动端构建、自托管同步或 WebDAV

如果你的构建禁用了 Dropbox，或正在使用 Docker 提供的 PWA，请改用[数据与同步](/zh-Hans/data-sync/)（文件同步）、[云端部署](/zh-Hans/data-sync/cloud-deployment)（自托管）或 WebDAV。

---

## 用户设置（官方构建）

1. 打开**设置 → 同步**。
2. 在**同步后端**选择器中选择 **Dropbox**。如水会把所选路径显示为**云端同步**。
3. 点击/点按**连接 Dropbox**，并在浏览器中完成 OAuth。
4. 返回如水，使用**测试连接**。
5. 执行**同步**。

首次同步后，确认 Dropbox 中存在应用文件夹：

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/`

---

## 自行构建时的设置

如果自行构建如水，必须在构建时提供 Dropbox app key。

### 1. 创建 Dropbox App

在 Dropbox App Console 中设置：

- App type：**Scoped access**
- Access type：**App folder**
- Scopes：`files.content.read`、`files.content.write`、`files.metadata.read`
- 启用 public client / PKCE flow

### 2. 添加重定向 URI

- 移动端：`mindwtr://redirect`
- 桌面端：`http://127.0.0.1:53682/oauth/dropbox/callback`

### 3. 在构建时注入 app key

- 桌面端：`VITE_DROPBOX_APP_KEY=<your_app_key>`
- 移动端：`DROPBOX_APP_KEY=<your_app_key>`

对于 macOS App Store 构建，桌面端 OAuth 回调会在 `127.0.0.1:53682` 使用本地环回监听器，因此应用 entitlement 集必须包含 `com.apple.security.network.server`。

在 CI/发布工作流程中设置仓库变量或密钥：

- `VITE_DROPBOX_APP_KEY`
- `DROPBOX_APP_KEY`

---

## 故障排除

### `Invalid redirect_uri`

确保如水显示的 URI 与 Dropbox app 设置完全一致。

### HTTP 401 / token 无效

令牌已过期/撤销，或由其他 app key 签发。请重新连接 Dropbox。

### 设置中没有 Dropbox 选项

你的构建可能禁用了 Dropbox（FOSS 构建中常见），或缺少构建时 app key。

### 应用显示已连接，但不执行同步

先使用**测试连接**。如果成功，再执行**同步**并查看[诊断与日志](/zh-Hans/data-sync/diagnostics-logs)。

---

## 安全与隐私

- 如水只申请应用文件夹访问权限，而非完整 Dropbox 账户访问权限。
- OAuth 令牌仅存储在设备本地。
- 如水开发者不会代理 Dropbox 请求，也不会接收你的 Dropbox 令牌。

另请参阅：

- [数据与同步](/zh-Hans/data-sync/)
- [隐私政策](https://mindwtr.app/privacy)
