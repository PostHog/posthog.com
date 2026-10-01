---
title: Linking Adyen as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Adyen
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Adyen connector syncs account holders, balance accounts, companies, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Adyen account to sync payments data.

Create an API credential in your Adyen Customer Area under **Developers > API credentials**, then paste its API key below. Which tables you can sync depends on what that credential can reach:

- **Transactions, transfers, account holders and balance accounts** need an Adyen for Platforms or Adyen Issuing integration. Add your balance platform ID too.
- **Settlement detail reports** need a merchant account and the **Merchant Report Download** role. Adyen only creates these files once you turn on the settlement details report in your Customer Area.
- **Companies and merchant accounts** come from the Management API and need an account read role.

Pick the environment that matches where you created the API key - a test key won't work against live.

You'll be asked for:

- **Environment**: choose between Live and Test.
- **API key**

## Sync modes

<SyncModes />

All Adyen tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
