---
title: PostHog Sources datasheet
sidebar: Handbook
showTitle: true
---

## What is PostHog Sources?

PostHog Sources is a fully managed tool that extracts data from your apps and databases and loads it into a warehouse. It started life moving data into PostHog so that you can query business and product data in one place, and now works standalone: your data can go from Postgres to Snowflake, or Stripe to BigQuery, without ever touching PostHog. We handle pipeline maintenance like schema changes, incremental syncs, retries and rate limits.

## Key messages

- **Move data anywhere.** PostHog Sources syncs Stripe, Postgres, HubSpot, Salesforce and the rest of your stack into PostHog or any other warehouse.
- **Stop maintaining pipelines.** Pipeline maintenance is 70% of a data engineer's job. We handle schema changes, incremental syncs, retries and rate limits. No more being on-call for a broken connector or wondering if your data is accurate and up to date.
- **Predictable pricing.** Per-row pricing is published on our pricing page; it gets cheaper as you grow and has no per-seat charges. No surprise invoices, and a fraction of the cost of competitors.

## Key features

Move data in minutes, set and forget.

- **700+ sources:** Stripe, HubSpot, Salesforce, Zendesk, Postgres and more, with new connectors shipping regularly.
- **AI-assisted setup:** Paste in a read-only key and pick your tables, or run `npx @posthog/wizard warehouse` and the wizard finds your databases and APIs for you.
- **Free historical syncs:** Every row synced in a new source's first 7 days is free, so backfills don't land on the bill.
- **A reliable sync engine:** Every incremental sync runs on deltalite, our own upsert engine. Memory scales with the batch, not the table, so big tables sync reliably.
- **Secure by default:** Credentials are encrypted at rest, you can connect with a read-only user, and PostHog is SOC 2 certified with EU data residency and a HIPAA BAA available.

## Sources, or ELT?

Sources is our name for it. The rest of the industry calls this kind of tool ELT (or ETL). Data people search for, compare and budget for "ELT tools".

ELT stands for Extract, Load, Transform:

1. **Extract:** Pull data out of where it lives, like Stripe, Postgres or HubSpot.
2. **Load:** Copy it, as it is, into a warehouse.
3. **Transform:** Clean, join and model it inside the warehouse with SQL, once it's there. This is not technically covered by our tool but by whatever warehouse the user loads their data into.

Older ETL tools transformed data before loading it. ELT loads the raw data first and transforms it later, so you keep everything and can change your mind.

## How does it work?

Connect a source with a read-only key, pick the tables you want and the destination you want to send it to, and the first sync starts straight away. After that, PostHog keeps the copy up to date on a schedule that you set and fixes things when an API changes or has a bad day.

## Common use cases

### Apps to warehouse

| Use case | Who it's for | What changes |
|----------|--------------|--------------|
| Replace an expensive Fivetran or Airbyte bill | Data leads paying Fivetran or running Airbyte | Very similar usage experience. At 100M rows a month the saving is roughly $1,500 to $2,150. |
| Get data into a warehouse to model and query | Data teams pulling apps and databases into one place | Every source lands in one warehouse as raw tables, ready to model with SQL views and query together, with no pipelines to build or maintain. |

### Data to PostHog

| Use case | Who it's for | What changes |
|----------|--------------|--------------|
| Revenue and churn analysis | Teams with Stripe or billing data | Stripe syncs next to product events, so you can see how usage turns into revenue. |
| Sales and CRM reporting | Teams on HubSpot or Salesforce | Track the sales funnel with SQL alongside product usage, with no export scripts to maintain. |
| Marketing analytics | Marketing teams running paid ads | Ad spend and campaign data sync into PostHog next to product events for marketing analytics. |

## Buying signals

### Established data stack: ready to replace Fivetran or Airbyte

They already have an external warehouse and the tools around it. Pitch Sources as a cheaper, fully managed alternative to the ELT tool they use today.

- **They already use batch exports:** They send PostHog data out to their own warehouse.

### Early days: ready to connect their first source

They use PostHog but have no warehouse or other data tools yet. Pitch Sources as the quickest way to get business data next to their product data.

- **They use PostHog but have no sources connected:** Everything they analyze today comes from events alone.
- **They ask questions events can't answer:** Revenue, churn, plan tier or which ad campaigns bring in good users.
- **Their event volume is growing:** This indicates their business has customers, which equals revenue. Time to connect Stripe to PostHog!
- **They join data by hand:** They repeatedly export CSVs from PostHog.

## PostHog vs Fivetran vs Airbyte

### Where they're stronger

- Both have a longer connector list. Ask which sources the prospect uses; most teams need a handful, and Stripe, HubSpot, Salesforce and Postgres are all covered. We also take requests and have a fast turnaround time for creating new connections.
- Airbyte's open-source version is free if you host it, but someone has to run and fix it.

### Comparison

|  | PostHog Sources | Fivetran | Airbyte Cloud |
|--|-----------------|----------|---------------|
| 100M rows/month (list) | $735 | $2,894 (Standard, one Postgres connection) | $2,226 (Plus, 603 credits); $3,010 on Standard |
| Free tier | 1M rows/month, every month | 500,000 MAR | None; 30-day trial with 400 credits |
| Pricing unit | Rows synced | Monthly active rows, per connection | Credits (rows for APIs, GB for databases and files) |
| Minimum spend | None | $5/month per connection | $20/month on Standard |
| Historical backfills | Free for each new source's first 7 days | Count towards usage | Count towards credits |
| Managed schema changes, retries, rate limits | Yes | Yes | Yes |
| Data usable in analytics, experiments and agents | Yes, out of the box | No, needs a separate BI and product stack | No, needs a separate BI and product stack |

## Pricing framework

- The first 1 million rows synced every month are free.
- Historical syncs are free: every row synced in a new source's first 7 days costs nothing.

| Monthly rows synced | Price per row | Monthly cost at the top of the tier (list) |
|---------------------|---------------|--------------------------------------------|
| First 1M | Free | $0 at 1M |
| 1M–10M | $0.000015 | $135 at 10M |
| 10M–25M | $0.00001 | $285 at 25M |
| 25M–50M | $0.000008 | $485 at 50M |
| 50M–100M | $0.000005 | $735 at 100M |
| 100M–1B | $0.000002 | $1,535 at 500M; $2,535 at 1B |
| Above 1B | $0.000001 | $2,535 + $1 per extra 1M rows |

See the [pricing calculator](/pricing).

### Competitor pricing

- **Fivetran** bills monthly active rows (MAR): distinct rows inserted, updated or deleted, counted per connection. Since January 2026, deletes count towards MAR and every connection carries a $5 monthly minimum, which raised many customers' bills. Each source costs a different amount per MAR.
- **Airbyte** bills credits, not rows. A credit buys a different amount of work depending on the source (rows for APIs, GB for databases and files). Standard is $20 a month plus $5 per extra credit; Plus is sold in credit packages.

## Quick links and who to ask

- `#team-warehouse-pipelines` for questions and support
- `@lizzieepton` for marketing and sales resource requests
- [Sources docs](/docs/data-pipelines/sources)
- Migration guide:
- Wizard setup command: `npx @posthog/wizard warehouse`
- [Connect your first source in app](https://app.posthog.com/data-warehouse/new-source)
