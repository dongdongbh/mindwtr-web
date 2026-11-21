# Importar desde Microsoft To Do

> Este importador llegará en la próxima versión de Mindwtr para escritorio después de la 1.3.9.

Mindwtr para escritorio importa tareas desde un archivo CSV exportado de la carpeta **Tareas** de Outlook clásico para Windows. Las tareas de Microsoft To Do almacenadas en Exchange Online se sincronizan con Tareas de Outlook. [Sincronización de Microsoft To Do](https://support.microsoft.com/en-us/todo/syncing-your-microsoft-to-do-account)

## Exportar las tareas a un archivo CSV

1. Abre Outlook clásico para Windows e inicia sesión con la cuenta que usas en Microsoft To Do.
2. Abre **Archivo → Abrir y exportar → Importar o exportar**.
3. Selecciona **Exportar a un archivo** y después **Valores separados por comas**.
4. Selecciona la carpeta **Tareas** de tu cuenta. Comprueba que contiene las tareas que quieres trasladar.
5. Elige un nombre y una ubicación para el archivo CSV y selecciona **Finalizar**. Ponle al CSV el nombre del proyecto que quieres crear en Mindwtr. Usa un nombre de archivo distinto para cada carpeta de Outlook que exportes.

Si usas el nuevo Outlook, abre Outlook clásico para hacer esta exportación. El asistente solo puede exportar tareas de las carpetas que muestra. Si faltan tareas en el asistente, comprueba que has añadido la misma cuenta a Outlook clásico y que aparecen en la vista Tareas. [Cambiar entre versiones de Outlook](https://support.microsoft.com/en-us/outlook/getstarted/run-new-outlook-and-classic-outlook-side-by-side) · [Pasos de exportación en Microsoft Q&A](https://learn.microsoft.com/en-ca/answers/questions/5687598/how-can-i-export-my-microsoft-to-do-list-data-and)

Mindwtr reconoce encabezados de columna en inglés y chino simplificado. Si el archivo usa otro idioma, cambia el idioma de visualización de Office a inglés y vuelve a exportar. Si el CSV usa una codificación antigua de Windows, ábrelo en una aplicación de hojas de cálculo y guarda una copia como CSV UTF-8. [Cambiar el idioma de visualización de Office](https://support.microsoft.com/en-us/office/languages/change-the-language-office-uses-in-its-menus-and-proofing-tools)

## Revisar la vista previa e importar

1. En Mindwtr para escritorio, abre **Ajustes → Datos → Importar datos → Importar desde Microsoft To Do**.
2. Elige el archivo CSV de tareas de Outlook.
3. Revisa el número de tareas y los avisos en la vista previa. Después, confirma la importación.

Después de importar, compara algunas tareas con las originales. Si el resultado no es correcto, selecciona **Deshacer** en el mensaje de resultado. [Copia de seguridad y restauración](/es/data-sync/backup-restore)

## Qué datos se trasladan a Mindwtr

Mindwtr importa los títulos, las notas, las categorías como etiquetas, las prioridades, el estado y las fechas de inicio, vencimiento y finalización cuando Outlook incluye esos datos. Revisa la vista previa para detectar fechas que Mindwtr no pudo interpretar. Conserva las listas originales para consultar las repeticiones, los recordatorios, los adjuntos y la organización de las listas.

Cada CSV se importa en un proyecto con el nombre del archivo. La importación crea una copia puntual. Si vuelves a importar con el mismo nombre de archivo, Mindwtr omite las tareas ya importadas que sigan iguales. Un nombre nuevo o cambios en una tarea pueden generar duplicados.
