---
title: Linking Naver Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NaverAds
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Naver Ads connector syncs your [Naver Search Ads](https://searchad.naver.com) campaigns, ad groups, ads, keywords, and daily performance into the PostHog data warehouse. Use it to compare search ad spend and clicks with what those visitors do in your product.

## Prerequisites

You need access to a Naver Search Ads account in Search Ad Manager, and permission to create an API license for it.

## Adding a data source

<SourceSetupIntro />

When linking Naver Ads, you need:

- **API license** – the access license shown for your API license in API Manager
- **Secret key** – the secret key of your API license
- **Customer ID** – the numeric ID of the ad account

To get these:

1. Log in to [Search Ad Manager](https://manage.searchad.naver.com).
2. Go to **Tools** > **API Manager**.
3. Create an API license, or open an existing one.
4. Copy the API license, secret key, and customer ID into PostHog.

## Sync modes

<SyncModes />

`campaigns`, `adgroups`, `ads`, and `keywords` use full refresh. Each sync replaces the table.

`campaign_stats`, `adgroup_stats`, and `keyword_stats` hold one row per entity per day, in Korea Standard Time. They support incremental sync on `date`. Each incremental sync reads the last two days again, because Naver can update metrics for up to 48 hours.

The first sync of a stats table reads 365 days for campaign and ad group stats, and 90 days for keyword stats. Naver keeps stats for up to two years.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid credentials** – check that the API license, secret key, and customer ID all come from the same API license in **Tools** > **API Manager**, then reconnect the source.
- **Slow keyword stats syncs** – keyword stats need one request per 100 keywords per day. Accounts with many keywords take longer to sync this table.

<TroubleshootingLink />
