# Bien démarrer

Bienvenue dans Mindwtr ! Ce guide vous aidera à être rapidement opérationnel.

## Installation

### Ordinateur

| Plateforme | Installation |
| --- | --- |
| **Arch Linux** | Paquet AUR précompilé `mindwtr-bin` ou paquet AUR `mindwtr` compilé depuis les sources |
| **Debian/Ubuntu** | Ajoutez le dépôt APT, recommandé, ou téléchargez le `.deb` depuis [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **Fedora/RHEL** | Ajoutez le dépôt DNF, recommandé, ou téléchargez le `.rpm` depuis [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **Flatpak** | Installez depuis [Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr) |
| **AppImage** | Téléchargez `.AppImage`, exécutez `chmod +x`, puis lancez-le |
| **Windows** | Microsoft Store, Winget, Chocolatey, Scoop, ZIP portable ou programme d’installation depuis [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **macOS** | [Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144), bêta TestFlight, Homebrew ou `.dmg` depuis [Releases](https://github.com/dongdongbh/Mindwtr/releases) |

Consultez [Installation sur ordinateur](/fr/start/desktop-installation) pour les instructions détaillées.

### Mobile

| Plateforme | Installation |
| --- | --- |
| **Android** | Google Play, F-Droid, IzzyOnDroid ou APK depuis [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **iOS** | App Store, bêta TestFlight, simulateur ou compilation personnelle pour le développement |

Consultez [Installation sur mobile](/fr/start/mobile-installation) pour les instructions détaillées.

Vous souhaitez tester les nouveautés en avance ? Consultez [Rejoindre les canaux bêta](/fr/start/beta-channels).

### Docker et application web

Utilisez Docker pour exécuter la PWA et le serveur de synchronisation auto-hébergé accessibles depuis un navigateur :

- [Déploiement Docker](/fr/power-users/docker-deployment)
- [Application web (PWA)](/fr/power-users/web-app-pwa)

---

## Premier lancement

Lors d’une nouvelle installation, Mindwtr vous propose de partir de zéro, d’importer une sauvegarde ou de connecter la synchronisation. Après la configuration, la vue **Focus** s’ouvre par défaut pour afficher en premier le calendrier du jour et les prochaines actions. Capturez le nouveau travail dans la **Boîte de réception** chaque fois que vous avez besoin de déposer rapidement une idée.

### Flux de base

1. **Capturer** tout dans la Boîte de réception
2. **Clarifier** chaque élément avec l’assistant de traitement
3. **Organiser** dans Prochaines actions, Projets ou Un jour/Peut-être
4. **Réfléchir** pendant la revue hebdomadaire
5. **Agir** en toute confiance

---

## Syntaxe d’ajout rapide

Mindwtr comprend la saisie naturelle dans le champ de tâche. La même syntaxe fonctionne dans l’invite « Quelle est la prochaine action ? » affichée après la dernière action d’un projet ; terminez par exemple par `/waiting` pour placer le suivi dans En attente.

| Syntaxe | Exemple | Résultat |
| --- | --- | --- |
| `@context` | `Buy milk @errands` | Ajoute le contexte @errands |
| `#tag` | `Research topic #creative` | Ajoute le tag #creative |
| `+Project` | `Call vendor +HomeReno` | Affecte au projet |
| `+Multi Word` | `+New Project Name` | Affecte à « New Project Name » |
| `+"Quoted Name"` | `+"New Project" call Bob` | Les guillemets délimitent un nom composé au milieu d’une phrase, également `!"Area Name"` |
| `!Area` | `Plan roadmap !Work` | Affecte au domaine |
| `%Person` | `Ask %Jim for the budget /waiting` | Définit Assigné à, pour une délégation ou En attente |
| `%"Full Name"` | `%"Jim Smith" send report` | Les guillemets délimitent un nom composé ; les noms connus sont aussi reconnus sans guillemets |
| `/area:<name>` | `/area:Personal` | Affecte au domaine, sans espaces |
| `/start:date` | `Task /start:monday` | Définit la date de début |
| `/due:date` | `Report /due:friday` | Définit l’échéance |
| `/review:date` | `Task /review:next week` | Définit la date de revue |
| `/energy:<level>` | `Task /energy:low` | Définit le niveau d’énergie : `low`, `medium`, `high` |
| `/note:text` | `Task /note:remember X` | Ajoute une description |
| `/status` | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Définit le statut |

**Exemples de dates :**

- `/due:today`, `/due:tomorrow`
- `/due:friday`, `/due:next week`
- `/due:in 3 days`, `/due:2025-01-15`
- `/start:tomorrow`, `/review:next week`

Les dates absolues utilisent toujours le format ISO `YYYY-MM-DD`, par exemple `/due:2026-03-15`, indépendamment de la langue et du format d’affichage de l’interface.

**Échappement**

- Utilisez une barre oblique inverse pour conserver les symboles comme texte brut : `\@`, `\#`, `\+`, `\!`, `\%`, `\/`.
- Exemple : `Call \@support /due:tomorrow` donne le titre `Call @support`.

**Prise en charge d’Unicode**

- Les noms de contexte et de tag acceptent les lettres et chiffres Unicode, notamment les caractères CJK et accentués.

> **Conseil :** vous pouvez aussi dicter vos tâches avec la **Capture audio**. Activez-la dans **Paramètres → Assistant IA** pour utiliser la transcription avec analyse intelligente.

---

## Modèle d’organisation

Mindwtr propose quatre outils de regroupement distincts :

- **Projets** : résultats en plusieurs étapes que vous souhaitez atteindre, par exemple « Lancer le site v2 ».
- **Domaines** : responsabilités continues sans état final, par exemple « Santé », « Famille » ou « Carrière ».
- **Contextes** : lieu ou moyen nécessaire à la tâche, par exemple `@home`, `@phone`, `@errands`.
- **Tags** : libellés souples pour l’énergie, le thème ou un regroupement personnalisé, par exemple `#focused`, `#lowenergy`.

Règle pratique :

- s’il existe un état final, utilisez un **Projet** ;
- s’il s’agit d’un domaine durable de votre vie ou travail, utilisez un **Domaine** ;
- si la tâche dépend d’un lieu, outil ou personne, utilisez un **Contexte** ;
- pour un filtrage facultatif, utilisez un **Tag**.

---

## Étapes suivantes

- Découvrez la [présentation de GTD](/fr/use/gtd-overview).
- Explorez le [guide pour ordinateur](/fr/use/desktop) ou le [guide pour mobile](/fr/use/mobile).
- Configurez les [données et la synchronisation](/fr/data-sync/).
- Activez l’[assistant IA](/fr/power-users/ai-assistant), si vous le souhaitez.

---

## Besoin d’aide ?

- Le meilleur endroit pour signaler un bogue ou demander de l’aide est un [ticket GitHub](https://github.com/dongdongbh/Mindwtr/issues), afin que le suivi reste visible.
- Dans l’application, utilisez **Envoyer des commentaires** sur la page **Paramètres → À propos**.
- Pour une question privée, écrivez à [support@mindwtr.app](mailto:support@mindwtr.app).
- Consultez la [FAQ](/fr/start/faq) ou le guide complet du [flux GTD dans Mindwtr](/fr/use/gtd-workflow).
