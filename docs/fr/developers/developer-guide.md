# Guide du développeur

Ce guide couvre la configuration de l'environnement de développement et les directives de contribution à Mindwtr.

---

## Philosophie du produit

Mindwtr est conçu pour être **simple par défaut et puissant quand vous en avez besoin**. Nous cherchons à réduire la charge cognitive, à éliminer le superflu et à préserver la concentration des utilisateurs. Chaque contribution est évaluée à l'aune de ces principes :

- **Divulgation progressive** : les options avancées restent masquées jusqu'à ce qu'elles deviennent utiles.
- **Moins par défaut** : moins de champs, moins de réglages, moins de distractions.
- **Éviter l'accumulation de fonctionnalités** : nous privilégions la clarté plutôt que l'encombrement.
- **L'automatique l'emporte sur le manuel** : si le bon résultat peut être déduit ou prédit — à partir de la plateforme, du canal d'installation, des données existantes ou du contexte — l'application doit simplement s'en charger. Cela s'applique partout, pas seulement aux paramètres : aucun réglage à configurer, aucune invite demandant ce que l'application peut déterminer elle-même, aucune pression ou étape manuelle supplémentaire dans un flux de travail, aucune interface que l'utilisateur doit manipuler pour obtenir le résultat évident. Chaque étape manuelle transfère la charge cognitive de notre côté (une fois) vers chaque utilisateur (pour toujours). Le vérificateur de mises à jour sert de modèle : au lieu d'un bouton « désactiver la recherche de mises à jour », l'application détecte son mode d'installation et adopte le comportement approprié à chaque canal — les installations effectuées par un gestionnaire de paquets restent silencieuses d'elles-mêmes, sans qu'aucun paramètre ne soit fourni. Lorsque le comportement approprié ne peut réellement pas être déduit et que la demande est avérée, placez la fonctionnalité derrière un commutateur ou un affordance existants avant d'en créer un nouveau.

_Ne me montrez pas un cockpit quand je veux simplement faire du vélo._

Consultez les [Principes d'ingénierie](/fr/developers/engineering-principles) pour connaître les garde-fous relatifs à la sécurité des données et à la synchronisation qui sous-tendent ces principes.

---

## Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Installer les dépendances
bun install

# Exécuter l'application de bureau (mode développement)
bun desktop:dev

# Exécuter l'application mobile
bun mobile:start
```

---

## Prérequis

### Toutes les plateformes

- [Bun](https://bun.sh/) — Gestionnaire de paquets et environnement d'exécution
- [Node.js](https://nodejs.org/) — Environnement d'exécution JavaScript (pour certains outils)
- [Git](https://git-scm.com/) — Gestion de versions

### Développement pour ordinateur

- [Rust](https://rustup.rs/) — Requis pour Tauri

**Linux (Arch) :**
```bash
sudo pacman -S rust webkit2gtk-4.1 base-devel
```

**Linux (Debian/Ubuntu) :**
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential libssl-dev libgtk-3-dev
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**macOS :**
```bash
xcode-select --install
brew install rust
```

**Windows :**
Installez [Rust](https://rustup.rs/) et les [outils de génération Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/).

### Développement mobile

- Application [Expo Go](https://expo.dev/client) (pour les tests)
- Android Studio (pour les builds sur émulateur/appareil)
- Xcode (pour le développement iOS)

---

## Structure du projet

```
Mindwtr/
├── apps/
│   ├── cloud/             # Serveur de synchronisation (Bun)
│   ├── desktop/           # Tauri v2 + React + Vite
│   │   ├── src/           # Sources React
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── lib/
│   │   │   └── App.tsx
│   │   ├── src-tauri/     # Moteur Rust
│   │   └── package.json
│   │
│   └── mobile/            # Expo + React Native
│       ├── app/           # Pages d'Expo Router
│       ├── components/
│       ├── contexts/
│       ├── lib/
│       └── package.json
│
├── packages/
│   └── core/              # Logique métier partagée
│       └── src/
│           ├── store.ts   # Store Zustand
│           ├── types.ts   # Types TypeScript
│           ├── i18n.ts    # Traductions
│           └── ...
│
├── scripts/               # Scripts utilitaires (CLI, API, publication)
├── docs/                  # Documentation interne au dépôt : ADR, notes de version, documentation de contribution
├── wiki/                  # Page d'accueil du wiki GitHub retiré (renvoie vers le site de documentation)
├── .github/               # Flux de travail CI/CD
└── package.json           # Racine du monorepo
```

La documentation publique destinée aux utilisateurs et aux développeurs est maintenue dans le répertoire `docs/` de ce dépôt et publiée sur https://docs.mindwtr.app/. Les sources publiques se trouvent à l'adresse https://github.com/dongdongbh/mindwtr-web/tree/main/docs. Privilégiez ce dépôt de documentation pour les pages de guide nouvelles ou migrées.

Sources de la documentation publique : https://github.com/dongdongbh/mindwtr-web/tree/main/docs

---

## Scripts disponibles

### Niveau racine

| Commande             | Description                            |
| -------------------- | -------------------------------------- |
| `bun install`        | Installer toutes les dépendances       |
| `bun desktop:dev`    | Exécuter la version de bureau en mode développement |
| `bun mobile:start`   | Démarrer le serveur de développement Expo |
| `bun mobile:android` | Exécuter sur Android                   |
| `bun mobile:ios`     | Exécuter sur iOS                       |
| `bun test`           | Exécuter tous les tests                |
| `bun mindwtr:cli`    | Exécuter l'outil CLI                   |
| `bun mindwtr:api`    | Exécuter le serveur d'API local        |

### Bureau (`apps/desktop`)

| Commande    | Description                              |
| ----------- | ---------------------------------------- |
| `bun dev`   | Mode développement avec rechargement à chaud |
| `bun build` | Construire pour la production            |
| `bun test`  | Exécuter les tests                       |

### Mobile (`apps/mobile`)

| Commande        | Description                  |
| --------------- | ---------------------------- |
| `bun start`     | Démarrer le serveur Expo     |
| `bun android`   | Exécuter sur Android         |
| `bun ios`       | Exécuter sur iOS             |
| `ARCHS=arm64-v8a bash ./scripts/android_build.sh` | Construire l'APK Android |

### Cloud (`apps/cloud`)

| Commande  | Description                         |
| --------- | ----------------------------------- |
| `bun dev` | Exécuter le serveur de synchronisation |

### Noyau (`packages/core`)

| Commande    | Description               |
| ----------- | ------------------------- |
| `bun test`  | Exécuter les tests unitaires |
| `bun build` | Construire le paquet      |

---

## Pile technologique

| Couche         | Bureau           | Mobile                | Cloud            |
| -------------- | ---------------- | --------------------- | ---------------- |
| **Framework**  | React + Vite     | React Native + Expo   | Bun (HTTP natif) |
| **Style**      | Tailwind CSS     | NativeWind (Tailwind) | S/O              |
| **État**       | Zustand (partagé)| Zustand (partagé)     | S/O              |
| **Plateforme** | Tauri v2 (Rust)  | Expo (iOS/Android)    | Bun              |
| **Routeur**    | React Router     | Expo Router           | S/O              |
| **Langage**    | TypeScript       | TypeScript            | TypeScript       |

---

## Décisions d'architecture

Nous consignons les décisions techniques importantes sous forme d'ADR dans `docs/adr/`. Voir :
- `docs/adr/README.md`

ADR de synchronisation actuels à connaître avant de modifier le comportement de fusion ou de transport :
- L'ADR 0003 définit des métadonnées de synchronisation tenant compte des révisions (`rev`, `revBy`) et une fusion déterministe tenant compte des pierres tombales.
- L'ADR 0007 définit la règle appliquée selon laquelle les données actives l'emportent lors des conflits ambigus entre suppression et données actives.
- L'ADR 0008 indique que Mindwtr reste intentionnellement fondé sur une synchronisation par instantanés pour le moment, plutôt que d'ajouter un journal de deltas.

Les contributeurs doivent considérer le transport par instantanés comme un choix de produit délibéré, et non comme une infrastructure manquante. Ne réexaminez l'ADR 0008 que si les fichiers d'instantané dépassent régulièrement 5 Mo, si les allers-retours de synchronisation prennent plus de 5 secondes sur des réseaux ordinaires, ou si Mindwtr nécessite une diffusion multiappareil en temps réel.

---

## Flux de développement

### Apporter des modifications

1. Créez une branche de fonctionnalité
2. Apportez les modifications dans le paquet concerné
3. Exécutez les tests : `bun test`
4. Testez sur ordinateur : `bun desktop:dev`
5. Testez sur mobile : `bun mobile:start`
6. Validez avec un message descriptif
7. Ouvrez une pull request

Lors de l'ajout d'un nouveau type d'entité de premier niveau, mettez à jour toute la surface de persistance et de synchronisation dans la même modification : types et normalisation d'`AppData` dans le noyau, tests d'aller-retour du schéma/stockage SQLite de bureau, schéma SQLite/restauration de sauvegarde mobile, validation/normalisation cloud, outils MCP s'ils sont exposés, ainsi que la source de la documentation de l'API du noyau à l'adresse https://github.com/dongdongbh/mindwtr-web/tree/main/docs.

### Style du code

- TypeScript pour tout le code
- Composants React fonctionnels
- Exportations nommées privilégiées
- Commentaires JSDoc pour les API publiques

### Tests

```bash
# Exécuter tous les tests
bun test

# Exécuter les tests de bureau
cd apps/desktop && bun test

# Exécuter les tests du noyau
cd packages/core && bun test
```

---

## Construction pour la production

### Bureau

```bash
cd apps/desktop
bun run build
# Sortie : src-tauri/target/release/
```

### Bureau (build de diagnostic)

Les builds de publication désactivent les outils de développement par défaut. Pour activer les diagnostics/outils de développement, construisez avec la
fonctionnalité `diagnostics` et choisissez de l'activer à l'exécution :

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Mobile (APK Android)

```bash
cd apps/mobile
ARCHS=arm64-v8a bash ./scripts/android_build.sh
```

Consultez [Installation mobile](/fr/start/mobile-installation) pour obtenir des instructions de construction détaillées.

---

## Vue d'ensemble de l'architecture

Consultez [Architecture](/fr/developers/architecture) pour une conception technique détaillée.

### Concepts clés

- **Monorepo :** dépôt unique avec des dépendances partagées
- **Noyau partagé :** logique métier dans `@mindwtr/core`
- **Applications de plateforme :** les applications de bureau et mobiles utilisent le noyau partagé
- **Stockage local :** les données sont conservées localement
- **Synchronisation multiple :** synchronisation par fichier, WebDAV ou Cloud

---

## Outil CLI

Interface en ligne de commande pour les scripts et l'automatisation :

```bash
# Ajouter une tâche
bun mindwtr:cli -- add "Call mom @phone #family"

# Lister les tâches actives
bun mindwtr:cli -- list

# Lister avec des filtres
bun mindwtr:cli -- list --status next --query "due:<=7d"

# Lire ou mettre à jour une tâche
bun mindwtr:cli -- get <taskId>
bun mindwtr:cli -- update <taskId> '{"status":"next"}'

# Terminer une tâche
bun mindwtr:cli -- complete <taskId>

# Archiver, supprimer ou restaurer
bun mindwtr:cli -- archive <taskId>
bun mindwtr:cli -- delete <taskId>
bun mindwtr:cli -- restore <taskId>

# Rechercher
bun mindwtr:cli -- search "@work"

# Lister les projets
bun mindwtr:cli -- projects
```

**Options :**
- `--data <path>` — Remplacer l'emplacement de data.json
- `--db <path>` — Remplacer l'emplacement de mindwtr.db
- `MINDWTR_DATA` — Variable d'environnement pour le chemin des données
- `MINDWTR_DB_PATH` — Variable d'environnement pour le chemin de la base de données

Sur les chemins compatibles avec la version de bureau, la CLI maintient `mindwtr.db` et `data.json` alignés afin que les modifications restent visibles avant et après le démarrage de l'application.

---

## API REST locale

Exécutez un serveur d'API local pour les scripts et les intégrations :

```bash
# Démarrer le serveur d'API
bun mindwtr:api -- --port 4317

# Avec un jeton d'authentification
MINDWTR_API_TOKEN=secret bun mindwtr:api -- --port 4317
```

L'API locale utilise le même contrat de stockage que la CLI, en maintenant `mindwtr.db` et `data.json` synchronisés sur les chemins compatibles avec la version de bureau.

### Points de terminaison

| Méthode  | Point de terminaison     | Description                    |
| -------- | ------------------------ | ------------------------------ |
| `GET`    | `/health`                | Vérification d'état            |
| `GET`    | `/tasks`                 | Lister les tâches              |
| `GET`    | `/tasks?status=next`     | Filtrer par statut             |
| `GET`    | `/tasks?query=@work`     | Rechercher des tâches          |
| `POST`   | `/tasks`                 | Créer une tâche                |
| `PATCH`  | `/tasks/:id`             | Mettre à jour une tâche        |
| `DELETE` | `/tasks/:id`             | Supprimer logiquement une tâche |
| `POST`   | `/tasks/:id/complete`    | Marquer une tâche comme terminée |
| `POST`   | `/tasks/:id/archive`     | Marquer une tâche comme archivée |
| `POST`   | `/tasks/:id/restore`     | Restaurer une tâche supprimée  |
| `GET`    | `/projects`              | Lister les projets             |
| `GET`    | `/search?query=...`      | Rechercher des tâches+projets  |

**Exemple :**
```bash
# Ajouter une tâche via l'API
curl -X POST http://localhost:4317/tasks \
  -H "Content-Type: application/json" \
  -d '{"input": "Review PR @work /due:tomorrow"}'

# Terminer une tâche
curl -X POST http://localhost:4317/tasks/<id>/complete
```

---

## Serveur cloud

Moteur de synchronisation cloud auto-hébergé :

```bash
# Depuis la racine du monorepo
bun run --filter mindwtr-cloud dev -- --port 8787
```

### Points de terminaison

| Méthode | Point de terminaison | Description    |
| ------- | -------------------- | -------------- |
| `GET`   | `/health`            | Vérification d'état |
| `HEAD`  | `/v1/data`           | Obtenir les métadonnées de l'instantané |
| `GET`   | `/v1/data`           | Obtenir les données utilisateur |
| `PUT`   | `/v1/data`           | Fusionner et enregistrer les données utilisateur ; renvoie les statistiques de fusion |
| `GET`, `POST` | `/v1/tasks` | Lister ou créer des tâches |
| `GET`, `PATCH`, `DELETE` | `/v1/tasks/:id` | Lire, mettre à jour ou supprimer logiquement une tâche |
| `POST` | `/v1/tasks/:id/complete` | Marquer une tâche comme terminée |
| `POST` | `/v1/tasks/:id/archive` | Archiver une tâche |
| `GET`, `POST` | `/v1/projects` | Lister ou créer des projets |
| `GET`, `PATCH`, `DELETE` | `/v1/projects/:id` | Lire, mettre à jour ou supprimer logiquement un projet |
| `GET`, `POST` | `/v1/sections` | Lister ou créer des sections |
| `GET`, `PATCH`, `DELETE` | `/v1/sections/:id` | Lire, mettre à jour ou supprimer logiquement une section |
| `GET`, `POST` | `/v1/areas` | Lister ou créer des domaines |
| `GET`, `PATCH`, `DELETE` | `/v1/areas/:id` | Lire, mettre à jour ou supprimer logiquement un domaine |
| `GET` | `/v1/search` | Rechercher des tâches et des projets |
| `GET`, `PUT`, `DELETE` | `/v1/attachments/*` | Télécharger, téléverser ou supprimer des fichiers joints |
| `POST`, `DELETE` | `/v1/attachments/orphans` | Analyser ou supprimer les fichiers joints orphelins |

**Authentification :** `Authorization: Bearer <token>`

Chaque jeton dispose de son propre fichier de données (nom de fichier haché avec SHA-256).

**Environnement :**
- `PORT` — Port du serveur (8787 par défaut)
- `HOST` — Adresse d'écoute (0.0.0.0 par défaut)
- `MINDWTR_CLOUD_DATA_DIR` — Répertoire des données

---

## Application web (PWA)

Exécutez l'interface de bureau dans un navigateur avec la prise en charge des PWA :

```bash
# Développement
bun desktop:web

# Build de production
bun desktop:web:build
```

Utilise localStorage pour le stockage des données et inclut une prise en charge hors ligne via un service worker.

---

## Voir aussi

- [Architecture](/fr/developers/architecture)
- [API du noyau](/fr/developers/core-api)
- [Contribuer (guide du dépôt)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
