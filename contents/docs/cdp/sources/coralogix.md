---
title: Linking Coralogix as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Coralogix
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Coralogix connector syncs your logs and trace spans into the PostHog Data warehouse via the DataPrime query API, so you can analyze reliability, errors, and telemetry alongside your product data.

## Prerequisites

You need a Coralogix account and permission to create a personal or team API key. The key must include the **DataQuerying** permission preset. To use the **Archive** query tier, your Coralogix account must have archiving enabled.

## Adding a data source

<SourceSetupIntro />

When linking Coralogix, you'll need:

- **Coralogix domain** – the domain your account lives on, shown in your Coralogix URL (for example `coralogix.us` for US1 or `eu2.coralogix.com` for EU2). Querying the wrong domain fails with a permission error.
- **API key** – create a personal or team key in Coralogix under **Settings → API keys** and grant it the **DataQuerying** permission preset.
- **Query tier** – **Frequent search** queries your indexed retention and works out of the box. **Archive** queries your S3 archive instead, which reaches further back but requires archiving to be enabled.

## Sync modes

<SyncModes />

Logs and spans are immutable, so append is the recommended sync method: each run picks up from the newest previously synced timestamp. The initial sync (and every full refresh) pulls the last 7 days of data.

## Configuration

<SourceParameters />

## Supported tables

Each row carries the record's metadata (like `timestamp`, `severity`, and `logid`) and labels (like `applicationname` and `subsystemname`) as columns, with the raw log or span body as a JSON string in the `user_data` column.

<SourceTables />

## Troubleshooting

- If you see an authentication or permission error, the API key is invalid, is missing the **DataQuerying** permission preset, or the selected domain doesn't match your Coralogix account. Fix the key or domain, then reconnect.
- If archive syncs fail while frequent search works, check that archiving is enabled on your Coralogix account.

<TroubleshootingLink />
