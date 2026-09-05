# Listas reutilizables (plantillas)

Mindwtr admite listas de comprobación reutilizables para tareas que repites sin un calendario estricto, como preparar equipaje, comprar alimentos o preparar un viaje.

## Tres patrones

### Duplicar (plantillas)

Úsalo cuando cada ejecución deba ser una copia nueva.

Ejemplo: **Lista de equipaje**

1. Conserva una tarea maestra en Algún día/Tal vez.
2. Duplícala cuando prepares un viaje.
3. Edita la copia sin afectar a la maestra.

Al duplicar se restablece lo siguiente:

- los elementos de la lista empiezan sin marcar;
- se borra la finalización, y la copia de una tarea completada o archivada llega a la **Bandeja de entrada** para volver a aclararla;
- la copia queda fuera del Enfoque de hoy;
- los archivos adjuntos no se copian; los enlaces sí;
- la copia se convierte en una tarea nueva, con identificadores nuevos para la lista y los adjuntos.

Lo que se conserva: título, descripción, proyecto, sección, área, contextos, etiquetas y las fechas de inicio, vencimiento y revisión. Una tarea recurrente conserva su regla, pero inicia su propia serie independiente, de modo que completar una copia ya no adelanta la otra.

### Restablecer la lista de comprobación

Úsalo cuando quieras reutilizar la misma lista.

Ejemplo: **Compra**

1. Marca los elementos mientras compras.
2. Toca **Restablecer lista de comprobación**.
3. Reutilízala la próxima vez.

Al restablecer:

- se desmarcan todos los elementos;
- se actualiza la tarea actual en vez de crear otra copia;
- la tarea vuelve a abrirse si ya estaba marcada como terminada.

### Duplicar un proyecto (plantillas de varias tareas)

Úsalo cuando la plantilla sea un proyecto entero y no una sola lista de comprobación.

Ejemplo: **Alta de cliente**

1. Mantén un proyecto maestro con sus secciones y tareas
2. Duplica el proyecto cuando empiece un cliente nuevo
3. Trabaja sobre la copia; el maestro no se toca

Lo que restablece la duplicación de un proyecto:

- la copia se llama `<Project> (Copy)`, se coloca al final de la misma área y no queda enfocada
- cada tarea copiada vuelve a **Siguiente** (las de referencia siguen siendo de referencia), con las fechas de inicio, vencimiento, revisión y finalización borradas
- las listas de comprobación de las tareas copiadas empiezan sin marcar y nada entra en el Foco de hoy
- los adjuntos se copian tanto en el proyecto como en sus tareas y se vuelven a subir en la siguiente sincronización

Lo que se conserva: las notas, el área, las etiquetas, el color y el estado del proyecto, además de toda su estructura de secciones, con cada tarea de vuelta en la sección de la que venía. La fecha de vencimiento y la de revisión del propio proyecto se copian tal cual: a diferencia de las de las tareas, no se borran, así que revísalas en la copia. Las tareas y secciones eliminadas no se copian.

## Dónde encontrarlo

- **Dispositivos móviles:** editor de tareas → **Duplicar tarea** o **Restablecer lista de comprobación**.
- **Escritorio:** menú de acciones de la tarea. Las filas completadas en **Hecho** y **Archivado** también muestran un botón de copiar al pasar el cursor.
- **Proyectos:** en escritorio, haz clic derecho en un proyecto de la barra lateral o usa **Duplicar** en el menú **...** de la cabecera del proyecto. En móvil, desliza la fila del proyecto hacia la derecha o usa **Duplicar** en la ficha de detalle del proyecto.

## Qué opción elegir

- Usa **Duplicar tarea** para preparar viajes, listas de incorporación o cualquier proceso cuyas ejecuciones necesiten notas y fechas propias.
- Usa **Restablecer lista de comprobación** para compras, mantenimiento periódico u otras listas cuya misma tarea siga siendo útil con el tiempo.
- Si la lista también tiene fechas, recurrencias o notas específicas de un proyecto, duplicarla suele ser más seguro.

## Consejos

- Conserva la versión maestra en **Algún día/Tal vez** o en un proyecto poco visible para no saturar las listas diarias.
- Da a las plantillas nombres claros, como `Lista de equipaje (plantilla)`, si las duplicas a menudo.
- Si cada elemento empieza a necesitar fechas límite o reglas de recurrencia, divídelo en tareas independientes en vez de sobrecargar una sola lista reutilizable.
