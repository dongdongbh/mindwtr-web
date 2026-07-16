# Sincronización con iCloud

Mindwtr admite un backend nativo de sincronización con **iCloud / CloudKit** en los dispositivos Apple donde esté disponible el módulo nativo.

## Disponibilidad

- **iPhone / iPad:** compatible mediante el backend nativo `iCloud` en **Ajustes → Sincronizar**.
- **Android:** no compatible.
- **Windows / Linux:** no compatible.
- **Escritorio macOS:** compatible mediante el backend nativo `iCloud` en **Ajustes → Sincronizar**.

## Qué sincroniza

El backend nativo de iCloud sincroniza los mismos datos GTD principales que los demás backends estructurados:

- tareas;
- proyectos;
- secciones;
- áreas;
- metadatos de adjuntos;
- archivos adjuntos mediante recursos de CloudKit;
- grupos de ajustes sincronizados.

Usa registros y recursos de CloudKit en tu cuenta de Apple, en vez de un `data.json` y una carpeta `attachments/` elegidos por ti.

## Configuración

1. Inicia sesión con el mismo Apple ID en todos los dispositivos que quieras sincronizar.
2. Comprueba que iCloud esté habilitado para Mindwtr en ellos.
3. En Mindwtr, abre **Ajustes → Sincronizar** en tu dispositivo Apple.
4. Elige **iCloud** como backend.
5. Ejecuta una sincronización para enviar o descargar tus datos iniciales.

Después, Mindwtr continúa usando el flujo normal de combinación local-first y puede responder a las notificaciones de cambios de CloudKit cuando estén disponibles.

## Notas sobre plataformas

- Si una compilación ajena a Apple encuentra un valor antiguo `cloudkit`, Mindwtr vuelve a `Off` en vez de mostrar una opción de iCloud que no funciona.
- En macOS también puedes usar **iCloud Drive + Sincronización de archivos** si prefieres trabajar con carpetas en vez del backend nativo de CloudKit.
- La sincronización nativa de adjuntos con iCloud también es exclusiva de Apple. Si mezclas plataformas y necesitas trasladar adjuntos entre dispositivos Apple y no Apple, usa un backend multiplataforma.
- Para sincronizar entre dispositivos Apple y no Apple, usa **WebDAV**, **Mindwtr Cloud**, **Dropbox** en compilaciones compatibles o **Sincronización de archivos**.

## Cuándo usarlo

Usa la sincronización nativa con iCloud cuando:

- todos los dispositivos participantes pertenezcan al ecosistema Apple;
- quieras una configuración más sencilla que elegir y mantener una carpeta compartida;
- no necesites clientes Android, Windows o Linux en la misma red de sincronización.

Si necesitas mezclar plataformas, consulta [Datos y sincronización](/es/data-sync/).
