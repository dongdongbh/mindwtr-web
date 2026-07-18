# Synchronisation Dropbox

Mindwtr prend directement en charge Dropbox dans les versions compatibles pour ordinateur et mobile.

Cette fonction utilise OAuth avec un accès **App Folder** : Mindwtr ne lit et n’écrit que sous :

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/*`

---

## Disponibilité

- **Versions officielles pour ordinateur :** pris en charge
- **Versions officielles pour mobile :** pris en charge
- **Expo Go :** OAuth Dropbox non pris en charge
- **Versions FOSS :** la synchronisation Dropbox peut être désactivée
- **Version web Docker/PWA :** non prise en charge ; utilisez une version native, la synchronisation auto-hébergée ou WebDAV

Si Dropbox est désactivé dans votre version ou si vous utilisez la PWA servie par Docker, utilisez [Données et synchronisation](/fr/data-sync/) pour la synchronisation de fichiers, [Déploiement du cloud](/fr/data-sync/cloud-deployment) pour l’auto-hébergement, ou WebDAV.

---

## Configuration dans les versions officielles

1. Ouvrez **Paramètres → Synchronisation**.
2. Dans le sélecteur de **Système de synchronisation**, choisissez **Dropbox**. Mindwtr affiche le chemin choisi comme **Synchronisation cloud**.
3. Cliquez ou touchez **Connecter Dropbox** et terminez l’autorisation OAuth dans votre navigateur.
4. De retour dans Mindwtr, utilisez **Tester la connexion**.
5. Lancez **Synchroniser**.

Après la première synchronisation, vérifiez la présence du dossier d’application dans Dropbox :

- `/Apps/Mindwtr/data.json`
- `/Apps/Mindwtr/attachments/`

---

## Configuration d’une version compilée par vos soins

Si vous compilez Mindwtr, fournissez une clé d’application Dropbox au moment de la compilation.

### 1. Créer une application Dropbox

Dans Dropbox App Console :

- type d’application : **Scoped access** ;
- type d’accès : **App folder** ;
- portées : `files.content.read`, `files.content.write`, `files.metadata.read` ;
- activez le client public et le flux PKCE.

### 2. Ajouter les URI de redirection

- Mobile : `mindwtr://redirect`
- Ordinateur : `http://127.0.0.1:53682/oauth/dropbox/callback`

### 3. Injecter la clé lors de la compilation

- Ordinateur : `VITE_DROPBOX_APP_KEY=<your_app_key>`
- Mobile : `DROPBOX_APP_KEY=<your_app_key>`

Dans les versions macOS App Store, le rappel OAuth utilise un écouteur de bouclage sur `127.0.0.1:53682` ; les droits de l’application doivent donc inclure `com.apple.security.network.server`.

Dans les workflows de CI et de publication, définissez les variables ou secrets du dépôt :

- `VITE_DROPBOX_APP_KEY`
- `DROPBOX_APP_KEY`

---

## Dépannage

### `Invalid redirect_uri`

Vérifiez que l’URI affichée dans Mindwtr correspond exactement aux paramètres de l’application Dropbox.

### HTTP 401 ou jeton non valide

Le jeton a expiré, a été révoqué ou appartient à une autre clé d’application. Reconnectez Dropbox.

### Dropbox n’apparaît pas dans les paramètres

Votre version a probablement désactivé Dropbox, comme souvent dans les versions FOSS, ou ne possède pas la clé d’application au moment de la compilation.

### L’application semble connectée mais ne se synchronise pas

Utilisez d’abord **Tester la connexion**. Si le test réussit, lancez **Synchroniser** puis consultez les journaux décrits dans [Diagnostics et journaux](/fr/data-sync/diagnostics-logs).

### « Impossible de joindre le serveur de synchronisation » alors que vous êtes en ligne

Sur mobile, ce message apparaît quand l’appareil signale un réseau fonctionnel mais que les requêtes de Mindwtr vers Dropbox continuent d’échouer. La synchronisation passe par `content.dropboxapi.com`, alors que **Tester la connexion** n’atteint que `api.dropboxapi.com` : le test peut donc réussir alors que la synchronisation échoue. Vérifiez que Mindwtr est autorisé à utiliser les données cellulaires (iOS : Réglages > Données cellulaires) et qu’aucun VPN, filtre DNS ou pare-feu ne bloque le trafic de l’application.

---

## Sécurité et confidentialité

- Mindwtr ne demande que l’accès App Folder, pas l’accès complet au compte Dropbox.
- Les jetons OAuth sont conservés localement sur l’appareil.
- Le développeur de Mindwtr ne relaie pas les requêtes Dropbox et ne reçoit pas votre jeton.

Voir :

- [Données et synchronisation](/fr/data-sync/)
- [Politique de confidentialité](https://mindwtr.app/privacy)
