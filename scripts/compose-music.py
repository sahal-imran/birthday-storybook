"""Render our own instrumental performance of Happy Birthday, with no sampled recording."""
import math, struct, wave
from pathlib import Path

rate = 22050
beat = .65
# MIDI notes and beat lengths: the familiar four phrases of Happy Birthday.
phrases = [
    [(67,.5),(67,.5),(69,1),(67,1),(72,1),(71,2)],
    [(67,.5),(67,.5),(69,1),(67,1),(74,1),(72,2)],
    [(67,.5),(67,.5),(79,1),(76,1),(72,1),(71,1),(69,2)],
    [(77,.5),(77,.5),(76,1),(72,1),(74,1),(72,2)],
]
phrase_beats = sum(length for phrase in phrases for _, length in phrase)
round_beats = phrase_beats + 3
seconds = round_beats * beat * 2
samples = [0.0] * int(rate * seconds)

def note(midi, start, duration, volume):
    frequency = 440 * 2 ** ((midi - 69) / 12)
    for k in range(int(duration * rate)):
        index = int(start * rate) + k
        if index >= len(samples): break
        t = k / rate
        envelope = min(1, t / .018) * min(1, (duration - t) / .15) * math.exp(-t * 2.1)
        tone = math.sin(2 * math.pi * frequency * t)
        tone += .22 * math.sin(2 * math.pi * frequency * 2 * t) * math.exp(-t * 3)
        tone += .06 * math.sin(2 * math.pi * frequency * 3 * t) * math.exp(-t * 5)
        samples[index] += tone * envelope * volume

for repeat in range(2):
    cursor = repeat * round_beats * beat
    for phrase_index, phrase in enumerate(phrases):
        start = cursor
        for pitch, length in phrase:
            note(pitch, cursor, min(length * beat * .9, 1.4), .26)
            cursor += length * beat
        # A quiet accompaniment under each phrase keeps the birthday melody clear.
        chord = [(48,52,55),(43,47,50),(53,57,60),(48,52,55)][phrase_index]
        for offset in range(int(sum(length for _, length in phrase))):
            note(chord[offset % 3], start + offset * beat, 1.5, .055)
    for pitch in [48,52,55,60]: note(pitch, cursor, 1.6, .035)

# Light room echo, wrapping only the quiet tail at the loop boundary.
dry = samples[:]
for delay, gain in [(.13,.10),(.28,.06),(.47,.035)]:
    for k, value in enumerate(dry): samples[(k + int(delay * rate)) % len(samples)] += value * gain
peak = max(abs(value) for value in samples)
# Quiet mastering also helps phones whose OS ignores programmatic media volume.
output = Path(__file__).resolve().parent.parent / 'public/audio/happy-birthday-music-box.wav'
with wave.open(str(output), 'wb') as audio:
    audio.setnchannels(1); audio.setsampwidth(2); audio.setframerate(rate)
    audio.writeframes(b''.join(struct.pack('<h', int(value / peak * 15000)) for value in samples))
print(f'Created {output.name}: {seconds:.1f}s, two Happy Birthday verses with a gentle music-box sound')
