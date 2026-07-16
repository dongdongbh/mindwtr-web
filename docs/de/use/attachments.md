# Anhänge (Dateien, Links, Audio)

Mit Mindwtr können Sie Dateien und Links an **Aufgaben** und **Projekte** anhängen. Anhänge sind optional und werden bei aktivierter Synchronisierung geräteübergreifend synchronisiert.

---

## Mögliche Anhänge

- **Dateien** (PDFs, Bilder, Dokumente usw.)
- **Links** (URLs, Webseiten, Referenzlinks)
- **Audionotizen** (wenn „Audioanhänge speichern“ aktiviert ist)
- **Obsidian-Notizen** auf dem Desktop, wenn die Obsidian-Integration aktiviert ist

---

## Anhänge hinzufügen

### Desktop

- Öffnen Sie eine Aufgabe oder ein Projekt.
- Klicken Sie unter **Anhänge** auf **Datei hinzufügen** oder **Link hinzufügen**.
- Fügen Sie für Links eine URL oder einen lokalen Dateipfad ein.
- Bei Aufgabenanhängen erscheint **Obsidian-Notiz anhängen** erst, nachdem Sie die Obsidian-Integration aktiviert haben.

### Mobilgeräte

- Öffnen Sie eine Aufgabe.
- Verwenden Sie **Anhang hinzufügen**, um eine Datei auszuwählen oder einen Link hinzuzufügen.
- Audionotizen werden automatisch hinzugefügt, wenn Sie eine Spracherfassung aufnehmen und **Audioanhänge speichern** aktiviert ist.

### Kopien und Links

- **Datei hinzufügen** speichert eine Kopie der Datei im eigenen Speicher von Mindwtr. Der Anhang funktioniert weiter, wenn die Originaldatei später verschoben, umbenannt oder gelöscht wird. Beim Entfernen des Anhangs wird die Kopie von Mindwtr gelöscht, nicht Ihre Originaldatei.
- **Link hinzufügen** speichert einen Verweis. Fügen Sie eine URL oder einen lokalen Dateipfad ein (oder verwenden Sie auf dem Desktop **Mit Datei verknüpfen …**, um eine auszuwählen), wenn Sie auf eine Datei verweisen möchten, ohne sie zu kopieren. Ein Pfadlink funktioniert nicht mehr, wenn die Datei verschoben wird – das ist bei einem Link zu erwarten.
- Jede Anhangszeile zeigt den Typ: Eine Büroklammer bedeutet, dass Mindwtr eine Kopie der Datei besitzt, ein Linksymbol kennzeichnet einen Verweis (der Tooltip zeigt das vollständige Ziel).
- Vor v1.1.0 auf dem Desktop hinzugefügte Dateianhänge verweisen auf den ursprünglichen Pfad, statt eine Kopie zu enthalten (sie zeigen das Linksymbol). Hängen Sie die Datei erneut an, um sie in eine Kopie umzuwandeln.

---

## Audioanhänge

Wenn Sie **Audioanhänge speichern** aktivieren (Einstellungen → Allgemein), bewahrt Mindwtr die ursprüngliche Sprachnotiz zusammen mit dem Transkript auf. Das ist nützlich, wenn Sie die Aufnahme später erneut abspielen oder teilen möchten.

### Abhängigkeiten für die Audiowiedergabe unter Linux

Die Audiowiedergabe unter Linux verwendet **GStreamer**. Wenn Fehler wie `autoaudiosink not found` angezeigt werden, installieren Sie die GStreamer-Plug-ins:

**Arch / Manjaro**
```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav
```

**Debian / Ubuntu / Mint**
```bash
sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav
```

**Fedora** (für einige Codecs ist RPM Fusion erforderlich)
```bash
sudo dnf install gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly gstreamer1-libav
```

## Synchronisierungsverhalten

- Anhangsmetadaten werden mit Aufgaben und Projekten synchronisiert.
- Die eigentlichen Dateien werden nach den Metadaten synchronisiert.
- Fehlt eine Datei lokal, bleibt der Anhang sichtbar und kann erneut heruntergeladen werden, sobald er verfügbar ist.
- Die Bereinigung prüft die dem aktuellen Gerät bekannten Verweise. Wenn ein anderes Gerät noch nicht synchronisiert wurde, werden gemeinsam verwendete entfernte Anhangsdateien nicht global anhand ihrer Verweise gezählt.

> Tipp: Große Dateien können die Synchronisierung verlangsamen. Verwenden Sie nach Möglichkeit kleinere Anhänge oder Links.

---

## Bereinigung

Mindwtr bereinigt automatisch **verwaiste Anhänge** (Dateien, auf die keine Aufgabe und kein Projekt mehr verweist).

- Desktop: Sie können die Bereinigung auch manuell unter **Einstellungen → Daten → Anhangsbereinigung** ausführen.
- Mobilgeräte: Die Bereinigung läuft während der Synchronisierung automatisch.

---

## Verwandte Seiten

- [Daten und Synchronisierung](/de/data-sync/)
- [Desktop-Benutzerhandbuch](/de/use/desktop)
- [Mobiles Benutzerhandbuch](/de/use/mobile)
