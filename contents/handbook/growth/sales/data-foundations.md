---
title: Data foundations
sidebar: Handbook
showTitle: true
---

[Full deck for sales training](https://docs.google.com/presentation/d/1CnXlVhrxDJ146p6PzNNt94RmYjR1Jr7V6Vsg1g-aIMk/edit?usp=sharing)
[Recorded sales training session]

## Why do companies need data tools?

Every single SaaS platform or tool you use generates data. Payments in Stripe, customers in the CRM, and app data in a production database. That data could be used to ask questions that will help you improve your product, learn more about customers.

Some questions customers might have:

| Question | Data it needs |
|----------|---------------|
| Which features drive revenue? | PostHog Events + Stripe |
| Which accounts are ready to upsell? | PostHog Usage + Stripe plans |
| What do customers do right before they cancel? | PostHog Events + Stripe/Chargebee |
| Do support tickets predict churn? | PostHog Usage + Zendesk/Intercom |
| Which leads deserve the sales team's time? | PostHog Usage + Hubspot/Salesforce |
| Which channels bring customers that stick? | PostHog Events + Stripe + Meta Ads |

## The modern data stack, at a glance

So many tools to ask a simple question:

1. **Sources** – where data is born
2. **Ingestion** – move it in to
3. **Storage** – the warehouse
4. **Modeling** – clean & shape it so it's accurate
5. **Orchestration** – keep it running
6. **BI** – analyze it
7. **Activation** – push it back out

## So what's wrong with normal?

A traditional stack is six or more separate tools, each with its own bill, login, and pipelines between them all to maintain.

Product data usually lives in a completely separate world from business data.

- **Fragmented**: Multiple vendors to buy, learn and connect.
- **Expensive**: Per-tool pricing stacks up quickly.
- **Maintenance**: Pipelines need to be maintained between everything

## Traditionally, a different vendor for every step

| Step | Traditional tool |
|------|------------------|
| 1. Sources | Sources are your own, no one to replace. |
| 2. Ingestion | Fivetran, Airbyte, Portable |
| 3. Storage | Snowflake, Redshift, BigQuery, Databricks |
| 4. Modeling | dbt, sqlmesh |
| 5. Orchestration | Airflow, Dagster |
| 6. BI | Looker, Hex, Tableau, Metabase |
| 7. Activation | Hightouch Segment, RudderStack|

> Product analytics is usually your biggest data source so most of your data is already in PostHog, if customers use our full stack you don't have to export that data anywhere.

## PostHog collapses the stack

Instead of assembling multiple tools, PostHog brings the layers into one platform.

The context warehouse = your events and your business data, together and queryable under one roof.

- One platform, one bill
- Full context with no pipelines to maintain
- Optimized for agents as the consumer

### How PostHog maps to the stack

| Step | PostHog |
|------|---------|
| Sources | Autocapture + SDKs |
| Ingestion | Warehouse Sources |
| Storage | Managed Warehouse |
| Modeling | Data modeling + SQL editor |
| Orchestration | Scheduled syncs & materialization |
| Analysis & BI | Notebooks, Insights & dashboards |
| Activation | CDP, batch exports & reverse ETL |

## How users grow into the data stack

Users only need data products once they start generating a reasonable volume of data. They will adopt PostHog's other products first.

1. **Start · pre-data – PostHog core products**: Analytics, session replay, feature flags, experiments
2. **First data tool – Connect Stripe**: Revenue data, joined to product events. Having Stripe synced signals that a user has customers!
3. **Step 2 – Ask PostHog AI**: Questions about their data, joining together PostHog events and external data
4. **Step 3 – Build a dashboard**: Revenue + product in one saved view
5. **Step 4 – Provision a warehouse**: A user reaches a volume of warehouse to need a dedicated warehouse (10k+ Event rows)
6. **Long term – Model & scale**: Once you have a warehouse, it needs modeling to keep the data usable and build better dashboard

> This runs from an early-stage start-up through to a more mature company with a first data hire.

## What's special about a context warehouse?

> **Definition**: A context warehouse is data storage and tooling, optimized for agents as the consumer.

- **What we mean by "context"**: We give agents the context to understand things like customers or feature flags, so they can interpret data correctly.
- **What we mean by "data storage and tools"**: Ingestion, modeling, endpoints, and the rest of the data stack are all part of your context warehouse. No data pipelines to build and maintain.
- **What we mean by "optimized for agents"**: Context warehouses feed the self-driving loop: agents interpret and act on the data.

What a context warehouse is not:

- Just business and product data combined. You can already do this with any warehouse by setting up batch exports to pull your product data out of PostHog.
- Just an AI tool bolted onto a warehouse for querying your data, most warehouses already have those.

## How to talk about context warehouse vs data stack

Companies talk about a "data stack" like a "tech stack." We sell the whole stack, all-in-one but you can bring your own tools if you like, and we're optimized for agents.

| The traditional data stack – humans interpret & act | The context warehouse – agents interpret & act |
|-----------------------------------------------------|------------------------------------------------|
| Assembled from many separate tools | One all-in-one stack, bring your own tools if you want |
| You build and maintain the pipelines between them | Ingestion, storage, modeling, and intelligence |
| Built for humans to query, dashboard by dashboard | Agents get the context to know what a customer or feature flag is |
| People read the data, then decide what to do | Query in natural language or using SQL |
| Optimized for analysts | Optimized for agents as the consumer |

## Who the context warehouse is for

It's our ICP, but more data focused.

### Primary persona · today: Product engineers

Engineering-led startups that want to run their own data before they hire a data team.

Seed–Series B · 15–500 people · no data hire yet

**Cares about**

- Open source, data ownership, transparency
- Developer-first tools, speed to value
- Self-serve over sales calls

**Frustrated by**

- Enterprise analytics tools too expensive
- Five disconnected tools and data silos
- Hidden pricing and sales friction

### Secondary persona · next: Data Lead

The first data hire at a growing PostHog customer will usually be a generalist who can build infrastructure and query it.

Series A–C · solo data team · already on PostHog

**Cares about**

- SQL-first tools, no black boxes
- Clean models, reproducibility, good docs
- Peer validation over marketing claims

**Frustrated by**

- Babysitting pipelines instead of analyzing
- Context-switching across siloed tools
- Inheriting a messy, undocumented stack

> **Not yet: data scientists.** They're a company's second data hire. Most of our customers don't have data scientists, and our modeling tools aren't mature yet. Once we have a product that can compete with dbt, we can start targeting data scientists.

## Why are we targeting these groups

**Product engineers**: We want to educate this user so that they adopt our products and build data foundations, including setting up warehouse sources, before hiring a dedicated data person…

**Data leads**: …so that when this person gets hired, the stack that already exists is PostHog, and they will give us a shot instead of churning to tools that are more established

## How to talk to them

Start with treating them like a human being.

### Product engineers

**Primary message**

> "Ship features faster and understand users deeply without needing to hire a data person straight away"

**Why they'll care**

- They can do complex data analysis that would traditionally require a data team
- "It just works" - it's already there in PostHog, no additional tools, cost or setup

**Lead with**

- Are there deeper analytics problems you would solve if you had a data team?
- Would having access to additional data (ie payment data) change the way you measure product decisions?

### Data leads

**Primary message**

> "Stop maintaining the stack. Start doing the work."

**Why they'll care**

- They can focus on providing trusted semantic layer instead of maintaining the data movement
- All internal teams can report on the same data

**Lead with**

- Do most of your data consumers know exactly what data they need to be building on - what is an order? How do we calculate revenue?
- Do you have a problem with internal teams reporting similar metrics out of multiple tools? With varying values?

## Acronyms, decoded

An appendix of sorts.

| Acronym | Meaning | What it is |
|---------|---------|------------|
| ETL | Extract, Transform, Load | Pull data out from the source, clean it, then load it into your warehouse. |
| ELT | Extract, Load, Transform | Load raw to the warehouse first, clean it once it's there. The modern default. |
| CDC | Change Data Capture | Live updates only the data that is new or changed to your warehouse |
| OLTP | Online Transaction Processing | The database that runs your app. Fast, one row at a time. |
| OLAP | Online Analytical Processing | The database built for analytics. Slower, millions of rows at once. |
| SQL | Structured Query Language | The coding language you use to ask a database questions. |
| BI | Business Intelligence | Dashboards and reports built on top of your data. |
| CDP | Customer Data Platform | Unifies customer data and pushes it to your other tools. |
| Reverse ETL | – | Send modeled warehouse data back out into apps so it's up to date and enriched in tools like Salesforce. |
| DAG | Directed Acyclic Graph | A map of the order modeling tasks need to run in |
