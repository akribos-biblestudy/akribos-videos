# Folge 13 · Notizen importieren und exportieren

[Film ansehen](folge-13.mp4) · [Animation in EffectCraft](folge-13.ecproj) · [Schnitt in FilmCraft](folge-13.fcproj)

96,8 Sekunden · 1920 × 1080 · 30 Bilder pro Sekunde

| Bildzeit | Gezeigter Schritt |
| --- | --- |
| 0:01,4 | Eine Notiz mitbringen |
| 0:08,1 | Die Datei prüfen |
| 0:15,6 | Die Notiz übernehmen |
| 0:27,1 | Buch, Kapitel und Vers |
| 0:43,2 | Abschnitte und Buchnummern |
| 0:55,8 | Verszusätze verstehen |
| 1:05,8 | Mehrere Stellen verbinden |
| 1:17,2 | Den Bibeltext öffnen |
| 1:25,0 | Ein Format weitergeben |

## Bearbeiten und exportieren

Öffne in EffectCraft die Komposition mit dem Namen des Schritts. Der Titel, die Aufnahme, die Vergrößerung und ein gegebenenfalls eingeblendeter Klickring sind einzeln bearbeitbar. Die Bildnummer für jede Markierung steht zusammen mit dem gesprochenen Stichwort unter `visualCues` in den Szenenzeiten. Die Zeitmarken in der Hauptkomposition zeigen die Szenenfolge. In der **Render Queue** trägt jede Ausgabe den Namen ihrer Szene. Rendere geänderte Szenen wieder auf das eingestellte Ziel unter `media/`.

Öffne das [FilmCraft-Projekt](folge-13.fcproj) und wähle **File → Export → Media…**. Verwende H.264, **Match Source – Adaptive High Bitrate**, **VBR, 1 pass**, Ziel **20 Mbit/s**, Maximum **30 Mbit/s** und **Range → Entire Source**. Lass GPU Rendering ausgeschaltet. Der Mix verwendet AAC Stereo, 48 kHz und 320 kbit/s. Diese Werte stehen auch bei der Sequenz unter **Window → Metadata**.

## Sprecher und Aufnahmematerial

Der [deutsche Sprechertext](voiceover/sprechertext.txt) und die [Originalaufnahme aus Runway](voiceover/runway.mp3) gehören zusammen. Verwendet wurden die Einstellungen aus Folge 01 mit **Eleven v4** und **Charlie Chatlin – Real & Casual**. Die [Eingabe für Runway](voiceover/runway-eingabe.txt) enthält die Aussprache des Namens mit Betonung auf dem i. Die [Schnittfassung des Sprechers](voiceover/sprecher-mit-referenzaussprache.wav) verwendet für „Akribos“ die freigegebene Aussprache aus Variante 3. Die [Schnittpositionen](voiceover/aussprache-schnitt.json) beziehen sich auf den Originaltake. Musik und Soundeffekte liegen auf eigenen Spuren. Die [deutschen Untertitel](voiceover/untertitel.srt) lassen sich direkt bei YouTube hochladen.

[Aufnahme der Screenshots](capture/README.md) · [Bildquellen und Ausschnitte](episode.json) · [Szenenzeiten](voiceover/szenenzeiten.json) · [Gemeinsame Schriften](../README.md#schriftarten-installieren)
