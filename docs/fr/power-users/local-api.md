# Serveur d’API locale

Mindwtr comprend un serveur d’API REST locale facultatif pour les scripts et les intégrations. Sur ordinateur, il s’exécute dans le binaire de l’application et utilise les mêmes chemins de stockage local que celle-ci. Le dépôt comprend également un utilitaire Bun pour le développement et les scripts avancés.

---

## Activation sur ordinateur

Les versions de bureau peuvent démarrer l’API REST locale sans exécuter le code source :

- Ouvrez **Réglages -> Avancé**.
- Activez **Serveur d’API locale**.
- Conservez le port par défaut `3456` ou choisissez un autre port localhost.
- Copiez le jeton porteur généré depuis la même carte de réglages.

L’application se lie uniquement à `127.0.0.1` et exige `Authorization: Bearer <token>` pour chaque requête. Les binaires mobiles n’exposent pas d’API REST locale.

### Utilitaire de développement

L’utilitaire du dépôt reste disponible lorsque vous souhaitez exécuter l’API en dehors de l’application de bureau ou lui indiquer des fichiers précis.

---

## Démarrage rapide

Depuis l’application de bureau :

```text
Settings -> Advanced -> Enable local API server
```

URL par défaut :

```text
http://127.0.0.1:3456
```

Depuis la racine du dépôt avec Bun :

```bash
bun install
bun run mindwtr:api -- --port 4317 --host 127.0.0.1
```

### Options

| Option          | Valeur par défaut       | Description                            |
| --------------- | ----------------------- | -------------------------------------- |
| `--port <n>`    | `4317`                  | Port du serveur                        |
| `--host <host>` | `127.0.0.1`             | Adresse d’écoute                       |
| `--data <path>` | Valeur de la plateforme | Remplacer l’emplacement de data.json   |
| `--db <path>`   | Valeur de la plateforme | Remplacer l’emplacement de mindwtr.db  |

### Variables d’environnement

| Variable            | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `MINDWTR_DATA`      | Remplacer l’emplacement de data.json (si `--data` est omis)        |
| `MINDWTR_DB_PATH`   | Remplacer l’emplacement de mindwtr.db (si `--db` est omis)         |
| `MINDWTR_API_TOKEN` | Utilitaire Bun uniquement : si défini, exiger `Authorization: Bearer <token>` |

Par défaut, l’API résout `data.json` et `mindwtr.db` à l’aide des chemins de plateforme de Mindwtr (en privilégiant les données XDG sous Linux).

---

## Authentification

Les requêtes à l’API locale de l’application de bureau exigent toujours le jeton porteur affiché sous **Réglages -> Avancé** :

```
Authorization: Bearer <token>
```

L’utilitaire Bun n’exige un jeton que lorsque `MINDWTR_API_TOKEN` est défini.

---

## Points de terminaison

| Méthode  | Point de terminaison   | Description                              |
| -------- | ---------------------- | ---------------------------------------- |
| `GET`    | `/health`              | Contrôle d’intégrité → `{ ok: true }`    |
| `GET`    | `/tasks`               | Répertorier les tâches                   |
| `GET`    | `/tasks?status=next`   | Filtrer par statut                       |
| `GET`    | `/tasks?query=@work`   | Rechercher des tâches                    |
| `GET`    | `/tasks?all=1`         | Inclure les tâches terminées/archivées   |
| `GET`    | `/tasks?deleted=1`     | Inclure les suppressions logiques        |
| `POST`   | `/tasks`               | Créer une tâche                          |
| `GET`    | `/tasks/:id`           | Obtenir une tâche                        |
| `PATCH`  | `/tasks/:id`           | Mettre à jour une tâche                  |
| `DELETE` | `/tasks/:id`           | Supprimer logiquement une tâche          |
| `POST`   | `/tasks/:id/complete`  | Marquer comme terminée                   |
| `POST`   | `/tasks/:id/archive`   | Marquer comme archivée                   |
| `POST`   | `/tasks/:id/restore`   | Restaurer une tâche supprimée logiquement |
| `GET`    | `/projects`            | Répertorier les projets                  |
| `GET`    | `/areas`               | Répertorier les domaines                 |
| `GET`    | `/v1/areas`            | Alias de compatibilité pour les domaines |
| `GET`    | `/search?query=...`    | Rechercher des tâches et des projets     |

### Formes des réponses

**Tâche (partielle)**
```json
{
  "id": "uuid",
  "title": "Task title",
  "status": "inbox",
  "projectId": "uuid",
  "dueDate": "2026-01-25T12:00:00.000Z",
  "tags": ["#work"],
  "contexts": ["@email"],
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Projet (partiel)**
```json
{
  "id": "uuid",
  "title": "Project name",
  "status": "active",
  "color": "#94a3b8",
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z",
  "deletedAt": null
}
```

**Domaine**
```json
{
  "id": "uuid",
  "name": "Area name",
  "color": "#94a3b8",
  "icon": "briefcase",
  "order": 0,
  "createdAt": "2026-01-25T10:00:00.000Z",
  "updatedAt": "2026-01-25T10:00:00.000Z"
}
```

### Corps de création d’une tâche

```json
{
  "input": "Call Alice",
  "title": "Alternative title",
  "props": {
    "status": "next",
    "contexts": ["@phone"],
    "tags": ["#errands"]
  }
}
```

L’application de bureau utilise `title` lorsqu’il est présent, sinon `input`, et applique les `props` explicites. L’utilitaire Bun exécute en plus `parseQuickAdd` pour `input`.

---

## Exemples

**Répertorier les prochaines actions :**

```bash
curl -s 'http://127.0.0.1:3456/tasks?status=next' \
  -H 'Authorization: Bearer <token>' | jq .
```

**Créer avec des propriétés explicites :**

```bash
curl -s -X POST 'http://127.0.0.1:3456/tasks' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Call Alice","props":{"status":"next","contexts":["@phone"],"tags":["#errands"]}}' | jq .
```

**Terminer une tâche :**

```bash
curl -s -X POST "http://127.0.0.1:4317/tasks/$TASK_ID/complete" | jq .
```

---

## Outil en ligne de commande

Une interface en ligne de commande plus simple est également disponible :

```bash
# Add a task
bun mindwtr:cli -- add "Call mom @phone #family"

# List active tasks
bun mindwtr:cli -- list

# List with filters
bun mindwtr:cli -- list --status next --query "due:<=7d"

# Read or update a task
bun mindwtr:cli -- get <taskId>
bun mindwtr:cli -- update <taskId> '{"status":"next"}'

# Complete a task
bun mindwtr:cli -- complete <taskId>

# Archive, delete, or restore
bun mindwtr:cli -- archive <taskId>
bun mindwtr:cli -- delete <taskId>
bun mindwtr:cli -- restore <taskId>

# Search
bun mindwtr:cli -- search "@work"

# List projects
bun mindwtr:cli -- projects
```

### Référence de la CLI

| Commande     | Exemple                                      | Remarques                                  |
| ------------ | -------------------------------------------- | ------------------------------------------ |
| `add`        | `mindwtr:cli -- add "Call mom @phone"`       | Utilise l’analyse de l’ajout rapide        |
| `list`       | `mindwtr:cli -- list --status next`          | Prend en charge `--all`, `--deleted`, `--query` |
| `get`        | `mindwtr:cli -- get <taskId>`                | Affiche le JSON complet de la tâche        |
| `update`     | `mindwtr:cli -- update <taskId> '{"status":"next"}'` | Applique un correctif JSON        |
| `search`     | `mindwtr:cli -- search "@work due:<=7d"`     | Recherche des tâches/projets               |
| `complete`   | `mindwtr:cli -- complete <taskId>`           | Marque la tâche comme terminée             |
| `archive`    | `mindwtr:cli -- archive <taskId>`            | Marque la tâche comme archivée             |
| `delete`     | `mindwtr:cli -- delete <taskId>`             | Supprime logiquement la tâche              |
| `restore`    | `mindwtr:cli -- restore <taskId>`            | Restaure une tâche supprimée               |
| `projects`   | `mindwtr:cli -- projects`                    | Répertorie les projets actifs              |

---

## Notes de sécurité

- Le serveur est conçu pour s’exécuter sur `127.0.0.1` (localhost). Ne l’exposez pas publiquement à moins d’en comprendre les risques.
- L’accès à l’API de bureau exige le jeton porteur généré dans les réglages. Gardez ce jeton privé.
- Si vous avez besoin d’un accès distant à l’utilitaire Bun, définissez `MINDWTR_API_TOKEN` et placez le serveur derrière un proxy inverse authentifié.

---

## Voir aussi

- [Guide du développeur](/fr/developers/developer-guide)
- [API Cloud](/fr/developers/cloud-api)
