# 云端部署

本页介绍如何在类似生产环境的自托管环境中可靠运行 `apps/cloud` 服务器。

## 范围

- Mindwtr Cloud 是一个轻量级自托管后端，用于 JSON 同步和经令牌认证的任务自动化端点，并非完整的托管应用界面。
- 它最适合单租户或小规模可信部署。
- 你应将其置于 HTTPS 反向代理之后，并采用标准的服务器加固措施。

客户端兼容性说明：

- Mindwtr Cloud 客户端要求公共 URL 使用 **HTTPS**。
- 只有 `localhost`、`127.0.0.1`、`10.x.x.x`、`172.16.x.x` 至 `172.31.x.x`、`192.168.x.x`、环回/私有 IPv6 地址、`*.local` 和 `*.home.arpa` 等本地/私有目标才接受 HTTP。
- 对于自定义 DNS、VPN、Tailscale、ZeroTier 或其他未被识别为本地/私有的名称，请在反向代理层添加 TLS。
- **允许不安全连接 (HTTP)** 设置仅适用于可信的本地/私有端点；它不是公共 HTTP 覆盖选项。

## 部署拓扑

推荐布局：

1. 由反向代理（`nginx`、`caddy`、`traefik`）终止 TLS。
2. 云端服务器容器/进程监听私有接口。
3. 持久卷存储 `MINDWTR_CLOUD_DATA_DIR`。
4. 定期备份数据目录快照。

同一个云端服务同时处理：

- `/v1/data` 下的同步流量
- `/v1/tasks`、`/v1/projects`、`/v1/areas`、`/v1/sections` 和 `/v1/search` 等任务自动化端点

`PUT /v1/data` 基于合并，并非盲目替换。服务器会读取当前命名空间快照，使用 Mindwtr 的常规修订感知同步规则将其与上传的快照合并，验证合并后的数据，然后写回。上传较旧或不完整视图的客户端不应指望仅通过发送完整 JSON 负载就能抹除较新的远程记录。

REST 引用字段必须指向仍然有效的记录。例如，创建或修补项目时，如果其 `areaId` 所指区域已被软删除，服务器会返回 `404 Area not found`，而不是将项目关联到墓碑记录。使用 `areaId: null` 可清除项目的区域；空字符串会被拒绝。

有关端点级请求与响应的详细信息，请参阅[云端 API](/zh-Hans/developers/cloud-api)。

## 环境基线

最低生产环境基线：

- 将 `MINDWTR_CLOUD_AUTH_TOKENS` 设置为一个或多个高强度令牌。
- 将 `MINDWTR_CLOUD_CORS_ORIGIN` 设置为你的确切客户端来源。
- 将 `MINDWTR_CLOUD_DATA_DIR` 挂载到持久存储。
- 根据你的使用情况调整 `MINDWTR_CLOUD_MAX_BODY_BYTES` 和 `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES`。

可选但实用：

- `MINDWTR_CLOUD_RATE_WINDOW_MS`
- `MINDWTR_CLOUD_RATE_MAX`
- `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX`

## 环境变量

### 身份认证

| 变量 | 用途 | 说明 |
| --- | --- | --- |
| `MINDWTR_CLOUD_AUTH_TOKENS` | 以逗号分隔的持有者令牌允许列表。 | 推荐用于生产环境。 |
| `MINDWTR_CLOUD_AUTH_TOKENS_FILE` | 包含持有者令牌的文件路径。 | 适用于 Docker 密钥；文件内容可与 `MINDWTR_CLOUD_AUTH_TOKENS` 相同。 |
| `MINDWTR_CLOUD_TOKEN` | 旧版单令牌别名。 | 为向后兼容仍受支持，但已弃用。 |
| `MINDWTR_CLOUD_TOKEN_FILE` | 包含旧版单令牌的文件路径。 | 为向后兼容仍受支持，但已弃用。 |
| `MINDWTR_CLOUD_ALLOW_ANY_TOKEN` | 允许任何语法有效的持有者令牌。 | 仅限明确选择启用。最好不要在受控环境之外使用。 |
| `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` | 启用任意令牌模式时可创建的不同命名空间上限。 | 默认为 `32`；仅为受控自动化环境设置。 |

### 网络与存储

| 变量 | 用途 | 默认值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_CORS_ORIGIN` | CORS 允许的浏览器来源。 | 非生产环境中为 `http://localhost:5173` |
| `MINDWTR_CLOUD_DATA_DIR` | JSON 命名空间、附件和锁的目录。 | `./data` |
| `MINDWTR_CLOUD_TRUST_PROXY_HEADERS` | 信任用于限制认证失败速率的 `X-Forwarded-For`/代理 IP 标头。 | `false` |
| `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` | 信任代理标头时使用的代理 IP 允许列表，以逗号分隔。 | 空；除非直接对等端受信任，否则忽略转发的 IP。 |

### 请求限制

| 变量 | 用途 | 默认值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_MAX_BODY_BYTES` | JSON 请求大小上限。 | `2000000` |
| `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` | 附件上传大小上限。 | `50000000` |
| `MINDWTR_CLOUD_REQUEST_TIMEOUT_MS` | 云端处理程序的每请求超时时间。 | `30000` |
| `MINDWTR_CLOUD_MAX_TASK_TITLE_LENGTH` | 云端任务端点接受的任务标题最大长度。 | `500` |
| `MINDWTR_CLOUD_MAX_TASK_QUICK_ADD_LENGTH` | 云端创建任务接受的快速添加输入最大长度。 | `2000` |
| `MINDWTR_CLOUD_MAX_ITEMS_PER_COLLECTION` | 每个上传集合中的任务/项目/分区/区域上限。 | `50000` |

### 分页与列表整形

| 变量 | 用途 | 默认值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_LIST_DEFAULT_LIMIT` | 列表端点的默认页面大小。 | `200` |
| `MINDWTR_CLOUD_LIST_MAX_LIMIT` | 列表端点页面大小的硬上限。 | `1000` |

### 速率限制

| 变量 | 用途 | 默认值 |
| --- | --- | --- |
| `MINDWTR_CLOUD_RATE_WINDOW_MS` | 主速率限制窗口长度。 | `60000` |
| `MINDWTR_CLOUD_RATE_MAX` | 每个窗口中非附件请求的上限。 | `120` |
| `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX` | 每个窗口中附件请求的上限。 | 与 `MINDWTR_CLOUD_RATE_MAX` 相同 |
| `MINDWTR_CLOUD_RATE_CLEANUP_MS` | 清理过期内存中速率限制条目的间隔。 | `60000` |
| `MINDWTR_CLOUD_RATE_MAX_KEYS` | 采用类似 LRU 的逐出机制前，内存中保留的不同速率限制键上限。 | `10000` |
| `MINDWTR_CLOUD_AUTH_FAILURE_RATE_MAX` | 触发节流前，每个客户端 IP/窗口内未经授权的尝试上限。 | `30` |

运维指导：

- 使代理请求体限制与 `MINDWTR_CLOUD_MAX_BODY_BYTES` 和 `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` 保持一致。
- 除非只能通过反向代理访问服务器，否则请保持 `MINDWTR_CLOUD_TRUST_PROXY_HEADERS=false`。如果启用，请将 `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` 设置为允许提供转发客户端 IP 的代理地址。
- 如果从 `MINDWTR_CLOUD_TOKEN` 轮换到 `MINDWTR_CLOUD_AUTH_TOKENS`，请记住令牌变更也会改变命名空间键。
- 公共部署应避免使用 `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true`。虽然它受 `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` 限制，但固定令牌允许列表仍是生产环境模式。

## Docker 操作手册

请先参阅 [Docker 部署](/zh-Hans/power-users/docker-deployment)了解支持的 Compose 入口。本节是用于在类似生产环境中运行同一云端容器的运维检查清单。

若要进行仅限本地 HTTP 的冒烟测试，请使用 `docker/compose.yaml`。

对于公共桌面或移动客户端 URL，请使用 HTTPS 技术栈：

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

启动技术栈：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

将 Mindwtr 的“自托管 URL”设置为基础 URL，例如 `https://mindwtr.example.com`。Mindwtr 会自动附加 `/v1/data`。

对于使用 Caddy 内部 CA 的仅局域网主机名，请使用 `Caddyfile.local-https`：

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

每台设备都必须信任 Caddy 的本地根证书，客户端才会接受此证书。对于移动客户端，公共证书通常更简单。

仅局域网技术栈启动后，导出本地根证书：

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

在要与此主机名同步的每台设备上，将该证书安装为受信任的根证书。

最简云端服务结构：

```yaml
services:
  mindwtr-cloud:
    build:
      context: .
      dockerfile: docker/cloud/Dockerfile
    environment:
      MINDWTR_CLOUD_DATA_DIR: /data
      MINDWTR_CLOUD_AUTH_TOKENS: ${MINDWTR_CLOUD_AUTH_TOKENS}
      MINDWTR_CLOUD_CORS_ORIGIN: https://mindwtr.example.com
      MINDWTR_CLOUD_RATE_MAX: "120"
      MINDWTR_CLOUD_ATTACHMENT_RATE_MAX: "120"
    volumes:
      - ./mindwtr-cloud-data:/data
    restart: unless-stopped
```

运维说明：

- 仓库中的 Dockerfile 使用多阶段运行时镜像，并通过摘要固定 Bun 基础镜像，以实现可重复构建。
- 将 `/data` 挂载到持久磁盘，而不是临时容器文件系统。
- 将令牌保存在密钥管理器或 git 之外的 `.env` 中。
- 对于 Docker 密钥，请使用 `MINDWTR_CLOUD_AUTH_TOKENS_FILE`，而不要在 compose 中内联令牌。
- 同一个已部署容器在相同主机/端口上同时提供同步和 REST API 流量。

## 反向代理检查清单

在代理层：

- 强制使用 HTTPS。
- 限制请求体大小，使其与云端限制一致。
- 原样转发 `Authorization` 标头。
- 将请求超时设置得足够长，以支持大型附件上传。
- 如有可能，通过 IP/VPN 限制访问。

Caddyfile 示例：

```caddyfile
mindwtr.example.com {
  reverse_proxy mindwtr-cloud:8787
}
```

用于仅限局域网内部证书：

```caddyfile
mindwtr.home.arpa {
  tls internal
  reverse_proxy mindwtr-cloud:8787
}
```

nginx 片段示例：

```nginx
client_max_body_size 50m;
proxy_read_timeout 120s;
proxy_send_timeout 120s;
proxy_set_header Authorization $http_authorization;
```

## 备份与恢复

数据格式为每令牌一个 JSON 文件，外加附件文件。

备份：

1. 为 `MINDWTR_CLOUD_DATA_DIR` 创建快照或归档。
2. 保留时间点备份（每日备份 + 每周保留）。
3. 定期验证恢复。

恢复：

1. 停止服务器。
2. 将目录内容恢复到 `MINDWTR_CLOUD_DATA_DIR`。
3. 启动服务器。
4. 检查 `GET /health` 并执行客户端同步验证。

## 附件清理

用户删除附件时，客户端会保留一条 `pendingRemoteDeletes` 记录，直到后端删除成功。这些待处理删除有意不设过期时间，因为在远程删除成功前移除它们可能会遗留私密文件。

Mindwtr Cloud 还为当前 `data.json` 快照不再引用的附件文件提供经认证的孤立文件清理：

```text
POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

如果你希望由服务器清理由正常客户端删除流程之外而变得不可访问的文件，请在恢复操作后运行此端点，或将其作为定期维护任务。该端点仅扫描经过认证的令牌命名空间，并返回已扫描、保留、删除和失败文件路径的数量。

清理会跳过最近五分钟内修改过的附件文件，以免一次上传随后才由 `/v1/data` 引用时，被并发维护任务删除。

## 升级流程

安全的滚动升级流程：

1. 创建备份。
2. 先在预发布或金丝雀环境中部署新版本。
3. 执行冒烟检查：
   - `GET /health`
   - 经认证的 `GET /v1/data`
   - 经认证的 `GET /v1/tasks`
   - 经认证的 `GET /v1/projects`、`GET /v1/areas` 和 `GET /v1/sections`
   - 小型和大型附件的上传/下载
4. 部署到生产环境。
5. 监控日志中的 `rate limit`、`invalid payload` 和 `permission denied` 错误。

## 令牌轮换

推荐的轮换流程：

1. 将新令牌与旧令牌一起添加到 `MINDWTR_CLOUD_AUTH_TOKENS`。
2. 将客户端更新为使用新令牌。
3. 迁移窗口结束后移除旧令牌。

由于令牌哈希会映射命名空间/文件，因此更改令牌会改变存储命名空间。如果需要在新令牌下保持连续性，请有意迁移相应的数据文件/附件目录。

## 可观测性

云端服务器会将结构化 JSON 日志写入 stdout/stderr。

最低日志告警：

- 重复出现 `Unauthorized`
- 频繁出现 `Rate limit exceeded`
- `Cloud data directory is not writable`
- `Invalid remote sync payload`

添加主机/容器指标：

- CPU 和内存
- 数据卷的可用磁盘空间
- p95 请求延迟
- 非 2xx 响应率

时钟说明：

- 服务器会参与 `PUT /v1/data` 的合并与修复，因此主机时钟漂移仍可能影响请求日志和速率限制窗口。请保持启用 NTP 或同等时间同步。
- 合并修复时间戳使用服务器挂钟。这可防止快几分钟的客户端时钟污染服务器生成的修复元数据。

## 故障模式

- 权限错误：卷所有权/权限不匹配。
- CORS 失败：`MINDWTR_CLOUD_CORS_ORIGIN` 错误。
- 令牌不匹配：客户端令牌不在允许列表中。
- 大负载失败：代理层或应用层超出请求体限制。

## 相关页面

- [云端 API](/zh-Hans/developers/cloud-api)
- [云端 API](/zh-Hans/developers/cloud-api)
- [数据与同步](/zh-Hans/data-sync/)
- [Docker 部署](/zh-Hans/power-users/docker-deployment)
