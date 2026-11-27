---
title: Linking My Hours as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MyHours
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The My Hours connector syncs your time-tracking data into the PostHog data warehouse, so you can analyze time logs, clients, project details, tags, teams, and team members alongside your product data.

## Prerequisites

You need a My Hours account on a paid plan with permission to create an API key. The key is tied to the user who created it, so it stops working if that user is archived or removed.

## Adding a data source

<SourceSetupIntro />

When linking My Hours, you'll need:

- **API key**: Create one under **Settings → Integrations → API keys** in your [My Hours account](https://app.myhours.com/). The key grants read access to your clients, projects, project tasks and members, tags, users, teams, and time logs.

## Sync modes

The `time_logs` table supports incremental sync using `date`, as well as full refresh. The first sync requests available time logs from January 1, 2010 onward. Later incremental syncs continue from the last synced date and, by default, re-read the preceding 30 days to pick up backdated logs and edits. This overlap is not a retention limit: imported logs do not expire when they fall outside it.

All other My Hours tables use full refresh only. Each sync replaces the table with the data returned by the API.

<SyncModes />

## Sync limitations

- **Older time-log changes**: Incremental syncs can miss backdated logs or edits outside the lookback window. Use a full refresh to reload older history that is still available through the My Hours API.
- **Teams require the My Hours Pro plan.** The `teams` and `team_members` tables are only available on the My Hours Pro plan. Accounts on lower plans will see these tables marked as unavailable during source setup.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Create a new key under **Settings → Integrations → API keys** in your My Hours account, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key's permissions, then reconnect.
- If the user who created the API key is archived or removed, the key stops working. Create a new key with an active user.
- If the `teams` or `team_members` tables appear unavailable during setup, your My Hours account requires a Pro plan subscription to access team data.

<TroubleshootingLink />
