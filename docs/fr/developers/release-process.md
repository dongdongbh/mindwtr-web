# Processus de publication

Cette page décrit, à un niveau pratique, le processus normal de publication de Mindwtr. Elle est destinée aux mainteneurs travaillant depuis le dépôt.

---

## Fichiers sources

L'automatisation des publications et les métadonnées de version sont principalement regroupées dans :

- `scripts/bump-version.sh`
- `scripts/update-versions.js`
- `docs/release-notes/`
- `docs/release-notes/google-play/`
- `metadata/`
- `metadata/metadata.json`
- `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
- `https://github.com/dongdongbh/mindwtr-web/tree/main/docs` pour les modifications de la documentation publique
- `wiki/` est retiré — il contient uniquement une page d'accueil renvoyant vers le site de documentation ; n'y ajoutez jamais de pages de contenu
- `.github/workflows/`
- `.github/workflows/release-rc.yml` pour l'automatisation des versions candidates

---

## Cycle RC pour les publications bimensuelles

Utilisez un cycle de versions candidates pour les publications mineures bimensuelles habituelles. Il ne s'agit pas d'un programme bêta général. Une RC est le build destiné à devenir stable, sauf si les testeurs découvrent un problème bloquant.

Utilisez les noms de préversion SemVer :

- première version candidate : `v1.1.0-rc.1`
- correction ultérieure d'un problème bloquant : `v1.1.0-rc.2`
- version stable finale : `v1.1.0`

Ne remplacez pas les artefacts d'une RC qui a atteint les testeurs. Corrigez ce cas avec le numéro de RC suivant. Si une exécution échoue avant que GitHub ne publie la préversion, annulez-la, corrigez `main`, supprimez et recréez la même étiquette RC sur le commit corrigé, puis renvoyez l'étiquette.

Exécutez `./scripts/bump-version.sh vX.Y.Z-rc.N` pour une RC. Le script conserve les fichiers de version des applications et paquets sur la version stable de base (`X.Y.Z`), tout en écrivant la version RC complète dans `apps/mobile/release-version.json` pour les builds FOSS sans variable d'environnement. Le flux de travail RC vérifie les deux valeurs avant le démarrage des builds des plateformes.

### Quand utiliser le cycle RC

Utilisez le cycle RC complet pour :

- les publications mineures bimensuelles planifiées
- les publications comportant des modifications multiplateformes
- les publications qui touchent à la synchronisation, au stockage, à la capture, à l'empaquetage, aux droits, aux métadonnées du programme de mise à jour ou aux métadonnées des boutiques
- les publications dans lesquelles plusieurs artefacts de distribution ont changé

Le mainteneur peut ignorer le cycle RC pour les publications correctives triviales, telles qu'une correction ciblée d'une ligne, une correction de documentation uniquement ou une mise à jour de métadonnées uniquement qui n'affecte pas le comportement de l'application installée. Cette omission doit être explicitement indiquée dans les notes de version ou la liste de contrôle de publication.

### Matrice des canaux RC

Publiez les builds RC uniquement sur les canaux capables d'accueillir des testeurs sans engendrer une lourde charge de maintenance.

| Plateforme | Canal RC | Comportement stable |
| --- | --- | --- |
| Tous les téléchargements directs | Préversion GitHub | La version GitHub finale devient la source de téléchargement stable. |
| iOS | TestFlight | L'App Store reste le canal stable. |
| Build macOS App Store | TestFlight | Le Mac App Store reste le canal stable. |
| Build Android Play | Tests internes Google Play et tests ouverts (`beta`) par défaut ; pistes fermées/personnalisées lorsqu'elles sont configurées | La production reçoit ultérieurement un téléversement stable, et la piste de tests internes est actualisée par le flux de travail stable. |
| Linux Flatpak | Branche bêta Flathub | Automatisation future : publier la version stable dans les branches stable et bêta afin que les utilisateurs bêta ne soient pas abandonnés. |
| Arch Linux | AUR `mindwtr-bin-beta` | La version stable actualise le paquet bêta persistant. |
| Linux Debian/Fedora | Dépôts APT/RPM bêta | Les paquets stables restent dans des répertoires de dépôt stable distincts. |
| Téléchargement direct Windows | Programme d'installation/version portable en préversion GitHub | Le Microsoft Store reste réservé aux versions stables, sauf si les package flights sont automatisés ultérieurement. |

Conservez les canaux suivants en version stable uniquement, sauf besoin manifeste et si l'automatisation est déjà en place :

- F-Droid
- IzzyOnDroid
- Microsoft Store package flights
- winget
- cask Homebrew stable
- Chocolatey
- bucket Scoop stable
- dépôts APT/RPM stables

Les package flights du Microsoft Store restent un ajout futur possible.

### Automatisation RC actuelle

Le flux de travail RC est `.github/workflows/release-rc.yml`.

L'envoi d'une nouvelle étiquette `vX.Y.Z-rc.N` démarre le flux de travail et vérifie l'étiquette, les versions stables de base, la version de publication FOSS validée et le commit de l'étiquette avant le démarrage des builds des plateformes. Une exécution qui a échoué sans qu'une préversion GitHub ait été publiée est récupérée en supprimant puis en recréant la même étiquette sur le commit corrigé. Si une version GitHub existe déjà pour l'étiquette, le flux de travail effectue uniquement la validation ; publiez les modifications sous le numéro de RC suivant. Utilisez `workflow_dispatch` uniquement pour des tentatives contrôlées sur certains canaux ou pour sélectionner des canaux différents de ceux par défaut.

Le flux de travail réutilise, dans la mesure du possible, les mêmes tâches de construction par canal que la version stable, puis crée une préversion GitHub à partir des artefacts Linux, macOS, Windows, Android et Android FOSS exacts.

Il publie également les builds destinés aux testeurs sur les canaux adossés aux boutiques qui sont déjà raccordés :

- AAB Android vers Google Play `internal` et les tests ouverts (`beta`) par défaut ; les exécutions manuelles peuvent choisir des pistes de test Play séparées par des virgules ou `none`.
- Build iOS App Store vers TestFlight avec la soumission à la vérification de l'App Store désactivée.
- Build macOS App Store vers TestFlight avec la soumission à la vérification de l'App Store désactivée.
- Pull requests de mise à jour de la branche bêta Flathub par l'intermédiaire du flux de travail Flathub partagé ; les exécutions manuelles peuvent les désactiver lorsque la configuration du canal n'est pas prête.
- Mises à jour AUR de `mindwtr-bin-beta` après la disponibilité des ressources de la préversion GitHub ; les exécutions manuelles peuvent les désactiver lorsque le canal du paquet n'est pas prêt.
- Mises à jour des dépôts APT/RPM bêta après la création de la préversion GitHub ; les exécutions manuelles peuvent les désactiver.

Le fichier stable `release.yml` reste le flux de travail de publication stable. Il est protégé de façon à ce que les étiquettes de préversion ne publient pas vers des canaux réservés aux versions stables, comme la production Google Play, le Microsoft Store, Snap stable, les dépôts Linux APT/RPM, Flathub stable, AUR stable, Scoop, winget, Homebrew ou Chocolatey.

La bêta Flathub nécessite la branche bêta et les autorisations dans `flathub/tech.dongdongbh.mindwtr`. La bêta AUR nécessite le paquet `mindwtr-bin-beta` ainsi que les secrets `AUR_SSH_PRIVATE_KEY`, `AUR_USERNAME` et `AUR_EMAIL`. Si l'un de ces canaux n'est pas prêt, désactivez cette entrée du flux de travail RC au lieu de considérer toute la RC comme en échec.

Étant donné qu'un téléversement vers une piste de test Play consomme un `versionCode` Android, chaque RC téléversée vers Play nécessite un nouveau `versionCode`. Le flux de travail RC détermine ce code une seule fois avant le démarrage des builds Android ; le build Play et le build Android FOSS utilisent ensuite le même résultat de prévalidation et s'exécutent en parallèle. Le flux de travail téléverse un AAB et attribue le même versionCode à chaque piste de test configurée. Le processus stable final actuel doit lui aussi utiliser un nouveau téléversement en production avec un `versionCode` supérieur, ou un futur flux de travail de promotion stable doit promouvoir le build Play déjà testé. Ne créez pas d'étiquette de version stable finale avec un `versionCode` Android déjà téléversé sur Play, sauf si le flux de travail stable a été adapté pour promouvoir ce build existant.


### Calendrier

Les canaux dont la vérification prend du temps doivent disposer d'une longueur d'avance. Utilisez ce calendrier par défaut :

| Jour | Action |
| --- | --- |
| T-7 à T-5 | Gel des fonctionnalités. Seuls les correctifs, les notes de version, les métadonnées et les problèmes bloquant la publication sont autorisés. |
| T-5 | Créez la branche de publication, exécutez `./scripts/bump-version.sh vX.Y.Z-rc.1`, générez des notes de version propres à la RC, telles que `docs/release-notes/X.Y.Z-rc.1.md`, puis créez l'étiquette `vX.Y.Z-rc.1` afin que `release-rc.yml` téléverse les canaux de testeurs activés. |
| T-4 | Exécutez des contrôles rapides sur les artefacts de chaque canal à mesure que les builds vérifiés deviennent disponibles. Ne corrigez que les problèmes bloquants. |
| T-3 | Confirmez la préversion GitHub créée par `release-rc.yml`, vérifiez la pull request Flathub bêta et la mise à jour de `mindwtr-bin-beta` lorsque ces entrées du flux de travail étaient activées, puis annoncez la RC aux testeurs. |
| T-2 à T-1 | Triez les retours. Ne créez une `rc.2` que pour les problèmes bloquants. Les problèmes non bloquants sont reportés au cycle suivant. |
| Jour de publication | Créez l'étiquette `vX.Y.Z`, publiez la version stable partout et mettez également à jour tous les canaux de test persistants existants vers la version stable. |
| T+1 à T+2 | Surveillez les plantages, les issues GitHub, Discord, les commentaires des boutiques et les rapports des paquets en aval. Appliquez si nécessaire un correctif avec l'étiquette corrective suivante, par exemple `v1.1.1` après `v1.1.0`. |

### Seuil de blocage pour rc.2

Ne créez une nouvelle RC que pour l'un des problèmes bloquants suivants :

- plantage au lancement
- perte ou corruption de données
- corruption de la synchronisation ou échec reproductible de la synchronisation
- échec de l'installation, de la mise à jour, de la signature, des droits ou de l'empaquetage
- capture, création, modification ou achèvement des tâches défaillant
- migration depuis la version stable précédente défaillante
- régression grave propre à une plateforme sur un canal pris en charge

Tout le reste attend la prochaine publication planifiée ou une version corrective ultérieure. Cela empêche le cycle bimensuel de se transformer en boucle bêta sans fin.

### Contrôles rapides RC obligatoires

Chaque canal de distribution constitue un environnement d'exécution différent. La RC n'est pas prête tant que l'artefact de chaque canal RC n'a pas été lancé dans un environnement fidèle au canal, dans la mesure permise par la CI ou les tests locaux.

Contrôles rapides minimums :

- lancer l'artefact exact que les utilisateurs reçoivent
- créer, modifier, terminer et supprimer une tâche
- vérifier que la capture ou l'ajout rapide s'ouvre et s'enregistre
- vérifier que l'application peut lire les données existantes de la version stable précédente
- vérifier que les paramètres de synchronisation s'ouvrent sans plantage
- vérifier le comportement au démarrage propre au programme de mise à jour, à la boutique ou au bac à sable, le cas échéant
- vérifier que les journaux ne présentent pas d'erreurs fatales au démarrage

Pour les canaux ayant déjà connu des défaillances, conservez des contrôles propres à chaque canal :

- l'APK FOSS et l'APK/AAB Play constituent des ensembles de dépendances distincts
- Flatpak doit être lancé dans l'environnement d'exécution Flatpak
- les paquets AUR doivent être construits dans un conteneur Arch propre avant leur publication
- les paquets MSIX/Microsoft Store ne doivent pas échouer de façon irrécupérable à cause de la barre d'état système, des raccourcis ou des capacités limitées par le bac à sable
- les builds App Store et TestFlight doivent conserver les droits requis

### Annonce aux testeurs

L'annonce de la RC doit être courte et exploitable :

- version et liens vers les canaux
- principales modifications visibles par les utilisateurs
- risques connus ou aspects à tester
- voie précise pour les retours : issue GitHub, canal Discord ou e-mail
- rappel qu'il s'agit d'une version candidate, pas d'un aperçu de fonctionnalité

---

## Processus de publication stable

1. Assurez-vous que `main` se trouve dans l'état prévu pour la publication et validez d'abord tout travail préparatoire à la publication.
   - Si la version précédente est déjà publiée, placez les correctifs ultérieurs dans `docs/release-notes/unreleased.md` et ajoutez un lien depuis `CHANGELOG.md` jusqu'à ce que la prochaine version corrective soit préparée, par exemple `v0.9.1` après `v0.9.0`.
2. Incrémentez la version avec :

```bash
./scripts/bump-version.sh 0.x.y
```

Cette commande met à jour les versions des paquets de l'espace de travail et incrémente le `versionCode` Android.

Si Google Play possède déjà un `versionCode` supérieur provenant de téléversements RC ou destinés aux testeurs, transmettez cette valeur maximale au script d'incrémentation avant de créer l'étiquette :

```bash
ANDROID_REMOTE_MAX_VERSION_CODE=85 ./scripts/bump-version.sh 0.x.y
```

Le script écrit dans `apps/mobile/app.json` suivi par Git une valeur supérieure au maximum de Play ; l'étiquette de publication, l'APK GitHub et les recettes de build reproductible en aval utilisent ainsi les mêmes métadonnées Android. La CI de publication stable rejette toujours les remplacements de `versionCode` appliqués uniquement dans la CI ; corrigez les métadonnées sources avant de créer l'étiquette au lieu de vous appuyer sur une mutation non suivie dans le flux de travail.

3. Exécutez les contrôles stricts de publication avant de créer l'étiquette :
   - Contrôle des types/tests :
     - `bun run test`
     - `bun run typecheck`
     - `bun run native:test`
   - Contrôle FOSS/statique :
     - inspectez `git diff vPREV..HEAD -- apps/mobile/package.json`
     - inspectez les fichiers de configuration F-Droid/FOSS (`apps/mobile/plugins/android-manifest-fixes.js`, `apps/mobile/scripts/`, `.github/workflows/release-android-foss.yml`, `config/izzyonandroid.yml`)
     - exécutez `python3 scripts/ci/repair-package-lock.py --check apps/desktop/package-lock.json`
   - Contrôle du schéma CloudKit :
     - comparez les fichiers de schéma synchronisés à l'étiquette précédente
     - si un nouveau champ ou type d'enregistrement adossé à CloudKit a été ajouté, mettez à jour/déployez le schéma de production avant la publication
4. Préparez ou mettez à jour les notes de version et les métadonnées :
   - `docs/release-notes/<version>.md`
   - `docs/release-notes/google-play/<version>.txt`
   - `metadata/*/release_notes.txt`
   - `metadata/*/changelogs/<androidVersionCode>.txt`
   - `metadata/metadata.json`
   - `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
5. Mettez à jour la documentation publique dans les [sources de la documentation web de Mindwtr](https://github.com/dongdongbh/mindwtr-web/tree/main/docs) lorsque les détails du processus de publication/documentation changent. Le wiki GitHub est retiré ; n'ajoutez ni ne mettez à jour de pages de contenu dans `wiki/` et n'exécutez pas Git dans un checkout `.wiki` distinct.
6. Examinez attentivement les modifications de version et de métadonnées obtenues.
7. Validez la préparation de la publication :

```bash
git add -A
git commit -m "chore(release): v0.x.y"
```

8. Créez l'étiquette de publication :

```bash
git tag v0.x.y
```

9. Envoyez `main` et l'étiquette :

```bash
git push origin main --tags
```

10. Laissez GitHub Actions publier les artefacts des plateformes et toutes les tâches d'empaquetage en aval.

---

## Avant de créer l'étiquette

Vérifiez au minimum que :

- les notes de version existent et correspondent aux modifications réelles
- les versions des paquets sont alignées dans tout le monorepo
- `apps/mobile/release-version.json` contient la version RC complète pour une étiquette RC
- le `versionCode` Android a été incrémenté
- le verrou de paquet de bureau réussit `repair-package-lock.py --check`
- la configuration FOSS supprime toujours les autorisations bloquées et ne conserve que celles qui sont voulues
- le schéma adossé à CloudKit n'a pas changé, ou le schéma de production a été mis à jour au préalable
- les modifications des métadonnées des boutiques/publications sont intentionnelles et limitées à chaque plateforme
- les catégories des boutiques mobiles dans les consoles sont toujours correctes : Google Play `Productivity > Task Management` et catégorie principale de l'App Store `Productivity`
- les textes des paramètres régionaux de Google Play respectent la limite de 500 caractères de l'API

Pour les publications plus importantes, vérifiez également :

- les métadonnées du programme de mise à jour de bureau
- les métadonnées des boutiques mobiles / entrées Fastlane
- les modifications du site de documentation relatives aux fonctionnalités visibles par les utilisateurs dans les [sources de la documentation web de Mindwtr](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)
- la synchronisation entre moteurs avec un petit jeu de données initial : les ajouts, mises à jour, suppressions et transferts de pièces jointes doivent converger entre Cloud, la synchronisation WebDAV/par fichier et tout moteur natif de plateforme disponible pour le testeur de la publication ; une deuxième synchronisation ne doit signaler aucun nouveau conflit

---

## Notes de version

Les notes de version numérotées se trouvent dans `docs/release-notes/`.

Directives :

- gardez le résumé initial centré sur l'utilisateur
- présentez d'abord les correctifs/fonctionnalités importants
- répertoriez les commits notables lorsque cela est utile
- pour les RC, utilisez `docs/release-notes/X.Y.Z-rc.N.md` ou `docs/release-notes/vX.Y.Z-rc.N.md` et indiquez la version RC complète dans le premier titre ; réservez `docs/release-notes/X.Y.Z.md` à la version stable finale
- maintenez les extraits Google Play dans `docs/release-notes/google-play/` alignés si nécessaire
- mettez à jour `metadata/*/release_notes.txt` pour les notes de version de l'App Store
- ajoutez le nouveau fichier de journal des modifications Android sous `metadata/*/changelogs/<versionCode>.txt`
- maintenez les notes de version du Microsoft Store dans `metadata/metadata.json` alignées sur la même version
- ajoutez ou actualisez l'entrée AppStream en tête de `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`

---

## Contrôles après publication

Après l'envoi de l'étiquette :

- vérifiez la création de la version GitHub
- vérifiez que les artefacts de bureau/mobiles attendus sont joints
- vérifiez que les flux de travail propres aux boutiques ont réussi, le cas échéant
- contrôlez ponctuellement les surfaces de mise à jour/téléchargement par rapport à la nouvelle version
- vérifiez que la version stable a également été publiée sur les canaux de test persistants existants, afin que les testeurs restent sur le build le plus récent

---

## Approche de la restauration

Si une mauvaise version est détectée :

- interrompez toute nouvelle création d'étiquette jusqu'à ce que le mode de défaillance soit compris
- privilégiez une version corrective rapide qui avance plutôt que de réécrire l'historique publié
- indiquez explicitement le correctif dans les notes de version

---

## Pages connexes

- [Guide du développeur](/fr/developers/developer-guide)
- [Déploiement avec Docker](/fr/power-users/docker-deployment)
- [Déploiement cloud](/fr/data-sync/cloud-deployment)
- [Notes de version du dépôt](https://github.com/dongdongbh/Mindwtr/tree/main/docs/release-notes)
- [Gestion sémantique de version](https://semver.org/)
- [Préversions GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Pistes de test Google Play](https://support.google.com/googleplay/android-developer/answer/9845334)
- [Apple TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Dépôt bêta Flathub](https://docs.flathub.org/docs/for-app-authors/maintenance)
- [Package flights du Microsoft Store](https://learn.microsoft.com/en-us/windows/apps/publish/package-flights)
