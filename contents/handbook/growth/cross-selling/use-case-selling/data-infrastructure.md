---
title: 'Data Infrastructure'
showTitle: true
hideAnchor: false
---

> **Status:** Draft in progress

## What is the job to be done?

"Help me unify product data with business data and get it where it needs to go."

- Combine PostHog event data with revenue data, CRM data, or other business data
- Export PostHog data to existing warehouses (Snowflake, BigQuery, Redshift)
- Bring external data into PostHog for unified analysis
- Eliminate custom ETL pipelines between analytics and business tools

## What PostHog products are relevant?

- **[Data Warehouse](/docs/data-warehouse) (core)** — Bring external data in, query alongside product data
- **[Data Pipelines / Batch Exports](/docs/cdp) (core)** — Send data out to warehouses, ad platforms, CRMs
- **[Product Analytics](/docs/product-analytics)** — Query engine for unified data

## Adoption path and expansion path

*To be completed*

**Entry point:** Usually Data Warehouse or Batch Exports.

**Primary expansion path:** Batch Exports → + Data Warehouse (bring external data IN) → + Product Analytics (query unified data)

## Business impact of solving the problem

*To be completed*

## Personas to target

*To be completed*

## Signals in Vitally & PostHog

*To be completed*

## Command of the Message

*To be completed*

## Competitive positioning

**Our positioning:** Partial replacement for Fivetran (inbound syncs), Census/Hightouch (reverse ETL). Not trying to replace Snowflake, but to be the operational analytics layer on top. This is the "stickiness" use case: once PostHog is part of a company's data infrastructure, it becomes very hard to rip out.

*Full competitor reference to be completed*

## Pain points & known limitations

*To be completed*

## Getting a customer started

*To be completed*

## Objection handling

*To be completed*

## Cross-sell pathways from this use case

*To be completed*

## Internal resources

- **Data Warehouse docs:** [Data Warehouse](/docs/data-warehouse)
- **Data Pipelines docs:** [CDP overview](/docs/cdp) · [Batch exports](/docs/cdp/batch-exports) · [Destinations](/docs/cdp/destinations)

## Appendix: Company archetype considerations

*To be completed*
