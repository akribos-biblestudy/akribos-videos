# Folge 01 · Akribos kennenlernen

[Video ansehen](folge-01.mp4) · [Animation in EffectCraft](folge-01.ecproj) · [Schnitt in FilmCraft](folge-01.fcproj)

Der 60-Sekunden-Film hat 14 Szenen und 13 Übergänge. Im FilmCraft-Projekt liegen die fertigen Bildclips auf V1, Sprecher, Musik und Soundeffekte auf drei eigenen Tonspuren. Für einen neuen Export kannst du das Projekt direkt öffnen.

## Als MP4 exportieren

1. Öffne [folge-01.fcproj](folge-01.fcproj) in FilmCraft und aktiviere die Sequenz **Folge 01 · Akribos kennenlernen**.
2. Wähle **File → Export → Media…** und exportiere die gesamte Sequenz. Die freigegebene Fassung verwendet **H.264 High**, **1920 × 1080**, **30 fps**, **Rec. 709** und eine Videobitrate von **20 Mbit/s** als Zielwert. Der Ton ist **AAC Stereo**, **48 kHz**, **320 kbit/s**.
3. Wähle einen Zielordner und klicke auf **Export**. Für eine Vorschau kannst du einen neuen Dateinamen wählen. Der freigegebene Stand im Repo heißt `folge-01.mp4`.

## Eine Animation bearbeiten

1. Öffne [folge-01.ecproj](folge-01.ecproj) in EffectCraft. Unter **Szenen** findest du beispielsweise **02 · Bibelstelle öffnen** mit der Lupe oder **08 · Treffer pro Buch** mit Cursor, Klickring und Screenshot-Wechsel.
2. Speichere die Änderung. Für Szene 08 aktiviere in der **Render Queue** die drei Aufträge `07-08-uebergang.mov`, `08-szene.mov` und `08-09-uebergang.mov`. Rendere sie unter ihren vorhandenen Dateinamen nach [media/](media/). Lass einen globalen **Default Output Folder** in EffectCraft leer, damit die im Projekt angegebenen Ziele gelten.
3. Öffne das FilmCraft-Projekt erneut oder aktiviere unter **Settings → Media** die Option **Automatically refresh growing files**. Die ersetzten Clips erscheinen am bisherigen Platz im Schnitt. Exportiere den Film wie oben beschrieben.

EffectCraft 0.24.1 kann beim Speichern absolute Medienpfade eintragen. Damit die Projekte nach einem Umzug oder Klonen weiter funktionieren, speichere deine Editoränderungen und führe vor dem Commit im **Repo-Hauptordner** `python3 scripts/project_paths.py folge-01-erklaervideo` aus.

Bei einer Linux-Flatpak-Installation braucht EffectCraft Lese- und Schreibzugriff auf den Checkout. Liegt er außerhalb der freigegebenen Ordner, führe im **Repo-Hauptordner** einmal `flatpak override --user --filesystem="$PWD" ai.storyteller.effectcraft` aus und starte EffectCraft neu.

## Material aktualisieren

- [Screenshots aufnehmen](capture/README.md) – Namen, Bibelstellen, Fenstergrößen und Ausschnitte stehen in [shots.json](capture/shots.json).
- [Sprechertext und Aufnahmen](voiceover/README.md) – sieben Runway-Takes mit ihren Schnittpunkten und der daraus erzeugten Sprachspur.
- [Gemeinsame Schriften installieren](../README.md#schriftarten-installieren) – **Akribos Text** in Regular und SemiBold.
