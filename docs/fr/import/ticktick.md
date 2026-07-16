# Importer depuis TickTick

Mindwtr peut importer les sauvegardes TickTick pour vous permettre de migrer sans reconstruire votre système à la main.

Sources prises en charge :

- une sauvegarde TickTick au format **CSV** ;
- une sauvegarde TickTick au format **ZIP** contenant l’export CSV.

L’import est disponible sur ordinateur et mobile dans **Paramètres -> Données -> Importer depuis TickTick**.

## Exporter depuis TickTick

TickTick crée les sauvegardes depuis son application web :

1. Ouvrez TickTick dans un navigateur et connectez-vous.
2. Cliquez sur votre avatar en haut à gauche.
3. Ouvrez **Settings -> Account -> Backup & Import**.
4. Choisissez **Generate Backup**.
5. Enregistrez le fichier CSV ou ZIP téléchargé par TickTick.

Ouvrez ensuite **Importer depuis TickTick** dans Mindwtr et choisissez ce fichier.

## Données importées

Mindwtr transpose les sauvegardes TickTick dans son modèle en privilégiant GTD :

- les dossiers TickTick deviennent des **domaines Mindwtr** ;
- les listes TickTick deviennent des **projets Mindwtr** ;
- les tâches parentes et les lignes enfants peuvent devenir des **tâches avec liste de contrôle** ;
- le contenu des listes de contrôle est conservé sous forme d’éléments ;
- les tags TickTick deviennent des **tags Mindwtr** ;
- les priorités sont transposées lorsqu’elles sont présentes ;
- les échéances, dates de début, dates de journée entière et fuseaux horaires sont conservés lorsque leur lecture est fiable ;
- les règles de répétition prises en charge sont importées comme récurrences Mindwtr ;
- l’état terminé ou archivé est conservé lorsqu’il est présent ;
- les notes et le contenu des tâches sont conservés dans la description.

Les tâches actives importées restent disponibles pour le traitement GTD au lieu d’être forcées dans un statut que Mindwtr ne peut pas déduire de la sauvegarde.

## Déroulement de l’import

1. Ouvrez **Importer depuis TickTick**.
2. Choisissez une sauvegarde TickTick CSV ou ZIP.
3. Examinez l’aperçu récapitulatif.
4. Confirmez l’import.

Avant l’import, Mindwtr enregistre si possible un instantané de récupération de vos données locales actuelles.

Après l’import :

- les domaines et projets nécessaires sont créés ;
- les tâches, listes de contrôle, tags, dates et récurrences sont ajoutés depuis la sauvegarde ;
- des avertissements signalent les lignes ignorées, les entrées d’archive non prises en charge ou les champs que Mindwtr n’a pas pu transposer de manière fiable.

## Remarques sur les sauvegardes TickTick

Les sauvegardes TickTick comportent des lignes de métadonnées avant le véritable en-tête CSV. Mindwtr détecte automatiquement le bon en-tête ; vous ne devriez donc pas avoir à modifier le fichier.

Mindwtr ignore :

- les fichiers ZIP imbriqués ;
- les fichiers autres que CSV dans l’archive ;
- les lignes mal formées qu’il ne peut pas analyser de manière fiable.

Les sauvegardes TickTick ne contiennent pas tout l’état de l’application. Il peut être nécessaire de transférer manuellement les pièces jointes et certains détails de présentation propres à TickTick.

## Conseils

- Conservez la sauvegarde TickTick d’origine jusqu’à ce que vous ayez vérifié l’import.
- Commencez par la sauvegarde complète, mais servez-vous de l’aperçu pour contrôler la correspondance.
- Importer deux fois la même sauvegarde peut créer des doublons.
- Consultez [Importer des données depuis d’autres applications](/fr/import/) si vous avez besoin d’une autre méthode pour une application différente.

Voir aussi [Données et synchronisation](/fr/data-sync/) et [Sauvegarde et restauration](/fr/data-sync/backup-restore).
