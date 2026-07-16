# Mobile Installation

Ausführliche Installationsanweisungen für Android und iOS.

Informationen zu Release-Candidate- und Beta-Builds finden Sie unter [An den Beta-Kanälen teilnehmen](/de/start/beta-channels).

---

## Android

### Google Play (empfohlen)

[![Google Play](https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)

Mindwtr ist bei [Google Play](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr) verfügbar.

### F-Droid

[![F-Droid Version](https://img.shields.io/f-droid/v/tech.dongdongbh.mindwtr?label=F-Droid&logo=fdroid&logoColor=white&color=1976D2)](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)

Installation über F-Droid:

1. Installieren Sie den F-Droid-Client.
2. Öffnen Sie [Mindwtr auf F-Droid](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/) und installieren Sie die App.

### IzzyOnDroid

[![IzzyOnDroid](https://img.shields.io/endpoint?url=https://apt.izzysoft.de/fdroid/api/v1/shield/tech.dongdongbh.mindwtr&label=IzzyOnDroid)](https://apt.izzysoft.de/packages/tech.dongdongbh.mindwtr)

Installieren Sie Mindwtr über IzzyOnDroid, wenn Sie einen F-Droid-kompatiblen Client wie Droid-ify, Neo Store oder F-Droid verwenden:

1. Fügen Sie das IzzyOnDroid-Repository hinzu: `https://apt.izzysoft.de/fdroid/repo`.
2. Öffnen Sie [Mindwtr auf IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/tech.dongdongbh.mindwtr) und installieren Sie die App.

### APK herunterladen

1. Öffnen Sie [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases).
2. Laden Sie die neueste APK herunter (z. B. `mindwtr-<version>.apk`).
3. Öffnen Sie die APK auf Ihrem Gerät.

### Installation aus unbekannten Quellen

Aktivieren Sie bei entsprechender Aufforderung die Installation aus unbekannten Quellen:

1. Öffnen Sie **Einstellungen → Sicherheit** (oder **Einstellungen → Apps → Spezieller Zugriff**).
2. Aktivieren Sie **Unbekannte Apps installieren** für Ihren Browser oder Dateimanager.
3. Kehren Sie zur APK zurück und installieren Sie sie.

### Installation prüfen

Nach der Installation:

1. Öffnen Sie Mindwtr über die App-Übersicht.
2. Erteilen Sie die angeforderten Berechtigungen.
3. Beginnen Sie mit dem Erfassen von Aufgaben.

---

## iOS

### Aktueller Stand

Mindwtr ist im App Store verfügbar:

[![App Store](https://img.shields.io/badge/App_Store-iOS-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

Die TestFlight-Beta ist ebenfalls unter https://testflight.apple.com/join/7SMJCTSR verfügbar. Unter [An den Beta-Kanälen teilnehmen](/de/start/beta-channels) erfahren Sie, wie Sie die Beta verlassen und welche weiteren Beta-Plattformen verfügbar sind.

[![TestFlight beta](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

### Möglichkeiten

1. **App Store (empfohlen)**: stabile Version installieren
2. **TestFlight**: neuesten iOS-Beta-Build installieren
3. **Simulator-Builds**: im Quellcode für die Entwicklung verfügbar
4. **Eigener Build**: App selbst mit Xcode bauen und signieren (für das Signieren auf Geräten ist ein Apple-Developer-Konto erforderlich)

Die Bereitstellung der iOS-Version im App Store verursacht jedoch eine erhebliche jährliche Gebühr (siehe [Apple Developer Program](https://developer.apple.com/support/enrollment/)), die ich derzeit selbst trage.

Ihre Unterstützung hilft, Mindwtr langfristig zu erhalten und weiterzuentwickeln. Wenn Ihnen die App nützt, unterstützen Sie das Projekt bitte über [GitHub Sponsors](https://github.com/sponsors/dongdongbh) oder [Ko-fi](https://ko-fi.com/D1D01T20WK).

### Für iOS bauen (Entwickler)

```bash
# Clone repo
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run on iOS Simulator
bun mobile:ios

# Or open in Xcode for device builds
cd apps/mobile
npx expo prebuild --platform ios
open ios/*.xcworkspace
```

---

## Speicherort der Daten

Auf Mobilgeräten liegen die Daten im app-internen Speicher. Primärer Speicher ist SQLite; hinzu kommen JSON-Daten für Sicherung und Synchronisierung.

---

## Aktualisieren

### Android

1. Laden Sie die neue APK von [Releases](https://github.com/dongdongbh/Mindwtr/releases) herunter.
2. Installieren Sie sie über die vorhandene App.
3. Ihre Daten bleiben erhalten.

> **Tipp:** Unter **Einstellungen → Über → Nach Aktualisierungen suchen** können Sie in der App prüfen, ob eine neue Version verfügbar ist.

---

## Deinstallieren

### Android

1. Halten Sie das Mindwtr-Symbol gedrückt.
2. Wählen Sie **Deinstallieren** oder ziehen Sie es in den Papierkorb.

### Daten sichern

Beim Deinstallieren werden alle lokalen Daten entfernt. So bewahren Sie Ihre Daten auf:

1. Exportieren Sie zunächst eine Sicherung (**Einstellungen → Daten → Sicherung exportieren**).
2. Speichern Sie die exportierte Datei.
3. Deinstallieren Sie die App.

---

## Fehlerbehebung

### App stürzt beim Start ab

Versuchen Sie, die App-Daten zu löschen:

1. Öffnen Sie **Einstellungen → Apps → Mindwtr**.
2. Tippen Sie auf **Speicher → Daten löschen**.
3. Öffnen Sie die App erneut.

> **Hinweis:** Dadurch werden alle lokalen Daten gelöscht. Stellen Sie sie aus einer Synchronisierung oder Sicherung wieder her.

### Synchronisierung funktioniert nicht

Hinweise zur Fehlerbehebung finden Sie unter [Daten und Synchronisierung](/de/data-sync/).

### APK lässt sich nicht installieren

- Stellen Sie sicher, dass genügend Speicherplatz verfügbar ist.
- Aktivieren Sie die Installation aus unbekannten Quellen.
- Laden Sie die APK erneut herunter; die Datei könnte beschädigt sein.

---

## Siehe auch

- [Erste Schritte](/de/start/getting-started)
- [Mobile Anleitung](/de/use/mobile)
- [Daten und Synchronisierung](/de/data-sync/)
