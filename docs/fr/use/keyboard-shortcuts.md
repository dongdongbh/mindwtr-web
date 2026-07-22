# Raccourcis clavier sur ordinateur

Mindwtr sur ordinateur permet une utilisation centrée sur le clavier avec les préréglages Standard (façon Gmail ou Todoist), Vim et Emacs. Appuyez sur `?` dans l’application pour afficher l’aide correspondant au préréglage actif.

## Prise en main rapide

- Choisissez le préréglage dans **Paramètres -> Général -> Raccourcis clavier**.
- Appuyez sur `?` pour afficher la fiche des raccourcis actifs. Elle se termine par un tableau de la syntaxe d’ajout rapide qui recense tous les jetons (`/start:`, `/note:`, `@context`, `+Project`, …).
- Utilisez `/` pour rechercher.
- Utilisez `gi` pour la Boîte de réception, `gn` pour les Prochaines actions et `gf` pour Focus dans les modes Standard et Vim.
- Utilisez `a` pour ajouter une tâche lorsque Mindwtr a le focus. `o` déclenche toujours la même action limitée à l’application.
- Utilisez `j` et `k` pour déplacer la sélection, puis `Enter` pour ouvrir la tâche sélectionnée.
- En mode Standard, utilisez `e` pour terminer, `x` pour sélectionner des tâches en vue d’actions groupées, `S` pour ajouter ou retirer la tâche sélectionnée du focus du jour, `F2` pour la renommer, `Shift+Enter` pour modifier, `#` pour supprimer et `z` pour annuler.
- En mode Vim, utilisez `e` pour modifier, `x` pour basculer l’état terminé et `dd` pour supprimer.
- Utilisez `Ctrl+Z` ou `Cmd+Z` pour annuler la dernière tâche terminée ou supprimée, quel que soit le préréglage.
- Utilisez `s` suivi d’une lettre pour définir le statut de la tâche sélectionnée : `si` Boîte de réception, `sn` Prochaine action, `sw` En attente, `ss` Un jour, `sd` Terminé, `sa` Archivé. Une notification confirme la modification et propose de l’annuler.
- Utilisez `Insert` pour atteindre le champ d’ajout de tâche ; l’ajout rapide s’ouvre dans les vues qui n’en ont pas.
- Appuyez sur `1` à `9` (hors de tout champ de texte) pour choisir un domaine selon son ordre dans la barre latérale, et sur `0` pour supprimer le filtre de domaine ; le raccourci `Shift+A` suivi du chiffre fonctionne toujours aussi. La touche `a` seule ouvre l’ajout rapide.
- Utilisez `Ctrl+Alt+S` pour lancer une synchronisation manuelle sur ordinateur.
- Dans le menu contextuel ouvert par clic droit ou `Shift+F10` : ↑/↓ parcourent les éléments, → ouvre un sous-menu et ← revient en arrière, Entrée active l’élément, Échap ferme le menu et rend le focus à la tâche.

Les raccourcis susceptibles d’entrer en conflit avec la saisie sont ignorés lorsque vous écrivez dans un champ modifiable.

Le guide pour ordinateur reste la référence pour les tableaux de raccourcis à jour, la personnalisation de l’ajout rapide, les remarques sur le clavier et les cas particuliers.

## Ajout rapide global

Modifiez ou désactivez le raccourci global d’ajout rapide dans **Paramètres -> Général -> Saisie**. Les raccourcis globaux dépendent des autorisations de la plateforme et du mode d’installation.

Le raccourci global d’ajout rapide diffère de `a`, qui ne fonctionne que dans l’application. Le raccourci global peut être déclenché depuis d’autres applications ; `a` ne fonctionne que lorsque Mindwtr a le focus et que vous n’écrivez pas dans un champ texte.

## Voir aussi

- [Guide pour ordinateur](/fr/use/desktop)
- [Bien démarrer](/fr/start/getting-started)
