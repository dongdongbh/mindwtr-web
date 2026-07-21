# Guía de usuario: escritorio

La aplicación de escritorio Mindwtr está creada con [Tauri v2](https://tauri.app/) y ofrece una experiencia ligera y rápida en Windows, macOS y Linux.

## Descripción general

La aplicación de escritorio incluye una barra lateral de navegación con todas las vistas GTD y un área de contenido principal.

---

## Patrones de interacción

- Un **solo clic** alterna los detalles de la tarea.
- Un **doble clic** en una tarea abre el modo de edición completo. Para cambiar solo el título en el mismo lugar, elige **Cambiar nombre de la tarea** en el menú `⋯` de la tarea (Enter guarda y Esc cancela).
- Haz **clic fuera** de un editor de tareas abierto para cerrarlo si no se ha cambiado nada; una vez editado algún campo, para cerrarlo hay que usar Guardar, Cancelar o Esc.
- El **clic derecho** abre menús contextuales (proyectos y tareas).
- **El teclado primero**: los atajos globales y los modos Vim/Emacs están optimizados para los flujos de trabajo de escritorio.

Si sigues posponiendo la fecha de vencimiento de una tarea, su fila muestra junto a ella una pequeña insignia de reloj de arena con el número de aplazamientos (a partir del tercero). La insignia te recuerda que quizá debas volver a aclarar la tarea, delegarla o descartarla en vez de aplazarla otra vez.

La mayoría de las listas de tareas comparten la misma fila de controles para seleccionar tareas, filtrar, ordenar, agrupar, mostrar detalles y cambiar la densidad de la lista (Cómodo, Compacto o Condensado). Usa **Agrupar** para organizar la Bandeja de entrada, Próximas, En espera, Algún día/Tal vez, Referencia, Terminadas y otras vistas de lista por metadatos como contexto, área, proyecto o etiqueta.

## Modo Foco

Usa el modo Foco para ocultar la barra lateral y mantener la lista centrada (anchura máxima de 800 px).

- Actívalo con **Ctrl+\\** (Windows/Linux) o **Cmd+\\** (macOS)
- Es ideal para el trabajo profundo o las revisiones

### Bandeja del sistema

Mindwtr se ejecuta en segundo plano para gestionar la sincronización automática.

- **Cerrar la ventana** minimiza la aplicación a la bandeja del sistema en vez de salir.
- **Haz clic en el icono de la bandeja** para mostrar u ocultar la ventana.
- **Haz clic derecho en el icono de la bandeja** para salir por completo de la aplicación.

## Vistas

### 📥 Bandeja de entrada

Tu zona de captura. Todas las tareas nuevas llegan aquí antes de procesarlas.

- **Añade tareas** con el campo de entrada de la parte inferior
- Se admite la **sintaxis de adición rápida** (consulta [Primeros pasos](/es/start/getting-started))
- Usa la estrella junto al campo de Adición rápida cuando una tarea nueva deba ir directamente al **Foco de hoy**. La misma estrella también aparece en el encabezado del editor de tareas. Marcar con estrella cuenta como aclarar: una captura marcada se crea como **Próxima acción** en vez de como elemento de la Bandeja de entrada, y devolver una tarea marcada a la Bandeja de entrada elimina su estrella.
- **Procesa la Bandeja de entrada** con el flujo de aclaración
- **Barrido mental** te guía por áreas habituales de la vida y el trabajo cuando prefieres una sesión de captura guiada en vez de un campo vacío.

### 🎯 Foco

Tu panel unificado para la actividad diaria. Foco no es un inventario completo de todas las tareas con estado `next`; limita la lista al trabajo disponible ahora.

- **Foco de hoy**: tareas prioritarias marcadas con estrella para trabajar con concentración, hasta el límite de Foco configurado. Las próximas acciones enfocadas también muestran una pequeña estrella rellena junto a su título en las listas de tareas y en el Tablero, de modo que la pertenencia al Foco se ve de un vistazo.
- **Atrasadas**: elementos cuya fecha de vencimiento ya pasó.
- **Vencen hoy**: tareas que vencen hoy.
- **Próximas acciones**: tareas listas y sin fecha de vencimiento, filtradas por contexto.
- **Revisión pendiente**: elementos con fechas de seguimiento.

Foco oculta las tareas cuya fecha de inicio es futura y las tareas posteriores de los proyectos secuenciales. Usa **Contextos**, **Proyectos** o **Buscar** cuando necesites examinar un inventario de tareas más amplio.

**Orden predeterminado de Próximas acciones:** Foco coloca primero las acciones con vencimiento próximo, después las que no tienen fecha y al final las que vencen en un futuro lejano. Dentro del mismo grupo usa la prioridad cuando está habilitada, seguida de la hora de inicio, la fecha de creación, el título y el id. Consulta [Flujo GTD en Mindwtr](/es/use/gtd-workflow#como-ordena-enfoque-las-acciones-disponibles) para conocer toda la lógica.

**Funciones:**
- **Filtros de contexto**: filtra las Próximas acciones por contexto (por ejemplo, @home o @work) o etiqueta. El selector agrupa contextos y etiquetas para que las listas largas de metadatos sigan siendo fáciles de recorrer.
- **Agrupar por contexto**: usa el control de agrupación de la lista para agrupar las Próximas acciones por contexto principal; las tareas sin contexto se reúnen en **Sin contexto**.
- **Filtros guardados**: guarda criterios de Foco reutilizables, como proyectos, contextos, etiquetas, prioridad, nivel de energía y estimaciones de tiempo.
- **Modo Zen**: actívalo para ocultar todo salvo las tareas de Foco de hoy.
- **Pomodoro (opcional)**: actívalo en **Ajustes → GTD → Funciones → Temporizador Pomodoro** para mostrar un panel de temporizador de concentración/descanso (15/3, 25/5, 50/10 y un preajuste personalizado opcional). Déjalo en **Solo temporizador** o activa **Vincular temporizador a tarea** para mostrar el selector de tarea del temporizador y la acción **Marcar tarea como terminada**.

### 📁 Proyectos

Resultados de varios pasos que contienen tareas relacionadas.

- **Modo secuencial**: solo aparece en Foco la primera tarea disponible del proyecto; en la vista del proyecto, la tarea disponible se resalta y las tareas en cola se muestran atenuadas
- **Modo paralelo**: todas las tareas disponibles del proyecto pueden aparecer en Foco
- **Ámbito secuencial**: los proyectos secuenciales pueden avanzar en todo el proyecto o sección por sección; el ámbito por sección muestra la primera tarea disponible de cada sección.
- **Estado**: Activo, En espera, Algún día, Archivado
- **Áreas de enfoque**: agrupa los proyectos por áreas de nivel superior (por ejemplo, Trabajo o Salud) para mantener organizada la barra lateral. Arrastra un proyecto a un área para moverlo; mientras arrastras, las áreas contraídas y vacías (y **Sin área**) también aparecen como destinos.
- **Mover tareas arrastrando**: arrastra una tarea desde la lista del proyecto abierto hasta otro proyecto de la barra lateral para moverla allí (queda después de las tareas existentes del destino), o hasta el encabezado de un área para convertirla en tarea directa de esa área. Funciona con cualquier ordenación; un aviso **Movida a…** permite Deshacer con un clic, y los proyectos archivados no aceptan elementos.
- **Etiquetas de proyecto**: etiqueta proyectos y fíltralos por etiqueta
- **Notas de apoyo**: añade notas de planificación y material de referencia
- **Secciones**: agrupaciones opcionales de tareas dentro de un proyecto (fases, hitos o líneas de trabajo). Las secciones son encabezados dentro de un proyecto, no subtareas ni proyectos independientes.
- **Fecha de revisión**: define fechas de seguimiento para revisar el proyecto
- **Archivar**: completar un proyecto significa archivarlo; sus tareas restantes se completan con él y **Reactivar** lo deshace

El campo **Sección del proyecto** del editor asigna una tarea a una de las secciones de su proyecto actual. Solo tiene un valor útil cuando la tarea pertenece a un proyecto que contiene secciones.

### 🏷️ Contextos

Filtra tareas por contexto de ubicación o herramienta:

- `@home`, `@work`, `@errands`, `@agendas`
- `@computer`, `@phone`, `@anywhere`

### 🏷️ Etiquetas

Filtra tareas por nivel de energía, modo o tema:

- Energía: `#focused`, `#lowenergy`, `#creative`
- Tema: `#health`, `#finance`

### ⏳ En espera

Controla los elementos delegados o las tareas que esperan acontecimientos externos.

### 💭 Algún día/Tal vez

Incuba ideas que quizá quieras llevar a cabo más adelante.

### 🗓️ Calendario

Vista temporal de las tareas con fechas de vencimiento u horas de inicio.

En diseños anchos, el Calendario incluye un panel **Planificar próximas acciones** para el día seleccionado. Muestra Próximas acciones no programadas y tareas vencidas pero sin programar para que puedas colocarlas en huecos libres sin salir del Calendario. Contrae el panel cuando quieras más espacio para la cuadrícula diaria o semanal.

### 📋 Vista de tablero

Tablero Kanban con columnas y función de arrastrar y soltar:

- **Bandeja de entrada**: elementos sin procesar
- **Próximas acciones**: elementos listos para abordar
- **En espera**: elementos delegados
- **Algún día/Tal vez**: elementos aplazados
- **Terminadas**: tareas completadas

Arrastra tarjetas dentro de una columna para establecer el orden manual del tablero. Mover una tarea a otro estado borra su orden en la columna anterior para que pueda ordenarse en la nueva.

Usa el campo de búsqueda del Tablero para limitar las tarjetas visibles por título, notas, proyecto, contexto o etiqueta. El botón de filtro abre filtros rápidos de contextos, etiquetas, fechas de vencimiento y proyectos; **Borrar filtros** elimina tanto el texto de búsqueda como los filtros activos.

### ✅ Terminadas

Tareas completadas recientemente. Úsala como registro de finalización a corto plazo para la revisión diaria o semanal.

Si terminaste una tarea antes de marcarla como Terminada, haz clic en su marca de tiempo **Completada** para corregirla. También puedes hacer clic derecho en el botón de completar de cualquier tarea abierta para marcarla como Terminada a una hora anterior. Esto ayuda cuando la hora de finalización importa para tus registros o para la programación «repetir después de completar».

Elige **Seleccionar** para escoger tareas o **Seleccionar todo** y luego usa **Mover → Archivadas** para archivarlas antes.

### 📦 Archivadas

Tareas completadas que se han apartado. Las tareas archivadas se ocultan de las listas normales, pero aquí puedes buscarlas o restaurarlas. Haz clic en la marca de tiempo **Completada** de una tarea para corregirla. Un selector Tareas | Proyectos en la parte superior muestra en su lugar los proyectos archivados: restaurar uno lo reactiva (recuperando las tareas completadas con él) y eliminarlo lo envía a la Papelera.

Elige **Seleccionar** para escoger tareas o **Seleccionar todo**. Puedes devolver la selección a Terminadas sin cambiar su hora de finalización, restaurarla a la Bandeja de entrada o moverla a la Papelera. Mindwtr solo elimina tareas permanentemente desde la Papelera.

### 🗑️ Papelera

Tareas y proyectos eliminados, con los más recientes primero. Restaura elementos, elimínalos permanentemente o usa **Vaciar papelera** para eliminar todo de una vez. Elige **Seleccionar** para escoger varias tareas y proyectos (o **Seleccionar todo**) y restaurarlos o eliminarlos permanentemente en un solo paso. La eliminación permanente siempre pide confirmación.

### 📝 Revisión semanal

Asistente de revisión GTD con estos pasos:

1. Procesar la Bandeja de entrada
2. Revisar el Calendario
3. Hacer seguimiento de En espera
4. Revisar Proyectos
5. Revisar Algún día/Tal vez

Usa la acción **Procesar Bandeja de entrada** de la revisión para vaciar los elementos capturados antes de continuar con el calendario, En espera, los proyectos y la revisión de Algún día.

Consulta [Revisión semanal](/es/use/weekly-review) para obtener instrucciones detalladas.

---

## Asistente de IA (opcional)

Actívalo en **Ajustes → Asistente de IA**:

- **Aclarar**: convierte tareas vagas en próximas acciones concretas
- **Desglosar**: genera pasos de lista para tareas grandes
- **Análisis de revisión**: destaca tareas estancadas durante la revisión
- **Copiloto**: sugiere contexto, etiqueta y tiempo mientras escribes

La IA es opcional y solo se ejecuta cuando lo solicitas.

---

## Listas reutilizables

Usa listas de comprobación como plantillas:

- **Duplicar tarea**: copia una lista maestra (equipaje, preparación de viajes)
- **Restablecer lista**: desmarca todo para reutilizarla (compras)

---

## Editor de tareas (ver y editar)

- Haz clic en una tarea para abrir una **vista de solo lectura** con todos los detalles.
- Pulsa **Editar** (o `e`) para cambiar al modo de edición.
- El editor empieza mostrando lo mínimo. Usa **Más opciones** para revelar campos avanzados.
- **Sección del proyecto** es un campo organizativo para las tareas de un proyecto con secciones. Déjalo vacío en tareas de la Bandeja de entrada, tareas sin asignar o proyectos sin secciones.
- Estado, Prioridad y Nivel de energía usan controles de pastilla en vez de menús desplegables para agilizar la selección con teclado y puntero.
- Abre el calendario de un campo de fecha para elegir opciones rápidas junto a la cuadrícula del mes: **Hoy**, **Mañana**, **+2 días**, **+3 días**, **Próxima semana**, **Próximo mes** y **Sin fecha**.
- En **Ajustes → GTD → Diseño del editor de tareas**, elige si el editor de escritorio se abre como panel lateral en línea o como ventana emergente centrada.

---

## Integración con calendarios

Mindwtr puede superponer calendarios externos en la vista Calendario. En macOS puede leer Apple Calendar mediante EventKit; en todas las plataformas de escritorio puede leer URL directas de suscripciones ICS.
Añade una **URL de ICS** en **Ajustes → Calendario** cuando necesites una suscripción ICS.
Los eventos externos son de solo lectura, pero puedes crear desde un evento del Calendario una tarea independiente de Mindwtr; Mindwtr copia el título, la fecha y hora, la ubicación, la descripción y el nombre del calendario cuando están disponibles.
Usa **Planificar próximas acciones** en Calendario para convertir el día seleccionado en una superficie de planificación: revisa el trabajo no programado, elige una tarea y prográmala en un hueco libre manteniendo las fechas de vencimiento como plazos.
En macOS, **Enviar tareas al calendario** también puede escribir las tareas programadas o con vencimiento de Mindwtr en un calendario de Apple de destino que permita escritura. Consulta [Integración con calendarios](/es/use/calendar-integration) para configurarlo.

### 🔍 Búsqueda global

Búsqueda potente con operadores para encontrar cualquier cosa al instante.

**Abrir:** pulsa `/`, `Ctrl/Cmd + K` o haz clic en el icono de búsqueda.

El texto de búsqueda es opcional. Abre **Filtros** para mostrar los elementos que coincidan por estado, ámbito, área, fecha de vencimiento, ubicación, contexto o etiqueta; elige **Terminadas** y **Archivadas** (o **Incluir tareas Terminadas y Archivadas**) cuando quieras ver elementos completados.

#### Operadores de búsqueda

| Operador    | Ejemplo            | Descripción                         |
| ----------- | ------------------ | ----------------------------------- |
| `status:`   | `status:next`      | Filtra por estado de la tarea       |
| `-status:`  | `-status:done`     | Excluye un estado                   |
| `context:`  | `context:@home`    | Filtra por contexto                 |
| `tag:`      | `tag:#focused`     | Filtra por etiqueta                 |
| `assigned:` | `assigned:Tom`     | Filtra por persona delegada         |
| `project:`  | `project:HomeReno` | Filtra por nombre o ID de proyecto  |
| `location:` | `location:office`  | Filtra por ubicación de la tarea    |
| `where:`    | `where:office`     | Alias de ubicación de la tarea      |
| `id:`       | `id:abc123`        | Busca un ID de tarea exacto         |
| `-id:`      | `-id:abc123`       | Excluye un ID de tarea exacto       |
| `due:`      | `due:today`        | Tareas que vencen en una fecha      |
| `due:<=`    | `due:<=7d`         | Tareas que vencen en 7 días         |
| `start:`    | `start:>=tomorrow` | Tareas que comienzan desde una fecha|
| `created:`  | `created:>=30d`    | Tareas creadas en los últimos 30 días |
| `OR`        | `@home OR @work`   | Coincide con cualquiera de las condiciones |

**Formatos de fecha:** `today`, `tomorrow`, `7d` (7 días), `2w` (2 semanas), `1m` (1 mes), `2025-01-15`

#### Búsquedas guardadas

Las Búsquedas guardadas son accesos directos a consultas reutilizables:

1. Introduce tu consulta con operadores
2. Haz clic en el botón **«Guardar búsqueda»**
3. Ponle un nombre (por ejemplo, «Tareas de trabajo que vencen pronto»)
4. Accede a ella desde la sección **Búsquedas guardadas** de la barra lateral

**Para eliminar una búsqueda guardada:** abre la búsqueda y haz clic en el icono de la papelera.

Las Búsquedas guardadas son distintas de los **Filtros guardados** de Foco. Los Filtros guardados de Foco se sincronizan como criterios de filtrado y se editan desde los controles de filtro de Foco.

---

## Captura rápida

### Atajo global

Captura tareas desde cualquier lugar del escritorio sin cambiar de ventana:

1. Pulsa el atajo global (`Ctrl+Alt+M`)
2. Escribe la tarea con la sintaxis de adición rápida
3. Pulsa Enter para añadirla a la Bandeja de entrada
4. Continúa con lo que estabas haciendo

Puedes cambiar o desactivar este atajo en **Ajustes → General → Entrada → Atajo global de adición rápida**.
Los valores predeterminados siguen las convenciones de cada plataforma:
- macOS: `Ctrl+Option+M` (predeterminado), `Ctrl+Option+N`, `Ctrl+Option+Q` o el antiguo `Cmd+Shift+A`
- Linux: `Ctrl+Alt+M` (predeterminado), `Ctrl+Alt+N`, `Ctrl+Alt+Q` o el antiguo `Ctrl+Shift+A`
- Windows: desactivado de forma predeterminada para que Mindwtr nunca quite silenciosamente una combinación de teclas a otras aplicaciones; `Ctrl+Alt+M` es la opción recomendada al activarlo
- Evita la opción antigua `Ctrl+Shift+A`: Chrome, Word y Excel la usan, y un atajo global prevalece sobre ellos en todo el sistema

**Nota sobre Flatpak/Wayland:** algunos compositores no permiten atajos globales registrados por aplicaciones. En ese caso, vincula el atajo del escritorio a `flatpak run tech.dongdongbh.mindwtr --quick-add`.

### Icono de la bandeja

Haz clic en el icono de la bandeja del sistema para capturar al instante:

- Aparece el campo de adición rápida
- Usa sintaxis de lenguaje natural
- La tarea va directamente a la Bandeja de entrada

### Atajos del diálogo Añadir tarea

El diálogo Añadir tarea se puede manejar íntegramente con el teclado:

- `Enter`: guarda y cierra
- `Shift+Enter`: guarda y mantiene el diálogo abierto para la siguiente tarea (captura por lotes)
- `Ctrl+Enter` (`⌘Enter` en macOS): guarda y abre la tarea en el editor completo
- `Esc`: cierra sin guardar
- Mientras haya una ventana emergente de sugerencias abierta (`@`, `#`, `+`, `%`, `!`, `/`), `↑`/`↓` recorren las sugerencias y `Enter` o `Tab` inserta la resaltada

### Sintaxis de adición rápida

Mindwtr analiza lenguaje natural al añadir tareas:

| Sintaxis       | Ejemplo           | Resultado              |
| -------------- | ----------------- | ---------------------- |
| `@context`   | `@home`           | Añade un contexto        |
| `#tag`       | `#focused`        | Añade una etiqueta       |
| `+Project`   | `+HomeReno`       | Asigna a un proyecto     |
| `+Multi Word` | `+New Project`    | Asigna a "New Project" |
| `+"Quoted Name"` | `+"New Project" call Bob` | Las comillas delimitan un nombre de varias palabras dentro de una frase (también `!"Area Name"`) |
| `!Area`       | `Plan roadmap !Work` | Asigna a un área       |
| `%Person`     | `Ask %Jim for budget` | Establece Asignada a (persona delegada o responsable de En espera); `%"Full Name"` para nombres nuevos de varias palabras |
| `/area:<name>` | `/area:Personal` | Asigna a un área (sin espacios) |
| `/due:date`  | `/due:friday`     | Establece la fecha de vencimiento |
| `/energy:<level>` | `/energy:medium` | Establece el nivel de energía (`low`, `medium`, `high`) |
| `/note:text` | `/note:call back` | Añade una descripción    |
| `/status`    | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Establece el estado |

**Formatos de fecha:** today, tomorrow, friday, next week, in 3 days, 2025-01-15

Las frases sueltas como "next week" en el título se convierten en fechas porque **Detectar fechas en lenguaje natural** (Ajustes → GTD, activado por defecto) está habilitado. Desactívalo para que esas frases queden como texto literal del título; los tokens explícitos como `/due:friday` funcionan siempre. El ajuste se sincroniza entre tus dispositivos.

---

## Captura de audio y transcripción

Captura tareas con la voz mediante transcripción con IA.

### Configuración

1. Ve a **Ajustes → Asistente de IA**.
2. Activa **Voz a texto**.
3. Elige un **Proveedor**:
   - **OpenAI / Gemini**: requiere una clave de API (basado en la nube).
   - **Sin conexión (Whisper)**: se ejecuta localmente en tu dispositivo. Haz clic en **Descargar** para obtener el modelo una sola vez.
4. Configura el **Modo de procesamiento**:
   - **Análisis inteligente**: extrae fechas (`tomorrow`), prioridades y proyectos de la voz.
   - **Solo transcripción**: transcribe el texto literalmente en la tarea.

### Usar la captura de audio

- **Adición rápida**: cambia el modo de captura a **Audio** (icono de micrófono) en la barra de Adición rápida.
- **Grabar**: haz clic en el micrófono para comenzar a grabar. Di la tarea con naturalidad.
- **Finalizar**: haz clic en detener para transcribir. El texto aparecerá en el campo de entrada.
- **Adjuntos**: activa «Guardar adjuntos de audio» en **Ajustes → General** para conservar la nota de voz original.

---

## Notificaciones y recordatorios

Mindwtr envía notificaciones de escritorio para ayudarte a mantener el rumbo:

### Tipos de notificaciones

- **Recordatorios de fecha de vencimiento**: avisan cuando vencen las tareas
- **Avisos de hora de inicio**: te recuerdan cuándo debes empezar
- **Recordatorios de tareas recurrentes**: notificaciones de elementos recurrentes

### Ajustes

Configura las notificaciones en Ajustes:
- Activa o desactiva las notificaciones
- Establece el tiempo de antelación del recordatorio

**Notas sobre plataformas:**
- **macOS** solicitará permiso para las notificaciones la primera vez que las actives.
- **Linux** necesita un demonio de notificaciones en ejecución (GNOME/KDE, etc.).

---

## Gestión de tareas

### Crear tareas

1. Usa el campo de entrada de la parte inferior de cualquier vista de lista
2. Usa el atajo global desde cualquier lugar
3. Haz clic en el icono de la bandeja para capturar rápidamente
4. En Flatpak/Wayland, vincula `flatpak run tech.dongdongbh.mindwtr --quick-add` como atajo personalizado si el atajo integrado no está disponible
5. Escribe el título de la tarea con la sintaxis de adición rápida
6. Pulsa Enter para añadirla

### Editar tareas

- Haz clic en una tarea para abrir el panel de edición
- Edita: título, estado, contextos, etiquetas, descripción y ubicación
- Define: fecha de vencimiento, fecha de inicio, fecha de revisión, estimación de tiempo y recurrencia
- Gestiona los elementos de la lista de comprobación
- El Markdown de la descripción admite listas no ordenadas y casillas de tareas (`- item`, `[ ] item`, `[x] item`)
- Con el control **Detalles** de la lista activo, las filas muestran la primera línea de la descripción como Markdown; amplía una fila para leer la descripción completa
- Escribe `[[` en descripciones de tareas o notas de proyectos para enlazar otra tarea o proyecto desde un selector flotante
- Esos enlaces solo sirven para navegar; no sincronizan el estado de finalización entre tareas
- Las casillas Markdown de la descripción son solo notas; no afectan a la lista de comprobación de la tarea
- Pega texto de varias líneas en un elemento de la lista para crear un elemento por línea (se reconocen viñetas, numeración y marcadores `[x]`)
- Asigna la tarea a un proyecto

### Propiedades de las tareas

| Propiedad          | Descripción                                         |
| ------------------ | --------------------------------------------------- |
| **Estado**        | inbox, next, waiting, someday, done, archived       |
| **Prioridad**      | low, medium, high, urgent                           |
| **Contextos**      | Etiquetas de ubicación/herramienta (p. ej., @home, @work) |
| **Etiquetas**      | Etiquetas de energía/modo (p. ej., #focused, #lowenergy) |
| **Fecha de vencimiento** | Cuándo vence la tarea                         |
| **Fecha de inicio** | Cuándo empezar a trabajar en ella                   |
| **Fecha de revisión** | Fecha de seguimiento para revisarla               |
| **Estimación de tiempo** | 5min, 10min, 15min, 30min, 1hr, 2hr, 3hr, 4hr, 4hr+ |
| **Recurrencia**    | diaria, semanal, mensual, anual + estrategia         |
| **Lista de comprobación** | Subelementos para tareas de varios pasos     |
| **Descripción**   | Notas con formato Markdown y vista previa            |
| **Adjuntos**      | Archivos y enlaces adjuntos a la tarea               |
| **Ubicación**     | Ubicación física                                     |
| **Persona asignada** | Persona delegada para En espera y búsquedas `assigned:` |
| **Proyecto**      | Asignación al proyecto principal                     |
| **Sección**       | Grupo opcional dentro de un proyecto                 |

**Adjuntos:** el campo **Añadir enlace** acepta tanto URL como rutas de archivo locales (p. ej., `/home/user/doc.pdf`, `C:\Users\you\file.txt` o `file://...`).
Consulta [Adjuntos](/es/use/attachments) para obtener información sobre sincronización, limpieza y notas de audio.

### Tareas recurrentes

Cuando completas una tarea recurrente, Mindwtr crea automáticamente la siguiente instancia con las fechas actualizadas.

- **Estricta** (predeterminada): mantiene una cadencia fija.
  Ejemplo: cada 5 días se mantiene anclada al ciclo previsto.
- **Repetir después de completar**: desplaza la próxima fecha de vencimiento desde la hora de finalización.
  Ejemplo: si se completa ahora, la siguiente vence 5 días después.
- **Finaliza: Nunca / En una fecha / Después de N repeticiones**: elige si la serie continúa para siempre, se detiene en una fecha concreta o termina tras un número fijo de repeticiones.
  `After N occurrences` cuenta la tarea actual como parte del total de la serie.

Mindwtr mantiene una instancia activa de cada tarea recurrente. El Calendario muestra esa instancia actual cuando tiene fecha de vencimiento u hora de inicio; las repeticiones futuras no se rellenan de antemano hasta completar la actual, salvo que se active **Mostrar próxima repetición en el Calendario** como vista previa solo para planificación.

Puedes activar esta opción en el campo de recurrencia del editor con **Repetir después de completar**.
Usa la misma hoja de recurrencia para establecer una fecha final o un número de repeticiones cuando necesites que la serie se detenga automáticamente.


---

## Acciones en bloque

Selecciona varias tareas para realizar operaciones por lotes:

1. Haz clic en el botón **«Seleccionar»** del encabezado de la lista
2. Haz clic en las tareas para seleccionarlas o anular la selección
3. Usa la barra de acciones para:
   - **Mover**: cambia el estado de todas las seleccionadas
   - **Asignar área**: mueve todas las tareas seleccionadas a un área concreta (o borra el área)
   - **Añadir etiqueta**: añade una etiqueta a todas las seleccionadas
   - **Quitar etiqueta**: quita una etiqueta de todas las tareas seleccionadas
   - **Añadir contexto**: añade un contexto a todas las tareas seleccionadas
   - **Quitar contexto**: quita un contexto de todas las tareas seleccionadas
   - **Eliminar**: elimina todas las seleccionadas
4. Haz clic en **«Hecho»** para salir del modo de selección

### Ordenación

Usa el desplegable de ordenación para ordenar las tareas por:
- Predeterminado (según el estado)
- Fecha de vencimiento
- Fecha de inicio
- Fecha de revisión
- Título (alfabéticamente)
- Creación (más antiguas/más recientes)

Dentro de un proyecto, el orden elegido se recuerda por proyecto y se sincroniza con tus otros dispositivos. Los proyectos sin orden elegido usan el orden manual, y arrastrar para reordenar sigue disponible mientras el proyecto esté en Predeterminado.

---

## Contextos y etiquetas jerárquicos

Organízate con contextos y etiquetas anidados:

| Ejemplo          | Coincidencias                    |
| ---------------- | -------------------------------- |
| `@work`          | `@work`, `@work/meetings`, etc.  |
| `@work/meetings` | Solo `@work/meetings`            |
| `#health`        | `#health`, `#health/diet`, etc.  |

Filtrar por un contexto superior incluye todos sus descendientes.

---

## Atajos de teclado

Mindwtr admite los preajustes de teclas **Estándar** (estilo Gmail/Todoist), **Vim** y **Emacs**. Cámbialos en Ajustes.

Consulta [Atajos de teclado de escritorio](/es/use/keyboard-shortcuts) para ver la lista completa.

**Referencia rápida (Estándar):**
- `/`: abre la búsqueda
- `?`: muestra la ayuda de atajos
- `gi`: va a la Bandeja de entrada
- `gn`: va a Próximas
- `gf`: va a Foco
- `j/k`: mueve la selección abajo/arriba
- `Enter`: abre la tarea seleccionada
- `Shift+Enter`: edita la tarea seleccionada
- `e`: marca como terminada/no terminada
- `x`: selecciona o anula la selección para acciones por lotes
- `#`: elimina la tarea
- `z`: deshace la última finalización/eliminación

**Referencia rápida (Vim):**
- `j/k`: mueve la selección abajo/arriba
- `Enter`: abre la tarea seleccionada
- `e`: edita la tarea seleccionada
- `x`: alterna el estado terminado
- `dd`: elimina la tarea

`Ctrl+Z` / `Cmd+Z` deshace la última finalización o eliminación de una tarea en todos los preajustes.

En todos los preajustes, `s` seguida de una letra establece directamente el estado de la tarea seleccionada (`si` Bandeja de entrada, `sn` Próxima, `sw` En espera, `ss` Algún día, `sd` Terminada, `sa` Archivada) y muestra un aviso para deshacer. `Insert` lleva al campo de añadir tarea (o abre la adición rápida cuando la lista no tiene ninguno).

---

## Ajustes

Abre Ajustes desde la barra lateral.

### General
- **Apariencia**: Clara, Oscura o Sistema
- **Idioma**: inglés, chino (simplificado), chino (tradicional), hindi, español, árabe, francés, portugués, ruso, alemán, japonés, vietnamita, turco, coreano, italiano, polaco, neerlandés, checo
- **Atajos de teclado**: preajuste Estándar, Vim o Emacs
- **Abrir al iniciar**: inicia Mindwtr automáticamente al iniciar sesión

### Notificaciones

**Recordatorios de tareas:**
- Activa o desactiva las notificaciones de tareas para fechas de vencimiento y horas de inicio

**Resumen diario:**
- **Informe matinal**: resumen de tareas que vencen hoy, atrasadas y de Foco
- **Revisión vespertina**: aviso para revisar y cerrar el día
- Configura las horas (p. ej., 9:00 AM, 8:00 PM)

**Revisión semanal:**
- **Recordatorios**: recibe una notificación semanal para comenzar la revisión
- **Día/hora de revisión**: personaliza cuándo quieres recibir el recordatorio

### GTD
- **Archivado automático**: mueve automáticamente las tareas Terminadas a Archivadas tras el número de días indicado (predeterminado: 7 días), o elige **Nunca** para conservarlas en Terminadas. Al reducir el intervalo, las tareas Terminadas existentes que ya superen el nuevo límite se archivan inmediatamente.
- **Límite de tareas de Foco**: elige cuántas tareas se pueden marcar para el Foco de hoy
- **Funciones**: señales opcionales que puedes activar cuando las necesites:
  - **Prioridades**: muestra una bandera de prioridad en las tareas
  - **Estimaciones de tiempo**: añade un campo de duración para organizar bloques de tiempo
- **Procesamiento de la Bandeja de entrada**: conserva el procesamiento guiado para aprender GTD o cambia el modo predeterminado a **Rápido** para un flujo compacto de una sola pantalla
  - Elige si se muestra el atajo de 2 minutos, se pregunta pronto por el proyecto, se incluyen contextos/etiquetas, se permite programar y se ofrece la opción de referencia durante el procesamiento
- **Diseño del editor de tareas**: elige qué campos se muestran de forma predeterminada, muévelos entre secciones y ordénalos
  - Elige el estilo de apertura del editor: **Panel lateral** para ediciones en línea o **Ventana emergente** para una edición centrada
  - Puedes mover campos como **Fecha de vencimiento** a **Programación** y elegir qué secciones se amplían de forma predeterminada
- **Gestionar**: mantén tus metadatos reutilizables desde un solo lugar
  - Edita **Áreas**, **Personas**, **Contextos** y **Etiquetas** sin buscarlos en tareas individuales
  - Personas conserva nombres reutilizables de responsables, notas y enlaces de referencia para el trabajo delegado y las sugerencias
  - Consulta [Áreas y personas](/es/use/areas-people) para saber dónde crearlas mientras las asignas

### Datos y sincronización

**Backend de sincronización:**
- **Sincronización en la nube**: Dropbox en compilaciones compatibles, además de iCloud en macOS cuando esté disponible
- **Sincronización de carpeta/archivo**: sincronización mediante un archivo o carpeta JSON compartido (Google Drive, Syncthing, OneDrive, etc.)
- **Servidor avanzado/personalizado**: WebDAV o Mindwtr Cloud autoalojado

**Opciones de sincronización de ajustes:**
- Elige qué preferencias se sincronizan entre dispositivos (tema, idioma/formato de fecha, valores GTD predeterminados, URL de calendarios externos, ajustes de IA y Filtros guardados)
- Las claves de API y las rutas de modelos locales nunca se sincronizan

**Estado de sincronización:**
- El pie de la barra lateral muestra la hora de la última sincronización y el estado conectado/sin conexión

Para WebDAV, configura:
- URL del servidor (URL de la carpeta; Mindwtr guarda `data.json` dentro)
- Nombre de usuario y contraseña

Consulta [Datos y sincronización](/es/data-sync/) para ver instrucciones detalladas.

### Acerca de
- Información de versión
- Buscar actualizaciones
- **Enviar comentarios** para informar de errores, solicitar funciones o enviar otras notas cuando la compilación tenga habilitados los comentarios. Puedes incluir un correo de respuesta si quieres seguimiento.
- Enlaces al sitio web y GitHub

---

## Consulta también

- [Instalación de escritorio](/es/start/desktop-installation)
- [Atajos de teclado de escritorio](/es/use/keyboard-shortcuts)
- [Datos y sincronización](/es/data-sync/)
