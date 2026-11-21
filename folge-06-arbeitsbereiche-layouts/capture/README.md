# Bildschirmaufnahmen · Arbeitsbereiche und Layouts einrichten

Die zehn PNG-Dateien dieser Folge stammen aus einer lokal betriebenen Akribos-Webanwendung mit vorbereiteten Beispieldaten. Grundlage ist der Webstand `c77f778`. Die Browseransichten wurden mit Chromium und Playwright bei zweifacher Pixeldichte aufgenommen.

## Aufnahme wiederholen

Verwende ein eigenes Demo-Konto mit einer abgeschlossenen Produkt-Tour und einem vorhandenen Arbeitsbereich „Johannes studieren“. Akribos speichert Änderungen an der gerade aktiven Ansicht automatisch. Das Skript zeigt das Namensfeld im Dialog, schließt es und öffnet anschließend das Menü mit dem vorbereiteten Eintrag.

Benötigte Werke sind ELB1905, SCH1951 und GERKINGCOMMENTS. Der Schlachter-Tab muss im Desktop-Reader verschiebbar sein.

Installiere die Browser-Werkzeuge wie in der [Capture-Anleitung von Folge 01](../../folge-01-erklaervideo/capture/README.md#einrichtung) beschrieben. Führe anschließend im Ordner dieser Folge aus:

```sh
export AKRIBOS_URL=http://localhost:5173
read -r -p 'E-Mail des Demo-Kontos: ' AKRIBOS_USERNAME
read -rs -p 'Passwort: ' AKRIBOS_PASSWORD; echo
export AKRIBOS_USERNAME AKRIBOS_PASSWORD
node capture/capture.cjs --output /tmp/akribos-vorschau-06
```

Das Skript beginnt mit drei Kacheln und wählt im Layoutmenü zwei Spalten. Es öffnet den Notizbereich, zeigt die Dokumentensuche und schließt den Bereich wieder. Bei der nächsten Aufnahme gehört `SCH` zur linken Tableiste. Playwright zieht ihn mit einer echten Mausgeste zum Kommentartab in der rechten Spalte und prüft seine neue Position. Anschließend verschiebt das Skript den Spaltentrenner und prüft die Breitenänderung.

Für die beiden Ziehbewegungen beschreibt `point` den Start, `dragTo` das Ziel und `cue` die zugehörige gesprochene Wendung. Die Koordinaten liegen im aufgenommenen Bild vor dem Ziehen. Bei der Tab-Geste begrenzt `dragRect` das bewegte Abbild des originalen SCH-Tabs. `afterImage` zeigt für beide Gesten den unmittelbar nach dem Loslassen tatsächlich aufgenommenen Zustand. Der Parameter `topMarginCssPx` ergänzt bei dieser Folge einen neutralen Präsentationsrand über der unveränderten Browseraufnahme. Er ist in allen Koordinaten der Szenendatei berücksichtigt.

Die Aufnahmen landen dort unter `screenshots/`. Ohne `--output` aktualisierst du die Dateien direkt im Projekt. [profile.json](profile.json) enthält Fenstermaße, Pixeldichte und Leseschriftgröße. Die [Szenendatei](../episode.json) legt Dateiname, Bildausschnitt und das optionale Klickziel in Pixeln des vollständigen Screenshots fest.

Die Bedienabläufe und Bezeichnungen kannst du in der Akribos-Hilfe nachlesen. [Einen Arbeitsbereich einrichten](https://akribos.de/help/reader/arbeitsbereich-einrichten)
