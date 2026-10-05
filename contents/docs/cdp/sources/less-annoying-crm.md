---
title: Linking Less Annoying CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LessAnnoyingCRM
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Less Annoying CRM connector syncs users, teams, contacts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Less Annoying CRM API key to pull your CRM data.

Create an API key on the [Programmer API settings page](https://account.lessannoyingcrm.com/app/Settings/Api). Grant the key **read** access - the tables sync via the `GetUsers`, `GetTeams`, `GetContacts`, `GetTasks`, `GetNotes` and `GetEvents` functions.

API keys can't be retrieved after creation, so store the key somewhere safe when you create it.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Less Annoying CRM tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
