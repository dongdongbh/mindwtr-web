# Despliegue con Docker

Mindwtr ofrece compatibilidad oficial con Docker para ejecutar:
- **mindwtr-app**: La compilación web/PWA de escritorio, servida por Nginx.
- **mindwtr-cloud**: El servidor ligero de sincronización y la API REST de automatización de tareas.

Están disponibles como imágenes de Docker y se pueden orquestar fácilmente mediante Docker Compose.

---

## Inicio rápido (Docker Compose)

No necesitas clonar el repositorio. Las imágenes oficiales se publican en GHCR, y el archivo `compose.yaml` las descarga por ti.

1. **Descarga el archivo compose**:
   ```bash
   curl -LO https://raw.githubusercontent.com/dongdongbh/Mindwtr/main/docker/compose.yaml
   ```

2. **Crea un archivo `.env` junto a él** (Docker Compose lo lee automáticamente):
   ```dotenv
   MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
   MINDWTR_CLOUD_CORS_ORIGIN=http://localhost:5173
   ```

3. **Descarga e inicia los servicios**:
   ```bash
   docker compose pull
   docker compose up -d
   ```

4. **Accede a los servicios**:
   - **PWA (aplicación web):** Abre `http://localhost:5173` en tu navegador.
   - **Comprobación de estado de Cloud:** Abre `http://localhost:8787/health`.
   - **URL autoalojada para pruebas locales:** `http://localhost:8787`
   - **URL base de la API REST:** `http://localhost:8787/v1`

Si prefieres compilar las imágenes desde el código fuente, clona el repositorio y ejecuta `docker compose -f docker/compose.yaml up --build -d` desde su raíz. Consulta [Compilación manual](#compilacion-manual) más abajo.

Este archivo Compose predeterminado usa únicamente HTTP y está pensado para pruebas locales o privadas. Los clientes de escritorio y móviles de Mindwtr solo aceptan HTTP para destinos locales o privados reconocidos, como `localhost`, `127.0.0.1`, `10.x.x.x`, desde `172.16.x.x` hasta `172.31.x.x`, `192.168.x.x`, direcciones IPv6 de bucle local o privadas, `*.local` y `*.home.arpa`.

Para URL públicas, nombres DNS personalizados, nombres de host de VPN, Tailscale, ZeroTier o cualquier nombre que no se reconozca como local o privado, usa HTTPS, o activa **Permitir conexiones inseguras (HTTP)** en los ajustes de sincronización de la app para aceptar ese nombre de host por HTTP sin cifrar. Los datos viajan entonces sin cifrar, así que úsala solo en una red de confianza.

---

## Configuración de HTTPS con Caddy

Para la sincronización pública desde equipos de escritorio o dispositivos móviles, usa el archivo Compose respaldado por Caddy:

```bash
cp docker/.env.https.example docker/.env.https.local
```

Edita `docker/.env.https.local`:

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.example.com
MINDWTR_CLOUD_AUTH_TOKENS=your_long_random_token
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.example.com
MINDWTR_CADDYFILE=Caddyfile.https
```

Inicia el conjunto de servicios:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

Comprueba el servidor:

```bash
curl https://mindwtr.example.com/health
```

En Ajustes de Mindwtr -> Sincronización -> Autoalojado, establece la URL autoalojada en:

```text
https://mindwtr.example.com
```

Mindwtr añadirá `/v1/data` automáticamente.

### HTTPS público

Usa `Caddyfile.https` cuando `MINDWTR_CLOUD_DOMAIN` sea un nombre DNS público que apunte a este host de Docker. Los puertos 80 y 443 deben ser accesibles para la emisión automática de certificados. Caddy obtiene y renueva el certificado, y actúa como proxy inverso de las solicitudes hacia `mindwtr-cloud`.

### HTTPS solo para LAN

Usa `Caddyfile.local-https` cuando el nombre de host solo se resuelva en tu red doméstica:

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

Esto usa la autoridad de certificación interna de Caddy. Cada dispositivo cliente debe confiar en el certificado raíz local de Caddy antes de que Mindwtr acepte la conexión HTTPS. Los certificados públicos de Let's Encrypt son la opción más fiable para los clientes móviles.

Después de iniciar el conjunto de servicios solo para LAN, exporta el certificado raíz local de Caddy:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

Instala ese certificado como raíz de confianza en cada dispositivo que vaya a sincronizarse con este nombre de host.

---

## Configuración

### Token de sincronización
El servidor en la nube requiere un token para la autenticación. Debes establecerlo en las variables de entorno.

En `docker/compose.yaml` (o mediante una variable de entorno), establece:

```yaml
MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
```

`MINDWTR_CLOUD_TOKEN` sigue siendo compatible por retrocompatibilidad, pero está obsoleto.

Para usar secretos de Docker, puedes montar un archivo y apuntar a él:

```yaml
MINDWTR_CLOUD_AUTH_TOKENS_FILE: /run/secrets/mindwtr_cloud_tokens
```

**Generar un token:**
Puedes generar un token aleatorio seguro con:
```bash
cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 50 | head -n 1
```

### Configuración del cliente
Para conectar tus clientes de Mindwtr (de escritorio o móviles) a esta nube autoalojada:

1. Ve a **Ajustes → Sincronización**.
2. Selecciona **Autoalojado** (o Cloud).
3. Establece la **URL autoalojada** en el endpoint base de tu servidor:
   ```
   http://localhost:8787
   ```
   *Mindwtr añadirá `/v1/data` automáticamente a esta URL.*
4. Introduce el **mismo token** que configuraste en `MINDWTR_CLOUD_AUTH_TOKENS`.

Para HTTP en una LAN privada, usa una dirección local o privada como `http://192.168.1.20:8787`. Para URL públicas, usa la configuración HTTPS con Caddy descrita arriba.

### Sincronización con Dropbox y la PWA de Docker

La imagen de Docker `mindwtr-app` sirve la compilación para navegador/PWA. La sincronización OAuth nativa con Dropbox no está disponible en este entorno de ejecución porque la conexión con Dropbox está implementada por las aplicaciones nativas de escritorio y móviles. Añadir `VITE_DROPBOX_APP_KEY` o `DROPBOX_APP_KEY` mediante `.env`, `env_file`, el entorno de ejecución de Compose o un argumento de compilación de Docker no habilitará Dropbox en Docker.

Para la sincronización alojada en Docker, usa el servidor en la nube autoalojado incluido o WebDAV. Si el endpoint autoalojado está detrás de Authelia u otro proxy SSO interactivo, configura el proxy para permitir que la ruta de sincronización/API de Mindwtr use directamente el token de portador de Mindwtr; la aplicación móvil no puede completar un inicio de sesión de Authelia en el navegador delante de `/v1/data`.

### API de automatización de tareas

El mismo contenedor `mindwtr-cloud` también expone la API REST para automatizar tareas. Usa la misma URL base y el mismo token de portador que la sincronización.

Endpoints habituales:

- `GET /v1/data` y `PUT /v1/data` para la sincronización
- `GET /v1/tasks` y `POST /v1/tasks` para enumerar y crear tareas
- `GET /v1/projects` para los proyectos
- `GET /v1/search?query=...` para buscar tareas y proyectos

Ejemplo:

```bash
curl -X POST http://localhost:8787/v1/tasks \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"input":"Review PR @work /due:tomorrow"}'
```

### Origen CORS (producción)

El servidor en la nube usa `http://localhost:5173` como valor predeterminado para CORS. Para producción, establece:

```yaml
MINDWTR_CLOUD_CORS_ORIGIN=https://your-app-domain.example
```

---

## Persistencia de datos

Para mantener a salvo tus datos en la nube entre reinicios de los contenedores, debes montar un volumen para el directorio de datos.

En tu `compose.yaml`:

```yaml
volumes:
  - ./data:/app/cloud_data
```

---

## Compilación manual

Si prefieres compilar las imágenes tú mismo sin Compose:

**Compilar la PWA:**
```bash
docker build -f docker/app/Dockerfile -t mindwtr-app .
```

**Compilar el servidor en la nube:**
```bash
docker build -f docker/cloud/Dockerfile -t mindwtr-cloud .
```

---

## GitHub Actions y GHCR

El proyecto incluye un flujo de trabajo de GitHub Actions que compila y publica imágenes automáticamente en GitHub Container Registry (GHCR).

**Imágenes oficiales:**
- `ghcr.io/dongdongbh/mindwtr-app:latest`
- `ghcr.io/dongdongbh/mindwtr-cloud:latest`

Las compilaciones preliminares están disponibles con la etiqueta flotante `beta`, que siempre apunta a la versión más reciente (candidata o estable), o se pueden fijar por versión, por ejemplo, `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`. `latest` siempre permanece en la versión estable. Consulta [Únete a los canales beta](/es/start/beta-channels) para conocer las demás plataformas.

El archivo `docker/compose.yaml` está configurado para usar estas imágenes de forma predeterminada, lo que facilita obtener la versión más reciente sin compilarla localmente.

---

## Notas técnicas

- **Servicio de la PWA:** La aplicación web usa renderizado del lado del cliente. El contenedor Nginx está configurado con `try_files` para redirigir todas las solicitudes a `index.html`, lo que evita errores 404 al actualizar la página.
- **Imagen base:** La compilación usa Bun (fijado en v1.3) e incluye las opciones de C++20 que requiere `better-sqlite3`.
