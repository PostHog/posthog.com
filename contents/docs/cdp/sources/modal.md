---
title: Linking Modal as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Modal
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Modal connector syncs your workspace billing data from [Modal](https://modal.com/) – daily and hourly cost breakdowns by object and environment – into PostHog, so you can analyze your serverless compute spend alongside your product data.

## Prerequisites

You need a Modal account with a **Team or Enterprise plan**. Workspace billing reports are only available on these plans. Free and individual plans don't have access to the billing API.

Generate an API token in [Modal settings](https://modal.com/settings). Use a service-user token with workspace billing access.

## Adding a data source

<SourceSetupIntro />

When linking Modal, you need:

- **Token ID** – the token ID generated in Modal settings (starts with `ak-`).
- **Token secret** – the token secret shown once when the token is created (starts with `as-`).

## Sync modes

<SyncModes />

Both billing tables support incremental sync on `interval_start`. Modal continuously updates cost data for recent intervals, so each incremental run re-pulls a trailing window and updates restated rows in place:

- **`billing_report_daily`** – 3-day lookback window
- **`billing_report_hourly`** – 6-hour lookback window

The first sync imports historical data:

- **Daily reports** – 365 days of history
- **Hourly reports** – 30 days of history

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table                   | Description                                            | Sync        |
| ----------------------- | ------------------------------------------------------ | ----------- |
| `billing_report_daily`  | Daily workspace costs by Modal object and environment  | Incremental |
| `billing_report_hourly` | Hourly workspace costs by Modal object and environment | Incremental |

Each table includes these columns:

| Column             | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `object_id`        | Identifier of the Modal object that incurred the cost, such as an App                        |
| `description`      | Description of the Modal object that incurred the cost                                       |
| `environment_name` | Name of the Modal environment that contains the object                                       |
| `interval_start`   | Start of the billing interval in UTC                                                         |
| `cost`             | Cost for the billing interval before credits, reservations, and the network egress allowance |
| `tags`             | User-defined tags associated with the object during the billing interval                     |

The primary key is (`object_id`, `interval_start`, `environment_name`).

## Troubleshooting

### Permission denied error

Modal returns a permission error if your account doesn't have access to workspace billing reports. This feature requires a **Team or Enterprise plan**. Check your Modal subscription in [Modal settings](https://modal.com/settings).

### Authentication error

If syncs fail with an authentication error, verify your token credentials:

1. Check that your Token ID starts with `ak-` and your Token secret starts with `as-`.
2. Confirm the token hasn't been revoked in [Modal settings](https://modal.com/settings).
3. Generate a new token if needed.

<TroubleshootingLink />
