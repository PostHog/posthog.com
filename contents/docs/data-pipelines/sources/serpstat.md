---
title: Linking Serpstat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Serpstat
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Serpstat connector syncs your SEO rank tracking, domain analysis, and backlink data into the PostHog data warehouse, so you can analyze search performance alongside your product data.

> **Note:** This source is in **beta**.

## Prerequisites

- A Serpstat account on the **Team plan or higher** (required for API access).
- An API token from your [Serpstat profile](https://serpstat.com/users/profile/).

## Adding a data source

<SourceSetupIntro />

When linking Serpstat, you'll need:

- **API token** – create one on your [Serpstat profile page](https://serpstat.com/users/profile/).
- **Project ID** – copy from the URL of your Serpstat Rank Tracker report.
- **Project region ID** – use the region ID from the Serpstat `getProjectRegions` method.

### Optional fields

These fields are required only if you want to sync the domain and backlink tables (`domain_info`, `domain_history`, `domain_keywords`, `backlinks`):

- **Domain** – the domain to analyze (e.g., `example.com`). You can paste a full URL like `https://Example.com/path` and PostHog normalizes it to `example.com`.
- **Search engine database** – the Serpstat database code (e.g., `g_us` for Google US). Defaults to `g_us` if left blank. See the [database list](https://developers.serpstat.com/api-docs/ba97ni814ao9p-search-engine-short-names).

## API credit usage

Syncs use your Serpstat account's API units when Serpstat applies a charge:

- **Project tables** (`projects`, `project_keywords`, `project_positions`) are free of API credit charges.
- **Domain and backlink tables** (`domain_info`, `domain_history`, `domain_keywords`, `backlinks`) use API credits for each returned row.

Paginated tables include up to 500 records per sync. Position data covers the last seven days for one project region.

## Sync modes

<SyncModes />

Most Serpstat tables use **full refresh**, which reloads all data on each sync. The `domain_history` table also supports **incremental** sync on its `date` field, syncing only new records since the last run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If domain tables fail with a "domain required" error, add a domain in the source configuration. The domain and backlink tables cannot sync without one.
- If you get an authorization error, your API token may be invalid, expired, or your Serpstat plan may not include API access. Create a new token on your [Serpstat profile](https://serpstat.com/users/profile/), then reconnect.
- If domain tables return no data, Serpstat may have no data for that domain in the selected search engine database. Try a different database code or verify the domain has visibility in Serpstat.
- If you hit API credit limits, reduce the number of domain or backlink tables you sync, or upgrade your Serpstat plan.

<TroubleshootingLink />
