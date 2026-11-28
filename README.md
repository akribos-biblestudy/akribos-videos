# Akribos-Videos

Die Quelldateien der Akribos-Erklärvideos. Jede Folge hat ihren eigenen Ordner mit den bearbeitbaren EffectCraft- und FilmCraft-Projekten, Screenshots, Sprechertexten, Tonspuren und dem fertigen Video. Die gemeinsamen Schriften liegen unter [fonts/](fonts/).

[YouTube-Titel, Beschreibungen und Schlagwörter](youtube/README.md) · [Kanalbanner](youtube/akribos-kanalbanner.jpg)

| Folge | Thema und Projektdateien | Fertiges Video | YouTube-Thumbnail |
| --- | --- | --- | --- |
| 01 | [Akribos kennenlernen](folge-01-erklaervideo/README.md) | [1:00](folge-01-erklaervideo/folge-01.mp4) | [Thumbnail](folge-01-erklaervideo/youtube-thumbnail.jpg) |
| 02 | [Wo finde ich was in Akribos?](folge-02-orientierung/README.md) | [0:41](folge-02-orientierung/folge-02.mp4) | [Thumbnail](folge-02-orientierung/youtube-thumbnail.jpg) |
| 03 | [Tabs miteinander verknüpfen](folge-03-tab-verknuepfungen/README.md) | [0:43](folge-03-tab-verknuepfungen/folge-03.mp4) | [Thumbnail](folge-03-tab-verknuepfungen/youtube-thumbnail.jpg) |
| 04 | [Wörter und Formulierungen suchen](folge-04-suche/README.md) | [0:56](folge-04-suche/folge-04.mp4) | [Thumbnail](folge-04-suche/youtube-thumbnail.jpg) |
| 05 | [Strong-Suche auf Griechisch und Hebräisch](folge-05-strong-suche/README.md) | [1:01](folge-05-strong-suche/folge-05.mp4) | [Thumbnail](folge-05-strong-suche/youtube-thumbnail.jpg) |
| 06 | [Arbeitsbereiche und Layouts einrichten](folge-06-arbeitsbereiche-layouts/README.md) | [1:22](folge-06-arbeitsbereiche-layouts/folge-06.mp4) | [Thumbnail](folge-06-arbeitsbereiche-layouts/youtube-thumbnail.jpg) |
| 07 | [Verse markieren und kopieren](folge-07-verse-markieren-und-kopieren/README.md) | [1:05](folge-07-verse-markieren-und-kopieren/folge-07.mp4) | [Thumbnail](folge-07-verse-markieren-und-kopieren/youtube-thumbnail.jpg) |
| 08 | [Bibelstellen zu einem Thema sammeln](folge-08-stellensammlungen/README.md) | [0:55](folge-08-stellensammlungen/folge-08.mp4) | [Thumbnail](folge-08-stellensammlungen/youtube-thumbnail.jpg) |
| 09 | [Notizen mit dem Bibeltext verknüpfen](folge-09-notizen-am-bibeltext/README.md) | [1:20](folge-09-notizen-am-bibeltext/folge-09.mp4) | [Thumbnail](folge-09-notizen-am-bibeltext/youtube-thumbnail.jpg) |
| 10 | [Ausarbeitungen auf dem Board organisieren](folge-10-ausarbeitungen-organisieren/README.md) | [0:43](folge-10-ausarbeitungen-organisieren/folge-10.mp4) | [Thumbnail](folge-10-ausarbeitungen-organisieren/youtube-thumbnail.jpg) |
| 11 | [Eine Ausarbeitung für den Einsatz vorbereiten](folge-11-ausarbeitungen-bearbeiten/README.md) | [0:47](folge-11-ausarbeitungen-bearbeiten/folge-11.mp4) | [Thumbnail](folge-11-ausarbeitungen-bearbeiten/youtube-thumbnail.jpg) |
| 12 | [Notizen und Ausarbeitungen weitergeben](folge-12-dokumente-teilen/README.md) | [0:56](folge-12-dokumente-teilen/folge-12.mp4) | [Thumbnail](folge-12-dokumente-teilen/youtube-thumbnail.jpg) |
| 13 | [Notizen importieren und exportieren](folge-13-notizen-import-export/README.md) | [1:37](folge-13-notizen-import-export/folge-13.mp4) | [Thumbnail](folge-13-notizen-import-export/youtube-thumbnail.jpg) |
| 14 | [Die Bibelausgaben in Akribos](folge-14-bibelausgaben/README.md) | [1:24](folge-14-bibelausgaben/folge-14.mp4) | [Thumbnail](folge-14-bibelausgaben/youtube-thumbnail.jpg) |
| 15 | [Feedback an Akribos geben](folge-15-feedback/README.md) | [0:43](folge-15-feedback/folge-15.mp4) | [Thumbnail](folge-15-feedback/youtube-thumbnail.jpg) |

## Auf einem neuen Rechner starten

1. Installiere **Git LFS** und führe einmal `git lfs install` aus. Klone anschließend dieses Repository mit Git. Bei einem bereits vorhandenen Klon lädt `git lfs pull` die großen Mediendateien. Die MOVs für den Schnitt und die WAV-Spuren sind bereits versioniert. [Git LFS](https://git-lfs.com/)
2. Installiere **Akribos Text** und **Noto Sans** wie unten beschrieben.
3. Öffne die gewünschte Folge. In **EffectCraft** bearbeitest du Texte, Animationen und Übergänge, in **FilmCraft** den Schnitt, die Sprachspur, die Musik und die Soundeffekte. Folge 01 wurde unter Linux mit EffectCraft 0.24.1 und FilmCraft 0.20.1 geprüft.

## Schriftarten installieren

Installiere [Akribos Text Regular](fonts/akribos-text-regular.ttf) und [Akribos Text SemiBold](fonts/akribos-text-semibold.ttf) einmal pro Benutzerkonto. Die EffectCraft-Projekte verwenden für die Szenentitel außerdem [Noto Sans Bold](fonts/noto-sans/NotoSans-Bold.ttf) und im Intro auch [Noto Sans Regular](fonts/noto-sans/NotoSans-Regular.ttf). [Lizenz von Noto Sans](fonts/noto-sans/OFL.txt) Starte EffectCraft nach der Installation neu. Die Schriftlizenz liegt bei den Dateien. [SIL Open Font License](fonts/OFL.txt)

**Linux** – Öffne ein Terminal im Hauptordner dieses Repos und führe aus:

```sh
font_dir="${XDG_DATA_HOME:-$HOME/.local/share}/fonts/Akribos"
install -d "$font_dir"
install -m 644 fonts/*.ttf fonts/noto-sans/*.ttf "$font_dir/"
fc-cache -f "$font_dir"
fc-list 'Akribos Text' family style
```

Die letzte Zeile sollte **Regular** und **SemiBold** anzeigen.

**Windows** – Markiere die TTF-Dateien aus `fonts/` und `fonts/noto-sans/` im Explorer, klicke mit der rechten Maustaste und wähle **Installieren**. Je nach Windows-Version steht der Eintrag unter **Weitere Optionen anzeigen**. [Microsoft-Anleitung](https://support.microsoft.com/en-us/office/add-a-font-b7c5f17c-4426-4b53-967f-455339c564c1)

**macOS** – Ziehe die TTF-Dateien aus `fonts/` und `fonts/noto-sans/` im Finder in die **Schriftsammlung**. [Apple-Anleitung](https://support.apple.com/guide/font-book/install-and-validate-fonts-fntbk1000/mac)

### Zitate und griechische Wörter in den Grafiken von Folge 14

Zum Bearbeiten der sechs SVG-Grafiken von Folge 14 brauchst du zusätzlich **Liberation Serif Regular**. Die bereits exportierten PNGs kannst du mit den installierten Akribos-Schriften direkt in EffectCraft und FilmCraft verwenden. [Liberation Serif Regular](fonts/liberation-serif/LiberationSerif-Regular.ttf) · [Schriftlizenz](fonts/liberation-serif/OFL.txt)

Unter **Linux** installierst du die zusätzliche Schrift vom Repo-Hauptordner aus mit diesen Befehlen.

```sh
font_dir="${XDG_DATA_HOME:-$HOME/.local/share}/fonts/Akribos"
install -d "$font_dir"
install -m 644 fonts/liberation-serif/LiberationSerif-Regular.ttf "$font_dir/"
fc-cache -f "$font_dir"
fc-match 'Liberation Serif:style=Regular'
```

Unter **Windows** öffnest du im Explorer `fonts/liberation-serif`, klickst mit der rechten Maustaste auf `LiberationSerif-Regular.ttf` und wählst **Installieren**. Unter **macOS** ziehst du diese Datei aus dem Finder in die **Schriftsammlung**. Starte deinen Grafikeditor anschließend neu.

## Weitere Folgen

Die gemeinsamen Hintergründe und das Logo liegen unter [seriengrafik/](seriengrafik/). Als Vorlage für einen neuen Schritt eignet sich die [Orientierungsfolge](folge-02-orientierung/README.md). In ihrer Szenendatei ordnest du jeder Einstellung den Sprechertext, einen Screenshot und den Bildausschnitt zu. Die Capture-Anleitung jeder Folge beschreibt die benötigten Beispieldaten, die Zugangsdaten als Umgebungsvariablen und den Aufruf des Aufnahme-Skripts.

Für die Sprecherstimme verwende in Runway **Eleven v4** und **Charlie Chatlin – Real & Casual**. Über **Reuse settings** kannst du die Einstellungen einer vorhandenen Aufnahme übernehmen. Für die Betonung auf dem **i** gib den Namen im gesprochenen Satz als `/aˈkʁiːbɔs/` ein. Als Hörvergleich dient [Variante 3 der Ausspracheprobe](sprecher/README.md). Prüfe die Aufnahme im vollständigen Satz. Im Bild, im lesbaren Sprechertext und in den Untertiteln steht **Akribos**. Die Untertitel jeder Anleitung liegen als deutsche SRT-Datei im Ordner `voiceover/`.
