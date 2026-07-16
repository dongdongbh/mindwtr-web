# Principes d’ingénierie

Principes de conception, contraintes et garde-fous issus de l’historique complet des tickets et discussions de ce dépôt (569 tickets, 89 discussions, jusqu’à la v0.9.10). Chaque principe cite les incidents qui l’ont fait émerger. Les nouvelles fonctionnalités et les correctifs doivent être vérifiés par rapport à cette page avant leur implémentation.

La plus grande leçon de cet historique est la suivante : **presque chaque bogue critique (P0/P1) était un bogue d’intégrité des données dans un chemin comportant plusieurs auteurs** — synchronisation contre interface, synchronisation contre elle-même, application contre MCP/CLI, instantané contre enregistrement incrémentiel. Les bogues de l’interface étaient nombreux mais peu coûteux ; ceux des chemins d’écriture ont coûté aux utilisateurs leurs données et leur confiance.

---

## 0. Philosophie du produit (à vérifier avant toute décision d’ingénierie)

Mindwtr est **simple par défaut et puissant quand vous en avez besoin** : divulgation progressive (les options avancées restent masquées jusqu’à ce qu’elles deviennent utiles), moins par défaut (moins de champs, moins de réglages, moins de distractions) et aucune inflation fonctionnelle (la clarté plutôt que l’encombrement). *Ne me montrez pas un cockpit alors que je veux simplement faire du vélo.*

### L’automatique l’emporte sur le manuel — déduire plutôt que demander
Si le bon résultat peut être déterminé automatiquement — à partir de la plateforme, du canal d’installation, des données existantes ou du contexte — l’application doit simplement le faire. Cela s’applique à tout, et pas seulement aux réglages : un paramètre, une demande de confirmation, un toucher supplémentaire dans un workflow ou une commande que l’utilisateur doit actionner dans l’interface représentent tous le même échec — l’application pose une question à laquelle elle pourrait répondre elle-même. Chaque étape manuelle transfère la charge cognitive de notre côté (une fois) à chaque utilisateur (pour toujours).

- **Recherche de mises à jour :** un utilisateur a demandé une option « désactiver la recherche de mises à jour », car l’application continuait à lui proposer des téléchargements GitHub pour une installation gérée par un gestionnaire de paquets. Le correctif n’était pas cette option : l’application détecte maintenant son canal d’installation et se comporte correctement pour chaque canal — rappels limités aux canaux disposant d’un flux canonique, silence total pour ceux qui gèrent eux-mêmes leurs mises à jour. Aucun réglage n’a été ajouté.
- **#832 :** la valeur par défaut du raccourci global d’ajout rapide suit les conventions de chaque plateforme (activé avec une combinaison sûre sous macOS/Linux, désactivé sous Windows où les raccourcis globaux interceptent silencieusement des touches), au lieu de demander aux utilisateurs de trouver eux-mêmes la bonne configuration.
- **#833 :** les sessions de concentration terminées créditent automatiquement leurs minutes à la tâche liée — la saisie manuelle sert à corriger, elle ne constitue pas le workflow. Et lorsqu’un comportement ne peut réellement pas être déduit et que la demande existe, placez-le derrière un commutateur *existant* avant d’en créer un nouveau : le suivi du temps des tâches apparaît uniquement lorsque le minuteur Pomodoro existant et sa liaison aux tâches sont activés ; aucun nouveau réglage n’a été ajouté.

**Garde-fous :** avant d’ajouter un réglage, une invite ou une étape manuelle à un workflow, prouvez que le résultat ne peut être déduit ou prédit. Avant de créer un nouveau réglage ou une nouvelle possibilité d’action, prouvez qu’aucun élément existant n’exprime déjà la même intention. Les valeurs par défaut suivent les bonnes pratiques de la plateforme, et non la neutralité. Les commandes manuelles sont une solution de repli pour corriger, jamais le chemin principal lorsque l’automatisation est possible.

---

## 1. Écritures et persistance

### P1 — Chaque écriture est protégée par la révision ; l’ordre d’arrivée n’est jamais considéré comme fiable
Une charge utile avec une valeur `rev` inférieure ne doit pas pouvoir écraser une ligne avec une valeur `rev` supérieure. Cette règle est appliquée dans la couche la plus basse (l’upsert SQL), et non dans les appelants.

- **#693 (P1, critique) :** `updateTask` persistait les données au moyen d’un `saveTask` lancé sans attendre son résultat, tandis qu’un `saveData` différé de l’instantané complet pouvait arriver plus tard et écraser la ligne la plus récente — l’upsert de tâche ne comportait aucune protection de révision. Dans les processus MCP de courte durée, l’écriture était entièrement perdue. Correctif : `WHERE tasks.rev IS NULL OR tasks.rev <= excluded.rev` sur l’upsert, plus le suivi de l’enregistrement en cours dans `flushPendingSave()`.
- **#316 :** les modifications effectuées *pendant* une synchronisation (terminer une tâche, changer de domaine) étaient annulées lorsque l’actualisation de la synchronisation en cours arrivait. Trois correctifs ont été nécessaires : ignorer les résultats de récupération périmés, avancer le marqueur de modification locale même pour des modifications effectuées dans la même milliseconde, puis ajouter des diagnostics pour trouver le reste.

**Garde-fou :** tout nouveau chemin de persistance (nouvelle entité, nouvel appel d’enregistrement, nouveau processus) doit répondre à la question : *qu’est-ce qui empêche une charge utile plus ancienne d’écraser une charge plus récente ?* Si la réponse est « le timing », c’est un bogue.

### P2 — Les suppressions détachent, jamais elles ne se propagent ; les restaurations l’emportent sur les pierres tombales
- **#609 (P0, critique) :** supprimer un domaine supprimait toutes ses tâches et tous ses projets. Pire, après une restauration depuis une sauvegarde, les pierres tombales de la synchronisation continuaient à supprimer de nouveau les données restaurées à chaque cycle. Correctif : la suppression d’un domaine efface maintenant uniquement `areaId` ; la restauration d’une sauvegarde marque les enregistrements récupérés comme des données locales récentes afin que les pierres tombales distantes périmées perdent.

**Garde-fou :** supprimer un conteneur (domaine/projet/section/étiquette) détache ses enfants. Tout chemin de restauration/importation doit réattribuer les données (nouveaux rev/updatedAt) afin qu’elles ne puissent pas perdre face aux pierres tombales créées par le bogue même dont l’utilisateur tente de se remettre.

### P3 — Une réussite lancée sans attendre est un mensonge ; ne répondre qu’après une persistance durable
- **#694 :** les outils d’écriture MCP renvoyaient la tâche modifiée depuis le store en mémoire, mais `saveData` avait silencieusement échoué — les lectures (connexion différente à la base de données) et l’application pour ordinateur affichaient les anciennes données. L’outil prétendait avoir « réussi » alors que rien n’avait été persisté.
- **#693 :** même origine : le processus se terminait avant la résolution de la promesse d’enregistrement non suivie.

**Garde-fou :** une réponse d’API/d’outil/d’IPC déclarant la réussite d’une écriture ne doit être envoyée qu’après confirmation par la couche de stockage. Suivez chaque promesse d’enregistrement ; `flushPendingSave()` doit couvrir *tout* le travail en attente.

---

## 2. Convergence de la synchronisation

### P4 — La fusion doit atteindre un point fixe : refusionner des données déjà synchronisées est une opération nulle
- **#698 :** un ancien champ *supprimé* (`showFutureRecurrence`) subsistait dans les charges utiles stockées d’un côté. Les signatures de contenu étaient construites par décomposition `{...task}`, de sorte que la clé inconnue produisait **325 conflits perpétuels** à chaque synchronisation, avec des révisions et horodatages identiques.
- **#418 :** `null` et les champs facultatifs *omis* produisaient des empreintes différentes → une infinité de faux conflits, ainsi que de faux avertissements de « décalage de l’horloge de 3 heures » causés par des horodatages d’entités périmés, et non par les horloges.
- **#142 :** un ancien `revBy` non valide interrompait entièrement la validation de la fusion jusqu’à sa correction.

**Garde-fous :**
- Les signatures de contenu sont calculées à partir d’une **liste explicite de champs autorisés**, jamais par décomposition d’objet. Les clés inconnues ou anciennes ne sont jamais prises en compte dans la comparaison.
- La normalisation est idempotente et convergente : `normalize(normalize(x)) === normalize(x)`, et `null` ≡ absent pour les champs facultatifs.
- Lorsqu’un champ est retiré du schéma, fournissez une étape de migration/suppression — les anciennes charges utiles restent sur les systèmes distants pendant des années.
- Un test « une nouvelle synchronisation de données alignées ne produit aucun conflit » doit faire partie de la suite pour chaque modification des signatures.

### P5 — Les écritures de la synchronisation elle-même doivent être invisibles à ses déclencheurs
La saga #718/#725 « la synchronisation ne s’arrête jamais » a nécessité **six correctifs**, chacun correspondant à une boucle de rétroaction différente :
1. la persistance de la synchronisation ne marquait pas la fenêtre d’exclusion de l’observateur SQLite → sa propre écriture était considérée comme une modification externe ;
2. les écritures d’état/d’historique de synchronisation marquaient de nouveau l’état des données comme modifié ;
3. les écritures d’état enregistraient un **instantané périmé en mémoire** qui annulait les entités venant d’être fusionnées (remettant la même fusion en file) ;
4. la déduplication au chargement d’un nom de domaine en double réécrivait les données à *chaque chargement* ;
5. la liste des personnes n’était pas persistée dans SQLite → elle était rétablie et marquée comme modifiée à chaque chargement ;
6. le bruit du fichier `mindwtr.db-shm` était traité comme une écriture externe.

Bogues antérieurs de la même catégorie : **#309** (l’observateur fusionnait le propre `data.json` de l’application comme une modification externe — il fallait une *fenêtre* d’empreintes d’écritures propres récentes, et non seulement la dernière), **#502** (activité constante de synchronisation dans l’interface).

**Garde-fous :**
- Chaque octet écrit par la synchronisation (données, état, historique, instantanés) est marqué comme une écriture propre pour chaque observateur susceptible de le voir.
- Les métadonnées de synchronisation (état/historique) sont écrites au-dessus de l’instantané persisté, jamais à partir d’un état de l’interface potentiellement périmé — mieux encore, conservez-les hors bande par rapport aux données utilisateur.
- **Le chargement des données ne les modifie jamais.** Les migrations/déduplications sont des passages uniques explicites, et non une normalisation au chargement qui marque l’état comme modifié.
- Chaque déclencheur automatique nécessite un argument de terminaison : aucun travail → aucune exécution (#725), échec → période de récupération (#718 correctif 5, #133 mode avion), réussite → inactif.

### P6 — Les modifications de l’utilisateur pendant la synchronisation sont sacrées
- **#323 :** cliquer sur la liste déroulante Statut déclenchait une synchronisation à la prise/perte de focus qui annulait toutes les modifications non enregistrées dans l’éditeur ouvert. Correctif : la synchronisation automatique ignore les déclencheurs de prise/perte de focus lorsqu’un éditeur est ouvert.
- **#316 / #128 :** « chaque action est annulée après quelques secondes » — le symptôme le plus destructeur de confiance de tout l’historique.

**Garde-fou :** tout nouveau déclencheur de synchronisation doit être examiné en se demandant « que se passe-t-il si l’utilisateur est en train de modifier un élément ? ». Le côté de la modification locale remet l’opération en file ; il n’est jamais écrasé. (C’est la raison d’être de l’instantané `lastDataChangeAt`, de `LocalSyncAbort` et du mécanisme de remise en file — les nouveaux travaux de synchronisation doivent passer par eux.)

### P7 — Le document de synchronisation est une seule unité de fusion ; ne le divisez pas sans stratégie transactionnelle
- **#629 (discussion) :** la division en `archive.json` a été rejetée — archiver/désarchiver devient une transaction entre fichiers ; les backends de fichiers téléversent les fichiers indépendamment → état incohérent. Orientation consignée : synchronisation incrémentielle au niveau des enregistrements, et non davantage de fichiers.
- **#113 (discussion) :** les conflits Syncthing se produisent par conception au niveau des fichiers ; les backends contrôlés par l’application (WebDAV/cloud) sont la solution recommandée, pas une dénomination plus intelligente des fichiers.

**Contrainte :** les fonctionnalités ne doivent pas ajouter un second document synchronisé (ou des fichiers par entité), sauf si elles apportent un protocole atomique de commit multifichier. Préférez l’ajout de champs aux entités à de nouveaux documents de premier niveau.

---

## 3. Pièces jointes (règle en deux phases pour le binaire et les métadonnées)

### P8 — Téléverser d’abord les octets ; publier ensuite les métadonnées ; une 404 est définitive
- **#176 :** la synchronisation remplaçait l’`uri` de la pièce jointe par `""` et publiait les métadonnées *avant* la fin du téléversement → pièces jointes sans `cloudKey`, fichier absent partout, irrécupérables. Puis le correctif « bloquer jusqu’au téléversement » a révélé des téléversements qui ne s’exécutaient jamais (URI `content://` sans métadonnées de taille) → synchronisation bloquée pour toujours. Quatre correctifs au total.
- **#213 / #128 :** des `pendingRemoteDeletes` périmés et des métadonnées de fichiers distants manquants provoquaient des boucles infinies de nouvelles tentatives ; supprimer les données à la main ne servait à rien, car la synchronisation les restaurait.
- **#399 :** les URI de documents SAF avec barre oblique finale rendaient invisible le dossier existant des pièces jointes → une *nouvelle copie complète de toutes les pièces jointes à chaque synchronisation*.
- **#655 :** les 404 distantes étaient retentées/interrogées en boucle indéfiniment ; une erreur `EISDIR` due à une collision de fichier temporaire suivait.

**Garde-fous :**
- L’ordre est invariant : octets téléversés → `cloudKey` enregistré → métadonnées publiées. Jamais l’inverse.
- Chaque échec de fichier distant est classé comme récupérable (borné, avec temporisation progressive) ou définitif (404 → marquer comme irrécupérable, arrêter). Aucune nouvelle tentative non bornée dans le code des pièces jointes.
- Les contrôles d’identité utilisent des ID/clés canoniques, jamais les formes de chaîne des URI des fournisseurs (barres obliques finales SAF, particularités de `content://`).
- Les phases des pièces jointes sont ignorées lorsque les métadonnées n’indiquent aucun travail en attente (pour les performances *et* pour éviter les boucles).
- Danger connu encore ouvert (revue 2026-06) : `duplicateTask` partage le `cloudKey` entre les copies sans compteur de références — supprimer l’une efface les octets de l’autre. N’ajoutez pas de nouveaux chemins à clé partagée.

---

## 4. Accès multiprocessus (MCP, CLI, API locale)

### P9 — Un store canonique, un chemin d’écriture sérialisé ; chaque auteur est un participant à part entière ou reste en lecture seule
- **#179 / #285 :** le CLI écrivait les tâches dans `data.json` — qui est un **miroir d’exportation**, lu une fois au démarrage puis écrasé par la suite — sans `rev`/`revBy`/`taskMode` ; même lorsqu’elles étaient importées, la fusion les supprimait donc silencieusement.
- **#722 :** l’application pour ordinateur et le MCP local écrivaient simultanément dans le même SQLite → conflits de verrouillage ; le dangereux contournement (deux auteurs par l’intermédiaire d’un stockage partagé) a dû être déclaré comme non pris en charge. Correctif : échouer immédiatement lorsqu’un verrou d’écriture est détenu, **recharger les données actuelles, retenter toute l’opération** — ne jamais reprendre depuis un instantané antérieur au verrou.
- **#650 :** l’instantané de lecture WAL de longue durée de l’application pour ordinateur ne voyait pas les écritures MCP avant un redémarrage.
- **#367 :** le bac à sable du Mac App Store avait déplacé la base de données ; le résolveur de chemins de MCP ne connaissait que les chemins hors bac à sable.

**Garde-fous :**
- Toute création d’entité passe par les fabriques du cœur, qui définissent chaque champ requis pour la synchronisation (`rev`, `revBy`, `createdAt`, `updatedAt`, valeurs par défaut). Un auteur qui construit du JSON à la main est un futur bogue de perte de données. (L’absence de marquage de révision dans `POST /v1/tasks` sur le serveur cloud appartient à la même catégorie — correctif en attente.)
- Les auteurs externes intègrent soit le store du cœur et l’adaptateur de stockage, soit restent en lecture seule.
- Protocole d’écriture interprocessus : acquérir le verrou → (en cas de conflit) recharger → réappliquer → écrire. Il est interdit de poursuivre depuis un instantané périmé.
- La résolution des chemins doit énumérer les canaux d’installation en bac à sable (conteneurs App Store, Flatpak, etc.).

---

## 5. Dates, récurrence et sémantique des statuts

### P10 — Une fonction partagée unique pour « l’instance suivante » ; tous les champs avancent ensemble ; la régénération est idempotente
Le groupe de fonctionnalités lié à la récurrence est celui qui a été le plus souvent cassé de nouveau dans l’historique :
- **#140 :** la récurrence personnalisée avançait `dueDate`, mais pas `startTime` → la tâche terminée réapparaissait immédiatement dans Focus.
- **#241 :** l’instance régénérée perdait `sectionId`/`areaId`.
- **#187 → #717 :** les tâches suivantes répétées après achèvement arrivaient immédiatement dans Next (aucun `startTime` différé) ; le même symptôme est revenu un cycle de version plus tard pour les dates de début sans heure et les changements de mode.
- **#662 :** terminer une tâche créait un doublon lorsqu’une tâche suivante ouverte équivalente existait déjà.
- **#557 :** une petite fonctionnalité de projection a nécessité **plus de 7 correctifs de suivi** : nième jour de la semaine contre jour du mois, ancrage en l’absence de date de début, métadonnées mensuelles perdues lors des cycles chargement/enregistrement/modification, projections mal étiquetées.
- **#17 :** les RRULE limitées par COUNT étaient développées « à partir du mois actuel », ressuscitant des séries vieilles de 10 ans.

**Garde-fous :**
- Une seule fonction du cœur calcule exactement l’instance suivante. Elle doit : faire avancer de manière cohérente le début/l’échéance/la revue ; préserver *tous* les champs de contexte (projet, section, domaine, contextes, étiquettes, règles de réinitialisation de la liste de contrôle) ; conserver les valeurs sans heure sous forme de dates seules ; ancrer le développement de la RRULE au début de la série, et non à « maintenant » ; et être idempotente (ne rien faire si une tâche suivante ouverte équivalente existe).
- Les métadonnées de récurrence doivent survivre aux cycles chargement → enregistrement → modification ; ajoutez un test d’aller-retour pour tout nouveau champ de récurrence.
- La matrice de régression pour toute modification de la récurrence : `{strict, after-completion} × {start-only, due-only, both, neither} × {daily, weekly, monthly-day, monthly-nth-weekday, yearly, COUNT-limited} × {date-only, datetime}`.

### P11 — Le statut l’emporte sur les dates ; les prédicats de visibilité vivent une seule fois dans le cœur
- **#341 :** une tâche WAITING apparaissait dans NEXT parce qu’une règle de date de début ignorait le statut.
- **#237 :** l’application pour ordinateur et l’application mobile calculaient « Aujourd’hui » différemment ; des tâches visibles sur une plateforme étaient invisibles sur l’autre. Le correctif s’est achevé lorsque les deux plateformes ont utilisé une règle partagée unique.
- **#144 :** la promotion automatique de scheduled→next a été implémentée précisément dans la maintenance de récupération du cœur afin que les deux applications en héritent.
- **#591 :** règle dérivée du dépôt lui-même : la cohérence des dates (par exemple, `startTime` postérieur à `dueDate`) est détectée de manière centralisée comme un **état dérivé**, dans la normalisation du cœur, appliquée à *tous* les chemins d’écriture — et les entrées synchronisées sont considérées comme non fiables et vérifiées de nouveau.

**Garde-fous :**
- Tout prédicat qui décide où une tâche apparaît (`isToday`, `isAvailable`, différée, revue arrivée à échéance) est défini dans `packages/core` et importé par les deux applications. Une vue qui le réimplémente contient un bogue, même si elle produit actuellement le même résultat.
- Le statut est l’axe principal ; les dates modulent au sein d’un statut, jamais d’un statut à l’autre.
- Ne modifiez pas automatiquement les dates de l’utilisateur pour imposer leur cohérence — affichez plutôt des avertissements dérivés (résolution de #591 : un utilisateur peut délibérément conserver une tâche en retard mais différée).

### P12 — Une seule instance active par tâche récurrente est un invariant du produit
- **#552 → #557 :** la précréation d’instances futures réelles a été délibérément rejetée (« rend l’achèvement, la suppression, la synchronisation et le comportement des doublons plus difficiles à comprendre ») ; la conception acceptée était une **projection en lecture seule**.

**Contrainte :** les fonctionnalités qui souhaitent une visibilité future produisent des données dérivées/projetées et non modifiables — jamais de vrais enregistrements créés à l’avance.

### P13 — Les valeurs de date seule ne reçoivent jamais une heure implicite
- **#298 (critique) :** les dates sans heure étaient planifiées comme des *alarmes à minuit*, réveillant les utilisateurs la nuit ; révoquer l’autorisation des notifications n’effaçait pas les alarmes déjà planifiées, qui continuaient donc à sonner sans interface visible.
- **#205 :** les années saisies étaient converties en 19xx ; les segments de date partiels changeaient d’ère.

**Garde-fous :** un champ contenant uniquement une date ne planifie rien tant que l’utilisateur ne définit pas d’heure. La révocation de l’autorisation annule tout ce qui est déjà planifié. La planification des alarmes/notifications est idempotente et silencieuse lors d’un nouvel enregistrement (tempête de notifications « cette alarme est déjà définie » de #418).

---

## 6. Réglages et état hors tâches

### P14 — Classer chaque réglage : synchronisé / propre à l’appareil / session d’interface — et les valeurs par défaut ne l’emportent jamais lors des fusions
- **#120 :** la synchronisation réinitialisait les réglages aux valeurs par défaut (la valeur par défaut distante écrasait la valeur locale explicite).
- **#62 :** les réglages étaient perdus lors d’une mise à niveau de l’application.
- **#316 :** le *filtre de domaine de l’interface* se trouvait à un emplacement où une actualisation de synchronisation pouvait l’écraser.
- **#488 :** changer la densité réinitialisait la taille du texte (le mécanisme d’écriture d’un réglage écrasait les réglages voisins).

**Garde-fous :** les nouveaux réglages déclarent leur classe dès leur création. L’état de la session d’interface (filtre actuel, vue sélectionnée) ne vit jamais dans le document de réglages synchronisé. Les réglages sont fusionnés champ par champ ; une valeur explicite l’emporte toujours sur une valeur par défaut. Les écritures de réglages passent par une seule fonction de mise à jour qui ne peut pas supprimer les clés voisines.

---

## 7. Ingénierie des publications et bacs à sable des plateformes

### P15 — Chaque canal de distribution est un environnement d’exécution différent ; valider l’artefact du canal, pas la base de code
- **#715/#674/#723 :** l’APK FOSS de la v0.9.9 plantait au démarrage pour tous les utilisateurs F-Droid/Obtainium (échec d’interopérabilité de modules uniquement dans l’ensemble de dépendances FOSS). L’APK ordinaire fonctionnait — tester un canal ne prouvait rien pour l’autre.
- **#583 (P0) :** Flatpak ne démarrait pas — bibliothèque partagée appindicator absente uniquement de l’environnement d’exécution Flatpak.
- **#234 :** AUR a cassé à plusieurs reprises (configuration Tauri injectée par la CI, particularités des `overrides` Bun, puis tests instables dans `check()`) ; la solution a été une **barrière du pipeline de publication qui construit le paquet AUR dans un conteneur Arch propre** — le modèle des barrières de canal.
- **#539 :** l’outil de modification de la cible JVM de F-Droid omettait les modules Android locaux.
- **#209 :** plantage du Windows Store : l’initialisation de la zone de notification/du raccourci global était fatale dans le bac à sable MSIX ; un *conflit* de raccourci enregistré pouvait également interrompre le démarrage.
- **#198 :** plantage Hermes — `setTimeout` référencé au niveau du module avant que les variables globales des minuteurs n’existent.

**Garde-fous :**
- Le démarrage ne dépend jamais de manière stricte de capacités facultatives (zone de notification, raccourcis globaux, trousseau, notifications, minuteurs au niveau du module). Détecter → dégrader → journaliser ; ne jamais quitter.
- Chaque canal (APK FOSS, Play, F-Droid, Flatpak, AUR, MSIX/Store, winget, homebrew, App Store, TestFlight) reçoit un test élémentaire de démarrage de *son* artefact avant publication, dans un environnement aussi fidèle que le permet la CI.
- Les ensembles de dépendances propres aux canaux (FOSS contre non-FOSS, fichiers de verrouillage Flatpak) sont traités comme des cibles de build distinctes, chacune avec sa propre CI.

### P16 — Une version étiquetée est immuable
- **#682/#674 :** après correction du plantage FOSS, l’APK corrigé — construit depuis un *commit ultérieur* — a été téléversé dans la publication v0.9.9 existante. Le contrôle de build reproductible d’IzzyOnDroid a échoué ; l’artefact a dû être retiré et la publication marquée comme remplacée.

**Garde-fous :** correctif → nouvelle étiquette → nouvelle publication (par exemple v0.9.9.1), jamais de remplacement d’artefact. Conservez les étapes de build dans des scripts versionnés du dépôt (et non directement dans le YAML du workflow) afin que les outils de build reproductible en aval suivent automatiquement les modifications.

### P17 — Les bacs à sable refusent ce dont vous supposez l’existence ; ne jamais persister une configuration qui n’a pas réussi une première fois
- **#335 :** Flatpak n’avait ni trousseau ni DBus → échec du stockage sécurisé ; le correctif a ajouté un repli sur les secrets locaux. Une dérive de l’ACL/du fichier de verrouillage d’un plugin Tauri a interrompu HTTP dans le même rapport.
- **#343 :** l’autorisation d’accès à un dossier iOS disparaissait au redémarrage → des signets à portée de sécurité étaient nécessaires.
- **#617 :** les builds Homebrew ne disposaient pas des droits CloudKit ; le workflow de publication *vérifie maintenant les droits dans l’artefact signé*.
- **#338 :** le schéma CloudKit était déployé dans Development, mais pas dans Production — tous les utilisateurs de l’App Store étaient touchés. De plus, le backend choisi était persisté dans la configuration *avant* la première synchronisation réussie, ce qui créait une boucle de plantages. Correctif : préparer le backend sans le valider jusqu’à la première réussite.
- **#727 :** l’ajout de l’entité Personne omettait un index interrogeable CloudKit → synchronisation cassée après une réinitialisation des données iCloud.

**Garde-fous :**
- Matrice de capacités par plateforme/canal : trousseau, persistance du système de fichiers, transport réseau, push, CloudKit — chacune avec détection et solution de repli.
- La configuration du backend de synchronisation n’est validée qu’après un premier aller-retour réussi.
- Le schéma côté serveur (types d’enregistrements CloudKit, index, déploiement en production ; validation du serveur cloud) fait partie de la liste de contrôle des entités et de celle de la publication.

### P18 — « Ajouter un type d’entité » est une liste de contrôle, pas une définition de type
Dérivé de #727 (index CloudKit manquant pour les personnes), #718-correctif-6 (personnes non persistées dans SQLite sur ordinateur → boucle permanente de modifications), #322 (l’ordre d’enregistrement SQLite violait l’ordre des clés étrangères et effaçait les données au redémarrage d’Android FOSS) et de l’absence de marquage de révision dans `POST /v1/tasks` sur le cloud.

Une nouvelle entité (ou un nouveau champ) doit concerner : le type du cœur et le marquage par la fabrique ; la normalisation/liste autorisée de signatures ; le schéma SQLite **et l’ordre d’enregistrement respectant les clés étrangères** ; l’exportation data.json ; la fusion de synchronisation et les pierres tombales ; le type d’enregistrement CloudKit, ses index et son déploiement en production ; la validation/le marquage du serveur cloud ; les stores des deux applications ; les libellés i18n ; les tests d’aller-retour et de convergence de la fusion.

---

## 8. Performances à grande échelle

### P19 — Le coût d’une interaction est O(visible), et non O(store) ; il est imposé par des budgets synthétiques pour de grands stores
- **#594 (discussion) + #643–#649, #195, #224 :** une base de données utilisateur de taille normale (186 kB de JSON !) faisait geler chaque toucher pendant une seconde au maximum. Causes trouvées : chaque ligne de projet parcourait toute la liste des tâches ; l’ouverture de l’éditeur reparcourait plusieurs fois toutes les tâches ; persistance de l’instantané complet à chaque modification ; abonnements larges au store qui réveillaient des écrans entiers pour des modifications sans rapport ; dossier SAF relisté pour chaque pièce jointe ; phases de synchronisation des pièces jointes lancées alors qu’aucun travail n’était en attente ; gestionnaires de toucher non idempotents qui s’accumulaient (15 éléments vides de liste de contrôle à cause de touchers mis en file).

**Garde-fous :**
- Les nouvelles vues de liste sont livrées virtualisées avec des sélecteurs ciblés ; aucun abonnement `useTaskStore()` à un tableau complet dans les écrans.
- La persistance des modifications est incrémentielle ; les enregistrements d’instantanés complets sont réservés aux limites de cycle de vie/synchronisation.
- Chaque phase périodique/de synchronisation quitte immédiatement lorsqu’il n’y a aucun travail.
- Les gestionnaires de toucher sont idempotents (des touchers en double mis en file sont sans effet).
- La suite de performances pour les grands stores (`bun run test:perf`, budgets dans `docs/performance-budgets.md`) reçoit un cas chaque fois qu’un nouveau chemin critique est livré.

---

## 9. Interface, i18n, parité

### P20 — Aucune chaîne destinée à l’utilisateur n’est codée en dur ; les clés arrivent dans toutes les locales avec la fonctionnalité
Onze tickets distincts (#244, #245, #246, #256, #257, #261, #287, #292, #215, #23, #593) concernaient une « chaîne anglaise codée en dur » ou une « clé manquante » — chacun pouvait facilement être évité pendant la revue. Le formatage des dates et jours de la semaine passe par des API tenant compte de la locale (#375, #287).

### P21 — La parité ordinateur/mobile fait partie de la fonctionnalité, ce n’est pas un suivi
- **#237** (même tâche visible sur mobile, invisible sur ordinateur), **#99**, **#149**, **#559**, **#314** : les écarts de parité sont apparus comme des bogues, à plusieurs reprises.

**Garde-fou :** toute modification de la sémantique/visibilité des tâches arrive dans le cœur et est consommée par les deux applications au cours de la même publication, ou la divergence est explicitement documentée comme intentionnelle (par exemple, la décision délibérée de #725 de conserver la synchronisation de cycle de vie sur mobile).

---

## 10. Récupération, diagnostics et workflow de correction

### P22 — La récupération doit vaincre la défaillance pour laquelle elle existe
- **#236 :** les « 5 instantanés maximum » provenaient tous des mêmes 4 minutes — inutiles pour tout incident réel. Correctif : répartir la conservation sur toute la fenêtre et ignorer les instantanés lorsque les données sont inchangées.
- **#609 :** les sauvegardes restaurées étaient supprimées de nouveau par le même bogue de synchronisation qui avait détruit les données, jusqu’à ce que la restauration sache réattribuer les enregistrements.

**Garde-fou :** testez les chemins de restauration par rapport aux véritables scénarios de perte (suppression en cascade et pierre tombale, système distant corrompu, mauvaise fusion), pas seulement en vérifiant que « le fichier existe ».

### P23 — Rendre les décisions invisibles diagnosticables avant de corriger des causes plausibles
- **#698** a pu être résolu en une seule passe *parce que* les diagnostics exposaient les `diffKeys` de chaque conflit.
- **#718** a consommé trois correctifs spéculatifs avant que les diagnostics ajoutés ne révèlent les deux véritables causes (rétablissement des personnes et bruit `-shm`).
- **#316** s’est achevé par l’ajout de diagnostics de résolution de fusion (côté gagnant, révisions, horodatages) plutôt que par une autre supposition.

**Garde-fous :** les chemins de fusion/conflit journalisent la raison et un échantillon de clés de champs (expurgé) ; les bogues de boucle reçoivent *d’abord* des diagnostics sur la source du déclenchement, puis un correctif. Pour les bogues sémantiques (récurrence, logique des dates), énumérez la matrice des entrées sous forme de tests avant de corriger — les sagas #187/#717 et #557 étaient des correctifs répétés d’un cas unique dans un espace d’entrées multidimensionnel.

### P24 — Boucle reproduire-confirmer
Ce qui a manifestement fonctionné dans cet historique et doit être conservé : étiquettes de gravité/priorité avec `status:needs-confirmation` ; correctifs publiés avec les empreintes complètes des commits ; demande aux rapporteurs d’un environnement structuré et de journaux (le canal d’installation compte — #322 concernait uniquement le build FOSS, #617 uniquement homebrew) ; retrait rapide des mauvais artefacts accompagné d’une explication claire (#674/#682).

---

## Liste de contrôle rapide pour les nouvelles fonctionnalités

Avant l’implémentation, répondez aux questions suivantes :

1. **Auteurs :** qui d’autre écrit ces données (synchronisation, MCP, CLI, autre appareil, ancienne version de l’application) ? Qu’est-ce qui protège l’ordre ? (P1, P9)
2. **Convergence :** après une première synchronisation de ma modification, une seconde synchronisation ne produit-elle aucune différence — y compris avec un appareil qui exécute la version précédente ? (P4)
3. **Déclencheurs :** mon code écrit-il quelque chose qu’un observateur/déclencheur peut voir ? Est-ce marqué comme une écriture propre ? Chaque boucle se termine-t-elle ? (P5)
4. **Modification en cours :** que se passe-t-il si l’utilisateur effectue une modification pendant l’exécution ? (P6)
5. **Entités/champs :** ai-je parcouru la liste de contrôle des entités (SQLite et ordre des clés étrangères, signatures, CloudKit et index et déploiement en production, validation du cloud, fabriques) ? (P18)
6. **Dates :** priorité au statut ? Une date seule reste-t-elle une date seule ? Le prédicat du cœur est-il partagé par les deux applications ? La matrice de récurrence est-elle couverte ? (P10–P13)
7. **Réglages :** synchronisés, propres à l’appareil ou à la session ? Une valeur par défaut peut-elle jamais l’emporter sur une valeur explicite ? (P14)
8. **Canaux :** cela touche-t-il le démarrage, les capacités natives ou les dépendances ? Quels canaux nécessitent un test élémentaire ? (P15–P17)
9. **Échelle :** quel est le coût avec 5 000 tâches ? Existe-t-il une sortie immédiate lorsqu’il n’y a aucun travail ? (P19)
10. **Échec :** chaque nouvelle tentative est-elle bornée, chaque 404 définitive, chaque restauration réattribuée ? (P8, P22)
