# Intégration Obsidian

Mindwtr peut importer des tâches depuis un coffre Obsidian sur ordinateur, les actualiser lorsque les fichiers changent, rouvrir la note source dans Obsidian et effectuer une réécriture strictement limitée pour les formats de tâches pris en charge.

À lire aussi : [Liens Markdown](/fr/use/markdown-links)

## Portée actuelle

La prise en charge actuelle d’Obsidian sur ordinateur comprend :

- uniquement sur ordinateur
- surveillance automatique des fichiers avec actualisation incrémentielle
- nouvelle analyse manuelle comme solution de repli
- liens profonds vers la note source avec `obsidian://`
- réécriture limitée pour les formats de tâches pris en charge
- prise en charge des tâches Markdown intégrées standard
- prise en charge des références internes de tâches/projets Markdown de Mindwtr
- prise en charge des fichiers TaskNotes

Éléments hors périmètre :

- accès au coffre sur mobile
- utilisation d’Obsidian comme système de synchronisation Mindwtr
- réécriture ou restructuration générale des notes
- Dataview comme format de tâche principal
- extension Obsidian complète

## Philosophie

L’intégration Obsidian est une intégration externe fondée sur les fichiers, et non un nouveau système de synchronisation Mindwtr.

Le moteur de synchronisation de Mindwtr s’articule autour de `data.json`, tandis qu’Obsidian repose sur des notes. Pour éviter les conflits destructeurs et les modifications inattendues, Mindwtr lit directement les fichiers du coffre et maintient volontairement un accès en écriture limité.

## Configuration

Sur ordinateur :

1. Ouvrez **Réglages -> Intégrations**
2. Repérez **Coffre Obsidian**
3. Sélectionnez le dossier de votre coffre. Les coffres enregistrés dans Obsidian sont détectés et proposés en un clic ; la sélection manuelle reste disponible pour tous les autres cas
4. Activez l’intégration
5. Vous pouvez limiter l’analyse à certains dossiers
6. Vous pouvez définir le fichier de boîte de réception pour les tâches intégrées, par défaut `Mindwtr/Inbox.md`
7. Vous pouvez choisir d’inclure ou non les fichiers TaskNotes archivés
8. Vous pouvez choisir le format des nouvelles tâches : `auto`, `inline` ou `tasknotes`
9. Enregistrez, puis exécutez **Analyser de nouveau le coffre** une fois

Après l’analyse initiale, Mindwtr surveille le coffre et actualise automatiquement les fichiers modifiés. Le bouton de nouvelle analyse manuelle reste disponible comme solution de récupération si la surveillance manque un événement ou si un dossier synchronisé met du temps à s’actualiser.

Si le dossier sélectionné ne contient pas de répertoire `.obsidian/`, Mindwtr affiche un avertissement, mais vous permet tout de même d’enregistrer le chemin.

## Formats de tâches pris en charge

### Tâches Markdown intégrées

Si la portée analysée ne contient pas de fichiers TaskNotes, Mindwtr importe les cases à cocher Markdown standard :

```md
- [ ] Incomplete task
- [x] Completed task
```

Mindwtr conserve :

- l’indentation des tâches imbriquées
- les étiquettes intégrées comme `#work` ou `#project/alpha`
- les liens wiki comme `[[Meeting Notes]]`
- les étiquettes du frontmatter YAML au niveau de la note

Les tâches intégrées importées affichent :

- le texte de la tâche
- l’état d’achèvement
- le chemin de la note source et le numéro de ligne
- une action **Ouvrir dans Obsidian**

### TaskNotes

Mindwtr prend également en charge [TaskNotes](https://tasknotes.dev/), qui stocke une tâche par fichier Markdown avec un frontmatter YAML.

Exemple :

```md
---
tags:
  - task
title: Review quarterly report
status: in-progress
priority: high
due: 2025-01-15
scheduled: 2025-01-14
contexts:
  - "@office"
projects:
  - "[[Q1 Planning]]"
timeEstimate: 120
---
## Notes
Key points to review
```

Lorsque des fichiers TaskNotes sont détectés dans la portée analysée, Mindwtr considère TaskNotes comme la source de vérité des tâches Obsidian importées et n’importe **pas** en plus des listes de contrôle intégrées quelconques depuis d’autres notes. Cela évite de transformer des listes de contrôle ordinaires en tâches pour les utilisateurs de TaskNotes.

Mindwtr importe actuellement des champs TaskNotes tels que :

- titre
- statut / état d’achèvement
- priorité
- dates d’échéance et planifiées
- étiquettes
- contextes
- projets
- estimation de durée
- court aperçu du corps de la note

Mindwtr ignore les fichiers de vue/configuration TaskNotes, et les fichiers TaskNotes archivés sont masqués par défaut, sauf si vous les activez dans les réglages.

## Surveillance et actualisation des fichiers

Mindwtr surveille le coffre configuré sur ordinateur et analyse de nouveau uniquement les fichiers Markdown modifiés au lieu de réanalyser l’intégralité du coffre à chaque fois.

Ainsi :

- les modifications effectuées dans Obsidian apparaissent automatiquement dans Mindwtr
- la suppression de fichiers sources retire les tâches importées correspondantes
- le renommage de fichiers se comporte comme une suppression suivie d’une création
- les enregistrements rapides sont regroupés avant l’actualisation

Si une modification franchit la limite entre tâches intégrées et TaskNotes, Mindwtr revient à une nouvelle analyse complète afin que le mode d’importation reste cohérent.

## Comportement de la réécriture

La réécriture est volontairement limitée.

### Tâches intégrées

Lorsque vous basculez l’état d’une tâche Obsidian intégrée importée dans Mindwtr, Mindwtr ne met à jour que le marqueur de case à cocher sur la ligne de cette tâche :

- `- [ ]` -> `- [x]`
- `- [x]` -> `- [ ]`

Mindwtr ne réécrit pas le reste de la note. Si le numéro de ligne enregistré n’est plus à jour, l’application tente de retrouver le texte de la tâche dans le fichier. En cas de correspondances ambiguës, l’opération échoue sans risque.

### Tâches TaskNotes

Lorsque vous basculez l’état d’une tâche TaskNotes importée dans Mindwtr, Mindwtr met à jour le statut dans le frontmatter au lieu de modifier le texte du corps de la note. L’application peut également ajouter ou supprimer `completedDate` dans le cadre de la même écriture sécurisée.

Mindwtr ne reformate pas l’intégralité du fichier et ne réécrit pas les champs sans rapport.

### Création de nouvelles tâches

De nouvelles tâches Obsidian peuvent être créées de deux façons :

- `inline` : ajouter une nouvelle ligne `- [ ] ...` à la note de boîte de réception configurée
- `tasknotes` : créer un nouveau fichier Markdown TaskNotes
- `auto` : suivre le mode d’importation détecté dans le coffre

La création reste ainsi cohérente avec le format déjà utilisé.

## Éléments ignorés

Mindwtr ignore :

- `.obsidian/`
- `.trash/`
- les fichiers/dossiers cachés
- `node_modules/`
- les fichiers Markdown inhabituellement volumineux
- les fichiers de vue/configuration TaskNotes

## Liens profonds

Mindwtr ouvre les notes sources à l’aide du schéma d’URI d’Obsidian :

```text
obsidian://open?vault=VAULT_NAME&file=RELATIVE_PATH_WITHOUT_MD
```

Vous pouvez ainsi consulter le contexte dans Obsidian sans copier manuellement les chemins de fichiers.

## Limites actuelles

- uniquement sur ordinateur
- les champs intégrés de type Dataview comme `[due:: ...]` ne sont pas encore analysés
- l’actualisation fondée sur la surveillance conserve la nouvelle analyse manuelle comme solution de repli
- si des fichiers TaskNotes sont présents, Mindwtr désactive volontairement l’importation des listes de contrôle intégrées génériques dans la portée analysée

## Suites prévues

- compatibilité facultative avec Dataview
- étude de faisabilité sur mobile
- éventuelle extension Obsidian dans un dépôt distinct

## Voir aussi

- [Données et synchronisation](/fr/data-sync/)
- [Intégration du calendrier](/fr/use/calendar-integration)
