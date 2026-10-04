---
title: Linking Firecrawl as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Firecrawl
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[Firecrawl](https://www.firecrawl.dev) is a web scraping and crawling API. This connector syncs your Firecrawl account's operational data – job activity, credit and token usage, active crawls, and change-detection monitors – into the PostHog Data warehouse, so you can track your scraping usage and spend alongside the rest of your data.

## Prerequisites

- A Firecrawl account.
- A Firecrawl API key, which you can create in your [Firecrawl dashboard](https://www.firecrawl.dev/app/api-keys). A single key grants access to every table this connector syncs.

## Adding a data source

<SourceSetupIntro />

When linking Firecrawl, you'll need:

- **API key** – create one under [API Keys](https://www.firecrawl.dev/app/api-keys) in your Firecrawl dashboard. It starts with `fc-`.

## Sync modes

<SyncModes />

All Firecrawl tables are full refresh only. Firecrawl's account endpoints don't expose a server-side "updated since" filter, so each sync replaces the table with the current data from the API.

> **Note:** The `team_activity` table is a rolling log that Firecrawl only retains for the **last 24 hours**. Older activity can't be backfilled, so schedule frequent syncs if you want to accumulate a longer history of jobs in the warehouse.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `monitor_checks` table is disabled by default because it fans out one request per monitor. Enable it in the table picker if you use Firecrawl monitors and want their individual check runs.

## Troubleshooting

- If the connection fails to validate, confirm your API key is active in your [Firecrawl dashboard](https://www.firecrawl.dev/app/api-keys) and that you pasted the full `fc-...` value.

- If `team_activity` is empty, the endpoint only returns the last 24 hours of jobs. If your account hasn't run any jobs in that window, the table will be empty until it does.

- If you hit rate limits, the connector automatically backs off and retries. Firecrawl enforces plan-based rate and concurrency limits.

<TroubleshootingLink />
