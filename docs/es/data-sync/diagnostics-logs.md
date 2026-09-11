# Diagnóstico y registros

Mindwtr incluye registros de diagnóstico para ayudar a resolver problemas de sincronización y cierres inesperados. Los registros son **solo locales** y los valores sensibles se **ocultan** antes de escribirlos.

---

## Grabar con datos de ejemplo

Elige **Ajustes → Datos → Abrir entorno de prueba** para probar Mindwtr con tareas y proyectos ficticios. Un aviso del entorno de prueba permanece visible, con acciones para reiniciar los datos de ejemplo o salir. En móviles muestra **Prueba**, **Reiniciar** y **Salir**.

La opción está junto a Diagnóstico. Antes de entrar, un diálogo explica el entorno de prueba. Elige **Cancelar** para seguir en tu espacio personal.

El espacio de ejemplo incluye tareas en distintos estados, áreas, proyectos y secciones, tareas recurrentes, listas de verificación, notas, etiquetas, contextos, personas y ejemplos de fechas y prioridades. Puedes editarlos mientras grabas. Los cambios son temporales; al restablecer se carga el conjunto original.

Los ejemplos están disponibles en inglés, alemán, francés, español, ruso y chino simplificado. Siguen el idioma de la aplicación; para otros idiomas se usa el inglés.

Tu base de datos personal se mantiene separada. Al salir vuelves a ella, y reiniciar la aplicación después de abrir el entorno de prueba también devuelve el espacio personal. Antes de entrar, la aplicación espera a que terminen la sincronización activa y las escrituras locales, y bloquea nuevos intentos de sincronización durante el cambio. Si se agota el tiempo de espera o falla un guardado, sigues en tu espacio personal. Sus cambios no se sincronizan ni actualizan widgets, reloj, recordatorios, calendarios externos o integraciones de captura.

Los datos de ejemplo pueden no reproducir un error relacionado con tus tareas, archivos adjuntos o historial de sincronización. Revisa la grabación antes de compartirla: el entorno de prueba no oculta notificaciones del sistema operativo ni otras aplicaciones.

---

## Activar el registro de depuración

### Escritorio

1. Abre **Ajustes → Datos**.
2. Activa **Registro de depuración**.
3. Reproduce el problema.

**Compilaciones de diagnóstico:** las herramientas de desarrollo y los registros adicionales solo están disponibles si la aplicación de escritorio se compiló con la función `diagnostics`.

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Dispositivos móviles

1. Abre **Ajustes → Datos**.
2. Activa **Registro de depuración**.
3. Reproduce el problema.

---

## Compartir o borrar registros

### Escritorio

- La ruta del archivo aparece en **Ajustes → Datos**.
- Puedes borrar los registros desde la misma pantalla.

### Dispositivos móviles

- Usa **Compartir registro** para exportar un archivo.
- Usa **Borrar registro** para eliminar entradas antiguas.

---

## Ubicaciones predeterminadas (escritorio)

| Plataforma | Archivo de registro |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| Windows (Microsoft Store) | `%LOCALAPPDATA%/Packages/<package>/LocalCache/Roaming/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## Qué se registra

- Errores y pasos de sincronización.
- Resúmenes de conflictos: las combinaciones que resolvieron conflictos siempre se escriben en `mindwtr.log`, aunque la depuración esté desactivada, para que las resoluciones puedan auditarse después. Estas entradas incluyen identificadores de registros, nombres de campos modificados y qué lado prevaleció; nunca escriben el contenido del registro, como títulos o notas.
- Errores inesperados durante la ejecución.

Los valores sensibles —claves de API, tokens, contraseñas y URL con credenciales— se ocultan automáticamente.

---

## Páginas relacionadas

- [Preguntas frecuentes](/es/start/faq)
- [Datos y sincronización](/es/data-sync/)
