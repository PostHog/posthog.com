---
title: Linking Zoho CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZohoCRM
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Zoho CRM connector syncs leads, contacts, accounts, deals, territories, pipelines, the deal timeline, your custom modules, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Zoho CRM account to pull leads, contacts, deals, and your other modules.

In the [Zoho API console](https://api-console.zoho.com), create a **Self Client** and generate a code for the scopes `ZohoCRM.modules.ALL`, `ZohoCRM.settings.fields.READ`, and `ZohoCRM.settings.modules.READ`. To sync territories, also add `ZohoCRM.settings.territories.READ`. To sync pipelines, also add `ZohoCRM.settings.pipeline.READ` and `ZohoCRM.settings.layouts.READ`. That code is not a refresh token and expires within minutes. Exchange it for a refresh token by sending a POST request to `/oauth/v2/token` on your data center's Zoho accounts domain, with `grant_type=authorization_code`, your client ID, client secret, and the code. Paste the client ID, client secret, and refresh token below, then pick the data center your Zoho account lives in.

You'll be asked for:

- **Data center**: choose between United States (.com), Europe (.eu), India (.in), Australia (.com.au), Japan (.jp), Canada (.ca) and China (.com.cn).
- **Client ID**: for example `1000.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
- **Client secret**
- **Refresh token**: for example `1000.XXXXXXXX.XXXXXXXX`.

## Sync modes

<SyncModes />

Record modules, including your custom modules, support incremental sync on `Modified_Time`. `Deal_Timeline` supports incremental sync on `audited_time`. `Users`, `Territories`, and `Pipelines` are full refresh. Each sync replaces the contents of these tables.

`Territories`, `Pipelines`, `Deal_Timeline`, and custom modules are off by default. Turn them on in the source's schema settings. PostHog finds your custom and linking modules when it reads your Zoho CRM schema, and names each table `Custom_` followed by the module's API name.

`Deal_Timeline` sends one request per deal. An incremental sync reads only the deals that changed since the last sync. A timeline entry that does not change the deal, such as a note added to it, can be missed until the deal changes again.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a territories or pipelines sync fails with a scope error, your refresh token is missing a scope. Generate a new refresh token with the scopes above, then reconnect the source. Or turn off the table in the source's schema settings.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
