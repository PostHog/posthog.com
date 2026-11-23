---
title: Linking TrustRadius as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Trustradius
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx";
import SyncModes from "../_snippets/sync-modes.mdx";
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx";

The TrustRadius connector syncs product scores, review quotes, traffic reports, visitor insights, and intent data into the PostHog Data Warehouse.

## Prerequisites

Get an API key from your TrustRadius Client Success Manager. Your API license must include access to the tables you select. The visitor insights reports require the matching license for TrustRadius's legacy visitor insights API.

## Adding a data source

<SourceSetupIntro />

Select **TrustRadius** and enter your **API key**. No product IDs are required: the connector discovers them from your vendor profile for traffic reports.

## Sync modes

<SyncModes />

The `products`, `product_scores`, `trustquotes`, and `tags` tables support full refresh only.

The `traffic_products`, `visitor_insights_companies`, `visitor_insights_pages`, and `intent` tables support full refresh or incremental sync on `date`. They do not support append-only sync. Incremental runs read recent dates again, with a default two-day overlap, to merge changes to existing daily rows.

For the three report tables, a full refresh or first incremental sync reads the last 365 days. Intent has a shorter window: the API serves at most 45 days, and the connector reads completed days starting 44 days ago. Use incremental sync to retain imported intent history; a full refresh only includes the available window.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `products` table lists published products under your vendor profile. `product_scores` contains scores and review counts for licensed products. `trustquotes` contains review quotes, including anonymous quotes, and `tags` contains their tags and tag groups.

The `traffic_products` table contains daily product-page traffic. The visitor insights tables contain daily company-level visits (`visitor_insights_companies`) and visits per page (`visitor_insights_pages`). Each `intent` row represents an account on a day, with its research activities.

## Troubleshooting

- If TrustRadius rejects the API key, check it with your Client Success Manager.
- If a table returns a permissions error, ask your Client Success Manager to verify your API license and access to that dataset.
- If an intent sync reports that a day's data is incomplete, the API returned its `more` flag. The connector already requests one day at a time, and the API provides no continuation request for the remaining rows.

<TroubleshootingLink />
