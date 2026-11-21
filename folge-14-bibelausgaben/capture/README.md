# Grafiken und Wortstudie

Die ersten sechs Szenen verwenden individuelle Präsentationsgrafiken. Die [SVG-Originale und hochauflösenden PNGs](../graphics/) enthalten eine Editions-Zeitleiste, zwei sprachliche Vorher-nachher-Beispiele, eine Wortzuordnung bei Schlachter, einen Vergleich mit Menge und die Verbindung zwischen einem deutschen Wort und seinem griechischen Grundwort. Sämtliche Beschriftungen in den SVGs lassen sich als Text bearbeiten. Für die Typografie wird die zentrale Schrift **Akribos Text** zusammen mit der [mitgelieferten Liberation Serif](../../fonts/liberation-serif/LiberationSerif-Regular.ttf) verwendet. [Schriften installieren](../../README.md#schriftarten-installieren)

Ein SVG lässt sich etwa in Inkscape bearbeiten. Nach einer Änderung exportierst du das PNG wieder mit 1920 × 820 Pixeln und demselben Basisnamen. Mit librsvg geht das beispielsweise aus dem Folgenordner so:

```bash
rsvg-convert graphics/04.svg --output graphics/04.png
```

Die Edition 1.5.1 dokumentiert überarbeitete oder ergänzte Strong-Zuordnungen für Elberfelder 1932, Luther 1912 und Schlachter 1951. Elberfelder und Luther enthalten zusätzlich Sprachbearbeitungen. Die im Reader verfügbare Menge-Bibel von 1939 ist die Vergleichsausgabe `MENG39`. Die Beispiele verwenden Psalm 23,1, Johannes 3,16 und Johannes 3,22. [Daten und Editionsgeschichte](https://github.com/akribos-biblestudy/akribos-bibles/blob/b7d15750e7aab2b18f6e81bc33bf947a5d57aaff/README.md) · [Schlachter, Johannes 3](https://akribos.de/api/reader/bibles/AKRIBOS.SCHL1951/43/3) · [Menge, Johannes 3](https://akribos.de/api/reader/bibles/MENG39/43/3)

## Den Hinweis erneut aufnehmen

Nur das siebte Bild ist ein Screenshot. Im öffentlichen Reader öffnet das Skript die Elberfelder 1932 bei Johannes 3,22 und klickt auf „verweilte“. Der echte Hinweis in der Wortstudie nennt die noch fachlich unbestätigte Zuordnung zu G1304. [Versdaten im öffentlichen Reader](https://akribos.de/api/reader/bibles/AKRIBOS.ELB/43/3)

1. Installiere im Repo-Hauptordner Playwright mit `npm ci --prefix folge-01-erklaervideo/capture` und `(cd folge-01-erklaervideo/capture && npx playwright install chromium)`.
2. Führe hier `node capture.mjs --shot 7 --output /tmp/akribos-wortzuordnung` aus. Für einen eigenen Reader kannst du `AKRIBOS_URL` setzen. Ausgabe, Vers, Wort und erwarteter Hinweis stehen in [targets.json](targets.json).
3. `node capture.mjs --shot 7 --update-framing` aktualisiert den Screenshot, Bildausschnitt und Zielpunkt in der Folge.
