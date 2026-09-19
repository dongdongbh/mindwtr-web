---
description: "GTD guidé sur iPhone et Android : boîte de réception carte par carte, règle des deux minutes, Priorités et assistant de Revue hebdomadaire."
---

# Guide d’utilisation : mobile

L’application mobile Mindwtr offre l’ensemble du flux GTD guidé sur iPhone et Android : capture, traitement carte par carte de la boîte de réception avec la règle des deux minutes, Projets, Priorités, Revue quotidienne et l’assistant guidé de Revue hebdomadaire. Android est entièrement pris en charge ; iOS est disponible sur l’App Store et par l’intermédiaire de la version bêta TestFlight. Mindwtr est conçue avec React Native et Expo.

## Vue d’ensemble

L’application mobile utilise des onglets inférieurs pour les principaux flux et une page Menu pour les vues supplémentaires.

Sur Android, la navigation s’adapte à l’espace disponible dans la fenêtre : les fenêtres spacieuses utilisent une barre latérale, tandis que les fenêtres étroites ou peu hautes conservent une navigation compacte. L’éditeur de tâches et la capture rapide restent dans une zone utilisable lorsqu’Android signale une charnière qui sépare ou masque une partie de l’écran. Aucun mode pour appareil pliable n’est à activer. Ces dispositions ont été contrôlées sur émulateur ; la confirmation sur des Galaxy Z Fold et Z Flip physiques reste à faire.

---

## Modes d’interaction

- **Touchez** une tâche pour l’ouvrir. **Réglages → Mise en page de l’éditeur de tâche → Ouvrir les tâches dans** décide de l’onglet atteint par ce geste.
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

Les raccourcis d’accès rapide sont personnalisables. Dans cette vidéo, Revue est remplacée par Projets ; Projets apparaît ensuite dans la navigation inférieure et dans le Menu.

<figure class="docs-demo">
  <video controls playsinline preload="none" width="720" height="1616" poster="/assets/screenshots/articles/quick-access-projects-mobile-poster.webp">
    <source src="/assets/screenshots/articles/quick-access-projects-mobile.mp4" type="video/mp4">
    Votre navigateur ne prend pas en charge la vidéo de navigation mobile de Mindwtr.
  </video>
  <figcaption>Personnalisez les raccourcis d’accès rapide, remplacez Revue par Projets, puis ouvrez la vue Projets depuis la navigation mise à jour.</figcaption>
</figure>

### Onglet Menu

Touchez l’onglet **Menu** pour accéder aux vues supplémentaires :

 - 📋 **Tableau** : vue en tableau Kanban avec classement manuel par glisser-déposer, recherche et filtres de contexte, d’étiquette, de date et de projet
 - 🗓️ **Calendrier** : vue chronologique
 - 📁 **Projets** : résultats en plusieurs étapes
 - 🏷️ **Contextes** : filtrer par contexte
 - ⏳ **En attente** : éléments délégués
 - 💭 **Un jour/Peut-être** : idées pour l’avenir
 - 📚 **Référence** : documents de référence
 - 🕘 **Historique** : onglets Terminé et Archivés — tâches récemment terminées, et tâches et projets classés
 - 🗑️ **Corbeille** : tâches et projets supprimés
 - ⚙️ **Paramètres** : préférences de l’application

Ouvrez **Historique**, restez sur l’onglet **Terminé** et touchez **Sélectionner** pour choisir des tâches, puis utilisez **Déplacer → Archivés** pour les classer plus tôt. Dans **Archivés**, touchez **Sélectionner** ou **Tout sélectionner** pour ramener des tâches dans Terminé sans modifier leur heure d’achèvement, les restaurer dans la Boîte de réception ou les déplacer vers la Corbeille. Passez à **Projets** pour ouvrir, restaurer ou déplacer des projets archivés vers la Corbeille. Mindwtr ne supprime définitivement les éléments que depuis la Corbeille.

**Archivés** dispose d’un champ de recherche et d’un bouton **Filtres** dans son en-tête. Filtres restreint par contexte, étiquette, priorité et temps estimé, et contient **Trier** et **Regrouper** — tous deux proposant **Date d’achèvement**, puisque tout ce qui est classé ici est du travail terminé. Par défaut, l’achèvement le plus récent vient en premier. Les sélections de filtres sont partagées entre les listes de tâches : un contexte choisi ailleurs restreint donc aussi cette liste. La recherche et les filtres s’appliquent au côté Tâches du sélecteur Tâches | Projets.

Dans **Terminé**, triez par **Date d’achèvement** pour afficher d’abord les tâches achevées le plus récemment. Regroupez par **Date d’achèvement** pour diviser la liste en **Aujourd’hui**, **Hier**, **7 derniers jours**, un titre par mois calendaire pour les tâches plus anciennes (janvier 2026, décembre 2025, …) et **Non terminé** ; les groupes vides restent masqués et le groupe fourre-tout sans attribution passe en dernier. Références, Boîte de réception, Terminé et Archivés peuvent aussi être regroupés par **Contexte**. Une tâche avec plusieurs contextes apparaît dans chaque groupe correspondant, tandis que les tâches sans contexte se trouvent à la fin sous **Sans contexte**. Touchez un titre de groupe pour le replier — chaque liste mémorise, pour chaque mode de regroupement, les groupes repliés sur cet appareil, et les tâches d’un groupe replié sortent de **Sélectionner** et des actions groupées.

Ouvrez la **Corbeille** et touchez **Sélectionner** pour gérer plusieurs tâches et projets supprimés. Touchez **Tout sélectionner** ou choisissez des éléments, puis restaurez-les ou supprimez-les définitivement en une seule étape. Toute suppression définitive demande toujours une confirmation. Les éléments laissés dans la Corbeille sont supprimés définitivement au bout de 90 jours.

---

## Référence

Référence conserve les notes et les documents à consulter. Les lignes et l’éditeur mettent en avant le titre, la description, le projet ou domaine, les personnes, les étiquettes, les pièces jointes et les liens. Les commandes de planification et d’achèvement restent masquées. Utilisez **Convertir en action** lorsqu’une référence devient quelque chose à faire.

La recherche dans Référence retrouve chaque terme séparé par des espaces, n’importe où dans le titre ou la description, sans distinguer les majuscules et les minuscules. Par exemple, `ke 1 2` retrouve `key1 key2 key3`. Les termes sont du texte littéral ; ce champ n’interprète pas la syntaxe de capture rapide ou de recherche avancée.

Activez **Inclure les projets archivés** dans les filtres de Référence pour retrouver les documents de projets terminés ou archivés. Cette option est désactivée au départ et ne s’applique qu’à cette vue sur cet appareil ; les éléments supprimés restent exclus.

## Actions groupées

Pour les dates de début, d’échéance et de revue dans **Bulk organize**, touchez le calendrier ou choisissez **Aujourd’hui** ou **Demain**. Les dates ne sont appliquées qu’après **Apply to selected**, sans ajouter d’heure ni de rappel. Un champ vide (ou un second appui sur le raccourci sélectionné) conserve la date actuelle de chaque tâche.

Dans **Bulk organize**, recherchez un projet ou un domaine, ou saisissez un nouveau nom et choisissez **Créer** sans perdre les tâches sélectionnées ni les autres champs. La création enregistre et sélectionne la destination ; les tâches ne sont déplacées qu’après **Apply to selected**. Annuler la modification laisse les tâches inchangées et conserve les destinations créées. En cas d’échec de création, la sélection et le formulaire restent disponibles pour réessayer.

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

Un `-` en tête nie n’importe quel opérateur, pas seulement les deux affichés : `-context:@computer` ne liste que les tâches qui ne nécessitent pas `@computer`, `-tag:#deep` masque une étiquette, `-project:HomeReno` exclut un projet.

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

### Les méthodes de capture en un coup d’œil

| Méthode | iOS | Android | Ouvre l’app ? |
| --- | --- | --- | --- |
| Écran de capture dans l’app (texte ou audio) | Oui | Oui | Vous y êtes déjà |
| Feuille de partage depuis une autre app | Oui | Oui | Oui, écran de capture |
| Bouton de capture du widget d’écran d’accueil | Oui | Oui | iOS : oui ; pour une invite sans ouvrir l’app, utilisez le [raccourci de capture en un tap](/fr/power-users/apple-shortcuts). Android : non, fenêtre de capture native |
| Micro du widget (voix) | Non | Oui, avec la reconnaissance vocale activée | Non |
| Tuile des Réglages rapides | Non | Oui | Non |
| Capture rapide dans la barre de notifications | Non | Oui | Non |
| Assistant vocal | Siri, via les actions Raccourcis | App Actions Gemini/Assistant | iOS : non avec « Add to Mindwtr ». Android : oui, confirmation |
| Raccourci « Add to Mindwtr » (silencieux, automatisations) | Oui | Non | Non |
| Raccourci « Capture to Mindwtr » (vérifier d’abord) | Oui | Non | Oui, écran de capture |
| Apple Watch (dicter ou saisir) | Oui | Non | Non, mis en file vers l’iPhone |
| Diffusion d’automatisation (Tasker et similaires) | Non | Oui | Non, en file jusqu’à l’ouverture de l’app |
| Schéma d’URL `mindwtr://capture` | Oui | Oui | Oui, écran de capture |
| Importation depuis Rappels Apple (manuelle ou automatique) | Oui | Non | S’exécute à l’ouverture de l’app |

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

<span id="capture-automatisée-sur-android-tasker"></span>

### Capture automatisée sur Android {#android-automation-capture}

Dans **Réglages → GTD → Capture defaults**, activez **Capture automatisée** et copiez le jeton de capture. Le réglage et le jeton restent sur cet appareil. Ne transmettez le jeton qu’à des applications d’automatisation de confiance. La désactivation le révoque ; une nouvelle activation crée un nouveau jeton.

Il s’agit d’un intent de broadcast Android général ; Tasker n’est pas nécessaire. Toute application ou automatisation capable d’envoyer un broadcast explicite avec des extras de type String peut l’utiliser. Envoyez l’action suivante à ce récepteur, avec le texte à capturer dans `text` et votre jeton de capture dans `token` :

| Champ | Valeur |
| --- | --- |
| Action | `tech.dongdongbh.mindwtr.action.CAPTURE` |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.androidwidget.CaptureIntentReceiver` |
| Target | `Broadcast Receiver` |
| `text` (String) | Texte à capturer |
| `token` (String) | Votre jeton de capture |

#### Exemple avec Tasker

Dans Tasker, ajoutez **Misc → Send Intent** après l’action qui produit votre texte dicté :

| Champ | Valeur |
| --- | --- |
| Action | `tech.dongdongbh.mindwtr.action.CAPTURE` |
| Package | `tech.dongdongbh.mindwtr` |
| Class | `tech.dongdongbh.mindwtr.androidwidget.CaptureIntentReceiver` |
| Target | `Broadcast Receiver` |
| Extra | `text:(String) %captured_text` |
| Extra | `token:YOUR_CAPTURE_TOKEN` |

Remplacez `%captured_text` par votre variable de texte et `YOUR_CAPTURE_TOKEN` par le jeton copié. Laissez vides la catégorie, le type MIME et les données. Mindwtr Dev utilise le paquet `tech.dongdongbh.mindwtr.dev` ; l’action et la classe restent identiques.

Chaque capture acceptée est conservée séparément, même si le texte est identique. Ouvrez Mindwtr pour importer les captures dans la boîte de réception. L’intent n’ouvre pas l’application et ne synchronise pas en arrière-plan. Il accepte du texte non vide de 2 000 caractères maximum, sans audio ni fichier. Essayez d’envoyer deux notes courtes avant d’ouvrir Mindwtr, puis vérifiez qu’elles arrivent toutes les deux. Après un arrêt forcé, Android peut bloquer les broadcasts jusqu’à la prochaine ouverture.

Consultez le [guide des intents de Tasker](https://tasker.joaoapps.com/userguide/en/intents.html) pour ses champs.

### Widget de l’écran d’accueil

Dans la prochaine version, toucher un espace vide d’un widget Tasks ou Compact ouvrira Focus sur Android et iOS. Les liens vers les tâches, les commandes de validation, la sélection de liste et la capture rapide conserveront leurs actions actuelles.

Les commandes ci-dessous concernent Android. Pour iOS, voir **Widget iOS de l’écran d’accueil** plus bas.

Ajoutez le widget Mindwtr à votre écran d’accueil pour y accéder rapidement :

1. Appuyez longuement sur votre écran d’accueil
2. Sélectionnez **Widgets**
3. Trouvez **Mindwtr** et ajoutez le widget **Tâches**, le bouton d’une cellule **Capture rapide** ou, sous Android, le petit widget facultatif **Compact**. Le widget Tâches affiche un bouton **+** et vos tâches, chacune avec sa couleur de priorité, son projet ou domaine et sa date d’échéance. Sous Android, un widget Tâches qui vient d’être ajouté affiche Focus, avec le nombre d’éléments de la boîte de réception dans son en-tête et une vue courte de Focus du jour et Aujourd’hui. Revue due, Prochaines actions et À venir restent dans l’application. Touchez le titre pour ouvrir cette liste dans Mindwtr. Pour changer la liste du widget, touchez la petite flèche vers le bas, désormais séparée du titre. L’en-tête utilise le même fond de thème que le contenu du widget. Une liste s’ouvre avec Focus, Boîte de réception, Prochaines actions, En attente, Un jour/Peut-être et vos **filtres enregistrés**. Touchez-en un et le widget se redessine. Pour afficher un seul projet sur un widget, enregistrez dans l’application un filtre Focus pour ce projet et choisissez-le ici. Cela fonctionne sur tous les lanceurs, et certains lanceurs ne proposent aucune action de modification pour les widgets. Vous pouvez ajouter plusieurs widgets Tâches avec des listes différentes. Après le premier lancement de Mindwtr et la publication du premier instantané des widgets Android, les cinq listes standard sont disponibles pour les nouveaux widgets Tâches et les changements de liste, sans rouvrir l’application. Ouvrez Mindwtr avant la première utilisation des widgets, puis pour actualiser leurs données; les widgets ne suivent pas la synchronisation en arrière-plan en temps réel. Mindwtr publie les instantanés des filtres enregistrés à la demande.
4. Dans un widget qui affiche des tâches, touchez une tâche pour ouvrir sa petite fiche native. Dans Tâches, touchez l’anneau au début d’une ligne pour la terminer. Utilisez le bouton de capture de n’importe lequel des trois widgets Android pour ajouter un élément à la Boîte de réception.

Le widget Tâches affiche d’abord Focus du jour, puis Aujourd’hui, y compris les tâches en retard. Il ne remplit pas les espaces libres avec d’autres prochaines actions. Sous Android, il suit les filtres et le tri de l’écran Focus. Les filtres que vous y avez définis s’appliquent aussi au widget : contextes, étiquettes, priorité, énergie, temps estimé et un filtre enregistré. Le tri choisi sur l’écran Focus s’applique également, et le widget se met à jour dès que vous changez l’un ou l’autre. Le domaine sélectionné dans l’application restreint toutes les listes du widget.

Le widget Compact d’Android utilise un texte plus petit et une liste Focus à plat pour les petits espaces. Il affiche Focus du jour et Aujourd’hui sous l’en-tête **Aujourd’hui**. Si les deux sont vides et que des Prochaines actions sont disponibles, l’en-tête devient **Prochaines actions**. Le redimensionnement du widget affiche autant de tâches que l’espace le permet, jusqu’à épuisement des tâches disponibles. Il n’a ni sélecteur de liste ni commande de validation intégrée ; toucher une tâche ouvre la même fiche native.

Sous Android, toucher une ligne de tâche dans Tâches ou Compact ouvre une petite fiche de tâche par-dessus l’écran d’accueil, sans ouvrir l’application principale. La fiche affiche le titre, le projet ou domaine, la note, les contextes et étiquettes, les dates de début et d’échéance, ainsi que la priorité. **Terminer** coche la tâche comme le fait l’anneau de Tâches, avec la même courte fenêtre d’annulation. **Ouvrir** vous emmène à la tâche dans l’application.

Sous Android, toucher l’anneau du widget Tâches barre aussitôt la ligne. Touchez-le de nouveau dans les trois secondes environ pour annuler. Ensuite, la ligne disparaît de Tâches et Compact et laisse la place aux tâches restantes, sans ouvrir l’application. La clôture reste enregistrée sur l’appareil jusqu’à la prochaine ouverture de Mindwtr, qui l’applique et la synchronise avec vos autres appareils.

Sous Android, le bouton de capture de chacun des trois widgets, la tuile des Réglages rapides, le raccourci de l’application et la notification de capture ouvrent la même fenêtre native flottante par-dessus ce que vous faites, sans ouvrir l’application principale. **Enregistrer** ajoute la tâche à la Boîte de réception, affiche une brève confirmation et ferme la fenêtre ; la tâche apparaît à la prochaine ouverture de Mindwtr. iOS capture via l’application comme avant.

l’activation de la transcription ajoute aussi un bouton microphone à cette fenêtre Android native. Enregistrez, appuyez sur Arrêter, puis sur Enregistrer ; l’application principale reste fermée. Les enregistrements sont conservés sur l’appareil et transcrits avec le fournisseur configuré à la prochaine ouverture de Mindwtr ou à son retour au premier plan. F-Droid utilise Whisper hors ligne. Si la transcription échoue, l’enregistrement est conservé pour une nouvelle tentative. L’enregistrement s’arrête lorsque vous quittez la fenêtre et est limité à cinq minutes.

Sous Android, les libellés d’échéance indiquent **Aujourd’hui**, le jour de la semaine pour les tâches des sept prochains jours, ou une date compacte, dans le format de date de l’app, pour les échéances ultérieures. Les tâches en retard ou à échéance aujourd’hui sont mises en évidence.

Dans la prochaine version, les listes des widgets Tâches et Compact d’Android défileront au-delà de 20 tâches. Pour une très longue liste, **Tout afficher** en bas ouvrira la liste sélectionnée complète dans Mindwtr. Aucun réglage du nombre de tâches n’est nécessaire.

### Widget iOS de l’écran d’accueil

Choisissez **Tâches** pour le widget classique, disponible en petit, moyen et grand format (ainsi qu’extra-large sur les iPad compatibles), ou **Compact** pour un texte plus petit et une liste Focus sans sections. Compact n’a ni choix de liste ni anneaux de clôture ; les formats moyens et grands permettent toujours d’ouvrir les tâches et la capture rapide.

Tâches et Compact affichent d’abord le focus du jour et Aujourd’hui, y compris les tâches en retard. Si cette liste est vide, ils affichent les Prochaines actions ; le titre court Aujourd’hui ou Prochaines indique la liste affichée. Ils ne mélangent pas les prochaines actions à une liste Aujourd’hui non vide. Le nombre de lignes s’adapte à la taille du widget et du texte. Tâches conserve la date, les anneaux de priorité, le projet ou le domaine, ainsi que les filtres, le thème et le tri de l’app.

À partir d’iOS 17, maintenez le widget appuyé et choisissez **Modifier le widget** pour sélectionner Focus, Boîte de réception, Prochaines actions, En attente, Un jour/Peut-être ou un filtre enregistré. Plusieurs widgets peuvent afficher des listes différentes ; une liste choisie autre que Focus ne bascule jamais automatiquement vers une autre. Touchez un anneau pour mettre la clôture en attente, puis touchez-le à nouveau dans les trois secondes pour annuler. Ensuite, la ligne disparaît et une autre tâche en cache peut prendre sa place. WidgetKit peut retarder l’actualisation visible. La clôture reste enregistrée dans la file jusqu’à ce que Mindwtr s’exécute et l’enregistre ; la clôture et la synchronisation passent par l’app.

Touchez le titre, l’état vide ou le petit widget pour ouvrir la liste affichée. Dans les widgets moyens et grands, toucher une tâche l’ouvre dans Mindwtr et **+** ouvre la capture rapide ; les anneaux du petit widget sont interactifs à partir d’iOS 17. Les versions antérieures utilisent le comportement Aujourd’hui/Prochaines par défaut, sans clôture directe ni choix de liste. WidgetKit détermine le moment des actualisations. Les widgets de l’écran verrouillé ne changent pas.

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
3. Touchez la tuile pour ouvrir la même petite fenêtre de capture décrite sous Widget de l’écran d’accueil.

### Capture rapide dans la barre de notifications Android

Pour la capture la plus rapide, accessible d’un seul balayage et depuis l’écran verrouillé, épinglez une notification persistante **Capture rapide** :

1. Ouvrez **Paramètres → Notifications**.
2. Activez **Capture rapide dans la barre de notifications**.
3. Touchez la notification à tout moment pour ouvrir la même petite fenêtre de capture décrite sous Widget de l’écran d’accueil.

La notification est silencieuse et reste discrète en bas du volet. Désactivez l’option pour la retirer. (Android uniquement ; iOS ne prend pas en charge les notifications persistantes, utilisez donc le widget ou Raccourcis.)

### Actions vocales de l’application Android

Les versions Android exposent une action de capture aux assistants compatibles, notamment les interfaces Gemini/Assistant passant par les App Actions Android. Les captures créées par la voix ouvrent le flux de confirmation de Mindwtr afin que vous puissiez vérifier le titre et la note avant de les enregistrer.

### Recherche système Android

Activez **Réglages → Général → Exposer à la recherche système** (désactivé par défaut, Android 12+) pour que la recherche système et les launchers compatibles trouvent vos tâches, projets et domaines par leur titre. L’index ne contient que les titres et des métadonnées minimales de statut, d’échéance et de projet/domaine — jamais les descriptions, notes ou pièces jointes — et rien ne quitte l’appareil. Toucher un résultat ouvre l’élément dans Mindwtr, et désactiver l’interrupteur supprime tout de l’index.

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

### App Apple Watch

L’app native pour Apple Watch a été testée sur une montre physique jumelée sous watchOS 10 ou version ultérieure. Installez Mindwtr sur la montre depuis l’app Watch de l’iPhone.

- **Capturer :** Touchez **Parler** pour enregistrer l’audio sur la montre et le transcrire sur l’iPhone. Touchez **Saisie** pour entrer du texte ; l’iPhone peut proposer son clavier comme méthode de saisie facultative. Les captures arrivent dans la Boîte de réception locale de Mindwtr ; la synchronisation dans le cloud reste facultative.
- **Focus :** Consultez les tâches Focus, terminez-en une ou reportez-la à demain.
- **Pomodoro :** Démarrez et contrôlez le minuteur associé à Mindwtr sur l’iPhone.

L’app conserve les captures sur la montre lorsque l’iPhone n’est pas disponible et les transmet au retour de la connexion.

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
| `/priority:<level>` | `/priority:high` | Définit la priorité (`low`, `medium`, `high`, `urgent`) |
| `/note:text` | `/note:call back` | Ajoute une description              |
| `/status`    | `/next`, `/waiting`, `/someday`, `/reference`, `/done`, `/archived`, `/inbox` | Définit le statut |

**Formats de date :** today, tomorrow, friday, next week, in 3 days, 2025-01-15, 26.06., 26.06.2026

Une date ou une heure à la fin de votre saisie devient la date d’échéance : `Grab a coffee with Marta Jun 23 6pm` crée une tâche à échéance du 23 juin à 18 h. La détection ne lit que la fin du texte ; un titre comme "Review June report" reste donc inchangé. Par défaut ces mots reconnus restent dans le titre ; activez **Nettoyer le texte de l’ajout rapide** (Paramètres → GTD) pour les retirer aussi, ce qui laisse "Grab a coffee with Marta". Le réglage ne concerne que ce cas ambigu : la syntaxe reconnue et appliquée quitte toujours le titre. Désactivez **Détecter les dates en langage naturel** (Paramètres → GTD, activé par défaut) pour garder les formulations de date littérales, sans date. Les jetons explicites comme `/due:friday` fonctionnent dans tous les cas et priment sur la détection. Les deux réglages se synchronisent entre vos appareils. Lorsque l’application est en allemand, espagnol, français, italien, japonais, néerlandais, portugais, russe, suédois ou chinois, les formulations de date dans cette langue sont détectées elles aussi — les formulations en anglais continuent de fonctionner dans toutes les langues.

---

## Capture audio

Collectez des tâches avec votre voix grâce à la transcription assistée par IA.

### Configuration

1. Accédez à **Menu → Paramètres → Avancé → Assistant IA**.
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
| **Aujourd’hui** | Tâches ciblées aujourd’hui, à échéance aujourd’hui/en retard ou commençant aujourd’hui, y compris plus tard dans la journée, ces lignes affichant leur heure de début jusqu’à ce qu’elle arrive |
| **Suivantes** | Actions suivantes disponibles qui ne sont ni bloquées ni différées     |
| **À venir** | Aperçu en lecture seule des actions qui démarrent ou reviennent un autre jour sous 7 jours |

Focus tient les tâches dont la date de début est future et les tâches ultérieures des projets séquentiels à l’écart de ses listes actionnables, afin qu’elles restent limitées à ce sur quoi vous pouvez agir maintenant ; les tâches différées de la semaine à venir restent visibles dans l’aperçu **À venir**, avec la date à laquelle chacune apparaîtra. Utilisez les **Contextes**, les **Projets** ou la **Recherche** lorsque vous souhaitez examiner un inventaire de tâches plus large.

Par défaut, les Actions suivantes sont classées avec les actions à échéance proche en premier, puis les actions sans date et enfin les actions dont l’échéance est lointaine. Au sein d’une même catégorie, Focus utilise la priorité lorsqu’elle est activée, puis l’heure de début, la date de création, le titre et l’identifiant. Consultez [Le flux de travail GTD dans Mindwtr](/fr/use/gtd-workflow#comment-focus-trie-les-actions-disponibles) pour connaître toute la logique.

L’icône de liste à côté de **Filtres** dans l’en-tête de Focus bascule les **Détails** : désactivée, chaque ligne se réduit à son titre et masque l’aperçu de la description ainsi que la ligne de métadonnées ; chaque appareil retient ce choix.

### Fonctionnalités

- **Filtre de contexte** : touchez une pastille de contexte pour filtrer la liste Suivantes.
- **Filtres enregistrés** : enregistrez des critères Focus réutilisables tels que les projets, contextes, étiquettes, priorités, niveaux d’énergie et estimations de temps.
- **Balayer vers Focus** : balayez une tâche vers la droite pour basculer son état « Focus » (elle est déplacée vers Aujourd’hui).
- **Statut rapide** : touchez le badge de statut pour modifier le statut.
- **Pomodoro (facultatif)** : activez-le dans **Paramètres → GTD → Fonctionnalités → Minuteur Pomodoro** pour afficher un minuteur compact de concentration/pause. Laissez-le sur **Minuteur uniquement**, ou activez **Lier le minuteur à la tâche** pour afficher le sélecteur de tâche du Minuteur et l’action **Marquer la tâche comme terminée**. Une fois replié, une ligne étroite garde visibles le temps restant, la phase et l’état **En cours** ou **En pause**.

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

**Réglages → GTD → Éditeur de tâche → Ouvrir les tâches en** définit le mode initial sur cet appareil :

- **Automatique** (par défaut) : Modification dans la boîte de réception, Aperçu dans les autres listes.
- **Aperçu** : lire la tâche avant de la modifier.
- **Modification** : accéder directement aux champs. Le clavier reste fermé jusqu’à ce que vous touchiez un champ.

Le comportement est identique sur Android et iOS. Une action explicite de modification ouvre toujours l’éditeur ; les tâches en lecture seule restent en Aperçu. Changer d’onglet pour une tâche ne modifie pas cette préférence.

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

Mindwtr conserve une seule occurrence active d’une tâche récurrente. Le Calendrier affiche cette occurrence actuelle lorsqu’elle possède une échéance ou une heure de début ; les occurrences futures ne sont pas créées à l’avance tant que l’occurrence actuelle n’est pas terminée, sauf si **Voir les occurrences à venir dans le calendrier** est activé pour obtenir un aperçu de planification uniquement.

Utilisez le champ de récurrence dans l’éditeur de tâche, puis activez **Répéter après l’achèvement** ou **Voir les occurrences à venir dans le calendrier** selon vos besoins.
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

1. Accédez à **Menu → Paramètres → Avancé → Calendrier**
2. Activez **Envoyer les tâches vers le calendrier**
3. Accordez l’autorisation d’accéder au calendrier
4. Développez **Cible de synchronisation**
5. Choisissez un calendrier `Mindwtr` dédié ou un autre calendrier cible accessible en écriture

Pour configurer la cible Google Agenda sous Android et Calendrier Apple sous iOS, consultez [Intégration du calendrier](/fr/use/calendar-integration).

Pour superposer des calendriers externes avec des abonnements ICS :

1. Accédez à **Menu → Paramètres → Avancé → Calendrier**
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

1. Accédez à **Menu → Paramètres → Avancé → Calendrier**
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
- Consultez les documents de référence du projet dans une section **Référence** sous la liste des tâches — les références dont les étiquettes correspondent à celles du projet y apparaissent aussi
- Ajoutez de nouvelles tâches
- Regroupez les tâches à l’aide de **Sections** dans le projet. Les sections sont des titres à l’intérieur d’un seul projet, pas des sous-tâches ni des projets distincts.
- Touchez une tâche pour lui attribuer une **Section** dans l’éditeur de tâche
- Modifiez les paramètres du projet (nom, couleur, notes)
- Attribuez un **Domaine de responsabilité** (par ex., Travail, Personnel)
- Ajoutez des **Étiquettes de projet** pour le filtrage
- Définissez le mode séquentiel ou parallèle
- Définissez la date de revue
- Réorganisez les tâches du projet à l’aide de la poignée de déplacement lorsque l’ordre personnalisé est activé. Déposer une tâche sous l’en-tête d’une autre section la déplace dans cette section, tandis que la déposer au-dessus du premier en-tête retire son affectation à une section
- Terminez le projet depuis **Actions** dans les détails du projet — les tâches restantes sont terminées avec lui, le projet passe dans la section **Terminés** en bas de la liste des projets, et **Réactiver** annule cette action
- Dupliquez le projet — faites glisser sa ligne vers la droite dans la liste des projets, ou utilisez **Dupliquer** dans la fiche de détail — pour copier ses sections et ses tâches dans une nouvelle copie (voir [Listes réutilisables](/fr/use/reusable-lists))

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

À partir de la v1.3.1 : classez les tâches dans des sections Un jour/Peut-être directement depuis cette liste.

- Ouvrez le menu d’une tâche et choisissez **Déplacer vers une section…**.
- Sélectionnez plusieurs tâches pour les déplacer ensemble avec la même action. Le sélecteur inclut les sections vides, **Aucune section** et **Nouvelle section…**.
- Utilisez **Nouvelle section…** dans la liste pour créer un titre de section. Avec le regroupement par section Un jour/Peut-être, **Ajouter une tâche** sur un titre crée une tâche dans cette section.
- Un déplacement enregistré peut être **annulé**. Le statut, le projet, la section du projet et les dates de la tâche sont conservés. Gérez les noms et l’ordre des sections dans **Paramètres → Gérer**.

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

Les tâches avec une heure d’échéance peuvent définir **Répéter le rappel** toutes les 5, 10, 15, 30 ou 60 minutes après le premier rappel d’échéance. **Ignorer les rappels** désactive les rappels de début et d’échéance pour cette tâche. **Répéter le rappel : Désactivé** ne désactive pas le premier rappel.

### Tester un rappel de tâche

1. Modifiez une tâche et fixez son **Échéance** à une heure dans quelques minutes. **Date seule** ne programme pas d’alerte à une heure précise.
2. Vérifiez **Ignorer les rappels** : **Désactivé** permet les alertes de cette tâche ; **Activé** les ignore. Dans les anciennes versions, le contour bleu de cette option signifie **Activé**.
3. Touchez **Enregistrer**. Dans **Paramètres → Notifications**, activez les notifications de tâches et les rappels d’échéance. Sur iOS, autorisez aussi les notifications Mindwtr dans les réglages de l’appareil.
4. Attendez l’heure d’échéance. Si vous avez modifié la tâche sur un autre appareil, ouvrez Mindwtr sur ce téléphone pour synchroniser la nouvelle heure avant l’alerte.

Touchez le corps de la notification pour accéder directement à l’écran **Revue**.

Les rappels sont planifiés sur le téléphone lui-même. Il n’existe aucun serveur de notifications push. Si vous terminez ou replanifiez une tâche sur un autre appareil (par exemple, en cochant une tâche quotidienne récurrente sur ordinateur), le téléphone met à jour ses alarmes dès que la modification y est synchronisée ; laissez donc le téléphone se synchroniser avant l’heure du prochain rappel (il suffit d’ouvrir l’application une fois).

### Autorisations

Assurez-vous que les notifications sont activées :
1. Accédez aux **Paramètres → Applications → Mindwtr** de l’appareil
2. Activez les **Notifications**
3. Autorisez les alertes et les sons selon vos préférences

### Rappels qui arrivent en retard sur Android

À partir d’Android 12, le système peut refuser l’autorisation de programmer des alarmes exactes. Sans elle, Android peut retarder les rappels ; il n’existe pas de limite d’une minute. Mindwtr affiche **Les rappels peuvent arriver en retard** dans **Paramètres → Notifications**, avec le bouton **Autoriser**. Pomodoro affiche sa propre explication sous l’interrupteur d’alerte à la fin du minuteur, avec une action pour ouvrir les paramètres Android. L’interrupteur détermine si vous recevez une alerte ; l’autorisation Android concerne sa ponctualité. Cette aide apparaît uniquement si les alertes Pomodoro sont activées et que l’autorisation manque.

Touchez **Autoriser** pour ouvrir l’écran d’autorisation Android de Mindwtr. Vous pouvez aussi y accéder par les **Paramètres → Applications → Mindwtr → Alarmes et rappels** de l’appareil. Dès que l’autorisation est accordée, Mindwtr replanifie ses rappels en alarmes exactes sans redémarrer l’application, et la ligne disparaît. Avant Android 12, la ligne n’apparaît pas, car toutes les alarmes y sont déjà exactes.

---

## Paramètres

### Général

- **Apparence** : Système, Clair, Sombre, Material 3 (clair), Material 3 (sombre), Encre électronique, Nord, Catppuccin Macchiato, Dracula, Sépia ou OLED / Minuit
- **Langue** : anglais, chinois (simplifié), chinois (traditionnel), hindi, espagnol, arabe, français, portugais (Brésil), russe, allemand, japonais, persan, vietnamien, turc, coréen, italien, polonais, néerlandais, tchèque, suédois, danois, hongrois, ukrainien

### Notifications

**Rappels de tâches :**
- Activez ou désactivez les notifications pour les échéances et les heures de début

**Résumé quotidien :**

Les résumés du matin et du soir ont leurs propres interrupteurs. Ils fonctionnent même si les **Rappels de tâches** sont désactivés ; l’autorisation de notification reste nécessaire.

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
- **Estimations de temps** : ajouter un champ de durée pour la planification par blocs de temps. L’éditeur de tâche affiche les durées standard ainsi qu’un choix **Personnalisé**, où vous saisissez la vôtre, par exemple `2h30`. Aucun réglage ne permet de choisir les durées affichées.

**Archivage automatique :**
- Déplacez automatiquement les tâches Terminées vers Archivées après un nombre défini de jours (par défaut : 7 jours). Réduire le délai archive immédiatement les tâches déjà Terminées qui dépassent désormais la nouvelle limite. Sinon la vérification a lieu à chaque démarrage de l'application, et si vous corrigez la date d'achèvement d'une tâche à une date antérieure à la limite, elle est archivée aussitôt.
- Choisissez « Jamais » pour conserver indéfiniment les tâches achevées dans la liste Terminé

**Traitement de la Boîte de réception :**
- Sur mobile, le processus de traitement de la Boîte de réception reste fondé sur des cartes
- Les mêmes paramètres partagés peuvent masquer ou afficher le raccourci des 2 minutes, l’invite demandant d’abord le projet, la section des contextes et étiquettes, la section de planification et l’option de référence

**Mise en page de l’éditeur de tâche :**
- **Ouvrir les tâches dans** décide de l’onglet qu’ouvre un appui normal sur une tâche : **Automatique** (Modifier depuis la Boîte de réception, Aperçu ailleurs), **Aperçu** ou **Modifier**. Une tâche en lecture seule s’ouvre toujours en Aperçu, et une action de modification explicite ouvre toujours Modifier. Ce choix reste sur cet appareil et n’est pas synchronisé
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
- **Exporter un CSV Mindwtr** : enregistrer un fichier de tâches pour tableur, réimportable sans doublons
- **Exporter TaskNotes** : enregistrer un Markdown par tâche dans un ZIP pour le module TaskNotes d’Obsidian
- **Importation depuis Rappels Apple** : choisissez une liste Rappels et importez les rappels incomplets dans la Boîte de réception. Les rappels importés restent dans Rappels Apple, sauf si vous activez **Supprimer les rappels importés** ; ceux qui ont déjà été importés, qui sont terminés ou qui n’ont pas de titre sont ignorés. L’interrupteur **Importer automatiquement** lance l’importation à chaque ouverture de Mindwtr.
- **Options de synchronisation des paramètres** : choisissez les préférences à synchroniser entre les appareils (thème, langue/format de date, valeurs GTD par défaut, URL de calendriers externes, paramètres de l’IA et Filtres enregistrés). Les clés d’API, les URL de points de terminaison d’IA personnalisés (y compris celui de la reconnaissance vocale), les paramètres de requête supplémentaires et les chemins de modèles locaux ne sont jamais synchronisés. Un point de terminaison personnalisé se saisit une fois sur chaque appareil.

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
- Lien vers la politique de confidentialité

---

## Voir aussi

- [Installation mobile](/fr/start/mobile-installation)
- [Raccourcis Apple](/fr/power-users/apple-shortcuts)
- [Données et synchronisation](/fr/data-sync/)
- [Le flux de travail GTD dans Mindwtr](/fr/use/gtd-workflow)
