# Aufnahmen für „Verse kopieren und markieren“

Die Bilder stammen aus echten Ansichten der deutschen Akribos-Web-App. Für diese Folge wurde eine lokale Kopie mit dem fiktiven Konto **Lea Beispiel** in Chromium aufgenommen. Die PNGs in [screenshots/](../screenshots/) sind die Originalaufnahmen mit zweifacher Pixeldichte. Die Ausschnitte, die Positionen der Fokussignale und ihre gesprochenen Auslöser stehen in [episode.json](../episode.json) (Bildpositionen in Originalpixeln).

## Beispieldaten

Öffne im Demokonto den konfigurierten Vers in Elberfelder 1905 und markiere ihn gelb. Unter **Mein Konto → Darstellung → Versmarkierungen** gib der gelben Farbe den Namen **Zusagen**. In ihrer Versliste muss Johannes 3,16 erscheinen. Die ersten vier Szenen zeigen den Zustand vor der Markierung. Dazu wird das Entfernen nur in der geöffneten Browseransicht nachvollzogen. Für **Farbe hinzufügen** befüllt die Aufnahme das Formular mit einem Beispiel für eine zweite Farbe.

## Erneut aufnehmen

Im Hauptordner des Video-Repos installierst du einmal die gemeinsame Browser-Abhängigkeit:

```sh
npm ci --prefix folge-01-erklaervideo/capture
(cd folge-01-erklaervideo/capture && npx playwright install chromium)
```

Setze `AKRIBOS_URL` auf die Adresse der vorbereiteten Akribos-Installation und setze `AKRIBOS_USERNAME` und `AKRIBOS_PASSWORD` für das Demokonto. Im Ordner dieser Anleitung kannst du die Szenen auflisten oder zum Vergleich in ein anderes Verzeichnis schreiben:

```sh
node capture.mjs --list
node capture.mjs --shot 2 --output /tmp/akribos-folge-07-probe
```

Ohne `--shot` werden alle Szenen aufgenommen. Ohne `--output` landen die Aufnahmen wieder im Folgenordner. Bei einer geänderten Oberfläche übernimmt `--update-framing` die von den sichtbaren Bedienelementen abgeleiteten Ausschnitte in `episode.json`. Prüfe die neu gesetzten Ausschnitte im Bild, bevor du sie in die EffectCraft-Komposition übernimmst. Die bestehenden Masken und Fokussignale in einem manuell gespeicherten EffectCraft-Projekt bleiben eigenständig editierbar.

Namen und Referenzen für das Demokonto kannst du in [targets.json](targets.json) ändern. EffectCraft verwendet die gespeicherten PNG-Dateien für die Bildgestaltung.
