# Bildschirmaufnahmen · Wörter und Formulierungen suchen

Die sieben PNG-Dateien dieser Folge stammen aus einer lokal betriebenen Akribos-Webanwendung mit vorbereiteten Beispieldaten. Grundlage ist der Webstand `c77f778`. Die Browseransichten wurden mit Chromium und Playwright bei zweifacher Pixeldichte aufgenommen.

## Aufnahme wiederholen

Der Quellenbestand und die Suchindizierung bestimmen die angezeigten Trefferzahlen. Die Suchabfragen lauten nacheinander `Liebe`, `Liebe Gott`, `"am Anfang"`, `lieb`, `liebe "des Vaters"` und `Liebe -Welt`. Für die Kombination aus Wort und Wortfolge wird die Fensterhöhe auf 560 Pixel verkleinert, damit Eingabe und Treffer zugleich sichtbar sind. Beim letzten Bild ist der Buchfilter für Johannes aktiv.

Benötigte Werke: ELB1905 mit Suchindex.

Installiere die Browser-Werkzeuge wie in der [Capture-Anleitung von Folge 01](../../folge-01-erklaervideo/capture/README.md#einrichtung) beschrieben. Führe anschließend im Ordner dieser Folge aus:

```sh
export AKRIBOS_URL=http://localhost:5173
node capture/capture.cjs --output /tmp/akribos-vorschau-04
```

Die Aufnahmen landen dort unter `screenshots/`. Ohne `--output` aktualisierst du die Dateien direkt im Projekt. [profile.json](profile.json) enthält Fenstermaße, Pixeldichte und Leseschriftgröße. Die [Szenendatei](../episode.json) legt Dateiname, Bildausschnitt und das optionale Klickziel in Pixeln des vollständigen Screenshots fest.

Die Bedienabläufe und Bezeichnungen kannst du in der Akribos-Hilfe nachlesen. [Wörter und Strong-Nummern finden](https://akribos.de/help/suchen/woerter-und-strong-finden)
