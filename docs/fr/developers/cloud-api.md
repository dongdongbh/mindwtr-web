# API Cloud

Mindwtr Cloud expose une petite API utilisant des jetons Bearer pour la synchronisation, l’automatisation des tâches et le transfert de pièces jointes. Elle est conçue pour les déploiements auto-hébergés et utilise le même espace de noms de jetons que le backend cloud auto-hébergé.

![Les deux portes d'accès aux données Mindwtr : un assistant IA appelle le serveur MCP, qui exécute le paquet core partagé ; les applications envoient un jeton bearer au serveur cloud auto-hébergé, qui sert le document de synchronisation, les points d'accès aux enregistrements, les pièces jointes et un flux de calendrier. Seul le contrôle de santé ne demande aucun jeton.](/assets/diagrams/api-surface.svg)

[Ouvrir le diagramme interactif](/assets/diagrams/api-surface.html)

## Authentification

Envoyez un jeton Bearer avec chaque requête `/v1/*` :

```http
Authorization: Bearer <token>
```

Utilisez `MINDWTR_CLOUD_AUTH_TOKENS` ou `MINDWTR_CLOUD_AUTH_TOKENS_FILE` en production. `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` est réservé aux automatisations contrôlées et limite le nombre de nouveaux espaces de noms avec `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES`.

## État du service

```text
GET /health
```

Renvoie l’état du serveur sans authentification.

## Synchronisation des instantanés

```text
GET /v1/data
PUT /v1/data
```

`GET /v1/data` renvoie l’instantané de l’espace de noms authentifié. Si l’espace de noms n’existe pas et que les écritures sont autorisées, le serveur crée un instantané vide.

`PUT /v1/data` valide l’`AppData` téléversé, le fusionne avec l’espace de noms existant à l’aide de l’algorithme de synchronisation du cœur, valide le résultat fusionné, puis le réécrit. Il ne s’agit pas d’un écrasement forcé. Une réponse réussie renvoie `{ ok: true, stats, clockSkewWarning }`, où `stats` possède la même structure de statistiques de fusion que celle utilisée par les diagnostics de synchronisation locale.

## Tâches

```text
GET /v1/tasks
POST /v1/tasks
GET /v1/tasks/:id
PATCH /v1/tasks/:id
DELETE /v1/tasks/:id
POST /v1/tasks/:id/complete
POST /v1/tasks/:id/archive
```

Paramètres de requête de la liste :

| Paramètre | Rôle |
| --- | --- |
| `query` | Recherche de texte insensible à la casse dans le titre et les métadonnées des tâches. |
| `status` | Un statut de tâche : `inbox`, `next`, `waiting`, `someday`, `reference`, `done` ou `archived`. |
| `all=1` | Inclut les tâches terminées. |
| `deleted=1` | Inclut les tâches supprimées de manière réversible. |
| `isFocusedToday` | `true`/`1` renvoie uniquement les tâches du focus du jour ; `false`/`0` uniquement les autres. Omettez-le pour ne pas filtrer. |
| `limit`, `offset` | Taille de la page et décalage de départ. |

La création accepte soit `title`, soit l’`input` d’ajout rapide, ainsi que des `props` facultatives. La modification accepte les champs de tâche pris en charge par la couche de validation du cloud et incrémente les métadonnées de révision de synchronisation.

Mindwtr Cloud 1.2.8 et les versions suivantes renvoient un `ETag` fort pour `GET /v1/tasks/:id` et `GET /v1/projects/:id`. Pour modifier la version que vous avez lue, transmettez cette valeur dans `If-Match` avec le `PATCH` correspondant. Le serveur vérifie le contenu actuel sous son verrou d’écriture et renvoie `412 Precondition Failed` sans écrire si le contenu a changé, y compris si seule une pièce jointe a changé. Relisez le contenu et reconstruisez votre modification avant de réessayer. Sans `If-Match`, le comportement précédent de modification sans condition reste inchangé.

## Capture

```text
POST /v1/capture
```

La capture crée une tâche dans la boîte de réception à partir d'une transcription, d'un enregistrement audio ou des deux. Le corps peut être envoyé en données de formulaire multipart, en JSON ou en texte brut, mais seules les données de formulaire multipart peuvent transporter de l'audio. Consultez [Webhook de capture](/fr/power-users/capture-webhook) pour les champs, les réponses et la configuration du Pebble Index 01.

## Projets, domaines et sections

```text
GET /v1/projects
POST /v1/projects
GET /v1/projects/:id
PATCH /v1/projects/:id
DELETE /v1/projects/:id

GET /v1/areas
POST /v1/areas
GET /v1/areas/:id
PATCH /v1/areas/:id
DELETE /v1/areas/:id

GET /v1/sections
POST /v1/sections
GET /v1/sections/:id
PATCH /v1/sections/:id
DELETE /v1/sections/:id
```

Tous les points de terminaison de liste acceptent `limit`, `offset` et `deleted=1`. Les sections acceptent également `projectId`.

Les champs de référence doivent pointer vers des enregistrements actifs. L’`areaId` d’un projet doit référencer un domaine actif. Utilisez `areaId: null` pour retirer le domaine d’un projet ; `areaId: ""` n’est pas valide. Le `projectId` d’une section doit référencer un projet actif.

La suppression de domaines, de projets et de sections utilise des pierres tombales et une réparation côté serveur afin de maintenir la validité de l’instantané pour la synchronisation.

## Recherche

```text
GET /v1/search?query=<text>
```

La recherche renvoie les tâches et les projets actifs dans des tableaux distincts. Elle prend en charge les paramètres partagés `limit` et `offset`, ainsi que des curseurs indépendants :

| Paramètre | Rôle |
| --- | --- |
| `taskLimit`, `taskOffset` | Paginer l’ensemble des résultats de tâches. |
| `projectLimit`, `projectOffset` | Paginer l’ensemble des résultats de projets. |

La réponse comprend `taskTotal`, `projectTotal` et les valeurs effectives des curseurs.

## Pièces jointes

```text
GET /v1/attachments/:path
HEAD /v1/attachments/:path
PUT /v1/attachments/:path
DELETE /v1/attachments/:path

POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

Les chemins des pièces jointes sont résolus dans l’espace de noms du jeton authentifié. Les téléversements respectent la limite d’octets configurée et les règles de validation des pièces jointes du cœur.

Le point de terminaison de nettoyage des fichiers orphelins analyse l’espace de noms afin de trouver les fichiers qui ne sont plus référencés par `data.json`. Il ignore les fichiers modifiés au cours des cinq dernières minutes afin qu’un téléversement en concurrence avec une écriture ultérieure de l’instantané ne soit pas supprimé.

## Flux de calendrier

```text
GET /v1/calendar/feed
POST /v1/calendar/feed
DELETE /v1/calendar/feed

GET /v1/calendar/:token.ics
```

Les trois premiers exigent le jeton bearer et permettent de lire, régénérer et révoquer le jeton de flux de l'espace de noms. Ils renvoient `{ "feed": { "token", "path", "createdAt" } }`, ou `{ "feed": null }` si rien n'est publié. `POST` renvoie `404` pour un espace de noms qui n'a jamais synchronisé de données.

`GET /v1/calendar/:token.ics` ne prend pas d'en-tête `Authorization` — le jeton dans l'URL est l'identifiant — et renvoie `text/calendar` pour cet espace de noms. Un jeton inconnu renvoie `404`.

Le flux contient un événement par tâche planifiée (`startTime`) et un par échéance (`dueDate`), conformément à la vue Calendrier de l'application : les tâches terminées, archivées, de référence, supprimées et celles des projets non actifs sont exclues, et une tâche planifiée et due le même jour n'apparaît qu'une fois. Les événements portent un `UID` stable et le seul titre de la tâche — ni description, ni check-list, ni pièces jointes, ni étiquettes, ni données de projet.

## Adaptateur MCP

L’utilitaire publié `mindwtr-mcp` peut utiliser un point de terminaison Cloud auto-hébergé comme backend. Configurez-le avec `--cloud-url` et `--cloud-token`, ou avec les variables d’environnement `MINDWTR_MCP_CLOUD_URL` / `MINDWTR_MCP_CLOUD_TOKEN`.

Le mode MCP adossé au Cloud lit `/v1/data` et expose des outils de lecture pour les tâches, les projets, les sections, les domaines et les personnes. Avec `--write`, il achemine les modifications de tâches, de projets, de sections et de domaines par les points de terminaison REST propres à chaque ressource ci-dessus ; il reste en lecture seule par défaut et ne transforme pas Mindwtr Cloud lui-même en service MCP hébergé.

## Pages connexes

- [Serveur MCP](/fr/power-users/mcp)
- [Déploiement Cloud](/fr/data-sync/cloud-deployment)
- [Algorithme de synchronisation](/fr/data-sync/sync-algorithm)
