# Asistente de IA (BYOK)

Mindwtr incluye un asistente de IA opcional que ayuda a aclarar y dividir tareas y a revisar elementos antiguos. Está **desactivado de forma predeterminada** y usa un modelo de **clave propia (BYOK)**.

## Modelo de privacidad

- **Local-first:** tus datos permanecen en tu dispositivo.
- **Bajo demanda:** las solicitudes solo se envían cuando pulsas una acción de IA o activas las sugerencias de Copilot.
- **Alcance limitado:** el asistente solo recibe los datos de la tarea que necesita.

## Proveedores compatibles

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Configúralo en **Ajustes → Asistente de IA**:

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
2. En **Ajustes → Asistente de IA**:
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
- **Modos:**
  - **Análisis inteligente:** extrae fechas límite, proyectos y prioridades del habla natural, por ejemplo «Comprar leche mañana prioridad alta».
  - **Solo transcripción:** únicamente el texto.

## Notas

- La IA es **opcional**. Mindwtr funciona sin ella.
- Las respuestas se analizan como JSON estructurado; si falla el análisis, no se aplica ningún cambio.

## Códigos de idioma de Whisper

Si usas el modelo Whisper sin conexión, puedes establecer un código de idioma en Ajustes → Asistente de IA → Idioma del audio. Consulta la [lista de idiomas de Whisper](https://whisper-api.com/docs/languages/).
