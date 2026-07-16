# Pièces jointes (fichiers, liens et audio)

Mindwtr permet de joindre des fichiers et des liens aux **tâches** et aux **projets**. Les pièces jointes sont facultatives et se synchronisent entre les appareils lorsque la synchronisation est activée.

---

## Types de pièces jointes

- **Fichiers** — PDF, images, documents, etc.
- **Liens** — URL, pages web et liens de référence
- **Notes audio** — si « Enregistrer les pièces jointes audio » est activé
- **Notes Obsidian** sur ordinateur, si l’intégration Obsidian est activée

---

## Ajouter des pièces jointes

### Ordinateur

- Ouvrez une tâche ou un projet.
- Dans **Pièces jointes**, cliquez sur **Ajouter un fichier** ou **Ajouter un lien**.
- Pour un lien, collez une URL ou le chemin d’un fichier local.
- Dans les pièces jointes d’une tâche, **Joindre une note Obsidian** n’apparaît qu’après l’activation de l’intégration Obsidian.

### Mobile

- Ouvrez une tâche.
- Utilisez **Ajouter une pièce jointe** pour choisir un fichier ou ajouter un lien.
- Les notes audio sont ajoutées automatiquement lorsque vous effectuez une capture vocale et que **Enregistrer les pièces jointes audio** est activé.

### Copies et liens

- **Ajouter un fichier** enregistre une copie dans le stockage propre à Mindwtr. La pièce jointe continue de fonctionner même si l’original est déplacé, renommé ou supprimé. Retirer la pièce jointe supprime la copie de Mindwtr, pas votre fichier d’origine.
- **Ajouter un lien** enregistre un pointeur. Collez une URL ou le chemin d’un fichier local — ou utilisez **Lier à un fichier…** sur ordinateur — pour référencer un fichier sans le copier. Le lien vers un chemin cesse de fonctionner si le fichier est déplacé, comme attendu.
- Chaque ligne précise sa nature : un trombone indique que Mindwtr possède une copie, une icône de lien qu’il s’agit d’un pointeur. L’infobulle affiche la cible complète.
- Les pièces jointes ajoutées sur ordinateur avant la v1.1.0 pointent vers leur emplacement d’origine au lieu d’être copiées et affichent l’icône de lien. Joignez de nouveau le fichier pour en faire une copie.

---

## Pièces jointes audio

Lorsque **Enregistrer les pièces jointes audio** est activé dans Paramètres → Général, Mindwtr conserve la note vocale d’origine avec sa transcription. Vous pourrez ainsi réécouter ou partager l’enregistrement.

### Dépendances de lecture audio sous Linux

La lecture audio sous Linux utilise **GStreamer**. Si une erreur comme `autoaudiosink not found` apparaît, installez les extensions GStreamer :

**Arch / Manjaro**
```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav
```

**Debian / Ubuntu / Mint**
```bash
sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav
```

**Fedora** — RPM Fusion est requis pour certains codecs
```bash
sudo dnf install gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly gstreamer1-libav
```

## Comportement de la synchronisation

- Les métadonnées des pièces jointes se synchronisent avec les tâches et les projets.
- Les fichiers eux-mêmes se synchronisent après les métadonnées.
- Si un fichier manque en local, la pièce jointe reste visible et peut être téléchargée de nouveau lorsqu’elle devient disponible.
- Le nettoyage vérifie les références connues de l’appareil actuel. Tant qu’un autre appareil ne s’est pas synchronisé, les fichiers joints distants partagés ne sont pas comptabilisés globalement par référence.

> Conseil : les fichiers volumineux peuvent ralentir la synchronisation. Préférez de petites pièces jointes ou des liens lorsque c’est possible.

---

## Nettoyage

Mindwtr nettoie automatiquement les **pièces jointes orphelines**, qui ne sont plus référencées par aucune tâche ni aucun projet.

- **Ordinateur :** vous pouvez aussi lancer le nettoyage dans **Paramètres → Données → Nettoyage des pièces jointes**.
- **Mobile :** le nettoyage s’exécute automatiquement pendant la synchronisation.

---

## Pages associées

- [Données et synchronisation](/fr/data-sync/)
- [Guide pour ordinateur](/fr/use/desktop)
- [Guide pour mobile](/fr/use/mobile)
