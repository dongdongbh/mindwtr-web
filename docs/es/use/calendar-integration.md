# Integración con calendarios (panorama rígido + flexible)

Mindwtr admite la integración con calendarios en dos direcciones: leer calendarios externos en el planificador y enviar tareas de Mindwtr a un calendario editable del dispositivo cuando la plataforma ofrece uno.

- **Móvil (iOS/Android):** calendarios del dispositivo ya expuestos por el sistema, URL de suscripción ICS y envío unidireccional de Mindwtr -> calendario del dispositivo
- **Escritorio (macOS):** Apple Calendar mediante EventKit para lectura y envío unidireccional de tareas, además de URL de suscripción ICS
- **Escritorio (Linux):** calendarios expuestos por Evolution Data Server para lectura y envío unidireccional de tareas, además de URL de suscripción ICS
- **Escritorio (Windows) y web:** URL de suscripción ICS

## Conceptos

- **Panorama rígido**: reuniones/clases de calendarios externos.
- **Panorama flexible**: tareas de Mindwtr programadas con `startTime` y `timeEstimate`.
- El calendario es una **superficie de planificación** para organizar tareas existentes y crear tareas programadas cuando el contexto del calendario es el lugar más rápido para hacerlo.

## Semántica de GTD

- **`dueDate`** = Fecha límite (compromisos rígidos).
- **`startTime`** = Recordatorio/inicio programado (compromisos flexibles).
- **`timeEstimate`** = Duración sugerida al programar.

## Vistas

- **Vista de día**: cuadrícula horaria con tareas programadas, fechas límite y eventos externos.
- **Vista de semana**: cuadrícula de planificación de siete días para revisar la semana laboral actual.
- **Vista de mes**: resumen con indicadores de fechas límite, tareas programadas y eventos.
- **Vista de agenda**: lista móvil de 60 días con próximas fechas límite, tareas programadas y eventos externos.

En el escritorio, el estado actual del calendario se refleja en la URL:

- `calendarView`: `day`, `week`, `month` o `schedule`
- `calendarDate`: la fecha seleccionada, cuando se selecciona un día
- `calendarMonth`: el mes visible del calendario

Esto te permite guardar como marcador o compartir una ventana de planificación específica, por ejemplo, una vista semanal para el sprint actual o una vista de agenda para los próximos dos meses.

## Tareas recurrentes de Mindwtr

Las tareas recurrentes de Mindwtr se generan como instancias de tarea, no como una serie de calendario expandida:

- El calendario muestra la instancia de tarea activa cuando tiene una fecha límite o una hora de inicio programada.
- De forma predeterminada, Mindwtr no rellena previamente el calendario con futuras repeticiones de tareas. La siguiente instancia real de la tarea solo se crea cuando se completa la tarea recurrente actual.
- Si **Mostrar la próxima repetición en el Calendario** está activado en una tarea recurrente, el Calendario puede mostrar una vista previa de planificación de la siguiente repetición. Esa vista previa no es una tarea real y el envío al calendario en móvil/macOS la escribe como un evento único normal, no como un evento recurrente nativo.
- **Estricto** mantiene la cadencia fija de la programación. Una tarea mensual que vence el día 1 permanece anclada a ese ciclo planificado, pero Mindwtr sigue creando una sola instancia siguiente por cada finalización en lugar de rellenar todos los meses futuros.
- **Repetir después de completar** calcula la siguiente instancia a partir del momento en que finalizas la actual. Por ejemplo, un hábito mensual normal completado el día 15 se programa a partir del día 15 la próxima vez.
- El envío al calendario en móvil y macOS refleja estas instancias concretas de tareas. No exporta las reglas de recurrencia de Mindwtr como eventos recurrentes nativos del calendario.

## Flujo de trabajo de programación

En el escritorio:

1. Elige una fecha o abre un intervalo de tiempo.
2. Elige **Nueva** para crear una tarea programada o **Existente** para programar una tarea sin programar.
3. Establece las horas de inicio y fin. Mindwtr comprueba el intervalo frente a las tareas programadas y los eventos externos visibles.
4. Guarda la tarea o ajusta el horario más tarde desde el editor de tareas, la vista de día o la lista del día seleccionado.

En diseños de escritorio amplios, **Planificar próximas acciones** enumera las próximas acciones sin programar para el día seleccionado, incluidas las acciones vencidas pero no programadas. Úsalo para colocar una próxima acción en el calendario sin abrir la búsqueda. Las fechas límite siguen siendo plazos; programar añade un `startTime`.

El panel de planificación se puede contraer cuando quieras que la cuadrícula del calendario ocupe todo el ancho. Vuelve a expandirlo cuando quieras revisar el trabajo disponible para la fecha seleccionada.

En el móvil:

1. Abre **Calendario -> Programar tareas** desde la vista de día.
2. Selecciona una tarea existente.
3. Mindwtr encuentra el primer intervalo libre de ese día, evitando los eventos externos visibles y las tareas programadas.

Usa el panel de programación móvil de la misma manera: sirve para elegir trabajo sin programar mientras ya estás consultando el día y, después, asignarle una hora de inicio concreta.

Mindwtr usa `timeEstimate` como duración predeterminada cuando está disponible. Si hay un conflicto, elige otra hora o reduce la duración.

## Calendarios externos

### Matriz de compatibilidad

Compatibilidad actual:

| Plataforma | Función de calendario compatible | Notas |
| --- | --- | --- |
| Móvil iOS/Android | Enviar tareas de Mindwtr a un calendario del dispositivo | Android está verificado con Google Calendar. En iOS, usa calendarios que ya estén disponibles para Apple Calendar/EventKit. |
| Móvil iOS/Android | Leer calendarios del dispositivo | Lee los calendarios ya expuestos por la base de datos de calendarios del dispositivo después de conceder el permiso. |
| Móvil iOS/Android | URL directas de suscripción ICS | La URL debe devolver datos iCalendar sin procesar. |
| Escritorio macOS | Leer cuentas de Apple Calendar | Lee eventos mediante EventKit de macOS después de conceder el permiso. Esto incluye calendarios sincronizados con Apple Calendar, como iCloud, Google y Exchange. |
| Escritorio macOS | Enviar tareas de Mindwtr a Apple Calendar | Escribe las tareas de Mindwtr programadas/con fecha límite en un destino editable seleccionado de Apple Calendar mediante EventKit. |
| Escritorio Linux | Leer cuentas de calendario del sistema | Lee los calendarios habilitados que expone Evolution Data Server, incluidas las cuentas configuradas en Evolution o Cuentas en línea de GNOME. |
| Escritorio Linux | Enviar tareas de Mindwtr a un calendario del sistema | Escribe las tareas de Mindwtr programadas/con fecha límite en un calendario editable seleccionado de Evolution Data Server. |
| Escritorio y web | URL directas de suscripción ICS | La URL debe devolver datos iCalendar sin procesar. |

Sin compatibilidad actualmente:

- Cuentas de calendario nativas del escritorio de Windows.
- Inicio de sesión en cuentas CalDAV, descubrimiento de servidores o descubrimiento de cuentas específico de DAVx5.
- OAuth del proveedor de calendario dentro de Mindwtr, como iniciar sesión en Google, Microsoft o Nextcloud desde Mindwtr.
- URL autenticadas/privadas que devuelven `HTTP 401`, salvo que el proveedor del calendario ya haya incorporado el secreto en la URL.
- URL de páginas web de calendarios, incluidas las páginas públicas compartidas que presentan HTML en lugar de datos `.ics` sin procesar.
- Editar eventos de calendarios externos desde Mindwtr.
- Sincronizar eventos de calendarios externos mediante la sincronización de Mindwtr. Los eventos externos se obtienen y almacenan en caché localmente.
- Sincronización bidireccional entre tareas y calendarios. Los eventos enviados al calendario se generan a partir de tareas de Mindwtr.
- Exportar reglas de tareas recurrentes como eventos recurrentes nativos del calendario.

### Visibilidad

La visibilidad de los calendarios externos es una preferencia de visualización local:

- Las suscripciones a calendarios externos sincronizadas en Ajustes siguen tus ajustes de sincronización.
- El estado de mostrar/ocultar de cada calendario en la vista Calendario se almacena en el dispositivo actual.
- Los calendarios ocultos siguen estando disponibles en Ajustes; simplemente se excluyen de la superficie de planificación visible y de las comprobaciones de intervalos libres en ese dispositivo.

### Móvil: enviar tareas de Mindwtr al calendario

En iOS y Android, Mindwtr puede enviar tareas programadas y tareas con fechas límite a un calendario seleccionado del dispositivo:

- Las tareas con un `startTime` con hora se convierten en eventos con hora. `timeEstimate` se usa como duración del evento cuando está disponible.
- Las tareas con un `startTime` que solo contiene una fecha o únicamente un `dueDate` se convierten en eventos de día completo.
- Las tareas completadas, archivadas, de referencia o eliminadas se quitan del calendario de destino.
- Mindwtr conserva los títulos de las tareas al enviarlas a un calendario dedicado `Mindwtr`. Si eliges un calendario compartido como destino, los títulos de los eventos enviados reciben el prefijo `Mindwtr: ` para que sigan siendo reconocibles junto a los eventos normales.
- Las descripciones de las tareas se convierten en notas de los eventos y las ubicaciones de las tareas se convierten en ubicaciones de los eventos.
- Si eliges un calendario dedicado llamado `Mindwtr`, la aplicación de calendario puede mostrar los elementos de Mindwtr con el color propio de ese calendario.

Configuración:

1. Abre **Ajustes → Calendario**
2. Activa **Enviar tareas al calendario**
3. Concede permiso para el calendario
4. Expande **Destino de sincronización**
5. Elige dónde debe escribir los eventos Mindwtr

Opciones de destino:

- **Calendario dedicado de una cuenta**: la mejor opción para Google Calendar en Android o iCloud/Apple Calendar en iOS. Crea un calendario llamado `Mindwtr` en esa cuenta y, después, selecciona el destino dedicado.
- **Calendario compartido de una cuenta**: escribe en un calendario existente de una cuenta y añade el prefijo `Mindwtr: ` a los títulos de los eventos.
- **Calendario local dedicado**: permanece en el dispositivo actual. Algunas aplicaciones de calendario de Android ocultan los calendarios locales y los destinos locales no aparecerán en calendar.google.com ni en otras aplicaciones web de calendarios de cuentas.
- **Calendario local compartido**: escribe únicamente en un calendario local del dispositivo.

#### Android: configuración de Google Calendar

Para usar un calendario independiente `Mindwtr` respaldado por Google en Android:

1. Abre Google Calendar en la web.
2. Crea un nuevo calendario llamado `Mindwtr` en la misma cuenta de Google utilizada en Android.
3. En Android, abre Google Calendar y actualiza la cuenta. Asegúrate de que la sincronización de Calendar esté activada en los ajustes de la cuenta de Android.
4. En la aplicación Google Calendar para Android, activa **Compartir datos de Google Calendar con otras aplicaciones** para que Android exponga los calendarios de Google a Mindwtr.
5. Vuelve a **Ajustes → Calendario** de Mindwtr, toca **Actualizar calendarios** y selecciona el destino `Mindwtr` que muestre tu cuenta de Google.

Si el calendario `Mindwtr` respaldado por Google todavía no aparece en Mindwtr, Android no lo ha expuesto mediante el proveedor de calendarios del sistema. Actualiza Google Calendar, comprueba la sincronización de la cuenta de Android, activa **Compartir datos de Google Calendar con otras aplicaciones** en Google Calendar y, después, toca **Actualizar calendarios** en Mindwtr.

#### iOS: configuración de Apple Calendar

Para usar un destino independiente de Apple Calendar en un iPhone o iPad:

1. Abre Apple Calendar.
2. Crea un nuevo calendario llamado `Mindwtr`. Usa iCloud si quieres que los eventos aparezcan en otros dispositivos Apple o usa un calendario local si debe permanecer en el dispositivo.
3. Si usas iCloud, confirma que la sincronización de Calendar esté activada en **Ajustes -> Cuenta de Apple -> iCloud -> Calendar** de iOS.
4. Abre **Ajustes -> Calendario** de Mindwtr.
5. Activa **Enviar tareas al calendario** y concede permiso para el calendario.
6. Expande **Destino de sincronización**, toca **Actualizar calendarios** y elige el destino `Mindwtr` de Apple Calendar.
7. En Apple Calendar, abre la lista de calendarios y asegúrate de que el calendario `Mindwtr` seleccionado esté visible.

Si el calendario `Mindwtr` no aparece en la lista de destinos, confirma primero que esté visible en Apple Calendar y, después, vuelve a Mindwtr y toca **Actualizar calendarios**.

### Móvil: leer calendarios del dispositivo

En el móvil, Mindwtr puede leer calendarios de la base de datos de calendarios del dispositivo:

- **Android:** mediante el proveedor de calendarios de Android. Si una aplicación de sincronización no expone calendarios mediante ese proveedor, Mindwtr no puede verlos.
- **iOS:** mediante calendarios del sistema respaldados por EventKit, como iCloud, Google, Exchange y Outlook una vez activados en Ajustes de iOS.

Configuración:

1. Abre **Ajustes → Calendario**
2. Activa **Calendarios del dispositivo**
3. Concede permiso para el calendario
4. Expande **Calendarios del dispositivo**
5. Elige qué calendarios del dispositivo quieres mostrar

Mindwtr permanece en modo de solo lectura y no realiza OAuth del proveedor para las fuentes de calendarios.

Mindwtr oculta de la lista de lectura sus propios calendarios `Mindwtr` de destino para evitar importar copias duplicadas de los eventos que creó.

### macOS: integración con Apple Calendar

En el escritorio de macOS, Mindwtr puede leer eventos de Apple Calendar y enviar tareas de Mindwtr programadas/con fecha límite mediante EventKit:

1. Abre **Ajustes -> Calendario**
2. Solicita acceso a Apple Calendar
3. Permite Mindwtr en **Ajustes del Sistema -> Privacidad y seguridad -> Calendarios** de macOS
4. Activa **Enviar tareas al calendario** si quieres que las tareas de Mindwtr se escriban en Apple Calendar
5. Elige un calendario dedicado `Mindwtr` u otro calendario editable como destino

Esto solo funciona con los calendarios que ya están visibles en Apple Calendar.

### Linux: integración con GNOME/Evolution Data Server

En Linux, Mindwtr puede leer los calendarios habilitados de Evolution Data Server y enviar tareas programadas/con fecha límite a calendarios editables. Esto incluye las cuentas ya configuradas en Evolution o Cuentas en línea de GNOME cuando Evolution Data Server las expone.

1. Configura la cuenta de calendario en Evolution o Cuentas en línea de GNOME y confirma que aparece en Evolution.
2. Asegúrate de que `evolution-data-server` esté instalado y en ejecución.
3. Abre **Ajustes -> Calendario** en Mindwtr.
4. Activa **Enviar tareas al calendario** si quieres que las tareas de Mindwtr se escriban en el calendario del sistema.
5. Expande **Destino de sincronización**, actualiza los calendarios y elige un calendario dedicado `Mindwtr` u otro destino editable.

Linux no muestra un diálogo separado de permiso para el calendario. Los calendarios de solo lectura pueden aparecer en Mindwtr, pero no se ofrecen como destinos de envío. Las compilaciones Flatpak y Snap actuales no pueden acceder al servicio Evolution Data Server del sistema; por ahora, usa un paquete nativo o la compilación de AUR para esta integración.

### Escritorio/web: URL de ICS

1. Abre **Ajustes → Calendario**
2. Añade tu **URL de ICS**
3. Actualiza para obtener los eventos

Los eventos se almacenan en caché en el dispositivo y no se sincronizan mediante la sincronización de Mindwtr.

### Requisitos de las URL de ICS

Mindwtr espera que la URL obtenga texto iCalendar sin procesar. Un canal que funciona normalmente:

- comienza por `BEGIN:VCALENDAR`
- tiene una URL que termina en `.ics` o un enlace explícito de suscripción/exportación del proveedor del calendario
- se puede obtener sin una página de inicio de sesión interactiva ni encabezados adicionales

Ejemplos habituales:

- Google Calendar: usa la **Dirección secreta en formato iCal** privada.
- Nextcloud Calendar: usa el enlace de suscripción/exportación `.ics` del calendario, no la URL de la página pública del calendario.

Si Mindwtr muestra `HTTP 401`, el servidor solicita autenticación. Las solicitudes de nombre de usuario/contraseña, el inicio de sesión CalDAV y los encabezados de token de portador no son compatibles con las URL de calendarios. Usa en su lugar la URL secreta de suscripción iCalendar del proveedor.

Si una URL abre una página web normal en un navegador, probablemente no sea el canal ICS. Copia la URL de suscripción/exportación desde esa página.

### Calendarios privados (Google Calendar)

**No** necesitas hacer público tu calendario. Usa en su lugar la "Dirección secreta" privada:

1. Abre Google Calendar en la web → **Ajustes**.
2. Selecciona el calendario en la barra lateral izquierda.
3. En **Integrar el calendario**, copia la **Dirección secreta en formato iCal**.
4. Pega esa URL en Mindwtr.

Ese enlace funciona como una contraseña: solo las aplicaciones que tengan el enlace pueden ver los eventos, mientras el calendario permanece privado.

## Notas

- El Calendario de escritorio y móvil puede crear una tarea independiente de Mindwtr a partir de un evento externo. Mindwtr copia el título, la fecha/hora, la ubicación, la descripción y el nombre del calendario del evento cuando están disponibles.
- Los calendarios externos son de **solo lectura** dentro de Mindwtr. Crear una tarea a partir de un evento no modifica el evento original.
- Los eventos ICS recurrentes admiten `FREQ=DAILY`, `WEEKLY`, `MONTHLY` y `YEARLY`, incluidos `INTERVAL`, `COUNT`, `UNTIL`, `BYDAY`, `BYMONTH` y `BYMONTHDAY` para los patrones que Mindwtr puede expandir en el intervalo visible.
- Los eventos anuales de día completo y las reglas anuales como `FREQ=YEARLY;COUNT=...` o `FREQ=YEARLY;BYMONTH=1;BYDAY=3MO` se expanden en la ventana visible del calendario.
- Actualmente no se expanden las fechas de excepción ni las anulaciones de recurrencia como `EXDATE`, `RDATE` y `RECURRENCE-ID`.
- Los eventos recurrentes con `RRULE:...;COUNT=...` se detienen después de su recuento original. Si antes veías eventos recurrentes muy antiguos, vuelve a importarlos después de actualizar a v0.4.9+.
