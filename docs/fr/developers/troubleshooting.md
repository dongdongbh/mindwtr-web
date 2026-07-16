# Dépannage pour les développeurs

Cette page rassemble les problèmes de développement local les plus courants et le chemin le plus court pour les diagnostiquer.

---

## Problèmes de dépendances et d’espace de travail

### Échec de `bun install` ou paquets désynchronisés

- Exécutez `bun install` depuis la racine du dépôt, pas depuis le sous-répertoire d’une application.
- Éliminez les hypothèses liées à un fichier de verrouillage obsolète avant d’analyser des échecs dans le code.
- Si les versions viennent d’être augmentées, vérifiez que `bun install` s’est terminé après le script d’incrémentation.

### TypeScript ne résout pas les paquets de l’espace de travail

- Sauf indication contraire de la documentation du paquet, exécutez les commandes depuis la racine du dépôt.
- Relancez `bun install`.
- Vérifiez que le filtre correspond au nom de l’espace de travail : `mindwtr`, `mobile`, `@mindwtr/core`, etc.

---

## Problèmes de compilation sur ordinateur

### Échec de la compilation Tauri sous Linux

Prérequis souvent manquants :

- chaîne d’outils Rust ;
- paquets de développement WebKitGTK ;
- paquets de développement OpenSSL ;
- paquets de développement GTK.

Consultez le [Guide du développeur](/fr/developers/developer-guide) pour les commandes d’installation propres à chaque plateforme.

### L’application démarre mais les diagnostics manquent

Les diagnostics de production ne sont disponibles qu’après une compilation avec la fonctionnalité `diagnostics` :

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Doute sur le chemin des données ou de la configuration

Consultez les remarques sur les chemins de stockage dans `docs/CONTRIBUTING.md` et les écrans Paramètres de l’application.

---

## Problèmes de développement mobile

### Les outils Android ou iOS ne sont pas détectés

- Vérifiez les chemins d’Android Studio et du SDK.
- Vérifiez que Xcode est installé pour le travail sous iOS.
- Commencez avec `bun mobile:start` depuis la racine du dépôt.

### Problèmes Expo ou Metro

- Redémarrez le serveur de développement Expo.
- Relancez `bun install`.
- Ne mélangez pas les procédures d’installation à la racine et dans l’application.

### Un bogue propre à l’appareil n’est pas reproductible dans les tests

- Ajoutez le plus petit test unitaire ou d’intégration possible pour la logique partagée.
- Documentez les étapes manuelles sur l’appareil dans la pull request.
- Capturez les journaux avant de modifier le comportement.

---

## Débogage de la synchronisation et du stockage

### Obtenir plus de détails sur les échecs de synchronisation

Utilisez les outils intégrés décrits dans [Diagnostics et journaux](/fr/data-sync/diagnostics-logs).

### Suspicion de bogue de fusion ou d’intégrité

Procédez dans cet ordre :

1. tests de `packages/core` pour la fonction de synchronisation, recherche ou stockage concernée ;
2. tests des enveloppes propres aux plateformes, ordinateur et mobile ;
3. journaux de diagnostic locaux.

Ne modifiez pas directement l’interface si le problème se trouve en réalité dans la logique principale partagée.

---

## Problèmes de tests

### Échec d’un test de paquet alors que l’application fonctionne

- Considérez l’échec comme une véritable régression jusqu’à preuve du contraire.
- Relancez d’abord le test le plus ciblé au niveau du paquet.
- Déterminez si l’échec provient du code de l’application ou de l’environnement de test.

### Tests React Native bruyants

- Les avertissements de dépréciation de `react-test-renderer` sont attendus dans les tests mobiles actuels.
- Préférez des assertions ciblées à la modification massive d’instantanés.

---

## Quand ajouter des diagnostics

Ajoutez des journaux ou de l’instrumentation lorsque :

- l’échec n’est pas reproductible de manière fiable ;
- le bogue traverse plusieurs paquets ;
- le moment de la synchronisation ou l’état du stockage importe ;
- un fournisseur ou une API native se comporte différemment selon la plateforme.

Conservez les journaux en local et masquez secrets et jetons.

---

## Pages associées

- [Guide du développeur](/fr/developers/developer-guide)
- [Stratégie de test](/fr/developers/testing-strategy)
- [Diagnostics et journaux](/fr/data-sync/diagnostics-logs)
- [Architecture](/fr/developers/architecture)
