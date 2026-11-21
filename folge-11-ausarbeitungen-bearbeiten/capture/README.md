# Aufnahmen für „Zusatzfelder einer Ausarbeitung“

Alle fünf Bilder stammen aus echten Ansichten der deutschen Akribos-Web-App. Für diese Folge wurde eine lokale Kopie mit dem fiktiven Konto **Lea Beispiel** in Chromium aufgenommen. Die PNGs in [screenshots/](../screenshots/) sind die Originalaufnahmen mit zweifacher Pixeldichte. Die für das Video gewählten Ausschnitte und die Positionen der Fokussignale stehen in [episode.json](../episode.json) in Originalpixeln.

## Beispieldaten

Verwende **Licht für unseren Alltag** aus Folge 10. Für die Detailansichten sind das Format **Hauskreis**, der Arbeitsstand **Gliederung**, der Termin **07.10.2026** und die Reihe **Johannes entdecken** gesetzt. Verknüpfe die Sammlung **Licht und Leben**, lege **Gesprächsfragen.txt** als kleine Anlage ab und erfasse unter **Bereits gehalten** eine Durchführung mit Datum und Ort **Hauskreis Nord**. Im ursprünglich aufgenommenen Board stand die Karte vor der Detailbearbeitung noch in Recherche.

## Erneut aufnehmen

Im Hauptordner des Video-Repos installierst du einmal die gemeinsame Browser-Abhängigkeit:

```sh
npm ci --prefix folge-01-erklaervideo/capture
(cd folge-01-erklaervideo/capture && npx playwright install chromium)
```

Setze `AKRIBOS_URL` auf die Adresse der vorbereiteten Akribos-Installation und setze `AKRIBOS_USERNAME` und `AKRIBOS_PASSWORD` für das Demokonto. Im Ordner dieser Anleitung kannst du die Szenen auflisten oder zum Vergleich in ein anderes Verzeichnis schreiben:

```sh
node capture.mjs --list
node capture.mjs --shot 2 --output /tmp/akribos-folge-11-probe
```

Ohne `--shot` werden alle fünf Szenen aufgenommen. Ohne `--output` landen die Aufnahmen wieder im Folgenordner. Bei einer geänderten Oberfläche übernimmt `--update-framing` die von den sichtbaren Bedienelementen abgeleiteten Ausschnitte in `episode.json`. Prüfe die neu gesetzten Ausschnitte im Bild, bevor du sie in die EffectCraft-Komposition übernimmst. Die bestehenden Masken und Fokussignale in einem manuell gespeicherten EffectCraft-Projekt bleiben eigenständig editierbar.

Namen und Referenzen für das Demokonto kannst du in [targets.json](targets.json) ändern. EffectCraft verwendet die gespeicherten PNG-Dateien für die Bildgestaltung.
