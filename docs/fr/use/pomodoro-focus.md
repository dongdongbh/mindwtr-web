# Focus Pomodoro

Mindwtr propose un minuteur Pomodoro facultatif dans la vue **Focus** sur ordinateur et mobile.

Cette fonction est **désactivée** par défaut pour préserver une vue Focus minimale et sans distraction.

---

## Activer Pomodoro

### Ordinateur
1. Ouvrez **Paramètres**.
2. Accédez à **GTD**.
3. Activez **Minuteur Pomodoro** sous **Fonctionnalités**.
4. Ouvrez la vue **Focus**.

### Mobile
1. Ouvrez **Menu → Paramètres**.
2. Accédez à **GTD**.
3. Activez **Minuteur Pomodoro** sous **Fonctionnalités**.
4. Ouvrez l’onglet **Focus**.

---

## Fonctionnement

- Choisissez éventuellement une **Tâche du minuteur** parmi vos candidates Focus, ou laissez **Minuteur seul**.
- Choisissez un préréglage : `15/3`, `25/5`, `50/10` ou un préréglage personnalisé facultatif défini dans **Paramètres → GTD**.
- Lancez votre session de concentration.
- À la fin d’une session, Mindwtr passe en pause et s’arrête pour vous laisser la démarrer volontairement.
- À la fin d’une pause, il revient à la phase de concentration.

L’association à une tâche est facultative et désactivée par défaut. Activez **Paramètres → GTD → Minuteur Pomodoro → Lier le minuteur à une tâche** pour afficher le sélecteur et l’action **Marquer la tâche comme terminée** dans Focus.

Sur ordinateur, le panneau peut se replier : le chevron de son en-tête le réduit à une fine ligne qui n’affiche que le temps restant et la phase, sans arrêter le minuteur. Cet état est mémorisé et le bouton de lecture d’une tâche rouvre le panneau.

Commandes :

- **Minuteur :** Démarrer/Pause, Réinitialiser et Changer de phase
- **Mise à jour de la tâche :** Marquer la tâche comme terminée

Le sélecteur détermine la tâche éventuellement associée au panneau. Les commandes du minuteur agissent sur le minuteur. **Marquer la tâche comme terminée** n’est disponible que si une tâche est liée ; elle passe alors à Terminé et quitte les priorités du jour.

## Temps passé

Les tâches proposent une valeur facultative **Temps passé** à côté de l’Estimation du temps dans l’éditeur. Cette fonction nécessite la v1.1.0 ou une version ultérieure ; les versions antérieures comme la v1.0.5 ne la possèdent pas.

Le Temps passé est facultatif et désactivé par défaut : ses éléments n’apparaissent que si **Minuteur Pomodoro** et **Lier le minuteur à une tâche** sont tous deux activés. Cela concerne le champ de l’éditeur sur ordinateur et mobile, ainsi que le badge et le bouton de démarrage rapide dans les lignes de tâches sur ordinateur. Désactivez-les et aucune information temporelle n’apparaît ; les valeurs enregistrées sont conservées et réapparaissent à la réactivation. Masquer l’Estimation du temps dans la disposition de l’éditeur masque également le Temps passé.

- Chaque session de concentration terminée et liée à une tâche ajoute ses minutes au total de cette tâche.
- Vous pouvez aussi définir ou corriger le total dans l’éditeur.
- Les tâches ayant du temps enregistré affichent un petit badge dans les listes sur ordinateur ; le total se synchronise comme les autres champs.

Il n’existe volontairement ni journal par session, ni écran de rapports, ni chronomètre libre. Le total est un nombre unique par tâche. Pour produire des rapports externes, lisez `timeSpentMinutes` avec l’API cloud ou le serveur MCP.

## Démarrer une session depuis une tâche sur ordinateur

Lorsque Pomodoro et **Lier le minuteur à une tâche** sont activés, survoler une ligne de tâche affiche un bouton de lecture :

- cliquez dessus pour associer la tâche et lancer immédiatement une session, sans chercher dans le menu ;
- le bouton indique aussi le nombre de sessions terminées pour cette tâche.

---

## Focus et Prochaines actions

La vue **Focus** n’est pas une copie exacte de toute la liste des Prochaines actions. C’est un tableau de bord d’engagement :

- **Priorités du jour :** tâches choisies explicitement pour aujourd’hui, dans la limite configurée
- **Aujourd’hui :** prochaines tâches dues aujourd’hui, en retard ou commençant aujourd’hui
- **Prochaines actions :** tâches suivantes actuellement disponibles
- **Revue due :** éléments En attente ou différés qui réclament votre attention

Focus masque volontairement les tâches dont le début est futur et les tâches ultérieures des projets séquentiels. La vue reste ainsi limitée au travail réalisable maintenant. Utilisez **Contextes**, **Projets** ou **Recherche** pour examiner un inventaire plus large, y compris les tâches futures.

---

## Quand l’utiliser

- Lorsque vous souhaitez un minuteur léger sans quitter le flux GTD de Focus.
- Laissez-le désactivé si vous préférez une vue Focus uniquement composée de listes.
- Considérez-le comme une aide pour accomplir la prochaine action, pas comme un système de planification distinct.

## Méthodes pratiques

- Utilisez `15/3` pour vider la boîte de réception, les petites tâches administratives ou pour vous débloquer.
- Utilisez `25/5` comme rythme quotidien pour les prochaines actions ordinaires.
- Utilisez `50/10` pour le travail de fond lorsque la tâche est assez claire pour commencer.
- Créez un préréglage personnalisé si vous avez besoin d’un autre rythme, mais restez simple.
- N’utilisez **Marquer la tâche comme terminée** que lorsque la tâche liée l’est réellement ; sinon, mettez en pause ou changez de phase.

---

## Remarques

- Pomodoro peut fonctionner comme simple minuteur ou être lié à une tâche pour la terminer depuis le panneau.
- Le panneau est volontairement facultatif afin que la page Focus puisse rester épurée.
- Les préréglages intégrés restent fixes et simples. Mindwtr n’ajoute qu’un préréglage personnalisé facultatif pour éviter de transformer Focus en écran de personnalisation du minuteur.
