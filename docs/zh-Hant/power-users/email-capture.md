# 電子郵件收集

將電子郵件轉為收集箱任務。共有三種方式：桌面版內建的 IMAP 資料夾收集、適用於任何郵件供應商的手機分享選單，以及供自行託管部署使用的 Cloud API。

相關頁面：[Cloud API](/zh-Hant/developers/cloud-api)、[Docker 部署](/zh-Hant/power-users/docker-deployment)

## 內建功能：從桌面版監看郵件資料夾

讓 Mindwtr 桌面版監看你自己信箱中的資料夾；從任何用戶端將郵件移入或轉寄至該資料夾，每封郵件就會成為收集箱任務。郵件絕不會經過第三方伺服器；桌面版會透過 IMAP 直接與郵件供應商通訊。

請在**設定 → 整合 → 電子郵件收集**中設定：

1. 輸入 IMAP 伺服器（例如 `imap.gmail.com`）、使用者名稱及**應用程式密碼**。一般帳號密碼通常無法使用；密碼會儲存在系統鑰匙圈中
2. 保留預設資料夾 `Mindwtr` 或選擇自己的資料夾；若信箱中尚不存在，就會自動建立
3. 啟用開關並儲存。儲存時會驗證連線，並立即回報任何問題
4. 在郵件用戶端或網頁郵件中新增規則（也可手動拖移），將值得收集的郵件移入該資料夾

桌面版執行期間，每隔幾分鐘就會檢查該資料夾。郵件主旨會成為任務標題，寄件者及郵件內文則成為描述。收集功能為唯讀：Mindwtr 絕不會修改、移動或刪除郵件，並會記住已匯入的項目，避免重複顯示。你可以隨時封存或清理該資料夾。

信箱就是佇列：電腦關機時放入資料夾的郵件只會留在原處等待；下次 Mindwtr 開啟時便會補上進度。若需要在桌面電腦完全關閉時繼續收集，請使用下方的[自行託管作法](#將電子郵件轉寄至自行託管的伺服器)。

供應商注意事項：

- **Gmail**：啟用兩步驟驗證，再建立[應用程式密碼](https://myaccount.google.com/apppasswords)；伺服器為 `imap.gmail.com`
- **iCloud 郵件**：建立[應用程式專用密碼](https://support.apple.com/102654)；伺服器為 `imap.mail.me.com`
- **Fastmail 及標準 IMAP 伺服器**：建立應用程式密碼；使用供應商的 IMAP 主機
- **Outlook.com 及 Microsoft 365**：Microsoft 已停用密碼式 IMAP，因此請改用 [Power Automate 作法](#outlook-及-microsoft-365-power-automate)

## 從手機分享電子郵件

目前 Android 及 iOS 均可使用，適用於任何能分享文字的郵件 app（Outlook、Gmail、Apple 郵件等）：

1. 開啟電子郵件
2. 點選**分享**並選擇**Mindwtr**
3. 收集畫面會開啟並帶入分享內容；將其儲存至收集箱

若你在手機上處理郵件，這是最快的方式。詳情請參閱[行動版應用程式](/zh-Hant/use/mobile#分享選單)。

## 將電子郵件轉寄至自行託管的伺服器

若你執行[自行託管雲端伺服器](/zh-Hant/power-users/docker-deployment)，任何能傳送 HTTP 要求的自動化工具，都可透過 [`POST /v1/tasks`](/zh-Hant/developers/cloud-api) 建立任務。端點接受純 `title`，或採用與應用程式內快速新增列相同語法的快速新增 `input`。

```bash
curl -X POST https://your-server.example/v1/tasks \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Reply to Dana about the contract", "props": {"description": "From: dana@example.com"}}'
```

這些作法只會傳送文字：主旨成為 `title`，寄件者或摘要則放入 `props.description`。若要收集 PDF 等附件，請改用手機分享選單。

請將自動化工具指向你的雲端伺服器，而不是個人電腦。伺服器是永遠在線的同步來源，因此即使工作站及手機都已關閉，收集仍會繼續運作；裝置下次同步時便會取得任務。

### Outlook 及 Microsoft 365：Power Automate

Microsoft 已不再允許以密碼存取 IMAP，因此 Microsoft 帳號最適合透過 Power Automate 使用：

1. 建立流程，採用 **When a new email arrives** 觸發條件，並篩選旗標、類別或專用資料夾
2. 新增 **HTTP** 動作：方法設為 `POST`、輸入你伺服器的 `/v1/tasks` URL、加入 `Authorization: Bearer <token>` 標頭，並使用 JSON 本文將電子郵件主旨對應至 `title`，將寄件者或摘要對應至 `props.description`
3. 為郵件加上旗標（或將它放入資料夾），下次同步時就會出現在 Mindwtr 的收集箱中

流程會在 Microsoft 雲端執行，因此即使電腦已關閉，收集仍可運作。只有你所對應的欄位會離開信箱。

### 專用收集地址：Cloudflare Email Workers

若你的網域使用 [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)，可建立類似 `todo@your-domain.example` 的地址，並將郵件路由至直接向你伺服器發出 POST 的 Email Worker：

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

請將 token 儲存為 Worker secret（`wrangler secret put MINDWTR_TOKEN`），絕不要寫入指令碼。要求失敗時拋出錯誤，可讓傳送明確失敗，使寄件伺服器得以重試，避免郵件無聲消失。若要在描述中加入郵件內文，可使用 [postal-mime](https://github.com/postalsys/postal-mime) 等函式庫解析原始 MIME；上述僅含主旨的版本不需要解析。

轉寄至該地址的所有內容都會成為收集箱任務。請將地址保密，或在 worker 中加入寄件者允許清單，因為任何發現該地址的人都能建立任務。

### Gmail 及其他服務：n8n、Zapier、指令碼、規則

任何能讀取信箱（或直接接收郵件）並發出 HTTP 要求的自動化工具，都能使用相同模式：

- **n8n / Node-RED**：由 IMAP 或 Gmail 觸發節點連接至 HTTP 要求節點
- **Zapier**：由 *Email by Zapier* 收件地址（或 Gmail 觸發條件）連接至 *Webhooks by Zapier* POST 步驟
- **在任何永遠在線的電腦上執行指令碼**：輪詢郵件資料夾，並發出每封新郵件
- **郵件伺服器上的 Sieve/procmail**：將相符郵件以管道傳給小型指令碼

請妥善保管 token：持有者可以讀寫該 namespace 中的任務。

## 為何不提供轉寄地址

Mindwtr 刻意不提供專案託管的轉寄地址：託管中繼服務會讓私人電子郵件經過專案基礎設施，這不符合在地優先應用程式的原則。內建的資料夾監看功能，讓郵件只在郵件伺服器與你自己的裝置之間傳送。
