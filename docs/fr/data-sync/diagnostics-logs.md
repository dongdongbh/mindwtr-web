# Diagnostics et journaux

Mindwtr intègre un journal de diagnostic pour faciliter le dépannage des problèmes de synchronisation et des plantages. Les journaux restent **uniquement en local** et les valeurs sensibles sont **masquées** avant l’écriture.

---

## Enregistrer avec des données d’exemple

Choisissez **Paramètres → Données → Ouvrir le bac à sable** pour essayer Mindwtr avec des tâches et des projets fictifs. Un bandeau du bac à sable reste visible, avec des actions pour réinitialiser les exemples ou quitter. Sur mobile, il affiche **Bac à sable**, **Réinitialiser** et **Quitter**.

L’option se trouve près des diagnostics. Une confirmation explique le bac à sable avant de l’ouvrir. Choisissez **Annuler** pour rester dans votre espace personnel.

L’espace d’exemple comprend des tâches dans différents états, des domaines, projets et sections, des tâches récurrentes, des listes de contrôle, des notes, des étiquettes, des contextes, des personnes et des exemples de dates et de priorités. Vous pouvez les modifier pendant l’enregistrement. Ces changements sont temporaires ; la réinitialisation recharge les exemples d’origine.

Les exemples sont disponibles en anglais, allemand, français, espagnol, russe et chinois simplifié. Ils suivent la langue de l’application ; l’anglais est utilisé pour les autres langues.

Votre base de données personnelle reste séparée. Quitter le bac à sable vous y ramène ; redémarrer l’application après l’ouverture du bac à sable ramène aussi à l’espace personnel. L’ouverture attend la fin de la synchronisation active et des écritures locales et bloque les nouvelles tentatives de synchronisation pendant le changement. Si le délai est dépassé ou qu’un enregistrement échoue, vous restez dans votre espace personnel. Ses modifications ne sont ni synchronisées ni transmises aux widgets, à la montre, aux rappels, aux calendriers externes ou aux intégrations de capture.

Les exemples peuvent ne pas reproduire un problème lié à vos tâches, pièces jointes ou historique de synchronisation. Vérifiez l’enregistrement avant de le partager : le bac à sable ne masque pas les notifications du système ni les autres applications.

---

## Activer la journalisation de débogage

### Ordinateur

1. Ouvrez **Paramètres → Données**.
2. Activez **Journalisation de débogage**.
3. Reproduisez le problème.

**Versions de diagnostic :** les outils de développement et la journalisation supplémentaire ne sont disponibles que si l’application pour ordinateur a été compilée avec la fonctionnalité `diagnostics`.

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Mobile

1. Ouvrez **Paramètres → Données**.
2. Activez **Journalisation de débogage**.
3. Reproduisez le problème.

---

## Partager ou effacer les journaux

### Ordinateur

- Le chemin du fichier journal est affiché dans **Paramètres → Données**.
- Vous pouvez effacer les journaux depuis le même écran.

### Mobile

- Utilisez **Partager le journal** pour exporter un fichier journal.
- Utilisez **Effacer le journal** pour supprimer les anciennes entrées.

---

## Emplacements par défaut sur ordinateur

| Plateforme | Fichier journal |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| Windows (Microsoft Store) | `%LOCALAPPDATA%/Packages/<package>/LocalCache/Roaming/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## Contenu des journaux

- Erreurs et étapes de synchronisation
- Résumés de conflits : les fusions ayant résolu un conflit sont toujours écrites dans `mindwtr.log`, même si la journalisation de débogage est désactivée, afin que les résolutions restent vérifiables par la suite. Ces entrées permanentes indiquent les identifiants des enregistrements, les noms des champs modifiés et le côté retenu ; le contenu des enregistrements, comme les titres et les notes, n’est jamais écrit.
- Erreurs d’exécution inattendues

Les valeurs sensibles — clés d’API, jetons, mots de passe et URL contenant des identifiants — sont automatiquement masquées.

---

## Pages associées

- [FAQ](/fr/start/faq)
- [Données et synchronisation](/fr/data-sync/)
