---
title: Linking Fourthwall as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Fourthwall
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Fourthwall connector syncs orders, products, product templates, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your Fourthwall shop's orders, products, product templates, collections, donations, members, membership tiers, promotions and mailing list.

In your Fourthwall dashboard go to **Settings > For developers > Open API** and choose **Create API User**. Only a shop super admin can do this.

You'll be asked for:

- **API user username**: in your Fourthwall dashboard go to **Settings > For developers > Open API** and choose **Create API User**. Only a shop super admin can do this.
- **API user password**

## Sync modes

<SyncModes />

All Fourthwall tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API user password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
