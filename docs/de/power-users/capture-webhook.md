# Erfassungs-Webhook

Der Erfassungs-Webhook macht aus einer Sprachnotiz oder einem kurzen Text eine Aufgabe im Posteingang. Jedes Gerät, jede App und jedes Skript, das eine HTTP-Anfrage senden kann, schickt den Text und wahlweise eine Audioaufnahme an Ihren eigenen Cloud-Server. Der Server erstellt die Aufgabe, hängt die Aufnahme an, und Ihre Geräte holen bei der nächsten Synchronisierung beides ab.

Dafür brauchen Sie den [selbst gehosteten Cloud-Server](/de/power-users/docker-deployment). Wenn Sie Mindwtr ohne Server nutzen, erfassen Sie stattdessen über das Teilen-Menü des Telefons oder über Siri.

## Der Endpunkt

```text
POST /v1/capture
```

Jede Anfrage trägt denselben Bearer-Token wie der Rest der API, in einem `Authorization: Bearer <token>`-Header. Der Inhalt kann `multipart/form-data` sein, `application/json` mit denselben Feldnamen oder `text/plain`, wobei der gesamte Inhalt die Transkription ist. Unbekannte Felder werden ignoriert.

### Nur Text

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -H "Content-Type: text/plain" \
  --data "Call the dentist about the crown"
```

### Audio mit Transkription

```bash
curl -X POST https://your-server.example/v1/capture \
  -H "Authorization: Bearer $MINDWTR_TOKEN" \
  -F "transcription=Call the dentist about the crown" \
  -F "audio=@note.m4a" \
  -F "recordedAt=1756900000000" \
  -F "client=Pebble Index 01"
```

## Felder

| Feld | Wirkung |
| --- | --- |
| `transcription` | Der erfasste Text. Die erste Zeile wird zum Aufgabentitel, der vollständige Text wird zur Beschreibung. `text` und `title` werden als weitere Namen für dasselbe Feld akzeptiert. |
| `audio` | Die Aufnahme, die an die Aufgabe angehängt wird. Sie wird wie jeder andere Anhang auf Ihre Geräte synchronisiert. |
| `recordedAt` | Der Zeitpunkt der Aufnahme, als Millisekunden seit der Epoche oder als ISO-8601-Zeitstempel. Er wird zur Erstellungszeit der Aufgabe, sofern er gültig ist und nicht in der Zukunft liegt. |
| `client` | Eine kurze Bezeichnung für das Gerät oder die App, die die Erfassung gesendet hat. Sie wird am Ende der Beschreibung als `Captured with <client>` vermerkt. |

Senden Sie mindestens eines der Felder `transcription` und `audio`. Die Aufnahme kann m4a, mp4, aac, mp3, wav, ogg oder webm sein.

## Antworten

| Status | Bedeutung |
| --- | --- |
| `201` | Die Aufgabe wurde erstellt. Der Antwortinhalt ist die neue Aufgabe. |
| `400` | Es wurde weder eine Transkription noch eine Audiodatei gesendet. |
| `401` | Der Token fehlt oder ist falsch. |
| `413` | Die Audiodatei ist größer als das Anhanglimit des Servers. |
| `415` | Der Typ der Audiodatei wird nicht unterstützt. |

## Pebble Index 01

Die App des Pebble Index 01 sendet Sprachnotizen genau in diesem Format und erlaubt eigene Anfrage-Header. Deshalb ist kein Zwischencode nötig: Sie füllen nur zwei Einstellungen aus.

1. Öffnen Sie die Pebble-App auf Ihrem Telefon und gehen Sie zu den Webhook-Einstellungen für Sprachnotizen
2. Setzen Sie die Webhook-URL auf `https://your-server.example/v1/capture`, mit Ihrer eigenen Serveradresse anstelle des Beispiels
3. Fügen Sie einen Anfrage-Header namens `Authorization` mit dem Wert `Bearer <token>` hinzu und verwenden Sie einen Token Ihres Servers
4. Nehmen Sie eine Notiz auf der Uhr auf. Sie erreicht Ihren Posteingang bei der nächsten Synchronisierung, mit der Transkription als Aufgabe und der Aufnahme als Anhang

## Weitere Geräte und Automatisierungen

Nichts davon ist auf Pebble beschränkt. Alles, was ein HTTP-POST senden kann, funktioniert genauso:

- **iOS-Kurzbefehle**: eine Aktion *Inhalte von URL abfragen*, Methode POST, mit dem Header und einem Textfeld
- **Android-Automatisierungs-Apps** wie Tasker: eine HTTP-Request-Aktion mit derselben URL und demselben Header
- **Home Assistant**: ein `rest_command`, das den Text einer Automatisierung oder einer Sprachassistenten-Antwort sendet
- **Shell-Skripte und Cronjobs**: die curl-Befehle von oben, mit dem Token in einer Umgebungsvariablen

## Verwandte Themen

- [Cloud-API](/de/developers/cloud-api)
- [E-Mail-Erfassung](/de/power-users/email-capture)
- [Docker-Bereitstellung](/de/power-users/docker-deployment)
