---
title: Linking US Bureau of Economic Analysis (BEA) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: UsBea
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The US Bureau of Economic Analysis (BEA) connector syncs state personal income summary, county personal income summary, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync official US economic statistics from the Bureau of Economic Analysis. Register a free UserID at [apps.bea.gov/api/signup](https://apps.bea.gov/api/signup/). To sync a table beyond the built-in ones, fill in the custom query fields with a BEA dataset name and GetData parameters from the [API user guide](https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf).

You'll be asked for:

- **UserID**

## Sync modes

<SyncModes />

All US Bureau of Economic Analysis (BEA) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the userID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
