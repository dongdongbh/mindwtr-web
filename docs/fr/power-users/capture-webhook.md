# Webhook de capture

Le webhook de capture transforme une note vocale ou un court texte en tâche dans la boîte de réception. N'importe quel appareil, application ou script capable d'envoyer une requête HTTP transmet le texte, et éventuellement un enregistrement audio, à votre propre serveur cloud. Le serveur crée la tâche, y joint l'enregistrement, et vos appareils récupèrent les deux à la prochaine synchronisation.

Cela nécessite le [serveur cloud auto-hébergé](/fr/power-users/docker-deployment). Si vous utilisez Mindwtr sans serveur, capturez plutôt depuis le menu de partage du téléphone ou avec Siri.

## Le point de terminaison

```text
POST /v1/capture
```

Chaque requête porte le même jeton bearer que le reste de l'API, dans un en-tête `Authorization: Bearer <token>`. Le corps peut être `multipart/form-data`, `application/json` avec les mêmes noms de champs, ou `text/plain`, où tout le corps est la transcription. Les champs inconnus sont ignorés.

### Texte seul

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: text/plain" \
  --data "Call the dentist about the crown"
```

### Audio avec une transcription

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -F "transcription=Call the dentist about the crown" \
  -F "audio=@note.m4a" \
  -F "recordedAt=1756900000000" \
  -F "client=Pebble Index 01"
```

## Champs

| Champ | Effet |
| --- | --- |
| `transcription` | Le texte capturé. La première ligne devient le titre de la tâche et le texte complet devient la description. `text` et `title` sont acceptés comme autres noms du même champ. |
| `audio` | L'enregistrement à joindre à la tâche. Il se synchronise vers vos appareils comme n'importe quelle autre pièce jointe. |
| `recordedAt` | Le moment de la capture, en millisecondes depuis l'époque ou sous forme d'horodatage ISO 8601. Il devient la date de création de la tâche s'il est valide et pas dans le futur. |
| `client` | Une courte étiquette pour l'appareil ou l'application qui a envoyé la capture. Elle est notée à la fin de la description sous la forme `Captured with <client>`. |

Envoyez au moins l'un des champs `transcription` et `audio`. L'enregistrement peut être en m4a, mp4, aac, mp3, wav, ogg ou webm.

## Réponses

| Statut | Signification |
| --- | --- |
| `201` | La tâche a été créée. Le corps de la réponse est la nouvelle tâche. |
| `400` | Ni transcription ni fichier audio n'a été envoyé. |
| `401` | Le jeton est absent ou incorrect. |
| `413` | Le fichier audio dépasse la taille maximale des pièces jointes du serveur. |
| `415` | Le type du fichier audio n'est pas pris en charge. |

## Pebble Index 01

L'application du Pebble Index 01 envoie les notes vocales exactement dans ce format et permet d'ajouter vos propres en-têtes de requête. Aucun code intermédiaire n'est donc nécessaire : vous remplissez seulement deux réglages.

1. Ouvrez l'application Pebble sur votre téléphone et allez dans les réglages de webhook des notes vocales
2. Indiquez comme URL de webhook `https://your-server.example/v1/capture`, avec l'adresse de votre propre serveur à la place de l'exemple
3. Ajoutez un en-tête de requête nommé `Authorization` avec la valeur `Bearer <token>`, en utilisant l'un des jetons de votre serveur
4. Enregistrez une note sur la montre. Elle arrive dans votre boîte de réception à la prochaine synchronisation, avec la transcription comme tâche et l'enregistrement en pièce jointe

## Autres appareils et automatisations

Rien de tout cela n'est propre à Pebble. Tout ce qui peut faire un POST HTTP fonctionne de la même façon :

- **Raccourcis iOS** : une action *Obtenir le contenu de l'URL*, méthode POST, avec l'en-tête et un champ de texte
- **Applications d'automatisation Android** comme Tasker : une action de requête HTTP avec la même URL et le même en-tête
- **Home Assistant** : un `rest_command` qui envoie le texte d'une automatisation ou d'une réponse de l'assistant vocal
- **Scripts shell et tâches cron** : les commandes curl ci-dessus, avec le jeton dans une variable d'environnement

## Pages connexes

- [API Cloud](/fr/developers/cloud-api)
- [Capture par e-mail](/fr/power-users/email-capture)
- [Déploiement Docker](/fr/power-users/docker-deployment)
