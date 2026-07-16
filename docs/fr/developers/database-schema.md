# Schéma de la base de données

Mindwtr conserve volontairement un modèle local réduit et adapté à la synchronisation. L’application pour ordinateur utilise SQLite comme stockage principal ; la version mobile emploie le même schéma lorsque SQLite est disponible.

La source de vérité du schéma SQLite se trouve dans :

- `packages/core/src/sqlite-schema.ts`
- `packages/core/src/sqlite-adapter.ts`

Cette page en donne une carte pratique aux contributeurs.

---

## Tables principales

### `tasks`

Enregistrements des tâches : statut GTD, planification, listes de contrôle, pièces jointes, ordre et métadonnées de synchronisation.

Colonnes importantes :

- `status` : voie GTD (`inbox`, `next`, `waiting`, `someday`, `reference`, `done`, `archived`)
- `projectId`, `sectionId`, `areaId` : relations parentes
- `dueDate`, `startTime`, `reviewAt`, `completedAt` : champs temporels du flux
- `relativeStartOffset` : règle JSON de délai qui recalcule `startTime` depuis `dueDate`
- `repeatReminderMinutes` : intervalle de rappel répété à l’échéance, limité aux valeurs prédéfinies
- `location` : contexte physique pour la recherche et les tâches ou événements du calendrier
- `checklist`, `attachments`, `tags`, `contexts`, `recurrence` : champs JSON
- `showFutureRecurrence` : booléen stocké comme entier, qui active dans le Calendrier un aperçu de la prochaine occurrence réservé à la planification
- `deletedAt`, `purgedAt` : champs de tombstone employés par la synchronisation
- `rev`, `revBy`, `updatedAt` : métadonnées de fusion et de conflit

### `projects`

Conteneurs de projets et métadonnées de planification.

Colonnes importantes :

- `status` : `active`, `someday`, `waiting`, `archived`
- `areaId` : domaine parent facultatif
- `orderNum` : ordre dans un domaine
- `tagIds`, `attachments` : champs JSON
- `supportNotes`, `reviewAt` : planification et revue
- `deletedAt`, `rev`, `revBy`, `updatedAt` : métadonnées de synchronisation

### `sections`

Groupes de tâches internes aux projets.

- `projectId` : projet propriétaire
- `orderNum` : ordre dans le projet
- `isCollapsed` : état persistant de l’interface
- `deletedAt`, `rev`, `revBy`, `updatedAt` : métadonnées de synchronisation

### `areas`

Domaines de responsabilité GTD de niveau supérieur.

- `name`, `color`, `icon`
- `orderNum` : ordre manuel
- `deletedAt`, `rev`, `revBy`, `updatedAt` : métadonnées de synchronisation

### `people`

Attributaires gérés pour le travail délégué ou centré sur une personne.

- `name` : nom affiché dans les suggestions et la recherche `assigned:`
- `note`, `referenceLink` : notes et URL de référence facultatives
- `deletedAt`, `rev`, `revBy`, `updatedAt` : métadonnées de synchronisation

### `settings`

Stockage JSON à une ligne des paramètres de l’application.

- `id = 1`
- `data` : objet de paramètres sérialisé

### `saved_filters`

Définitions de filtres enregistrés pour la vue Focus.

- `name`, `icon`, `view` : métadonnées d’affichage
- `criteria` : critères sérialisés
- `sortBy`, `sortOrder` : ordre enregistré facultatif
- `createdAt`, `updatedAt` : métadonnées locales

### `calendar_sync`

Table de correspondance pour l’envoi vers le calendrier de l’appareil.

- `task_id` : identifiant de tâche Mindwtr
- `calendar_event_id`, `calendar_id` : identifiants natifs du calendrier
- `platform` : espace de noms de plateforme
- `last_synced_at` : dernier envoi réussi

### `schema_migrations`

Suit les versions de schéma appliquées lors des migrations additives.

---

## Tables de recherche plein texte

SQLite FTS5 alimente la recherche locale sur ordinateur et mobile.

### `tasks_fts`

Champs de tâches indexés :

- `title`
- `description`
- `tags`
- `contexts`
- `location`

### `projects_fts`

Champs de projets indexés :

- `title`
- `supportNotes`
- `tagIds`
- `areaTitle`

Des déclencheurs dans `packages/core/src/sqlite-schema.ts` maintiennent ces tables.

---

## Index

Le schéma comprend des index ciblés pour les parcours fréquents de l’interface et de la synchronisation :

- filtres de statut et de suppression des tâches ;
- requêtes de dates (`dueDate`, `startTime`, `reviewAt`, `completedAt`) ;
- regroupements (`projectId`, `areaId`, `sectionId`) ;
- statut des projets et ordre des domaines.

Les définitions actuelles se trouvent dans `SQLITE_INDEX_SCHEMA` au sein de `packages/core/src/sqlite-schema.ts`.

---

## Règles de validation

Des déclencheurs SQLite refusent les valeurs d’énumération invalides et le JSON mal formé lors de l’écriture.

Les contrôles actuels portent notamment sur :

- les statuts de tâche et de projet ;
- la validité JSON des tags, contextes, listes de contrôle, pièces jointes et récurrences des tâches ;
- la validité JSON des identifiants de tags et pièces jointes des projets.

La base sur disque reste ainsi conforme au modèle TypeScript et la couche de stockage ne peut pas être contournée au prix d’une corruption partielle.

---

## Sémantique de synchronisation

Mindwtr ne s’appuie **pas** sur des suppressions relationnelles en cascade pour ses entités principales. Le modèle utilise des tombstones de suppression réversible afin de synchroniser les suppressions entre appareils.

Voir aussi :

- [Architecture](/fr/developers/architecture)
- [Données et synchronisation](/fr/data-sync/)
- [Algorithme de synchronisation](/fr/data-sync/sync-algorithm)
- `docs/adr/0001-sqlite-constraints.md`

---

## Remarques pour les contributeurs

- Préférez les ajouts au schéma aux réécritures destructives.
- Lors de l’ajout d’un champ, mettez à jour le schéma et la logique de correspondance de l’adaptateur.
- Si un champ affecte la recherche, adaptez délibérément les tables et déclencheurs FTS.
- Avant de modifier des contraintes ou suppressions, étudiez les conséquences pour la synchronisation et les tombstones.
