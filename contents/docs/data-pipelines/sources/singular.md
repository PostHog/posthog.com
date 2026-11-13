---
title: Linking Singular as a source
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
sourceId: Singular
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Singular connector syncs campaign, SKAdNetwork, and ad monetization reports into the [PostHog Data Warehouse](/docs/data-warehouse). Use this data to analyze marketing spend and revenue alongside your product data.

## Prerequisites

You need a Singular account and a Reporting API key with access to the dimensions and metrics you want to sync. In Singular, go to **Developer Tools > API Keys** to find your key. See Singular's [Reporting API reference](https://support.singular.net/hc/en-us/articles/360045245692-Reporting-API-Reference) for details.

The SKAdNetwork reports require [Singular's attribution tracker](https://support.singular.net/hc/en-us/articles/360056377792). The ad monetization report requires [ad monetization reporting](https://support.singular.net/hc/en-us/articles/360045674511) configured in Singular. It reads data from monetization networks, rather than ad revenue collected through Singular's SDK.

## Adding a data source

<SourceSetupIntro />

Select **Singular** and enter your Singular Reporting API key. Leave the optional report fields empty to sync the default network campaign data: cost, impressions, clicks, and installs by app, source, operating system, country, and campaign.

## Sync modes

Report tables support **Incremental** syncs on the `date` field and **Full refresh**. Incremental syncs merge rows by date and report dimensions. By default, they reread the previous seven days to capture changes to recent reports. The default initial history is 30 days. PostHog requests each day's report separately.

The SKAdNetwork reports use the postback date, rather than the estimated install date. Keep this in mind when comparing them with other reports in Singular.

Lookup tables support **Full refresh** only. They reload the available dimension values and metric definitions on each sync. Singular doesn't support append-only or webhook syncs in PostHog.

See [sync methods](/docs/data-pipelines/sources#sync-methods) for more information.

## Configuration

<SourceParameters />

The optional fields configure `daily_report`. The other reports use fixed dimensions and metrics.

-   **Dimensions**: Enter comma-separated dimension names from the Reporting API. For a custom dimension, use its `id` from `custom_dimensions`. If you change dimensions after syncing, run a full resync of `daily_report` because dimensions determine how rows match.
-   **Metrics**: Enter comma-separated metric names. For conversion events, use the `name` from `conversion_metrics`, rather than the display name.
-   **Cohort metrics and cohort periods**: Fill in both fields or leave both empty. Use comma-separated metric names from `cohort_metrics` and periods such as `7d,30d`.

Each combination of dimensions produces a separate row for each day. More dimensions use more of your Singular daily row quota. The default quota is 3 million rows per day, including rows you fetch again on later syncs.

## Supported tables

<SourceTables />

## Troubleshooting

-   **Singular rejected the API key**: Copy the current key from **Developer Tools > API Keys** in Singular and update the source. A PostHog API key doesn't work here.
-   **Singular denied access**: Ask your Singular admin to grant the API key access to the requested dimensions and metrics, or remove the fields the key can't access.
-   **Cohort metrics and cohort periods go together**: Fill in both fields or clear both, then try again.
-   **Singular rejected the request**: Check the dimensions, metrics, and cohort settings against the Reporting API reference. The error includes Singular's response. If it says no SKAdNetwork data is configured, check the attribution tracker setup before syncing those reports.
-   **Singular is still rate limiting this API key**: The request remained rate limited after retries. If you've used the daily row quota, sync again tomorrow. Remove dimensions or sync less often to reduce row usage.
-   **Singular could not generate the report**: Check Singular's response in the error and include the report ID when contacting Singular support.
-   **Could not reach Singular to check the API key**: Try again in a few minutes.

<TroubleshootingLink />
