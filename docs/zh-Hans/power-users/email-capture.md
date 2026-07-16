# 邮件收集

把邮件转为收集箱任务。有三条路径：桌面端内置的 IMAP 文件夹收集、适用于任何邮件服务的手机分享面板，以及面向自托管部署的 Cloud API。

相关页面：[Cloud API](/zh-Hans/developers/cloud-api)、[Docker 部署](/zh-Hans/power-users/docker-deployment)

## 内置方式：让桌面应用监视邮件文件夹

让如水桌面端监视你邮箱中的一个文件夹，通过任何客户端把邮件移动或转发到其中，每封邮件就会成为收集箱任务。邮件绝不会经过第三方服务器；桌面应用通过 IMAP 直接连接邮件服务提供方。

在**设置 → 集成 → 邮件收集**中设置：

1. 输入 IMAP 服务器（例如 `imap.gmail.com`）、用户名和**应用专用密码**。普通账户密码通常无法使用；密码会存入系统密钥环
2. 保留默认文件夹 `Mindwtr` 或自行选择；如果邮箱中不存在，系统会创建
3. 开启开关并保存。保存时会验证连接，并立即报告问题
4. 在邮件客户端或 Webmail 中添加规则（或手动拖动），把值得记录的邮件移入该文件夹

桌面应用运行期间会每隔几分钟检查文件夹。主题成为任务标题，发件人和邮件正文成为描述。收集过程只读：如水绝不会修改、移动或删除邮件，并会记住已经导入的邮件，避免重复。你可以随时归档或清理该文件夹。

邮箱就是队列：电脑关闭时进入文件夹的邮件会留在那里，下一次打开如水时会补充导入。如果需要在桌面端完全关闭时也能收集，请使用下方的[自托管方案](#把邮件转发到自托管服务器)。

服务提供方说明：

- **Gmail：**启用两步验证，再创建[应用专用密码](https://myaccount.google.com/apppasswords)；服务器为 `imap.gmail.com`
- **iCloud Mail：**创建[应用专用密码](https://support.apple.com/102654)；服务器为 `imap.mail.me.com`
- **Fastmail 与标准 IMAP 服务器：**创建应用专用密码；使用服务提供方的 IMAP 主机
- **Outlook.com 与 Microsoft 365：**Microsoft 已关闭基于密码的 IMAP，请改用 [Power Automate 方案](#outlook-与-microsoft-365-power-automate)

## 从手机分享邮件

Android 和 iOS 现已支持任何能够分享文字的邮件应用（Outlook、Gmail、Apple Mail 等）：

1. 打开邮件
2. 点按**分享**并选择**如水**
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
3. 标记一封邮件（或放入文件夹），下次同步时它就会出现在如水收集箱中

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

- **n8n / Node-RED：**IMAP 或 Gmail 触发节点连接 HTTP 请求节点
- **Zapier：***Email by Zapier* 入站地址（或 Gmail 触发器）连接 *Webhooks by Zapier* POST 步骤
- **任何常开设备上的脚本：**轮询邮件文件夹并发送每封新邮件
- **邮件服务器上的 Sieve/procmail：**把匹配邮件传给小型脚本

请保护好令牌：持有令牌的任何人都能读写该命名空间中的任务。

## 为什么没有转发地址

如水有意不提供官方托管的转发地址：托管中转意味着让私人邮件经过项目基础设施，不符合本地优先应用的定位。内置文件夹监视让邮件只在你的邮件服务器与设备之间传输。
