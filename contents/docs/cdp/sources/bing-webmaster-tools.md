---
title: Linking Bing Webmaster Tools as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BingWebmasterTools
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Bing Webmaster Tools connector syncs your site's organic search performance on Bing into PostHog: top search queries, top pages, daily rank and traffic, and Bingbot crawl statistics. It covers the same ground for Bing that the [Google Search Console source](/docs/cdp/sources/google-search-console) covers for Google search.

## Prerequisites

You need a [Bing Webmaster Tools](https://www.bing.com/webmasters) account with at least one verified site, and an API key. The API key is issued per user and works for every verified site on the account.

## Adding a data source

<SourceSetupIntro />

When linking Bing Webmaster Tools, you'll need:

- **API key:** your Bing Webmaster Tools API key. See [getting your API key](#getting-your-api-key) below.
- **Site URLs** (optional): the sites to sync, one per line, entered exactly as Bing Webmaster Tools lists them (for example `https://example.com/`). Leave this empty to sync every verified site on the account.

## Getting your API key

1. Sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add and verify the site you want to sync, if you haven't already.
3. Open **Settings** in the top right corner, then go to the **API access** section.
4. If this is your first time using API access, read and accept the terms, then click **API Key**.
5. Click **Generate API Key** and copy the key into PostHog.

Bing allows one API key per user. Deleting the key invalidates every application using it.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Every table except `sites` is synced per verified site, and each row carries a `site_url` column identifying the site it belongs to. In the `page_stats` table, the page URL is in the `query` column, which is where the Bing API returns it.

Bing retains about six months of statistics. Query and page statistics are updated weekly; rank and traffic and crawl statistics are updated daily.

## Sync modes

<SyncModes />

The stats tables support incremental sync on `date`. The Bing API has no server-side date filter, so each sync refetches the full window Bing retains and merges it on the primary key. Rows Bing has already expired stay in PostHog, so with incremental sync your warehouse accumulates history beyond Bing's own retention.

| Table                    | Sync methods                   |
| ------------------------ | ------------------------------ |
| `sites`                  | Full refresh                   |
| `query_stats`            | Incremental sync, full refresh |
| `page_stats`             | Incremental sync, full refresh |
| `rank_and_traffic_stats` | Incremental sync, full refresh |
| `crawl_stats`            | Incremental sync, full refresh |

## Troubleshooting

- **Invalid API key:** the key was deleted or never valid. Generate a new key in Bing Webmaster Tools under **Settings** > **API access** and update the source credentials.
- **"These site URLs are not verified sites on the connected account":** an entry in the Site URLs field doesn't match a verified site. Enter each site exactly as Bing Webmaster Tools lists it, or clear the field to sync every verified site.
- **Empty tables:** a newly verified site can take a while to accumulate statistics in Bing Webmaster Tools. Check that the data appears in the Bing Webmaster Tools UI first.

<TroubleshootingLink />
