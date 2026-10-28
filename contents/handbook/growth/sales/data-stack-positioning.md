---
title: Data stack positioning
sidebar: Handbook
showTitle: true
---

> Read the [full deck for sales training](https://docs.google.com/presentation/d/1gi2CBYtw-z8eYemp9ad5laMC33Ee84D63hUqrYDCOP8/edit?usp=sharing)

This page covers what to sell, to who, and when. If you're new to data tools, read about [data foundations](/handbook/growth/sales/data-foundations) first. It explains the modern data stack, how PostHog maps to it, and the two personas we sell to.

## How PostHog users use data, without a data stack

When most PostHog users sign up they don't have a lot of data, don't have the experience to build a data stack, and don't unify their data. Today, a typical user looks like this:

| Step | PostHog tools | What most users have today |
|------|-------------------|---------|
| 1. Sources | Your customer's own tools | Event data with some company data 
| 2. Ingestion | Data pipelines | Event pipeline via SDKs |
| 3. Storage | Warehouse | Shared cluster, with query limits set by us |
| 4. Modeling | Data modeling + SQL editor | Skipped |
| 5. Orchestration | Scheduled syncs and materialization | Skipped |
| 6. BI | Notebooks, insights, dashboards, BI | Insights on raw events |
| 7. Activation | Data pipelines | Limited data exports |

That's because our primary persona is a [product engineer](/handbook/growth/sales/data-foundations#primary-persona--today-product-engineers) at a Seed to Series B startup with no data hire yet. Offering them Fivetran, Snowflake, dbt, Airflow, Looker and Hightouch equivalents is overkill.

So we split the offering into two packages. Regular and Sexy.

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

### What's included:

| Product | What it does | How to say it |
|---------|--------------|---------------|
| Sources | Sync Stripe, HubSpot, Postgres and other tools into PostHog. Query it right next to event data. | "Your revenue and your product data, joined." |
| Semantic layer | Define tables, joins and metrics once. Every insight, query and AI answer uses the same definitions. | "Everyone, including your AI, gets the same answer." |
| PostHog AI + MCP | Ask in plain English in PostHog, or from Claude, Cursor and other MCP clients. It writes the SQL. | "No SQL required." |
| Views | Save a query as a reusable table. Materialize it on a schedule so heavy queries stay fast. | "Do the work once, reuse it everywhere." |
| Dashboards | Product and business metrics on one dashboard, shared with the whole team. | "One place to see how the company is doing." |

### The problems we're solving

| The problem | What we say |
|-------------|-------------|
| Product data is in PostHog, revenue is in Stripe, customers are in the CRM. Nobody can join them. | Sync it all into PostHog and answer cross-tool questions in one query. |
| Every dashboard counts "active users" or "revenue" a bit differently, so nobody trusts the numbers. | Define metrics once in the semantic layer. Every insight and AI answer uses the same definition. |
| There's no data person to ask, and writing SQL is a chore. | PostHog AI turns plain English into SQL, insights and dashboards. |

### Common use cases

Lead discussions with finding out what questions a user is asking their data, if these questions can't be answered without connecting an external data source to PostHog data, that's the opening to the rest of the data stack.

| Who | Question they're asking | Data it needs |
|-----|----------|---------------|
| Product engineer | Which features do our paying customers use most? | Stripe + events |
| Product engineer | Do support tickets predict churn? | Zendesk + Stripe + events |
| Founder | Are our biggest accounts actually using us? | HubSpot or Salesforce + events |
| Founder | What do customers do before they cancel? | Stripe + events |
| Growth | Which channels bring customers who stick around? | Google Ads, Meta Ads + Stripe |
| Growth | Which onboarding steps lead to payment? | Stripe + events |
| Sales & success | Which sign ups should we call first? | HubSpot + events |
| Sales & success | Who's outgrowing their plan? | Stripe + events |

Find tutorials on how to answer common questions, and skills that users can run, in [the data warehouse learning hub](/learn/warehouse).

### Tools to help

1. **[Sources setup wizard](/docs/data-pipelines/sources)**: Guided setup walks them through connecting a source and picking tables. The wizard scans their codebase for sources that can be connected.
2. **[Skills for basic modeling](/learn/warehouse)**: Agent skills set up the joins and models behind common questions, then save the result as a reusable insight to get users from zero to aha faster.
3. **PostHog AI**: As long as the data is there, users can ask questions in plain English. PostHog AI writes the SQL, runs it, and builds the insight or dashboard.

### Why semantic layer for data beginners?

Good data hygiene is cheapest on day one. Fixing data at 10k rows takes an afternoon. At 10M rows it's a project. The semantic layer is independent of the warehouse, so it can be set up on day one. With the Semantic layer, customers can:

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

### Additional setup support

**FDE support**: Forward deployed engineers can help customers with complex data needs set up sources, models and dashboards with the customer. Rough criteria for bringing in an FDE: 
* Struggles with trusting data
* Have tried other warehouses
* Are early in experimenting with other data stack tools

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
| Tests and Git workflow | Not yet - Git is on the roadmap |

**Speed to value:**
- **With dbt**: Set up a Git repo and project, configure the warehouse connection, wire up a scheduler, then write, test and deploy models.
- **With PostHog**: Write SQL in the browser, save it as a view, pick a refresh schedule.
