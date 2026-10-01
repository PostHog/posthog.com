---
title: Linking BILL (formerly Bill.com) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BillCom
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The BILL (formerly Bill.com) connector syncs bills, payments, vendors, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect BILL to pull your accounts payable and receivable data.

Create a developer key in your [BILL developer account](https://developer.bill.com/docs/bill-keys-tokens), then enter the email and password you sign in with, your organization ID, and that developer key. PostHog uses them to start an API session for each sync.

BILL Spend & Expense data is not included - it uses a separate API token.

You'll be asked for:

- **Email**: for example `you@company.com`.
- **Password**
- **Organization ID**
- **Developer key**
- **Environment**: choose between Production and Sandbox.

## Sync modes

<SyncModes />

All BILL (formerly Bill.com) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
