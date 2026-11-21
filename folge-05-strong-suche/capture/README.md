# Bildschirmaufnahmen · Strong-Suche auf Griechisch und Hebräisch

Die sechs PNG-Dateien dieser Folge stammen aus einer lokal betriebenen Akribos-Webanwendung mit vorbereiteten Beispieldaten. Grundlage ist der Webstand `c77f778`. Die Browseransichten wurden mit Chromium und Playwright bei zweifacher Pixeldichte aufgenommen.

## Aufnahme wiederholen

Die Aufnahme öffnet die verknüpften Wörter in Johannes 3,16 und 1. Mose 1,1. Die Elberfelder-Ausgabe muss dort Strong-Zuordnungen für G25 und H430 enthalten. Beide Lexika müssen die Einträge anbieten. Für die Wortstatistik zeigt das Skript den Suchbereich in einem 850 Pixel breiten Fenster. Im aufgenommenen ELB1905-Datenstand enthält die Statistik zu G25 insgesamt 153 Vorkommen in 109 Versen.

Benötigte Werke: ELB1905, GREEKDE und STRONGS_HEBREW.

Installiere die Browser-Werkzeuge wie in der [Capture-Anleitung von Folge 01](../../folge-01-erklaervideo/capture/README.md#einrichtung) beschrieben. Führe anschließend im Ordner dieser Folge aus:

```sh
export AKRIBOS_URL=http://localhost:5173
node capture/capture.cjs --output /tmp/akribos-vorschau-05
```

Die Aufnahmen landen dort unter `screenshots/`. Ohne `--output` aktualisierst du die Dateien direkt im Projekt. [profile.json](profile.json) enthält Fenstermaße, Pixeldichte und Leseschriftgröße. Die [Szenendatei](../episode.json) legt Dateiname, Bildausschnitt und das optionale Klickziel in Pixeln des vollständigen Screenshots fest.

Die Bedienabläufe und Bezeichnungen kannst du in der Akribos-Hilfe nachlesen. [Eine Wortstudie durchführen](https://akribos.de/help/strong/wortstudie-durchfuehren)
