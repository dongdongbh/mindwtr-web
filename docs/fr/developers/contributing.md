# Contribuer

Mindwtr accueille les contributions ciblées qui respectent son orientation GTD et locale.

Utilisez le guide correspondant au dépôt que vous souhaitez modifier :

- [Guide de contribution au site et à la documentation](https://github.com/dongdongbh/mindwtr-web/blob/main/CONTRIBUTING.md)
- [Guide de contribution à l’application et à l’interface](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)

## Bonnes premières contributions

- Clarifier une page de documentation déroutante
- Corriger une instruction erronée ou obsolète
- Traduire une section cohérente de la documentation
- Ajouter un exemple testé à un flux existant

## Contraintes du produit

Avant de proposer une modification, confrontez-la à ces contraintes :

- aucun compte requis pour l’utilisation principale ;
- fonctionnement local par défaut ;
- cohérence des concepts GTD ;
- IA et automatisation facultatives ;
- modes de synchronisation choisis par l’utilisateur.

## Flux de contribution à la documentation

1. Ouvrez un ticket avant de commencer une nouvelle langue ou de réorganiser une section.
2. Modifiez la source sous `docs/` dans le [dépôt mindwtr-web](https://github.com/dongdongbh/mindwtr-web).
3. Limitez chaque pull request à un guide, une section ou une langue.
4. Exécutez `bun run check` depuis la racine du dépôt.
5. Indiquez dans la pull request les pages et langues modifiées.

## Modifications de la documentation

Rédigez en fonction de l’intention de l’utilisateur. Préférez des pages comme « Importer depuis TickTick » ou « Synchronisation WebDAV » à un long inventaire de fonctions.

La documentation publique destinée aux utilisateurs et aux développeurs se trouve sous `docs/` et est publiée sur https://docs.mindwtr.app/. Conservez les documents de processus, ADR et notes de version dans la [documentation du dépôt de l’application](https://github.com/dongdongbh/Mindwtr/tree/main/docs). Le wiki GitHub est retiré et n’accepte plus de nouvelles pages.

Le guide de contribution au site définit les langues prises en charge, le déploiement des traductions, les sources terminologiques, les règles de repli des liens et les vérifications des pull requests.

L’anglais est la source des documentations complètes en allemand, espagnol, français, chinois simplifié et chinois traditionnel. Les responsables utilisent des agents de programmation spécialisés par langue pour mettre à jour chaque ensemble Markdown statique, puis exécutent les vérifications communes de compilation et de liens. Si une traduction vous semble incorrecte, utilisez le lien de modification de la page ou ouvrez un ticket avec le texte corrigé.

## Licence

Mindwtr est sous licence AGPL-3.0. Les contributions sont acceptées sous la même licence.
