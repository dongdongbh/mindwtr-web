# Sincronización con Dropbox

Mindwtr admite sincronización directa con Dropbox en las compilaciones compatibles de escritorio y móvil.

Usa OAuth de Dropbox con acceso de **Carpeta de aplicación**, por lo que Mindwtr solo lee y escribe datos en:

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/*`

---

## Disponibilidad

- **Escritorio (compilaciones oficiales):** compatible.
- **Móvil (compilaciones oficiales):** compatible.
- **Expo Go:** no compatible con OAuth de Dropbox.
- **Compilaciones FOSS:** la sincronización con Dropbox puede estar desactivada.
- **Compilación web Docker/PWA:** no compatible; usa una compilación nativa de escritorio o móvil, sincronización autohospedada o WebDAV.

Si Dropbox está desactivado en tu compilación o usas la PWA servida por Docker, utiliza [Datos y sincronización](/es/data-sync/) (Sincronización de archivos), [Despliegue en la nube](/es/data-sync/cloud-deployment) (autohospedado) o WebDAV.

---

## Configuración para usuarios (compilaciones oficiales)

1. Abre **Ajustes → Sincronizar**.
2. En **Backend de sincronización**, elige **Dropbox**. Mindwtr muestra la ruta seleccionada como **Sincronización en la nube**.
3. Pulsa **Conectar Dropbox** y completa OAuth en el navegador.
4. De vuelta en Mindwtr, usa **Probar conexión**.
5. Ejecuta **Sincronizar**.

Después de la primera sincronización, comprueba que la carpeta de la aplicación existe en Dropbox:

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/`

---

## Configuración para compilaciones propias

Si compilas Mindwtr, debes proporcionar una clave de aplicación de Dropbox durante la compilación.

### 1. Crear una aplicación de Dropbox

En Dropbox App Console:

- Tipo de aplicación: **Scoped access**.
- Tipo de acceso: **App folder**.
- Ámbitos: `files.content.read`, `files.content.write`, `files.metadata.read`.
- Activa el cliente público y el flujo PKCE.

### 2. Añadir URI de redirección

- Móvil: `mindwtr://redirect`.
- Escritorio: `http://127.0.0.1:53682/oauth/dropbox/callback`.

### 3. Inyectar la clave al compilar

- Escritorio: `VITE_DROPBOX_APP_KEY=<your_app_key>`.
- Móvil: `DROPBOX_APP_KEY=<your_app_key>`.

En las compilaciones para Mac App Store, la devolución OAuth de escritorio usa un listener local en `127.0.0.1:53682`, por lo que los permisos de la aplicación deben incluir `com.apple.security.network.server`.

En los flujos de CI/publicación, define estas variables o secretos del repositorio:

- `VITE_DROPBOX_APP_KEY`
- `DROPBOX_APP_KEY`

---

## Solución de problemas

### `Invalid redirect_uri`

Comprueba que la URI mostrada en Mindwtr coincida exactamente con los ajustes de la aplicación de Dropbox.

### HTTP 401 / token no válido

El token ha caducado, fue revocado o pertenece a otra clave de aplicación. Vuelve a conectar Dropbox.

### Dropbox no aparece en Ajustes

Es probable que tu compilación tenga Dropbox desactivado —algo habitual en compilaciones FOSS— o que falte la clave durante la compilación.

### La aplicación parece conectada, pero no sincroniza

Usa primero **Probar conexión**. Si funciona, ejecuta **Sincronizar** y revisa [Diagnóstico y registros](/es/data-sync/diagnostics-logs).

### «No se pudo contactar con el servidor de sincronización» estando en línea

En el móvil este mensaje aparece cuando el dispositivo indica que hay red, pero las solicitudes de Mindwtr a Dropbox siguen fallando. La sincronización usa `content.dropboxapi.com`, mientras que **Probar conexión** solo llega a `api.dropboxapi.com`, así que la prueba puede funcionar aunque la sincronización falle. Comprueba que Mindwtr puede usar datos móviles (iOS: Ajustes > Datos móviles) y si una VPN, un filtro DNS o un cortafuegos bloquea el tráfico de la aplicación.

---

## Seguridad y privacidad

- Mindwtr solo solicita acceso a la carpeta de la aplicación, no a toda la cuenta de Dropbox.
- Los tokens OAuth se guardan localmente en el dispositivo.
- El desarrollador de Mindwtr no actúa como intermediario de las solicitudes ni recibe tu token de Dropbox.

Consulta:

- [Datos y sincronización](/es/data-sync/)
- [Política de privacidad](https://mindwtr.app/privacy)
