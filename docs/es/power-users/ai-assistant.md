# Asistente de IA (BYOK)

Mindwtr incluye un asistente de IA opcional que ayuda a aclarar y dividir tareas y a revisar elementos antiguos. Está **desactivado de forma predeterminada** y usa un modelo de **clave propia (BYOK)**.

## Modelo de privacidad

- **Local-first:** tus datos permanecen en tu dispositivo.
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
- **Proveedores alojados compatibles con OpenAI:** por ejemplo, GLM u otros que expongan un endpoint compatible.

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

Solo disponibles en Bandeja de entrada y Foco.

Mientras escribes, Mindwtr puede sugerir:

- contextos;
- etiquetas;
- estimaciones de tiempo.

Copilot nunca aplica cambios sin tu aprobación.

### Conversión de voz a texto

Transcribe notas de voz como tareas.

- **Sin conexión (Whisper):** descarga un modelo —unos 75 MB para Tiny o 150 MB para Base— y transcribe totalmente sin conexión.
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
