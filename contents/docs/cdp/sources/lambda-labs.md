---
title: Linking Lambda as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LambdaLabs
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Lambda connector syncs instances, instance types, filesystems, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Lambda API key to pull your Lambda (Lambda Labs) GPU cloud data.

You can create an API key in the [API keys section](https://cloud.lambda.ai/api-keys) of your Lambda dashboard. The key has account-wide access.

You'll be asked for:

- **API key**: for example `secret_...`.

## Sync modes

<SyncModes />

Some Lambda tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
