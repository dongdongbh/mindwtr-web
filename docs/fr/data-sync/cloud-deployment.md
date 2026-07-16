# Déploiement dans le cloud

Cette page explique comment exécuter le serveur `apps/cloud` de manière fiable dans des environnements auto-hébergés similaires à la production.

## Périmètre

- Mindwtr Cloud est un backend auto-hébergé léger pour la synchronisation JSON et les points de terminaison d’automatisation des tâches authentifiés par jeton, et non une interface d’application hébergée complète.
- Il convient particulièrement aux déploiements à locataire unique ou de petite taille et de confiance.
- Vous devez l’exécuter derrière un proxy inverse HTTPS et appliquer les mesures standard de sécurisation des serveurs.

Remarque sur la compatibilité des clients :

- Les clients Mindwtr Cloud exigent **HTTPS** pour les URL publiques.
- HTTP n’est accepté que pour les cibles locales/privées telles que `localhost`, `127.0.0.1`, `10.x.x.x`, de `172.16.x.x` à `172.31.x.x`, `192.168.x.x`, les adresses IPv6 de bouclage/privées, `*.local` et `*.home.arpa`.
- Pour un DNS personnalisé, un VPN, Tailscale, ZeroTier ou d’autres noms qui ne sont pas reconnus comme locaux/privés, ajoutez TLS au niveau du proxy inverse.
- Le réglage **Autoriser les connexions non sécurisées (HTTP)** est réservé aux points de terminaison locaux/privés de confiance ; il ne permet pas de remplacer publiquement HTTPS par HTTP.

## Topologie de déploiement

Disposition recommandée :

1. Le proxy inverse (`nginx`, `caddy`, `traefik`) termine TLS.
2. Le conteneur/processus du serveur cloud écoute sur une interface privée.
3. Un volume persistant stocke `MINDWTR_CLOUD_DATA_DIR`.
4. Des sauvegardes régulières créent des instantanés du répertoire de données.

Le même service cloud gère à la fois :

- Le trafic de synchronisation sous `/v1/data`
- Les points de terminaison d’automatisation des tâches tels que `/v1/tasks`, `/v1/projects`, `/v1/areas`, `/v1/sections` et `/v1/search`

`PUT /v1/data` repose sur une fusion et non sur un remplacement aveugle. Le serveur lit l’instantané actuel de l’espace de noms, le fusionne avec l’instantané téléversé selon les règles habituelles de synchronisation de Mindwtr tenant compte des révisions, valide les données fusionnées, puis les réécrit. Un client qui téléverse une vue ancienne ou partielle ne doit pas s’attendre à effacer les enregistrements distants plus récents simplement en envoyant une charge utile JSON complète.

Les champs de référence REST doivent pointer vers des enregistrements actifs. Par exemple, créer ou modifier un projet avec un `areaId` dont la zone a été supprimée de manière réversible renvoie `404 Area not found` au lieu d’associer le projet à une pierre tombale. Utilisez `areaId: null` pour retirer la zone d’un projet ; une chaîne vide est rejetée.

Pour les détails des requêtes et réponses propres à chaque point de terminaison, consultez [API Cloud](/fr/developers/cloud-api).

## Configuration de base de l’environnement

Configuration minimale de production :

- `MINDWTR_CLOUD_AUTH_TOKENS` défini avec un ou plusieurs jetons robustes.
- `MINDWTR_CLOUD_CORS_ORIGIN` défini avec l’origine exacte de votre client.
- `MINDWTR_CLOUD_DATA_DIR` monté sur un stockage persistant.
- `MINDWTR_CLOUD_MAX_BODY_BYTES` et `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` adaptés à votre utilisation.

Facultatif, mais utile :

- `MINDWTR_CLOUD_RATE_WINDOW_MS`
- `MINDWTR_CLOUD_RATE_MAX`
- `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX`

## Variables d’environnement

### Authentification

| Variable | Rôle | Remarques |
| --- | --- | --- |
| `MINDWTR_CLOUD_AUTH_TOKENS` | Liste d’autorisation de jetons porteurs séparés par des virgules. | Réglage recommandé pour la production. |
| `MINDWTR_CLOUD_AUTH_TOKENS_FILE` | Chemin vers un fichier contenant des jetons porteurs. | Utile pour les secrets Docker ; le contenu du fichier peut correspondre à `MINDWTR_CLOUD_AUTH_TOKENS`. |
| `MINDWTR_CLOUD_TOKEN` | Ancien alias pour un jeton unique. | Toujours pris en charge pour la rétrocompatibilité, mais obsolète. |
| `MINDWTR_CLOUD_TOKEN_FILE` | Chemin vers un fichier contenant l’ancien jeton unique. | Toujours pris en charge pour la rétrocompatibilité, mais obsolète. |
| `MINDWTR_CLOUD_ALLOW_ANY_TOKEN` | Autorise tout jeton porteur syntaxiquement valide. | Activation explicite uniquement. À éviter en dehors des environnements contrôlés. |
| `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES` | Nombre maximal d’espaces de noms distincts pouvant être créés lorsque le mode autorisant tout jeton est activé. | Valeur par défaut : `32` ; à définir uniquement pour les environnements d’automatisation contrôlés. |

### Réseau et stockage

| Variable | Rôle | Valeur par défaut |
| --- | --- | --- |
| `MINDWTR_CLOUD_CORS_ORIGIN` | Origine de navigateur autorisée pour CORS. | `http://localhost:5173` hors production |
| `MINDWTR_CLOUD_DATA_DIR` | Répertoire des espaces de noms JSON, pièces jointes et verrous. | `./data` |
| `MINDWTR_CLOUD_TRUST_PROXY_HEADERS` | Faire confiance à `X-Forwarded-For`/aux en-têtes d’adresse IP du proxy pour limiter le débit des échecs d’authentification. | `false` |
| `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` | Liste d’autorisation d’adresses IP de proxy séparées par des virgules, utilisée lorsque les en-têtes de proxy sont approuvés. | Vide ; les adresses IP transférées sont ignorées sauf si le pair direct est approuvé. |

### Limites des requêtes

| Variable | Rôle | Valeur par défaut |
| --- | --- | --- |
| `MINDWTR_CLOUD_MAX_BODY_BYTES` | Taille maximale d’une requête JSON. | `2000000` |
| `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES` | Taille maximale de téléversement d’une pièce jointe. | `50000000` |
| `MINDWTR_CLOUD_REQUEST_TIMEOUT_MS` | Délai d’expiration par requête pour les gestionnaires cloud. | `30000` |
| `MINDWTR_CLOUD_MAX_TASK_TITLE_LENGTH` | Longueur maximale du titre d’une tâche acceptée par les points de terminaison cloud des tâches. | `500` |
| `MINDWTR_CLOUD_MAX_TASK_QUICK_ADD_LENGTH` | Longueur maximale de la saisie d’ajout rapide acceptée lors de la création d’une tâche dans le cloud. | `2000` |
| `MINDWTR_CLOUD_MAX_ITEMS_PER_COLLECTION` | Nombre maximal de tâches/projets/sections/zones par collection téléversée. | `50000` |

### Pagination et mise en forme des listes

| Variable | Rôle | Valeur par défaut |
| --- | --- | --- |
| `MINDWTR_CLOUD_LIST_DEFAULT_LIMIT` | Taille de page par défaut pour les points de terminaison de liste. | `200` |
| `MINDWTR_CLOUD_LIST_MAX_LIMIT` | Plafond absolu de la taille de page des points de terminaison de liste. | `1000` |

### Limitation du débit

| Variable | Rôle | Valeur par défaut |
| --- | --- | --- |
| `MINDWTR_CLOUD_RATE_WINDOW_MS` | Durée de la fenêtre principale de limitation du débit. | `60000` |
| `MINDWTR_CLOUD_RATE_MAX` | Nombre maximal de requêtes hors pièces jointes par fenêtre. | `120` |
| `MINDWTR_CLOUD_ATTACHMENT_RATE_MAX` | Nombre maximal de requêtes de pièces jointes par fenêtre. | identique à `MINDWTR_CLOUD_RATE_MAX` |
| `MINDWTR_CLOUD_RATE_CLEANUP_MS` | Intervalle de purge des entrées expirées de limitation du débit en mémoire. | `60000` |
| `MINDWTR_CLOUD_RATE_MAX_KEYS` | Nombre maximal de clés distinctes de limitation du débit à conserver en mémoire avant une éviction de type LRU. | `10000` |
| `MINDWTR_CLOUD_AUTH_FAILURE_RATE_MAX` | Nombre maximal de tentatives non autorisées par adresse IP client/fenêtre avant limitation. | `30` |

Conseils d’exploitation :

- Maintenez les limites de taille du corps des requêtes du proxy alignées sur `MINDWTR_CLOUD_MAX_BODY_BYTES` et `MINDWTR_CLOUD_MAX_ATTACHMENT_BYTES`.
- Laissez `MINDWTR_CLOUD_TRUST_PROXY_HEADERS=false` sauf si le serveur n’est accessible que par votre proxy inverse. Si vous l’activez, définissez `MINDWTR_CLOUD_TRUSTED_PROXY_IPS` avec les adresses des proxys autorisés à fournir les adresses IP transférées des clients.
- Si vous passez de `MINDWTR_CLOUD_TOKEN` à `MINDWTR_CLOUD_AUTH_TOKENS`, n’oubliez pas que modifier le jeton change également la clé de l’espace de noms.
- Évitez `MINDWTR_CLOUD_ALLOW_ANY_TOKEN=true` pour les déploiements publics. Ce mode est limité par `MINDWTR_CLOUD_ANY_TOKEN_MAX_NAMESPACES`, mais les listes d’autorisation de jetons fixes restent le modèle de production.

## Guide opérationnel Docker

Commencez par [Déploiement avec Docker](/fr/power-users/docker-deployment) pour connaître les points d’entrée Compose pris en charge. Cette section fournit la liste de contrôle d’exploitation permettant d’exécuter le même conteneur cloud dans des environnements similaires à la production.

Pour un test rapide local en HTTP uniquement, utilisez `docker/compose.yaml`.

Pour les URL publiques des clients de bureau ou mobiles, utilisez la pile HTTPS :

```bash
cp docker/.env.https.example docker/.env.https.local
```

Modifiez `docker/.env.https.local` :

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.example.com
MINDWTR_CLOUD_AUTH_TOKENS=your_long_random_token
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.example.com
MINDWTR_CADDYFILE=Caddyfile.https
```

Démarrez la pile :

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml up -d
```

Définissez l’URL auto-hébergée de Mindwtr sur l’URL de base, par exemple `https://mindwtr.example.com`. Mindwtr ajoute automatiquement `/v1/data`.

Utilisez `Caddyfile.local-https` pour les noms d’hôte réservés au réseau local avec l’autorité de certification interne de Caddy :

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

Chaque appareil doit faire confiance au certificat racine local de Caddy avant qu’un client puisse accepter ce certificat. Les certificats publics sont généralement plus simples pour les clients mobiles.

Après le démarrage de la pile réservée au réseau local, exportez le certificat racine local :

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

Installez ce certificat comme racine de confiance sur chaque appareil qui se synchronisera avec ce nom d’hôte.

Structure minimale du service cloud :

```yaml
services:
  mindwtr-cloud:
    build:
      context: .
      dockerfile: docker/cloud/Dockerfile
    environment:
      MINDWTR_CLOUD_DATA_DIR: /data
      MINDWTR_CLOUD_AUTH_TOKENS: ${MINDWTR_CLOUD_AUTH_TOKENS}
      MINDWTR_CLOUD_CORS_ORIGIN: https://mindwtr.example.com
      MINDWTR_CLOUD_RATE_MAX: "120"
      MINDWTR_CLOUD_ATTACHMENT_RATE_MAX: "120"
    volumes:
      - ./mindwtr-cloud-data:/data
    restart: unless-stopped
```

Remarques d’exploitation :

- Le Dockerfile du dépôt utilise une image d’exécution à plusieurs étapes et épingle l’image de base Bun par condensat pour des reconstructions reproductibles.
- Montez `/data` sur un disque durable, et non sur le système de fichiers éphémère du conteneur.
- Conservez les jetons dans un gestionnaire de secrets ou un fichier `.env` hors de git.
- Pour les secrets Docker, utilisez `MINDWTR_CLOUD_AUTH_TOKENS_FILE` au lieu d’intégrer directement le jeton dans le fichier Compose.
- Le même conteneur déployé sert le trafic de synchronisation et celui de l’API REST sur le même hôte/port.

## Liste de contrôle du proxy inverse

Au niveau du proxy :

- Imposez HTTPS.
- Limitez la taille du corps des requêtes conformément aux limites du cloud.
- Transmettez l’en-tête `Authorization` sans le modifier.
- Définissez un délai d’expiration des requêtes suffisamment élevé pour le téléversement de pièces jointes volumineuses.
- Restreignez si possible l’accès par adresse IP/VPN.

Exemple de Caddyfile :

```caddyfile
mindwtr.example.com {
  reverse_proxy mindwtr-cloud:8787
}
```

Pour les certificats internes réservés au réseau local :

```caddyfile
mindwtr.home.arpa {
  tls internal
  reverse_proxy mindwtr-cloud:8787
}
```

Extraits de configuration nginx :

```nginx
client_max_body_size 50m;
proxy_read_timeout 120s;
proxy_send_timeout 120s;
proxy_set_header Authorization $http_authorization;
```

## Sauvegardes et restauration

Le format des données consiste en un fichier JSON par jeton, accompagné de fichiers de pièces jointes.

Sauvegarde :

1. Créez un instantané ou une archive de `MINDWTR_CLOUD_DATA_DIR`.
2. Conservez des sauvegardes ponctuelles (rétention quotidienne + hebdomadaire).
3. Vérifiez périodiquement la restauration.

Restauration :

1. Arrêtez le serveur.
2. Restaurez le contenu du répertoire dans `MINDWTR_CLOUD_DATA_DIR`.
3. Démarrez le serveur.
4. Vérifiez `GET /health` et effectuez une validation de la synchronisation avec un client.

## Nettoyage des pièces jointes

Lorsqu’un utilisateur supprime une pièce jointe, les clients conservent un enregistrement `pendingRemoteDeletes` jusqu’à ce que la suppression sur le backend réussisse. Ces suppressions en attente ne sont volontairement pas abandonnées après un certain délai, car leur retrait avant une suppression distante réussie pourrait laisser subsister des fichiers privés.

Mindwtr Cloud fournit également un nettoyage authentifié des fichiers de pièces jointes orphelins qui ne sont plus référencés par l’instantané `data.json` actuel :

```text
POST /v1/attachments/orphans
DELETE /v1/attachments/orphans
```

Exécutez cette opération après une restauration ou comme tâche de maintenance périodique si vous souhaitez nettoyer côté serveur les fichiers devenus inaccessibles en dehors du flux normal de suppression du client. Le point de terminaison analyse uniquement l’espace de noms du jeton authentifié et renvoie le nombre de chemins de fichiers analysés, conservés, supprimés et en échec.

Le nettoyage ignore les fichiers de pièces jointes modifiés au cours des cinq dernières minutes afin qu’un téléversement suivi d’une référence ultérieure dans `/v1/data` ne puisse pas être supprimé par une opération de maintenance simultanée.

## Procédure de mise à niveau

Procédure de déploiement progressif sûre :

1. Effectuez une sauvegarde.
2. Déployez d’abord la nouvelle version dans un environnement de préproduction ou sur un déploiement canari.
3. Effectuez les contrôles rapides :
   - `GET /health`
   - `GET /v1/data` authentifié
   - `GET /v1/tasks` authentifié
   - `GET /v1/projects`, `GET /v1/areas` et `GET /v1/sections` authentifiés
   - téléversement/téléchargement de pièces jointes petites et volumineuses
4. Déployez en production.
5. Surveillez dans les journaux les erreurs `rate limit`, `invalid payload` et `permission denied`.

## Rotation des jetons

Procédure de rotation recommandée :

1. Ajoutez le nouveau jeton à `MINDWTR_CLOUD_AUTH_TOKENS` aux côtés de l’ancien.
2. Mettez à jour les clients avec le nouveau jeton.
3. Supprimez l’ancien jeton après la période de migration.

Comme le hachage du jeton détermine l’espace de noms/le fichier, modifier le jeton change l’espace de noms de stockage. Si vous devez assurer la continuité avec un nouveau jeton, migrez délibérément le fichier de données/répertoire de pièces jointes correspondant.

## Observabilité

Le serveur cloud écrit des journaux JSON structurés dans stdout/stderr.

Alertes minimales sur les journaux :

- Répétitions de `Unauthorized`
- Fréquentes occurrences de `Rate limit exceeded`
- `Cloud data directory is not writable`
- `Invalid remote sync payload`

Ajoutez des métriques d’hôte/de conteneur :

- Processeur et mémoire
- Espace disque disponible sur le volume de données
- Latence p95 des requêtes
- Taux de réponses autres que 2xx

Remarque sur l’horloge :

- Le serveur participe à la fusion et à la réparation lors de `PUT /v1/data` ; la dérive de l’horloge de l’hôte peut donc encore affecter les journaux des requêtes et les fenêtres de limitation du débit. Maintenez NTP ou un mécanisme équivalent de synchronisation de l’heure activé.
- Les horodatages de réparation de la fusion utilisent l’horloge murale du serveur. Cela empêche l’horloge d’un client en avance de quelques minutes de corrompre les métadonnées de réparation générées par le serveur.

## Modes de défaillance

- Erreurs d’autorisation : incompatibilité du propriétaire/des autorisations du volume.
- Échecs CORS : `MINDWTR_CLOUD_CORS_ORIGIN` incorrect.
- Incompatibilité du jeton : le jeton du client ne figure pas dans la liste d’autorisation.
- Échecs des charges utiles volumineuses : limites de taille du corps dépassées au niveau du proxy ou de l’application.

## Pages connexes

- [API Cloud](/fr/developers/cloud-api)
- [API Cloud](/fr/developers/cloud-api)
- [Données et synchronisation](/fr/data-sync/)
- [Déploiement avec Docker](/fr/power-users/docker-deployment)
