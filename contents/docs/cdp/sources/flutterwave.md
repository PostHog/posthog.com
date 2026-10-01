---
title: Linking Flutterwave as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Flutterwave
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Flutterwave connector syncs transactions, settlements, refunds, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Flutterwave secret key to sync your payments data.

You can find your secret key under Settings > API in the [Flutterwave dashboard](https://app.flutterwave.com/dashboard/settings/apis). Test keys only return sandbox records, so use your live secret key to sync live data.

You'll be asked for:

- **Secret key**: for example `FLWSECK-...`.

## Sync modes

<SyncModes />

All Flutterwave tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the secret key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
