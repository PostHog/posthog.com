---
title: Linking Writesonic as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Writesonic
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Writesonic connector syncs your GEO (generative engine optimization) data into the PostHog Data warehouse: brand visibility, rank, and mentions across AI platforms like ChatGPT and Perplexity, along with the prompts, topics, keywords, citations, and competitor websites behind them. Use it to analyze your AI search presence alongside your product data.

## Prerequisites

You need a Writesonic account on a plan with API access, plus a website tracked in Writesonic's GEO product.

## Adding a data source

<SourceSetupIntro />

When linking Writesonic, you'll need:

- **API key** – a Writesonic API key with GEO API access, revealed in your account's API dashboard. This requires a plan that includes API access.
- **Site URL** – the URL of the tracked website, exactly as configured in Writesonic (e.g. `https://example.com`).
- **Project ID** (optional) – use this to disambiguate when the same site is tracked in multiple projects.

## Sync modes

<SyncModes />

The performance and content tables (`performance_summary`, `performance_prompts`, `performance_answers`, `content_citations`, and `content_keywords`) support incremental sync on their date, and only fetch the last 365 days on the initial sync. The `topics`, `platforms`, `websites`, and `prompts` tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid, revoked, or lacks GEO API access. Check the key in your Writesonic API dashboard, then reconnect.
- If no data is returned, confirm the site URL exactly matches the tracked site in Writesonic, and set the project ID if the site is tracked in more than one project.

<TroubleshootingLink />
