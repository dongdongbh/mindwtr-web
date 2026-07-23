# Guide d’utilisation : mobile

L’application mobile Mindwtr est conçue avec React Native et Expo. Android est entièrement pris en charge ; iOS est disponible sur l’App Store et par l’intermédiaire de la version bêta TestFlight.

## Vue d’ensemble

L’application mobile utilise des onglets inférieurs pour les principaux flux et une page Menu pour les vues supplémentaires.

---

## Modes d’interaction

- **Touchez** une tâche pour l’ouvrir et la modifier.
- **Balayez** pour effectuer des actions rapides (voir la section Actions de balayage ci-dessous).
- La **feuille de partage** ajoute des éléments directement à votre Boîte de réception.

## Navigation

### Onglets inférieurs

| Onglet         | Description                                  |
| -------------- | -------------------------------------------- |
| 📥 **Boîte de réception** | Collecter et traiter les éléments entrants |
| 🎯 **Focus**    | Tableau de bord quotidien et actions suivantes |
| ➕ **Capture rapide** | Ajouter rapidement une tâche ou une note audio |
| 📝 **Revue**   | Revue quotidienne et hebdomadaire           |
| ☰ **Menu**     | Accéder aux Projets, au Tableau, au Calendrier, etc. |

### Onglet Menu

Touchez l’onglet **Menu** pour accéder aux vues supplémentaires :

 - 📋 **Tableau** : vue en tableau Kanban avec classement manuel par glisser-déposer, recherche et filtres de contexte, d’étiquette, de date et de projet
 - 🗓️ **Calendrier** : vue chronologique
 - 📁 **Projets** : résultats en plusieurs étapes
 - 🏷️ **Contextes** : filtrer par contexte
 - ⏳ **En attente** : éléments délégués
 - 💭 **Un jour/Peut-être** : idées pour l’avenir
 - 📚 **Référence** : documents de référence
 - ✅ **Terminé** : tâches récemment terminées
 - 📦 **Archivés** : tâches et projets terminés classés hors des listes normales
 - 🗑️ **Corbeille** : tâches et projets supprimés
 - ⚙️ **Paramètres** : préférences de l’application

Ouvrez **Terminé** et touchez **Sélectionner** pour choisir des tâches, puis utilisez **Déplacer → Archivés** pour les classer plus tôt. Dans **Archivés**, touchez **Sélectionner** ou **Tout sélectionner** pour ramener des tâches dans Terminé sans modifier leur heure d’achèvement, les restaurer dans la Boîte de réception ou les déplacer vers la Corbeille. Passez à **Projets** pour ouvrir, restaurer ou déplacer des projets archivés vers la Corbeille. Mindwtr ne supprime définitivement les éléments que depuis la Corbeille.

Ouvrez la **Corbeille** et touchez **Sélectionner** pour gérer plusieurs tâches et projets supprimés. Touchez **Tout sélectionner** ou choisissez des éléments, puis restaurez-les ou supprimez-les définitivement en une seule étape. Toute suppression définitive demande toujours une confirmation.

---

## Recherche globale

Touchez l’**icône de recherche** dans l’en-tête pour ouvrir la Recherche globale.

La recherche masque par défaut les éléments Terminés et Archivés. Lorsque des éléments masqués correspondent à votre requête, l’indication « N de plus dans Terminé et Archivés » apparaît et peut être touchée. Touchez-la pour les inclure, ou activez **Inclure les tâches Terminées et Archivées** dans les filtres de recherche.

### Opérateurs de recherche

Utilisez des opérateurs pour effectuer des filtrages puissants :

| Opérateur   | Exemple            | Description                              |
| ----------- | ------------------ | ---------------------------------------- |
| `status:`   | `status:next`      | Filtrer par statut de tâche              |
| `-status:`  | `-status:done`     | Exclure un statut                        |
| `context:`  | `context:@home`    | Filtrer par contexte                     |
| `tag:`      | `tag:#focused`     | Filtrer par étiquette                    |
| `assigned:` | `assigned:Tom`     | Filtrer par personne assignée            |
| `project:`  | `project:HomeReno` | Filtrer par projet                       |
| `location:` | `location:office`  | Filtrer par lieu de la tâche             |
| `where:`    | `where:office`     | Alias du lieu de la tâche                |
| `id:`       | `id:abc123`        | Trouver un identifiant exact de tâche    |
| `-id:`      | `-id:abc123`       | Exclure un identifiant exact de tâche    |
| `due:`      | `due:today`        | Tâches arrivant à échéance à cette date  |
| `due:<=`    | `due:<=7d`         | Tâches arrivant à échéance sous 7 jours  |
| `start:`    | `start:>=tomorrow` | Tâches commençant à partir d’une date    |
| `created:`  | `created:>=30d`    | Tâches créées au cours des 30 derniers jours |
| `OR`        | `@home OR @work`   | Correspondre à l’une ou l’autre condition |

### Recherches enregistrées

Les Recherches enregistrées sont des raccourcis vers des requêtes de recherche réutilisables.

1. Saisissez votre requête de recherche
2. Touchez **« Enregistrer la recherche »**
3. Nommez votre recherche
4. Accédez-y depuis **Menu → Recherches enregistrées**

**Pour supprimer :** ouvrez la recherche enregistrée, puis touchez l’icône de corbeille dans l’en-tête.

Les Recherches enregistrées sont distinctes des **Filtres enregistrés** de Focus. Les filtres Focus enregistrent des critères tels que les projets, contextes, étiquettes, priorités, niveaux d’énergie et estimations de temps pour la vue Focus.

---


## Capture rapide

Mindwtr offre plusieurs moyens de collecter rapidement des tâches sur mobile.

L’écran de capture donne la priorité à la saisie. L’aide sur la syntaxe est rangée derrière un petit bouton « ? » afin de conserver une interface épurée.

Pour les captures en série, activez l’interrupteur **Ajouter une autre** dans la feuille de capture : chaque pression sur Entrée enregistre la tâche et garde la feuille ouverte avec le clavier affiché, prête pour la suivante. L’interrupteur reste activé d’une capture à l’autre jusqu’à ce que vous le désactiviez.

### Feuille de partage

Collectez des tâches depuis n’importe quelle application à l’aide de la feuille de partage :

1. Dans n’importe quelle application (navigateur, e-mail, notes), trouvez un élément que vous souhaitez collecter
2. Touchez le bouton **Partager**
3. Sélectionnez **Mindwtr** parmi les options de partage
4. Mindwtr ouvre l’écran de capture avec le contenu partagé joint sous forme de notes
5. Ajoutez un titre, ajustez les champs nécessaires et enregistrez la tâche dans votre Boîte de réception

Le partage d’un fichier (PDF, image, vidéo ou enregistrement audio) le copie dans Mindwtr en tant que pièce jointe de la nouvelle tâche, avec le nom du fichier comme titre initial. Vous pouvez partager jusqu’à six fichiers à la fois.

Idéal pour :
- Enregistrer des articles à lire plus tard
- Transformer des e-mails en tâches
- Ajouter des liens pendant la navigation sur le web
- Classer un PDF ou une photo comme tâche de la Boîte de réception à traiter plus tard

### Widget de l’écran d’accueil

Ajoutez le widget Mindwtr à votre écran d’accueil pour y accéder rapidement :

1. Appuyez longuement sur votre écran d’accueil
2. Sélectionnez **Widgets**
3. Trouvez et ajoutez le widget **Mindwtr**
4. Touchez le widget pour ouvrir la capture rapide ou afficher les éléments Focus

### Widget de l’écran verrouillé iOS

Sous iOS 16 et versions ultérieures, Mindwtr propose des widgets pour l’écran verrouillé qui affichent votre tâche ciblée actuelle sans déverrouiller le téléphone :

1. Appuyez longuement sur l’écran verrouillé et touchez **Personnaliser**
2. Sélectionnez la zone des widgets et ajoutez un widget **Mindwtr Focus**
3. Choisissez le widget rectangulaire (principale tâche ciblée avec la légende Focus), le widget intégré sur une ligne au-dessus de l’horloge ou le compteur circulaire de tâches ciblées

Toucher l’un d’eux ouvre l’écran Focus. Les widgets de l’écran verrouillé suivent le style monochrome de l’écran verrouillé du système.

### Tuile des réglages rapides Android

Sous Android, ajoutez la tuile de capture Mindwtr aux Réglages rapides pour collecter dans la Boîte de réception d’un seul balayage :

1. Ouvrez le mode de modification des Réglages rapides Android.
2. Ajoutez la tuile **Mindwtr**.
3. Touchez la tuile pour ouvrir la Capture rapide.

### Capture rapide dans la barre de notifications Android

Pour la capture la plus rapide, accessible d’un seul balayage et depuis l’écran verrouillé, épinglez une notification persistante **Capture rapide** :

1. Ouvrez **Paramètres → Notifications**.
2. Activez **Capture rapide dans la barre de notifications**.
3. Touchez la notification à tout moment pour ouvrir la Capture rapide.

La notification est silencieuse et reste discrète en bas du volet. Désactivez l’option pour la retirer. (Android uniquement ; iOS ne prend pas en charge les notifications persistantes, utilisez donc le widget ou Raccourcis.)

### Actions vocales de l’application Android

Les versions Android exposent une action de capture aux assistants compatibles, notamment les interfaces Gemini/Assistant passant par les App Actions Android. Les captures créées par la voix ouvrent le flux de confirmation de Mindwtr afin que vous puissiez vérifier le titre et la note avant de les enregistrer.

### Intents d’automatisation de contexte Android

Les applications d’automatisation telles que Tasker, MacroDroid ou Phone Profiles peuvent activer un contexte Mindwtr. Utilisez le formulaire de diffusion Android pour les déclenchements qui doivent rester en arrière-plan. Lorsqu’il est activé, Mindwtr vérifie les actions `/next` correspondantes disponibles maintenant et n’envoie une notification que si du travail peut être affiché. Toucher cette notification ouvre la vue Contextes correspondante.

Formulaire de diffusion Android :

| Champ | Valeur |
| --- | --- |
| Paquet | `tech.dongdongbh.mindwtr` |
| Classe | `tech.dongdongbh.mindwtr.ContextAutomationReceiver` |
| Cible | Récepteur de diffusion |
| Action d’activation | `tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT` |
| Action de désactivation | `tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT` |
| Valeur String supplémentaire | `context=parents` ou `context=@parents` |

Exemples ADB :

```bash
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.ACTIVATE_CONTEXT --es context parents
adb shell am broadcast -n tech.dongdongbh.mindwtr/.ContextAutomationReceiver -a tech.dongdongbh.mindwtr.action.DEACTIVATE_CONTEXT --es context parents
```

Forme URL :

| URL | Action |
| --- | --- |
| `mindwtr://contexts?token=%40parents&contextAction=activate` | Activer `@parents` |
| `mindwtr://contexts?token=%40parents&contextAction=deactivate` | Désactiver `@parents` |

Exemples d’URL :

```bash
adb shell am start -a android.intent.action.VIEW -d 'mindwtr://contexts?token=%40parents&contextAction=activate' tech.dongdongbh.mindwtr
```

Remarques :
- Le lancement d’une URL peut ouvrir Mindwtr. Utilisez le formulaire du récepteur de diffusion lorsque l’automatisation doit rester en arrière-plan.
- Les noms de contexte sont normalisés au format `@context` ; `parents` et `@parents` correspondent donc tous deux à `@parents`.
- Les contextes hiérarchiques correspondent aux niveaux inférieurs du contexte sélectionné ; `@parents` correspond donc également à `@parents/errands`.
- Si aucune action `/next` actuellement disponible ne correspond au contexte, Mindwtr reste silencieux.
- La désactivation est pour l’instant une opération silencieuse sans effet. Elle accuse réception du déclencheur de sortie de l’automatisation et est réservée à un futur état de contexte actif ; elle ne supprime, ne masque ni ne modifie aucune tâche.
- Sous Android, les URL et intents d’automatisation de contexte renvoient Mindwtr en arrière-plan après leur traitement. Touchez la notification lorsque vous souhaitez ouvrir la vue Contextes correspondante.
- Mindwtr ne détecte pas lui-même les lieux ni les états de l’appareil ; l’application d’automatisation gère le déclencheur.

### Raccourcis Apple

Sur iPhone et iPad, Mindwtr propose des actions Raccourcis Apple natives pour la collecte dans la Boîte de réception et l’ouverture de vues GTD telles que Focus, En attente, Un jour, Projets, Revue et Calendrier. Consultez [Raccourcis Apple](/fr/power-users/apple-shortcuts) pour la configuration, des exemples et les limites de la v1.

### Capture rapide par schéma d’URL (Raccourcis iOS / automatisations Android)

Mindwtr enregistre le schéma d’URL `mindwtr://`, ce qui vous permet de collecter des tâches depuis Raccourcis iOS, Tasker ou d’autres outils d’automatisation.

URL prises en charge :

| URL | Action |
| --- | --- |
| `mindwtr://capture?title=Buy%20groceries` | Ouvrir la capture avec un titre |
| `mindwtr://capture?title=Buy%20groceries&note=From%20store` | Ouvrir la capture avec un titre et une note |
| `mindwtr://capture?title=Buy%20groceries&project=Shopping&tags=errands,home` | Ouvrir la capture avec un projet et des étiquettes |

Remarques :
- `title` est obligatoire (alias : `text`).
- `note` est facultatif (alias : `description`).
- `project` correspond au titre d’un projet actif existant (sans tenir compte de la casse) ou le crée.
- `tags` est une liste séparée par des virgules et normalisée au format `#tag` avant l’enregistrement.

Exemple avec Raccourcis iOS :
1. Ouvrez **Raccourcis** et créez un raccourci.
2. Ajoutez **Demander une entrée** (invite : titre de la tâche).
3. Ajoutez **Ouvrir les URL** avec : `mindwtr://capture?title=[Provided Input]`.
4. Exécutez le raccourci ; Mindwtr ouvre l’écran de capture afin que vous puissiez vérifier et enregistrer la tâche.

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

**Formats de date :** today, tomorrow, friday, next week, in 3 days, 2025-01-15, 26.06., 26.06.2026

Une date ou une heure à la fin de votre saisie devient la date d’échéance : `Grab a coffee with Marta Jun 23 6pm` crée une tâche à échéance du 23 juin à 18 h. La détection ne lit que la fin du texte ; un titre comme "Review June report" reste donc inchangé. Par défaut le titre conserve votre texte tel que saisi ; activez **Nettoyer le texte de l’ajout rapide** (Paramètres → GTD) pour retirer aussi les mots reconnus, ce qui laisse "Grab a coffee with Marta". Désactivez **Détecter les dates en langage naturel** (Paramètres → GTD, activé par défaut) pour garder les formulations de date littérales, sans date. Les jetons explicites comme `/due:friday` fonctionnent dans tous les cas et priment sur la détection. Les deux réglages se synchronisent entre vos appareils.

---

## Capture audio

Collectez des tâches avec votre voix grâce à la transcription assistée par IA.

### Configuration

1. Accédez à **Menu → Paramètres → Assistant IA**.
2. Activez **Reconnaissance vocale**.
3. Choisissez un **Fournisseur** :
   - **OpenAI / Gemini** : service infonuagique (nécessite une clé API).
   - **Hors ligne (Whisper)** : s’exécute localement. Vous pouvez télécharger un modèle (par ex., Tiny ou Base) directement dans les paramètres.
4. Définissez votre **Méthode de capture par défaut** dans **Paramètres → Général** si vous préférez commencer par l’audio.

### Utiliser la capture audio

- **Ajout rapide** : touchez l’onglet **Audio** dans l’écran Capture rapide.
- **Enregistrer** : touchez le microphone pour commencer.
- **Transcrire** : arrêtez l’enregistrement pour traiter l’audio.
- **Analyse intelligente** : si elle est activée, l’application extrait automatiquement les dates et les champs.

---

## Boîte de réception

Votre zone de collecte pour la saisie rapide des tâches.

Utilisez le **Balayage mental** lorsque vous souhaitez des invites de collecte guidée pour le travail, la maison, les personnes, les courses et les boucles ouvertes, plutôt que de partir d’un champ vide.

### Ajouter des tâches

1. Touchez le champ de saisie en bas
2. Utilisez la feuille de partage depuis d’autres applications
3. Touchez le widget de l’écran d’accueil
4. Saisissez votre tâche avec la syntaxe d’ajout rapide
5. Touchez le bouton d’ajout ou appuyez sur Entrée

### Traiter la Boîte de réception

Touchez **Traiter la Boîte de réception** pour lancer le processus de clarification :

1. **Est-ce une action ?**
   - Oui → Continuer
   - Non → Corbeille ou Un jour/Peut-être

2. **Cela prendra-t-il moins de 2 minutes ?**
   - Oui → La faire maintenant, la marquer comme Terminée
   - Non → Continuer

3. **Qui doit s’en charger ?**
   - Je m’en charge → Ajouter un contexte, déplacer vers Actions suivantes
   - Déléguer → Déplacer vers En attente

4. **Où allez-vous effectuer cette action ?**
   - Sélectionner des contextes (@home, @work, etc.)
   - Ajouter des contextes personnalisés

5. **Attribuer à un projet ?** (Facultatif)
   - Sélectionner un projet ou ignorer
   - Ou choisir **Oui, en faire un projet** lorsque la capture contient plusieurs actions : nommez le projet et définissez son action suivante. Toute action supplémentaire que vous saisissez retourne dans la Boîte de réception avec le projet déjà associé, prête à passer par son propre processus de clarification

---

## Focus

Votre tableau de bord principal pour agir. Focus est un tableau de bord d’engagement, pas un inventaire complet de toutes les tâches ayant le statut `next`.

### Sections

| Section      | Contenu                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| **Aujourd’hui** | Tâches ciblées aujourd’hui, à échéance aujourd’hui/en retard ou commençant aujourd’hui |
| **Suivantes** | Actions suivantes disponibles qui ne sont ni bloquées ni différées     |

Focus masque les tâches dont la date de début est future et les tâches ultérieures des projets séquentiels afin que la liste reste limitée à ce sur quoi vous pouvez agir maintenant. Utilisez les **Contextes**, les **Projets** ou la **Recherche** lorsque vous souhaitez examiner un inventaire de tâches plus large.

Par défaut, les Actions suivantes sont classées avec les actions à échéance proche en premier, puis les actions sans date et enfin les actions dont l’échéance est lointaine. Au sein d’une même catégorie, Focus utilise la priorité lorsqu’elle est activée, puis l’heure de début, la date de création, le titre et l’identifiant. Consultez [Le flux de travail GTD dans Mindwtr](/fr/use/gtd-workflow#comment-focus-trie-les-actions-disponibles) pour connaître toute la logique.

### Fonctionnalités

- **Filtre de contexte** : touchez une pastille de contexte pour filtrer la liste Suivantes.
- **Filtres enregistrés** : enregistrez des critères Focus réutilisables tels que les projets, contextes, étiquettes, priorités, niveaux d’énergie et estimations de temps.
- **Balayer vers Focus** : balayez une tâche vers la droite pour basculer son état « Focus » (elle est déplacée vers Aujourd’hui).
- **Statut rapide** : touchez le badge de statut pour modifier le statut.
- **Pomodoro (facultatif)** : activez-le dans **Paramètres → GTD → Fonctionnalités → Minuteur Pomodoro** pour afficher un minuteur compact de concentration/pause. Laissez-le sur **Minuteur uniquement**, ou activez **Lier le minuteur à la tâche** pour afficher le sélecteur de tâche du Minuteur et l’action **Marquer la tâche comme terminée**.

---

## Revue

Passez vos tâches en revue et mettez leur statut à jour.

- Consultez les détails de la tâche (description, heure de début, échéance, contextes)
- Marquez rapidement les tâches comme terminées
- Naviguez entre les tâches
- **Mode Sélection** : organisez, déplacez, étiquetez, partagez ou supprimez plusieurs tâches
- Pendant la Revue hebdomadaire, utilisez l’étape **Traiter la Boîte de réception** pour vider les éléments collectés avant de poursuivre avec le calendrier, les éléments en attente, les projets et les éléments « un jour ».

---

## Éditeur de tâche (Tâche et Vue)

L’éditeur de tâche possède deux modes :

- **Tâche** : modifier les champs, listes de contrôle, dates, étiquettes et contextes
- **Vue** : résumé épuré en lecture seule avec liste de contrôle interactive

Balayez vers la gauche ou la droite pour basculer entre **Tâche** et **Vue**.

Les tâches axées sur une liste de contrôle s’ouvrent par défaut en mode Vue pour permettre une validation plus rapide.

L’éditeur s’ouvre sous une forme minimale. Touchez **Plus d’options** pour afficher les champs avancés ; tout champ qui contient déjà une valeur reste visible.

Le Markdown de la description prend en charge les listes non ordonnées et les cases à cocher de tâches (`- item`, `[ ] item`, `[x] item`).
Saisissez `[[` dans les descriptions de tâches ou les notes de projet pour créer un lien vers une autre tâche ou un autre projet depuis la feuille de sélection de liens.
Ces liens servent uniquement à la navigation ; ils ne synchronisent pas l’état d’achèvement entre les tâches.
Les cases à cocher Markdown de la description ne sont que des notes ; elles n’ont aucun effet sur la liste de contrôle de la tâche.
Coller un texte de plusieurs lignes dans un élément de liste de contrôle crée un élément par ligne (les puces, la numérotation et les marqueurs `[x]` sont reconnus).
Le champ **Personne assignée** stocke les personnes déléguées pour En attente, les suggestions et la recherche `assigned:`. Gérez les personnes enregistrées, les notes et les liens de référence depuis **Paramètres → Gérer**.

Les tâches récurrentes prennent en charge deux stratégies :
- **Stricte** (cadence fixe)
- **Répéter après l’achèvement** (prochaine date calculée à partir de l’heure d’achèvement)
- **Fin : Jamais / À une date / Après N occurrences**

Mindwtr conserve une seule occurrence active d’une tâche récurrente. Le Calendrier affiche cette occurrence actuelle lorsqu’elle possède une échéance ou une heure de début ; les occurrences futures ne sont pas créées à l’avance tant que l’occurrence actuelle n’est pas terminée, sauf si **Afficher la prochaine occurrence dans le Calendrier** est activé pour obtenir un aperçu de planification uniquement.

Utilisez le champ de récurrence dans l’éditeur de tâche, puis activez **Répéter après l’achèvement** ou **Afficher la prochaine occurrence dans le Calendrier** selon vos besoins.
La même feuille vous permet d’arrêter une série à une date cible ou après un nombre total fixe d’occurrences.

### Pièces jointes

Vous pouvez joindre des fichiers ou des liens à une tâche depuis l’éditeur. Les notes audio peuvent être enregistrées comme pièces jointes lorsque **Enregistrer les pièces jointes audio** est activé.

Consultez [Pièces jointes](/fr/use/attachments) pour en savoir plus sur la synchronisation et le nettoyage.

---

## Assistant IA (facultatif)

Activez-le dans **Paramètres → Avancé → Assistant IA** :

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

## Intégration du calendrier

Mindwtr peut superposer des calendriers externes et envoyer les tâches Mindwtr datées vers le calendrier de l’appareil. La configuration détaillée se trouve dans [Intégration du calendrier](/fr/use/calendar-integration).

Pour envoyer des tâches vers Google Agenda sous Android ou Calendrier Apple sous iOS :

1. Accédez à **Paramètres -> Calendrier**
2. Activez **Envoyer les tâches vers le calendrier**
3. Accordez l’autorisation d’accéder au calendrier
4. Développez **Cible de synchronisation**
5. Choisissez un calendrier `Mindwtr` dédié ou un autre calendrier cible accessible en écriture

Pour configurer la cible Google Agenda sous Android et Calendrier Apple sous iOS, consultez [Intégration du calendrier](/fr/use/calendar-integration).

Pour superposer des calendriers externes avec des abonnements ICS :

1. Accédez à **Paramètres -> Calendrier**
2. Ajoutez votre **URL ICS**
3. Actualisez pour récupérer les événements

Les événements externes sont en lecture seule et ne sont pas resynchronisés vers leur source. Touchez un événement externe et choisissez **Créer une tâche** pour créer une tâche Mindwtr distincte ; Mindwtr copie le titre, la date et l’heure, le lieu, la description et le nom du calendrier de l’événement lorsqu’ils sont disponibles.

---

## Calendrier

Vue chronologique avec fonctions de planification.

### Vues

- **Vue Mois** : vue d’ensemble des tâches avec échéance
- **Vue Jour** : chronologie détaillée avec les tâches planifiées et les événements externes

### Planifier des tâches

1. Dans la vue Jour du Calendrier, touchez **Planifier des tâches**
2. Sélectionnez une tâche parmi les Actions suivantes (affichées en premier) ou recherchez des tâches À faire
3. Mindwtr trouve le premier créneau libre (en évitant les conflits avec les événements externes)
4. La tâche reçoit une heure de début fondée sur son estimation de temps

Le panneau de planification est la surface de planification mobile : utilisez-le lorsque vous examinez une journée et souhaitez transformer des Actions suivantes non planifiées ou du travail échu mais non planifié en blocs de temps concrets. Réduisez-le lorsque vous souhaitez vous concentrer sur la grille du calendrier.

### Faire glisser pour replanifier

- Appuyez longuement sur un bloc de tâche planifiée
- Faites-le glisser vers un nouveau créneau horaire (par intervalles de 5 minutes)
- Relâchez-le pour mettre à jour l’heure de début

### Calendriers externes (iCal/ICS)

Abonnez-vous à des calendriers externes pour afficher leurs événements à côté de vos tâches :

1. Accédez à **Paramètres → Avancé → Calendrier**
2. Saisissez l’URL du calendrier (format ICS/webcal)
3. Donnez-lui un nom et touchez **Ajouter**
4. Les événements externes apparaissent sous forme de blocs gris dans la vue Jour

---

## Projets

Gérez les résultats en plusieurs étapes.

Ouvrez les Projets depuis **Menu → Projets**.

### Liste des projets

- Affichez tous les projets actifs
- Consultez le nombre de tâches par projet
- Touchez un projet pour afficher ses détails

### Détails du projet

- Affichez toutes les tâches du projet
- Ajoutez de nouvelles tâches
- Regroupez les tâches à l’aide de **Sections** dans le projet. Les sections sont des titres à l’intérieur d’un seul projet, pas des sous-tâches ni des projets distincts.
- Touchez une tâche pour lui attribuer une **Section** dans l’éditeur de tâche
- Modifiez les paramètres du projet (nom, couleur, notes)
- Attribuez un **Domaine de responsabilité** (par ex., Travail, Personnel)
- Ajoutez des **Étiquettes de projet** pour le filtrage
- Définissez le mode séquentiel ou parallèle
- Définissez la date de revue
- Réorganisez les tâches du projet à l’aide de la poignée de déplacement lorsque l’ordre personnalisé est activé. Déposer une tâche sous l’en-tête d’une autre section la déplace dans cette section, tandis que la déposer au-dessus du premier en-tête retire son affectation à une section
- Archivez le projet (c’est ainsi qu’un projet est achevé — les tâches restantes sont terminées avec lui, et **Réactiver** annule cette action)

Le champ **Section du projet** de l’éditeur de tâche affecte une tâche à l’une des sections de son projet actuel. Il n’a d’importance qu’une fois la tâche rattachée à un projet comportant des sections ; sinon, laissez-le vide.

### Séquentiel ou parallèle

| Mode           | Comportement                                                  |
| -------------- | ------------------------------------------------------------- |
| **Séquentiel** | Seule la première tâche disponible du projet apparaît dans Focus |
| **Parallèle**  | Toutes les tâches disponibles du projet peuvent apparaître dans Focus |

Les projets séquentiels peuvent fonctionner à l’échelle du projet ou section par section. Le séquençage par section affiche la première tâche disponible de chaque section du projet, afin que des phases ou des chantiers distincts puissent progresser en parallèle sans rendre toutes les tâches visibles.

---

## Actions de balayage

Gérez rapidement les tâches avec des gestes de balayage :

| Vue              | Balayer vers la droite | Résultat                    |
| ---------------- | ---------------------- | --------------------------- |
| **Boîte de réception** | Terminée          | Marque la tâche comme terminée |
| **Focus**        | Focus                  | Bascule l’état Focus        |

Terminer une tâche enregistre l’heure actuelle. Si vous l’avez en réalité terminée plus tôt, appuyez longuement sur n’importe quelle commande **Terminé** pour choisir l’heure réelle d’achèvement : le bouton Terminé révélé par le balayage, l’option Terminé dans le menu de statut, la pastille Terminé dans l’éditeur de tâche ou le badge de statut dans l’aperçu de la tâche. Vous pouvez également toucher l’horodatage **Terminée** d’une tâche terminée ou archivée pour le corriger après coup.

---

## Contextes

Parcourez et filtrez les tâches par contexte.

### Contextes de lieu

- `@home` : tâches à effectuer à la maison
- `@work` : tâches à effectuer au bureau
- `@errands` : courses et déplacements
- `@agendas` : sujets à aborder
- `@computer` : nécessite un ordinateur
- `@phone` : nécessite un téléphone
- `@anywhere` : peut être effectué n’importe où

### Étiquettes

Filtrez les tâches par niveau d’énergie, mode ou thème :

- `#focused` : travail approfondi nécessitant de la concentration
- `#lowenergy` : tâches simples pour les moments de fatigue
- `#creative` : remue-méninges et génération d’idées
- `#routine` : tâches répétitives ou mécaniques

---

## En attente

Suivez les éléments délégués ou qui dépendent d’événements externes.

- Affichez toutes les tâches en attente
- Consultez les échéances
- Déplacez-les vers Suivantes lorsqu’elles sont prêtes
- Marquez-les comme Terminées lors de leur réception

---

## Un jour/Peut-être

Laissez mûrir les idées pour l’avenir.

- Passez-les périodiquement en revue pendant la Revue hebdomadaire
- Activez-les en les faisant passer au statut Suivante
- Archivez-les si elles ne sont plus pertinentes

---

## Notifications et rappels

Mindwtr envoie des notifications pour vous aider à rester sur la bonne voie.

### Types de notifications

- **Rappels d’échéance** : alertes lorsque les tâches arrivent à échéance
- **Alertes d’heure de début** : vous rappellent quand il est temps de commencer
- **Rappels de tâches récurrentes** : notifications pour les éléments récurrents

Touchez le corps de la notification pour accéder directement à l’écran **Revue**.

Les rappels sont planifiés sur le téléphone lui-même. Il n’existe aucun serveur de notifications push. Si vous terminez ou replanifiez une tâche sur un autre appareil (par exemple, en cochant une tâche quotidienne récurrente sur ordinateur), le téléphone met à jour ses alarmes dès que la modification y est synchronisée ; laissez donc le téléphone se synchroniser avant l’heure du prochain rappel (il suffit d’ouvrir l’application une fois).

### Autorisations

Assurez-vous que les notifications sont activées :
1. Accédez aux **Paramètres → Applications → Mindwtr** de l’appareil
2. Activez les **Notifications**
3. Autorisez les alertes et les sons selon vos préférences

---

## Paramètres

### Général

- **Apparence** : Système, Clair ou Sombre
- **Langue** : anglais, chinois (simplifié), chinois (traditionnel), hindi, espagnol, arabe, français, portugais, russe, allemand, japonais, vietnamien, turc, coréen, italien, polonais, néerlandais, tchèque

### Notifications

**Rappels de tâches :**
- Activez ou désactivez les notifications pour les échéances et les heures de début

**Résumé quotidien :**
- **Briefing matinal** : résumé des tâches à faire aujourd’hui, en retard et dans Focus
- **Revue du soir** : invitation à faire le point et à terminer la journée
- Configurez l’heure de chacun

**Revue hebdomadaire :**
- **Rappels** : recevez une notification hebdomadaire pour commencer votre revue
- **Heure/jour** : personnalisez le moment où vous souhaitez effectuer votre revue (par ex., vendredi à 16 h)

### GTD

Personnalisez le fonctionnement de Mindwtr pour votre flux de travail GTD :

**Fonctionnalités (facultatives) :**
- **Priorités** : afficher un indicateur de priorité sur les tâches
- **Estimations de temps** : ajouter un champ de durée pour la planification par blocs de temps

**Préréglages d’estimation de temps :**
- Choisissez les estimations de temps qui apparaissent dans l’éditeur de tâche
- Options : 5m, 10m, 15m, 30m, 1h, 2h, 3h, 4h, 4h+
- Valeurs par défaut : 10m, 30m, 1h, 2h, 3h, 4h, 4h+

**Archivage automatique :**
- Déplacez automatiquement les tâches Terminées vers Archivées après un nombre défini de jours (par défaut : 7 jours). Réduire le délai archive immédiatement les tâches déjà Terminées qui dépassent désormais la nouvelle limite.
- Choisissez « Jamais » pour conserver indéfiniment les tâches achevées dans la liste Terminé

**Traitement de la Boîte de réception :**
- Sur mobile, le processus de traitement de la Boîte de réception reste fondé sur des cartes
- Les mêmes paramètres partagés peuvent masquer ou afficher le raccourci des 2 minutes, l’invite demandant d’abord le projet, la section des contextes et étiquettes, la section de planification et l’option de référence

**Mise en page de l’éditeur de tâche :**
- Touchez un champ pour basculer sa visibilité (les champs masqués restent affichés lorsqu’ils ont une valeur)
- Appuyez longuement sur la poignée de déplacement pour réorganiser les champs
- Déplacez les champs entre des sections telles que **Éléments de base**, **Planification**, **Organisation** et **Détails**
- Choisissez les sections réductibles ouvertes par défaut
- Les champs masqués peuvent être révélés avec le bouton **Plus** de l’éditeur

**Gérer :**
- Utilisez **Paramètres → Gérer** pour modifier les **Domaines**, **Personnes**, **Contextes** et **Étiquettes** enregistrés
- C’est l’endroit le plus rapide pour nettoyer les doublons ou renommer les métadonnées réutilisables
- Consultez [Domaines et personnes](/fr/use/areas-people) pour savoir où créer des Domaines et des Personnes au moment de les attribuer

### Données et synchronisation

Consultez [Données et synchronisation](/fr/data-sync/) pour configurer la synchronisation.

**Moteur de synchronisation :**
- **Synchronisation infonuagique** : Dropbox dans les versions compatibles, ainsi qu’iCloud sous iOS lorsqu’il est disponible
- **Synchronisation par dossier/fichier** : synchronisation de fichiers à l’aide d’un fichier ou dossier JSON partagé (Google Drive, Syncthing, OneDrive, etc.)
- **Avancé / Serveur personnalisé** : WebDAV ou serveur Mindwtr Cloud auto-hébergé

**Autres options :**
- **Synchroniser** : déclencher manuellement la synchronisation
- **État de la dernière synchronisation** : afficher la date de la dernière synchronisation des données
- **Historique de synchronisation** : réduit par défaut ; touchez-le pour développer les entrées récentes
- **Exporter une sauvegarde** : enregistrer les données dans un fichier
- **Importation depuis Rappels Apple** : choisissez une liste Rappels et importez les rappels incomplets dans la Boîte de réception. Les rappels importés restent dans Rappels Apple, et ceux qui ont déjà été importés, qui sont terminés ou qui n’ont pas de titre sont ignorés.
- **Options de synchronisation des paramètres** : choisissez les préférences à synchroniser entre les appareils (thème, langue/format de date, valeurs GTD par défaut, URL de calendriers externes, paramètres de l’IA et Filtres enregistrés). Les clés API et les chemins de modèles locaux ne sont jamais synchronisés.

**Options GTD :**
- **Limite de tâches Focus** : choisissez combien de tâches peuvent être marquées pour le Focus du jour.

### Avancé

**Assistant IA :**
- Assistant facultatif avec votre propre clé pour clarifier et décomposer les tâches

**Calendrier (ICS/iCal) :**
- **Ajouter un calendrier** : saisissez un nom et une URL
- **Activer/Désactiver** : basculez la visibilité de chaque calendrier
- **Retirer** : supprimez un abonnement
- **Tester** : vérifiez que le calendrier se charge correctement

### À propos

- Numéro de version
- Rechercher les mises à jour
- **Envoyer des commentaires** pour les rapports de bogues, les demandes de fonctionnalités ou d’autres remarques lorsque la version permet l’envoi de commentaires. Vous pouvez indiquer une adresse e-mail si vous souhaitez recevoir une réponse.
- Liens vers le site web et GitHub

---

## Voir aussi

- [Installation mobile](/fr/start/mobile-installation)
- [Raccourcis Apple](/fr/power-users/apple-shortcuts)
- [Données et synchronisation](/fr/data-sync/)
- [Le flux de travail GTD dans Mindwtr](/fr/use/gtd-workflow)
