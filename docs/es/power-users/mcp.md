# Servidor MCP

Mindwtr ofrece un servidor opcional de **MCP (Model Context Protocol)**. Esto te permite conectar agentes de IA (como **Claude Desktop**, **Claude Code**, **OpenAI Codex** o **Gemini CLI**) a tu base de datos local de Mindwtr o a un endpoint autoalojado de Mindwtr Cloud.

Es un servidor **stdio** (sin endpoint HTTP alojado). Los clientes MCP lo inician como subproceso y se comunican mediante JSON-RPC a través de stdin/stdout.

> Referencia canónica: [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md). Mantén esta página alineada con ese archivo cuando cambien las herramientas o los esquemas de MCP.

---

## Binarios de la aplicación frente al asistente MCP

Los binarios de las aplicaciones de escritorio y móviles incluyen la aplicación Mindwtr, pero actualmente **no** incluyen un control de inicio/parada en escritorio. El asistente MCP independiente se publica como [`mindwtr-mcp`](https://www.npmjs.com/package/mindwtr-mcp) y figura en el [Registro MCP](https://registry.modelcontextprotocol.io/) público.

**No** necesitas ejecutar toda la aplicación desde el código fuente para usar MCP. Usa el binario normal de la aplicación de escritorio para tus tareas y deja que tu cliente MCP inicie `mindwtr-mcp` con `npx`, o instálalo globalmente con npm. Haz que el asistente apunte al archivo `mindwtr.db` local de la aplicación de escritorio.

En escritorio, la aplicación muestra la ruta de datos local exacta en **Ajustes -> Sincronización -> Datos locales**. Los binarios móviles no exponen un servidor MCP local.

---

## Requisitos

- **Node.js 22+** para instalaciones sin compilador: la dependencia de SQLite incluye binarios precompilados para Node 22 y versiones posteriores. Node 20 aún puede ejecutar el servidor, pero las instalaciones necesitan herramientas de compilación de C++
- **npm** u otro ejecutor de paquetes de Node para el paquete `mindwtr-mcp` publicado
- Una base de datos local de Mindwtr (`mindwtr.db`) para el modo local, o una URL autoalojada de Mindwtr Cloud y un token de portador para el modo Cloud
- **Bun** solo si ejecutas el asistente desde el árbol de código fuente

### Ubicaciones predeterminadas de la base de datos

- **Linux:** `~/.local/share/mindwtr/mindwtr.db`
- **macOS:** `~/Library/Application Support/mindwtr/mindwtr.db`
- **Windows:** `%APPDATA%\mindwtr\mindwtr.db`

Ruta adicional de macOS para compilaciones aisladas:

- `~/Library/Containers/tech.dongdongbh.mindwtr/Data/Library/Application Support/mindwtr/mindwtr.db`

Puedes sobrescribir la ubicación de la base de datos local con:

- `--db /path/to/mindwtr.db`
- Variable de entorno: `MINDWTR_DB_PATH` o `MINDWTR_DB`

Para el modo Cloud autoalojado, usa:

- `--cloud-url https://mindwtr.example.com` o `MINDWTR_MCP_CLOUD_URL`
- `--cloud-token <token>` o `MINDWTR_MCP_CLOUD_TOKEN`
- `--cloud-allow-insecure-http=true` opcional para despliegues HTTP privados de confianza

---

## Instalación y configuración

Los clientes MCP ejecutan el servidor como subproceso. Debes indicarles **el comando** y pasar los argumentos.

Comando recomendado sin instalación para clientes MCP:

```json
{
  "command": "npx",
  "args": [
    "-y",
    "mindwtr-mcp",
    "--db",
    "/path/to/mindwtr.db"
  ]
}
```

El paquete es de solo lectura de forma predeterminada. Añade `--write` únicamente cuando quieras explícitamente que un cliente de IA añada, actualice, complete o elimine datos de Mindwtr.

### Modo Cloud autoalojado

Usa el modo Cloud cuando ejecutes tu propio servidor Mindwtr Cloud y quieras disponer de herramientas MCP sin exponer un archivo SQLite local:

```bash
npx -y mindwtr-mcp \
  --cloud-url "https://mindwtr.example.com" \
  --cloud-token "$MINDWTR_TOKEN"
```

O usa variables de entorno en la configuración de un cliente MCP:

```json
{
  "command": "npx",
  "args": ["-y", "mindwtr-mcp"],
  "env": {
    "MINDWTR_MCP_CLOUD_URL": "https://mindwtr.example.com",
    "MINDWTR_MCP_CLOUD_TOKEN": "your-token"
  }
}
```

El modo Cloud lee la instantánea actual de `/v1/data` desde tu servidor Cloud autoalojado y expone herramientas de lectura para tareas, proyectos, secciones, áreas y personas. Con `--write`, las escrituras de tareas, proyectos, secciones y áreas pasan por los [endpoints REST](/es/developers/cloud-api) por recurso del servidor Cloud (`POST /v1/tasks`, `PATCH /v1/tasks/:id`, etc.), por lo que cada edición recibe la misma validación y seguimiento de revisiones que las ediciones realizadas desde tus aplicaciones. Sin `--write`, las herramientas de escritura devuelven `read_only`. La edición de personas y la restauración de tareas eliminadas aún no están disponibles en el modo Cloud. Usa el backend de base de datos local para esas operaciones.

Este no es el conector multiusuario alojado que está bloqueado. Sigues ejecutando tú mismo el servidor Cloud y el asistente MCP; Mindwtr no opera un servicio que almacene los datos de tareas de todo el mundo.

Si prefieres una instalación global:

```bash
npm install -g mindwtr-mcp
mindwtr-mcp --db "/path/to/mindwtr.db"
```

### Argumentos principales

- `--db "/path/to/mindwtr.db"`: Ruta a tu base de datos SQLite para el modo local.
- `--write`: Habilita operaciones de escritura (añadir, actualizar, completar y eliminar) en modo local o Cloud. **Sin esta opción, el servidor es de solo lectura.**
- `--cloud-url "https://mindwtr.example.com"`: Usa un endpoint autoalojado de Mindwtr Cloud en lugar de una base de datos local.
- `--cloud-token "<token>"`: Token de portador para el endpoint Cloud autoalojado.
- `--cloud-allow-insecure-http=true`: Permite URL HTTP privadas de confianza cuando se ejecuta intencionadamente sin HTTPS.

### 1. Claude Desktop

Añade una entrada de servidor al archivo de configuración de Claude Desktop.

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "~/.local/share/mindwtr/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

_Nota: Sustituye la ruta de la base de datos por la ruta real de tu base de datos local de Mindwtr._

### 2. Claude Code (CLI)

Puedes añadir el servidor mediante la CLI:

```bash
claude mcp add mindwtr -- \
  npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 3. OpenAI Codex (CLI/extensión del IDE)

Codex lee la configuración del servidor MCP desde `~/.codex/config.toml`. También puedes usar un archivo `.codex/config.toml` limitado al proyecto dentro de un proyecto de confianza. La CLI de Codex y la extensión del IDE comparten esta configuración.

**Línea de comandos:**

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db"
```

Añade `--write` solo si quieres que Codex modifique datos locales de Mindwtr:

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

En la TUI de Codex, ejecuta `/mcp` para confirmar que el servidor está activo.

**Configuración manual:**

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db"
]
```

Con acceso de escritura:

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db",
  "--write"
]
```

### 4. Gemini CLI

Gemini CLI usa `settings.json` (usuario: `~/.gemini/settings.json` o proyecto: `.gemini/settings.json`).

**Línea de comandos:**

```bash
gemini mcp add mindwtr \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

**Configuración manual:**

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "/path/to/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

---

## Ejecución manual

Normalmente no necesitas ejecutarlo de forma manual (el cliente MCP se encarga), pero resulta útil para hacer pruebas.

### Desde npm

```bash
# Read-only
npx -y mindwtr-mcp --db "/path/to/mindwtr.db"

# With write access
npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### Desde el código fuente (Bun)

```bash
# Read-only
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db"

# With write access
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db" --write
```

### Compilar y ejecutar (Node)

```bash
# Build
bun run --filter mindwtr-mcp build

# Run
node apps/mcp-server/dist/index.js --db "/path/to/mindwtr.db"
```

---

## Migración: cambio de nombre de las herramientas (`mindwtr.*` → `mindwtr_*`)

Los nombres de las herramientas ahora usan la notación con guion bajo, como `mindwtr_list_tasks`; los nombres antiguos con notación de punto ya no se documentan.

---

## Herramientas disponibles

Una vez conectado, el agente de IA tiene acceso a estas herramientas. De forma predeterminada, el servidor es de **solo lectura**; pasa `--write` para habilitar cualquier herramienta de escritura.
Solo se admite `--write` para el acceso de escritura (no hay alias alternativos).

| Herramienta                    | Operación            | Requiere `--write` |
| ----------------------- | -------------------- | ------------------ |
| `mindwtr_list_tasks`    | Enumerar tareas           | No                 |
| `mindwtr_list_projects` | Enumerar proyectos        | No                 |
| `mindwtr_get_project`   | Obtener un proyecto    | No                 |
| `mindwtr_list_sections` | Enumerar secciones        | No                 |
| `mindwtr_get_section`   | Obtener una sección    | No                 |
| `mindwtr_list_areas`    | Enumerar áreas           | No                 |
| `mindwtr_list_people`   | Enumerar personas          | No                 |
| `mindwtr_get_person`    | Obtener una persona     | No                 |
| `mindwtr_get_task`      | Obtener una tarea por ID | No                 |
| `mindwtr_add_task`      | Crear una tarea          | Sí                |
| `mindwtr_update_task`   | Actualizar una tarea          | Sí                |
| `mindwtr_complete_task` | Marcar como completada            | Sí                |
| `mindwtr_delete_task`   | Eliminar una tarea de forma lógica     | Sí                |
| `mindwtr_restore_task`  | Restaurar una tarea         | Sí                |
| `mindwtr_add_project`   | Crear un proyecto       | Sí                |
| `mindwtr_update_project`| Actualizar un proyecto       | Sí                |
| `mindwtr_delete_project`| Eliminar un proyecto de forma lógica  | Sí                |
| `mindwtr_add_section`   | Crear una sección       | Sí                |
| `mindwtr_update_section`| Actualizar una sección       | Sí                |
| `mindwtr_delete_section`| Eliminar una sección de forma lógica  | Sí                |
| `mindwtr_add_area`      | Crear un área          | Sí                |
| `mindwtr_update_area`   | Actualizar un área          | Sí                |
| `mindwtr_delete_area`   | Eliminar un área de forma lógica     | Sí                |
| `mindwtr_add_person`    | Crear una persona        | Sí                |
| `mindwtr_update_person` | Actualizar una persona        | Sí                |
| `mindwtr_rename_person` | Cambiar el nombre de una persona        | Sí                |
| `mindwtr_delete_person` | Eliminar una persona de forma lógica   | Sí                |

### Herramientas de lectura

- **`mindwtr_list_tasks`**: Enumera tareas con filtros (estado, proyecto, intervalo de fechas y búsqueda).
- **`mindwtr_list_projects`**: Enumera todos los proyectos.
- **`mindwtr_get_project`**: Obtiene los detalles de un proyecto concreto por ID.
- **`mindwtr_list_sections`**: Enumera las secciones de los proyectos, con filtro opcional por proyecto.
- **`mindwtr_get_section`**: Obtiene los detalles de una sección concreta por ID.
- **`mindwtr_list_areas`**: Enumera todas las áreas.
- **`mindwtr_list_people`**: Enumera los registros de personas gestionadas.
- **`mindwtr_get_person`**: Obtiene los detalles de una persona concreta por ID.
- **`mindwtr_get_task`**: Obtiene los detalles de una tarea concreta por ID.

### Herramientas de escritura (requieren `--write`)

Las herramientas de escritura funcionan tanto con la base de datos local como con un backend Cloud autoalojado, con dos excepciones en modo Cloud: las herramientas de escritura de personas y `mindwtr_restore_task` devuelven un error claro en modo Cloud porque la API de Cloud aún no dispone de endpoints para ellas.

- **`mindwtr_add_task`**: Crea una tarea nueva. Admite lenguaje natural en `quickAdd` (por ejemplo, "Buy milk @errands /due:tomorrow").
- **`mindwtr_update_task`**: Actualiza una tarea existente, incluidos campos de programación como `dueDate`, `startTime`, `reviewAt` e `isFocusedToday` (permite borrar campos con `null`).
- **`mindwtr_complete_task`**: Marca una tarea como completada.
- **`mindwtr_delete_task`**: Elimina una tarea de forma lógica.
- **`mindwtr_restore_task`**: Restaura una tarea eliminada de forma lógica.
- **`mindwtr_add_project`**: Crea un proyecto nuevo, incluidos `dueDate` y `reviewAt` opcionales.
- **`mindwtr_update_project`**: Actualiza un proyecto, incluidos `dueDate` y `reviewAt` opcionales.
- **`mindwtr_delete_project`**: Elimina un proyecto de forma lógica.
- **`mindwtr_add_section`**: Crea una sección dentro de un proyecto.
- **`mindwtr_update_section`**: Actualiza una sección de un proyecto.
- **`mindwtr_delete_section`**: Elimina una sección de un proyecto de forma lógica. Las tareas de esa sección se conservan y core las mueve para que no pertenezcan a ninguna sección.
- **`mindwtr_add_area`**: Crea un área nueva.
- **`mindwtr_update_area`**: Actualiza un área.
- **`mindwtr_delete_area`**: Elimina un área de forma lógica.
- **`mindwtr_add_person`**: Crea una persona gestionada para responsables y tareas en espera.
- **`mindwtr_update_person`**: Actualiza los metadatos de una persona gestionada.
- **`mindwtr_rename_person`**: Cambia el nombre de una persona gestionada y, opcionalmente, actualiza las asignaciones exactas de tareas.
- **`mindwtr_delete_person`**: Elimina una persona gestionada de forma lógica sin borrar las asignaciones de tareas.

Nota sobre el esquema:
- Las herramientas de escritura de tareas cubren `dueDate`, `startTime` y `reviewAt` (al actualizar).
- Las herramientas de escritura de proyectos cubren tanto `dueDate` como `reviewAt`.
- Las herramientas de escritura de personas cubren `name`, `note`, `referenceLink` y actualizaciones opcionales de asignaciones al cambiar el nombre.
- Para consultar las entradas canónicas exactas, usa [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md).

## Matriz de permisos

Usa esta matriz para decidir si ejecutar el servidor en modo de solo lectura o con `--write`.

| Herramienta                    | Acceso a datos          | Tipo de modificación       | Modo de solo lectura | Modo `--write` |
| ----------------------- | -------------------- | ------------------- | -------------- | -------------- |
| `mindwtr_list_tasks`    | Filas de tareas (filtradas) | Ninguna                | Permitido        | Permitido        |
| `mindwtr_list_projects` | Filas de proyectos         | Ninguna                | Permitido        | Permitido        |
| `mindwtr_get_project`   | Un proyecto por ID | Ninguna                | Permitido        | Permitido        |
| `mindwtr_list_sections` | Filas de secciones         | Ninguna                | Permitido        | Permitido        |
| `mindwtr_get_section`   | Una sección por ID | Ninguna                | Permitido        | Permitido        |
| `mindwtr_list_areas`    | Filas de áreas            | Ninguna                | Permitido        | Permitido        |
| `mindwtr_list_people`   | Filas de personas          | Ninguna                | Permitido        | Permitido        |
| `mindwtr_get_person`    | Una persona por ID  | Ninguna                | Permitido        | Permitido        |
| `mindwtr_get_task`      | Una tarea por ID    | Ninguna                | Permitido        | Permitido        |
| `mindwtr_add_task`      | Tabla de tareas           | Inserción              | Denegado         | Permitido        |
| `mindwtr_update_task`   | Tabla de tareas           | Actualización              | Denegado         | Permitido        |
| `mindwtr_complete_task` | Tabla de tareas           | Actualización del estado       | Denegado         | Permitido        |
| `mindwtr_delete_task`   | Tabla de tareas           | Eliminación lógica         | Denegado         | Permitido        |
| `mindwtr_restore_task`  | Tabla de tareas           | Restauración de eliminación lógica | Denegado         | Permitido        |
| `mindwtr_add_project`   | Tabla de proyectos        | Inserción              | Denegado         | Permitido        |
| `mindwtr_update_project`| Tabla de proyectos        | Actualización              | Denegado         | Permitido        |
| `mindwtr_delete_project`| Tabla de proyectos        | Eliminación lógica         | Denegado         | Permitido        |
| `mindwtr_add_section`   | Tabla de secciones        | Inserción              | Denegado         | Permitido        |
| `mindwtr_update_section`| Tabla de secciones        | Actualización              | Denegado         | Permitido        |
| `mindwtr_delete_section`| Tabla de secciones        | Eliminación lógica         | Denegado         | Permitido        |
| `mindwtr_add_area`      | Tabla de áreas           | Inserción              | Denegado         | Permitido        |
| `mindwtr_update_area`   | Tabla de áreas           | Actualización              | Denegado         | Permitido        |
| `mindwtr_delete_area`   | Tabla de áreas           | Eliminación lógica         | Denegado         | Permitido        |
| `mindwtr_add_person`    | Tabla de personas         | Inserción              | Denegado         | Permitido        |
| `mindwtr_update_person` | Tabla de personas         | Actualización              | Denegado         | Permitido        |
| `mindwtr_rename_person` | Tabla de personas/tareas   | Cambio de nombre/actualización de referencias  | Denegado         | Permitido        |
| `mindwtr_delete_person` | Tabla de personas         | Eliminación lógica         | Denegado         | Permitido        |

Orientación práctica:

- Usa el modo de solo lectura de forma predeterminada para la exploración y los informes.
- Habilita `--write` solo para backends que confíes al cliente de IA para su edición: una base de datos local o tu propio servidor Cloud.
- Para flujos de trabajo con agentes, es preferible pedir confirmación explícita antes de las operaciones de eliminación o finalización.

## Ejemplos de uso avanzado

### 1) Revisión semanal guiada

1. `mindwtr_list_tasks` con `status: "waiting"` y `status: "someday"`.
2. Resume los elementos estancados por proyecto.
3. Para los elementos seleccionados, llama a `mindwtr_update_task` para establecer `reviewAt`.

### 2) Sesión de clasificación de la bandeja de entrada

1. `mindwtr_list_tasks` con `status: "inbox"` y `sortBy: "createdAt"`.
2. Para cada tarea, clasifícala con `mindwtr_update_task` (`next`, `waiting`, `reference`, etc.).
3. Añade los metadatos que falten (proyecto, contextos y etiquetas) en una segunda pasada.

### 3) Patrón seguro para cierres masivos

Para automatizaciones potencialmente destructivas:

1. Ejecuta la fase de lectura: enumera únicamente los ID candidatos.
2. Presenta un resumen de confirmación (cantidad y títulos).
3. Ejecuta las escrituras (`complete_task` / `delete_task`) solo después de recibir la aprobación explícita del usuario.
4. Conserva los ID para poder revertir mediante `restore_task`.

### 4) Captura rápida con lenguaje natural

Usa `mindwtr_add_task` + `quickAdd`:

```json
{
  "quickAdd": "Follow up with Alex +Hiring @work #ops /due:tomorrow 10am"
}
```

Úsalo para flujos de captura rápida en los que analizar comandos sea más eficiente que establecer cada campo manualmente.

---

## Referencia de herramientas

Todas las herramientas devuelven JSON en el campo `content.text`. Analiza el JSON para obtener la carga útil real.

## Límites operativos

Estos límites son útiles al integrar Mindwtr en flujos de trabajo con agentes:

- `mindwtr_list_tasks` usa `limit: 200` de forma predeterminada y limita `limit` a `500`.
- Los títulos de las tareas están limitados a `500` caracteres en la validación de creación/actualización de tareas mediante MCP.
- Las entradas de adición rápida están limitadas a `2000` caracteres al crear tareas mediante MCP, igual que el límite de adición rápida de la API de tareas de Cloud.
- La capa de SQLite usa un `busy_timeout` de 5 segundos, por lo que una base de datos bloqueada debería fallar en vez de quedar colgada indefinidamente.

Si necesitas más de 500 tareas, pagina con `limit` + `offset` en lugar de esperar una única respuesta sin límite.

### `mindwtr_list_tasks`

**Campos de entrada**

- `status`: `inbox | next | waiting | someday | reference | done | archived | all`
- `projectId`: string
- `includeDeleted`: boolean
- `limit`: number
- `offset`: number
- `search`: string
- `dueDateFrom`: ISO date or datetime string (comparada por fecha del calendario)
- `dueDateTo`: ISO date or datetime string (comparada por fecha del calendario)
- `sortBy`: `updatedAt | createdAt | dueDate | title | priority`
- `sortOrder`: `asc | desc`

**Ejemplo**

```json
{
  "status": "next",
  "limit": 20,
  "offset": 0,
  "sortBy": "updatedAt",
  "sortOrder": "desc"
}
```

**Respuesta**

```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "title": "Follow up with design",
      "status": "next",
      "updatedAt": "2026-01-25T03:45:57.246Z"
    }
  ]
}
```

### `mindwtr_list_projects`

**Campos de entrada**

- ninguno

**Respuesta**

```json
{
  "projects": [
    {
      "id": "project-uuid",
      "title": "Mindwtr",
      "status": "active"
    }
  ]
}
```

### `mindwtr_get_project`

**Campos de entrada**

- `id`: string (UUID del proyecto)
- `includeDeleted`: boolean (opcional)

**Ejemplo**

```json
{ "id": "project-uuid" }
```

### `mindwtr_list_sections`

**Campos de entrada**

- `projectId`: string (opcional)
- `includeDeleted`: boolean (opcional)

**Respuesta**

```json
{
  "sections": [
    {
      "id": "section-uuid",
      "projectId": "project-uuid",
      "title": "Planning"
    }
  ]
}
```

### `mindwtr_get_section`

**Campos de entrada**

- `id`: string (UUID de la sección)
- `includeDeleted`: boolean (opcional)

**Ejemplo**

```json
{ "id": "section-uuid" }
```

### `mindwtr_list_areas`

**Campos de entrada**

- ninguno

**Respuesta**

```json
{
  "areas": [
    {
      "id": "area-uuid",
      "name": "Work"
    }
  ]
}
```

### `mindwtr_list_people`

**Campos de entrada**

- `includeDeleted`: boolean (opcional)

**Respuesta**

```json
{
  "people": [
    {
      "id": "person-uuid",
      "name": "Alex"
    }
  ]
}
```

### `mindwtr_get_person`

**Campos de entrada**

- `id`: string (UUID de la persona)
- `includeDeleted`: boolean (opcional)

**Ejemplo**

```json
{ "id": "person-uuid" }
```

### `mindwtr_get_task`

**Campos de entrada**

- `id`: string (UUID de la tarea)
- `includeDeleted`: boolean (opcional)

**Ejemplo**

```json
{ "id": "task-uuid" }
```

### `mindwtr_add_task` (escritura)

**Campos de entrada**

- `title`: string (obligatorio si se omite `quickAdd`)
- `quickAdd`: string (obligatorio si se omite `title`)
- `status`: `inbox | next | waiting | someday | reference | done | archived`
- `projectId`: string
- `dueDate`: ISO string
- `startTime`: ISO string
- `contexts`: string[]
- `tags`: string[]
- `description`: string
- `priority`: string
- `timeEstimate`: string (por ejemplo, `30m`, `2h`)

**Ejemplo**

```json
{
  "quickAdd": "Send invoice +Acme /due:tomorrow 9am #finance"
}
```

### `mindwtr_update_task` (escritura)

**Campos de entrada**

- `id`: string (UUID de la tarea)
- `title`, `status`, `projectId`, `dueDate`, `startTime`, `contexts`, `tags`, `description`, `priority`, `timeEstimate`, `reviewAt`, `isFocusedToday`

**Notas**

- Usa `null` para borrar campos que admiten valores nulos. Esto se aplica a campos de tarea como `projectId`, `dueDate`, `startTime`, `contexts` y `tags`; campos de proyecto como `areaId`, `dueDate`, `reviewAt` y `supportNotes`; el campo `description` de las secciones; los campos `color` e `icon` de las áreas; y los campos `note` y `referenceLink` de las personas.

**Ejemplo**

```json
{
  "id": "task-uuid",
  "status": "waiting",
  "reviewAt": "2026-01-27T09:00:00.000Z"
}
```

### `mindwtr_complete_task` (escritura)

**Campos de entrada**

- `id`: string (UUID de la tarea)

### `mindwtr_delete_task` (escritura)

**Campos de entrada**

- `id`: string (UUID de la tarea)

### `mindwtr_restore_task` (escritura)

**Campos de entrada**

- `id`: string (UUID de la tarea)

### `mindwtr_add_project` (escritura)

**Campos de entrada**

- `title`: string
- `color`: string (opcional)
- `status`: `active | someday | waiting | archived` (opcional)
- `areaId`: string or `null`
- `isSequential`: boolean (opcional)
- `isFocused`: boolean (opcional)
- `dueDate`: ISO string or `null`
- `reviewAt`: ISO string or `null`
- `supportNotes`: string or `null`

### `mindwtr_update_project` (escritura)

**Campos de entrada**

- `id`: string (UUID del proyecto)
- `title`, `color`, `status`, `areaId`, `isSequential`, `isFocused`, `dueDate`, `reviewAt`, `supportNotes`

### `mindwtr_delete_project` (escritura)

**Campos de entrada**

- `id`: string (UUID del proyecto)

### `mindwtr_add_section` (escritura)

**Campos de entrada**

- `projectId`: string
- `title`: string
- `description`: string or `null` (opcional)
- `order`: number (opcional)
- `isCollapsed`: boolean (opcional)

### `mindwtr_update_section` (escritura)

**Campos de entrada**

- `id`: string (UUID de la sección)
- `title`, `description`, `order`, `isCollapsed`

### `mindwtr_delete_section` (escritura)

**Campos de entrada**

- `id`: string (UUID de la sección)

### `mindwtr_add_area` (escritura)

**Campos de entrada**

- `name`: string
- `color`: string (opcional)
- `icon`: string (opcional)

### `mindwtr_update_area` (escritura)

**Campos de entrada**

- `id`: string (UUID del área)
- `name`, `color`, `icon`

### `mindwtr_delete_area` (escritura)

**Campos de entrada**

- `id`: string (UUID del área)

### `mindwtr_add_person` (escritura)

**Campos de entrada**

- `name`: string
- `note`: string or `null` (opcional)
- `referenceLink`: string or `null` (opcional)

### `mindwtr_update_person` (escritura)

**Campos de entrada**

- `id`: string (UUID de la persona)
- `name`, `note`, `referenceLink`

### `mindwtr_rename_person` (escritura)

**Campos de entrada**

- `id`: string (UUID de la persona)
- `name`: string
- `updateTasks`: boolean (opcional)

### `mindwtr_delete_person` (escritura)

**Campos de entrada**

- `id`: string (UUID de la persona)

---

## Notas sobre el formato de salida

- Las salidas de las herramientas son cadenas JSON, no valores MCP estructurados. Tu cliente debe analizar `content[0].text`.
- Los ID de tareas/proyectos son UUID de la base de datos SQLite local.
- Las fechas son cadenas ISO 8601 (UTC).

---

## Seguridad y notas

- **Concurrencia:** El servidor usa el modo WAL de SQLite. Las escrituras pueden fallar si la base de datos está bloqueada; se espera que los clientes vuelvan a intentarlo.
- **Lógica compartida:** Las operaciones de escritura usan la biblioteca compartida `@mindwtr/core` para garantizar que se apliquen las reglas de negocio.
- **Persistencia:** El servidor permanece activo mientras `stdin` esté abierto.

## Solución de problemas

- **"Command not found"**: Usa `npx -y mindwtr-mcp` en las configuraciones de los clientes MCP o instala el paquete globalmente con `npm install -g mindwtr-mcp`.
- **Problemas de conexión del cliente**: Asegúrate de NO usar `bun run` como comando en la configuración del cliente MCP, ya que puede generar texto adicional. Es preferible usar `npx -y mindwtr-mcp`; para copias del código fuente, ejecuta `bun` directamente sobre el archivo fuente o `node` sobre el archivo compilado.
