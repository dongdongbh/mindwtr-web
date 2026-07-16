# Guía de rendimiento

Esta página documenta patrones prácticos de rendimiento para Mindwtr (escritorio, móvil y núcleo).

## Áreas de gran impacto

- Filtrado y ordenación de listas grandes
- Actualizaciones del orden de proyectos y tareas
- Fusión de sincronización y conciliación de adjuntos
- Reprocesamientos provocados por suscripciones amplias al almacén
- Patrones de consulta de SQLite (búsqueda, filtros de fecha, vistas de proyecto y estado)

## Directrices para el renderizado de la interfaz

1. Usa preferentemente selectores específicos del almacén y evita seleccionar objetos completos del almacén.
2. Agrupa los selectores relacionados y memoriza las colecciones derivadas.
3. Mantén puros los componentes de elementos; traslada las transformaciones costosas a la memorización en el nivel de la lista.
4. Usa virtualización para las listas grandes y evita volver a calcular alturas dinámicas en rutas críticas.
5. Evita crear nuevas retrollamadas u objetos en línea dentro de listas grandes generadas mediante correspondencia.

Las filas de las listas de escritorio dependen actualmente del renderizado memorizado de `TaskItem`, por lo que las propiedades de las filas de tareas deben permanecer estables al cambiar las vistas de lista, proyecto, agenda, calendario o revisión. Si una vista necesita metadatos adicionales por fila, calcúlalos una sola vez en el nivel de la lista en lugar de crear objetos nuevos durante el renderizado de cada fila.

### Guía práctica para optimizar el renderizado

Cuando una pantalla parezca lenta, sigue este orden:

1. Comprueba primero el número de renderizados de los elementos de la lista (perfilador de React DevTools).
2. Extrae las constantes y los estilos estáticos de las funciones de renderizado.
3. Memoriza los componentes secundarios pesados (`React.memo`) con una comparación explícita de propiedades cuando sea necesario.
4. Divide los componentes grandes por responsabilidad (encabezado/formulario/lista/modales) para que las actualizaciones de estado permanezcan localizadas.
5. Sustituye las matrices de dependencias amplias por selectores o funciones auxiliares memorizados más pequeños.

### Virtualización de la lista de proyectos en escritorio
- Usa `@tanstack/react-virtual` para listas grandes de tareas en escritorio que compartan el contenedor de desplazamiento del espacio de trabajo principal.
- Usa claves de fila basadas en el ID de la tarea; nunca uses índices para filas de tareas que se puedan editar, seleccionar, mover o reordenar.
- Mide las filas virtuales cuando la altura de la tarjeta de tarea pueda cambiar y usa una estimación de fila prudente para que el desplazamiento no dé saltos.
- Conserva la semántica de arrastrar y reordenar virtualizando el componente existente de fila ordenable en lugar de sustituirlo por otra interfaz de fila.
- Evita contenedores de desplazamiento anidados dentro de las secciones del proyecto. Si hay una lista virtual debajo de los metadatos del proyecto o del encabezado de una sección, ten en cuenta el desplazamiento de la lista mediante el margen de desplazamiento.
- Añade pruebas con límites para el número de renderizados a fin de detectar regresiones en listas grandes. Una prueba debe demostrar que el número de filas montadas permanece próximo al de la ventana visible más el búfer adicional, y no al número total de tareas.

### Ajuste de FlatList y la virtualización (móvil)

- Define `initialNumToRender`, `maxToRenderPerBatch` y `windowSize` de forma intencionada para cada pantalla.
- Proporciona `getItemLayout` cuando resulte práctico (fijo o con una alternativa medida).
- Habilita `removeClippedSubviews` para las listas más grandes.
- Mantén estable `keyExtractor` y evita las claves basadas en índices.
- Evita renderizadores anónimos en línea en árboles de elementos profundamente anidados.

Mantén las pantallas habituales de tareas en `FlatList`. Para las listas de tareas insertadas dentro de un `ScrollView` existente, usa una porción manual de la ventana visible con filas espaciadoras en lugar de anidar otra lista virtual vertical, de modo que los gestos de deslizamiento, actualización mediante arrastre, teclado y arrastrar y soltar conserven un único controlador de desplazamiento.
Regla específica del calendario: virtualiza los conjuntos de resultados no acotados, no la estructura fija del calendario. La vista Agenda de la aplicación móvil puede crecer con cada tarea o evento visible y debe mantenerse en `FlatList`; las cronologías de día y semana están acotadas por la cuadrícula de horas visible y las celdas de mes están acotadas por las semanas del calendario, por lo que `ScrollView` es aceptable en esos casos siempre que las filas de tareas y eventos se filtren previamente fuera del bucle de renderizado.

## Directrices de rendimiento de la sincronización

1. Valida la forma de la carga útil antes de la fusión para fallar cuanto antes.
2. Mantén una fusión determinista y O(n) respecto al número de entidades (usa un mapa por ID y evita exploraciones anidadas).
3. Concilia primero los metadatos de adjuntos; pospón la E/S de archivos y de red a una fase de sincronización separada.
4. Limita los reintentos con espera progresiva y clasifica los errores como reintentables o terminales.
5. Almacena en caché las lecturas de configuración del backend durante un ciclo de sincronización para reducir los accesos repetidos al almacenamiento.

El motor de sincronización mantiene búsquedas indexadas de conflictos y revisiones durante la fusión. Al añadir nuevos tipos de entidades sincronizadas o informes de conflictos, conserva esa estructura indexada en lugar de volver a introducir exploraciones de colecciones completas para cada entidad.

### Consejos para ajustar la sincronización

1. Mantén prudente la concurrencia de carga y descarga de adjuntos en redes móviles.
2. Ajusta por separado los tiempos de espera y las ventanas de reintento para los metadatos y los adjuntos.
3. Cancela rápidamente al pasar al estado sin conexión; evita cadenas largas de reintentos después de perder la conectividad.
4. Usa instrumentación de progreso para las fases de adjuntos de larga duración.
5. Registra el número de conflictos, el desfase máximo del reloj y los ajustes de las marcas de tiempo de cada ejecución de sincronización.
6. Trata las muestras de conflictos de sincronización como diagnósticos acotados. Mantén pequeños el número de muestras y los límites de claves diferentes para que los informes de conflictos no dominen las fusiones grandes.

### Lista de comprobación para depurar la sincronización

Si la latencia de sincronización empeora:

1. Compara por separado las fases de lectura local, fusión, escritura remota y adjuntos.
2. Comprueba que las respuestas de límite de frecuencia (`429`) no estén provocando reintentos en cascada.
3. Comprueba si la validación de los hashes de adjuntos y sus reintentos presentan fallos repetidos.
4. Confirma que el tamaño de la carga útil remota y el número de elementos de las colecciones estén dentro de los límites configurados.
5. Captura muestras del registro con marcas de tiempo e ID de solicitud alrededor de los periodos lentos.

## Creación de perfiles de recorridos críticos en modo de publicación

Crea perfiles de compilaciones reales de publicación o de perfil antes de realizar cambios amplios de rendimiento. Las compilaciones de desarrollo y los ejecutores de pruebas son útiles para establecer protecciones, pero pueden ocultar la capa realmente dominante: derivación de datos, renderizado y confirmación de React, virtualización, persistencia o trabajo del hilo nativo o de la interfaz.

### Presupuestos para recorridos críticos

Usa estos valores como presupuestos de triaje, no como garantías estrictas del producto. Registra p50 y p95 cuando sea posible y conserva la forma de los datos junto a cada resultado.

| Recorrido | Presupuesto de publicación en Android | Presupuesto de publicación en escritorio | Señal principal |
| --- | ---: | ---: | --- |
| La captura rápida se abre y acepta la primera pulsación | <= 500 ms para abrir, <= 100 ms de latencia de entrada | <= 300 ms para abrir, <= 100 ms de latencia de entrada | Tiempo desde el comando o toque hasta la entrada editable y el primer carácter aceptado |
| Completar o alternar una tarea | <= 150 ms de respuesta visual, <= 500 ms para poner el guardado en cola | <= 100 ms de respuesta visual, <= 300 ms para poner el guardado en cola | Tiempo desde la entrada hasta la actualización visual más la fase de persistencia |
| Abrir, guardar y cerrar la edición de una tarea | <= 300 ms para abrir, <= 300 ms para guardar y cerrar | <= 200 ms para abrir, <= 200 ms para guardar y cerrar | Tiempo de confirmación del modal o panel y volcado del guardado |
| Abrir un proyecto con más de 100 tareas | <= 2,000 ms | <= 1,000 ms | Desde la navegación hasta una lista de tareas interactiva |
| Abrir o cerrar un selector mientras Enfoque, Bandeja de entrada o Proyectos está montado | <= 200 ms | <= 150 ms | Transición del selector y nuevo cálculo de la vista superior |
| Cambiar entre las vistas Enfoque, Bandeja de entrada y Proyectos | <= 500 ms | <= 300 ms | Desde el cambio de ruta o vista hasta el estado interactivo |
| Buscar mientras se escribe | <= 150 ms p95 por pulsación | <= 100 ms p95 por pulsación | Desde la pulsación hasta la actualización de los resultados visibles |

### Matriz de captura

Mantén las capturas adjuntas al problema o al problema de seguimiento. Cada captura debe indicar el commit, la versión de la aplicación, el canal de instalación, el dispositivo, el sistema operativo, la forma de los datos, el recorrido y el enlace al artefacto.

| Plataforma | Compilación necesaria | Herramientas | Artefacto de captura | Capa dominante que se debe registrar |
| --- | --- | --- | --- | --- |
| Android | APK/AAB de publicación o de perfil con datos locales representativos | Perfilador de Android Studio, muestreo de Hermes o Flipper cuando esté disponible | Traza de CPU o perfil de Hermes, más grabación de pantalla o marcas de tiempo | Derivación en JavaScript, renderizado y confirmación de React, virtualización de listas, SQLite y persistencia, hilo nativo o de la interfaz |
| Escritorio | Compilación de publicación de Tauri con datos locales representativos | Perfilador de rendimiento de DevTools de la vista web y registro de diagnóstico de la aplicación | Traza de rendimiento más marcas de tiempo de diagnóstico | Derivación de datos, renderizado y confirmación de React, virtualización web, SQLite y persistencia, vista web o contenedor nativo |

### Plantilla de notas de captura

```markdown
Commit:
Version/channel:
Platform/device/OS:
Dataset:
- tasks:
- projects:
- largest project task count:
- contexts/tags:
Journey:
Tool/artifact:
Observed p50/p95:
Dominant layer:
Notes:
Follow-up issue:
```

### Clasificación por capas

- Derivación de datos: el perfil muestra exploraciones repetidas de todo el almacén, ordenación o filtrado, agregación de recuentos o actividad excesiva de selectores antes de que comience el renderizado. Es preferible usar selectores limitados a la consulta e índices derivados. Regístralo en #647.
- Renderizado y confirmación de React: el perfil muestra un tiempo de confirmación prolongado, renderizados repetidos de filas, propiedades inestables o suscripciones amplias. Memoriza las filas y limita las suscripciones antes de cambiar los modelos de datos.
- Virtualización: el perfil muestra miles de componentes de fila montados para una lista visible. Usa los virtualizadores de la plataforma y pruebas con límites para el número de renderizados. Regístralo en #648.
- Persistencia: los bloqueos de la interfaz coinciden con volcados de guardado, trabajo de SQLite, importación o exportación, escrituras de sincronización o serialización JSON. Separa las actualizaciones visuales urgentes del trabajo de almacenamiento.
- Hilo nativo o de la interfaz: la traza de Android o de la vista web de escritorio muestra bloqueos de animación, diseño o entrada fuera de JavaScript. Reduce la actividad del diseño, el desplazamiento anidado o el tráfico del puente nativo.

Para la ralentización al abrir proyectos informada en #643, recopila primero capturas de Android y escritorio. Si domina la derivación, usa #647. Si domina el número de filas montadas, usa #648. Si dominan la persistencia o los bloqueos del hilo nativo o de la interfaz, abre un seguimiento más pequeño con el artefacto de captura y el recorrido exacto.

## Directrices para la base de datos

1. Usa índices FTS para búsquedas de texto libre cuando estén disponibles.
2. Mantén indexados los filtros habituales de estado, proyecto y fecha.
3. Agrupa las escrituras en transacciones para las rutas de guardado de importaciones y sincronizaciones grandes.
4. Mantén normalizadas las columnas JSON en los límites de lectura y evita ciclos repetidos de análisis y serialización.

## Lista de comprobación para la creación de perfiles

1. Reproduce el problema con un conjunto de datos realista (miles de tareas, proyectos grandes).
2. Mide antes y después (número de renderizados, tiempos de consulta, duración de la sincronización).
3. Comprueba el crecimiento de la memoria durante las sesiones largas.
4. Comprueba que no haya regresiones en dispositivos o simuladores de gama baja.

## Sugerencias de presupuesto de rendimiento

- Las interacciones con listas deben seguir respondiendo con fluidez (presupuesto de <16 ms por fotograma cuando sea viable).
- Las solicitudes de búsqueda deben tardar menos de 100 ms en conjuntos de datos locales habituales.
- La fusión de sincronización debe escalar linealmente con el número de entidades.
- Evita bloquear los hilos de la interfaz con operaciones de archivos o de red.

## Mantenimiento continuo del rendimiento

1. Añade pruebas específicas al corregir regresiones (actividad de renderizado, complejidad de fusión, comportamiento de reintentos).
2. Mantén comprobaciones de presupuesto en la integración continua para las vistas y rutas de sincronización críticas.
3. Es preferible realizar mejoras pequeñas y medibles en lugar de refactorizaciones amplias y especulativas.
4. Vuelve a crear perfiles después de cada optimización para comprobar su efecto real.

## Documentación relacionada

- [Arquitectura](/es/developers/architecture)
- [API principal](/es/developers/core-api)
- [Datos y sincronización](/es/data-sync/)
- [Diagnóstico y registros](/es/data-sync/diagnostics-logs)
