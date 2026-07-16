# KI-Assistent (BYOK)

Mindwtr enthält einen optionalen KI-Assistenten, der dabei hilft, Aufgaben zu klären, aufzuteilen und veraltete Einträge zu überprüfen. Er ist **standardmäßig deaktiviert** und verwendet das Modell **Bring Your Own Key (BYOK)**, also Ihren eigenen API-Schlüssel.

## Datenschutzmodell

- **Local First**: Ihre Daten bleiben auf Ihrem Gerät.
- **Bei Bedarf**: Anfragen werden nur gesendet, wenn Sie KI-Aktionen verwenden oder Copilot-Vorschläge aktivieren.
- **Auf das Nötige beschränkt**: Der Assistent erhält nur die benötigten Aufgabendaten.

## Unterstützte Anbieter

- **OpenAI**
- **Google Gemini**
- **Anthropic (Claude)**

Konfigurieren Sie unter **Einstellungen → KI-Assistent**:

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
- **Gehostete OpenAI-kompatible Anbieter**: beispielsweise GLM oder andere Anbieter mit einem OpenAI-kompatiblen Endpunkt.

1. Starten Sie bei Bedarf einen OpenAI-kompatiblen Endpunkt oder verschaffen Sie sich Zugriff darauf.
2. Unter **Einstellungen → KI-Assistent**:
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
(Nur in den Ansichten Posteingang und Fokus verfügbar)

Während Sie tippen, kann Mindwtr Folgendes vorschlagen:
- Kontexte
- Tags
- Zeitschätzungen

Copilot übernimmt Änderungen nie ohne Ihre Zustimmung.

### Sprache zu Text

Transkribiert Sprachnotizen in Aufgaben.

- **Offline (Whisper)**: Laden Sie ein Modell herunter (ca. 75 MB für Tiny, ca. 150 MB für Base), um vollständig offline zu transkribieren.
- **Cloud (OpenAI/Gemini)**: Verwenden Sie Ihren API-Schlüssel für eine besonders genaue Transkription.
- **Modi**:
  - **Intelligent auswerten**: Extrahiert Fälligkeitsdaten, Projekte und Prioritäten aus natürlicher Sprache (z. B. „Morgen Milch kaufen, Priorität hoch“).
  - **Nur Transkript**: Nur der Text.

## Hinweise

- KI ist **optional**. Mindwtr funktioniert ohne sie.
- Antworten werden als strukturiertes JSON ausgewertet. Schlägt die Auswertung fehl, werden keine Änderungen übernommen.
## Whisper-Sprachcodes

Wenn Sie das Offline-Modell von Whisper verwenden, können Sie unter Einstellungen → KI-Assistent → Audiosprache einen ausdrücklichen Sprachcode festlegen.
Die Liste der Sprachen finden Sie hier: [Whisper-Sprachliste](https://whisper-api.com/docs/languages/).
