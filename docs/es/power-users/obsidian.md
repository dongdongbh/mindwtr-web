# Integración con Obsidian

Mindwtr puede importar tareas desde una bóveda de Obsidian en escritorio, mantenerlas actualizadas a medida que cambian los archivos, volver a abrir la nota de origen en Obsidian y realizar una escritura de vuelta de alcance limitado para los formatos de tareas compatibles.

Relacionado: [Enlaces Markdown](/es/use/markdown-links)

## Alcance actual

La compatibilidad actual con Obsidian incluye:

- solo escritorio
- supervisión automática de archivos con actualización incremental
- nuevo análisis manual como alternativa
- enlaces profundos a la nota de origen con `obsidian://`
- escritura de vuelta limitada para los formatos de tareas compatibles
- compatibilidad con tareas Markdown estándar en línea
- compatibilidad con referencias internas de Mindwtr a tareas/proyectos en Markdown
- compatibilidad con archivos de TaskNotes

Fuera del alcance:

- acceso a bóvedas desde dispositivos móviles
- tratar Obsidian como backend de sincronización de Mindwtr
- reescritura o reestructuración amplia de notas
- Dataview como formato principal de tareas
- un complemento completo de Obsidian

## Filosofía

La integración con Obsidian es una integración externa basada en archivos, no un nuevo backend de sincronización de Mindwtr.

El motor de sincronización de Mindwtr se basa en `data.json`, mientras que Obsidian se basa en notas. Para evitar conflictos destructivos y ediciones inesperadas, Mindwtr lee directamente los archivos de la bóveda y mantiene el acceso de escritura intencionadamente limitado.

## Configuración

En escritorio:

1. Abre **Ajustes -> Integraciones**
2. Busca **Bóveda de Obsidian**
3. Selecciona la carpeta de tu bóveda. Las bóvedas registradas en Obsidian se detectan automáticamente y se ofrecen con un solo clic; la exploración manual sigue disponible para cualquier otro caso
4. Habilita la integración
5. Limita opcionalmente el análisis a carpetas específicas
6. Establece opcionalmente el archivo de bandeja de entrada en línea, cuyo valor predeterminado es `Mindwtr/Inbox.md`
7. Elige opcionalmente si se deben incluir los archivos de TaskNotes archivados
8. Elige opcionalmente el formato de las tareas nuevas: `auto`, `inline` o `tasknotes`
9. Guarda la configuración y ejecuta **Volver a analizar la bóveda** una vez

Después del análisis inicial, Mindwtr supervisa la bóveda y actualiza automáticamente los archivos modificados. El botón de análisis manual permanece disponible como vía de recuperación si el supervisor omite un evento o una carpeta sincronizada tarda en actualizarse.

Si la carpeta seleccionada no contiene un directorio `.obsidian/`, Mindwtr muestra una advertencia, pero aun así permite guardar la ruta.

## Formatos de tareas compatibles

### Tareas Markdown en línea

Si el ámbito analizado no contiene archivos de TaskNotes, Mindwtr importa casillas estándar de Markdown:

```md
- [ ] Incomplete task
- [x] Completed task
```

Mindwtr conserva:

- la sangría de tareas anidadas
- etiquetas en línea como `#work` o `#project/alpha`
- enlaces wiki como `[[Meeting Notes]]`
- etiquetas del frontmatter YAML de la nota

Las tareas en línea importadas muestran:

- el texto de la tarea
- el estado de finalización
- la ruta de la nota de origen y el número de línea
- una acción **Abrir en Obsidian**

### TaskNotes

Mindwtr también es compatible con [TaskNotes](https://tasknotes.dev/), que almacena una tarea por archivo Markdown con frontmatter YAML.

Ejemplo:

```md
---
tags:
  - task
title: Review quarterly report
status: in-progress
priority: high
due: 2025-01-15
scheduled: 2025-01-14
contexts:
  - "@office"
projects:
  - "[[Q1 Planning]]"
timeEstimate: 120
---
## Notes
Key points to review
```

Cuando se detectan archivos de TaskNotes en el ámbito analizado, Mindwtr trata TaskNotes como la fuente de verdad para las tareas importadas de Obsidian y **no** importa además listas de verificación en línea aleatorias de otras notas. Esto evita convertir listas de verificación comunes en tareas para quienes usan TaskNotes.

Actualmente, Mindwtr importa campos de TaskNotes como:

- título
- estado/estado de finalización
- prioridad
- fechas de vencimiento y programación
- etiquetas
- contextos
- proyectos
- estimación de tiempo
- una vista previa breve del cuerpo

Mindwtr omite los archivos de vista/configuración de TaskNotes, y los archivos de TaskNotes archivados están ocultos de forma predeterminada, salvo que los habilites en los ajustes.

## Supervisión y actualización de archivos

Mindwtr supervisa la bóveda configurada en escritorio y vuelve a analizar únicamente los archivos Markdown modificados, en lugar de analizar de nuevo toda la bóveda cada vez.

Esto significa que:

- las ediciones realizadas en Obsidian aparecen automáticamente en Mindwtr
- al eliminar archivos de origen, se eliminan sus tareas importadas
- los archivos renombrados se comportan como una eliminación seguida de una creación
- los guardados rápidos se agrupan antes de la actualización

Si un cambio cruza el límite entre tareas en línea y TaskNotes, Mindwtr recurre a un análisis completo para mantener coherente el modo de importación.

## Comportamiento de la escritura de vuelta

La escritura de vuelta está limitada intencionadamente.

### Tareas en línea

Cuando cambias el estado de una tarea en línea de Obsidian importada en Mindwtr, Mindwtr solo actualiza el marcador de la casilla en la línea de esa tarea:

- `- [ ]` -> `- [x]`
- `- [x]` -> `- [ ]`

Mindwtr no reescribe el resto de la nota. Si el número de línea almacenado está desactualizado, recurre a buscar una coincidencia con el texto de la tarea en el archivo. Las coincidencias ambiguas fallan de forma segura.

### Tareas de TaskNotes

Cuando cambias el estado de una tarea de TaskNotes importada en Mindwtr, Mindwtr actualiza el estado del frontmatter en vez de editar el texto del cuerpo de la nota. También puede añadir o eliminar `completedDate` como parte de la misma escritura segura.

Mindwtr no cambia el formato del archivo completo ni reescribe campos no relacionados.

### Creación de tareas nuevas

Se pueden crear tareas nuevas de Obsidian de dos formas:

- `inline`: añade una línea nueva `- [ ] ...` a la nota de bandeja de entrada configurada
- `tasknotes`: crea un nuevo archivo Markdown de TaskNotes
- `auto`: sigue el modo de importación detectado en la bóveda

Esto mantiene la creación alineada con el formato que ya se utiliza.

## Elementos omitidos

Mindwtr omite:

- `.obsidian/`
- `.trash/`
- archivos/carpetas ocultos
- `node_modules/`
- archivos Markdown inusualmente grandes
- archivos de vista/configuración de TaskNotes

## Enlaces profundos

Mindwtr abre las notas de origen mediante el esquema URI de Obsidian:

```text
obsidian://open?vault=VAULT_NAME&file=RELATIVE_PATH_WITHOUT_MD
```

Esto te permite consultar el contexto en Obsidian sin copiar manualmente las rutas de los archivos.

## Limitaciones actuales

- solo escritorio
- los campos en línea de estilo Dataview, como `[due:: ...]`, aún no se analizan
- la actualización basada en el supervisor mantiene el nuevo análisis manual como alternativa
- si hay archivos de TaskNotes, Mindwtr suprime intencionadamente la importación de listas de verificación genéricas en línea en ese ámbito analizado

## Próximas mejoras previstas

- compatibilidad opcional con Dataview
- estudio de viabilidad para dispositivos móviles
- posible complemento de Obsidian en un repositorio separado

## Véase también

- [Datos y sincronización](/es/data-sync/)
- [Integración con el calendario](/es/use/calendar-integration)
