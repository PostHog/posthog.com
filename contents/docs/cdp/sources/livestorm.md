---
title: Linking Livestorm as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Livestorm
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The Livestorm connector syncs your webinar events, sessions, people, and session registrants and attendees into PostHog. Use it to connect webinar attendance with what people do in your product afterwards.

## Prerequisites

You need a Livestorm API token with read access to the **Events** scope. Create one in Livestorm under **Account settings > Integrations > Public API**.

## Adding a data source

<SourceSetupIntro />

Paste the API token.

## Sync modes

<SyncModes />

`events`, `sessions` and `session_people` support incremental sync on `updated_at`. Livestorm returns rows in no fixed order, so the sync moves its incremental position forward only after a run completes. `people` syncs with a full refresh.

`session_people` makes one request per session. An incremental sync reads only sessions that start up to a week before the last sync, and a full refresh reads every session.

Livestorm allows 10,000 API calls per 30 days for each account, shared with your other Livestorm integrations. Sync daily or less often, especially `session_people` and `people`. When the quota runs out, syncs fail with a quota message until it resets.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

**The API token has no read access to events.** Edit the token in Livestorm and set the **Events** scope to read.

<TroubleshootingLink />
