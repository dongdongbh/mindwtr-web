# Datos y sincronización

Mindwtr almacena los datos localmente y admite varias opciones de sincronización entre dispositivos.

Mindwtr **no** opera un servicio en la nube alojado. La sincronización es local-first y la configura el usuario: tú eliges cómo se mueve el archivo `data.json` (y `attachments/`) entre dispositivos. Nada se mueve hasta que configuras una de las opciones siguientes. Una vez configurada, sigue funcionando por sí sola.

Las versiones actuales de escritorio y móvil dividen los ajustes en dos páginas:
- **Ajustes → Sincronización** para configurar el backend, las opciones de sincronización, el historial y las instantáneas de recuperación
- **Ajustes → Datos** para copias de seguridad/restauración/importación, limpieza de archivos adjuntos y diagnósticos

Esta página es la guía de configuración y recuperación para usuarios del sitio de documentación. Para consultar las reglas de fusión y los campos de diagnóstico destinados a responsables de mantenimiento, consulta [Algoritmo de sincronización](/es/data-sync/sync-algorithm).

Para la importación de bóvedas y los enlaces profundos de notas en escritorio, consulta [Integración con Obsidian](/es/power-users/obsidian).

---

## Almacenamiento de datos

### Escritorio

Los datos se almacenan en una base de datos SQLite local, con un archivo JSON de sincronización/copia de seguridad:

| Plataforma  | Base de datos (SQLite)                             | JSON (sincronización/copia de seguridad)              |
| ----------- | -------------------------------------------------- | ------------------------------------------------------ |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`                 | `~/.local/share/mindwtr/data.json`                     |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                      | `%APPDATA%/mindwtr/data.json`                          |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db`  | `~/Library/Application Support/mindwtr/data.json`      |

La configuración se almacena por separado:

| Plataforma  | Ubicación                                     |
| ----------- | --------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`               |
| **Windows** | `%APPDATA%/mindwtr/config.toml`               |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

> Las versiones heredadas de Tauri usaban `~/.config/tech.dongdongbh.mindwtr/` y `~/.local/share/tech.dongdongbh.mindwtr/` en Linux. Se migran automáticamente cuando se detectan.

### Móvil

Los datos se almacenan en una base de datos SQLite local, con un archivo JSON de sincronización/copia de seguridad:

- **Base de datos SQLite**: `mindwtr.db`
- **Copia de seguridad JSON**: `data.json`

---

## Backends de sincronización

Mindwtr admite directamente cinco backends de sincronización:

- **Sincronización nativa con iCloud / CloudKit**: sincronización nativa exclusiva de Apple para datos principales y recursos adjuntos donde esté disponible
- **Sincronización de archivos**: una carpeta/archivo seleccionado por el usuario (`data.json` + `attachments/`)
- **Sincronización OAuth con Dropbox**: sincronización directa con la carpeta de aplicación de Dropbox en las versiones compatibles
- **WebDAV**: cualquier endpoint WebDAV compatible
- **Mindwtr Cloud (autohospedado)**: tu propio endpoint `apps/cloud`

### De un vistazo

| Backend | Plataformas | Esfuerzo de configuración | Velocidad relativa | Gestión de conflictos | Ideal para |
| --- | --- | --- | --- | --- | --- |
| **Sincronización de archivos** (carpeta) | Todas | Bajo, elige una carpeta | La más rápida (sistema de archivos sin procesar) | Por archivo; el proveedor de carpetas ve un solo archivo | Syncthing, clientes de unidades en la nube existentes, LAN |
| **WebDAV** | Todas | Medio, URL del servidor + credenciales | Más lenta, un ciclo HTTP por solicitud | Controlada por la aplicación, fusión por elemento | Nextcloud/ownCloud/Fastmail, BYOS remoto |
| **Mindwtr Cloud (autohospedado)** | Todas | Mayor, desplegar `apps/cloud` + token | Rápida, un solo endpoint, el servidor fusiona al escribir | Fusión en la aplicación + el servidor | Varios dispositivos editando simultáneamente |
| **Dropbox** | Versiones compatibles | Bajo, inicio de sesión OAuth | Moderada, API del proveedor | Controlada por la aplicación, fusión por elemento | La opción en la nube más sencilla sin servidor propio |
| **iCloud / CloudKit** | Versiones de Apple | Bajo, activar en Ajustes | Rápida, sincronización por registro | Fusión por registro de CloudKit | Conjuntos de dispositivos solo Apple |

Las diferencias de velocidad importan sobre todo con archivos adjuntos grandes, que WebDAV y Dropbox transfieren como subidas/descargas individuales. Consulta [Ciclo de vida de los datos](/es/data-sync/data-lifecycle) para saber qué se mueve realmente durante una sincronización.

### Control de los datos

| Modo | ¿Sale una copia del dispositivo? | Tú controlas | Copia remota |
| --- | --- | --- | --- |
| **Sincronización desactivada** | No | El dispositivo y sus copias de seguridad | Ninguna |
| **Sincronización de archivos** | Solo si otra herramienta replica la carpeta elegida | La carpeta y cualquier proveedor o dispositivo que la sincronice | `data.json` y los adjuntos de esa carpeta |
| **Dropbox** | Sí | La cuenta de Dropbox conectada | `/Apps/Mindwtr/data.json` y los adjuntos de la carpeta de la aplicación |
| **iCloud / CloudKit** | Sí | El Apple ID y la cuenta de iCloud | Registros de CloudKit y adjuntos |
| **WebDAV** | Sí | El endpoint, la cuenta y las credenciales | `data.json` y los adjuntos de ese servidor WebDAV |
| **Mindwtr Cloud (autohospedado)** | Sí | El despliegue, el almacenamiento y el token de acceso | Datos de sincronización y adjuntos de ese servidor |

La base SQLite local sigue siendo la fuente principal. La sincronización por archivos usa JSON legible y guarda los adjuntos como archivos, así que trata la carpeta, la cuenta del proveedor o el servidor elegidos como almacenamiento de confianza. Mindwtr no ofrece un servicio de sincronización alojado. Las solicitudes directas a Dropbox no pasan por el desarrollador de Mindwtr y los tokens de Dropbox permanecen en tu dispositivo.

En **Ajustes → Sincronización**, las versiones compatibles muestran estas opciones en un único selector de backend y después explican la vía de configuración seleccionada:

- **Sincronización en la nube**: **Dropbox** e **iCloud** en plataformas Apple
- **Sincronización de carpetas/archivos**: **Archivo**
- **Servidor avanzado/personalizado**: **WebDAV** y **Autohospedado**

Las configuraciones existentes de Dropbox siguen funcionando; simplemente se muestran como el backend **Dropbox** de nivel superior dentro de la explicación de **Sincronización en la nube**, en lugar de estar anidadas bajo un selector de proveedor en la nube/autohospedado.

### Compatibilidad directa e indirecta con proveedores

- **Proveedores/protocolos compatibles directamente**: iCloud / CloudKit nativo en versiones compatibles de Apple, servidores WebDAV, el endpoint autohospedado de Mindwtr y OAuth de Dropbox (versiones compatibles).
- **Proveedores compatibles indirectamente**: iCloud Drive, Google Drive, OneDrive, Syncthing, recursos compartidos de red y Dropbox mediante Sincronización de archivos.
- **Importante**: la sincronización nativa con iCloud es **exclusiva de Apple**. Android, Windows y Linux deben usar Sincronización de archivos, WebDAV, Mindwtr Cloud o Dropbox.

**Guía rápida:**
- **Dropbox**: la opción en la nube multiplataforma más sencilla en versiones compatibles; conecta mediante OAuth y Mindwtr usa su carpeta de aplicación de Dropbox.
- **Syncthing**: sincronización de archivos entre dispositivos. Funciona mejor en la misma LAN/subred. Para sincronizar de forma remota, usa un relé de Syncthing o una VPN de malla (Nebula/Tailscale).
- **WebDAV**: usa un proveedor compatible con WebDAV (p. ej., Nextcloud, ownCloud, Fastmail, uno autohospedado).
- **iCloud**: usa la sincronización nativa con iCloud en versiones compatibles de Apple, incluidos los recursos adjuntos, o iCloud Drive mediante Sincronización de archivos.
- **Google Drive/OneDrive**: usa Sincronización de archivos (y aplicaciones puente en Android cuando sean necesarias).

## Recomendaciones de sincronización

- **Sincronización en la nube más fácil y lista para usar:** OAuth de Dropbox en versiones compatibles.
- **Mejor configuración exclusiva de Apple:** iCloud / CloudKit nativo en versiones compatibles de Apple.
- **Mejor sincronización BYOS remota:** WebDAV o Mindwtr Cloud (autohospedado). La aplicación controla el ciclo de sincronización y fusiona por elemento.
- **Sincronización de archivos (Syncthing/Dropbox/etc.):** funciona, pero **los conflictos son por archivo** porque `data.json` es un único archivo.
- **Prácticas recomendadas para la sincronización de archivos:** evita editar en dos dispositivos al mismo tiempo y espera a que termine la sincronización antes de abrir la aplicación en otro dispositivo. Si aparecen conflictos, conserva el `data.json` más reciente y elimina las copias `data.json.sync-conflict-*`.

### Proxy de escritorio

En el escritorio, Mindwtr puede usar un proxy HTTP(S) opcional para solicitudes de red como WebDAV, Dropbox, la sincronización con Cloud autohospedado y las suscripciones a calendarios externos.

Configúralo en **Ajustes → Avanzado → Red → URL del proxy**. Usa una URL completa como `http://proxy-host:port` o `https://proxy-host:port`. Déjalo en blanco para usar el comportamiento de red predeterminado, incluidas las variables de entorno `HTTP_PROXY` / `HTTPS_PROXY` compatibles.

El campo de la aplicación es deliberadamente mínimo: es una única URL de proxy, no un gestor de proxies completo. Ahí no se configuran SOCKS, archivos PAC ni reglas de proxy por backend. El ajuste no se sincroniza entre dispositivos.

## Recuperación de conflictos

Mindwtr suele resolver automáticamente los conflictos entre elementos. Si una tarea que eliminaste reaparece después de sincronizar, la causa más habitual es una edición simultánea en otro dispositivo dentro de la ventana de ambigüedad entre eliminación y elemento activo. Cuando los números de revisión empatan y las horas de las operaciones están separadas por 30 segundos o menos, Mindwtr conserva la edición activa para no descartar trabajo silenciosamente.

Qué hacer:
1. Abre **Ajustes → Sincronización** y comprueba si hay conflictos en el estado/historial de la última sincronización.
2. Si sigues sin querer la tarea devuelta, elimínala de nuevo después de que todos los dispositivos hayan terminado de sincronizar.
3. Si ambos dispositivos siguen sin coincidir, sincroniza manualmente cada dispositivo de uno en uno, conserva la versión que quieras y vuelve a eliminar/restaurar.
4. Si necesitas recuperar datos anteriores, usa **Ajustes → Datos** o **Ajustes → Sincronización → Instantáneas de recuperación** antes de hacer más cambios.

### 1. Sincronización nativa con iCloud / CloudKit (solo Apple)

Mindwtr incluye un backend nativo de **iCloud** en las versiones compatibles de Apple.

- **Guía**: [Sincronización con iCloud](/es/data-sync/icloud)
- **Ideal para**: configuraciones de dispositivos solo Apple donde quieres una experiencia más sencilla que gestionar una carpeta compartida
- **No apto para**: dispositivos Android, Windows o Linux en la misma configuración de sincronización

Este backend está disponible en iPhone, iPad y macOS. Si prefieres una configuración basada en carpetas en macOS, aún puedes usar **iCloud Drive + Sincronización de archivos**.

### 2. Sincronización de archivos

Sincroniza mediante un archivo JSON compartido con cualquier servicio de sincronización basado en carpetas:

- Dropbox
- Google Drive
- Syncthing
- OneDrive
- iCloud Drive
- Cualquier carpeta de red

#### iCloud Drive como sincronización de archivos (macOS + iOS)

iCloud Drive también funciona con Mindwtr mediante **Sincronización de archivos** si quieres sincronizar a través de una carpeta compartida en lugar del backend nativo de CloudKit.

Configuración recomendada:
1. En macOS, crea una carpeta como `iCloud Drive/Mindwtr`.
2. En Mindwtr para escritorio, configura **Backend de sincronización = Archivo** y elige esa carpeta.
3. Exporta una vez para crear `data.json` y `attachments/`.
4. Espera a que iCloud Drive termine de subir los archivos.
5. En iOS, en **Ajustes → Sincronización → Seleccionar carpeta** de Mindwtr para móvil, elige la misma carpeta de iCloud Drive en Archivos.
   - Si un proveedor aparece atenuado en el selector de carpetas de iOS, selecciona cualquier archivo JSON dentro de la carpeta de destino. Mindwtr seguirá usando esa carpeta para `data.json` y `attachments/`.

Importante:
- Sincroniza tanto `data.json` **como** `attachments/`. Los archivos adjuntos forman parte de los datos de sincronización.
- No muevas solo `data.json` sin `attachments/`, o los metadatos/archivos adjuntos pueden divergir.
- Si Optimizar almacenamiento de iCloud descarga los archivos del dispositivo, deja que Archivos vuelva a descargarlos antes de ejecutar una sincronización manual.

#### Marcadores de archivos de iOS para Google Drive, OneDrive y otros proveedores de Archivos

En iOS, Google Drive, OneDrive y proveedores similares se pueden usar mediante **Sincronización de archivos** cuando exponen un archivo en el selector de Archivos. Si no se puede seleccionar la carpeta, elige un archivo JSON existente en la carpeta de destino; Mindwtr almacena un marcador con ámbito de seguridad y lo usa para las lecturas y escrituras posteriores.

Este modo de proveedor con ámbito de archivo sincroniza `data.json`. Las carpetas de archivos adjuntos no están disponibles a través de todos los marcadores de proveedores de Archivos, así que usa iCloud/CloudKit nativo, Dropbox, WebDAV o Cloud autohospedado cuando necesites sincronizar los archivos adjuntos de forma fiable. Si iOS informa de que el acceso del marcador ha caducado, vuelve a seleccionar el archivo de sincronización en **Ajustes → Sincronización**.

#### Notas sobre Syncthing (configuración recomendada)

Syncthing funciona bien con Mindwtr, pero el orden de la configuración inicial importa.
Los dispositivos deben poder comunicarse entre sí: funciona mejor en la misma subred/LAN o mediante un relé/VPN de malla (p. ej., Nebula o Tailscale) si quieres sincronizar de forma remota.

**Flujo recomendado:**
1. Crea una única carpeta de Syncthing (p. ej., `Mindwtr/`) y deja que se sincronice por completo.
2. En el escritorio, elige esa carpeta en **Ajustes → Sincronización** con el backend **Archivo** seleccionado.
3. Usa **Exportar copia de seguridad** a esa carpeta para crear `data.json` y `attachments/`.
4. Espera a que Syncthing termine de sincronizar con el teléfono.
5. En el móvil, selecciona la misma carpeta en **Ajustes → Sincronización**.

**Por qué ves `attachments (1)` / `attachments (2)`**
Syncthing crea carpetas duplicadas cuando ambos dispositivos crean o modifican la misma carpeta al mismo tiempo. Esto ocurre a menudo si ambos dispositivos abren Mindwtr antes de que termine la sincronización inicial.

**Cómo corregir los duplicados:**
1. Elige la carpeta `attachments/` «real» (normalmente la que tenga más archivos).
2. Mueve los archivos de `attachments (1)`/`attachments (2)` a `attachments/`.
3. Elimina las carpetas duplicadas y deja que Syncthing converja.

**Importante:** No sincronices `~/.local/share/mindwtr` directamente. El almacenamiento móvil está aislado. Usa en su lugar la carpeta de sincronización de archivos + `data.json`.
Si ya has sincronizado el directorio de datos de la aplicación, cambia a una carpeta de sincronización dedicada y vuelve a seleccionarla en Ajustes.

#### Google Drive en Android (sincronización de archivos) y alternativa de sincronización de archivos para Dropbox

Google Drive **no** proporciona WebDAV. Si quieres usar Google Drive con la sincronización de archivos en Android, necesitas una aplicación puente que mantenga sincronizada una carpeta local (para que Mindwtr pueda leer/escribir `data.json` directamente).

Los usuarios de Dropbox en Android pueden usar la sincronización nativa con Dropbox en versiones compatibles. Si prefieres la sincronización de archivos, el mismo método de la aplicación puente también funciona con Dropbox.

Ejemplos:
- **Dropsync** (Dropbox)
- **Autosync** (Google Drive)
- **FolderSync** (genérica)

Después, apunta Mindwtr a la carpeta local sincronizada en **Ajustes → Sincronización**.

#### OneDrive en Android (configuración recomendada)

La aplicación oficial de OneDrive para Android **no** mantiene una carpeta local en sincronización bidireccional continua.
Para usar OneDrive de forma fiable con Mindwtr en Android, instala una aplicación «puente»:

- **OneSync (Autosync for OneDrive)**
- **FolderSync**

Después:
1. Crea una carpeta de OneDrive para Mindwtr (en el escritorio).
2. Usa la aplicación puente para sincronizar esa carpeta con una carpeta local en Android.
3. En Mindwtr, selecciona esa carpeta local en **Ajustes → Sincronización** (Mindwtr usará el `data.json` que contiene).

### 3. Sincronización WebDAV

Sincroniza directamente con un servidor WebDAV:

- Nextcloud
- ownCloud
- Fastmail
- Cualquier servidor compatible con WebDAV

Mindwtr ahora crea automáticamente las carpetas superiores ausentes antes del primer `PUT`, por lo que puedes apuntarlo a una carpeta nueva y vacía sin crear manualmente cada nivel de antemano.

WebDAV usa HTTPS para las URL públicas. HTTP sin cifrar solo se permite para destinos locales/privados reconocidos como `localhost`, `127.0.0.1`, `10.x.x.x`, desde `172.16.x.x` hasta `172.31.x.x`, `192.168.x.x`, direcciones IPv6 de bucle invertido/privadas, `*.local` y `*.home.arpa`. Usa HTTPS para DNS personalizados, nombres de host de VPN, Tailscale, ZeroTier y cualquier nombre que no se reconozca como local/privado.

### 4. Mindwtr Cloud (autohospedado)

Para usuarios avanzados, Mindwtr incluye un servidor de sincronización sencillo (`apps/cloud`) que se puede autohospedar.

- **Protocolo**: API REST sencilla (GET/PUT)
- **Autenticación**: token de portador (asignado a un archivo de datos concreto en el servidor)
- **Despliegue**: Node.js/Bun
- **Configuración de Docker**: [Despliegue con Docker](/es/power-users/docker-deployment)
- **Guía de operaciones**: [Despliegue en la nube](/es/data-sync/cloud-deployment)

Nota importante para el cliente:

- **Se requiere HTTPS para las URL públicas de Mindwtr Cloud.** HTTP sin cifrar se permite automáticamente para destinos locales/privados como `localhost`, `127.0.0.1`, `10.x.x.x`, desde `172.16.x.x` hasta `172.31.x.x`, `192.168.x.x`, direcciones IPv6 de bucle invertido/privadas, `*.local` y `*.home.arpa`.
- Si expones Cloud fuera de una LAN de confianza, coloca el servidor detrás de HTTPS con un proxy inverso como `caddy`, `nginx` o `traefik`.
- Usa HTTPS para DNS personalizados, nombres de host de VPN, Tailscale, ZeroTier y cualquier nombre que no se reconozca como local/privado. La opción **Permitir conexiones no seguras (HTTP)** es una opción de compatibilidad para endpoints locales/privados de confianza; no permite usar HTTP público.

### 5. Sincronización OAuth con Dropbox

Mindwtr también admite la sincronización directa con Dropbox en las versiones compatibles de escritorio/móvil.

- **Ámbito**: carpeta de aplicación de Dropbox (`/Apps/Mindwtr/`)
- **Datos sincronizados**: `data.json` y `attachments/*`
- **Autenticación**: OAuth 2.0 + PKCE
- **Configuración**: elige **Dropbox** en **Ajustes → Sincronización**, conecta tu cuenta y después ejecuta **Probar conexión**
- **Guía**: [Sincronización con Dropbox](/es/data-sync/dropbox)

---

## Cómo funciona la sincronización

### Sincronización automática

Mindwtr se sincroniza automáticamente en las situaciones siguientes:

- **Al iniciarse**: poco después de abrir la aplicación.
- **Al cambiar los datos**: poco después de cambiar tareas/proyectos, con una breve espera para que las ediciones rápidas se sincronicen juntas.
- **Al enfocar la aplicación**: cuando la aplicación de escritorio recupera el foco, como máximo cada 30 segundos; también se ejecuta sin ediciones locales para poder obtener rápidamente los cambios remotos.
- **Al desenfocar/enviar al fondo la aplicación**: cuando sales de la aplicación de escritorio, pero solo si hay cambios locales pendientes que enviar.
- **Pulso periódico en escritorio**: cada 15 minutos mientras Mindwtr está en ejecución.

Si una sincronización automática falla, Mindwtr pausa los reintentos automáticos durante unos 60 segundos. La sincronización manual sigue disponible durante ese tiempo de espera.

### Opciones de sincronización de ajustes

Mindwtr puede sincronizar determinadas preferencias entre dispositivos. Configúralas en **Ajustes → Sincronización → Opciones de sincronización de ajustes**.

Las opciones disponibles incluyen:
- **Apariencia** (tema)
- **Idioma y formato de fecha**
- **Preferencias GTD** (hora de planificación predeterminada y límite de tareas de Focus)
- **URL de calendarios externos** (suscripciones ICS)
- **Ajustes de IA** (modelos/proveedores)
- **Filtros guardados** (preajustes de filtros de Focus)

> Las claves de API y las rutas de modelos locales nunca se sincronizan.
> La resolución de conflictos de ajustes se realiza por grupos. Si dos dispositivos editan distintos campos del mismo grupo de ajustes casi al mismo tiempo, la actualización más reciente del grupo puede sobrescribir la anterior.

### Estrategia de fusión

Mindwtr usa **Last-Write-Wins (LWW) basado en revisiones** para cada elemento:
- Cada tarea, proyecto, sección y área contiene una marca de tiempo `updatedAt`.
- Cuando están disponibles, los metadatos de revisión (`rev` y `revBy`) se usan antes de recurrir únicamente a las marcas de tiempo.
- Los elementos eliminados de forma lógica (marcas de eliminación) se conservan para que las eliminaciones se propaguen correctamente entre dispositivos.

Los conflictos entre eliminación y elemento activo usan la **hora de la última operación**, no solo el `updatedAt` sin procesar:
- Para los elementos eliminados, Mindwtr compara `deletedAt` con la última actualización del elemento activo.
- Si la eliminación y la edición activa están separadas por más de 30 segundos, gana la operación más reciente.
- Dentro de esa ventana de ambigüedad de 30 segundos, sigue ganando un número de revisión mayor cuando está disponible. De lo contrario, Mindwtr conserva el elemento activo en lugar de dejar que la marca de eliminación gane de inmediato.
- Efecto práctico: si eliminas una tarea en un dispositivo unos 30 segundos antes o después de editarla en otro, la tarea editada y activa puede reaparecer tras la sincronización. Elimínala de nuevo después de que los dispositivos se hayan sincronizado si querías quitarla.

Las marcas de tiempo futuras desviadas más de 5 minutos respecto al reloj de fusión se limitan durante las comprobaciones de seguridad de la fusión para que un reloj incorrecto de un dispositivo no domine para siempre. Si ambos lados se limitan por estar en el futuro, Mindwtr sigue conservando su orden relativo en lugar de tratarlos como un empate falso.

Los desempates detallados de la fusión, el comportamiento de los reintentos y los ejemplos de conflictos están en [Algoritmo de sincronización](/es/data-sync/sync-algorithm). Esta página conserva únicamente el resumen operativo y de almacenamiento.

### Visibilidad de conflictos y desviación del reloj

Después de cada sincronización, Mindwtr almacena estadísticas de sincronización en los ajustes:

- **Conflictos**: número total de conflictos y una pequeña muestra de ID en conflicto
- **Desviación del reloj**: desviación máxima observada entre las marcas de tiempo de los dispositivos
- **Correcciones de marcas de tiempo**: cuando `updatedAt < createdAt`, las marcas de tiempo se corrigen durante la fusión

Puedes ver estos detalles en **Ajustes → Sincronización** (escritorio y móvil). Los valores grandes de desviación suelen indicar que los relojes de los dispositivos no están sincronizados.
En el móvil, las entradas del historial de sincronización están contraídas de forma predeterminada; tócalas para expandirlas.

### Sincronización y limpieza de archivos adjuntos

- Los archivos adjuntos se sincronizan **después** de fusionar los metadatos.
- Los archivos adjuntos ausentes permanecen como marcadores hasta que se descargan.
- Los archivos adjuntos huérfanos se limpian automáticamente (y la limpieza se puede activar manualmente en el escritorio desde **Ajustes → Datos**).
- La limpieza remota de archivos adjuntos tiene en cuenta las referencias locales, no un recuento global de referencias. Si dos dispositivos crean o conservan referencias al mismo archivo adjunto remoto antes de haberse sincronizado entre sí, es posible que un dispositivo aún no conozca la otra referencia. Deja que los dispositivos se sincronicen antes de eliminar archivos adjuntos compartidos y vuelve a adjuntar el archivo si la limpieza elimina una copia remota que otro dispositivo todavía necesita.

---

## Configuración de la sincronización en escritorio

### Sincronización de archivos

1. Abre **Ajustes → Sincronización**
2. Configura **Backend de sincronización** como **Archivo**
3. Haz clic en **Cambiar ubicación** y selecciona una carpeta de tu servicio de sincronización
4. Haz clic en **Guardar**

Mindwtr se sincronizará automáticamente al iniciarse y cuando cambien los datos.

### Sincronización WebDAV

1. Abre **Ajustes → Sincronización**
2. Configura **Backend de sincronización** como **WebDAV**
3. Introduce los datos de tu servidor WebDAV:
   - **URL**: URL de la carpeta; Mindwtr almacenará `data.json` dentro (p. ej., `https://nextcloud.example.com/remote.php/dav/files/user/Mindwtr`)
   - **Nombre de usuario**: tu nombre de usuario de WebDAV
   - **Contraseña**: tu contraseña de WebDAV
4. Haz clic en **Guardar WebDAV**

Si la ruta de la carpeta de destino aún no existe, Mindwtr intentará crear automáticamente las colecciones superiores ausentes antes de subir `data.json`.

> **Nota para Linux:** Si tu sesión de escritorio no proporciona un llavero de Secret Service (por ejemplo, `org.freedesktop.secrets` no está disponible), Mindwtr recurre al almacenamiento local de secretos en `~/.config/mindwtr/secrets.toml`.

> **Consejo:** Para Nextcloud, el formato de la URL es:
> `https://your-server.com/remote.php/dav/files/USERNAME/path/to/folder`
>
> Se admiten URL con puertos explícitos (p. ej., `https://example.com:5000/mindwtr`).

## Configuración de la sincronización en móvil

La sincronización móvil requiere seleccionar manualmente una carpeta de sincronización debido a las restricciones de almacenamiento de Android/iOS.

En iOS, es posible que algunos proveedores en la nube no permitan seleccionar carpetas en Archivos. En ese caso, selecciona cualquier archivo JSON dentro de la carpeta de sincronización de destino; Mindwtr resolverá y usará la ruta de la carpeta para sincronizar.

### 1. Exporta primero tus datos

1. Ve a **Ajustes → Datos**
2. Toca **Exportar copia de seguridad**
3. Guarda el archivo en tu carpeta de sincronización (p. ej., Google Drive)

### 2. Selecciona la carpeta de sincronización

1. En **Ajustes → Sincronización**
2. Toca **Seleccionar carpeta**
3. Ve a tu carpeta de sincronización
4. Selecciona la carpeta que contiene (o contendrá) `data.json`

### 3. Sincronización automática

Ahora el móvil se sincroniza automáticamente:
- Cuando la aplicación pasa a segundo plano
- 5 segundos después de cambiar los datos
- Al volver a la aplicación (si han pasado >30 segundos)

También puedes tocar **Sincronizar** manualmente en cualquier momento desde Ajustes.

---

## Puente de sincronización SQLite + JSON

Mindwtr usa SQLite como almacén local principal. `data.json` es la instantánea de sincronización y copia de seguridad, no una segunda fuente de verdad equivalente.

- **Inicio en frío/lecturas normales**: la aplicación lee el almacenamiento local respaldado por SQLite.
- **Sincronización saliente**: primero se escriben los guardados locales pendientes y después se exporta la instantánea actual a `data.json` / almacenamiento remoto.
- **Sincronización entrante**: el JSON externo se valida, normaliza y fusiona con los datos locales, y se vuelve a guardar en el almacenamiento respaldado por SQLite.
- **Diagnósticos de sincronización locales del dispositivo**: campos como `lastSyncStats`, `lastSyncHistory` y los metadatos de recuperación de escrituras remotas pendientes permanecen en el dispositivo y se eliminan de las cargas remotas.

El escritorio y el móvil **no** bloquean la edición durante la sincronización. En su lugar, si los datos locales cambian mientras hay una escritura de sincronización en curso, la aplicación cancela ese ciclo y pone en cola uno nuevo para que no se sobrescriba la instantánea local más reciente.

Consulta [ADR 0009](https://github.com/dongdongbh/Mindwtr/blob/main/docs/adr/0009-sqlite-json-sync-bridge.md) para conocer el contrato completo.

---

## Flujo de trabajo de sincronización

### Dos dispositivos

**Configuración inicial:**
1. Configura el escritorio con la carpeta de sincronización
2. Exporta una copia de seguridad y guárdala en la carpeta de sincronización
3. En el móvil, selecciona esa carpeta

**Uso diario:**
1. Haz cambios en el dispositivo A
2. Espera a que el servicio de sincronización los replique
3. En el dispositivo B, activa la sincronización (Ajustes → Sincronización)

### Varios dispositivos

Se aplica el mismo flujo de trabajo. Evita editar simultáneamente en varios dispositivos para prevenir conflictos.

---

## Lista de comprobación para solucionar problemas

- **Confirma que `data.json` existe** en tu carpeta de sincronización y se está actualizando.
- **Espera a que Syncthing termine de sincronizar** antes de abrir Mindwtr en el segundo dispositivo.
- **Usa «Sincronizar» manualmente** en Ajustes si quieres enviar y obtener cambios de inmediato.
- **Busca carpetas de archivos adjuntos duplicadas** (`attachments (1)`, etc.) y combínalas.
- **Asegúrate de que los relojes de los dispositivos sean correctos** (una desviación grande causa conflictos).
- **Comprueba los permisos de la carpeta** (el SAF de Android puede bloquear el acceso de escritura a algunas carpetas).

---

## Copia de seguridad y exportación

### Exportar datos

**Escritorio:**
- Usa **Ajustes → Datos → Exportar copia de seguridad**
- Los backends de sincronización también mantienen `data.json` actualizado automáticamente cuando la sincronización está activada

**Móvil:**
1. Ve a **Ajustes → Datos**
2. Toca **Exportar copia de seguridad**
3. Guarda el archivo en la ubicación que quieras

### Restaurar desde una copia de seguridad

Mindwtr puede restaurar los datos locales directamente desde un archivo JSON de copia de seguridad tanto en el escritorio como en el móvil.

Flujo:
1. Abre **Ajustes → Datos**
2. Elige **Restaurar copia de seguridad**
3. Selecciona un archivo JSON de copia de seguridad de Mindwtr
4. Revisa el resumen de la copia de seguridad y confirma

Antes de restaurar, Mindwtr valida el archivo y crea una instantánea de recuperación cuando la plataforma lo permite. La restauración sustituye por completo los datos locales, no es una fusión.

- **Escritorio**: se crea una instantánea de recuperación en la carpeta de instantáneas de datos de la aplicación antes de restaurar
- **Móvil**: se crea una instantánea de recuperación local en el almacenamiento de la aplicación antes de restaurar
- **Si el archivo no es válido**: la restauración se bloquea y tus datos actuales no se modifican

Consulta [Copia de seguridad y restauración](/es/data-sync/backup-restore) para conocer el flujo detallado.

## Importaciones y migraciones

Usa estas guías cuando incorpores a Mindwtr datos de tareas de otra aplicación. Las importaciones añaden datos a Mindwtr; no configuran la sincronización.

### Importación CSV / ZIP de TickTick

Mindwtr puede importar copias de seguridad de TickTick desde **Ajustes → Datos → Importar desde TickTick**.

- Admite copias de seguridad **CSV** de TickTick y copias de seguridad **ZIP** que contengan la exportación CSV
- Crea áreas de Mindwtr a partir de las carpetas de TickTick
- Crea proyectos de Mindwtr a partir de las listas de TickTick
- Conserva el estado, las fechas, las prioridades, las etiquetas, las notas y la recurrencia de las tareas compatibles
- Convierte los datos de listas de comprobación/subtareas compatibles en elementos de lista de comprobación de Mindwtr

Consulta [Importación de TickTick](/es/import/ticktick) para obtener detalles y las asignaciones compatibles.

### Importación CSV / ZIP de Todoist

Mindwtr puede importar exportaciones de Todoist desde **Ajustes → Datos → Importar desde Todoist**.

- Admite una única exportación CSV de Todoist o una copia de seguridad ZIP que contenga varios CSV de proyectos
- Crea proyectos de Mindwtr a partir de los proyectos de Todoist
- Conserva las secciones de Todoist como secciones de Mindwtr
- Convierte las subtareas de Todoist en elementos de lista de comprobación
- Deja las tareas importadas en **Bandeja de entrada** para que puedas procesarlas mediante tu flujo GTD habitual

Las planificaciones recurrentes de Todoist no se recrean automáticamente. Mindwtr importa la tarea una vez y conserva el texto original de recurrencia en la descripción.

Consulta [Importación de Todoist](/es/import/todoist) para obtener detalles y las asignaciones compatibles.

### Importación JSON / ZIP de DGT GTD

Mindwtr puede importar exportaciones de DGT GTD desde **Ajustes → Datos → Importar desde DGT GTD**.

- Admite una exportación JSON de DGT GTD o un archivo ZIP que contenga el archivo JSON exportado
- Crea áreas de Mindwtr a partir de las carpetas de DGT
- Crea proyectos de Mindwtr a partir de los proyectos de DGT
- Conserva las listas de comprobación de DGT como tareas de lista de comprobación de Mindwtr
- Conserva los contextos y las etiquetas de DGT en las tareas importadas
- Mantiene las reglas de repetición compatibles y advierte cuando un patrón de repetición de DGT debe importarse una vez conservando el texto original

Las tareas independientes de DGT permanecen en Mindwtr sin tener que incluirlas en proyectos nuevos, para que puedas organizarlas después si es necesario.

Consulta [Importación de DGT GTD](/es/import/dgt-gtd) para obtener detalles y las asignaciones compatibles.

### Importación CSV / JSON / ZIP de OmniFocus

Mindwtr puede importar exportaciones de OmniFocus desde **Ajustes → Datos → Importar desde OmniFocus**.

- Admite exportaciones **CSV** de OmniFocus, incluidos archivos CSV UTF-8 y UTF-16
- Admite exportaciones **JSON** de Omni Automation / Atajos y archivos **ZIP**
- Crea áreas de Mindwtr a partir de las carpetas de OmniFocus cuando hay metadatos disponibles
- Crea proyectos de Mindwtr a partir de los proyectos de OmniFocus o de los nombres de proyectos referenciados
- Mantiene las acciones independientes de OmniFocus fuera de proyectos para que puedas organizarlas más tarde
- Conserva las notas, etiquetas, fechas de aplazamiento, fechas de vencimiento, estado de finalización y recurrencia compatibles de OmniFocus de la ruta JSON
- Convierte las tareas anidadas sencillas en elementos de lista de comprobación cuando es posible y aplana las jerarquías más profundas conservando la ruta original

Si la fidelidad de la recurrencia o la jerarquía es importante, usa la ruta JSON / ZIP de Omni Automation en lugar de CSV. Las fechas planificadas y el texto de duración se conservan en la descripción importada cuando Mindwtr no tiene un campo directo para ellos.

Consulta [Importación de OmniFocus](/es/import/omnifocus) para obtener detalles y las asignaciones compatibles.

### Importación de Recordatorios de Apple (iOS)

En iPhone y iPad, Mindwtr puede importar recordatorios incompletos de Apple desde **Ajustes → Datos → Importar desde Recordatorios de Apple**.

- Elige la lista de Recordatorios de Apple que usarás como fuente de captura
- Añade recordatorios incompletos nuevos a la **Bandeja de entrada** de Mindwtr
- Conserva los títulos y las notas de los recordatorios como títulos y descripciones de tareas
- Omite los recordatorios completados, sin título y ya importados
- Opcionalmente, puede eliminar los recordatorios importados de Recordatorios de Apple después de que Mindwtr los añada a la Bandeja de entrada

La importación de Recordatorios de Apple es una vía de importación unidireccional, no un backend de sincronización.

### Estrategia de copias de seguridad

- Exporta periódicamente a la carpeta de sincronización
- Mantén una copia de seguridad de la carpeta local de configuración
- El archivo de sincronización sirve como copia de seguridad
- Las instantáneas de recuperación se guardan automáticamente antes de las operaciones de restauración/importación

---

## Solución de problemas

### La sincronización no funciona

1. **Comprueba la ruta de la carpeta de sincronización**
   - Asegúrate de que la ruta exista y sea accesible
   - Comprueba los permisos

2. **Comprueba el servicio de sincronización**
   - ¿Dropbox/Google Drive está en ejecución?
   - ¿El archivo se ha sincronizado entre los dispositivos?

3. **Errores de archivo temporal**
   - Si un servicio de sincronización está escribiendo en ese momento (p. ej., Syncthing), el JSON puede ser temporalmente no válido.
   - Espera un momento y vuelve a sincronizar.

4. **Sincronización manual**
   - Haz clic en Sincronizar ahora (escritorio) o Sincronizar (móvil)
   - Comprueba si hay mensajes de error

### Conflictos de datos

Si ves datos inesperados:
1. Exporta una copia de seguridad de los datos actuales
2. Busca el archivo más reciente en la carpeta de sincronización
3. Revísalo y fusiónalo manualmente si es necesario

### No se encuentra el archivo de sincronización en el móvil

1. Asegúrate de que el archivo exista en tu carpeta en la nube
2. Vuelve a seleccionar el archivo en Ajustes → Sincronización
3. Comprueba los permisos del archivo

### Restablecer la sincronización

Para empezar de cero:
1. Elimina el contenido de la carpeta de sincronización
2. Exporta desde un dispositivo
3. Importa/sincroniza en los demás dispositivos

---

## Formato de datos

La estructura del archivo `data.json`:

```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "next",
      "contexts": ["@home"],
      "tags": ["#focused"],
      "dueDate": "2025-01-15T09:00:00Z",
      "recurrence": {
        "rule": "weekly",
        "strategy": "strict",
        "byDay": ["MO", "WE"]
      },
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z",
      "deletedAt": null
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "title": "Project name",
      "status": "active",
      "color": "#3B82F6",
      "areaId": "area-uuid",
      "tagIds": ["#client", "#feature"],
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "sections": [
    {
      "id": "uuid",
      "projectId": "project-uuid",
      "title": "Section title",
      "order": 1,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "areas": [
    {
      "id": "uuid",
      "name": "Research",
      "color": "#3B82F6",
      "icon": "🔬",
      "order": 0,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "people": [
    {
      "id": "uuid",
      "name": "Alex",
      "note": "Design lead",
      "referenceLink": "https://example.com/alex",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
```

---

## Privacidad

- Todos los datos se almacenan localmente en tu dispositivo
- La sincronización se realiza mediante tu propio servicio en la nube
- Los datos de tareas y proyectos, las notas, los archivos adjuntos y el contenido de sincronización no se envían a los servidores de Mindwtr
- Las versiones configuradas con análisis de pulso pueden enviar un pequeño evento sobre el estado de la aplicación; no incluye contenido de tareas, proyectos, notas, archivos, indicaciones para la IA ni cuentas. Consulta la [Política de privacidad](https://mindwtr.app/privacy).
- Tú controlas completamente tus datos

---

## Consulta también

- [Guía de usuario para escritorio](/es/use/desktop)
- [Guía de usuario para móvil](/es/use/mobile)
- [Primeros pasos](/es/start/getting-started)
- [Archivos adjuntos](/es/use/attachments)
