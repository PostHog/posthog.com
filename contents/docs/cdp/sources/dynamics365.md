---
title: Linking Microsoft Dynamics 365 as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dynamics365
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Microsoft Dynamics 365 connector syncs accounts, contacts, leads, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your Dynamics 365 (Dataverse) customer data - accounts, contacts, leads, opportunities, cases and activities - .

To connect, register an app in **Microsoft Entra ID** and add a client secret. Then add that app as an **application user** in your Dynamics 365 environment (Power Platform admin center > Environments > Settings > Users + permissions > Application users) and give it a security role that can read the tables you want to sync. The environment URL is the one you use to open the app, for example `https://contoso.crm.dynamics.com`.

You'll be asked for:

- **Environment URL**: for example `https://contoso.crm.dynamics.com`.
- **Directory (tenant) ID**: for example `72f988bf-86f1-41af-91ab-2d7cd011db47`.
- **Application (client) ID**: for example `00001111-aaaa-2222-bbbb-3333cccc4444`.
- **Client secret**

## Sync modes

<SyncModes />

All Microsoft Dynamics 365 tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
