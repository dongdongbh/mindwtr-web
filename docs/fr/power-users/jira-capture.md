# Capturer des tickets Jira

Mindwtr n’embarque aucun client Jira, et aucun n’est prévu. Une intégration Jira Cloud correctement prise en charge supposerait d’enregistrer et d’exploiter une application OAuth, puis de suivre indéfiniment les évolutions d’API et de règles d’Atlassian, pour un outil de suivi parmi tant d’autres. Le compromis est mauvais pour une application GTD personnelle.

Capturer des tickets dans votre Boîte de réception, en revanche, est exactement le rôle de la capture GTD, et l’automatisation de Jira peut alimenter Mindwtr avec des briques qui existent déjà. Cette page présente trois recettes, du sans-code au petit script.

À voir aussi : [Capture par e-mail](/fr/power-users/email-capture), [API locale](/fr/power-users/local-api), [API cloud](/fr/developers/cloud-api)

Toutes ces voies font de la capture à sens unique, pas de la synchronisation. La tâche capturée porte la clé du ticket, son résumé et un lien de retour vers Jira ; terminer la tâche dans Mindwtr ne fait pas avancer le ticket, et les changements dans Jira ne touchent pas les tâches déjà capturées. Vous traitez l’élément capturé comme n’importe quelle entrée de la Boîte de réception, et le lien vous ramène dans Jira le moment venu.

## Un e-mail par ticket, via Jira Automation

La voie sans code. Jira vous envoie chaque ticket correspondant par e-mail, et la [capture par e-mail](/fr/power-users/email-capture) intégrée de Mindwtr transforme chaque message en tâche de Boîte de réception. Rien de nouveau à héberger, et la boîte aux lettres met les captures en file d’attente quand votre ordinateur est éteint.

1. Configurez la [capture par e-mail](/fr/power-users/email-capture) dans Mindwtr pour ordinateur, avec un dossier surveillé dédié comme `Mindwtr`
2. Dans Jira, ouvrez **Paramètres du projet → Automatisation** (ou l’automatisation globale) et créez une règle
3. Choisissez un déclencheur du type « un ticket arrive chez moi » : **Ticket créé**, **Ticket attribué** ou une transition d’état
4. Ajoutez si besoin une **condition JQL** pour restreindre la règle, par exemple `assignee = currentUser() AND project = ABC`
5. Ajoutez une action **Envoyer un e-mail** vers votre propre adresse, avec l’objet <span v-pre>`{{issue.key}} - {{issue.summary}}`</span> et un corps contenant <span v-pre>`{{issue.url}}`</span> plus les champs voulus dans la description de la tâche
6. Dans votre client de messagerie, créez une règle qui déplace ces messages vers le dossier surveillé

Chaque événement correspondant produit un e-mail, et chaque e-mail devient une tâche intitulée `ABC-123 - Fix the login redirect` avec le lien dans sa description.

Préférez une règle d’automatisation à l’abonnement à un filtre enregistré : l’abonnement envoie périodiquement un récapitulatif de toutes les correspondances dans un seul message, qui deviendrait une seule tâche inutilisable. L’automatisation se déclenche une fois par ticket.

## Directement vers votre serveur, via Send web request

Si vous exploitez le [serveur cloud auto-hébergé](/fr/power-users/docker-deployment), Jira peut se passer d’e-mail. L’action d’automatisation **Send web request** envoie chaque ticket vers [`POST /v1/tasks`](/fr/developers/cloud-api), et vos appareils récupèrent la tâche à la synchronisation suivante.

1. Créez la même règle d’automatisation que ci-dessus : déclencheur, puis condition JQL facultative
2. Ajoutez une action **Send web request** : méthode `POST`, URL `https://your-server.example/v1/tasks`
3. Ajoutez les en-têtes `Authorization: Bearer <votre jeton>` (valeur marquée comme masquée) et `Content-Type: application/json`
4. Réglez le corps sur **Custom data** avec le JSON ci-dessous

```json
{
  "title": "{{issue.key}} - {{issue.summary.jsonEncode}}",
  "props": { "description": "{{issue.url}}" }
}
```

La fonction `.jsonEncode` échappe les guillemets et les autres caractères qu’un résumé peut contenir, pour que le corps de la requête reste du JSON valide. La règle s’exécute dans le cloud d’Atlassian : la capture fonctionne même toutes machines éteintes, et seuls les champs que vous associez quittent Jira.

## Un script, pour un contrôle total

Tout ce qui sait interroger l’API REST de Jira et émettre une requête HTTP peut servir de pont : un script cron, n8n, Node-RED ou Zapier. Les jetons d’API d’Atlassian sont prévus exactement pour ce genre de script personnel. L’exemple ci-dessous interroge une recherche JQL et capture les nouveaux tickets, en mémorisant ceux déjà envoyés :

```bash
#!/usr/bin/env bash
set -euo pipefail
JIRA="https://your-company.atlassian.net"
JQL='assignee = currentUser() AND created >= -1d'
SEEN="$HOME/.cache/jira-mindwtr-seen"
touch "$SEEN"

curl -s -u "you@company.example:$JIRA_TOKEN" \
  "$JIRA/rest/api/3/search/jql" --get \
  --data-urlencode "jql=$JQL" --data-urlencode "fields=summary" |
jq -r '.issues[] | "\(.key)\t\(.fields.summary)"' |
while IFS=$'\t' read -r key summary; do
  grep -qxF "$key" "$SEEN" && continue
  curl -s -X POST "https://your-server.example/v1/tasks" \
    -H "Authorization: Bearer $MINDWTR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg t "$key - $summary" --arg d "$JIRA/browse/$key" \
          '{title: $t, props: {description: $d}}')" > /dev/null
  echo "$key" >> "$SEEN"
done
```

Sans serveur cloud, pointez le même script vers l’[API locale](/fr/power-users/local-api) de l’ordinateur : `http://127.0.0.1:3456/tasks`, même schéma de jeton Bearer, tant que l’application est ouverte.

## Autres outils de suivi

Rien ici n’est propre à Jira, hormis les smart values. GitHub, GitLab, Linear et la plupart des autres outils savent envoyer un e-mail ou une requête HTTP à la création ou à l’attribution d’un ticket, et les trois mêmes recettes s’appliquent. Si vous construisez un pont qui mérite d’être partagé, publiez-le dans les [GitHub Discussions](https://github.com/dongdongbh/Mindwtr/discussions) pour que d’autres puissent le reprendre.
