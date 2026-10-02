---
title: Linking Cal.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CalCom
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cal.com connector syncs bookings, event types, schedules, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Cal.com API key to pull your scheduling data.

You can create an API key under **Settings → Security → API keys** in [Cal.com](https://app.cal.com/settings/developer/api-keys). The key grants read access to your bookings, attendees, event types, schedules, teams, and webhooks.

The organization tables (memberships, users, and routing forms) need a key from a Cal.com organization admin. If your account isn't in an organization, leave those tables unselected.

Pick the region your Cal.com account lives in. Choose EU if you sign in at cal.eu, since a key from one region is not valid in the other.

You'll be asked for:

- **API key**: for example `cal_live_...`.
- **Region**: choose between US (api.cal.com) and EU (api.cal.eu).

## Sync modes

<SyncModes />

All Cal.com tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
