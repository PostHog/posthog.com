---
title: Positioning
sidebar: Handbook
showTitle: true
---

PostHog makes your product self-driving. For the canonical frame everyone at PostHog uses – the self-driving story, the standard description, and the products / tools / context / context warehouse model – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).

This section is the product-marketing detail: the vocabulary we hold ourselves to, an opinionated playbook for each tool, and how we name and position what we ship.

> **The house position:** **PostHog makes _your_ product self-driving.** Everything we write ladders up to that. Keep the customer's product as the subject: they get a product that improves itself; PostHog is how. Don't write "PostHog is self-driving software" in customer-facing copy. We do use the same capabilities on PostHog itself – that's a proof point, not the pitch.

## The words we use

We've repositioned around self-driving. That only works if we all use the same words for the layers of what we offer – across marketing, content, and positioning. The [four layers](/handbook/brand/foundations#how-we-describe-posthog) (products, tools, context, context warehouse) are defined in brand foundations.

### Use these words

- **"Products"** for Web / Slack / MCP / CLI / Code (and Mobile in future)
- **"Tools"** for analytics / replay / flags / error tracking, etc.
- **"Context"** for events / recordings / logs / business data, etc.
- **"Context warehouse"** for the data warehouse plus ingestion pipeline

### Avoid these

- **Don't call the products "tools."** "Tools" is reserved for the functional capabilities (analytics, replay, flags). It also overlaps with agent tool-calling, so keep the surfaces called "products."
- **Don't call the products "interfaces."** Too corporate for a developer audience.
- **Don't call tools "products."** That's the old multi-product framing we're moving away from.
- **Don't say "PostHog Data Stack."** The data warehouse, modelling, pipelines, and batch exports are all part of the broader context warehouse. "Data Stack" is not a thing we talk about externally.
- **Don't call context "sources."** "Sources" already means something specific in the data warehouse (Stripe, Postgres, etc.) and will collide.

### Examples

> ✅ Say: "Add the PostHog Slack product." / ❌ Not: "Add the PostHog Slack tool."

> ✅ Say: "Product analytics is one of our tools." / ❌ Not: "Product analytics is one of our products."

> ✅ Say: "Your events, replays, and logs are the context that feeds self-driving." / ❌ Not: "...the sources that feed self-driving."

## The tool playbooks

A reference index to the per-tool pages. Each follows the same shape – unique belief, who it's for, elevator pitch and three messages, battle cards, common objections, and selling to enterprise – so you can scan them quickly. Pull from them freely, but they work best when remixed and pressure-tested in real conversations, not framed on a wall and cited religiously.

- [**Analytics**](/handbook/marketing/positioning/analytics) — Product analytics built for engineers, not dashboard tourists
- [**Session replay**](/handbook/marketing/positioning/session-replay) — Watching real users beats imagining them
- [**Feature flags**](/handbook/marketing/positioning/feature-flags) — Shipping switches that don't require a separate vendor
- [**Experiments**](/handbook/marketing/positioning/experiments) — A/B testing wired to the same data as everything else
- [**Data pipelines**](/handbook/marketing/positioning/data-pipelines) — CDP, reverse-ETL, and transformations bundled — typically 5–10x cheaper than Segment
- [**Endpoints**](/handbook/marketing/positioning/endpoints) — Turn any saved insight or SQL query into a stable, authenticated HTTP endpoint
- [**LLM analytics**](/handbook/marketing/positioning/llm-analytics) — Knowing why your LLM-powered feature is bleeding money or shipping nonsense
- [**PostHog AI**](/handbook/marketing/positioning/posthog-ai) — A query interface that already knows your schema (and your users)

The **context warehouse** has its own page too, but treat it as the platform everything above is built on – the data warehouse plus modelling, pipelines, and exports – not as a co-equal tool in this list:

- [**Context warehouse**](/handbook/marketing/positioning/data-warehouse) — The context layer for your agents, not just a SQL bucket

## What this isn't

- **Not a feature list.** That's what [the docs](/docs) are for.
- **Not static.** Tools evolve, pricing changes, and competitors ship things. Treat every page as the current best version, not the final one.

If something here feels off, doesn't match what the product team is actually building, or contradicts itself across pages — open a PR or flag it in #team-marketing.

## How we name and position things

Naming at PostHog is deliberately messy. Usually an engineer builds something and names it; sometimes James or Tim get the positioning right up front, but more often design iterates the name afterwards (and adds it to the all-hands so everyone catches up), and we reinforce it from there. The upside is that design and "execs" aren't a blocker to shipping – and since we usually soft-launch, the downside is small.

**Pick names users already recognize.** By default, position something as what a _user_ is familiar with, not the most technically accurate description – we often name new tools after what the major competitors call themselves. Users get it faster, we grow more quickly, and it keeps us building the basics a tool needs before trying to innovate ahead of product-market fit.

**Positioning is dynamic.** It changes as tools mature – we might position something narrowly at first to get feedback from a specific segment, then broaden or refine it as we learn how it's used. Every new tool should still reinforce the core story: PostHog makes your product self-driving.
