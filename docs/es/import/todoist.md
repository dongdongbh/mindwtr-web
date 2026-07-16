# Importar desde Todoist

Mindwtr puede importar exportaciones de Todoist para que migres sin reconstruir tu sistema a mano.

Fuentes compatibles:

- una exportación **CSV** individual de Todoist;
- una copia de seguridad **ZIP** de Todoist que contenga varios archivos CSV de proyectos.

La importación está disponible en escritorio y móvil desde **Ajustes → Datos → Importar desde Todoist**.

---

## Qué se importa

Mindwtr adapta las exportaciones de Todoist a su modelo, priorizando GTD:

- los proyectos de Todoist se convierten en **proyectos de Mindwtr**;
- las secciones de Todoist se convierten en **secciones de Mindwtr**;
- las subtareas de Todoist se convierten en **elementos de listas de comprobación**;
- las etiquetas de Todoist se convierten en **etiquetas**;
- las tareas activas asignadas a proyectos se convierten en **Próximas acciones** de sus proyectos en Mindwtr;
- las tareas activas sin asignar quedan disponibles para procesarlas desde la **Bandeja de entrada**.

Mindwtr evita enviar a la Bandeja de entrada trabajo de proyectos que ya estaba organizado, mientras mantiene las tareas sueltas listas para procesarlas con GTD.

---

## Datos compatibles de Todoist

- títulos de tareas;
- descripciones;
- prioridades;
- fechas límite cuando pueden resolverse de forma segura;
- secciones;
- notas y comentarios adjuntos a las tareas;
- etiquetas escritas en el contenido de Todoist (por ejemplo, `@work`).

Los calendarios recurrentes de Todoist no se recrean automáticamente como recurrencias de Mindwtr. La tarea se importa una vez y el texto de recurrencia original de Todoist se conserva en la descripción, para que decidas cómo representarla en Mindwtr.

---

## Proceso de importación

1. Abre **Importar desde Todoist**.
2. Elige un archivo CSV o ZIP de Todoist.
3. Revisa el resumen de la vista previa.
4. Confirma la importación.

Antes de importar, Mindwtr guarda, cuando es posible, una instantánea de recuperación de tus datos locales actuales.

Después de importar:

- se crean los proyectos necesarios;
- las tareas activas asignadas aparecen como **Próximas acciones** en sus proyectos;
- las tareas activas sin asignar quedan disponibles para procesarlas desde la **Bandeja de entrada**;
- se muestran avisos sobre tareas recurrentes, filas omitidas o entradas no compatibles del archivo.

---

## Notas sobre las copias ZIP

Las copias ZIP de Todoist suelen contener un CSV por proyecto. Mindwtr lee cada CSV e importa cada proyecto por separado.

Mindwtr omite:

- archivos ZIP anidados;
- archivos que no sean CSV dentro del archivo;
- filas de Todoist mal formadas que no pueda analizar de forma segura.

---

## Consejos

- Empieza con un proyecto de Todoist pequeño si quieres probar primero la correspondencia.
- Conserva la instantánea de recuperación hasta comprobar que la importación es correcta.
- Si importas dos veces la misma exportación, puedes duplicar tareas.

Consulta también [Datos y sincronización](/es/data-sync/) y [Copias de seguridad y restauración](/es/data-sync/backup-restore).
