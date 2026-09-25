---
title: How forward deployed engineers work
sidebar: Handbook
showTitle: true
---

## The engagement lifecycle

Every engagement moves through four phases:

1. **Intake.** A colleague or customer raises a need with the information outlined in [how to get an FDE involved](/handbook/forward-deployed-engineering/how-to-get-fde-involved). That's enough for us to scope it.
2. **Scope.** We then classify the engagement type, estimate effort, and quote if the shape calls for it. The output is a short brief the customer can confirm before we commit. Details below.
3. **Execute.** We do the hands-on work: instrumentation, data modeling, migrations, integrations, dashboards, and reference implementations. We capture the durable artifacts as we go.
4. **Wrap-up.** We confirm the deliverable was shipped and approved, then hand the relationship back to [sales and CS](/handbook/forward-deployed-engineering/working-with-sales-and-cs). We write down anything worth keeping for the next customer, along with any learnings to take back to product.

## Scoping engagements

Before delivery starts, every engagement needs a measurable outcome, a rough timeline, and a shared definition of "done." We write this down as a short brief and send it to the customer to confirm before committing. Scope small: it's cheaper to expand a tight scope than to unwind a loose one.

While scoping, we always ask: **Is the problem described the actual problem? Are there any hidden dependencies?** Understanding the real problem space matters more than anything else in making an engagement succeed.

### What it costs

Pricing depends on shape, effort, and commercial context, so exact numbers live in the FDE calculator and the commercial reference, not here. The philosophy:

- **Discovery and scoping** time before an engagement is free and time-boxed. If a customer wants more before signing, that becomes a paid proof-of-concept.
- **Pricing is quoted per milestone deliverable**, not per hour. A deliverable that doubles in scope is a new quote, not an informal extension.

Never invent an exact number on the spot. If a customer asks, say you'll get them a quote within a day and route it through the account owner.

## Principles

These are the defaults we bring to every engagement to deliver delightful customer outcomes.

- **The unit of output is a measurable customer outcome.** Not a doc, a recommendation, or a merged PR. We measure an engagement by what changed for the customer, and we agree on how we'll measure that before we start.
- **Solve the customer's actual problem**, not the one that's easiest to ticket. The strongest move is often to correct a customer's mental model rather than build exactly what they asked for. Before digging in, ask what decision actually depends on the answer, and what "good enough" looks like for it.
- **Start with the MVP.** Say what the minimum answer is before you start. A short list today usually beats a long analysis next week. Building more than the question asked for isn't thoroughness; it's waste. Push back on every "should we also...".
- **Reach for PostHog's own primitives first.** Prefer PostHog AI and the platform's built-in capabilities over bespoke engineering. The simplest path the product already supports is usually right, and it's the one the customer can maintain after we leave.
- **Capture what's reusable.** Where something we build for one customer would help others, turn it into an example, template, or product improvement. Don't force it where it wouldn't.
- **Lead with substance.** In customer communication, lead with what you found and what you'd do, never with the fact that an artifact exists. "The writeup is ready" reads as corporate filler. Say what's in it.
- **Stay close to product engineering.** We're the fastest feedback loop between real customer usage and the roadmap, so [use it](/handbook/forward-deployed-engineering/working-with-product-engineering).

## Judgment over volume

As AI handles more of the production, an FDE's value is less in how much they can produce and more in the judgment they bring to it. When generation is cheap, the scarce skills are the ones a model can't supply for you:

- **Prioritizing well.** Knowing which of ten reasonable things to do first, and which not to do at all.
- **Deriving the true problem.** Reading ambiguous or over-specified requirements and finding the real question underneath.
- **Choosing the simplest thing that works.** The simple approach where it serves, the robust one only where it prevents real regressions.
- **Deciding now, defer, or delegate.** Knowing what to fix now, what to consciously defer, and what to hand to the customer's team, the product, or an AI agent.

We hire and grow for this, and we give people room to exercise it rather than a script to follow.

## Improvement loop

Doing the work and improving how we work are the same activity. Every engagement teaches us something: a recurring question, a pattern that held, a place the process drifted. We capture those, gate the ones that hold, and graduate them to the right level of generality: a customer question becomes a topical reference, a cross-customer pattern becomes a lesson or a playbook entry, a hard-won rule becomes a standard.

The result is a team knowledge base that gains weight over time, so the floor is higher on every new engagement.

## Compounding work

We earn the right to compound by getting it right for one customer first.

That means we focus hard on a single customer's problem and deliver real, measurable value for them as quickly as possible. Only once it has worked in the real world do we think about scaling it out to N customers. We don't try to make a solution general or scalable across the customer base until later, because generalizing too early usually means solving nobody's problem well.

In practice:

- **Go deep on one customer.** Keep asking why something is painful until we understand it as well as they do. Their pain becomes ours.
- **Execute with urgency.** We bias for action and push the work through to completion. The value comes from shipping it on the customer's side, measuring whether it worked, and making that work visible.
- **Deliver the outcome before thinking about scale.** The first job is making it work for this customer. Scaling comes second.
- **Scale through solid primitives.** When we do scale to N, we build on shared platform primitives and guardrails, like the PostHog wizard, so quality stays high as the work compounds.
- **Not everything goes back to the product.** Some of what we build is specific to one customer, and that's fine. But there are almost always learnings, and we bring those back.

## Sprints

The FDE team works in fortnightly [Sprints](/handbook/company/sprints) that run from Monday to the Friday of the following week. Stand-ups are on Mondays and Wednesdays at 2.30pm UK / 9.30am ET.

On the closing Friday of a Sprint, a GitHub Action automatically closes the current Sprint's issue and creates a new issue for the next Sprint. FDE team members are expected to populate it before Sprint kick-off, which takes place at the Monday stand-up.

## Working as a team

We're still new as a team and figuring things out as we go. To ensure everybody is pulling in the right direction and not duplicating work, we:

- Make work visible once it may affect the team, customers, or shared systems. We follow the PostHog convention of preferring pull requests over issues and Slack discussions. Save RFCs for when you want to invite discussion, and keep them rare.
- Build on existing work. Before starting a new solution, check for relevant work already in progress and either reuse it, improve it, or explicitly explain why a separate approach is needed.
- Use peer feedback to shape the approach. Raise alternatives early so we can consider and agree on the best path forward.
- Create maintainable team assets. Avoid building tools or workflows that only one person can operate.
- Track customer outcomes, not just work outputs.

In general, at PostHog we bias for sharing imperfect work early, so that peers can help shape the direction of that work, rather than waiting for something to be perfectly ready before making it visible to the team.
