---
title: Linking StatusCake as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Statuscake
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The StatusCake connector syncs your uptime, SSL, pagespeed, and heartbeat monitoring data into PostHog – including raw check results, up/down periods, and alerts – so you can compute availability SLAs and track performance regressions alongside your product data.

## Prerequisites

You need a StatusCake account with an API token. Tokens are generated under **Account Settings > API Keys** in the StatusCake dashboard and grant account-wide read access.

## Adding a data source

<SourceSetupIntro />

When linking StatusCake, you'll need:

- **API token** – generated under **Account Settings > API Keys** in your StatusCake dashboard. No extra scopes are required.

## Sync modes

<SyncModes />

The per-test history tables (`uptime_history`, `uptime_periods`, `uptime_alerts`, `pagespeed_history`) support incremental syncs, fetching only records newer than the last synced timestamp. The check configuration tables are small and fully refreshed on each sync.

History tables are fetched per test, so each sync makes one request chain per test in your account. StatusCake rate limits API requests per account (60 requests per minute on free plans); the connector backs off and retries automatically, but syncs may be slow on accounts with many tests.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

How much history StatusCake returns depends on your plan's data retention – records older than your plan's retention window can't be synced.

<TroubleshootingLink />
