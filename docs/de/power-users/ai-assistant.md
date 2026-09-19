# KI-Assistent (BYOK)

Mindwtr enthält einen optionalen KI-Assistenten, der dabei hilft, Aufgaben zu klären, aufzuteilen und veraltete Einträge zu überprüfen. Er ist **standardmäßig deaktiviert** und verwendet das Modell **Bring Your Own Key (BYOK)**, also Ihren eigenen API-Schlüssel.

## Datenschutzmodell

- **Lokale Speicherung**: Ihre Aufgabendatenbank wird auf Ihrem Gerät gespeichert. Wenn Sie einen optionalen KI-Anbieter verwenden, werden die für die Anfrage benötigten Aufgabeninhalte an den gewählten Anbieter gesendet.
- **Bei Bedarf**: Anfragen werden nur gesendet, wenn Sie KI-Aktionen verwenden oder Copilot-Vorschläge aktivieren. Beim Öffnen der KI-Einstellungen mit hinterlegtem Schlüssel wird außerdem die aktuelle Modellliste Ihres Anbieters abgefragt, damit die Modellauswahl aktuell bleibt — Aufgabendaten werden dabei nicht übertragen.
- **Auf das Nötige beschränkt**: Der Assistent erhält nur die benötigten Aufgabendaten.

## Unterstützte Anbieter

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Konfigurieren Sie den Assistenten auf dem Desktop unter **Einstellungen → KI-Assistent** oder auf Mobilgeräten unter **Menü → Einstellungen → Erweitert → KI-Assistent**:

- KI aktivieren/deaktivieren
- Anbieter
- Modell
- optionale benutzerdefinierte OpenAI-kompatible Basis-URL
- API-Schlüssel (wird nur lokal gespeichert)
- Schlussfolgerungsaufwand/Thinking-Budget (anbieterabhängig)
- optionaler Schalter **„Denken aktivieren“** für Claude/Gemini (fügt erweitertes Schlussfolgern hinzu)

## OpenAI-kompatible Endpunkte (lokal oder gehostet)

Mindwtr kann mit jedem Dienst kommunizieren, der eine **OpenAI-kompatible Chat Completions API** bereitstellt. Dazu gehören lokale Server und einige gehostete Anbieter.

Verwenden Sie diese Einrichtung für:

- **Offizielles OpenAI**: Lassen Sie **Benutzerdefinierte Basis-URL** leer und verwenden Sie Ihren OpenAI-API-Schlüssel.
- **Lokale Server**: llama.cpp, Ollama, LM Studio, LocalAI, vLLM und ähnliche.
- **Gehostete OpenAI-kompatible Anbieter**: beispielsweise xAI (Grok), GLM oder andere Anbieter mit einem OpenAI-kompatiblen Endpunkt.

1. Starten Sie bei Bedarf einen OpenAI-kompatiblen Endpunkt oder verschaffen Sie sich Zugriff darauf.
2. Auf dem Desktop unter **Einstellungen → KI-Assistent** oder auf Mobilgeräten unter **Menü → Einstellungen → Erweitert → KI-Assistent**:
   - Setzen Sie **Anbieter** auf **OpenAI**.
   - Setzen Sie **Modell** auf den Modellnamen, den dieser Dienst bereitstellt.
   - Setzen Sie **Benutzerdefinierte Basis-URL** auf die Basis-URL des Dienstes.
   - Geben Sie einen **API-Schlüssel** ein, falls der Dienst Bearer-Authentifizierung verlangt.
3. Lassen Sie **Benutzerdefinierte Basis-URL** nur für das offizielle OpenAI leer.
4. Lassen Sie **API-Schlüssel** nur leer, wenn Ihr benutzerdefinierter Endpunkt nicht authentifizierte Anfragen erlaubt.

Mindwtr hängt `/chat/completions` automatisch an. Verwenden Sie daher die Basis-URL des Anbieters statt des vollständigen Chat-Completions-Pfads, sofern Ihr Dienst nicht den vollständigen Pfad verlangt.

Übliche Basis-URLs:
- **llama.cpp**: `http://localhost:8080/v1`
- **Ollama**: `http://localhost:11434/v1`
- **LM Studio**: `http://localhost:1234/v1`
- **LocalAI/vLLM**: `http://localhost:8080/v1`

Beispiel für gehostete Endpunkte im GLM-Stil:

- **Anbieter**: `OpenAI`
- **Modell**: die von Ihrem Anbieter bereitgestellte GLM-Modell-ID, etwa `GLM-4.7`
- **Benutzerdefinierte Basis-URL**: die OpenAI-kompatible Basis-URL Ihres Anbieters
- **API-Schlüssel**: falls erforderlich, der Schlüssel Ihres Anbieters

Beispiel für xAI (Grok):

- **Anbieter**: `OpenAI`
- **Modell**: eine Grok-Modell-ID aus der Modellliste von xAI, etwa `grok-4.6`
- **Benutzerdefinierte Basis-URL**: `https://api.x.ai/v1`
- **API-Schlüssel**: Ihr xAI-API-Schlüssel

## Langsame Modelle und Zeitlimits

In den KI-Assistenten-Einstellungen auf Desktop und Mobilgeräten finden Sie unter **Erweitert → Zeitlimit für Anfragen** die Optionen **30, 60, 120 oder 300 Sekunden**; der Standard bleibt 30 Sekunden. Bei einem langsamen lokalen Modell können Sie zunächst 120 Sekunden versuchen.

Das Limit gilt für Antworten des KI-Assistenten und von Copilot, nicht für Transkription oder das Laden der Modellliste. Abgebrochene Anfragen und Anfragen mit Zeitüberschreitung werden nicht automatisch wiederholt. Vorübergehende Netzwerk- oder Serverfehler können weiterhin begrenzt wiederholt werden. Das Zeitlimit folgt Ihrer bestehenden Einstellung zur Synchronisierung der KI-Einstellungen.

### Kürzere Antworten von lokalen Modellen

Ein längeres Zeitlimit gibt dem Modell mehr Zeit, verringert aber nicht die erzeugte Textmenge. Manche Modelle verbrauchen Tokens für das Nachdenken, bevor die kurze sichtbare Antwort entsteht.

Wählen Sie **Anbieter → OpenAI**, öffnen Sie **Zusätzliche Anfrageparameter** in den KI-Assistenten-Einstellungen, fügen Sie ein JSON-Objekt ein und speichern Sie die Parameter. Mindwtr fügt diese Felder direkt in Anfragen des KI-Assistenten und von Copilot ein; umschließen Sie sie nicht mit `extra_body`. Die Felder `model`, `messages` und `response_format` werden weiterhin von Mindwtr festgelegt.

Für **llama.cpp mit einem Qwen-Modell, dessen Chat-Vorlage das Abschalten des Nachdenkens unterstützt**, können Sie hiermit beginnen:

```json
{
  "max_tokens": 512,
  "chat_template_kwargs": {
    "enable_thinking": false
  }
}
```

Der verschachtelte Parameter folgt der [llama.cpp-Serverdokumentation](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md). Andere Server benötigen möglicherweise ein anderes Feld oder eine serverseitige Einstellung; `enable_thinking` auf oberster Ebene ist nicht mit diesem Objekt austauschbar. Prüfen Sie Serverversion und Modellvorlage.

- **512 ist eine anfängliche Obergrenze, kein Zielwert.** Wird die Antwort abgeschnitten oder kann Mindwtr sie nicht auswerten, versuchen Sie 1024 oder entfernen Sie die Grenze. Eine Review-Analyse benötigt eventuell mehr Platz als eine kurze Aufgabenaufteilung.
- **Ändern Sie jeweils nur eine Einstellung.** Vergleichen Sie dieselbe Aufgabe mit deaktiviertem Nachdenken und passen Sie danach die Grenze an. Eine niedrigere `temperature` verändert die Auswahl der Tokens; sie begrenzt nicht die Länge.
- **Bei weiteren Zeitüberschreitungen** versuchen Sie ein kleineres Modell oder 300 Sekunden. Leeren und speichern Sie die zusätzlichen Parameter, um zu Mindwtrs Standardwerten zurückzukehren.

[HeikoMarkgraf teilte in Diskussion #1188 eine funktionierende Qwen3.5-4B-Konfiguration](https://github.com/dongdongbh/Mindwtr/discussions/1188#discussioncomment-18448971) mit etwa 6,45 Sekunden für Vorschläge und 37 Sekunden für die Aufgabenaufteilung. Das sind Community-Ergebnisse für diese Umgebung, kein Benchmark für das kleinere Beispiel oben. Die vollständige Konfiguration steht in der Diskussion; manche Felder können serverspezifisch sein oder anderswo ignoriert werden.

## Funktionen

### Klären
Wandelt eine vage Aufgabe in eine konkrete nächste Aktion mit vorgeschlagenen Kontexten/Tags um.

### Aufteilen
Erzeugt eine kurze Checkliste mit nächsten Schritten für umfangreiche Aufgaben. Sie entscheiden, welche Vorschläge übernommen werden.

### Durchsichtsanalyse
Während der wöchentlichen Durchsicht kann der Assistent veraltete Aufgaben kennzeichnen und Aktionen vorschlagen, zum Beispiel:
- Nach Irgendwann/Vielleicht verschieben
- Archivieren
- Aufteilen
- Behalten

### Copilot-Vorschläge
(Verfügbar im Aufgabeneditor, in der Schnell-hinzufügen-Zeile der Desktop-Listen und in der mobilen Schnellerfassung)

Während Sie tippen, kann Mindwtr Folgendes vorschlagen:
- Kontexte
- Tags
- Zeitschätzungen

Copilot übernimmt Änderungen nie ohne Ihre Zustimmung.

### Sprache zu Text

Transkribiert Sprachnotizen in Aufgaben.

- **Offline (Whisper)**: Laden Sie ein Modell herunter (ca. 75 MB für Tiny, ca. 150 MB für Base), um vollständig offline zu transkribieren.
  Das Modell wird von Hugging Face (huggingface.co) geladen. Ist dieser Server nicht erreichbar, was in Festlandchina häufig vorkommt, versucht Mindwtr anschließend den Spiegel hf-mirror.com. In beiden Fällen wird die Datei vor der Verwendung mit ihrer bekannten SHA-256-Prüfsumme verglichen. Schlägt beides fehl, versuchen Sie ein anderes Netzwerk oder nutzen Sie einen Cloud- oder selbst gehosteten Anbieter.
- **Cloud (OpenAI/Gemini)**: Verwenden Sie Ihren API-Schlüssel für eine besonders genaue Transkription.
- **Selbst gehostet (OpenAI-kompatibel)**: Legen Sie unter dem OpenAI-Sprachanbieter eine benutzerdefinierte Basis-URL fest, um auf Ihrem eigenen Server statt über api.openai.com zu transkribieren. Alles, was OpenAIs `/v1/audio/transcriptions` bereitstellt, funktioniert (whisper.cpp, Speaches, LocalAI, vLLM); ein API-Schlüssel ist dort optional, und das Modellfeld akzeptiert den Modellnamen Ihres Servers.
- **Modi**:
  - **Intelligent auswerten**: Extrahiert Fälligkeitsdaten, Projekte und Prioritäten aus natürlicher Sprache (z. B. „Morgen Milch kaufen, Priorität hoch“).
  - **Nur Transkript**: Nur der Text.

#### Selbst gehostete Transkription

Setzen Sie den Sprachanbieter auf OpenAI und tragen Sie dann die Basis-URL ein: die Wurzel Ihres Servers, endend auf `/v1` (zum Beispiel `http://localhost:8000/v1`). Mindwtr sendet die Aufnahme dorthin an `/v1/audio/transcriptions`, genau wie an OpenAI.

- Lassen Sie den API-Schlüssel leer, wenn Ihr Server keinen benötigt.
- Die Modellauswahl zeigt, was Ihr Server unter `/v1/models` meldet, sofern er antwortet; andernfalls werden Vorschläge angezeigt. Sie können jederzeit einen beliebigen Modellnamen eingeben — die Liste ist keine feste Auswahl.
- Ein Sprachserver übernimmt nur die Transkription. **Intelligent auswerten** benötigt ein Sprachmodell; ist kein KI-Assistent konfiguriert, wird eine Aufnahme zu einer Aufgabe mit dem Transkript als Titel, ohne dass Fälligkeitsdaten, Projekte oder Prioritäten daraus extrahiert werden. Konfigurieren Sie den Assistenten separat, wenn Sie das möchten.

## Hinweise

- KI ist **optional**. Mindwtr funktioniert ohne sie.
- Antworten werden als strukturiertes JSON ausgewertet. Schlägt die Auswertung fehl, werden keine Änderungen übernommen.
## Whisper-Sprachcodes

Wenn Sie das Offline-Modell von Whisper verwenden, legen Sie den Sprachcode auf dem Desktop unter **Einstellungen → KI-Assistent → Audiosprache** oder auf Mobilgeräten unter **Menü → Einstellungen → Erweitert → KI-Assistent → Audiosprache** fest.
Die Liste der Sprachen finden Sie hier: [Whisper-Sprachliste](https://whisper-api.com/docs/languages/).

## Apple-Modellauswertungen (nur Entwicklungsbuilds)

Apple Foundation Models sind noch kein KI-Anbieter in der Produktionsversion. Der iOS-Entwicklungsprototyp bietet auf geeigneten Geräten eine optionale lokale Inbox-Klärung. Vorschläge bleiben bearbeitbar und benötigen eine ausdrückliche Bestätigung; nicht verfügbare Modelle blockieren weder die manuelle Verarbeitung noch lösen sie automatisch Cloud-Anfragen aus.

Ein separat aktivierter Evaluator für Private Cloud Compute (PCC) vergleicht feste synthetische Beispiele mit dem lokalen Modell. Er liest oder überträgt keine Aufgaben, übernimmt keine Vorschläge und ändert keine synchronisierten Einstellungen. Jede PCC-Anfrage benötigt eine ausdrückliche Zustimmung und kann Netzwerkzugriff sowie Apples tägliches Kontingent nutzen; Fehler führen nicht zu automatischen Cloud- oder lokalen Wiederholungen.

Die PCC-Auswertung benötigt mindestens iOS 27, ein geeignetes Gerät und einen korrekt provisionierten, signierten Entwicklungsbuild. Der Zugriff des Teams auf das Entitlement beweist nicht, dass ein Build Anfragen ausführen kann. Produktionsfreigabe, Modellqualität und Tests auf echten Geräten stehen noch aus. Siehe die [Entwickler-Checkliste](https://github.com/dongdongbh/Mindwtr/blob/main/docs/development/apple-pcc-evaluation.md).
