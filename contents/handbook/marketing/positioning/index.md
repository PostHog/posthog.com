---
title: Positioning and selling
sidebar: Handbook
showTitle: true
---

PostHog ships a lot of products. This section is how we explain each one — what it does, who it's for, why it beats the obvious alternative, and how it fits into the bigger argument we're making about [self-driving product development](/blog/self-driving-product).

These aren't datasheets. They're opinionated playbooks.

> **PMM tip:** Looking to test new messaging or create a new doc? BuildBetter's AI chat is a good starting point and has context from 1,000s of hours of customer interviews.

## What's on each product page

Every product in this section follows the same shape, so you can scan them quickly:

- **The unique belief** — the one-sentence argument for why this product exists and why ours is different
- **Who it's for / who it isn't for** — honest segmentation, so we stop selling to people we shouldn't
- **Elevator pitch and three messages** — the short version, then the three framings that hold up in detail
- **Battle cards** — how we stack against the obvious competitors (Segment, Snowflake, Amplitude, and friends)
- **Common objections** — what people push back on, and how to answer without spinning
- **Selling to enterprise** — pricing levers, contract buyouts, and the bits that matter once a deal gets real

## How to use this

You're welcome to pull from these, but these ideas work best when remixed, and pressure-tested in real conversations — not framed on a wall and cited religiously.

Positioning is dynamic. See [how we name and position things](#how-we-name-and-position-things) below for how that evolves at PostHog. These pages capture where we are *today*. If you spot drift between what's written here and what the product actually does, fix it.

## The products

- [**Analytics**](/handbook/marketing/positioning/analytics) — Product analytics built for engineers, not dashboard tourists
- [**Session replay**](/handbook/marketing/positioning/session-replay) — Watching real users beats imagining them
- [**Feature flags**](/handbook/marketing/positioning/feature-flags) — Shipping switches that don't require a separate vendor
- [**Experiments**](/handbook/marketing/positioning/experiments) — A/B testing wired to the same data as everything else
- [**Data warehouse**](/handbook/marketing/positioning/data-warehouse) — The context layer for your agents, not just a SQL bucket
- [**Data pipelines**](/handbook/marketing/positioning/data-pipelines) — CDP, reverse-ETL, and transformations bundled — typically 5–10x cheaper than Segment
- [**Endpoints**](/handbook/marketing/positioning/endpoints) — Turn any saved insight or SQL query into a stable, authenticated HTTP endpoint
- [**LLM analytics**](/handbook/marketing/positioning/llm-analytics) — Knowing why your LLM-powered feature is bleeding money or shipping nonsense
- [**PostHog AI**](/handbook/marketing/positioning/posthog-ai) — A query interface that already knows your schema (and your users)

## What this isn't

- **Not a feature list.** That's what [the docs](/docs) are for.
- **Not static.** Products evolve, pricing changes, and competitors ship things. Treat every page as the current best version, not the final one.

If something here feels off, doesn't match what the product team is actually building, or contradicts itself across pages — open a PR or flag it in #ask-marketing.

## How we name and position things

_How_ do we name things?

Here's a typical flow:

* engineer builds cool thing
* engineer gives it a name
* design thinks it should be called something else
* um

So, how do we name things:

* engineer builds cool thing
* _sometimes_ James or Tim realize it's happening and get the positioning right first time around
* but if they don't / or don't spot it...
* engineer gives it a name
* design iterates the name (and adds it to the all hands so we can get everyone else to realize this has happened)
* everyone - reinforce the name if people are calling things the wrong thing

This has a downside - it's messier from a user perspective, but the upside is that design / "execs" aren't a blocker to getting work out the door. In practice, we rarely push hard on marketing a new thing to users anyway (usually we soft launch stuff) so we think the downside is pretty minimal.

### Picking a good name

By default, everything should be positioned as something a _user_ is familiar with, not what is necessarily the most technically accurate description.

For example, when we build new products, we often name them based on what the major competitors are calling themselves.

This means users get it way faster, so we grow more quickly, and it encourages us to build the basic features that a given product needs versus trying to innovate _before_ we hit product market fit with a new product in our platform.

### What positioning actually means

Positioning is more than just picking a name. It's about understanding how users will encounter, understand, and use what we're building.

It also means being clear about **what problem we're solving** and **who it's for**. Are we building this for someone debugging an issue right now, or for someone planning next quarter's roadmap? The same feature might be positioned differently depending on the context.

We also think about how new capabilities fit into the **broader PostHog story**. Every new product should reinforce our core positioning: one platform that gives engineers everything they need to build successful products.

### Positioning is dynamic

The reality is that positioning changes as products mature. Early on, we might position something narrowly to get feedback from a specific user segment. As it grows and we understand usage patterns, we can broaden or refine that positioning.

We're comfortable with this iterative approach because it means we're not overthinking positioning before we know what users actually want, and how the product fits into the broader market.
