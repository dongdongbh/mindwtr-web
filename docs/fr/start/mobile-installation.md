# Installation sur mobile

Instructions détaillées pour Android et iOS.

Pour les versions candidates et bêta, consultez [Rejoindre les canaux bêta](/fr/start/beta-channels).

---

## Android

### Google Play — recommandé

[![Google Play](https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)

Mindwtr est disponible sur [Google Play](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr).

### F-Droid

[![F-Droid Version](https://img.shields.io/f-droid/v/tech.dongdongbh.mindwtr?label=F-Droid&logo=fdroid&logoColor=white&color=1976D2)](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)

Installation depuis F-Droid :

1. Installez le client F-Droid.
2. Ouvrez [Mindwtr sur F-Droid](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/) et installez l’application.

### IzzyOnDroid

[![IzzyOnDroid](https://img.shields.io/endpoint?url=https://apt.izzysoft.de/fdroid/api/v1/shield/tech.dongdongbh.mindwtr&label=IzzyOnDroid)](https://apt.izzysoft.de/packages/tech.dongdongbh.mindwtr)

Si vous employez un client compatible avec F-Droid comme Droid-ify, Neo Store ou F-Droid :

1. Ajoutez le dépôt IzzyOnDroid : `https://apt.izzysoft.de/fdroid/repo`.
2. Ouvrez [Mindwtr sur IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/tech.dongdongbh.mindwtr) et installez l’application.

### Télécharger l’APK

1. Accédez aux [versions GitHub](https://github.com/dongdongbh/Mindwtr/releases).
2. Téléchargez le dernier APK, par exemple `mindwtr-<version>.apk`.
3. Ouvrez l’APK sur votre appareil.

### Autoriser les sources inconnues

Si le système le demande :

1. Ouvrez **Paramètres → Sécurité**, ou **Paramètres → Applications → Accès spécial**.
2. Autorisez **Installer des applications inconnues** pour votre navigateur ou gestionnaire de fichiers.
3. Revenez à l’APK et installez-le.

### Vérifier l’installation

1. Ouvrez Mindwtr depuis le tiroir d’applications.
2. Accordez les autorisations demandées.
3. Commencez à capturer vos tâches.

---

## iOS

### État actuel

Mindwtr est disponible sur l’App Store :

[![App Store](https://img.shields.io/badge/App_Store-iOS-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

La bêta TestFlight est disponible à l’adresse https://testflight.apple.com/join/7SMJCTSR. Consultez [Rejoindre les canaux bêta](/fr/start/beta-channels) pour savoir comment quitter la bêta et découvrir les autres plateformes.

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

### Options

1. **App Store — recommandé :** installez la version stable.
2. **TestFlight :** installez la dernière bêta iOS.
3. **Versions pour simulateur :** disponibles dans le code source pour le développement.
4. **Compilation personnelle :** compilez et signez vous-même l’application avec Xcode ; un compte Apple Developer est requis pour signer sur appareil.

Le maintien de la version iOS sur l’App Store impose toutefois des frais annuels importants, décrits dans l’[Apple Developer Program](https://developer.apple.com/support/enrollment/), actuellement payés personnellement par le développeur.

Pour contribuer à la pérennité et au développement futur de Mindwtr, vous pouvez soutenir le projet sur [GitHub Sponsors](https://github.com/sponsors/dongdongbh) ou [Ko-fi](https://ko-fi.com/D1D01T20WK).

### Compiler pour iOS — développeurs

```bash
# Clone repo
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run on iOS Simulator
bun mobile:ios

# Or open in Xcode for device builds
cd apps/mobile
npx expo prebuild --platform ios
open ios/*.xcworkspace
```

---

## Emplacement des données

Les données mobiles sont conservées dans le stockage interne de l’application, avec SQLite comme stockage principal et du JSON pour les sauvegardes et la synchronisation.

---

## Mise à jour

### Android

1. Téléchargez le nouvel APK depuis [Releases](https://github.com/dongdongbh/Mindwtr/releases).
2. Installez-le par-dessus l’application existante.
3. Vos données sont conservées.

> **Conseil :** dans l’application, ouvrez **Paramètres → À propos → Rechercher des mises à jour** pour vérifier si une nouvelle version est disponible.

---

## Désinstallation

### Android

1. Effectuez un appui long sur l’icône Mindwtr.
2. Choisissez **Désinstaller** ou faites-la glisser vers la corbeille.

### Conservation des données

La désinstallation supprime toutes les données locales. Pour les conserver :

1. Exportez d’abord une sauvegarde avec **Paramètres → Données → Exporter une sauvegarde**.
2. Enregistrez le fichier exporté.
3. Désinstallez l’application.

---

## Dépannage

### L’application plante au démarrage

Essayez d’effacer ses données :

1. Ouvrez **Paramètres → Applications → Mindwtr**.
2. Touchez **Stockage → Effacer les données**.
3. Rouvrez l’application.

> **Remarque :** cette opération supprime toutes les données locales. Restaurez-les depuis la synchronisation ou une sauvegarde.

### La synchronisation ne fonctionne pas

Consultez [Données et synchronisation](/fr/data-sync/) pour le dépannage.

### L’APK ne s’installe pas

- Vérifiez que l’espace de stockage est suffisant.
- Autorisez l’installation depuis des sources inconnues.
- Téléchargez de nouveau l’APK, qui peut être endommagé.

---

## Voir aussi

- [Bien démarrer](/fr/start/getting-started)
- [Guide pour mobile](/fr/use/mobile)
- [Données et synchronisation](/fr/data-sync/)
