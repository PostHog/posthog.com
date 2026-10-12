---
title: Linking Criteo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Criteo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This connector is in alpha. The synced tables and behavior may change.

The Criteo connector syncs your advertising data – advertisers, campaigns, ad sets, ads, audiences, and campaign statistics – into PostHog, so you can analyze your advertising performance alongside your product data.

## Prerequisites

You need a Criteo account with a Marketing Solutions application that uses client credentials authentication. Create one in the [Criteo Partners Portal](https://partners.criteo.com/).

Your application needs the following permissions:

- **Campaign** – for campaigns, ad sets, and advertisers
- **Creative** – for ads
- **Audience** – for audience definitions
- **Analytics** – for campaign statistics

You also need to grant advertiser consent for each advertiser account you want to sync.

## Adding a data source

<SourceSetupIntro />

Enter your Criteo application credentials:

- **Client ID** – the client ID from your Marketing Solutions application.
- **Client secret** – the client secret from your application.
- **Report start date** – the earliest date to sync campaign statistics from, in `YYYY-MM-DD` format. Reports include up to two years of history. Daily syncs re-read the previous 30 days to capture attribution changes.
- **Report currency** – a supported [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (e.g., `USD`, `EUR`). All monetary values in reports use this currency.

## Sync modes

<SyncModes />

- **Advertisers, Campaigns, AdSets, Ads, and Audiences** use full refresh because the Criteo API doesn't support server-side timestamp filtering for these endpoints.
- **CampaignStats** uses incremental sync with a 30-day lookback window to capture attribution changes that Criteo may apply retroactively.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with a credentials error, your client ID or client secret is incorrect. Check the values in the [Criteo Partners Portal](https://partners.criteo.com/).
- If you receive an access denied error, your application may lack the required permissions or advertiser consent. Verify that Campaign, Creative, Audience, and Analytics permissions are granted.
- If campaign statistics are missing, check that the report start date is correct and within two years of today.
- If a daily report sync fails with a row limit error, the report for that day exceeded 100,000 rows. Contact [support](https://app.posthog.com/home#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue) for help importing this data.

<TroubleshootingLink />
