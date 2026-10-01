---
title: Linking AppFollow as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appfollow
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The AppFollow connector syncs app collections, app lists, users, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your AppFollow API token to pull your app reviews and ratings.

An Account Owner or Admin can generate an API token on the [API management page](https://watch.appfollow.io/settings/api) in your AppFollow account. The token authenticates every request via the `X-AppFollow-API-Token` header.

Note that AppFollow bills API usage against a credit balance (reviews and ratings cost more per request) and rate-limits to 1000 requests/hour per token.

You'll be asked for:

- **API token**: for example `Your AppFollow API token`.

## Sync modes

<SyncModes />

All AppFollow tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
