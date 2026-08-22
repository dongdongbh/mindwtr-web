# Import Mindwtr CSV

Mindwtr peut importer un simple fichier CSV qui respecte une disposition de colonnes documentée. C’est la voie générique pour les applications dépourvues d’outil dédié mais capables d’exporter une feuille de calcul.

Sources prises en charge :

- un fichier `.csv` unique
- une archive `.zip` contenant un ou plusieurs fichiers CSV

L’import est disponible sur ordinateur et sur mobile depuis **Paramètres → Données → Importer depuis Mindwtr CSV**. Mindwtr affiche un aperçu avec les décomptes et les avertissements avant d’écrire quoi que ce soit.

## Quand utiliser cet outil

Privilégiez un outil natif lorsque votre application figure dans [Importer des données depuis d’autres applications](/fr/import/). Ces outils lisent l’export propre à l’application et en connaissent déjà les particularités.

Passez par le CSV Mindwtr lorsque votre application n’y figure pas. Exportez le CSV qu’elle produit, renommez les cellules d’en-tête avec les noms de colonnes ci-dessous dans un tableur, puis importez le résultat. Vous conservez ainsi bien plus qu’en collant une liste de titres : projets, sections, domaines, statuts, dates, tags, contextes, listes de contrôle et règles de répétition font tous le voyage.

## Format du fichier

- **Encodage :** UTF-8. Une marque d’ordre des octets est retirée automatiquement. Les autres encodages sont décodés avec souplesse et peuvent perdre les caractères accentués : enregistrez en UTF-8 dès que votre tableur le permet.
- **Séparateur :** détecté sur la première ligne non vide. La virgule, le point-virgule et la tabulation conviennent tous.
- **Guillemets :** les règles CSV habituelles. Encadrez une valeur par `"` lorsqu’elle contient le séparateur, un saut de ligne ou un guillemet, et écrivez un guillemet interne `""`.
- **Ligne d’en-tête :** obligatoire. `Title` doit être présent, sinon l’import s’arrête sur une erreur au lieu de deviner.
- **Noms de colonnes :** reconnus sans tenir compte de la casse ni de l’ordre. Ce sont toujours les noms anglais ci-dessous, quelle que soit la langue de l’interface Mindwtr.
- **Colonnes inconnues :** ignorées, avec un avertissement indiquant combien ont été écartées.
- **Lignes vides :** ignorées sans bruit. Une ligne qui a du contenu mais pas de titre est ignorée avec un avertissement.
- **Cellules NULL :** une cellule ne contenant que `NULL` est traitée comme vide. Les fichiers CSV exportés depuis des bases SQL écrivent ainsi les valeurs manquantes.

## Référence des colonnes

Toutes les colonnes sauf `Title` sont facultatives : n’incluez que celles dont vous vous servez.

| Colonne | Valeurs acceptées | Ce que fait Mindwtr |
| --- | --- | --- |
| `Title` | tout texte | Obligatoire. Le titre de la tâche. |
| `Description` | tout texte | La description de la tâche. Les sauts de ligne sont conservés à l’intérieur d’une valeur entre guillemets. |
| `Status` | `inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived` | Insensible à la casse. Laissé vide, le statut devient `done` si `Completed At` est renseigné, sinon `next` si la ligne indique un projet, sinon `inbox`. Une valeur non reconnue devient `inbox` avec un avertissement. |
| `Project` | un nom de projet | Crée le projet une seule fois et y place la tâche. Les noms sont comparés sans tenir compte de la casse. |
| `Section` | un nom de section dans le projet de cette ligne | Exige un `Project` sur la même ligne. Sans lui, la valeur est ignorée avec un avertissement. |
| `Area` | un nom de domaine | Si la ligne indique un `Project`, le domaine accueille le projet. Sinon, c’est la tâche elle-même qui est classée dans le domaine. |
| `Contexts` | des noms séparés par des virgules ou des points-virgules | Ajoute le `@` initial lorsqu’il manque et supprime les doublons. |
| `Tags` | des noms séparés par des virgules ou des points-virgules | Ajoute le `#` initial lorsqu’il manque, met le tag en minuscules et supprime les doublons. |
| `Assigned To` | un nom de personne | Définit la personne assignée, ce qui alimente la liste En attente. |
| `Priority` | `high`, `medium`, `low` ou `1`, `2`, `3` | Toute autre valeur laisse la priorité vide. |
| `Energy` | `high`, `medium`, `low` | Toute autre valeur laisse le niveau d’énergie vide. |
| `Start Date` | une date, avec ou sans heure | La date de début. La tâche reste hors de Focus jusqu’à son arrivée. |
| `Due Date` | une date, avec ou sans heure | L’échéance. |
| `Review Date` | une date, avec ou sans heure | La date de revue, pour réexaminer la tâche plus tard. |
| `Completed At` | une date avec heure | L’horodatage d’achèvement. Il transforme aussi un `Status` vide en `done`, et il n’est conservé que si le statut obtenu est `done` ou `archived`. |
| `Created At` | une date avec heure | L’horodatage de création. Laissé vide, la tâche est créée à la date de l’import. |
| `Checklist` | des éléments séparés par des sauts de ligne ou par `\|` | Devient la liste de contrôle de la tâche. Un élément écrit `[x] Buy stamps` démarre terminé ; `[ ] Buy stamps` et un simple `Buy stamps` démarrent ouverts. Une tâche pourvue d’éléments de contrôle devient une tâche liste. |
| `Location` | tout texte | Le champ de lieu de la tâche. |
| `Order` | un nombre | Classe la tâche parmi ses voisines du même projet, domaine ou boîte de réception. Les lignes sans nombre, ou portant le même nombre, gardent l’ordre du fichier. |
| `ID` | tout identifiant stable | Donne à la ligne une identité durable pour les réimports. Une valeur qui répète une ligne antérieure du même import est écartée avec un avertissement. |
| `Recurrence` | une règle de répétition telle que `FREQ=WEEKLY;BYDAY=MO,TH` | Définit la façon dont la tâche se répète. Ajoutez `;X-MINDWTR-STRATEGY=FLUID` pour une répétition comptée à partir du jour où vous achevez la tâche plutôt qu’à partir de sa date. Une règle que Mindwtr ne sait pas exprimer est ignorée avec un avertissement nommant la ligne, et cette tâche arrive sans répétition. |

## Dates et heures

- Une date seule, comme `2026-09-01`, reste une date simple. Mindwtr ne lui invente pas une heure de minuit.
- Une date et une heure sans fuseau, comme `2026-09-05 14:30`, conservent exactement cette heure murale.
- Une valeur terminée par `Z` ou par un décalage tel que `+02:00` est enregistrée comme l’instant précis qu’elle désigne.
- `Created At` et `Completed At` sont toujours enregistrés comme un instant précis, car ils indiquent quand une chose s’est réellement produite.
- Une valeur que Mindwtr ne sait pas lire est laissée vide, et l’aperçu indique combien ont été écartées.
- Les horodatages de style SQL comme `2026-02-21 22:44:00.6390000 +00:00` sont acceptés : les décimales supplémentaires et l’espace avant le décalage sont normalisés automatiquement.

ISO 8601 (`YYYY-MM-DD`) est l’écriture la plus sûre. D’autres formats sont tentés, mais une colonne de tableur restée au format de date local est la cause la plus fréquente de valeurs écartées.

## Exemple complet

```csv
Title,Description,Status,Project,Section,Area,Contexts,Tags,Priority,Start Date,Due Date,Checklist,ID
Book the venue,Needs 60 seats,next,Team Offsite,Logistics,Work,@phone,#offsite,high,2026-09-01,2026-09-12,[x] Shortlist venues|[ ] Call first choice,offsite-1
Draft the agenda,,next,Team Offsite,Programme,Work,@computer,"#offsite, #writing",medium,,2026-09-20,,offsite-2
Buy a whiteboard,,inbox,,,,@errands,,,,,,offsite-3
```

Ce fichier crée un domaine, un projet à l’intérieur avec deux sections, deux tâches dans ce projet, une liste de contrôle de deux éléments sur la première, et une tâche isolée dans la boîte de réception.

## Déroulement de l’import

1. Ouvrez **Paramètres → Données → Importer depuis Mindwtr CSV**.
2. Choisissez votre fichier `.csv` ou `.zip`.
3. Lisez l’aperçu. Il indique combien de tâches, domaines, projets, sections et éléments de contrôle seront créés, combien de tâches resteront hors projet, les premiers projets avec leur nombre de tâches, ainsi que chaque avertissement.
4. Confirmez l’import, ou annulez si les décomptes semblent faux.

Mindwtr enregistre un instantané de récupération avant d’écrire. Si le résultat ne vous convient pas, restaurez-le depuis **Paramètres → Synchronisation → Instantanés de récupération**.

## Réimporter le même fichier

Mindwtr attribue à chaque ligne une identité stable : importer deux fois le même fichier ne duplique donc rien.

- Avec une colonne `ID`, l’identité suit cette valeur, si bien qu’un export corrigé retombe sur les mêmes tâches.
- Sans colonne `ID`, l’identité repose sur la position de la ligne dans le fichier (et, dans un ZIP, sur le fichier dont elle provient). Réimporter exactement le même fichier est sans danger, mais un export où des lignes ont été insérées ou supprimées ne correspond plus et créera des doublons.
- Les lignes déjà présentes sont ignorées, non mises à jour. Un import n’écrase jamais une tâche que vous avez modifiée depuis dans l’application.
- Les suppressions sont respectées. Si vous supprimez un projet importé puis réimportez le fichier, le projet n’est pas recréé et ses lignes arrivent sans lui.
- Si le nom d’un domaine ou d’un projet importé appartient déjà à autre chose, le nouvel élément reçoit `(Mindwtr CSV)` à la fin de son nom et un avertissement le signale.

## Exporter depuis Mindwtr

Mindwtr écrit ce même format : l’aller-retour est donc complet. **Réglages → Données → Sauvegarde → Exporter en CSV** enregistre vos tâches actuelles dans un seul fichier CSV, sur ordinateur comme sur mobile.

- La colonne `ID` est toujours écrite : réimporter un export ne duplique rien, les lignes dont l’`ID` correspond à une tâche existante sont ignorées avec un avertissement. Les modifications apportées à un fichier exporté ne sont **pas** réinjectées — modifiez ces tâches dans l’application. Les remarques sur l’identité ci-dessus s’appliquent telles quelles.
- Les tâches supprimées ne sont jamais exportées. Le format n’a pas de colonne pour elles et une telle ligne reviendrait comme tâche active au prochain import.
- La récurrence est écrite sous la forme de la règle de répétition que l’importateur relit : les répétitions survivent donc à l’aller-retour. L’avancement d’une série comptée n’est pas écrit, une répétition importée démarre donc une nouvelle série.
- Pour une copie complète incluant les réglages et l’historique des éléments supprimés, utilisez plutôt la [sauvegarde](/fr/data-sync/backup-restore) JSON.

## Ce que cet outil ne fait pas

- **Les règles de répétition que Mindwtr ne sait pas exprimer.** Une règle bâtie sur `BYSETPOS`, ou qui se répète plus d’une fois par jour, est signalée avec sa ligne et sa tâche arrive sans répétition, jamais comme une approximation de la règle écrite.
- **Hiérarchie de sous-tâches.** Il n’existe pas de colonne parente. Utilisez `Checklist` pour les étapes d’une même tâche et `Section` pour regrouper au sein d’un projet.
- **Pièces jointes.** Les chemins de fichiers ou les URL d’un CSV restent du texte ; rien n’est téléchargé ni copié.

## Avertissements possibles

Les avertissements sont comptés pour l’ensemble de l’import et affichés une seule fois avec leur nombre, jamais ligne par ligne. Les règles de répétition illisibles ajoutent une ligne supplémentaire nommant les trois premières lignes concernées :

- des colonnes inconnues ont été ignorées
- des statuts n’ont pas pu être associés et ont été importés dans la Boîte de réception
- des valeurs `Section` ont été ignorées car leurs lignes n’avaient pas de `Project`
- des règles `Recurrence` n’ont pas pu être comprises, et ces tâches sont arrivées sans répétition
- des dates n’ont pas pu être lues et ont été écartées
- des lignes ont été supprimées car leur `ID` répétait une ligne antérieure
- des lignes sans titre ont été ignorées
- un domaine ou un projet importé a été renommé pour éviter un conflit de noms
- des fichiers non CSV ont été ignorés dans un ZIP
- des archives ZIP imbriquées ont été ignorées
- un CSV se terminait par un champ entre guillemets non refermé et a été importé au mieux
- un fichier CSV n’a pas pu être lu et a été ignoré

## Conseils

- Importez d’abord un fichier de test de cinq lignes et vérifiez la correspondance avant de transférer des centaines de lignes.
- Ajoutez une colonne `ID` s’il y a la moindre chance que vous affiniez l’export pour le réimporter.
- Laissez `Status` vide lorsque votre source n’a pas d’équivalent. Par défaut, le travail de projet part dans Prochaines actions et le reste dans la Boîte de réception, prêt à être clarifié.
- Conservez l’export d’origine et l’instantané de récupération jusqu’à ce que vous ayez vérifié le résultat.
- Les tâches importées en `done` ou `archived` apparaissent dans les vues Terminées et Archives, pas dans la liste des tâches de leur projet — les pages de projet ne montrent que le travail ouvert.

Voir aussi [Importer des données depuis d’autres applications](/fr/import/) et [Sauvegarde et restauration](/fr/data-sync/backup-restore).
