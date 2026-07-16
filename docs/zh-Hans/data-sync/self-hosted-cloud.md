# 自托管 Mindwtr Cloud

Mindwtr Cloud 是面向希望使用如水专用服务器、而非第三方服务同步的用户所提供的自托管同步选项。如水的自托管云端后端是 `apps/cloud` 下的小型同步服务器；它是桌面端和移动端客户端的同步端点，不是如水应用界面。

## 何时使用

以下情况适合使用自托管云端：

- 你需要专用的如水同步端点
- 你能自行部署和更新一台小型服务器
- 你希望拥有托管账户、数据位置和访问控制

如果只需要基于文件的同步，[WebDAV](/zh-Hans/data-sync/webdav) 可能更简单。

## 权威参考

- 选择同步后端和配置客户端，请参阅[数据与同步](/zh-Hans/data-sync/)。
- 设置服务器、执行运维和配置环境变量，请参阅[云端部署](/zh-Hans/data-sync/cloud-deployment)。
- 了解 `/v1` 端点详情，请参阅[云端 API](/zh-Hans/developers/cloud-api)。
- 如需基于 Docker 的部署路径，请参阅 [Docker 部署](/zh-Hans/power-users/docker-deployment)。

## 快速了解

- 自托管云端后端会为每个 bearer token 存储一个 JSON 命名空间。
- 客户端指向 `/v1` 基础 URL，并通过 `GET /v1/data` 和 `PUT /v1/data` 同步。
- `/v1/data` 是权威同步契约；任务、项目、领域、分区、搜索和附件路由是可选的便捷 API。
- 附件 API 位于 `/v1/attachments/...` 下。
- 请将其部署在 HTTPS 之后，并像对待密码一样保护 bearer token。
- 公网 URL 必须使用 HTTPS。仅 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、环回/私有 IPv6 地址、`*.local` 和 `*.home.arpa` 等本地或私有目标可使用 HTTP。

## 部署组成

典型部署包括：

- Mindwtr Cloud 服务器
- 持久化数据库或存储后端
- 位于服务器前端的 HTTPS
- 每个如水客户端中配置的服务器 URL
- 由你为自己的部署创建的令牌或凭据

## 设置清单

1. 从主要设备导出备份。
2. 按如水仓库中的最新说明部署服务器。
3. 确认服务器健康检查端点可通过 HTTPS 响应。
4. 使用服务器 URL 和凭据配置如水。
5. 执行手动同步，并确认第二台设备上出现相同数据。

::: warning 不要把部署密钥提交到 git
请将服务器令牌、数据库 URL 和服务提供方凭据存放在托管平台或本地密钥管理器中，不要提交到代码仓库。
:::
