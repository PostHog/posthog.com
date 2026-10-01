---
title: Linking Rapid7 InsightVM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Rapid7Insightvm
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Rapid7 InsightVM connector syncs assets, vulnerabilities, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Rapid7 InsightVM with an **Insight Platform API key** to pull your asset inventory and vulnerability findings.

Generate a key under **Settings → API Keys** at [insight.rapid7.com](https://insight.rapid7.com), then pick the **region** your Insight Platform account lives in (the first part of your product URL, e.g. `us` in `us.idr.insight.rapid7.com`).

Requires a paid InsightVM Cloud (Insight Platform) subscription.

You'll be asked for:

- **API key**
- **Region**: choose between United States (us), Europe (eu), Canada (ca), Australia (au), Asia Pacific (ap) and Japan (jp).

## Sync modes

<SyncModes />

All Rapid7 InsightVM tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
