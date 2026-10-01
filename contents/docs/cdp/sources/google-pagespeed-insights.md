---
title: Linking Google PageSpeed Insights as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GooglePageSpeedInsights
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Google PageSpeed Insights connector syncs pagespeed desktop, pagespeed mobile, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Google Cloud API key and the URLs you want to analyze to pull PageSpeed Insights (Lighthouse) scores.

Create an API key in the [Google Cloud console](https://console.cloud.google.com/apis/credentials) and enable the **PageSpeed Insights API** for your project. A key raises your quota to 25,000 queries/day (400 per 100 seconds); without one, requests are heavily throttled.

There is no list endpoint - every request runs a fresh, on-demand analysis of a single URL - so enter one URL per line (starting with `http://` or `https://`). For example:

```
https://posthog.com
https://posthog.com/docs
```

Each analysis is a full Lighthouse run and can take several seconds. Each URL is analyzed once per selected table (desktop / mobile) per sync. To accumulate a history of scores over time, pick the **append** sync method on the table.

You'll be asked for:

- **API key**: for example `Your Google Cloud API key`.
- **URLs**: for example `https://posthog.com
https://posthog.com/docs`.

## Sync modes

<SyncModes />

All Google PageSpeed Insights tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
