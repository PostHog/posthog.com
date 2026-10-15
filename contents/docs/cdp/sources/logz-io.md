---
title: Linking Logz.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LogzIO
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Logz.io connector syncs search logs, alerts, security events, audit trail, users, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

The `security_events` and `security_rules` tables require an API token from a Logz.io **Cloud SIEM** account.

## Adding a data source

<SourceSetupIntro />

Enter your Logz.io API token to sync your log data, alerts, security events, and account configuration. Create a token under **Settings → Tools → Manage tokens → API tokens** in your Logz.io account, and pick the region that matches your account.

Log search is bounded by your account's retention window.

You'll be asked for:

- **API token**
- **Region**: choose between US East (api.logz.io), EU (api-eu.logz.io), UK (api-uk.logz.io), Canada (api-ca.logz.io), Australia (api-au.logz.io) and West US 2 (api-wa.logz.io).

## Sync modes

<SyncModes />

Some Logz.io tables sync incrementally, only fetching new data since the last sync:

- `search_logs` syncs incrementally on `@timestamp`
- `security_events` syncs incrementally on `eventDate`
- `audit_trail` syncs incrementally on `date`

All other tables (`alerts`, `triggered_alerts`, `notification_endpoints`, `drop_filters`, `security_rules`, `users`) are full refresh. Each sync replaces the contents of the table.

The following tables are synced by default: `search_logs`, `alerts`, `notification_endpoints`, `users`. All other tables must be explicitly enabled.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
