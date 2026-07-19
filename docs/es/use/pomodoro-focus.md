# Foco Pomodoro

Mindwtr incluye un panel opcional con temporizador Pomodoro en la vista **Foco** de escritorio y móvil.

Esta función está **desactivada** de forma predeterminada para mantener Foco sencillo y sin distracciones.

---

## Activar Pomodoro

### Escritorio

1. Abre **Ajustes**.
2. Ve a **GTD**.
3. Activa **Temporizador Pomodoro** en **Funciones**.
4. Abre la vista **Foco**.

### Dispositivos móviles

1. Abre **Menú → Ajustes**.
2. Ve a **GTD**.
3. Activa **Temporizador Pomodoro** en **Funciones**.
4. Abre la pestaña **Foco**.

---

## Cómo funciona

- Elige de forma opcional una **Tarea del temporizador** entre las candidatas actuales de Foco, o déjalo en **Solo temporizador**.
- Elige un preajuste: `15/3`, `25/5`, `50/10` o un preajuste personalizado opcional en **Ajustes → GTD**.
- Inicia la sesión de concentración.
- Al terminar, Mindwtr cambia a descanso y se pausa para que lo inicies de forma deliberada.
- Cuando termina el descanso, vuelve a la fase de concentración.

La vinculación con tareas es opcional y está desactivada de forma predeterminada. Activa **Ajustes → GTD → Temporizador Pomodoro → Vincular temporizador a tarea** si quieres ver el selector Tarea del temporizador y la acción **Marcar tarea como terminada** en Foco.

En escritorio, el panel se puede plegar: el chevrón de su cabecera lo reduce a una fila fina con el tiempo restante y la fase, mientras el temporizador sigue funcionando. El estado plegado se recuerda y al pulsar el botón de reproducción de una tarea se vuelve a abrir.

Controles:

- **Temporizador**: iniciar/pausar, restablecer y cambiar de fase.
- **Actualizar tarea**: marcar la tarea como terminada, lo que completa la Tarea del temporizador seleccionada.

El selector controla a qué tarea se vincula el panel, si existe alguna. Los controles del temporizador solo afectan al temporizador. **Marcar tarea como terminada** solo está disponible si hay una tarea vinculada y mueve esa tarea a Terminadas, además de quitarla del foco de hoy.

## Tiempo empleado

Las tareas tienen un valor opcional **Tiempo empleado** junto a Tiempo estimado en el editor. Requiere v1.1.0 o posterior; las versiones anteriores, como v1.0.5, no lo incluyen.

Tiempo empleado es opcional y está oculto de forma predeterminada. Sus superficies solo aparecen cuando están activados tanto **Temporizador Pomodoro** como **Vincular temporizador a tarea**: el campo del editor y el distintivo de la fila en escritorio y móvil, además del botón de inicio rápido en escritorio. Al desactivarlos no se muestra nada relacionado con el tiempo; los valores registrados se conservan y reaparecen si vuelves a activar la función. Ocultar Tiempo estimado en el diseño del editor también oculta Tiempo empleado.

- Cada sesión de concentración completada con una tarea vinculada añade sus minutos al total de esa tarea.
- También puedes establecer o corregir el total manualmente en el editor.
- Las tareas con tiempo registrado muestran un pequeño distintivo en las listas de escritorio y móvil, y el total se sincroniza entre dispositivos como cualquier otro campo.

Por diseño no existe un registro por sesión, una pantalla de informes ni un cronómetro libre. El total es un único número por tarea. Para informes externos, lee `timeSpentMinutes` mediante la API de la nube o el servidor MCP.

## Iniciar una sesión desde una tarea (escritorio)

Cuando están activados Pomodoro y **Vincular temporizador a tarea**, al pasar el puntero sobre una fila aparece un botón de reproducción:

- Púlsalo para vincular esa tarea e iniciar inmediatamente una sesión, sin buscarla en el desplegable.
- El botón también muestra cuántas sesiones de concentración has completado en esa tarea.

---

## Foco frente a Próximas acciones

La vista **Foco** no es una copia exacta de Próximas acciones. Es un panel para actuar:

- **Foco de hoy**: tareas que marcaste explícitamente para hoy, hasta el límite configurado.
- **Hoy**: próximas tareas que vencen hoy, están atrasadas o comienzan hoy.
- **Próximas acciones**: tareas próximas disponibles actualmente.
- **Revisión pendiente**: elementos En espera o de seguimiento que requieren atención.

Foco oculta deliberadamente las tareas con fecha de inicio futura y las tareas posteriores de proyectos secuenciales. Así solo muestra trabajo que puedes realizar ahora. Usa **Contextos**, **Proyectos** o **Buscar** para inspeccionar un inventario más amplio, incluidas las tareas de inicio futuro.

---

## Cuándo usarlo

- Úsalo si quieres un temporizador ligero sin salir del flujo GTD actual de Foco.
- Déjalo desactivado si prefieres que Foco sea estrictamente una lista sin interfaz de temporizador.
- Trátalo como una ayuda para realizar la próxima acción, no como otro sistema de planificación.

## Patrones prácticos

- Usa `15/3` para limpiar la bandeja de entrada, pequeñas labores administrativas o superar un bloqueo.
- Usa `25/5` como ritmo diario predeterminado para próximas acciones normales.
- Usa `50/10` para trabajo profundo en proyectos cuando la tarea ya esté lo bastante clara como para empezar.
- Usa un preajuste personalizado si necesitas otro ritmo, pero mantenlo sencillo.
- Usa **Marcar tarea como terminada** solo cuando hayas acabado realmente la tarea vinculada; en caso contrario, pausa o cambia de fase y conserva la tarea activa.

---

## Notas

- Pomodoro puede funcionar como temporizador independiente o vincularse a una tarea para completarla desde el panel.
- El panel es opcional para que quienes prefieran una página Foco limpia puedan mantenerlo oculto.
- Los preajustes integrados son fijos y sencillos. Mindwtr solo añade un preajuste personalizado opcional para evitar que Foco se convierta en una pantalla de configuración de temporizadores.
