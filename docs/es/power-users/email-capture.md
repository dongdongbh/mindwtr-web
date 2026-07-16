# Captura por correo electrónico

Convierte correos en tareas de la Bandeja de entrada. Hay tres vías: vigilar una carpeta IMAP desde el escritorio, compartir desde el teléfono con cualquier proveedor y usar la API de la nube en despliegues autohospedados.

Relacionado: [API de la nube](/es/developers/cloud-api), [Despliegue con Docker](/es/power-users/docker-deployment).

## Opción integrada: vigilar una carpeta desde el escritorio

Indica a Mindwtr para escritorio una carpeta de tu propio buzón, mueve o reenvía mensajes a ella desde cualquier cliente y cada mensaje se convertirá en una tarea. Tu correo nunca pasa por un servidor de terceros: la aplicación se comunica por IMAP directamente con tu proveedor.

Configuración en **Ajustes → Integraciones → Captura por correo**:

1. Introduce el servidor IMAP, por ejemplo `imap.gmail.com`, el nombre de usuario y una **contraseña de aplicación**. Las contraseñas normales no suelen funcionar; la contraseña se guarda en el llavero del sistema.
2. Conserva la carpeta predeterminada `Mindwtr` o elige otra. Se creará en el buzón si no existe.
3. Activa el interruptor y guarda. Al guardar se verifica la conexión y se informa inmediatamente de cualquier problema.
4. En tu cliente o correo web, crea una regla —o arrastra manualmente— para mover a esa carpeta los mensajes que quieras capturar.

Mientras la aplicación está abierta, revisa la carpeta cada pocos minutos. El asunto se convierte en el título y el remitente junto al cuerpo forman la descripción. La captura es de solo lectura: Mindwtr nunca modifica, mueve ni elimina tus mensajes y recuerda cuáles importó para evitar duplicados. Archiva o limpia la carpeta cuando quieras.

El buzón actúa como cola: los mensajes que lleguen con el equipo apagado esperan allí y Mindwtr se pone al día al abrirse. Si necesitas capturar con el escritorio siempre apagado, usa las [recetas autohospedadas](#reenviar-correo-a-un-servidor-autohospedado).

Notas por proveedor:

- **Gmail:** activa la verificación en dos pasos y crea una [contraseña de aplicación](https://myaccount.google.com/apppasswords); servidor `imap.gmail.com`.
- **iCloud Mail:** crea una [contraseña específica](https://support.apple.com/102654); servidor `imap.mail.me.com`.
- **Fastmail y servidores IMAP estándar:** crea una contraseña de aplicación y usa el host IMAP del proveedor.
- **Outlook.com y Microsoft 365:** Microsoft ha desactivado IMAP con contraseña; usa la [receta de Power Automate](#outlook-y-microsoft-365-power-automate).

## Compartir un correo desde el teléfono

Funciona en Android e iOS con cualquier aplicación de correo que comparta texto, como Outlook, Gmail o Apple Mail:

1. Abre el correo.
2. Toca **Compartir** y elige **Mindwtr**.
3. Se abre la captura con el contenido compartido; guárdalo en la Bandeja de entrada.

Es la vía más rápida si procesas el correo en el teléfono. Consulta [Aplicación móvil](/es/use/mobile#hoja-para-compartir).

## Reenviar correo a un servidor autohospedado

Si ejecutas el [servidor de nube autohospedado](/es/power-users/docker-deployment), cualquier automatización capaz de enviar una solicitud HTTP puede crear tareas mediante [`POST /v1/tasks`](/es/developers/cloud-api). El endpoint acepta un `title` sencillo o un `input` de adición rápida con la misma sintaxis de la aplicación.

```bash
curl -X POST https://your-server.example/v1/tasks \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Reply to Dana about the contract", "props": {"description": "From: dana@example.com"}}'
```

Estas recetas solo trasladan texto: el asunto pasa a `title` y el remitente o un fragmento a `props.description`. Para capturar un adjunto como un PDF, usa la hoja para compartir del teléfono.

Dirige la automatización a tu servidor de nube, no a un equipo personal. El servidor es la fuente siempre disponible, así que la captura funciona aunque la estación de trabajo y el teléfono estén apagados; los dispositivos recogerán la tarea al sincronizar.

### Outlook y Microsoft 365: Power Automate

Las cuentas de Microsoft funcionan mejor mediante Power Automate porque Microsoft ya no permite IMAP con contraseña:

1. Crea un flujo con **When a new email arrives**, filtrado por indicador, categoría o carpeta específica.
2. Añade una acción **HTTP**: método `POST`, URL `/v1/tasks` de tu servidor, cabecera `Authorization: Bearer <token>` y cuerpo JSON que asigne el asunto a `title` y el remitente o fragmento a `props.description`.
3. Marca un correo o muévelo a la carpeta; aparecerá en la Bandeja de entrada al sincronizar.

El flujo se ejecuta en la nube de Microsoft, incluso con el equipo apagado. Solo salen del buzón los campos que asignes.

### Una dirección específica: Cloudflare Email Workers

Si tu dominio usa [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/), puedes crear una dirección como `todo@your-domain.example` y dirigirla a un Email Worker que publique directamente en tu servidor:

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

Guarda el token como secreto del Worker (`wrangler secret put MINDWTR_TOKEN`), nunca en el script. Lanzar un error cuando falla la respuesta hace visible el fallo para que el servidor remitente reintente, en vez de perder el mensaje. Para incluir el cuerpo, analiza el MIME sin procesar con una biblioteca como [postal-mime](https://github.com/postalsys/postal-mime); la versión anterior, solo con asunto, no necesita análisis.

Todo lo que reenvíes se convierte en una tarea. Mantén privada la dirección o añade una lista de remitentes permitidos, pues cualquiera que la descubra podría crear tareas.

### Gmail y otros: n8n, Zapier, scripts y reglas

El mismo patrón funciona con cualquier herramienta capaz de leer el buzón —o recibir correo— y hacer una solicitud HTTP:

- **n8n / Node-RED:** activador IMAP o Gmail conectado a un nodo de solicitud HTTP.
- **Zapier:** dirección entrante de *Email by Zapier* —o activador Gmail— conectada a un POST de *Webhooks by Zapier*.
- **Script en un equipo siempre encendido:** consulta una carpeta y publica cada mensaje nuevo.
- **Sieve/procmail en tu servidor:** canaliza los mensajes coincidentes a un script pequeño.

Mantén secreto el token: cualquiera que lo tenga podrá leer y escribir las tareas de ese espacio de nombres.

## Por qué no existe una dirección de reenvío

Mindwtr no ofrece deliberadamente una dirección alojada: un intermediario obligaría a pasar tu correo privado por la infraestructura del proyecto, algo incompatible con una aplicación local-first. La vigilancia integrada mantiene el correo entre tu servidor y tu dispositivo.
