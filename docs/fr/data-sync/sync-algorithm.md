# Algorithme de synchronisation

Mindwtr utilise une synchronisation locale avant tout avec une gestion déterministe des conflits.

Cette page est la référence technique de fusion pour la maintenance et le débogage. Pour la configuration des backends, les étapes de récupération et les conseils d’exploitation destinés aux utilisateurs, consultez [Données et synchronisation](/fr/data-sync/).

## Entrées et sorties

- Entrée A : instantané local (`tasks`, `projects`, `sections`, `areas`, `settings`)
- Entrée B : instantané distant (même structure)
- Sortie : instantané fusionné + statistiques de fusion (`conflicts`, `clockSkew`, `timestampAdjustments`, `futureTimestampClamps`, `conflictIds`, `conflictReasonCounts`, `conflictSamples`, `timestampAdjustmentIds`, `futureTimestampClampIds`) ainsi que des journaux de diagnostic de synchronisation de taille limitée.

## Transport fondé sur des instantanés

Mindwtr effectue actuellement la synchronisation en fusionnant des instantanés complets. Il s’agit de la conception prévue, et non d’une couche différentielle qui resterait à développer.

- L’ADR 0003 et l’ADR 0007 définissent le comportement de fusion tenant compte des révisions appliqué à la charge utile de l’instantané.
- L’ADR 0008 consigne la décision de transport consistant à conserver la synchronisation par instantanés et à différer tout journal différentiel en ajout seul.
- L’ADR 0009 consigne le contrat de la passerelle SQLite vers JSON : SQLite est le stockage local principal, tandis que `data.json` est l’instantané de synchronisation/sauvegarde.
- À l’échelle actuelle, cette approche conserve l’atomicité de la synchronisation et reste plus facile à appréhender que la relecture et la compaction de journaux d’opérations propres à chaque appareil.

Ne réexaminez l’ADR 0008 que si les fichiers d’instantanés dépassent régulièrement 5 Mo, si les allers-retours de synchronisation dépassent 5 secondes sur des réseaux courants ou si Mindwtr a besoin d’une diffusion multiappareil en temps réel. Dans ce cas, la conception différentielle doit étendre les métadonnées `rev` et `revBy` existantes au lieu d’introduire un schéma de séquence parallèle.

## Règles de fusion

1. Les entités sont mises en correspondance par `id`.
2. Si une entité n’existe que d’un côté, elle est conservée.
3. Si elle existe des deux côtés, la fusion utilise une stratégie LWW tenant compte des révisions :
   - Lorsque des métadonnées de révision existent, comparez d’abord `rev` (la valeur la plus élevée l’emporte). `rev` est un compteur de modifications par entité, et non une horloge vectorielle ; plusieurs modifications hors ligne sur un appareil peuvent donc l’emporter sur une modification plus récente effectuée sur un autre appareil.
   - Si les révisions sont identiques, comparez `updatedAt` (la plus récente l’emporte).
   - Si les horodatages sont identiques, comparez `revBy` lexicographiquement lorsque les deux côtés possèdent des identifiants d’appareil différents, puis appliquez le départage déterministe par signature de contenu normalisée. L’étape `revBy` ne concerne pas la priorité des appareils ; elle garantit que les conflits de même révision et de même horodatage convergent vers le même gagnant sur chaque pair avant l’application du recours à la signature de contenu.
   - Les anciennes entités dépourvues de métadonnées de révision considèrent les valeurs `updatedAt` comprises dans le seuil de dérive de l’horloge de 5 minutes comme une égalité ambiguë et utilisent le gagnant déterminé par la signature. En dehors de cette fenêtre, la valeur `updatedAt` la plus récente l’emporte.
4. Les suppressions réversibles utilisent l’heure de l’opération :
   - Heure de l’opération = `max(updatedAt, deletedAt)` pour les pierres tombales.
   - Les conflits entre élément actif et élément supprimé choisissent l’heure d’opération la plus récente.
   - Si les heures des opérations de suppression et de l’élément actif sont espacées de moins de 30 secondes et que les numéros de révision sont identiques, Mindwtr préserve l’élément actif au lieu de laisser immédiatement la pierre tombale l’emporter. Il s’agit de la règle volontaire de la fenêtre d’ambiguïté qui peut faire réapparaître une tâche venant d’être supprimée après une modification simultanée sur un autre appareil.
   - Si les révisions diffèrent dans cette fenêtre de 30 secondes, la révision la plus élevée l’emporte toujours.
   - Les anciens enregistrements dépourvus de métadonnées de révision donnent la priorité à la pierre tombale dans cette même fenêtre.
   - La restauration d’une sauvegarde est la seule exception volontaire hors de la fenêtre d’ambiguïté : si le côté actif possède `revBy = "backup-restore"` et que son heure d’opération est au moins égale à celle de la pierre tombale, l’élément actif restauré l’emporte.
   - Lorsqu’une suppression l’emporte sur une modification active, Mindwtr émet une entrée de diagnostic `syncConflictDiscarded` de taille limitée contenant le type d’entité, l’identifiant, la chronologie des opérations et les métadonnées de révision.
   - Lorsque l’élément actif de la fenêtre d’ambiguïté est préservé, Mindwtr émet une entrée de diagnostic `Preserved live item during ambiguous delete-vs-live merge` de taille limitée et stocke les métadonnées du conflit dans l’historique/les réglages de synchronisation.
5. Une valeur `deletedAt` non valide revient à `updatedAt` pour déterminer prudemment l’heure de l’opération.
6. Les pièces jointes sont fusionnées par `id` de pièce jointe selon les mêmes règles LWW.
7. Les métadonnées de restauration d’archive d’un projet sont des métadonnées de synchronisation opaques :
   - Archiver un projet enregistre des métadonnées de restauration temporaires sur les tâches et sections modifiées par l’action d’archivage.
   - Ces métadonnées sont ignorées par les signatures de synchronisation comparables et déterministes ; la seule comptabilité de l’archivage ne crée donc ni conflit de contenu ni gagnant déterministe.
   - Le désarchivage ne restaure que les enregistrements qui correspondent encore à la modification générée par l’archivage. Les tâches supprimées, modifiées manuellement ou déplacées vers un autre projet sont préservées en l’état et peuvent conserver les métadonnées opaques jusqu’à ce que l’enregistrement soit réécrit par une véritable modification de l’utilisateur ou de la synchronisation.
8. Les zones utilisent des pierres tombales :
   - Supprimer une zone ne crée une pierre tombale que pour la zone elle-même. Les projets et tâches actifs de cette zone en sont détachés (leur `areaId` est effacé avec une nouvelle révision) et restent actifs. La suppression d’une zone ne supprime jamais ses enfants.
   - Restaurer une zone ne rattache pas les enfants précédemment détachés ; ils restent actifs sans zone.
   - Si un instantané entrant fait référence à une zone manquante ou supprimée, la réparation de synchronisation efface la référence `areaId` obsolète et ajoute une révision de réparation.
   - La réparation de synchronisation s’exécute également sur les pierres tombales, de sorte que les projets/tâches supprimés ne conservent pas de liens obsolètes vers une zone s’ils sont restaurés ultérieurement.
   - Les valeurs d’ordre de zone manquantes sont synthétisées pendant la fusion et marquées avec `revBy: "sync-repair"` afin que la réparation ne soit pas écrasée à plusieurs reprises par les pairs.
9. Les réglages sont fusionnés selon les préférences de synchronisation :
   - L’apparence/la langue/la planification GTD/les calendriers externes/l’IA/les filtres enregistrés peuvent être fusionnés indépendamment.
   - La résolution des conflits utilise des horodatages au niveau des groupes (`appearance`, `language`, `gtd`, `externalCalendars`, `ai`, `savedFilters`).
   - Les modifications simultanées de champs différents au sein du même groupe peuvent toujours être réduites à la mise à jour de groupe la plus récente.
   - Les filtres enregistrés sont fusionnés par `id` de filtre. Les conflits entre filtres enregistrés actifs utilisent strictement la valeur `updatedAt` du filtre ; le départage déterministe ne s’applique que lorsque les horodatages sont identiques ou inutilisables.
   - La désactivation locale d’un groupe dans `syncPreferences` est bidirectionnelle : Mindwtr n’envoie pas ce groupe vers le stockage distant et n’accepte pas les modifications distantes entrantes pour ce groupe.
   - Les secrets (clés d’API, chemins de modèles locaux) ne sont jamais synchronisés.
10. La récupération après une écriture distante est explicite :
   - Les données locales sont d’abord écrites avec `pendingRemoteWriteAt`.
   - Une écriture distante réussie efface l’indicateur.
   - Les écritures distantes ayant échoué programment de nouvelles tentatives avec un délai exponentiel allant de 5 secondes à 5 minutes.
   - Après 12 nouvelles tentatives d’écriture distante ayant échoué, Mindwtr marque la synchronisation comme `error` et affiche l’échec du backend au lieu de réessayer indéfiniment.
   - Les diagnostics de synchronisation propres à l’appareil restent locaux et sont retirés avant les écritures distantes.
11. Télémétrie de la dérive de l’horloge :
   - Les statistiques de fusion enregistrent la dérive la plus importante observée.
   - Des avertissements s’affichent lorsque la dérive dépasse 5 minutes.
   - Les valeurs `updatedAt` futures dépassant de plus de 5 minutes l’horloge au moment de la fusion sont plafonnées pour la comparaison et comptabilisées dans `futureTimestampClamps`.
   - Si les deux côtés du même enregistrement sont plafonnés parce qu’ils se trouvent dans le futur, Mindwtr émet un diagnostic `Both merge candidates had future updatedAt timestamps clamped` de taille limitée avec l’identifiant de l’enregistrement et l’heure de plafonnement.
12. Les modifications locales pendant la synchronisation ne sont pas soumises à un verrouillage strict :
   - Les versions pour ordinateur et mobile détectent si l’état local change pendant la phase d’écriture de la synchronisation.
   - Dans ce cas, le cycle en cours est interrompu et une nouvelle synchronisation est programmée afin de ne pas écraser l’instantané local plus récent.

## Pseudocode

```text
read local
read remote
validate payload shape
normalize entities (timestamps, revision metadata)

for each entity type in [tasks, projects, sections, areas, people]:
  index local by id
  index remote by id
  for each id in union(localIds, remoteIds):
    if only one side exists: keep it
    else:
      winner = resolveWinner(localItem, remoteItem)
      mergedItem = mergeConflict(localItem, remoteItem, winner) // attachments/settings-specific logic
      push mergedItem

merge settings by sync preferences
validate merged payload
write local
write remote
record sync history and diagnostics
```

## Exemples de conflits

### Exemple 1 : élément actif et élément supprimé

- Local : tâche `t1` mise à jour à `10:01`, non supprimée
- Distant : tâche `t1` supprimée à `10:03`
- Résultat : la version supprimée l’emporte (l’heure d’opération `10:03` est plus récente)

### Exemple 1b : suppression ambiguë et élément actif

- Local : tâche `t1` modifiée à `10:00:05`, toujours active
- Distant : tâche `t1` supprimée à `10:00:20`
- Les deux enregistrements ont le même numéro de révision
- Résultat : l’élément actif l’emporte, car les opérations ne sont espacées que de 15 secondes et les métadonnées de révision sont identiques dans la fenêtre d’ambiguïté

### Exemple 2 : révision et horodatage identiques

- Les côtés local et distant possèdent tous deux `rev=4`, `updatedAt=10:00`
- Le contenu diffère (`title`, `tags`, etc.)
- Résultat : la comparaison déterministe des signatures choisit le même gagnant sur tous les appareils

### Exemple 3 : valeur deletedAt non valide

- La pierre tombale locale possède `deletedAt="invalid-date"` et `updatedAt=09:30`
- L’élément distant actif possède `updatedAt=10:00`
- Résultat : l’élément actif l’emporte, car la suppression non valide utilise par défaut `updatedAt` (`09:30`)

## Pièces jointes

- La fusion des métadonnées s’exécute avant la réconciliation du transfert des fichiers.
- L’URI/l’état local de la pièce jointe gagnante est préservé lorsqu’il est utilisable.
- Si le gagnant ne possède pas d’URI local utilisable, la fusion peut revenir à l’URI/l’état de l’autre côté.
- Les courses entre suppression et élément actif des pièces jointes utilisent les mêmes diagnostics de fusion et `syncConflictDiscarded` que les tâches/projets ; la victoire d’une pièce jointe supprimée sur une modification simultanée des métadonnées est donc visible dans les diagnostics.
- Les fichiers locaux manquants sont gérés ultérieurement par la synchronisation/le téléchargement des pièces jointes.
- `settings.attachments.pendingRemoteDeletes` enregistre les fichiers distants qui doivent encore être supprimés après la suppression locale d’une pièce jointe.
- Les suppressions distantes en attente sont conservées jusqu’à ce que la suppression distante réussisse. Elles ne sont pas purgées en fonction de leur ancienneté, car les abandonner avant la réussite pourrait laisser des fichiers supprimés orphelins sur le backend.
- Mindwtr Cloud expose également un point de terminaison authentifié de nettoyage des fichiers orphelins qui supprime les fichiers de pièces jointes non référencés par l’instantané actuel.

## Fusion par le serveur cloud

Mindwtr Cloud n’est pas un simple stockage d’objets pour `/v1/data`. Lors d’un `PUT /v1/data` authentifié, le serveur lit l’instantané existant de l’espace de noms, exécute le même algorithme de fusion avec l’instantané entrant, valide le résultat fusionné et réécrit ce résultat.

Conséquences opérationnelles :

- L’envoi d’un instantané complet ne constitue pas un écrasement forcé. Les enregistrements distants existants avec des révisions plus élevées, des heures d’opération plus récentes ou des pierres tombales gagnantes peuvent survivre au PUT.
- La réparation des références côté serveur peut créer des mises à jour en cascade, comme la création de pierres tombales pour les sections appartenant à des projets supprimés.
- Les horodatages de réparation générés par le serveur utilisent l’horloge murale du serveur. Cela évite qu’une horloge client en avance ne fasse progresser les métadonnées de réparation du serveur.
- Les réponses réussies à `PUT /v1/data` comprennent `{ ok: true, stats, clockSkewWarning }` afin que les clients et les tests puissent examiner le résultat de fusion utilisé par le serveur.

## Contrôle rapide de l’absence de modification

Les clients cloud peuvent émettre `HEAD /v1/data` avant de télécharger un instantané complet. Le serveur renvoie les métadonnées `ETag`, `Last-Modified` et `Content-Length` sans corps de réponse. Les clients comparent ces métadonnées à celles de la dernière synchronisation réussie et ignorent le parcours complet `GET /v1/data` lorsque l’espace de noms distant n’a pas changé.

Le serveur met en cache l’ETag SHA-256 selon les métadonnées d’état du fichier afin que les contrôles `HEAD` répétés sans modification ne recalculent pas le hachage de l’ensemble de l’instantané.

## Synchronisation planifiée en arrière-plan

La synchronisation mobile en arrière-plan est programmée avec un intervalle minimal prudent de 15 minutes. La tâche en arrière-plan charge paresseusement le code d’importation/synchronisation uniquement lorsqu’il est nécessaire, puis exécute la même fusion d’instantanés et la même logique de nouvelle tentative d’écriture distante décrites ci-dessus.

La synchronisation en arrière-plan est opportuniste : le système d’exploitation peut retarder ou ignorer une exécution. La synchronisation manuelle et celle au premier plan restent donc les moyens de récupération fiables lorsque la connectivité ou les identifiants ont changé.

## Récupération par nouvelle tentative

- Une écriture distante ayant échoué n’abandonne pas silencieusement l’état local venant d’être fusionné.
- `pendingRemoteWriteAt`, `pendingRemoteWriteRetryAt` et `pendingRemoteWriteAttempts` sont stockés localement.
- La synchronisation suivante attend l’expiration de la fenêtre de nouvelle tentative, puis réessaie en utilisant l’instantané local préservé ainsi que toute modification locale plus récente.
- Après 12 tentatives, l’état de la synchronisation devient `error`. L’instantané local préservé reste en local et l’interface d’état doit inviter l’utilisateur à vérifier la connectivité ou les identifiants du backend.

## Limite de purge des pierres tombales

Les pierres tombales protègent les suppressions uniquement pendant leur période de conservation. La politique de conservation actuelle est limitée par `tombstoneRetentionDays`.

En pratique, un appareil resté hors ligne plus longtemps que la fenêtre de conservation peut réintroduire des enregistrements dont les pierres tombales de suppression ont déjà été purgées sur les autres appareils. Mindwtr considère ce comportement comme la limite de cohérence documentée de la synchronisation par instantanés. Les utilisateurs doivent synchroniser les appareils restés longtemps hors ligne avant de se fier à d’anciennes données locales ; si des garanties plus strictes sont nécessaires, une future évolution du protocole devra rejeter les instantanés dont la dernière synchronisation réussie est antérieure à l’horizon de purge.

## Diagnostics consultables

- Nombre et identifiants des conflits
- Nombre de motifs de conflits et échantillons de conflits de taille limitée
- Dérive maximale de l’horloge observée
- Ajustements de normalisation des horodatages
- Identifiants des enregistrements dont les horodatages ont été normalisés
- Nombre et identifiants des plafonnements d’horodatages futurs
- Entrées `syncConflictDiscarded` pour les conflits entre suppression et élément actif dans lesquels le côté actif a été abandonné
- État/historique de la dernière synchronisation dans les Réglages
- Détails par conflit dans Réglages → Synchronisation : nom de l’élément affecté, champs différents et version de l’appareil ayant gagné (limités aux échantillons les plus récents)
- Récapitulatifs des conflits dans `mindwtr.log`, écrits même lorsque la journalisation de débogage est désactivée (identifiants et noms de champs uniquement, jamais le contenu des enregistrements)

## Documentation connexe

- [Données et synchronisation](/fr/data-sync/)
- [API Cloud](/fr/developers/cloud-api)
- [Déploiement dans le cloud](/fr/data-sync/cloud-deployment)
- [Diagnostics et journaux](/fr/data-sync/diagnostics-logs)
- [API principale](/fr/developers/core-api)

## Dépannage

Si vous observez des conflits répétés ou des avertissements de dérive :

1. Vérifiez les horloges des appareils (heure réseau automatique activée).
2. Vérifiez la connectivité/l’authentification du backend de synchronisation.
3. Examinez les diagnostics de synchronisation dans les réglages et journaux de l’application.
