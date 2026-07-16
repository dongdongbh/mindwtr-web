# Copias de seguridad y restauración

Mindwtr guarda localmente tus datos de trabajo y permite exportar copias JSON para trasladarlos, repararlos o migrarlos.

La restauración está diseñada como un proceso de **sustitución de datos locales**:

- eliges un archivo JSON de copia de seguridad;
- Mindwtr lo valida antes de cambiar nada;
- cuando es posible, crea primero una instantánea de recuperación;
- la copia elegida sustituye el conjunto de datos local actual.

Así la restauración es sencilla y predecible. No es una operación de combinación.

---

## Exportar una copia de seguridad

### Escritorio

1. Abre **Ajustes → Datos**.
2. En **Transferencia de datos**, elige **Exportar copia de seguridad**.
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
2. En **Transferencia de datos**, elige **Restaurar copia de seguridad**.
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

## Instantáneas de recuperación

Mindwtr crea automáticamente instantáneas de recuperación antes de restaurar e importar.

- **Escritorio:** aparecen en **Ajustes → Sincronizar → Instantáneas de recuperación**.
- **Dispositivos móviles:** aparecen en **Ajustes → Sincronizar → Instantáneas de recuperación**.

Úsalas si restauraste el archivo equivocado o quieres revertir una importación o restauración local.

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

- **No** combina la copia con tus datos locales actuales.
- **No** restaura una sola tarea o un solo proyecto.
- **No** sobrescribe por sí sola los servicios de sincronización remotos hasta el siguiente ciclo de sincronización.

Si usas sincronización, considera la restauración como la sustitución inicial del estado local. Lo que ocurra después dependerá del backend y del dispositivo que se sincronice a continuación.

---

## Consejos

- Conserva exportaciones manuales periódicas además de la sincronización.
- Restaura únicamente copias de confianza.
- Si sincronizas mediante archivos, espera a que el `data.json` correcto termine de replicarse antes de sincronizar otro dispositivo.

Consulta también [Datos y sincronización](/es/data-sync/).
