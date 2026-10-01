---
title: Linking Judge.me Reviews as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JudgeMeReviews
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Judge.me Reviews connector syncs reviews, products, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your shop domain and private API token to pull your Judge.me product reviews.

You can find your private API token under **Settings → Integrations → Judge.me API** in the [Judge.me admin](https://judge.me). Use the **private** token - the public token cannot read reviews. The shop domain is your store's `myshopify.com` domain (e.g. `example.myshopify.com`).

You'll be asked for:

- **Shop domain**: for example `example.myshopify.com`.
- **Private API token**

## Sync modes

<SyncModes />

All Judge.me Reviews tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the private API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
