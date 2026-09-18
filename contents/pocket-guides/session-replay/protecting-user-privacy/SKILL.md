---
name: session-replay-masking
description: >
  Set up Session Replay masking on the mask-first, allow-explicitly pattern. Masks everything by
  default, then proposes candidates to reveal and waits for explicit approval on each one. Never
  unmasks anything without being told to.
---

# Session Replay masking

Your job is to get this project to a state where a session recording cannot leak data the team
hasn't consciously agreed to record.

**The rule that overrides everything else: you never reveal anything on your own judgment.** You
mask first, you propose, the human decides. If you are unsure whether something is safe, it stays
masked and you say so.

## Before you write anything

Read the current docs rather than working from memory. Every PostHog docs URL returns Markdown if
you append `.md`:

- `https://posthog.com/docs/session-replay/privacy.md` – masking for every SDK, and the exact
  config option names
- `https://posthog.com/docs/session-replay/network-recording.md` – headers, bodies, and the
  callback that redacts them and the page URL
- `https://posthog.com/docs/session-replay/mobile.md` – wireframe versus screenshot mode
- `https://posthog.com/llms.txt` – the index, if you need anything else

Then find out what you're working with:

1. Which PostHog SDK, and where it's initialized.
2. Whether masking has already been configured, and by whom – do not silently overwrite an
   existing config.
3. On mobile, whether screenshot mode is on. It raises the stakes of every unmarked view.

## Step one: mask everything

Set the project to mask all text and all inputs, using whatever the SDK calls it.

On web that means text masking applied broadly rather than per-element. On Android, iOS, React
Native, and Flutter the SDK already masks text and images by default — confirm it hasn't been
turned off rather than assuming.

Stop here and confirm recordings still capture something useful before going further. A fully
masked replay is correct, and it is also the baseline you reveal back from.

## Step two: propose what to reveal

Now read the app and build a list of candidates. Look for:

- Navigation, headers, footers, and marketing copy – no user data, high value in a replay
- Buttons, labels, and empty states
- Error and validation messages, which are usually the point of watching a replay
- Product-owned content like plan names, feature names, and static help text

For each candidate, tell the human three things: what it is, why you think it's safe, and what
would make it unsafe. Then ask.

Never propose revealing anything that could carry user input, names, email addresses, IDs, tokens,
financial data, health data, or anything rendered from a database row. If a component sometimes
holds user content and sometimes doesn't, it stays masked.

## Step three: apply only what was approved

Implement exactly the reveals that were agreed, one mark at a time, in the markup rather than in a
central selector list – a mark next to the component moves with it and gets reviewed with it.

Use whatever the SDK provides:

- Web has no unmask selector. Mark safe elements with a data attribute and check for it in the
  masking callback, matching on the nearest marked ancestor so a wrapper covers what's inside it.
- Android and iOS have real reveal markers, and reveal wins over mask.
- React Native and Flutter have no reveal marker at all. If something must be visible there, say
  so plainly – the only lever is an app-wide default, and changing it is a separate decision the
  human has to make knowingly.

## Step four: the things masking doesn't cover

Raise each of these explicitly, because a team that has masked its screens usually believes it's
done:

- **URLs.** The player shows the page URL and the timeline lists it. Query strings carry tokens,
  emails, and IDs. Redaction is a callback, and the same one covers network requests.
- **Network payloads.** Only relevant if network capture is on. Headers and bodies both.
- **Canvas.** Only relevant if canvas recording is on. It's pixels; no selector reaches inside.
- **Element attributes.** A masked element can still ship a `title`, `alt`, or `value` holding
  what you masked.

## Finally

Tell the human how to verify: open a recording and look at it. Reading the config proves nothing.

List what you masked, what you revealed and on whose instruction, and what you left alone because
you weren't sure.
