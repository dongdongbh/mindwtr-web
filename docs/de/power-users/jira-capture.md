# Jira-Vorgänge erfassen

Mindwtr hat keinen eingebauten Jira-Client, und es ist auch keiner geplant. Eine ordentlich unterstützte Jira-Cloud-Integration würde bedeuten, eine OAuth-Anwendung zu registrieren und zu betreiben und Atlassians API- und Richtlinienänderungen dauerhaft nachzupflegen, für einen Work-Tracker unter vielen. Für eine persönliche GTD-App ist das ein schlechter Tausch.

Vorgänge in den Posteingang zu erfassen ist dagegen genau das, wofür die GTD-Erfassung da ist, und Jiras eigene Automatisierung kann Mindwtr über Bausteine füttern, die es bereits gibt. Diese Seite zeigt drei Rezepte, von No-Code bis zu einem kleinen Skript.

Verwandt: [E-Mail-Erfassung](/de/power-users/email-capture), [Lokale API](/de/power-users/local-api), [Cloud-API](/de/developers/cloud-api)

Alle diese Wege sind einseitige Erfassung, keine Synchronisation. Eine erfasste Aufgabe trägt den Vorgangsschlüssel, die Zusammenfassung und einen Link zurück zu Jira; das Erledigen der Aufgabe in Mindwtr ändert den Jira-Vorgang nicht, und Änderungen in Jira berühren bereits erfasste Aufgaben nicht. Sie verarbeiten den erfassten Eintrag wie jeden anderen im Posteingang, und der Link führt Sie zurück, wenn es Zeit ist, in Jira zu arbeiten.

## Eine E-Mail pro Vorgang, per Jira-Automatisierung

Der No-Code-Weg. Jira schickt Ihnen jeden passenden Vorgang per E-Mail, und Mindwtrs eingebaute [E-Mail-Erfassung](/de/power-users/email-capture) macht aus jeder Nachricht eine Aufgabe im Posteingang. Es gibt nichts Neues zu hosten, und das Postfach puffert Erfassungen, während Ihr Rechner aus ist.

1. Richten Sie die [E-Mail-Erfassung](/de/power-users/email-capture) in Mindwtr Desktop ein, mit einem eigenen überwachten Ordner wie `Mindwtr`
2. Öffnen Sie in Jira **Projekteinstellungen → Automatisierung** (oder die globale Automatisierung) und erstellen Sie eine Regel
3. Wählen Sie einen Auslöser, der "ein Vorgang landet bei mir" bedeutet: **Vorgang erstellt**, **Vorgang zugewiesen** oder einen Statusübergang
4. Ergänzen Sie optional eine **JQL-Bedingung**, um die Regel einzugrenzen, zum Beispiel `assignee = currentUser() AND project = ABC`
5. Fügen Sie eine **E-Mail senden**-Aktion an Ihre eigene Adresse hinzu, mit Betreff <span v-pre>`{{issue.key}} - {{issue.summary}}`</span> und einem Text mit <span v-pre>`{{issue.url}}`</span> sowie allen Feldern, die Sie in der Aufgabenbeschreibung haben möchten
6. Legen Sie in Ihrem E-Mail-Programm eine Regel an, die diese Nachrichten in den überwachten Ordner verschiebt

Jedes passende Ereignis erzeugt eine E-Mail, und jede E-Mail wird zu einer Posteingangsaufgabe wie `ABC-123 - Fix the login redirect` mit dem Link in der Beschreibung.

Verwenden Sie eine Automatisierungsregel statt eines Abos auf einen gespeicherten Filter: Abos senden periodisch eine Sammelnachricht mit allen aktuellen Treffern, die zu einer einzigen, wenig hilfreichen Aufgabe würde. Die Automatisierung feuert einmal pro Vorgang.

## Direkt an Ihren Server, per Send web request

Wenn Sie den [selbst gehosteten Cloud-Server](/de/power-users/docker-deployment) betreiben, kann Jira die E-Mail überspringen. Die Automatisierungsaktion **Send web request** sendet jeden Vorgang an [`POST /v1/tasks`](/de/developers/cloud-api), und Ihre Geräte holen die Aufgabe bei der nächsten Synchronisation ab.

1. Erstellen Sie dieselbe Automatisierungsregel wie oben: Auslöser, dann optional eine JQL-Bedingung
2. Fügen Sie eine **Send web request**-Aktion hinzu: Methode `POST`, URL `https://your-server.example/v1/tasks`
3. Ergänzen Sie die Header `Authorization: Bearer <Ihr Token>` (Wert als verborgen markieren) und `Content-Type: application/json`
4. Setzen Sie den Body auf **Custom data** mit dem folgenden JSON

```json
{
  "title": "{{issue.key}} - {{issue.summary.jsonEncode}}",
  "props": { "description": "{{issue.url}}" }
}
```

Die Funktion `.jsonEncode` maskiert Anführungszeichen und andere Zeichen, die eine Zusammenfassung enthalten kann, damit der Request-Body gültiges JSON bleibt. Die Regel läuft in Atlassians Cloud, die Erfassung funktioniert also auch, wenn alle Ihre Rechner aus sind, und nur die von Ihnen zugeordneten Felder verlassen Jira.

## Ein Skript, wenn Sie volle Kontrolle möchten

Alles, was Jiras REST-API abfragen und einen HTTP-Request senden kann, taugt als Brücke: ein Cron-Skript, n8n, Node-RED oder Zapier. Atlassians API-Tokens sind genau für solche persönlichen Skripte gedacht. Das Beispiel unten fragt eine JQL-Suche ab und erfasst neue Vorgänge; bereits gesendete merkt es sich:

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

Ohne Cloud-Server richten Sie dasselbe Skript auf die [Lokale API](/de/power-users/local-api) des Desktops: `http://127.0.0.1:3456/tasks`, gleiches Bearer-Token-Muster, solange die Desktop-App läuft.

## Andere Tracker

Bis auf die Smart Values ist hier nichts Jira-spezifisch. GitHub, GitLab, Linear und die meisten anderen Tracker können eine E-Mail oder einen HTTP-Request senden, wenn ein Vorgang erstellt oder zugewiesen wird, und dieselben drei Rezepte gelten. Wenn Sie eine Brücke bauen, die das Teilen lohnt, posten Sie sie in den [GitHub Discussions](https://github.com/dongdongbh/Mindwtr/discussions), damit andere sie aufgreifen können.
