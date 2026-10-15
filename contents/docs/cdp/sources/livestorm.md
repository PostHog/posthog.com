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
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Livestorm connector syncs your webinar events, sessions, people and session registrants into PostHog. Use it to connect webinar attendance with what people do in your product afterwards.

## Prerequisites

You need a Livestorm API token with read access to the **Events** scope. Create one in Livestorm under **Account settings > Integrations > Public API**.

## Adding a data source

<SourceSetupIntro />

Paste the API token.

## Sync modes

<SyncModes />

`events`, `sessions` and `session_people` support incremental sync on `updated_at`. Livestorm returns rows in no fixed order, so the sync moves its incremental position forward only after a run completes. `people` syncs with a full refresh.

`session_people` reads the registrants of every session, one request per session. Livestorm counts API calls against a monthly quota, so sync this table less often if you have many sessions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

**The API token has no read access to events.** Edit the token in Livestorm and set the **Events** scope to read.

<TroubleshootingLink />
