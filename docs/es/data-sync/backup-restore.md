# Copias de seguridad y restauración

Mindwtr guarda localmente tus datos de trabajo y permite exportar copias JSON para trasladarlos, repararlos o migrarlos.

La restauración está diseñada como un proceso de **sustitución de datos locales**:

- eliges un archivo JSON de copia de seguridad;
- Mindwtr lo valida antes de cambiar nada;
- cuando es posible, crea primero una instantánea de recuperación;
- la copia elegida sustituye el conjunto de datos local actual.

Así la restauración es sencilla y predecible. No es una operación de combinación: para eso está **Combinar copia de seguridad**.

---

## Exportar una copia de seguridad

### Escritorio

1. Abre **Ajustes → Datos**.
2. En **Backup**, elige **Exportar copia de seguridad**.
3. Guarda el archivo JSON donde quieras.

### Dispositivos móviles

1. Abre **Ajustes → Datos**.
2. Toca **Exportar copia de seguridad**.
3. Guarda o comparte el archivo JSON.

El formato de la copia es compatible con la estructura interna `data.json` de Mindwtr.

---

## Restaurar desde una copia

### Escritorio

1. Abre **Ajustes → Datos**.
2. En **Backup**, elige **Restaurar copia de seguridad**.
3. Selecciona un archivo JSON de copia de Mindwtr.
4. Revisa el resumen y confirma la restauración.

Antes de restaurar, el escritorio crea una instantánea de datos en el directorio local correspondiente cuando está disponible el entorno de ejecución de Tauri.

### Dispositivos móviles

1. Abre **Ajustes → Datos**.
2. Toca **Restaurar copia de seguridad**.
3. Selecciona un archivo JSON de copia de Mindwtr.
4. Revisa el resumen y confirma la restauración.

Antes de restaurar, el móvil guarda una instantánea de recuperación local en el almacenamiento de la aplicación.

---

## Combinar desde una copia

**Combinar copia de seguridad** está junto a Restaurar en ambas plataformas y une un archivo de copia con tus datos actuales en lugar de sustituirlos. Sigue las mismas reglas que la sincronización:

- los elementos que solo están en la copia se añaden;
- cuando existen las dos versiones, gana la más reciente;
- los elementos que solo están en este dispositivo se conservan;
- los elementos que borraste en este dispositivo siguen borrados, aunque la copia todavía tenga una versión activa.

Al terminar, Mindwtr indica cuántas tareas se añadieron y cuántas se actualizaron. Cuando es posible se guarda antes una instantánea de recuperación, así que una combinación se puede revertir igual que una restauración.

Usa la combinación para volcar una segunda instancia de Mindwtr (un móvil de trabajo, un portátil de viaje) en la principal, o para llevar cambios de un dispositivo a otro sin vaciar ninguno de los dos. Usa la restauración cuando quieras que la copia sustituya lo que hay en el dispositivo.

---

## Instantáneas de recuperación

Las aplicaciones nativas de escritorio y móvil crean instantáneas de recuperación automáticamente antes de restaurar copias y de las importaciones de datos compatibles, incluidas las importaciones de Ajustes y la captura masiva de texto confirmada. La versión de navegador/PWA no tiene un directorio local de instantáneas.

- **Escritorio:** aparecen en **Ajustes → Sincronizar → Instantáneas de recuperación**.
- **Dispositivos móviles:** aparecen en **Ajustes → Sincronizar → Instantáneas de recuperación**.

Úsalas si restauraste el archivo equivocado o quieres revertir una importación o restauración local.

Las instantáneas solo contienen datos de Mindwtr. No pueden restaurar elementos de origen eliminados de otra aplicación, incluidos los recordatorios borrados de Recordatorios de Apple después de importarlos.

---

## Reglas de validación

Mindwtr valida el archivo JSON elegido antes de restaurar:

- debe ser JSON válido;
- debe coincidir con la estructura de datos de Mindwtr;
- cuando están disponibles, se muestran el número de elementos y los metadatos de la copia;
- las diferencias de versión generan avisos en vez de fallar silenciosamente.

Si la validación falla, se bloquea la restauración y tus datos actuales no cambian.

---

## Qué no hace la restauración

- **No** combina la copia con tus datos locales actuales (para eso está **Combinar copia de seguridad**).
- **No** restaura una sola tarea o un solo proyecto.
- **No** sobrescribe por sí sola los servicios de sincronización remotos hasta el siguiente ciclo de sincronización.

Si usas sincronización, considera la restauración como la sustitución inicial del estado local. Lo que ocurra después dependerá del backend y del dispositivo que se sincronice a continuación.

---

## Restauración y sincronización

Una restauración se trata como una decisión deliberada, no como una edición más que deba combinarse:

- Los registros que contiene la copia se reescriben con una revisión superior a la del servidor remoto, de modo que la versión restaurada gana la siguiente combinación.
- Los registros que el dispositivo conocía pero que la copia no contiene se marcan como eliminados, para que el servidor remoto no los devuelva en la siguiente sincronización.

Ese segundo punto es lo que hace que una restauración se mantenga. Sin él, todo lo creado después de hacer la copia sigue existiendo en el servidor remoto, y la siguiente sincronización interpreta su ausencia como un registro nuevo y lo restaura.

Los registros que este dispositivo nunca vio no se tocan. Si otro dispositivo creó tareas mientras este estaba sin conexión, restaurar una copia aquí no las elimina.

Como la restauración propaga esas eliminaciones a todos los dispositivos sincronizados, restaura en un dispositivo y deja que se sincronice antes de usar los demás.

---

## Consejos

- Conserva exportaciones manuales periódicas además de la sincronización.
- Restaura únicamente copias de confianza.
- Si sincronizas mediante archivos, espera a que el `data.json` correcto termine de replicarse antes de sincronizar otro dispositivo.

Consulta también [Datos y sincronización](/es/data-sync/).
