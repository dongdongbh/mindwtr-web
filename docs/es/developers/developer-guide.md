# Guía para desarrolladores

Esta guía abarca la configuración del entorno de desarrollo y las pautas de contribución para Mindwtr.

---

## Filosofía del producto

Mindwtr está diseñado para ser **sencillo de forma predeterminada y potente cuando lo necesitas**. Nos centramos en reducir la carga cognitiva, eliminar lo superfluo y mantener a los usuarios concentrados. Cada contribución se evalúa según estos principios:

- **Divulgación progresiva**: las opciones avanzadas permanecen ocultas hasta que son relevantes.
- **Menos de forma predeterminada**: menos campos, menos controles, menos distracciones.
- **Evitar la proliferación de funciones**: priorizamos la claridad frente a la saturación.
- **Lo automático supera a lo manual**: si el resultado correcto puede inferirse o predecirse —a partir de la plataforma, el canal de instalación, los datos existentes o el contexto—, la aplicación debe hacerlo sin más. Esto se aplica en todas partes, no solo a los ajustes: ningún control que configurar, ninguna pregunta cuya respuesta pueda determinar la propia aplicación, ningún toque adicional ni paso manual en un flujo de trabajo, ninguna interfaz que el usuario deba manipular para obtener el resultado obvio. Cada paso manual traslada la carga cognitiva de nosotros (una vez) a cada usuario (para siempre). El comprobador de actualizaciones es el modelo: en lugar de un interruptor para «desactivar las comprobaciones de actualizaciones», la aplicación detecta cómo se instaló y se comporta correctamente según el canal; las instalaciones mediante un gestor de paquetes dejan de mostrar avisos por sí solas, sin añadir ningún ajuste. Cuando el comportamiento correcto realmente no puede inferirse y existe una demanda real, sitúa la función detrás de un interruptor o recurso existente antes de crear uno nuevo.

_No me muestres una cabina de avión cuando solo quiero montar en bicicleta._

Consulta [Principios de ingeniería](/es/developers/engineering-principles) para conocer las medidas de protección de los datos y la sincronización que sustentan estos principios.

---

## Inicio rápido

```bash
# Clone repository
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run desktop app (dev mode)
bun desktop:dev

# Run mobile app
bun mobile:start
```

---

## Requisitos previos

### Todas las plataformas

- [Bun](https://bun.sh/) — Gestor de paquetes y entorno de ejecución
- [Node.js](https://nodejs.org/) — Entorno de ejecución de JavaScript (para algunas herramientas)
- [Git](https://git-scm.com/) — Control de versiones

### Desarrollo para escritorio

- [Rust](https://rustup.rs/) — Necesario para Tauri

**Linux (Arch):**
```bash
sudo pacman -S rust webkit2gtk-4.1 base-devel
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential libssl-dev libgtk-3-dev
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**macOS:**
```bash
xcode-select --install
brew install rust
```

**Windows:**
Instala [Rust](https://rustup.rs/) y [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/).

### Desarrollo para móviles

- Aplicación [Expo Go](https://expo.dev/client) (para pruebas)
- Android Studio (para compilaciones en emuladores/dispositivos)
- Xcode (para desarrollo en iOS)

---

## Estructura del proyecto

```
Mindwtr/
├── apps/
│   ├── cloud/             # Sync server (Bun)
│   ├── desktop/           # Tauri v2 + React + Vite
│   │   ├── src/           # React source
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── lib/
│   │   │   └── App.tsx
│   │   ├── src-tauri/     # Rust backend
│   │   └── package.json
│   │
│   └── mobile/            # Expo + React Native
│       ├── app/           # Expo Router pages
│       ├── components/
│       ├── contexts/
│       ├── lib/
│       └── package.json
│
├── packages/
│   └── core/              # Shared business logic
│       └── src/
│           ├── store.ts   # Zustand store
│           ├── types.ts   # TypeScript types
│           ├── i18n.ts    # Translations
│           └── ...
│
├── scripts/               # Utility scripts (CLI, API, release)
├── docs/                  # Repository-local docs: ADRs, release notes, contribution docs
├── wiki/                  # Retired GitHub Wiki landing page (points to the docs site)
├── .github/               # CI/CD workflows
└── package.json           # Monorepo root
```

La documentación pública para usuarios y desarrolladores se mantiene en el directorio `docs/` de este repositorio y se publica en https://docs.mindwtr.app/. La fuente pública es https://github.com/dongdongbh/mindwtr-web/tree/main/docs. Da preferencia a ese repositorio de documentación para las páginas de guías nuevas o migradas.

Fuente de la documentación pública: https://github.com/dongdongbh/mindwtr-web/tree/main/docs

---

## Scripts disponibles

### Nivel raíz

| Comando              | Descripción                       |
| -------------------- | --------------------------------- |
| `bun install`        | Instalar todas las dependencias   |
| `bun desktop:dev`    | Ejecutar escritorio en modo desarrollo |
| `bun mobile:start`   | Iniciar el servidor de desarrollo de Expo |
| `bun mobile:android` | Ejecutar en Android                |
| `bun mobile:ios`     | Ejecutar en iOS                    |
| `bun test`           | Ejecutar todas las pruebas         |
| `bun mindwtr:cli`    | Ejecutar la herramienta CLI        |
| `bun mindwtr:api`    | Ejecutar el servidor de API local  |

### Escritorio (`apps/desktop`)

| Comando     | Descripción                              |
| ----------- | ---------------------------------------- |
| `bun dev`   | Modo de desarrollo con recarga en caliente |
| `bun build` | Compilar para producción                 |
| `bun test`  | Ejecutar las pruebas                     |

### Móvil (`apps/mobile`)

| Comando         | Descripción               |
| --------------- | ------------------------- |
| `bun start`     | Iniciar el servidor Expo  |
| `bun android`   | Ejecutar en Android       |
| `bun ios`       | Ejecutar en iOS           |
| `ARCHS=arm64-v8a bash ./scripts/android_build.sh` | Compilar el APK de Android |

### Nube (`apps/cloud`)

| Comando   | Descripción                         |
| --------- | ----------------------------------- |
| `bun dev` | Ejecutar el servidor de sincronización |

### Núcleo (`packages/core`)

| Comando     | Descripción                       |
| ----------- | --------------------------------- |
| `bun test`  | Ejecutar las pruebas unitarias    |
| `bun build` | Compilar el paquete               |

---

## Pila tecnológica

| Capa           | Escritorio         | Móvil                 | Nube             |
| -------------- | ------------------ | --------------------- | ---------------- |
| **Framework**  | React + Vite       | React Native + Expo   | Bun (HTTP nativo)|
| **Estilos**    | Tailwind CSS       | NativeWind (Tailwind) | N/A              |
| **Estado**     | Zustand (compartido) | Zustand (compartido) | N/A              |
| **Plataforma** | Tauri v2 (Rust)    | Expo (iOS/Android)    | Bun              |
| **Enrutador**  | React Router       | Expo Router           | N/A              |
| **Lenguaje**   | TypeScript         | TypeScript            | TypeScript       |

---

## Decisiones de arquitectura

Registramos las decisiones técnicas clave como ADR en `docs/adr/`. Consulta:
- `docs/adr/README.md`

ADR actuales sobre sincronización que debes conocer antes de cambiar el comportamiento de fusión o transporte:
- ADR 0003 define metadatos de sincronización que tienen en cuenta las revisiones (`rev`, `revBy`) y una fusión determinista que tiene en cuenta los marcadores de eliminación.
- ADR 0007 define la regla publicada en la que prevalece el elemento activo para conflictos ambiguos entre un elemento eliminado y uno activo.
- ADR 0008 deja constancia de que Mindwtr mantiene intencionadamente la sincronización basada en instantáneas por ahora, en lugar de añadir un registro de diferencias.

Quienes contribuyan deben tratar el transporte de instantáneas como una elección deliberada del producto, no como infraestructura ausente. Reconsidera ADR 0008 únicamente si los archivos de instantáneas superan habitualmente los 5 MB, los viajes de ida y vuelta de la sincronización superan los 5 segundos en redes habituales o Mindwtr necesita transmisión multidispositivo en tiempo real.

---

## Flujo de trabajo de desarrollo

### Realizar cambios

1. Crea una rama de función
2. Realiza cambios en el paquete correspondiente
3. Ejecuta las pruebas: `bun test`
4. Prueba en escritorio: `bun desktop:dev`
5. Prueba en móvil: `bun mobile:start`
6. Haz un commit con un mensaje descriptivo
7. Abre una solicitud de incorporación de cambios

Al añadir un nuevo tipo de entidad de nivel superior, actualiza toda la superficie de persistencia y sincronización en el mismo cambio: los tipos y la normalización de `AppData` del núcleo, el esquema SQLite de escritorio y sus pruebas de ida y vuelta del almacenamiento, el esquema SQLite móvil y la restauración de copias de seguridad, la validación y normalización en la nube, las herramientas MCP si se exponen, y la fuente de la documentación de la API principal en https://github.com/dongdongbh/mindwtr-web/tree/main/docs.

### Estilo del código

- TypeScript para todo el código
- Componentes funcionales de React
- Se prefieren las exportaciones con nombre
- Comentarios JSDoc para las API públicas

### Pruebas

```bash
# Run all tests
bun test

# Run desktop tests
cd apps/desktop && bun test

# Run core tests
cd packages/core && bun test
```

---

## Compilar para producción

### Escritorio

```bash
cd apps/desktop
bun run build
# Output: src-tauri/target/release/
```

### Escritorio (compilación de diagnóstico)

Las compilaciones de lanzamiento desactivan las herramientas de desarrollo de forma predeterminada. Para activar los diagnósticos y las herramientas de desarrollo, compila con la función
`diagnostics` y habilítala explícitamente durante la ejecución:

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Móvil (APK de Android)

```bash
cd apps/mobile
ARCHS=arm64-v8a bash ./scripts/android_build.sh
```

Consulta [Instalación móvil](/es/start/mobile-installation) para obtener instrucciones detalladas de compilación.

---

## Resumen de la arquitectura

Consulta [Arquitectura](/es/developers/architecture) para ver el diseño técnico detallado.

### Conceptos clave

- **Monorepositorio:** un único repositorio con dependencias compartidas
- **Núcleo compartido:** lógica de negocio en `@mindwtr/core`
- **Aplicaciones de plataforma:** las aplicaciones de escritorio y móvil utilizan el núcleo compartido
- **Almacenamiento local:** los datos se conservan localmente
- **Sincronización múltiple:** sincronización por archivo, WebDAV o nube

---

## Herramienta CLI

Interfaz de línea de comandos para scripts y automatización:

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

**Opciones:**
- `--data <path>` — Sustituir la ubicación de data.json
- `--db <path>` — Sustituir la ubicación de mindwtr.db
- `MINDWTR_DATA` — Variable de entorno para la ruta de datos
- `MINDWTR_DB_PATH` — Variable de entorno para la ruta de la base de datos

En rutas compatibles con el escritorio, la CLI mantiene `mindwtr.db` y `data.json` alineados para que los cambios sigan siendo visibles antes y después de iniciar la aplicación.

---

## API REST local

Ejecuta un servidor de API local para scripts e integraciones:

```bash
# Start API server
bun mindwtr:api -- --port 4317

# With auth token
MINDWTR_API_TOKEN=secret bun mindwtr:api -- --port 4317
```

La API local utiliza el mismo contrato de almacenamiento que la CLI y mantiene `mindwtr.db` y `data.json` sincronizados en rutas compatibles con el escritorio.

### Puntos de acceso

| Método   | Endpoint              | Descripción                    |
| -------- | --------------------- | ------------------------------ |
| `GET`    | `/health`             | Comprobación de estado         |
| `GET`    | `/tasks`              | Enumerar tareas                |
| `GET`    | `/tasks?status=next`  | Filtrar por estado             |
| `GET`    | `/tasks?query=@work`  | Buscar tareas                  |
| `POST`   | `/tasks`              | Crear una tarea                |
| `PATCH`  | `/tasks/:id`          | Actualizar una tarea           |
| `DELETE` | `/tasks/:id`          | Eliminar una tarea de forma lógica |
| `POST`   | `/tasks/:id/complete` | Marcar una tarea como completada |
| `POST`   | `/tasks/:id/archive`  | Marcar una tarea como archivada |
| `POST`   | `/tasks/:id/restore`  | Restaurar una tarea eliminada  |
| `GET`    | `/projects`           | Enumerar proyectos             |
| `GET`    | `/search?query=...`   | Buscar tareas y proyectos      |

**Ejemplo:**
```bash
# Add task via API
curl -X POST http://localhost:4317/tasks \
  -H "Content-Type: application/json" \
  -d '{"input": "Review PR @work /due:tomorrow"}'

# Complete task
curl -X POST http://localhost:4317/tasks/<id>/complete
```

---

## Servidor en la nube

Backend de sincronización en la nube autoalojado:

```bash
# From monorepo root
bun run --filter mindwtr-cloud dev -- --port 8787
```

### Puntos de acceso

| Método | Endpoint   | Descripción    |
| ------ | ---------- | -------------- |
| `GET`  | `/health`  | Comprobación de estado |
| `HEAD` | `/v1/data` | Obtener los metadatos de la instantánea |
| `GET`  | `/v1/data` | Obtener los datos del usuario |
| `PUT`  | `/v1/data` | Fusionar y guardar los datos del usuario; devuelve estadísticas de la fusión |
| `GET`, `POST` | `/v1/tasks` | Enumerar o crear tareas |
| `GET`, `PATCH`, `DELETE` | `/v1/tasks/:id` | Leer, actualizar o eliminar de forma lógica una tarea |
| `POST` | `/v1/tasks/:id/complete` | Marcar una tarea como completada |
| `POST` | `/v1/tasks/:id/archive` | Archivar una tarea |
| `GET`, `POST` | `/v1/projects` | Enumerar o crear proyectos |
| `GET`, `PATCH`, `DELETE` | `/v1/projects/:id` | Leer, actualizar o eliminar de forma lógica un proyecto |
| `GET`, `POST` | `/v1/sections` | Enumerar o crear secciones |
| `GET`, `PATCH`, `DELETE` | `/v1/sections/:id` | Leer, actualizar o eliminar de forma lógica una sección |
| `GET`, `POST` | `/v1/areas` | Enumerar o crear áreas |
| `GET`, `PATCH`, `DELETE` | `/v1/areas/:id` | Leer, actualizar o eliminar de forma lógica un área |
| `GET` | `/v1/search` | Buscar tareas y proyectos |
| `GET`, `PUT`, `DELETE` | `/v1/attachments/*` | Descargar, subir o eliminar archivos adjuntos |
| `POST`, `DELETE` | `/v1/attachments/orphans` | Examinar o eliminar archivos adjuntos huérfanos |

**Autenticación:** `Authorization: Bearer <token>`

Cada token obtiene su propio archivo de datos (nombre de archivo con hash SHA-256).

**Entorno:**
- `PORT` — Puerto del servidor (predeterminado: 8787)
- `HOST` — Dirección de escucha (predeterminada: 0.0.0.0)
- `MINDWTR_CLOUD_DATA_DIR` — Directorio de datos

---

## Aplicación web (PWA)

Ejecuta la interfaz de escritorio en un navegador con compatibilidad con PWA:

```bash
# Development
bun desktop:web

# Production build
bun desktop:web:build
```

Utiliza localStorage para almacenar los datos e incluye compatibilidad sin conexión mediante un service worker.

---

## Véase también

- [Arquitectura](/es/developers/architecture)
- [API principal](/es/developers/core-api)
- [Contribuir (guía del repositorio)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
