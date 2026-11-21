# Akribos-Videos

Die Quelldateien der Akribos-Erklärvideos. Jede Folge hat ihren eigenen Ordner mit den bearbeitbaren EffectCraft- und FilmCraft-Projekten, Screenshots, Sprechertexten, Tonspuren und dem fertigen Video. Die gemeinsame Schrift liegt unter [fonts/](fonts/).

| Folge | Projekt und Anleitung | Fertiges Video |
| --- | --- | --- |
| 01 · Akribos kennenlernen | [folge-01-erklaervideo](folge-01-erklaervideo/README.md) | [MP4 · 60 Sekunden](folge-01-erklaervideo/folge-01.mp4) |

## Auf einem neuen Rechner starten

1. Installiere **Git LFS** und führe einmal `git lfs install` aus. Klone anschließend dieses Repository mit Git. Bei einem bereits vorhandenen Klon lädt `git lfs pull` die großen Mediendateien. Die MOVs für den Schnitt und die WAV-Spuren sind bereits versioniert. [Git LFS](https://git-lfs.com/)
2. Installiere beide Schnitte von **Akribos Text** wie unten beschrieben.
3. Öffne die gewünschte Folge. In **EffectCraft** bearbeitest du Texte, Animationen und Übergänge, in **FilmCraft** den Schnitt, die Sprachspur, die Musik und die Soundeffekte. Folge 01 wurde unter Linux mit EffectCraft 0.24.1 und FilmCraft 0.20.1 geprüft.

## Schriftarten installieren

Installiere [Akribos Text Regular](fonts/akribos-text-regular.ttf) und [Akribos Text SemiBold](fonts/akribos-text-semibold.ttf) einmal pro Benutzerkonto. Danach sind die Schriften in allen Folgen verfügbar. Starte EffectCraft nach der Installation neu. Die Schriftlizenz liegt bei den Dateien. [SIL Open Font License](fonts/OFL.txt)

**Linux** – Öffne ein Terminal im Hauptordner dieses Repos und führe aus:

```sh
font_dir="${XDG_DATA_HOME:-$HOME/.local/share}/fonts/Akribos"
install -d "$font_dir"
install -m 644 fonts/*.ttf "$font_dir/"
fc-cache -f "$font_dir"
fc-list 'Akribos Text' family style
```

Die letzte Zeile sollte **Regular** und **SemiBold** anzeigen.

**Windows** – Markiere beide TTF-Dateien im Explorer, klicke mit der rechten Maustaste und wähle **Installieren**. Je nach Windows-Version steht der Eintrag unter **Weitere Optionen anzeigen**. [Microsoft-Anleitung](https://support.microsoft.com/en-us/office/add-a-font-b7c5f17c-4426-4b53-967f-455339c564c1)

**macOS** – Ziehe beide TTF-Dateien aus dem Finder in die **Schriftsammlung**. [Apple-Anleitung](https://support.apple.com/guide/font-book/install-and-validate-fonts-fntbk1000/mac)

## Weitere Folgen

Lege pro Folge einen Ordner nach dem Muster `folge-02-thema` an. Speichere die beiden Projektdateien und ihre Medien gemeinsam darin. Verweise in den Projekteinstellungen auf die Medien innerhalb des Folgenordners. Die installierte Schriftfamilie heißt **Akribos Text**. Jede Folge kann dieselbe Familie verwenden. Für Sprechertext und Aufnahmen dient die [Vertonung von Folge 01](folge-01-erklaervideo/voiceover/README.md) als Vorlage.
