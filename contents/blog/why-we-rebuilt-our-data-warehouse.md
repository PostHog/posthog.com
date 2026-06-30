---
title: Why we rebuilt on data warehouse on DuckDB over ClickHouse
date: 2026-06-29
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - eric-duong
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/How_dirty_is_your_data_92fe322136.png
featuredImageType: full
category: General
tags:
    - Data warehouse
    - Infrastructure
    - PostHog news
seo:
    metaTitle: Why we rebuilt our data warehouse and how it unlocks self-driving products
    metaDescription: "PostHog rebuilt its data warehouse on DuckDB, moving away from ClickHouse to give data engineers the tools they actually want — and to power the next generation of AI-driven product development."
---

PostHog's original data warehouse had a single goal: delay the moment a company needs to hire their first data engineer.

It did that job for a 20-person company where the CEO is still running their own SQL queries. You could build dashboards, answer business questions, and skip the six-month data infrastructure project.

The problem was the next chapter for these companies. Here's the pattern we kept seeing:

- Company grows, product is going well, and PostHog is the primary tool for understanding how the business is doing.
- They hit 30-50 people and data questions get more complex, they hire a data engineer.
- Data engineer looks at what's available in PostHog, can't do everything they need, and starts exporting data to an external warehouse.
- PostHog becomes middleware. Events go in, data goes out. The center of gravity for understanding the business moves somewhere else.

So what was stopping data engineers from being happy on our platform?

### Challenge 1: Multi-tenancy

We've built PostHog as a multitenant system on a Clickhouse cluster that we host. This is great for most  analytical queries because we can expect them to:

1. Be done by a user in a browser
2. Return data relatively quickly (on the order of minutes). 

Data warehouses have entirely different expectations. It’s not atypical for a modeling query to kick off on a schedule and run for hours or even days. This is just not something we can do on our multi-tenant CH cluster as we restart nodes and nodes restart themselves. 

We optimize for querying relatively hot data. The prospect of an unbounded number of queries hitting our very not elastic CH cluster is basically untenable and would eventually cause problems across our entire application.

### Challenge 2: ClickHouse as a query engine

ClickHouse shines when used for fast, scalable analytics over large event datasets, with schemas and queries designed around its strengths. This is how we use it for all of our analytics data and that isn't changing.

But ClickHouse struggles as a general-purpose warehouse, where users need many connected sources, modeling flexibility, schema changes, and mutations. Here's why:

- **No cost-based query optimizer.** ClickHouse is unmatched when you hand-craft queries to match your schema. But data engineers expect to write declarative SQL and let the engine figure out the execution plan. 

- **S3/Deltalake/Iceberg support took a long time to mature.** We wanted to leverage Clickhouse's query engine to query data catalogs. Our success was limited; we mostly had to rely on raw Parquet without the benefits of catalogued data.

- **Query consistency across versions.** We've seen ClickHouse change query results between releases, or based on which settings were enabled. Our test suite catches this for our own queries, but we can't test every shape of customer data and query a warehouse needs to handle.

### Challenge 3: Data tooling

As companies mature, their data operations and use cases become more sophisticated. We experienced this first hand at PostHog while building out our revenue reporting. 

What started as a handful of queries and dashboards quickly became a maze of logic and context shared across multiple people. We wanted to reach for dbt to model our data and adhere to best practices in managing our queries, but we simply could not expose direct connections to the Clickhouse cluster without deepening the challenges of multitenancy. On top of that, our query language HogQL is not a language that's already widely supported. 

Despite being able to centralize our business data alongside PostHog event data, the lack of data tooling in our v1 of data warehousing left us and many more sophisticated data teams without long term confidence.

## We've rebuilt on top of DuckDB

We needed a query engine with none of these problems and found that (and more) in [DuckDB](/blog/duckdb-vs-clickhouse). The hard part was getting the architecture right. 

Here's what we built:

- **Fully single-tenant DuckDB instances:** Every organization gets their own. It's not shared with anyone else.
- **A lifecycle service:** Instances sleep when idle and wake up when a query arrives. 
- **A Postgres Wire protocol endpoint:** Most modern data stack tooling speaks Postgres, so does our warehouse. You connect with `psql`, point your BI tool at it, wire up PostHog Code or Claude via MCP, and it just works. We translate the Postgres catalog so your tools can introspect the schema, and queries run as DuckDB SQL.
- **DuckHog:** DuckHog is a DuckDB extension that lets you point local compute at your warehouse data. Pull a subset locally, work with it using DuckDB, pandas, polars, or whatever you prefer, then write results back. For agents iterating quickly on data, this is a better pattern than sending every query to the cluster. It's possible because of DuckDB's extension model; add capabilities without forking the codebase or painful UDF deployments. The SQLite of the OLAP world, it just works.
- **DuckLake as our catalog:** Underneath this is DuckLake, which separates storage from compute. Your data lives in S3 independent of whatever's querying it, so we're not locked into DuckDB forever.

## All your data, ready in PostHog

What makes this different from spinning up a standalone warehouse is that we're already mirroring all PostHog event data to S3, partitioned by organization. When you spin up your managed warehouse instance, your event data is there, no pipeline setup needed.

The same goes for data sources you want to connect – [Stripe](/docs/data-warehouse/sources/stripe), [Postgres](/docs/data-warehouse/sources/postgres), whatever external systems you're syncing – all of it lands in your warehouse, queryable through the same endpoint as your PostHog events.

We still support SQL for everything within PostHog. But you're free to connect any of your data tools to the warehouse as you'd expect with any other database.

## Good data = good context for agents

The data warehouse is the context layer for AI-driven product development.

Your failed queries, error patterns, conversion drops, and user behaviour as well as all your external data from places like Stripe, Postgres, and your CRM become [signals](/docs/self-driving/signals) and [context](/docs/self-driving/context) agents can act on. For agents to be effective, this data must be trustworthy, complete, and in one place. If your product data is in PostHog, your revenue data is in a warehouse, and your user data is somewhere else, any agent working with those signals is working with an incomplete picture or burning tokens to piece it together. 

A unified warehouse gives your agents access to your full business context to do things that weren't possible before. Not just "this funnel dropped", but "this funnel dropped, here's the revenue impact, here are the cohorts affected, here's what those users have in common, here's an action plan and a PR already open to fix the issue." That's the signal quality that makes agentic workflows useful.

Try it for yourself — [join the waitlist](https://posthog.com/data-stack/managed-warehouse) to get notified when we release the Managed Warehouse beta.

<DuckDBWaitlistSurvey />
