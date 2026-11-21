# Quellen und Screenshots der Bibelausgaben

Die Aufnahmen wurden im öffentlich zugänglichen Akribos-Reader am 21. November 2026 als Gast mit Johannes 3,16 erstellt. Zuerst sind die Werkauswahl und die darin sichtbaren Bezeichnungen zu sehen. Danach zeigt der Film die Schlachter-Akribos-Ausgabe, ihren verknüpften Eintrag G25 und den Vergleich Elberfelder/Menge in nebeneinanderliegenden Kacheln. Die vier Ressourcen-IDs und die Beispielstelle stehen in [targets.json](targets.json). [Akribos-Reader](https://akribos.de/Joh3,16)

**Die Editionsangaben dieser Folge**

- Für Elberfelder 1932 und Luther 1912 beschreibt das Akribos-Bibelprojekt eine regelbasierte sprachliche Bearbeitung sowie ergänzte Strong-Zuordnungen. Für die Schlachter 1951 ergänzt die auf der öffentlichen Originaldatei basierende Akribos-Ausgabe die Wortzuordnungen. Noch unbestätigte automatische Zuordnungen werden mit einem eigenen Hinweis dokumentiert. [Editionen und Verfahren](https://github.com/akribos-biblestudy/akribos-bibles/blob/b7d1575/README.md)
- Der öffentlich verfügbare Reader führt Menge als „Menge-Bibel“ mit der Kennung `MENG39` und ohne Strong-Zuordnungen. Die für die Wortstudie verwendete Ausgabe ist `AKRIBOS.SCHL1951`. In der Werkauswahl erscheinen außerdem die separaten historischen Ressourcen. [Öffentlicher Ressourcenkatalog](https://akribos.de/api/reader/resources)

**Aufnahme wiederholen**

1. Installiere im Repo-Hauptordner einmal `npm ci --prefix folge-01-erklaervideo/capture` und `(cd folge-01-erklaervideo/capture && npx playwright install chromium)`.
2. Starte hier `node capture.mjs --output /tmp/akribos-ausgaben`. Der Browser öffnet den öffentlichen Reader als Gast. Alternativ kannst du `AKRIBOS_URL` auf einen lokalen Reader mit diesen vollständigen Werken setzen.
3. Mit `--shot 4` wählst du die Wortstudie einzeln aus. Ohne `--output` werden die Bilder im Folgenordner aktualisiert; `--update-framing` ermittelt auch die Ausschnitte und Cursorpositionen für [episode.json](../episode.json) neu.
