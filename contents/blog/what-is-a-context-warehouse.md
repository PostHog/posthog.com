---
title: What is a context warehouse?
date: 2026-07-08
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - lizzie-epton
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/PLACEHOLDER_REPLACE_BEFORE_MERGE.png
featuredImageType: full
category: General
tags:
    - Data warehouse
    - Infrastructure
    - PostHog news
seo:
    metaTitle: What is a context warehouse?
    metaDescription: "A context warehouse is a data warehouse wired directly into the tools and agents that act on it, so no data has to move from one tool to another to be useful."
---

A context warehouse is a data warehouse wired directly into the tools and agents that act on it: analytics, experiments, feature flags, the SQL editor, and now AI agents; so no data has to move from one tool to another to be useful. Data warehouses store data, a context warehouse stores data, business context, and is natively integrated with everything else in your stack.

This blog is the technical case for why it's a different category, not a rebrand of "data warehouse."

## Why "data warehouse" stopped being the right word

A data warehouse's job is simple: store structured data, let you query it. In a data warehouse, your data doesn't need to know what a "customer" is, what a feature flag is, or what an experiment variant is. Making that data mean something to your product requires separate tools, and the pipelines to wire them all together.

That gap didn't matter much when a warehouse's main consumer was a data engineer whose job it is to connect and understand data. But it matters a lot now that the consumer is an agent trying to decide what to fix next. An agent working the [self-driving product](https://posthog.com/blog/self-driving-product) loop needs product signals (errors, funnel drops, slow sessions) and business context (revenue, plan tier, support history) in the same place it can query directly.

A warehouse that only holds half of that picture is a warehouse for BI. A context warehouse holds both your external data and the context of how users interact with your product, natively.

## Data warehouse vs. context warehouse

The difference isn't the storage engine, it's what's allowed to touch the data without a pipeline standing in between.

|  | Data Warehouse | Context Warehouse |
| :---- | :---- | :---- |
| **What data is included?** | Whatever you pipe in, on tables you define | Product events (already there) + data you pipe in |
| **What can query it without extra glue?** | Nothing, until you build a BI or reverse-ETL layer | Analytics, Experiments, Feature Flags, the SQL editor, PostHog AI, and MCP-connected agents |
| **Who owns it?** | A dedicated data team | Product engineers, with or without a data team |
| **It's for you if you need…** | Scale and governance for structured data | The full context layer your product and your agents run on |

## How it works

<!-- TODO: insert diagram image (source doc: "How it works" overview diagram) before merging -->

### Get all your data in

Your context warehouse starts with data that's already there. PostHog mirrors all your product event data to S3, partitioned by organization, as it's captured. Add to this: [Warehouse Sources](https://posthog.com/data-stack/sources). 200+ integrations that sync external systems including Stripe, HubSpot, Salesforce, Postgres, and more.

### Store your data

Under the hood, we store all your data in our [Managed Warehouse](https://posthog.com/data-stack/managed-warehouse). It's a single-tenant DuckDB instance per organization sitting on an S3 data lake that you have full access and ownership over your data through.

The main ingredients:

| Storage | S3, partitioned per organization. Product events land here automatically; Warehouse Sources syncs external systems into the same bucket. |
| :---- | :---- |
| Catalog | DuckLake, which separates storage from compute. Your data lives in S3 independent of whatever's querying it – today that's DuckDB, but the catalog doesn't lock the warehouse into any single engine staying right forever. |
| Compute | A fully single-tenant DuckDB instance per organization. Nobody's long-running query competes with anyone else's. |
| Isolation | Each DuckDB instance runs in its own Firecracker MicroVM, the same technology AWS uses for Lambda. Fast to boot, properly isolated, resource-contained. |
| Lifecycle | A lifecycle service sleeps instances when idle and wakes them when a query arrives, in under roughly 300ms. You're billed for use, not idle time. |
| Orchestration | A Kubernetes operator manages the CRDs defining each organization's warehouse, with a proxy and queue layer routing queries and handling the handshake with the lifecycle service. |
| Access | A Postgres wire protocol endpoint. Connect with psql, point a BI tool at it, or wire it into an agent over MCP – no proprietary connector to build against. |
| Local iteration | DuckHog, a DuckDB extension that lets local compute pull subsets of warehouse data into pandas, polars, or DuckDB itself, iterate quickly, and write results back. For an agent that wants fast local loops instead of round-tripping every query to the cluster, this is the better pattern. |

<!-- TODO: insert diagram image (source doc: DuckHog / local iteration diagram) before merging -->

### Agents read your data and drive development

None of this matters to an agent unless the agent can actually query it. PostHog exposes the context warehouse over [MCP](https://posthog.com/mcp), [PostHog Web](https://posthog.com/self-driving), [Slack](https://posthog.com/slack), or [PostHog Desktop](https://posthog.com/code). An agent working the [self-driving product](https://posthog.com/blog/self-driving-product) loop reads product events and business context through the identical interface a human would use in the SQL editor.

That's what makes this a context warehouse rather than a data warehouse with an AI feature bolted on: the context an agent needs to make a good decision is already there, and it can use it to drive development autonomously or answer your questions.

## Who this is for (and who it isn't, yet)

**It's a good fit if:**

* You haven't built a data stack yet and don't want to spend months doing it before you get a queryable answer.
* You're an engineer-led team tired of maintaining ETL pipelines that exist purely to keep two systems in sync.
* You're already using PostHog for analytics and want your business data sitting next to your product data instead of in a separate tool.

**It's not the right fit, yet, if:**

* You need petabyte-scale with hundreds of concurrent analysts. One day we will get there, but if you need it now you probably have a data team primed to build a traditional stack.
* You run a data org with mature dbt pipelines and advanced modeling needs we don't match yet.
* You want a warehouse and nothing else. The integrated platform is the point, if that's not what you're looking for, a standalone warehouse might be a better fit.

## What's in the pipeline

The context warehouse today is deliberately not a full data stack: land your events and your business data in one place, let the tools you already use in PostHog query it directly to make better decisions about the direction of your product. Here's what we're already building toward:

| Direction | What it means |
| :---- | :---- |
| Deeper Modeling | Closing the gap with dbt-style transformation maturity for teams with more advanced modeling needs. |
| More sources | Expanding Warehouse Sources coverage so fewer teams need a custom sync to get their systems in. |
| More of the loop exposed to agents | As the self-driving product loop matures, more of what an agent can see in the context warehouse becomes something it can act on directly, not just read. |

## Try it yourself

Join the waitlist for the managed warehouse beta, or just connect your first source and get a head start, no need to wait around for us. Once you're in, the warehouse lives at app.posthog.com, same as everything else: sync a source through Warehouse Sources, poke at it in the SQL editor, or hand an agent the keys and see what it does with it.

## FAQ

**Is a context warehouse the same as a data lakehouse?**

No. A lakehouse combines warehouse and data-lake storage patterns. A context warehouse adds the ability for your product tools and agents to query that storage natively, without a separate BI or reverse-ETL layer.

**Can I use a context warehouse if I already have a data warehouse?**

Yes. Sync your data into PostHog via Warehouse Sources, and that data becomes queryable alongside your product events in analytics, experiments, and agents. No migration required.

**Does a context warehouse replace Fivetran, dbt, and Looker?**

For most product teams, yes. Ingestion (Warehouse Sources), modeling, and querying are built in. Teams with advanced modeling needs may still want dedicated tooling for now.

**What's the difference between a context warehouse and a CDP?**

A CDP moves customer data between tools. The context warehouse is the storage and query layer those tools run on top of, which can include a CDP.

**Is my data still mine, can I export it?**

Yes. It's stored in S3 in your organization's partition, accessible over a standard Postgres wire protocol connection, not locked behind a proprietary format.
