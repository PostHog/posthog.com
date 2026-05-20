# PostHog Code RTS mode — audio credits

Static audio assets for [PostHog Code](https://github.com/PostHog/code)'s RTS mode (an RTS-style agent orchestration UI), served from `https://posthog.com/code-rts/`.

## Voice lines (`voice/<mode>/<gender>/*.mp3`)

Generated with [ElevenLabs](https://elevenlabs.io) Multilingual v2 (`mp3_22050_32`) under PostHog's ElevenCreative Starter commercial license. Voices used (all from the ElevenLabs default voice library):

- Default mode male + LolCat mode male: Liam (`TX3LPaxmHKxFdv7VOQHJ`)
- Default mode female + LolCat mode female: Laura (`FGY2WhTYpPnrIDTdsKH5`)
- Pirate mode male: Callum (`N2lVS1w4EtoT3dr4eOWO`)
- Pirate mode female: Lily (`pFZP5JQG7iQjIQuC4Bku`)

Source script: `notes/hedgemony/voice-lines.json` in the [PostHog Code repo](https://github.com/PostHog/code). Regenerate via `scripts/generate-voice.mjs`.

## Background music (`bgm.mp3`)

Background music used during RTS mode. Contributed by Stephen Schmidt as part of the PostHog Code Barbados hackathon project (May 2026).
