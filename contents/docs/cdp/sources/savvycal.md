---
title: Linking SavvyCal as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SavvyCal
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SavvyCal connector syncs your scheduling data — booked events, scheduling links, webhooks, and workflows — into the PostHog Data warehouse, so you can analyze meeting activity alongside your product data.

## Prerequisites

You need a SavvyCal account with access to [Developer Settings](https://savvycal.com/developers) to create a personal access token. The token carries your account's full read access, so it can read every record you can see.

## Adding a data source

<SourceSetupIntro />

When linking SavvyCal, you'll need:

- **Personal access token** – create one under [Developer Settings](https://savvycal.com/developers) in SavvyCal by clicking **Create a token**. Tokens start with `pt_secret_`.

## Sync modes

<SyncModes />

The `events` table supports incremental sync using the event start time (`start_at`): each run fetches events starting on or after the last synced start date. Because SavvyCal filters on the start date rather than a last-modified timestamp, changes to events that started before the watermark — for example, a cancellation of a past event — are only picked up by a full refresh. Rescheduled events move to a new start time and are picked up naturally.

All other tables are synced with a full refresh, as the SavvyCal API doesn't provide a way to filter them by modification time.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your personal access token is invalid or has been revoked. Create a new token under Developer Settings in SavvyCal, then reconnect.
- If you see a permissions error, the token is missing the access needed to sync this data. Check the token owner's account permissions, then reconnect.

<TroubleshootingLink />
