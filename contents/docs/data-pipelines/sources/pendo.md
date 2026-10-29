---
title: Linking Pendo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pendo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Pendo connector syncs your Pendo product data into PostHog – including metadata (features, pages, guides, visitors, accounts, track types, product areas, reports) and usage data (events, page events, feature events, track events, survey responses) – so you can analyze product engagement alongside your other data.

## Prerequisites

You need a Pendo integration key, which only Pendo admins can create and view. You'll also need to know which data region your subscription uses (US, US1, EU, Japan, or Australia), since the key is specific to that region.

## Adding a data source

<SourceSetupIntro />

When linking Pendo, you'll need:

- **Integration key** – create one in Pendo under **Settings > Integrations > Integration Keys**. Only Pendo admins can view these.
- **Data region** – select the region that matches the domain you log in with (US, US1, EU, Japan, or Australia). The integration key is scoped to a single region.

## Sync modes

<SyncModes />

Pendo tables use different sync modes depending on the table type:

- **Event tables** (`events`, `page_events`, `feature_events`, `track_events`) – Incremental sync on the `day` field. A first sync or full refresh reads the last 90 days. Each incremental run re-reads the 7 days before the watermark to capture backdated events from Pendo's daily and weekly reprocessing.

- **Survey responses** (`survey_responses`) – Incremental sync on the `lastUpdatedAt` field.

- **Metadata tables** (`features`, `pages`, `guides`, `visitors`, `accounts`, `track_types`, `product_areas`, `reports`) – Full refresh only. Pendo's list endpoints expose no server-side timestamp filter, and the aggregation endpoint's time filters apply only to event sources.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
