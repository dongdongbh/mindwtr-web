# Despliegue en la nube

Esta página explica cómo ejecutar el servidor `apps/cloud` de forma fiable en entornos autohospedados similares a producción.

## Alcance

- Mindwtr Cloud es un backend autohospedado ligero para sincronización JSON y endpoints de automatización de tareas autenticados mediante token, no una interfaz completa de aplicación alojada.
- Es más adecuado para despliegues de un solo inquilino o pequeños despliegues de confianza.
- Debes ejecutarlo detrás de un proxy inverso HTTPS y con controles estándar de refuerzo del servidor.

Nota sobre compatibilidad de clientes:

- Los clientes de Mindwtr Cloud requieren **HTTPS** para las URL públicas.
- HTTP solo se acepta para destinos locales/privados como `localhost`, `127.0.0.1`, `10.x.x.x`, desde `172.16.x.x` hasta `172.31.x.x`, `192.168.x.x`, direcciones IPv6 de bucle invertido/privadas, `*.local` y `*.home.arpa`.
- Para DNS personalizados, VPN, Tailscale, ZeroTier u otros nombres que no se reconozcan como locales/privados, añade TLS en la capa del proxy inverso.
- La opción **Permitir conexiones no seguras (HTTP)** es solo para endpoints locales/privados de confianza; no permite usar HTTP público.

## Topología de despliegue

Disposición recomendada:

1. El proxy inverso (`nginx`, `caddy`, `traefik`) termina TLS.
2. El contenedor/proceso del servidor en la nube escucha en una interfaz privada.
3. Un volumen persistente almacena `MINDWTR_CLOUD_DATA_DIR`.
4. Las copias de seguridad periódicas crean instantáneas del directorio de datos.

El mismo servicio en la nube gestiona tanto:

- El tráfico de sincronización en `/v1/data`
- Los endpoints de automatización de tareas como `/v1/tasks`, `/v1/projects`, `/v1/areas`, `/v1/sections` y `/v1/search`

`PUT /v1/data` se basa en una fusión, no en una sustitución ciega. El servidor lee la instantánea actual del espacio de nombres, la fusiona con la instantánea subida mediante las reglas normales de sincronización de Mindwtr basadas en revisiones, valida los datos fusionados y después vuelve a escribirlos. Un cliente que suba una vista anterior o parcial no debe esperar borrar registros remotos más recientes por el simple hecho de enviar una carga JSON completa.

Los campos de referencia REST deben apuntar a registros activos. Por ejemplo, crear o modificar un proyecto con un `areaId` cuya área se eliminó de forma lógica devuelve `404 Area not found` en lugar de adjuntar el proyecto a una marca de eliminación. Usa `areaId: null` para quitar el área de un proyecto; las cadenas vacías se rechazan.

Para obtener detalles de las solicitudes y respuestas de cada endpoint, consulta [API de Cloud](/es/developers/cloud-api).

## Base del entorno

Base mínima para producción:

- `MINDWTR_CLOUD_AUTH_TOKENS` configurado con uno o más tokens robustos.
- `MINDWTR_CLOUD_CORS_ORIGIN` configurado con el origen exacto de tu cliente.
- `MINDWTR_CLOUD_DATA_DIR` montado en almacenamiento persistente.
- `MINDWTR_CLOUD_MAX_BODY_BYTES` y `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` ajustados a tu uso.

Opcionales, pero útiles:

- `MINDWTR_CLOUD_RATE_WINDOW_MS`
- `MINDWTR_CLOUD_RATE_MAX`
- `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX`

## Variables de entorno

### Autenticación

| Variable | Propósito | Notas |
| --- | --- | --- |
| `MINDWTR_CLOUD_AUTH_TOKENS` | Lista separada por comas de tokens de portador permitidos. | Configuración recomendada para producción. |
| `MINDWTR_CLOUD_AUTH_TOKENS_FILE` | Ruta a un archivo que contiene tokens de portador. | Útil para secretos de Docker; el contenido del archivo puede coincidir con `MINDWTR_CLOUD_AUTH_TOKENS`. |
| `MINDWTR_CLOUD_TOKEN` | Alias heredado para un único token. | Sigue siendo compatible con versiones anteriores, pero está obsoleto. |
| `MINDWTR_CLOUD_TOKEN_FILE` | Ruta a un archivo que contiene el token único heredado. | Sigue siendo compatible con versiones anteriores, pero está obsoleto. |
| `MINDWTR_CLOUD_ALLOW_ANY_TOKEN` | Permite cualquier token de portador sintácticamente válido. | Solo mediante activación explícita. Es mejor evitarlo fuera de entornos controlados. |
| `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` | Número máximo de espacios de nombres distintos que pueden crearse cuando está activado el modo de cualquier token. | El valor predeterminado es `32`; configúralo solo para entornos de automatización controlados. |

### Red y almacenamiento

| Variable | Propósito | Valor predeterminado |
| --- | --- | --- |
| `MINDWTR_CLOUD_CORS_ORIGIN` | Origen del navegador permitido para CORS. | `http://localhost:5173` fuera de producción |
| `MINDWTR_CLOUD_DATA_DIR` | Directorio para espacios de nombres JSON, archivos adjuntos y bloqueos. | `./data` |
| `MINDWTR_CLOUD_TRUST_PROXY_HEADERS` | Confiar en las cabeceras `X-Forwarded-For`/IP del proxy para limitar la frecuencia de fallos de autenticación. | `false` |
| `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` | Lista separada por comas de IP de proxy permitidas que se usa cuando se confía en las cabeceras del proxy. | Vacío; las IP reenviadas se ignoran salvo que el par directo sea de confianza. |

### Límites de solicitudes

| Variable | Propósito | Valor predeterminado |
| --- | --- | --- |
| `MINDWTR_CLOUD_MAX_BODY_BYTES` | Tamaño máximo de una solicitud JSON. | `2000000` |
| `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` | Tamaño máximo de subida de un archivo adjunto. | `50000000` |
| `MINDWTR_CLOUD_REQUEST_TIMEOUT_MS` | Tiempo de espera por solicitud para los controladores de Cloud. | `30000` |
| `MINDWTR_CLOUD_MAX_TASK_TITLE_LENGTH` | Longitud máxima del título de una tarea que aceptan los endpoints de tareas de Cloud. | `500` |
| `MINDWTR_CLOUD_MAX_TASK_QUICK_ADD_LENGTH` | Longitud máxima de la entrada de añadido rápido que acepta la creación de tareas en Cloud. | `2000` |
| `MINDWTR_CLOUD_MAX_ITEMS_PER_COLLECTION` | Máximo de tareas/proyectos/secciones/áreas por colección subida. | `50000` |

### Paginación y forma de las listas

| Variable | Propósito | Valor predeterminado |
| --- | --- | --- |
| `MINDWTR_CLOUD_LIST_DEFAULT_LIMIT` | Tamaño predeterminado de página para los endpoints de listas. | `200` |
| `MINDWTR_CLOUD_LIST_MAX_LIMIT` | Límite estricto del tamaño de página para los endpoints de listas. | `1000` |

### Limitación de frecuencia

| Variable | Propósito | Valor predeterminado |
| --- | --- | --- |
| `MINDWTR_CLOUD_RATE_WINDOW_MS` | Duración de la ventana principal de limitación de frecuencia. | `60000` |
| `MINDWTR_CLOUD_RATE_MAX` | Máximo de solicitudes sin archivos adjuntos por ventana. | `120` |
| `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX` | Máximo de solicitudes de archivos adjuntos por ventana. | igual que `MINDWTR_CLOUD_RATE_MAX` |
| `MINDWTR_CLOUD_RATE_CLEANUP_MS` | Intervalo para eliminar entradas caducadas de limitación de frecuencia en memoria. | `60000` |
| `MINDWTR_CLOUD_RATE_MAX_KEYS` | Máximo de claves distintas de limitación de frecuencia que se mantienen en memoria antes de una expulsión al estilo LRU. | `10000` |
| `MINDWTR_CLOUD_AUTH_FAILURE_RATE_MAX` | Máximo de intentos no autorizados por IP/ventana del cliente antes de aplicar restricciones. | `30` |

Directrices operativas:

- Mantén los límites de cuerpo del proxy alineados con `MINDWTR_CLOUD_MAX_BODY_BYTES` y `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES`.
- Deja `MINDWTR_CLOUD_TRUST_PROXY_HEADERS=false` salvo que solo se pueda acceder al servidor a través de tu proxy inverso. Si lo activas, configura `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` con las direcciones del proxy a las que se permite proporcionar las IP reenviadas de los clientes.
- Si migras de `MINDWTR_CLOUD_TOKEN` a `MINDWTR_CLOUD_AUTH_TOKENS`, recuerda que los cambios de token también cambian la clave del espacio de nombres.
- Evita `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` en despliegues públicos. Está limitado por `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES`, pero las listas fijas de tokens permitidos siguen siendo el modelo para producción.

## Guía de Docker

Comienza por [Despliegue con Docker](/es/power-users/docker-deployment) para conocer los puntos de entrada compatibles de Compose. Esta sección es la lista de comprobación de operaciones para ejecutar el mismo contenedor de Cloud en entornos similares a producción.

Para una prueba rápida local solo con HTTP, usa `docker/compose.yaml`.

Para URL públicas de clientes de escritorio o móviles, usa la pila HTTPS:

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

Inicia la pila:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

Configura la URL autohospedada de Mindwtr con la URL base, por ejemplo `https://mindwtr.example.com`. Mindwtr añade `/v1/data` automáticamente.

Usa `Caddyfile.local-https` para nombres de host exclusivos de la LAN con la CA interna de Caddy:

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

Todos los dispositivos deben confiar en el certificado raíz local de Caddy para que un cliente acepte este certificado. Los certificados públicos suelen ser más sencillos para los clientes móviles.

Después de iniciar la pila exclusiva para la LAN, exporta el certificado raíz local:

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

Instala ese certificado como raíz de confianza en cada dispositivo que vaya a sincronizar con este nombre de host.

Estructura mínima del servicio en la nube:

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

Notas operativas:

- El Dockerfile del repositorio usa una imagen de ejecución multietapa y fija la imagen base de Bun mediante su resumen para que las reconstrucciones sean reproducibles.
- Monta `/data` en un disco duradero, no en el sistema de archivos efímero del contenedor.
- Guarda los tokens en un gestor de secretos o en un archivo `.env` fuera de git.
- Para secretos de Docker, usa `MINDWTR_CLOUD_AUTH_TOKENS_FILE` en lugar de incluir el token directamente en Compose.
- El mismo contenedor desplegado sirve tanto el tráfico de sincronización como el de la API REST en el mismo host/puerto.

## Lista de comprobación del proxy inverso

En la capa del proxy:

- Exige HTTPS.
- Limita el tamaño del cuerpo de las solicitudes para que coincida con los límites de Cloud.
- Reenvía la cabecera `Authorization` sin cambios.
- Configura un tiempo de espera de solicitud suficientemente alto para las subidas de archivos adjuntos grandes.
- Restringe el acceso por IP/VPN si es posible.

Ejemplo de Caddyfile:

```caddyfile
mindwtr.example.com {
  reverse_proxy mindwtr-cloud:8787
}
```

Para certificados internos exclusivos de la LAN:

```caddyfile
mindwtr.home.arpa {
  tls internal
  reverse_proxy mindwtr-cloud:8787
}
```

Fragmentos de ejemplo para nginx:

```nginx
client_max_body_size 50m;
proxy_read_timeout 120s;
proxy_send_timeout 120s;
proxy_set_header Authorization $http_authorization;
```

## Copias de seguridad y restauración

El formato de datos es un archivo JSON por token más los archivos adjuntos.

Copia de seguridad:

1. Crea una instantánea o archiva `MINDWTR_CLOUD_DATA_DIR`.
2. Conserva copias de seguridad de momentos concretos (retención diaria + semanal).
3. Verifica periódicamente la restauración.

Restauración:

1. Detén el servidor.
2. Restaura el contenido del directorio en `MINDWTR_CLOUD_DATA_DIR`.
3. Inicia el servidor.
4. Comprueba `GET /health` y ejecuta una validación de sincronización del cliente.

## Limpieza de archivos adjuntos

Cuando un usuario elimina un archivo adjunto, los clientes conservan un registro `pendingRemoteDeletes` hasta que la eliminación del backend se completa correctamente. Esas eliminaciones pendientes no caducan de forma intencionada, porque quitarlas antes de una eliminación remota correcta puede dejar archivos privados atrás.

Mindwtr Cloud también proporciona una limpieza autenticada de archivos adjuntos huérfanos que ya no están referenciados por la instantánea `data.json` actual:

```text
POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

Ejecuta esto después de las operaciones de restauración o como tarea de mantenimiento periódica si quieres limpiar en el servidor los archivos que quedaron inaccesibles fuera del flujo normal de eliminación del cliente. El endpoint analiza solo el espacio de nombres del token autenticado y devuelve recuentos de las rutas de archivo analizadas, conservadas, eliminadas y fallidas.

La limpieza omite los archivos adjuntos modificados durante los últimos cinco minutos para que una subida seguida de una referencia posterior en `/v1/data` no pueda ser eliminada por una ejecución de mantenimiento simultánea.

## Procedimiento de actualización

Procedimiento gradual seguro:

1. Crea una copia de seguridad.
2. Despliega primero la versión nueva en un entorno de preproducción o canario.
3. Ejecuta comprobaciones rápidas:
   - `GET /health`
   - `GET /v1/data` autenticado
   - `GET /v1/tasks` autenticado
   - `GET /v1/projects`, `GET /v1/areas` y `GET /v1/sections` autenticados
   - subida/descarga de archivos adjuntos pequeños y grandes
4. Despliega en producción.
5. Supervisa los registros para detectar errores `rate limit`, `invalid payload` y `permission denied`.

## Rotación de tokens

Flujo de rotación recomendado:

1. Añade el token nuevo a `MINDWTR_CLOUD_AUTH_TOKENS` junto al antiguo.
2. Actualiza los clientes con el token nuevo.
3. Elimina el token antiguo después del periodo de migración.

Como el hash del token se asigna al espacio de nombres/archivo, cambiar el token cambia el espacio de nombres de almacenamiento. Si necesitas continuidad con un token nuevo, migra deliberadamente el archivo de datos/directorio de archivos adjuntos correspondiente.

## Observabilidad

El servidor en la nube escribe registros JSON estructurados en stdout/stderr.

Alertas mínimas de registro:

- `Unauthorized` repetidos
- `Rate limit exceeded` frecuentes
- `Cloud data directory is not writable`
- `Invalid remote sync payload`

Añade métricas del host/contenedor:

- CPU y memoria
- espacio libre en el volumen de datos
- latencia p95 de las solicitudes
- tasa de respuestas distintas de 2xx

Nota sobre el reloj:

- El servidor participa en la fusión y reparación durante `PUT /v1/data`, por lo que la desviación del reloj del host aún puede afectar a los registros de solicitudes y a las ventanas de limitación de frecuencia. Mantén activada la sincronización horaria mediante NTP o un equivalente.
- Las marcas de tiempo de reparación de la fusión usan el reloj de pared del servidor. Esto evita que el reloj de un cliente adelantado unos minutos contamine los metadatos de reparación generados por el servidor.

## Modos de fallo

- Errores de permisos: discrepancia en la propiedad/permisos del volumen.
- Errores de CORS: `MINDWTR_CLOUD_CORS_ORIGIN` incorrecto.
- Token no coincidente: el token del cliente no está en la lista de permitidos.
- Errores con cargas grandes: se superaron los límites del cuerpo en la capa del proxy o de la aplicación.

## Páginas relacionadas

- [API de Cloud](/es/developers/cloud-api)
- [Datos y sincronización](/es/data-sync/)
- [Despliegue con Docker](/es/power-users/docker-deployment)
