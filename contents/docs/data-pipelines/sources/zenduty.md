---
title: Linking Zenduty as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zenduty
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Zenduty connector syncs teams, account members, incidents, priorities, on-call snapshots, and more into the PostHog data warehouse, so you can analyze incident volume, responder load, and on-call coverage alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Zenduty API key to automatically pull your Zenduty incident-management and on-call data.

Create an API key in your Zenduty account under **Account Settings → Access → API Keys** (account owners and admins only). The key is account-scoped and read access is enough for syncing.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Zenduty tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

Zenduty organizes most resources under a team, so the team-scoped tables (services, escalation policies, schedules, and so on) carry a `_zenduty_team_id` column identifying the parent team.

The `incident_alerts` and `incident_responders` tables carry a `_zenduty_incident_number` column identifying the parent incident. Each sync makes one request per incident for these tables, so they're off by default. Turn them on in the table list if you need them.

The `oncall` table shows who is on call at the time of the sync for each escalation policy. It's a snapshot, not a history of shifts.

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
