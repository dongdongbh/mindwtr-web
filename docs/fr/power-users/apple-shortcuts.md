# Raccourcis Apple

Mindwtr prend en charge les Raccourcis Apple grâce aux App Intents natifs sur iPhone et iPad, en se concentrant sur la boucle de capture GTD : consignez rapidement vos préoccupations dans Mindwtr, puis examinez-les et traitez-les dans l’application. La version 2 ajoute la capture silencieuse avec dates, la lecture des tâches dans les raccourcis et la recherche Spotlight.

Cette intégration est volontairement moins étendue que le système mature de raccourcis de Things. Mindwtr étoffe son jeu d’actions avec prudence, afin de rester fiable et de ne jamais contourner les mécanismes habituels de Mindwtr pour la création, la révision et la synchronisation des tâches.

## Disponibilité

La prise en charge des Raccourcis Apple est disponible dans les versions iOS qui incluent l’intégration App Intents de Mindwtr.

Surfaces prises en charge :

| Surface | Prise en charge |
| --- | --- |
| App Raccourcis | Oui |
| Siri | Oui |
| Spotlight / raccourcis suggérés | Oui |
| Bouton Action exécutant un raccourci | Oui |
| Actions directes sur Apple Watch | Non, pas dans la v1 |
| CarPlay | Non, pas dans la v1 |

## Actions

### Capturer dans Mindwtr

Utilisez **Capturer dans Mindwtr** pour envoyer une tâche vers le flux de confirmation de capture de la boîte de réception de Mindwtr.

Paramètres :

| Paramètre | Obligatoire | Remarques |
| --- | --- | --- |
| Tâche | Oui | Le titre de la tâche. Les titres vides sont refusés. |
| Note | Non | Ajoutée comme description de la tâche. |
| Étiquettes | Non | Étiquettes séparées par des virgules. Mindwtr les normalise au format `#tag` lors de l’enregistrement. |
| Projet | Non | Correspond à un projet actif par son titre, ou crée le projet lors de l’enregistrement de la capture. |

Ce qui se passe lors de l’exécution :

1. Raccourcis ouvre Mindwtr.
2. Mindwtr affiche l’écran de capture avec le titre et les métadonnées facultatives préremplis.
3. Vous vérifiez la capture et l’enregistrez via le flux habituel de Mindwtr.

La tâche n’est pas écrite directement depuis Swift. Sa création reste ainsi gérée par le magasin, SQLite, le système de révision et la logique de synchronisation existants de Mindwtr.

### Ouvrir une liste Mindwtr

Utilisez **Ouvrir une liste Mindwtr** pour accéder à une vue GTD.

Destinations prises en charge :

| Liste | Ouvre |
| --- | --- |
| Boîte de réception | Boîte de réception |
| Focus | Focus / Prochaines actions |
| En attente | En attente de |
| Un jour | Un jour/Peut-être |
| Projets | Projets |
| Revue | Revue |
| Calendrier | Calendrier |

Le raccourci ouvre par défaut la boîte de réception si aucune liste n’est configurée.

### Ajouter à Mindwtr

Utilisez **Ajouter à Mindwtr** (appelée **Ajouter à la boîte de réception Mindwtr** avant la v2) pour créer une tâche silencieusement, sans ouvrir Mindwtr. C’est l’action à utiliser dans les automatisations de Raccourcis. Un déclencheur horaire, de calendrier ou de localisation peut ajouter une tâche sans que personne ne touche le téléphone.

Paramètres :

| Paramètre | Obligatoire | Remarques |
| --- | --- | --- |
| Tâche | Oui | Le titre de la tâche. Un titre vide fait échouer le raccourci. |
| Note | Non | Ajoutée comme description de la tâche. |
| Étiquettes | Non | Étiquettes séparées par des virgules. Mindwtr les normalise au format `#tag`. |
| Projet | Non | Correspond à un projet actif par son titre. Les projets inconnus ou archivés sont ignorés, et la tâche arrive quand même dans la boîte de réception. |
| Date d’échéance | Non | La date d’échéance de la tâche. Enregistrée comme une date sans heure, elle ne programme donc jamais de rappel à elle seule. |
| Date de début | Non | La date de début de la tâche, sans heure comme la date d’échéance. |

Le texte de **Tâche** prend en charge la [syntaxe d’ajout rapide](/fr/use/mobile#syntaxe-d-ajout-rapide) complète (`/due:`, `@context`, `#tag`, `+Project`, etc.). Elle est analysée à la création de la tâche, exactement comme dans la zone de capture de l’app ; la syntaxe reconnue quitte le titre comme dans l’app.

Ce qui se passe lors de l’exécution :

1. L’action place la capture dans la file d’attente de l’appareil et se termine immédiatement. Mindwtr reste en arrière-plan.
2. À la prochaine ouverture de Mindwtr (ou à son retour au premier plan), la tâche en attente est créée dans la boîte de réception via le magasin et le flux de synchronisation habituels.

Comme la tâche est créée à la prochaine ouverture, elle n’apparaît pas sur les autres appareils synchronisés et aucun rappel ne se déclenche tant que Mindwtr n’a pas été relancé sur cet iPhone ou cet iPad. Le paramètre **Projet** ne crée jamais de nouveaux projets ; en revanche, un `+Project` écrit dans le texte de la tâche suit les règles de l’ajout rapide et peut en créer un.

### Obtenir les tâches Mindwtr

Utilisez **Obtenir les tâches Mindwtr** pour lire des tâches dans un raccourci sans ouvrir l’app, afin de les enchaîner avec d’autres actions (les faire énoncer, afficher un menu, les envoyer quelque part).

| Paramètre | Obligatoire | Remarques |
| --- | --- | --- |
| Liste | Oui | L’une des listes Boîte de réception, Focus, Prochaines actions, En attente ou Un jour. |
| Projet | Non | Un projet actif par son titre. S’il est défini, il prime sur la liste. |

Les résultats proviennent d’un instantané que Mindwtr tient à jour pendant son exécution, limité à 50 tâches par liste ou par projet ; ils reflètent donc la dernière ouverture de l’app, avec la même fraîcheur que les widgets.

### Tâches dans Spotlight

À partir d’iOS 18, les tâches Mindwtr apparaissent dans la recherche Spotlight. En ouvrir une vous conduit à la liste correspondante dans Mindwtr. L’index se rafraîchit à l’exécution de l’app, comme pour Obtenir les tâches Mindwtr.

### Exemple : tâche déclenchée par le calendrier

1. Dans l’app **Raccourcis**, ouvrez **Automatisation** et créez une nouvelle automatisation.
2. Choisissez un déclencheur, par exemple un événement de calendrier dont le titre contient « collecte des déchets ».
3. Ajoutez l’action **Ajouter à Mindwtr** de Mindwtr et définissez **Tâche** sur « Sortir les poubelles ».
4. Réglez l’automatisation sur **Exécuter immédiatement** afin qu’aucune confirmation ne soit nécessaire.

## Exemples de raccourcis

### Capturer à la voix

1. Ouvrez l’app **Raccourcis** d’Apple.
2. Créez un nouveau raccourci.
3. Ajoutez **Dicter du texte** ou **Demander une saisie**.
4. Ajoutez l’action **Capturer dans Mindwtr** de Mindwtr.
5. Transmettez le texte dicté à **Tâche**.
6. Vous pouvez définir **Étiquettes** sur une valeur comme `phone,errands`.

Cette méthode est utile pour capturer rapidement une idée en marchant, pendant un trajet ou en passant d’une app à une autre. La reconnaissance vocale de Siri peut encore manquer des mots dans certains environnements ; vérifiez donc la capture avant de l’enregistrer.

### Ouvrir Focus avec le bouton Action

1. Créez un raccourci utilisant **Ouvrir une liste Mindwtr**.
2. Définissez **Liste** sur **Focus**.
3. Dans les réglages d’iOS, attribuez ce raccourci au bouton Action.

## Solution de repli avec le schéma d’URL

Mindwtr prend également en charge l’automatisation par schéma d’URL. Utilisez-la lorsqu’un autre outil d’automatisation ne détecte pas les App Intents natifs.

| URL | Action |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Ouvrir la capture avec un titre |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Ouvrir la capture avec un titre et une note |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Ouvrir la capture avec un projet et des étiquettes |
| `mindwtr://open-feature?feature=focus` | Ouvrir Focus |
| `mindwtr://open-feature?feature=review` | Ouvrir la revue |

Alias de capture pris en charge :

| Champ | Alias |
| --- | --- |
| Titre | `title`, `text`, `name`, `thingName`, `itemListElementName`, `itemListName` |
| Note | `note`, `description`, `body`, `thingDescription`, `itemListDescription` |

## Limites actuelles

La prise en charge des Raccourcis par Mindwtr n’inclut pas encore :

- D’actions de modification, d’achèvement, de duplication, de suppression ou de traitement par lots.
- De planification de tâches récurrentes ou de rappels depuis Raccourcis (les dates d’échéance et de début sont sans heure).
- De prise en charge de l’Apple Watch ou de CarPlay.

Les actions d’écriture au-delà de la capture sont la prochaine étape, bâties sur les entités de tâche introduites en v2 ; elles nécessitent une conception soigneuse, car les modifications et les écritures en arrière-plan doivent préserver la synchronisation locale d’abord et les règles du flux GTD de Mindwtr.

## Liens connexes

- [Guide d’utilisation mobile](/fr/use/mobile)
- [Flux GTD dans Mindwtr](/fr/use/gtd-workflow)
- [Données et synchronisation](/fr/data-sync/)
- [Things : utiliser les Raccourcis Apple](https://culturedcode.com/things/support/articles/2955145/)
- [Things : actions Raccourcis](https://culturedcode.com/things/support/articles/9596775/)
- [Apple : présentation d’App Intents](https://developer.apple.com/videos/play/wwdc2024/10210/)
