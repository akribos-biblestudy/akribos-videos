"""Restore portable media paths after saving an episode in the ArtCraft editors."""

import argparse
import json
import os
import stat
import tempfile
from pathlib import Path, PureWindowsPath
from urllib.parse import urlsplit
from urllib.request import url2pathname


def media_fields(project, suffix):
    """Yield editable (container, key) pairs for native media and queue paths."""
    if suffix == ".fcproj":
        for item in project["project"]["items"].values():
            media = item["kind"].get("Media", {})
            for source in (media.get("media"), media.get("proxy")):
                if source and "File" in source:
                    yield source["File"], "path"
        return

    for item in project["items"].values():
        sources = []
        if item["kind"]["type"] == "Footage":
            sources.append(item["kind"])
        if item.get("proxy"):
            sources.append(item["proxy"]["footage"])
        for source in sources:
            yield source, "path"
            sequence = source.get("sequence", [])
            for index in range(len(sequence)):
                yield sequence, index
    for job in project.get("render_queue", []):
        for output in [job["output"], *job.get("extra_outputs", [])]:
            yield output, "output"
        if job.get("last_output"):
            yield job, "last_output"


def portable_version(file):
    original = file.read_text(encoding="utf-8")
    project = json.loads(original)
    replacements = {}
    for container, key in media_fields(project, file.suffix):
        value = container[key]
        if not value:
            continue
        path = value
        if value.lower().startswith("file:"):
            uri = urlsplit(value)
            if uri.netloc and uri.netloc.lower() != "localhost":
                raise ValueError(f"{file.name}: external media or output: {value}")
            path = url2pathname(uri.path)
        if PureWindowsPath(path).is_absolute() and not Path(path).is_absolute():
            raise ValueError(f"{file.name}: path belongs to a different workstation: {value}")
        candidate = Path(os.path.abspath(file.parent / path))
        if not candidate.is_relative_to(file.parent.parent):
            raise ValueError(f"{file.name}: external media or output: {value}")
        if Path(path).is_absolute() or path != value:
            relative = Path(os.path.relpath(candidate, file.parent)).as_posix()
            replacements[value] = relative
            container[key] = relative
    if not replacements:
        return original, original

    # Preserve the editor's exact formatting and float literals for a clean Git diff.
    portable = original
    for absolute, relative in replacements.items():
        portable = portable.replace(json.dumps(absolute, ensure_ascii=False),
                                    json.dumps(relative, ensure_ascii=False))
    if json.loads(portable) != project:
        # The same string might also be visible in a title; edit path fields only.
        style = {"indent": 2} if file.suffix == ".ecproj" else {"separators": (",", ":")}
        portable = json.dumps(project, ensure_ascii=False, **style)
    return original, portable


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("episode", type=Path, help="Episode directory containing the editable projects")
    parser.add_argument("--check", action="store_true", help="Report absolute paths without changing files")
    args = parser.parse_args()
    episode = args.episode.resolve()
    files = sorted([*episode.glob("*.ecproj"), *episode.glob("*.fcproj")])
    if not files:
        parser.exit(1, f"No ArtCraft projects found in {episode}\n")
    try:
        changes = {}
        for file in files:
            original, portable = portable_version(file)
            if portable != original:
                changes[file] = (original, portable)
        if args.check and changes:
            parser.exit(1, "Absolute paths in " + ", ".join(p.name for p in changes) + "\n")
        for file, (original, portable) in changes.items():
            with tempfile.TemporaryDirectory(dir=episode) as directory:
                updated = Path(directory) / file.name
                updated.write_text(portable, encoding="utf-8")
                updated.chmod(stat.S_IMODE(file.stat().st_mode))
                if file.read_text(encoding="utf-8") != original:
                    raise ValueError(f"{file.name} changed during normalization; run again")
                updated.replace(file)
            print(f"Restored relative paths in {file.name}")
    except (OSError, ValueError) as error:
        parser.exit(1, f"{error}\n")
    print(f"Portable project paths: {episode.name}")


if __name__ == "__main__":
    main()
