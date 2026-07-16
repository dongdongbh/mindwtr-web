# Ciclo de vida de los datos

Una pregunta frecuente es qué hace crecer `data.json`, qué reduce su tamaño y si hace falta una limpieza manual. La respuesta breve es que no hace falta. Así funciona.

## Dónde residen tus datos

La fuente de verdad local es una **base de datos SQLite** dentro del directorio de datos de la aplicación. El archivo `data.json` de la carpeta de sincronización es una **instantánea** que la aplicación vuelve a generar desde esa base. Es la carga de sincronización y una copia legible, no un registro al que se añaden entradas.

Como se vuelve a generar, su tamaño puede disminuir entre ejecuciones: los marcadores de eliminación caducados y los elementos purgados simplemente dejan de escribirse. Eliminar `data.json` no «compacta» nada; la aplicación vuelve a crear la misma instantánea desde la base de datos.

## Qué lo hace crecer

- Tareas activas, completadas y archivadas; tu historial sigue siendo consultable por diseño.
- Proyectos, secciones, áreas, personas y filtros guardados.
- **Metadatos** de adjuntos, unos cientos de bytes por archivo; su contenido reside aparte en `attachments/`.
- Marcadores de elementos eliminados, que permiten que otros dispositivos conozcan las eliminaciones.

## Qué lo reduce automáticamente

- **Caducidad de marcadores:** los registros de eliminaciones se purgan tras el periodo de conservación, 90 días de forma predeterminada.
- **Vaciado de la papelera:** «Eliminar para siempre», por elemento o mediante Vaciar todo, quita inmediatamente los datos y solo conserva el marcador hasta que caduque.
- **Limpieza de adjuntos:** los metadatos huérfanos y las transferencias pendientes antiguas se purgan con un número limitado de reintentos. Ajustes → Datos también incluye una limpieza manual.

## Por qué un archivo en vez de separar el archivo histórico

Las tareas archivadas permanecen deliberadamente en el mismo documento sincronizado. Los backends de archivos —WebDAV, carpetas y Dropbox— suben cada archivo de forma independiente. Separar los datos activos y archivados convertiría archivar o desarchivar en una transacción de dos archivos que podría aplicarse a medias y divergir entre dispositivos. Un documento se combina como una unidad atómica. La optimización futura de la carga será una sincronización incremental de registros sobre los metadatos de revisión actuales, no más archivos. Consulta [Algoritmo de sincronización](/es/data-sync/sync-algorithm) para conocer las reglas de combinación.

## Qué puedes esperar en la práctica

Tras años de uso normal, los datos suelen ocupar entre cientos de kilobytes y unos pocos megabytes, poco frente a la carpeta `attachments/` si adjuntas archivos o audio. Si la instantánea parece grande, vacía la Papelera, ejecuta la limpieza de adjuntos en **Ajustes → Datos** y revisa `attachments/` antes de preocuparte por el JSON.
