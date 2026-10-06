---
title: Linking Checkly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Checkly
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Checkly connector syncs your synthetic monitoring data – checks, check groups, alert channels, check statuses, and check results – into PostHog, so you can analyze uptime, performance, and alerting alongside your product data.

## Prerequisites

You need a [Checkly](https://www.checklyhq.com/) account with an API key and your account ID.

- **API key** – create one in [User Settings → API Keys](https://app.checklyhq.com/settings/user/api-keys).
- **Account ID** – find it in [Account Settings → General](https://app.checklyhq.com/settings/account/general). It's a UUID.

## Adding a data source

<SourceSetupIntro />

When linking Checkly, you'll need:

- **API key** – the key you created in your Checkly user settings.
- **Account ID** – the UUID from your Checkly account settings.

## Sync modes

<SyncModes />

Most Checkly tables use full refresh. `check_results` supports incremental sync using the `created_at` timestamp.

## Check results

The `check_results` table syncs individual check runs — including final results and retry attempts — for all currently listed checks. A few things to note:

- **30-day history** – Checkly retains results for up to 30 days, so each sync covers that window at most.
- **Incremental sync** – when enabled, subsequent syncs fetch only results newer than the last watermark, reducing the amount of data transferred.
- **Deleted checks** – results for checks that have been deleted from Checkly are not discovered.
- **Excluded fields** – raw logs, request payloads, and result assets are not synced. Only run metrics and status fields are included.

## Data sanitization

For security, the connector excludes sensitive fields before data reaches PostHog. This includes inline authentication, request bodies, environment variables, executable scripts, URLs, and secret-bearing alert channel configuration. Only explicitly approved safe fields are synced for `checks`, `check_groups`, and `alert_channels`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an API key error, your key may be invalid or revoked. Create a new one in [Checkly user settings](https://app.checklyhq.com/settings/user/api-keys) and reconnect.
- If the connection fails with an account access error, double-check that the account ID matches the account the API key belongs to.

<TroubleshootingLink />
