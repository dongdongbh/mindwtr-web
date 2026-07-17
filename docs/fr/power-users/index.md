# Intégrations pour utilisateurs avancés

Mindwtr se connecte à vos outils sans renoncer à son modèle local. Cette page classe les intégrations selon votre objectif. Quatre questions permettent d’évaluer la confiance demandée :

- **Quelles données peut-elle lire ?**
- **Que peut-elle modifier ?**
- **Où s’exécute-t-elle ?**
- **Qu’est-ce qui quitte votre appareil ?**

Toutes ces intégrations sont facultatives et restent désactivées jusqu’à leur configuration. Chaque page liée contient les instructions complètes.

## Capturer depuis n’importe où

### Apple Shortcuts

Envoyez des tâches dans la Boîte de réception depuis Siri, l’application Raccourcis, le bouton Action ou une automatisation, puis ouvrez directement une liste GTD.

| Question | Réponse |
| --- | --- |
| Données lisibles | Aucune. L’intégration capture seulement des tâches et ouvre des listes. |
| Modifications possibles | Ajoute des captures à la Boîte de réception. Elle ne peut ni modifier, ni terminer, ni supprimer des tâches. |
| Exécution | Sur votre iPhone ou iPad. |
| Données quittant l’appareil | Aucune. Les captures passent par le stockage et la synchronisation habituels de Mindwtr ; Swift n’écrit jamais directement les tâches. |

[Guide Apple Shortcuts](/fr/power-users/apple-shortcuts)

### Capture par e-mail

Indiquez à l’application pour ordinateur un dossier de courrier : chaque message qui y arrive devient une tâche de Boîte de réception. Sur téléphone, partagez plutôt l’e-mail vers Mindwtr.

| Question | Réponse |
| --- | --- |
| Données lisibles | Uniquement le dossier indiqué. Le reste de votre boîte aux lettres n’est pas touché. |
| Modifications possibles | Crée des tâches dans la Boîte de réception. Ne modifie, déplace ou supprime jamais vos e-mails. |
| Exécution | Sur votre ordinateur, qui communique directement en IMAP avec votre fournisseur, sans relais tiers. |
| Données quittant l’appareil | Aucune vers un tiers. Les automatisations auto-hébergées n’envoient que les champs choisis vers votre propre serveur. |

[Guide de capture par e-mail](/fr/power-users/email-capture)

### Jira et autres outils de suivi

Laissez l’automatisation de Jira envoyer chaque nouveau ticket dans votre Boîte de réception, par e-mail ou directement vers votre serveur auto-hébergé. L’application n’embarque aucun client Jira, et la capture est à sens unique.

| Question | Réponse |
| --- | --- |
| Données lisibles | Aucune. Jira pousse les tickets vers l’extérieur ; Mindwtr ne se connecte jamais à Jira. |
| Modifications possibles | Crée des tâches dans la Boîte de réception. Terminer une tâche ne touche jamais le ticket Jira. |
| Exécution | Dans l’automatisation de Jira elle-même, qui alimente la capture par e-mail ou votre propre serveur. |
| Données quittant l’appareil | Aucune. Vos identifiants Jira restent dans Jira ; Mindwtr ne stocke aucun jeton de l’outil. |

[Guide de capture Jira](/fr/power-users/jira-capture)

## Connecter vos outils personnels

### Obsidian

Lisez les tâches d’un coffre Obsidian, actualisez-les lorsque les fichiers changent et rouvrez la note source dans Obsidian.

| Question | Réponse |
| --- | --- |
| Données lisibles | Les fichiers du coffre dans les dossiers autorisés, sur ordinateur. |
| Modifications possibles | Bascule une case ou le statut TaskNotes pour les formats compatibles. Ne réécrit pas vos notes. |
| Exécution | Uniquement sur ordinateur. Ce n’est pas un système de synchronisation Mindwtr. |
| Données quittant l’appareil | Aucune. Vos notes restent dans votre coffre. |

[Guide Obsidian](/fr/power-users/obsidian)

## Automatiser sur votre machine

### API locale

Une API REST pour les scripts, raccourcis et petits outils qui doivent lire et écrire vos tâches.

| Question | Réponse |
| --- | --- |
| Données lisibles | Toutes les données de tâches, plus un accès en lecture seule aux projets et domaines. |
| Modifications possibles | Créer, mettre à jour, terminer, archiver, supprimer de manière réversible et restaurer des tâches. Projets et domaines restent en lecture seule. |
| Exécution | Dans l’application pour ordinateur, liée à `127.0.0.1`, avec un jeton bearer obligatoire pour chaque requête. |
| Données quittant l’appareil | Aucune. Les requêtes restent sur localhost. |

[Guide de l’API locale](/fr/power-users/local-api)

## Connecter un agent IA

### Serveur MCP

Permettez à un client IA comme Claude, Codex ou Gemini d’accéder à Mindwtr par le Model Context Protocol.

| Question | Réponse |
| --- | --- |
| Données lisibles | Tâches, projets, sections, domaines et personnes. |
| Modifications possibles | Lecture seule par défaut. Avec `--write`, ajout, mise à jour, achèvement et suppression. |
| Exécution | Comme sous-processus local sur votre fichier SQLite, ou contre un serveur Cloud auto-hébergé. |
| Données quittant l’appareil | Seulement ce que reçoit le client IA connecté. En mode Cloud, les modifications passent par l’API validée de votre propre serveur. |

[Guide du serveur MCP](/fr/power-users/mcp)

## IA dans l’application

### Assistant IA

Une aide facultative avec votre propre clé pour clarifier et décomposer les tâches et revoir les éléments anciens.

| Question | Réponse |
| --- | --- |
| Données lisibles | Uniquement les données nécessaires à l’action lancée. |
| Modifications possibles | Seulement celles que vous examinez et approuvez. |
| Exécution | Chez le fournisseur configuré, qui peut être local comme llama.cpp ou Ollama. |
| Données quittant l’appareil | Uniquement les données limitées, envoyées au fournisseur choisi. Aucune si celui-ci est local. |

[Guide de l’assistant IA](/fr/power-users/ai-assistant)

## L’exécuter vous-même

Pour une installation accessible par navigateur ou auto-hébergée :

- [Application web (PWA)](/fr/power-users/web-app-pwa)
- [Déploiement Docker](/fr/power-users/docker-deployment)
- [Cloud auto-hébergé](/fr/data-sync/self-hosted-cloud)
