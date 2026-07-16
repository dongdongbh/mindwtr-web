# Docker 部署

Mindwtr 为运行以下服务提供官方 Docker 支持：
- **mindwtr-app**：由 Nginx 提供服务的桌面 Web/PWA 构建。
- **mindwtr-cloud**：轻量级同步服务器和任务自动化 REST API。

它们均以 Docker 镜像形式提供，并可使用 Docker Compose 轻松编排。

---

## 快速开始（Docker Compose）

在本地开始使用的最简单方式，是使用仓库 `docker/` 目录中包含的 `compose.yaml` 文件。

1. **克隆仓库**（如果尚未克隆）：
   ```bash
   git clone https://github.com/dongdongbh/Mindwtr.git
   cd Mindwtr
   ```

2. **设置本地 HTTP 配置**：
   ```bash
   export MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
   export MINDWTR_CLOUD_CORS_ORIGIN=http://localhost:5173
   ```

3. **启动服务**：
   ```bash
   docker compose -f docker/compose.yaml up --build -d
   ```

4. **访问服务**：
   - **PWA（Web 应用）：**在浏览器中打开 `http://localhost:5173`。
   - **云端健康检查：**打开 `http://localhost:8787/health`。
   - **用于本地测试的自托管 URL：**`http://localhost:8787`
   - **REST API 基础 URL：**`http://localhost:8787/v1`

这个默认 compose 文件仅使用 HTTP，适用于本地/私有测试。Mindwtr 桌面端和移动端客户端仅会为已识别的本地/私有目标接受 HTTP，例如 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、环回/私有 IPv6 地址、`*.local` 和 `*.home.arpa`。

对于公共 URL、自定义 DNS 名称、VPN 主机名、Tailscale、ZeroTier，或任何未被识别为本地/私有的名称，请使用 HTTPS。**允许不安全连接（HTTP）**设置是面向可信本地/私有端点的兼容性设置；它不是允许公共 HTTP 的开关。

---

## 使用 Caddy 设置 HTTPS

对于公共桌面端或移动端同步，请使用由 Caddy 支持的 compose 文件：

```bash
cp docker/.env.https.example docker/.env.https.local
```

编辑 `docker/.env.https.local`：

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.example.com
MINDWTR_CLOUD_AUTH_TOKENS=your_long_random_token
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.example.com
MINDWTR_CADDYFILE=Caddyfile.https
```

启动服务栈：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

检查服务器：

```bash
curl https://mindwtr.example.com/health
```

在 Mindwtr 的“设置 -> 同步 -> 自托管”中，将自托管 URL 设为：

```text
https://mindwtr.example.com
```

Mindwtr 会自动附加 `/v1/data`。

### 公共 HTTPS

当 `MINDWTR_CLOUD_DOMAIN` 是指向这台 Docker 主机的公共 DNS 名称时，请使用 `Caddyfile.https`。端口 80 和 443 必须可访问，以便自动签发证书。Caddy 会获取并续订证书，并将请求反向代理至 `mindwtr-cloud`。

### 仅限局域网的 HTTPS

当主机名仅能在家庭网络中解析时，请使用 `Caddyfile.local-https`：

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

这会使用 Caddy 的内部证书颁发机构。每台客户端设备都必须信任 Caddy 的本地根证书，Mindwtr 才会接受 HTTPS 连接。对移动端客户端来说，公共 Let's Encrypt 证书是更可靠的选择。

仅限局域网的服务栈启动后，导出 Caddy 的本地根证书：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

在每台将通过此主机名进行同步的设备上，将该证书安装为受信任的根证书。

---

## 配置

### 同步令牌
云端服务器需要令牌进行认证。你需要在环境变量中设置它。

在 `docker/compose.yaml` 中（或通过环境变量）设置：

```yaml
MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
```

为了向后兼容，仍接受 `MINDWTR_CLOUD_TOKEN`，但该变量已弃用。

对于 Docker secrets，你可以挂载文件并改为指向该文件：

```yaml
MINDWTR_CLOUD_AUTH_TOKENS_FILE: /run/secrets/mindwtr_cloud_tokens
```

**生成令牌：**
你可以使用以下命令生成强随机令牌：
```bash
cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 50 | head -n 1
```

### 客户端配置
要将 Mindwtr 客户端（桌面端或移动端）连接到这个自托管云端：

1. 前往**设置 → 同步**。
2. 选择**自托管**（或云端）。
3. 将**自托管 URL**设为服务器的基础端点：
   ```
   http://localhost:8787
   ```
   *Mindwtr 会自动在此 URL 后附加 `/v1/data`。*
4. 输入你在 `MINDWTR_CLOUD_AUTH_TOKENS` 中配置的**同一个令牌**。

对于私有局域网 HTTP，请使用本地/私有地址，例如 `http://192.168.1.20:8787`。对于公共 URL，请使用上面的 Caddy HTTPS 设置。

### Dropbox 同步与 Docker PWA

Docker `mindwtr-app` 镜像提供浏览器/PWA 构建。此运行环境不支持原生 Dropbox OAuth 同步，因为 Dropbox 连接由原生桌面端和移动端应用实现。通过 `.env`、`env_file`、compose 运行时环境或 Docker 构建参数添加 `VITE_DROPBOX_APP_KEY` 或 `DROPBOX_APP_KEY`，都无法在 Docker 中启用 Dropbox。

对于 Docker 托管的同步，请使用随附的自托管云端服务器或 WebDAV。如果自托管端点位于 Authelia 或其他交互式 SSO 代理之后，请配置代理，让 Mindwtr 同步/API 路径直接使用 Mindwtr 的 bearer token；移动端应用无法在 `/v1/data` 前完成 Authelia 浏览器登录。

### 任务自动化 API

同一个 `mindwtr-cloud` 容器还会公开用于任务自动化的 REST API。它使用与同步相同的基础 URL 和 bearer token。

常用端点：

- `GET /v1/data` 和 `PUT /v1/data`：用于同步
- `GET /v1/tasks` 和 `POST /v1/tasks`：用于列出和创建任务
- `GET /v1/projects`：用于项目
- `GET /v1/search?query=...`：用于搜索任务和项目

示例：

```bash
curl -X POST http://localhost:8787/v1/tasks \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"input":"Review PR @work /due:tomorrow"}'
```

### CORS 来源（生产环境）

云端服务器的 CORS 默认为 `http://localhost:5173`。对于生产环境，请设置：

```yaml
MINDWTR_CLOUD_CORS_ORIGIN=https://your-app-domain.example
```

---

## 数据持久化

为了在容器重启后确保云端数据安全，你应为数据目录挂载一个卷。

在你的 `compose.yaml` 中：

```yaml
volumes:
  - ./data:/app/cloud_data
```

---

## 手动构建

如果你希望不使用 Compose，自行构建镜像：

**构建 PWA：**
```bash
docker build -f docker/app/Dockerfile -t mindwtr-app .
```

**构建云端服务器：**
```bash
docker build -f docker/cloud/Dockerfile -t mindwtr-cloud .
```

---

## GitHub Actions 与 GHCR

该项目包含一个 GitHub Actions 工作流，会自动构建镜像并推送至 GitHub Container Registry（GHCR）。

**官方镜像：**
- `ghcr.io/dongdongbh/mindwtr-app:latest`
- `ghcr.io/dongdongbh/mindwtr-cloud:latest`

预发布构建可通过浮动的 `beta` 标签获取；该标签始终指向最新版本（候选发布版或稳定版）。也可以按版本固定，例如 `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`。`latest` 始终保持在稳定版。其他平台请参阅[加入 Beta 渠道](/zh-Hans/start/beta-channels)。

`docker/compose.yaml` 文件默认配置为使用这些镜像，方便你拉取最新版本而无需在本地构建。

---

## 技术说明

- **PWA 服务：**Web 应用使用客户端渲染。Nginx 容器配置了 `try_files`，将所有请求重定向至 `index.html`，避免刷新页面时出现 404 错误。
- **基础镜像：**构建使用 Bun（固定为 v1.3），并包含 `better-sqlite3` 所需的 C++20 标志。
