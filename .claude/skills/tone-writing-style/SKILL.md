---
name: posthog-voice
description: Write copy that sounds like PostHog — direct, opinionated, developer-facing, and specific. Use this skill whenever Cory is drafting, editing, or critiquing copy intended for posthog.com or any PostHog channel: product pages, landing pages, taglines, headlines, hero copy, button labels, microcopy, blog posts, newsletters, changelog entries, docs intros, social posts, marketing emails, error messages, or feature announcements. Also trigger when reviewing existing PostHog copy, refactoring generic SaaS-speak into PostHog voice, or when Cory pastes a draft and asks for feedback. Trigger even when "PostHog" isn't said explicitly — context cues like working on a product page, refining a tagline, or reviewing a PR for posthog.com mean this skill applies. The goal is copy that doesn't read like AI wrote it, doesn't sound like every other B2B SaaS site, and could pass review from PostHog's content team without flags.
---

# PostHog Voice

This skill captures PostHog's house style for marketing, product, and content writing. It exists to make sure copy sounds like PostHog wrote it — not like a generic SaaS template, not like an LLM, not like a competitor.

Before generating or editing copy, internalize the principles below. Reach for the reference files when more depth is needed.

## The non-negotiables

These rules apply to nearly all PostHog copy. Violations should be flagged or fixed.

1. **Be direct. State what the product does.** Don't make the reader infer. If the product does X, say "does X" — not "empowers teams to unlock X."
2. **Specificity beats benefit-language.** Concrete nouns and named features earn trust faster than abstract claims. "Signals inbox, automatic PRs, parallel agents" lands harder than "AI-powered productivity."
3. **Be opinionated. Don't sit on the fence.** It's better to be slightly wrong or controversial than to say nothing. Generic = invisible.
4. **Write articles, not content.** Every piece should have a point of view, not just inform. If it could've been written by anyone, rewrite it.
5. **Lead with the answer.** Don't bury the explanation under three paragraphs of throat-clearing. Most intros can be shortened or cut entirely.
6. **Don't sound corporate.** Authenticity > polish. If a sentence feels like it came from a press release, it's wrong.
7. **Cut metaphors that don't earn their keep.** PostHog's voice is technically grounded. Reach for a metaphor only when it clarifies — not as decoration.
8. **Before/after framing works.** Old way vs. new way, BC/AD, manual vs. agentic — structural contrasts land well with this audience.
9. **Feature enumeration earns trust.** When introducing something developers haven't seen before, name the actual capabilities. Lists of concrete features outperform abstract pitches.
10. **The Neil test.** Would Neil Kakkar (real PostHog product engineer) find this interesting or useful? If not, the audience won't either.

## Mechanics quick reference

Full details in `references/mechanics.md`. The most-violated rules:

- American English spelling and grammar.
- **En dashes with spaces** ( – ) instead of em dashes (—). Find-and-replace every em dash. Hyphens are not substitutes.
- **Sentence case** for all headings. "Documentation style guide" not "Documentation Style Guide".
- **No curly quotes or apostrophes.** Always straight: " ' not " " ' '.
- **"Analytics platform"** in marketing copy, not "product analytics tool" — PostHog is more than just analytics now.
- **"Open-source"** is hyphenated as an adjective before a noun ("open-source company"), not hyphenated otherwise ("PostHog is open source").

## Process when drafting

1. Identify the surface: product page, blog post, microcopy, etc. Different surfaces tolerate different lengths and tones — `references/examples.md` shows what each looks like.
2. Lead with the strongest, most specific claim. Cut anything that doesn't pay rent.
3. Run the self-checks in `references/voice-and-tone.md` before declaring it done.

## Process when reviewing existing copy

1. Paragraph by paragraph, ask: would this read identically on any competitor's site? If yes, it needs to be more specific.
2. Flag every metaphor — does it clarify, or is it decoration?
3. Hunt for: passive voice, hedge words ("helps you", "enables you to", "empowers"), jargon stacks, em dashes, curly quotes.
4. **Hunt for "actually" and "really" as intensifiers.** Phrases like "what's actually useful" or "what really matters" gesture at value without naming it. Every instance gets replaced with the concrete thing the copy is pointing at.
5. Suggest concrete alternatives, not just critiques.

## Reference files

- `references/voice-and-tone.md` — Deeper voice principles, banned phrases, hedge-word list, Neil test, anti-patterns
- `references/mechanics.md` — Full grammar, punctuation, vocabulary, and spelling rules
- `references/examples.md` — Good vs. bad rewrites, surface-by-surface examples (product page, blog, tagline, microcopy)
