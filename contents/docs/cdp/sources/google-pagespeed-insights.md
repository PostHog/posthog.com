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

The Google PageSpeed Insights connector syncs PageSpeed Insights (Lighthouse) scores for the URLs you specify into PostHog, so you can track page performance alongside your product data.

## Prerequisites

You need a Google Cloud API key with the **PageSpeed Insights API** enabled. A key raises your quota to 25,000 queries/day (400 per 100 seconds); without one, requests are heavily throttled. Each analysis is a full Lighthouse run and can take several seconds.

## Adding a data source

<SourceSetupIntro />

When linking Google PageSpeed Insights, you'll need:

- **API key** – create an API key in the [Google Cloud console](https://console.cloud.google.com/apis/credentials) and enable the **PageSpeed Insights API** for your project.
- **URLs** – there is no list endpoint, so every request runs a fresh, on-demand analysis of a single URL. Enter one URL per line (starting with `http://` or `https://`). Each URL is analyzed once per selected table (desktop / mobile) per sync. To accumulate a history of scores over time, pick the **append** sync method on the table.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
