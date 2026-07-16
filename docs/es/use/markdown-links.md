# Enlaces Markdown

Mindwtr admite enlaces Markdown internos para crear referencias cruzadas entre tareas y proyectos dentro de las notas.

## Sintaxis compatible

Usa identificadores estables de Mindwtr en vez de títulos de texto:

```md
[[task:task-id|Quarterly review]]
[[project:project-id|Website launch]]
```

- Los enlaces `task:` apuntan a una tarea por su identificador.
- Los enlaces `project:` apuntan a un proyecto por su identificador.
- El texto posterior a `|` es la etiqueta que se muestra en el editor y la vista previa.

Mindwtr también normaliza esos tokens como enlaces Markdown normales al representarlos:

```md
[Quarterly review](mindwtr://task/task-id)
[Website launch](mindwtr://project/project-id)
```

## Crear enlaces

Al editar un campo Markdown compatible, escribe `[[` y empieza a buscar.

- La búsqueda coincide con títulos de tareas y proyectos.
- El escritorio muestra sugerencias flotantes cerca del cursor y las coloca sobre este cuando falta espacio.
- La versión móvil muestra las mismas sugerencias en un panel inferior sobre el teclado.
- Los editores de tareas excluyen la tarea actual para evitar que la enlaces consigo misma por accidente.
- Los enlaces insertados siempre usan el token estable `[[task:...|label]]` o `[[project:...|label]]`.
- Los fragmentos y bloques de código no se modifican.

## Dónde funciona

- Descripciones de tareas en escritorio y móvil.
- Notas de proyectos en escritorio y móvil.
- Vistas previas de solo lectura, detalles ampliados de tareas y representación de «Detalles activados» en Foco/Lista en escritorio.
- Vista previa dentro de los editores móviles de tareas y proyectos.

## Qué no hace

- Los enlaces Markdown son únicamente referencias de navegación.
- No crean grafos de dependencias, completan automáticamente tareas enlazadas ni vinculan el estado de listas de comprobación entre tareas.

## Comportamiento de navegación

- Los enlaces a tareas activas abren la vista correcta de Mindwtr y resaltan la tarea.
- Los enlaces a proyectos activos abren la vista Proyectos y seleccionan el proyecto.
- Los enlaces externos siguen admitiendo `http`, `https`, `mailto` y `tel`.

## Elementos eliminados

Si se ha eliminado la tarea o el proyecto enlazado:

- Mindwtr representa la etiqueta tachada.
- El escritorio muestra una acción **Restaurar** cuando el elemento eliminado aún existe como marcador en los datos locales.
- Si el marcador ya no existe, el enlace queda como una etiqueta de elemento eliminado sin interacción.

## Ejemplo

```md
Prepare launch notes for [[project:project-123|Website launch]]

- [ ] Draft intro copy
- [ ] Review [[task:task-456|homepage checklist]]
```

## Documentación relacionada

- [Integración con Obsidian](/es/power-users/obsidian)
- [API del núcleo](/es/developers/core-api)
