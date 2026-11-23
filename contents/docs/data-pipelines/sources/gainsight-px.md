---
title: Linking Gainsight PX as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GainsightPx
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Gainsight PX connector syncs accounts, users, features, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Gainsight PX with your project's **API key**. Generate a key with **Read** access under **Administration → REST API** in Gainsight PX, then pick the region your subscription is hosted in.

You'll be asked for:

- **API key**
- **Region**: choose between US (api.aptrinsic.com), EU (api-eu.aptrinsic.com) and US2 (api-us2.aptrinsic.com).

## Sync modes

<SyncModes />

The event tables support incremental and append-only sync on `date`. Gainsight PX events don't change after capture, so each sync fetches only the events that are newer than the last sync. The first sync and each full refresh of an event table fetch the last 2 years of events. The event tables are:

- `page_view_events`
- `session_events`
- `engagement_view_events`
- `feature_match_events`
- `segment_match_events`
- `custom_events`
- `identify_events`
- `form_submit_events`
- `email_events`
- `lead_events`
- `survey_responses`

The other tables (`accounts`, `users`, `features`, `segments`, `engagements`, `articles`, and `kc_bots`) use full refresh, because their Gainsight PX endpoints don't have an "updated since" filter. Each sync replaces the contents of these tables.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
