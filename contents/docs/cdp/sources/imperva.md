---
title: Linking Imperva (Thales) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Imperva
---

import AlphaRelease from "../\_snippets/alpha-release.mdx"
import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Imperva (Thales) Cloud Application Security connector syncs your web application security data into the PostHog Data warehouse, including site inventory, visitor traffic, hit statistics, and bandwidth metrics – so you can analyze security traffic patterns alongside your product data.

[Imperva Cloud Application Security](https://www.imperva.com/products/cloud-application-security/) (now part of Thales) provides web application security services including DDoS protection, WAF, CDN, and bot management.

## Prerequisites

You need an Imperva Cloud Application Security account with API access. In the Imperva Cloud Security Console, go to **Account** > **My Profile** > **API keys** to generate credentials. You'll need:

- **API ID** – the identifier for your API key
- **API key** – the secret key value
- **Account ID** – your numeric account identifier (found in account settings)

Your credentials need read access to both sites and statistics.

## Adding a data source

<SourceSetupIntro />

When linking Imperva, you'll need:

- **API ID** – your Imperva API ID from the management console
- **API key** – your Imperva API key from the management console
- **Account ID** – your numeric Imperva account ID (digits only)

## Sync modes

<SyncModes />

The `sites` table syncs as full refresh only. Timeseries tables (`visits_timeseries`, `hits_timeseries`, `bandwidth_timeseries`) support both incremental and full refresh syncs using the `timestamp` field.

Statistics tables contain daily aggregates covering up to the last 90 days, subject to your Imperva subscription plan. Older data outside this window is not available from the API. Incremental syncs re-read the previous day to capture updates to recent buckets.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authentication error, check that your API ID and API key are correct and haven't expired. Regenerate them in the Imperva console under **Account** > **My Profile** > **API keys**.
- If you get a permission error, verify your account ID is correct and your API credentials have access to both the sites and statistics APIs.
- If you see a plan-related error, the statistics you're trying to sync may require a higher Imperva subscription tier. Contact Imperva support to verify your plan includes API access to the requested data.

<TroubleshootingLink />
