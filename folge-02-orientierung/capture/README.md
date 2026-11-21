# Bildschirmaufnahmen · Wo finde ich was in Akribos?

Die fünf PNG-Dateien dieser Folge stammen aus einer lokal betriebenen Akribos-Webanwendung mit vorbereiteten Beispieldaten. Grundlage ist der Webstand `c77f778`. Die Browseransichten wurden mit Chromium und Playwright bei zweifacher Pixeldichte aufgenommen.

## Aufnahme wiederholen

Zum Kontomenü und zur Dokumentbibliothek werden ein vorbereitetes Akribos-Demokonto mit Passwort und eine abgeschlossene Produkt-Tour benötigt. Die übrigen Ansichten sind öffentlich. Für die Schlussaufnahme ist das Dokumentfenster 960 Pixel breit. Dadurch passen der Reiter „Stellensammlungen“ und die beiden Menüeinträge „Hilfe“ und „Produkt-Tour“ in denselben Ausschnitt.

Benötigte Werke: ELB1905 und GERKINGCOMMENTS.

Installiere die Browser-Werkzeuge wie in der [Capture-Anleitung von Folge 01](../../folge-01-erklaervideo/capture/README.md#einrichtung) beschrieben. Führe anschließend im Ordner dieser Folge aus:

```sh
export AKRIBOS_URL=http://localhost:5173
read -r -p 'E-Mail des Demo-Kontos: ' AKRIBOS_USERNAME
read -rs -p 'Passwort: ' AKRIBOS_PASSWORD; echo
export AKRIBOS_USERNAME AKRIBOS_PASSWORD
node capture/capture.cjs --output /tmp/akribos-vorschau-02
```

Die Aufnahmen landen dort unter `screenshots/`. Ohne `--output` aktualisierst du die Dateien direkt im Projekt. [profile.json](profile.json) enthält Fenstermaße, Pixeldichte und Leseschriftgröße. Die [Szenendatei](../episode.json) legt Dateiname, Bildausschnitt und das optionale Klickziel in Pixeln des vollständigen Screenshots fest.

Die Bedienabläufe und Bezeichnungen kannst du in der Akribos-Hilfe nachlesen. [Bibelstellen öffnen und im Text weitergehen](https://akribos.de/help/bibelstellen/finden-und-weiterlesen)
