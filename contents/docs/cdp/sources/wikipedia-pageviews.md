---
title: Linking Wikipedia Pageviews as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: WikipediaPageviews
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Wikipedia Pageviews connector syncs pageview statistics for any Wikimedia project (Wikipedia, Wiktionary, Wikimedia Commons, and more) from the public [Wikimedia Analytics API](https://doc.wikimedia.org/generated-data-platform/aqs/analytics-api/). It imports project-wide daily totals, daily counts for specific articles, and each day's most-viewed articles.

## Prerequisites

None. The Wikimedia Analytics API is public and requires no credentials. Pageview data is available from July 2015 onward and lands with a delay of about a day.

## Adding a data source

<SourceSetupIntro />

Configure the source with:

- **Project domain**: the Wikimedia project to sync, such as `en.wikipedia.org`, `de.wikipedia.org`, or `commons.wikimedia.org`.
- **Access method** and **agent type**: which slice of traffic to count. The defaults (all access methods, human traffic) match the numbers shown on Wikipedia's public pageview tools.
- **Article titles** (optional): a comma-separated list of article titles to track in the `article_pageviews` table, for example `Albert Einstein, Marie Curie`.
- **Start date** (optional): the earliest day to sync, in `YYYY-MM-DD` format. Defaults to 2015-07-01, when Wikimedia pageview data begins.

## Sync modes

<SyncModes />

All tables support incremental syncs on the `date` column, which only fetch days newer than the last synced day on each run. This is the recommended sync method.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"No pageview data found for project"**: check the project domain. It should be a Wikimedia project domain like `en.wikipedia.org`, not an article URL.
- **The `article_pageviews` table fails to sync**: add one or more article titles in the source settings. The table only syncs the articles you list.
- **The latest day is missing**: Wikimedia publishes pageview data with a delay of about a day. The most recent day arrives on the next sync after it's published.

<TroubleshootingLink />
