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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

[Writesonic](https://writesonic.com) tracks your brand's visibility in AI search — how often, how prominently, and in what context AI platforms like ChatGPT, Perplexity, and Google AI Overviews mention your brand (GEO, generative engine optimization). This connector pulls your daily performance metrics, raw AI answers with brand mentions, citations, keywords, tracked configuration (topics, prompts, platforms, websites), and content optimization pages, issues, and recommended fixes into the PostHog data warehouse, where you can join AI visibility with your product analytics.

## Prerequisites

You need a Writesonic account on a plan with API access to GEO data, with at least one website tracked. Your API key is revealed in the API dashboard of your Writesonic account.

## Adding a data source

<SourceSetupIntro />

Connect Writesonic to pull your GEO (generative engine optimization) data - brand visibility, rank, and mentions across AI platforms like ChatGPT and Perplexity - .

You'll need:

- A Writesonic **API key** with GEO API access (revealed in your account's API dashboard; requires a plan with API access)
- The **site URL** of the tracked website, exactly as configured in Writesonic (e.g. `https://example.com`)
- Optionally, a **project ID** to disambiguate when the same site is tracked in multiple projects

You'll be asked for:

- **API key**: for example `Your Writesonic API key`.
- **Site URL**: for example `https://example.com`.

## Sync modes

<SyncModes />

The performance and content tables (`performance_summary`, `performance_prompts`, `performance_answers`, `content_citations`, `content_keywords`) are exported one UTC day at a time and support incremental sync by date when you select it — the first sync backfills up to the last 365 days, and each later sync picks up from the last synced day. In full refresh mode, each sync fetches the last 365 days again. The configuration tables (`topics`, `platforms`, `websites`, `prompts`) are small and sync as full refresh. The content optimization tables (`content_optimize_pages`, `content_optimize_issues`, `content_optimize_recommendations`, `content_optimize_issues_summary`) sync as full refresh. The issues and recommendations tables make one request for each page in the content optimization pages list.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid or inactive API key** — the key is wrong or was deactivated. Check the key in your Writesonic API dashboard and reconnect.
- **Site not found** — Writesonic couldn't match the configured site URL (and project ID, if set) to a tracked website in your account. Copy the URL exactly as it appears in your Writesonic workspace.
- **Plan does not include API access** — GEO data exports require a Writesonic plan with API access. Upgrade your plan and reconnect.

<TroubleshootingLink />
