# Liens Markdown

Mindwtr prend en charge les liens Markdown internes pour renvoyer à des tâches et des projets depuis les notes.

## Syntaxe prise en charge

Utilisez les identifiants Mindwtr stables plutôt que les titres en clair :

```md
[[task:task-id|Quarterly review]]
[[project:project-id|Website launch]]
```

- Les liens `task:` pointent vers une tâche par son identifiant.
- Les liens `project:` pointent vers un projet par son identifiant.
- Le texte après `|` est le libellé affiché dans l’éditeur et l’aperçu.

Lors du rendu, Mindwtr normalise aussi ces jetons en liens Markdown ordinaires :

```md
[Quarterly review](mindwtr://task/task-id)
[Website launch](mindwtr://project/project-id)
```

## Créer des liens

Dans un champ Markdown compatible, saisissez `[[` puis commencez votre recherche.

- La recherche porte sur les titres de tâches et de projets.
- Sur ordinateur, une fenêtre de suggestions flotte près du curseur et passe au-dessus de celui-ci si l’espace manque.
- Sur mobile, les mêmes suggestions apparaissent dans un panneau au-dessus du clavier.
- L’éditeur de tâche exclut la tâche en cours pour éviter qu’elle ne pointe vers elle-même par accident.
- Les liens insérés utilisent toujours le jeton stable `[[task:...|label]]` ou `[[project:...|label]]`.
- Les fragments et blocs de code restent inchangés.

## Emplacements compatibles

- Descriptions de tâches sur ordinateur et mobile
- Notes de projets sur ordinateur et mobile
- Aperçus en lecture seule, détails de tâche développés et rendu « Détails activés » de Focus et des listes sur ordinateur
- Aperçu dans les éditeurs de tâche et de projet sur mobile

## Ce que les liens ne font pas

- Les liens Markdown ne sont que des références de navigation.
- Ils ne créent pas de graphe de dépendances, ne terminent pas automatiquement les tâches liées et ne synchronisent pas l’état des listes de contrôle entre les tâches.

## Comportement de la navigation

- Les liens vers des tâches existantes ouvrent la vue Mindwtr correspondante et mettent la tâche en évidence.
- Les liens vers des projets existants ouvrent la vue Projets et sélectionnent le projet.
- Les liens externes acceptent toujours `http`, `https`, `mailto` et `tel`.

## Éléments supprimés

Si la tâche ou le projet lié a été supprimé :

- Mindwtr affiche le libellé barré ;
- sur ordinateur, une action **Restaurer** apparaît lorsque l’élément supprimé existe encore comme tombstone dans les données locales ;
- si le tombstone n’existe plus, le lien reste un libellé de suppression non interactif.

## Exemple

```md
Prepare launch notes for [[project:project-123|Website launch]]

- [ ] Draft intro copy
- [ ] Review [[task:task-456|homepage checklist]]
```

## Documentation associée

- [Intégration Obsidian](/fr/power-users/obsidian)
- [API principale](/fr/developers/core-api)
