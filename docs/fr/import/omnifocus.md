# Importer depuis OmniFocus

Mindwtr peut importer les exports OmniFocus pour vous permettre de migrer sans reconstruire votre système à la main.

## Fichiers sources pris en charge

- un export OmniFocus **CSV** ;
- un export OmniFocus **CSV UTF-16** ;
- une archive **ZIP** Omni Automation ou Shortcuts contenant `OmniFocus.json` et `metadata.json` ;
- un fichier **JSON** unique si votre raccourci regroupe déjà les données des tâches et les métadonnées dans un même document.

L’import est disponible sur ordinateur et mobile dans **Paramètres → Données → Importer depuis OmniFocus**.

## Format source recommandé

Si vous souhaitez seulement migrer les tâches de base, le CSV d’OmniFocus convient toujours.

Pour une fidélité optimale, préférez l’export JSON d’Omni Automation au CSV. Le JSON peut préserver les règles de répétition, les métadonnées des dossiers et davantage de détails hiérarchiques que le CSV d’OmniFocus.

Pour un export fondé sur un raccourci, l’idéal est un fichier ZIP contenant :

- `OmniFocus.json` ;
- `metadata.json`.

La même action d’import permet à Mindwtr de détecter automatiquement les fichiers CSV, JSON et ZIP.

## Correspondance des données OmniFocus dans Mindwtr

Mindwtr transpose les exports OmniFocus dans son modèle en privilégiant GTD :

- les dossiers OmniFocus deviennent des **domaines Mindwtr** lorsque les métadonnées sont disponibles ;
- les projets OmniFocus deviennent des **projets Mindwtr** ;
- les actions OmniFocus indépendantes restent hors des projets pour que vous puissiez les traiter plus tard ;
- les tags OmniFocus deviennent des **tags Mindwtr** ;
- les contextes OmniFocus deviennent des **contextes Mindwtr** lorsque le format source les contient ;
- les notes OmniFocus sont conservées dans la description importée ;
- les dates différées d’OmniFocus deviennent des **dates de début** ;
- les échéances prises en charge et l’état d’achèvement sont conservés ;
- les indicateurs OmniFocus deviennent un **indice de priorité élevée** ;
- les tâches imbriquées simples sur un seul niveau peuvent devenir des **éléments de liste de contrôle** ;
- les imbrications plus riches ou plus profondes sont aplaties en tâches normales, avec la hiérarchie d’origine conservée dans le titre et la description ;
- les règles de répétition Omni Automation deviennent des **récurrences Mindwtr** lorsqu’elles sont prises en charge.

Mindwtr ne dispose pas actuellement d’un champ de date planifiée distinct comme OmniFocus. Lorsqu’OmniFocus fournit une date planifiée ou une durée sous forme de texte, Mindwtr conserve cette information dans la description importée au lieu de la supprimer.

## Données OmniFocus prises en charge

- noms de dossiers lorsque les métadonnées sont disponibles ;
- noms de projets ;
- titres des actions ;
- notes ;
- tags ;
- contextes lorsque l’export les contient ;
- dates différées ou de début ;
- échéances ;
- état et date d’achèvement lorsqu’ils sont disponibles ;
- état « signalé » comme indice de priorité élevée ;
- récurrences prises en charge dans les exports JSON Omni Automation ;
- conversion en liste de contrôle des tâches imbriquées simples.

## Étapes de l’import

1. Ouvrez **Importer depuis OmniFocus**.
2. Exportez vos données depuis OmniFocus :
   - utilisez **CSV** si l’export intégré vous suffit ;
   - utilisez le **JSON Omni Automation ou Shortcuts** pour conserver les récurrences, les dossiers et une hiérarchie plus fidèle.
3. Si votre raccourci produit séparément `OmniFocus.json` et `metadata.json`, placez les deux fichiers dans une même archive ZIP.
4. Choisissez le fichier CSV, JSON ou ZIP dans Mindwtr.
5. Examinez l’aperçu récapitulatif.
6. Confirmez l’import.

Mindwtr enregistre un instantané de récupération avant l’import, afin que vous puissiez revenir en arrière si nécessaire.

## Limites actuelles

- Les bases de données OmniFocus natives `.ofocus` ne sont pas importées directement.
- Les exports HTML et texte brut ne sont pas importés.
- Les exports CSV restent moins fidèles que l’export JSON Omni Automation, notamment pour les récurrences et l’imbrication.
- Les dates planifiées et les durées sont conservées dans le texte de la description au lieu d’être associées à des champs dédiés.
- Les tâches imbriquées possédant leurs propres dates, notes, tags ou récurrences sont aplaties au lieu d’être converties en éléments de liste de contrôle.
- Si vous importez uniquement `OmniFocus.json` sans les métadonnées correspondantes, certaines informations de tag, dossier ou projet peuvent manquer.

## Conseils

- Commencez par un petit export OmniFocus si vous souhaitez d’abord valider la correspondance.
- Si vous utilisez l’export fondé sur un raccourci, réunissez `OmniFocus.json` et `metadata.json` dans un même ZIP pour un import plus propre.
- Si vous avez à la fois des actions de projet et des actions indépendantes dans la boîte de réception, Mindwtr conserve cette distinction.
- Si les récurrences sont importantes, préférez le JSON ou ZIP Omni Automation au CSV.
- Vérifiez les tâches importées avec une priorité élevée si vous utilisiez beaucoup les indicateurs OmniFocus.
- Conservez l’instantané de récupération jusqu’à ce que vous ayez vérifié l’import.
