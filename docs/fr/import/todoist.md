# Importer depuis Todoist

Mindwtr peut importer les exports Todoist pour vous permettre de migrer sans reconstruire votre système à la main.

Sources prises en charge :

- un export Todoist **CSV** unique ;
- une sauvegarde Todoist **ZIP** contenant plusieurs fichiers CSV de projets.

L’import est disponible sur ordinateur et mobile dans **Paramètres → Données → Importer depuis Todoist**.

---

## Données importées

Mindwtr transpose les exports Todoist dans son modèle en privilégiant GTD :

- les projets Todoist deviennent des **projets Mindwtr** ;
- les sections Todoist deviennent des **sections Mindwtr** ;
- les sous-tâches Todoist deviennent des **éléments de liste de contrôle** ;
- les libellés Todoist deviennent des **tags** ;
- les tâches actives affectées à un projet deviennent des **Prochaines actions** dans leur projet Mindwtr ;
- les tâches actives non affectées restent disponibles pour le traitement dans la **Boîte de réception**.

Mindwtr évite ainsi d’envoyer dans la Boîte de réception les tâches de projet déjà organisées, tout en laissant les tâches isolées prêtes pour le traitement GTD.

---

## Données Todoist prises en charge

- titres des tâches ;
- descriptions ;
- priorités ;
- échéances lorsqu’elles peuvent être déterminées de manière fiable ;
- sections ;
- notes et commentaires joints aux tâches ;
- libellés écrits dans le contenu Todoist, par exemple `@work`.

Les planifications récurrentes de Todoist ne sont pas recréées automatiquement comme récurrences Mindwtr. La tâche est importée une seule fois et le texte de récurrence Todoist d’origine est conservé dans la description, afin que vous puissiez choisir comment le reproduire dans Mindwtr.

---

## Déroulement de l’import

1. Ouvrez **Importer depuis Todoist**.
2. Choisissez un fichier Todoist CSV ou ZIP.
3. Examinez l’aperçu récapitulatif.
4. Confirmez l’import.

Avant l’import, Mindwtr enregistre si possible un instantané de récupération de vos données locales actuelles.

Après l’import :

- les projets nécessaires sont créés ;
- les tâches actives affectées à un projet apparaissent dans leur projet comme **Prochaines actions** ;
- les tâches actives non affectées restent disponibles pour le traitement dans la **Boîte de réception** ;
- des avertissements signalent les tâches récurrentes, les lignes ignorées ou les entrées d’archive non prises en charge.

---

## Remarques sur les sauvegardes ZIP

Les sauvegardes ZIP de Todoist contiennent généralement un fichier CSV par projet. Mindwtr lit chaque CSV et importe chaque projet séparément.

Mindwtr ignore :

- les fichiers ZIP imbriqués ;
- les fichiers autres que CSV dans l’archive ;
- les lignes Todoist mal formées qu’il ne peut pas analyser de manière fiable.

---

## Conseils

- Commencez par un petit projet Todoist si vous souhaitez d’abord tester la correspondance.
- Conservez l’instantané de récupération jusqu’à ce que vous ayez vérifié l’import.
- Importer deux fois le même export peut créer des doublons.

Voir aussi [Données et synchronisation](/fr/data-sync/) et [Sauvegarde et restauration](/fr/data-sync/backup-restore).
