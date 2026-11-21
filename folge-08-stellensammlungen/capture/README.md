# Aufnahmen für „Stellensammlungen“

Alle fünf Bilder stammen aus echten Ansichten der deutschen Akribos-Web-App. Für diese Folge wurde eine lokale Kopie mit dem fiktiven Konto **Lea Beispiel** in Chromium aufgenommen. Die PNGs in [screenshots/](../screenshots/) sind die Originalaufnahmen mit zweifacher Pixeldichte. Die für das Video gewählten Ausschnitte und die Positionen der Fokussignale stehen in [episode.json](../episode.json) in Originalpixeln.

## Beispieldaten

Bereite zwei private Sammlungen vor. **Licht und Leben – Versauswahl** zeigt den frühen Arbeitsstand mit Johannes 1,4 und 1,5 sowie ohne Kommentare. **Licht und Leben** enthält zusätzlich Johannes 8,12. Unter Johannes 1,4 steht der in der Konfiguration angegebene Kommentar. Die zweite Sammlung dokumentiert den späteren Zustand und dient auch als Material für Folge 11.

## Erneut aufnehmen

Im Hauptordner des Video-Repos installierst du einmal die gemeinsame Browser-Abhängigkeit:

```sh
npm ci --prefix folge-01-erklaervideo/capture
(cd folge-01-erklaervideo/capture && npx playwright install chromium)
```

Setze `AKRIBOS_URL` auf die Adresse der vorbereiteten Akribos-Installation und setze `AKRIBOS_USERNAME` und `AKRIBOS_PASSWORD` für das Demokonto. Im Ordner dieser Anleitung kannst du die Szenen auflisten oder zum Vergleich in ein anderes Verzeichnis schreiben:

```sh
node capture.mjs --list
node capture.mjs --shot 2 --output /tmp/akribos-folge-08-probe
```

Ohne `--shot` werden alle fünf Szenen aufgenommen. Ohne `--output` landen die Aufnahmen wieder im Folgenordner. Bei einer geänderten Oberfläche übernimmt `--update-framing` die von den sichtbaren Bedienelementen abgeleiteten Ausschnitte in `episode.json`. Prüfe die neu gesetzten Ausschnitte im Bild, bevor du sie in die EffectCraft-Komposition übernimmst. Die bestehenden Masken und Fokussignale in einem manuell gespeicherten EffectCraft-Projekt bleiben eigenständig editierbar.

Namen und Referenzen für das Demokonto kannst du in [targets.json](targets.json) ändern. EffectCraft verwendet die gespeicherten PNG-Dateien für die Bildgestaltung.
