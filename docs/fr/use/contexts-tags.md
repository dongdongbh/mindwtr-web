# Contextes et tags

Les contextes vous aident à voir ce que vous pouvez faire **dès maintenant** selon l’endroit où vous êtes, les outils dont vous disposez ou l’état d’esprit nécessaire.

---

## Que sont les contextes ?

Dans GTD, un contexte est une condition nécessaire pour accomplir une tâche : un lieu, un outil ou une personne.

Lorsque vous filtrez par contexte, vous ne voyez que les tâches que vous pouvez réellement effectuer dans votre situation actuelle.

## Contextes et domaines

C’est l’un des concepts GTD les plus faciles à confondre au début.

| Concept | Question à laquelle il répond | Change souvent ? | Exemples |
| ----------- | --------------------------------------------------- | -------------- | ----------------------------- |
| **Contexte** | Que puis-je faire maintenant, là où je suis, avec ce dont je dispose ? | Oui | `@computer`, `@phone`, `@home` |
| **Domaine** | À quelle responsabilité continue cela appartient-il ? | Non | Travail, Maison, Santé, Finances |

La différence essentielle :

- Les **contextes** concernent les *contraintes d’exécution*. Ils changent au fil de la journée.
- Les **domaines** sont des *catégories de responsabilités*. Ils persistent aussi longtemps que cette partie de votre vie ou de votre travail existe.

### Exemple : travail pour un prestataire ou un client

Si vous travaillez avec plusieurs clients, utiliser un **Domaine** pour chacun d’eux peut être tout à fait pertinent.

- **Domaine :** Client A
- **Projet :** Migration du back-end
- **Tâche :** Examiner la spécification de l’API
- **Contexte :** `@computer`

Vous pouvez ainsi répondre à deux questions différentes :

- Filtrez par **Domaine** lorsque vous souhaitez voir tout ce qui concerne un client.
- Filtrez par **Contexte** lorsque vous souhaitez voir ce que vous pouvez faire maintenant, quel que soit le client.

Pour créer ou modifier directement les domaines, consultez [Domaines et personnes](/fr/use/areas-people).

---

## Contextes de lieu (@)

Mindwtr propose les contextes de lieu prédéfinis suivants :

| Contexte | À utiliser pour |
| ----------- | ---------------------------------------- |
| `@home` | Tâches qui nécessitent d’être à la maison |
| `@work` | Tâches pour le bureau ou le lieu de travail |
| `@errands` | Tâches à effectuer lors de vos déplacements (achats, rendez-vous) |
| `@agendas` | Points à aborder lors de réunions ou d’appels |
| `@computer` | Tâches nécessitant un ordinateur |
| `@phone` | Tâches nécessitant des appels téléphoniques |
| `@anywhere` | Tâches sans contrainte de lieu |

### Exemples

- `Appeler maman @phone`
- `Réparer le robinet qui fuit @home`
- `Acheter des fournitures de bureau @errands`
- `Déployer la mise à jour @computer @work`

---

## Tags (#)

Mindwtr propose des tags pour filtrer selon l’état d’esprit, le mode de travail ou le sujet :

| Tag | À utiliser pour |
| ------------ | --------------------------------- |
| `#focused` | Travail approfondi qui demande de la concentration |
| `#lowenergy` | Tâches simples pour les moments de fatigue |
| `#creative` | Réflexion ou génération d’idées |
| `#routine` | Tâches répétitives ou mécaniques |

### Exemples

- `Rédiger la proposition #focused @computer`
- `Classer les reçus #lowenergy @home`
- `Trouver des idées de campagne #creative`
- `Traiter les dépenses #routine @computer`

### Pourquoi des tags ?

Votre productivité varie au fil de la journée :
- **Matin :** forte concentration, attaquez les tâches #focused
- **Après le déjeuner :** peu d’énergie, effectuez les tâches #lowenergy ou #routine
- **Temps créatif :** lorsque l’inspiration vient, travaillez sur les tâches #creative

---

## Utiliser les contextes dans Mindwtr

### Ajouter des contextes

**Syntaxe d’ajout rapide :**
```
Titre de la tâche @context1 @context2
Rechercher le sujet #focused @computer
```
Les noms de contextes et de tags acceptent les lettres et chiffres Unicode (y compris les caractères CJK et accentués).

**Modifier une tâche :**
1. Ouvrez l’éditeur de tâche
2. Ajoutez les contextes dans le champ Contextes (séparés par des virgules)

### Filtrer par contexte

**Ordinateur :**
1. Accédez à la vue **Prochaines actions** ou **Contextes**
2. Cliquez sur une pastille de contexte pour filtrer

**Mobile :**
1. Accédez à l’onglet **Prochaines actions** ou à **Contextes** depuis le tiroir
2. Touchez un contexte pour filtrer

### Regrouper par contexte ou par tag

Les barres d’outils des listes de tâches comportent également une commande **Grouper**. Utilisez-la pour regrouper les listes par contexte, domaine, projet ou tag lorsque vous parcourez une grande liste Boîte de réception, En attente, Un jour/Peut-être, Référence, Terminées ou Prochaines actions.

Le regroupement par tag est utile si vous préférez un flux de travail centré sur les tags et les utilisez comme couche de classification principale.

---

## Contextes personnalisés

Vous pouvez créer vos propres contextes :

- `@Bob` : points à aborder avec Bob
- `@waiting-on-vendor` : en attente d’une réponse du fournisseur
- `@car` : choses à faire dans la voiture
- `@morning` : éléments de la routine matinale

### Créer des contextes personnalisés

Saisissez simplement le nouveau contexte lorsque vous ajoutez une tâche :
```
Examiner le contrat @legal
```

Le contexte sera ajouté et pourra être utilisé comme filtre.

### Gérer les contextes et les tags enregistrés

Lorsque vous souhaitez nettoyer ou renommer des métadonnées réutilisables :

- Ouvrez **Paramètres → Gérer**
- Modifiez les **Contextes**, **Tags**, **Domaines** et **Personnes** au même endroit
- Utilisez cette page pour fusionner les doublons, uniformiser les noms ou supprimer les valeurs dont vous ne vous servez plus

Les domaines et les personnes peuvent également être créés au moment de leur attribution. Saisissez un nom dans le sélecteur **Domaine** ou le champ **Assigné à**, puis choisissez **Créer** ou **Nouvelle personne** lorsqu’aucune correspondance exacte n’existe.

### Modifier les contextes en masse

Sur ordinateur, vous pouvez mettre à jour les contextes de nombreuses tâches en une seule fois :

1. Passez en mode **Sélectionner** dans une vue de liste
2. Choisissez les tâches à modifier
3. Utilisez **Ajouter un contexte** ou **Supprimer un contexte** dans la barre d’actions groupées

C’est utile pour reclasser tout un lot de tâches après une revue hebdomadaire ou une session de planification de projet.

---

## Contextes et tags hiérarchiques

Organisez les contextes dans une structure imbriquée à l’aide de la notation avec barre oblique :

| Syntaxe | Exemple de tâche |
| ----------------- | --------------------------- |
| `@work/meetings` | Préparer la réunion @work/meetings |
| `@home/garage` | Réparer l’étagère @home/garage |
| `#health/fitness` | Course matinale #health/fitness |
| `#work/admin` | Classer les rapports #work/admin |

### Le filtre parent inclut les enfants

Lorsque vous filtrez par contexte parent, tous ses enfants sont inclus :

| Filtre | Affiche |
| --------- | -------------------------------------------- |
| `@work` | `@work`, `@work/meetings`, `@work/calls` |
| `#health` | `#health`, `#health/fitness`, `#health/diet` |

Cela permet de filtrer à un niveau général tout en conservant une organisation précise.

### Avantages

- **Organisation** : regroupez les contextes liés sans encombrer l’affichage
- **Souplesse** : filtrez de manière générale ou précise
- **Rétrocompatibilité** : les contextes simples continuent de fonctionner normalement

---

## Bonnes pratiques pour les contextes

### Commencer simplement

Commencez avec quelques contextes seulement :
- @home
- @work
- @errands
- @computer

N’en ajoutez que lorsque c’est nécessaire.

### Rester cohérent

Utilisez toujours la même orthographe et le même format :
- ✓ `@home` (toujours)
- ✗ `@Home`, `@house`, `home`

### Combiner les contextes

Les tâches peuvent avoir plusieurs contextes :
- `@computer @work` : nécessite un ordinateur au travail
- `@phone @anywhere` : appel téléphonique depuis n’importe où
- `#focused @home` : travail approfondi à la maison

### Contextes de personnes

Ajoutez des contextes de personnes pour les points à aborder :
```
Discuter du calendrier du projet @Sarah
Poser une question sur le budget @manager
```

Lorsque vous voyez Sarah, recherchez `@Sarah` pour retrouver tous ces éléments.

---

## Flux de travail avec les contextes

### Planification du matin

1. Vérifiez où vous serez aujourd’hui
2. Filtrez les Prochaines actions selon le contexte pertinent
3. Choisissez les tâches sur lesquelles vous concentrer

### Changement de lieu

Lorsque vous changez de lieu :
1. Filtrez avec le nouveau contexte (@work → @home)
2. Voyez ce que vous pouvez faire ici
3. Choisissez la prochaine tâche

### Interaction imprévue

Lorsqu’une personne vous appelle ou vous rend visite à l’improviste :
1. Recherchez son nom ou son contexte
2. Passez en revue les points à aborder
3. Traitez les éléments en attente

---

## Contextes et tags

Dans Mindwtr, `@contexts` et `#tags` permettent tous deux de filtrer les tâches, mais ils répondent à des questions différentes :

| Symbole | Question à laquelle il répond | Usage courant | Exemples |
| ------ | ----------------------------- | ------------------------------------ | -------------------------- |
| `@` | Où ou avec quoi puis-je le faire ? | Contrainte de lieu, d’outil ou de personne | @home, @work, @phone |
| `#` | De quoi s’agit-il ? | Sujet, énergie, mode ou étiquette | #focused, #lowenergy |

### Conseils pratiques

- Utilisez les **contextes `@`** comme *filtres d’exécution* (les lieux, outils ou personnes nécessaires).
- Utilisez les **tags `#`** pour la *catégorisation* (niveau d’énergie, sujet ou regroupement entre projets).
- Les deux prennent en charge les **hiérarchies** (par exemple, `@work/meetings`, `#health/fitness`).

---

## Voir aussi

- [Flux GTD dans Mindwtr](/fr/use/gtd-workflow)
- [Domaines et personnes](/fr/use/areas-people)
- [Guide d’utilisation sur ordinateur](/fr/use/desktop)
- [Guide d’utilisation sur mobile](/fr/use/mobile)
