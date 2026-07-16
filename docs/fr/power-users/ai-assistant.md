# Assistant IA (BYOK)

Mindwtr intègre un assistant IA facultatif pour clarifier les tâches, les décomposer et examiner les éléments obsolètes. Il est **désactivé par défaut** et fonctionne selon le principe **bring your own key (BYOK)** : vous fournissez votre propre clé.

## Modèle de confidentialité

- **Local par défaut :** vos données restent sur votre appareil.
- **À la demande :** des requêtes ne sont envoyées que lorsque vous touchez une action IA ou activez les suggestions Copilot.
- **Portée limitée :** l’assistant ne reçoit que les données nécessaires de la tâche.

## Fournisseurs pris en charge

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Configurez l’assistant dans **Paramètres → Assistant IA** :

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
- **fournisseurs hébergés compatibles avec OpenAI :** par exemple GLM ou d’autres services exposant un point de terminaison compatible.

1. Si nécessaire, démarrez un point de terminaison compatible avec OpenAI ou obtenez-y un accès.
2. Dans **Paramètres → Assistant IA** :
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

Disponibles uniquement dans les vues Boîte de réception et Focus.

Pendant la saisie, Mindwtr peut suggérer :

- des contextes ;
- des tags ;
- des estimations de temps.

Copilot n’applique jamais de modification sans votre accord.

### Transcription audio

Transcrit les notes vocales en tâches.

- **Hors ligne avec Whisper :** téléchargez un modèle, environ 75 Mo pour Tiny ou 150 Mo pour Base, pour une transcription entièrement locale.
- **Cloud avec OpenAI ou Gemini :** utilisez votre clé d’API pour une transcription très précise.
- **Modes :**
  - **Analyse intelligente :** extrait de la parole naturelle les échéances, projets et priorités, par exemple « Acheter du lait demain priorité haute » ;
  - **Transcription seule :** produit uniquement le texte.

## Remarques

- L’IA est **facultative**. Mindwtr fonctionne sans elle.
- Les réponses sont analysées comme du JSON structuré ; si l’analyse échoue, aucune modification n’est appliquée.

## Codes de langue Whisper

Avec le modèle Whisper hors ligne, vous pouvez définir explicitement le code de langue dans Paramètres → Assistant IA → Langue audio.
Consultez la [liste des langues Whisper](https://whisper-api.com/docs/languages/).
