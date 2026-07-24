# Importer des données depuis d’autres applications

Ce guide explique comment transférer des tâches dans Mindwtr depuis un autre gestionnaire de tâches. Il concerne les migrations complètes, et non les captures ponctuelles.

## Avant l’import

Une migration est l’occasion de laisser derrière vous ce qui n’est plus utile. Si votre ancienne application contient des centaines de tâches obsolètes, envisagez de ne migrer que vos projets en cours, vos prochaines actions actives et vos éléments de référence fiables.

Mindwtr peut importer des exports complets depuis les applications prises en charge. Toutefois, une migration plus réduite et réfléchie correspond généralement mieux à GTD que la copie de toutes les anciennes tâches dans un nouveau système.

## Outils d’import disponibles

Mindwtr propose des outils dédiés pour quelques applications dont le format d’export est suffisamment structuré pour garantir une correspondance fiable :

- [Import TickTick](/fr/import/ticktick) — sauvegardes CSV ou ZIP de TickTick
- [Import Todoist](/fr/import/todoist) — exports CSV ou sauvegardes ZIP
- [Import DGT GTD](/fr/import/dgt-gtd) — exports JSON ou sauvegardes ZIP
- [Import OmniFocus](/fr/import/omnifocus) — exports CSV, JSON ou ZIP
- [Import depuis Rappels Apple](/fr/data-sync/#importation-depuis-rappels-apple-ios) — import réservé à iOS des rappels non terminés d’une liste Rappels sélectionnée

Ouvrez **Paramètres -> Données**, puis choisissez l’action d’import correspondante. Mindwtr affiche un aperçu avant d’ajouter quoi que ce soit.

Les outils natifs sont la meilleure solution lorsque votre ancienne application figure dans la liste. Ils préservent davantage de structure que le texte brut et prennent en charge les particularités de chaque application : dossiers, listes, tags, dates, listes de contrôle et récurrence, lorsque l’export source les fournit.

## Fidélité de l’import en bref

Cette couverture a été vérifiée le 21 juillet 2026 avec le code d’import du commit Mindwtr [18b11a6](https://github.com/dongdongbh/Mindwtr/commit/18b11a6814fbde064df627fcaf63143c4279bd5b). Les jeux d’essai couvrent les formats CSV et ZIP de Todoist, CSV et ZIP de TickTick 7.1, JSON et ZIP du schéma DGT version 3, ainsi que CSV, CSV UTF-16, JSON et ZIP d’OmniFocus. Les formats d’export peuvent changer. Examinez l’aperçu et le guide propre à l’application avant de confirmer.

| Source | Meilleure entrée | Mindwtr préserve | À vérifier après l’import |
| --- | --- | --- | --- |
| [TickTick](/fr/import/ticktick) | Sauvegarde CSV ou ZIP | Dossiers sous forme de domaines, listes sous forme de projets, tags, priorités, dates, listes de contrôle, état d’achèvement et récurrences prises en charge | Pièces jointes, détails de présentation, avertissements et association entre tâches parentes et enfants |
| [Todoist](/fr/import/todoist) | Sauvegarde CSV ou ZIP | Projets, sections, tâches actives, descriptions et commentaires, priorités, échéances, libellés et sous-tâches sous forme d’éléments de contrôle | Récurrences, importées une seule fois avec leur texte d’origine ; lignes ignorées ou incorrectes |
| [DGT GTD](/fr/import/dgt-gtd) | Sauvegarde JSON ou ZIP | Dossiers sous forme de domaines, projets, contextes, tags, listes de contrôle, priorités, échéances, état d’achèvement et récurrences prises en charge | Récurrences non prises en charge et entrées d’archive ignorées |
| [OmniFocus](/fr/import/omnifocus) | JSON ou ZIP Omni Automation pour une meilleure fidélité ; CSV pris en charge | Dossiers sous forme de domaines, projets, tags, contextes, notes, dates, état d’achèvement, imbrication simple et récurrences prises en charge | Imbrication profonde, dates planifiées et durée en texte, et pertes propres au CSV |
| [Rappels Apple](/fr/data-sync/#importation-depuis-rappels-apple-ios) | Une liste choisie sur iOS | Titres et notes des rappels non terminés | Dates et autres champs, éléments ignorés et choix de suppression dans la source |

## Vérifier ou revenir en arrière

1. Conservez l’export d’origine et créez une [sauvegarde Mindwtr](/fr/data-sync/backup-restore) récente avant l’import.
2. Vérifiez les nombres et les avertissements de l’aperçu. Annulez si le total des projets ou des tâches semble incorrect.
3. Après l’import, comparez un projet et quelques tâches représentatives avec la source. Vérifiez les titres, le projet ou l’état, les dates, les tags ou contextes, les notes, les listes de contrôle et les récurrences.
4. Si la correspondance est incorrecte, restaurez l’instantané depuis **Paramètres → Synchronisation → Instantanés de récupération**, corrigez l’export source et recommencez. Certains outils peuvent dupliquer les tâches si vous importez deux fois le même fichier.

## Autres méthodes de migration

Si votre application n’est pas répertoriée, utilisez l’une des solutions ci-dessous. Elles sont volontairement plus simples que les outils natifs et conviennent aux nombreuses applications qui exportent du texte brut, du CSV ou du JSON.

### Copier-coller

La solution de repli la plus rapide consiste à copier une liste de tâches et à la coller dans Ajout rapide ou Capture rapide.

Mindwtr utilise les lignes vides pour choisir entre une seule tâche et une création groupée :

- Si le texte collé contient au moins une ligne vide, Mindwtr conserve tout le contenu dans une seule tâche et réunit les lignes non vides dans un même titre.
- S’il ne contient aucune ligne vide, chaque ligne non vide devient une tâche distincte.

Sur ordinateur :

1. Ouvrez Ajout rapide.
2. Collez plusieurs lignes dans le champ de tâche.
3. Si Mindwtr détecte plusieurs tâches, confirmez **Créer les tâches**.

Sur mobile :

1. Ouvrez Capture rapide.
2. Collez plusieurs lignes dans le champ de tâche.
3. Touchez Enregistrer, puis confirmez la création groupée si Mindwtr détecte plusieurs tâches.

Lors d’une création groupée, Mindwtr analyse chaque ligne avec la syntaxe d’ajout rapide ; vous pouvez donc y inclure des métadonnées :

```text
Email Bob about Q3 report +Work @computer #followup /due:friday
Book dentist appointment @phone
Outline conference talk +Speaking #ideas /note:Draft the rough structure first
```

Cette méthode ne reconstitue ni les hiérarchies profondes ni les récurrences, mais elle reste souvent la façon la plus propre de récupérer les tâches qui comptent encore.

### Texte brut

Si votre ancienne application peut exporter un fichier `.txt`, utilisez l’import de texte de Mindwtr depuis l’interface de capture.

Sur ordinateur :

1. Ouvrez Ajout rapide.
2. Cliquez sur **Importer un .txt**.
3. Choisissez un fichier texte brut.
4. Confirmez la création groupée.

Sur mobile :

1. Ouvrez Capture rapide.
2. Touchez **Plus**.
3. Touchez **Importer un .txt**.
4. Choisissez un fichier texte brut.
5. Confirmez la création groupée.

Placez une tâche par ligne. Ajoutez les jetons d’ajout rapide sur la même ligne si vous voulez que Mindwtr définisse les métadonnées pendant l’import :

```text
Pay water bill +Home /due:2026-07-01
Renew passport +Personal @errands #admin
Send slides to Ana +Work /note:Use the final deck from the shared folder
```

Mindwtr utilise des commandes d’ajout rapide explicites comme `/note:` plutôt qu’un format de note masqué par une tabulation. Le fichier texte reste ainsi lisible avant l’import et emploie le même analyseur que la capture habituelle.

### Script de conversion CSV vers du texte d’ajout rapide

Pour les applications qui exportent du CSV sans disposer d’un outil Mindwtr dédié, convertissez le CSV en fichier texte d’ajout rapide, puis importez ce fichier `.txt`.

Mindwtr fournit un petit script sans dépendance :

```bash
node scripts/migration/csv-to-quickadd-text.mjs export.csv \
  --output mindwtr-import.txt \
  --title "Title" \
  --project "Project" \
  --tags "Tags" \
  --contexts "Contexts" \
  --due "Due" \
  --note "Note"
```

Le script écrit une ligne d’ajout rapide par ligne CSV. Il peut convertir :

- une colonne de titre en titre de tâche ;
- une colonne de projet ou de liste en `+Project` ;
- des tags séparés par des virgules ou des points-virgules en `#tag` ;
- des contextes séparés par des virgules ou des points-virgules en `@context` ;
- une colonne d’échéance en `/due:...` ;
- une colonne de note en `/note:...`.

Si votre CSV emploie d’autres noms de colonnes, transmettez-les avec les options ci-dessus. Par exemple :

```bash
node scripts/migration/csv-to-quickadd-text.mjs tasks.csv \
  --output mindwtr-import.txt \
  --title "Task" \
  --project "List" \
  --tags "Categories" \
  --due "Due Date" \
  --note "Notes"
```

Ce script sert de point de départ ; ce n’est pas un outil d’import officiellement pris en charge pour une application donnée. Il ne conservera pas les tâches imbriquées, pièces jointes, récurrences ou champs propres à l’application, sauf si vous l’adaptez.

### CLI, API locale et MCP

Les utilisateurs techniques peuvent écrire leur propre outil d’import à partir des interfaces d’automatisation de Mindwtr :

- [API locale](/fr/power-users/local-api)
- [Serveur MCP](/fr/power-users/mcp)
- `bun run mindwtr:cli -- --help` depuis une copie du dépôt

Choisissez cette méthode si votre ancienne application exporte du JSON ou du CSV structuré et que le texte brut ne vous donne pas assez de contrôle. Ces outils passent par le modèle de données normal de Mindwtr, mais les scripts de migration personnalisés restent sous votre responsabilité.

## Si votre application n’est pas répertoriée

Procédez dans cet ordre :

1. Vérifiez si votre application peut exporter vers un format déjà importé par Mindwtr.
2. Essayez le copier-coller ou le texte brut pour les tâches actives dont vous avez encore besoin.
3. Utilisez le script CSV si votre application exporte une simple feuille de calcul.
4. Utilisez l’API locale, la CLI ou MCP si vous avez besoin d’une migration structurée personnalisée.

Pour demander un outil natif pour une application précise, ouvrez une discussion ou un ticket GitHub en indiquant :

- le nom de l’application ;
- le format d’export proposé ;
- un petit exemple d’export anonymisé ;
- les champs qu’il est le plus important de préserver.

La priorité accordée aux outils natifs dépend de la demande et de la facilité avec laquelle le format source se transpose dans le modèle GTD de Mindwtr.
