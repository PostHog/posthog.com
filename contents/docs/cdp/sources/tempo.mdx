---
title: Linking Tempo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Tempo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Tempo connector syncs your time-tracking and resource-planning data from [Tempo](https://www.tempo.io) for Jira Cloud into the PostHog Data warehouse – worklogs, accounts, customers, teams, plans, and work schemes – so you can analyze logged and planned time alongside your product data.

## Prerequisites

You need a Tempo account on Jira Cloud with permission to create API tokens (Tempo administrators can grant this under **Settings → Permissions** in Tempo).

Create a token in Tempo under **Settings → API Integration** and click **New Token**. Tempo tokens are scoped, so grant view (read) access for the data you want to sync: worklogs, accounts, customers, teams, plans, and schemes. Tables the token can't read can simply be left deselected when configuring the source.

## Adding a data source

<SourceSetupIntro />

When linking Tempo, you'll need:

- **API token** – the token you created under **Settings → API Integration** in Tempo.

## Sync modes

<SyncModes />

The `worklogs` table supports incremental sync on `updatedAt`, so each sync only fetches worklogs created or amended since the previous run. The other tables are small reference data and sync with full refresh.

Note that Tempo references Jira issues and users by numeric id and account id. To resolve them to human-readable names, also link your Jira data or use the Jira API.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – the API token is invalid or has been revoked. Generate a new token under **Settings → API Integration** in Tempo and update the source credentials.
- **403 Forbidden on a table** – the token is missing the view scope for that table. Grant the scope on the token in Tempo, or deselect the table from the sync.

<TroubleshootingLink />
