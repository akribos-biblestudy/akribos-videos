"""Assemble the Runway takes into the narration track for FilmCraft."""

import argparse
import json
from pathlib import Path
import subprocess
import tempfile


HERE = Path(__file__).resolve().parent


def mix(timing, output):
    duration = timing["duration"]
    inputs, filters, clips = [], [], []
    for index, take in enumerate(timing["takes"]):
        inputs.extend(["-i", HERE / "takes" / take["file"]])
        for segment in take["segments"]:
            start, end, at = (segment[key] for key in ("start", "end", "at"))
            if not (0 <= start < end and 0 <= at < duration and end - start >= 0.005):
                raise ValueError(f"Invalid segment in {take['file']}: {segment}")
            clip = f"[take{len(clips)}]"
            filters.append(
                f"[{index}:a]atrim=start={start}:end={end},asetpts=PTS-STARTPTS,"
                f"afade=t=in:d=0.005,afade=t=out:st={end-start-.005:.4f}:d=0.005,"
                f"adelay={round(at*1000)}:all=1{clip}"
            )
            clips.append(clip)
    filters.append(
        "".join(clips) + f"amix=inputs={len(clips)}:normalize=0,"
        "aresample=48000,pan=stereo|c0=c0|c1=c0,volume=0.65dB,"
        f"alimiter=limit=0.84:level=0:latency=1,apad=whole_dur={duration},atrim=end={duration}[voice]"
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent) as work:
        wav = Path(work) / "voice.wav"
        subprocess.run(
            ["ffmpeg", "-nostdin", "-v", "error", *inputs, "-filter_complex", ";".join(filters),
             "-map", "[voice]", "-c:a", "pcm_s24le", wav], check=True
        )
        wav.replace(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=HERE.parent / "audio" / "Sprecher-Runway.wav",
                        help="Destination WAV file")
    args = parser.parse_args()
    mix(json.loads((HERE / "timing.json").read_text(encoding="utf-8")), args.output)
