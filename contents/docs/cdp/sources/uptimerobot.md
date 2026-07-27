---
title: Linking UptimeRobot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Uptimerobot
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The UptimeRobot source syncs your uptime monitoring data – monitors, downtime event logs, response-time history, alert contacts, maintenance windows, and public status pages – into PostHog, so you can report on availability SLAs and downtime trends alongside your product data.

## Prerequisites

You need an UptimeRobot account on any plan. The API is available on the free plan.

You also need a main account API key. We recommend using the **read-only API key**, found under [Integrations & API](https://dashboard.uptimerobot.com/integrations) in your UptimeRobot dashboard.

Monitor-specific API keys only grant access to a single monitor, so the alert contacts, maintenance windows, and status pages tables won't sync with one.

## Adding a data source

<SourceSetupIntro />

When linking UptimeRobot, you'll need:

- **API key** – your main account API key (read-only recommended), found under **Integrations & API** in the [UptimeRobot dashboard](https://dashboard.uptimerobot.com/integrations).

## Sync modes

<SyncModes />

Monitor event logs and response times support incremental sync on their `datetime` field. Response times are fetched in 7-day windows, and only the last 30 days are synced on the initial run.

The remaining tables (monitors, alert contacts, maintenance windows, and status pages) are small and sync as a full refresh each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- UptimeRobot rate-limits API calls per plan (10 requests per minute on the free plan). Syncs automatically back off and retry when rate-limited, so accounts with many monitors on the free plan may sync slowly.
- If your API key is invalid or has been revoked, generate a new read-only API key under **Integrations & API** in your UptimeRobot dashboard, then reconnect.
- Monitor-specific API keys only access a single monitor. If tables like alert contacts, maintenance windows, or status pages aren't syncing, make sure you're using a main account API key.

<TroubleshootingLink />
