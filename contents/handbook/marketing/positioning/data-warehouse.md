---
title: Context warehouse
sidebar: Handbook
showTitle: true
---

> The context warehouse is the platform everything else in PostHog is built on, not a co-equal tool. It's the data warehouse plus the full context-ingestion pipeline — [data pipelines](/handbook/marketing/positioning/data-pipelines), modelling, and batch exports. Don't call this "the PostHog Data Stack" externally.

## Elevator pitch

The context warehouse brings your product events and business data — Stripe, HubSpot, Salesforce, Zendesk, and 40+ more — into one place, queryable together with SQL (and with PostHog AI to help you write it). Because it's part of PostHog, every piece of data is immediately available to your tools — analytics, experiments, feature flags — and to your agents.

Snowflake stores data. The context warehouse stores data *and* acts on it.

## The unique belief (in terms of the context warehouse)

PostHog is building the platform for self-driving product development, and the context warehouse is the layer everything else is built on. The [product autonomy loop](/blog/self-driving-product) — signals in, work out, evaluation, repeat — only closes when agents can see the full picture. That means product events *and* business context: revenue, plan tier, support history, CRM data.

**The context warehouse is where that picture lives.** Every event PostHog captures, every Stripe charge, every HubSpot deal, every Zendesk ticket — it all lands in one place, queryable together. That unified store is what makes PostHog Code meaningful. Agents running the autonomy loop need context, and the context warehouse is the context layer.

Snowflake, BigQuery, and Databricks are powerful. They're also expensive, complex to operate, and don't connect to your product tools without significant glue, which usually has to be owned by a dedicated data team. The context warehouse is different: it's integrated, not bolted on. Your data never needs to leave the platform that acts on it.

## Who this is for

- **Startups who haven't built a data stack yet.** PostHog gets them to a complete, queryable data foundation in minutes, not months — and our [startup program](/startups) offers up to $50k in credits.
- **Engineer-led teams tired of maintaining pipelines.** No ETL to babysit. Data flows in automatically from 40+ sources.
- **Teams already using PostHog for analytics.** Adding the warehouse unifies product and business data in the place they already work.
- **Compliance-sensitive orgs.** EU residency, SOC 2, HIPAA-ready — data stays in PostHog.

### Who this isn't for

- Teams that need petabyte-scale with hundreds of concurrent analysts — Snowflake is the right answer.
- Data orgs with mature dbt pipelines and advanced modeling needs — we're not there yet.
- Teams who only want a warehouse and nothing else — the integrated platform is the point.

## Messaging

### Message 1: The warehouse is the context layer for your agents

**Problem:** Agents can see product signals — errors, funnel drops, slow sessions. But without business context, they're guessing. An agent can't prioritize the right customers without seeing revenue and plan data.

**Solution:** PostHog's warehouse brings Stripe, HubSpot, Salesforce, and 40+ other sources alongside your product events. Every query, every insight, every agent prompt runs on the same unified dataset — no joins across systems, no pipelines to keep in sync.

**Supporting features:**
- 44+ sources including Stripe, HubSpot, Salesforce, Postgres, Snowflake, BigQuery, Databricks
- Unified SQL across product events and business data
- MCP exposes warehouse data to Claude Code, Cursor, and other agent runtimes
- PostHog AI generates queries and SQL from plain English

### Message 2: One platform replaces five

**Problem:** The typical data stack — Snowflake + Fivetran + dbt + Looker + product analytics — costs a lot. Six figures per year, easy.  More if it requires a dedicated data team to maintain.

**Solution:** PostHog collapses analytics, session replay, feature flags, experiments, CDP, and warehouse into one platform. Data flows automatically between tools. No pipelines. No hand-offs. Product teams self-serve.

**Supporting features:**
- Warehouse data available instantly in analytics, experiments, and feature flags
- 1M synced rows free per month, then $0.000015/row — no seat charges, tiered pricing as you grow
- SQL editor, notebooks, and dashboards built in
- PostHog AI for teams without a dedicated analyst

### Message 3: Modern data infrastructure for the AI era

**Problem:** Traditional data stacks were designed for batch processing and BI dashboards. AI-native product development needs something different — real-time signals, unified context, and data that agents can query directly.

**Solution:** PostHog's warehouse is the foundation for the [product autonomy loop](/blog/self-driving-product). Product signals and business data converge in one place, accessible to PostHog AI, MCP, and (soon) PostHog Code. That's infrastructure for how software gets built now — not a legacy stack with an AI label on it.

**Supporting features:**
- Warehouse-backed MCP for agent context
- PostHog AI to interrogate data in natural language
- Real-time event ingestion — no batch lag on the signals agents act on
- Open architecture — bring your own tools or use ours

## Battle cards

### vs Snowflake / BigQuery / Databricks

**Their approach:** Enterprise-grade cloud warehouses. Scalable to petabytes, rich ecosystems, strong governance. Expensive to operate, slow to set up, and often require separate analytics and product tools.

**Where PostHog wins:**
- No virtual warehouses, credits, or cluster management
- Analytics, experiments, and feature flags are built in — no integrations needed
- Hours to first insight, not weeks
- Published, usage-based pricing — no surprise bills or "contact sales" for a number

### vs Statsig / Amplitude / Mixpanel (warehouse-native)

**Their approach:** Connect to your existing Snowflake or BigQuery and run queries there. You keep the warehouse; they run product tooling on top of it.

**Where PostHog wins:**
- PostHog *is* the warehouse — no separate warehouse to buy or manage
- Session replay, feature flags, CDP, and agents are included — not add-ons
- If you already have Snowflake, sync what you need into PostHog instead of running another tool on top

## Objections

### "We already have Snowflake — why change?"

**Follow-up:** What do you use for product analytics, feature flags, and experiments today? How do you connect those to Snowflake?

**Answer:** You have two paths. Use PostHog as your integrated warehouse and eliminate the maintenance burden entirely. Or keep Snowflake as your source of truth and sync the tables you need into PostHog via Warehouse Sources — your Snowflake data then becomes available in PostHog analytics, experiments, and agents without custom pipelines. Many teams do both and eventually consolidate.

### "We need warehouse-native"

**Follow-up:** What's driving that requirement — performance, compliance, or avoiding data movement?

**Answer:** PostHog's warehouse is integrated into the platform, so data never needs to travel between tools. If you're already on Snowflake, sync what you need in via Warehouse Sources. If you're starting fresh, PostHog gives you the warehouse and every tool that runs on top of it. The outcome is the same: unified data, no data movement, integrated workflows — without paying for Snowflake on top.

### "We'll outgrow PostHog at scale"

**Follow-up:** What's your current data volume and query pattern?

**Answer:** PostHog handles the analytical workloads most product teams actually run. Where Snowflake genuinely wins — petabyte-scale governance, hundreds of concurrent analysts — we'll tell you directly. Most teams don't need that yet, and locking in that complexity early just adds cost and maintenance they don't need. When you get there, we'll help you make the right call.

## Selling to enterprise

Enterprise data conversations at PostHog follow the same rules as everything else: pricing is published, terms are clear, and we don't oversell.

Enterprise warehouse customers get volume discounts on synced rows, ~20% annual prepay discount, EU data residency, SOC 2 certification, HIPAA BAA, custom DPA, and dedicated support. Contracts follow [the four-lever framework](/handbook/growth/sales/contract-rules) — volume, commitment, payment timing, forecast certainty.

The honest enterprise pitch: PostHog is not Snowflake, and we don't pretend otherwise. We win with teams who are tired of running five tools, want modern infrastructure for AI-native development, and value a vendor who prices transparently and ships fast. If a prospect needs petabyte-scale governance, mature dbt tooling, or has Snowflake contracts they can't exit, say so early. The right deals close faster when the fit is honest from the start.
