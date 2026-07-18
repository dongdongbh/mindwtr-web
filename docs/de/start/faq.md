# FAQ

Häufig gestellte Fragen zu Mindwtr.

---

## Allgemein

### Was ist Mindwtr?

Mindwtr ist eine plattformübergreifende Produktivitäts-App nach Getting Things Done (GTD), mit der Sie Aufgaben erfassen, klären, organisieren und erledigen können. Sie ist für Desktop (Windows, macOS, Linux) und Mobilgeräte (Android, iOS) verfügbar.

### Ist Mindwtr kostenlos? Wird es kostenlos bleiben?

Ja. Mindwtr ist quelloffen (AGPL-3.0) und kostenlos nutzbar. Es gibt weder Bezahlschranken noch Abonnements oder Premiumstufen für die Synchronisierung oder andere Funktionen. Das soll so bleiben: Gute Software sollte unabhängig von der finanziellen Situation allen zugänglich sein. Unterstützung sollte von Menschen kommen, die freiwillig etwas geben, nicht aus einer Bezahlschranke.

Das Projekt verursacht laufende Kosten: die jährliche Apple-Entwicklergebühr, Hosting, Entwicklungswerkzeuge sowie die Zeit für Funktionen, Fehlerbehebungen und Community-Support. [Spenden](https://mindwtr.app/donate) halten es langfristig am Leben.

Ein ehrlicher Vorbehalt: Derzeit decken Spenden die Kosten nicht, und der Maintainer trägt die Differenz. Sollte diese Lücke einmal untragbar werden, könnte ein optionaler kostenpflichtiger Dienst hinzukommen (etwa ein gehosteter Synchronisierungsserver für Personen, die nicht selbst hosten möchten). Die App selbst bleibt in jedem Fall kostenlos und quelloffen. Keine heute verfügbare Funktion würde hinter eine Bezahlschranke verschoben.

### Wie lange wird Mindwtr gepflegt?

Mindwtr ist ein Herzensprojekt und zugleich das Werkzeug, mit dem der Maintainer sein eigenes Leben organisiert. Es wird also gepflegt, weil er selbst darauf angewiesen ist. Der Commit-Verlauf zeigt ehrlich, wie das in der Praxis aussieht.

Kein Einzelprojekt kann „für immer“ versprechen. Deshalb ist Mindwtr so gestaltet, dass selbst der schlimmste Fall sicher bleibt: Es ist Local-first, Ihre Daten liegen in offenen Formaten in Dateien unter Ihrer Kontrolle, und der Code steht unter der AGPL mit reproduzierbaren Builds auf unabhängigen Kanälen. Selbst wenn die Entwicklung endete, funktioniert die App offline weiter, Ihre Daten bleiben lesbar und jeder kann den Code forken. Sie können Ihren Arbeitsablauf darauf aufbauen oder jederzeit mit intakten Daten wieder gehen.

### Wurde Mindwtr von KI erzeugt? Welche Haltung hat das Projekt zu KI?

Mindwtr wird durch KI unterstützt, aber nicht von KI erzeugt. Dieser Unterschied ist wichtig.

Architektur, Produktausrichtung, Funktionsgestaltung und GTD-Philosophie werden vom Maintainer entworfen und verantwortet. KI-Werkzeuge helfen bei der Umsetzung: schneller Entwürfe erstellen, Standardcode reduzieren, Formulierungen verbessern und Fehleranalysen beschleunigen. Jede veröffentlichte Änderung wird weiterhin spezifiziert, geprüft und getestet; der Maintainer trägt die Verantwortung für das Ergebnis.

KI-unterstützte Entwicklung ist heute normale Softwareentwicklung, auch bei großen Technologieunternehmen und in Open-Source-Projekten. KI ist ein Werkzeug wie IDEs, Autovervollständigung, Dokumentation und Stack Overflow. Sie ersetzt die Arbeit des Entwicklers nicht, sondern verschiebt sie stärker auf Ausrichtung, Urteilsvermögen, Prüfung, Integration und Validierung.

Mindwtr wird von einem einzelnen Entwickler mit mehr als 10 Jahren Erfahrung in der Softwareentwicklung gepflegt. Diese Erfahrung macht KI nützlich statt gefährlich: zu wissen, was gebaut werden sollte, was nicht, wann eine Ausgabe falsch ist und wie das System kohärent bleibt. KI hilft einer einzelnen Person, ein so breites Projekt wartbar zu halten, entscheidet aber nicht über das Design und verantwortet nicht das Ergebnis.

Antworten auf Issues und Diskussionen schreibt der Maintainer. KI kann zur sprachlichen Überarbeitung des Englischen dienen, aber kein Agent sortiert oder beantwortet Issues automatisch.

Hinweise für Beiträge finden Sie im [Abschnitt zur LLM-unterstützten Programmierung in CONTRIBUTING.md](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md#llm-assisted-coding-vibe-coding).

### Warum gibt es so viele Commits und Issue-Berichte?

Mindwtr ist eine plattformübergreifende Endbenutzer-App, kein kleines CLI-Programm oder eine Bibliothek mit einer einzigen schmalen Befehlsoberfläche. Sie umfasst Desktop- und Mobil-Clients, Local-first-Persistenz, Synchronisierungs-Backends, Importe, Benachrichtigungen, Schnellerfassung, Widgets, Übersetzungen, Installationskanäle und Entscheidungen zum GTD-Arbeitsablauf. Bei einem solchen Produkt entstehen viele kleine Folge-Commits, weil UI-Feinschliff, Plattformunterschiede, Paketierungsfehler und Sonderfälle zur normalen Wartung gehören.

Auch die öffentliche Issue-Anzahl ist bewusst breit. GitHub-Issues umfassen Funktionswünsche, UX-Verbesserungen, plattformspezifische Sonderfälle, Release-Paketierungsberichte, Dokumentationslücken und bestätigte Fehler. Viele Meldungen blockieren den grundlegenden Erfassen-/Organisieren-/Durchsichtsablauf nicht, werden aber öffentlich verfolgt, damit Benutzer sehen können, was bekannt ist und was sich geändert hat. Schnelle Folgekorrekturen gehören zum Wartungsmodell und bedeuten nicht, dass Probleme ignoriert oder verborgen werden.

### Gibt es eine Roadmap oder eine Seite mit geplanten Funktionen?

Wir pflegen keine feste Roadmap-Seite. Die aktuelle Roadmap ist die Liste der GitHub-Issues:
https://github.com/dongdongbh/Mindwtr/issues

Wenn Sie eine Funktion wünschen, eröffnen Sie bitte ein Issue und beschreiben Sie den zu unterstützenden Arbeitsablauf.

### Wo sollte ich Fehler melden oder Funktionen anfragen?

Am besten in einem **GitHub-Issue**. So bleiben Protokolle, Gerätedetails und Rückfragen gemeinsam nachvollziehbar und durchsuchbar:
https://github.com/dongdongbh/Mindwtr/issues

Weitere Kontaktmöglichkeiten:

- **Feedback in der App**: Verwenden Sie **Feedback senden** unter **Einstellungen → Über**, wenn die Funktion in Ihrem Build verfügbar ist. Sie können ohne GitHub-Konto einen Fehlerbericht, Funktionswunsch oder sonstigen Hinweis senden; die Antwort-E-Mail ist optional. Bei Fehlerberichten hängt **Letzte Diagnosedaten einbeziehen** eine begrenzte Momentaufnahme der jüngsten Ansichten und Aktionen in der App sowie verfügbare aktuelle Diagnoseprotokolle an. Dies funktioniert auch bei deaktivierter ausführlicher Protokollierung; die zusätzliche Momentaufnahme wird nicht auf dem Gerät gespeichert. Einzelheiten enthält die [Datenschutzrichtlinie](https://mindwtr.app/privacy).
- **E-Mail**: Für Anliegen, die nicht in ein öffentliches Issue passen (private oder kontobezogene Fragen), schreiben Sie an [support@mindwtr.app](mailto:support@mindwtr.app).

Geben Sie bei Fehlerberichten bitte **Plattform** und **App-Version** (Einstellungen → Über) an.

Wenn Mindwtr Ihnen nützt, finden Sie Unterstützungsmöglichkeiten auf der [Supportseite](https://mindwtr.app/support).

### Kann ich mehrere Fenster öffnen?

Derzeit nicht. Die Desktop-App verwendet ein einzelnes Fenster, damit das Local-first-SQLite-Datenmodell sicher und konsistent bleibt. Mehrfensterunterstützung wird häufig gewünscht, ist aber noch nicht verfügbar.

### Gibt es eine Spendenseite?

Ja. Alle Unterstützungsmöglichkeiten finden Sie auf der [Spendenseite](https://mindwtr.app/donate).

### Welche Sprachen werden unterstützt?

Mindwtr bietet derzeit folgende Sprachoptionen, ungefähr nach der weltweiten Gesamtzahl der Sprecher geordnet:

- English
- 中文（简体）
- 中文（繁體）
- हिन्दी
- Español
- العربية
- Français
- Português
- Русский
- Deutsch
- 日本語
- Tiếng Việt
- Türkçe
- 한국어
- Italiano
- Polski
- Nederlands
- Čeština

### Wo werden meine Daten gespeichert?

Alle Daten werden lokal auf Ihrem Gerät gespeichert:
- **Desktop-Daten (Linux):** `~/.local/share/mindwtr/data.json`
- **Desktop-Konfiguration (Linux):** `~/.config/mindwtr/config.toml`
- **Windows/macOS:** `%APPDATA%/mindwtr/` oder `~/Library/Application Support/mindwtr/`
- **Mobilgeräte:** interner App-Speicher

Einzelheiten finden Sie unter [Daten und Synchronisierung](/de/data-sync/).

### Gibt es eine Cloud-Synchronisierung?

Mindwtr unterstützt Dateisynchronisierung, WebDAV, selbst gehostete Cloud-Synchronisierung und Dropbox-Synchronisierung (in unterstützten Builds). Siehe [Daten und Synchronisierung](/de/data-sync/).

### Welche Synchronisierung ist schneller: lokaler Ordner oder WebDAV?

Bei ähnlicher Hardware und Netzwerkentfernung ist die **lokale Ordnersynchronisierung normalerweise schneller** als WebDAV. Die Ordnersynchronisierung liest und schreibt die Momentaufnahme mit einfachen Dateisystemaufrufen, während WebDAV je Anfrage HTTP-Rundläufe, Authentifizierung und Serververarbeitung hinzufügt. Besonders sichtbar wird der Unterschied bei großen Anhängen, die über WebDAV einzeln hoch- und heruntergeladen werden. Der Engpass ist jedoch meist der Speicheranbieter hinter dem Ordner (etwa ein im Hintergrund laufender Syncthing- oder Cloud-Drive-Client), nicht Mindwtr. Wählen Sie das passende Backend; unter [Datenlebenszyklus](/de/data-sync/data-lifecycle) erfahren Sie, was bei der Synchronisierung tatsächlich übertragen wird.

### Unterstützt Mindwtr iCloud direkt?

Ja, in unterstützten Apple-Builds.

- **iPhone / iPad:** natives **iCloud**-Backend unter **Einstellungen → Synchronisierung**
- **macOS-Desktop:** natives **iCloud**-Backend unter **Einstellungen → Synchronisierung**
- **Android / Windows / Linux:** kein natives iCloud-Backend

Siehe [iCloud-Synchronisierung](/de/data-sync/icloud) und [Daten und Synchronisierung](/de/data-sync/).

### Wie synchronisiere ich mit OneDrive (insbesondere unter Android)?

Mindwtr funktioniert bereits **über Dateisynchronisierung** mit OneDrive:

- **Windows/macOS:** Legen Sie Ihre Mindwtr-`data.json` im OneDrive-Ordner ab. OneDrive übernimmt die Synchronisierung.
- **Android:** Die offizielle OneDrive-App bietet **keine** echte beidseitige Ordnersynchronisierung. Verwenden Sie eine „Brücken“-App wie **OneSync (Autosync for OneDrive)** oder **FolderSync**, um einen lokalen Ordner zu synchronisieren. Wählen Sie diesen Ordner anschließend in Mindwtr unter **Einstellungen → Synchronisierung** aus (Mindwtr verwendet darin `data.json`).

Dies entspricht dem Ansatz anderer Local-first-Apps wie Obsidian.

### Warum gibt es keine Schaltfläche „Mit OneDrive / Google Drive anmelden“?

Mindwtr ist Local-first und Offline-first.

In unterstützten Builds bietet Mindwtr inzwischen eine native **Dropbox-OAuth**-Synchronisierung, aber keine native OneDrive-/Google-Drive-OAuth-Integration. Jeder zusätzliche Anbieter verursacht erheblichen Wartungs- und Compliance-Aufwand.

Für OneDrive/Google Drive hält die Dateisynchronisierung Ihre Daten unter Ihrer Kontrolle und vermeidet eine große Wartungs- und Sicherheitslast.

### Kann Mindwtr E-Mails (Gmail/Outlook) integrieren oder weitergeleitete E-Mails empfangen?

Nicht direkt. Ein vollständiger E-Mail-Client erfordert:

- OAuth-Zugriff auf Gmail/Outlook (inzwischen mit kostspieligen Sicherheitsaudits)
- robuste MIME-/HTML-Auswertung und Anhangsverarbeitung
- fortlaufende Wartung über Anbieter hinweg

**Derzeitige Alternativen:**
- **Desktop:** Fügen Sie `message://`- oder E-Mail-Links in eine Aufgabe ein oder ziehen Sie eine E-Mail in Clients, die dies unterstützen, in eine Aufgabennotiz.
- **Mobilgeräte:** Senden Sie ausgewählte E-Mail-Inhalte über das Teilen-Menü an Mindwtr.

Mindwtr bietet keinen Posteingang `add@mindwtr.com`, weil dafür ein zentraler Server Ihre E-Mails empfangen und speichern müsste.

---

## Funktionen

### Was ist GTD?

Getting Things Done (GTD) ist eine von David Allen entwickelte Produktivitätsmethode. Sie besteht aus fünf Schritten: Erfassen, Klären, Organisieren, Reflektieren und Erledigen. Siehe [GTD-Überblick](/de/use/gtd-overview).

### Wie werden die GTD-Horizonte in Mindwtr abgebildet?

Mindwtr bildet die unteren Horizonte nativ ab:

- **Horizont 0 (Aktionen):** Nächste Aktionen und Aufgabenlisten
- **Horizont 1 (Projekte):** eigene Projektentitäten
- **Horizont 2 (Bereiche):** Bereiche gruppieren verwandte Projekte

Für die Horizonte 3–5 (Ziele, Vision, Zweck) gibt es noch keine eigene Entität. Die meisten Benutzer verwalten sie mit:

- einer **Referenz**liste (oder einem Bereich „Ziele“)
- Projektnotizen und Links zu diesen Referenzeinträgen
- der Checkliste des Wochenrückblicks

Wenn Sie ausdrückliche Ziel-/Visionsobjekte benötigen, eröffnen Sie bitte ein Issue und beschreiben Sie Ihren gewünschten Arbeitsablauf und Durchsichtsrhythmus.

### Wozu dient ein Projektabschnitt?

Ein **Projektabschnitt** ist eine benannte Gruppe innerhalb eines Projekts. Verwenden Sie Abschnitte, um längere Projekte lesbar zu halten, etwa **Design**, **Entwicklung** und **Inhalt** in einem Projekt **Website veröffentlichen**.

Abschnitte sind weder Unteraufgaben noch separate Projekte. Sie sind lediglich Überschriften für Aufgaben innerhalb desselben Projektergebnisses.

Das Feld **Projektabschnitt** einer Aufgabe weist sie einem Abschnitt ihres aktuellen Projekts zu. Es wirkt nur, wenn die Aufgabe bereits zu einem Projekt mit Abschnitten gehört. Hat sie kein Projekt oder besitzt das Projekt keine Abschnitte, lassen Sie es leer.

### Warum kann ein Projekt mehrere nächste Aufgaben besitzen?

In Mindwtr ist **Nächstes** ein Aufgabenstatus: Die Aufgabe wurde geklärt und ist ausführbar. Das entspricht nicht immer „der einen nächsten Aktion“ eines Projekts.

Der Projekttyp steuert, was angezeigt wird:

- **Sequenziell:** Jeweils eine verfügbare nächste Aufgabe wird angezeigt. Spätere nächste Aufgaben bleiben im Projekt und warten.
- **Parallel:** Mehrere unabhängige nächste Aufgaben können angezeigt werden, weil sie in beliebiger Reihenfolge ausführbar sind.

Spätere Schritte in einem sequenziellen Projekt sind keine **Referenz**. Referenz dient nicht ausführbarem Begleitmaterial, Notizen und Dokumenten.

### Wie markiere ich ein Projekt als erledigt?

**Archivieren Sie es** – Archivieren ist in Mindwtr der Projektabschluss. Öffnen Sie das Projekt und verwenden Sie **Archivieren** (auf dem Desktop in der Projektüberschrift, auf Mobilgeräten unter **Aktionen** in den Projektdetails). Unfertige Aufgaben werden mit abgeschlossen; **Reaktivieren** stellt alles wieder her, falls Sie zu früh archiviert haben. Wenn Sie die letzte Aktion eines Projekts abschließen, bietet die Frage „Was ist die nächste Aktion?“ außerdem direkt **Projekt abschließen** an. Ein Projekt mit ausschließlich erledigten Aufgaben bleibt ansonsten aktiv, bis Sie das Ergebnis selbst schließen – ein hilfreicher Hinweis im Wochenrückblick.

### Kann ich eine Aufgabe in ein Projekt umwandeln?

Ja. Am einfachsten während der Posteingangsverarbeitung: Wenn der geführte Ablauf fragt, ob ein Eintrag mehr als einen Schritt erfordert, antworten Sie mit Ja. Die Erfassung wird zu einem Projekt, das Sie benennen und dessen erste nächste Aktion Sie festlegen. Weitere Aktionen landen mit bereits zugewiesenem Projekt wieder im Posteingang und erhalten jeweils einen eigenen Klärungsdurchlauf. Siehe [GTD-Arbeitsablauf](/de/use/gtd-workflow).

### Warum erscheint eine Aufgabe nicht in „Fokus“?

„Fokus“ zeigt bewusst nur, was Sie jetzt erledigen können. Eine Aufgabe kann aus mehreren Gründen ausgeblendet sein:

- Sie besitzt ein **zukünftiges Startdatum** und erscheint bei dessen Eintritt wieder.
- Sie ist eine **spätere Aufgabe in einem sequenziellen Projekt**; nur die erste verfügbare Aufgabe wird angezeigt.
- Ein aktiver **Kontextfilter** schließt sie aus.
- Ihr Status ist nicht ausführbar (Posteingang, Irgendwann, Warten).

Verwenden Sie **Projekte**, **Kontexte** oder die **Suche**, um den vollständigen Aufgabenbestand zu prüfen. Siehe [So sortiert „Fokus“ verfügbare Aktionen](/de/use/gtd-workflow#how-focus-sorts-available-actions).

### Unterstützt Mindwtr Startdaten oder Wiedervorlagen?

Ja, beides:

- Das **Startdatum** stellt eine Aufgabe zurück: Ein zukünftiger Start blendet sie aus „Fokus“ und „Nächste Aktionen“ aus; beim Erreichen erscheint sie mit ihrem bisherigen Status wieder. „Fokus“ und „Nächste Aktionen“ blenden zurückgestellte Aufgaben bis zum Starttag aus. Verwenden Sie **Projekte** oder die **Suche**, um sie früher zu sehen.
- Das **Wiedervorlagedatum** ist ein Tickler: Bei Eintritt zeigt Mindwtr die Aufgabe zur Neubewertung an. Bis zu Ihrer Entscheidung ändert sich nichts.
- Die **Startvorlaufzeit** koppelt den Start an das Fälligkeitsdatum (z. B. zwei Tage vor Fälligkeit sichtbar werden).

Siehe [Daten und Status](/de/use/gtd-workflow#dates-vs-status).

### Wie aktiviere ich Priorität oder Zeitschätzung?

Mindwtr verwendet schrittweise Offenlegung, daher sind optionale Felder standardmäßig ausgeblendet.

Steuern Sie die Felder der Aufgabenbearbeitung unter:

**Einstellungen → GTD → Layout des Aufgabeneditors**

Aktivieren Sie dort **Priorität** und **Zeitschätzung** (und ändern Sie bei Bedarf die Reihenfolge). Ausgeblendete Felder erscheinen weiterhin unter **Mehr** oder wenn eine Aufgabe bereits einen Wert darin besitzt.

### Was ist der Unterschied zwischen erledigten und archivierten Aufgaben?

Verwenden Sie **Erledigt** für kürzlich abgeschlossene Aufgaben. Sie behalten ihr Abschlussdatum, bleiben in der Ansicht „Erledigt“ sichtbar und sind beim täglichen oder wöchentlichen Rückblick nützlich.

Verwenden Sie **Archiviert** für abgeschlossene Aufgaben, die Sie ablegen möchten. Sie sind in normalen Aufgabenlisten ausgeblendet und bleiben in der Ansicht „Archiviert“ zum Suchen, Wiederherstellen oder endgültigen Löschen verfügbar. Archivieren löscht die Aufgabe nicht.

Behandeln Sie „Erledigt“ als kurzfristiges Abschlussprotokoll und „Archiviert“ als langfristige Historie. **Automatisch archivieren** kann erledigte Aufgaben nach einer gewählten Anzahl von Tagen automatisch archivieren; mit **Nie** bleiben alle Abschlüsse unter „Erledigt“.

### Wie funktionieren wiederkehrende Aufgaben?

Mindwtr unterstützt zwei Wiederholungsstrategien:

- **Streng** (fester Zeitplan): Das nächste Datum richtet sich nach dem Zeitplan selbst. Beispiel: Alle 5 Tage bleibt in diesem Rhythmus, auch bei verspätetem Abschluss.
- **Nach Abschluss wiederholen** (flexibel): Das nächste Datum wird ab dem tatsächlichen Abschluss berechnet. Beispiel: Heute abschließen, nächster Termin in 5 Tagen ab heute.

Legen Sie die Wiederholung im Aufgabeneditor fest (täglich/wöchentlich/monatlich/jährlich) und aktivieren Sie für flexibles Verhalten **Nach Abschluss wiederholen**.

Mindwtr hält eine aktive Instanz einer wiederkehrenden Aufgabe vor. Zukünftige Kalendereinträge der Serie werden nicht vorab erstellt; die nächste Aufgabeninstanz entsteht erst beim Abschluss der aktuellen.

### Kann ich Mindwtr-Aufgaben in Google Kalender oder Apple Kalender sehen?

Ja, einseitige Übertragung wird unterstützt:

- **Android/iOS:** Datierte Aufgaben in einen Gerätekalender übertragen. Android ist mit Google Kalender verifiziert; verwenden Sie unter iOS Kalender, die bereits in Apple Kalender verfügbar sind. Ein eigener Kalender namens `Mindwtr` im jeweiligen Konto eignet sich am besten.
- **macOS-Desktop:** Über EventKit in Apple Kalender übertragen.

Regeln wiederkehrender Aufgaben werden nicht als native Serientermine exportiert. Nur konkrete Instanzen werden übertragen. Siehe [Kalenderintegration](/de/use/calendar-integration).

### Integriert sich Mindwtr mit Obsidian?

Ja, auf dem Desktop: Importieren Sie einen Vault. Mindwtr behält Deep Links zu den Originalnotizen, sodass eine Aufgabe direkt zu ihrer Quellnotiz in Obsidian springen kann. Siehe [Obsidian](/de/power-users/obsidian).

### Wie sammle ich Protokolle für einen Fehlerbericht?

Die Protokollierung ist standardmäßig deaktiviert. Aktivieren Sie sie nur für einen Fehlerbericht.

**Desktop (Tauri):**
1. Öffnen Sie **Einstellungen → Daten**.
2. Aktivieren Sie **Debug-Protokollierung**.
3. Reproduzieren Sie den Fehler.
4. Kopieren Sie den Pfad unter **Protokolldatei** und hängen Sie die Datei an Ihr GitHub-Issue.

Standardmäßiger Linux-Pfad: `~/.local/share/mindwtr/logs/mindwtr.log`

**Mobilgeräte:**
1. Öffnen Sie **Einstellungen → Daten**.
2. Aktivieren Sie **Debug-Protokollierung**.
3. Reproduzieren Sie den Fehler.
4. Tippen Sie auf **Protokoll teilen** und hängen Sie es an Ihr GitHub-Issue.

Protokolle bleiben lokal und schwärzen häufige Zugangsdaten (Passwörter/Tokens) vor dem Schreiben.

### Kann ich Aufgaben in natürlicher Sprache hinzufügen?

Ja! Mindwtr unterstützt die Syntax für „Schnell hinzufügen“:
- `@context`: Kontext hinzufügen
- `#tag`: Tag hinzufügen
- `!Area` oder `/area:<name>`: Bereich zuweisen
- `%Person`: „Zugewiesen an“ festlegen (`%"Full Name"` für neue mehrteilige Namen)
- `/due:date`: Fälligkeitsdatum festlegen (today, tomorrow, friday, next week usw.)
- `/energy:low`, `/energy:medium` oder `/energy:high`: Energiestufe festlegen
- `/note:text`: Beschreibung hinzufügen
- `/status`: Status festlegen (`/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox`)
- `+ProjectName`: Projekt zuweisen

Beispiel: `Call client /due:friday @phone`

### Was sind Kontexte?

Kontexte sind Tags, die angeben, wo oder womit eine Aufgabe erledigt werden kann, etwa `@home`, `@work`, `@phone`, `@computer`. Filtern Sie nach Kontext, um nur jetzt ausführbare Aufgaben zu sehen. Siehe [Kontexte und Tags](/de/use/contexts-tags).

### Was ist der Unterschied zwischen einem Kontext und einem Bereich?

Sie beantworten unterschiedliche Fragen:

- Ein **Bereich**: *„Mit welchem Teil meines Lebens oder meiner Arbeit hängt diese Verantwortung zusammen?“* (Beruf, Zuhause, Gesundheit, ein Kunde …)
- Ein **Kontext**: *„Was kann ich jetzt angesichts meines Ortes und meiner verfügbaren Mittel erledigen?“* (`@computer`, `@errands` …)

Eine Aufgabe kann alle drei besitzen: **Bereich: Kunde A**, **Projekt: Website überarbeiten**, **Kontext: @computer**. Siehe [GTD-Überblick](/de/use/gtd-overview).

### Wie erfasse ich Aufgaben schnell?

**Desktop:**
- Globales Tastenkürzel verwenden, um „Schnell hinzufügen“ überall zu öffnen
- Unter Flatpak/Wayland `flatpak run tech.dongdongbh.mindwtr --quick-add` als eigenes Systemkürzel festlegen, falls das integrierte Kürzel nicht verfügbar ist
- Für sofortige Erfassung auf das Taskleistensymbol klicken
- In das Eingabefeld einer beliebigen Ansicht tippen

**Mobilgeräte:**
- Über das Teilen-Menü aus jeder App erfassen
- Startbildschirm-Widget für Erfassung mit einem Tippen hinzufügen
- Eingabefeld im Tab „Posteingang“ verwenden

---

## Desktop

### Welche Tastenkürzel gibt es?

Mindwtr unterstützt Vim- und Emacs-Tastenbelegungsvoreinstellungen. Drücken Sie `?` (Vim) oder `Ctrl-h` (Emacs), um alle Kürzel zu sehen. Siehe [Desktop-Tastenkürzel](/de/use/keyboard-shortcuts).

### Wie ändere ich das Erscheinungsbild?

Öffnen Sie Einstellungen → Darstellung. Wählen Sie Hell, Dunkel oder System.

### Wie synchronisiere ich mit meinem Telefon?

1. Richten Sie in den Einstellungen einen Synchronisierungsordner ein (Dropbox, Syncthing usw.).
2. Wählen Sie auf dem Mobilgerät den Synchronisierungsordner unter Einstellungen → Synchronisierung.
3. Beide Plattformen synchronisieren automatisch bei Datenänderungen und beim Wechsel zwischen Apps.

Siehe [Daten und Synchronisierung](/de/data-sync/).

### Werden Benachrichtigungen unterstützt?

Ja! Mindwtr sendet Desktop-Benachrichtigungen für:
- Erinnerungen an Fälligkeitsdaten
- Startzeitwarnungen
- Erinnerungen an wiederkehrende Aufgaben

Sie können Benachrichtigungen auf später verschieben.

**macOS** fragt beim ersten Aktivieren nach der Berechtigung. Stellen Sie unter **Linux** sicher, dass ein Benachrichtigungsdienst läuft.

## Mobilgeräte

### Welche Plattformen werden unterstützt?

- **Android:** vollständige Unterstützung über Google Play oder APK-Download
- **iOS:** im App Store und über TestFlight-Beta verfügbar. Die App-Store-Veröffentlichung erfordert weiterhin eine jährliche Apple-Entwicklergebühr; Sponsoring hilft, iOS verfügbar zu halten.

### Warum fühlt sich das Bearbeiten auf Desktop und Mobilgeräten unterschiedlich an?

Mindwtr folgt den Plattformkonventionen:
- **Desktop:** Einfachklick schaltet Details um, Doppelklick öffnet den vollständigen Bearbeitungsmodus (Titel über das `⋯`-Menü der Aufgabe direkt umbenennen), Rechtsklick öffnet Kontextmenüs.
- **Mobilgeräte:** Einfaches Tippen öffnet den Bearbeitungsmodus; Wischaktionen übernehmen schnelle Änderungen.

So bleibt die App auf jeder Plattform schnell und vertraut.

### Wie installiere ich Mindwtr unter Android?

Installieren Sie die App aus Google Play oder laden Sie die APK von [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter. Aktivieren Sie bei entsprechender Aufforderung „Installation aus unbekannten Quellen“. Siehe [Mobile Installation](/de/start/mobile-installation).

### Wie erfasse ich Inhalte aus anderen Apps?

Verwenden Sie das **Teilen-Menü**. Tippen Sie beim Anzeigen von Inhalten in einer beliebigen App (Browser, E-Mail, Notizen) auf „Teilen“ und wählen Sie Mindwtr. Mindwtr öffnet die Erfassungsansicht mit dem geteilten Inhalt in der Notiz. Sie können einen Titel ergänzen, Felder anpassen und den Eintrag im Posteingang speichern.

### Gibt es ein Widget?

Ja. Fügen Sie das Mindwtr-Widget für Schnellerfassung und Fokuseinträge zum Startbildschirm hinzu.

### Ist der KI-Assistent erforderlich?

Nein. Der KI-Assistent ist optional und standardmäßig deaktiviert. Mindwtr funktioniert vollständig ohne ihn. Bei Aktivierung verwendet er Ihren eigenen API-Schlüssel (BYOK). Siehe [KI-Assistent](/de/power-users/ai-assistant).

### Wie funktionieren Wischaktionen?

Wischen Sie im Posteingang eine Aufgabe nach rechts, um sie als erledigt zu markieren. In anderen Ansichten können andere Wischaktionen verfügbar sein.

### Wie synchronisiere ich mit dem Desktop?

1. Exportieren Sie eine Sicherung in Ihren Synchronisierungsordner (Google Drive, Syncthing usw.).
2. Wählen Sie diesen Ordner unter Einstellungen → Synchronisierung.
3. Die App synchronisiert bei Datenänderungen und beim Wechsel in den Hintergrund automatisch.

Siehe [Daten und Synchronisierung](/de/data-sync/).

### Sendet die mobile App Benachrichtigungen?

Ja. Mindwtr sendet Push-Benachrichtigungen für:
- Erinnerungen an Fälligkeitsdaten
- Startzeitwarnungen
- Aufforderungen zur täglichen Übersicht
- Erinnerungen an den Wochenrückblick

Sie können Benachrichtigungen direkt auf später verschieben.
Beim Tippen auf den Benachrichtigungstext öffnet sich die Ansicht **Durchsicht**.

---

## Synchronisierung und Daten

### Verliere ich bei der Synchronisierung Daten?

Nein. Mindwtr verwendet eine Last-Write-Wins-Zusammenführung und behält die neueste Version jedes Eintrags. Weich gelöschte Einträge werden korrekt zwischen Geräten synchronisiert.

### Kann ich mehrere Synchronisierungsdienste verwenden?

Wir empfehlen einen einzigen Synchronisierungsordner, um Konflikte zu vermeiden. Wählen Sie einen Dienst (Dropbox, Google Drive, Syncthing) und verwenden Sie ihn konsequent.

### Wie sichere ich meine Daten?

**Desktop:** Verwenden Sie **Einstellungen → Daten → Sicherung exportieren** oder sichern Sie `data.json` aus dem App-Datenordner.
**Mobilgeräte:** Verwenden Sie **Einstellungen → Daten → Sicherung exportieren**.

Siehe [Sicherung und Wiederherstellung](/de/data-sync/backup-restore).

### Kann ich gelöschte Aufgaben wiederherstellen?

Es gibt noch keine Oberfläche zum Wiederherstellen einer einzelnen Aufgabe, aber Sie können Ihre lokalen Daten aus einer früheren Sicherung oder Wiederherstellungsmomentaufnahme wiederherstellen.

Siehe [Sicherung und Wiederherstellung](/de/data-sync/backup-restore).

### Kann ich aus TickTick importieren?

Ja. Mindwtr importiert TickTick-CSV- und ZIP-Sicherungen unter **Einstellungen → Daten → Aus TickTick importieren**.

- TickTick-Ordner werden zu Mindwtr-Bereichen.
- TickTick-Listen werden zu Mindwtr-Projekten.
- Checklisteninhalte, Tags, Daten, Prioritäten und unterstützte Wiederholungsregeln bleiben nach Möglichkeit erhalten.

Siehe [TickTick-Import](/de/import/ticktick).

### Kann ich aus Todoist importieren?

Ja. Mindwtr importiert Todoist-CSV-Exporte und ZIP-Sicherungen unter **Einstellungen → Daten → Aus Todoist importieren**.

- Todoist-Projekte werden zu Mindwtr-Projekten.
- Unteraufgaben werden zu Checklistenpunkten.
- Aktive Aufgaben mit Projektzuweisung bleiben bei ihren Projekten; aktive Aufgaben ohne Zuweisung bleiben für die Posteingangsverarbeitung verfügbar.

Siehe [Todoist-Import](/de/import/todoist).

### Kann ich aus DGT GTD importieren?

Ja. Mindwtr importiert DGT-GTD-JSON-Exporte und ZIP-Archive unter **Einstellungen → Daten → Aus DGT GTD importieren**.

- DGT-Ordner werden zu Mindwtr-Bereichen.
- DGT-Projekte werden zu Mindwtr-Projekten.
- DGT-Checklisten werden zu Checklistenaufgaben.
- DGT-Kontexte und -Tags bleiben erhalten.

Nicht unterstützte DGT-Wiederholungsmuster werden einmal importiert; der ursprüngliche Wiederholungstext bleibt in der Beschreibung erhalten.

Siehe [DGT-GTD-Import](/de/import/dgt-gtd).

### Kann ich aus OmniFocus importieren?

Ja. Mindwtr importiert OmniFocus-CSV-Exporte und Omni-Automation-JSON-/ZIP-Exporte unter **Einstellungen → Daten → Aus OmniFocus importieren**.

- OmniFocus-Ordner können bei verfügbaren Metadaten zu Mindwtr-Bereichen werden.
- OmniFocus-Projekte werden bei Bedarf zu Mindwtr-Projekten.
- Eigenständige OmniFocus-Aktionen bleiben außerhalb von Projekten.
- Unterstützte Notizen, Tags, Zurückstellungs- und Fälligkeitsdaten, Abschlussstatus und Wiederholungen aus dem JSON-Pfad bleiben erhalten.
- Einfache verschachtelte Aufgaben können zu Checklistenpunkten werden; tiefere Hierarchien werden abgeflacht, wobei der ursprüngliche Pfad erhalten bleibt.

Wenn Wiederholungen wichtig sind, verwenden Sie den Omni-Automation-JSON-/ZIP-Export statt CSV. Geplante Daten und Dauertexte bleiben in der Beschreibung, wenn Mindwtr dafür kein direktes Feld besitzt.

Siehe [OmniFocus-Import](/de/import/omnifocus).

### Kann ich aus Apple Erinnerungen importieren?

Ja, auf iPhone und iPad. Mindwtr importiert unerledigte Apple-Erinnerungen unter **Einstellungen → Daten → Aus Apple Erinnerungen importieren**.

- Wählen Sie die zu importierende Erinnerungsliste.
- Importierte Erinnerungen werden zu Mindwtr-Aufgaben.
- Sie können die Erinnerungen optional aus Apple Erinnerungen löschen, nachdem Mindwtr den Import bestätigt hat.

Der Import aus Apple Erinnerungen ist ein einseitiger Import, keine Synchronisierung. Siehe [Import aus Apple Erinnerungen](/de/data-sync/#apple-reminders-import-ios).

---

## Fehlerbehebung

### App startet nicht (Desktop Linux)

Stellen Sie sicher, dass WebKitGTK installiert ist:
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### Warum ist die AUR-Installation oder das Build-Verzeichnis so groß?

Verwenden Sie auf Arch-basierten Distributionen `mindwtr-bin`, sofern Sie nicht ausdrücklich aus dem Quellcode bauen möchten:

```bash
yay -S mindwtr-bin
```

`mindwtr-bin` installiert das vorgefertigte GitHub-Release-Paket und sollte der kleine, schnelle AUR-Weg sein. Das Quellpaket `mindwtr` baut die Desktop-App lokal und muss Build-Abhängigkeiten für eine Tauri-, Rust-, Bun- und React-App herunterladen. Dadurch kann der Build erheblich mehr Speicherplatz belegen.

Das Quellpaket soll das Archiv des Release-Tags statt des gesamten Git-Verlaufs abrufen. Wenn ein AUR-Helfer einen sehr großen Git-Checkout herunterlädt, prüfen Sie, ob Sie für den Binärpaketweg `mindwtr-bin` installiert haben, oder melden Sie das Verhalten des Quellpakets, damit das AUR-Rezept korrigiert werden kann.

### App stürzt beim Start ab (Mobilgeräte)

Versuchen Sie, die App-Daten zu löschen:
1. Öffnen Sie Einstellungen → Apps → Mindwtr.
2. Tippen Sie auf Speicher → Daten löschen.
3. Öffnen Sie die App erneut.

Hinweis: Dadurch werden lokale Daten gelöscht.

### Aufgaben werden nicht synchronisiert

1. Prüfen Sie, ob der Synchronisierungsordner erreichbar ist.
2. Stellen Sie sicher, dass der Synchronisierungsdienst läuft.
3. Prüfen Sie die Dateiberechtigungen.
4. Versuchen Sie eine manuelle Synchronisierung in den Einstellungen.

### Benachrichtigungen funktionieren nicht

**Desktop:**
- System-Benachrichtigungseinstellungen prüfen
- Benachrichtigungsberechtigung der App prüfen

**Mobilgeräte:**
- Benachrichtigungsberechtigung in den Geräteeinstellungen erteilen
- App-Benachrichtigungseinstellungen prüfen

---

## Mitwirken

### Wie kann ich mitwirken?

- Fehler melden und Funktionen vorschlagen – über **Feedback senden** unter **Einstellungen → Über** oder in [GitHub Issues](https://github.com/dongdongbh/Mindwtr/issues)
- Pull Requests einreichen
- Bei Übersetzungen helfen
- Mindwtr bekannt machen

Siehe [Leitfaden für Beiträge](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md).

---

## Siehe auch

- [Erste Schritte](/de/start/getting-started)
- [GTD-Überblick](/de/use/gtd-overview)
- [Daten und Synchronisierung](/de/data-sync/)
- [Mitwirken (Repository-Leitfaden)](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)
