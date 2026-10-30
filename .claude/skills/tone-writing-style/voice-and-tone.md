# Voice and tone

Deeper guidance on PostHog's voice. Read this when drafting longer-form pieces or when the SKILL.md rules feel too thin for the situation.

## Core voice qualities

PostHog sounds like a smart, opinionated developer talking to other smart developers. Not a marketer talking to a buyer. The voice is:

- **Direct** — gets to the point fast
- **Confident** — has a take and stands behind it
- **Specific** — names things concretely
- **Honest** — admits tradeoffs, what's hard, what doesn't work yet
- **Playful when appropriate** — wordplay, dry humor, irreverence land well; purple prose does not
- **Technically grounded** — assumes the reader is technical and respects their time

## What PostHog is not

- Corporate ("We're committed to empowering...")
- Hype-driven ("Revolutionary AI-powered...")
- Hedging ("Could potentially help teams...")
- Generic ("The leading platform for modern engineering teams")
- Performatively casual (forced "lol" and emojis don't make corporate copy non-corporate)

## Hedge words and phrases to cut

Almost always weakens a sentence. Default to deleting these:

- "helps you" / "helps teams" / "enables you to"
- "empowers"
- "unlock" / "unleash"
- "seamlessly" / "seamless"
- "leverage" (use "use")
- "robust" / "powerful" / "comprehensive" (without something concrete next to it)
- "world-class" / "best-in-class" / "cutting-edge"
- "solution" (almost never the right word — name the actual product or feature)
- "in order to" (just "to")
- "utilize" (just "use")
- "delve into" / "dive deep" / "dig into"
- "at the end of the day"
- "game-changing" / "revolutionary" / "next-gen"
- "streamline" (be specific about what it actually does)
- "simply" / "just" (often condescending; let the action speak)
- **"what's actually useful" / "what really matters" / "what you actually care about" / "the things that matter most"** — vague references to user value that name nothing. The "actually" or "really" is the tell: it's an intensifier pretending to add specificity. Always replace with the actual specific thing (events, URLs, users, sessions, error types, etc.).

## Constructions to favor

- **Active voice over passive.** "PostHog tracks events" not "Events are tracked by PostHog."
- **Verbs over noun-stacks.** "Track usage" not "perform usage tracking."
- **Concrete subjects.** "Developers" or "your team" rather than "users" or "stakeholders."
- **Show the work.** Real numbers, real examples, real screenshots. Not vague claims.
- **Contractions are fine.** "It's" / "you'll" / "we're" — they sound human.
- **Short sentences are fine.** Even single-word ones. Like this.

## Don't sit on the fence

Every PostHog piece should have an opinion. If you can't tell what the writer thinks after reading, the piece failed. This means:

- Take a side on tradeoffs
- Call out when industry standards are wrong
- Disagree with competitors by name when relevant
- Don't water down strong claims with "it depends"

The risk of being slightly wrong is much smaller than the risk of being forgettable.

## "Articles, not content"

PostHog blog posts and newsletters are written to be read end-to-end by smart people, not to rank for keywords. This means:

- Don't pad for SEO
- Don't structure around H2s for "scannability" if it weakens the argument
- Don't recap things the reader already knows ("In today's fast-paced world...")
- Lead with the surprising thing

## We do the work

PostHog content is credible because it's grounded in evidence — real-world examples, first-hand experience, or actual data. If a claim is in a piece, there should be something concrete behind it.

When drafting, ask: where's the evidence? If a sentence is just an opinion floating in space, find an example, a number, or a story to anchor it.

## The Neil test

Neil Kakkar is a real product engineer at PostHog. The test: would Neil find this interesting or useful? If not, the target audience won't either. Apply this especially to:

- Blog post hooks
- Product page hero copy
- Newsletter subjects
- Anything with a "How to..." or "Why we..." pattern (these go stale fast unless the take is strong)

## Anti-patterns specifically common in AI-generated copy

Cory works with Claude often, so it's worth flagging things LLMs tend to over-reach for:

- **Vague references to user value.** Phrases like "what's actually useful," "what really matters," "the things that matter most," "what you actually care about." The structural tell is using "actually" or "really" as an intensifier in front of a vague noun — it sounds like specificity but names nothing. **Always replace with the concrete thing**: the events, URLs, users, sessions, error types, or feature criteria the copy is actually pointing at. If you can't name what the value is, the sentence has no payload.
  - Bad: "Recording rules narrow your capture to what's actually useful."
  - Good: "Recording rules let you capture by event, URL, or user property."
  - Good: "Recording rules let you capture only paying users on checkout."
- **The "It's not just X, it's Y" construction.** Used once, fine. Used three times in a page, it becomes a tic.
- **Rule-of-three lists everywhere.** Sometimes the right number is two. Or four. Or one.
- **Em dashes for emphasis.** PostHog uses en dashes with spaces, but more importantly: don't lean on dashes as a rhythm crutch when commas or periods would work.
- **"Whether you're X or Y..."** openers. Lazy framing.
- **Tagline patterns like "[Verb] [X]. [Verb] [Y]. [Verb] [Z]."** Recognizable AI cadence.
- **Mirroring the prompt back.** "Great question! Let me help you write copy that..." — strip this out.
- **Over-explaining the obvious.** Trust the reader.

## Self-check before declaring done

- [ ] Could this run identically on a competitor's site? If yes, it's too generic.
- [ ] Is there a specific, concrete claim or feature in every paragraph?
- [ ] Did I cut hedge words?
- [ ] Did I lead with the strongest line?
- [ ] Is there an opinion, or just description?
- [ ] **Does every value claim name the specific thing?** ("captures the right sessions" → name what makes them right)
- [ ] **Did I check for "actually" / "really" as intensifiers?** Almost always a sign the surrounding noun is vague.
- [ ] Would Neil read this voluntarily?
