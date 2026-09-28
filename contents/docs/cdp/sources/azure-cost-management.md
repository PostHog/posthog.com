---
title: Linking Microsoft Azure Cost Management as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureCostManagement
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Microsoft Azure Cost Management connector syncs cost by service, cost by resource group, cost by resource, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pull your daily Azure spend, broken down by service, resource group, and resource.

Register an app in Microsoft Entra ID, create a client secret for it, and give its service principal the `Cost Management Reader` role on the scope you want to sync. Then enter the directory (tenant) ID, the application (client) ID, and the secret value.

The scope is the Azure Resource Manager path to read cost for, without a leading slash - for example `subscriptions/00000000-0000-0000-0000-000000000000` for one subscription, or `providers/Microsoft.Billing/billingAccounts/1234567` for an enterprise billing account.

You'll be asked for:

- **Directory (tenant) ID**: for example `00000000-0000-0000-0000-000000000000`.
- **Application (client) ID**: for example `00000000-0000-0000-0000-000000000000`.
- **Client secret**
- **Scope**: for example `subscriptions/00000000-0000-0000-0000-000000000000`.

## Sync modes

<SyncModes />

Some Microsoft Azure Cost Management tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
