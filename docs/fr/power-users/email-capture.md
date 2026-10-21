# Capture par e-mail

Transformez les e-mails en tâches de Boîte de réception. Trois méthodes existent : surveillance IMAP intégrée sur ordinateur, partage depuis le téléphone pour tout fournisseur, et API cloud pour les installations auto-hébergées.

Voir aussi : [API cloud](/fr/developers/cloud-api), [Déploiement Docker](/fr/power-users/docker-deployment)

## Surveiller un dossier de courrier depuis l’application pour ordinateur

Indiquez un dossier de votre boîte aux lettres à Mindwtr, puis déplacez-y ou transférez-y des messages depuis n’importe quel client. Chacun devient une tâche de Boîte de réception. Votre courrier ne passe par aucun serveur tiers : l’application communique directement en IMAP avec votre fournisseur.

Configuration dans **Paramètres → Intégrations → Capture par e-mail** :

1. Saisissez le serveur IMAP, par exemple `imap.gmail.com`, le nom d’utilisateur et un **mot de passe d’application**. Les mots de passe ordinaires ne fonctionnent généralement pas ; celui-ci est conservé dans le trousseau du système.
2. Gardez le dossier `Mindwtr` par défaut ou choisissez-en un autre ; il sera créé s’il n’existe pas.
3. Activez l’option et enregistrez. L’enregistrement vérifie immédiatement la connexion et signale tout problème.
4. Dans votre client ou webmail, créez une règle — ou déplacez manuellement les messages — vers ce dossier.

Tant que l’application fonctionne, elle vérifie le dossier toutes les quelques minutes. L’objet devient le titre de la tâche ; l’expéditeur et le corps du message deviennent sa description. La capture est en lecture seule : Mindwtr ne modifie, déplace ni supprime jamais vos e-mails, et mémorise les messages déjà importés pour éviter les doublons. Archivez ou nettoyez le dossier quand vous le souhaitez.

La boîte aux lettres sert de file d’attente : les messages déposés lorsque l’ordinateur est éteint y restent, puis Mindwtr les récupère à son prochain démarrage. Pour capturer même lorsque l’application est arrêtée, utilisez les [automatisations auto-hébergées](#transferer-un-e-mail-vers-un-serveur-auto-heberge).

Remarques par fournisseur :

- **Gmail :** activez la validation en deux étapes, puis créez un [mot de passe d’application](https://myaccount.google.com/apppasswords) ; serveur `imap.gmail.com`.
- **iCloud Mail :** créez un [mot de passe propre à l’application](https://support.apple.com/102654) ; serveur `imap.mail.me.com`.
- **Fastmail et serveurs IMAP standards :** créez un mot de passe d’application et utilisez l’hôte IMAP du fournisseur.
- **Outlook.com et Microsoft 365 :** Microsoft a désactivé l’IMAP par mot de passe ; utilisez plutôt l’[automatisation Power Automate](#outlook-et-microsoft-365-power-automate).

## Prototype Gmail : versions de test pour ordinateur et mobile

La capture Gmail est réservée aux versions de test configurées par le responsable du projet pour des comptes de test désignés. Elle n’est pas activée de manière générale dans les versions publiées. La vérification Google pour la production et l’examen des flux de données issus des e-mails restent ouverts ; suivez [#1326](https://github.com/dongdongbh/Mindwtr/issues/1326).

Sur ordinateur, ouvrez **Paramètres → Intégrations → Gmail**. Dans l’application Android ou iOS, ouvrez **Paramètres → GTD → Valeurs par défaut de capture → Gmail**. Connectez-vous via l’écran d’autorisation Google, vérifiez le compte et choisissez un libellé Gmail existant. Créez-le d’abord dans Gmail si nécessaire. La connexion ou le choix d’un libellé n’importe rien : confirmez avec **Démarrer la capture / enregistrer le libellé**. **Vérifier maintenant** demande une vérification.

Sur ordinateur, les vérifications fonctionnent tant que Mindwtr reste ouvert. Sur mobile, elles ont lieu à l’ouverture ou au retour dans l’application et à intervalles réguliers tant qu’elle reste au premier plan. Elles s’arrêtent en arrière-plan ou après fermeture. Les e-mails portant le libellé attendent la prochaine vérification. Les versions FOSS pour Android n’incluent pas l’autorisation Google pour cette fonction.

Google accorde un accès en lecture seule à **toute la boîte mail** via `gmail.readonly` ; le libellé choisi filtre l’importation. Mindwtr n’envoie, ne modifie, ne déplace et ne supprime aucun e-mail, ne change aucun libellé et n’importe pas les pièces jointes. L’objet devient le titre de la tâche ; l’expéditeur et le texte du message, limité en longueur, deviennent sa description.

Le code natif de la plateforme gère l’autorisation. Sur ordinateur et iOS, les identifiants restent dans le stockage sécurisé du système ; Android utilise le service d’autorisation Google de l’appareil et conserve localement le compte choisi. Les jetons ne passent pas dans JavaScript, les données de tâches, la synchronisation ou les sauvegardes et exports ordinaires. Une base de données locale distincte conserve les reçus d’importation par compte après l’enregistrement des tâches. Ces reçus ne se synchronisent pas.

Le texte importé devient du contenu de tâche ordinaire. Il suit votre configuration et vos consentements existants pour la synchronisation, les sauvegardes, les exports et l’IA facultative. La déconnexion ne supprime pas les copies déjà stockées auprès de ces services. L’examen de ces flux selon les règles Google reste une condition de disponibilité générale.

Reconnecter la même boîte mail ou changer de libellé conserve la prévention des doublons, les tâches modifiées et les traces de suppression retenues. La déconnexion conserve les tâches importées et les reçus d’importation. Si vous réinitialisez le profil de l’appareil et supprimez aussi les tâches et leurs traces de suppression, les anciens e-mails portant le libellé peuvent être réimportés ; retirez d’abord leur libellé. Une adresse de boîte mail renommée compte comme un autre compte dans ce prototype.

La déconnexion arrête les captures suivantes et supprime la connexion locale avant de tenter la révocation auprès de Google. Un enregistrement en cours peut se terminer. Supprimez séparément les tâches indésirables, les copies distantes, les sauvegardes et les exports. Si Google ne peut pas confirmer la révocation, retirez Mindwtr dans les autorisations de votre compte Google. Une reconnexion peut aussi devenir nécessaire sur un autre appareil ; reconnectez-vous et confirmez un libellé pour reprendre.

## Partager un e-mail depuis le téléphone

Cette méthode fonctionne sur Android et iOS avec toute application de courrier capable de partager du texte, notamment Outlook, Gmail et Apple Mail :

1. Ouvrez l’e-mail.
2. Touchez **Partager** et choisissez **Mindwtr**.
3. L’écran de capture s’ouvre avec le contenu partagé ; enregistrez-le dans la Boîte de réception.

C’est la méthode la plus rapide si vous traitez vos e-mails sur téléphone. Consultez [Application mobile](/fr/use/mobile#feuille-de-partage) pour plus de détails.

## Transférer un e-mail vers un serveur auto-hébergé

Si vous exploitez le [serveur cloud auto-hébergé](/fr/power-users/docker-deployment), toute automatisation capable d’envoyer une requête HTTP peut créer des tâches avec [`POST /v1/tasks`](/fr/developers/cloud-api). Le point de terminaison accepte un `title` simple ou un `input` d’ajout rapide avec la même syntaxe que l’application.

```bash
curl -X POST https://your-server.example/v1/tasks \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Reply to Dana about the contract", "props": {"description": "From: dana@example.com"}}'
```

Ces méthodes transportent uniquement du texte : l’objet devient `title`, l’expéditeur ou un extrait va dans `props.description`. Pour capturer une pièce jointe comme un PDF, utilisez plutôt le partage du téléphone.

Dirigez l’automatisation vers votre serveur cloud, pas vers une machine personnelle. Le serveur est la source de synchronisation permanente : la capture fonctionne même lorsque votre ordinateur et votre téléphone sont éteints, puis les appareils récupèrent la tâche à leur prochaine synchronisation.

### Outlook et Microsoft 365 : Power Automate

Power Automate est la meilleure solution pour les comptes Microsoft, puisque l’IMAP par mot de passe n’est plus autorisé :

1. Créez un flux déclenché par **When a new email arrives**, filtré sur un indicateur, une catégorie ou un dossier dédié.
2. Ajoutez une action **HTTP** : méthode `POST`, URL `/v1/tasks` de votre serveur, en-tête `Authorization: Bearer <token>` et corps JSON qui associe l’objet à `title` et l’expéditeur ou un extrait à `props.description`.
3. Marquez un e-mail ou déposez-le dans le dossier ; il apparaîtra dans la Boîte de réception Mindwtr à la prochaine synchronisation.

Le flux s’exécute dans le cloud Microsoft et fonctionne donc ordinateur éteint. Seuls les champs associés quittent votre boîte aux lettres.

### Une adresse de capture dédiée : Cloudflare Email Workers

Si votre domaine utilise [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/), créez une adresse comme `todo@your-domain.example` et dirigez-la vers un Email Worker qui publie directement sur votre serveur :

```js
export default {
  async email(message, env) {
    const response = await fetch("https://your-server.example/v1/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.MINDWTR_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: message.headers.get("subject") || "Captured email",
        props: { description: `From: ${message.from}` },
      }),
    });
    if (!response.ok) {
      throw new Error(`Mindwtr returned ${response.status}`);
    }
  },
};
```

Stockez le jeton comme secret Worker avec `wrangler secret put MINDWTR_TOKEN`, jamais dans le script. Lever une erreur en cas d’échec rend la livraison visiblement défaillante et permet au serveur expéditeur de réessayer, au lieu de perdre le message. Pour inclure le corps dans la description, analysez le MIME brut avec une bibliothèque comme [postal-mime](https://github.com/postalsys/postal-mime) ; la version limitée à l’objet n’en a pas besoin.

Tout message transféré à cette adresse devient une tâche de Boîte de réception. Gardez l’adresse privée ou ajoutez une liste d’expéditeurs autorisés : toute personne qui la découvre peut créer des tâches.

### Gmail et les autres services : n8n, Zapier, scripts et règles

Le même modèle fonctionne avec tout outil capable de lire la boîte aux lettres ou de recevoir du courrier, puis d’envoyer une requête HTTP :

- **n8n / Node-RED :** un déclencheur IMAP ou Gmail vers un nœud de requête HTTP ;
- **Zapier :** une adresse entrante *Email by Zapier* ou un déclencheur Gmail vers une étape POST *Webhooks by Zapier* ;
- **script sur une machine permanente :** surveille un dossier et publie chaque nouveau message ;
- **Sieve/procmail sur votre serveur de courrier :** transmet les messages correspondants à un petit script.

Gardez le jeton secret : toute personne qui le possède peut lire et écrire les tâches de cet espace de noms.

## Pourquoi il n’existe pas d’adresse de transfert Mindwtr

Mindwtr ne propose volontairement aucune adresse hébergée : un relais ferait transiter vos e-mails privés par l’infrastructure du projet, ce qui contredirait une application locale. La surveillance intégrée conserve le courrier entre votre serveur et votre appareil.
