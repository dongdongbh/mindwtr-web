# WebDAV 同步

WebDAV 同步适合希望使用标准、自主管控的存储端点，又不想运行 Mindwtr Cloud 服务器的用户。

## 何时使用

以下情况适合使用 WebDAV：

- 你已经拥有 WebDAV 服务器
- 你需要跨平台同步
- 你偏好自己掌控的基础设施
- 你能自行管理服务器 URL 和凭据

## 设置清单

1. 导出一份备份。
2. 在 WebDAV 服务器上为 Mindwtr 创建专用文件夹。
3. 在 Mindwtr 中输入服务器 URL 和凭据。
4. 在第一台设备上执行手动同步。
5. 再连接一台设备，确认测试任务能够双向同步。

::: tip 使用专用文件夹
请预留一个仅用于 Mindwtr 同步数据的文件夹，不要把应用同步文件和无关文档混在一起。
:::

::: warning Nextcloud 和 ownCloud 地址
请填写 WebDAV 地址，而不是浏览器页面地址。在 Nextcloud 中打开“文件”→“文件设置”，复制 WebDAV URL（形如 `https://server/remote.php/dav/files/USERNAME/`）。包含 `/apps/files` 的地址指向网页界面，无法同步。
:::

## 故障排除

- 确认 URL 指向可写文件夹。
- 检查服务器证书是否有效。
- 确认具备上传和覆盖权限。
- 留意服务提供方的速率限制或文件锁定。
- 删除服务器端文件前先导出备份。
