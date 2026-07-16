# Sauvegarde et restauration

Mindwtr conserve vos données de travail en local et permet d’exporter des sauvegardes JSON pour la portabilité, la réparation et la migration.

La restauration est conçue comme un **remplacement des données locales** :

- vous choisissez un fichier de sauvegarde JSON ;
- Mindwtr le valide avant toute modification ;
- Mindwtr crée d’abord un instantané de récupération lorsque c’est possible ;
- la sauvegarde choisie remplace l’ensemble de données local actuel.

La restauration reste ainsi simple et prévisible. Il ne s’agit pas d’une fusion.

---

## Exporter une sauvegarde

### Ordinateur

1. Ouvrez **Paramètres → Données**.
2. Dans **Transfert de données**, choisissez **Exporter une sauvegarde**.
3. Enregistrez le fichier JSON à l’emplacement voulu.

### Mobile

1. Ouvrez **Paramètres → Données**.
2. Touchez **Exporter une sauvegarde**.
3. Enregistrez ou partagez le fichier JSON.

Le format de sauvegarde est compatible avec la structure interne `data.json` de Mindwtr.

---

## Restaurer une sauvegarde

### Ordinateur

1. Ouvrez **Paramètres → Données**.
2. Dans **Transfert de données**, choisissez **Restaurer une sauvegarde**.
3. Sélectionnez un fichier JSON de sauvegarde Mindwtr.
4. Examinez le résumé et confirmez la restauration.

Avant la restauration, la version ordinateur crée un instantané dans le répertoire local prévu à cet effet lorsque l’environnement Tauri est disponible.

### Mobile

1. Ouvrez **Paramètres → Données**.
2. Touchez **Restaurer une sauvegarde**.
3. Sélectionnez un fichier JSON de sauvegarde Mindwtr.
4. Examinez le résumé et confirmez la restauration.

Avant la restauration, la version mobile enregistre un instantané de récupération dans le stockage de l’application.

---

## Instantanés de récupération

Mindwtr crée automatiquement des instantanés avant les opérations de restauration et d’import.

- **Ordinateur :** dans **Paramètres → Synchronisation → Instantanés de récupération**
- **Mobile :** dans **Paramètres → Synchronisation → Instantanés de récupération**

Utilisez-les si vous avez restauré le mauvais fichier ou souhaitez annuler un import ou une restauration locale.

---

## Règles de validation

Mindwtr valide le fichier JSON choisi avant la restauration :

- le fichier doit contenir du JSON valide ;
- il doit respecter la structure de données de Mindwtr ;
- le nombre d’éléments et les métadonnées de sauvegarde sont affichés lorsqu’ils sont disponibles ;
- les incompatibilités de version produisent un avertissement plutôt qu’un échec silencieux.

En cas d’échec de la validation, la restauration est bloquée et vos données actuelles restent inchangées.

---

## Ce que la restauration ne fait pas

- Elle ne **fusionne pas** la sauvegarde avec vos données locales actuelles.
- Elle ne restaure pas une tâche ou un projet isolé.
- Elle n’écrase pas à elle seule les services de synchronisation distants avant le prochain cycle.

Si vous utilisez la synchronisation, considérez que la restauration remplace d’abord l’état local actuel. Le comportement ultérieur dépend du système choisi et du prochain appareil à se synchroniser.

---

## Conseils

- Conservez des exports manuels réguliers en complément de la synchronisation.
- Ne restaurez que des sauvegardes fiables.
- Avec la synchronisation par fichiers, attendez que le bon `data.json` soit entièrement répliqué avant de synchroniser un autre appareil.

Voir aussi [Données et synchronisation](/fr/data-sync/).
