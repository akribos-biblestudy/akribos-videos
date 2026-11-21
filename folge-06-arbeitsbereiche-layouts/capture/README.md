# Bildschirmaufnahmen · Arbeitsbereiche und Layouts einrichten

Die fünf PNG-Dateien dieser Folge stammen aus einer lokal betriebenen Akribos-Webanwendung mit vorbereiteten Beispieldaten. Grundlage ist der Webstand `c77f778`. Die Browseransichten wurden mit Chromium und Playwright bei zweifacher Pixeldichte aufgenommen.

## Aufnahme wiederholen

Verwende ein eigenes Demo-Konto mit einer abgeschlossenen Produkt-Tour und einem vorhandenen Arbeitsbereich „Johannes studieren“. Akribos speichert Änderungen an der gerade aktiven Ansicht automatisch. Das Skript zeigt das Namensfeld im Dialog, schließt es und öffnet anschließend das Menü mit dem vorbereiteten Eintrag.

Benötigte Werke: ELB1905, GERKINGCOMMENTS und GREEKDE.

Installiere die Browser-Werkzeuge wie in der [Capture-Anleitung von Folge 01](../../folge-01-erklaervideo/capture/README.md#einrichtung) beschrieben. Führe anschließend im Ordner dieser Folge aus:

```sh
export AKRIBOS_URL=http://localhost:5173
read -r -p 'E-Mail des Demo-Kontos: ' AKRIBOS_USERNAME
read -rs -p 'Passwort: ' AKRIBOS_PASSWORD; echo
export AKRIBOS_USERNAME AKRIBOS_PASSWORD
node capture/capture.cjs --output /tmp/akribos-vorschau-06
```

Die Aufnahmen landen dort unter `screenshots/`. Ohne `--output` aktualisierst du die Dateien direkt im Projekt. [profile.json](profile.json) enthält Fenstermaße, Pixeldichte und Leseschriftgröße. Die [Szenendatei](../episode.json) legt Dateiname, Bildausschnitt und das optionale Klickziel in Pixeln des vollständigen Screenshots fest.

Die Bedienabläufe und Bezeichnungen kannst du in der Akribos-Hilfe nachlesen. [Einen Arbeitsbereich einrichten](https://akribos.de/help/reader/arbeitsbereich-einrichten)
