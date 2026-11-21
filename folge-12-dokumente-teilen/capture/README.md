# Screenshots der Freigabe

Die fünf Bilder wurden in der Akribos-Webanwendung mit einem lokalen Demo-Konto aufgenommen. Die beiden Freigabeformen zeigen eine Ausarbeitung im Dokumenteditor und den nicht gelisteten Schnappschuss einer Notiz. Die Fassung vom 19. November 2026 bietet den Leselink für eigene Notizen von Administratoren an. Ausarbeitungen und Notizen können über das Exportmenü als Datei weitergegeben werden. [Dokumentseite im verwendeten Akribos-Stand](https://github.com/akribos-biblestudy/akribos/blob/ab47367a164d1f32c9403ade7ffba6d16f53f443/src/routes/notes/%5Bid%5D/%2Bpage.svelte)

Für die Aufnahme braucht dein Demo-Administratorkonto eine eigene Ausarbeitung und zwei vorbereitete Notizstände mit demselben Titel. Die private Notiz zeigt das Formular vor der Freigabe. Zur anderen Notiz existiert bereits ein nicht gelisteter Schnappschuss. Ein neuerer Bearbeitungsstand macht auch die Aktualisierungsfunktion sichtbar. Trage die drei Dokumentpfade und den Titel in [targets.json](targets.json) ein. Das Aufnahmeskript liest diese Zustände und öffnet den vorbereiteten Leselink.

1. Installiere im Repo-Hauptordner einmal die Browser-Abhängigkeiten mit `npm ci --prefix folge-01-erklaervideo/capture` und `(cd folge-01-erklaervideo/capture && npx playwright install chromium)`.
2. Setze `AKRIBOS_URL`, `AKRIBOS_USERNAME` (E-Mail) und `AKRIBOS_PASSWORD` auf deine vorbereitete Instanz und dein Demo-Konto.
3. Führe im Ordner dieser Anleitung `node capture.mjs --output /tmp/akribos-freigabe` für eine Probe aus. Mit `node capture.mjs` ersetzt du die hinterlegten PNGs. `--shot 3` wählt ein einzelnes Bild.

Dateinamen und Ausschnitte stehen in [episode.json](../episode.json). `--update-framing` übernimmt bei einer Neuaufnahme auch die vom Browser ermittelten Bildausschnitte und Cursorpositionen.
