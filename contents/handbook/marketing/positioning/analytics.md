---
title: Analytics
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog Analytics covers funnels, retention, trends, user paths, correlation analysis, and SQL — with autocapture so you never miss the event that mattered. Every graph links directly to the session recordings and feature flag states behind it. And because analytics is built into the same platform as replay, flags, experiments, and the data warehouse, agents can query it mid-loop without switching tools.

Amplitude and Mixpanel tell you what happened. PostHog tells you what happened *and* lets you act on it.

## The unique belief (in terms of analytics)

PostHog is building the infrastructure for self-driving product development. The [product autonomy loop](/blog/self-driving-product) — signals in, work out, evaluation, repeat — only closes if agents can measure whether their changes worked. Analytics isn't the end of the workflow; it's the  truth the entire system runs on. Every funnel, retention chart, and correlation PostHog generates is a queryable signal. PostHog Code re-queries those same dashboards post-merge to evaluate its own work, or you can manually query the data yourself either via the MCP or with PostHog AI. 

Analytics is the memory of everything users have done. Self-driving development is impossible without it.

## Who this is for

- **Engineer-led product teams** who want to understand user behavior without waiting on a data team.
- **Teams consolidating from Amplitude or Mixpanel** who also want session replay, feature flags, and experiments in one platform.
- **B2B SaaS companies** who need group/account-level analytics alongside individual user behavior.
- **Teams building AI-native products** who need LLM observability and product analytics in the same place.
- **Startups moving fast** who need autocapture to catch events they forgot to instrument.

### Who this isn't for

- Teams who need advanced cohort modeling and data science workflows — other platforms have more mature statistical tooling here.
- Enterprises needing deep data governance (e.g. warehouse native requirements) without also adopting the broader PostHog platform.

## Messaging

### Message 1: Analytics that feeds your agents, not just your dashboards

**Problem:** Agents that only generate insights and dashboards are read-only. The product autonomy loop requires a system that can query product metrics, interpret the result, and use it to decide whether a change worked. 

**Solution:** PostHog exposes every insight, dashboard, and HogQL query to PostHog Code, the MCP, and other agent runtimes. Agents can build dashboards, check event volume, and measure impact, and suggest changes based on results — all from within the loop, without human intervention.

**Supporting features:**
- MCP: lets agents query PostHog from Claude Code, Cursor, and any MCP-compatible runtime
- HogQL: full SQL access on your event stream
- Autocapture: instrument your product retrospectively, not just prospectively
- PostHog Code: The self-driving product development platform

### Message 2: Autocapture means you never miss the signal that mattered

**Problem:** Traditional analytics starts too early and answers too late. You have to instrument an event before you know it matters, then wait around for data after the decision window has closed.

**Solution:** PostHog's autocapture records clicks, pageviews, form submissions, and rage clicks from the moment you install the SDK — no manual instrumentation required. You can always go back and analyze behavior you didn't know you'd need. And installation is easy with the Wizard!

**Supporting features:**
- Autocapture on web and mobile
- Retroactive event definition — define events from captured data after the fact
- PostHog AI: ask questions about your data in plain English

### Message 3: One platform — analytics, replay, flags, experiments, warehouse

**Problem:** Amplitude + FullStory + LaunchDarkly + Optimizely + Segment = five vendors, five bills, five contracts, five sets of data that don't talk to each other without custom integrations.

**Solution:** PostHog covers the full product intelligence loop in one platform. Every metric links to the sessions behind it. Every experiment is built on feature flags. Every flag state is queryable alongside product events.

**Supporting features:**
- 1M events/month free, forever — no time limit
- No seat-based pricing
- Group analytics for B2B account-level insights
- Direct SQL access via HogQL and the data warehouse

## Battle cards

### vs Amplitude

**Their approach:** Deep analytics with advanced behavioral cohorts, data science integrations, and a mature product. Seat-based pricing. No native feature flags.

**Where PostHog wins:**
- Usage-based pricing — no seat charges as your team grows
- Native session replay, feature flags, and experiments included
- PostHog Code agent integration; Amplitude has no equivalent
- 1M events/month free tier is more generous than Amplitude's

### vs Mixpanel

**Their approach:** Clean, event-centric analytics with strong mobile support. No native feature flags. MTU-based pricing can surprise at scale.

**Where PostHog wins:**
- No MTU pricing — pay per event, not per user, with a huge free tier
- Experiments, feature flags, and more included
- Full SQL access without a separate data warehouse
- Also we have a data warehouse
- Mixpanel has no equivalent to PostHog Code

## Objections

### "Amplitude has better analytics features"

**Follow-up:** Which features specifically? Let's check what you actually use.

**Answer:** Some Amplitude-specific features are more mature — particularly advanced funnel modeling and data science integrations. But PostHog ships quickly and we can rapidly improve our open source product. We also offer a wide range of features beyond analytics, including replay, flags, error-tracking, and more - each of which can be queried with analytics. The total cost comparison almost always favors PostHog, and while Amplitude may have a handful of extra features it's unlikely they'll be ones you need. 

### "We need SQL access"

**Answer:** HogQL gives you full SQL on your event stream — joins, aggregations, window functions. Same interface, no separate warehouse needed. For more complex queries, PostHog's data warehouse unifies product events with Stripe, HubSpot, and other sources.

### "We're already on GA4"

**Answer:** GA4 is a marketing analytics tool and is limited and, frankly, unpopular. PostHog's web analytics tools offer approximate parity with GA4, but with a lot more flexibility.
 ### "Autocapture is going to explode our event volume and our bill"
**Answer:** Autocapture is configurable and you can use allow/ignore lists, URL filters, element exclusion via the `ph-no-capture` class, and `before_send` hooks to drop events before they're sent. Pricing is per-event with a 1M/month free floor and no per-seat or per-MTU charges, so you only pay for what you keep. We can model your expected volume before you commit.

### "Our data team lives in Snowflake/BigQuery and we don't want another silo"
**Answer:** PostHog isn't a silo in either direction. Batch exports send events to Snowflake, BigQuery, Databricks, Redshift, Postgres, S3, or Azure Blob. The data warehouse pulls in from Stripe, HubSpot, Postgres, Snowflake, BigQuery, and 20+ other sources so you can query product events alongside revenue and CRM data in the same HogQL query.


## Selling to enterprise

Enterprise analytics customers get volume discounts, ~20% annual prepay, group analytics, SSO, advanced access controls, EU data residency, SOC 2, and HIPAA BAA. Contracts follow [the four-lever framework](/handbook/growth/sales/contract-rules).

The enterprise pitch is consolidation: PostHog replaces analytics, session replay, feature flags, and experiments with one contract, one data model, and one platform that agents can query natively. That's four vendors consolidated, four renegotiations eliminated, and one platform that gets more capable as PostHog Code matures.
