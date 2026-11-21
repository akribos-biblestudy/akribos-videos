# Screenshots von Import und Export

Die Aufnahmen zeigen die Notizbibliothek, die Importvorschau und das Exportmenü in der Akribos-Webanwendung. Die mitgelieferte [Beispielnotiz](Gnade-im-Alltag.md) enthält Titel, Schlagwörter, Johannes 1,16 und einen Bildverweis. Die Vorschau zeigt den ausgelassenen Bildanhang als Beispiel für die Konvertierungshinweise.

Für Bild 4 und 5 braucht das Demo-Konto eine eigene Notiz mit verknüpfter Bibelstelle. [targets.json](targets.json) enthält Dokumentpfad und Titel. Der letzte Screenshot zeigt die Importvorschau der tatsächlich aus dieser Notiz heruntergeladenen Markdown-Datei. Beide Beispielimporte enden auf der Vorschauseite. [Akribos-Importseite](https://github.com/akribos-biblestudy/akribos/blob/ab47367a164d1f32c9403ade7ffba6d16f53f443/src/routes/notes/import/%2Bpage.svelte)

1. Installiere im Repo-Hauptordner einmal Playwright mit `npm ci --prefix folge-01-erklaervideo/capture` und `(cd folge-01-erklaervideo/capture && npx playwright install chromium)`.
2. Setze `AKRIBOS_URL`, `AKRIBOS_USERNAME` (E-Mail) und `AKRIBOS_PASSWORD` für die vorbereitete Instanz und passe gegebenenfalls die Dokumentdaten in [targets.json](targets.json) an.
3. Im Ordner dieser Anleitung erstellt `node capture.mjs --output /tmp/akribos-import` eine Vorschau sämtlicher Bilder. Ohne `--output` landen die Bilder im Folgenordner. Mit `--shot 2` wählst du eine Szene aus.

Dateinamen, Ausschnitte und Zeigerpositionen sind in [episode.json](../episode.json) abgelegt. Mit `--update-framing` kannst du sie aus den tatsächlichen Positionen im Browser neu bestimmen.
