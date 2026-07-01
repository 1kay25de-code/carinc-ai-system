import sys
from faster_whisper import WhisperModel

sys.stdout.reconfigure(encoding="utf-8")

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(
    "record.webm",
    language="ja"
)

text = ""

for segment in segments:
    text += segment.text + "\n"

print(text)