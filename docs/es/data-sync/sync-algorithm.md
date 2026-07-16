# Algoritmo de sincronización

Mindwtr usa sincronización local-first con gestión determinista de conflictos.

Esta página es la referencia técnica de fusión para responsables de mantenimiento y depuración. Para la configuración de backends, los pasos de recuperación y las directrices operativas destinadas a usuarios, consulta [Datos y sincronización](/es/data-sync/).

## Entradas y salidas

- Entrada A: instantánea local (`tasks`, `projects`, `sections`, `areas`, `settings`)
- Entrada B: instantánea remota (misma estructura)
- Salida: instantánea fusionada + estadísticas de fusión (`conflicts`, `clockSkew`, `timestampAdjustments`, `futureTimestampClamps`, `conflictIds`, `conflictReasonCounts`, `conflictSamples`, `timestampAdjustmentIds`, `futureTimestampClampIds`) más registros acotados de diagnóstico de sincronización.

## Transporte basado en instantáneas

Actualmente, Mindwtr sincroniza fusionando instantáneas completas. Ese es el diseño previsto, no una capa de diferencias aún sin implementar.

- ADR 0003 y ADR 0007 definen el comportamiento de fusión basado en revisiones que se ejecuta sobre la carga de la instantánea.
- ADR 0008 registra la decisión de transporte de mantener la sincronización mediante instantáneas y aplazar cualquier registro de diferencias de solo anexado.
- ADR 0009 registra el contrato del puente de SQLite a JSON: SQLite es el almacén local principal, mientras que `data.json` es la instantánea de sincronización/copia de seguridad.
- Para la escala actual, esto mantiene la sincronización atómica y facilita su comprensión frente a reproducir y compactar registros de operaciones por dispositivo.

Reconsidera ADR 0008 solo si los archivos de instantáneas superan habitualmente los 5 MB, los ciclos completos de sincronización superan los 5 segundos en redes habituales o Mindwtr necesita transmisión en tiempo real entre varios dispositivos. Si eso ocurre, el diseño de diferencias debe ampliar los metadatos `rev` y `revBy` existentes en lugar de introducir un sistema de secuencias paralelo.

## Reglas de fusión

1. Las entidades se emparejan por `id`.
2. Si una entidad solo existe en un lado, se conserva.
3. Si existe en ambos, la fusión usa LWW basado en revisiones:
   - Cuando existen metadatos de revisión, primero se compara `rev` (gana el mayor). `rev` es un contador de ediciones por entidad, no un reloj vectorial, por lo que varias ediciones sin conexión en un dispositivo pueden imponerse a una edición más reciente en otro dispositivo.
   - Si las revisiones empatan, se compara `updatedAt` (gana el más reciente).
   - Si las marcas de tiempo empatan, se compara `revBy` lexicográficamente cuando ambos lados tienen identificadores de dispositivo diferentes y después se aplica el desempate determinista mediante la firma de contenido normalizada. El paso de `revBy` no establece prioridad entre dispositivos; hace que los conflictos con la misma revisión y marca de tiempo converjan al mismo ganador en todos los pares antes de recurrir a la firma de contenido.
   - Las entidades heredadas sin metadatos de revisión tratan los valores de `updatedAt` dentro del umbral de 5 minutos de desviación del reloj como un empate ambiguo y usan el ganador determinado por la firma. Fuera de esa ventana, gana el `updatedAt` más reciente.
4. Las eliminaciones lógicas usan la hora de la operación:
   - Hora de la operación = `max(updatedAt, deletedAt)` para las marcas de eliminación.
   - En los conflictos entre un elemento activo y uno eliminado se elige la hora de operación más reciente.
   - Si las horas de las operaciones de eliminación y del elemento activo están a menos de 30 segundos entre sí y los números de revisión empatan, Mindwtr conserva el elemento activo en lugar de dejar que la marca de eliminación gane inmediatamente. Esta es la regla deliberada de la ventana ambigua que puede hacer reaparecer una tarea recién eliminada tras una edición simultánea en otro dispositivo.
   - Si las revisiones difieren dentro de esa ventana de 30 segundos, sigue ganando la revisión más alta.
   - Los registros heredados sin metadatos de revisión dan preferencia a la marca de eliminación dentro de esa misma ventana.
   - Restaurar una copia de seguridad es la única excepción deliberada fuera de la ventana ambigua: si el lado activo tiene `revBy = "backup-restore"` y su hora de operación es igual o posterior a la hora de operación de la marca de eliminación, gana el elemento activo restaurado.
   - Cuando una eliminación se impone a una edición activa, Mindwtr emite una entrada de diagnóstico acotada `syncConflictDiscarded` con el tipo de entidad, el ID, los tiempos de operación y los metadatos de revisión.
   - Cuando se conserva el elemento activo de la ventana ambigua, Mindwtr emite una entrada de diagnóstico acotada `Preserved live item during ambiguous delete-vs-live merge` y almacena los metadatos del conflicto en el historial/ajustes de sincronización.
5. Un `deletedAt` no válido recurre a `updatedAt` para calcular de forma conservadora la hora de la operación.
6. Los archivos adjuntos se fusionan por `id` del archivo adjunto con las mismas reglas LWW.
7. Los metadatos de restauración del archivado de proyectos son metadatos de sincronización opacos:
   - Archivar un proyecto registra metadatos temporales de restauración en las tareas y secciones que modificó la acción de archivado.
   - Estos metadatos se ignoran en las firmas comparables y deterministas de sincronización, por lo que la contabilidad del archivado por sí sola no crea un conflicto de contenido ni un ganador determinista.
   - Desarchivar restaura solo los registros que siguen coincidiendo con el cambio generado por el archivado. Las tareas eliminadas, modificadas manualmente o trasladadas a otro proyecto se conservan tal cual y pueden mantener los metadatos opacos hasta que una modificación real del usuario o de la sincronización vuelva a escribir el registro.
8. Las áreas usan marcas de eliminación:
   - Eliminar un área aplica una marca de eliminación únicamente al área. Los proyectos y tareas activos de esa área se desvinculan (su `areaId` se borra con una revisión nueva) y permanecen activos. Eliminar un área nunca elimina sus elementos secundarios.
   - Restaurar un área no vuelve a vincular los elementos secundarios desvinculados anteriormente; permanecen activos sin un área.
   - Si una instantánea entrante hace referencia a un área ausente o eliminada, la reparación de la sincronización elimina la referencia `areaId` obsoleta y marca una revisión de reparación.
   - La reparación de la sincronización también se ejecuta en las marcas de eliminación, por lo que los proyectos/tareas eliminados no conservan vínculos de área obsoletos si se restauran más adelante.
   - Los valores de orden de área ausentes se generan durante la fusión y se marcan con `revBy: "sync-repair"` para que los pares no sobrescriban repetidamente la reparación.
9. Los ajustes se fusionan según las preferencias de sincronización:
   - La apariencia/el idioma/la planificación GTD/los calendarios externos/la IA/los filtros guardados pueden fusionarse de forma independiente.
   - La resolución de conflictos usa marcas de tiempo por grupo (`appearance`, `language`, `gtd`, `externalCalendars`, `ai`, `savedFilters`).
   - Las ediciones simultáneas de distintos campos dentro del mismo grupo aún pueden reducirse a la actualización más reciente del grupo.
   - Los filtros guardados se fusionan por `id` de filtro. Los conflictos entre filtros guardados activos usan estrictamente el `updatedAt` del filtro; el desempate determinista solo se aplica cuando las marcas de tiempo empatan o no se pueden usar.
   - Una exclusión local mediante `syncPreferences` es bidireccional para ese grupo: Mindwtr no envía ese grupo al servidor remoto ni acepta cambios remotos entrantes para él.
   - Los secretos (claves de API, rutas de modelos locales) nunca se sincronizan.
10. La recuperación de escrituras remotas es explícita:
   - Primero se escriben los datos locales con `pendingRemoteWriteAt`.
   - La escritura remota borra la marca cuando se completa correctamente.
   - Las escrituras remotas fallidas programan reintentos con una espera exponencial desde 5 segundos hasta 5 minutos.
   - Tras 12 reintentos fallidos de escritura remota, Mindwtr marca la sincronización como `error` y muestra el fallo del backend en lugar de seguir intentándolo indefinidamente.
   - Los diagnósticos de sincronización locales del dispositivo permanecen en él y se eliminan antes de las escrituras remotas.
11. Telemetría de desviación del reloj:
   - Las estadísticas de fusión registran la mayor desviación observada.
   - Se muestran advertencias cuando la desviación supera los 5 minutos.
   - Los valores de `updatedAt` futuros que estén más de 5 minutos por delante del reloj en el momento de la fusión se limitan para la comparación y se contabilizan en `futureTimestampClamps`.
   - Si ambos lados del mismo registro se limitan por estar en el futuro, Mindwtr emite un diagnóstico acotado `Both merge candidates had future updatedAt timestamps clamped` con el ID del registro y el momento del límite.
12. Las ediciones locales durante la sincronización no adquieren un bloqueo estricto:
   - El escritorio y el móvil detectan cuando el estado local cambió durante la fase de escritura de la sincronización.
   - Cuando ocurre, el ciclo actual se cancela y se pone en cola una nueva sincronización en lugar de sobrescribir la instantánea local más reciente.

## Pseudocódigo

```text
read local
read remote
validate payload shape
normalize entities (timestamps, revision metadata)

for each entity type in [tasks, projects, sections, areas, people]:
  index local by id
  index remote by id
  for each id in union(localIds, remoteIds):
    if only one side exists: keep it
    else:
      winner = resolveWinner(localItem, remoteItem)
      mergedItem = mergeConflict(localItem, remoteItem, winner) // attachments/settings-specific logic
      push mergedItem

merge settings by sync preferences
validate merged payload
write local
write remote
record sync history and diagnostics
```

## Ejemplos de conflictos

### Ejemplo 1: Activo frente a eliminado

- Local: tarea `t1` actualizada a las `10:01`, no eliminada
- Remoto: tarea `t1` eliminada a las `10:03`
- Resultado: gana la versión eliminada (la hora de operación `10:03` es más reciente)

### Ejemplo 1b: Eliminación ambigua frente a elemento activo

- Local: tarea `t1` editada a las `10:00:05`, todavía activa
- Remoto: tarea `t1` eliminada a las `10:00:20`
- Ambos registros tienen el mismo número de revisión
- Resultado: gana el elemento activo porque las operaciones están separadas por solo 15 segundos y los metadatos de revisión empatan dentro de la ventana de ambigüedad

### Ejemplo 2: Revisión y marca de tiempo iguales

- Tanto el local como el remoto tienen `rev=4`, `updatedAt=10:00`
- El contenido difiere (`title`, `tags`, etc.)
- Resultado: la comparación determinista de firmas elige el mismo ganador en todos los dispositivos

### Ejemplo 3: deletedAt no válido

- La marca de eliminación local tiene `deletedAt="invalid-date"` y `updatedAt=09:30`
- El elemento remoto activo tiene `updatedAt=10:00`
- Resultado: gana el elemento activo porque la eliminación no válida usa el valor alternativo `updatedAt` (`09:30`)

## Archivos adjuntos

- La fusión de metadatos se ejecuta antes de la conciliación de transferencias de archivos.
- El URI/estado local del archivo adjunto ganador se conserva cuando se puede usar.
- Si el ganador no tiene un URI local utilizable, la fusión puede recurrir al URI/estado del otro lado.
- Las carreras entre eliminación y elemento activo de los archivos adjuntos usan la misma fusión y los mismos diagnósticos `syncConflictDiscarded` que las tareas/proyectos, por lo que una eliminación de archivo adjunto que gane a una edición simultánea de metadatos aparece en los diagnósticos.
- Los archivos locales ausentes se gestionan más tarde mediante la sincronización/descarga de archivos adjuntos.
- `settings.attachments.pendingRemoteDeletes` registra los archivos remotos que aún deben eliminarse después de una eliminación local de un archivo adjunto.
- Las eliminaciones remotas pendientes se conservan hasta que la eliminación remota se completa correctamente. No se purgan por antigüedad, porque descartarlas antes de completarse puede dejar archivos eliminados huérfanos en el backend.
- Mindwtr Cloud también expone un endpoint autenticado de limpieza de elementos huérfanos que elimina los archivos adjuntos no referenciados por la instantánea actual.

## Fusión del servidor en la nube

Mindwtr Cloud no es un mero almacén de objetos para `/v1/data`. En una solicitud autenticada `PUT /v1/data`, el servidor lee la instantánea existente del espacio de nombres, ejecuta el mismo algoritmo de fusión con la instantánea entrante, valida el resultado fusionado y escribe ese resultado.

Consecuencias operativas:

- Enviar una instantánea completa no fuerza una sobrescritura. Los registros remotos existentes con revisiones más altas, horas de operación más recientes o marcas de eliminación ganadoras pueden sobrevivir al PUT.
- La reparación de referencias del servidor puede crear actualizaciones en cascada, como aplicar marcas de eliminación a secciones de proyectos eliminados.
- Las marcas de tiempo de reparación generadas por el servidor usan el reloj de pared del servidor. Esto evita que el reloj adelantado de un cliente haga avanzar los metadatos de reparación del servidor.
- Las respuestas correctas de `PUT /v1/data` incluyen `{ ok: true, stats, clockSkewWarning }` para que los clientes y las pruebas puedan inspeccionar el resultado de la fusión que usó el servidor.

## Comprobación rápida de ausencia de cambios

Los clientes de Cloud pueden realizar una solicitud `HEAD /v1/data` antes de descargar una instantánea completa. El servidor devuelve metadatos `ETag`, `Last-Modified` y `Content-Length` sin cuerpo de respuesta. Los clientes comparan esos metadatos con la última sincronización correcta y omiten la ruta completa `GET /v1/data` cuando el espacio de nombres remoto no ha cambiado.

El servidor almacena en caché el ETag SHA-256 según los metadatos de estado del archivo para que las comprobaciones `HEAD` repetidas sin cambios no vuelvan a calcular el hash de toda la instantánea.

## Sincronización programada en segundo plano

La sincronización móvil en segundo plano se programa con un intervalo mínimo conservador de 15 minutos. La tarea en segundo plano carga de forma diferida el código de importación/sincronización solo cuando es necesario y después ejecuta la misma fusión de instantáneas y la lógica de reintentos de escritura remota descritas anteriormente.

La sincronización en segundo plano es oportunista: el sistema operativo puede retrasar u omitir una ejecución, por lo que la sincronización manual y en primer plano siguen siendo las vías de recuperación fiables cuando la conectividad o las credenciales han cambiado.

## Recuperación mediante reintentos

- Una escritura remota fallida no descarta silenciosamente el estado local recién fusionado.
- `pendingRemoteWriteAt`, `pendingRemoteWriteRetryAt` y `pendingRemoteWriteAttempts` se almacenan localmente.
- La siguiente sincronización se pausa hasta que vence la ventana de reintento y luego vuelve a intentarlo con la instantánea local conservada más cualquier edición local posterior.
- Después de 12 intentos, el estado de sincronización cambia a `error`. La instantánea local conservada permanece en el dispositivo y la interfaz de estado debe indicar al usuario que compruebe la conectividad o las credenciales del backend.

## Límite de purga de marcas de eliminación

Las marcas de eliminación protegen las eliminaciones solo mientras se conservan. La política de retención actual está limitada por `tombstoneRetentionDays`.

En la práctica, un dispositivo que haya estado sin conexión durante más tiempo que la ventana de retención puede volver a introducir registros cuyas marcas de eliminación ya se purgaron en otros dispositivos. Mindwtr considera esto el límite de coherencia documentado para la sincronización mediante instantáneas. Los usuarios deben sincronizar los dispositivos que lleven mucho tiempo sin conexión antes de confiar en datos locales antiguos, y los trabajos futuros en el protocolo deben rechazar instantáneas cuya última sincronización correcta sea anterior al horizonte de purga si se necesitan garantías más estrictas.

## Diagnósticos que puedes inspeccionar

- Recuento e ID de conflictos
- Recuentos de motivos de conflictos y muestras acotadas de conflictos
- Desviación máxima observada del reloj
- Ajustes de normalización de marcas de tiempo
- ID de registros cuyas marcas de tiempo se normalizaron
- Recuentos e ID de límites de marcas de tiempo futuras
- Entradas `syncConflictDiscarded` para conflictos entre eliminación y elemento activo en los que se descartó el lado activo
- Estado/historial de la última sincronización en Ajustes
- Detalles de cada conflicto en Ajustes → Sincronización: el nombre del elemento afectado, los campos que diferían y la versión del dispositivo que ganó (limitados a las muestras más recientes)
- Resúmenes de conflictos en `mindwtr.log`, escritos incluso cuando el registro de depuración está desactivado (solo ID y nombres de campos, nunca el contenido del registro)

## Documentación relacionada

- [Datos y sincronización](/es/data-sync/)
- [API de Cloud](/es/developers/cloud-api)
- [Despliegue en la nube](/es/data-sync/cloud-deployment)
- [Diagnósticos y registros](/es/data-sync/diagnostics-logs)
- [API principal](/es/developers/core-api)

## Solución de problemas

Si ves conflictos repetidos o advertencias de desviación:

1. Comprueba los relojes de los dispositivos (hora automática de red activada).
2. Comprueba la conectividad/autenticación del backend de sincronización.
3. Inspecciona los diagnósticos de sincronización en los ajustes y registros de la aplicación.
