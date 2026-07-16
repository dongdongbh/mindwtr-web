# Mitwirken

Mindwtr freut sich über gezielte Beiträge, die die Local-First-Ausrichtung des
Produkts nach GTD bewahren.

Verwenden Sie die Anleitung für das Repository, das Sie ändern möchten:

- [Anleitung für Beiträge zu Website und Dokumentation](https://github.com/dongdongbh/mindwtr-web/blob/main/CONTRIBUTING.md)
- [Anleitung für Beiträge zu App und Benutzeroberfläche](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)

## Gute erste Beiträge

- Eine missverständliche Dokumentationsseite verbessern
- Eine ungenaue oder fehlerhafte Anweisung korrigieren
- Einen zusammenhängenden Dokumentationsabschnitt übersetzen
- Ein getestetes Beispiel für einen vorhandenen Arbeitsablauf hinzufügen

## Produktvorgaben

Prüfen Sie einen Änderungsvorschlag zunächst anhand dieser Vorgaben:

- Für die grundlegende Nutzung ist kein Konto erforderlich
- Standardmäßig Local-First
- GTD-Konzepte bleiben in sich schlüssig
- KI und Automatisierung bleiben optional
- Die Wahl der Synchronisierung bleibt unter Kontrolle der Benutzer

## Arbeitsablauf für die Dokumentation

1. Öffnen Sie ein Issue, bevor Sie mit einem neuen Gebietsschema beginnen oder einen Abschnitt neu gliedern.
2. Bearbeiten Sie die Quelle unter `docs/` im
   [mindwtr-web-Repository](https://github.com/dongdongbh/mindwtr-web).
3. Beschränken Sie jeden Pull Request auf eine Anleitung, einen Abschnitt oder ein Gebietsschema.
4. Führen Sie im Stammverzeichnis des Repositorys `bun run check` aus.
5. Erläutern Sie im Pull Request, welche Seiten und Gebietsschemas geändert wurden.

## Änderungen an der Dokumentation

Schreiben Sie die Dokumentation ausgehend von der Absicht der Benutzer. Ziehen
Sie Seiten wie „Aus TickTick importieren“ oder „WebDAV-Synchronisierung“ einem
langen Funktionsverzeichnis vor.

Öffentliche Benutzer- und Entwicklerdokumentation liegt unter `docs/` und wird
auf https://docs.mindwtr.app/ veröffentlicht. Prozessdokumentation, ADRs und
Versionshinweise gehören in die
[Dokumentation des App-Repositorys](https://github.com/dongdongbh/Mindwtr/tree/main/docs).
Das GitHub Wiki wurde eingestellt und nimmt keine neuen Inhaltsseiten mehr an.

Die Anleitung für Beiträge zur Website legt die unterstützten
Dokumentationssprachen, die Einführung von Übersetzungen, Terminologiequellen,
Regeln für Link-Fallbacks und Prüfungen für Pull Requests fest.

Englisch ist die Quelle für die vollständige deutsche, spanische,
französische, vereinfachte chinesische und traditionelle chinesische
Dokumentation. Die Maintainer aktualisieren jeden statischen Markdown-Satz mit
sprachspezialisierten Coding-Agenten und führen anschließend die gemeinsamen
Build- und Linkprüfungen aus. Wenn eine übersetzte Formulierung falsch klingt,
verwenden Sie den Bearbeitungslink der Seite oder öffnen Sie ein Issue mit der
korrigierten Formulierung.

## Lizenz

Mindwtr steht unter der AGPL-3.0. Beiträge werden unter derselben Lizenz angenommen.
