# Assistant IA (BYOK)

Mindwtr intègre un assistant IA facultatif pour clarifier les tâches, les décomposer et examiner les éléments obsolètes. Il est **désactivé par défaut** et fonctionne selon le principe **bring your own key (BYOK)** : vous fournissez votre propre clé.

## Modèle de confidentialité

- **Stockage local :** votre base de tâches est stockée sur votre appareil. L’utilisation d’un fournisseur d’IA facultatif transmet le contenu nécessaire à la demande au fournisseur choisi.
- **À la demande :** des requêtes ne sont envoyées que lorsque vous touchez une action IA ou activez les suggestions Copilot. Ouvrir les réglages IA avec une clé configurée interroge aussi votre fournisseur pour obtenir sa liste de modèles à jour — cette requête ne contient aucune donnée de tâche.
- **Portée limitée :** l’assistant ne reçoit que les données nécessaires de la tâche.

## Fournisseurs pris en charge

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Configurez l’assistant dans **Paramètres → Assistant IA** sur ordinateur ou **Menu → Paramètres → Avancé → Assistant IA** sur mobile :

- activation ou désactivation de l’IA ;
- fournisseur ;
- modèle ;
- URL de base personnalisée facultative compatible avec OpenAI ;
- clé d’API, conservée uniquement en local ;
- effort de raisonnement ou budget de réflexion selon le fournisseur ;
- option facultative **Activer la réflexion** pour Claude et Gemini, qui ajoute un raisonnement étendu.

## Points de terminaison compatibles avec OpenAI, locaux ou hébergés

Mindwtr peut communiquer avec tout service exposant une **API Chat Completions compatible avec OpenAI**, notamment des serveurs locaux et certains fournisseurs hébergés.

Utilisez cette configuration pour :

- **OpenAI officiel :** laissez **URL de base personnalisée** vide et utilisez votre clé OpenAI ;
- **serveurs locaux :** llama.cpp, Ollama, LM Studio, LocalAI, vLLM et équivalents ;
- **fournisseurs hébergés compatibles avec OpenAI :** par exemple xAI (Grok), GLM ou d’autres services exposant un point de terminaison compatible.

1. Si nécessaire, démarrez un point de terminaison compatible avec OpenAI ou obtenez-y un accès.
2. Dans **Paramètres → Assistant IA** sur ordinateur ou **Menu → Paramètres → Avancé → Assistant IA** sur mobile :
   - choisissez **OpenAI** comme **Fournisseur** ;
   - saisissez dans **Modèle** le nom exposé par le service ;
   - renseignez l’**URL de base personnalisée** du service ;
   - saisissez une **Clé d’API** si le service exige une authentification bearer.
3. Ne laissez l’URL personnalisée vide que pour OpenAI officiel.
4. Ne laissez la clé vide que si votre point de terminaison personnalisé accepte les requêtes sans authentification.

Mindwtr ajoute automatiquement `/chat/completions`. Utilisez donc l’URL de base du fournisseur et non le chemin complet, sauf exigence contraire du service.

URL de base courantes :

- **llama.cpp** : `http://localhost:8080/v1`
- **Ollama** : `http://localhost:11434/v1`
- **LM Studio** : `http://localhost:1234/v1`
- **LocalAI / vLLM** : `http://localhost:8080/v1`

Exemple pour un service GLM hébergé :

- **Fournisseur** : `OpenAI`
- **Modèle** : l’identifiant GLM exposé, par exemple `GLM-4.7`
- **URL de base personnalisée** : l’URL compatible avec OpenAI du fournisseur
- **Clé d’API** : votre clé chez ce fournisseur, si elle est requise

Exemple pour xAI (Grok) :

- **Fournisseur** : `OpenAI`
- **Modèle** : un identifiant de modèle Grok issu de la liste des modèles xAI, par exemple `grok-4.6`
- **URL de base personnalisée** : `https://api.x.ai/v1`
- **Clé d’API** : votre clé d’API xAI

## Modèles lents et délai d’attente

Ouvrez **Avancé → Délai d’attente** dans les paramètres de l’assistant IA, sur ordinateur ou mobile. Choisissez **30, 60, 120 ou 300 secondes** ; la valeur par défaut reste de 30 secondes. Pour un modèle local lent, essayez d’abord 120 secondes.

Ce délai concerne les réponses de l’assistant IA et de Copilot, pas la transcription ni la récupération de la liste des modèles. Les requêtes annulées ou expirées ne sont pas relancées automatiquement. Les erreurs temporaires de réseau ou de serveur peuvent encore entraîner un nombre limité de nouvelles tentatives. Le délai suit votre préférence actuelle de synchronisation des paramètres IA.

### Des réponses plus courtes avec les modèles locaux

Un délai plus long donne davantage de temps au modèle, sans réduire ce qu’il génère. Certains modèles consomment des tokens de raisonnement avant de produire la courte réponse visible.

Avec **Fournisseur → OpenAI**, ouvrez **Paramètres supplémentaires de requête** dans les paramètres de l’assistant IA, collez un objet JSON et enregistrez les paramètres. Mindwtr ajoute directement ces champs aux requêtes de l’assistant IA et de Copilot ; ne les placez pas dans `extra_body`. Mindwtr garde le contrôle de `model`, `messages` et `response_format`.

Pour **llama.cpp avec un modèle Qwen dont le modèle de conversation permet de désactiver le raisonnement**, essayez ce point de départ :

```json
{
  "max_tokens": 512,
  "chat_template_kwargs": {
    "enable_thinking": false
  }
}
```

Le paramètre imbriqué suit la [documentation du serveur llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md). D’autres serveurs peuvent nécessiter un autre champ ou un réglage côté serveur ; un `enable_thinking` au premier niveau n’est pas interchangeable avec cet objet. Vérifiez la version du serveur et le modèle de conversation.

- **512 est un plafond de départ, pas un objectif.** Si la réponse est tronquée ou que Mindwtr ne peut pas l’interpréter, essayez 1024 ou retirez la limite. L’analyse de revue peut nécessiter plus de place qu’une courte décomposition de tâche.
- **Modifiez un seul réglage à la fois.** Comparez la même tâche avec le raisonnement désactivé, puis ajustez le plafond. Réduire `temperature` change l’échantillonnage ; cela ne limite pas la longueur.
- **Si le délai est toujours dépassé**, essayez un modèle plus petit ou 300 secondes. Effacez les paramètres supplémentaires et enregistrez pour retrouver les valeurs par défaut de Mindwtr.

[HeikoMarkgraf a partagé une configuration fonctionnelle de Qwen3.5-4B dans la discussion #1188](https://github.com/dongdongbh/Mindwtr/discussions/1188#discussioncomment-18448971), avec environ 6,45 secondes pour les suggestions et 37 secondes pour la décomposition. Ce sont des résultats communautaires pour cette configuration, pas des mesures du petit exemple ci-dessus. La discussion conserve la configuration complète ; certains champs peuvent être propres à ce serveur ou ignorés ailleurs.

## Fonctionnalités

### Clarifier

Transforme une tâche vague en prochaine action concrète et suggère des contextes ou tags.

### Décomposer

Génère une courte liste de prochaines étapes pour une tâche importante. Vous choisissez ce que vous appliquez.

### Analyse de la revue

Pendant la revue hebdomadaire, l’assistant peut signaler les tâches anciennes et suggérer :

- Déplacer vers Un jour/Peut-être
- Archiver
- Décomposer
- Conserver

### Suggestions Copilot

Disponibles dans l'éditeur de tâches, la ligne d'Ajout rapide des listes du bureau et la Capture rapide sur mobile.

Pendant la saisie, Mindwtr peut suggérer :

- des contextes ;
- des tags ;
- des estimations de temps.

Copilot n’applique jamais de modification sans votre accord.

### Transcription audio

Transcrit les notes vocales en tâches.

- **Hors ligne avec Whisper :** téléchargez un modèle, environ 75 Mo pour Tiny ou 150 Mo pour Base, pour une transcription entièrement locale.
  Le modèle est téléchargé depuis Hugging Face (huggingface.co). Si ce serveur est injoignable, ce qui est courant en Chine continentale, Mindwtr essaie ensuite le miroir hf-mirror.com. Dans les deux cas, le fichier est vérifié avec son SHA-256 connu avant d'être utilisé. Si les deux échouent, essayez un autre réseau ou utilisez un fournisseur cloud ou auto-hébergé.
- **Cloud avec OpenAI ou Gemini :** utilisez votre clé d’API pour une transcription très précise.
- **Auto-hébergé, compatible OpenAI :** définissez une URL de base personnalisée sous le fournisseur vocal OpenAI pour transcrire sur votre propre serveur au lieu d’api.openai.com. Tout serveur exposant `/v1/audio/transcriptions` d’OpenAI convient (whisper.cpp, Speaches, LocalAI, vLLM) ; la clé API y est facultative et le champ modèle accepte le nom de modèle de votre serveur.
- **Modes :**
  - **Analyse intelligente :** extrait de la parole naturelle les échéances, projets et priorités, par exemple « Acheter du lait demain priorité haute » ;
  - **Transcription seule :** produit uniquement le texte.

#### Transcription auto-hébergée

Définissez le fournisseur vocal sur OpenAI, puis renseignez l’URL de base : la racine de votre serveur, se terminant par `/v1` (par exemple `http://localhost:8000/v1`). Mindwtr y envoie l’enregistrement vers `/v1/audio/transcriptions`, exactement comme pour OpenAI.

- Laissez la clé d’API vide si votre serveur n’en utilise pas.
- Le sélecteur de modèles affiche ce que votre serveur annonce sur `/v1/models` lorsqu'il répond ; sinon, il retombe sur des suggestions. Vous pouvez toujours saisir n'importe quel nom de modèle — la liste n'est pas un ensemble fixe.
- Un serveur vocal ne fait que transcrire. **Analyse intelligente** nécessite un modèle de langage : sans assistant IA configuré, une capture devient donc une tâche dont le titre est la transcription, sans en extraire d’échéances, projets ni priorités. Configurez l’assistant séparément si vous souhaitez ces informations.

## Remarques

- L’IA est **facultative**. Mindwtr fonctionne sans elle.
- Les réponses sont analysées comme du JSON structuré ; si l’analyse échoue, aucune modification n’est appliquée.

## Codes de langue Whisper

Avec le modèle Whisper hors ligne, définissez le code de langue dans **Paramètres → Assistant IA → Langue audio** sur ordinateur ou **Menu → Paramètres → Avancé → Assistant IA → Langue audio** sur mobile.
Consultez la [liste des langues Whisper](https://whisper-api.com/docs/languages/).

## Évaluations des modèles Apple (versions de développement uniquement)

Apple Foundation Models n’est pas encore un fournisseur d’IA en production. Le prototype de développement iOS propose une clarification facultative de l’Inbox sur l’appareil, si celui-ci est compatible. Les suggestions restent modifiables et nécessitent une approbation explicite ; un modèle indisponible ne bloque pas le traitement manuel et ne déclenche pas de bascule silencieuse vers le cloud.

Un évaluateur Private Cloud Compute (PCC), activé séparément, compare des exemples synthétiques fixes au modèle local. Il ne lit ni ne transmet vos tâches, n’applique aucune suggestion et ne modifie pas les paramètres synchronisés. Chaque demande PCC nécessite un consentement explicite et peut utiliser le réseau ainsi que le quota quotidien d’Apple ; les erreurs ne déclenchent aucune nouvelle tentative automatique, locale ou cloud.

L’évaluation PCC nécessite iOS 27 ou ultérieur, un appareil compatible et une version de développement signée avec un provisionnement correct. L’accès de l’équipe à l’entitlement ne prouve pas qu’une version peut effectuer des demandes. L’accès en production, la qualité et la validation sur appareils physiques restent à confirmer. Consultez la [liste d’évaluation pour les développeurs](https://github.com/dongdongbh/Mindwtr/blob/main/docs/development/apple-pcc-evaluation.md).
