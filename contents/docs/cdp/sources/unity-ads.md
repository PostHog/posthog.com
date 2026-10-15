---
title: Linking Unity Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: UnityAds
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Unity Ads connector syncs daily user acquisition statistics for your Unity Ads campaigns into the PostHog data warehouse: spend, starts, clicks, installs and 7-day revenue and retention. Use it to compare what you paid for installs with what those users do in your product.

## Prerequisites

You need access to the Unity Ads user acquisition dashboard and permission to create a service account in your Unity organization.

## Adding a data source

<SourceSetupIntro />

This source needs three values:

1. **Organization core ID** – In the [Unity Ads dashboard](https://cloud.unity.com/acquire), open **Settings** and copy the **Organization core ID**. Use the core ID, not the other organization ID on that page.
2. **Key ID** and **Secret key** – In the Unity dashboard, create a service account, give it the **Advertise Stats API Viewer** role from the Growth category, and create a key. Unity shows the secret key once.

## Sync modes

<SyncModes />

Both tables support incremental sync on `timestamp`, the day a row covers. Each sync re-reads the last 30 days, because 7-day revenue and retention keep changing after the install.

The first sync reads the last year. Unity allows 30 requests every 30 minutes, so a first sync of `campaigns_daily_by_country` takes a while.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### The source fails with a 403 error

The service account lacks the **Advertise Stats API Viewer** role. Add the role in the Unity dashboard and run the sync again.

### The source fails with a 404 error

Unity found no organization with that ID. Check that you entered the **Organization core ID**.

<TroubleshootingLink />
