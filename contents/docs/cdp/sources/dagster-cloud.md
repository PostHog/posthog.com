---
title: Linking Dagster+ (Dagster Cloud) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DagsterCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Dagster+ (Dagster Cloud) connector syncs runs, backfills, assets, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Dagster+ deployment to sync run history, backfills, and your asset catalog.

Create a user token under **Organization settings → Tokens** in Dagster+, then enter your organization name, deployment name, and the token below.

You'll be asked for:

- **Organization**: for example `your-org`.
- **Deployment**: for example `prod`.
- **API token**: for example `user:...`.

## Sync modes

<SyncModes />

Some Dagster+ (Dagster Cloud) tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
