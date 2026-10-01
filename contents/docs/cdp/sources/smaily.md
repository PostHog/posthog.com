---
title: Linking Smaily as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Smaily
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Smaily connector syncs campaigns, campaign statistics, segments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Smaily API credentials to pull your email marketing data.

Create an API user in [Smaily](https://smaily.com) under **Account preferences → Integrations → API users**. Your subdomain is the first part of your Smaily URL, e.g. `mycompany` for `mycompany.sendsmaily.net`.

You'll be asked for:

- **Smaily subdomain**: for example `mycompany`.
- **API username**
- **API password**

## Sync modes

<SyncModes />

All Smaily tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
