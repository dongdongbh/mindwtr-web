# Synchronisation iCloud

Mindwtr propose une synchronisation native **iCloud / CloudKit** sur les appareils Apple où le module natif est disponible.

## Disponibilité

- **iPhone et iPad :** pris en charge par le système natif `iCloud` dans **Paramètres → Synchronisation**
- **Android :** non pris en charge
- **Windows et Linux :** non pris en charge
- **macOS :** pris en charge par le système natif `iCloud` dans **Paramètres → Synchronisation**

## Données synchronisées

Le système iCloud natif synchronise les mêmes données GTD principales que les autres systèmes structurés :

- tâches ;
- projets ;
- sections ;
- domaines ;
- métadonnées des pièces jointes ;
- fichiers joints au moyen des ressources CloudKit ;
- groupes de paramètres synchronisés.

Il utilise les enregistrements et ressources CloudKit de votre compte Apple, plutôt qu’un fichier `data.json` et un dossier `attachments/` choisis par l’utilisateur.

## Configuration

1. Connectez-vous avec le même compte Apple sur les appareils à synchroniser.
2. Vérifiez qu’iCloud est activé pour Mindwtr sur ces appareils.
3. Dans Mindwtr sur votre appareil Apple, ouvrez **Paramètres → Synchronisation**.
4. Choisissez **iCloud** comme système de synchronisation.
5. Lancez une première synchronisation pour envoyer ou récupérer vos données.

Mindwtr continue ensuite d’utiliser sa fusion locale habituelle et peut réagir aux notifications de modification CloudKit lorsqu’elles sont disponibles.

## Remarques selon la plateforme

- Si une version non Apple rencontre une ancienne valeur de système `cloudkit`, Mindwtr revient à `Off` au lieu d’afficher une option iCloud inutilisable.
- Sur macOS, vous pouvez toujours employer **iCloud Drive + Synchronisation de fichiers** si vous préférez une méthode fondée sur un dossier au système CloudKit natif.
- La synchronisation native des pièces jointes par iCloud est également réservée aux appareils Apple. Pour transférer les pièces jointes entre des appareils Apple et non Apple, utilisez un système multiplateforme.
- Pour synchroniser des appareils Apple et non Apple, utilisez **WebDAV**, **Mindwtr Cloud**, **Dropbox** dans les versions compatibles, ou la **Synchronisation de fichiers**.

## Quand l’utiliser

Utilisez la synchronisation iCloud native si :

- tous les appareils concernés appartiennent à l’écosystème Apple ;
- vous souhaitez une configuration plus simple que le choix et l’entretien d’un dossier partagé ;
- vous n’avez pas besoin de clients Android, Windows ou Linux dans le même ensemble synchronisé.

Pour une synchronisation entre plusieurs plateformes, consultez [Données et synchronisation](/fr/data-sync/).
