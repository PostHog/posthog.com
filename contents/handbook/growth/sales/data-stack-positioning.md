---
title: Data stack positioning
sidebar: Handbook
showTitle: true
---

[Full deck for sales training](https://docs.google.com/presentation/d/1gi2CBYtw-z8eYemp9ad5laMC33Ee84D63hUqrYDCOP8/edit?usp=sharing)

This page covers what to sell, to who, and when. If you're new to data tools, read [data foundations](/handbook/growth/sales/data-foundations) first. It explains the modern data stack, how PostHog maps to it, and the two personas we sell to.

## PostHog covers steps 2 to 7

Sources are the other tools your customers already use, so there's nothing for us to replace there. We cover everything after that:

| Step | What it does | Traditional tools | PostHog |
|------|--------------|-------------------|---------|
| 1. Sources | Where data is born | Postgres, Stripe, HubSpot | Your customer's own tools |
| 2. Ingestion | Move it into the warehouse | Fivetran, Airbyte | Data pipelines |
| 3. Storage | Keep it in one place | Snowflake, BigQuery | Warehouse |
| 4. Modeling | Clean and shape it so it's accurate | dbt | Data modeling + SQL editor |
| 5. Orchestration | Keep it running | Airflow, Dagster | Scheduled syncs and materialization |
| 6. BI | Analyze it | Looker, Tableau | Notebooks, insights, dashboards, BI |
| 7. Activation | Push it back out | Hightouch, Census | Data pipelines |

Our messaging pillars: **PostHog collapses the stack.** Your events and your business data, together and queryable, under one roof.

- **One platform, one bill**: No vendor sprawl, no stitching contracts together.
- **Full context with no pipelines to maintain**: Product and business data side by side from day one.
- **Optimized for agents as the consumer**: Clean, defined data that PostHog AI and MCP clients can query.

## But the typical PostHog user isn't ready for a full stack

Most PostHog users don't have a lot of data, don't have the knowledge to build a data stack, and don't unify their data. Today, a typical user looks like this:

| Step | What most users have today |
|------|----------------------------|
| Sources | Event data with some company data |
| Ingestion | Event pipeline via SDKs |
| Storage | Shared cluster, with query limits set by us |
| Modeling | Skipped |
| Orchestration | Skipped |
| BI | Insights on raw events |
| Activation | Limited data exports |

That's because our primary persona is a [product engineer](/handbook/growth/sales/data-foundations#primary-persona--today-product-engineers) at a Seed to Series B startup with no data hire yet. Offering them Fivetran, Snowflake, dbt, Airflow, Looker and Hightouch equivalents is overkill.

So we split the offering into two packages.

## The two packages

| Regular | Sexy |
|---------|------|
| For product engineers at growing startups | For data leads |
| Sources | ELT |
| Semantic layer | Data warehouse |
| Queries using MCP or PostHog AI | Semantic layer |
| Views and materialized views | Modeling |
| Dashboards | Notebooks |
| | Dashboards / BI |

The goal is to land product engineers on the regular package, teach them to get more from their data, and graduate them to the sexy package as they grow.

## The regular package

**Why:** We need to teach product engineers to use data products and get more from their data. A warehouse (ours or anyone's) isn't the right product for them yet.

| Step | Regular package |
|------|-----------------|
| Sources | Product + external data |
| Ingestion | Events + sources |
| Storage | Semantic layer, with ClickHouse under the hood |
| Modeling | Views and materialized views |
| Orchestration | Not needed yet |
| BI | Ask PostHog AI for insights and dashboards |
| Activation | Not needed yet |

No new tools to buy. Orchestration, a warehouse, complex modeling and activation can wait.

### Signals they're ready to buy

- **3+ PostHog products**: They've moved beyond product analytics alone.
- **10k+ event rows**: Enough data through PostHog to show they have users and are starting to generate data at volume.
- **Exploring sources**: They're reading the data pipelines docs or landing pages, or asking if we support a particular source.

### What's included

It's five products that work together:

| Product | What it does | How to say it |
|---------|--------------|---------------|
| Sources | Sync Stripe, HubSpot, Postgres and other tools into PostHog. Query it right next to event data. | "Your revenue and your product data, joined." |
| Semantic layer | Define tables, joins and metrics once. Every insight, query and AI answer uses the same definitions. | "Everyone, including your AI, gets the same answer." |
| PostHog AI + MCP | Ask in plain English in PostHog, or from Claude, Cursor and other MCP clients. It writes the SQL. | "No SQL required." |
| Views | Save a query as a reusable table. Materialize it on a schedule so heavy queries stay fast. | "Do the work once, reuse it everywhere." |
| Dashboards | Product and business metrics on one dashboard, shared with the whole team. | "One place to see how the company is doing." |

### Don't sell a data stack, sell answers

| The problem | What we say |
|-------------|-------------|
| Product data is in PostHog, revenue is in Stripe, customers are in the CRM. Nobody can join them. | Sync it all into PostHog and answer cross-tool questions in one query. |
| Every dashboard counts "active users" or "revenue" a bit differently, so nobody trusts the numbers. | Define metrics once in the semantic layer. Every insight and AI answer uses the same definition. |
| There's no data person to ask, and writing SQL is a chore. | PostHog AI turns plain English into SQL, insights and dashboards. |

### Lead with a question

Pick a question where the answer adds value to the business:

| Who | Question | Data it needs |
|-----|----------|---------------|
| Product engineer | Which features do our paying customers use most? | Stripe + events |
| Product engineer | Do support tickets predict churn? | Zendesk + Stripe + events |
| Founder | Are our biggest accounts actually using us? | HubSpot or Salesforce + events |
| Founder | What do customers do before they cancel? | Stripe + events |
| Growth | Which channels bring customers who stick around? | Google Ads, Meta Ads + Stripe |
| Growth | Which onboarding steps lead to payment? | Stripe + events |
| Sales & success | Which sign ups should we call first? | HubSpot + events |
| Sales & success | Who's outgrowing their plan? | Stripe + events |

### How we make it easy

1. **Connect – sources setup wizard**: Guided setup walks them through connecting a source and picking tables. The wizard scans their codebase for sources that can be connected.
2. **Model – skills for basic modeling**: Agent skills set up the joins and models behind common questions, then save the result as a reusable insight to get users from zero to aha faster.
3. **Ask – PostHog AI**: As long as the data is there, users can ask questions in plain English. PostHog AI writes the SQL, runs it, and builds the insight or dashboard.

### Good data hygiene is cheapest on day one

Fixing data at 10k rows takes an afternoon. At 10M rows it's a project. The semantic layer is independent of the warehouse, so it can be set up on day one. Encourage customers to:

- Name events consistently
- Define metrics once
- Reuse saved queries instead of copying them
- Limit who can see sensitive data

## The sexy package

**Why:** Once a customer has more data, they need more sophisticated storage and modeling. We educate users so they can delay hiring a data lead. When that [data lead](/handbook/growth/sales/data-foundations#secondary-persona--next-data-lead) does join, their stack is already set up in PostHog, so they hit the ground running instead of migrating away.

### Signals they're ready to buy

- **Revenue generated**: A real business with real billing data to model.
- **Batch exports**: They're already trying to get data out to a warehouse, or have told you they're evaluating one.
- **Multiple sources**: More than one external data source connected.
- **Multiple insights**: Lots of insights created on their data, and some models created.

> **Strongest signal:** they've hired, or are hiring, their first data person.

### What's included

| Product | What it does |
|---------|--------------|
| Data pipelines | Managed ELT from databases and SaaS tools, including CDC for Postgres. Replaces Fivetran or Airbyte. Includes reverse ETL to move data back out. |
| Data warehouse | Stores all PostHog event data, external data imported from other tools, and derived data. |
| Data governance | Semantic layer and data quality. Shared definitions for tables, joins and metrics, so people, BI and agents all query the same truth. |
| Modeling | SQL models built on views and materialized views, scheduled so they stay fresh. |
| Notebooks | Mix SQL, insights and written analysis in one doc. Good for deep dives and sharing findings. |
| Business intelligence | From one dataset, drill down, pivot and chart, then save the worksheet and keep analyzing. |

### Key message: analyze, don't babysit pipelines

| Their frustration | What we say |
|-------------------|-------------|
| Babysitting pipelines | **We run the pipelines.** Managed syncs, so they spend their time on analysis, not broken connectors. |
| Context-switching across tools | **One place for all of it.** Ingestion, storage, modeling and BI sit next to the product data they already trust. |
| Inheriting a messy stack | **SQL all the way down.** No black boxes. They own and have full access to their data. Every view and model is plain SQL they can read, check and change. |

### We help them set it up, not just sign up

- **Source setup wizard**: Guided setup for every warehouse source. Pick the tables, set the sync, done.
- **Skills for modeling**: Agent skills handle the common joins and models, so the data lead starts from a working base. These go beyond what the regular package needs.
- **PostHog AI**: Plain-English queries for everyone else on the team, so the data lead isn't the bottleneck. Data leads can write SQL with AI and sense-check it after.
- **FDE support (advanced only)**: Forward deployed engineers help set up sources, models and dashboards with the customer.

## Competition at each layer of the stack

| Layer | Competitors | Our answer | How to position it |
|-------|-------------|------------|--------------------|
| Ingestion | Fivetran, Airbyte, Stitch | Sources (ELT) | Lands in the same place as their product data. No extra hop. |
| Storage | Snowflake, BigQuery, Databricks | Managed warehouse (beta) | Product data is already there. Nothing to move. |
| Modeling | dbt, SQLMesh | Views + materialized views | Plain SQL models without a separate project to host. |
| Orchestration | Airflow, Dagster, Prefect | Built-in scheduling | Syncs and materializations run on schedule. Nothing to deploy. |
| BI | Looker, Tableau, Metabase, Hex | Insights, dashboards, notebooks | BI that already understands their events and users. |
| Activation | Hightouch, Census | CDP + batch exports | Send modeled data back out from the same place. |

### Same concepts as dbt, faster speed to value

PostHog replaces dbt with SQL views you write in the browser and materialize on a schedule, refreshed in dependency order, with no project, repo or scheduler to set up.

| In dbt | In PostHog |
|--------|------------|
| Models (`.sql` files) | Views, saved from the SQL editor |
| Table materialization | Materialized views |
| Incremental models | Incremental materialization (beta) |
| Sources (`sources.yml`) | Warehouse sources, synced for you |
| `ref()` and the DAG | Dependency-ordered refresh + lineage |
| dbt Cloud jobs / Airflow | Built-in schedule, 15 minutes to monthly |
| Semantic layer (MetricFlow) | Semantic layer |
| Tests and Git workflow | Not yet – Git is on the roadmap |

**Speed to value:**

- **With dbt**: Set up a Git repo and project, configure the warehouse connection, wire up a scheduler, then write, test and deploy models.
- **With PostHog**: Write SQL in the browser, save it as a view, pick a refresh schedule.
