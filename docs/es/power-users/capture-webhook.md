# Webhook de captura

El webhook de captura convierte una nota de voz o un texto corto en una tarea de la bandeja de entrada. Cualquier dispositivo, aplicación o script que pueda enviar una solicitud HTTP envía el texto, y opcionalmente una grabación de audio, a tu propio servidor en la nube. El servidor crea la tarea, adjunta la grabación y tus dispositivos reciben ambas cosas en la siguiente sincronización.

Esto necesita el [servidor en la nube autoalojado](/es/power-users/docker-deployment). Si usas Mindwtr sin servidor, captura desde el menú de compartir del teléfono o con Siri.

## El endpoint

```text
POST /v1/capture
```

Cada solicitud lleva el mismo token de portador que el resto de la API, en una cabecera `Authorization: Bearer <token>`. El cuerpo puede ser `multipart/form-data`, `application/json` con los mismos nombres de campo, o `text/plain`, donde todo el cuerpo es la transcripción. Los campos desconocidos se ignoran.

### Solo texto

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: text/plain" \
  --data "Call the dentist about the crown"
```

### Audio con una transcripción

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -F "transcription=Call the dentist about the crown" \
  -F "audio=@note.m4a" \
  -F "recordedAt=1756900000000" \
  -F "client=Pebble Index 01"
```

## Campos

| Campo | Qué hace |
| --- | --- |
| `transcription` | El texto capturado. La primera línea se convierte en el título de la tarea y el texto completo pasa a la descripción. `text` y `title` se aceptan como otros nombres del mismo campo. |
| `audio` | La grabación que se adjunta a la tarea. Se sincroniza con tus dispositivos como cualquier otro adjunto. |
| `recordedAt` | Cuándo se hizo la captura, en milisegundos desde la época o como marca de tiempo ISO 8601. Pasa a ser la hora de creación de la tarea cuando es válida y no está en el futuro. |
| `client` | Una etiqueta corta para el dispositivo o la aplicación que envió la captura. Se anota al final de la descripción como `Captured with <client>`. |

Envía al menos uno de los campos `transcription` y `audio`. La grabación puede ser m4a, mp4, aac, mp3, wav, ogg o webm.

## Respuestas

| Estado | Significado |
| --- | --- |
| `201` | La tarea se creó. El cuerpo de la respuesta es la tarea nueva. |
| `400` | No se envió ni transcripción ni archivo de audio. |
| `401` | Falta el token o es incorrecto. |
| `413` | El archivo de audio supera el límite de tamaño de adjuntos del servidor. |
| `415` | El tipo del archivo de audio no es compatible. |

## Pebble Index 01

La aplicación del Pebble Index 01 envía notas de voz exactamente en este formato y permite añadir tus propias cabeceras de solicitud. Por eso no hace falta código intermedio: solo rellenas dos ajustes.

1. Abre la aplicación de Pebble en el teléfono y ve a los ajustes de webhook para las notas de voz
2. Pon la URL del webhook en `https://your-server.example/v1/capture`, con la dirección de tu propio servidor en lugar del ejemplo
3. Añade una cabecera de solicitud llamada `Authorization` con el valor `Bearer <token>`, usando uno de los tokens de tu servidor
4. Graba una nota en el reloj. Llega a tu bandeja de entrada en la siguiente sincronización, con la transcripción como tarea y la grabación adjunta

## Otros dispositivos y automatizaciones

Nada de esto es exclusivo de Pebble. Cualquier cosa que pueda hacer un POST HTTP funciona igual:

- **Atajos de iOS y Apple Watch**: una acción *Obtener contenido de URL*, método POST, con la cabecera y un campo de texto. Consulta la receta [Capturar desde el Apple Watch](/es/power-users/apple-shortcuts#capturar-desde-el-apple-watch) en la página de Atajos de Apple
- **Aplicaciones de automatización de Android** como Tasker: una acción de solicitud HTTP con la misma URL y la misma cabecera
- **Home Assistant**: un `rest_command` que envía el texto de una automatización o de una respuesta del asistente de voz
- **Scripts de shell y tareas cron**: los comandos curl de arriba, con el token en una variable de entorno

## Páginas relacionadas

- [API de la nube](/es/developers/cloud-api)
- [Captura por correo electrónico](/es/power-users/email-capture)
- [Despliegue con Docker](/es/power-users/docker-deployment)
