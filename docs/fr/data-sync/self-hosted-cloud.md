# Mindwtr Cloud auto-hébergé

Mindwtr Cloud est l’option de synchronisation auto-hébergée destinée aux personnes qui préfèrent un serveur propre à Mindwtr à un fournisseur de stockage. Le système cloud auto-hébergé de Mindwtr est un petit serveur de synchronisation situé dans `apps/cloud` ; il fournit un point de terminaison aux clients ordinateur et mobile, pas l’interface de l’application Mindwtr.

## Quand l’utiliser

Utilisez le cloud auto-hébergé si :

- vous souhaitez un point de terminaison de synchronisation dédié à Mindwtr ;
- vous savez déployer et mettre à jour un petit serveur ;
- vous voulez maîtriser le compte d’hébergement, l’emplacement des données et les contrôles d’accès.

Si une synchronisation par fichiers vous suffit, [WebDAV](/fr/data-sync/webdav) peut être plus simple.

## Références principales

- Consultez [Données et synchronisation](/fr/data-sync/) pour choisir un système et configurer le client.
- Consultez [Déploiement du cloud](/fr/data-sync/cloud-deployment) pour la configuration du serveur, son exploitation et les variables d’environnement.
- Consultez [API cloud](/fr/developers/cloud-api) pour le détail des points de terminaison `/v1`.
- Consultez [Déploiement Docker](/fr/power-users/docker-deployment) pour la méthode fondée sur Docker.

## Repères rapides

- Le système cloud auto-hébergé stocke un espace de noms JSON par jeton bearer.
- Les clients pointent vers l’URL de base `/v1` et se synchronisent avec `GET /v1/data` et `PUT /v1/data`.
- `/v1/data` est le contrat de synchronisation principal ; les routes de tâches, projets, domaines, sections, recherche et pièces jointes sont des API facultatives de commodité.
- Les API des pièces jointes se trouvent sous `/v1/attachments/...`.
- Déployez le serveur derrière HTTPS et traitez le jeton bearer comme un mot de passe.
- HTTPS est obligatoire pour les URL publiques. HTTP n’est accepté que pour les cibles locales ou privées comme `localhost`, `127.0.0.1`, `10.x.x.x`, de `172.16.x.x` à `172.31.x.x`, `192.168.x.x`, les adresses IPv6 privées ou de bouclage, `*.local` et `*.home.arpa`.

## Architecture du déploiement

Un déploiement courant comprend :

- le serveur Mindwtr Cloud ;
- une base de données ou un stockage persistant ;
- HTTPS devant le serveur ;
- une URL de serveur configurée dans chaque client Mindwtr ;
- un jeton ou identifiant créé pour votre propre déploiement.

## Liste de contrôle de la configuration

1. Exportez une sauvegarde depuis votre appareil principal.
2. Déployez le serveur en suivant les instructions actuelles du dépôt Mindwtr.
3. Vérifiez que le point de terminaison de santé répond en HTTPS.
4. Configurez Mindwtr avec l’URL et les identifiants de votre serveur.
5. Lancez une synchronisation manuelle et vérifiez que les mêmes données apparaissent sur un second appareil.

::: warning Ne placez jamais les secrets de déploiement dans Git
Stockez les jetons du serveur, URL de base de données et identifiants des fournisseurs dans votre plateforme d’hébergement ou votre gestionnaire de secrets local. Ne les validez jamais dans un dépôt.
:::

::: tip Serveur sur une adresse LAN (home lab, proxy inverse)
Quand l'URL du serveur pointe vers une adresse du réseau local, les appareils Apple demandent l'autorisation Réseau local au premier contact ; acceptez l'invite ou activez Mindwtr plus tard dans Confidentialité et sécurité, puis Réseau local. Si l'app Mac n'affiche jamais l'invite et n'atteint pas le serveur, mettez-la à jour : les versions antérieures à v1.1.5 ne déclaraient pas l'autorisation, et macOS 15 et suivants refusaient donc les adresses locales en silence.
:::
