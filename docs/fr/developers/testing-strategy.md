# Stratégie de test

Mindwtr applique une stratégie de test en plusieurs couches à `core`, aux applications propres aux plateformes et aux interfaces d’intégration.

## Objectifs

1. Protéger l’intégrité des données — synchronisation, stockage et règles de fusion
2. Détecter les régressions dans les parcours utilisateur essentiels
3. Conserver des tests rapides et déterministes dans la CI

## Couches de tests

## Cœur (`packages/core`)

- Couverture principale de la logique : synchronisation, récurrence, analyse et fonctions de stockage
- Tests unitaires rapides avec des données déterministes
- Les invariants d’intégrité des données doivent être imposés ici en priorité

## Ordinateur (`apps/desktop`)

- Tests du comportement des composants et vues avec Vitest et Testing Library
- Priorité aux vues riches en interactions et aux enveloppes d’orchestration de la synchronisation

## Mobile (`apps/mobile`)

- Tests des utilitaires et de l’orchestration
- Tests rapides des parcours critiques de synchronisation et de modification des tâches
- Le comportement de l’interface propre aux appareils repose encore en partie sur une vérification manuelle

## Cloud (`apps/cloud`)

- Tests des points de terminaison de l’API
- Validation de l’authentification, des limites de débit et des chemins
- Comportement CRUD et des points de terminaison de pièces jointes
- La couverture cible le traitement principal des requêtes, pas tous les scénarios de déploiement concurrent

## Serveur MCP (`apps/mcp-server`)

- Exactitude de la couche de requêtes : recherche, ajout, mise à jour, suppression et restauration
- Validation des entrées et comportement des transactions
- La couverture porte sur le comportement et la validation des outils, pas sur tous les flux de bout en bout entre éditeur et LLM

## Limites actuelles de la couverture

- `packages/core` possède la couverture automatisée la plus solide et doit rester la première ligne de défense contre les régressions d’intégrité.
- Les composants des vues critiques sur ordinateur sont bien couverts, mais tous les parcours d’interaction ne sont pas testés de bout en bout.
- La couverture mobile est volontairement plus légère ; accessibilité, gestes et intégrations natives nécessitent encore des essais manuels sur appareils.
- Les tests du cloud et du serveur MCP couvrent les principaux gestionnaires et chemins de validation, mais pas encore tous les cas limites de concurrence ou de déploiement en production.

## Tests prioritaires

Lors d’un ajout ou d’une modification, testez dans cet ordre :

1. exactitude des données et sémantique de fusion ;
2. chemins d’erreur, nouvelles tentatives et délais d’expiration ;
3. parcours d’interaction visible par l’utilisateur ;
4. logique sensible aux performances : recherche, synchronisation et transformation des listes.

## Liste de contrôle contre les régressions

Avant la fusion :

1. ajoutez ou mettez à jour les tests du comportement modifié ;
2. exécutez localement les tests des paquets concernés ;
3. exécutez les tests plus larges de l’espace de travail si plusieurs paquets sont touchés ;
4. vérifiez l’absence de couplage d’instantanés ou d’état entre les tests.

## Règles pratiques

1. Préférez des horodatages et données déterministes à l’heure réelle.
2. Évitez les dépendances réseau dans les tests unitaires.
3. Limitez chaque test à un comportement.
4. Utilisez les tests d’intégration aux frontières des flux, pas pour chaque branche.
5. Traitez les tests instables comme des bogues et corrigez rapidement leur cause.
6. Lorsqu’un bogue propre à une plateforme est corrigé sans automatisation solide, documentez les étapes de vérification manuelle dans la pull request.

## Documentation associée

- [Guide du développeur](/fr/developers/developer-guide)
- [Architecture](/fr/developers/architecture)
- [Algorithme de synchronisation](/fr/data-sync/sync-algorithm)
- [Données et synchronisation](/fr/data-sync/)
