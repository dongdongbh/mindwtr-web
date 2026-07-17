# Serveur MCP

Mindwtr fournit un serveur **MCP (Model Context Protocol)** facultatif. Il permet de connecter des agents d’IA (comme **Claude Desktop**, **Claude Code**, **OpenAI Codex** ou **Gemini CLI**) à votre base de données Mindwtr locale ou à un point de terminaison Mindwtr Cloud auto-hébergé.

Il s’agit d’un serveur **stdio** (sans point de terminaison HTTP hébergé). Les clients MCP le lancent comme sous-processus et communiquent par JSON-RPC sur stdin/stdout.

> Référence canonique : [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md). Maintenez cette page en phase avec ce fichier lorsque les outils ou schémas MCP changent.

---

## Binaires de l’application et utilitaire MCP

Les binaires des applications de bureau et mobiles comprennent l’application Mindwtr, mais ils n’incluent **pas** actuellement de commande de démarrage/arrêt sur ordinateur. L’utilitaire MCP autonome est publié sous le nom [`mindwtr-mcp`](https://www.npmjs.com/package/mindwtr-mcp) et répertorié dans le [registre MCP](https://registry.modelcontextprotocol.io/) public.

Vous n’avez **pas** besoin d’exécuter toute l’application depuis les sources pour utiliser MCP. Utilisez le binaire normal de l’application de bureau pour vos tâches, puis laissez votre client MCP lancer `mindwtr-mcp` avec `npx`, ou installez-le globalement avec npm. Indiquez à l’utilitaire la base locale `mindwtr.db` de l’application de bureau.

Sur ordinateur, l’application affiche le chemin exact des données locales sous **Réglages -> Synchronisation -> Données locales**. Les binaires mobiles n’exposent pas de serveur MCP local.

---

## Prérequis

- **Node.js 22+** pour les installations sans compilation : la dépendance SQLite fournit des binaires précompilés pour Node 22 et versions ultérieures. Node 20 exécute toujours le serveur, mais l’installation nécessite des outils de compilation C++
- **npm** ou un autre exécuteur de paquets Node pour le paquet `mindwtr-mcp` publié
- Une base de données Mindwtr locale (`mindwtr.db`) pour le mode local, ou une URL Mindwtr Cloud auto-hébergée et un jeton porteur pour le mode Cloud
- **Bun** uniquement si vous exécutez l’utilitaire depuis l’arborescence des sources

### Emplacements par défaut de la base de données

- **Linux :** `~/.local/share/mindwtr/mindwtr.db`
- **macOS :** `~/Library/Application Support/mindwtr/mindwtr.db`
- **Windows :** `%APPDATA%\mindwtr\mindwtr.db`

Chemin macOS supplémentaire pour les versions isolées :

- `~/Library/Containers/tech.dongdongbh.mindwtr/Data/Library/Application Support/mindwtr/mindwtr.db`

Vous pouvez remplacer l’emplacement de la base locale avec :

- `--db /path/to/mindwtr.db`
- Variable d’environnement : `MINDWTR_DB_PATH` ou `MINDWTR_DB`

Pour le mode Cloud auto-hébergé, utilisez :

- `--cloud-url https://mindwtr.example.com` ou `MINDWTR_MCP_CLOUD_URL`
- `--cloud-token <token>` ou `MINDWTR_MCP_CLOUD_TOKEN`
- éventuellement `--cloud-allow-insecure-http=true` pour les déploiements HTTP privés de confiance

---

## Installation et configuration

Les clients MCP exécutent le serveur comme sous-processus. Vous leur indiquez **la commande** et transmettez les arguments.

Commande recommandée sans installation pour les clients MCP :

```json
{
  "command": "npx",
  "args": [
    "-y",
    "mindwtr-mcp",
    "--db",
    "/path/to/mindwtr.db"
  ]
}
```

Le paquet est en lecture seule par défaut. Ajoutez `--write` uniquement lorsque vous souhaitez explicitement qu’un client d’IA ajoute, mette à jour, termine ou supprime des données Mindwtr.

### Mode Cloud auto-hébergé

Utilisez le mode Cloud lorsque vous exécutez votre propre serveur Mindwtr Cloud et souhaitez disposer des outils MCP sans exposer un fichier SQLite local :

```bash
npx -y mindwtr-mcp \
  --cloud-url "https://mindwtr.example.com" \
  --cloud-token "$MINDWTR_TOKEN"
```

Vous pouvez aussi utiliser des variables d’environnement dans la configuration d’un client MCP :

```json
{
  "command": "npx",
  "args": ["-y", "mindwtr-mcp"],
  "env": {
    "MINDWTR_MCP_CLOUD_URL": "https://mindwtr.example.com",
    "MINDWTR_MCP_CLOUD_TOKEN": "your-token"
  }
}
```

Le mode Cloud lit l’instantané `/v1/data` actuel depuis votre serveur Cloud auto-hébergé et expose des outils de lecture pour les tâches, projets, sections, domaines et personnes. Avec `--write`, les écritures de tâches, projets, sections et domaines passent par les [points de terminaison REST](/fr/developers/cloud-api) propres à chaque ressource du serveur Cloud (`POST /v1/tasks`, `PATCH /v1/tasks/:id`, etc.) : chaque modification bénéficie ainsi de la même validation et du même suivi des révisions que celles effectuées depuis vos applications. Sans `--write`, les outils d’écriture renvoient `read_only`. La modification des personnes et la restauration des tâches supprimées ne sont pas encore disponibles en mode Cloud. Utilisez le système local de base de données pour ces opérations.

Il ne s’agit pas du connecteur mutualisé hébergé qui est bloqué. Vous exécutez toujours vous-même le serveur Cloud et l’utilitaire MCP ; Mindwtr n’exploite pas de service stockant les données de tâches de tout le monde.

Pour une installation globale :

```bash
npm install -g mindwtr-mcp
mindwtr-mcp --db "/path/to/mindwtr.db"
```

### Arguments principaux

- `--db "/path/to/mindwtr.db"` : chemin de votre base de données SQLite en mode local.
- `--write` : active les opérations d’écriture (ajout, mise à jour, achèvement, suppression) en mode local ou Cloud. **Sans cette option, le serveur est en lecture seule.**
- `--cloud-url "https://mindwtr.example.com"` : utilise un point de terminaison Mindwtr Cloud auto-hébergé à la place d’une base locale.
- `--cloud-token "<token>"` : jeton porteur du point de terminaison Cloud auto-hébergé.
- `--cloud-allow-insecure-http=true` : autorise les URL Cloud HTTP privées de confiance lorsque vous utilisez volontairement une connexion sans HTTPS.

### 1. Claude Desktop

Ajoutez une entrée de serveur au fichier de configuration de Claude Desktop.

- **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "~/.local/share/mindwtr/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

_Remarque : remplacez le chemin de la base de données par celui de votre base Mindwtr locale._

### 2. Claude Code (CLI)

Vous pouvez ajouter le serveur via la CLI :

```bash
claude mcp add mindwtr -- \
  npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### 3. OpenAI Codex (CLI / extension IDE)

Codex lit la configuration des serveurs MCP depuis `~/.codex/config.toml`. Vous pouvez aussi utiliser un fichier `.codex/config.toml` propre à un projet de confiance. La CLI Codex et l’extension IDE partagent cette configuration.

**Ligne de commande :**

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db"
```

Ajoutez `--write` uniquement si vous souhaitez que Codex modifie les données Mindwtr locales :

```bash
codex mcp add mindwtr -- \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

Dans le TUI de Codex, exécutez `/mcp` pour vérifier que le serveur est actif.

**Configuration manuelle :**

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db"
]
```

Avec l’accès en écriture :

```toml
[mcp_servers.mindwtr]
command = "npx"
args = [
  "-y",
  "mindwtr-mcp",
  "--db",
  "/path/to/mindwtr.db",
  "--write"
]
```

### 4. Gemini CLI

Gemini CLI utilise `settings.json` (utilisateur : `~/.gemini/settings.json` ou projet : `.gemini/settings.json`).

**Ligne de commande :**

```bash
gemini mcp add mindwtr \
  npx -y mindwtr-mcp \
  --db "/path/to/mindwtr.db" --write
```

**Configuration manuelle :**

```json
{
  "mcpServers": {
    "mindwtr": {
      "command": "npx",
      "args": [
        "-y",
        "mindwtr-mcp",
        "--db",
        "/path/to/mindwtr.db",
        "--write"
      ]
    }
  }
}
```

### 5. Application Gemini (apps personnalisées)

Les applications web et mobiles Gemini peuvent se connecter à un serveur MCP distant via une URL (« apps personnalisées » sur gemini.google.com). Cela fonctionne avec `mindwtr-mcp` en [mode HTTP](#acces-distant-http) : hébergez le serveur à un endroit accessible aux serveurs de Google (une URL HTTPS publique derrière un reverse proxy ; Gemini se connecte depuis les serveurs de Google, donc `localhost` ne fonctionne pas), puis ajoutez cette URL comme app personnalisée avec votre jeton bearer.

---

## Accès distant (HTTP)

> Nécessite une version de `mindwtr-mcp` plus récente que 1.1.1 (ou une exécution depuis les sources).

Par défaut, le serveur parle stdio. Passez `--http` pour servir à la place un point de terminaison MCP HTTP en streaming, afin que les clients MCP distants puissent se connecter par URL. Le mode HTTP fonctionne avec les deux backends (SQLite local ou Cloud auto-hébergé).

```bash
mindwtr-mcp --http --http-token "$(openssl rand -hex 32)" --db "/path/to/mindwtr.db"
```

Options (toutes ont des variables d'environnement `MINDWTR_MCP_HTTP*` équivalentes) :

| Option | Variable d'environnement | Signification |
| --- | --- | --- |
| `--http` | `MINDWTR_MCP_HTTP` | Active le mode HTTP. Également impliqué par n'importe laquelle des options ci-dessous. |
| `--http-token <token>` | `MINDWTR_MCP_HTTP_TOKEN` | **Obligatoire** dès que le mode HTTP est actif ; au moins 16 caractères. Générez-en un avec `openssl rand -hex 32`. Sans jeton, le serveur refuse de démarrer. |
| `--http-host <host>` | `MINDWTR_MCP_HTTP_HOST` | Adresse d'écoute, par défaut `127.0.0.1`. |
| `--http-port <port>` | `MINDWTR_MCP_HTTP_PORT` | Port d'écoute, par défaut `8722`. |

Le point de terminaison MCP est `POST /mcp` et exige `Authorization: Bearer <token>` à chaque requête. `GET /healthz` renvoie `200 ok` sans authentification pour les contrôles de santé du reverse proxy. Les requêtes sans jeton valide reçoivent `401` ; les corps de plus de 1 MiB reçoivent `413`. En mode HTTP, le serveur reste actif tant qu'il écoute (stdio n'est pas connecté), et le comportement `--write`/lecture seule est inchangé.

Aucun TLS ni limitation de débit n'est intégré. Pour exposer le serveur au-delà de localhost, placez un reverse proxy (Caddy, nginx) devant pour le HTTPS et fournissez l'URL `https://` obtenue avec votre jeton au client MCP distant.

---

## Exécution manuelle

Il n’est généralement pas nécessaire de l’exécuter manuellement (le client MCP s’en charge), mais cela peut être utile pour les tests.

### Depuis npm

```bash
# Read-only
npx -y mindwtr-mcp --db "/path/to/mindwtr.db"

# With write access
npx -y mindwtr-mcp --db "/path/to/mindwtr.db" --write
```

### Depuis les sources (Bun)

```bash
# Read-only
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db"

# With write access
bun run mindwtr:mcp -- --db "/path/to/mindwtr.db" --write
```

### Construction et exécution (Node)

```bash
# Build
bun run --filter mindwtr-mcp build

# Run
node apps/mcp-server/dist/index.js --db "/path/to/mindwtr.db"
```

---

## Migration : renommage des outils (`mindwtr.*` → `mindwtr_*`)

Les noms d’outils utilisent désormais la notation avec trait de soulignement, comme `mindwtr_list_tasks` ; les anciens noms avec notation pointée ne sont plus documentés.

---

## Outils disponibles

Une fois connecté, l’agent d’IA a accès aux outils suivants. Par défaut, le serveur est en **lecture seule** ; transmettez `--write` pour activer les outils d’écriture.
Seul `--write` permet l’accès en écriture (aucun autre alias).

| Outil                   | Opération                     | Exige `--write` |
| ----------------------- | ----------------------------- | --------------- |
| `mindwtr_list_tasks`    | Répertorier les tâches        | Non             |
| `mindwtr_list_projects` | Répertorier les projets       | Non             |
| `mindwtr_get_project`   | Récupérer un projet           | Non             |
| `mindwtr_list_sections` | Répertorier les sections      | Non             |
| `mindwtr_get_section`   | Récupérer une section         | Non             |
| `mindwtr_list_areas`    | Répertorier les domaines      | Non             |
| `mindwtr_list_people`   | Répertorier les personnes     | Non             |
| `mindwtr_get_person`    | Récupérer une personne        | Non             |
| `mindwtr_get_task`      | Récupérer une tâche par ID    | Non             |
| `mindwtr_add_task`      | Créer une tâche               | Oui             |
| `mindwtr_update_task`   | Mettre à jour une tâche       | Oui             |
| `mindwtr_complete_task` | Marquer comme terminée        | Oui             |
| `mindwtr_delete_task`   | Supprimer logiquement une tâche | Oui           |
| `mindwtr_restore_task`  | Restaurer une tâche           | Oui             |
| `mindwtr_add_project`   | Créer un projet               | Oui             |
| `mindwtr_update_project`| Mettre à jour un projet       | Oui             |
| `mindwtr_delete_project`| Supprimer logiquement un projet | Oui           |
| `mindwtr_add_section`   | Créer une section             | Oui             |
| `mindwtr_update_section`| Mettre à jour une section     | Oui             |
| `mindwtr_delete_section`| Supprimer logiquement une section | Oui          |
| `mindwtr_add_area`      | Créer un domaine              | Oui             |
| `mindwtr_update_area`   | Mettre à jour un domaine      | Oui             |
| `mindwtr_delete_area`   | Supprimer logiquement un domaine | Oui           |
| `mindwtr_add_person`    | Créer une personne            | Oui             |
| `mindwtr_update_person` | Mettre à jour une personne    | Oui             |
| `mindwtr_rename_person` | Renommer une personne         | Oui             |
| `mindwtr_delete_person` | Supprimer logiquement une personne | Oui         |

### Outils de lecture

- **`mindwtr_list_tasks`** : répertorier les tâches avec des filtres (statut, projet, plage de dates, recherche).
- **`mindwtr_list_projects`** : répertorier tous les projets.
- **`mindwtr_get_project`** : obtenir les détails d’un projet précis par son ID.
- **`mindwtr_list_sections`** : répertorier les sections des projets, avec filtrage facultatif par projet.
- **`mindwtr_get_section`** : obtenir les détails d’une section précise par son ID.
- **`mindwtr_list_areas`** : répertorier tous les domaines.
- **`mindwtr_list_people`** : répertorier les fiches de personnes gérées.
- **`mindwtr_get_person`** : obtenir les détails d’une personne précise par son ID.
- **`mindwtr_get_task`** : obtenir les détails d’une tâche précise par son ID.

### Outils d’écriture (exigent `--write`)

Les outils d’écriture fonctionnent avec la base locale comme avec un système Cloud auto-hébergé, à deux exceptions près en mode Cloud : les outils d’écriture des personnes et `mindwtr_restore_task` renvoient une erreur explicite, car l’API Cloud ne possède pas encore de points de terminaison pour ces opérations.

- **`mindwtr_add_task`** : créer une tâche. Prend en charge `quickAdd` en langage naturel (par exemple « Buy milk @errands /due:tomorrow »).
- **`mindwtr_update_task`** : mettre à jour une tâche existante, notamment des champs de planification comme `dueDate`, `startTime`, `reviewAt` et `isFocusedToday` (les champs peuvent être effacés avec `null`).
- **`mindwtr_complete_task`** : marquer une tâche comme terminée.
- **`mindwtr_delete_task`** : supprimer logiquement une tâche.
- **`mindwtr_restore_task`** : restaurer une tâche supprimée logiquement.
- **`mindwtr_add_project`** : créer un projet, notamment avec les champs facultatifs `dueDate` et `reviewAt`.
- **`mindwtr_update_project`** : mettre à jour un projet, notamment avec les champs facultatifs `dueDate` et `reviewAt`.
- **`mindwtr_delete_project`** : supprimer logiquement un projet.
- **`mindwtr_add_section`** : créer une section dans un projet.
- **`mindwtr_update_section`** : mettre à jour une section de projet.
- **`mindwtr_delete_section`** : supprimer logiquement une section de projet. Les tâches de cette section sont conservées et déplacées hors de toute section par le cœur.
- **`mindwtr_add_area`** : créer un domaine.
- **`mindwtr_update_area`** : mettre à jour un domaine.
- **`mindwtr_delete_area`** : supprimer logiquement un domaine.
- **`mindwtr_add_person`** : créer une personne gérée pour les responsables et les tâches en attente.
- **`mindwtr_update_person`** : mettre à jour les métadonnées d’une personne gérée.
- **`mindwtr_rename_person`** : renommer une personne gérée et, éventuellement, mettre à jour les affectations de tâches exactes.
- **`mindwtr_delete_person`** : supprimer logiquement une personne gérée sans effacer les affectations de tâches.

Remarque sur le schéma :
- Les outils d’écriture de tâches couvrent `dueDate`, `startTime` et `reviewAt` (lors d’une mise à jour).
- Les outils d’écriture de projets couvrent `dueDate` et `reviewAt`.
- Les outils d’écriture de personnes couvrent `name`, `note`, `referenceLink` et la mise à jour facultative des affectations lors d’un renommage.
- Pour connaître les entrées canoniques exactes, consultez [apps/mcp-server/README.md](https://github.com/dongdongbh/Mindwtr/blob/main/apps/mcp-server/README.md).

## Matrice des autorisations

Utilisez cette matrice pour décider d’exécuter le serveur en lecture seule ou avec `--write`.

| Outil                   | Accès aux données             | Type de modification              | Mode lecture seule | Mode `--write` |
| ----------------------- | ----------------------------- | --------------------------------- | ----------------- | -------------- |
| `mindwtr_list_tasks`    | Lignes de tâches (filtrées)   | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_list_projects` | Lignes de projets             | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_get_project`   | Un projet par ID              | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_list_sections` | Lignes de sections            | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_get_section`   | Une section par ID            | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_list_areas`    | Lignes de domaines            | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_list_people`   | Lignes de personnes           | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_get_person`    | Une personne par ID           | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_get_task`      | Une tâche par ID              | Aucune                            | Autorisé          | Autorisé       |
| `mindwtr_add_task`      | Table des tâches              | Insertion                         | Refusé            | Autorisé       |
| `mindwtr_update_task`   | Table des tâches              | Mise à jour                       | Refusé            | Autorisé       |
| `mindwtr_complete_task` | Table des tâches              | Mise à jour du statut             | Refusé            | Autorisé       |
| `mindwtr_delete_task`   | Table des tâches              | Suppression logique               | Refusé            | Autorisé       |
| `mindwtr_restore_task`  | Table des tâches              | Restauration après suppression logique | Refusé       | Autorisé       |
| `mindwtr_add_project`   | Table des projets             | Insertion                         | Refusé            | Autorisé       |
| `mindwtr_update_project`| Table des projets             | Mise à jour                       | Refusé            | Autorisé       |
| `mindwtr_delete_project`| Table des projets             | Suppression logique               | Refusé            | Autorisé       |
| `mindwtr_add_section`   | Table des sections            | Insertion                         | Refusé            | Autorisé       |
| `mindwtr_update_section`| Table des sections            | Mise à jour                       | Refusé            | Autorisé       |
| `mindwtr_delete_section`| Table des sections            | Suppression logique               | Refusé            | Autorisé       |
| `mindwtr_add_area`      | Table des domaines            | Insertion                         | Refusé            | Autorisé       |
| `mindwtr_update_area`   | Table des domaines            | Mise à jour                       | Refusé            | Autorisé       |
| `mindwtr_delete_area`   | Table des domaines            | Suppression logique               | Refusé            | Autorisé       |
| `mindwtr_add_person`    | Table des personnes           | Insertion                         | Refusé            | Autorisé       |
| `mindwtr_update_person` | Table des personnes           | Mise à jour                       | Refusé            | Autorisé       |
| `mindwtr_rename_person` | Table des personnes/tâches    | Renommage/mise à jour des références | Refusé        | Autorisé       |
| `mindwtr_delete_person` | Table des personnes           | Suppression logique               | Refusé            | Autorisé       |

Conseils pratiques :

- Utilisez par défaut le mode lecture seule pour l’exploration et les rapports.
- Activez `--write` uniquement pour les systèmes dont vous autorisez la modification par le client d’IA : une base locale ou votre propre serveur Cloud.
- Pour les workflows d’agents, privilégiez une confirmation explicite avant les opérations de suppression ou d’achèvement.

## Exemples d’utilisation avancée

### 1) Revue hebdomadaire guidée

1. Appelez `mindwtr_list_tasks` avec `status: "waiting"` et `status: "someday"`.
2. Résumez les éléments bloqués par projet.
3. Pour les éléments sélectionnés, appelez `mindwtr_update_task` afin de définir `reviewAt`.

### 2) Session de traitement de la boîte de réception

1. Appelez `mindwtr_list_tasks` avec `status: "inbox"` et `sortBy: "createdAt"`.
2. Pour chaque tâche, effectuez le classement avec `mindwtr_update_task` (`next`, `waiting`, `reference`, etc.).
3. Ajoutez les métadonnées manquantes (projet, contextes, étiquettes) lors d’un second passage.

### 3) Procédure sûre de clôture en masse

Pour une automatisation potentiellement destructive :

1. Exécutez la phase de lecture : répertoriez uniquement les ID candidats.
2. Présentez un résumé de confirmation (nombre + titres).
3. Exécutez les écritures (`complete_task` / `delete_task`) uniquement après l’approbation explicite de l’utilisateur.
4. Conservez les ID pour permettre un retour arrière avec `restore_task`.

### 4) Capture rapide en langage naturel

Utilisez `mindwtr_add_task` + `quickAdd` :

```json
{
  "quickAdd": "Follow up with Alex +Hiring @work #ops /due:tomorrow 10am"
}
```

Utilisez cette méthode pour les flux de capture rapide où l’analyse des commandes est plus efficace que la définition manuelle de chaque champ.

---

## Référence des outils

Tous les outils renvoient du JSON dans le champ `content.text`. Analysez ce JSON pour obtenir la charge utile réelle.

## Limites opérationnelles

Ces limites sont utiles lorsque vous intégrez Mindwtr à des workflows d’agents :

- `mindwtr_list_tasks` utilise par défaut `limit: 200` et plafonne `limit` à `500`.
- Les titres des tâches sont limités à `500` caractères par la validation de création/mise à jour des tâches MCP.
- Les entrées d’ajout rapide sont limitées à `2000` caractères pour la création de tâches MCP, comme dans l’API Cloud d’ajout rapide de tâches.
- La couche SQLite utilise un `busy_timeout` de 5 secondes : une base verrouillée doit donc échouer au lieu de rester bloquée indéfiniment.

Si vous avez besoin de plus de 500 tâches, utilisez une pagination avec `limit` + `offset` au lieu d’attendre une réponse unique sans limite.

### `mindwtr_list_tasks`

**Champs d’entrée**

- `status` : `inbox | next | waiting | someday | reference | done | archived | all`
- `projectId` : chaîne
- `includeDeleted` : booléen
- `limit` : nombre
- `offset` : nombre
- `search` : chaîne
- `dueDateFrom` : chaîne de date ou date-heure ISO (comparée par date calendaire)
- `dueDateTo` : chaîne de date ou date-heure ISO (comparée par date calendaire)
- `sortBy` : `updatedAt | createdAt | dueDate | title | priority`
- `sortOrder` : `asc | desc`

**Exemple**

```json
{
  "status": "next",
  "limit": 20,
  "offset": 0,
  "sortBy": "updatedAt",
  "sortOrder": "desc"
}
```

**Réponse**

```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "title": "Follow up with design",
      "status": "next",
      "updatedAt": "2026-01-25T03:45:57.246Z"
    }
  ]
}
```

### `mindwtr_list_projects`

**Champs d’entrée**

- aucun

**Réponse**

```json
{
  "projects": [
    {
      "id": "project-uuid",
      "title": "Mindwtr",
      "status": "active"
    }
  ]
}
```

### `mindwtr_get_project`

**Champs d’entrée**

- `id` : chaîne (UUID du projet)
- `includeDeleted` : booléen (facultatif)

**Exemple**

```json
{ "id": "project-uuid" }
```

### `mindwtr_list_sections`

**Champs d’entrée**

- `projectId` : chaîne (facultatif)
- `includeDeleted` : booléen (facultatif)

**Réponse**

```json
{
  "sections": [
    {
      "id": "section-uuid",
      "projectId": "project-uuid",
      "title": "Planning"
    }
  ]
}
```

### `mindwtr_get_section`

**Champs d’entrée**

- `id` : chaîne (UUID de la section)
- `includeDeleted` : booléen (facultatif)

**Exemple**

```json
{ "id": "section-uuid" }
```

### `mindwtr_list_areas`

**Champs d’entrée**

- aucun

**Réponse**

```json
{
  "areas": [
    {
      "id": "area-uuid",
      "name": "Work"
    }
  ]
}
```

### `mindwtr_list_people`

**Champs d’entrée**

- `includeDeleted` : booléen (facultatif)

**Réponse**

```json
{
  "people": [
    {
      "id": "person-uuid",
      "name": "Alex"
    }
  ]
}
```

### `mindwtr_get_person`

**Champs d’entrée**

- `id` : chaîne (UUID de la personne)
- `includeDeleted` : booléen (facultatif)

**Exemple**

```json
{ "id": "person-uuid" }
```

### `mindwtr_get_task`

**Champs d’entrée**

- `id` : chaîne (UUID de la tâche)
- `includeDeleted` : booléen (facultatif)

**Exemple**

```json
{ "id": "task-uuid" }
```

### `mindwtr_add_task` (écriture)

**Champs d’entrée**

- `title` : chaîne (obligatoire si `quickAdd` est omis)
- `quickAdd` : chaîne (obligatoire si `title` est omis)
- `status` : `inbox | next | waiting | someday | reference | done | archived`
- `projectId` : chaîne
- `dueDate` : chaîne ISO
- `startTime` : chaîne ISO
- `contexts` : chaîne[]
- `tags` : chaîne[]
- `description` : chaîne
- `priority` : chaîne
- `timeEstimate` : chaîne (par exemple `30m`, `2h`)

**Exemple**

```json
{
  "quickAdd": "Send invoice +Acme /due:tomorrow 9am #finance"
}
```

### `mindwtr_update_task` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la tâche)
- `title`, `status`, `projectId`, `dueDate`, `startTime`, `contexts`, `tags`, `description`, `priority`, `timeEstimate`, `reviewAt`, `isFocusedToday`

**Remarques**

- Utilisez `null` pour effacer les champs acceptant une valeur nulle. Cela s’applique aux champs de tâche comme `projectId`, `dueDate`, `startTime`, `contexts` et `tags` ; aux champs de projet comme `areaId`, `dueDate`, `reviewAt` et `supportNotes` ; à `description` pour les sections ; à `color` et `icon` pour les domaines ; ainsi qu’à `note` et `referenceLink` pour les personnes.

**Exemple**

```json
{
  "id": "task-uuid",
  "status": "waiting",
  "reviewAt": "2026-01-27T09:00:00.000Z"
}
```

### `mindwtr_complete_task` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la tâche)

### `mindwtr_delete_task` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la tâche)

### `mindwtr_restore_task` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la tâche)

### `mindwtr_add_project` (écriture)

**Champs d’entrée**

- `title` : chaîne
- `color` : chaîne (facultatif)
- `status` : `active | someday | waiting | archived` (facultatif)
- `areaId` : chaîne ou `null`
- `isSequential` : booléen (facultatif)
- `isFocused` : booléen (facultatif)
- `dueDate` : chaîne ISO ou `null`
- `reviewAt` : chaîne ISO ou `null`
- `supportNotes` : chaîne ou `null`

### `mindwtr_update_project` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID du projet)
- `title`, `color`, `status`, `areaId`, `isSequential`, `isFocused`, `dueDate`, `reviewAt`, `supportNotes`

### `mindwtr_delete_project` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID du projet)

### `mindwtr_add_section` (écriture)

**Champs d’entrée**

- `projectId` : chaîne
- `title` : chaîne
- `description` : chaîne ou `null` (facultatif)
- `order` : nombre (facultatif)
- `isCollapsed` : booléen (facultatif)

### `mindwtr_update_section` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la section)
- `title`, `description`, `order`, `isCollapsed`

### `mindwtr_delete_section` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la section)

### `mindwtr_add_area` (écriture)

**Champs d’entrée**

- `name` : chaîne
- `color` : chaîne (facultatif)
- `icon` : chaîne (facultatif)

### `mindwtr_update_area` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID du domaine)
- `name`, `color`, `icon`

### `mindwtr_delete_area` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID du domaine)

### `mindwtr_add_person` (écriture)

**Champs d’entrée**

- `name` : chaîne
- `note` : chaîne ou `null` (facultatif)
- `referenceLink` : chaîne ou `null` (facultatif)

### `mindwtr_update_person` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la personne)
- `name`, `note`, `referenceLink`

### `mindwtr_rename_person` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la personne)
- `name` : chaîne
- `updateTasks` : booléen (facultatif)

### `mindwtr_delete_person` (écriture)

**Champs d’entrée**

- `id` : chaîne (UUID de la personne)

---

## Remarques sur le format de sortie

- Les sorties des outils sont des chaînes JSON et non des valeurs MCP structurées. Votre client doit analyser `content[0].text`.
- Les ID de tâches/projets sont des UUID issus de la base SQLite locale.
- Les dates sont des chaînes ISO 8601 (UTC).

---

## Sécurité et remarques

- **Accès concurrent :** le serveur utilise le mode WAL de SQLite. Les écritures peuvent échouer si la base de données est verrouillée ; les clients doivent alors réessayer.
- **Logique partagée :** les opérations d’écriture utilisent la bibliothèque partagée `@mindwtr/core` afin de garantir l’application des règles métier.
- **Maintien en fonctionnement :** le serveur reste actif tant que `stdin` est ouvert.

## Résolution des problèmes

- **« Command not found »** : utilisez `npx -y mindwtr-mcp` dans les configurations des clients MCP, ou installez le paquet globalement avec `npm install -g mindwtr-mcp`.
- **Problèmes de connexion du client** : vérifiez que vous n’utilisez PAS `bun run` comme commande dans la configuration de votre client MCP, car il peut produire du texte supplémentaire. Préférez `npx -y mindwtr-mcp` ; pour les copies de travail des sources, exécutez directement `bun` sur le fichier source ou `node` sur le fichier construit.
