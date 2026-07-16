# Guide des performances

Cette page documente des pratiques concrètes d’optimisation des performances pour Mindwtr (ordinateur, mobile et cœur).

## Domaines à fort impact

- Filtrage et tri de grandes listes
- Mises à jour de l’ordre des projets et des tâches
- Fusion de synchronisation et rapprochement des pièces jointes
- Multiplication des nouveaux rendus due à des abonnements trop larges au store
- Modèles de requêtes SQLite (recherche, filtres de date, vues par projet/statut)

## Conseils pour le rendu de l’interface

1. Préférez des sélecteurs de store ciblés et évitez de sélectionner des objets de store entiers.
2. Regroupez les sélecteurs associés et mémorisez les collections dérivées.
3. Gardez les composants d’élément purs ; déplacez les transformations coûteuses vers une mémorisation au niveau de la liste.
4. Utilisez la virtualisation pour les grandes listes et évitez de recalculer dynamiquement la hauteur dans les chemins critiques.
5. Évitez de créer de nouveaux rappels ou objets en ligne dans de grandes listes parcourues.

Les lignes des listes actuelles sur ordinateur reposent sur le rendu mémorisé de `TaskItem` ; veillez donc à conserver des props stables pour les lignes de tâches lorsque vous modifiez les vues de liste, de projet, d’agenda, de calendrier ou de revue. Si une vue nécessite des métadonnées supplémentaires par ligne, dérivez-les une seule fois au niveau de la liste plutôt que de créer de nouveaux objets lors du rendu de chaque ligne.

### Guide pratique d’optimisation du rendu

Lorsqu’un écran semble lent, suivez cet ordre :

1. Vérifiez d’abord le nombre de rendus des éléments de la liste (profileur React DevTools).
2. Sortez les constantes et styles statiques des fonctions de rendu.
3. Mémorisez les composants enfants lourds (`React.memo`) avec une égalité explicite des props lorsque nécessaire.
4. Découpez les grands composants par responsabilité (en-tête/formulaire/liste/fenêtres modales) afin que les mises à jour d’état restent localisées.
5. Remplacez les grands tableaux de dépendances par des sélecteurs ou fonctions auxiliaires mémorisés plus petits.

### Virtualisation de la liste de projets sur ordinateur
- Utilisez `@tanstack/react-virtual` pour les grandes listes de tâches sur ordinateur qui partagent le conteneur de défilement principal de l’espace de travail.
- Utilisez des identifiants de tâche comme clés de ligne ; n’utilisez jamais les index pour des lignes de tâches qui peuvent être modifiées, sélectionnées, déplacées ou réordonnées.
- Mesurez les lignes virtuelles lorsque la hauteur d’une carte de tâche peut changer et conservez une estimation prudente de la hauteur des lignes afin que le défilement ne saute pas.
- Préservez la sémantique de glisser-réordonner en virtualisant le composant de ligne triable existant plutôt qu’en le remplaçant par une interface de ligne distincte.
- Évitez les conteneurs de défilement imbriqués dans les sections de projet. Si une liste virtuelle se trouve sous les métadonnées du projet ou un en-tête de section, tenez compte du décalage de la liste avec une marge de défilement.
- Ajoutez des tests bornés du nombre de rendus pour les régressions sur les grandes listes. Un test doit prouver que le nombre de lignes montées reste proche de la fenêtre visible, surbalayage compris, et non du nombre total de tâches.

### Réglage de FlatList et de la virtualisation (mobile)

- Définissez intentionnellement `initialNumToRender`, `maxToRenderPerBatch` et `windowSize` pour chaque écran.
- Fournissez `getItemLayout` lorsque c’est possible (hauteur fixe ou valeur de repli mesurée).
- Activez `removeClippedSubviews` pour les grandes listes.
- Gardez `keyExtractor` stable et évitez les clés fondées sur l’index.
- Évitez les fonctions de rendu anonymes en ligne dans les arborescences d’éléments profondément imbriquées.

Conservez `FlatList` pour les écrans de tâches ordinaires. Pour les listes de tâches intégrées à un `ScrollView` existant, utilisez une tranche manuelle de fenêtre visible avec des lignes d’espacement plutôt que d’imbriquer une autre liste virtualisée verticale, afin que les gestes de balayage, d’actualisation par tirage, de clavier et de glissement conservent un seul propriétaire du défilement.
Règle propre au calendrier : virtualisez les ensembles de résultats non bornés, et non la structure fixe du calendrier. La vue Planning mobile peut croître avec chaque tâche ou événement visible et doit continuer d’utiliser `FlatList` ; les chronologies quotidiennes et hebdomadaires sont bornées par la grille d’heures visible, et les cellules mensuelles par les semaines du calendrier. `ScrollView` y est donc acceptable, à condition que les lignes de tâches et d’événements soient préfiltrées en dehors de la boucle de rendu.

## Conseils pour les performances de synchronisation

1. Validez la structure de la charge utile avant la fusion afin d’échouer rapidement.
2. Gardez la fusion déterministe et en O(n) par rapport au nombre d’entités (indexez par ID, évitez les parcours imbriqués).
3. Rapprochez d’abord les métadonnées des pièces jointes ; reportez les E/S de fichiers et le réseau à une phase de synchronisation distincte.
4. Bornez les nouvelles tentatives avec une temporisation progressive et distinguez les erreurs récupérables des erreurs définitives.
5. Mettez en cache les lectures de la configuration du backend au cours d’un cycle de synchronisation afin de réduire les accès répétés au stockage.

Le moteur de synchronisation maintient des recherches indexées des conflits et des révisions pendant la fusion. Lorsque vous ajoutez de nouveaux types d’entités synchronisées ou de nouveaux rapports de conflits, préservez cette structure indexée au lieu de réintroduire, pour chaque entité, des parcours de collections complètes.

### Conseils de réglage de la synchronisation

1. Maintenez une concurrence prudente des téléversements et téléchargements de pièces jointes sur les réseaux mobiles.
2. Réglez séparément les délais d’expiration et les fenêtres de nouvelle tentative pour les métadonnées et pour les pièces jointes.
3. Abandonnez rapidement lors d’un passage hors ligne ; évitez les longues chaînes de nouvelles tentatives après une perte de connectivité.
4. Utilisez une instrumentation de progression pour les longues phases consacrées aux pièces jointes.
5. Suivez le nombre de conflits, le décalage maximal de l’horloge et les ajustements d’horodatage pour chaque exécution de synchronisation.
6. Traitez les échantillons de conflits de synchronisation comme des diagnostics bornés. Gardez faibles le nombre d’échantillons et les limites de clés différentes afin que le rapport de conflits ne domine pas les grandes fusions.

### Liste de contrôle pour le débogage de la synchronisation

Si la latence de synchronisation régresse :

1. Comparez séparément les phases de lecture locale, de fusion, d’écriture distante et de traitement des pièces jointes.
2. Vérifiez que les réponses de limitation de débit (`429`) ne provoquent pas de nouvelles tentatives en cascade.
3. Vérifiez que la validation des empreintes des pièces jointes et ses nouvelles tentatives n’échouent pas de manière répétée.
4. Confirmez que la taille de la charge utile distante et le nombre d’éléments dans les collections respectent les limites configurées.
5. Capturez des échantillons de journaux avec horodatages et identifiants de requête autour des périodes lentes.

## Profilage des parcours critiques en mode production

Profilez de véritables builds de production ou de profilage avant d’apporter des modifications générales aux performances. Les builds de développement et les outils d’exécution des tests sont utiles comme garde-fous, mais ils peuvent masquer la couche réellement dominante : dérivation des données, rendu/commit React, virtualisation, persistance ou travail du thread natif/de l’interface.

### Budgets des parcours critiques

Utilisez-les comme budgets de triage, et non comme garanties strictes du produit. Enregistrez p50 et p95 lorsque c’est possible, et conservez la structure des données à côté de chaque résultat.

| Parcours | Budget Android production | Budget ordinateur production | Signal principal |
| --- | ---: | ---: | --- |
| La capture rapide s’ouvre et accepte la première frappe | <= 500 ms pour l’ouverture, <= 100 ms de latence de saisie | <= 300 ms pour l’ouverture, <= 100 ms de latence de saisie | Temps entre la commande/le toucher et le champ modifiable, puis le premier caractère accepté |
| Achèvement/basculement d’une tâche | <= 150 ms pour la réponse visuelle, <= 500 ms pour la mise en file de l’enregistrement | <= 100 ms pour la réponse visuelle, <= 300 ms pour la mise en file de l’enregistrement | Délai entre la saisie et la mise à jour visuelle, plus phase de persistance |
| Ouverture/enregistrement/fermeture de la modification d’une tâche | <= 300 ms pour l’ouverture, <= 300 ms pour l’enregistrement/la fermeture | <= 200 ms pour l’ouverture, <= 200 ms pour l’enregistrement/la fermeture | Temps de commit de la fenêtre modale/feuille et vidage de l’enregistrement |
| Ouverture d’un projet avec plus de 100 tâches | <= 2,000 ms | <= 1,000 ms | De la navigation à une liste de tâches interactive |
| Ouverture/fermeture d’un sélecteur lorsque Focus/Inbox/Projects est monté | <= 200 ms | <= 150 ms | Transition du sélecteur et recalcul de la vue parente |
| Changement entre les vues Focus, Inbox et Projects | <= 500 ms | <= 300 ms | Du changement de route/vue à l’état interactif |
| Recherche au fil de la saisie | <= 150 ms p95 par frappe | <= 100 ms p95 par frappe | De la frappe à la mise à jour des résultats visibles |

### Matrice des captures

Conservez les captures jointes au ticket ou au ticket de suivi. Chaque capture doit indiquer le commit, la version de l’application, le canal d’installation, l’appareil, le système d’exploitation, la structure des données, le parcours et le lien vers l’artefact.

| Plateforme | Build requis | Outils | Artefact de capture | Couche dominante à relever |
| --- | --- | --- | --- | --- |
| Android | APK/AAB de production ou de profilage avec des données locales représentatives | Profileur Android Studio, échantillonnage Hermes ou Flipper lorsque disponible | Trace CPU ou profil Hermes, plus enregistrement d’écran/horodatages | Dérivation JavaScript, rendu/commit React, virtualisation des listes, SQLite/persistance, thread natif/de l’interface |
| Ordinateur | Build Tauri de production avec des données locales représentatives | Profileur de performances des outils de développement WebView et journal de diagnostics de l’application | Trace de performances plus horodatages des diagnostics | Dérivation des données, rendu/commit React, virtualisation web, SQLite/persistance, enveloppe WebView/native |

### Modèle de notes de capture

```markdown
Commit:
Version/channel:
Platform/device/OS:
Dataset:
- tasks:
- projects:
- largest project task count:
- contexts/tags:
Journey:
Tool/artifact:
Observed p50/p95:
Dominant layer:
Notes:
Follow-up issue:
```

### Classification des couches

- Dérivation des données : le profil montre des parcours répétés de l’ensemble du store, des tris/filtrages, une agrégation des décomptes ou une multiplication des sélecteurs avant le début du rendu. Préférez des sélecteurs limités à la requête et des index dérivés. Suivi dans #647.
- Rendu/commit React : le profil montre un temps de commit élevé, des rendus répétés de lignes, des props instables ou des abonnements trop larges. Mémorisez les lignes et réduisez la portée des abonnements avant de modifier les modèles de données.
- Virtualisation : le profil montre des milliers de composants de ligne montés pour une liste visible. Utilisez les outils de virtualisation de la plateforme et des tests bornés du nombre de rendus. Suivi dans #648.
- Persistance : les blocages de l’interface coïncident avec des vidages d’enregistrement, des opérations SQLite, des importations/exportations, des écritures de synchronisation ou la sérialisation JSON. Séparez les mises à jour visuelles urgentes du travail de stockage.
- Thread natif/de l’interface : la trace Android ou WebView sur ordinateur montre des blocages d’animation, de mise en page ou de saisie en dehors de JavaScript. Réduisez les changements de mise en page, le défilement imbriqué ou le trafic sur le pont natif.

Pour le ralentissement à l’ouverture d’un projet signalé dans #643, collectez d’abord des captures Android et ordinateur. Si la dérivation domine, utilisez #647. Si le nombre de lignes montées domine, utilisez #648. Si la persistance ou les blocages du thread natif/de l’interface dominent, ouvrez un ticket de suivi plus petit avec l’artefact de capture et le parcours exact.

## Conseils pour la base de données

1. Utilisez des index FTS pour la recherche en texte libre lorsqu’ils sont disponibles.
2. Indexez les filtres courants de statut, de projet et de date.
3. Regroupez les écritures dans des transactions pour les chemins d’enregistrement de grandes importations/synchronisations.
4. Normalisez les colonnes JSON aux frontières de lecture et évitez les cycles répétés d’analyse/sérialisation.

## Liste de contrôle du profilage

1. Reproduisez avec un jeu de données réaliste (des milliers de tâches, de grands projets).
2. Mesurez avant/après (nombre de rendus, temps de requête, durée de synchronisation).
3. Vérifiez la croissance de la mémoire pendant les longues sessions.
4. Vérifiez l’absence de régressions sur les appareils/simulateurs d’entrée de gamme.

## Suggestions de budgets de performance

- Les interactions avec les listes doivent rester réactives (budget de trame <16ms lorsque possible).
- Les requêtes de recherche doivent prendre moins de 100 ms sur les jeux de données locaux habituels.
- La fusion de synchronisation doit évoluer linéairement avec le nombre d’entités.
- Évitez de bloquer les threads de l’interface avec des opérations de fichier/réseau.

## Hygiène continue des performances

1. Ajoutez des tests ciblés lorsque vous corrigez des régressions (multiplication des rendus, complexité de la fusion, comportement des nouvelles tentatives).
2. Conservez dans la CI les contrôles de budget pour les vues et les chemins de synchronisation critiques.
3. Préférez les petites améliorations mesurables aux refactorisations générales spéculatives.
4. Reprofilez après chaque optimisation afin de vérifier l’impact réel.

## Documentation connexe

- [Architecture](/fr/developers/architecture)
- [API du cœur](/fr/developers/core-api)
- [Données et synchronisation](/fr/data-sync/)
- [Diagnostics et journaux](/fr/data-sync/diagnostics-logs)
