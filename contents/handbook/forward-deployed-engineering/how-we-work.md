---
title: How forward deployed engineers work
sidebar: Handbook
showTitle: true
---

## The engagement lifecycle

Every engagement moves through four phases. Reference this when you're unsure which phase you're in or what happens next.

1. **Intake.** A colleague or customer raises a need. Capture enough to classify and route it: the customer, the product area, and a one-line ask.
2. **Scope.** Classify the engagement type, estimate effort, and quote if the shape calls for it. The output is a short brief the customer can check before we commit. Detail below.
3. **Execute.** Do the hands-on work: instrumentation, data modeling, migrations, integrations, dashboards, reference implementations. Capture the durable artifacts as you go.
4. **Wrap-up.** Confirm the deliverable shipped and was approved, hand the relationship back to [sales and CS](/handbook/forward-deployed-engineering/working-with-sales-and-cs), and write down anything that came up so the next customer hits an answer instead of a rediscovery.

Once an engagement is scoped, the day-to-day of delivering it (our cadence with the customer, how we write deliverables, and how we hand back) lives in [working with customers](/handbook/forward-deployed-engineering/working-with-customers).


## Scoping and engagement types

Before delivery starts, every engagement needs a clear outcome, a rough timeline, and a shared definition of "done." We write this down as a short brief and send it to the customer to check before committing. Scope small: it's cheaper to expand a tight scope than to unwind a loose one.

The test while scoping: **would this output be useful to a different customer facing a similar problem?** If yes, it's compounding FDE work, so make sure the artifact lands somewhere reusable. If no, it's a scoped deliverable or a support answer. Being honest about this keeps the team's capacity pointed at work that compounds.

### Engagement types

Every piece of work has a primary nature. Naming it honestly is the start of good scope discipline; lying to yourself about which one drove the work is the start of scope drift.

- **FDE = work that compounds.** Produces reusable artifacts (docs, tooling, reference implementations, patterns) that benefit future customers, not just this one, and runs as an ongoing engagement with a cadence. You know it's FDE when something reusable exists at the end that wouldn't have otherwise.
- **ProServ = scoped, billed, single-customer.** A defined start, end, and deliverable for one customer. Useful work, but it doesn't generalize: the result is named after the customer and would be wrong for anyone else.
- **Support = reactive, one-off answers.** A question gets answered and nothing lasting is filed; the conversation is the artifact. It's the deep-context cousin of standard support: still reactive, but it needs FDE-level familiarity with the customer.
- **Pre-sales = time-boxed conversion work.** Advisory reviews and proofs-of-concept that exist to help close a deal. If the deal disappears, the work stops.

An engagement is often more than one of these. Pick the one that explains why the work was scheduled. And when work drifts, whether codebase access never came through, the customer went quiet, or scope shrank to one-off fixes, don't pretend it's still compounding. Reclassify it honestly and flag it, so capacity planning reflects reality. An FDE task that produces nothing reusable is just expensive support.

## Principles

These are the defaults we bring to every engagement. Each is a lever on the same goal: customer value that compounds.

- **Solve the customer's actual problem**, not the one that's easiest to ticket. The strongest move is often to correct a customer's mental model rather than build exactly what they asked for. Before digging in, ask what decision actually depends on the answer, and what "good enough" looks like for it.
- **MVP first, scope discipline always.** Name the minimum viable answer out loud before you start. A 20-line list delivered today usually beats a 200-line analysis delivered next week. Producing more than the question needed isn't thoroughness. Resist scope creep at every "should we also…" turn.
- **Reach for PostHog's own primitives first.** Prefer PostHog AI and the platform's built-in capabilities over bespoke engineering. The simplest path the product already supports is usually right, and it's the one the customer can maintain after we leave.
- **Solve it once.** Anything you build for one customer should, where possible, become a reusable example, template, or product improvement.
- **Lead with substance.** In customer communication, lead with what you found and what you'd do, never with the fact that an artifact exists. "The writeup is ready" reads as corporate filler; say what's in it.
- **Stay close to product engineering.** We're the fastest feedback loop between real customer usage and the roadmap, so [use it](/handbook/forward-deployed-engineering/working-with-product-engineering).

## Judgment over output

As AI handles more of the production, an FDE's value is less in how much they can produce and more in the judgment they bring to it. When generation is cheap, the scarce skills are the ones a model can't supply for you:

- **Prioritizing well.** Knowing which of ten reasonable things to do first, and which not to do at all.
- **Deriving the true problem.** Reading ambiguous or over-specified requirements and finding the real question underneath.
- **Choosing the simplest thing that works.** The simple approach where it serves, the robust one only where it prevents real regressions.
- **Now vs defer vs delegate.** Deciding what to fix now, what to consciously defer, and what to hand to the customer's team, the product, or an AI agent.

We hire and grow for this, and we give people room to exercise it rather than a script to follow.

### What it costs

Pricing depends on shape, hours, and commercial context, so exact numbers live in the FDE calculator and the commercial reference, not here. The philosophy:

- **Discovery and scoping** before an engagement is free and time-boxed. If a customer wants more before signing, that becomes a paid proof-of-concept.
- **FDE engagements have a minimum size** (roughly a one-week sprint) because anything shorter can't produce something that compounds. A one-day "FDE engagement" is just support with a fancy name, so quote it as support instead.
- **ProServ is quoted per deliverable**, not per hour. A deliverable that doubles in scope is a new quote, not a conversation about generosity.

Never invent an exact number on the spot. If a customer asks, say you'll get them a quote within a day and route it through the account exec.

## Improvement loop

Doing the work and improving how we work are the same activity. Every engagement teaches us something: a recurring question, a pattern that held, a place the process drifted. We capture those, gate the ones that hold, and graduate them to the right level of generality: a customer question becomes a topical reference, a cross-customer pattern becomes a lesson or a playbook entry, a hard-won rule becomes a standard.

The result is a team knowledge base that gains weight over time, so the floor is higher on every new engagement.
