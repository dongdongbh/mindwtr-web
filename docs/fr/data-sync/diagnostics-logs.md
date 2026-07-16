# Diagnostics et journaux

Mindwtr intègre un journal de diagnostic pour faciliter le dépannage des problèmes de synchronisation et des plantages. Les journaux restent **uniquement en local** et les valeurs sensibles sont **masquées** avant l’écriture.

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
