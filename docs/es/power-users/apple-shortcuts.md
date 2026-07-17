# Atajos de Apple

Mindwtr admite Atajos de Apple mediante App Intents nativos en iPhone y iPad. La primera versión se centra en el ciclo de captura GTD: llevar rápidamente los asuntos pendientes a Mindwtr y después revisarlos y procesarlos dentro de la aplicación.

Su alcance es deliberadamente menor que el sistema maduro de Atajos de Things, que ofrece acciones para crear, buscar, editar y mostrar elementos, además de acciones personalizadas. Mindwtr v1 empieza por captura y navegación para mantener la fiabilidad y no evitar sus rutas normales de creación, revisión y sincronización.

## Disponibilidad

Atajos está disponible en compilaciones iOS que incluyan la integración App Intents de Mindwtr.

| Superficie | Compatible |
| --- | --- |
| Aplicación Atajos | Sí |
| Siri | Sí |
| Spotlight / atajos sugeridos | Sí |
| Botón Acción que ejecuta un atajo | Sí |
| Acciones directas de Apple Watch | No, no en v1 |
| CarPlay | No, no en v1 |

## Acciones

### Capturar en Mindwtr

Usa **Capturar en Mindwtr** para enviar una tarea al flujo de confirmación de captura de la Bandeja de entrada.

| Parámetro | Obligatorio | Notas |
| --- | --- | --- |
| Tarea | Sí | Título de la tarea. Se rechazan los títulos vacíos. |
| Nota | No | Se añade como descripción. |
| Etiquetas | No | Separadas por comas. Al guardar, Mindwtr las normaliza como `#tag`. |
| Proyecto | No | Coincide con un proyecto activo por título o lo crea al guardar la captura. |

Al ejecutarse:

1. Atajos abre Mindwtr.
2. Mindwtr muestra la pantalla de captura con el título y los metadatos opcionales rellenados.
3. Revisas la captura y la guardas mediante el flujo normal.

La tarea no se escribe directamente desde Swift. Así, su creación permanece dentro del almacenamiento, SQLite, revisiones y sincronización existentes de Mindwtr.

### Abrir una lista de Mindwtr

Usa **Abrir una lista de Mindwtr** para ir a una vista GTD.

| Lista | Abre |
| --- | --- |
| Bandeja de entrada | Bandeja de entrada |
| Foco | Foco / Próximas acciones |
| En espera | En espera |
| Algún día | Algún día/Tal vez |
| Proyectos | Proyectos |
| Revisión | Revisión |
| Calendario | Calendario |

Si no configuras una lista, el atajo usa la Bandeja de entrada.

### Añadir a la Bandeja de entrada de Mindwtr

Usa **Añadir a la Bandeja de entrada de Mindwtr** para crear una tarea silenciosamente sin abrir Mindwtr. Esta es la acción indicada para automatizaciones de Atajos. Un activador temporal, de calendario o ubicación puede añadir una tarea sin que nadie toque el teléfono.

| Parámetro | Obligatorio | Notas |
| --- | --- | --- |
| Tarea | Sí | Título. Los títulos vacíos hacen fallar el atajo. |
| Nota | No | Se añade como descripción. |
| Etiquetas | No | Separadas por comas; Mindwtr las normaliza como `#tag`. |
| Proyecto | No | Coincide con un proyecto activo por título. Los desconocidos o archivados se ignoran y la tarea llega igualmente a la Bandeja de entrada. |

El texto de **Tarea** admite la [sintaxis de añadido rápido](/es/use/mobile#sintaxis-de-adicion-rapida) completa (`/due:`, `@context`, `#tag`, `+Project` y demás). Se analiza al crear la tarea, exactamente igual que en el cuadro de captura de la app; el ajuste **Limpiar texto de añadido rápido** decide si la sintaxis reconocida se elimina del título.

Al ejecutarse:

1. La acción pone la captura en cola en el dispositivo y termina de inmediato. Mindwtr permanece en segundo plano.
2. La próxima vez que Mindwtr se abra o vuelva al primer plano, la tarea en cola se crea mediante el almacenamiento y la sincronización normales.

Como se crea al volver a abrir Mindwtr, no aparecerá en otros dispositivos sincronizados ni se activará ningún recordatorio hasta que la aplicación vuelva a ejecutarse en ese iPhone o iPad. El parámetro **Proyecto** nunca crea proyectos; sin embargo, un `+Project` escrito en el texto de la tarea sigue las reglas del añadido rápido y puede crear uno.

### Ejemplo: tarea activada por el calendario

1. En **Atajos**, abre **Automatización** y crea una.
2. Elige un activador, por ejemplo un evento de calendario cuyo título contenga «recogida de basura».
3. Añade **Añadir a la Bandeja de entrada de Mindwtr** y define **Tarea** como «Sacar la basura».
4. Configura **Ejecutar inmediatamente** para que no necesite confirmación.

## Atajos de ejemplo

### Capturar por voz

1. Abre **Atajos** de Apple.
2. Crea un atajo.
3. Añade **Dictar texto** o **Solicitar entrada**.
4. Añade **Capturar en Mindwtr**.
5. Pasa el texto dictado a **Tarea**.
6. Si quieres, define **Etiquetas** como `phone,errands`.

Resulta útil al caminar, desplazarte o cambiar de aplicación. Siri puede reconocer mal algunas palabras según el entorno, así que revisa la captura antes de guardarla.

### Abrir Foco con el botón Acción

1. Crea un atajo con **Abrir una lista de Mindwtr**.
2. Define **Lista** como **Foco**.
3. En Ajustes de iOS, asigna ese atajo al botón Acción.

## Alternativa mediante esquema de URL

Mindwtr también admite automatización mediante URL. Úsala si otra herramienta no puede acceder a App Intents nativos.

| URL | Acción |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Abre la captura con un título |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Abre la captura con título y nota |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Abre la captura con proyecto y etiquetas |
| `mindwtr://open-feature?feature=focus` | Abre Foco |
| `mindwtr://open-feature?feature=review` | Abre Revisión |

Alias compatibles:

| Campo | Alias |
| --- | --- |
| Título | `title`, `text`, `name`, `thingName`, `itemListElementName`, `itemListName` |
| Nota | `note`, `description`, `body`, `thingDescription`, `itemListDescription` |

## Limitaciones de v1

Mindwtr v1 no incluye:

- tipos de tarea o lista AppEntity personalizados;
- acciones para buscar, editar, duplicar, eliminar o trabajar por lotes;
- planificación directa desde Atajos de tareas recurrentes, recordatorios o fechas;
- compatibilidad con Apple Watch o CarPlay.

Son buenas opciones futuras, pero requieren un diseño cuidadoso para que las ediciones y escrituras en segundo plano respeten la sincronización local-first y las reglas GTD.

## Enlaces relacionados

- [Guía para dispositivos móviles](/es/use/mobile)
- [Flujo de trabajo GTD en Mindwtr](/es/use/gtd-workflow)
- [Datos y sincronización](/es/data-sync/)
- [Things: Using Apple Shortcuts](https://culturedcode.com/things/support/articles/2955145/)
- [Things: Shortcuts Actions](https://culturedcode.com/things/support/articles/9596775/)
- [Apple: App Intents overview](https://developer.apple.com/videos/play/wwdc2024/10210/)
