---
title: Linking Smartlook (Smartlook.com s.r.o. / Cisco) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Smartlook
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Smartlook connector syncs visitors, sessions, event definitions, funnels, and visitor events into the PostHog data warehouse, so you can analyze them alongside your product data.

> **Alpha:** This source is in alpha. If you run into issues, please [let us know](https://app.posthog.com/home#supportModal).

## Prerequisites

- A Smartlook account with REST API access enabled.
- A project-scoped API token. Ask the project owner to create one in **Project settings > REST API**.
- Know whether your Smartlook project is hosted in the **EU** or **US** region.

## Adding a data source

<SourceSetupIntro />

Enter your Smartlook API token and select the region that matches your project.

You'll be asked for:

- **API token**: a project-scoped bearer token created in **Project settings > REST API**.
- **Project region**: select **EU** or **US** to match your Smartlook project. The default is EU.

## Sync modes

<SyncModes />

All Smartlook tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

> **Note:** Visitor events require a separate request for each visitor and are **disabled by default**. Enable this table only if you need per-visitor interaction data. Smartlook limits API requests by plan — large imports may require the REST API add-on.

## Troubleshooting

- If the connection fails with a **401 error**, Smartlook rejected the API token. Create a new token in your project settings, then reconnect the source.
- If the connection fails with a **403 error**, Smartlook denied API access. Check the token, project region, and that REST API access is enabled.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
