---
title: Linking Kernel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kernel
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

[Kernel](https://www.kernel.sh) is browser infrastructure for AI agents. This connector syncs your Kernel apps, deployments, action invocations, cloud browser sessions, saved profiles, managed auth connections, and browser replay recordings into the PostHog data warehouse so you can join agent run history with your product data.

## Prerequisites

A Kernel account with an API key. Kernel API keys are long-lived and grant organization-wide read access.

## Adding a data source

<SourceSetupIntro />

You need a Kernel API key. Create one in your [Kernel dashboard](https://dashboard.onkernel.com) under API keys, then paste it into the connection form.

## Sync modes

<SyncModes />

Kernel tables sync in full-refresh mode. Incremental sync is not yet available for this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Opt-in tables

Most Kernel tables sync by default. The following tables are opt-in because they fan out over parent resources and can produce high volumes of data:

- **browser_telemetry_events** - Telemetry events (console, network, page, interaction) captured by browser sessions during Kernel's 30-day retention window. Syncs one request per browser session.
- **auth_connection_events** - Timeline of login, reauth, and health check events for each managed auth connection. Syncs one request per auth connection.
- **browser_replays** - Video replay recordings of browser sessions, with start and finish times. Syncs one request per browser session.
- **audit_logs** - Organization-wide audit log of API requests. Requires a Start-Up or Enterprise Kernel plan.

Enable these tables in the connection settings when you need them.

## Security

The connector strips credential-bearing fields before data reaches the warehouse. This includes environment variables, CDP and live-view URLs with embedded access tokens, hosted login URLs, and replay view URLs. Proxy authentication credentials (username and password) are also removed.

## Troubleshooting

If the connection fails with an authentication error, confirm the API key is active in your Kernel dashboard and has not been revoked. Kernel enforces per-organization rate limits, so very large syncs may take longer while the connector backs off and retries.

<TroubleshootingLink />
