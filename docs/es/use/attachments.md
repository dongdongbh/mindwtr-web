# Archivos adjuntos (archivos, enlaces y audio)

Mindwtr permite adjuntar archivos y enlaces a **tareas** y **proyectos**. Los adjuntos son opcionales y se sincronizan entre dispositivos cuando la sincronización está activada.

---

## Qué puedes adjuntar

- **Archivos** (PDF, imágenes, documentos, etc.).
- **Enlaces** (URL, páginas web y enlaces de referencia).
- **Notas de audio** (cuando está activado «Guardar adjuntos de audio»).
- **Notas de Obsidian** en el escritorio, cuando está habilitada la integración con Obsidian.

---

## Añadir adjuntos

### Escritorio

- Abre una tarea o un proyecto.
- En **Adjuntos**, haz clic en **Añadir archivo** o **Añadir enlace**.
- Para los enlaces, pega una URL o una ruta de archivo local.
- En los adjuntos de una tarea, **Adjuntar nota de Obsidian** solo aparece después de habilitar la integración con Obsidian.

### Dispositivos móviles

- Abre una tarea.
- Usa **Añadir adjunto** para elegir un archivo o añadir un enlace.
- Las notas de audio se añaden automáticamente si grabas una captura de voz y está activado **Guardar adjuntos de audio**.

### Copias y enlaces

- **Añadir archivo** guarda una copia en el almacenamiento propio de Mindwtr. El adjunto seguirá funcionando aunque el original se mueva, cambie de nombre o se elimine. Al quitar el adjunto se borra la copia de Mindwtr, no el archivo original.
- **Añadir enlace** guarda una referencia. Pega una URL o una ruta local —o usa **Enlazar a archivo…** en el escritorio— cuando quieras hacer referencia a un archivo sin copiarlo. Si el archivo se mueve, el enlace a la ruta deja de funcionar, como es de esperar.
- Cada fila indica el tipo: un clip significa que Mindwtr guarda una copia; un icono de enlace indica que es una referencia y su descripción emergente muestra el destino completo.
- Los adjuntos añadidos en escritorio antes de v1.1.0 hacen referencia a la ruta original en vez de guardar una copia y muestran el icono de enlace. Vuelve a adjuntarlos para convertirlos en copias.

---

## Adjuntos de audio

Al activar **Guardar adjuntos de audio** en Ajustes → General, Mindwtr conserva la nota de voz original junto con la transcripción. Resulta útil si quieres volver a escuchar o compartir la grabación.

### Dependencias para reproducir audio en Linux

La reproducción en Linux usa **GStreamer**. Si aparecen errores como `autoaudiosink not found`, instala sus complementos:

**Arch / Manjaro**
```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav
```

**Debian / Ubuntu / Mint**
```bash
sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav
```

**Fedora** (algunos códecs requieren RPM Fusion)
```bash
sudo dnf install gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly gstreamer1-libav
```

## Comportamiento de la sincronización

- Los metadatos de los adjuntos se sincronizan con las tareas y los proyectos.
- Los archivos se sincronizan después de los metadatos.
- Si falta un archivo local, el adjunto permanece visible y puede volver a descargarse cuando esté disponible.
- La limpieza comprueba las referencias conocidas por el dispositivo actual. Si otro dispositivo aún no se ha sincronizado, los archivos remotos compartidos no se contabilizan globalmente por referencias.

> Consejo: los archivos grandes pueden ralentizar la sincronización. Siempre que puedas, prefiere adjuntos pequeños o enlaces.

---

## Limpieza

Mindwtr limpia automáticamente los **adjuntos huérfanos**, es decir, archivos a los que ya no hace referencia ninguna tarea ni proyecto.

- Escritorio: también puedes ejecutar la limpieza manualmente en **Ajustes → Datos → Limpieza de adjuntos**.
- Dispositivos móviles: la limpieza se ejecuta automáticamente durante la sincronización.

---

## Páginas relacionadas

- [Datos y sincronización](/es/data-sync/)
- [Guía de escritorio](/es/use/desktop)
- [Guía para dispositivos móviles](/es/use/mobile)
