# Données et synchronisation

Mindwtr stocke les données localement et prend en charge plusieurs options de synchronisation entre les appareils.

Mindwtr ne fournit **aucun** service cloud hébergé. La synchronisation est locale avant tout et configurée par l’utilisateur : vous choisissez comment le fichier `data.json` (et `attachments/`) circule entre les appareils. Rien n’est transféré tant que vous n’avez pas configuré l’une des options ci-dessous. Une fois configurée, la synchronisation fonctionne de manière autonome.

Les versions actuelles pour ordinateur et mobile répartissent les réglages sur deux pages :
- **Réglages → Synchronisation** pour la configuration du backend, les options de synchronisation, l’historique et les instantanés de récupération
- **Réglages → Données** pour la sauvegarde/restauration/importation, le nettoyage des pièces jointes et les diagnostics

Cette page est le guide de configuration et de récupération destiné aux utilisateurs du site de documentation. Pour les règles de fusion et les champs de diagnostic destinés aux responsables de maintenance, consultez [Algorithme de synchronisation](/fr/data-sync/sync-algorithm).

Pour l’importation de coffres Obsidian sur ordinateur et les liens profonds vers les notes, consultez [Intégration d’Obsidian](/fr/power-users/obsidian).

---

## Stockage des données

### Ordinateur

Les données sont stockées dans une base de données SQLite locale, avec un fichier JSON de synchronisation/sauvegarde :

| Plateforme | Base de données (SQLite) | JSON (synchronisation/sauvegarde) |
| ----------- | -------------------------------------------------- | ------------------------------------------------------ |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`                 | `~/.local/share/mindwtr/data.json`                     |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                      | `%APPDATA%/mindwtr/data.json`                          |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db`  | `~/Library/Application Support/mindwtr/data.json`      |

La configuration est stockée séparément :

| Plateforme | Emplacement |
| ----------- | --------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`               |
| **Windows** | `%APPDATA%/mindwtr/config.toml`               |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

> Les anciennes versions Tauri utilisaient `~/.config/tech.dongdongbh.mindwtr/` et `~/.local/share/tech.dongdongbh.mindwtr/` sous Linux. Elles sont migrées automatiquement lorsqu’elles sont détectées.

### Mobile

Les données sont stockées dans une base de données SQLite locale, avec un fichier JSON de synchronisation/sauvegarde :

- **Base de données SQLite** : `mindwtr.db`
- **Sauvegarde JSON** : `data.json`

---

## Backends de synchronisation

Mindwtr prend directement en charge cinq backends de synchronisation :

- **Synchronisation iCloud / CloudKit native** : synchronisation native réservée aux appareils Apple pour les données principales et, lorsqu’ils sont disponibles, les fichiers de pièces jointes
- **Synchronisation de fichiers** : un dossier/fichier sélectionné par l’utilisateur (`data.json` + `attachments/`)
- **Synchronisation Dropbox OAuth** : synchronisation directe avec le dossier d’application Dropbox dans les versions prises en charge
- **WebDAV** : tout point de terminaison WebDAV compatible
- **Mindwtr Cloud (auto-hébergé)** : votre propre point de terminaison `apps/cloud`

### Vue d’ensemble

| Backend | Plateformes | Effort de configuration | Vitesse relative | Gestion des conflits | Idéal pour |
| --- | --- | --- | --- | --- | --- |
| **Synchronisation de fichiers** (dossier) | Toutes | Faible, choisissez un dossier | La plus rapide (système de fichiers ordinaire) | Au niveau du fichier ; le fournisseur du dossier voit un seul fichier | Syncthing, clients de stockage cloud existants, réseau local |
| **WebDAV** | Toutes | Moyen, URL du serveur + identifiants | Plus lente, un aller-retour HTTP par requête | Contrôlée par l’application, fusion par élément | Nextcloud/ownCloud/Fastmail, stockage distant sur votre propre serveur |
| **Mindwtr Cloud (auto-hébergé)** | Toutes | Plus important, déploiement de `apps/cloud` + jeton | Rapide, point de terminaison unique, fusion par le serveur lors de l’écriture | Fusion par l’application + côté serveur | Plusieurs appareils effectuant des modifications simultanément |
| **Dropbox** | Versions prises en charge | Faible, connexion OAuth | Modérée, API du fournisseur | Contrôlée par l’application, fusion par élément | Option cloud la plus simple sans votre propre serveur |
| **iCloud / CloudKit** | Versions Apple | Faible, activation dans les Réglages | Rapide, synchronisation par enregistrement | Fusion CloudKit par enregistrement | Ensemble d’appareils Apple uniquement |

Les différences de vitesse sont surtout importantes avec les pièces jointes volumineuses, que WebDAV et Dropbox transfèrent sous forme de téléversements/téléchargements individuels. Consultez [Cycle de vie des données](/fr/data-sync/data-lifecycle) pour savoir ce qui est réellement transféré lors d’une synchronisation.

### Maîtrise des données

| Mode | Une copie quitte-t-elle l’appareil ? | Vous contrôlez | Copie distante |
| --- | --- | --- | --- |
| **Synchronisation désactivée** | Non | L’appareil et ses sauvegardes | Aucune |
| **Synchronisation de fichiers** | Seulement si un autre outil réplique le dossier choisi | Le dossier et tout fournisseur ou appareil qui le synchronise | `data.json` et les pièces jointes de ce dossier |
| **Dropbox** | Oui | Le compte Dropbox connecté | `/Apps/Mindwtr/data.json` et les pièces jointes du dossier d’application |
| **iCloud / CloudKit** | Oui | L’identifiant Apple et le compte iCloud | Enregistrements CloudKit et pièces jointes |
| **WebDAV** | Oui | Le point d’accès, le compte et les identifiants | `data.json` et les pièces jointes sur ce serveur WebDAV |
| **Mindwtr Cloud (auto-hébergé)** | Oui | Le déploiement, le stockage et le jeton d’accès | Données de synchronisation et pièces jointes sur ce serveur |

La base SQLite locale reste la source de référence. La synchronisation par fichiers utilise un JSON lisible et conserve les pièces jointes sous forme de fichiers. Considérez donc le dossier, le compte fournisseur ou le serveur choisi comme un stockage de confiance. Mindwtr n’exploite aucun service de synchronisation hébergé. Les requêtes directes vers Dropbox ne transitent pas par le développeur de Mindwtr, et les jetons Dropbox restent sur votre appareil.

Dans **Réglages → Synchronisation**, les versions prises en charge présentent ces options dans un sélecteur de backend unique, puis expliquent la procédure de configuration sélectionnée :

- **Synchronisation cloud** : **Dropbox** et **iCloud** sur les plateformes Apple
- **Synchronisation de dossier/fichier** : **Fichier**
- **Serveur avancé/personnalisé** : **WebDAV** et **Auto-hébergé**

Les configurations Dropbox existantes continuent de fonctionner ; elles apparaissent simplement comme backend **Dropbox** de premier niveau dans l’explication **Synchronisation cloud**, au lieu d’être imbriquées dans un sélecteur d’auto-hébergement/de fournisseur cloud.

### Prise en charge directe ou indirecte des fournisseurs

- **Fournisseurs/protocoles directement pris en charge** : iCloud / CloudKit natif sur les versions Apple prises en charge, serveurs WebDAV, point de terminaison auto-hébergé de Mindwtr et Dropbox OAuth (versions prises en charge).
- **Fournisseurs pris en charge indirectement** : iCloud Drive, Google Drive, OneDrive, Syncthing, partages réseau et Dropbox via la synchronisation de fichiers.
- **Important** : la synchronisation iCloud native est **réservée aux appareils Apple**. Android, Windows et Linux doivent utiliser la synchronisation de fichiers, WebDAV, Mindwtr Cloud ou Dropbox.

**Conseils rapides :**
- **Dropbox** : option cloud multiplateforme la plus simple dans les versions prises en charge ; connectez-vous avec OAuth et Mindwtr utilise son dossier d’application Dropbox.
- **Syncthing** : synchronisation de fichiers d’appareil à appareil. Idéale sur le même réseau local/sous-réseau. Pour une synchronisation distante, utilisez un relais Syncthing ou un VPN maillé (Nebula/Tailscale).
- **WebDAV** : utilisez un fournisseur prenant en charge WebDAV (par exemple Nextcloud, ownCloud, Fastmail ou un serveur auto-hébergé).
- **iCloud** : utilisez la synchronisation iCloud native dans les versions Apple prises en charge, y compris pour les fichiers de pièces jointes, ou iCloud Drive via la synchronisation de fichiers.
- **Google Drive/OneDrive** : utilisez la synchronisation de fichiers (et des applications passerelles Android si nécessaire).

## Recommandations de synchronisation

- **Synchronisation cloud prête à l’emploi la plus simple :** Dropbox OAuth dans les versions prises en charge.
- **Meilleure configuration réservée aux appareils Apple :** iCloud / CloudKit natif dans les versions Apple prises en charge.
- **Meilleure synchronisation distante sur votre propre serveur :** WebDAV ou Mindwtr Cloud (auto-hébergé). L’application contrôle le cycle de synchronisation et effectue une fusion par élément.
- **Synchronisation de fichiers (Syncthing/Dropbox/etc.) :** fonctionne, mais les **conflits ont lieu au niveau du fichier**, car `data.json` est un fichier unique.
- **Bonnes pratiques pour la synchronisation de fichiers :** évitez d’effectuer des modifications sur deux appareils en même temps et attendez la fin de la synchronisation avant d’ouvrir l’application sur un autre appareil. Si des conflits apparaissent, conservez le fichier `data.json` le plus récent et supprimez les copies `data.json.sync-conflict-*`.

### Proxy sur ordinateur

Sur ordinateur, Mindwtr peut utiliser un proxy HTTP(S) facultatif pour les requêtes réseau telles que WebDAV, Dropbox, la synchronisation Cloud auto-hébergée et les abonnements à des calendriers externes.

Définissez-le dans **Réglages → Avancé → Réseau → URL du proxy**. Utilisez une URL complète telle que `http://proxy-host:port` ou `https://proxy-host:port`. Laissez ce champ vide pour utiliser le comportement réseau par défaut, y compris les éventuelles variables d’environnement `HTTP_PROXY` / `HTTPS_PROXY` prises en charge.

Le champ intégré à l’application est volontairement minimal : il s’agit d’une URL de proxy unique, et non d’un gestionnaire de proxys complet. Les proxys SOCKS, fichiers PAC et règles de proxy par backend ne s’y configurent pas. Ce réglage n’est pas synchronisé entre les appareils.

## Récupération après un conflit

Mindwtr résout normalement automatiquement les conflits entre les éléments. Si une tâche que vous avez supprimée réapparaît après la synchronisation, la cause la plus courante est une modification simultanée sur un autre appareil pendant la fenêtre d’ambiguïté entre suppression et élément actif. Lorsque les numéros de révision sont identiques et que les heures des opérations sont espacées de moins de 30 secondes, Mindwtr préserve la modification de l’élément actif afin de ne pas supprimer silencieusement du travail.

Que faire :
1. Ouvrez **Réglages → Synchronisation** et consultez le dernier état/historique de synchronisation pour repérer les conflits.
2. Si la tâche réapparue reste indésirable, supprimez-la de nouveau une fois la synchronisation terminée sur tous les appareils.
3. Si les deux appareils sont toujours en désaccord, synchronisez manuellement chaque appareil, l’un après l’autre, puis conservez la version souhaitée et effectuez de nouveau la suppression/restauration.
4. Si vous devez récupérer des données plus anciennes, utilisez **Réglages → Données** ou **Réglages → Synchronisation → Instantanés de récupération** avant d’effectuer d’autres modifications.

### 1. Synchronisation iCloud / CloudKit native (Apple uniquement)

Mindwtr inclut un backend **iCloud** natif dans les versions Apple prises en charge.

- **Guide** : [Synchronisation iCloud](/fr/data-sync/icloud)
- **Idéal pour** : les configurations composées uniquement d’appareils Apple lorsque vous souhaitez une expérience plus simple que la gestion d’un dossier partagé
- **Ne convient pas à** : des appareils Android, Windows ou Linux dans la même configuration de synchronisation

Ce backend est disponible sur iPhone, iPad et macOS. Si vous préférez une configuration par dossier sur macOS, vous pouvez toujours utiliser **iCloud Drive + synchronisation de fichiers**.

### 2. Synchronisation de fichiers

Synchronisez les données au moyen d’un fichier JSON partagé avec tout service de synchronisation par dossier :

- Dropbox
- Google Drive
- Syncthing
- OneDrive
- iCloud Drive
- Tout dossier réseau

#### iCloud Drive comme synchronisation de fichiers (macOS + iOS)

iCloud Drive fonctionne également avec Mindwtr au moyen de la **synchronisation de fichiers** si vous souhaitez effectuer la synchronisation par l’intermédiaire d’un dossier partagé plutôt qu’avec le backend CloudKit natif.

Configuration recommandée :
1. Sur macOS, créez un dossier tel que `iCloud Drive/Mindwtr`.
2. Dans Mindwtr pour ordinateur, définissez **Backend de synchronisation = Fichier** et sélectionnez ce dossier.
3. Effectuez une première exportation pour créer `data.json` et `attachments/`.
4. Attendez qu’iCloud Drive termine le téléversement.
5. Sur iOS, dans **Réglages → Synchronisation → Sélectionner un dossier** de Mindwtr mobile, choisissez le même dossier iCloud Drive dans Fichiers.
   - Si un fournisseur est grisé dans le sélecteur de dossiers iOS, sélectionnez n’importe quel fichier JSON dans le dossier cible. Mindwtr utilisera malgré tout ce dossier pour `data.json` et `attachments/`.

Important :
- Synchronisez à la fois `data.json` **et** `attachments/`. Les pièces jointes font partie des données de synchronisation.
- Ne déplacez pas seulement `data.json` sans `attachments/`, sinon les métadonnées et fichiers des pièces jointes peuvent diverger.
- Si l’option Optimiser le stockage d’iCloud décharge les fichiers, laissez Fichiers les télécharger de nouveau avant de lancer une synchronisation manuelle.

#### Signets de fichiers iOS pour Google Drive, OneDrive et les autres fournisseurs de Fichiers

Sur iOS, Google Drive, OneDrive et les fournisseurs similaires peuvent être utilisés avec la **synchronisation de fichiers** lorsqu’ils exposent un fichier dans le sélecteur Fichiers. Si la sélection de dossiers n’est pas disponible, choisissez un fichier JSON existant dans le dossier cible ; Mindwtr enregistre un signet à portée de sécurité et l’utilise pour les lectures et écritures ultérieures.

Ce mode de fournisseur limité à un fichier synchronise `data.json`. Les dossiers de pièces jointes ne sont pas disponibles par l’intermédiaire de tous les signets des fournisseurs de Fichiers ; utilisez donc iCloud/CloudKit natif, Dropbox, WebDAV ou un cloud auto-hébergé si les pièces jointes doivent être synchronisées de manière fiable. Si iOS indique que l’accès au signet a expiré, sélectionnez de nouveau le fichier de synchronisation dans **Réglages → Synchronisation**.

#### Remarques sur Syncthing (configuration recommandée)

Syncthing fonctionne bien avec Mindwtr, mais l’ordre de la configuration initiale est important.
Les appareils doivent pouvoir communiquer entre eux : de préférence sur le même sous-réseau/réseau local, ou par l’intermédiaire d’un relais/VPN maillé (par exemple Nebula ou Tailscale) pour une synchronisation distante.

**Procédure recommandée :**
1. Créez un dossier Syncthing unique (par exemple `Mindwtr/`) et laissez-le se synchroniser complètement.
2. Sur ordinateur, choisissez ce dossier dans **Réglages → Synchronisation** avec le backend **Fichier** sélectionné.
3. Utilisez **Exporter une sauvegarde** vers ce dossier pour créer `data.json` et `attachments/`.
4. Attendez que Syncthing termine la synchronisation vers votre téléphone.
5. Sur mobile, sélectionnez le même dossier dans **Réglages → Synchronisation**.

**Pourquoi vous voyez `attachments (1)` / `attachments (2)`**
Syncthing crée des dossiers en double lorsque les deux appareils créent ou modifient le même dossier en même temps. Cela se produit souvent si Mindwtr est ouvert sur les deux appareils avant la fin de la synchronisation initiale.

**Comment corriger les doublons :**
1. Choisissez le « véritable » dossier `attachments/` (généralement celui qui contient le plus de fichiers).
2. Déplacez les fichiers de `attachments (1)`/`attachments (2)` vers `attachments/`.
3. Supprimez les dossiers en double et laissez Syncthing converger.

**Important :** ne synchronisez pas directement `~/.local/share/mindwtr`. Le stockage mobile est isolé. Utilisez plutôt le dossier de synchronisation de fichiers + `data.json`.
Si vous avez déjà synchronisé le répertoire de données de l’application, passez à un dossier de synchronisation dédié et sélectionnez-le de nouveau dans les Réglages.

#### Google Drive sur Android (synchronisation de fichiers) et solution de repli Dropbox

Google Drive ne fournit **pas** WebDAV. Si vous souhaitez utiliser Google Drive avec la synchronisation de fichiers sur Android, vous avez besoin d’une application passerelle qui maintient un dossier local synchronisé (afin que Mindwtr puisse lire/écrire directement `data.json`).

Les utilisateurs de Dropbox sur Android peuvent utiliser la synchronisation Dropbox native dans les versions prises en charge. Si vous préférez la synchronisation de fichiers, la même approche avec une application passerelle fonctionne également pour Dropbox.

Exemples :
- **Dropsync** (Dropbox)
- **Autosync** (Google Drive)
- **FolderSync** (générique)

Indiquez ensuite à Mindwtr le dossier local synchronisé dans **Réglages → Synchronisation**.

#### OneDrive sur Android (configuration recommandée)

L’application OneDrive officielle pour Android ne maintient **pas** un dossier local en synchronisation bidirectionnelle continue.
Pour utiliser OneDrive de manière fiable avec Mindwtr sur Android, installez une application « passerelle » :

- **OneSync (Autosync for OneDrive)**
- **FolderSync**

Ensuite :
1. Créez un dossier OneDrive pour Mindwtr (sur ordinateur).
2. Utilisez l’application passerelle pour synchroniser ce dossier avec un dossier local sur Android.
3. Dans Mindwtr, sélectionnez ce dossier local dans **Réglages → Synchronisation** (Mindwtr utilisera le fichier `data.json` qu’il contient).

### 3. Synchronisation WebDAV

Synchronisez directement avec un serveur WebDAV :

- Nextcloud
- ownCloud
- Fastmail
- Tout serveur compatible WebDAV

Mindwtr crée désormais automatiquement les dossiers parents manquants avant le premier `PUT`. Vous pouvez donc lui indiquer un nouveau dossier vide sans devoir créer manuellement chaque niveau au préalable.

WebDAV utilise HTTPS pour les URL publiques. HTTP en clair n’est autorisé que pour les cibles locales/privées reconnues telles que `localhost`, `127.0.0.1`, `10.x.x.x`, de `172.16.x.x` à `172.31.x.x`, `192.168.x.x`, les adresses IPv6 de bouclage/privées, `*.local` et `*.home.arpa`. Utilisez HTTPS pour un DNS personnalisé, les noms d’hôte de VPN, Tailscale, ZeroTier et tout nom qui n’est pas reconnu comme local/privé.

### 4. Mindwtr Cloud (auto-hébergé)

Pour les utilisateurs avancés, Mindwtr inclut un serveur de synchronisation simple (`apps/cloud`) qui peut être auto-hébergé.

- **Protocole** : API REST simple (GET/PUT)
- **Authentification** : jeton porteur (associé à un fichier de données précis sur le serveur)
- **Déploiement** : Node.js/Bun
- **Configuration Docker** : [Déploiement avec Docker](/fr/power-users/docker-deployment)
- **Guide d’exploitation** : [Déploiement dans le cloud](/fr/data-sync/cloud-deployment)

Remarque importante pour le client :

- **HTTPS est obligatoire pour les URL publiques de Mindwtr Cloud.** HTTP en clair est automatiquement autorisé pour les cibles locales/privées telles que `localhost`, `127.0.0.1`, `10.x.x.x`, de `172.16.x.x` à `172.31.x.x`, `192.168.x.x`, les adresses IPv6 de bouclage/privées, `*.local` et `*.home.arpa`.
- Si vous exposez Cloud hors d’un réseau local de confiance, placez le serveur derrière HTTPS avec un proxy inverse tel que `caddy`, `nginx` ou `traefik`.
- Utilisez HTTPS pour un DNS personnalisé, les noms d’hôte de VPN, Tailscale, ZeroTier et tout nom qui n’est pas reconnu comme local/privé, ou activez **Autoriser HTTP non sécurisé (non recommandé)** dans les réglages de synchronisation pour accepter ce nom d’hôte en HTTP non chiffré. Les données circulent alors en clair ; ne l’utilisez que sur un réseau de confiance.

### 5. Synchronisation Dropbox OAuth

Mindwtr prend également en charge la synchronisation Dropbox directe dans les versions pour ordinateur/mobile prises en charge.

- **Périmètre** : dossier d’application Dropbox (`/Apps/Mindwtr/`)
- **Données synchronisées** : `data.json` et `attachments/*`
- **Authentification** : OAuth 2.0 + PKCE
- **Configuration** : choisissez **Dropbox** dans **Réglages → Synchronisation**, connectez votre compte, puis lancez **Tester la connexion**
- **Guide** : [Synchronisation Dropbox](/fr/data-sync/dropbox)

---

## Fonctionnement de la synchronisation

### Synchronisation automatique

Mindwtr se synchronise automatiquement dans les situations suivantes :

- **Au démarrage** : peu après le lancement de l’application.
- **Lors de modifications des données** : peu après la modification des tâches/projets, avec un court délai anti-rebond afin de regrouper les modifications rapides dans une seule synchronisation.
- **Lorsque l’application reprend le focus** : lorsque l’application pour ordinateur récupère le focus, avec une limitation à une fois toutes les 30 secondes ; cette synchronisation s’exécute même sans modification locale afin de récupérer rapidement les modifications distantes.
- **Lorsque l’application perd le focus/passe en arrière-plan** : lorsque vous quittez l’application pour ordinateur, mais uniquement si des modifications locales doivent être envoyées.
- **Signal périodique sur ordinateur** : toutes les 15 minutes tant que Mindwtr est en cours d’exécution.

Si une synchronisation automatique échoue, Mindwtr suspend les nouvelles tentatives automatiques pendant environ 60 secondes. La synchronisation manuelle reste disponible pendant ce délai de récupération.

### Options de synchronisation des réglages

Mindwtr peut synchroniser certaines préférences entre les appareils. Configurez-les dans **Réglages → Synchronisation → Options de synchronisation des réglages**.

Les options disponibles comprennent :
- **Apparence** (thème)
- **Langue et format de date**
- **Préférences GTD** (heure de planification par défaut et limite de tâches dans Focus)
- **URL de calendriers externes** (abonnements ICS)
- **Réglages de l’IA** (modèles/fournisseurs)
- **Filtres enregistrés** (préréglages de filtres Focus)

> Les clés d’API et les chemins des modèles locaux ne sont jamais synchronisés.
> La résolution des conflits de réglages s’effectue par groupe. Si deux appareils modifient des champs différents du même groupe de réglages presque simultanément, la mise à jour la plus récente du groupe peut écraser l’ancienne.

### Stratégie de fusion

Mindwtr utilise une stratégie **Last-Write-Wins (LWW) tenant compte des révisions** pour chaque élément :
- Chaque tâche, projet, section et zone possède un horodatage `updatedAt`.
- Lorsqu’elles sont disponibles, les métadonnées de révision (`rev` et `revBy`) sont utilisées avant de revenir aux simples horodatages.
- Les éléments supprimés de manière réversible (pierres tombales) sont conservés afin que les suppressions se propagent correctement entre les appareils.

Les conflits entre suppression et élément actif utilisent **l’heure de la dernière opération**, et non le seul `updatedAt` brut :
- Pour les éléments supprimés, Mindwtr compare `deletedAt` à la dernière mise à jour de l’élément actif.
- Si la suppression et la modification de l’élément actif sont espacées de plus de 30 secondes, l’opération la plus récente l’emporte.
- Dans cette fenêtre d’ambiguïté de 30 secondes, un numéro de révision supérieur l’emporte toujours lorsqu’il est disponible. Sinon, Mindwtr préserve l’élément actif au lieu de laisser trop rapidement la pierre tombale l’emporter.
- Conséquence pratique : si vous supprimez une tâche sur un appareil dans un délai d’environ 30 secondes après l’avoir modifiée sur un autre, la tâche active modifiée peut réapparaître après la synchronisation. Supprimez-la de nouveau après la synchronisation des appareils si vous souhaitiez bien la retirer.

Les horodatages futurs décalés de plus de 5 minutes par rapport à l’horloge de fusion sont plafonnés pendant les contrôles de sécurité de la fusion afin qu’une mauvaise horloge d’appareil ne domine pas indéfiniment. Si les deux côtés sont plafonnés dans le futur, Mindwtr préserve malgré tout leur ordre relatif au lieu de les considérer à tort comme identiques.

Les règles détaillées de départage des fusions, le comportement des nouvelles tentatives et les exemples de conflits figurent dans [Algorithme de synchronisation](/fr/data-sync/sync-algorithm). Cette page se limite à la vue d’ensemble du stockage et de l’exploitation.

### Visibilité des conflits et dérive de l’horloge

Après chaque synchronisation, Mindwtr enregistre les statistiques de synchronisation dans les réglages :

- **Conflits** : nombre total de conflits et petit échantillon d’identifiants en conflit
- **Dérive de l’horloge** : décalage maximal observé entre les horodatages des appareils
- **Corrections des horodatages** : lorsque `updatedAt < createdAt`, les horodatages sont corrigés pendant la fusion

Vous pouvez consulter ces détails dans **Réglages → Synchronisation** (sur ordinateur et mobile). Des valeurs de dérive importantes indiquent généralement que les horloges des appareils ne sont pas synchronisées.
Sur mobile, les entrées de l’historique de synchronisation sont réduites par défaut ; touchez-les pour les développer.

### Synchronisation et nettoyage des pièces jointes

- Les pièces jointes sont synchronisées **après** la fusion des métadonnées.
- Les pièces jointes manquantes restent affichées comme espaces réservés jusqu’à leur téléchargement.
- Les pièces jointes orphelines sont nettoyées automatiquement (et le nettoyage peut être déclenché manuellement sur ordinateur dans **Réglages → Données**).
- Le nettoyage des pièces jointes distantes tient compte des références locales et non d’un comptage global des références. Si deux appareils créent ou conservent des références vers la même pièce jointe distante avant de s’être synchronisés entre eux, un appareil peut ne pas encore connaître la référence de l’autre. Laissez les appareils se synchroniser avant de supprimer des pièces jointes partagées et joignez de nouveau le fichier si le nettoyage supprime une copie distante dont un autre appareil a encore besoin.

---

## Configuration de la synchronisation sur ordinateur

### Synchronisation de fichiers

1. Ouvrez **Réglages → Synchronisation**
2. Définissez **Backend de synchronisation** sur **Fichier**
3. Cliquez sur **Changer d’emplacement** et sélectionnez un dossier dans votre service de synchronisation
4. Cliquez sur **Enregistrer**

Mindwtr se synchronisera automatiquement au démarrage et lors de la modification des données.

### Synchronisation WebDAV

1. Ouvrez **Réglages → Synchronisation**
2. Définissez **Backend de synchronisation** sur **WebDAV**
3. Saisissez les informations de votre serveur WebDAV :
   - **URL** : URL du dossier ; Mindwtr y stockera `data.json` (par exemple `https://nextcloud.example.com/remote.php/dav/files/user/Mindwtr`)
   - **Nom d’utilisateur** : votre nom d’utilisateur WebDAV
   - **Mot de passe** : votre mot de passe WebDAV
4. Cliquez sur **Enregistrer WebDAV**

Si le chemin du dossier cible n’existe pas encore, Mindwtr essaiera de créer automatiquement les collections parentes manquantes avant de téléverser `data.json`.

> **Remarque pour Linux :** si votre session de bureau ne fournit pas de trousseau Secret Service (par exemple si `org.freedesktop.secrets` n’est pas disponible), Mindwtr utilise à la place un stockage local des secrets dans `~/.config/mindwtr/secrets.toml`.

> **Conseil :** pour Nextcloud, le format de l’URL est :
> `https://your-server.com/remote.php/dav/files/USERNAME/path/to/folder`
>
> Les URL comportant des ports explicites sont prises en charge (par exemple `https://example.com:5000/mindwtr`).

## Configuration de la synchronisation mobile

La synchronisation mobile exige de sélectionner manuellement un dossier de synchronisation en raison des restrictions de stockage d’Android/iOS.

Sur iOS, certains fournisseurs cloud peuvent ne pas proposer la sélection de dossiers dans Fichiers. Dans ce cas, sélectionnez n’importe quel fichier JSON dans le dossier de synchronisation cible ; Mindwtr déterminera et utilisera le chemin du dossier pour la synchronisation.

### 1. Exportez d’abord vos données

1. Accédez à **Réglages → Données**
2. Touchez **Exporter une sauvegarde**
3. Enregistrez le fichier dans votre dossier de synchronisation (par exemple Google Drive)

### 2. Sélectionnez le dossier de synchronisation

1. Dans **Réglages → Synchronisation**
2. Touchez **Sélectionner un dossier**
3. Accédez à votre dossier de synchronisation
4. Sélectionnez le dossier qui contient (ou contiendra) `data.json`

### 3. Synchronisation automatique

La version mobile se synchronise désormais automatiquement :
- Lorsque l’application passe en arrière-plan
- 5 secondes après une modification des données
- Lors du retour dans l’application (si plus de 30 secondes se sont écoulées)

Vous pouvez également toucher **Synchroniser** manuellement à tout moment dans les Réglages.

---

## Passerelle de synchronisation SQLite + JSON

Mindwtr utilise SQLite comme stockage local principal. `data.json` est l’instantané de synchronisation et de sauvegarde, et non une seconde source de vérité équivalente.

- **Démarrage à froid/lectures normales** : l’application lit le stockage local reposant sur SQLite.
- **Synchronisation sortante** : les enregistrements locaux en attente sont d’abord vidés, puis l’instantané actuel est exporté vers `data.json` / le stockage distant.
- **Synchronisation entrante** : le JSON externe est validé, normalisé, fusionné avec les données locales et réenregistré dans le stockage reposant sur SQLite.
- **Diagnostics de synchronisation locaux à l’appareil** : des champs tels que `lastSyncStats`, `lastSyncHistory` et les métadonnées de récupération des écritures distantes en attente restent locaux et sont retirés des charges utiles distantes.

Les versions pour ordinateur et mobile ne **bloquent pas** les modifications pendant la synchronisation. À la place, si les données locales changent pendant une écriture de synchronisation, l’application interrompt ce cycle et en programme un nouveau afin que l’instantané local plus récent ne soit pas écrasé.

Consultez [ADR 0009](https://github.com/dongdongbh/Mindwtr/blob/main/docs/adr/0009-sqlite-json-sync-bridge.md) pour le contrat complet.

---

## Procédure de synchronisation

### Deux appareils

**Configuration initiale :**
1. Configurez l’ordinateur avec le dossier de synchronisation
2. Exportez la sauvegarde et enregistrez-la dans le dossier de synchronisation
3. Sur mobile, sélectionnez ce dossier

**Utilisation quotidienne :**
1. Effectuez des modifications sur l’appareil A
2. Attendez que le service de synchronisation les réplique
3. Sur l’appareil B, déclenchez la synchronisation (Réglages → Synchronisation)

### Plusieurs appareils

La même procédure s’applique. Évitez d’effectuer des modifications simultanément sur plusieurs appareils afin de prévenir les conflits.

---

## Liste de contrôle de dépannage

- **Vérifiez que `data.json` existe** dans votre dossier de synchronisation et qu’il est mis à jour.
- **Attendez que Syncthing termine complètement la synchronisation** avant d’ouvrir Mindwtr sur le deuxième appareil.
- **Utilisez « Synchroniser » manuellement** dans les Réglages si vous souhaitez un envoi/une récupération immédiat.
- **Recherchez les dossiers de pièces jointes en double** (`attachments (1)`, etc.) et fusionnez-les.
- **Vérifiez que les horloges des appareils sont correctes** (une dérive importante provoque des conflits).
- **Vérifiez les autorisations du dossier** (le SAF Android peut bloquer l’accès en écriture à certains dossiers).

---

## Sauvegarde et exportation

### Exporter les données

**Ordinateur :**
- Utilisez **Réglages → Données → Exporter une sauvegarde**
- Les backends de synchronisation maintiennent également `data.json` automatiquement à jour lorsque la synchronisation est activée

**Mobile :**
1. Accédez à **Réglages → Données**
2. Touchez **Exporter une sauvegarde**
3. Enregistrez-la à l’emplacement souhaité

### Restaurer à partir d’une sauvegarde

Mindwtr peut restaurer directement les données locales à partir d’un fichier JSON de sauvegarde, aussi bien sur ordinateur que sur mobile.

Procédure :
1. Ouvrez **Réglages → Données**
2. Choisissez **Restaurer une sauvegarde**
3. Sélectionnez un fichier JSON de sauvegarde Mindwtr
4. Examinez le récapitulatif de la sauvegarde et confirmez

Avant la restauration, Mindwtr valide le fichier et crée un instantané de récupération lorsque la plateforme le permet. La restauration remplace intégralement les données locales ; elle ne les fusionne pas.

- **Ordinateur** : un instantané de récupération est créé dans le dossier des instantanés de données de l’application avant la restauration
- **Mobile** : un instantané de récupération local est créé dans le stockage de l’application avant la restauration
- **Si le fichier n’est pas valide** : la restauration est bloquée et vos données actuelles restent intactes

Consultez [Sauvegarde et restauration](/fr/data-sync/backup-restore) pour connaître la procédure détaillée.

## Importations et migrations

Utilisez ces guides pour transférer dans Mindwtr des données de tâches provenant d’une autre application. Les importations ajoutent des données à Mindwtr ; elles ne configurent pas la synchronisation.

### Importation CSV / ZIP de TickTick

Mindwtr peut importer des sauvegardes TickTick depuis **Réglages → Données → Importer depuis TickTick**.

- Prend en charge les sauvegardes TickTick **CSV** et les sauvegardes **ZIP** contenant l’exportation CSV
- Crée des zones Mindwtr à partir des dossiers TickTick
- Crée des projets Mindwtr à partir des listes TickTick
- Préserve les états, dates, priorités, étiquettes, notes et récurrences de tâches pris en charge
- Convertit les données de listes de contrôle/sous-tâches prises en charge en éléments de liste de contrôle Mindwtr

Consultez [Importation depuis TickTick](/fr/import/ticktick) pour obtenir les détails et les correspondances prises en charge.

### Importation CSV / ZIP de Todoist

Mindwtr peut importer des exportations Todoist depuis **Réglages → Données → Importer depuis Todoist**.

- Prend en charge une exportation CSV Todoist unique ou une sauvegarde ZIP contenant plusieurs fichiers CSV de projets
- Crée des projets Mindwtr à partir des projets Todoist
- Préserve les sections Todoist comme sections Mindwtr
- Convertit les sous-tâches Todoist en éléments de liste de contrôle
- Laisse les tâches importées dans la **Boîte de réception** afin que vous puissiez les traiter selon votre procédure GTD habituelle

Les planifications récurrentes de Todoist ne sont pas recréées automatiquement. Mindwtr importe la tâche une seule fois et conserve le texte original de la récurrence dans la description.

Consultez [Importation depuis Todoist](/fr/import/todoist) pour obtenir les détails et les correspondances prises en charge.

### Importation JSON / ZIP de DGT GTD

Mindwtr peut importer des exportations DGT GTD depuis **Réglages → Données → Importer depuis DGT GTD**.

- Prend en charge une exportation JSON DGT GTD ou une archive ZIP contenant le fichier JSON exporté
- Crée des zones Mindwtr à partir des dossiers DGT
- Crée des projets Mindwtr à partir des projets DGT
- Préserve les listes de contrôle DGT sous forme de tâches de liste de contrôle Mindwtr
- Préserve les contextes et les étiquettes DGT sur les tâches importées
- Conserve les règles de répétition prises en charge et avertit lorsqu’un modèle de répétition DGT doit être importé une seule fois en conservant le texte original

Les tâches DGT autonomes restent dans Mindwtr sans être placées de force dans de nouveaux projets, afin que vous puissiez les organiser ultérieurement si nécessaire.

Consultez [Importation depuis DGT GTD](/fr/import/dgt-gtd) pour obtenir les détails et les correspondances prises en charge.

### Importation CSV / JSON / ZIP d’OmniFocus

Mindwtr peut importer des exportations OmniFocus depuis **Réglages → Données → Importer depuis OmniFocus**.

- Prend en charge les exportations **CSV** d’OmniFocus, y compris les fichiers CSV UTF-8 et UTF-16
- Prend en charge les exportations **JSON** d’Omni Automation / Raccourcis et les archives **ZIP**
- Crée des zones Mindwtr à partir des dossiers OmniFocus lorsque les métadonnées sont disponibles
- Crée des projets Mindwtr à partir des projets OmniFocus ou des noms de projets référencés
- Conserve les actions OmniFocus autonomes hors des projets afin que vous puissiez les organiser ultérieurement
- Préserve les notes, étiquettes, dates de report, échéances, états d’achèvement et récurrences OmniFocus pris en charge par le chemin JSON
- Convertit si possible les tâches imbriquées simples en éléments de liste de contrôle et aplatit les hiérarchies plus profondes en préservant le chemin original

Si la fidélité de la récurrence ou de la hiérarchie est importante, préférez le chemin JSON / ZIP d’Omni Automation au CSV. Les dates planifiées et le texte de durée sont conservés dans la description importée lorsque Mindwtr ne dispose pas de champ correspondant directement.

Consultez [Importation depuis OmniFocus](/fr/import/omnifocus) pour obtenir les détails et les correspondances prises en charge.

### Importation depuis Rappels Apple (iOS)

Sur iPhone et iPad, Mindwtr peut importer les rappels Apple non terminés depuis **Réglages → Données → Importer depuis Rappels Apple**.

- Choisissez la liste Rappels Apple à utiliser comme source de capture
- Ajoute les nouveaux rappels non terminés à la **Boîte de réception** de Mindwtr
- Préserve les titres et notes des rappels comme titres et descriptions des tâches
- Ignore les rappels terminés, sans titre et déjà importés
- Peut facultativement supprimer les rappels importés de Rappels Apple après leur ajout à la Boîte de réception de Mindwtr

L’importation depuis Rappels Apple est une procédure d’importation à sens unique, et non un backend de synchronisation.

### Stratégie de sauvegarde

- Exportations régulières vers le dossier de synchronisation
- Sauvegarde du dossier de configuration local
- Le fichier de synchronisation sert de sauvegarde
- Des instantanés de récupération sont enregistrés automatiquement avant les opérations de restauration/importation

---

## Dépannage

### La synchronisation ne fonctionne pas

1. **Vérifiez le chemin du dossier de synchronisation**
   - Assurez-vous que le chemin existe et qu’il est accessible
   - Vérifiez les autorisations

2. **Vérifiez le service de synchronisation**
   - Dropbox/Google Drive est-il en cours d’exécution ?
   - Le fichier est-il synchronisé entre les appareils ?

3. **Erreurs de fichier temporaire**
   - Si un service de synchronisation est en train d’écrire (par exemple Syncthing), le JSON peut être temporairement invalide.
   - Patientez un instant, puis relancez la synchronisation.

4. **Synchronisation manuelle**
   - Cliquez sur Synchroniser maintenant (ordinateur) ou Synchroniser (mobile)
   - Recherchez d’éventuels messages d’erreur

### Conflits de données

Si vous voyez des données inattendues :
1. Exportez une sauvegarde des données actuelles
2. Recherchez le fichier le plus récent dans le dossier de synchronisation
3. Examinez et fusionnez manuellement les données si nécessaire

### Fichier de synchronisation mobile introuvable

1. Assurez-vous que le fichier existe dans votre dossier cloud
2. Sélectionnez de nouveau le fichier dans Réglages → Synchronisation
3. Vérifiez les autorisations du fichier

### Réinitialiser la synchronisation

Pour repartir de zéro :
1. Supprimez le contenu du dossier de synchronisation
2. Effectuez une exportation depuis un appareil
3. Importez/synchronisez sur les autres appareils

---

## Format des données

Structure du fichier `data.json` :

```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "next",
      "contexts": ["@home"],
      "tags": ["#focused"],
      "dueDate": "2025-01-15T09:00:00Z",
      "recurrence": {
        "rule": "weekly",
        "strategy": "strict",
        "byDay": ["MO", "WE"]
      },
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z",
      "deletedAt": null
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "title": "Project name",
      "status": "active",
      "color": "#3B82F6",
      "areaId": "area-uuid",
      "tagIds": ["#client", "#feature"],
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "sections": [
    {
      "id": "uuid",
      "projectId": "project-uuid",
      "title": "Section title",
      "order": 1,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "areas": [
    {
      "id": "uuid",
      "name": "Research",
      "color": "#3B82F6",
      "icon": "🔬",
      "order": 0,
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "people": [
    {
      "id": "uuid",
      "name": "Alex",
      "note": "Design lead",
      "referenceLink": "https://example.com/alex",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-10T15:30:00Z"
    }
  ],
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
```

---

## Confidentialité

- Toutes les données sont stockées localement sur votre appareil
- La synchronisation s’effectue par l’intermédiaire de votre propre service cloud
- Les données des tâches, des projets, les notes, les pièces jointes et le contenu synchronisé ne sont pas envoyés aux serveurs de Mindwtr
- Les versions configurées avec l’analyse des signaux de fonctionnement peuvent envoyer un petit événement sur l’état de l’application ; il ne contient aucune tâche, aucun projet, aucune note, aucun fichier, aucune invite d’IA ni aucun contenu de compte. Consultez la [Politique de confidentialité](https://mindwtr.app/privacy).
- Vous contrôlez entièrement vos données

---

## Voir aussi

- [Guide d’utilisation sur ordinateur](/fr/use/desktop)
- [Guide d’utilisation sur mobile](/fr/use/mobile)
- [Bien démarrer](/fr/start/getting-started)
- [Pièces jointes](/fr/use/attachments)
