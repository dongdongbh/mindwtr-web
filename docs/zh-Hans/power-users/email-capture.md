# 邮件收集

把邮件转为收集箱任务。有三条路径：桌面端内置的 IMAP 文件夹收集、适用于任何邮件服务的手机分享面板，以及面向自托管部署的 Cloud API。

相关页面：[Cloud API](/zh-Hans/developers/cloud-api)、[Docker 部署](/zh-Hans/power-users/docker-deployment)

## 内置方式：让桌面应用监视邮件文件夹

让 Mindwtr 桌面端监视你邮箱中的一个文件夹，通过任何客户端把邮件移动或转发到其中，每封邮件就会成为收集箱任务。邮件绝不会经过第三方服务器；桌面应用通过 IMAP 直接连接邮件服务提供方。

在**设置 → 集成 → 邮件收集**中设置：

1. 输入 IMAP 服务器（例如 `imap.gmail.com`）、用户名和**应用专用密码**。普通账户密码通常无法使用；密码会存入系统密钥环
2. 保留默认文件夹 `Mindwtr` 或自行选择；如果邮箱中不存在，系统会创建
3. 开启开关并保存。保存时会验证连接，并立即报告问题
4. 在邮件客户端或 Webmail 中添加规则（或手动拖动），把值得记录的邮件移入该文件夹

桌面应用运行期间会每隔几分钟检查文件夹。主题成为任务标题，发件人和邮件正文成为描述。收集过程只读：Mindwtr 绝不会修改、移动或删除邮件，并会记住已经导入的邮件，避免重复。你可以随时归档或清理该文件夹。

邮箱就是队列：电脑关闭时进入文件夹的邮件会留在那里，下一次打开 Mindwtr 时会补充导入。如果需要在桌面端完全关闭时也能收集，请使用下方的[自托管方案](#把邮件转发到自托管服务器)。

服务提供方说明：

- **Gmail**：启用两步验证，再创建[应用专用密码](https://myaccount.google.com/apppasswords)；服务器为 `imap.gmail.com`
- **iCloud Mail**：创建[应用专用密码](https://support.apple.com/102654)；服务器为 `imap.mail.me.com`
- **Fastmail 与标准 IMAP 服务器**：创建应用专用密码；使用服务提供方的 IMAP 主机
- **Outlook.com 与 Microsoft 365**：Microsoft 已关闭基于密码的 IMAP，请改用 [Power Automate 方案](#outlook-与-microsoft-365-power-automate)

## Gmail 原型：桌面端与移动端测试版本

Gmail 采集仅供维护者配置的测试版本和指定测试账号使用，尚未在正式发行版本中普遍开放。Google 生产环境验证及邮件衍生数据流审查仍未完成；进展请见 [#1326](https://github.com/dongdongbh/Mindwtr/issues/1326)。

桌面端请打开**设置 → 集成 → Gmail**。Android 或 iOS 应用请打开**设置 → GTD → 收集默认设置 → Gmail**。通过 Google 授权界面连接，核对账号，再选择现有 Gmail 标签。如有需要，请先在 Gmail 中创建标签。连接或选择标签不会导入邮件：必须点击**开始采集 / 保存标签**确认。**立即检查**可请求检查一次。

桌面应用打开时会运行检查。移动端会在打开或返回 Mindwtr 时检查，并在应用保持前台时定期检查；进入后台或关闭后暂停。带标签的邮件会等待下次检查。Android FOSS 版本不包含此功能所需的 Google 授权。

Google 通过 `gmail.readonly` 授予**整个邮箱**的只读访问权限，所选标签仅用于筛选导入内容。Mindwtr 不会发送、更改、移动或删除邮件，不会更改标签，也不会导入文件附件。主题成为任务标题；发件人和有长度限制的正文成为描述。

授权由平台原生代码处理。桌面端和 iOS 将凭据保存在操作系统安全存储中；Android 使用设备上的 Google 授权服务，并在本地保留所选账号。令牌不会进入 JavaScript、任务数据、同步或普通备份与导出。独立的设备本地数据库仅在任务保存成功后记录按账号区分的邮件导入记录；这些记录不会同步。

导入的邮件文本属于普通任务内容，遵循你已有的同步、备份、导出和可选 AI 配置及授权。断开连接不会删除这些服务中已有的副本。对这些后续数据流完成 Google 政策审查，仍是普遍开放此功能的前提。

重新连接同一邮箱或更改标签，会保留防重复记录、任务编辑和仍保留的删除记录。断开连接会保留已导入任务及导入记录。如果重置设备配置，同时彻底清除任务及其删除记录，带标签的旧邮件可能再次导入；请先移除其标签。在此原型中，更名后的邮箱地址视为另一个账号。

断开连接会先停止后续采集并移除本地连接，再尝试撤销 Google 访问权限。已开始的保存可能继续完成。请单独删除不需要的任务、远程副本、备份和导出。如果 Google 无法确认撤销，请在 Google 账号权限中移除 Mindwtr。撤销也可能导致其他设备需要重新连接；重新连接并确认标签后即可恢复。

## 从手机分享邮件

Android 和 iOS 现已支持任何能够分享文字的邮件应用（Outlook、Gmail、Apple Mail 等）：

1. 打开邮件
2. 点按**分享**并选择 **Mindwtr**
3. 记录界面会带着分享的内容打开；保存到收集箱

如果你在手机上处理邮件，这是最快的路径。详情请参阅[移动端应用](/zh-Hans/use/mobile#共享表单)。

## 把邮件转发到自托管服务器

如果运行[自托管云端服务器](/zh-Hans/power-users/docker-deployment)，任何能发送 HTTP 请求的自动化工具都可通过 [`POST /v1/tasks`](/zh-Hans/developers/cloud-api) 创建任务。端点接受普通 `title`，或采用应用内快速添加栏相同语法的快速添加 `input`。

```bash
curl -X POST https://your-server.example/v1/tasks \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Reply to Dana about the contract", "props": {"description": "From: dana@example.com"}}'
```

这些方案只传输文字：主题成为 `title`，发件人或摘要进入 `props.description`。要记录 PDF 等附件，请改用手机分享面板。

请把自动化指向你的云端服务器，而非个人电脑。服务器是始终在线的同步源，因此工作站和手机关闭时仍可收集；设备会在下次同步时取得任务。

### Outlook 与 Microsoft 365：Power Automate

由于 Microsoft 不再允许基于密码的 IMAP 访问，Microsoft 账户最适合通过 Power Automate 使用：

1. 创建一个以**收到新邮件时**为触发器的流，并按旗标、类别或专用文件夹筛选
2. 添加 **HTTP** 操作：方法为 `POST`，URL 为服务器的 `/v1/tasks`，包含 `Authorization: Bearer <token>` 标头，并用 JSON 正文把邮件主题映射到 `title`、发件人或摘要映射到 `props.description`
3. 标记一封邮件（或放入文件夹），下次同步时它就会出现在 Mindwtr 收集箱中

该流在 Microsoft 云端运行，因此电脑关闭时仍可收集。只有你映射的字段会离开邮箱。

### 专用收集地址：Cloudflare Email Workers

如果你的域名使用 [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)，可创建 `todo@your-domain.example` 之类的地址，并将其路由到直接向服务器发送请求的 Email Worker：

```js
export default {
  async email(message, env) {
    const response = await fetch("https://your-server.example/v1/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.MINDWTR_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: message.headers.get("subject") || "Captured email",
        props: { description: `From: ${message.from}` },
      }),
    });
    if (!response.ok) {
      throw new Error(`Mindwtr returned ${response.status}`);
    }
  },
};
```

请将令牌保存为 Worker secret（`wrangler secret put MINDWTR_TOKEN`），绝不要写进脚本。请求失败时抛出错误可使投递明确失败，让发送服务器重试，而不是让邮件悄然消失。若要把邮件正文放入描述，可使用 [postal-mime](https://github.com/postalsys/postal-mime) 等库解析原始 MIME；上面的仅主题版本无需解析。

任何转发到该地址的邮件都会成为收集箱任务。请对地址保密，或在 worker 中添加发件人允许列表，因为发现该地址的任何人都能创建任务。

### Gmail 与其他服务：n8n、Zapier、脚本、规则

任何能够读取邮箱（或直接接收邮件）并发送 HTTP 请求的自动化工具都可采用相同模式：

- **n8n / Node-RED**：IMAP 或 Gmail 触发节点连接 HTTP 请求节点
- **Zapier**：*Email by Zapier* 入站地址（或 Gmail 触发器）连接 *Webhooks by Zapier* POST 步骤
- **任何常开设备上的脚本**：轮询邮件文件夹并发送每封新邮件
- **邮件服务器上的 Sieve/procmail**：把匹配邮件传给小型脚本

请保护好令牌：持有令牌的任何人都能读写该命名空间中的任务。

## 为什么没有转发地址

Mindwtr 有意不提供官方托管的转发地址：托管中转意味着让私人邮件经过项目基础设施，不符合本地优先应用的定位。内置文件夹监视让邮件只在你的邮件服务器与设备之间传输。
