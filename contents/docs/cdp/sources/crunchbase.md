---
title: Linking Crunchbase as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Crunchbase
---

The Crunchbase connector syncs company, funding, and investment data from Crunchbase into PostHog, including organizations, people, funding rounds, acquisitions, investments, IPOs, and funds.

<CalloutBox icon="IconWarning" title="Crunchbase Enterprise or Applications license required" type="caution">

The Crunchbase Search API requires a **paid Enterprise or Applications license** from Crunchbase. A Basic-plan API key returns a 403 error and is rejected at connection time. Check the [Crunchbase pricing page](https://about.crunchbase.com/products/) for details on eligible plans.

</CalloutBox>

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. If you encounter issues, reach out to our support team.

</CalloutBox>

## Requirements

Before you begin, you need:

- A Crunchbase account with an **Enterprise** or **Applications** license
- A Crunchbase API user key (found in your [Crunchbase account integrations](https://www.crunchbase.com/account/integrations/crunchbase-api))

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the **Sources** tab in PostHog.
2. Click **+ New source** and select Crunchbase.
3. Enter your Crunchbase **User key**.
4. _Optional:_ Add a prefix to your table names.
5. Click **Next**.

The data warehouse then starts syncing your Crunchbase data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table            | Description                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `organizations`  | Company data including description, website, founding date, categories, location, total funding, employee count, and operating status |
| `people`         | Individual profiles with first and last names                                                                                         |
| `funding_rounds` | Funding round details including announcement date, investment type, money raised, funded organization, and investor count             |
| `acquisitions`   | Acquisition events with announcement date, acquirer, acquiree, and price                                                              |
| `investments`    | Individual investment records with announcement date, investor, funding round, and amount invested                                    |
| `ipos`           | IPO events including public date, stock symbol, money raised, and valuation                                                           |
| `funds`          | Investment fund details with announcement date, money raised, and fund name                                                           |

All tables use `uuid` as the primary key.

## Sync behavior

All Crunchbase tables support **incremental syncing** on the `updated_at` field. During incremental syncs, PostHog queries Crunchbase for records where `updated_at` is greater than or equal to the last synced value, so only new and modified records are fetched.

Data is partitioned by the `created_at` field using monthly partitions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### 403 Forbidden error at connection time

The Crunchbase Search API requires an Enterprise or Applications license. If you're using a Basic-plan API key, Crunchbase returns a 403 error and PostHog rejects the key at connection time. Upgrade your Crunchbase plan to a tier that includes Search API access.

### 401 Unauthorized error

Your API user key is invalid or has been revoked. Generate a new key from your [Crunchbase account integrations](https://www.crunchbase.com/account/integrations/crunchbase-api) and update the source configuration in PostHog.
