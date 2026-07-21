# Guía de usuario: dispositivos móviles

La aplicación móvil Mindwtr está creada con React Native y Expo. Android es totalmente compatible; iOS está disponible en la App Store y mediante la beta de TestFlight.

## Descripción general

La aplicación móvil usa pestañas inferiores para los flujos principales y una página Menú para las vistas adicionales.

---

## Patrones de interacción

- **Toca** para abrir y editar tareas.
- **Desliza** para realizar acciones rápidas (consulta la sección Gestos de deslizamiento más abajo).
- La **hoja para compartir** añade elementos directamente a tu Bandeja de entrada.

## Navegación

### Pestañas inferiores

| Pestaña            | Descripción                          |
| ------------------ | ------------------------------------ |
| 📥 **Bandeja de entrada** | Captura y procesa elementos entrantes |
| 🎯 **Foco**        | Panel diario y próximas acciones     |
| ➕ **Captura rápida** | Añade rápidamente una tarea o nota de audio |
| 📝 **Revisión**    | Revisión diaria y semanal            |
| ☰ **Menú**         | Accede a Proyectos, Tablero, Calendario, etc. |

### Pestaña Menú

Toca la pestaña **Menú** para acceder a más vistas:

 - 📋 **Tablero**: vista Kanban con orden manual mediante arrastre, búsqueda y filtros de contexto, etiqueta, fecha y proyecto
 - 🗓️ **Calendario**: vista temporal
 - 📁 **Proyectos**: resultados de varios pasos
 - 🏷️ **Contextos**: filtra por contexto
 - ⏳ **En espera**: elementos delegados
 - 💭 **Algún día/Tal vez**: ideas futuras
 - 📚 **Referencia**: material de referencia
 - ✅ **Terminadas**: tareas completadas recientemente
 - 📦 **Archivadas**: tareas y proyectos completados apartados de las listas normales
 - 🗑️ **Papelera**: tareas y proyectos eliminados
 - ⚙️ **Ajustes**: preferencias de la aplicación

Abre **Terminadas** y toca **Seleccionar** para elegir tareas; después usa **Mover → Archivadas** para archivarlas antes. En **Archivadas**, toca **Seleccionar** o **Seleccionar todo** para devolver tareas a Terminadas sin cambiar su hora de finalización, restaurarlas a la Bandeja de entrada o moverlas a la Papelera. Cambia a **Proyectos** para abrir, restaurar o mover proyectos archivados a la Papelera. Mindwtr solo elimina elementos permanentemente desde la Papelera.

Abre **Papelera** y toca **Seleccionar** para gestionar varias tareas y proyectos eliminados. Toca **Seleccionar todo** o elige elementos y después restáuralos o elimínalos permanentemente en un solo paso. La eliminación permanente siempre pide confirmación.

---

## Búsqueda global

Toca el **icono de búsqueda** del encabezado para abrir la Búsqueda global.

La búsqueda oculta de forma predeterminada los elementos Terminados y Archivados. Cuando hay elementos ocultos que coinciden con la consulta, aparece un aviso «N más en Terminadas y Archivadas» que puedes tocar. Tócalo para incluirlos o activa **Incluir tareas Terminadas y Archivadas** en los filtros de búsqueda.

### Operadores de búsqueda

Usa operadores para realizar filtros potentes:

| Operador    | Ejemplo            | Descripción             |
| ----------- | ------------------ | ----------------------- |
| `status:`   | `status:next`      | Filtra por estado de la tarea |
| `-status:`  | `-status:done`     | Excluye un estado       |
| `context:`  | `context:@home`    | Filtra por contexto     |
| `tag:`      | `tag:#focused`     | Filtra por etiqueta     |
| `assigned:` | `assigned:Tom`     | Filtra por responsable  |
| `project:`  | `project:HomeReno` | Filtra por proyecto     |
| `location:` | `location:office`  | Filtra por ubicación de la tarea |
| `where:`    | `where:office`     | Alias de ubicación de la tarea |
| `id:`       | `id:abc123`        | Busca un ID de tarea exacto |
| `-id:`      | `-id:abc123`       | Excluye un ID de tarea exacto |
| `due:`      | `due:today`        | Tareas que vencen en una fecha |
| `due:<=`    | `due:<=7d`         | Tareas que vencen en 7 días |
| `start:`    | `start:>=tomorrow` | Tareas que comienzan desde una fecha |
| `created:`  | `created:>=30d`    | Tareas creadas en los últimos 30 días |
| `OR`        | `@home OR @work`   | Coincide con cualquiera de las condiciones |

### Búsquedas guardadas

Las Búsquedas guardadas son accesos directos a consultas reutilizables.

1. Introduce tu consulta de búsqueda
2. Toca **«Guardar búsqueda»**
3. Ponle un nombre
4. Accede desde **Menú → Búsquedas guardadas**

**Para eliminarla:** abre la búsqueda guardada y toca el icono de la papelera del encabezado.

Las Búsquedas guardadas son distintas de los **Filtros guardados** de Foco. Los filtros de Foco guardan criterios como proyectos, contextos, etiquetas, prioridad, energía y estimaciones de tiempo para la vista Foco.

---


## Captura rápida

Mindwtr ofrece varias formas de capturar tareas rápidamente en el móvil.

La pantalla de captura da prioridad al campo de entrada. La ayuda de sintaxis se oculta tras un pequeño control «?» para mantener limpia la interfaz.

Para realizar varias capturas seguidas, activa **Añadir otra** en la hoja de captura: cada pulsación de Enter guarda la tarea y mantiene abierta la hoja con el teclado visible, lista para la siguiente. El control permanece activo entre capturas hasta que lo desactives.

### Hoja para compartir

Captura tareas desde cualquier aplicación mediante la hoja para compartir:

1. En cualquier aplicación (navegador, correo o notas), busca algo que quieras capturar
2. Toca el botón **Compartir**
3. Selecciona **Mindwtr** entre las opciones
4. Mindwtr abre la pantalla de captura con el contenido compartido adjunto como notas
5. Añade un título, ajusta los campos que quieras y guárdalo en la Bandeja de entrada

Al compartir un archivo (PDF, imagen, vídeo o grabación de audio), se copia en Mindwtr como adjunto de la nueva tarea y el nombre del archivo se usa como título inicial. Puedes compartir hasta seis archivos a la vez.

Es ideal para:
- Guardar artículos para leerlos más tarde
- Capturar correos como tareas
- Añadir enlaces mientras navegas por la web
- Archivar un PDF o una foto como tarea de la Bandeja de entrada para procesarla después

### Widget de inicio

Añade el widget de Mindwtr a la pantalla de inicio para acceder rápidamente:

1. Mantén pulsada la pantalla de inicio
2. Selecciona **Widgets**
3. Busca y añade el widget **Mindwtr**
4. Tócalo para abrir la captura rápida o ver los elementos de Foco

### Widget de la pantalla bloqueada de iOS

En iOS 16 y versiones posteriores, Mindwtr ofrece widgets para la pantalla bloqueada que muestran la tarea enfocada actual sin desbloquear el teléfono:

1. Mantén pulsada la pantalla bloqueada y toca **Personalizar**
2. Selecciona el área de widgets y añade un widget **Mindwtr Focus**
3. Elige el widget rectangular (tarea enfocada principal con la leyenda Foco), el widget de una línea sobre el reloj o el contador circular de tareas enfocadas

Al tocar cualquiera de ellos se abre la pantalla Foco. Los widgets siguen el estilo monocromo de la pantalla bloqueada del sistema.

### Mosaico de Ajustes rápidos de Android

En Android, añade el mosaico de captura de Mindwtr a Ajustes rápidos para capturar en la Bandeja de entrada con un deslizamiento:

1. Abre el modo de edición de Ajustes rápidos de Android.
2. Añade el mosaico **Mindwtr**.
3. Tócalo para abrir Captura rápida.

### Captura rápida desde la barra de notificaciones de Android

Para capturar de la forma más rápida, con un solo deslizamiento y desde la pantalla bloqueada, fija una notificación persistente de **Captura rápida**:

1. Abre **Ajustes → Notificaciones**.
2. Activa **Captura rápida en la barra de notificaciones**.
3. Toca la notificación en cualquier momento para abrir Captura rápida.

La notificación es silenciosa y permanece discretamente al final del panel. Desactiva el control para quitarla. (Solo Android; iOS no admite notificaciones persistentes, así que allí debes usar el widget o Atajos.)

### Acciones de voz de Android

Las compilaciones para Android exponen una acción de captura a los asistentes compatibles, incluidas las superficies de Gemini/Assistant que pasan por Android App Actions. Las capturas creadas por voz abren el flujo de confirmación de Mindwtr para que puedas revisar el título y la nota antes de guardar.

### Intents de automatización de contextos en Android

Las aplicaciones de automatización como Tasker, MacroDroid o Phone Profiles pueden activar un contexto de Mindwtr. Usa el formato de difusión de Android para activadores que solo deban ejecutarse en segundo plano. Al activarse, Mindwtr comprueba las acciones `/next` coincidentes que están disponibles ahora y solo envía una notificación si hay trabajo que mostrar. Al tocarla se abre la vista Contextos correspondiente.

Formato de difusión de Android:

| Campo | Valor |
| --- | --- |
| Paquete | `tech.dongdongbh.mindwtr` |
| Clase | `tech.dongdongbh.mindwtr.ContextAutomationReceiver` |
| Destino | Broadcast Receiver |
| Acción de activación | `tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT` |
| Acción de desactivación | `tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT` |
| Extra de cadena | `context=parents` o `context=@parents` |

Ejemplos de ADB:

```bash
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT --es context parents
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT --es context parents
```

Formato de URL:

| URL | Acción |
| --- | --- |
| `mindwtr://contexts?token=%40parents&contextAction=activate` | Activa `@parents` |
| `mindwtr://contexts?token=%40parents&contextAction=deactivate` | Desactiva `@parents` |

Ejemplos de URL:

```bash
adb shell am start -a android.intent.action.VIEW -d 'mindwtr://contexts?token=%40parents&contextAction=activate' tech.dongdongbh.mindwtr
```

Notas:
- Abrir una URL puede mostrar Mindwtr. Usa el receptor de difusión cuando la automatización deba permanecer en segundo plano.
- Los nombres de contexto se normalizan como `@context`, por lo que `parents` y `@parents` coinciden con `@parents`.
- Los contextos jerárquicos coinciden por debajo del contexto seleccionado, de modo que `@parents` también coincide con `@parents/errands`.
- Si ninguna acción `/next` disponible coincide con el contexto, Mindwtr no muestra nada.
- Por ahora, la desactivación es una operación silenciosa sin efecto. Reconoce el activador de salida y se reserva para un futuro estado de contexto activo; no elimina, oculta ni cambia tareas.
- En Android, las URL e intents de automatización de contextos devuelven Mindwtr al segundo plano después de gestionarlos. Toca la notificación cuando quieras abrir la vista Contextos correspondiente.
- Mindwtr no detecta ubicaciones ni estados del dispositivo por sí mismo; la aplicación de automatización controla el activador.

### Atajos de Apple

En iPhone y iPad, Mindwtr ofrece acciones nativas de Atajos de Apple para capturar en la Bandeja de entrada y abrir vistas GTD como Foco, En espera, Algún día, Proyectos, Revisión y Calendario. Consulta [Atajos de Apple](/es/power-users/apple-shortcuts) para ver la configuración, ejemplos y limitaciones de la v1.

### Captura rápida mediante esquema URL (Atajos de iOS/automatizaciones de Android)

Mindwtr registra el esquema URL `mindwtr://`, por lo que puedes capturar tareas desde Atajos de iOS, Tasker u otras herramientas de automatización.

URL compatibles:

| URL | Acción |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Abre la captura con un título |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Abre la captura con título y nota |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Abre la captura con proyecto y etiquetas |

Notas:
- `title` es obligatorio (alias: `text`).
- `note` es opcional (alias: `description`).
- `project` coincide por título con un proyecto activo existente (sin distinguir mayúsculas y minúsculas) o lo crea.
- `tags` se separa por comas y se normaliza al formato `#tag` antes de guardar.

Ejemplo de Atajos de iOS:
1. Abre **Atajos** y crea un atajo.
2. Añade **Solicitar entrada** (indicación: título de la tarea).
3. Añade **Abrir URL** con: `mindwtr://capture?title=[Provided Input]`.
4. Ejecuta el atajo; Mindwtr abre la pantalla de captura para que revises y guardes la tarea.

### Sintaxis de adición rápida

Mindwtr analiza lenguaje natural al añadir tareas:

| Sintaxis       | Ejemplo           | Resultado             |
| -------------- | ----------------- | --------------------- |
| `@context`   | `@home`           | Añade un contexto       |
| `#tag`       | `#focused`        | Añade una etiqueta      |
| `+Project`   | `+HomeReno`       | Asigna a un proyecto    |
| `+Multi Word` | `+New Project`    | Asigna a "New Project" |
| `+"Quoted Name"` | `+"New Project" call Bob` | Las comillas delimitan un nombre de varias palabras dentro de una frase (también `!"Area Name"`) |
| `!Area`       | `Plan roadmap !Work` | Asigna a un área       |
| `%Person`     | `Ask %Jim for budget` | Establece Asignada a (persona delegada o responsable de En espera); `%"Full Name"` para nombres nuevos de varias palabras |
| `/area:<name>` | `/area:Personal` | Asigna a un área (sin espacios) |
| `/due:date`  | `/due:friday`     | Establece la fecha de vencimiento |
| `/energy:<level>` | `/energy:medium` | Establece el nivel de energía (`low`, `medium`, `high`) |
| `/note:text` | `/note:call back` | Añade una descripción   |
| `/status`    | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Establece el estado |

**Formatos de fecha:** today, tomorrow, friday, next week, in 3 days

Una fecha u hora al final de lo que escribes se convierte en la fecha límite, y las palabras detectadas se eliminan del título: `Grab a coffee with Marta Jun 23 6pm` crea "Grab a coffee with Marta", con vencimiento el 23 de junio a las 18:00. La detección solo lee el final del texto, así que un título como "Review June report" queda intacto. Esto lo controla **Detectar fechas en lenguaje natural** (Ajustes → GTD, activado por defecto); desactívalo para que las frases de fecha queden como texto literal del título. Los tokens explícitos como `/due:friday` funcionan en cualquier caso y tienen prioridad sobre la detección. El ajuste se sincroniza entre tus dispositivos.

---

## Captura de audio

Captura tareas con la voz mediante transcripción con IA.

### Configuración

1. Ve a **Menú → Ajustes → Asistente de IA**.
2. Activa **Voz a texto**.
3. Elige un **Proveedor**:
   - **OpenAI / Gemini**: basado en la nube (requiere clave de API).
   - **Sin conexión (Whisper)**: se ejecuta localmente. Puedes descargar un modelo (p. ej., Tiny o Base) directamente en Ajustes.
4. Define el **Método de captura predeterminado** en **Ajustes → General** si prefieres empezar por el audio.

### Usar la captura de audio

- **Adición rápida**: toca la pestaña **Audio** de la pantalla Captura rápida.
- **Grabar**: toca el micrófono para comenzar.
- **Transcribir**: detén la grabación para procesar el audio.
- **Análisis inteligente**: si está activado, la aplicación extraerá automáticamente fechas y campos.

---

## Bandeja de entrada

Tu zona de captura para introducir tareas rápidamente.

Usa **Barrido mental** cuando quieras indicaciones guiadas para trabajo, hogar, personas, recados y asuntos pendientes, en vez de empezar con un campo vacío.

### Añadir tareas

1. Toca el campo de entrada de la parte inferior
2. Usa la hoja para compartir desde otras aplicaciones
3. Toca el widget de inicio
4. Escribe la tarea con la sintaxis de adición rápida
5. Toca el botón de añadir o pulsa Enter

### Procesar la Bandeja de entrada

Toca **Procesar Bandeja de entrada** para iniciar el flujo de aclaración:

1. **¿Requiere acción?**
   - Sí → Continúa
   - No → Papelera o Algún día/Tal vez

2. **¿Tardará menos de 2 minutos?**
   - Sí → Hazla ahora y márcala como Terminada
   - No → Continúa

3. **¿Quién debe hacerla?**
   - Yo → Añade un contexto y muévela a Próximas acciones
   - Delegar → Muévela a En espera

4. **¿Dónde la harás?**
   - Selecciona contextos (@home, @work, etc.)
   - Añade contextos personalizados

5. **¿Asignar a un proyecto?** (Opcional)
   - Selecciona un proyecto u omite este paso
   - También puedes elegir **Sí, convertirla en proyecto** cuando la captura contenga varias acciones: ponle un nombre al proyecto y define su próxima acción. Las demás acciones que escribas volverán a la Bandeja de entrada con el proyecto ya asociado, listas para su propia aclaración

---

## Foco

Tu panel principal para hacer. Foco es un panel de actividad, no un inventario completo de todas las tareas con estado `next`.

### Secciones

| Sección      | Contenido                                                                 |
| ------------ | ------------------------------------------------------------------------- |
| **Hoy**      | Tareas enfocadas para hoy, que vencen hoy/están atrasadas o empiezan hoy |
| **Próximas** | Próximas acciones disponibles que no están bloqueadas ni aplazadas       |

Foco oculta las tareas con inicio futuro y las posteriores de los proyectos secuenciales para limitar la lista a lo que puedes hacer ahora. Usa **Contextos**, **Proyectos** o **Buscar** cuando quieras examinar el inventario de tareas más amplio.

El orden predeterminado de Próximas acciones coloca primero las acciones con vencimiento próximo, después las que no tienen fecha y al final las que vencen en un futuro lejano. Dentro del mismo grupo, Foco usa la prioridad cuando está habilitada, seguida de la hora de inicio, la fecha de creación, el título y el id. Consulta [Flujo GTD en Mindwtr](/es/use/gtd-workflow#como-ordena-enfoque-las-acciones-disponibles) para conocer toda la lógica.

### Funciones

- **Filtro de contexto**: toca una pastilla de contexto para filtrar la lista Próximas.
- **Filtros guardados**: guarda criterios de Foco reutilizables, como proyectos, contextos, etiquetas, prioridad, nivel de energía y estimaciones de tiempo.
- **Deslizar a Foco**: desliza una tarea hacia la derecha para alternar su estado «Foco» (la mueve a Hoy).
- **Estado rápido**: toca la insignia de estado para cambiarlo.
- **Pomodoro (opcional)**: actívalo en **Ajustes → GTD → Funciones → Temporizador Pomodoro** para mostrar un temporizador compacto de concentración/descanso. Déjalo en **Solo temporizador** o activa **Vincular temporizador a tarea** para mostrar el selector de tarea del temporizador y la acción **Marcar tarea como terminada**.

---

## Revisión

Revisa tus tareas y actualiza su estado.

- Consulta los detalles de la tarea (descripción, hora de inicio, plazo y contextos)
- Marca tareas rápidamente como terminadas
- Navega entre tareas
- **Modo de selección**: organiza, mueve, etiqueta, comparte o elimina tareas por lotes
- Durante la Revisión semanal, usa el paso **Procesar Bandeja de entrada** para vaciar los elementos capturados antes de continuar con el calendario, En espera, los proyectos y Algún día.

---

## Editor de tareas (tarea y vista)

El editor de tareas tiene dos modos:

- **Tarea**: edita campos, listas de comprobación, fechas, etiquetas y contextos
- **Vista**: resumen limpio de solo lectura con una lista que se puede tocar

Desliza a izquierda o derecha para cambiar entre **Tarea** y **Vista**.

Las tareas centradas en listas de comprobación se abren de forma predeterminada en Vista para marcarlas más rápido.

El editor empieza mostrando lo mínimo. Toca **Más opciones** para revelar campos avanzados; cualquier campo que ya tenga contenido permanece visible.

El Markdown de la descripción admite listas no ordenadas y casillas de tareas (`- item`, `[ ] item`, `[x] item`).
Escribe `[[` en descripciones de tareas o notas de proyectos para enlazar otra tarea o proyecto desde la hoja del selector de enlaces.
Esos enlaces solo sirven para navegar; no sincronizan el estado de finalización entre tareas.
Las casillas Markdown de la descripción son solo notas; no afectan a la lista de comprobación de la tarea.
Pegar texto de varias líneas en un elemento de la lista crea un elemento por línea (se reconocen viñetas, numeración y marcadores `[x]`).
El campo **Persona asignada** guarda las personas delegadas para En espera, las sugerencias y la búsqueda `assigned:`. Gestiona las personas guardadas, las notas y los enlaces de referencia en **Ajustes → Gestionar**.

Las tareas recurrentes admiten dos estrategias:
- **Estricta** (cadencia fija)
- **Repetir después de completar** (próxima fecha a partir de la hora de finalización)
- **Finaliza: Nunca / En una fecha / Después de N repeticiones**

Mindwtr mantiene una instancia activa de cada tarea recurrente. El Calendario muestra esa instancia actual cuando tiene fecha de vencimiento u hora de inicio; las repeticiones futuras no se rellenan de antemano hasta completar la actual, salvo que se active **Mostrar próxima repetición en el Calendario** como vista previa solo para planificación.

Usa el campo de recurrencia del editor y después activa **Repetir después de completar** o **Mostrar próxima repetición en el Calendario** cuando sea necesario.
La misma hoja permite detener una serie en una fecha concreta o tras un número fijo de repeticiones totales.

### Adjuntos

Puedes adjuntar archivos o enlaces a una tarea desde el editor. Las notas de audio se pueden guardar como adjuntos cuando está activado **Guardar adjuntos de audio**.

Consulta [Adjuntos](/es/use/attachments) para obtener información sobre sincronización y limpieza.

---

## Asistente de IA (opcional)

Actívalo en **Ajustes → Avanzado → Asistente de IA**:

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

## Integración con calendarios

Mindwtr puede superponer calendarios externos y enviar tareas fechadas al calendario del dispositivo. La configuración detallada se encuentra en [Integración con calendarios](/es/use/calendar-integration).

Para enviar tareas a Google Calendar en Android o Apple Calendar en iOS:

1. Ve a **Ajustes -> Calendario**
2. Activa **Enviar tareas al calendario**
3. Concede permiso para el calendario
4. Amplía **Destino de sincronización**
5. Elige un calendario `Mindwtr` específico u otro calendario de destino que permita escritura

Para configurar el destino de Google Calendar en Android y Apple Calendar en iOS, consulta [Integración con calendarios](/es/use/calendar-integration).

Para superponer calendarios externos con suscripciones ICS:

1. Ve a **Ajustes -> Calendario**
2. Añade tu **URL de ICS**
3. Actualiza para obtener los eventos

Los eventos externos son de solo lectura y no se sincronizan de vuelta con su origen. Toca un evento externo y elige **Crear tarea** para generar una tarea independiente de Mindwtr; Mindwtr copia el título, la fecha y hora, la ubicación, la descripción y el nombre del calendario cuando están disponibles.

---

## Calendario

Vista temporal con funciones de programación.

### Vistas

- **Vista mensual**: resumen de tareas con fechas de vencimiento
- **Vista diaria**: cronología detallada con tareas programadas y eventos externos

### Programar tareas

1. En la vista diaria del Calendario, toca **Programar tareas**
2. Selecciona una Próxima acción (se muestran primero) o busca tareas pendientes
3. Mindwtr encuentra el primer hueco libre (evita conflictos con eventos externos)
4. La tarea recibe una hora de inicio basada en su estimación de tiempo

El panel de programación es la superficie de planificación móvil: úsalo cuando estés viendo un día y quieras convertir Próximas acciones no programadas o trabajo vencido pero sin programar en bloques de tiempo concretos. Contráelo cuando quieras centrarte en la cuadrícula del calendario.

### Arrastrar para reprogramar

- Mantén pulsado un bloque de tarea programada
- Arrástralo a una nueva franja horaria (se ajusta a intervalos de 5 minutos)
- Suéltalo para actualizar la hora de inicio

### Calendarios externos (iCal/ICS)

Suscríbete a calendarios externos para ver eventos junto a tus tareas:

1. Ve a **Ajustes → Avanzado → Calendario**
2. Introduce la URL del calendario (formato ICS/webcal)
3. Ponle un nombre y toca **Añadir**
4. Los eventos externos aparecen como bloques grises en la vista diaria

---

## Proyectos

Gestiona resultados de varios pasos.

Abre Proyectos desde **Menú → Proyectos**.

### Lista de proyectos

- Consulta todos los proyectos activos
- Mira el número de tareas de cada proyecto
- Toca un proyecto para ver sus detalles

### Detalles del proyecto

- Consulta todas las tareas del proyecto
- Añade tareas nuevas
- Agrupa tareas con **Secciones** dentro del proyecto. Las secciones son encabezados dentro de un proyecto, no subtareas ni proyectos independientes.
- Toca una tarea para asignarle una **Sección** en el editor
- Edita los ajustes del proyecto (nombre, color y notas)
- Asigna un **Área de enfoque** (p. ej., Trabajo o Personal)
- Añade **Etiquetas de proyecto** para filtrar
- Establece el modo secuencial o paralelo
- Define una fecha de revisión
- Reordena las tareas del proyecto con el asa de arrastre cuando esté activado el orden personalizado. Soltar una tarea bajo el encabezado de otra sección la mueve a esa sección; soltarla sobre el primer encabezado borra su sección
- Archiva el proyecto (así se completa un proyecto; las tareas restantes se completan con él y **Reactivar** lo deshace)

El campo **Sección del proyecto** del editor asigna una tarea a una de las secciones de su proyecto actual. Solo importa cuando la tarea pertenece a un proyecto con secciones; de lo contrario, déjalo vacío.

### Secuencial frente a paralelo

| Modo           | Comportamiento                                             |
| -------------- | ---------------------------------------------------------- |
| **Secuencial** | Solo aparece en Foco la primera tarea disponible del proyecto |
| **Paralelo**   | Todas las tareas disponibles del proyecto pueden aparecer en Foco |

Los proyectos secuenciales pueden avanzar en todo el proyecto o sección por sección. La secuenciación por secciones muestra la primera tarea disponible de cada sección, de modo que distintas fases o líneas de trabajo pueden avanzar en paralelo sin hacer visibles todas las tareas.

---

## Gestos de deslizamiento

Gestiona tareas rápidamente mediante gestos:

| Vista             | Deslizar a la derecha | Resultado             |
| ----------------- | --------------------- | --------------------- |
| **Bandeja de entrada** | Terminada        | Marca la tarea como terminada |
| **Foco**          | Foco                  | Alterna el estado de Foco |

Completar una tarea registra la hora actual. Si en realidad terminaste antes, mantén pulsado cualquier control **Terminada** para elegir la hora real: el botón Terminada que aparece al deslizar, la opción Terminada del menú de estado, la pastilla Terminada del editor o la insignia de estado de la vista previa. También puedes tocar la marca de tiempo **Completada** de una tarea terminada o archivada para corregirla después.

---

## Contextos

Explora y filtra tareas por contexto.

### Contextos de ubicación

- `@home`: tareas para hacer en casa
- `@work`: tareas para la oficina
- `@errands`: tareas fuera de casa
- `@agendas`: asuntos para conversar
- `@computer`: requieren un ordenador
- `@phone`: requieren un teléfono
- `@anywhere`: se pueden hacer en cualquier lugar

### Etiquetas

Filtra tareas por nivel de energía, modo o tema:

- `#focused`: trabajo profundo que exige concentración
- `#lowenergy`: tareas sencillas para momentos de cansancio
- `#creative`: lluvia de ideas e ideación
- `#routine`: tareas repetitivas o mecánicas

---

## En espera

Controla los elementos delegados o que esperan acontecimientos externos.

- Consulta todas las tareas en espera
- Mira los plazos
- Muévelas a Próximas cuando estén listas
- Márcalas como Terminadas cuando las recibas

---

## Algún día/Tal vez

Incuba ideas para el futuro.

- Revísalas periódicamente durante la Revisión semanal
- Actívalas moviéndolas al estado Próxima
- Archívalas si ya no son pertinentes

---

## Notificaciones y recordatorios

Mindwtr envía notificaciones para ayudarte a mantener el rumbo.

### Tipos de notificaciones

- **Recordatorios de fecha de vencimiento**: avisan cuando vencen las tareas
- **Avisos de hora de inicio**: te recuerdan cuándo debes empezar
- **Recordatorios de tareas recurrentes**: notificaciones de elementos recurrentes

Toca el cuerpo de la notificación para ir directamente a la pantalla **Revisión**.

Los recordatorios se programan en el propio teléfono. No hay un servidor de notificaciones push. Si completas o reprogramas una tarea en otro dispositivo (por ejemplo, si completas en el escritorio una tarea diaria recurrente), el teléfono actualiza sus alarmas en cuanto se sincroniza el cambio; deja que el teléfono se sincronice antes del próximo recordatorio (basta con abrir la aplicación una vez).

### Permisos

Asegúrate de que las notificaciones estén activadas:
1. Ve a **Ajustes → Aplicaciones → Mindwtr** en el dispositivo
2. Activa **Notificaciones**
3. Permite alertas y sonidos como prefieras

---

## Ajustes

### General

- **Apariencia**: Sistema, Clara u Oscura
- **Idioma**: inglés, chino (simplificado), chino (tradicional), hindi, español, árabe, francés, portugués, ruso, alemán, japonés, vietnamita, turco, coreano, italiano, polaco, neerlandés, checo

### Notificaciones

**Recordatorios de tareas:**
- Activa o desactiva las notificaciones para fechas de vencimiento y horas de inicio

**Resumen diario:**
- **Informe matinal**: resumen de tareas que vencen hoy, atrasadas y de Foco
- **Revisión vespertina**: aviso para revisar y cerrar el día
- Configura las horas de cada uno

**Revisión semanal:**
- **Recordatorios**: recibe una notificación semanal para comenzar la revisión
- **Hora/día**: personaliza cuándo quieres revisar (p. ej., el viernes a las 4 PM)

### GTD

Personaliza cómo funciona Mindwtr en tu flujo GTD:

**Funciones (opcionales):**
- **Prioridades**: muestra una bandera de prioridad en las tareas
- **Estimaciones de tiempo**: añade un campo de duración para organizar bloques de tiempo

**Preajustes de estimación de tiempo:**
- Elige qué estimaciones aparecen en el editor de tareas
- Opciones: 5m, 10m, 15m, 30m, 1h, 2h, 3h, 4h, 4h+
- Predeterminado: 10m, 30m, 1h, 2h, 3h, 4h, 4h+

**Archivado automático:**
- Mueve automáticamente las tareas Terminadas a Archivadas tras un número de días (predeterminado: 7 días). Al reducir el intervalo, las tareas Terminadas existentes que ya superen el nuevo límite se archivan inmediatamente.
- Elige «Nunca» para conservar las tareas completadas indefinidamente en Terminadas

**Procesamiento de la Bandeja de entrada:**
- En el móvil se mantiene el flujo con tarjetas para procesar la Bandeja de entrada
- Los mismos ajustes compartidos pueden ocultar o mostrar el atajo de 2 minutos, la pregunta inicial por el proyecto, la sección de contextos/etiquetas, la sección de programación y la opción de referencia

**Diseño del editor de tareas:**
- Toca un campo para alternar su visibilidad (los campos ocultos siguen apareciendo cuando tienen valores)
- Mantén pulsada el asa de arrastre para reordenar campos
- Mueve campos entre secciones como **Básico**, **Programación**, **Organización** y **Detalles**
- Elige qué secciones plegables se abren de forma predeterminada
- Los campos ocultos se pueden revelar con el botón **Más** del editor

**Gestionar:**
- Usa **Ajustes → Gestionar** para editar **Áreas**, **Personas**, **Contextos** y **Etiquetas** guardados
- Es el lugar más rápido para limpiar duplicados o cambiar el nombre de metadatos reutilizables
- Consulta [Áreas y personas](/es/use/areas-people) para saber dónde crearlas mientras las asignas

### Datos y sincronización

Consulta [Datos y sincronización](/es/data-sync/) para configurar la sincronización.

**Backend de sincronización:**
- **Sincronización en la nube**: Dropbox en compilaciones compatibles, además de iCloud en iOS cuando esté disponible
- **Sincronización de carpeta/archivo**: sincronización mediante un archivo o carpeta JSON compartido (Google Drive, Syncthing, OneDrive, etc.)
- **Servidor avanzado/personalizado**: WebDAV o Mindwtr Cloud autoalojado

**Otras opciones:**
- **Sincronizar**: inicia manualmente la sincronización
- **Estado de la última sincronización**: consulta cuándo se sincronizaron los datos por última vez
- **Historial de sincronización**: contraído de forma predeterminada; tócalo para ampliar las entradas recientes
- **Exportar copia de seguridad**: guarda los datos en un archivo
- **Importación de Recordatorios de Apple**: elige una lista de Recordatorios e importa los recordatorios incompletos a la Bandeja de entrada. Los recordatorios importados permanecen en Recordatorios de Apple y se omiten los ya importados, completados o sin título.
- **Opciones de sincronización de ajustes**: elige qué preferencias se sincronizan entre dispositivos (tema, idioma/formato de fecha, valores GTD predeterminados, URL de calendarios externos, ajustes de IA y Filtros guardados). Las claves de API y las rutas de modelos locales nunca se sincronizan.

**Opciones GTD:**
- **Límite de tareas de Foco**: elige cuántas tareas se pueden marcar para el Foco de hoy.

### Avanzado

**Asistente de IA:**
- Asistente BYOK opcional para aclarar y desglosar tareas

**Calendario (ICS/iCal):**
- **Añadir calendario**: introduce un nombre y una URL
- **Activar/desactivar**: alterna la visibilidad de cada calendario
- **Eliminar**: elimina una suscripción
- **Probar**: comprueba que el calendario se carga correctamente

### Acerca de

- Número de versión
- Buscar actualizaciones
- **Enviar comentarios** para informar de errores, solicitar funciones o enviar otras notas cuando la compilación tenga habilitados los comentarios. Puedes incluir un correo de respuesta si quieres seguimiento.
- Enlaces al sitio web y GitHub

---

## Consulta también

- [Instalación móvil](/es/start/mobile-installation)
- [Atajos de Apple](/es/power-users/apple-shortcuts)
- [Datos y sincronización](/es/data-sync/)
- [Flujo GTD en Mindwtr](/es/use/gtd-workflow)
