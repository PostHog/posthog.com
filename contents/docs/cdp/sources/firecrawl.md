---
title: Linking Firecrawl as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Firecrawl
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Firecrawl connector pulls your [Firecrawl](https://www.firecrawl.dev) account activity and usage – team activity, historical credit and token usage, active crawls, and monitors – into PostHog, so you can track your scraping workload and spend alongside your product data.

## Prerequisites

You need a [Firecrawl](https://www.firecrawl.dev) account with an API key. A single key grants access to all of the tables below.

## Adding a data source

<SourceSetupIntro />

When linking Firecrawl, you'll need:

- **API key** – create one in your [Firecrawl dashboard](https://www.firecrawl.dev/app/api-keys). Firecrawl keys are prefixed with `fc-`.

## Sync modes

<SyncModes />

All Firecrawl tables sync as full refresh. The account activity and usage endpoints return the current view of your account, so a full reload on each sync keeps the data accurate and always reflects the latest historical usage.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a 401 error, your API key is invalid or has been revoked. Generate a new key in your [Firecrawl dashboard](https://www.firecrawl.dev/app/api-keys) and reconnect.
- If the `active_crawls` or `monitors` tables are empty, you likely have no crawls or monitors running – these tables reflect current activity and can legitimately be empty.

<TroubleshootingLink />
