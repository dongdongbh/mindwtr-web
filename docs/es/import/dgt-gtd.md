# Importar desde DGT GTD

Mindwtr puede importar exportaciones de DGT GTD para que migres sin reconstruir tu sistema a mano.

Fuentes compatibles:

- una exportación **JSON** de DGT GTD;
- un archivo **ZIP** de DGT GTD que contenga el JSON exportado.

La importación está disponible en escritorio y móvil desde **Ajustes → Datos → Importar desde DGT GTD**.

---

## Qué se importa

Mindwtr adapta las exportaciones de DGT GTD a su modelo, priorizando GTD:

- las carpetas de DGT se convierten en **áreas de Mindwtr**;
- los proyectos de DGT se convierten en **proyectos de Mindwtr**;
- las listas de comprobación de DGT se convierten en **tareas con lista de comprobación**;
- sus elementos permanecen como **elementos de la lista de comprobación**;
- los contextos de DGT se convierten en **contextos**;
- las etiquetas de DGT se convierten en **etiquetas**.

Las tareas conservan el estado correspondiente cuando Mindwtr puede representarlo de forma segura. Las tareas independientes de DGT pueden quedar fuera de los proyectos para que las organices después, sin imponer estructura adicional durante la importación.

---

## Datos compatibles de DGT

- títulos de tareas;
- notas y descripciones;
- prioridades;
- fechas límite;
- elementos de listas de comprobación;
- carpetas, proyectos, contextos y etiquetas;
- tareas completadas;
- reglas de repetición compatibles, como calendarios simples diarios, semanales, mensuales y anuales, además de algunas repeticiones por intervalo.

Los patrones de repetición de DGT no compatibles se importan una vez y el texto de repetición original se conserva en la descripción, para que ajustes manualmente la recurrencia en Mindwtr.

---

## Proceso de importación

1. Abre **Importar desde DGT GTD**.
2. Elige un archivo JSON o ZIP de DGT GTD.
3. Revisa el resumen de la vista previa.
4. Confirma la importación.

Antes de importar, Mindwtr guarda, cuando es posible, una instantánea de recuperación de tus datos locales actuales.

Después de importar:

- se crean las áreas y los proyectos necesarios;
- las tareas independientes quedan disponibles para organizarlas más adelante;
- se muestran avisos sobre asignaciones de repetición con pérdida o entradas omitidas del archivo.

---

## Notas sobre las exportaciones ZIP

Mindwtr lee la primera exportación JSON válida de DGT que encuentre dentro del archivo.

Mindwtr omite:

- archivos ZIP anidados;
- archivos que no sean JSON dentro del archivo;
- archivos JSON mal formados que no pueda analizar de forma segura.

---

## Consejos

- Empieza con una exportación de DGT GTD pequeña si quieres validar primero la correspondencia.
- Conserva la instantánea de recuperación hasta comprobar que la importación es correcta.
- Si importas dos veces la misma exportación, puedes duplicar tareas.

Consulta también [Datos y sincronización](/es/data-sync/) y [Copias de seguridad y restauración](/es/data-sync/backup-restore).
