# API de la nube

Mindwtr Cloud expone una pequeña API con token al portador para sincronización, automatización de tareas y transferencia de adjuntos. Está diseñada para despliegues autohospedados y usa el mismo espacio de nombres de tokens que el backend de nube autohospedada.

## Autenticación

Envía un token al portador en cada solicitud `/v1/*`:

```http
Authorization: Bearer <token>
```

En producción, usa `MINDWTR_CLOUD_AUTH_TOKENS` o `MINDWTR_CLOUD_AUTH_TOKENS_FILE`. `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` es solo para automatización controlada y limita los espacios nuevos mediante `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES`.

## Estado

```text
GET /health
```

Devuelve el estado del servidor sin autenticación.

## Sincronización de instantáneas

```text
GET /v1/data
PUT /v1/data
```

`GET /v1/data` devuelve la instantánea del espacio autenticado. Si no existe y se permiten escrituras, el servidor crea una vacía.

`PUT /v1/data` valida el `AppData` subido, lo combina con el espacio existente mediante el algoritmo del núcleo, valida el resultado y lo escribe. No fuerza una sobrescritura. Una respuesta correcta devuelve `{ ok: true, stats, clockSkewWarning }`; `stats` usa la misma estructura de estadísticas que el diagnóstico local.

## Tareas

```text
GET /v1/tasks
POST /v1/tasks
GET /v1/tasks/:id
PATCH /v1/tasks/:id
DELETE /v1/tasks/:id
POST /v1/tasks/:id/complete
POST /v1/tasks/:id/archive
```

Parámetros de lista:

| Parámetro | Función |
| --- | --- |
| `query` | Búsqueda sin distinguir mayúsculas en título y metadatos. |
| `status` | Un estado: `inbox`, `next`, `waiting`, `someday`, `reference`, `done` o `archived`. |
| `all=1` | Incluye tareas completadas. |
| `deleted=1` | Incluye tareas eliminadas de forma reversible. |
| `limit`, `offset` | Tamaño de página y desplazamiento inicial. |

La creación acepta `title` o un `input` de adición rápida, además de `props` opcional. El parche acepta campos compatibles con la validación de nube y aumenta los metadatos de revisión.

## Proyectos, áreas y secciones

```text
GET /v1/projects
POST /v1/projects
GET /v1/projects/:id
PATCH /v1/projects/:id
DELETE /v1/projects/:id

GET /v1/areas
POST /v1/areas
GET /v1/areas/:id
PATCH /v1/areas/:id
DELETE /v1/areas/:id

GET /v1/sections
POST /v1/sections
GET /v1/sections/:id
PATCH /v1/sections/:id
DELETE /v1/sections/:id
```

Todos los endpoints de lista aceptan `limit`, `offset` y `deleted=1`. Las secciones también aceptan `projectId`.

Los campos de referencia deben apuntar a registros activos. El `areaId` de un proyecto debe referirse a un área activa. Usa `areaId: null` para quitarla; `areaId: ""` no es válido. El `projectId` de una sección debe referirse a un proyecto activo.

Al eliminar áreas, proyectos y secciones se usan marcadores y reparación en el servidor para conservar una instantánea válida.

## Buscar

```text
GET /v1/search?query=<text>
```

Devuelve tareas y proyectos activos en listas separadas. Admite `limit` y `offset` compartidos, además de cursores independientes:

| Parámetro | Función |
| --- | --- |
| `taskLimit`, `taskOffset` | Paginar el conjunto de tareas. |
| `projectLimit`, `projectOffset` | Paginar el conjunto de proyectos. |

La respuesta incluye `taskTotal`, `projectTotal` y los valores de cursor efectivos.

## Adjuntos

```text
GET /v1/attachments/:path
PUT /v1/attachments/:path
DELETE /v1/attachments/:path

POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

Las rutas se resuelven dentro del espacio del token autenticado. Las subidas respetan el límite de bytes configurado y las reglas de validación del núcleo.

La limpieza de huérfanos busca archivos sin referencia en `data.json`. Omite los modificados en los últimos cinco minutos para no eliminar una subida que compita con una escritura posterior de la instantánea.

## Adaptador MCP

El auxiliar publicado `mindwtr-mcp` puede usar un endpoint Cloud autohospedado como backend. Configúralo mediante `--cloud-url` y `--cloud-token`, o las variables `MINDWTR_MCP_CLOUD_URL` / `MINDWTR_MCP_CLOUD_TOKEN`.

El modo MCP con nube lee `/v1/data` y ofrece herramientas de lectura para tareas, proyectos, secciones, áreas y personas. Con `--write`, dirige las mutaciones de tareas, proyectos, secciones y áreas a los endpoints REST anteriores. Sigue siendo de solo lectura de forma predeterminada y no convierte Mindwtr Cloud en un servicio MCP alojado.

## Páginas relacionadas

- [Servidor MCP](/es/power-users/mcp)
- [Despliegue en la nube](/es/data-sync/cloud-deployment)
- [Algoritmo de sincronización](/es/data-sync/sync-algorithm)
