---
# The scout itself. This is a real SKILL.md – the same shape as the canonical scouts in
# the monorepo under `products/signals/skills/signals-scout-*/SKILL.md`, so you can paste
# one in here or lift this one out without reformatting anything.
#
# `name` MUST match `signals-scout-<kebab-case>` or the harness never runs it.
name: signals-scout-your-scout

# Doubles as the description on the scout config API, and prefills the deep link. One
# or two lines: what it watches, and what makes it file.
description: >
  What this scout watches and the condition under which it files a report.

# What puts the scout on the report channel. Every scout needs both – without them it
# falls back to a deprecated legacy signal-emitting channel and can't write reports.
allowed_tools:
  - emit_report
  - edit_report
---

# Your scout's title

One line on what it watches. Everything below is the agent's instructions, executed on
every run, so write it in the second person to the agent – not to the reader.

Say how this relates to the canonical fleet. Most scouts you write will be a narrower
version of an existing one, and saying which saves a reader from running both. Check
`products/signals/skills/` in the monorepo before you assume yours is new.

If your `schedule` in index.mdx isn't the fleet default of daily, justify it here in one
line.

## Discriminator

The rule that decides whether a run files a report or writes nothing. Be specific enough
that two different agents would reach the same verdict on the same data.

Prefer a **rate** over a raw count. A threshold on a count always needs a human to ask
"but did traffic move?", which is why those alerts get muted. A threshold on a normalized
rate answers that question itself – which is what lets the agent decide alone. Pick your
denominator before you pick your threshold.

### The bar

Give a concrete starting threshold, and say it's meant to be tuned:

- the numeric condition, on a **complete** bucket – a partial bucket reads as a spike
  every time, and
- a **volume floor**, below which the number is noise.

The volume floor usually matters more than the threshold.

## Explore

Numbered steps the agent works through. Order them by likelihood, cheapest first.

1. **Rule out the instrumentation.** Broken tracking looks identical to a broken product
   in almost every scout. Check this before anything else.
2. **Rule out the innocent explanation.** Whatever your discriminator's quiet case is,
   this is where the agent confirms it doesn't apply.
3. **Find the cause.** A report that says a number moved, with no cause attached, is
   something the reader still has to go investigate themselves.
4. **Tie it to a deploy** where one sits in the window, and include the commit range.

## Disqualifiers

The explicit list of "don't file for this". Every false positive you can think of goes
here – this list is what keeps the inbox worth reading.

- The innocent explanation from your discriminator's quiet case.
- Anything deliberate and announced.
- Anything below the volume floor.
- Not enough history to have a stable norm yet.
