---
title: Linking Flutterwave as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Flutterwave
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Flutterwave connector syncs transactions, settlements, refunds, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

New Flutterwave sources use **API v4** by default and authenticate with OAuth2 client credentials. Existing sources connected with v3 credentials continue to work.

You can find your API keys under **Settings > API Keys** in the [Flutterwave dashboard](https://app.flutterwave.com/dashboard/settings/apis). If the page shows a public key, secret key, and encryption key, you are on v3 keys — click **Switch to v4 live API keys** to see your client ID and client secret.

You'll be asked for:

- **Client ID**: your v4 OAuth2 client ID.
- **Client secret**: your v4 OAuth2 client secret.
- **Secret key (v3 only)**: only needed for sources connected with v3 keys (for example `FLWSECK-...`).

## Sync modes

<SyncModes />

All Flutterwave tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

> **Note:** The tables `payment_plans`, `subscriptions`, and `subaccounts` are only available on API v3. They are not synced for v4 sources.

## Troubleshooting

- If the connection fails with an authorization error on **v4**, your client ID or client secret is incorrect. Copy your current v4 API keys from your Flutterwave dashboard, then reconnect the source.
- If the connection fails with an authorization error on **v3**, the secret key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
