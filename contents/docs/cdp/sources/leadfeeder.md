---
title: Linking Leadfeeder as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Leadfeeder
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Leadfeeder connector syncs accounts, leads, visits, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Dealfront (Leadfeeder) API key to pull your website visitor and lead data. This syncs the **Accounts**, **Leads**, and **Visits** tables.

New connections use the unified Dealfront API. Create an API key in your Dealfront platform settings, under Personal, API keys.

The older Leadfeeder API (a token from your [Leadfeeder API settings](https://app.leadfeeder.com/settings/api)) is deprecated and no longer issues new tokens. Existing connections on it keep working.

Optionally set a **Start date** to bound the initial sync. Leave it blank to pull the last year of leads and visits.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Leadfeeder tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
