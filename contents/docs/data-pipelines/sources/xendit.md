---
title: Linking Xendit as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Xendit
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Xendit connector syncs transactions, accounts, disputes, and bill payment products into the PostHog Data Warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Xendit secret API key to sync your Xendit data.

Create a key in the Xendit dashboard under **Settings > Developers > API keys**. Give it the **Transaction Read** permission to sync transactions, and **Accounts Read** if you also want to sync xenPlatform sub-accounts. To sync disputes or bill payment products, also give it the **Disputes Read** or **Bill Payments Read** permission, respectively.

You'll be asked for:

- **Secret API key**

## Sync modes

<SyncModes />

The `transactions` and `accounts` tables support incremental sync using `updated` or `created`, or full refresh. The `disputes` and `bill_payment_products` tables use full refresh. Each full refresh replaces the contents of the table.

The `disputes` table is selected by default. The `bill_payment_products` table is deselected by default because it is only useful for bill payment merchants.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the secret API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
