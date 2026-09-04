---
title: How forward deployed engineers work
sidebar: Handbook
showTitle: true
---

## The engagement lifecycle

Every engagement moves through four phases:

1. **Intake.** A colleague or customer raises a need. Capture enough to classify and route it: the customer, the product area, and a one-line ask.
2. **Scope.** Classify the engagement type, estimate effort, and quote if the shape calls for it. The output is a short brief the customer can check before we commit. Details below.
3. **Execute.** Do the hands-on work: instrumentation, data modeling, migrations, integrations, dashboards, reference implementations. Capture the durable artifacts as you go.
4. **Wrap-up.** Confirm the deliverable shipped and was approved, hand the relationship back to [sales and CS](/handbook/forward-deployed-engineering/working-with-sales-and-cs), and write down anything that came up so it can be preserved for the next customer.

## Scoping and engagement types

Before delivery starts, every engagement needs a clear outcome, a rough timeline, and a shared definition of "done." We write this down as a short brief and send it to the customer to check before committing. Scope small: it's cheaper to expand a tight scope than to unwind a loose one.

Always ask yourself while scoping: **would this output be useful to a different customer facing a similar problem?** If yes, it's compounding FDE work, so make sure the artifact lands somewhere reusable. If no, it's a scoped deliverable or a support answer. Being honest about this keeps the team's capacity pointed at work that compounds.

## Principles

These are the defaults we bring to every engagement. Each is a lever on the same goal: customer value that compounds.

- **Solve the customer's actual problem**, not the one that's easiest to ticket. The strongest move is often to correct a customer's mental model rather than build exactly what they asked for. Before digging in, ask what decision actually depends on the answer, and what "good enough" looks like for it.
- **Start with the MVP.** Say what the minimum answer is before you start. A short list today usually beats a long analysis next week. Building more than the question asked for isn't thoroughness, it's waste. Push back on every "should we also...".
- **Reach for PostHog's own primitives first.** Prefer PostHog AI and the platform's built-in capabilities over bespoke engineering. The simplest path the product already supports is usually right, and it's the one the customer can maintain after we leave.
- **Solve it once.** Anything you build for one customer should, where possible, become a reusable example, template, or product improvement.
- **Lead with substance.** In customer communication, lead with what you found and what you'd do, never with the fact that an artifact exists. "The writeup is ready" reads as corporate filler. Say what's in it.
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

## Sprints

The FDE team works in fortnightly [Sprints](/handbook/company/sprints) that run Monday to the Friday of the following week. Stand-ups are on Mondays and Wednesdays at 2.30pm UK / 9.30am ET.

On the closing Friday of a Sprint, a GitHub Action automatically closes the current Sprint's issue and creates a new issue for the next Sprint. FDE team members are expected to populate it before Sprint kick-off, which takes place at the Monday stand-up. 

## Systems and automation

One of the goals for the FDE team is to accelerate and improve our delivery by focusing on building automation, over one-off work. This helps us capture deep customer knowledge and allows for faster iterations. To that end, we have built systems and workflows to help us better achieve that goal.

### FDE Vault

The <PrivateLink url="https://github.com/PostHog/fde-vault/">FDE Vault</PrivateLink> is the operational brain for the FDE team and is where we store internal context about how we work and track specific customer engagements. The goal for the FDE Vault is to compound organizational knowledge over time by encoding our standards, playbooks, pricing, decision history, mistakes, and hard-won patterns in a central repository.

### FDE Vault Boy Bot
FDE Vault Boy is a triage bot for the #team-fde Slack channel, built as a Slack workflow. It runs automatically whenever a message containing pre-defined keywords is posted in #team-fde which requires FDE attention. The bot classifies the message to identify what's being asked, then provides a tailored response based on the original ask and its category.

### Team Digest
Team Digest is a weekly GitHub Action which runs from the <PrivateLink url="https://github.com/PostHog/fde-vault/actions/workflows/digest.yml">FDE Vault</PrivateLink>. It posts a Slack message to the #team-fde channel summarizing the past week for the team: Tasks, Meetings, Deliverables, and Pull Requests (opened and merged), with the full digest details stored as a linked GitHub issue.

### FDE Signal Router
People love working in Slack, so most of how the team operates lives in threads that scroll off and never compound. The FDE Signal Router is built to catch these valuable conversations.

Reply to any Slack message with the :fde-is-on-da-job: emoji and the context is captured to a Slack canvas in the #team-fde channel, where it is routinely monitored and reviewed by the FDE team.

Use it to flag anything warranting action from the FDE team, whether that means routing it to a more permanent home or raising it for discussion at standup or sprint planning.