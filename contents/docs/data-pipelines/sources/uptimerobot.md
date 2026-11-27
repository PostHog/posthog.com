---
title: Linking UptimeRobot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Uptimerobot
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The UptimeRobot source syncs your uptime monitoring data – monitors, downtime event logs, response-time history, daily uptime statistics, incident alerts and activity, alert contacts, maintenance windows, public status pages, and status page announcements – into PostHog, so you can report on availability SLAs and downtime trends alongside your product data.

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

### Incremental sync tables

The following tables support incremental sync:

- **Monitor event logs** and **response times** sync incrementally on their `datetime` field. Response times are fetched in 7-day windows, and only the last 30 days are synced on the initial run.

- **Monitor daily uptime** syncs incrementally on its `date` field. The first sync and a full refresh read the last 30 days.

- **Incident alerts** and **incident activity log** sync incrementally by only fetching data from incidents that are open or resolved after the previous sync. These tables use derived IDs because the UptimeRobot API does not provide them. Recipient values (webhook URLs, tokens) are redacted except for email, SMS, and voice channels.

### Full refresh tables

The remaining tables sync as a full refresh each run:

- **Monitors**, **alert contacts**, **maintenance windows**, **status pages**, **incidents**, **monitor groups**, and **tags** are typically small and refresh fully.

- **Status page announcements** also refresh fully because announcement status can change.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- UptimeRobot rate-limits API calls per plan (10 requests per minute on the free plan). Syncs automatically back off and retry when rate-limited, so accounts with many monitors on the free plan may sync slowly.
- If your API key is invalid or has been revoked, generate a new read-only API key under **Integrations & API** in your UptimeRobot dashboard, then reconnect.
- Monitor-specific API keys only access a single monitor. If tables like alert contacts, maintenance windows, or status pages aren't syncing, make sure you're using a main account API key.

<TroubleshootingLink />
