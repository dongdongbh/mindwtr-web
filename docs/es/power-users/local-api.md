# Servidor de API local

Mindwtr incluye un servidor de API REST local opcional para scripts e integraciones. En escritorio, se ejecuta dentro del binario de la aplicación y usa las mismas rutas de almacenamiento local que esta. El repositorio también incluye un asistente de Bun para desarrollo y scripts avanzados.

---

## Activación en escritorio

Las compilaciones de escritorio pueden iniciar la API REST local sin ejecutar el código fuente:

- Abre **Ajustes -> Avanzado**.
- Activa **Servidor de API local**.
- Mantén el puerto predeterminado `3456` o elige otro puerto de localhost.
- Copia el token de portador generado desde la misma tarjeta de ajustes.

La aplicación solo se vincula a `127.0.0.1` y requiere `Authorization: Bearer <token>` en cada solicitud. Los binarios móviles no exponen una API REST local.

### Asistente de desarrollo

El asistente del repositorio sigue disponible cuando quieras ejecutar la API fuera de la aplicación de escritorio o hacer que apunte a archivos explícitos.

---

## Inicio rápido

Desde la aplicación de escritorio:

```text
Settings -> Advanced -> Enable local API server
```

URL predeterminada:

```text
http://127.0.0.1:3456
```

Desde la raíz del repositorio con Bun:

```bash
bun install
bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### Opciones

| Opción          | Valor predeterminado          | Descripción                 |
| --------------- | ---------------- | --------------------------- |
| `--port <n>`    | `4317`           | Puerto del servidor                 |
| `--host <host>` | `127.0.0.1`      | Dirección de enlace                |
| `--data <path>` | Valor predeterminado de la plataforma | Sobrescribe la ubicación de data.json |
| `--db <path>`   | Valor predeterminado de la plataforma | Sobrescribe la ubicación de mindwtr.db |

### Variables de entorno

| Variable            | Descripción                                          |
| ------------------- | ---------------------------------------------------- |
| `MINDWTR_DATA`      | Sobrescribe la ubicación de data.json (si se omite `--data`) |
| `MINDWTR_DB_PATH`   | Sobrescribe la ubicación de mindwtr.db (si se omite `--db`)  |
| `MINDWTR_API_TOKEN` | Solo para el asistente de Bun: si se establece, requiere `Authorization: Bearer <token>` |

De forma predeterminada, la API resuelve tanto `data.json` como `mindwtr.db` mediante las rutas de plataforma de Mindwtr (con preferencia por los datos XDG en Linux).

---

## Autenticación

Las solicitudes a la API local de escritorio siempre requieren el token de portador que se muestra en **Ajustes -> Avanzado**:

```
Authorization: Bearer <token>
```

El asistente de Bun solo requiere un token cuando se establece `MINDWTR_API_TOKEN`.

---

## Endpoints

| Método   | Endpoint              | Descripción                   |
| -------- | --------------------- | ----------------------------- |
| `GET`    | `/health`             | Comprobación de estado → `{ ok: true }` |
| `GET`    | `/tasks`              | Enumera las tareas                    |
| `GET`    | `/tasks?status=next`  | Filtra por estado              |
| `GET`    | `/tasks?query=@work`  | Busca tareas                  |
| `GET`    | `/tasks?all=1`        | Incluye las completadas/archivadas         |
| `GET`    | `/tasks?deleted=1`    | Incluye las eliminadas de forma lógica          |
| `POST`   | `/tasks`              | Crea una tarea                   |
| `GET`    | `/tasks/:id`          | Obtiene una sola tarea               |
| `PATCH`  | `/tasks/:id`          | Actualiza una tarea                   |
| `DELETE` | `/tasks/:id`          | Elimina una tarea de forma lógica              |
| `POST`   | `/tasks/:id/complete` | Marca como completada                  |
| `POST`   | `/tasks/:id/archive`  | Marca como archivada              |
| `POST`   | `/tasks/:id/restore`  | Restaura una tarea eliminada de forma lógica   |
| `GET`    | `/projects`           | Enumera los proyectos                 |
| `GET`    | `/areas`              | Enumera las áreas                    |
| `GET`    | `/v1/areas`           | Alias de compatibilidad para las áreas |
| `GET`    | `/search?query=...`   | Busca tareas y proyectos       |

### Formas de las respuestas

**Tarea (parcial)**
```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "inbox",
  "projectId": "uuid",
  "dueDate": "2026-01-25T12:00:00.000Z",
  "tags": ["#work"],
  "contexts": ["@email"],
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Proyecto (parcial)**
```json
{
  "id": "uuid",
  "title": "Project name",
  "status": "active",
  "color": "#94a3b8",
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Área**
```json
{
  "id": "uuid",
  "name": "Area name",
  "color": "#94a3b8",
  "icon": "briefcase",
  "order": 0,
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z"
}
```

### Cuerpo para crear una tarea

```json
{
  "input": "Call Alice",
  "title": "Alternative title",
  "props": {
    "status": "next",
    "contexts": ["@phone"],
    "tags": ["#errands"]
  }
}
```

En escritorio se usa `title` cuando está presente; de lo contrario, se usa `input`, y se aplican las `props` explícitas. El asistente de Bun ejecuta además `parseQuickAdd` para `input`.

---

## Ejemplos

**Enumerar las siguientes acciones:**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**Crear con propiedades explícitas:**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**Completar una tarea:**

```bash
curl -s -X POST "http://127.0.0.1:4317/tasks/$TASK_ID/complete" | jq .
```

---

## Herramienta de CLI

También está disponible una interfaz de línea de comandos más sencilla:

```bash
# Add a task
bun mindwtr:cli -- add "Call mom @phone #family"

# List active tasks
bun mindwtr:cli -- list

# List with filters
bun mindwtr:cli -- list --status next --query "due:<=7d"

# Read or update a task
bun mindwtr:cli -- get <taskId>
bun mindwtr:cli -- update <taskId> '{"status":"next"}'

# Complete a task
bun mindwtr:cli -- complete <taskId>

# Archive, delete, or restore
bun mindwtr:cli -- archive <taskId>
bun mindwtr:cli -- delete <taskId>
bun mindwtr:cli -- restore <taskId>

# Search
bun mindwtr:cli -- search "@work"

# List projects
bun mindwtr:cli -- projects
```

### Referencia de la CLI

| Comando      | Ejemplo                                      | Notas                                |
| ------------ | -------------------------------------------- | ------------------------------------ |
| `add`        | `mindwtr:cli -- add "Call mom @phone"`       | Usa el análisis de adición rápida               |
| `list`       | `mindwtr:cli -- list --status next`          | Admite `--all`, `--deleted`, `--query` |
| `get`        | `mindwtr:cli -- get <taskId>`                | Imprime el JSON completo de la tarea                |
| `update`     | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | Aplica un parche JSON         |
| `search`     | `mindwtr:cli -- search "@work due:<=7d"`     | Busca tareas/proyectos              |
| `complete`   | `mindwtr:cli -- complete <taskId>`           | Marca la tarea como completada                   |
| `archive`    | `mindwtr:cli -- archive <taskId>`            | Marca la tarea como archivada               |
| `delete`     | `mindwtr:cli -- delete <taskId>`             | Elimina la tarea de forma lógica                    |
| `restore`    | `mindwtr:cli -- restore <taskId>`            | Restaura una tarea eliminada              |
| `projects`   | `mindwtr:cli -- projects`                    | Enumera los proyectos activos                |

---

## Notas de seguridad

- El servidor está pensado para ejecutarse en `127.0.0.1` (localhost). No lo expongas públicamente salvo que comprendas los riesgos.
- El acceso a la API de escritorio requiere el token de portador generado en Ajustes. Mantén ese token en privado.
- Si necesitas acceso remoto al asistente de Bun, establece `MINDWTR_API_TOKEN` y coloca el servidor detrás de un proxy inverso autenticado.

---

## Véase también

- [Guía para desarrolladores](/es/developers/developer-guide)
- [API de Cloud](/es/developers/cloud-api)
