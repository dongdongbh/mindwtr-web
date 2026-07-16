# Intégration du calendrier (paysage fixe et souple)

Mindwtr prend en charge l’intégration du calendrier dans les deux sens : la lecture de calendriers externes dans le planificateur et l’envoi des tâches Mindwtr vers un calendrier inscriptible de l’appareil lorsque la plateforme en propose un.

- **Mobile (iOS/Android) :** calendriers de l’appareil déjà exposés par le système, URL d’abonnement ICS et envoi unidirectionnel de Mindwtr vers le calendrier de l’appareil
- **Ordinateur (macOS) :** Calendrier Apple via EventKit pour la lecture et l’envoi unidirectionnel de tâches, ainsi que les URL d’abonnement ICS
- **Ordinateur (Linux/Windows) et Web :** URL d’abonnement ICS

## Concepts

- **Paysage fixe** : réunions et cours provenant de calendriers externes.
- **Paysage souple** : tâches Mindwtr planifiées avec `startTime` et `timeEstimate`.
- Le calendrier est une **surface de planification** qui permet d’organiser les tâches existantes et de créer des tâches planifiées lorsque le contexte du calendrier est le moyen le plus rapide de le faire.

## Sémantique GTD

- **`dueDate`** = Échéance (engagements fermes).
- **`startTime`** = Pense-bête/début planifié (engagements souples).
- **`timeEstimate`** = Durée suggérée lors de la planification.

## Vues

- **Vue Jour** : grille horaire avec les tâches planifiées, les échéances et les événements externes.
- **Vue Semaine** : grille de planification sur sept jours pour parcourir la semaine de travail en cours.
- **Vue Mois** : vue d’ensemble avec des repères pour les échéances, les tâches planifiées et les événements.
- **Vue Planning** : liste glissante sur 60 jours des échéances, tâches planifiées et événements externes à venir.

Sur ordinateur, l’état actuel du calendrier est reflété dans l’URL :

- `calendarView` : `day`, `week`, `month` ou `schedule`
- `calendarDate` : la date sélectionnée, lorsqu’un jour est sélectionné
- `calendarMonth` : le mois affiché dans le calendrier

Vous pouvez ainsi ajouter aux favoris ou partager une fenêtre de planification précise, par exemple une vue Semaine pour le sprint en cours ou une vue Planning pour les deux prochains mois.

## Tâches Mindwtr récurrentes

Les tâches Mindwtr récurrentes sont générées sous forme d’instances de tâche et non comme une série de calendrier développée :

- Le calendrier affiche l’instance de tâche active lorsqu’elle possède une date d’échéance ou une heure de début planifiée.
- Par défaut, Mindwtr ne préremplit pas le calendrier avec les occurrences futures d’une tâche. La prochaine véritable instance de tâche n’est créée que lorsque la tâche récurrente actuelle est terminée.
- Si **Afficher la prochaine occurrence dans le calendrier** est activé pour une tâche récurrente, le calendrier peut afficher un aperçu de planification de la prochaine occurrence. Cet aperçu n’est pas une véritable tâche, et l’envoi vers le calendrier sur mobile/macOS l’inscrit comme un événement unique normal, et non comme un événement récurrent natif.
- **Strict** conserve la cadence fixe de la planification. Une tâche mensuelle due le 1er reste ancrée à ce cycle prévu, mais Mindwtr ne crée toujours qu’une seule instance suivante à chaque achèvement au lieu de remplir tous les mois futurs.
- **Répéter après l’achèvement** calcule l’instance suivante à partir du moment où vous terminez l’instance actuelle. Par exemple, une habitude mensuelle simple terminée le 15 sera planifiée à partir du 15 la fois suivante.
- L’envoi vers le calendrier sur mobile et macOS reproduit ces instances de tâche concrètes. Il n’exporte pas les règles de récurrence de Mindwtr sous forme d’événements récurrents natifs du calendrier.

## Flux de planification

Sur ordinateur :

1. Choisissez une date ou ouvrez un créneau horaire.
2. Choisissez **Nouveau** pour créer une tâche planifiée, ou **Existant** pour planifier une tâche qui ne l’est pas encore.
3. Définissez les heures de début et de fin. Mindwtr vérifie le créneau par rapport aux tâches planifiées et aux événements externes visibles.
4. Enregistrez la tâche, ou modifiez ses horaires plus tard depuis l’éditeur de tâche, la vue Jour ou la liste du jour sélectionné.

Sur les mises en page larges pour ordinateur, **Planifier les prochaines actions** répertorie les prochaines actions non planifiées pour le jour sélectionné, y compris celles qui ont une échéance mais ne sont pas planifiées. Utilisez cette liste pour placer une prochaine action dans le calendrier sans ouvrir la recherche. Les dates d’échéance restent des échéances ; la planification ajoute un `startTime`.

Le panneau de planification peut être replié lorsque vous souhaitez que la grille du calendrier occupe toute la largeur. Dépliez-le de nouveau lorsque vous voulez parcourir le travail disponible pour la date sélectionnée.

Sur mobile :

1. Ouvrez **Calendrier -> Planifier les tâches** depuis la vue Jour.
2. Sélectionnez une tâche existante.
3. Mindwtr trouve le premier créneau libre de la journée en évitant les événements externes visibles et les tâches planifiées.

Utilisez le panneau de planification mobile de la même façon : il sert à choisir un travail non planifié pendant que vous consultez déjà la journée, puis à lui attribuer une heure de début précise.

Mindwtr utilise `timeEstimate` comme durée par défaut lorsqu’elle est disponible. En cas de conflit, choisissez une autre heure ou réduisez la durée.

## Calendriers externes

### Matrice de prise en charge

Pris en charge actuellement :

| Plateforme | Fonctionnalité de calendrier prise en charge | Remarques |
| --- | --- | --- |
| Mobile iOS/Android | Envoyer les tâches Mindwtr vers un calendrier de l’appareil | Android est vérifié avec Google Agenda. Sur iOS, utilisez les calendriers déjà disponibles dans Calendrier Apple/EventKit. |
| Mobile iOS/Android | Lire les calendriers de l’appareil | Lit les calendriers déjà exposés par la base de données de calendrier de l’appareil après l’octroi de l’autorisation. |
| Mobile iOS/Android | URL directes d’abonnement ICS | L’URL doit renvoyer des données iCalendar brutes. |
| Ordinateur macOS | Lire les comptes Calendrier Apple | Lit les événements via EventKit sur macOS après l’octroi de l’autorisation. Cela comprend les calendriers synchronisés avec Calendrier Apple, comme iCloud, Google et Exchange. |
| Ordinateur macOS | Envoyer les tâches Mindwtr vers Calendrier Apple | Inscrit les tâches Mindwtr planifiées ou arrivant à échéance dans un calendrier Apple inscriptible sélectionné via EventKit. |
| Ordinateur et Web | URL directes d’abonnement ICS | L’URL doit renvoyer des données iCalendar brutes. |

Non pris en charge actuellement :

- Les comptes de calendrier natifs sur ordinateur Linux.
- Les comptes de calendrier natifs sur ordinateur Windows.
- La connexion à un compte CalDAV, la découverte du serveur ou la découverte de comptes propre à DAVx5.
- OAuth d’un fournisseur de calendrier dans Mindwtr, par exemple la connexion à Google, Microsoft ou Nextcloud depuis Mindwtr.
- Les URL authentifiées/privées qui renvoient `HTTP 401`, sauf si le secret est déjà intégré dans l’URL par le fournisseur du calendrier.
- Les URL de pages web de calendrier, y compris les pages de partage publiques qui renvoient du HTML au lieu de données `.ics` brutes.
- La modification d’événements de calendriers externes depuis Mindwtr.
- La synchronisation des événements de calendriers externes via la synchronisation Mindwtr. Les événements externes sont récupérés et mis en cache localement.
- La synchronisation bidirectionnelle entre tâches et calendrier. Les événements de calendrier envoyés sont générés à partir des tâches Mindwtr.
- L’exportation des règles de tâches récurrentes sous forme d’événements récurrents natifs du calendrier.

### Visibilité

La visibilité des calendriers externes est une préférence d’affichage locale :

- Les abonnements aux calendriers externes synchronisés dans les paramètres suivent vos paramètres de synchronisation.
- L’état affiché/masqué de chaque calendrier dans la vue Calendrier est enregistré sur l’appareil actuel.
- Les calendriers masqués restent disponibles dans les Paramètres ; ils sont simplement exclus de la surface de planification visible et de la vérification des créneaux libres sur cet appareil.

### Mobile : envoyer les tâches Mindwtr vers le calendrier

Sur iOS et Android, Mindwtr peut envoyer les tâches planifiées et celles ayant une date d’échéance vers un calendrier sélectionné de l’appareil :

- Les tâches avec un `startTime` horaire deviennent des événements horaires. `timeEstimate` est utilisé comme durée de l’événement lorsqu’il est disponible.
- Les tâches avec un `startTime` sans heure ou uniquement un `dueDate` deviennent des événements sur toute la journée.
- Les tâches terminées, archivées, de référence ou supprimées sont retirées du calendrier cible.
- Mindwtr conserve le titre des tâches lors de l’envoi vers un calendrier `Mindwtr` dédié. Si vous choisissez un calendrier partagé comme cible, le titre des événements envoyés est préfixé par `Mindwtr: ` afin qu’ils restent reconnaissables parmi les événements ordinaires.
- La description des tâches devient la note des événements, et l’emplacement des tâches devient celui des événements.
- Si vous choisissez un calendrier dédié nommé `Mindwtr`, l’application de calendrier peut afficher les éléments Mindwtr avec la couleur propre à ce calendrier.

Configuration :

1. Ouvrez **Paramètres → Calendrier**
2. Activez **Envoyer les tâches vers le calendrier**
3. Accordez l’autorisation d’accès au calendrier
4. Dépliez **Cible de synchronisation**
5. Choisissez où Mindwtr doit inscrire les événements

Choix de la cible :

- **Calendrier de compte dédié** : idéal pour Google Agenda sur Android ou iCloud/Calendrier Apple sur iOS. Créez un calendrier nommé `Mindwtr` dans ce compte, puis sélectionnez la cible dédiée.
- **Calendrier de compte partagé** : inscrit les événements dans un calendrier de compte existant et préfixe leur titre par `Mindwtr: `.
- **Calendrier local dédié** : reste sur l’appareil actuel. Certaines applications de calendrier Android masquent les calendriers locaux, et les cibles locales n’apparaissent pas sur calendar.google.com ni dans d’autres applications web de calendrier liées à un compte.
- **Calendrier local partagé** : inscrit les événements uniquement dans un calendrier local de l’appareil.

#### Android : configuration de Google Agenda

Pour utiliser un calendrier `Mindwtr` distinct associé à Google sur Android :

1. Ouvrez Google Agenda sur le Web.
2. Créez un calendrier nommé `Mindwtr` dans le même compte Google que celui utilisé sur Android.
3. Sur Android, ouvrez Google Agenda et actualisez le compte. Vérifiez que la synchronisation de l’agenda est activée dans les paramètres de compte Android.
4. Dans l’application Google Agenda pour Android, activez **Partager les données de Google Agenda avec d’autres applications** afin qu’Android expose les calendriers Google à Mindwtr.
5. Revenez dans **Paramètres → Calendrier** de Mindwtr, touchez **Actualiser les calendriers**, puis sélectionnez la cible `Mindwtr` qui affiche votre compte Google.

Si le calendrier `Mindwtr` associé à Google n’apparaît pas encore dans Mindwtr, Android ne l’a pas exposé via le fournisseur de calendrier du système. Actualisez Google Agenda, vérifiez la synchronisation du compte Android, activez **Partager les données de Google Agenda avec d’autres applications** dans Google Agenda, puis touchez **Actualiser les calendriers** dans Mindwtr.

#### iOS : configuration de Calendrier Apple

Pour utiliser une cible Calendrier Apple distincte sur iPhone ou iPad :

1. Ouvrez Calendrier Apple.
2. Créez un calendrier nommé `Mindwtr`. Utilisez iCloud si vous souhaitez que les événements apparaissent sur d’autres appareils Apple, ou un calendrier local s’ils doivent rester sur l’appareil.
3. Si vous utilisez iCloud, vérifiez que la synchronisation du calendrier est activée dans **Réglages -> Compte Apple -> iCloud -> Calendrier** sur iOS.
4. Ouvrez **Paramètres -> Calendrier** dans Mindwtr.
5. Activez **Envoyer les tâches vers le calendrier** et accordez l’autorisation d’accès au calendrier.
6. Dépliez **Cible de synchronisation**, touchez **Actualiser les calendriers**, puis choisissez la cible `Mindwtr` de Calendrier Apple.
7. Dans Calendrier Apple, ouvrez la liste des calendriers et vérifiez que le calendrier `Mindwtr` sélectionné est visible.

Si le calendrier `Mindwtr` n’apparaît pas dans la liste des cibles, vérifiez d’abord qu’il est visible dans Calendrier Apple, puis revenez dans Mindwtr et touchez **Actualiser les calendriers**.

### Mobile : lire les calendriers de l’appareil

Sur mobile, Mindwtr peut lire les calendriers depuis la base de données de calendrier de l’appareil :

- **Android :** via le fournisseur de calendrier Android. Si une application de synchronisation n’expose pas les calendriers par l’intermédiaire de ce fournisseur, Mindwtr ne peut pas les voir.
- **iOS :** via les calendriers système adossés à EventKit, comme iCloud, Google, Exchange et Outlook, une fois ceux-ci activés dans les Réglages d’iOS.

Configuration :

1. Ouvrez **Paramètres → Calendrier**
2. Activez **Calendriers de l’appareil**
3. Accordez l’autorisation d’accès au calendrier
4. Dépliez **Calendriers de l’appareil**
5. Choisissez les calendriers de l’appareil à afficher

Mindwtr reste en lecture seule et n’effectue pas d’authentification OAuth auprès des fournisseurs des calendriers sources.

Mindwtr masque ses propres calendriers `Mindwtr` cibles dans la liste de lecture afin d’éviter d’importer des copies des événements qu’il a créés.

### macOS : intégration à Calendrier Apple

Sur macOS, Mindwtr peut lire les événements de Calendrier Apple et envoyer les tâches Mindwtr planifiées ou arrivant à échéance via EventKit :

1. Ouvrez **Paramètres -> Calendrier**
2. Demandez l’accès à Calendrier Apple
3. Autorisez Mindwtr dans **Réglages Système -> Confidentialité et sécurité -> Calendriers** sur macOS
4. Activez **Envoyer les tâches vers le calendrier** si vous souhaitez que les tâches Mindwtr soient inscrites dans Calendrier Apple
5. Choisissez un calendrier `Mindwtr` dédié ou une autre cible de calendrier inscriptible

Cela fonctionne uniquement pour les calendriers déjà visibles dans Calendrier Apple. Linux et Windows ne disposent actuellement d’aucune intégration native aux comptes de calendrier sur ordinateur.

### Ordinateur/Web : URL ICS

1. Ouvrez **Paramètres → Calendrier**
2. Ajoutez votre **URL ICS**
3. Actualisez pour récupérer les événements

Les événements sont mis en cache sur l’appareil et ne sont pas synchronisés par la synchronisation Mindwtr.

### Exigences relatives aux URL ICS

Mindwtr attend de l’URL qu’elle récupère le texte iCalendar brut. Un flux fonctionnel :

- commence généralement par `BEGIN:VCALENDAR`
- possède une URL se terminant par `.ics` ou un lien explicite d’abonnement/exportation fourni par le fournisseur de calendrier
- peut être récupéré sans page de connexion interactive ni en-têtes supplémentaires

Exemples courants :

- Google Agenda : utilisez l’**Adresse secrète au format iCal** privée.
- Calendrier Nextcloud : utilisez le lien d’abonnement/exportation `.ics` du calendrier, et non l’URL de la page publique du calendrier.

Si Mindwtr affiche `HTTP 401`, le serveur demande une authentification. Les invites de nom d’utilisateur/mot de passe, la connexion CalDAV et les en-têtes de jeton porteur ne sont pas pris en charge pour les URL de calendrier. Utilisez plutôt l’URL secrète d’abonnement iCalendar du fournisseur.

Si une URL ouvre une page web ordinaire dans un navigateur, il ne s’agit probablement pas du flux ICS. Copiez l’URL d’abonnement/exportation depuis cette page.

### Calendriers privés (Google Agenda)

Vous n’avez **pas** besoin de rendre votre calendrier public. Utilisez plutôt l’« Adresse secrète » privée :

1. Ouvrez Google Agenda sur le Web → **Paramètres**.
2. Sélectionnez le calendrier dans la barre latérale gauche.
3. Dans **Intégrer le calendrier**, copiez l’**Adresse secrète au format iCal**.
4. Collez cette URL dans Mindwtr.

Ce lien agit comme un mot de passe : seules les applications qui le possèdent peuvent voir les événements, tandis que le calendrier reste privé.

## Remarques

- Sur ordinateur et mobile, le Calendrier peut créer une tâche Mindwtr distincte à partir d’un événement externe. Mindwtr copie le titre, la date/l’heure, l’emplacement, la description et le nom du calendrier de l’événement lorsqu’ils sont disponibles.
- Les calendriers externes sont en **lecture seule** dans Mindwtr. Créer une tâche à partir d’un événement ne modifie pas l’événement d’origine.
- Les événements ICS récurrents prennent en charge `FREQ=DAILY`, `WEEKLY`, `MONTHLY` et `YEARLY`, y compris `INTERVAL`, `COUNT`, `UNTIL`, `BYDAY`, `BYMONTH` et `BYMONTHDAY` pour les modèles que Mindwtr peut développer dans la plage visible.
- Les événements annuels sur toute la journée et les règles annuelles comme `FREQ=YEARLY;COUNT=...` ou `FREQ=YEARLY;BYMONTH=1;BYDAY=3MO` sont développés dans la fenêtre de calendrier visible.
- Les dates d’exception et les substitutions de récurrence comme `EXDATE`, `RDATE` et `RECURRENCE-ID` ne sont pas développées actuellement.
- Les événements récurrents comportant `RRULE:...;COUNT=...` s’arrêtent une fois leur décompte d’origine atteint. Si vous voyiez auparavant de très anciens événements récurrents, réimportez-les après la mise à jour vers v0.4.9+.
