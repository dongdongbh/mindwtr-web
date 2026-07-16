# Erste Schritte

Willkommen bei Mindwtr! Mit dieser Anleitung können Sie schnell loslegen.

## Installation

### Desktop

| Plattform         | Installation                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Arch Linux**    | Vorgefertigtes AUR-Paket `mindwtr-bin` oder aus dem Quellcode gebautes AUR-Paket `mindwtr`          |
| **Debian/Ubuntu** | APT-Repository hinzufügen (empfohlen) oder `.deb` von [Releases](https://github.com/dongdongbh/Mindwtr/releases) herunterladen |
| **Fedora/RHEL**   | DNF-Repository hinzufügen (empfohlen) oder `.rpm` von [Releases](https://github.com/dongdongbh/Mindwtr/releases) herunterladen |
| **Flatpak**       | Von [Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr) installieren                        |
| **AppImage**      | `.AppImage` herunterladen, `chmod +x` ausführen und starten                                         |
| **Windows**       | Microsoft Store, Winget, Chocolatey, Scoop, portables ZIP oder Installationsprogramm von [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **macOS**         | [Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144), TestFlight-Beta, Homebrew oder `.dmg` von [Releases](https://github.com/dongdongbh/Mindwtr/releases) |

Ausführliche Anweisungen finden Sie unter [Desktop-Installation](/de/start/desktop-installation).

### Mobilgeräte

| Plattform  | Installation                                                                 |
| ---------- | ---------------------------------------------------------------------------- |
| **Android** | Google Play, F-Droid, IzzyOnDroid oder APK von [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **iOS**     | App Store, TestFlight-Beta oder Simulator/eigener Build für die Entwicklung  |

Ausführliche Anweisungen finden Sie unter [Mobile Installation](/de/start/mobile-installation).

Möchten Sie neue Builds frühzeitig testen? Lesen Sie [An den Beta-Kanälen teilnehmen](/de/start/beta-channels).

### Docker und Web-App

Wenn Sie Mindwtr im Browser bereitstellen möchten, können Sie die Web-App (PWA) und den selbst gehosteten Synchronisierungsserver mit Docker ausführen:

- [Docker-Bereitstellung](/de/power-users/docker-deployment)
- [Web-App (PWA)](/de/power-users/web-app-pwa)

---

## Erster Start

Bei einer Neuinstallation fragt Mindwtr, ob Sie neu beginnen, eine Sicherung importieren oder eine Synchronisierung verbinden möchten. Nach der Einrichtung öffnet die App standardmäßig die Ansicht **Fokus**, damit die heutigen Kalendereinträge und nächsten Aktionen zuerst sichtbar sind. Erfassen Sie neue Aufgaben im **Posteingang**, wenn Sie einen Gedanken schnell ablegen möchten.

### Der grundlegende Arbeitsablauf

1. Alles im Posteingang **erfassen**
2. Jeden Eintrag mit dem Verarbeitungsassistenten **klären**
3. Unter Nächste Aktionen, Projekte oder Irgendwann/Vielleicht **organisieren**
4. Beim Wochenrückblick **reflektieren**
5. Mit Zuversicht **erledigen**

---

## Syntax für „Schnell hinzufügen“

Mindwtr unterstützt natürlichsprachige Schnelleingaben direkt im Aufgabenfeld. Dieselbe Syntax funktioniert in der Frage „Was ist die nächste Aktion?“, die nach Abschluss der letzten Aktion eines Projekts erscheint. Beenden Sie die Eingabe beispielsweise mit `/waiting`, um die Folgeaktion unter „Warten“ abzulegen:

| Syntax             | Beispiel                   | Ergebnis                         |
| ------------------ | -------------------------- | -------------------------------- |
| `@context`         | `Buy milk @errands`        | Fügt den Kontext @errands hinzu  |
| `#tag`             | `Research topic #creative` | Fügt den Tag #creative hinzu     |
| `+Project`         | `Call vendor +HomeReno`    | Weist die Aufgabe einem Projekt zu |
| `+Multi Word`      | `+New Project Name`        | Weist sie „New Project Name“ zu  |
| `+"Quoted Name"`  | `+"New Project" call Bob` | Anführungszeichen begrenzen einen mehrteiligen Namen mitten im Satz (auch `!"Area Name"`) |
| `!Area`            | `Plan roadmap !Work`       | Weist die Aufgabe einem Bereich zu |
| `%Person`          | `Ask %Jim for the budget /waiting` | Legt „Zugewiesen an“ fest (delegiert/verantwortlich für „Warten“) |
| `%"Full Name"`    | `%"Jim Smith" send report` | Anführungszeichen begrenzen einen mehrteiligen Personennamen (bekannte Namen werden auch ohne Anführungszeichen erkannt) |
| `/area:<name>`     | `/area:Personal`           | Weist einen Bereich zu (ohne Leerzeichen) |
| `/start:date`      | `Task /start:monday`       | Legt das Startdatum fest          |
| `/due:date`        | `Report /due:friday`       | Legt das Fälligkeitsdatum fest    |
| `/review:date`     | `Task /review:next week`   | Legt das Wiedervorlagedatum fest  |
| `/energy:<level>`  | `Task /energy:low`         | Legt die Energiestufe fest (`low`, `medium`, `high`) |
| `/note:text`       | `Task /note:remember X`    | Fügt eine Beschreibung hinzu      |
| `/status`          | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Legt den Status fest |

**Datumsbeispiele:**

- `/due:today`, `/due:tomorrow`
- `/due:friday`, `/due:next week`
- `/due:in 3 days`, `/due:2025-01-15`
- `/start:tomorrow`, `/review:next week`

Absolute Daten verwenden unabhängig vom Gebietsschema und Anzeigeformat der Oberfläche das feste ISO-Format `YYYY-MM-DD` (zum Beispiel `/due:2026-03-15`).

**Maskieren**

- Mit einem umgekehrten Schrägstrich bleiben Symbole einfacher Text: `\\@`, `\\#`, `\\+`, `\\!`, `\\%`, `\\/`
- Beispiel: Aus `Call \\@support /due:tomorrow` wird der Titel `Call @support`.

**Unicode-Unterstützung**

- Kontext- und Tag-Namen akzeptieren Unicode-Buchstaben und -Ziffern (z. B. CJK-Zeichen und Buchstaben mit Akzent).

> **Tipp:** Mit der **Spracherfassung** können Sie Aufgaben auch einsprechen. Aktivieren Sie sie unter **Einstellungen → KI-Assistent**, um Sprache mit intelligenter Auswertung in Text umzuwandeln.

---

## Organisationsmodell

Mindwtr bietet vier unterschiedliche Möglichkeiten zum Gruppieren. Verwenden Sie jede für ihren jeweiligen Zweck:

- **Projekte**: Mehrstufige Ergebnisse, die Sie erreichen möchten (zum Beispiel „Website v2 veröffentlichen“).
- **Bereiche**: Dauerhafte Verantwortungsbereiche ohne Endpunkt (zum Beispiel „Gesundheit“, „Familie“, „Beruf“).
- **Kontexte**: Wo oder wie eine Aufgabe erledigt werden kann (zum Beispiel `@home`, `@phone`, `@errands`).
- **Tags**: Flexible Kennzeichnungen für Energie, Thema oder eigene Gruppierungen (zum Beispiel `#focused`, `#lowenergy`).

Praktische Faustregel:

- Hat etwas einen definierten Endzustand, verwenden Sie ein **Projekt**.
- Ist es ein langfristiger Lebens- oder Arbeitsbereich, verwenden Sie einen **Bereich**.
- Hängt es von einem Ort, Werkzeug oder einer Person ab, verwenden Sie einen **Kontext**.
- Möchten Sie nur bei Bedarf filtern, verwenden Sie einen **Tag**.

---

## Nächste Schritte

- Lesen Sie den [GTD-Überblick](/de/use/gtd-overview).
- Erkunden Sie die [Desktop-Anleitung](/de/use/desktop) oder [Mobile Anleitung](/de/use/mobile).
- Richten Sie [Daten und Synchronisierung](/de/data-sync/) ein.
- Aktivieren Sie optional den [KI-Assistenten](/de/power-users/ai-assistant).

---

## Benötigen Sie Hilfe?

- Fehler und Hilfefragen melden Sie am besten in einem [GitHub-Issue](https://github.com/dongdongbh/Mindwtr/issues). So bleibt alles nachvollziehbar.
- Sie sind bereits in der App? Verwenden Sie **Feedback senden** unter **Einstellungen → Über**.
- Für vertrauliche Fragen schreiben Sie an [support@mindwtr.app](mailto:support@mindwtr.app).
- Durchsuchen Sie die [FAQ](/de/start/faq) oder lesen Sie den vollständigen Leitfaden zum [GTD-Arbeitsablauf in Mindwtr](/de/use/gtd-workflow).
