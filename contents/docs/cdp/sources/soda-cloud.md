---
title: Linking Soda Cloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SodaCloud
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Soda Cloud connector syncs your data quality monitoring data – datasets, checks, and incidents – into PostHog, so you can analyze data quality trends alongside your product data.

## Prerequisites

You need a [Soda Cloud](https://cloud.soda.io) account with API access. To generate API keys:

1. Log in to Soda Cloud.
2. Click your avatar and select **Profile**.
3. Go to **API Keys** and generate a new key.

This gives you an **API key ID** and **API key secret**. The synced data reflects the View dataset permissions of the API key owner – only datasets and checks visible to that user are included.

## Adding a data source

<SourceSetupIntro />

When linking Soda Cloud, you'll need:

- **API key ID** – the key ID from your Soda Cloud profile.
- **API key secret** – the corresponding secret.
- **Region** – select **Europe** or **United States** to match the region your Soda Cloud account is hosted on. Defaults to Europe.

## Sync modes

<SyncModes />

The **datasets** table supports incremental sync using the `lastUpdated` field, so only datasets modified since the last sync are fetched. Full refresh is also available.

The **checks** and **incidents** tables use full refresh only. Incremental sync isn't supported for these tables because creation-based filters would miss later changes to check results and incident statuses.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Checks include the current check result values. Separate historical check results and scan data are not synced.

## Troubleshooting

- If the connection fails with an authentication error, check that the API key ID, key secret, and region are correct. Keys are region-specific – a Europe key won't work against the United States endpoint.
- If a table syncs fewer rows than expected, verify that the API key owner has View dataset permissions for the data you want to sync.

<TroubleshootingLink />
