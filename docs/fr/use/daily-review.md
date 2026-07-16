# Revue quotidienne

La revue quotidienne est une remise à niveau légère qui vous permet de rester à jour entre deux revues hebdomadaires. Elle se trouve dans la vue Revue sur ordinateur et sur l’écran de revue quotidienne sur mobile.

L’objectif n’est pas de tout ranger. Quelques minutes suffisent à rapprocher ce que disent vos listes de la réalité du moment. Vous pouvez alors leur faire confiance pour le reste de la journée, sans garder les boucles ouvertes en tête.

## Déroulement

L’ordre par défaut est le suivant :

1. Aujourd’hui et Calendrier
2. Boîte de réception, uniquement si elle contient des tâches actives
3. En attente
4. Priorités du jour, si cette étape est activée
5. Terminer

La boîte de réception et En attente précèdent volontairement les priorités : vous clarifiez d’abord les nouvelles captures, puis pouvez faire passer à Prochaine action les éléments qui ne sont plus bloqués. Ils deviennent ainsi des candidats lorsque vous choisissez les priorités du jour. Les étapes vides sont ignorées.

## Paramètres

L’étape des priorités est contrôlée par :

```typescript
settings.gtd.dailyReview.includeFocusStep
```

Sur ordinateur et mobile, ce réglage apparaît sous le nom « Inclure l’étape Focus » dans les paramètres GTD. L’étape est affichée par défaut. Définissez la valeur sur `false` pour raccourcir le parcours à Aujourd’hui, Boîte de réception et En attente.

Paramètres associés :

| Paramètre | Rôle |
| --- | --- |
| `settings.gtd.defaultScheduleTime` | Préremplit les champs de planification manuelle. |
| `settings.weekStart` | Détermine la disposition des semaines du calendrier. |
| `settings.calendar.viewMode` | Enregistre le mode d’affichage du calendrier utilisé ailleurs dans l’application. |

## Comportement sur ordinateur

Pendant que la fenêtre modale est ouverte, la version ordinateur conserve l’étape actuelle de la revue dans le stockage local. Fermer puis rouvrir la fenêtre reprend à la même étape ; terminer la revue efface l’étape enregistrée.

Les lignes de tâches utilisent les actions rapides et les détails de tâche habituels, notamment les actions de domaine et de projet lorsqu’elles sont disponibles.

## Comportement sur mobile

La version mobile utilise le même paramètre GTD pour l’étape Focus et présente la revue comme un écran à part entière. Son intention et ses étapes sont les mêmes que sur ordinateur, avec des commandes de navigation adaptées au mobile.

## Pages associées

- [Revue hebdomadaire](/fr/use/weekly-review)
- [Flux GTD dans Mindwtr](/fr/use/gtd-workflow)
- [Intégration du calendrier](/fr/use/calendar-integration)
