# Guide d’utilisation : ordinateur

L’application de bureau Mindwtr est conçue avec [Tauri v2](https://tauri.app/), offrant une expérience légère et rapide sous Windows, macOS et Linux.

## Vue d’ensemble

L’application de bureau comporte une barre latérale de navigation avec toutes les vues GTD et une zone de contenu principale.

---

## Modes d’interaction

- Un **simple clic** affiche ou masque les détails d’une tâche.
- Un **double clic** sur une tâche ouvre le mode d’édition complet. Pour renommer uniquement le titre sur place, choisissez **Renommer la tâche** dans le menu `⋯` de la tâche (Entrée enregistre, Échap annule).
- **Cliquez à l’extérieur** d’un éditeur de tâche ouvert pour le fermer si rien n’a été modifié ; dès qu’un champ a été modifié, vous devez utiliser Enregistrer, Annuler ou Échap pour le fermer.
- Un **clic droit** ouvre les menus contextuels (projets, tâches).
- **Priorité au clavier** : les raccourcis globaux et les modes Vim/Emacs sont optimisés pour les flux de travail sur ordinateur.

Si vous continuez à repousser l’échéance d’une tâche, sa ligne affiche un petit badge en forme de sablier indiquant le nombre de reports (après le troisième report) à côté de l’échéance. Ce badge vous invite à envisager de clarifier à nouveau, déléguer ou abandonner la tâche plutôt que de la reporter encore une fois.

La plupart des listes de tâches partagent la même rangée de commandes pour sélectionner, filtrer, trier et regrouper les tâches, afficher leurs détails et changer la densité de la liste (Confortable, Compact ou Condensé). Utilisez **Grouper** pour organiser la Boîte de réception, les Actions suivantes, En attente, Un jour/Peut-être, Référence, Terminé et les autres vues en liste selon des métadonnées telles que le contexte, le domaine, le projet ou l’étiquette.

## Mode Focus

Utilisez le mode Focus pour masquer la barre latérale et garder la liste centrée (largeur maximale de 800px).

- Activez ou désactivez-le avec **Ctrl+\\** (Windows/Linux) ou **Cmd+\\** (macOS)
- Idéal pour le travail approfondi ou les revues

### Zone de notification système

Mindwtr fonctionne en arrière-plan pour gérer la synchronisation automatique.

- **Fermer la fenêtre** réduit l’application dans la zone de notification système au lieu de la quitter.
- **Cliquez sur l’icône de la zone de notification** pour afficher ou masquer la fenêtre.
- **Faites un clic droit sur l’icône de la zone de notification** pour quitter complètement l’application.

## Vues

### 📥 Boîte de réception

Votre zone de collecte. Toutes les nouvelles tâches y arrivent avant d’être traitées.

- **Ajoutez des tâches** à l’aide du champ de saisie en bas
- La **syntaxe d’ajout rapide** est prise en charge (voir [Bien démarrer](/fr/start/getting-started))
- Utilisez l’étoile à côté du champ Ajout rapide lorsqu’une nouvelle tâche doit être placée directement dans le **Focus du jour**. La même étoile se trouve aussi dans l’en-tête de l’éditeur de tâche. Ajouter une étoile compte comme une clarification : une capture étoilée est créée comme **Action suivante** plutôt que comme élément de la Boîte de réception, et replacer une tâche étoilée dans la Boîte de réception retire son étoile.
- **Traitez la Boîte de réception** à l’aide du processus de clarification
- Le **Balayage mental** vous guide à travers les domaines courants de la vie et du travail lorsque vous préférez une session de collecte guidée à un champ vide.

### 🎯 Focus

Votre tableau de bord unifié pour l’engagement quotidien. Focus ne constitue pas un inventaire complet de toutes les tâches ayant le statut `next` ; il restreint la liste au travail disponible maintenant.

- **Focus du jour** : tâches prioritaires étoilées pour le travail approfondi, dans la limite Focus que vous avez configurée. Les actions suivantes mises en focus affichent aussi une petite étoile pleine à côté de leur titre dans les listes de tâches et sur le Tableau, pour repérer d'un coup d'œil l'appartenance au Focus.
- **En retard** : éléments dont l’échéance est dépassée.
- **À faire aujourd’hui** : tâches dont l’échéance est aujourd’hui.
- **Actions suivantes** : tâches prêtes sans échéance, filtrées par contexte.
- **Revue à effectuer** : éléments dont la date de rappel est arrivée.

Focus masque les tâches dont la date de début est future et les tâches ultérieures des projets séquentiels. Utilisez les **Contextes**, les **Projets** ou la **Recherche** lorsque vous devez examiner un inventaire de tâches plus large.

**Ordre par défaut des Actions suivantes :** Focus place d’abord les actions à échéance proche, puis les actions sans date et enfin les actions dont l’échéance est lointaine. Au sein d’une même catégorie, il utilise la priorité lorsqu’elle est activée, puis l’heure de début, la date de création, le titre et l’identifiant. Consultez [Le flux de travail GTD dans Mindwtr](/fr/use/gtd-workflow#comment-focus-trie-les-actions-disponibles) pour connaître toute la logique.

**Fonctionnalités :**
- **Filtres de contexte** : filtrez les Actions suivantes par contexte (par ex., @home, @work) ou par étiquette. Le sélecteur de filtres regroupe les contextes et les étiquettes afin que les longues listes de métadonnées restent faciles à parcourir.
- **Grouper par contexte** : utilisez la commande de regroupement de la liste pour regrouper les Actions suivantes selon leur contexte principal, les tâches sans contexte étant rassemblées sous **Aucun contexte**.
- **Filtres enregistrés** : enregistrez des critères Focus réutilisables tels que les projets, contextes, étiquettes, priorités, niveaux d’énergie et estimations de temps.
- **Mode Zen** : activez-le pour tout masquer à l’exception des tâches du Focus du jour.
- **Pomodoro (facultatif)** : activez-le dans **Paramètres → GTD → Fonctionnalités → Minuteur Pomodoro** pour afficher un panneau de minuteur de concentration/pause (15/3, 25/5, 50/10, ainsi qu’un préréglage personnalisé facultatif). Laissez-le sur **Minuteur uniquement**, ou activez **Lier le minuteur à la tâche** pour afficher le sélecteur de tâche du Minuteur et l’action **Marquer la tâche comme terminée**.

### 📁 Projets

Résultats en plusieurs étapes contenant des tâches liées.

- **Mode séquentiel** : seule la première tâche disponible du projet apparaît dans Focus ; dans la vue du projet, la tâche disponible est mise en évidence et les tâches en attente apparaissent estompées
- **Mode parallèle** : toutes les tâches disponibles du projet peuvent apparaître dans Focus
- **Portée séquentielle** : les projets séquentiels peuvent avancer à l’échelle du projet ou section par section ; la portée par section affiche la première tâche disponible de chaque section.
- **Statut** : Actif, En attente, Un jour, Archivé
- **Domaines de responsabilité** : regroupez les projets par domaines de niveau supérieur (par ex., Travail, Santé) pour organiser votre barre latérale. Faites glisser un projet sur un domaine pour l’y déplacer ; pendant le glissement, les domaines réduits et vides (ainsi que **Aucun domaine**) apparaissent également comme cibles de dépôt.
- **Déplacer des tâches par glisser-déposer** : faites glisser une tâche depuis la liste du projet ouvert sur un autre projet dans la barre latérale pour l’y déplacer (elle se place après les tâches existantes de la cible), ou sur l’en-tête d’un domaine pour en faire une tâche directement rattachée à ce domaine. Cela fonctionne dans tous les modes de tri ; une notification **Déplacée vers…** permet d’annuler en un clic, et les projets archivés n’acceptent pas les dépôts.
- **Étiquettes de projet** : attribuez des étiquettes aux projets et filtrez par étiquette
- **Notes d’accompagnement** : ajoutez des notes de planification et des documents de référence
- **Sections** : regroupements facultatifs de tâches au sein d’un projet (phases, jalons, sous-chantiers). Les sections sont des titres à l’intérieur d’un seul projet, pas des sous-tâches ni des projets distincts.
- **Date de revue** : définissez des dates de rappel pour la revue du projet
- **Archiver** : terminer un projet signifie l’archiver — les tâches restantes sont terminées avec lui, et **Réactiver** annule cette action

Le champ **Section du projet** de l’éditeur de tâche affecte une tâche à l’une des sections de son projet actuel. Il n’a de valeur utile qu’une fois la tâche rattachée à un projet comportant des sections.

### 🏷️ Contextes

Filtrez les tâches selon le lieu ou l’outil :

- `@home`, `@work`, `@errands`, `@agendas`
- `@computer`, `@phone`, `@anywhere`

### 🏷️ Étiquettes

Filtrez les tâches par niveau d’énergie, mode ou thème :

- Énergie : `#focused`, `#lowenergy`, `#creative`
- Thème : `#health`, `#finance`

### ⏳ En attente

Suivez les éléments délégués ou les tâches qui dépendent d’événements externes.

### 💭 Un jour/Peut-être

Laissez mûrir les idées que vous voudrez peut-être poursuivre plus tard.

### 🗓️ Calendrier

Vue chronologique des tâches avec des échéances ou des heures de début.

Sur les mises en page larges, le Calendrier comprend un panneau **Planifier les actions suivantes** pour le jour sélectionné. Il présente les Actions suivantes non planifiées et les tâches échues mais non planifiées afin que vous puissiez les placer dans les créneaux libres sans quitter le Calendrier. Réduisez le panneau lorsque vous souhaitez laisser plus de place à la grille du jour ou de la semaine.

### 📋 Vue Tableau

Tableau à colonnes de type Kanban avec glisser-déposer :

- **Boîte de réception** : éléments non traités
- **Actions suivantes** : prêts à être exécutés
- **En attente** : éléments délégués
- **Un jour/Peut-être** : éléments différés
- **Terminé** : tâches terminées

Faites glisser les cartes dans une colonne pour définir manuellement leur ordre dans le tableau. Déplacer une tâche vers un autre statut efface son ordre dans l’ancienne colonne afin qu’elle puisse être ordonnée dans la nouvelle.

Utilisez le champ de recherche du Tableau pour limiter les cartes visibles selon le titre, les notes, le projet, le contexte ou l’étiquette. Le bouton de filtre ouvre des filtres rapides pour les contextes, les étiquettes, les échéances et les projets ; **Effacer les filtres** supprime à la fois le texte de recherche et les filtres actifs.

### ✅ Terminé

Tâches récemment terminées. Utilisez cette vue comme journal à court terme de vos réalisations pour votre revue quotidienne ou hebdomadaire.

Si vous avez achevé une tâche avant de la marquer comme Terminée, cliquez sur son horodatage **Terminée** pour le corriger. Vous pouvez également faire un clic droit sur le bouton de validation d’une tâche ouverte afin de la marquer comme Terminée à une heure antérieure. Cela est utile lorsque l’heure d’achèvement compte pour vos archives ou pour une planification de type « répéter après l’achèvement ».

Choisissez **Sélectionner** pour choisir des tâches ou **Tout sélectionner**, puis utilisez **Déplacer → Archivés** pour classer la sélection plus tôt.

### 📦 Archivés

Tâches terminées qui ont été classées. Les tâches archivées sont masquées des listes de tâches normales, mais vous pouvez les rechercher ou les restaurer ici. Cliquez sur l’horodatage **Terminée** d’une tâche pour le corriger. Un sélecteur Tâches | Projets en haut affiche à la place les projets archivés : restaurer un projet le réactive (en récupérant les tâches terminées avec lui), et le supprimer l’envoie à la corbeille.

Choisissez **Sélectionner** pour choisir des tâches ou **Tout sélectionner**. Vous pouvez ramener la sélection dans Terminé sans modifier son heure d’achèvement, la restaurer dans la Boîte de réception ou la déplacer vers la Corbeille. Mindwtr ne supprime définitivement les tâches que depuis la Corbeille.

### 🗑️ Corbeille

Tâches et projets supprimés, les plus récents en premier. Restaurez des éléments, supprimez-les définitivement ou utilisez **Vider la corbeille** pour tout supprimer en une seule fois. Choisissez **Sélectionner** pour choisir plusieurs tâches et projets (ou **Tout sélectionner**) et les restaurer ou les supprimer définitivement en une seule étape. Toute suppression définitive demande toujours une confirmation.

### 📝 Revue hebdomadaire

Assistant de revue GTD guidée comprenant les étapes suivantes :

1. Traiter la Boîte de réception
2. Examiner le Calendrier
3. Relancer les éléments En attente
4. Examiner les Projets
5. Examiner Un jour/Peut-être

Utilisez l’action **Traiter la Boîte de réception** dans la revue pour vider les éléments collectés avant de poursuivre avec le calendrier, les éléments en attente, les projets et les éléments « un jour ».

Consultez [Revue hebdomadaire](/fr/use/weekly-review) pour obtenir des conseils détaillés.

---

## Assistant IA (facultatif)

Activez-le dans **Paramètres → Assistant IA** :

- **Clarifier** : transformez les tâches vagues en actions suivantes concrètes
- **Décomposer** : générez des étapes de liste de contrôle pour les tâches importantes
- **Analyse de la revue** : mettez en évidence les tâches qui stagnent pendant la revue
- **Copilote** : obtenez des suggestions de contexte, d’étiquette et de temps pendant la saisie

L’IA est facultative et ne s’exécute que lorsque vous la sollicitez.

---

## Listes réutilisables

Utilisez les listes de contrôle comme modèles :

- **Dupliquer la tâche** : copiez une liste principale (bagages, préparation d’un voyage)
- **Réinitialiser la liste de contrôle** : décochez tout pour la réutiliser (courses)

---

## Éditeur de tâche (affichage et modification)

- Cliquez sur une tâche pour ouvrir une **vue en lecture seule** de tous ses détails.
- Appuyez sur **Modifier** (ou `e`) pour passer en mode édition.
- L’éditeur s’ouvre sous une forme minimale. Utilisez **Plus d’options** pour afficher les champs avancés.
- **Section du projet** est un champ d’organisation pour les tâches au sein d’un projet divisé en sections. Laissez-le vide pour les tâches de la Boîte de réception, les tâches non attribuées ou les projets sans section.
- Statut, Priorité et Niveau d’énergie utilisent des boutons en forme de pastille plutôt que des listes déroulantes pour accélérer la sélection au clavier et au pointeur.
- Ouvrez le calendrier d’un champ de date pour choisir des raccourcis à côté de la grille du mois : **Aujourd’hui**, **Demain**, **+2 jours**, **+3 jours**, **Semaine prochaine**, **Mois prochain** et **Aucune date**.
- Dans **Paramètres → GTD → Mise en page de l’éditeur de tâche**, choisissez si l’éditeur sur ordinateur s’ouvre sous forme d’aperçu latéral intégré ou de fenêtre contextuelle centrée.

---

## Intégration du calendrier

Mindwtr peut superposer des calendriers externes dans la vue Calendrier. Sous macOS, il peut lire le Calendrier Apple par l’intermédiaire d’EventKit ; sur toutes les plateformes de bureau, il peut lire directement les URL d’abonnement ICS.
Ajoutez une **URL ICS** dans **Paramètres → Calendrier** lorsque vous avez besoin d’un abonnement ICS.
Les événements externes sont en lecture seule, mais vous pouvez créer une tâche Mindwtr distincte à partir d’un événement du Calendrier ; Mindwtr copie le titre, la date et l’heure, le lieu, la description et le nom du calendrier de l’événement lorsqu’ils sont disponibles.
Utilisez **Planifier les actions suivantes** dans le Calendrier pour transformer le jour sélectionné en surface de planification : examinez le travail non planifié, choisissez une tâche et planifiez-la dans un créneau libre tout en conservant les échéances comme dates limites.
Sous macOS, **Envoyer les tâches vers le calendrier** peut également inscrire les tâches Mindwtr planifiées ou échues dans un calendrier Apple cible sélectionné et accessible en écriture. Consultez [Intégration du calendrier](/fr/use/calendar-integration) pour connaître les détails de la configuration.

### 🔍 Recherche globale

Une recherche puissante avec des opérateurs pour tout trouver instantanément.

**Ouvrir :** appuyez sur `/` ou `Ctrl/Cmd + K`, ou cliquez sur l’icône de recherche.

Le texte de recherche est facultatif. Ouvrez **Filtres** pour afficher les éléments correspondants selon le statut, la portée, le domaine, l’échéance, le lieu, le contexte ou l’étiquette ; choisissez **Terminé** et **Archivés** (ou **Inclure les tâches Terminées et Archivées**) pour afficher les éléments achevés.

#### Opérateurs de recherche

| Opérateur   | Exemple            | Description                              |
| ----------- | ------------------ | ---------------------------------------- |
| `status:`   | `status:next`      | Filtrer par statut de tâche              |
| `-status:`  | `-status:done`     | Exclure un statut                        |
| `context:`  | `context:@home`    | Filtrer par contexte                     |
| `tag:`      | `tag:#focused`     | Filtrer par étiquette                    |
| `assigned:` | `assigned:Tom`     | Filtrer par personne déléguée            |
| `project:`  | `project:HomeReno` | Filtrer par nom ou identifiant de projet |
| `location:` | `location:office`  | Filtrer par lieu de la tâche             |
| `where:`    | `where:office`     | Alias du lieu de la tâche                |
| `id:`       | `id:abc123`        | Trouver un identifiant exact de tâche    |
| `-id:`      | `-id:abc123`       | Exclure un identifiant exact de tâche    |
| `due:`      | `due:today`        | Tâches arrivant à échéance à cette date  |
| `due:<=`    | `due:<=7d`         | Tâches arrivant à échéance sous 7 jours  |
| `start:`    | `start:>=tomorrow` | Tâches commençant à partir d’une date    |
| `created:`  | `created:>=30d`    | Tâches créées au cours des 30 derniers jours |
| `OR`        | `@home OR @work`   | Correspondre à l’une ou l’autre condition |

**Formats de date :** `today`, `tomorrow`, `7d` (7 jours), `2w` (2 semaines), `1m` (1 mois), `2025-01-15`

#### Recherches enregistrées

Les Recherches enregistrées sont des raccourcis vers des requêtes de recherche réutilisables :

1. Saisissez votre requête de recherche avec des opérateurs
2. Cliquez sur le bouton **« Enregistrer la recherche »**
3. Nommez votre recherche (par ex., « Tâches professionnelles bientôt échues »)
4. Accédez-y depuis la section **Recherches enregistrées** de la barre latérale

**Pour supprimer une recherche enregistrée :** ouvrez-la, puis cliquez sur l’icône de corbeille.

Les Recherches enregistrées sont distinctes des **Filtres enregistrés** de Focus. Les Filtres enregistrés de Focus sont synchronisés sous forme de critères de filtrage et modifiés depuis les commandes de filtrage de Focus.

---

## Capture rapide

### Raccourci global

Collectez des tâches depuis n’importe quel endroit de votre bureau sans changer de fenêtre :

1. Appuyez sur le raccourci global (`Ctrl+Alt+M`)
2. Saisissez votre tâche avec la syntaxe d’ajout rapide
3. Appuyez sur Entrée pour l’ajouter à la Boîte de réception
4. Reprenez ce que vous faisiez

Vous pouvez modifier ou désactiver ce raccourci dans **Paramètres → Général → Saisie → Raccourci global d’ajout rapide**.
Les valeurs par défaut suivent les conventions de la plateforme :
- macOS : `Ctrl+Option+M` (par défaut), `Ctrl+Option+N`, `Ctrl+Option+Q` ou l’ancien `Cmd+Shift+A`
- Linux : `Ctrl+Alt+M` (par défaut), `Ctrl+Alt+N`, `Ctrl+Alt+Q` ou l’ancien `Ctrl+Shift+A`
- Windows : désactivé par défaut afin que Mindwtr ne s’approprie jamais silencieusement une combinaison de touches utilisée par d’autres applications ; `Ctrl+Alt+M` est le choix recommandé lorsque vous en activez une
- Évitez l’ancien raccourci `Ctrl+Shift+A` : Chrome, Word et Excel l’utilisent tous, et un raccourci global le remplace dans tout le système

**Remarque sur Flatpak/Wayland :** certains compositeurs n’autorisent pas les raccourcis globaux enregistrés par les applications. Dans ce cas, associez plutôt votre raccourci de bureau à `flatpak run tech.dongdongbh.mindwtr --quick-add`.

### Icône de la zone de notification

Cliquez sur l’icône de la zone de notification système pour une capture immédiate :

- Le champ d’ajout rapide apparaît
- Utilisez la syntaxe en langage naturel
- La tâche va directement dans la Boîte de réception

### Raccourcis de la boîte de dialogue Ajouter une tâche

La boîte de dialogue Ajouter une tâche s’utilise entièrement au clavier :

- `Enter` : enregistrer et fermer
- `Shift+Enter` : enregistrer et garder la boîte de dialogue ouverte pour la tâche suivante (capture par lot)
- `Ctrl+Enter` (`⌘Enter` sous macOS) : enregistrer et ouvrir la tâche dans l’éditeur complet
- `Esc` : fermer sans enregistrer
- Lorsqu’une fenêtre de suggestions est ouverte (`@`, `#`, `+`, `%`, `!`, `/`), `↑`/`↓` permettent de parcourir les suggestions et `Enter` ou `Tab` insère celle qui est mise en évidence

### Syntaxe d’ajout rapide

Mindwtr analyse le langage naturel lors de l’ajout de tâches :

| Syntaxe      | Exemple           | Résultat                            |
| ------------ | ----------------- | ----------------------------------- |
| `@context`   | `@home`           | Ajoute un contexte                  |
| `#tag`       | `#focused`        | Ajoute une étiquette                |
| `+Project`   | `+HomeReno`       | Attribue à un projet                |
| `+Multi Word` | `+New Project`    | Attribue à « New Project »          |
| `+"Quoted Name"` | `+"New Project" call Bob` | Les guillemets délimitent un nom composé de plusieurs mots au milieu d’une phrase (également `!"Area Name"`) |
| `!Area`       | `Plan roadmap !Work` | Attribue à un domaine            |
| `%Person`     | `Ask %Jim for budget` | Définit la personne assignée (responsable délégué / en attente) ; `%"Full Name"` pour les nouveaux noms composés de plusieurs mots |
| `/area:<name>` | `/area:Personal` | Attribue à un domaine (sans espaces) |
| `/due:date`  | `/due:friday`     | Définit l’échéance                  |
| `/energy:<level>` | `/energy:medium` | Définit le niveau d’énergie (`low`, `medium`, `high`) |
| `/note:text` | `/note:call back` | Ajoute une description              |
| `/status`    | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Définit le statut |

**Formats de date :** today, tomorrow, friday, next week, in 3 days, 2025-01-15

Les formulations libres comme "next week" dans le titre deviennent des dates parce que **Détecter les dates en langage naturel** (Paramètres → GTD, activé par défaut) est actif. Désactivez-le pour conserver ces formulations comme texte littéral du titre ; les jetons explicites comme `/due:friday` fonctionnent toujours. Le réglage se synchronise entre vos appareils.

---

## Capture audio et transcription

Collectez des tâches avec votre voix grâce à la transcription assistée par IA.

### Configuration

1. Accédez à **Paramètres → Assistant IA**.
2. Activez **Reconnaissance vocale**.
3. Choisissez un **Fournisseur** :
   - **OpenAI / Gemini** : nécessite une clé API (service infonuagique).
   - **Hors ligne (Whisper)** : s’exécute localement sur votre appareil. Cliquez sur **Télécharger** pour récupérer le modèle une seule fois.
4. Configurez le **Mode de traitement** :
   - **Analyse intelligente** : extrait de votre discours les dates (`tomorrow`), les priorités et les projets.
   - **Transcription uniquement** : transcrit le texte mot pour mot dans la tâche.

### Utiliser la capture audio

- **Ajout rapide** : basculez le mode de capture sur **Audio** (icône de microphone) dans la barre Ajout rapide.
- **Enregistrer** : cliquez sur le microphone pour commencer l’enregistrement. Énoncez votre tâche naturellement.
- **Terminer** : cliquez sur Arrêter pour transcrire. Le texte remplira le champ de saisie.
- **Pièces jointes** : activez « Enregistrer les pièces jointes audio » dans **Paramètres → Général** pour conserver la note vocale d’origine.

---

## Notifications et rappels

Mindwtr envoie des notifications sur le bureau pour vous aider à rester sur la bonne voie :

### Types de notifications

- **Rappels d’échéance** : alertes lorsque les tâches arrivent à échéance
- **Alertes d’heure de début** : vous rappellent quand il est temps de commencer
- **Rappels de tâches récurrentes** : notifications pour les éléments récurrents

### Paramètres

Configurez les notifications dans les Paramètres :
- Activez ou désactivez les notifications
- Définissez le délai d’anticipation du rappel

**Remarques sur les plateformes :**
- **macOS** demandera l’autorisation d’envoyer des notifications la première fois que vous les activerez.
- **Linux** nécessite un démon de notification actif (GNOME/KDE, etc.).

---

## Gestion des tâches

### Créer des tâches

1. Utilisez le champ de saisie au bas de n’importe quelle vue en liste
2. Utilisez le raccourci global depuis n’importe où
3. Cliquez sur l’icône de la zone de notification pour une capture rapide
4. Sous Flatpak/Wayland, associez `flatpak run tech.dongdongbh.mindwtr --quick-add` à un raccourci personnalisé si le raccourci intégré n’est pas disponible
5. Saisissez le titre de votre tâche avec la syntaxe d’ajout rapide
6. Appuyez sur Entrée pour l’ajouter

### Modifier des tâches

- Cliquez sur une tâche pour ouvrir le panneau de modification
- Modifiez : le titre, le statut, les contextes, les étiquettes, la description et le lieu
- Définissez : l’échéance, la date de début, la date de revue, l’estimation de temps et la récurrence
- Gérez les éléments de la liste de contrôle
- Le Markdown de la description prend en charge les listes non ordonnées et les cases à cocher de tâches (`- item`, `[ ] item`, `[x] item`)
- Lorsque l’option **Détails** de la liste est activée, les lignes de tâches affichent la première ligne de la description rendue en Markdown ; développez une ligne pour lire la description complète
- Saisissez `[[` dans les descriptions de tâches ou les notes de projet pour créer un lien vers une autre tâche ou un autre projet depuis un sélecteur flottant
- Ces liens servent uniquement à la navigation ; ils ne synchronisent pas l’état d’achèvement entre les tâches
- Les cases à cocher Markdown de la description ne sont que des notes ; elles n’ont aucun effet sur la liste de contrôle de la tâche
- Collez un texte de plusieurs lignes dans un élément de liste de contrôle pour créer un élément par ligne (les puces, la numérotation et les marqueurs `[x]` sont reconnus)
- Attribuez la tâche à un projet

### Propriétés des tâches

| Propriété              | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| **Statut**             | inbox, next, waiting, someday, done, archived                  |
| **Priorité**           | low, medium, high, urgent                                      |
| **Contextes**          | Étiquettes de lieu ou d’outil (par ex., @home, @work)          |
| **Étiquettes**         | Étiquettes d’énergie ou de mode (par ex., #focused, #lowenergy) |
| **Échéance**           | Date à laquelle la tâche doit être terminée                    |
| **Date de début**      | Date à laquelle commencer à y travailler                       |
| **Date de revue**      | Date de rappel pour la revue                                   |
| **Estimation de temps** | 5min, 10min, 15min, 30min, 1hr, 2hr, 3hr, 4hr, 4hr+           |
| **Récurrence**         | daily, weekly, monthly, yearly + stratégie                     |
| **Liste de contrôle**  | Sous-éléments pour les tâches en plusieurs étapes              |
| **Description**        | Notes au format Markdown avec aperçu                           |
| **Pièces jointes**     | Fichiers et liens joints à la tâche                            |
| **Lieu**               | Lieu physique                                                  |
| **Personne assignée**  | Personne déléguée pour En attente et la recherche `assigned:`  |
| **Projet**             | Affectation au projet parent                                   |
| **Section**            | Groupe facultatif au sein d’un projet                          |

**Pièces jointes :** le champ **Ajouter un lien** accepte à la fois les URL et les chemins de fichiers locaux (par ex., `/home/user/doc.pdf`, `C:\Users\you\file.txt` ou `file://...`).
Consultez [Pièces jointes](/fr/use/attachments) pour en savoir plus sur la synchronisation, le nettoyage et les notes audio.

### Tâches récurrentes

Lorsque vous terminez une tâche récurrente, Mindwtr crée automatiquement l’occurrence suivante avec les dates mises à jour.

- **Stricte** (par défaut) : maintient une cadence fixe.
  Exemple : tous les 5 jours reste ancré sur le cycle prévu.
- **Répéter après l’achèvement** : décale la prochaine échéance à partir de l’heure d’achèvement.
  Exemple : si vous terminez maintenant, la prochaine échéance est fixée 5 jours plus tard.
- **Fin : Jamais / À une date / Après N occurrences** : choisissez si la série se poursuit indéfiniment, s’arrête à une date précise ou s’arrête après un nombre fixe d’occurrences.
  `After N occurrences` compte la tâche actuelle dans le total de la série.

Mindwtr conserve une seule occurrence active d’une tâche récurrente. Le Calendrier affiche cette occurrence actuelle lorsqu’elle possède une échéance ou une heure de début ; les occurrences futures ne sont pas créées à l’avance tant que l’occurrence actuelle n’est pas terminée, sauf si **Afficher la prochaine occurrence dans le Calendrier** est activé pour obtenir un aperçu de planification uniquement.

Vous pouvez activer ou désactiver cette option dans le champ de récurrence de l’éditeur de tâche à l’aide de **Répéter après l’achèvement**.
Utilisez la même feuille de récurrence pour définir une date de fin ou un nombre d’occurrences lorsque la série doit s’arrêter automatiquement.


---

## Actions groupées

Sélectionnez plusieurs tâches pour effectuer des opérations par lot :

1. Cliquez sur le bouton **« Sélectionner »** dans l’en-tête de la liste
2. Cliquez sur les tâches pour les sélectionner ou les désélectionner
3. Utilisez la barre d’actions pour :
   - **Déplacer** : modifier le statut de toutes les tâches sélectionnées
   - **Attribuer un domaine** : déplacer toutes les tâches sélectionnées sous un domaine précis (ou retirer le domaine)
   - **Ajouter une étiquette** : ajouter une étiquette à toutes les tâches sélectionnées
   - **Retirer une étiquette** : retirer une étiquette de toutes les tâches sélectionnées
   - **Ajouter un contexte** : ajouter un contexte à toutes les tâches sélectionnées
   - **Retirer un contexte** : retirer un contexte de toutes les tâches sélectionnées
   - **Supprimer** : supprimer toutes les tâches sélectionnées
4. Cliquez sur **« Terminé »** pour quitter le mode de sélection

### Tri

Utilisez la liste déroulante de tri pour classer les tâches par :
- Ordre par défaut (selon le statut)
- Échéance
- Date de début
- Date de revue
- Titre (ordre alphabétique)
- Date de création (de la plus ancienne à la plus récente ou inversement)

Dans un projet, le tri choisi est mémorisé pour ce projet et se synchronise avec vos autres appareils. Les projets sans tri choisi gardent l'ordre manuel, et le glisser-déposer reste disponible tant que le projet est sur Défaut.

---

## Contextes et étiquettes hiérarchiques

Organisez vos éléments avec des contextes et des étiquettes imbriqués :

| Exemple          | Correspondances                   |
| ---------------- | --------------------------------- |
| `@work`          | `@work`, `@work/meetings`, etc.   |
| `@work/meetings` | Uniquement `@work/meetings`       |
| `#health`        | `#health`, `#health/diet`, etc.    |

Le filtrage par contexte parent inclut tous ses enfants.

---

## Raccourcis clavier

Mindwtr prend en charge les préréglages de raccourcis **Standard** (style Gmail/Todoist), **Vim** et **Emacs**. Modifiez-les dans les Paramètres.

Consultez [Raccourcis clavier sur ordinateur](/fr/use/keyboard-shortcuts) pour obtenir la liste complète.

**Référence rapide (Standard) :**
- `/` : ouvrir la recherche
- `?` : afficher l’aide sur les raccourcis
- `gi` : accéder à la Boîte de réception
- `gn` : accéder aux Actions suivantes
- `gf` : accéder à Focus
- `j/k` : déplacer la sélection vers le bas ou le haut
- `Enter` : ouvrir la tâche sélectionnée
- `Shift+Enter` : modifier la tâche sélectionnée
- `e` : marquer comme terminée ou non terminée
- `x` : sélectionner ou désélectionner la tâche pour les actions par lot
- `#` : supprimer la tâche
- `z` : annuler la dernière validation ou suppression

**Référence rapide (Vim) :**
- `j/k` : déplacer la sélection vers le bas ou le haut
- `Enter` : ouvrir la tâche sélectionnée
- `e` : modifier la tâche sélectionnée
- `x` : basculer l’état terminé
- `dd` : supprimer la tâche

`Ctrl+Z` / `Cmd+Z` annule la dernière validation ou suppression de tâche dans chaque préréglage.

Dans chaque préréglage, `s` suivi d’une lettre définit directement le statut de la tâche sélectionnée (`si` Boîte de réception, `sn` Suivante, `sw` En attente, `ss` Un jour, `sd` Terminée, `sa` Archivée) et affiche une notification permettant d’annuler. `Insert` place le curseur dans le champ d’ajout de tâche (ou ouvre l’ajout rapide lorsqu’une liste n’en possède pas).

---

## Paramètres

Accédez aux Paramètres depuis la barre latérale.

### Général
- **Apparence** : Clair, Sombre ou Système
- **Langue** : anglais, chinois (simplifié), chinois (traditionnel), hindi, espagnol, arabe, français, portugais, russe, allemand, japonais, vietnamien, turc, coréen, italien, polonais, néerlandais, tchèque
- **Raccourcis clavier** : préréglage Standard, Vim ou Emacs
- **Lancer au démarrage** : démarrer Mindwtr automatiquement lors de votre connexion

### Notifications

**Rappels de tâches :**
- Activez ou désactivez les notifications de tâches pour les échéances et les heures de début

**Résumé quotidien :**
- **Briefing matinal** : résumé des tâches à faire aujourd’hui, en retard et dans Focus
- **Revue du soir** : invitation à faire le point et à terminer la journée
- Configurez les heures (par ex., 9 h 00, 20 h 00)

**Revue hebdomadaire :**
- **Rappels** : recevez une notification hebdomadaire pour commencer votre revue
- **Jour/heure de la revue** : personnalisez le moment où vous souhaitez recevoir le rappel

### GTD
- **Archivage automatique** : déplacez automatiquement les tâches Terminées vers Archivées après un nombre défini de jours (par défaut : 7 jours), ou choisissez **Jamais** pour conserver les tâches achevées dans Terminé. Réduire le délai archive immédiatement les tâches déjà Terminées qui dépassent désormais la nouvelle limite.
- **Limite de tâches Focus** : choisissez combien de tâches peuvent être marquées pour le Focus du jour
- **Fonctionnalités** : signaux facultatifs que vous pouvez activer au besoin :
  - **Priorités** : afficher un indicateur de priorité sur les tâches
  - **Estimations de temps** : ajouter un champ de durée pour la planification par blocs de temps
- **Traitement de la Boîte de réception** : conservez le traitement guidé de la Boîte de réception pour apprendre la méthode GTD, ou choisissez par défaut le mode **Rapide** pour un flux compact sur un seul écran
  - Choisissez d’afficher ou non le raccourci des 2 minutes, de demander le projet au début, d’inclure les contextes et les étiquettes, d’autoriser la planification et de proposer une référence pendant le traitement
- **Mise en page de l’éditeur de tâche** : choisissez les champs affichés par défaut, déplacez-les entre les sections et réorganisez-les
  - Choisissez le style d’ouverture de l’éditeur : **Aperçu latéral** pour les modifications intégrées ou **Fenêtre contextuelle** pour une édition ciblée
  - Vous pouvez déplacer des champs comme **Échéance** vers **Planification** et choisir les sections développées par défaut
- **Gérer** : gérez vos métadonnées réutilisables depuis un seul endroit
  - Modifiez les **Domaines**, les **Personnes**, les **Contextes** et les **Étiquettes** sans devoir les rechercher dans chaque tâche
  - Les Personnes conservent les noms réutilisables des responsables, ainsi que les notes et les liens de référence pour les tâches déléguées et les suggestions
  - Consultez [Domaines et personnes](/fr/use/areas-people) pour savoir où créer des Domaines et des Personnes au moment de les attribuer

### Données et synchronisation

**Moteur de synchronisation :**
- **Synchronisation infonuagique** : Dropbox dans les versions compatibles, ainsi qu’iCloud sous macOS lorsqu’il est disponible
- **Synchronisation par dossier/fichier** : synchronisation de fichiers à l’aide d’un fichier ou dossier JSON partagé (Google Drive, Syncthing, OneDrive, etc.)
- **Avancé / Serveur personnalisé** : WebDAV ou serveur Mindwtr Cloud auto-hébergé

**Options de synchronisation des paramètres :**
- Choisissez les préférences à synchroniser entre les appareils (thème, langue/format de date, valeurs GTD par défaut, URL de calendriers externes, paramètres de l’IA, Filtres enregistrés)
- Les clés API et les chemins de modèles locaux ne sont jamais synchronisés

**État de la synchronisation :**
- Le pied de la barre latérale indique l’heure de la dernière synchronisation et l’état en ligne ou hors ligne

Pour WebDAV, configurez :
- L’URL du serveur (URL du dossier ; Mindwtr y stocke `data.json`)
- Le nom d’utilisateur et le mot de passe

Consultez [Données et synchronisation](/fr/data-sync/) pour obtenir des instructions détaillées.

### À propos
- Informations sur la version
- Rechercher les mises à jour
- **Envoyer des commentaires** pour les rapports de bogues, les demandes de fonctionnalités ou d’autres remarques lorsque la version permet l’envoi de commentaires. Vous pouvez indiquer une adresse e-mail si vous souhaitez recevoir une réponse.
- Liens vers le site web et GitHub

---

## Voir aussi

- [Installation sur ordinateur](/fr/start/desktop-installation)
- [Raccourcis clavier sur ordinateur](/fr/use/keyboard-shortcuts)
- [Données et synchronisation](/fr/data-sync/)
