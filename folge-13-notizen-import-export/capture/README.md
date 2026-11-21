# Aufnahmen zum Import und Export

Die [Beispieldatei](Bibelstellen-im-Text.md) lässt sich unmittelbar in Akribos importieren. Sie enthält die Stellen als normalen Fließtext. So stammen die sichtbaren Verknüpfungen direkt aus der Erkennung von Akribos.

| Schreibweise | Beispiel aus der Datei |
| --- | --- |
| Kapitel, ausgeschriebener Buchname, Kürzel oder englischer Buchname | `Röm 8`, `Johannes 3,16`, `Matthew 5:3` |
| Kapitel und Vers mit Komma, Doppelpunkt oder Unterstrich, mit optionalem Leerzeichen hinter dem Buchnamen | `Johannes 3,16`, `Joh3:16`, `Joh 3_16` |
| Versbereich mit Binde- oder Gedankenstrich; Bereiche über Kapitel und Bücher | `Joh 3,16–18`, `1Mo 1,31-2,3`, `1. Sam 31,13–2. Sam 1,2` |
| Arabische oder römische Buchnummern | `2. Sam 1,2`, `II. Sam 9,2` |
| Verszusätze a, b, c verweisen auf den vollständigen Vers | `Joh 7,12a`, `Joh 7,12b`, `Joh 7,12c` |
| Ein oder zwei folgende Verse einbeziehen | `Joh 7,12f`, `Joh 7,12ff` |
| Getrennte Verse oder eine Fortsetzung im selben Buch | `Joh 7,12+47`, `Joh 7,12.47`, `Joh 3,16; 4,2` |

Der Aufnahmehelfer prüft die vom Editor erzeugten Referenzkennungen. Im Popup zu Johannes 3,16 sind auch der tatsächliche Vers und die Schaltfläche „Bibelstelle öffnen“ zu sehen. [Erkennung im Akribos-Quelltext](https://github.com/akribos-biblestudy/akribos/blob/781a006efe6e350a266f7e94779c8459038c787d/src/lib/bible/link-references.spec.ts)

## Aufnahme wiederholen

1. Installiere im Repo-Hauptordner Playwright mit `npm ci --prefix folge-01-erklaervideo/capture` und `(cd folge-01-erklaervideo/capture && npx playwright install chromium)`.
2. Importiere die Beispieldatei einmal in dein vorbereitetes Demo-Konto. Kopiere den Pfad ihrer Dokumentseite in `notePath` in [targets.json](targets.json). Die Voreinstellung zeigt auf die isolierte Aufnahmedatenbank. Wähle für die Vorschau eine Bibel, die Johannes 3,16 enthält.
3. Setze `AKRIBOS_URL`, `AKRIBOS_USERNAME` (E-Mail) und `AKRIBOS_PASSWORD`. Im Ordner `capture` erstellt `node capture.mjs --output /tmp/akribos-import` die Bilder separat. Der Aufnahmehelfer öffnet die Vorschau und anschließend die vorbereitete Notiz. Mit `--shot 8` prüfst du das Vers-Popup einzeln. `--update-framing` aktualisiert die Bilder und Ausschnitte direkt in der Folge.
