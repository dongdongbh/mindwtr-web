# Synchronisation WebDAV

La synchronisation WebDAV s’adresse aux personnes qui souhaitent utiliser un point de stockage standard sous leur contrôle, sans exploiter le serveur Mindwtr Cloud.

## Quand l’utiliser

Utilisez WebDAV si :

- vous disposez déjà d’un serveur WebDAV ;
- vous souhaitez une synchronisation multiplateforme ;
- vous préférez une infrastructure sous votre contrôle ;
- vous savez gérer les URL et identifiants du serveur.

## Liste de contrôle de la configuration

1. Exportez une sauvegarde.
2. Créez un dossier réservé à Mindwtr sur votre serveur WebDAV.
3. Saisissez l’URL et les identifiants du serveur dans Mindwtr.
4. Lancez une synchronisation manuelle sur le premier appareil.
5. Connectez un deuxième appareil et vérifiez qu’une tâche de test se synchronise dans les deux sens.

::: tip Dossier dédié
Réservez un dossier aux données de synchronisation de Mindwtr. Ne mélangez pas les fichiers de synchronisation de l’application avec d’autres documents.
:::

## Dépannage

- Vérifiez que l’URL pointe vers un dossier accessible en écriture.
- Vérifiez la validité du certificat du serveur.
- Vérifiez les autorisations de téléversement et d’écrasement.
- Surveillez les limites de débit ou les verrouillages de fichiers imposés par le fournisseur.
- Exportez une sauvegarde avant de supprimer des fichiers sur le serveur.
