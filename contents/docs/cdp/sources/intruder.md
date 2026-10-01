---
title: Linking Intruder as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Intruder
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Intruder connector syncs targets, scans, scan schedules, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Intruder API access token to pull your attack-surface and vulnerability data.

Create an access token under **My account > API Access Tokens** in your [Intruder account](https://portal.intruder.io/). The token is shown only once, so copy it immediately. API scanning of targets requires the appropriate Intruder plan license.

You'll be asked for:

- **API access token**

## Sync modes

<SyncModes />

Some Intruder tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
