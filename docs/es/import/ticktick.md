# Importar desde TickTick

Mindwtr puede importar copias de seguridad de TickTick para que migres sin reconstruir tu sistema a mano.

Fuentes compatibles:

- una copia de seguridad **CSV** de TickTick;
- una copia de seguridad **ZIP** de TickTick que contenga la exportación CSV.

La importación está disponible en escritorio y móvil desde **Ajustes → Datos → Importar desde TickTick**.

## Exportar desde TickTick

TickTick crea las copias de seguridad desde la aplicación web:

1. Abre TickTick en un navegador e inicia sesión.
2. Haz clic en tu avatar, en la esquina superior izquierda.
3. Abre **Settings → Account → Backup & Import**.
4. Elige **Generate Backup**.
5. Guarda el archivo CSV o ZIP que descargue TickTick.

Después, abre **Importar desde TickTick** en Mindwtr y elige ese archivo.

## Qué se importa

Mindwtr adapta las copias de TickTick a su modelo, priorizando GTD:

- las carpetas de TickTick se convierten en **áreas de Mindwtr**;
- las listas de TickTick se convierten en **proyectos de Mindwtr**;
- las tareas principales y sus filas secundarias pueden convertirse en **tareas con lista de comprobación**;
- el contenido de las listas se conserva como elementos de la lista de comprobación;
- las etiquetas de TickTick se convierten en **etiquetas de Mindwtr**;
- las prioridades se asignan cuando están presentes;
- las fechas límite y de inicio, las fechas de día completo y las zonas horarias se conservan cuando pueden leerse de forma segura;
- las reglas de repetición compatibles se importan como recurrencias de Mindwtr;
- los estados completado y archivado se conservan cuando están presentes;
- las notas y el contenido de las tareas se conservan en la descripción.

Las tareas activas importadas quedan disponibles para procesarlas con GTD, sin imponerles un estado que Mindwtr no pueda deducir de la copia.

## Proceso de importación

1. Abre **Importar desde TickTick**.
2. Elige una copia CSV o ZIP de TickTick.
3. Revisa el resumen de la vista previa.
4. Confirma la importación.

Antes de importar, Mindwtr guarda, cuando es posible, una instantánea de recuperación de tus datos locales actuales.

Después de importar:

- se crean las áreas y los proyectos necesarios;
- se añaden desde la copia las tareas, listas de comprobación, etiquetas, fechas y recurrencias;
- se muestran avisos sobre filas omitidas, entradas no compatibles del archivo o campos que Mindwtr no pudo asignar de forma segura.

## Notas sobre las copias de TickTick

Las copias de TickTick incluyen filas de metadatos antes de la cabecera CSV real. Mindwtr detecta automáticamente la cabecera correcta, así que no deberías tener que editar primero el archivo.

Mindwtr omite:

- archivos ZIP anidados;
- archivos que no sean CSV dentro del archivo;
- filas mal formadas que no pueda analizar de forma segura.

Las copias de TickTick no incluyen todo el estado de la aplicación. Puede que tengas que trasladar manualmente los adjuntos y algunos detalles de presentación específicos.

## Consejos

- Conserva la copia original de TickTick hasta comprobar la importación.
- Empieza con la copia completa, pero usa la vista previa para comprobar la correspondencia.
- Si importas dos veces la misma copia, puedes duplicar tareas.
- Consulta [Importar datos desde otras aplicaciones](/es/import/) si necesitas una alternativa para otra aplicación.

Consulta también [Datos y sincronización](/es/data-sync/) y [Copias de seguridad y restauración](/es/data-sync/backup-restore).
