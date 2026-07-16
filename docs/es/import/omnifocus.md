# Importar desde OmniFocus

Mindwtr puede importar exportaciones de OmniFocus para que migres sin reconstruir tu sistema a mano.

## Archivos de origen compatibles

- una exportación **CSV** de OmniFocus;
- una exportación **CSV UTF-16** de OmniFocus;
- un archivo **ZIP** de Omni Automation o Atajos que contenga `OmniFocus.json` y `metadata.json`;
- un solo archivo **JSON** si tu atajo ya combina los datos de las tareas y los metadatos en un documento.

La importación está disponible en escritorio y móvil desde **Ajustes → Datos → Importar desde OmniFocus**.

## Formato de origen recomendado

Si solo necesitas migrar tareas básicas, el CSV de OmniFocus sigue siendo válido.

Para obtener la mayor fidelidad, prefiere la exportación JSON de Omni Automation al CSV. La vía JSON puede conservar reglas de repetición, metadatos de carpetas y más detalles de la jerarquía que el CSV de OmniFocus.

Para una exportación basada en Atajos, la mejor entrada es un ZIP que contenga:

- `OmniFocus.json`;
- `metadata.json`.

Mindwtr detecta automáticamente archivos CSV, JSON y ZIP desde la misma acción de importación.

## Cómo adapta Mindwtr los datos de OmniFocus

Mindwtr adapta las exportaciones de OmniFocus a su modelo, priorizando GTD:

- las carpetas de OmniFocus se convierten en **áreas de Mindwtr** cuando hay metadatos;
- los proyectos de OmniFocus se convierten en **proyectos de Mindwtr**;
- las acciones independientes de OmniFocus quedan fuera de los proyectos para que las proceses después;
- sus etiquetas se convierten en **etiquetas de Mindwtr**;
- sus contextos se convierten en **contextos de Mindwtr** cuando el formato de origen los incluye;
- sus notas se conservan en la descripción importada;
- sus fechas de aplazamiento se convierten en **fechas de inicio**;
- se conservan las fechas límite compatibles y el estado de finalización;
- sus indicadores se convierten en una **señal de prioridad alta**;
- las tareas anidadas sencillas de un solo nivel pueden convertirse en **elementos de una lista de comprobación**;
- las tareas anidadas más complejas o profundas se convierten en tareas normales y conservan la jerarquía original en el título y la descripción;
- las reglas de repetición de Omni Automation se convierten en **recurrencias de Mindwtr** cuando son compatibles.

Mindwtr no tiene actualmente un campo independiente equivalente a la fecha planificada de OmniFocus. Cuando OmniFocus incluye una fecha planificada o una duración, Mindwtr conserva esa información en la descripción importada en lugar de descartarla.

## Datos compatibles de OmniFocus

- nombres de carpetas cuando hay metadatos;
- nombres de proyectos;
- títulos de acciones;
- notas;
- etiquetas;
- contextos cuando los incluye la exportación;
- fechas de aplazamiento o inicio;
- fechas límite;
- estado y fecha de finalización cuando están disponibles;
- estado marcado como señal de prioridad alta;
- recurrencias compatibles de exportaciones JSON de Omni Automation;
- conversión en listas de comprobación de tareas anidadas sencillas.

## Pasos de importación

1. Abre **Importar desde OmniFocus**.
2. Exporta tus datos desde OmniFocus:
   - usa **CSV** si solo necesitas la exportación integrada;
   - usa **JSON de Omni Automation o Atajos** si quieres recurrencias, carpetas y una jerarquía más fiel.
3. Si tu atajo genera `OmniFocus.json` y `metadata.json` por separado, coloca ambos en un solo archivo ZIP.
4. Elige el archivo CSV, JSON o ZIP en Mindwtr.
5. Revisa el resumen de la vista previa.
6. Confirma la importación.

Mindwtr guarda una instantánea de recuperación antes de importar para que puedas volver atrás si es necesario.

## Limitaciones actuales

- Las bases de datos nativas `.ofocus` de OmniFocus no se importan directamente.
- No se importan exportaciones HTML ni de texto sin formato.
- Las exportaciones CSV pierden más información que las JSON de Omni Automation, en especial sobre recurrencias y anidamiento.
- Las fechas planificadas y las duraciones se conservan como texto en la descripción, en lugar de asignarse a campos específicos.
- Las tareas anidadas con fechas, notas, etiquetas o recurrencias propias se convierten en tareas normales en vez de elementos de una lista de comprobación.
- Si solo importas `OmniFocus.json` sin los metadatos correspondientes, pueden faltar metadatos de etiquetas, carpetas o proyectos.

## Consejos

- Empieza con una exportación pequeña de OmniFocus si quieres validar primero la correspondencia.
- Si usas la exportación mediante Atajos, conserva `OmniFocus.json` y `metadata.json` juntos en un ZIP para obtener una importación más limpia.
- Si tienes tanto acciones de proyecto como acciones independientes de la bandeja de entrada, Mindwtr conserva esa separación.
- Si las recurrencias son importantes, prefiere la vía JSON/ZIP de Omni Automation al CSV.
- Revisa las tareas importadas con prioridad alta si usabas mucho los indicadores de OmniFocus.
- Conserva la instantánea de recuperación hasta comprobar que la importación es correcta.
