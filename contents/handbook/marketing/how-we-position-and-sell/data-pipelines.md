---
title: Data pipelines
sidebar: Handbook
showTitle: true
---

> **Owner:** See [who owns this feature](https://posthog.com/handbook/engineering/feature-ownership)

## The unique belief (in terms of data pipelines)

PostHog is [a doing company](/blog/posthogs-next-chapter). Agents already create the majority of dashboards through PostHog AI and MCP. PostHog Code runs the [product autonomy loop](/blog/self-driving-product): signals in, work out, evaluation, repeat.

That loop only closes if the agent can see the whole picture. Errors and replays don't tell you which customer to prioritize — revenue from Stripe, plan from HubSpot, tickets from Zendesk, spend from Google do. That data lives outside PostHog. So do the systems PostHog needs to push signals into.

**Data pipelines are how PostHog becomes infrastructure for self-driving development.** Sources bring business context in. Destinations and batch exports push enriched signals back out. Without pipelines the autonomy loop is half-blind. Segment and Rudderstack just move data. PostHog moves it *and* runs the agents that act on it.

## Who this is for

- **Teams already on PostHog sending the same events through a separate CDP.** They're paying twice.
- **Engineer-led teams building AI-native products.** They already get the "agents need context" argument.
- **Startups consolidating their stack.** PostHog replaces Segment + Mixpanel + LaunchDarkly + Fivetran. $50k credits via the startup program.
- **Customers on Segment, Rudderstack, mParticle, or Fivetran today.** We'll buy out the contract.
- **Warehouse customers wanting Stripe / HubSpot / Salesforce alongside product data.** Sources are free.
- **Compliance-sensitive teams.** EU residency, SOC 2, HIPAA-ready.

### Who this isn't for

- Teams that need 700+ destinations on day one — Segment wins on breadth.
- Mature data orgs with deep tracking-plan governance needs — Segment Protocols is more mature.
- Teams who only want a CDP and don't care about the rest of PostHog — the bundle is the whole point.

## Messaging

### Elevator pitch

PostHog's data pipelines move data into and out of PostHog without forcing you to buy a separate CDP, ETL tool, or reverse-ETL service. Sources are free, destinations and batch exports are usage-priced, transformations run on Hog functions inside the same platform that runs your analytics, replay, flags, experiments, warehouse, and agents.

That bundling is the pitch. Segment and Rudderstack only move data. PostHog moves it, lets you act on it, and feeds the agents that act on your behalf — typically 5–10x cheaper than Segment at equivalent volume.

### Message 1: Pipelines are the context layer for self-driving development

**Problem:** Agents that don't see revenue, plan tier, or support history can't prioritize. They see a stack trace, not the fact that the error hit your top customer.

**Solution:** Sources pull Stripe, HubSpot, Salesforce, Zendesk, and 40+ other systems into PostHog so every signal carries its business context — for your engineers and your agents.

**Supporting features:**
- 44 sources, free to import
- Warehouse Sources for Snowflake, BigQuery, Databricks, Postgres
- Unified SQL across product and business data
- MCP exposes the same data to Claude Code, Cursor, and other agent runtimes
- Hog functions for transformations, schema enforcement, PII scrubbing

### Message 2: Cut three vendors and an ETL backlog down to one

**Problem:** Segment + Mixpanel + LaunchDarkly + Fivetran + Hightouch + BI = six vendors, six bills, six renegotiations, and a data-engineering queue that grows every time someone wants a new destination.

**Solution:** PostHog covers the whole loop — analytics, replay, flags, experiments, warehouse, CDP, agents — in one platform. Destinations fan out from the same event stream. Product teams self-serve.

**Supporting features:**
- 145+ integrations (44 sources, 41 real-time destinations, 7 batch-export targets)
- Hog functions in JS or Hog
- One SDK, one event schema
- Contract buyouts when you commit annually
- Open source — build your own integration

### Message 3: Predictable pricing, production-grade reliability

**Problem:** Other CDP tools introduce regular sticker shock or bill on difficult metrics, like MTUs. Meanwhile, home-rolled ETL pipelines silently fail and need maintenance.

**Solution:** Per-event for real-time, per-row for batch, with 10K trigger events + 1M rows free monthly. Batch exports run on Temporal with retries, dead-letter queues, and at-least-once delivery.

**Supporting features:**
- Sources free, generous usage tiers
- Billing limits per product
- Temporal-backed exports — see [the engineering writeup](/blog/temporal-exports)
- We only ever lower prices

## Battle cards

### vs Segment (Twilio)

**Their approach:** The original CDP. 700+ destinations, mature identity resolution, Protocols for governance, Personas/Engage for audiences. MTU-based pricing — anonymous visitors count.

**Where PostHog wins:**
- Bundled with analytics, replay, flags, experiments, warehouse, agents
- Per-event pricing — no MTU surprises for B2C
- Sources are free
- Pricing is published, not quote-locked

### vs Rudderstack

**Their approach:** Warehouse-first CDP, Segment-compatible APIs, Reverse ETL as the headline, AGPLv3 open source. 200+ integrations.

**Where PostHog wins:**
- Customer wants analytics, replay, flags, experiments in the same tool
- Customer doesn't have a mature warehouse to anchor warehouse-first
- Customer cares about agent-readiness — MCP, PostHog AI, PostHog Code

### vs Fivetran

**Their approach:** Managed ELT. 500+ connectors loading SaaS data into Snowflake / BigQuery / Databricks. dbt-native, Census for reverse-ETL. Warehouse-destination-only, MAR-based pricing that's known for jumping at scale.

**Where PostHog wins:**
- Customer wants real-time destinations, not just warehouse loads
- Stripe, HubSpot, Salesforce, Postgres are the load-bearing connectors (we have all of them)
- Mid-market customers hitting the MAR cliff
- Customer wants analytics in the same tool

## Objections

### "Segment has 700+ destinations, you have 145"

**Follow-up:** Which destinations do you actually use today?

**Answer:** Almost every customer uses fewer than 10. PostHog covers the common ones natively; Hog functions and webhooks cover anything with an HTTP API. The 700-vs-145 framing rarely survives a specific list.

### "We already use Segment / Rudderstack / Fivetran — why switch?"

**Follow-up:** What are you paying today across CDP, analytics, flags, experiments, and ETL? How much engineering time goes into the pipeline?

**Answer:** The CDP line alone usually closes the gap; the bundled-platform savings make it lopsided. Start with PostHog Sources (free) and batch exports for the destinations they care about. We'll buy out the existing contract on an annual commit.

**Proof point:** [Rebtel](/customers/rebtel) migrated off mParticle + Snowflake + dbt with a phased plan. [Great Expectations](/customers/great-expectations) consolidated lead enrichment onto PostHog + Databricks.

### "Reliability — we've been burned by ETL before"

**Follow-up:** What does reliable mean — at-least-once, exactly-once, replayability, observability?

**Answer:** At-least-once with retries, exponential backoff, dead-letter queues, monitoring. The export system was rebuilt on Temporal in 2024 specifically to fix the duplicate-data and locking problems home-rolled ETL hits at scale. Our support team is engineers.

**Proof point:** [Why we moved exports to Temporal](/blog/temporal-exports).

## Selling to enterprise

PostHog does enterprise the same way we do everything else. Pricing is published. Contracts follow [the four-lever framework](/handbook/growth/sales/contract-rules) — volume, commitment, payment timing, forecast certainty — up to 40%+ off. No "let me talk to my manager" theatre.

Enterprise gets volume discounts on real-time and batch usage, ~20% annual prepay, custom DPA, BAA for HIPAA, EU residency, SOC 2, and dedicated support. **Contract buyout:** if a customer is locked into Segment / Rudderstack / Fivetran / mParticle and commits $20k+/year annually, we cover them for up to 6 months while the old contract runs out.

Enterprise does *not* get an APM-style sales motion, months-long POCs, or a CDP that operates outside our analytics platform. If a prospect needs any of those, the deal isn't a fit — say so early.
