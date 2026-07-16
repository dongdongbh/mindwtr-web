# Integraciones para usuarios avanzados

Mindwtr se conecta con las herramientas de tu entorno sin abandonar el modelo local-first. Esta página agrupa las integraciones según lo que quieras hacer. Cuatro preguntas indican cuánta confianza exige cada una:

- **Qué puede leer** de tus datos.
- **Qué puede cambiar**.
- **Dónde se ejecuta**.
- **Qué sale de tu dispositivo**.

Todas son opcionales y permanecen desactivadas hasta que las configuras. Cada página enlazada contiene las instrucciones completas.

## Capturar desde cualquier lugar

### Atajos de Apple

Envía tareas a la Bandeja de entrada desde Siri, Atajos, el botón Acción o una automatización, y abre directamente una lista GTD.

| Pregunta | Respuesta |
| --- | --- |
| Qué puede leer | Nada. Solo captura tareas y abre listas. |
| Qué puede cambiar | Añade capturas a la Bandeja de entrada. No puede editar, completar ni eliminar tareas. |
| Dónde se ejecuta | En tu iPhone o iPad. |
| Qué sale del dispositivo | Nada. Las capturas pasan por el almacenamiento y la sincronización normales; Swift nunca escribe tareas directamente. |

[Guía de Atajos de Apple](/es/power-users/apple-shortcuts)

### Captura por correo electrónico

Indica a la aplicación de escritorio una carpeta de correo y cada mensaje que llegue se convertirá en una tarea de la Bandeja de entrada. En el teléfono, comparte el correo con Mindwtr.

| Pregunta | Respuesta |
| --- | --- |
| Qué puede leer | Solo la carpeta indicada; no toca el resto del buzón. |
| Qué puede cambiar | Crea tareas en la Bandeja de entrada. Nunca modifica, mueve ni elimina tu correo. |
| Dónde se ejecuta | En el escritorio, comunicándose por IMAP directamente con tu proveedor, sin intermediarios. |
| Qué sale del dispositivo | Nada hacia terceros. Las recetas autohospedadas solo envían los campos que asignes a tu propio servidor. |

[Guía de captura por correo](/es/power-users/email-capture)

## Conectar tus herramientas personales

### Obsidian

Lee tareas de una bóveda de Obsidian, actualízalas cuando cambien los archivos y abre en Obsidian la nota de origen.

| Pregunta | Respuesta |
| --- | --- |
| Qué puede leer | Los archivos de la bóveda en las carpetas permitidas, desde el escritorio. |
| Qué puede cambiar | Alterna una casilla o un estado TaskNotes en los formatos compatibles. No reescribe tus notas. |
| Dónde se ejecuta | Solo en escritorio. No es un backend de sincronización. |
| Qué sale del dispositivo | Nada. Las notas permanecen en tu bóveda. |

[Guía de Obsidian](/es/power-users/obsidian)

## Automatizar en tu equipo

### API local

Una API REST para scripts, atajos y pequeñas herramientas que deban leer y escribir tareas.

| Pregunta | Respuesta |
| --- | --- |
| Qué puede leer | Todos los datos de tareas y, en modo de solo lectura, proyectos y áreas. |
| Qué puede cambiar | Crear, actualizar, completar, archivar, eliminar de forma reversible y restaurar tareas. Proyectos y áreas son de solo lectura. |
| Dónde se ejecuta | Dentro de la aplicación de escritorio, vinculada a `127.0.0.1` y con un token al portador obligatorio. |
| Qué sale del dispositivo | Nada. Las solicitudes permanecen en localhost. |

[Guía de la API local](/es/power-users/local-api)

## Conectar un agente de IA

### Servidor MCP

Permite que clientes de IA como Claude, Codex o Gemini accedan a tus datos mediante Model Context Protocol.

| Pregunta | Respuesta |
| --- | --- |
| Qué puede leer | Tareas, proyectos, secciones, áreas y personas. |
| Qué puede cambiar | Solo lectura de forma predeterminada. Con `--write`, añadir, actualizar, completar y eliminar. |
| Dónde se ejecuta | Como subproceso local sobre tu archivo SQLite o contra un servidor Cloud autohospedado. |
| Qué sale del dispositivo | Solo lo que reciba el cliente conectado. En modo Cloud, las ediciones van a tu servidor mediante su API validada. |

[Guía del servidor MCP](/es/power-users/mcp)

## IA dentro de la aplicación

### Asistente de IA

Ayuda opcional con clave propia para aclarar y dividir tareas y revisar elementos antiguos.

| Pregunta | Respuesta |
| --- | --- |
| Qué puede leer | Solo los datos necesarios para la acción que ejecutas. |
| Qué puede cambiar | Únicamente lo que revises y apruebes. |
| Dónde se ejecuta | Mediante el proveedor que configures, que puede ser local, como llama.cpp u Ollama. |
| Qué sale del dispositivo | Solo los datos de alcance limitado enviados al proveedor elegido. Nada si se ejecuta localmente. |

[Guía del asistente de IA](/es/power-users/ai-assistant)

## Ejecutarlo personalmente

¿Prefieres acceder desde el navegador o alojarlo tú? Estas páginas tratan el despliegue:

- [Aplicación web (PWA)](/es/power-users/web-app-pwa)
- [Despliegue con Docker](/es/power-users/docker-deployment)
- [Nube autohospedada](/es/data-sync/self-hosted-cloud)
