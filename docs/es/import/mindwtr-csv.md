# Importar desde CSV de Mindwtr

Mindwtr puede importar un archivo CSV corriente que siga un formato de columnas documentado. Es la vía genérica para las aplicaciones que no tienen importador propio pero sí pueden exportar una hoja de cálculo.

Orígenes admitidos:

- un único archivo `.csv`
- un archivo `.zip` que contenga uno o varios archivos CSV

La importación está disponible en escritorio y en móvil desde **Ajustes → Datos → Importar desde Mindwtr CSV**. Mindwtr muestra una vista previa con recuentos y avisos antes de escribir nada.

## Cuándo usar este importador

Si tu aplicación aparece en [Importar datos desde otras aplicaciones](/es/import/), es mejor usar su importador nativo: esos importadores leen la exportación propia de la aplicación y ya conocen sus peculiaridades.

Recurre al CSV de Mindwtr cuando tu aplicación no aparezca. Exporta el CSV que genere, renombra las celdas de la cabecera con los nombres de columna que se indican más abajo en un editor de hojas de cálculo e importa el resultado. Así se conserva mucho más que pegando una lista de títulos: proyectos, secciones, áreas, estados, fechas, etiquetas, contextos y listas de comprobación sobreviven al traslado.

## Formato del archivo

- **Codificación:** UTF-8. La marca de orden de bytes se elimina automáticamente. Otras codificaciones se descodifican de forma tolerante y pueden perder caracteres acentuados, así que guarda en UTF-8 siempre que tu hoja de cálculo lo permita.
- **Delimitador:** se detecta en la primera línea no vacía. Sirven la coma, el punto y coma y el tabulador.
- **Comillas:** las habituales de CSV. Encierra un valor entre `"` cuando contenga el delimitador, un salto de línea o una comilla, y escribe una comilla interna como `""`.
- **Fila de cabecera:** obligatoria. `Title` debe estar presente o la importación se detiene con un error en vez de adivinar.
- **Nombres de columna:** se reconocen sin distinguir mayúsculas ni orden. Son siempre los nombres en inglés que figuran más abajo, sea cual sea el idioma de la interfaz de Mindwtr.
- **Columnas desconocidas:** se ignoran y un aviso indica cuántas se omitieron.
- **Filas vacías:** se omiten en silencio. Una fila con contenido pero sin título se omite con un aviso.

## Referencia de columnas

Todas las columnas salvo `Title` son opcionales: basta con incluir las que realmente uses.

| Columna | Valores admitidos | Qué hace Mindwtr |
| --- | --- | --- |
| `Title` | cualquier texto | Obligatoria. El título de la tarea. |
| `Description` | cualquier texto | La descripción de la tarea. Los saltos de línea se conservan dentro de un valor entrecomillado. |
| `Status` | `inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived` | No distingue mayúsculas. Si se deja vacío, el estado pasa a `done` cuando hay `Completed At`, a `next` cuando la fila indica un proyecto y, si no, a `inbox`. Un valor no reconocido se convierte en `inbox` con un aviso. |
| `Project` | el nombre de un proyecto | Crea el proyecto una sola vez y coloca la tarea dentro. Los nombres se comparan sin distinguir mayúsculas. |
| `Section` | el nombre de una sección del proyecto de esa fila | Necesita un `Project` en la misma fila. Sin él, el valor se ignora con un aviso. |
| `Area` | el nombre de un área | Si la fila indica un `Project`, el área contiene el proyecto. Si no, la propia tarea se archiva en el área. |
| `Contexts` | nombres separados por comas o punto y coma | Añade la `@` inicial cuando falta y descarta las repeticiones. |
| `Tags` | nombres separados por comas o punto y coma | Añade la `#` inicial cuando falta, pasa la etiqueta a minúsculas y descarta las repeticiones. |
| `Assigned To` | el nombre de una persona | Define la persona asignada, que es lo que alimenta la lista En espera. |
| `Priority` | `high`, `medium`, `low` o `1`, `2`, `3` | Cualquier otro valor deja la prioridad sin asignar. |
| `Energy` | `high`, `medium`, `low` | Cualquier otro valor deja el nivel de energía sin asignar. |
| `Start Date` | una fecha, con hora o sin ella | La fecha de inicio. La tarea permanece fuera de Enfoque hasta que llega. |
| `Due Date` | una fecha, con hora o sin ella | La fecha límite. |
| `Review Date` | una fecha, con hora o sin ella | La fecha de revisión para reconsiderar la tarea más adelante. |
| `Completed At` | una fecha con hora | La marca de finalización. Además convierte un `Status` vacío en `done`, y solo se conserva cuando el estado resultante es `done` o `archived`. |
| `Created At` | una fecha con hora | La marca de creación. Si se deja vacía, la tarea se crea con la fecha de la importación. |
| `Checklist` | elementos separados por saltos de línea o `\|` | Se convierte en la lista de comprobación de la tarea. Un elemento escrito como `[x] Buy stamps` empieza completado; `[ ] Buy stamps` y un simple `Buy stamps` empiezan pendientes. Una tarea con elementos de comprobación se convierte en tarea de lista. |
| `Location` | cualquier texto | El campo de ubicación de la tarea. |
| `Order` | un número | Ordena la tarea entre sus hermanas del mismo proyecto, área o bandeja de entrada. Las filas sin número, o con el mismo número, mantienen el orden que tenían en el archivo. |
| `ID` | cualquier identificador estable | Da a la fila una identidad duradera para futuras importaciones. Un valor que repita una fila anterior de la misma importación se descarta con un aviso. |
| `Recurrence` | cualquier texto | Se reconoce para no contarla como columna desconocida, pero el valor se ignora con un aviso. |

## Fechas y horas

- Una fecha sin más, como `2026-09-01`, se mantiene como fecha simple. Mindwtr no le inventa una hora de medianoche.
- Una fecha con hora y sin zona, como `2026-09-05 14:30`, conserva exactamente esa hora de reloj.
- Un valor terminado en `Z` o con un desplazamiento como `+02:00` se guarda como el instante preciso que indica.
- `Created At` y `Completed At` se guardan siempre como un instante preciso, porque registran cuándo ocurrió algo realmente.
- Un valor que Mindwtr no pueda leer se deja vacío, y la vista previa indica cuántos se omitieron.

ISO 8601 (`YYYY-MM-DD`) es la forma más segura de escribirlas. Se intentan otros formatos, pero una columna de la hoja de cálculo con fechas en formato local es el motivo más frecuente de valores omitidos.

## Ejemplo completo

```csv
Title,Description,Status,Project,Section,Area,Contexts,Tags,Priority,Start Date,Due Date,Checklist,ID
Book the venue,Needs 60 seats,next,Team Offsite,Logistics,Work,@phone,#offsite,high,2026-09-01,2026-09-12,[x] Shortlist venues|[ ] Call first choice,offsite-1
Draft the agenda,,next,Team Offsite,Programme,Work,@computer,"#offsite, #writing",medium,,2026-09-20,,offsite-2
Buy a whiteboard,,inbox,,,,@errands,,,,,,offsite-3
```

Ese archivo crea un área, un proyecto dentro de ella con dos secciones, dos tareas en ese proyecto, una lista de comprobación de dos elementos en la primera y una tarea suelta en la bandeja de entrada.

## Proceso de importación

1. Abre **Ajustes → Datos → Importar desde Mindwtr CSV**.
2. Elige tu archivo `.csv` o `.zip`.
3. Lee la vista previa. Indica cuántas tareas, áreas, proyectos, secciones y elementos de comprobación se crearán, cuántas tareas quedarán fuera de proyectos, los primeros proyectos con su recuento de tareas y todos los avisos.
4. Confirma la importación, o cancélala si los recuentos no cuadran.

Mindwtr guarda una instantánea de recuperación antes de escribir. Si el resultado no es el que buscabas, restáurala desde **Ajustes → Sincronización → Instantáneas de recuperación**.

## Volver a importar el mismo archivo

Mindwtr da a cada fila una identidad estable, así que importar dos veces el mismo archivo no duplica nada.

- Con una columna `ID`, la identidad sigue ese valor, de modo que una reexportación corregida cae sobre las mismas tareas.
- Sin columna `ID`, la identidad depende de la posición de la fila en el archivo (y, dentro de un ZIP, del archivo del que procede). Reimportar exactamente el mismo archivo es seguro, pero una exportación con filas añadidas o eliminadas ya no encaja y creará duplicados.
- Las filas que ya existen se omiten, no se actualizan. Una importación nunca sobrescribe una tarea que hayas editado después en la aplicación.
- Las eliminaciones se respetan. Si borras un proyecto importado y vuelves a importar el archivo, el proyecto no se recrea y sus filas llegan sin él.
- Si el nombre de un área o un proyecto importado ya pertenece a otro elemento, el nuevo recibe `(Mindwtr CSV)` al final del nombre y un aviso lo indica.

## Lo que este importador no hace

- **Recurrencias.** Un CSV no crea repeticiones. Configúralas en la aplicación después de importar.
- **Jerarquía de subtareas.** No hay columna de tarea principal. Usa `Checklist` para los pasos dentro de una tarea y `Section` para agrupar dentro de un proyecto.
- **Adjuntos.** Las rutas de archivo o las URL de un CSV son texto; no se descarga ni se copia nada.
- **Exportación.** Mindwtr todavía no escribe este formato. Para mover datos entre instalaciones de Mindwtr, usa la [copia de seguridad](/es/data-sync/backup-restore) en JSON.

## Avisos que puedes ver

Los avisos se cuentan para toda la importación y se muestran una vez con su recuento, nunca uno por fila:

- se ignoraron columnas desconocidas
- hubo estados que no se pudieron asignar y se importaron a la Bandeja de entrada
- se ignoraron valores de `Section` porque sus filas no tenían `Project`
- se ignoraron valores de `Recurrence`
- hubo fechas que no se pudieron interpretar y se omitieron
- se descartaron filas porque su `ID` repetía una fila anterior
- se omitieron filas sin título
- se renombró un área o un proyecto importado para evitar un conflicto de nombres
- se omitieron archivos que no eran CSV dentro de un ZIP
- se omitieron archivos ZIP anidados dentro del archivo comprimido
- un CSV terminó con un campo entrecomillado sin cerrar y se importó lo mejor posible
- no se pudo interpretar un archivo CSV y se omitió

## Consejos

- Importa primero un archivo de prueba con cinco filas y comprueba la correspondencia antes de traer cientos de filas.
- Añade una columna `ID` si hay alguna posibilidad de que afines la exportación y la importes de nuevo.
- Deja `Status` en blanco cuando tu origen no tenga nada equivalente. El valor predeterminado coloca el trabajo de proyecto en Siguiente y todo lo demás en la Bandeja de entrada, listo para que lo aclares.
- Conserva la exportación original y la instantánea de recuperación hasta que hayas verificado el resultado.

Consulta también [Importar datos desde otras aplicaciones](/es/import/) y [Copia de seguridad y restauración](/es/data-sync/backup-restore).
