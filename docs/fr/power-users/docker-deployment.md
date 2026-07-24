# Déploiement avec Docker

Mindwtr fournit une prise en charge officielle de Docker pour exécuter :
- **mindwtr-app** : la version web de bureau/PWA, servie par Nginx.
- **mindwtr-cloud** : le serveur léger de synchronisation et l’API REST d’automatisation des tâches.

Ces composants sont disponibles sous forme d’images Docker et peuvent être facilement orchestrés avec Docker Compose.

---

## Démarrage rapide (Docker Compose)

Vous n’avez pas besoin de cloner le dépôt. Les images officielles sont publiées sur GHCR, et le fichier `compose.yaml` les télécharge pour vous.

1. **Téléchargez le fichier compose** :
   ```bash
   curl -LO https://raw.githubusercontent.com/dongdongbh/Mindwtr/main/docker/compose.yaml
   ```

2. **Créez un fichier `.env` à côté** (Docker Compose le lit automatiquement) :
   ```dotenv
   MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
   MINDWTR_CLOUD_CORS_ORIGIN=http://localhost:5173
   ```

   `MINDWTR_CLOUD_CORS_ORIGIN` doit correspondre exactement à l’adresse à laquelle vous ouvrez la PWA dans votre navigateur, schéma et port compris. `http://localhost:5173` ne fonctionne que si le navigateur s’exécute sur l’hôte Docker lui-même. Depuis une autre machine, utilisez l’adresse de l’hôte, par exemple `http://192.168.1.20:5173`. Une seule origine peut être définie.

3. **Téléchargez et démarrez les services** :
   ```bash
   docker compose pull
   docker compose up -d
   ```

4. **Accédez aux services** :
   - **PWA (application web) :** ouvrez `http://localhost:5173` dans votre navigateur.
   - **Contrôle d’intégrité du Cloud :** ouvrez `http://localhost:8787/health`.
   - **URL auto-hébergée pour les tests locaux :** `http://localhost:8787`
   - **URL de base de l’API REST :** `http://localhost:8787/v1`

Pour construire les images depuis les sources, clonez le dépôt et exécutez `docker compose -f docker/compose.yaml up --build -d` depuis sa racine. Voir [Construction manuelle](#construction-manuelle) ci-dessous.

Ce fichier Compose par défaut utilise uniquement HTTP et est destiné aux tests locaux ou privés. Les clients de bureau et mobiles Mindwtr n’acceptent HTTP que pour les cibles locales ou privées reconnues, comme `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` à `172.31.x.x`, `192.168.x.x`, les adresses IPv6 de bouclage ou privées, `*.local` et `*.home.arpa`.

Pour les URL publiques, les noms DNS personnalisés, les noms d’hôte VPN, Tailscale, ZeroTier ou tout nom qui n’est pas reconnu comme local ou privé, utilisez HTTPS, ou activez **Autoriser HTTP non sécurisé (non recommandé)** dans les réglages de synchronisation de l’application pour accepter ce nom d’hôte en HTTP non chiffré. Les données circulent alors en clair ; ne l’utilisez que sur un réseau de confiance.

---

## Configuration HTTPS avec Caddy

Pour la synchronisation publique depuis un ordinateur ou un appareil mobile, utilisez le fichier Compose reposant sur Caddy :

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

Vérifiez le serveur :

```bash
curl https://mindwtr.example.com/health
```

Dans Mindwtr, sous Réglages -> Synchronisation -> Auto-hébergé, définissez l’URL auto-hébergée sur :

```text
https://mindwtr.example.com
```

Mindwtr ajoutera automatiquement `/v1/data`.

### HTTPS public

Utilisez `Caddyfile.https` lorsque `MINDWTR_CLOUD_DOMAIN` est un nom DNS public qui pointe vers cet hôte Docker. Les ports 80 et 443 doivent être accessibles pour l’émission automatique du certificat. Caddy obtient le certificat, le renouvelle et transmet les requêtes à `mindwtr-cloud` par proxy inverse.

### HTTPS sur réseau local uniquement

Utilisez `Caddyfile.local-https` lorsque le nom d’hôte n’est résolu que sur votre réseau domestique :

```dotenv
MINDWTR_CLOUD_DOMAIN=mindwtr.home.arpa
MINDWTR_CLOUD_CORS_ORIGIN=https://mindwtr.home.arpa
MINDWTR_CADDYFILE=Caddyfile.local-https
```

Cette configuration utilise l’autorité de certification interne de Caddy. Chaque appareil client doit faire confiance au certificat racine local de Caddy avant que Mindwtr n’accepte la connexion HTTPS. Les certificats publics Let’s Encrypt sont l’option la plus fiable pour les clients mobiles.

Après le démarrage de la pile réservée au réseau local, exportez le certificat racine local de Caddy :

```bash
docker compose --env-file docker/.env.https.local -f docker/compose.https.yaml cp caddy:/data/caddy/pki/authorities/local/root.crt ./mindwtr-caddy-root.crt
```

Installez ce certificat comme racine de confiance sur chaque appareil qui se synchronisera avec ce nom d’hôte.

---

## Configuration

### Jeton de synchronisation
Le serveur Cloud exige un jeton pour l’authentification. Vous devez le définir dans les variables d’environnement.

Dans `docker/compose.yaml` (ou via une variable d’environnement), définissez :

```yaml
MINDWTR_CLOUD_AUTH_TOKENS=your_token_here
```

`MINDWTR_CLOUD_TOKEN` reste accepté pour la rétrocompatibilité, mais il est obsolète.

Pour les secrets Docker, vous pouvez monter un fichier et le référencer à la place :

```yaml
MINDWTR_CLOUD_AUTH_TOKENS_FILE: /run/secrets/mindwtr_cloud_tokens
```

**Générer un jeton :**
Vous pouvez générer un jeton aléatoire robuste avec :
```bash
cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 50 | head -n 1
```

### Configuration du client
Pour connecter vos clients Mindwtr (bureau ou mobile) à ce Cloud auto-hébergé :

1. Accédez à **Réglages → Synchronisation**.
2. Sélectionnez **Auto-hébergé** (ou Cloud).
3. Définissez l’**URL auto-hébergée** sur le point de terminaison de base de votre serveur :
   ```
   http://localhost:8787
   ```
   *Mindwtr ajoutera automatiquement `/v1/data` à cette URL.*
4. Saisissez le **même jeton** que celui configuré dans `MINDWTR_CLOUD_AUTH_TOKENS`.

Pour HTTP sur un réseau local privé, utilisez une adresse locale ou privée telle que `http://192.168.1.20:8787`. Pour les URL publiques, utilisez la configuration HTTPS avec Caddy décrite ci-dessus.

### Synchronisation Dropbox et PWA Docker

L’image Docker `mindwtr-app` sert la version navigateur/PWA. La synchronisation OAuth native avec Dropbox n’est pas disponible dans cet environnement d’exécution, car la connexion Dropbox est implémentée par les applications natives de bureau et mobiles. Ajouter `VITE_DROPBOX_APP_KEY` ou `DROPBOX_APP_KEY` via `.env`, `env_file`, l’environnement d’exécution Compose ou un argument de construction Docker n’activera pas Dropbox dans Docker.

Pour une synchronisation hébergée avec Docker, utilisez le serveur Cloud auto-hébergé fourni ou WebDAV. Si le point de terminaison auto-hébergé se trouve derrière Authelia ou un autre proxy SSO interactif, configurez le proxy pour que le chemin de synchronisation/API de Mindwtr utilise directement le jeton porteur de Mindwtr ; l’application mobile ne peut pas effectuer une connexion Authelia dans le navigateur devant `/v1/data`.

### API d’automatisation des tâches

Le même conteneur `mindwtr-cloud` expose également l’API REST d’automatisation des tâches. Elle utilise la même URL de base et le même jeton porteur que la synchronisation.

Points de terminaison courants :

- `GET /v1/data` et `PUT /v1/data` pour la synchronisation
- `GET /v1/tasks` et `POST /v1/tasks` pour répertorier et créer des tâches
- `GET /v1/projects` pour les projets
- `GET /v1/search?query=...` pour rechercher des tâches et des projets

Exemple :

```bash
curl -X POST http://localhost:8787/v1/tasks \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{"input":"Review PR @work /due:tomorrow"}'
```

### Origine CORS (production)

Le serveur Cloud utilise par défaut `http://localhost:5173` pour CORS. En production, définissez :

```yaml
MINDWTR_CLOUD_CORS_ORIGIN=https://your-app-domain.example
```

---

## Persistance des données

Pour protéger vos données Cloud lors des redémarrages des conteneurs, montez un volume pour le répertoire de données.

Dans votre `compose.yaml` :

```yaml
volumes:
  - ./data:/app/cloud_data
```

---

## Construction manuelle

Si vous préférez construire les images vous-même sans Compose :

**Construire la PWA :**
```bash
docker build -f docker/app/Dockerfile -t mindwtr-app .
```

**Construire le serveur Cloud :**
```bash
docker build -f docker/cloud/Dockerfile -t mindwtr-cloud .
```

---

## GitHub Actions et GHCR

Le projet comprend un workflow GitHub Actions qui construit automatiquement les images et les publie dans le GitHub Container Registry (GHCR).

**Images officielles :**
- `ghcr.io/dongdongbh/mindwtr-app:latest`
- `ghcr.io/dongdongbh/mindwtr-cloud:latest`

Les versions préliminaires sont disponibles sous l’étiquette flottante `beta`, qui pointe toujours vers la version la plus récente (candidate ou stable), ou peuvent être épinglées par version, par exemple `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`. `latest` reste toujours sur la version stable. Consultez [Rejoindre les canaux bêta](/fr/start/beta-channels) pour les autres plateformes.

Le fichier `docker/compose.yaml` est configuré pour utiliser ces images par défaut, ce qui permet de récupérer facilement la dernière version sans la construire localement.

---

## Notes techniques

- **Service de la PWA :** l’application web utilise un rendu côté client. Le conteneur Nginx est configuré avec `try_files` pour rediriger toutes les requêtes vers `index.html`, ce qui évite les erreurs 404 lors de l’actualisation d’une page.
- **Image de base :** la construction utilise Bun (épinglé à la v1.3) et inclut les options C++20 requises pour `better-sqlite3`.
