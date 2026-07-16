# Importar datos desde otras aplicaciones

Esta guía explica cómo trasladar tareas a Mindwtr desde otro gestor. Está pensada para migraciones completas, no para capturas rápidas puntuales.

## Antes de importar

Una migración es un buen momento para dejar atrás el contenido obsoleto. Si tu aplicación anterior contiene cientos de tareas antiguas, considera trasladar solo tus proyectos actuales, próximas acciones activas y elementos de referencia fiables.

Mindwtr puede importar exportaciones completas de las aplicaciones compatibles, pero una migración más pequeña y deliberada suele encajar mejor con GTD que copiar todas las tareas antiguas a un sistema nuevo.

## Importadores disponibles

Mindwtr ofrece importadores específicos para un pequeño grupo de aplicaciones cuyos formatos de exportación son lo bastante estructurados como para adaptarlos con seguridad:

- [Importar desde TickTick](/es/import/ticktick): copias CSV o ZIP de TickTick.
- [Importar desde Todoist](/es/import/todoist): exportaciones CSV o copias ZIP.
- [Importar desde DGT GTD](/es/import/dgt-gtd): exportaciones JSON o copias ZIP.
- [Importar desde OmniFocus](/es/import/omnifocus): exportaciones CSV, JSON o ZIP.
- [Importar Recordatorios de Apple](/es/data-sync/#importacion-de-recordatorios-de-apple-ios): importación exclusiva de iOS para recordatorios incompletos de una lista seleccionada.

Abre **Ajustes → Datos** y elige la acción de importación correspondiente. Mindwtr muestra una vista previa antes de añadir nada.

Los importadores nativos son la mejor opción cuando aparece tu aplicación. Conservan más estructura que el texto sin formato y procesan detalles específicos como carpetas, listas, etiquetas, fechas, listas de comprobación y recurrencias, cuando la exportación de origen los incluye.

## Métodos de migración alternativos

Si tu aplicación no aparece, usa una de las alternativas siguientes. Son deliberadamente más sencillas que los importadores nativos y resultan útiles para las muchas aplicaciones que exportan texto sin formato, CSV o JSON.

### Copiar y pegar

La alternativa más rápida es copiar una lista de tareas y pegarla en Adición rápida o Captura rápida.

Escritorio:

1. Abre Adición rápida.
2. Pega varias líneas en el campo de tareas.
3. Confirma **Crear tareas**.

Dispositivo móvil:

1. Abre Captura rápida.
2. Pega varias líneas en el campo de tareas.
3. Toca Guardar y confirma la creación en bloque.

Cada línea que no esté vacía se convierte en una tarea. Se analiza con la sintaxis de adición rápida de Mindwtr, por lo que puedes incluir metadatos en la propia línea:

```text
Email Bob about Q3 report +Work @computer #followup /due:friday
Book dentist appointment @phone
Outline conference talk +Speaking #ideas /note:Draft the rough structure first
```

Este método no reconstruye jerarquías profundas ni recurrencias, pero a menudo es la forma más limpia de trasladar las tareas que todavía importan.

### Texto sin formato

Si tu aplicación anterior puede exportar un archivo `.txt`, usa la importación de texto de Mindwtr desde la interfaz de captura.

Escritorio:

1. Abre Adición rápida.
2. Haz clic en **Importar .txt**.
3. Elige un archivo de texto sin formato.
4. Confirma la creación en bloque.

Dispositivo móvil:

1. Abre Captura rápida.
2. Toca **Más**.
3. Toca **Importar .txt**.
4. Elige un archivo de texto sin formato.
5. Confirma la creación en bloque.

Escribe una tarea por línea. Añade tokens de adición rápida en la misma línea cuando quieras que Mindwtr establezca metadatos durante la importación:

```text
Pay water bill +Home /due:2026-07-01
Renew passport +Personal @errands #admin
Send slides to Ana +Work /note:Use the final deck from the shared folder
```

Mindwtr usa órdenes explícitas de adición rápida como `/note:` en vez de un formato oculto de notas separadas por tabulaciones. Así, el archivo se puede leer antes de importarlo y usa el mismo analizador que la captura normal.

### Script para convertir CSV en texto de adición rápida

Para aplicaciones que exportan CSV pero no tienen un importador nativo en Mindwtr, convierte el CSV en un archivo de texto de adición rápida e importa después ese archivo `.txt`.

Mindwtr incluye un pequeño script auxiliar sin dependencias:

```bash
node scripts/migration/csv-to-quickadd-text.mjs export.csv \
  --output mindwtr-import.txt \
  --title "Title" \
  --project "Project" \
  --tags "Tags" \
  --contexts "Contexts" \
  --due "Due" \
  --note "Note"
```

El script escribe una línea de adición rápida por cada fila del CSV. Puede asignar:

- una columna de título al título de la tarea;
- una columna de proyecto o lista a `+Project`;
- etiquetas separadas por comas o punto y coma a `#tag`;
- contextos separados por comas o punto y coma a `@context`;
- una columna de fecha límite a `/due:...`;
- una columna de nota a `/note:...`.

Si tu CSV usa otros nombres de columna, pásalos mediante las opciones anteriores. Por ejemplo:

```bash
node scripts/migration/csv-to-quickadd-text.mjs tasks.csv \
  --output mindwtr-import.txt \
  --title "Task" \
  --project "List" \
  --tags "Categories" \
  --due "Due Date" \
  --note "Notes"
```

Este script es un punto de partida, no un importador específico compatible oficialmente. No conservará tareas anidadas, adjuntos, recurrencias ni campos propios de una aplicación a menos que lo adaptes.

### CLI, API local y MCP

Quienes tengan conocimientos técnicos pueden crear su propio importador sobre las superficies de automatización de Mindwtr:

- [API local](/es/power-users/local-api)
- [Servidor MCP](/es/power-users/mcp)
- `bun run mindwtr:cli -- --help` desde el repositorio.

Usa esta vía cuando tu aplicación anterior exporte JSON o CSV estructurado y necesites más control del que ofrece el texto sin formato. Estas herramientas pasan por el modelo de datos normal de Mindwtr, pero los scripts de migración personalizados son responsabilidad de quien los usa.

## Si tu aplicación no aparece

Sigue este orden:

1. Comprueba si tu aplicación exporta a un formato que Mindwtr ya importe.
2. Prueba a copiar y pegar o usa texto sin formato para las tareas activas que aún necesites.
3. Usa el script auxiliar para CSV si tu aplicación exporta una hoja de cálculo sencilla.
4. Usa la API local, la CLI o MCP si necesitas una migración estructurada personalizada.

Si quieres un importador nativo para una aplicación concreta, abre una conversación o incidencia en GitHub e incluye:

- el nombre de la aplicación;
- el formato de exportación que ofrece;
- una muestra pequeña y anonimizada;
- los campos que más te importa conservar.

Los importadores nativos se priorizan según la demanda y la claridad con la que el formato de origen se pueda adaptar al modelo GTD de Mindwtr.
