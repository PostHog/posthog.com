---
title: Linking Mercury as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mercury
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Mercury connector syncs accounts, cards, categories, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your Mercury business banking data, including accounts, transactions, cards, and invoices.

Create an API token with Read Only access in Mercury under [Settings > API tokens](https://app.mercury.com/settings/tokens). Read Only tokens do not require an IP allowlist.

You'll be asked for:

- **API token**

## Sync modes

<SyncModes />

The `Transactions` table supports incremental sync on `createdAt`. Each incremental sync also reads the last 30 days again, so it picks up changes to pending transactions, such as a new status or `postedAt` value. All other tables are full refresh only, because the Mercury API does not have a timestamp filter for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
