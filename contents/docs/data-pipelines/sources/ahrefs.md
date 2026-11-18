---
title: Linking Ahrefs as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ahrefs
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Ahrefs connector syncs SEO data — Site Audit health scores, backlink profiles, organic keyword rankings, Domain Rating history, daily site metrics, and more — into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

- An Ahrefs Lite plan or higher.
- An API key created in [Account settings > API keys](https://app.ahrefs.com/account/api-keys).
- A Site Audit project ID. Find the numeric ID in the project URL: `https://app.ahrefs.com/site-audit/123456`.

> **Note:** Page data (the `site_audit_pages` table) requires verified project ownership in Ahrefs.

## Adding a data source

<SourceSetupIntro />

Import Site Audit crawl results, backlink data, organic keyword rankings, referring domains, Domain Rating history, daily site metrics, Rank Tracker rankings, and more from Ahrefs.

You'll be asked for:

- **API key** — create one in [Account settings > API keys](https://app.ahrefs.com/account/api-keys).
- **Site Audit project ID** — the numeric ID from your project URL (e.g. `123456` from `https://app.ahrefs.com/site-audit/123456`).

## Sync modes

<SyncModes />

Most Ahrefs tables are full refresh. The `domain_rating_history`, `metrics_history`, and `site_metrics_daily` tables sync incrementally on `date`.

## API unit costs

Syncs use your Ahrefs account's API units. Plan for these costs per sync:

| Table                                          | Cost                          |
| ---------------------------------------------- | ----------------------------- |
| Health scores, projects, Rank Tracker overview | Free                          |
| Top domains (1M rows)                          | Free                          |
| Issues, pages                                  | 50 units per request          |
| Metrics history                                | 10 units per metric per month |
| Daily site metrics                             | ~150 units per day            |
| Backlinks, keywords, referring domains         | Varies by plan                |

The first sync of `site_metrics_daily` reads the last 7 days. Later syncs add each new day, up to 31 days back. History tables (`domain_rating_history`, `metrics_history`) start 180 days back on first sync.

## Data limits

Some tables return a capped number of rows per sync:

| Table                       | Limit             |
| --------------------------- | ----------------- |
| `site_audit_pages`          | 100 pages         |
| `backlinks`                 | 1,000 live links  |
| `organic_keywords`          | 1,000 keywords    |
| `referring_domains`         | 1,000 domains     |
| `domain_rating_top_domains` | 1,000,000 domains |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authentication error, the API key is wrong, expired, or has been revoked. Create a new one in [Account settings > API keys](https://app.ahrefs.com/account/api-keys), then reconnect the source.
- If a sync fails with a quota error, your API units are exhausted. The sync retries automatically once units renew or you raise your limit.
- If page data returns no rows, check that the Site Audit project has verified ownership.
- If the sync fails with "no target for the Site Audit project", check that the project ID is correct and the project has a target URL configured.

<TroubleshootingLink />
