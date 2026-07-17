# Raccourcis Apple

Mindwtr prend en charge les Raccourcis Apple grâce aux App Intents natifs sur iPhone et iPad. La première version se concentre sur la boucle de capture GTD : consignez rapidement vos préoccupations dans Mindwtr, puis examinez-les et traitez-les dans l’application.

Cette intégration est volontairement moins étendue que le système mature de raccourcis de Things. Things propose des actions pour créer, rechercher, modifier et afficher des éléments, ainsi que des actions personnalisées sur les éléments et les listes. La v1 de Mindwtr se concentre sur la capture et la navigation afin de rester fiable et de ne pas contourner les mécanismes habituels de Mindwtr pour la création, la révision et la synchronisation des tâches.

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

### Ajouter à la boîte de réception Mindwtr

Utilisez **Ajouter à la boîte de réception Mindwtr** pour créer une tâche silencieusement, sans ouvrir Mindwtr. C’est l’action à utiliser dans les automatisations de Raccourcis. Un déclencheur horaire, de calendrier ou de localisation peut ajouter une tâche sans que personne ne touche le téléphone.

Paramètres :

| Paramètre | Obligatoire | Remarques |
| --- | --- | --- |
| Tâche | Oui | Le titre de la tâche. Un titre vide fait échouer le raccourci. |
| Note | Non | Ajoutée comme description de la tâche. |
| Étiquettes | Non | Étiquettes séparées par des virgules. Mindwtr les normalise au format `#tag`. |
| Projet | Non | Correspond à un projet actif par son titre. Les projets inconnus ou archivés sont ignorés, et la tâche arrive quand même dans la boîte de réception. |

Le texte de **Tâche** prend en charge la [syntaxe d’ajout rapide](/fr/use/mobile#syntaxe-d-ajout-rapide) complète (`/due:`, `@context`, `#tag`, `+Project`, etc.). Elle est analysée à la création de la tâche, exactement comme dans la zone de capture de l’app ; le réglage **Nettoyer le texte de l’ajout rapide** détermine si la syntaxe reconnue est retirée du titre.

Ce qui se passe lors de l’exécution :

1. L’action place la capture dans la file d’attente de l’appareil et se termine immédiatement. Mindwtr reste en arrière-plan.
2. À la prochaine ouverture de Mindwtr (ou à son retour au premier plan), la tâche en attente est créée dans la boîte de réception via le magasin et le flux de synchronisation habituels.

Comme la tâche est créée à la prochaine ouverture, elle n’apparaît pas sur les autres appareils synchronisés et aucun rappel ne se déclenche tant que Mindwtr n’a pas été relancé sur cet iPhone ou cet iPad. Le paramètre **Projet** ne crée jamais de nouveaux projets ; en revanche, un `+Project` écrit dans le texte de la tâche suit les règles de l’ajout rapide et peut en créer un.

### Exemple : tâche déclenchée par le calendrier

1. Dans l’app **Raccourcis**, ouvrez **Automatisation** et créez une nouvelle automatisation.
2. Choisissez un déclencheur, par exemple un événement de calendrier dont le titre contient « collecte des déchets ».
3. Ajoutez l’action **Ajouter à la boîte de réception Mindwtr** de Mindwtr et définissez **Tâche** sur « Sortir les poubelles ».
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

## Limites de la v1

La v1 de Mindwtr n’inclut pas :

- De types de tâche ou de liste AppEntity personnalisés.
- D’actions de recherche, modification, duplication, suppression ou traitement par lots.
- De planification directe de tâches récurrentes, de rappels ou de dates depuis Raccourcis.
- De prise en charge de l’Apple Watch ou de CarPlay.

Ce sont de bonnes pistes pour l’avenir, mais elles nécessitent une conception soigneuse, car les modifications et les écritures en arrière-plan doivent préserver la synchronisation locale d’abord et les règles du flux GTD de Mindwtr.

## Liens connexes

- [Guide d’utilisation mobile](/fr/use/mobile)
- [Flux GTD dans Mindwtr](/fr/use/gtd-workflow)
- [Données et synchronisation](/fr/data-sync/)
- [Things : utiliser les Raccourcis Apple](https://culturedcode.com/things/support/articles/2955145/)
- [Things : actions Raccourcis](https://culturedcode.com/things/support/articles/9596775/)
- [Apple : présentation d’App Intents](https://developer.apple.com/videos/play/wwdc2024/10210/)
