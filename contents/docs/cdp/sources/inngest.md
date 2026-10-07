---
title: Linking Inngest as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Inngest
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Inngest connector syncs events, function runs, cancellations, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Inngest signing key to pull your Inngest data.

Find the signing key for your environment (it starts with `signkey-`) in your [Inngest dashboard](https://app.inngest.com/) under **Settings** → **Signing key**. A signing key authenticates both the v1 and v2 REST APIs, so no extra scopes are required. To pull a branch environment instead, also enter its name in the **Environment** field.

Inngest retains event and run history for a plan-dependent window (from 24 hours up to 90 days), so schedule frequent syncs to keep a complete history in PostHog.

You'll be asked for:

- **Signing key**: for example `signkey-prod-...`.

## Sync modes

<SyncModes />

All Inngest tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the signing key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
