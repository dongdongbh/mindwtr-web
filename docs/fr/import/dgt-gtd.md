# Importer depuis DGT GTD

Mindwtr peut importer les exports DGT GTD pour vous permettre de migrer sans reconstruire votre système à la main.

Sources prises en charge :

- un export DGT GTD **JSON** ;
- une archive DGT GTD **ZIP** contenant le fichier JSON exporté.

L’import est disponible sur ordinateur et mobile dans **Paramètres → Données → Importer depuis DGT GTD**.

---

## Données importées

Mindwtr transpose les exports DGT GTD dans son modèle en privilégiant GTD :

- les dossiers DGT deviennent des **domaines Mindwtr** ;
- les projets DGT deviennent des **projets Mindwtr** ;
- les listes de contrôle DGT deviennent des **tâches avec liste de contrôle** ;
- leurs éléments restent des **éléments de liste de contrôle** ;
- les contextes DGT deviennent des **contextes** ;
- les tags DGT deviennent des **tags**.

Les tâches conservent leur statut transposé lorsque Mindwtr peut le représenter de manière fiable. Les tâches DGT indépendantes peuvent rester hors des projets : vous pourrez ainsi les organiser ensuite sans imposer de structure supplémentaire pendant l’import.

---

## Données DGT prises en charge

- titres des tâches ;
- notes et descriptions ;
- priorités ;
- échéances ;
- éléments de liste de contrôle ;
- dossiers, projets, contextes et tags ;
- tâches terminées ;
- règles de répétition prises en charge, notamment les planifications simples quotidiennes, hebdomadaires, mensuelles ou annuelles et certaines répétitions par intervalle.

Les modèles de répétition DGT non pris en charge sont importés une seule fois et leur texte d’origine est conservé dans la description, afin que vous puissiez ajuster manuellement la récurrence dans Mindwtr.

---

## Déroulement de l’import

1. Ouvrez **Importer depuis DGT GTD**.
2. Choisissez un fichier DGT GTD JSON ou ZIP.
3. Examinez l’aperçu récapitulatif.
4. Confirmez l’import.

Avant l’import, Mindwtr enregistre si possible un instantané de récupération de vos données locales actuelles.

Après l’import :

- les domaines et projets nécessaires sont créés ;
- les tâches indépendantes restent disponibles pour être organisées plus tard ;
- des avertissements signalent les transpositions de répétition avec perte ou les entrées d’archive ignorées.

---

## Remarques sur les exports ZIP

Mindwtr lit le premier export JSON DGT valide de l’archive.

Mindwtr ignore :

- les fichiers ZIP imbriqués ;
- les fichiers autres que JSON dans l’archive ;
- les fichiers JSON mal formés qu’il ne peut pas analyser de manière fiable.

---

## Conseils

- Commencez par un petit export DGT GTD si vous souhaitez d’abord valider la correspondance.
- Conservez l’instantané de récupération jusqu’à ce que vous ayez vérifié l’import.
- Importer deux fois le même export peut créer des doublons.

Voir aussi [Données et synchronisation](/fr/data-sync/) et [Sauvegarde et restauration](/fr/data-sync/backup-restore).
