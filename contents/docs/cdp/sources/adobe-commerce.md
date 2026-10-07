---
title: Linking Adobe Commerce (Magento) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AdobeCommerce
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Adobe Commerce (Magento) connector syncs orders, invoices, shipments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Adobe Commerce (Magento 2) store URL and API credentials to pull your store data.

The recommended way to connect is an integration access token: in the admin go to **System > Extensions > Integrations**, create an integration, grant it read access to Sales, Catalog, Customers and Carts, then activate it and copy the **Access Token**.

On Magento 2.4.4 and later, integration tokens are rejected as bearer tokens until you set **Stores > Configuration > Services > OAuth > Access Token Expiration > Allow OAuth Access Tokens to be used as standalone Bearer tokens** to **Yes**. If you can't change that setting, connect with an admin username and password instead and PostHog will mint a short-lived admin token for each sync.

You'll be asked for:

- **Store URL**: for example `https://store.example.com`.
- **Authentication method**: choose between Integration access token (recommended) and Admin username and password.

## Sync modes

<SyncModes />

All Adobe Commerce (Magento) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
