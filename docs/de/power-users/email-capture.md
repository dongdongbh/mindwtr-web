# E-Mail-Erfassung

Wandeln Sie E-Mails in Aufgaben im Posteingang um. Dafür gibt es drei Wege: die integrierte Erfassung aus einem IMAP-Ordner auf dem Desktop, das Teilen-Menü des Telefons für jeden E-Mail-Anbieter und die Cloud-API für selbst gehostete Bereitstellungen.

Verwandte Themen: [Cloud-API](/de/developers/cloud-api), [Docker-Bereitstellung](/de/power-users/docker-deployment)

## Integriert: einen E-Mail-Ordner mit der Desktop-App überwachen

Verknüpfen Sie Mindwtr Desktop mit einem Ordner in Ihrem eigenen Postfach. Verschieben Sie E-Mails aus einem beliebigen Client dorthin oder leiten Sie sie weiter, und jede Nachricht wird zu einer Aufgabe im Posteingang. Ihre E-Mail gelangt nie auf einen Drittanbieterserver; die Desktop-App kommuniziert per IMAP direkt mit Ihrem E-Mail-Anbieter.

Einrichtung unter **Einstellungen → Integrationen → E-Mail-Erfassung**:

1. Geben Sie Ihren IMAP-Server (beispielsweise `imap.gmail.com`), Ihren Benutzernamen und ein **App-Passwort** ein. Normale Kontopasswörter funktionieren meist nicht; das Passwort wird im Schlüsselbund Ihres Systems gespeichert.
2. Behalten Sie den Standardordner `Mindwtr` bei oder wählen Sie einen eigenen. Falls er nicht vorhanden ist, wird er in Ihrem Postfach erstellt.
3. Aktivieren Sie den Schalter und speichern Sie. Beim Speichern wird die Verbindung geprüft und ein Problem sofort gemeldet.
4. Erstellen Sie in Ihrem E-Mail-Client oder Webmailer eine Regel, die erfassenswerte E-Mails in diesen Ordner verschiebt, oder ziehen Sie sie manuell dorthin.

Solange die Desktop-App läuft, prüft sie den Ordner alle paar Minuten. Der Betreff wird zum Aufgabentitel; Absender und Nachrichtentext werden zur Beschreibung. Die Erfassung ist schreibgeschützt: Mindwtr verändert, verschiebt oder löscht Ihre E-Mails nie und merkt sich bereits importierte Nachrichten, sodass nichts doppelt erscheint. Sie können den Ordner jederzeit archivieren oder aufräumen.

Das Postfach dient als Warteschlange: E-Mails, die bei ausgeschaltetem Computer in den Ordner gelangen, warten dort einfach. Beim nächsten Öffnen von Mindwtr werden sie nachträglich erfasst. Wenn die Erfassung auch bei vollständig ausgeschaltetem Desktop funktionieren soll, verwenden Sie die nachstehenden [Self-Hosted-Rezepte](#e-mails-an-einen-selbst-gehosteten-server-weiterleiten).

Hinweise zu Anbietern:

- **Gmail**: Aktivieren Sie die Bestätigung in zwei Schritten und erstellen Sie anschließend ein [App-Passwort](https://myaccount.google.com/apppasswords); Server: `imap.gmail.com`
- **iCloud Mail**: Erstellen Sie ein [anwendungsspezifisches Passwort](https://support.apple.com/102654); Server: `imap.mail.me.com`
- **Fastmail und übliche IMAP-Server**: Erstellen Sie ein App-Passwort und verwenden Sie den IMAP-Host Ihres Anbieters.
- **Outlook.com und Microsoft 365**: Microsoft hat die passwortbasierte IMAP-Anmeldung deaktiviert. Verwenden Sie stattdessen das [Power-Automate-Rezept](#outlook-und-microsoft-365-power-automate).

## Eine E-Mail vom Telefon teilen

Dies funktioniert bereits unter Android und iOS mit jeder E-Mail-App, die Text teilen kann (Outlook, Gmail, Apple Mail und andere):

1. Öffnen Sie die E-Mail.
2. Tippen Sie auf **Teilen** und wählen Sie **Mindwtr**.
3. Die Erfassungsansicht wird mit dem geteilten Inhalt geöffnet. Speichern Sie ihn im Posteingang.

Dies ist der schnellste Weg, wenn Sie E-Mails auf dem Telefon verarbeiten. Einzelheiten finden Sie unter [Mobil-App](/de/use/mobile#teilen-menu).

## E-Mails an einen selbst gehosteten Server weiterleiten

Wenn Sie den [selbst gehosteten Cloud-Server](/de/power-users/docker-deployment) betreiben, kann jede Automatisierung, die eine HTTP-Anfrage senden kann, über [`POST /v1/tasks`](/de/developers/cloud-api) Aufgaben erstellen. Der Endpunkt akzeptiert einen einfachen `title` oder eine Schnelleingabe als `input` mit derselben Syntax wie die Schnelleingabeleiste in der App.

```bash
curl -X POST https://your-server.example/v1/tasks \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Reply to Dana about the contract", "props": {"description": "From: dana@example.com"}}'
```

Diese Rezepte übertragen nur Text: Der Betreff wird zum `title`, der Absender oder ein Ausschnitt wird in `props.description` geschrieben. Verwenden Sie zum Erfassen eines Anhangs wie einer PDF-Datei stattdessen das Teilen-Menü des Telefons.

Richten Sie die Automatisierung auf Ihren Cloud-Server und nicht auf einen persönlichen Computer. Der Server ist die ständig verfügbare Synchronisierungsquelle. Dadurch funktioniert die Erfassung weiter, wenn Arbeitsplatzrechner und Telefon ausgeschaltet sind; die Geräte übernehmen die Aufgabe bei der nächsten Synchronisierung.

### Outlook und Microsoft 365: Power Automate

Microsoft-Konten funktionieren am besten über Power Automate, da Microsoft keine passwortbasierte IMAP-Anmeldung mehr zulässt:

1. Erstellen Sie einen Flow mit dem Auslöser **When a new email arrives**, gefiltert nach einer Kennzeichnung, Kategorie oder einem eigenen Ordner.
2. Fügen Sie eine **HTTP**-Aktion hinzu: Methode `POST`, die URL `/v1/tasks` Ihres Servers, einen Header `Authorization: Bearer <token>` und einen JSON-Body, der den E-Mail-Betreff `title` und den Absender oder einen Ausschnitt `props.description` zuordnet.
3. Kennzeichnen Sie eine E-Mail oder verschieben Sie sie in den Ordner. Bei der nächsten Synchronisierung erscheint sie in Ihrem Mindwtr-Posteingang.

Der Flow läuft in der Microsoft-Cloud, sodass die Erfassung auch bei ausgeschaltetem Computer funktioniert. Nur die von Ihnen zugeordneten Felder verlassen Ihr Postfach.

### Eine eigene Erfassungsadresse: Cloudflare Email Workers

Wenn Ihre Domain [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/) verwendet, können Sie eine Adresse wie `todo@your-domain.example` erstellen und an einen Email Worker weiterleiten, der Daten direkt an Ihren Server sendet:

```js
export default {
  async email(message, env) {
    const response = await fetch("https://your-server.example/v1/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.MINDWTR_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: message.headers.get("subject") || "Captured email",
        props: { description: `From: ${message.from}` },
      }),
    });
    if (!response.ok) {
      throw new Error(`Mindwtr returned ${response.status}`);
    }
  },
};
```

Speichern Sie das Token als Worker Secret (`wrangler secret put MINDWTR_TOKEN`) und niemals im Skript. Wird bei einer fehlgeschlagenen Antwort ein Fehler ausgelöst, ist die fehlgeschlagene Zustellung sichtbar und der sendende Server kann es erneut versuchen, statt dass die E-Mail verschwindet. Um den Nachrichtentext in die Beschreibung aufzunehmen, parsen Sie die MIME-Rohdaten mit einer Bibliothek wie [postal-mime](https://github.com/postalsys/postal-mime). Die obige Variante nur mit Betreff benötigt kein Parsing.

Alles, was Sie an diese Adresse weiterleiten, wird zu einer Aufgabe im Posteingang. Halten Sie die Adresse geheim oder fügen Sie im Worker eine Zulassungsliste für Absender hinzu, da jeder, der sie kennt, Aufgaben erstellen kann.

### Gmail und alles Weitere: n8n, Zapier, Skripte, Regeln

Dasselbe Muster funktioniert mit jedem Automatisierungswerkzeug, das Ihr Postfach lesen oder E-Mails direkt empfangen und eine HTTP-Anfrage stellen kann:

- **n8n/Node-RED**: ein IMAP- oder Gmail-Auslöseknoten, der Daten an einen HTTP-Anfrageknoten übergibt
- **Zapier**: eine Eingangsadresse von *Email by Zapier* oder ein Gmail-Auslöser, der Daten an einen POST-Schritt von *Webhooks by Zapier* übergibt
- **Ein Skript auf einem ständig laufenden Computer**: einen Postfachordner abfragen und jede neue Nachricht senden
- **Sieve/procmail auf Ihrem E-Mail-Server**: passende E-Mails an ein kleines Skript weiterleiten

Halten Sie das Token geheim: Jeder, der es besitzt, kann die Aufgaben in diesem Namensraum lesen und schreiben.

## Warum es keine Weiterleitungsadresse gibt

Mindwtr stellt bewusst keine gehostete Weiterleitungsadresse bereit: Ein gehostetes Relay würde Ihre private E-Mail durch die Infrastruktur des Projekts leiten, was nicht zu einer Local-First-App passt. Die integrierte Ordnerüberwachung sorgt dafür, dass Ihre E-Mails zwischen Ihrem E-Mail-Server und Ihrem eigenen Gerät bleiben.
