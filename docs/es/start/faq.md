# Preguntas frecuentes

Preguntas frecuentes sobre Mindwtr.

---

## General

### ¿Qué es Mindwtr?

Mindwtr es una aplicación de productividad multiplataforma basada en Getting Things Done (GTD) que te ayuda a capturar, aclarar, organizar y abordar tus tareas. Está disponible para escritorio (Windows, macOS, Linux) y dispositivos móviles (Android, iOS).

### ¿Mindwtr es gratuito? ¿Seguirá siendo gratuito?

Sí. Mindwtr es de código abierto (AGPL-3.0) y de uso gratuito. No hay muros de pago, suscripciones ni niveles prémium para la sincronización o cualquier otra función. El plan es que siga siendo así: el buen software debería estar al alcance de todo el mundo, independientemente de su situación económica, y el apoyo debería proceder de quienes decidan contribuir, no de un muro de pago.

El proyecto tiene costes continuos reales: la cuota anual para desarrolladores de Apple, el alojamiento, las herramientas de desarrollo y el tiempo dedicado a funciones, correcciones y asistencia a la comunidad. Las [donaciones](https://mindwtr.app/donate) son lo que permite mantenerlo.

Una salvedad sincera: actualmente las donaciones no cubren los costes y el mantenedor asume la diferencia. Si algún día esa diferencia creciera demasiado como para mantenerla, podría añadirse un servicio de pago opcional (por ejemplo, un servidor de sincronización alojado para quienes no quieran autohospedarlo) para cubrirla. La aplicación en sí seguirá siendo gratuita y de código abierto en cualquier caso. Nada de lo que puedes hacer hoy pasaría a estar tras un muro de pago.

### ¿Durante cuánto tiempo se mantendrá Mindwtr?

Mindwtr es un proyecto vocacional y también la herramienta con la que el mantenedor organiza su propia vida, así que se mantiene porque él necesita que se mantenga. El historial de confirmaciones muestra con franqueza cómo se traduce eso en la práctica.

Ningún proyecto individual puede prometer «para siempre», por lo que Mindwtr está diseñado para que, en su lugar, el peor caso sea seguro: es local-first, tus datos viven en formatos abiertos dentro de archivos que controlas y el código tiene licencia AGPL con compilaciones reproducibles en canales independientes. Aunque se detuviera el desarrollo, la aplicación seguiría funcionando sin conexión, tus datos seguirían siendo legibles y cualquiera podría bifurcar el código. Puedes confiarle tu flujo de trabajo o abandonarla en cualquier momento con tus datos intactos.

### ¿Mindwtr está generado por IA? ¿Cuál es la postura del proyecto sobre la IA?

Mindwtr está asistido por IA, no generado por IA. Esa distinción importa.

La arquitectura, la dirección del producto, el diseño de funciones y la filosofía GTD de Mindwtr son diseñados y asumidos por el mantenedor. Las herramientas de IA ayudan con la ejecución: permiten esbozar implementaciones más deprisa, reducir el código repetitivo, mejorar la redacción y acelerar la investigación de errores. Cada cambio publicado sigue definiéndose, revisándose y probándose, y el mantenedor asume la responsabilidad del resultado.

El desarrollo asistido por IA es una práctica habitual de ingeniería de software hoy en día, tanto en grandes empresas tecnológicas como en el código abierto. La IA es una herramienta, como los IDE, el autocompletado, la documentación y Stack Overflow. Usarla no elimina el trabajo del desarrollador; desplaza una mayor parte de ese trabajo hacia la dirección, el criterio, la revisión, la integración y la validación.

Mindwtr lo mantiene un único desarrollador con más de 10 años de experiencia en ingeniería de software. Esa experiencia es lo que hace que la IA sea útil en lugar de peligrosa: saber qué crear, qué no crear, cuándo un resultado es incorrecto y cómo mantener la coherencia del sistema. La IA ayuda a que un proyecto tan amplio pueda seguir siendo mantenido por una sola persona, pero no decide el diseño ni es responsable del resultado.

El mantenedor escribe las respuestas a incidencias y conversaciones. Puede usarse IA para pulir la redacción en inglés, pero ningún agente clasifica ni responde automáticamente a las incidencias.

Para contribuir, consulta la [sección sobre programación asistida por LLM de CONTRIBUTING.md](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md#llm-assisted-coding-vibe-coding).

### ¿Por qué hay tantas confirmaciones e informes de incidencias?

Mindwtr es una aplicación multiplataforma para usuarios finales, no una pequeña CLI o biblioteca con una única superficie de comandos limitada. Incluye clientes de escritorio y móviles, persistencia local-first, backends de sincronización, importaciones, notificaciones, captura rápida, widgets, traducciones, canales de instalación y decisiones sobre el flujo de trabajo GTD. Un producto así genera muchas confirmaciones pequeñas de seguimiento porque el pulido de la interfaz, las diferencias entre plataformas, las correcciones de empaquetado y los informes sobre casos extremos forman parte del mantenimiento normal.

El recuento público de incidencias también es amplio de forma intencionada. Las incidencias de GitHub incluyen solicitudes de funciones, mejoras de experiencia de usuario, casos particulares de cada plataforma, informes sobre el empaquetado de versiones, carencias de documentación y errores confirmados. Muchos informes no bloquean el flujo principal de capturar, organizar y revisar, pero se siguen registrando públicamente para que los usuarios puedan ver qué se conoce y qué ha cambiado. Las correcciones rápidas de seguimiento forman parte del modelo de mantenimiento; no indican que las incidencias se ignoren u oculten.

### ¿Hay una hoja de ruta o una página de próximas funciones?

No mantenemos una página con una hoja de ruta fija. La hoja de ruta viva es la lista de incidencias de GitHub:
https://github.com/dongdongbh/Mindwtr/issues

Si quieres solicitar una función, abre una incidencia y describe el flujo de trabajo que intentas hacer posible.

### ¿Dónde debo informar de errores o solicitar funciones?

El mejor lugar es una **incidencia de GitHub**. Mantiene juntos los registros, los detalles del dispositivo y el seguimiento en un lugar rastreable y consultable, para que nada se pierda:
https://github.com/dongdongbh/Mindwtr/issues

Otras formas de contactar:

- **Comentarios desde la aplicación**: usa **Enviar comentarios** en **Ajustes → Acerca de** cuando esté disponible en tu compilación. Envía un informe de error, una solicitud de función u otra nota sin necesidad de una cuenta de GitHub, y el campo de correo para recibir respuesta es opcional. Para los informes de errores, **Incluir diagnósticos recientes** adjunta una instantánea limitada de las vistas y acciones recientes dentro de la aplicación, además de cualquier registro de diagnóstico reciente disponible; funciona incluso si el registro detallado está desactivado y la instantánea añadida no se guarda en el dispositivo. Consulta la [política de privacidad](https://mindwtr.app/privacy) para obtener más información.
- **Correo electrónico**: para cualquier cuestión que no encaje en una incidencia pública (una pregunta privada o sobre una cuenta), escribe a [support@mindwtr.app](mailto:support@mindwtr.app).

Si informas de un error, incluye tu **plataforma** y la **versión de la aplicación** (Ajustes → Acerca de) para que sea más fácil ayudarte.

Si Mindwtr te resulta útil, las opciones de apoyo figuran en la [página de apoyo](https://mindwtr.app/support).

### ¿Puedo abrir varias ventanas?

Actualmente no. La aplicación de escritorio usa una sola ventana para mantener seguro y coherente el modelo de datos SQLite local-first. La compatibilidad con varias ventanas es una solicitud habitual, pero aún no está disponible.

### ¿Hay una página de donaciones?

Sí. Consulta la [página de donaciones](https://mindwtr.app/donate) para conocer todas las formas de apoyar el proyecto.

### ¿Qué idiomas son compatibles?

Mindwtr admite actualmente estas opciones de idioma, enumeradas aproximadamente por el número total de hablantes en todo el mundo:

- Inglés
- 中文（简体）
- 中文（繁體）
- हिन्दी
- Español
- العربية
- Français
- Português
- Русский
- Deutsch
- 日本語
- Tiếng Việt
- Türkçe
- 한국어
- Italiano
- Polski
- Nederlands
- Čeština

### ¿Dónde se guardan mis datos?

Todos los datos se almacenan localmente en tu dispositivo:
- **Datos de escritorio (Linux):** `~/.local/share/mindwtr/data.json`
- **Configuración de escritorio (Linux):** `~/.config/mindwtr/config.toml`
- **Windows/macOS:** `%APPDATA%/mindwtr/` o `~/Library/Application Support/mindwtr/`
- **Dispositivos móviles:** almacenamiento interno de la aplicación

Consulta [Datos y sincronización](/es/data-sync/) para obtener más información.

### ¿Existe sincronización en la nube?

Mindwtr admite sincronización de archivos, WebDAV, sincronización con una nube autohospedada y sincronización con Dropbox (en las compilaciones compatibles). Consulta [Datos y sincronización](/es/data-sync/).

### ¿Qué método de sincronización es más rápido: una carpeta local o WebDAV?

Con hardware y distancia de red similares, **la sincronización con una carpeta local suele ser más rápida** que WebDAV. La sincronización de carpetas lee y escribe la instantánea mediante llamadas normales al sistema de archivos, mientras que WebDAV añade recorridos de ida y vuelta HTTP, autenticación y procesamiento del servidor en cada solicitud. La diferencia resulta más visible con archivos adjuntos grandes, que se transfieren como cargas y descargas individuales mediante WebDAV. Dicho esto, el cuello de botella suele ser el proveedor de almacenamiento que hay detrás de la carpeta (por ejemplo, un cliente de Syncthing o de una unidad en la nube que sincroniza en segundo plano), no Mindwtr. Elige el backend que se ajuste a tu configuración; consulta [Ciclo de vida de los datos](/es/data-sync/data-lifecycle) para saber qué se mueve realmente durante una sincronización.

### ¿Mindwtr admite directamente la sincronización con iCloud?

Sí, en las compilaciones compatibles para Apple.

- **iPhone / iPad:** el backend nativo de **iCloud** está disponible en **Ajustes → Sincronización**
- **Escritorio macOS:** el backend nativo de **iCloud** está disponible en **Ajustes → Sincronización**
- **Android / Windows / Linux:** no hay un backend nativo de iCloud

Consulta [Sincronización con iCloud](/es/data-sync/icloud) y [Datos y sincronización](/es/data-sync/).

### ¿Cómo sincronizo con OneDrive (especialmente en Android)?

Mindwtr ya funciona con OneDrive **mediante la sincronización de archivos**:

- **Windows/macOS:** coloca tu archivo `data.json` de Mindwtr dentro de la carpeta de OneDrive. OneDrive se encarga de la sincronización automáticamente.
- **Android:** la aplicación oficial de OneDrive **no** ofrece una verdadera sincronización bidireccional de carpetas.
  Usa una aplicación «puente» auxiliar, como **OneSync (Autosync for OneDrive)** o **FolderSync**, para mantener sincronizada una carpeta local.
  Después, dirige Mindwtr a esa carpeta local en **Ajustes → Sincronización** (Mindwtr usa el archivo `data.json` que contiene).

Es el mismo enfoque que usan aplicaciones local-first como Obsidian.

### ¿Por qué Mindwtr no tiene un botón «Iniciar sesión con OneDrive / Google Drive»?

Mindwtr es local-first y offline-first.

Mindwtr admite ahora la sincronización nativa mediante **Dropbox OAuth** en las compilaciones compatibles, pero **no** ofrece integración OAuth nativa con OneDrive/Google Drive.
Ampliarla a todos los proveedores añade una carga considerable de mantenimiento y cumplimiento normativo.

Para OneDrive/Google Drive, la sincronización de archivos mantiene tus datos bajo tu control y evita una gran carga de mantenimiento y seguridad.

### ¿Puede Mindwtr integrarse con el correo electrónico (Gmail/Outlook) o aceptar correos reenviados?

No directamente. Crear un cliente de correo completo requiere:

- Acceso OAuth a Gmail/Outlook (que ahora exige costosas auditorías de seguridad)
- Análisis sólido de MIME/HTML y gestión de archivos adjuntos
- Mantenimiento continuo entre proveedores

**Alternativas actuales:**
- **Escritorio:** pega enlaces `message://` o enlaces de correo en una tarea, o arrastra un correo a la nota de una tarea en los clientes que lo admitan.
- **Dispositivos móviles:** usa la hoja para compartir para enviar el contenido seleccionado de un correo a Mindwtr.

Mindwtr **no** ofrece un buzón `add@mindwtr.com` porque eso requeriría un servidor central que recibiera y almacenara tu correo.

---

## Funciones

### ¿Qué es GTD?

Getting Things Done (GTD) es una metodología de productividad creada por David Allen. Consta de cinco pasos: Capturar, Aclarar, Organizar, Reflexionar y Actuar. Consulta la [Introducción a GTD](/es/use/gtd-overview).

### ¿Cómo se representan los horizontes GTD en Mindwtr?

Mindwtr modela de forma nativa los horizontes inferiores:

- **Horizonte 0 (Acciones):** próximas acciones y listas de tareas.
- **Horizonte 1 (Proyectos):** entidades de proyecto explícitas.
- **Horizonte 2 (Áreas):** las áreas agrupan proyectos relacionados.

Para los horizontes 3–5 (Metas, Visión, Propósito), todavía no existe una entidad específica. La mayoría de los usuarios los registran mediante:

- Una lista de **Referencia** (o un área «Metas»)
- Notas de proyectos y enlaces a esos elementos de referencia
- La lista de comprobación de la revisión semanal

Si dependes de objetos explícitos de Meta/Visión, abre una incidencia con el flujo de trabajo y la cadencia de revisión que deseas.

### ¿Para qué sirve una sección de proyecto?

Una **sección de proyecto** es un grupo con etiqueta dentro de un proyecto. Usa secciones para mantener legible un proyecto largo, como **Diseño**, **Desarrollo** y **Contenido** dentro de un proyecto **Lanzar sitio web**.

Las secciones no son subtareas ni proyectos independientes. Son solo encabezados para tareas dentro del mismo resultado del proyecto.

El campo **Sección del proyecto** de una tarea la asigna a una de las secciones de su proyecto actual. Solo tiene efecto cuando la tarea ya pertenece a un proyecto que contiene secciones. Si la tarea no tiene proyecto o el proyecto no tiene secciones, déjalo en blanco.

### ¿Por qué puede un proyecto tener varias tareas Próxima?

En Mindwtr, **Próxima** es un estado de tarea: la tarea se ha aclarado y se puede realizar. No siempre equivale a «la única acción siguiente» de un proyecto.

El tipo de proyecto controla lo que se muestra:

- **Secuencial:** se muestra una tarea Próxima disponible a la vez. Las demás tareas Próxima permanecen en el proyecto y esperan su turno.
- **Paralelo:** pueden mostrarse varias tareas Próxima independientes porque se pueden realizar en cualquier orden.

Los pasos posteriores de un proyecto secuencial no son de **Referencia**. Referencia se usa para material auxiliar, notas y documentos sobre los que no hay que actuar.

### ¿Cómo marco un proyecto como terminado?

**Archívalo**: archivar es la forma de completar un proyecto en Mindwtr. Abre el proyecto y usa el botón **Archivar** (en el encabezado del proyecto en escritorio, bajo **Acciones** en los detalles del proyecto en dispositivos móviles). Las tareas sin terminar se completan con él y **Reactivar** lo restaura todo si lo archivaste demasiado pronto. Cuando terminas la última acción de un proyecto, el mensaje «¿Cuál es la próxima acción?» también ofrece directamente **Completar proyecto**, por lo que rara vez tendrás que buscar el botón. Un proyecto con todas sus tareas terminadas permanece activo hasta que cierres tú mismo el resultado, lo que sirve como recordatorio útil durante la revisión semanal.

### ¿Puedo convertir una tarea en un proyecto?

Sí. El lugar más sencillo es mientras procesas la Bandeja de entrada: cuando el flujo guiado pregunte si un elemento requiere más de un paso, responde que sí y la captura se convertirá en un proyecto, donde le darás un nombre y definirás su primera próxima acción. Las acciones adicionales que añadas volverán a la Bandeja de entrada con el proyecto ya adjunto, de modo que cada una pasará por su propio proceso de aclaración. Consulta el [Flujo de trabajo GTD](/es/use/gtd-workflow).

### ¿Por qué no aparece una tarea en Foco?

Foco muestra deliberadamente solo aquello en lo que puedes actuar ahora mismo, por lo que una tarea puede estar oculta por varios motivos:

- Tiene una **fecha de inicio futura**, por lo que reaparecerá cuando llegue esa fecha.
- Es una **tarea posterior de un proyecto secuencial**, por lo que solo se muestra la primera tarea disponible.
- Un **filtro de contexto** activo la excluye.
- Su estado no permite actuar sobre ella (Bandeja de entrada, Algún día, En espera).

Usa **Proyectos**, **Contextos** o **Buscar** para inspeccionar el inventario completo de tareas. Consulta [Cómo ordena Foco las acciones disponibles](/es/use/gtd-workflow#como-ordena-enfoque-las-acciones-disponibles).

### ¿Mindwtr admite fechas de inicio o ticklers?

Sí, ambos:

- La **fecha de inicio** aplaza una tarea: una fecha de inicio futura la oculta de Foco y de Próximas acciones, y reaparece con su estado actual cuando llega la fecha. Foco mantiene ocultas las tareas aplazadas hasta el día de inicio; en la lista Próximas acciones, se cuentan en el aviso «ocultas (inicio futuro)», que incluye un interruptor **Mostrar**.
- La **fecha de revisión** es un tickler: cuando llega, Mindwtr muestra la tarea para que vuelvas a considerarla. Nada cambia hasta que tú decidas.
- El **tiempo de antelación del inicio** vincula el inicio a la fecha límite (por ejemplo, hacerla visible dos días antes de la fecha límite).

Consulta [Fechas frente a estado](/es/use/gtd-workflow#fechas-frente-a-estado).

### ¿Cómo activo Prioridad o Tiempo estimado?

Mindwtr usa la divulgación progresiva, por lo que los campos opcionales están ocultos de forma predeterminada.

Controla los campos de edición de tareas en:

**Ajustes -> GTD -> Diseño del editor de tareas**

Activa allí **Prioridad** y **Tiempo estimado** (y reordena los campos si es necesario). Los campos ocultos siguen apareciendo bajo **Más** o cuando una tarea ya contiene información en ese campo.


### ¿Qué diferencia hay entre las tareas Terminadas y Archivadas?

Usa **Terminada** para las tareas que hayas completado recientemente. Las tareas terminadas conservan su fecha de finalización, siguen visibles en la vista Terminadas y resultan útiles durante la revisión diaria o semanal cuando quieres ver qué has terminado.

Usa **Archivada** para las tareas completadas que quieres guardar. Las tareas archivadas se ocultan de las listas de tareas normales y siguen disponibles en la vista Archivadas para buscarlas, restaurarlas o eliminarlas permanentemente. Archivar no elimina la tarea.

En la práctica, considera Terminadas como un registro de finalización a corto plazo y Archivadas como un historial a largo plazo. El ajuste **Archivado automático** puede mover automáticamente las tareas Terminadas a Archivadas después del número de días que elijas, o puedes configurarlo como **Nunca** si prefieres conservar todas las tareas completadas en Terminadas.


### ¿Cómo funcionan las tareas recurrentes?

Mindwtr admite dos estrategias de recurrencia:

- **Estricta** (programación fija): la siguiente fecha se basa en el propio patrón de programación.
  Ejemplo: cada 5 días mantiene esa cadencia aunque completes la tarea con retraso.
- **Repetir después de completar** (flexible): la siguiente fecha se calcula a partir del momento en que completas realmente la tarea.
  Ejemplo: si la completas hoy, la siguiente vencerá dentro de 5 días a partir de hoy.

Configura la recurrencia en el editor de tareas (diaria/semanal/mensual/anual) y después activa **Repetir después de completar** si quieres un comportamiento flexible.

Mindwtr mantiene una instancia activa de una tarea recurrente. No rellena de antemano futuras entradas del Calendario para la serie; la siguiente instancia de la tarea solo se crea cuando se completa la actual.

### ¿Puedo ver mis tareas de Mindwtr en Google Calendar o Apple Calendar?

Sí, se admite el envío unidireccional:

- **Android/iOS:** envía tareas con fecha a un calendario del dispositivo. Android está verificado con Google Calendar; en iOS, usa calendarios que ya estén disponibles en Apple Calendar. Lo mejor es usar en esa cuenta un calendario específico llamado `Mindwtr`.
- **Escritorio macOS:** envía tareas a Apple Calendar mediante EventKit.

Las *reglas* de las tareas recurrentes no se exportan como eventos recurrentes nativos del calendario. Solo se envían instancias concretas. Consulta [Integración con calendarios](/es/use/calendar-integration).

### ¿Mindwtr se integra con Obsidian?

Sí, en escritorio: importa una bóveda y Mindwtr conserva enlaces profundos a las notas originales, de modo que una tarea puede abrir directamente su nota de origen en Obsidian. Consulta [Obsidian](/es/power-users/obsidian).

### ¿Cómo recopilo registros para informar de un error?

El registro está desactivado de forma predeterminada. Actívalo solo cuando quieras informar de un error.

**Escritorio (Tauri):**
1. Ve a **Ajustes → Datos**.
2. Activa **Registro de depuración**.
3. Reproduce el problema.
4. Copia la ruta del **Archivo de registro** y adjunta el archivo a tu incidencia de GitHub.

Ubicación predeterminada del registro en Linux: `~/.local/share/mindwtr/logs/mindwtr.log`

**Dispositivos móviles:**
1. Ve a **Ajustes → Datos**.
2. Activa **Registro de depuración**.
3. Reproduce el problema.
4. Pulsa **Compartir registro** y adjúntalo a tu incidencia de GitHub.

Los registros son exclusivamente locales y ocultan las credenciales habituales (contraseñas/tokens) antes de escribirlas.

### ¿Puedo usar lenguaje natural para añadir tareas?

¡Sí! Mindwtr admite la sintaxis de adición rápida:
- `@context`: añade un contexto
- `#tag`: añade una etiqueta
- `!Area` o `/area:<name>`: asigna un área
- `%Person`: establece la persona asignada (`%"Full Name"` para nombres nuevos de varias palabras)
- `/due:date`: establece la fecha límite (today, tomorrow, friday, next week, etc.)
- `/energy:low`, `/energy:medium` o `/energy:high`: establece el nivel de energía
- `/note:text`: añade una descripción
- `/status`: establece el estado (`/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox`)
- `+ProjectName`: asigna un proyecto

Ejemplo: `Call client /due:friday @phone`

### ¿Qué son los contextos?

Los contextos son etiquetas que indican dónde o con qué puedes completar una tarea. Ejemplos: `@home`, `@work`, `@phone`, `@computer`. Filtra por contexto para ver únicamente las tareas que puedes hacer ahora mismo. Consulta [Contextos y etiquetas](/es/use/contexts-tags).

### ¿Qué diferencia hay entre un contexto y un área?

Responden a preguntas distintas:

- Un **Área** responde: *«¿Con qué parte de mi vida o mi trabajo está relacionada esta responsabilidad?»* (Trabajo, Hogar, Salud, un cliente…)
- Un **Contexto** responde: *«¿Qué puedo hacer ahora mismo, teniendo en cuenta dónde estoy y qué tengo?»* (`@computer`, `@errands`…)

Una tarea puede tener los tres: **Área: Cliente A**, **Proyecto: Renovar sitio web**, **Contexto: @computer**. Consulta la [Introducción a GTD](/es/use/gtd-overview).

### ¿Cómo capturo tareas rápidamente?

**Escritorio:**
- Usa el atajo global para abrir la adición rápida desde cualquier lugar
- En Flatpak/Wayland, vincula `flatpak run tech.dongdongbh.mindwtr --quick-add` a un atajo personalizado del sistema si el atajo integrado no está disponible
- Haz clic en el icono de la bandeja para capturar al instante
- Escribe en el campo de entrada de cualquier vista

**Dispositivos móviles:**
- Usa la hoja para compartir para capturar desde cualquier aplicación
- Añade el widget de inicio para capturar con un toque
- Usa el campo de entrada de la pestaña Bandeja de entrada

---

## Escritorio

### ¿Cuáles son los atajos de teclado?

Mindwtr admite configuraciones de atajos de Vim y Emacs. Pulsa `?` (Vim) o `Ctrl-h` (Emacs) para ver todos los atajos. Consulta [Atajos de teclado para escritorio](/es/use/keyboard-shortcuts).

### ¿Cómo cambio el tema?

Ve a Ajustes → Apariencia. Elige Claro, Oscuro o Sistema.

### ¿Cómo sincronizo con mi teléfono?

1. Configura una carpeta de sincronización en Ajustes (dirígela a Dropbox, Syncthing, etc.)
2. En el dispositivo móvil, selecciona la carpeta de sincronización en Ajustes → Sincronización
3. Ambas plataformas se sincronizan automáticamente al cambiar los datos y al cambiar de aplicación

Consulta [Datos y sincronización](/es/data-sync/).

### ¿Admite notificaciones?

¡Sí! Mindwtr envía notificaciones de escritorio para:
- Recordatorios de fechas límite
- Alertas de hora de inicio
- Recordatorios de tareas recurrentes

Puedes posponer las notificaciones para más tarde.

**macOS** solicitará permiso la primera vez que actives las notificaciones. En **Linux**, asegúrate de que se esté ejecutando un demonio de notificaciones.

## Dispositivos móviles

### ¿Qué plataformas son compatibles?

- **Android:** compatibilidad completa mediante Google Play o descarga del APK
- **iOS:** disponible en App Store y mediante la beta de TestFlight. Mantener la versión de App Store sigue exigiendo una cuota anual de Apple Developer, por lo que el patrocinio ayuda a mantener disponible iOS.

### ¿Por qué la edición se percibe diferente en escritorio y en dispositivos móviles?

Mindwtr sigue las convenciones de cada plataforma:
- **Escritorio:** un clic alterna los detalles, un doble clic abre el modo de edición completo (cambia el nombre de un título directamente mediante el menú `⋯` de la tarea) y un clic derecho abre los menús contextuales.
- **Dispositivos móviles:** un toque abre el modo de edición y los gestos de deslizamiento permiten realizar cambios rápidos.

Estos patrones hacen que la aplicación sea rápida y familiar en cada plataforma.

### ¿Cómo instalo Mindwtr en Android?

Instálalo desde Google Play o descarga el APK desde [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases). Habilita «Instalar desde fuentes desconocidas» si se te solicita. Consulta [Instalación en dispositivos móviles](/es/start/mobile-installation).

### ¿Cómo capturo desde otras aplicaciones?

¡Usa la **hoja para compartir**! Cuando estés viendo contenido en cualquier aplicación (navegador, correo electrónico, notas), pulsa Compartir y selecciona Mindwtr. Mindwtr abre la pantalla de captura con el contenido compartido en la nota para que puedas añadir un título, ajustar los campos y guardarlo en tu Bandeja de entrada.

### ¿Hay un widget?

¡Sí! Añade el widget de Mindwtr a tu pantalla de inicio para capturar rápidamente y ver elementos de Foco.

### ¿Es obligatorio el asistente de IA?

No. El asistente de IA es opcional y está desactivado de forma predeterminada. Mindwtr funciona por completo sin él.
Cuando se activa, usa tu propia clave de API (BYOK). Consulta [Asistente de IA](/es/power-users/ai-assistant).

### ¿Cómo funcionan los gestos de deslizamiento?

En la Bandeja de entrada, desliza una tarea hacia la derecha para marcarla como Terminada. Otras vistas pueden tener acciones de deslizamiento diferentes.

### ¿Cómo sincronizo con el escritorio?

1. Exporta una copia de seguridad a tu carpeta de sincronización (Google Drive, Syncthing, etc.)
2. Selecciona esa carpeta en Ajustes → Sincronización
3. La aplicación se sincroniza automáticamente cuando cambian los datos y cuando pasa a segundo plano

Consulta [Datos y sincronización](/es/data-sync/).

### ¿La aplicación móvil envía notificaciones?

¡Sí! Mindwtr envía notificaciones push para:
- Recordatorios de fechas límite
- Alertas de hora de inicio
- Avisos de resumen diario
- Recordatorios de la revisión semanal

Puedes posponer las notificaciones directamente desde la notificación.
Al tocar el cuerpo de la notificación se abre la pantalla **Revisión**.

---

## Sincronización y datos

### ¿Perderé datos si sincronizo?

No. Mindwtr usa la combinación Last-Write-Wins y conserva la versión más reciente de cada elemento. Los elementos eliminados de forma reversible se sincronizan correctamente entre dispositivos.

### ¿Puedo usar varios servicios de sincronización?

Recomendamos usar una sola carpeta de sincronización para evitar conflictos. Elige un servicio (Dropbox, Google Drive, Syncthing) y úsalo de forma coherente.

### ¿Cómo hago una copia de seguridad de mis datos?

**Escritorio:** usa **Ajustes → Datos → Exportar copia de seguridad** o haz una copia de `data.json` desde la carpeta de datos de la aplicación.
**Dispositivos móviles:** usa **Ajustes → Datos → Exportar copia de seguridad** para guardar una copia.

Consulta [Copias de seguridad y restauración](/es/data-sync/backup-restore).

### ¿Puedo restaurar tareas eliminadas?

Todavía no hay una interfaz para recuperar una sola tarea, pero puedes restaurar tus datos locales desde una copia de seguridad o instantánea de recuperación anterior.

Consulta [Copias de seguridad y restauración](/es/data-sync/backup-restore).

### ¿Puedo importar desde TickTick?

Sí. Mindwtr puede importar copias de seguridad CSV y ZIP de TickTick desde **Ajustes → Datos → Importar desde TickTick**.

- Las carpetas de TickTick se convierten en áreas de Mindwtr
- Las listas de TickTick se convierten en proyectos de Mindwtr
- El contenido de las listas de comprobación, las etiquetas, las fechas, las prioridades y las reglas de repetición compatibles se conservan cuando es posible

Consulta [Importación desde TickTick](/es/import/ticktick).

### ¿Puedo importar desde Todoist?

Sí. Mindwtr puede importar exportaciones CSV y copias de seguridad ZIP de Todoist desde **Ajustes → Datos → Importar desde Todoist**.

- Los proyectos de Todoist se convierten en proyectos de Mindwtr
- Las subtareas se convierten en elementos de listas de comprobación
- Las tareas activas asignadas a proyectos permanecen en sus proyectos; las tareas activas sin asignar siguen disponibles para procesarlas en la Bandeja de entrada

Consulta [Importación desde Todoist](/es/import/todoist).

### ¿Puedo importar desde DGT GTD?

Sí. Mindwtr puede importar exportaciones JSON y archivos ZIP de DGT GTD desde **Ajustes → Datos → Importar desde DGT GTD**.

- Las carpetas de DGT se convierten en áreas de Mindwtr
- Los proyectos de DGT se convierten en proyectos de Mindwtr
- Las listas de comprobación de DGT se convierten en tareas de lista de comprobación
- Los contextos y las etiquetas de DGT se conservan

Los patrones de repetición de DGT no compatibles se importan una vez y el texto original de repetición se conserva en la descripción.

Consulta [Importación desde DGT GTD](/es/import/dgt-gtd).

### ¿Puedo importar desde OmniFocus?

Sí. Mindwtr puede importar exportaciones CSV de OmniFocus y exportaciones JSON / ZIP de Omni Automation desde **Ajustes → Datos → Importar desde OmniFocus**.

- Las carpetas de OmniFocus pueden convertirse en áreas de Mindwtr cuando haya metadatos disponibles
- Los proyectos de OmniFocus se convierten en proyectos de Mindwtr cuando es necesario
- Las acciones independientes de OmniFocus permanecen fuera de los proyectos
- Se conservan las notas, etiquetas, fechas de aplazamiento, fechas límite, estados de finalización y recurrencias compatibles de la vía JSON
- Las tareas anidadas sencillas pueden convertirse en elementos de listas de comprobación, mientras que las jerarquías más profundas se aplanan conservando la ruta original

Si la recurrencia es importante, usa la exportación JSON / ZIP de Omni Automation en lugar de CSV. Las fechas planificadas y el texto de duración se guardan en la descripción cuando Mindwtr no tiene un campo directo para ellos.

Consulta [Importación desde OmniFocus](/es/import/omnifocus).

### ¿Puedo importar desde Recordatorios de Apple?

Sí, en iPhone y iPad. Mindwtr puede importar recordatorios incompletos de Apple desde **Ajustes → Datos → Importar desde Recordatorios de Apple**.

- Elige la lista de Recordatorios desde la que quieres importar
- Los recordatorios importados se convierten en tareas de Mindwtr
- Opcionalmente, puedes eliminar los recordatorios de Recordatorios de Apple después de que Mindwtr confirme la importación

La importación desde Recordatorios de Apple es unidireccional, no una sincronización. Consulta [Importación desde Recordatorios de Apple](/es/data-sync/#importacion-de-recordatorios-de-apple-ios).

---

## Solución de problemas

### La aplicación no se inicia (escritorio Linux)

Asegúrate de que WebKitGTK esté instalado:
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### ¿Por qué ocupa tanto el directorio de instalación o compilación de AUR?

Usa `mindwtr-bin` en las distribuciones basadas en Arch, a menos que quieras específicamente compilar desde el código fuente:

```bash
yay -S mindwtr-bin
```

`mindwtr-bin` instala el paquete precompilado de GitHub Releases y debería ser la vía pequeña y rápida de AUR. El paquete de código fuente, `mindwtr`, compila localmente la aplicación de escritorio y debe descargar las dependencias de compilación de una aplicación Tauri, Rust, Bun y React. Esto puede usar mucho más espacio en disco durante la compilación.

El paquete de código fuente está pensado para obtener el archivo de la etiqueta de la versión en lugar de todo el historial de Git. Si un auxiliar de AUR parece descargar un repositorio de Git muy grande, comprueba que instalaste `mindwtr-bin` para usar la vía del paquete binario o informa del comportamiento del paquete de código fuente para que pueda corregirse la receta de AUR.

### La aplicación se cierra al iniciarse (dispositivos móviles)

Prueba a borrar los datos de la aplicación:
1. Ve a Ajustes → Aplicaciones → Mindwtr
2. Pulsa Almacenamiento → Borrar datos
3. Vuelve a abrir la aplicación

Nota: esto elimina los datos locales.

### Las tareas no se sincronizan

1. Comprueba que la carpeta de sincronización sea accesible
2. Verifica que el servicio de sincronización se esté ejecutando
3. Comprueba los permisos de los archivos
4. Prueba la sincronización manual en Ajustes

### Las notificaciones no funcionan

**Escritorio:**
- Comprueba los ajustes de notificaciones del sistema
- Asegúrate de que la aplicación tenga permiso para mostrar notificaciones

**Dispositivos móviles:**
- Concede permiso para mostrar notificaciones en los ajustes del dispositivo
- Comprueba los ajustes de notificaciones de la aplicación

---

## Contribuir

### ¿Cómo puedo contribuir?

- Informa de errores y sugiere funciones mediante **Enviar comentarios** en **Ajustes → Acerca de** o en [GitHub Issues](https://github.com/dongdongbh/Mindwtr/issues)
- Envía solicitudes de incorporación de cambios
- Ayuda con las traducciones
- ¡Difunde el proyecto!

Consulta la [guía para contribuir](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md).

---

## Consulta también

- [Primeros pasos](/es/start/getting-started)
- [Introducción a GTD](/es/use/gtd-overview)
- [Datos y sincronización](/es/data-sync/)
- [Contribuir (guía del repositorio)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
