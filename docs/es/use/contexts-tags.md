# Contextos y etiquetas

Los contextos te ayudan a ver qué puedes hacer **ahora mismo** según dónde estés, qué herramientas tengas o qué estado mental necesites.

---

## ¿Qué son los contextos?

En GTD, un contexto es una condición necesaria para completar una tarea: una ubicación, una herramienta o una persona.

Cuando filtras por contexto, solo ves las tareas que realmente puedes hacer en tu situación actual.

## Contextos frente a Áreas

Este es uno de los conceptos de GTD que resulta más fácil confundir al principio.

| Concepto     | Pregunta que responde                                 | ¿Cambia a menudo? | Ejemplos                      |
| ----------- | --------------------------------------------------- | -------------- | ----------------------------- |
| **Contexto** | ¿Qué puedo hacer ahora mismo, donde estoy y con lo que tengo? | Sí            | `@computer`, `@phone`, `@home` |
| **Área**    | ¿De qué responsabilidad continua forma parte esto?        | No             | Trabajo, Hogar, Salud, Finanzas  |

La diferencia clave:

- Los **Contextos** tratan sobre *restricciones de ejecución*. Cambian a lo largo del día.
- Las **Áreas** tratan sobre *grupos de responsabilidades*. Se mantienen mientras exista esa parte de tu vida o trabajo.

### Ejemplo: trabajo para contratistas o clientes

Si trabajas con varios clientes, usar un **Área** para cada cliente puede ser completamente razonable.

- **Área:** Cliente A
- **Proyecto:** Migración del backend
- **Tarea:** Revisar la especificación de la API
- **Contexto:** `@computer`

Esto te permite responder dos preguntas diferentes:

- Filtra por **Área** cuando quieras ver todo lo relacionado con un cliente.
- Filtra por **Contexto** cuando quieras ver qué puedes hacer ahora mismo, independientemente del cliente.

Para crear o editar Áreas directamente, consulta [Áreas y personas](/es/use/areas-people).

---

## Contextos de ubicación (@)

Mindwtr incluye estos contextos de ubicación predefinidos:

| Contexto     | Cuándo usarlo                                 |
| ----------- | ---------------------------------------- |
| `@home`     | Tareas que requieren estar en casa         |
| `@work`     | Tareas para la oficina o el lugar de trabajo           |
| `@errands`  | Tareas mientras estás fuera (compras, citas) |
| `@agendas`  | Temas de conversación para reuniones o llamadas   |
| `@computer` | Tareas que requieren un ordenador               |
| `@phone`    | Tareas que requieren llamadas telefónicas              |
| `@anywhere` | Tareas sin requisitos de ubicación       |

### Ejemplos

- `Llamar a mamá @phone`
- `Arreglar el grifo que gotea @home`
- `Comprar material de oficina @errands`
- `Desplegar la actualización @computer @work`

---

## Etiquetas (#)

Mindwtr incluye etiquetas para filtrar por estado mental, modo o tema:

| Etiqueta          | Cuándo usarla                          |
| ------------ | --------------------------------- |
| `#focused`   | Trabajo profundo que requiere concentración |
| `#lowenergy` | Tareas sencillas para momentos de cansancio    |
| `#creative`  | Lluvia de ideas o ideación         |
| `#routine`   | Tareas repetitivas o mecánicas       |

### Ejemplos

- `Escribir propuesta #focused @computer`
- `Archivar recibos #lowenergy @home`
- `Idear propuestas para la campaña #creative`
- `Procesar gastos #routine @computer`

### ¿Por qué usar etiquetas?

Tu productividad varía a lo largo del día:
- **Por la mañana:** mucha concentración; aborda tareas con #focused
- **Después de comer:** poca energía; haz tareas con #lowenergy o #routine
- **Momento creativo:** cuando tengas inspiración, trabaja en tareas con #creative

---

## Usar contextos en Mindwtr

### Añadir contextos

**Sintaxis de adición rápida:**
```
Título de la tarea @context1 @context2
Investigar un tema #focused @computer
```
Los nombres de contextos y etiquetas aceptan letras y números Unicode (incluidos caracteres CJK y caracteres acentuados).

**Editar tarea:**
1. Abre el editor de tareas
2. Añade contextos en el campo Contextos (separados por comas)

### Filtrar por contexto

**Escritorio:**
1. Ve a la vista **Próximas acciones** o **Contextos**
2. Haz clic en la ficha de un contexto para filtrar

**Móvil:**
1. Ve a la pestaña **Próximas acciones** o a **Contextos** desde el menú lateral
2. Toca un contexto para filtrar

### Agrupar por contextos o etiquetas

Las barras de herramientas de las listas de tareas también incluyen un control **Agrupar**. Úsalo para agrupar listas por contexto, área, proyecto o etiqueta al revisar una lista más grande de Bandeja de entrada, En espera, Algún día/Quizá, Referencia, Hechas o Próximas acciones.

Agrupar por etiqueta resulta útil si prefieres un flujo de trabajo centrado en etiquetas y las usas como capa principal de clasificación.

---

## Contextos personalizados

Puedes crear tus propios contextos:

- `@Bob`: Temas que tratar con Bob
- `@waiting-on-vendor`: Esperando la respuesta del proveedor
- `@car`: Cosas que hacer en el coche
- `@morning`: Elementos de la rutina matutina

### Crear contextos personalizados

Simplemente escribe el nuevo contexto al añadir una tarea:
```
Revisar contrato @legal
```

El contexto se añadirá y estará disponible para filtrar.

### Gestionar contextos y etiquetas guardados

Cuando quieras ordenar o cambiar el nombre de metadatos reutilizables:

- Abre **Ajustes → Gestionar**
- Edita **Contextos**, **Etiquetas**, **Áreas** y **Personas** desde un mismo lugar
- Úsalo para combinar duplicados, estandarizar nombres o eliminar valores que ya no utilizas

Las Áreas y las Personas también se pueden crear mientras las asignas. Escribe en el selector **Área** o en el campo **Asignado a** y, después, elige **Crear** o **Nueva persona** cuando no haya una coincidencia exacta.

### Edición masiva de contextos

En el escritorio, puedes actualizar los contextos de muchas tareas a la vez:

1. Entra en el modo **Seleccionar** en una vista de lista
2. Elige las tareas que quieras editar
3. Usa **Añadir contexto** o **Eliminar contexto** en la barra de acciones masivas

Esto resulta útil cuando quieres reclasificar un lote completo de tareas después de una revisión semanal o una sesión de planificación de proyectos.

---

## Contextos y etiquetas jerárquicos

Organiza los contextos con una estructura anidada mediante la notación con barras:

| Sintaxis            | Tarea de ejemplo                |
| ----------------- | --------------------------- |
| `@work/meetings`  | Preparar reunión @work/meetings |
| `@home/garage`    | Arreglar estante @home/garage      |
| `#health/fitness` | Carrera matutina #health/fitness |
| `#work/admin`     | Archivar informes #work/admin    |

### Filtrado que incluye los elementos secundarios del elemento superior

Cuando filtras por un contexto superior, se incluyen todos sus elementos secundarios:

| Filtro    | Muestra                                        |
| --------- | -------------------------------------------- |
| `@work`   | `@work`, `@work/meetings`, `@work/calls`     |
| `#health` | `#health`, `#health/fitness`, `#health/diet` |

Esto permite filtrar a alto nivel y mantener al mismo tiempo una organización específica.

### Ventajas

- **Organización**: agrupa contextos relacionados sin saturar la lista
- **Flexibilidad**: filtra de manera general o específica
- **Compatibilidad con versiones anteriores**: los contextos simples siguen funcionando con normalidad

---

## Prácticas recomendadas para los contextos

### Empieza de forma sencilla

Comienza con unos pocos contextos:
- @home
- @work
- @errands
- @computer

Añade más solo cuando sea necesario.

### Mantén la coherencia

Usa siempre la misma ortografía y el mismo formato:
- ✓ `@home` (siempre)
- ✗ `@Home`, `@house`, `home`

### Combina contextos

Las tareas pueden tener varios contextos:
- `@computer @work`: requiere un ordenador en el trabajo
- `@phone @anywhere`: llamada telefónica desde cualquier lugar
- `#focused @home`: trabajo profundo en casa

### Contextos de personas

Añade contextos de personas para temas de una agenda:
```
Hablar sobre el calendario del proyecto @Sarah
Preguntar por el presupuesto @manager
```

Cuando veas a Sarah, busca `@Sarah` para encontrar todos los elementos.

---

## Flujo de trabajo con contextos

### Planificación matutina

1. Comprueba dónde estarás hoy
2. Filtra Próximas acciones por el contexto pertinente
3. Elige tus tareas prioritarias

### Cambio de ubicación

Cuando cambies de ubicación:
1. Filtra por el nuevo contexto (@work → @home)
2. Consulta qué puedes hacer aquí
3. Elige la siguiente tarea

### Interacción inesperada

Cuando alguien llame o te visite de forma inesperada:
1. Busca su nombre/contexto
2. Revisa los temas de la agenda
3. Aborda los elementos en espera

---

## Contextos frente a etiquetas

En Mindwtr, tanto los `@contexts` como las `#tags` pueden filtrar tareas, pero responden preguntas diferentes:

| Símbolo | Qué responde               | Uso habitual                          | Ejemplos                   |
| ------ | ----------------------------- | ------------------------------------ | -------------------------- |
| `@`    | ¿Dónde/con qué puedo hacerlo?  | Restricción de ubicación, herramienta o persona | @home, @work, @phone       |
| `#`    | ¿De qué trata?           | Tema, energía, modo o etiqueta        | #focused, #lowenergy       |

### Orientación práctica

- Usa los **contextos `@`** como *filtros de ejecución* (los lugares, herramientas o personas que necesitas).
- Usa las **etiquetas `#`** para *clasificar* (nivel de energía, tema o agrupación entre proyectos).
- Ambos admiten **jerarquías** (por ejemplo, `@work/meetings`, `#health/fitness`).

---

## Consulta también

- [Flujo de trabajo GTD en Mindwtr](/es/use/gtd-workflow)
- [Áreas y personas](/es/use/areas-people)
- [Guía de usuario para escritorio](/es/use/desktop)
- [Guía de usuario para móvil](/es/use/mobile)
