# Asistente de IA (BYOK)

Mindwtr incluye un asistente de IA opcional que ayuda a aclarar y dividir tareas y a revisar elementos antiguos. Está **desactivado de forma predeterminada** y usa un modelo de **clave propia (BYOK)**.

## Modelo de privacidad

- **Almacenamiento local:** tu base de datos de tareas se guarda en tu dispositivo. Al utilizar un proveedor de IA opcional, el contenido necesario para la solicitud se envía al proveedor que elegiste.
- **Bajo demanda:** las solicitudes solo se envían cuando pulsas una acción de IA o activas las sugerencias de Copilot. Al abrir los ajustes de IA con una clave configurada también se consulta la lista de modelos actual de tu proveedor, para que el selector de modelos esté al día — esa solicitud no incluye datos de tareas.
- **Alcance limitado:** el asistente solo recibe los datos de la tarea que necesita.

## Proveedores compatibles

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Configúralo en **Ajustes → Asistente de IA** en escritorio o en **Menú → Ajustes → Avanzado → Asistente de IA** en móvil:

- activar o desactivar la IA;
- proveedor;
- modelo;
- URL base personalizada opcional compatible con OpenAI;
- clave de API, guardada solo localmente;
- esfuerzo de razonamiento o presupuesto de pensamiento, según el proveedor;
- opción **«Activar pensamiento»** para Claude/Gemini, que añade razonamiento extendido.

## Endpoints compatibles con OpenAI (locales o alojados)

Mindwtr puede comunicarse con cualquier servicio que exponga una **API Chat Completions compatible con OpenAI**, incluidos servidores locales y algunos proveedores alojados.

Usa esta configuración para:

- **OpenAI oficial:** deja vacía **URL base personalizada** y usa tu clave de OpenAI.
- **Servidores locales:** llama.cpp, Ollama, LM Studio, LocalAI, vLLM y similares.
- **Proveedores alojados compatibles con OpenAI:** por ejemplo, xAI (Grok), GLM u otros que expongan un endpoint compatible.

1. Si hace falta, inicia u obtén acceso a un endpoint compatible.
2. En **Ajustes → Asistente de IA** en escritorio o en **Menú → Ajustes → Avanzado → Asistente de IA** en móvil:
   - establece **Proveedor** en **OpenAI**;
   - indica en **Modelo** el nombre expuesto por el servicio;
   - establece **URL base personalizada** en la URL base del servicio;
   - introduce una **clave de API** si el servicio requiere autenticación al portador.
3. Deja vacía **URL base personalizada** únicamente para OpenAI oficial.
4. Deja vacía **Clave de API** únicamente si el endpoint personalizado admite solicitudes sin autenticar.

Mindwtr añade `/chat/completions` automáticamente. Usa la URL base del proveedor en vez de la ruta completa, salvo que el servicio exija esta última.

URL base habituales:

- **llama.cpp:** `http://localhost:8080/v1`
- **Ollama:** `http://localhost:11434/v1`
- **LM Studio:** `http://localhost:1234/v1`
- **LocalAI / vLLM:** `http://localhost:8080/v1`

Ejemplo para endpoints alojados al estilo GLM:

- **Proveedor:** `OpenAI`.
- **Modelo:** el identificador GLM expuesto, como `GLM-4.7`.
- **URL base personalizada:** la URL base compatible con OpenAI.
- **Clave de API:** la clave del proveedor, si la exige.

Ejemplo para xAI (Grok):

- **Proveedor:** `OpenAI`.
- **Modelo:** un identificador de modelo Grok de la lista de modelos de xAI, como `grok-4.6`.
- **URL base personalizada:** `https://api.x.ai/v1`.
- **Clave de API:** tu clave de API de xAI.

## Modelos lentos y tiempo de espera

Abre **Avanzado → Tiempo de espera** dentro de los ajustes del asistente de IA, tanto en escritorio como en móvil. Puedes elegir **30, 60, 120 o 300 segundos**; el valor predeterminado sigue siendo 30 segundos. Para un modelo local lento, prueba primero con 120 segundos.

El límite se aplica a las respuestas del asistente y de Copilot, no a la transcripción ni a la consulta de modelos. Las solicitudes canceladas o que agoten el tiempo no se reintentan automáticamente. Los errores temporales de red o del servidor pueden seguir teniendo un número limitado de reintentos. El tiempo de espera sigue tu preferencia actual de sincronización de los ajustes de IA.

### Respuestas más cortas de modelos locales

Un tiempo de espera mayor da más tiempo al modelo, pero no reduce lo que genera. Algunos modelos consumen tokens de razonamiento antes de producir la respuesta breve que ves.

Con **Proveedor → OpenAI**, abre **Parámetros adicionales de solicitud** en los ajustes del asistente de IA, pega un objeto JSON y guarda los parámetros. Mindwtr incorpora estos campos directamente a las solicitudes del asistente y de Copilot; no los envuelvas en `extra_body`. Mindwtr sigue controlando `model`, `messages` y `response_format`.

Para **llama.cpp con un modelo Qwen cuya plantilla de chat permita desactivar el razonamiento**, prueba este punto de partida:

```json
{
  "max_tokens": 512,
  "chat_template_kwargs": {
    "enable_thinking": false
  }
}
```

El parámetro anidado sigue la [documentación del servidor llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md). Otros servidores pueden necesitar otro campo o un ajuste del servidor; un `enable_thinking` en el nivel superior no es intercambiable con este objeto. Comprueba la versión del servidor y la plantilla del modelo.

- **512 es un límite inicial, no un objetivo.** Si la respuesta se corta o Mindwtr no puede interpretarla, prueba 1024 o elimina el límite. El análisis de revisión puede necesitar más espacio que la división de una tarea sencilla.
- **Cambia un ajuste cada vez.** Compara la misma tarea con el razonamiento desactivado y después ajusta el límite. Reducir `temperature` cambia el muestreo; no limita la longitud.
- **Si sigue agotándose el tiempo**, prueba un modelo más pequeño o 300 segundos. Borra los parámetros adicionales y guarda para volver a los valores predeterminados de Mindwtr.

[HeikoMarkgraf compartió una configuración funcional de Qwen3.5-4B en la discusión #1188](https://github.com/dongdongbh/Mindwtr/discussions/1188#discussioncomment-18448971), con unos 6,45 segundos para sugerencias y 37 segundos para dividir una tarea. Son resultados de la comunidad para esa configuración, no mediciones del ejemplo reducido anterior. La discusión conserva la configuración completa; algunos campos pueden ser específicos de ese servidor o ignorarse en otros.

## Funciones

### Aclarar

Convierte una tarea imprecisa en una próxima acción concreta y sugiere contextos o etiquetas.

### Dividir

Genera una breve lista de próximos pasos para tareas grandes. Tú eliges cuáles aplicar.

### Análisis de revisión

Durante la revisión semanal, puede señalar tareas estancadas y sugerir acciones como:

- mover a Algún día/Tal vez;
- archivar;
- dividir;
- conservar.

### Sugerencias de Copilot

Disponibles en el editor de tareas, en la fila de Adición rápida de las listas de escritorio y en la Captura rápida del móvil.

Mientras escribes, Mindwtr puede sugerir:

- contextos;
- etiquetas;
- estimaciones de tiempo.

Copilot nunca aplica cambios sin tu aprobación.

### Conversión de voz a texto

Transcribe notas de voz como tareas.

- **Sin conexión (Whisper):** descarga un modelo —unos 75 MB para Tiny o 150 MB para Base— y transcribe totalmente sin conexión.
  El modelo se descarga de Hugging Face (huggingface.co). Si ese servidor no responde, algo habitual en China continental, Mindwtr prueba después el espejo hf-mirror.com. En ambos casos el archivo se comprueba con su SHA-256 conocido antes de usarlo. Si los dos fallan, prueba otra red o usa un proveedor en la nube o autoalojado.
- **En la nube (OpenAI/Gemini):** usa tu clave para una transcripción de alta precisión.
- **Autoalojado (compatible con OpenAI):** configura una URL base personalizada en el proveedor de voz OpenAI para transcribir en tu propio servidor en lugar de api.openai.com. Sirve cualquier servidor que exponga `/v1/audio/transcriptions` de OpenAI (whisper.cpp, Speaches, LocalAI, vLLM); ahí la clave de API es opcional y el campo de modelo acepta el nombre de modelo de tu servidor.
- **Modos:**
  - **Análisis inteligente:** extrae fechas límite, proyectos y prioridades del habla natural, por ejemplo «Comprar leche mañana prioridad alta».
  - **Solo transcripción:** únicamente el texto.

#### Transcripción autoalojada

Configura el proveedor de voz en OpenAI y luego completa la URL base: la raíz de tu servidor, terminada en `/v1` (por ejemplo, `http://localhost:8000/v1`). Mindwtr envía la grabación a `/v1/audio/transcriptions` en esa dirección, igual que hace con OpenAI.

- Deja la clave de API vacía si tu servidor no la usa.
- El selector de modelos muestra lo que tu servidor informa en `/v1/models` cuando responde; si no, recurre a sugerencias. Siempre puedes escribir cualquier nombre de modelo — la lista no es un conjunto fijo.
- Un servidor de voz solo transcribe. **Análisis inteligente** necesita un modelo de lenguaje, así que sin un asistente de IA configurado, una captura se convierte en una tarea titulada con la transcripción, sin extraer de ella fechas, proyectos ni prioridades. Configura el asistente por separado si quieres eso.

## Notas

- La IA es **opcional**. Mindwtr funciona sin ella.
- Las respuestas se analizan como JSON estructurado; si falla el análisis, no se aplica ningún cambio.

## Códigos de idioma de Whisper

Si usas el modelo Whisper sin conexión, establece el código de idioma en **Ajustes → Asistente de IA → Idioma del audio** en escritorio o en **Menú → Ajustes → Avanzado → Asistente de IA → Idioma del audio** en móvil. Consulta la [lista de idiomas de Whisper](https://whisper-api.com/docs/languages/).

## Evaluaciones de modelos de Apple (solo compilaciones de desarrollo)

Apple Foundation Models aún no es un proveedor de IA en producción. El prototipo de desarrollo de iOS ofrece aclaración opcional de Inbox en el dispositivo, si es compatible. Las sugerencias siguen siendo editables y requieren aprobación explícita; un modelo no disponible no bloquea el procesamiento manual ni cambia silenciosamente a inferencia en la nube.

Un evaluador de Private Cloud Compute (PCC), activado por separado, compara ejemplos sintéticos fijos con el modelo local. No lee ni sube tus tareas, aplica sugerencias ni cambia ajustes sincronizados. Cada solicitud PCC requiere consentimiento explícito y puede usar la red y la cuota diaria de Apple; los errores no provocan reintentos automáticos locales ni en la nube.

La evaluación PCC requiere iOS 27 o posterior, un dispositivo compatible y una compilación de desarrollo firmada con el aprovisionamiento correcto. El acceso del equipo al entitlement no demuestra que una compilación pueda realizar solicitudes. El acceso en producción, la calidad y la validación en dispositivos físicos siguen pendientes. Consulta la [lista de evaluación para desarrolladores](https://github.com/dongdongbh/Mindwtr/blob/main/docs/development/apple-pcc-evaluation.md).
