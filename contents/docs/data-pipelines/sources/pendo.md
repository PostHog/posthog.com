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

The Pendo connector syncs your Pendo product data – features, pages, guides, visitors, accounts, events, survey responses, product areas, and reports – into PostHog, so you can analyze product engagement alongside your other data.

## Prerequisites

You need a Pendo integration key, which only Pendo admins can create and view. You'll also need to know which data region your subscription uses (US, US1, EU, Japan, or Australia), since the key is specific to that region.

## Adding a data source

<SourceSetupIntro />

When linking Pendo, you'll need:

- **Integration key** – create one in Pendo under **Settings > Integrations > Integration Keys**. Only Pendo admins can view these.
- **Data region** – select the region that matches the domain you log in with (US, US1, EU, Japan, or Australia). The integration key is scoped to a single region.

## Sync modes

<SyncModes />

Most Pendo tables use full refresh, but event tables support incremental syncing:

- **Incremental** – `events`, `page_events`, `feature_events`, `track_events` (by `day`), and `survey_responses` (by `lastUpdatedAt`) sync only new data on each run.
- **Full refresh** – `features`, `pages`, `guides`, `track_types`, `reports`, `visitors`, `accounts`, and `product_areas` reload completely on each sync.

Pendo's list endpoints expose no server-side timestamp filter, and the aggregation endpoint's time filters apply only to event sources – this is why metadata tables require full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
