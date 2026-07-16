# FAQ

Questions fréquemment posées sur Mindwtr.

---

## Généralités

### Qu’est-ce que Mindwtr ?

Mindwtr est une application de productivité multiplateforme fondée sur la méthode Getting Things Done (GTD), qui vous aide à capturer, clarifier, organiser et réaliser vos tâches. Elle est disponible sur ordinateur (Windows, macOS, Linux) et sur mobile (Android, iOS).

### Mindwtr est-il gratuit ? Le restera-t-il ?

Oui. Mindwtr est open source (AGPL-3.0) et son utilisation est gratuite. Il n’existe aucun contenu payant, aucun abonnement ni aucune formule premium pour la synchronisation ou quoi que ce soit d’autre. Il est prévu qu’il en reste ainsi : un bon logiciel doit être accessible à tout le monde, quelle que soit sa situation financière, et son financement doit venir des personnes qui choisissent de le soutenir, pas d’un contenu payant.

Le projet entraîne de réels coûts récurrents : les frais annuels du programme Apple Developer, l’hébergement, les outils de développement et le temps consacré aux fonctionnalités, aux correctifs et à l’assistance de la communauté. Les [dons](https://mindwtr.app/donate) permettent d’en assurer la pérennité.

Une précision en toute transparence : aujourd’hui, les dons ne couvrent pas les coûts et le mainteneur prend la différence à sa charge. Si cet écart devenait un jour trop important pour être supportable, un service payant facultatif (par exemple, un serveur de synchronisation hébergé pour les personnes qui ne souhaitent pas l’auto-héberger) pourrait être ajouté pour le combler. Dans tous les cas, l’application elle-même restera gratuite et open source. Aucune fonctionnalité disponible aujourd’hui ne deviendra payante.

### Pendant combien de temps Mindwtr sera-t-il maintenu ?

Mindwtr est un projet passion, mais c’est aussi l’outil que le mainteneur utilise pour gérer sa propre vie ; il est donc maintenu parce que son mainteneur a besoin qu’il le soit. L’historique des commits montre honnêtement ce que cela donne en pratique.

Aucun projet individuel ne peut promettre d’exister « pour toujours ». Mindwtr est donc conçu pour que même le pire scénario reste sans danger : il est local-first, vos données sont conservées dans des formats ouverts au sein de fichiers que vous contrôlez, et le code est sous licence AGPL avec des builds reproductibles distribués par des canaux indépendants. Même si le développement s’arrêtait, l’application continuerait de fonctionner hors ligne, vos données resteraient lisibles et n’importe qui pourrait créer un fork du code. Vous pouvez lui confier votre organisation ou le quitter à tout moment, sans jamais perdre vos données.

### Mindwtr est-il généré par l’IA ? Quelle est la position du projet sur l’IA ?

Mindwtr est développé avec l’aide de l’IA, mais n’est pas généré par l’IA. Cette distinction est importante.

L’architecture, l’orientation du produit, la conception des fonctionnalités et la philosophie GTD de Mindwtr sont conçues et assumées par le mainteneur. Les outils d’IA facilitent l’exécution : ils permettent de rédiger des implémentations plus rapidement, de réduire le code répétitif, d’améliorer la formulation et d’accélérer l’analyse des bugs. Chaque modification publiée reste spécifiée, révisée et testée, et le mainteneur assume la responsabilité du résultat.

Le développement assisté par l’IA est aujourd’hui une pratique normale du génie logiciel, y compris dans les grandes entreprises technologiques et dans l’ensemble du monde open source. L’IA est un outil, au même titre que les IDE, l’autocomplétion, la documentation et Stack Overflow. Son utilisation ne supprime pas le travail du développeur ; elle le déplace davantage vers l’orientation, le discernement, la révision, l’intégration et la validation.

Mindwtr est maintenu par un développeur indépendant qui possède plus de 10 ans d’expérience en génie logiciel. C’est cette expérience qui rend l’IA utile plutôt que dangereuse : savoir quoi construire, quoi ne pas construire, reconnaître un résultat erroné et maintenir la cohérence du système. L’IA aide une seule personne à assurer la maintenance d’un projet aussi vaste, mais elle ne prend pas les décisions de conception et n’assume pas la responsabilité du résultat.

Les réponses aux issues et aux discussions sont rédigées par le mainteneur. L’IA peut servir à améliorer la formulation en anglais, mais aucun agent ne trie ni ne traite automatiquement les issues.

Pour contribuer, consultez la [section sur le code assisté par un LLM dans CONTRIBUTING.md](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md#llm-assisted-coding-vibe-coding).

### Pourquoi y a-t-il autant de commits et de signalements d’issues ?

Mindwtr est une application multiplateforme destinée aux utilisateurs finaux, pas une petite interface en ligne de commande ni une bibliothèque dotée d’une unique surface de commande restreinte. Elle comprend des clients pour ordinateur et mobile, un stockage local-first, des systèmes de synchronisation, des fonctions d’importation, des notifications, la capture rapide, des widgets, des traductions, des canaux d’installation et des choix de flux de travail GTD. Ce type de produit entraîne de nombreux petits commits de suivi, car l’amélioration de l’interface, les différences entre plateformes, les correctifs de paquets et les signalements de cas limites font partie de la maintenance normale.

Le nombre d’issues publiques est également élevé par choix. Les issues GitHub comprennent des demandes de fonctionnalités, des améliorations de l’expérience utilisateur, des cas limites propres à certaines plateformes, des signalements concernant les paquets de publication, des lacunes dans la documentation et des bugs confirmés. De nombreux signalements ne bloquent pas le flux principal de capture, d’organisation et de révision, mais ils sont tout de même suivis publiquement afin que les utilisateurs puissent voir ce qui est connu et ce qui a changé. Les correctifs rapides de suivi font partie du modèle de maintenance ; ils ne signifient pas que les problèmes sont ignorés ou dissimulés.

### Existe-t-il une feuille de route ou une page des fonctionnalités à venir ?

Nous ne tenons pas de page présentant une feuille de route fixe. La feuille de route vivante est la liste des issues GitHub :
https://github.com/dongdongbh/Mindwtr/issues

Si vous souhaitez proposer une fonctionnalité, veuillez ouvrir une issue et décrire le flux de travail que vous cherchez à prendre en charge.

### Où dois-je signaler des bugs ou demander des fonctionnalités ?

Le meilleur endroit est une **issue GitHub**. Elle regroupe les journaux, les informations sur l’appareil et les échanges de suivi dans un espace consultable, facile à retrouver et à suivre, afin que rien ne se perde :
https://github.com/dongdongbh/Mindwtr/issues

Autres moyens de nous contacter :

- **Commentaires dans l’application** : utilisez **Envoyer des commentaires** depuis **Paramètres → À propos** lorsque cette option est disponible dans votre version. Vous pouvez envoyer un rapport de bug, une demande de fonctionnalité ou une autre remarque sans compte GitHub, et l’adresse e-mail de réponse est facultative. Pour les rapports de bugs, **Inclure les diagnostics récents** joint un instantané limité des vues et actions récentes dans l’application, ainsi que les éventuels journaux de diagnostic récents disponibles ; cette fonction marche même lorsque la journalisation détaillée est désactivée, et l’instantané ajouté n’est pas enregistré sur l’appareil. Consultez la [politique de confidentialité](https://mindwtr.app/privacy) pour plus de détails.
- **E-mail** : pour toute question qui n’a pas sa place dans une issue publique (une question privée ou concernant un compte), écrivez à [support@mindwtr.app](mailto:support@mindwtr.app).

Si vous signalez un bug, veuillez indiquer votre **plateforme** et la **version de l’application** (Paramètres → À propos) afin de faciliter le diagnostic.

Si Mindwtr vous est utile, les différentes manières de soutenir le projet sont présentées sur la [page Soutenir](https://mindwtr.app/support).

### Puis-je ouvrir plusieurs fenêtres ?

Pas pour le moment. L’application de bureau ne comporte qu’une fenêtre afin de préserver la sûreté et la cohérence du modèle de données SQLite local-first. La prise en charge de plusieurs fenêtres est souvent demandée, mais n’est pas encore disponible.

### Existe-t-il une page de dons ?

Oui. Consultez la [page de dons](https://mindwtr.app/donate) pour découvrir toutes les manières de soutenir le projet.

### Quelles langues sont prises en charge ?

Mindwtr propose actuellement les langues suivantes, classées approximativement selon leur nombre total de locuteurs dans le monde :

- English
- 中文（简体）
- 中文（繁體）
- हिन्दी
- Español
- العربية
- Français
- Português
- Русский
- Deutsch
- 日本語
- Tiếng Việt
- Türkçe
- 한국어
- Italiano
- Polski
- Nederlands
- Čeština

### Où mes données sont-elles stockées ?

Toutes les données sont stockées localement sur votre appareil :
- **Données de bureau (Linux) :** `~/.local/share/mindwtr/data.json`
- **Configuration de bureau (Linux) :** `~/.config/mindwtr/config.toml`
- **Windows/macOS :** `%APPDATA%/mindwtr/` ou `~/Library/Application Support/mindwtr/`
- **Mobile :** stockage interne de l’application

Consultez [Données et synchronisation](/fr/data-sync/) pour plus de détails.

### Existe-t-il une synchronisation dans le cloud ?

Mindwtr prend en charge la synchronisation de fichiers, WebDAV, la synchronisation cloud auto-hébergée et la synchronisation Dropbox (dans les versions compatibles). Consultez [Données et synchronisation](/fr/data-sync/).

### Quelle méthode de synchronisation est la plus rapide : dossier local ou WebDAV ?

À matériel et distance réseau comparables, **la synchronisation par dossier local est généralement plus rapide** que WebDAV. La synchronisation par dossier lit et écrit l’instantané à l’aide de simples appels au système de fichiers, tandis que WebDAV ajoute à chaque requête des allers-retours HTTP, une authentification et un traitement côté serveur. L’écart est particulièrement visible avec les pièces jointes volumineuses, qui sont transférées individuellement par téléversement et téléchargement avec WebDAV. Cela dit, le goulot d’étranglement est généralement le fournisseur de stockage qui gère le dossier en arrière-plan (par exemple, un client Syncthing ou de stockage cloud), et non Mindwtr lui-même. Choisissez le système qui convient à votre configuration ; consultez [Cycle de vie des données](/fr/data-sync/data-lifecycle) pour savoir ce qui est réellement transféré pendant une synchronisation.

### Mindwtr prend-il directement en charge la synchronisation iCloud ?

Oui, dans les versions Apple compatibles.

- **iPhone / iPad :** le système natif **iCloud** est disponible dans **Paramètres → Synchronisation**
- **Ordinateur macOS :** le système natif **iCloud** est disponible dans **Paramètres → Synchronisation**
- **Android / Windows / Linux :** aucun système iCloud natif

Consultez [Synchronisation iCloud](/fr/data-sync/icloud) et [Données et synchronisation](/fr/data-sync/).

### Comment synchroniser avec OneDrive (en particulier sous Android) ?

Mindwtr fonctionne déjà avec OneDrive **grâce à la synchronisation de fichiers** :

- **Windows/macOS :** placez votre fichier `data.json` de Mindwtr dans votre dossier OneDrive. OneDrive gère automatiquement la synchronisation.
- **Android :** l’application OneDrive officielle ne fournit **pas** de véritable synchronisation bidirectionnelle des dossiers.
  Utilisez une application « passerelle » telle que **OneSync (Autosync for OneDrive)** ou **FolderSync** pour synchroniser un dossier local.
  Indiquez ensuite ce dossier local à Mindwtr dans **Paramètres → Synchronisation** (Mindwtr utilise le fichier `data.json` qu’il contient).

C’est la même approche qu’utilisent les applications local-first comme Obsidian.

### Pourquoi Mindwtr ne propose-t-il pas de bouton « Se connecter avec OneDrive / Google Drive » ?

Mindwtr est local-first et offline-first.

Mindwtr prend désormais en charge la synchronisation native **Dropbox OAuth** dans les versions compatibles, mais ne propose **aucune** intégration OAuth native avec OneDrive ou Google Drive.
La prise en charge de chaque fournisseur entraînerait d’importantes contraintes supplémentaires en matière de maintenance et de conformité.

Pour OneDrive et Google Drive, la synchronisation de fichiers vous laisse le contrôle de vos données et évite une lourde charge de maintenance et de sécurité.

### Mindwtr peut-il s’intégrer à la messagerie électronique (Gmail/Outlook) ou accepter les e-mails transférés ?

Pas directement. La création d’un client de messagerie complet nécessite :

- un accès OAuth à Gmail/Outlook (qui exige désormais des audits de sécurité coûteux)
- une analyse robuste des formats MIME/HTML et une gestion fiable des pièces jointes
- une maintenance continue pour tous les fournisseurs

**Solutions actuelles :**
- **Ordinateur :** collez des liens `message://` ou des liens vers des e-mails dans une tâche, ou faites glisser un e-mail dans la note d’une tâche depuis les clients qui le permettent.
- **Mobile :** utilisez la feuille de partage pour envoyer le contenu sélectionné d’un e-mail vers Mindwtr.

Mindwtr ne propose **aucune** boîte de réception `add@mindwtr.com`, car cela nécessiterait un serveur central chargé de recevoir et de stocker vos e-mails.

---

## Fonctionnalités

### Qu’est-ce que la méthode GTD ?

Getting Things Done (GTD) est une méthode de productivité créée par David Allen. Elle comporte cinq étapes : capturer, clarifier, organiser, réfléchir et agir. Consultez la [Présentation de GTD](/fr/use/gtd-overview).

### Comment les horizons GTD correspondent-ils à Mindwtr ?

Mindwtr modélise nativement les horizons inférieurs :

- **Horizon 0 (Actions) :** prochaines actions et listes de tâches.
- **Horizon 1 (Projets) :** entités de projet explicites.
- **Horizon 2 (Domaines) :** les domaines regroupent les projets liés.

Il n’existe pas encore d’entité dédiée aux horizons 3 à 5 (objectifs, vision, raison d’être). La plupart des utilisateurs les suivent à l’aide de :

- une liste de **Références** (ou un domaine « Objectifs »)
- notes de projet et liens vers ces éléments de référence
- la liste de contrôle de la revue hebdomadaire

Si vous avez besoin d’objets explicites pour les objectifs et la vision, veuillez ouvrir une issue en décrivant le flux de travail et la fréquence de révision souhaités.

### À quoi sert une section de projet ?

Une **section de projet** est un groupe nommé au sein d’un même projet. Utilisez des sections pour garder un long projet lisible, par exemple **Conception**, **Développement** et **Contenu** au sein d’un projet **Lancement du site web**.

Les sections ne sont ni des sous-tâches ni des projets distincts. Ce sont simplement des en-têtes pour les tâches appartenant au même résultat de projet.

Le champ **Section de projet** d’une tâche associe cette tâche à l’une des sections de son projet actuel. Il n’a d’effet que si la tâche appartient déjà à un projet qui comporte des sections. Si la tâche n’appartient à aucun projet ou si le projet ne comporte aucune section, laissez ce champ vide.

### Pourquoi un projet peut-il comporter plusieurs tâches « Suivante » ?

Dans Mindwtr, **Suivante** est un état de tâche : la tâche a été clarifiée et peut être réalisée. Cela ne correspond pas toujours à « l’unique prochaine action » d’un projet.

Le type de projet détermine les éléments proposés :

- **Séquentiel :** une seule tâche Suivante disponible est proposée à la fois. Les tâches Suivantes ultérieures restent dans le projet et attendent leur tour.
- **Parallèle :** plusieurs tâches Suivantes indépendantes peuvent être proposées, car elles peuvent être réalisées dans n’importe quel ordre.

Les étapes ultérieures d’un projet séquentiel ne sont pas des **Références**. Le statut Référence est réservé aux documents d’appui, aux notes et aux autres éléments qui ne nécessitent aucune action.

### Comment marquer un projet comme terminé ?

**Archivez-le** : dans Mindwtr, l’archivage permet de terminer un projet. Ouvrez le projet et utilisez le bouton **Archiver** (dans l’en-tête du projet sur ordinateur, sous **Actions** dans les détails du projet sur mobile). Toutes les tâches inachevées sont terminées avec lui, et **Réactiver** restaure l’ensemble si vous l’avez archivé trop tôt. Lorsque vous terminez la dernière action d’un projet, l’invite « Quelle est la prochaine action ? » propose également directement de **Terminer le projet** ; vous aurez donc rarement besoin de chercher le bouton. Sinon, un projet dont toutes les tâches sont terminées reste actif jusqu’à ce que vous clôturiez vous-même le résultat, ce qui constitue un rappel utile pendant la revue hebdomadaire.

### Puis-je transformer une tâche en projet ?

Oui. Le plus simple est de le faire pendant le traitement de la boîte de réception : lorsque le flux guidé demande si un élément nécessite plusieurs étapes, répondez oui. La capture devient alors un projet, que vous nommez et pour lequel vous définissez la première action suivante. Toutes les actions supplémentaires que vous ajoutez reviennent dans la boîte de réception avec le projet déjà associé, afin que chacune suive son propre processus de clarification. Consultez [Flux de travail GTD](/fr/use/gtd-workflow).

### Pourquoi une tâche n’apparaît-elle pas dans Focus ?

Focus n’affiche volontairement que ce sur quoi vous pouvez agir immédiatement. Une tâche peut donc être masquée pour plusieurs raisons :

- Elle a une **date de début future** et réapparaîtra lorsque cette date arrivera.
- C’est une **tâche ultérieure d’un projet séquentiel** ; seule la première tâche disponible est donc proposée.
- Un **filtre de contexte** actif l’exclut.
- Son statut ne permet pas d’agir (Boîte de réception, Un jour, En attente).

Utilisez **Projets**, **Contextes** ou **Recherche** pour consulter l’ensemble des tâches. Consultez [Comment Focus trie les actions disponibles](/fr/use/gtd-workflow#comment-focus-trie-les-actions-disponibles).

### Mindwtr prend-il en charge les dates de début ou les rappels différés ?

Oui, les deux :

- Une **date de début** diffère une tâche : une date future la masque dans Focus et les actions suivantes, puis elle réapparaît avec son statut existant à la date prévue. Focus masque les tâches différées jusqu’à leur date de début ; dans la liste des actions suivantes, elles sont comptabilisées dans l’avis « masquées (début futur) », qui comporte un bouton **Afficher**.
- Une **date de révision** est un rappel différé : lorsqu’elle arrive, Mindwtr vous présente la tâche afin que vous la réexaminiez. Rien ne change tant que vous n’avez pas pris de décision.
- Le **délai avant le début** lie le début à la date d’échéance (par exemple, rendre la tâche visible deux jours avant l’échéance).

Consultez [Dates et statut](/fr/use/gtd-workflow#dates-et-statut).

### Comment activer la priorité ou le temps estimé ?

Mindwtr utilise la divulgation progressive ; les champs facultatifs sont donc masqués par défaut.

Contrôlez les champs de modification des tâches dans :

**Paramètres -> GTD -> Disposition de l’éditeur de tâches**

Activez-y **Priorité** et **Temps estimé** (et réorganisez les champs si nécessaire). Les champs masqués apparaissent toujours sous **Plus** ou lorsqu’une tâche contient déjà une valeur dans ce champ.


### Quelle est la différence entre les tâches terminées et archivées ?

Utilisez **Terminée** pour les tâches que vous avez achevées récemment. Les tâches terminées conservent leur date d’achèvement, restent visibles dans la vue Terminées et sont utiles pendant la revue quotidienne ou hebdomadaire lorsque vous souhaitez voir ce qui a été accompli.

Utilisez **Archivée** pour les tâches terminées que vous souhaitez classer. Les tâches archivées sont masquées dans les listes de tâches normales et restent disponibles dans la vue Archivées pour être recherchées, restaurées ou supprimées définitivement. L’archivage ne supprime pas la tâche.

En pratique, considérez Terminées comme un journal d’achèvement à court terme et Archivées comme un historique à long terme. Le paramètre **Archivage automatique** peut déplacer automatiquement les tâches terminées vers les archives après un nombre de jours défini, ou vous pouvez le régler sur **Jamais** si vous préférez conserver toutes les tâches achevées dans Terminées.


### Comment fonctionnent les tâches récurrentes ?

Mindwtr prend en charge deux stratégies de récurrence :

- **Stricte** (calendrier fixe) : la prochaine date est calculée à partir du modèle de calendrier lui-même.
  Exemple : une récurrence tous les 5 jours conserve ce rythme même si vous terminez la tâche en retard.
- **Répéter après l’achèvement** (souple) : la prochaine date est calculée à partir du moment où vous terminez réellement la tâche.
  Exemple : si vous la terminez aujourd’hui, la prochaine échéance sera dans 5 jours à partir d’aujourd’hui.

Définissez la récurrence dans l’éditeur de tâches (quotidienne, hebdomadaire, mensuelle ou annuelle), puis activez **Répéter après l’achèvement** si vous souhaitez un comportement souple.

Mindwtr ne conserve qu’une instance active d’une tâche récurrente. Il ne remplit pas à l’avance le calendrier avec les futures occurrences de la série ; l’instance suivante de la tâche n’est créée qu’une fois l’instance actuelle terminée.

### Puis-je voir mes tâches Mindwtr dans Google Calendar ou Apple Calendar ?

Oui, l’envoi unidirectionnel est pris en charge :

- **Android/iOS :** envoyez les tâches datées vers le calendrier d’un appareil. Android est vérifié avec Google Calendar ; sous iOS, utilisez les calendriers déjà accessibles à Apple Calendar. Un calendrier dédié nommé `Mindwtr` dans ce compte fonctionne mieux.
- **Ordinateur macOS :** envoyez-les vers Apple Calendar au moyen d’EventKit.

Les *règles* des tâches récurrentes ne sont pas exportées sous forme d’événements récurrents natifs du calendrier. Seules les instances concrètes sont envoyées. Consultez [Intégration au calendrier](/fr/use/calendar-integration).

### Mindwtr s’intègre-t-il à Obsidian ?

Oui, sur ordinateur : importez un coffre et Mindwtr conserve des liens profonds vers les notes d’origine, afin qu’une tâche puisse ouvrir directement sa note source dans Obsidian. Consultez [Obsidian](/fr/power-users/obsidian).

### Comment recueillir les journaux pour un rapport de bug ?

La journalisation est désactivée par défaut. Activez-la uniquement lorsque vous souhaitez signaler un bug.

**Ordinateur (Tauri) :**
1. Accédez à **Paramètres → Données**.
2. Activez la **Journalisation de débogage**.
3. Reproduisez le problème.
4. Copiez le chemin du **Fichier journal** et joignez ce fichier à votre issue GitHub.

Emplacement par défaut du journal sous Linux : `~/.local/share/mindwtr/logs/mindwtr.log`

**Mobile :**
1. Accédez à **Paramètres → Données**.
2. Activez la **Journalisation de débogage**.
3. Reproduisez le problème.
4. Touchez **Partager le journal** et joignez-le à votre issue GitHub.

Les journaux restent exclusivement en local et les identifiants courants (mots de passe ou jetons) y sont masqués avant l’écriture.

### Puis-je utiliser le langage naturel pour ajouter des tâches ?

Oui ! Mindwtr prend en charge la syntaxe d’ajout rapide :
- `@context` : ajouter un contexte
- `#tag` : ajouter une étiquette
- `!Area` ou `/area:<name>` : associer à un domaine
- `%Person` : définir la personne responsable (`%"Full Name"` pour les nouveaux noms composés de plusieurs mots)
- `/due:date` : définir la date d’échéance (today, tomorrow, friday, next week, etc.)
- `/energy:low`, `/energy:medium` ou `/energy:high` : définir le niveau d’énergie
- `/note:text` : ajouter une description
- `/status` : définir le statut (`/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox`)
- `+ProjectName` : associer à un projet

Exemple : `Call client /due:friday @phone`

### Que sont les contextes ?

Les contextes sont des étiquettes qui indiquent où ou avec quoi vous pouvez accomplir une tâche. Exemples : `@home`, `@work`, `@phone`, `@computer`. Filtrez par contexte pour n’afficher que les tâches que vous pouvez réaliser immédiatement. Consultez [Contextes et étiquettes](/fr/use/contexts-tags).

### Quelle est la différence entre un contexte et un domaine ?

Ils répondent à des questions différentes :

- Un **domaine** répond à la question : *« À quelle partie de ma vie ou de mon travail cette responsabilité est-elle liée ? »* (travail, maison, santé, un client…)
- Un **contexte** répond à la question : *« Que puis-je faire maintenant, compte tenu de l’endroit où je me trouve et de ce dont je dispose ? »* (`@computer`, `@errands`…)

Une tâche peut comporter les trois : **Domaine : Client A**, **Projet : Refonte du site web**, **Contexte : @computer**. Consultez la [Présentation de GTD](/fr/use/gtd-overview).

### Comment capturer rapidement des tâches ?

**Ordinateur :**
- Utilisez le raccourci clavier global pour ouvrir l’ajout rapide depuis n’importe où
- Sous Flatpak/Wayland, associez `flatpak run tech.dongdongbh.mindwtr --quick-add` à un raccourci système personnalisé si le raccourci intégré n’est pas disponible
- Cliquez sur l’icône de la zone de notification pour effectuer une capture instantanée
- Saisissez du texte dans le champ de saisie de n’importe quelle vue

**Mobile :**
- Utilisez la feuille de partage pour effectuer une capture depuis n’importe quelle application
- Ajoutez le widget à l’écran d’accueil pour effectuer une capture d’un seul geste
- Utilisez le champ de saisie de l’onglet Boîte de réception

---

## Ordinateur

### Quels sont les raccourcis clavier ?

Mindwtr propose des ensembles de raccourcis Vim et Emacs. Appuyez sur `?` (Vim) ou `Ctrl-h` (Emacs) pour afficher tous les raccourcis. Consultez [Raccourcis clavier sur ordinateur](/fr/use/keyboard-shortcuts).

### Comment changer le thème ?

Accédez à Paramètres → Apparence. Choisissez Clair, Sombre ou Système.

### Comment synchroniser avec mon téléphone ?

1. Configurez un dossier de synchronisation dans Paramètres (sélectionnez un dossier Dropbox, Syncthing, etc.)
2. Sur mobile, sélectionnez le dossier de synchronisation dans Paramètres → Synchronisation
3. Les deux plateformes se synchronisent automatiquement lorsque les données changent et lorsque vous passez d’une application à une autre

Consultez [Données et synchronisation](/fr/data-sync/).

### Mindwtr prend-il en charge les notifications ?

Oui ! Mindwtr envoie des notifications de bureau pour :
- les rappels de date d’échéance
- les alertes d’heure de début
- les rappels de tâches récurrentes

Vous pouvez reporter les notifications à plus tard.

**macOS** vous demandera votre autorisation lors de la première activation des notifications. Sous **Linux**, vérifiez qu’un démon de notification est en cours d’exécution.

## Mobile

### Quelles plateformes sont prises en charge ?

- **Android :** prise en charge complète via Google Play ou le téléchargement de l’APK
- **iOS :** disponible sur l’App Store et via la bêta TestFlight. Le maintien de la version App Store nécessite toujours des frais annuels Apple Developer ; le parrainage contribue donc à maintenir la disponibilité d’iOS.

### Pourquoi la modification fonctionne-t-elle différemment sur ordinateur et sur mobile ?

Mindwtr respecte les conventions de chaque plateforme :
- **Ordinateur :** un simple clic affiche ou masque les détails, un double-clic ouvre le mode d’édition complet (renommez un titre directement depuis le menu `⋯` de la tâche) et un clic droit ouvre les menus contextuels.
- **Mobile :** un simple toucher ouvre le mode d’édition, tandis que les gestes de balayage permettent d’effectuer des modifications rapides.

Ces comportements permettent à l’application de rester rapide et familière sur chaque plateforme.

### Comment installer Mindwtr sous Android ?

Installez-le depuis Google Play ou téléchargez l’APK depuis les [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases). Activez « Installer des applications de sources inconnues » si vous y êtes invité. Consultez [Installation sur mobile](/fr/start/mobile-installation).

### Comment capturer du contenu depuis d’autres applications ?

Utilisez la **feuille de partage** ! Lorsque vous consultez du contenu dans une application (navigateur, e-mail, notes), touchez Partager et sélectionnez Mindwtr. Mindwtr ouvre l’écran de capture avec le contenu partagé dans la note, afin que vous puissiez ajouter un titre, modifier les champs et enregistrer l’élément dans votre boîte de réception.

### Existe-t-il un widget ?

Oui ! Ajoutez le widget Mindwtr à votre écran d’accueil pour accéder rapidement à la capture et aux éléments de Focus.

### L’assistant IA est-il obligatoire ?

Non. L’assistant IA est facultatif et désactivé par défaut. Mindwtr fonctionne entièrement sans lui.
Lorsqu’il est activé, il utilise votre propre clé API (BYOK). Consultez [Assistant IA](/fr/power-users/ai-assistant).

### Comment fonctionnent les gestes de balayage ?

Dans la boîte de réception, balayez une tâche vers la droite pour la marquer comme terminée. Les autres vues peuvent proposer des gestes de balayage différents.

### Comment synchroniser avec l’ordinateur ?

1. Exportez une sauvegarde vers votre dossier de synchronisation (Google Drive, Syncthing, etc.)
2. Sélectionnez ce dossier dans Paramètres → Synchronisation
3. L’application se synchronise automatiquement lorsque les données changent et lorsqu’elle passe en arrière-plan

Consultez [Données et synchronisation](/fr/data-sync/).

### L’application mobile envoie-t-elle des notifications ?

Oui ! Mindwtr envoie des notifications push pour :
- les rappels de date d’échéance
- les alertes d’heure de début
- les invites de résumé quotidien
- les rappels de revue hebdomadaire

Vous pouvez reporter les notifications directement depuis la notification.
Toucher le corps de la notification ouvre l’écran **Révision**.

---

## Synchronisation et données

### Vais-je perdre des données si j’utilise la synchronisation ?

Non. Mindwtr utilise une fusion de type Last-Write-Wins, qui conserve la version la plus récente de chaque élément. Les éléments supprimés de manière réversible se synchronisent correctement entre les appareils.

### Puis-je utiliser plusieurs services de synchronisation ?

Nous recommandons d’utiliser un seul dossier de synchronisation afin d’éviter les conflits. Choisissez un service (Dropbox, Google Drive, Syncthing) et utilisez-le systématiquement.

### Comment sauvegarder mes données ?

**Ordinateur :** utilisez **Paramètres → Données → Exporter une sauvegarde**, ou sauvegardez le fichier `data.json` depuis le dossier de données de l’application.
**Mobile :** utilisez **Paramètres → Données → Exporter une sauvegarde** pour enregistrer une copie.

Consultez [Sauvegarde et restauration](/fr/data-sync/backup-restore).

### Puis-je restaurer des tâches supprimées ?

Il n’existe pas encore d’interface pour restaurer une tâche individuelle, mais vous pouvez restaurer vos données locales depuis une sauvegarde antérieure ou un instantané de récupération.

Consultez [Sauvegarde et restauration](/fr/data-sync/backup-restore).

### Puis-je importer mes données depuis TickTick ?

Oui. Mindwtr peut importer les sauvegardes CSV et ZIP de TickTick depuis **Paramètres → Données → Importer depuis TickTick**.

- Les dossiers TickTick deviennent des domaines Mindwtr
- Les listes TickTick deviennent des projets Mindwtr
- Le contenu des listes de contrôle, les étiquettes, les dates, les priorités et les règles de répétition prises en charge sont conservés lorsque cela est possible

Consultez [Importation depuis TickTick](/fr/import/ticktick).

### Puis-je importer mes données depuis Todoist ?

Oui. Mindwtr peut importer les exportations CSV et les sauvegardes ZIP de Todoist depuis **Paramètres → Données → Importer depuis Todoist**.

- Les projets Todoist deviennent des projets Mindwtr
- Les sous-tâches deviennent des éléments de liste de contrôle
- Les tâches actives associées à un projet restent dans leur projet ; les tâches actives sans projet restent disponibles pour le traitement dans la boîte de réception

Consultez [Importation depuis Todoist](/fr/import/todoist).

### Puis-je importer mes données depuis DGT GTD ?

Oui. Mindwtr peut importer les exportations JSON et les archives ZIP de DGT GTD depuis **Paramètres → Données → Importer depuis DGT GTD**.

- Les dossiers DGT deviennent des domaines Mindwtr
- Les projets DGT deviennent des projets Mindwtr
- Les listes de contrôle DGT deviennent des tâches de liste de contrôle
- Les contextes et les étiquettes DGT sont conservés

Les modèles de répétition DGT non pris en charge sont importés une fois et leur texte de répétition d’origine est conservé dans la description.

Consultez [Importation depuis DGT GTD](/fr/import/dgt-gtd).

### Puis-je importer mes données depuis OmniFocus ?

Oui. Mindwtr peut importer les exportations CSV d’OmniFocus ainsi que les exportations JSON / ZIP d’Omni Automation depuis **Paramètres → Données → Importer depuis OmniFocus**.

- Les dossiers OmniFocus peuvent devenir des domaines Mindwtr lorsque les métadonnées sont disponibles
- Les projets OmniFocus deviennent des projets Mindwtr lorsque cela est nécessaire
- Les actions OmniFocus indépendantes restent en dehors des projets
- Les notes, étiquettes, dates de report, dates d’échéance, états d’achèvement et récurrences pris en charge dans le format JSON sont conservés
- Les tâches imbriquées simples peuvent devenir des éléments de liste de contrôle, tandis que les hiérarchies plus profondes sont aplaties et leur chemin d’origine est conservé

Si la récurrence est importante, utilisez l’exportation JSON / ZIP d’Omni Automation plutôt que le format CSV. Les dates planifiées et le texte de durée sont conservés dans la description lorsque Mindwtr ne dispose pas de champ correspondant.

Consultez [Importation depuis OmniFocus](/fr/import/omnifocus).

### Puis-je importer mes données depuis Apple Reminders ?

Oui, sur iPhone et iPad. Mindwtr peut importer les rappels Apple Reminders incomplets depuis **Paramètres → Données → Importer depuis Apple Reminders**.

- Choisissez la liste de rappels à importer
- Les rappels importés deviennent des tâches Mindwtr
- Vous pouvez choisir de supprimer les rappels d’Apple Reminders après que Mindwtr a confirmé l’importation

L’importation depuis Apple Reminders est unidirectionnelle ; il ne s’agit pas d’une synchronisation. Consultez [Importation depuis Apple Reminders](/fr/data-sync/#importation-depuis-rappels-apple-ios).

---

## Dépannage

### L’application ne démarre pas (ordinateur sous Linux)

Vérifiez que WebKitGTK est installé :
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### Pourquoi le dossier d’installation ou de compilation AUR est-il si volumineux ?

Utilisez `mindwtr-bin` sur les distributions basées sur Arch, sauf si vous souhaitez expressément compiler depuis les sources :

```bash
yay -S mindwtr-bin
```

`mindwtr-bin` installe le paquet précompilé de la version GitHub et devrait constituer la méthode AUR légère et rapide. Le paquet source, `mindwtr`, compile l’application de bureau localement et doit télécharger les dépendances de compilation d’une application Tauri, Rust, Bun et React. Cela peut utiliser beaucoup plus d’espace disque pendant la compilation.

Le paquet source est censé récupérer l’archive de l’étiquette de version plutôt que l’intégralité de l’historique Git. Si un outil AUR semble télécharger une copie Git très volumineuse, vérifiez que vous avez installé `mindwtr-bin` pour utiliser le paquet binaire, ou signalez le comportement du paquet source afin que la recette AUR puisse être corrigée.

### L’application plante au démarrage (mobile)

Essayez d’effacer les données de l’application :
1. Accédez à Paramètres → Applications → Mindwtr
2. Touchez Stockage → Effacer les données
3. Rouvrez l’application

Remarque : cette opération supprime les données locales.

### Les tâches ne se synchronisent pas

1. Vérifiez que le dossier de synchronisation est accessible
2. Vérifiez que le service de synchronisation fonctionne
3. Vérifiez les autorisations des fichiers
4. Essayez une synchronisation manuelle dans Paramètres

### Les notifications ne fonctionnent pas

**Ordinateur :**
- Vérifiez les paramètres de notification du système
- Vérifiez que l’application est autorisée à envoyer des notifications

**Mobile :**
- Accordez l’autorisation d’envoyer des notifications dans les paramètres de l’appareil
- Vérifiez les paramètres de notification de l’application

---

## Contribution

### Comment puis-je contribuer ?

- Signalez les bugs et proposez des fonctionnalités avec **Envoyer des commentaires** dans **Paramètres → À propos** ou dans les [issues GitHub](https://github.com/dongdongbh/Mindwtr/issues)
- Envoyez des pull requests
- Participez aux traductions
- Parlez de Mindwtr autour de vous !

Consultez le [guide de contribution](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md).

---

## Voir aussi

- [Bien démarrer](/fr/start/getting-started)
- [Présentation de GTD](/fr/use/gtd-overview)
- [Données et synchronisation](/fr/data-sync/)
- [Contribution (guide du dépôt)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
