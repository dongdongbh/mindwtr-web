# Cycle de vie des données

Une question revient souvent : qu’est-ce qui fait grossir `data.json`, qu’est-ce qui le réduit et faut-il effectuer un nettoyage manuel ? Réponse courte : aucun nettoyage manuel n’est nécessaire. Voici le fonctionnement.

## Emplacement de vos données

La source de vérité locale est une **base de données SQLite** dans le répertoire de données de l’application. Le fichier `data.json` visible dans votre dossier de synchronisation est un **instantané** que l’application réécrit depuis cette base. Il sert à la synchronisation et constitue une sauvegarde lisible, pas un journal auquel les données s’ajoutent indéfiniment.

Comme il est réécrit, sa taille peut *diminuer* d’une exécution à l’autre : les tombstones expirés et les éléments purgés cessent simplement d’y figurer. Supprimer `data.json` ne « compacte » rien ; l’application recrée le même instantané depuis la base de données.

## Ce qui le fait grossir

- Les tâches actives, terminées et archivées — votre historique reste consultable par conception
- Les projets, sections, domaines, personnes et filtres enregistrés
- Les **métadonnées** des pièces jointes — quelques centaines d’octets par pièce jointe ; les fichiers eux-mêmes se trouvent séparément dans `attachments/`
- Les tombstones des éléments supprimés, conservés afin que les autres appareils apprennent leur suppression

## Ce qui le réduit automatiquement

- **Expiration des tombstones** : les traces de suppression sont éliminées après la durée de conservation, fixée à 90 jours par défaut.
- **Purge de la corbeille** : « Supprimer définitivement », par élément ou avec Tout effacer, retire immédiatement les données et ne laisse qu’un tombstone jusqu’à son expiration.
- **Nettoyage des pièces jointes** : les métadonnées orphelines et les transferts en attente obsolètes sont supprimés avec un nombre limité de nouvelles tentatives. Un nettoyage manuel est également proposé dans Paramètres → Données.

## Pourquoi un seul fichier plutôt que des archives séparées

Les tâches archivées restent volontairement dans le même document synchronisé. Les systèmes de fichiers comme WebDAV, les dossiers et Dropbox téléversent chaque fichier séparément. Répartir les données actives et archivées dans plusieurs fichiers transformerait l’archivage et la restauration en une opération à deux fichiers, susceptible de n’être appliquée qu’à moitié et de diverger entre les appareils. Un document unique fusionne comme une unité atomique. L’optimisation à long terme prévoit une synchronisation incrémentale des enregistrements, fondée sur les métadonnées de révision existantes, et non davantage de fichiers. Consultez [Algorithme de synchronisation](/fr/data-sync/sync-algorithm) pour connaître les règles de fusion.

## Ordres de grandeur

Après des années d’utilisation normale, les données représentent généralement quelques centaines de kilo-octets à quelques mégaoctets, soit peu par rapport au dossier `attachments/` si vous joignez des fichiers ou de l’audio. Si l’instantané vous semble volumineux, videz la Corbeille, lancez le nettoyage des pièces jointes dans **Paramètres → Données** et examinez `attachments/` avant de vous inquiéter du JSON.
