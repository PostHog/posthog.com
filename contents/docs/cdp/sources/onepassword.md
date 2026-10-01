---
title: Linking 1Password as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OnePassword
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The 1Password connector syncs sign in attempts, item usages, audit events, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pull your 1Password security event streams - sign-in attempts, item usages, and audit events - .

This uses the 1Password Events API, which requires a 1Password Business or Enterprise plan. [Create an Events Reporting integration](https://support.1password.com/events-reporting/) in your 1Password admin console and issue a bearer token with the event types you want to sync:
- Sign-in attempts
- Item usages
- Audit events

Select the region where your 1Password account is hosted - the Events API is served from a region-specific address.

You'll be asked for:

- **Account region**: choose between 1Password.com (events.1password.com), 1Password.ca (events.1password.ca), 1Password.eu (events.1password.eu) and 1Password Enterprise (events.ent.1password.com).
- **Events Reporting token**: for example `eyJhbGciOiJFUzI1NiIsIm...`.

## Sync modes

<SyncModes />

All 1Password tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the events Reporting token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
