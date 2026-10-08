---
title: Linking Shutterstock as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Shutterstock
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Shutterstock connector syncs image categories, video categories, images updated, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pull your Shutterstock media catalog and account data.

Authenticate with your app's consumer key and secret (from [your Shutterstock apps page](https://www.shutterstock.com/account/developers/apps)) to sync the catalog feeds: categories and recently updated images and videos.

To also sync account-level tables, use an OAuth access token instead. Collections need the `collections.view` scope, license history needs `licenses.view`, and subscriptions need `purchases.view`. Note that Shutterstock invalidates OAuth tokens when the account password changes, so you may need to reconnect after a password change.

You'll be asked for:

- **Authentication type**: choose between Consumer key and secret and OAuth access token.

## Sync modes

<SyncModes />

Some Shutterstock tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the consumer secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
