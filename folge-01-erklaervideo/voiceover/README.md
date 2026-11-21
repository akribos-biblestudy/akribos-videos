# Sprechertext und Runway-Aufnahmen

Der [freigegebene Sprechertext](sprechertext.txt) besteht aus sieben Absätzen. Für den Schnitt gibt es acht [Runway-Aufnahmen](takes/). Der Einstieg kombiniert zwei davon und das freigegebene Referenzwort. Die fertige [Sprachspur](../audio/Sprecher-Runway.wav) startet bei 0:00 in der FilmCraft-Sequenz.

| Take | Bildzeit | Gezeigte Szenen |
| --- | --- | --- |
| 01 · Einstieg | 0:00–0:11 | Vollbildvers mit „geliebt“, anschließend Bibelstelle öffnen |
| 02 · Übersetzungen | 0:11–0:17 | Übersetzungen vergleichen, Kommentar und Parallelstellen |
| 03 · Wortstudie | 0:17–0:27,6 | Worterklärung, weitere Fundstellen |
| 04 · Buchstatistik | 0:27,6–0:34,4 | Suchfeld, Treffer pro Buch und Filter auf Johannes |
| 05 · Vers und Notiz | 0:34,4–0:44 | Vers markieren, Frage festhalten |
| 06 · Sammlung teilen | 0:44–0:51,2 | Stellen sammeln, Diskussion direkt am Vers |
| 07 · App und Abschluss | 0:51,2–1:00 | Unterwegs in der App weiterlesen, Abschlussgrafik |

## Einen Take generieren oder ersetzen

1. Öffne in Runway **Tool → Audio** und wähle ein Modell mit **Text to Speech**. Für diese Folge ist am ersten Take **Eleven v4**, Stimme **Charlie Chatlin – Real & Casual**, Stimm-ID `vmVmHDKBkkCgbLVIOJRb`, dokumentiert. Falls du Zugriff auf die ursprüngliche Runway-Sitzung hast, kannst du ihre Einstellungen mit **Reuse settings** übernehmen. [Runway-Anleitung](https://help.runwayml.com/hc/en-us/articles/23859696734611-Generating-speech-from-text)
2. Füge den entsprechenden Absatz aus dem [Synthesetext für Runway](runway-text.txt) ein, erzeuge den Take und höre Aussprache und Pausen an. Lade die gewählte Aufnahme herunter und speichere sie unter dem entsprechenden Dateinamen in [takes/](takes/).
3. Passe bei einer anderen Sprechdauer [timing.json](timing.json) an. Je Abschnitt sind `start` und `end` die Schnittpunkte im Originaltake. `at` ist der Einsatz im Film. Alle Werte sind Sekunden. So folgt etwa „elf Treffer“ auf den Klick auf den Johannes-Balken.
4. Führe im **Folgenordner** `python3 voiceover/mix.py` aus. Das Skript verwendet FFmpeg und ersetzt die WAV-Spur, sobald der neue Mix fertig ist. Mit `--output probe.wav` kannst du eine Hörprobe separat speichern.
5. Öffne das [FilmCraft-Projekt](../folge-01.fcproj) neu, höre die geänderte Passage im Bildkontext ab und exportiere über **File → Export → Media…**. Bei unverändertem Bild kannst du die vorhandenen MOVs weiterverwenden. [Exporteinstellungen](../README.md#als-mp4-exportieren)

## Aussprache und Schnitt in Folge 01

Im lesbaren Sprechertext steht **Akribos**. Für die drei Nennungen im ersten und letzten Absatz enthält die Runway-Eingabe `/aˈkʁiːbɔs/`. Die Betonung liegt auf dem langen **i** der zweiten Silbe.

- **Vollbildvers** · Die ersten zwei Sätze stammen aus [01-vollbildvers-original.mp3](takes/01-vollbildvers-original.mp3).
- **Bibelstelle öffnen** · „Ich schlage Johannes drei, Vers sechzehn in Akribos auf“ beginnt mit der Blende vom Vollbildvers zur Anwendung. In der [Schnittfassung](takes/01-einstieg-mit-referenz.wav) stammt „Akribos“ direkt aus [Variante 3](../../sprecher/akribos-aussprache-runway.mp3). Die [Runway-Originalaufnahme](takes/01-einstieg.mp3) ist ebenfalls enthalten. Der [Schnittplan](aussprache-schnitt.json) dokumentiert Samplepositionen, Überblendungen und Pegel.
- **App und Abschluss** · Die beiden Sätze aus der neuen [App-Aufnahme](takes/07-app-und-abschluss.mp3) setzen passend zur App-Ansicht und zur Abschlussgrafik ein.
