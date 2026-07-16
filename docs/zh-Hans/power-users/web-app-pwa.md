# Web 应用（PWA）

如水桌面应用可以通过 Vite 构建以浏览器应用方式运行。在浏览器（非 Tauri）中运行时，它使用 `localStorage` 持久保存数据，并注册 service worker 以支持离线使用和 PWA。

---

## 在本地运行

你可以使用 Bun 在本地运行 PWA，也可以使用 **Docker**。

### 使用 Docker（推荐）

运行 PWA 容器的说明请参阅 [Docker 部署](/zh-Hans/power-users/docker-deployment)。

### 使用 Bun

在仓库根目录运行：

```bash
bun install
bun desktop:web
```

这会在 `http://localhost:5173/` 启动 Vite。

---

## 构建以供托管

```bash
bun desktop:web:build
```

构建产物位于 `apps/desktop/dist/`，可作为静态站点托管。

---

## PWA 行为

- 在浏览器中运行时，应用会注册 `apps/desktop/public/sw.js`
- `sw.js` 会预缓存 `/`、`/index.html`、`/manifest.webmanifest`、`/icon.png` 和 `/logo.png`，并按需缓存其他同源 GET 请求
- 离线时，导航请求会回退到 `/index.html`，因此深层链接仍可加载

---

## 托管要求

请将 `apps/desktop/dist/` 托管在站点根路径（`/`）。service worker 从 `/sw.js` 注册，manifest 也引用根路径。

确保静态托管服务以以下类型提供文件：

- `manifest.webmanifest`：`application/manifest+json`（推荐）
- `sw.js`：`application/javascript`

如果需要托管在子路径下（例如 `/mindwtr/`），必须调整 service worker 注册地址和 manifest 路径，使其与基础路径一致。

---

## 限制

- 浏览器构建把数据存储在 `localStorage` 中（清除站点数据也会清除如水数据）
- 某些仅限桌面端的功能在浏览器中可能不可用，例如需要原生文件访问的文件附件
- 不支持原生系统托盘或全局快捷键

---

## 另请参阅

- [开发者指南](/zh-Hans/developers/developer-guide)
- [数据与同步](/zh-Hans/data-sync/)
