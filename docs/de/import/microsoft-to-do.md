# Aus Microsoft To Do importieren

> Dieser Importer kommt mit der nächsten Desktop-Version nach Mindwtr 1.3.9.

Mindwtr Desktop importiert Aufgaben aus einer CSV-Datei, die Sie aus dem Ordner **Aufgaben** im klassischen Outlook für Windows exportieren. Microsoft To Do synchronisiert Aufgaben aus Exchange Online mit Outlook-Aufgaben. [Synchronisierung von Microsoft To Do](https://support.microsoft.com/en-us/todo/syncing-your-microsoft-to-do-account)

## Aufgaben als CSV-Datei exportieren

1. Öffnen Sie das klassische Outlook für Windows und melden Sie sich mit Ihrem Microsoft-To-Do-Konto an.
2. Öffnen Sie **Datei → Öffnen und exportieren → Importieren/Exportieren**.
3. Wählen Sie **In Datei exportieren** und anschließend **Kommagetrennte Werte**.
4. Wählen Sie den Ordner **Aufgaben** unter Ihrem Konto. Prüfen Sie, ob er die gewünschten Aufgaben enthält.
5. Wählen Sie einen Namen und einen Speicherort für die CSV-Datei. Klicken Sie auf **Fertig stellen**. Benennen Sie die CSV-Datei nach dem gewünschten Mindwtr-Projekt. Verwenden Sie für jeden exportierten Outlook-Ordner einen anderen Dateinamen.

Wenn Sie das neue Outlook verwenden, öffnen Sie für diesen Export das klassische Outlook. Der Assistent kann nur Aufgaben aus Ordnern exportieren, die er anzeigt. Falls Ihre Aufgaben fehlen, prüfen Sie, ob dasselbe Konto im klassischen Outlook eingerichtet ist und die Aufgaben in der Aufgabenansicht erscheinen. [Zwischen Outlook-Versionen wechseln](https://support.microsoft.com/en-us/outlook/getstarted/run-new-outlook-and-classic-outlook-side-by-side) · [Exportschritte in Microsoft Q&A](https://learn.microsoft.com/en-ca/answers/questions/5687598/how-can-i-export-my-microsoft-to-do-list-data-and)

Mindwtr liest englische und vereinfachte chinesische Spaltenüberschriften. Stellen Sie für andere Exportsprachen die Office-Anzeigesprache auf Englisch und exportieren Sie erneut. Verwendet die CSV-Datei eine ältere Windows-Zeichenkodierung, öffnen Sie sie in einer Tabellenkalkulation und speichern Sie eine Kopie als CSV UTF-8. [Office-Anzeigesprache ändern](https://support.microsoft.com/en-us/office/languages/change-the-language-office-uses-in-its-menus-and-proofing-tools)

## Vorschau prüfen und importieren

1. Öffnen Sie in Mindwtr Desktop **Einstellungen → Daten → Daten importieren → Aus Microsoft To Do importieren**.
2. Wählen Sie die Aufgaben-CSV aus Outlook.
3. Prüfen Sie die Aufgabenanzahl und eventuelle Warnungen in der Vorschau. Bestätigen Sie dann den Import.

Vergleichen Sie nach dem Import einige Aufgaben mit dem Original. Wenn das Ergebnis nicht stimmt, wählen Sie in der Ergebnismeldung **Rückgängig**. [Sichern und wiederherstellen](/de/data-sync/backup-restore)

## Welche Daten Mindwtr übernimmt

Mindwtr übernimmt Aufgabentitel, Notizen, Kategorien als Tags, Prioritäten, Status sowie Start-, Fälligkeits- und Abschlussdaten, sofern Outlook sie exportiert. Prüfen Sie die Vorschau auf Datumswerte, die Mindwtr nicht lesen konnte. Bewahren Sie die ursprünglichen Listen für Wiederholungen, Erinnerungen, Anhänge und die Listenstruktur auf.

Jede CSV-Datei wird in ein Projekt mit dem Namen der Datei importiert. Der Import erstellt eine einmalige Kopie. Bei einem erneuten Import mit demselben Dateinamen überspringt Mindwtr unveränderte Aufgaben, die bereits importiert wurden. Ein neuer Dateiname oder geänderte Aufgabendaten können zu Duplikaten führen.
