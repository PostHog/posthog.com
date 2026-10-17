---
title: Linking Google Analytics as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleAnalytics
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Google Analytics connector syncs daily report data from a Google Analytics 4 property – users, sessions, page views, devices, locations, traffic sources, and events – into PostHog.

## Prerequisites

You need a Google account with read access to the GA4 property you want to sync, and the numeric property ID for that property.

## Adding a data source

<SourceSetupIntro />

When linking Google Analytics, you'll need:

- **Google Analytics account** – connect a Google account that has read access to the property. PostHog requests the `analytics.readonly` scope when you authorize.
- **Property ID** – the numeric GA4 property ID, found in Google Analytics under **Admin → Property settings → Property details** (for example, `123456789`).

<CalloutBox icon="IconInfo" title="Finding your Property ID" type="fyi">

The Property ID is a numeric value like `123456789`. Don't confuse it with:

- **Measurement ID** (`G-XXXXXXX`) – this is from your GA4 data stream or website tag and won't work here
- **Universal Analytics ID** (`UA-XXXXXXX`) – this is from legacy Google Analytics (not GA4) and isn't supported

Find the correct Property ID in Google Analytics under **Admin** > **Property settings** > **Property details**.

</CalloutBox>

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Large properties and API quota

The first sync of each report reads 730 days (2 years) of historical data by default. On large GA4 properties – especially with custom reports that include high-cardinality dimensions – this backfill can exhaust the property's [Data API token quota](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas) before it finishes.

To work around this, set **Days of history to sync initially** to a lower value like `90` or `365` in your source configuration. This reduces how far back the first sync goes.

A few things to note:

- Blank or zero values keep the 730-day default, so existing sources aren't affected.
- This setting applies to the whole source, not to individual reports.
- If a sync is already running, changing this value moves the resume point forward to the new window start.
- After the initial sync completes, incremental syncs fetch only recent data regardless of this setting.

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
