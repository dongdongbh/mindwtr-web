# Importer depuis Microsoft To Do

> Cet outil d’importation arrivera dans la prochaine version de Mindwtr pour ordinateur après la version 1.3.9.

Mindwtr pour ordinateur importe les tâches à partir d’un fichier CSV exporté du dossier **Tâches** dans Outlook classique pour Windows. Les tâches Microsoft To Do stockées dans Exchange Online se synchronisent avec les tâches Outlook. [Synchronisation de Microsoft To Do](https://support.microsoft.com/en-us/todo/syncing-your-microsoft-to-do-account)

## Exporter les tâches dans un fichier CSV

1. Ouvrez Outlook classique pour Windows et connectez-vous avec le compte que vous utilisez dans Microsoft To Do.
2. Ouvrez **Fichier → Ouvrir et exporter → Importer/Exporter**.
3. Choisissez **Exporter vers un fichier**, puis **Valeurs séparées par des virgules**.
4. Sélectionnez le dossier **Tâches** de votre compte. Vérifiez qu’il contient les tâches que vous souhaitez transférer.
5. Choisissez un nom et un emplacement pour le fichier CSV, puis sélectionnez **Terminer**. Donnez au fichier CSV le nom du projet Mindwtr souhaité. Utilisez un nom de fichier différent pour chaque dossier Outlook exporté.

Si vous utilisez le nouvel Outlook, ouvrez Outlook classique pour cet export. L’assistant peut uniquement exporter les tâches des dossiers qu’il affiche. Si des tâches manquent dans l’assistant, vérifiez que vous avez ajouté le même compte dans Outlook classique et que les tâches figurent dans la vue Tâches. [Passer d’une version d’Outlook à l’autre](https://support.microsoft.com/en-us/outlook/getstarted/run-new-outlook-and-classic-outlook-side-by-side) · [Étapes d’exportation sur Microsoft Q&A](https://learn.microsoft.com/en-ca/answers/questions/5687598/how-can-i-export-my-microsoft-to-do-list-data-and)

Mindwtr reconnaît les en-têtes de colonnes en anglais et en chinois simplifié. Pour les autres langues, réglez la langue d’affichage d’Office sur l’anglais et recommencez l’exportation. Si le CSV utilise un ancien encodage Windows, ouvrez-le dans un tableur et enregistrez une copie au format CSV UTF-8. [Changer la langue d’affichage d’Office](https://support.microsoft.com/en-us/office/languages/change-the-language-office-uses-in-its-menus-and-proofing-tools)

## Vérifier l’aperçu et importer

1. Dans Mindwtr pour ordinateur, ouvrez **Paramètres → Données → Importer des données → Importer depuis Microsoft To Do**.
2. Choisissez le fichier CSV des tâches Outlook.
3. Vérifiez le nombre de tâches et les éventuels avertissements dans l’aperçu, puis confirmez l’importation.

Après l’importation, comparez quelques tâches aux originales. Si le résultat est incorrect, sélectionnez **Annuler** dans le message de résultat. [Sauvegarde et restauration](/fr/data-sync/backup-restore)

## Quelles données passent dans Mindwtr

Mindwtr importe les titres, les notes, les catégories sous forme d’étiquettes, les priorités, l’état, et les dates de début, d’échéance et d’achèvement qu’Outlook a exportés. Vérifiez dans l’aperçu les dates que Mindwtr n’a pas pu interpréter. Conservez les listes d’origine pour retrouver les récurrences, les rappels, les pièces jointes et l’organisation des listes.

Chaque CSV est importé dans un projet qui porte le nom du fichier. L’importation crée une copie ponctuelle. Si vous réimportez un fichier sous le même nom, Mindwtr ignore les tâches déjà importées qui sont restées identiques. Un nouveau nom de fichier ou la modification des tâches peut créer des doublons.
