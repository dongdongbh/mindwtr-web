# Application web (PWA)

L’application Mindwtr pour ordinateur peut fonctionner dans un navigateur au moyen de la compilation Vite. Dans un navigateur, hors Tauri, elle utilise `localStorage` pour la persistance et enregistre un service worker pour le fonctionnement hors ligne et la PWA.

---

## Exécution locale

Vous pouvez exécuter la PWA en local avec Bun ou **Docker**.

### Avec Docker — recommandé

Consultez [Déploiement Docker](/fr/power-users/docker-deployment) pour exécuter le conteneur PWA.

### Avec Bun

Depuis la racine du dépôt :

```bash
bun install
bun desktop:web
```

Vite démarre sur `http://localhost:5173/`.

---

## Compilation pour l’hébergement

```bash
bun desktop:web:build
```

Le résultat se trouve dans `apps/desktop/dist/` et peut être hébergé comme site statique.

---

## Comportement de la PWA

- L’application enregistre `apps/desktop/public/sw.js` dans le navigateur.
- `sw.js` met en cache au préalable `/`, `/index.html`, `/manifest.webmanifest`, `/icon.png` et `/logo.png`, puis à la demande les autres requêtes GET de même origine.
- Hors ligne, les requêtes de navigation reviennent à `/index.html`, de sorte que les liens profonds continuent de fonctionner.

---

## Exigences d’hébergement

Hébergez `apps/desktop/dist/` à la racine du site (`/`). Le service worker est enregistré depuis `/sw.js` et le manifeste utilise des chemins absolus.

Assurez-vous que l’hébergeur statique sert :

- `manifest.webmanifest` comme `application/manifest+json`, recommandé ;
- `sw.js` comme `application/javascript`.

Pour héberger sous un sous-chemin comme `/mindwtr/`, adaptez l’enregistrement du service worker et les chemins du manifeste au chemin de base.

---

## Limites

- Les versions navigateur stockent les données dans `localStorage` ; effacer les données du site efface donc celles de Mindwtr.
- Certaines fonctions réservées à l’ordinateur peuvent manquer, notamment les pièces jointes qui nécessitent un accès natif aux fichiers.
- Aucun accès natif à la zone de notification ni aux raccourcis globaux.

---

## Voir aussi

- [Guide du développeur](/fr/developers/developer-guide)
- [Données et synchronisation](/fr/data-sync/)
