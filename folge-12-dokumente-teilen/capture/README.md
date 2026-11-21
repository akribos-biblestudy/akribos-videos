# Aufnahmen für die Freigabe

Die sechs Szenen zeigen eine Ausarbeitung im Editor, den Dateiexport, die Linkfreigabe einer Notiz, die öffentlich lesbare Fassung und die beiden Aktionen zum Aktualisieren und Zurückziehen. Die sichtbaren Schaltflächen stammen aus der Akribos-Webanwendung. [Dokumenteditor](https://github.com/akribos-biblestudy/akribos/blob/781a006efe6e350a266f7e94779c8459038c787d/src/routes/notes/%5Bid%5D/%2Bpage.svelte)

## Demo vorbereiten

Verwende ein eigenes Demo-Konto mit freigeschaltetem Linkformular. Das Konto benötigt eine ausgefüllte Ausarbeitung und zwei eigene Notizen mit gleichem Beispielinhalt. Eine Notiz steht vor ihrer ersten Freigabe, von der anderen ist ein Schnappschuss unter einem Leselink verfügbar. Ändere die freigegebene Notiz nach der Freigabe, damit die Funktion zum Aktualisieren erkennbar wird. Passe Dokumentpfade und Titel in [targets.json](targets.json) an. Das Skript liest diese vorbereiteten Zustände.

## Bilder aufnehmen

1. Installiere im Repo-Hauptordner Playwright mit `npm ci --prefix folge-01-erklaervideo/capture` und `(cd folge-01-erklaervideo/capture && npx playwright install chromium)`.
2. Setze `AKRIBOS_URL`, `AKRIBOS_USERNAME` (E-Mail) und `AKRIBOS_PASSWORD` für die vorbereitete Instanz.
3. Im Ordner `capture` erstellt `node capture.mjs --output /tmp/akribos-freigabe` eine Vorschau. `--shot 3` wählt eine Szene aus. `node capture.mjs --update-framing` übernimmt Bilder, Ausschnitte und Zielpunkte in den Folgenordner.

[episode.json](../episode.json) enthält für jede sichtbare Markierung mit `cue` das zugehörige wörtliche Fragment des Sprechertexts.
