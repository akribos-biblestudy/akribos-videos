# Screenshots für Folge 01 aufnehmen

Die 15 Web-Screenshots liegen fertig in [../screenshots/](../screenshots/). Um einen davon zu ersetzen, öffnet Playwright Akribos in Chromium, stellt die konfigurierte Ansicht ein und speichert ein hochauflösendes PNG. Der Vollbildvers und die Abschlussgrafik sind direkt in EffectCraft gestaltet. Das Smartphone in Szene 13 zeigt das native Android-Original aus `akribos-app/store/de-DE/screenshots/originals/01-reader.png`. Zum Aktualisieren das neue Original als `../screenshots/15-android-app-lesen.png` kopieren.

## Einrichtung

Im Ordner dieser Anleitung benötigst du Node.js ab 22 und Chromium für die im Lockfile festgelegte Playwright-Version.

```sh
npm ci
npx playwright install chromium
node capture.mjs --list
```

Setze `AKRIBOS_URL` auf die Adresse deiner vorbereiteten Akribos-Installation. Für persönliche Ansichten kommen `AKRIBOS_USERNAME` (E-Mail-Adresse) und `AKRIBOS_PASSWORD` hinzu. Unter Bash kannst du die Zugangsdaten eingeben, ohne das Passwort in die Shell-Historie zu schreiben.

```bash
export AKRIBOS_URL=http://localhost:5173
read -r -p 'E-Mail des Demo-Kontos: ' AKRIBOS_USERNAME
read -rs -p 'Passwort des Demo-Kontos: ' AKRIBOS_PASSWORD; echo
export AKRIBOS_USERNAME AKRIBOS_PASSWORD
```

## Aufnahme

```sh
# Erst die beiden Statistikbilder in einen separaten Ordner schreiben
node capture.mjs --shot statistics --shot book-filter --output /tmp/akribos-statistik

# Ein Original im Projekt aktualisieren
node capture.mjs --shot reference

# Alle 15 Web-Screenshots im Projekt aktualisieren
node capture.mjs
```

Standardziel ist der Ordner `screenshots/` dieser Folge. Die ausgewählten Aufnahmen werden zunächst in einem temporären Unterordner erstellt. Erst wenn alle ausgewählten Ansichten erfolgreich aufgenommen sind, ersetzt das Skript die gleichnamigen Dateien im Ziel. Zum Vergleichen neuer Aufnahmen mit der freigegebenen Fassung verwende `--output`.

In [shots.json](shots.json) bestimmst du je Aufnahme Dateiname, Reader-Referenz, Ressourcen, Suchwort, Ansicht und Ausschnitt. Die Profile definieren Fensterbreite und -höhe in CSS-Pixeln, den Auflösungsfaktor `scale` und die Reader-Schriftgröße in Prozent. Ein festes Rechteck verwendet `crop: {"x":0,"y":151,"width":615,"height":559}`. Für dynamische Ausschnitte kann sich `crop.from` am Element orientieren, etwa am Suchergebnisfenster. `scroll` positioniert das bezeichnete Element vor der Aufnahme. Mit `--config DATEI` verwendest du eine andere Konfiguration. Die ursprünglichen Bildgrößen und Ausschnitte sind auf die Masken und Cursorpositionen in dieser Folge abgestimmt.

## Beispieldaten in Akribos

Die öffentlichen Aufnahmen nutzen Elberfelder 1905 (`ELB1905`), Schlachter (`SCH1951`), den Kommentar von Ger de Koning (`GERKINGCOMMENTS`), die Parallelstellen (`TSK`) und das griechische Wörterbuch (`GREEKDE`). Die Statistik in der freigegebenen Fassung enthält für „geliebt“ 144 Treffer, davon elf in Johannes. Die Sollzahlen stehen je Bild in der JSON-Datei.

Das Demo-Konto braucht ein Passwort, eine bereits abgeschlossene Einführungstour und folgende vorhandene Inhalte:

- Johannes 15,9 ist mit der ersten, gelben Markierungsfarbe markiert. Für das Bild mit der geöffneten Farbpalette spielt der Browser das Aufheben vorübergehend lokal durch. Der Server behält die Markierung.
- Die Notiz „Gottes Liebe im Johannesevangelium“ ist mit Johannes 15,9 verbunden und enthält „Wie beschreibt Jesus hier Gottes Liebe?“.
- Die Stellensammlung „Gottes Liebe im Johannesevangelium“ ist vom Konto aus über die Sammlungsübersicht erreichbar. Sie enthält Johannes 3,16 und Johannes 15,9.
- Unter Johannes 15,9 müssen die vorbereitete Frage und die Antwort aus `shots.json` sichtbar sein. Das Original zeigt eine Diskussion von Anna Beispiel und Jonas Beispiel. Die Aufnahme liest den vorhandenen Thread und veröffentlicht keine Beiträge.

Bei einer anderen Akribos-Version, Datenbasis oder Benutzerrolle können Treffertexte, Reaktionen, Editor-Schaltflächen und Abstände von den eingecheckten Aufnahmen abweichen. Für den normalen Videoschnitt kannst du die vorhandenen PNG-Dateien verwenden.
