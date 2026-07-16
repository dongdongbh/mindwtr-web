# Revisión diaria

La Revisión diaria es el breve proceso de puesta al día entre revisiones semanales. Aparece en la vista Revisión del escritorio y como ruta de revisión diaria en dispositivos móviles.

El objetivo no es ordenar por ordenar. Unos minutos bastan para cerrar la distancia entre lo que dicen tus listas y la realidad actual. Así podrás confiar en ellas el resto del día en vez de mantener los asuntos pendientes en la cabeza.

## Flujo

El orden predeterminado es:

1. Hoy y Calendario.
2. Bandeja de entrada, solo si contiene tareas activas.
3. En espera.
4. Foco de hoy, cuando está activado.
5. Finalizar.

La Bandeja de entrada y En espera aparecen deliberadamente antes del foco: primero se aclaran las capturas nuevas y los elementos que se han desbloqueado pueden pasar de En espera a Próxima. Así estarán disponibles cuando elijas el foco de hoy. Los pasos vacíos se omiten.

## Ajustes

El paso de foco se controla mediante:

```typescript
settings.gtd.dailyReview.includeFocusStep
```

El escritorio y los dispositivos móviles lo muestran como el ajuste «Incluir el paso Foco» dentro de los ajustes de GTD. El paso aparece de forma predeterminada. Establece el valor en `false` para usar el flujo más breve Hoy/Bandeja de entrada/En espera.

Ajustes relacionados:

| Ajuste | Función |
| --- | --- |
| `settings.gtd.defaultScheduleTime` | Rellena de antemano los campos de planificación manual. |
| `settings.weekStart` | Controla la disposición semanal del calendario. |
| `settings.calendar.viewMode` | Guarda el modo de vista del calendario usado en el resto de la aplicación. |

## Comportamiento en escritorio

Mientras el cuadro de revisión está en curso, el escritorio conserva el paso actual en el almacenamiento local. Al cerrarlo y volverlo a abrir se reanuda el mismo paso; al terminar la revisión se borra el paso guardado.

Las filas de tareas dentro de la revisión usan las acciones rápidas y los controles de detalles habituales, incluidas las acciones de área y proyecto cuando están disponibles.

## Comportamiento en dispositivos móviles

La versión móvil usa el mismo ajuste GTD para el paso de foco y presenta la revisión como una pantalla de ruta completa. Comparte la finalidad de los pasos con el flujo de escritorio, con controles de navegación propios del móvil.

## Páginas relacionadas

- [Revisión semanal](/es/use/weekly-review)
- [Flujo de trabajo GTD en Mindwtr](/es/use/gtd-workflow)
- [Integración con calendarios](/es/use/calendar-integration)
