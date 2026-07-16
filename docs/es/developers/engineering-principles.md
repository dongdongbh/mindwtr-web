# Principios de ingeniería

Principios de diseño, restricciones y protecciones derivados del historial completo de incidencias y debates de este repositorio (569 incidencias y 89 debates, hasta v0.9.10). Cada principio cita los incidentes que le dieron origen. Las funciones nuevas y las correcciones deben contrastarse con esta página antes de implementarse.

La principal lección de todo el historial: **casi todos los errores críticos (P0/P1) fueron errores de integridad de datos en una ruta con varios escritores** — sincronización frente a interfaz, sincronización frente a sí misma, aplicación frente a MCP/CLI, instantánea frente a guardado incremental. Los errores de la interfaz fueron abundantes, pero baratos; los errores de las rutas de escritura costaron datos y confianza de los usuarios.

---

## 0. Filosofía del producto (se comprueba antes de cualquier decisión de ingeniería)

Mindwtr es **simple de forma predeterminada y potente cuando lo necesitas**: divulgación progresiva (las opciones avanzadas permanecen ocultas hasta que importan), menos de forma predeterminada (menos campos, menos controles, menos distracciones) y ninguna proliferación de funciones (claridad antes que saturación). *No me muestres una cabina de avión cuando solo quiero montar en bicicleta.*

### Lo automático supera a lo manual: deduce, no preguntes
Si el resultado correcto se puede determinar automáticamente —a partir de la plataforma, el canal de instalación, los datos existentes o el contexto—, la aplicación debe hacerlo sin más. Esto se aplica a todo, no solo a los ajustes: un control, un mensaje de confirmación, un toque adicional en un flujo de trabajo o un elemento de la interfaz que el usuario debe manipular son todos el mismo fallo: la aplicación formula una pregunta que podría responder por sí misma. Cada paso manual traslada la carga cognitiva de nosotros (una vez) a todos los usuarios (para siempre).

- **Comprobaciones de actualizaciones:** un usuario pidió un interruptor para «desactivar las comprobaciones de actualizaciones» porque la aplicación seguía ofreciendo descargas de GitHub a una instalación realizada mediante un gestor de paquetes. La solución no fue el interruptor: ahora la aplicación detecta su canal de instalación y se comporta correctamente en cada canal; los recordatorios quedan vinculados a los canales con un canal de actualizaciones canónico y hay silencio total para los canales que gestionan sus propias actualizaciones. No se publicó ningún ajuste.
- **#832:** el valor predeterminado del atajo global de adición rápida sigue las convenciones de cada plataforma (activado con una combinación segura en macOS/Linux y desactivado en Windows, donde los atajos globales capturan teclas silenciosamente) en lugar de pedir a los usuarios que lo averigüen.
- **#833:** las sesiones de concentración completadas acreditan sus minutos a la tarea vinculada automáticamente; la introducción manual existe como vía de corrección, no como flujo de trabajo. Y cuando un comportamiento realmente no se puede deducir y existe una demanda real, debe supeditarse a un interruptor *existente* antes de crear uno nuevo: el seguimiento del tiempo de una tarea solo aparece mientras el temporizador Pomodoro existente y su vinculación con tareas están habilitados; no se añadió ningún ajuste nuevo.

**Protecciones:** antes de añadir un ajuste, un mensaje o un paso manual al flujo de trabajo, demuestra que el resultado no se puede deducir ni predecir. Antes de crear un ajuste o elemento interactivo nuevo, demuestra que no existe ya uno que exprese la misma intención. Los valores predeterminados siguen las mejores prácticas de la plataforma, no la neutralidad. Los controles manuales son la alternativa para corregir, nunca la vía principal cuando la automatización es posible.

---

## 1. Escrituras y persistencia

### P1 — Cada escritura está protegida por revisiones; nunca se confía en el orden de llegada
Una carga útil con un `rev` menor no debe poder sobrescribir una fila con un `rev` mayor. Esto se aplica en la capa más baja (la inserción o actualización SQL), no en quienes la invocan.

- **#693 (P1, crítico):** `updateTask` persistía mediante un `saveTask` sin esperar su resultado, mientras que un `saveData` aplazado de la instantánea completa podía llegar después y sobrescribir la fila más reciente: la inserción o actualización de tareas no tenía protección de revisiones. En procesos MCP de corta duración, la escritura se perdía por completo. Solución: `WHERE tasks.rev IS NULL OR tasks.rev <= excluded.rev` en la inserción o actualización, además de seguir el guardado en curso en `flushPendingSave()`.
- **#316:** las ediciones realizadas *durante* una sincronización (completar una tarea, cambiar de área) se revertían al llegar la actualización de la sincronización en curso. Fueron necesarias tres correcciones: omitir los resultados obsoletos de obtención, avanzar el marcador de cambios locales incluso para ediciones en el mismo milisegundo y, por último, añadir diagnósticos para encontrar lo que faltaba.

**Protección:** toda ruta de persistencia nueva (entidad nueva, llamada de guardado nueva, proceso nuevo) debe responder: *¿qué impide que una carga útil anterior sobrescriba una más reciente?* Si la respuesta es «los tiempos», es un error.

### P2 — Las eliminaciones desvinculan, nunca se propagan en cascada; las restauraciones prevalecen sobre los registros de eliminación
- **#609 (P0, crítico):** eliminar un Área eliminaba todas sus tareas y proyectos. Peor aún, después de que el usuario restaurara una copia de seguridad, los registros de eliminación de la sincronización volvían a eliminar los datos restaurados en cada ciclo. Solución: ahora la eliminación de un área solo borra `areaId`; la restauración de copias de seguridad marca los registros recuperados como datos locales nuevos para que prevalezcan sobre los registros de eliminación remotos obsoletos.

**Protección:** eliminar un contenedor (área/proyecto/sección/etiqueta) desvincula sus elementos secundarios. Toda ruta de restauración o importación debe volver a atribuir la autoría de los datos (un rev/updatedAt nuevo) para que no pierdan ante los registros de eliminación creados por el mismo error del que el usuario intenta recuperarse.

### P3 — Informar del éxito sin esperar el resultado es una mentira; responde solo después de una persistencia duradera
- **#694:** las herramientas de escritura de MCP devolvían la tarea modificada desde el almacén en memoria, pero `saveData` había fallado silenciosamente: las lecturas (desde otra conexión de base de datos) y la aplicación de escritorio mostraban los datos anteriores. La herramienta indicaba un resultado «correcto» sin haber persistido nada.
- **#693:** misma causa principal: el proceso terminaba antes de que se resolviera la promesa de guardado sin seguimiento.

**Protección:** una respuesta de API, herramienta o IPC que afirme que una escritura se realizó correctamente solo debe enviarse después de que la capa de almacenamiento la confirme. Haz seguimiento de cada promesa de guardado; `flushPendingSave()` debe abarcar *todo* el trabajo pendiente.

---

## 2. Convergencia de la sincronización

### P4 — La fusión debe ser un punto fijo: volver a fusionar datos ya sincronizados no produce cambios
- **#698:** un campo heredado *eliminado* (`showFutureRecurrence`) seguía presente en las cargas útiles almacenadas de un lado. Las firmas de contenido se creaban extendiendo `{...task}`, por lo que la clave desconocida producía **325 conflictos perpetuos** en cada sincronización, aunque las revisiones y marcas de tiempo eran idénticas.
- **#418:** `null` frente a campos opcionales *omitidos* generaba hashes diferentes → conflictos falsos interminables y advertencias falsas de «3 horas de desfase del reloj» causadas por marcas de tiempo obsoletas de las entidades, no por los relojes.
- **#142:** un `revBy` heredado no válido interrumpía por completo la validación de la fusión hasta que se saneó.

**Protecciones:**
- Las firmas de contenido se calculan a partir de una **lista explícita de campos permitidos**, nunca extendiendo un objeto. Las claves desconocidas o heredadas nunca intervienen en la comparación.
- La normalización es idempotente y convergente: `normalize(normalize(x)) === normalize(x)`, y `null` ≡ ausente en los campos opcionales.
- Cuando se elimina un campo del esquema, se publica una migración o paso de limpieza: las cargas útiles antiguas permanecen en sistemas remotos durante años.
- Debe existir en el conjunto de pruebas una prueba de que «una sincronización nueva con datos alineados produce cero conflictos» para cada cambio de firma.

### P5 — Las escrituras de la propia sincronización deben ser invisibles para sus desencadenadores
La saga «sigue sincronizando para siempre» de #718/#725 necesitó **seis correcciones**, cada una para un bucle de retroalimentación propio distinto:
1. la persistencia de la sincronización no marcaba la ventana de omisión del observador de SQLite → su propia escritura se percibía como un cambio externo;
2. las escrituras del estado e historial de sincronización volvían a marcar como modificado el estado de los datos;
3. las escrituras de estado guardaban una **instantánea obsoleta en memoria** que deshacía las entidades recién fusionadas (y volvía a poner en cola la misma fusión);
4. la deduplicación durante la carga de un nombre de área duplicado reescribía los datos *en cada carga*;
5. la lista de personas no se persistía en SQLite → se rellenaba y se marcaba como modificada en cada carga;
6. el ruido del archivo `mindwtr.db-shm` se trataba como una escritura externa.

Errores anteriores de la misma clase: **#309** (el observador volvía a fusionar el propio `data.json` de la aplicación como un cambio externo; se necesitó una *ventana* de hashes de escrituras propias recientes, no solo el último), **#502** (actividad constante en la interfaz de sincronización).

**Protecciones:**
- Cada byte escrito por la sincronización (datos, estado, historial, instantáneas) se marca como escrito por ella misma para todos los observadores que puedan detectarlo.
- Los metadatos de sincronización (estado/historial) se escriben sobre la instantánea persistida, nunca a partir del estado posiblemente obsoleto de la interfaz; mejor aún, se mantienen fuera de banda respecto a los datos del usuario.
- **Cargar datos nunca los modifica.** Las migraciones y deduplicaciones son pasos únicos explícitos, no normalizaciones durante la carga que marquen el estado como modificado.
- Cada desencadenador automático necesita un argumento de finalización: sin trabajo → no se ejecuta (#725), fallo → espera de recuperación (#718, corrección 5; #133, modo avión), éxito → inactivo.

### P6 — Las ediciones del usuario durante la sincronización son sagradas
- **#323:** hacer clic en el desplegable Estado iniciaba una sincronización por enfoque o desenfoque que revertía todas las ediciones sin guardar en el editor abierto. Solución: la sincronización automática ignora los desencadenadores de enfoque y desenfoque mientras hay un editor abierto.
- **#316 / #128:** «cada acción se revertía después de unos segundos»: el síntoma que más destruyó la confianza en todo el historial.

**Protección:** todo desencadenador de sincronización nuevo debe contrastarse con «¿qué ocurre si el usuario está editando en ese momento?». El lado de la edición local se vuelve a poner en cola; nunca se sobrescribe. (Para esto existe la maquinaria de instantánea `lastDataChangeAt` + `LocalSyncAbort` + nueva puesta en cola; el trabajo de sincronización nuevo debe pasar por ella).

### P7 — El documento de sincronización es una sola unidad de fusión; no lo dividas sin una estrategia de transacciones
- **#629 (debate):** se rechazó dividir `archive.json`: archivar o desarchivar se convierte en una transacción entre archivos; los backends basados en archivos suben los archivos por separado → divergencia de estado. Dirección documentada: sincronización incremental por registros, no más archivos.
- **#113 (debate):** los conflictos de Syncthing se producen por archivo debido a su diseño; la respuesta recomendada son los backends controlados por la aplicación (WebDAV/nube), no nombres de archivo más ingeniosos.

**Restricción:** las funciones no deben añadir un segundo documento sincronizado (ni archivos por entidad) a menos que incluyan un protocolo de confirmación atómica entre varios archivos. Es preferible añadir campos a las entidades antes que nuevos documentos de nivel superior.

---

## 3. Adjuntos (regla de dos fases para binarios y metadatos)

### P8 — Sube primero los bytes; publica después los metadatos; un 404 es terminal
- **#176:** la sincronización saneaba el `uri` del adjunto a `""` y publicaba los metadatos *antes* de que terminara la carga → adjuntos sin `cloudKey` ni archivo en ningún lugar, irrecuperables. Después, la corrección de «bloquear hasta que se cargue» reveló cargas que nunca se ejecutaban (URI `content://` sin metadatos de tamaño) → la sincronización quedaba bloqueada para siempre. Cuatro correcciones en total.
- **#213 / #128:** los `pendingRemoteDeletes` obsoletos y los metadatos remotos ausentes provocaban bucles infinitos de reintentos; eliminar los datos a mano no servía porque la sincronización los restauraba.
- **#399:** los URI de documentos SAF con una barra final hacían invisible el directorio de adjuntos existente → una *nueva copia completa de todos los adjuntos en cada sincronización*.
- **#655:** un 404 remoto se reintentaba y consultaba en un bucle indefinido; después aparecía `EISDIR` por una colisión con un archivo temporal.

**Protecciones:**
- El orden es invariable: bytes cargados → `cloudKey` registrado → metadatos publicados. Nunca al revés.
- Cada fallo de archivo remoto se clasifica como reintentable (con límites y espera progresiva) o terminal (404 → marcar como irrecuperable y detener). No hay reintentos sin límite en ninguna parte del código de adjuntos.
- Las comprobaciones de identidad usan ID o claves canónicas, nunca formas textuales del URI del proveedor (barras finales de SAF, peculiaridades de `content://`).
- Las fases de adjuntos se omiten cuando los metadatos indican que no hay trabajo pendiente (por rendimiento *y* seguridad del bucle).
- Riesgo abierto conocido (revisión de 2026-06): `duplicateTask` comparte el `cloudKey` entre las copias sin recuento de referencias; eliminar una borra los bytes de la otra. No añadas nuevas rutas con claves compartidas.

---

## 4. Acceso desde varios procesos (MCP, CLI, API local)

### P9 — Un almacén canónico, una ruta de escritura serializada; cada escritor participa por completo o es de solo lectura
- **#179 / #285:** la CLI escribía tareas en `data.json`, que es un **reflejo de exportación**, leído una vez al iniciar y sobrescrito después, sin `rev`/`revBy`/`taskMode`, por lo que incluso al importarlas la fusión las descartaba silenciosamente.
- **#722:** la aplicación de escritorio y el MCP local escribían simultáneamente en el mismo SQLite → conflictos de bloqueo; la peligrosa solución provisional (dos escritores mediante almacenamiento compartido) tuvo que documentarse como no compatible. Solución: fallar de inmediato al encontrar un bloqueo de escritor, **volver a cargar los datos actuales y reintentar toda la operación**; nunca reanudar desde una instantánea anterior al bloqueo.
- **#650:** la instantánea de lectura WAL de larga duración del escritorio no veía las escrituras de MCP hasta reiniciar.
- **#367:** la zona aislada de Mac App Store trasladaba la base de datos; el resolutor de rutas de MCP solo conocía las rutas sin aislamiento.

**Protecciones:**
- La creación de todas las entidades pasa por las fábricas del núcleo, que asignan todos los campos necesarios para la sincronización (`rev`, `revBy`, `createdAt`, `updatedAt`, valores predeterminados). Un escritor que construye JSON a mano será un error de pérdida de datos en el futuro. (El mismo caso es la ausencia de asignación de revisiones en `POST /v1/tasks` del servidor en la nube; corrección pendiente).
- Los escritores externos integran el almacén del núcleo y el adaptador de almacenamiento, o bien son de solo lectura.
- Protocolo de escritura entre procesos: adquirir bloqueo → (en caso de conflicto) volver a cargar → volver a aplicar → escribir. Se prohíbe continuar a partir de una instantánea obsoleta.
- La resolución de rutas debe enumerar los canales de instalación aislados (contenedores de App Store, Flatpak, etc.).

---

## 5. Fechas, recurrencia y semántica de los estados

### P10 — Una función compartida de «siguiente instancia»; todos los campos avanzan juntos; la regeneración es idempotente
El grupo de recurrencia es el área de funciones que más veces se ha vuelto a romper en el historial:
- **#140:** la recurrencia personalizada avanzaba `dueDate`, pero no `startTime` → la tarea completada reaparecía inmediatamente en Enfoque.
- **#241:** la instancia regenerada perdía `sectionId`/`areaId`.
- **#187 → #717:** las continuaciones de repetición después de completar aparecían inmediatamente en Siguiente (sin un `startTime` aplazado); el mismo síntoma regresó un ciclo de versión más tarde con fechas de inicio sin hora y cambios de modo.
- **#662:** completar una tarea creaba un duplicado cuando ya existía una continuación abierta equivalente.
- **#557:** una pequeña función de proyección necesitó **más de 7 correcciones posteriores**: enésimo día de la semana frente a día del mes, anclaje sin fecha de inicio, metadatos mensuales perdidos en los ciclos de carga, guardado y edición, proyecciones etiquetadas incorrectamente.
- **#17:** las reglas RRULE limitadas por COUNT se expandían «desde el mes actual», resucitando series de hacía 10 años.

**Protecciones:**
- Exactamente una función del núcleo calcula la siguiente instancia. Debe: avanzar de forma coherente el inicio, el vencimiento y la revisión; conservar *todos* los campos de contexto (proyecto, sección, área, contextos, etiquetas, reglas de reinicio de listas de comprobación); mantener como fechas sin hora los valores que solo contienen una fecha; anclar la expansión RRULE al inicio de la serie, no a «ahora»; y ser idempotente (omitir si existe una continuación abierta equivalente).
- Los metadatos de recurrencia deben sobrevivir a los ciclos de carga → guardado → edición; añade una prueba de ciclo completo para cada campo de recurrencia nuevo.
- La matriz de regresión para cualquier cambio de recurrencia: `{strict, after-completion} × {start-only, due-only, both, neither} × {daily, weekly, monthly-day, monthly-nth-weekday, yearly, COUNT-limited} × {date-only, datetime}`.

### P11 — El estado prevalece sobre las fechas; los predicados de visibilidad se definen una sola vez en el núcleo
- **#341:** una tarea WAITING aparecía en NEXT porque una regla de fecha de inicio ignoraba el estado.
- **#237:** el escritorio y el móvil calculaban «Hoy» de forma distinta; tareas visibles en una plataforma eran invisibles en la otra. La solución terminó haciendo que ambas plataformas usaran una única regla compartida.
- **#144:** la promoción automática de programada a siguiente se implementó en el mantenimiento de obtención del núcleo precisamente para que ambas aplicaciones la hereden.
- **#591:** la propia regla derivada del repositorio: la coherencia de fechas (por ejemplo, `startTime` posterior a `dueDate`) se detecta de forma centralizada como **estado derivado**, en la normalización del núcleo, y se aplica a *todas* las rutas de escritura; además, los datos sincronizados se consideran no fiables y se vuelven a comprobar.

**Protecciones:**
- Todo predicado que decida dónde aparece una tarea (`isToday`, `isAvailable`, aplazada, revisión pendiente) se define en `packages/core` y ambas aplicaciones lo importan. Que una vista vuelva a implementar uno es un error aunque actualmente coincidan.
- El estado es el eje principal; las fechas modulan dentro de un estado, nunca entre estados.
- No modifiques automáticamente las fechas del usuario para imponer coherencia; muestra advertencias derivadas en su lugar (resolución de #591: un usuario puede mantener deliberadamente una tarea vencida pero aplazada).

### P12 — Una instancia activa por tarea recurrente es una invariante del producto
- **#552 → #557:** se rechazó deliberadamente crear con antelación instancias futuras reales («hace más difícil razonar sobre el comportamiento de completar, eliminar, sincronizar y duplicar»); el diseño aceptado fue una **proyección de solo lectura**.

**Restricción:** las funciones que necesitan visibilidad futura producen datos derivados o proyectados que no se pueden editar, nunca registros reales creados con antelación.

### P13 — Los valores que solo contienen una fecha nunca adquieren una hora implícita
- **#298 (crítico):** las fechas sin hora se programaban como *alarmas a medianoche*, despertando a los usuarios por la noche; revocar el permiso de notificaciones no eliminaba las alarmas ya programadas, por lo que seguían activándose sin una interfaz visible.
- **#205:** los años introducidos se convertían en años 19xx; los segmentos parciales de fechas saltaban entre épocas.

**Protecciones:** un campo de fecha sin hora no programa nada a menos que el usuario establezca una hora. Revocar los permisos cancela todo lo ya programado. La programación de alarmas y notificaciones es idempotente y silenciosa al volver a registrarse (la avalancha de avisos «esta alarma ya está configurada» de #418).

---

## 6. Ajustes y estado no relacionado con tareas

### P14 — Clasifica cada ajuste: sincronizado, local del dispositivo o de sesión de interfaz; los valores predeterminados nunca ganan fusiones
- **#120:** la sincronización restablecía los ajustes a sus valores predeterminados (el valor predeterminado remoto sobrescribía el valor local explícito).
- **#62:** los ajustes se perdían al actualizar la aplicación.
- **#316:** el *filtro de áreas de la interfaz* se encontraba donde una actualización de sincronización podía sobrescribirlo.
- **#488:** cambiar la densidad restablecía el tamaño del texto (el escritor de un ajuste sobrescribía sus elementos del mismo nivel).

**Protecciones:** los ajustes nuevos declaran su clase al nacer. El estado de sesión de la interfaz (filtro actual, vista seleccionada) nunca reside en el documento de ajustes sincronizado. Los ajustes se fusionan campo por campo; un valor explícito siempre gana a uno predeterminado. Las escrituras de ajustes pasan por un único actualizador que no puede descartar claves del mismo nivel.

---

## 7. Ingeniería de publicaciones y zonas aisladas de las plataformas

### P15 — Cada canal de distribución es un entorno de ejecución distinto; valida el artefacto del canal, no el código fuente
- **#715/#674/#723:** el APK FOSS de v0.9.9 fallaba al iniciarse para todos los usuarios de F-Droid/Obtainium (fallo de interoperabilidad de módulos que solo aparecía en el conjunto de dependencias FOSS). El APK normal funcionaba: probar un canal no demostraba nada sobre el otro.
- **#583 (P0):** Flatpak no se iniciaba: faltaba la biblioteca compartida appindicator solo en el entorno de ejecución Flatpak.
- **#234:** AUR falló repetidamente (configuración de Tauri inyectada por CI, peculiaridades de `overrides` de Bun y después pruebas inestables en `check()`); la solución fue una **condición de la canalización de publicación que compilaba el paquete AUR en un contenedor Arch limpio**, el modelo para las condiciones de canal.
- **#539:** el parcheador del objetivo JVM de F-Droid ignoraba módulos locales de Android.
- **#209:** fallo en Windows Store: la inicialización de la bandeja o el atajo global era fatal en la zona aislada MSIX; un *conflicto* con un atajo registrado también podía impedir el inicio.
- **#198:** fallo de Hermes: `setTimeout` se consultaba en el ámbito del módulo antes de que existieran las variables globales de los temporizadores.

**Protecciones:**
- El inicio nunca depende de forma estricta de capacidades opcionales (bandeja, atajos globales, llavero, notificaciones, temporizadores en el ámbito del módulo). Detectar → degradar → registrar; nunca salir.
- Cada canal (APK FOSS, Play, F-Droid, Flatpak, AUR, MSIX/Store, winget, homebrew, App Store, TestFlight) somete *su* artefacto a una prueba rápida de inicio antes de publicarlo, en un entorno tan fiel al canal como permita la CI.
- Los conjuntos de dependencias específicos de cada canal (FOSS frente a no FOSS, archivos de bloqueo de Flatpak) se consideran objetivos de compilación distintos con su propia CI.

### P16 — Una publicación etiquetada es inmutable
- **#682/#674:** después de corregir el fallo FOSS, el APK corregido —compilado a partir de un *commit posterior*— se subió a la publicación v0.9.9 existente. La comprobación de compilación reproducible de IzzyOnDroid falló; hubo que retirar el recurso y marcar la publicación como reemplazada.

**Protecciones:** corrección → etiqueta nueva → publicación nueva (por ejemplo, v0.9.9.1), nunca sustitución del artefacto. Mantén los pasos de compilación en scripts versionados del repositorio (no dentro del YAML del flujo de trabajo) para que los sistemas de compilación reproducible posteriores sigan los cambios automáticamente.

### P17 — Las zonas aisladas deniegan lo que das por supuesto; nunca persistas una configuración que no haya funcionado al menos una vez
- **#335:** Flatpak no tenía llavero ni DBus → fallaba el almacenamiento seguro; la solución añadió una alternativa de secretos locales. En el mismo informe, una divergencia de ACL o del archivo de bloqueo de un complemento de Tauri interrumpía HTTP.
- **#343:** el permiso de una carpeta en iOS desaparecía al reiniciar → se necesitaban marcadores con ámbito de seguridad.
- **#617:** las compilaciones de Homebrew no tenían autorizaciones de CloudKit; ahora el flujo de publicación *verifica las autorizaciones en el artefacto firmado*.
- **#338:** el esquema de CloudKit estaba desplegado en Desarrollo, pero no en Producción: todos los usuarios de App Store afectados. Además, el backend elegido se persistía en la configuración *antes* de la primera sincronización correcta, lo que provocaba un bucle de fallos. Solución: mantener el backend como provisional hasta el primer resultado correcto.
- **#727:** al añadir la entidad Persona faltó un índice consultable de CloudKit → la sincronización se rompía después de restablecer los datos de iCloud.

**Protecciones:**
- Matriz de capacidades por plataforma y canal: llavero, persistencia del sistema de archivos, transporte de red, envío, CloudKit; cada una con detección y alternativa.
- La configuración del backend de sincronización solo se confirma después de un ciclo completo correcto.
- El esquema del servidor (tipos de registro, índices y despliegue en producción de CloudKit; validación del servidor en la nube) forma parte de la lista de comprobación de entidades y de la lista de comprobación de publicación.

### P18 — «Añadir un tipo de entidad» es una lista de comprobación, no una definición de tipo
Derivado de #727 (falta de índice de CloudKit para Persona), #718-corrección-6 (Persona no se persistía en SQLite de escritorio → bucle permanente de estado modificado), #322 (el orden de guardado de SQLite infringía el orden de las claves foráneas y borraba datos tras reiniciar en Android FOSS) y la falta de asignación de revisiones de `POST /v1/tasks` en la nube.

Una entidad nueva (o un campo nuevo) debe afectar a: tipo del núcleo y asignación de valores en la fábrica; normalización y lista de firmas permitidas; esquema de SQLite **y orden de guardado seguro respecto a claves foráneas**; exportación a data.json; fusión de sincronización y registros de eliminación; tipo de registro, índices y despliegue en producción de CloudKit; validación y asignación de valores del servidor en la nube; almacenes de ambas aplicaciones; etiquetas i18n; pruebas de ciclo completo y convergencia de la fusión.

---

## 8. Rendimiento a escala

### P19 — El coste de interacción es O(visible), no O(almacén); se aplica mediante presupuestos sintéticos para almacenes grandes
- **#594 (debate) + #643–#649, #195, #224:** una base de datos de usuario de tamaño normal (¡186 kB de JSON!) hacía que cada toque bloqueara la aplicación hasta un segundo. Causas encontradas: cada fila de proyecto exploraba la lista completa de tareas; abrir el editor volvía a explorar repetidamente todas las tareas; persistencia de la instantánea completa en cada modificación; suscripciones amplias al almacén activaban pantallas enteras por cambios no relacionados; el directorio SAF se volvía a enumerar para cada adjunto; se iniciaban fases de sincronización de adjuntos sin trabajo pendiente; los controladores de toques no idempotentes acumulaban acciones (15 elementos en blanco en una lista de comprobación por toques en cola).

**Protecciones:**
- Las vistas de listas nuevas se publican virtualizadas y con selectores específicos; no hay suscripciones `useTaskStore()` a matrices completas en las pantallas.
- La persistencia de modificaciones es incremental; los guardados de instantáneas completas quedan reservados para los límites del ciclo de vida y la sincronización.
- Cada fase periódica o de sincronización termina antes si no hay trabajo.
- Los controladores de toques son idempotentes (los toques duplicados en cola son inocuos).
- El conjunto de rendimiento para almacenes grandes (`bun run test:perf`, con presupuestos en `docs/performance-budgets.md`) incorpora un caso cada vez que se publica una nueva ruta crítica.

---

## 9. Interfaz, i18n y paridad

### P20 — No hay texto visible para el usuario escrito directamente; las claves llegan a todas las configuraciones regionales con la función
Once incidencias distintas (#244, #245, #246, #256, #257, #261, #287, #292, #215, #23, #593) fueron por «texto en inglés escrito directamente» o «clave ausente»; todas se podían evitar de forma trivial durante la revisión. El formato de fechas y días de la semana pasa por API que tienen en cuenta la configuración regional (#375, #287).

### P21 — La paridad entre escritorio y móvil forma parte de la función, no es una tarea posterior
- **#237** (la misma tarea visible en el móvil e invisible en el escritorio), **#99**, **#149**, **#559**, **#314**: las diferencias de paridad aparecieron repetidamente como errores.

**Protección:** todo cambio en la semántica o visibilidad de tareas se incorpora al núcleo y ambas aplicaciones lo consumen en la misma publicación, o bien la divergencia se documenta explícitamente como intencionada (como la decisión deliberada de #725 de mantener la sincronización de ciclo de vida en el móvil).

---

## 10. Recuperación, diagnóstico y flujo de correcciones

### P22 — La recuperación debe vencer al fallo para el que existe
- **#236:** las «5 instantáneas como máximo» procedían todas de los mismos 4 minutos, por lo que no servían para ningún incidente real. Solución: distribuir la retención a lo largo de la ventana y omitir instantáneas cuando los datos no hayan cambiado.
- **#609:** las copias de seguridad restauradas volvían a ser eliminadas por el mismo error de sincronización que había destruido los datos, hasta que la restauración aprendió a volver a atribuir la autoría de los registros.

**Protección:** prueba las rutas de restauración contra los casos reales de pérdida (eliminación en cascada y registros de eliminación, sistema remoto corrupto, fusión incorrecta), no solo que «el archivo existe».

### P23 — Haz diagnosticables las decisiones invisibles antes de corregir causas plausibles
- **#698** se pudo resolver de una sola vez *porque* los diagnósticos mostraban `diffKeys` para cada conflicto.
- **#718** consumió tres correcciones especulativas antes de que los diagnósticos añadidos revelaran las dos causas reales (relleno de personas y ruido de `-shm`).
- **#316** terminó añadiendo diagnósticos de resolución de fusiones (lado ganador, revisiones, marcas de tiempo) en vez de otra conjetura.

**Protecciones:** las rutas de fusión y conflicto registran el motivo y una muestra de claves de campos (censurada); los errores de tipo bucle reciben *primero* diagnósticos sobre el origen del desencadenador y después una corrección. Para los errores semánticos (recurrencia, lógica de fechas), enumera la matriz de entradas como pruebas antes de corregir: las sagas de #187/#717 y #557 fueron parches repetidos de un solo caso ante un espacio de entradas multidimensional.

### P24 — Bucle de reproducir y confirmar
Lo que funcionó de forma demostrable en este historial y debe mantenerse: etiquetas de gravedad y prioridad con `status:needs-confirmation`; correcciones publicadas con los hashes completos de los commits; solicitud a quienes informan de los errores de datos estructurados sobre el entorno y los registros (el canal de instalación importa: #322 solo aparecía en la compilación FOSS, #617 solo en homebrew); retirada rápida de artefactos incorrectos y explicación clara (#674/#682).

---

## Lista de comprobación rápida para funciones nuevas

Antes de implementar, responde:

1. **Escritores:** ¿quién más escribe estos datos (sincronización, MCP, CLI, otro dispositivo, una versión anterior de la aplicación)? ¿Qué protege el orden? (P1, P9)
2. **Convergencia:** después de que mi cambio se sincronice una vez, ¿una segunda sincronización produce cero diferencias, incluso con un dispositivo que ejecuta la versión anterior? (P4)
3. **Desencadenadores:** ¿mi código escribe algo que pueda detectar un observador o desencadenador? ¿Está marcado como escrito por sí mismo? ¿Terminan todos los bucles? (P5)
4. **Durante la edición:** ¿qué ocurre si el usuario está editando mientras se ejecuta? (P6)
5. **Entidades/campos:** ¿he seguido la lista de comprobación de entidades (SQLite y orden de claves foráneas, firmas, CloudKit e índices y despliegue en producción, validación en la nube, fábricas)? (P18)
6. **Fechas:** ¿primero el estado? ¿Las fechas sin hora siguen sin hora? ¿Ambas aplicaciones comparten el predicado del núcleo? ¿Está cubierta la matriz de recurrencia? (P10–P13)
7. **Ajustes:** ¿sincronizado, local del dispositivo o de sesión? ¿Puede un valor predeterminado imponerse alguna vez a uno explícito? (P14)
8. **Canales:** ¿afecta al inicio, a las capacidades nativas o a las dependencias? ¿Qué canales necesitan una prueba rápida? (P15–P17)
9. **Escala:** ¿cuál es el coste con 5.000 tareas? ¿Hay una salida temprana cuando no hay trabajo? (P19)
10. **Fallos:** ¿todos los reintentos están limitados, todos los 404 son terminales y todas las restauraciones vuelven a atribuir la autoría? (P8, P22)
