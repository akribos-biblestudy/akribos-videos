# Bildschirmaufnahmen · Tabs miteinander verknüpfen

Die fünf PNG-Dateien dieser Folge stammen aus einer lokal betriebenen Akribos-Webanwendung mit vorbereiteten Beispieldaten. Grundlage ist der Webstand `c77f778`. Die Browseransichten wurden mit Chromium und Playwright bei zweifacher Pixeldichte aufgenommen.

## Aufnahme wiederholen

Bibel und Kommentar müssen die gezeigten Kapitel enthalten. In der Szenendatei stehen die gesprochenen Stichwörter für die Markierungen am Buchstaben, an Gruppe A und an „Keine“. Die Schlussansicht hat zwei unabhängige Lesestellen: Johannes 4,1 in der Bibel, Johannes 3,16 im Kommentar. Ein Login ist für diese Folge entbehrlich.

Benötigte Werke: ELB1905 und GERKINGCOMMENTS.

Installiere die Browser-Werkzeuge wie in der [Capture-Anleitung von Folge 01](../../folge-01-erklaervideo/capture/README.md#einrichtung) beschrieben. Führe anschließend im Ordner dieser Folge aus:

```sh
export AKRIBOS_URL=http://localhost:5173
node capture/capture.cjs --output /tmp/akribos-vorschau-03
```

Die Aufnahmen landen dort unter `screenshots/`. Ohne `--output` aktualisierst du die Dateien direkt im Projekt. [profile.json](profile.json) enthält Fenstermaße, Pixeldichte und Leseschriftgröße. Die [Szenendatei](../episode.json) legt Dateiname, Bildausschnitt und das optionale Klickziel in Pixeln des vollständigen Screenshots fest.

Die Bedienabläufe und Bezeichnungen kannst du in der Akribos-Hilfe nachlesen. [Werke, Tabs und Kacheln](https://akribos.de/help/reader/werke-tabs-und-layouts)
