---
title: Linking Mention as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mention
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Mention connector syncs accounts, alerts, alert tags, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Mention API access token to pull your monitored accounts, alerts, mentions, and tags.

You can create an access token by registering an API application at [dev.mention.com](https://dev.mention.com). Note that Mention API access is a paid add-on to Mention plans.

You'll be asked for:

- **Access token**

## Sync modes

<SyncModes />

All Mention tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
