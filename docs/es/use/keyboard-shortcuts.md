# Atajos de teclado de escritorio

Mindwtr para escritorio permite trabajar principalmente con el teclado mediante los perfiles Estándar (al estilo Gmail/Todoist), Vim y Emacs. Pulsa `?` en la aplicación para abrir la ayuda de atajos del perfil actual.

## Inicio rápido

- Elige el perfil en **Ajustes → General → Atajos de teclado**.
- Pulsa `?` para abrir la hoja de atajos del perfil actual. Al final incluye una tabla de sintaxis de adición rápida con todos los tokens (`/start:`, `/note:`, `@context`, `+Project`, …).
- Usa `/` para buscar.
- Usa `gi` para Bandeja de entrada, `gn` para Próximas acciones y `gf` para Foco (modos Estándar y Vim).
- Usa `a` para añadir una tarea cuando Mindwtr tenga el foco. `o` sigue realizando la misma acción limitada a la aplicación.
- Usa `j` y `k` para mover la selección, e `Enter` para abrir la tarea seleccionada.
- En el modo Estándar, usa `e` para marcar como terminada, `x` para seleccionar tareas para acciones por lotes, `Shift+Enter` para editar, `#` para eliminar y `z` para deshacer.
- En el modo Vim, usa `e` para editar, `x` para alternar el estado terminado y `dd` para eliminar.
- Usa `Ctrl+Z` / `Cmd+Z` para deshacer la última finalización o eliminación en cualquier perfil.
- En cualquier perfil, pulsa `s` y después una letra para establecer el estado de la tarea seleccionada: `si` Bandeja de entrada, `sn` Próxima, `sw` En espera, `ss` Algún día, `sd` Terminada y `sa` Archivada. Una notificación confirma el cambio e incluye un botón para deshacerlo.
- Usa `Insert` para ir al campo de adición de tareas; en las vistas que no lo tengan, abre Adición rápida.
- Usa `Shift+A` y después `1`-`9` para cambiar a un área según el orden de la barra lateral, o `Shift+A` y después `0` para quitar el filtro de área. También funciona si mantienes pulsado Shift al introducir el número. Una `a` sin modificadores abre Adición rápida.
- Usa `Ctrl+Alt+S` para ejecutar una sincronización manual en el escritorio.
- En el menú contextual de clic derecho / `Shift+F10`: ↑/↓ se desplazan entre elementos, → abre un panel de submenú, ← vuelve, Enter activa y Esc cierra y devuelve el foco a la tarea.

Los atajos se ignoran mientras escribes en campos editables si entrarían en conflicto con la escritura.

La guía de escritorio sigue siendo la referencia canónica para las tablas actuales de atajos, la personalización de la adición rápida, las notas de comportamiento del teclado y los casos especiales.

## Adición rápida global

Cambia o desactiva el atajo global de Adición rápida en **Ajustes → General → Entrada**. Los atajos globales dependen de los permisos y del formato de distribución de cada plataforma de escritorio.

El atajo global de Adición rápida no es lo mismo que `a` cuando la aplicación tiene el foco. El global puede activarse desde otras aplicaciones; `a` solo funciona cuando Mindwtr tiene el foco y no estás escribiendo en un campo de texto.

## Consulta también

- [Guía de escritorio](/es/use/desktop)
- [Primeros pasos](/es/start/getting-started)
