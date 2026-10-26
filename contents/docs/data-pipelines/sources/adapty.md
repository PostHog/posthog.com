---
title: Linking Adapty as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Adapty
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This connector is in alpha. Features and table schemas may change.

The Adapty connector syncs your mobile subscription analytics and paywalls into the PostHog data warehouse, so you can analyze in-app purchase revenue, subscriptions, retention, and funnels alongside your product data.

## Prerequisites

You need an Adapty account with a secret API key for the app you want to sync. A secret key (starting with `secret_live_` or `secret_test_`) is required – public SDK keys don't work.

## Adding a data source

<SourceSetupIntro />

When linking Adapty, you'll need:

- **Secret API key** – in your Adapty dashboard, go to **App settings** > **API keys** and copy your secret API key. It starts with `secret_live_` (production) or `secret_test_` (sandbox).
- **Report start date** – the earliest date to pull reports from, in `YYYY-MM-DD` format. All reports refresh from this date on each sync. Earlier dates require more API requests.

## Sync modes

All Adapty tables use **full refresh**. Historical aggregates can change after renewals and refunds, so PostHog re-downloads all data on each sync.

Reports use UTC dates and exclude the current day.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Synced tables

The Adapty connector syncs the following tables:

| Table       | Description                                                                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Analytics   | Daily analytics across 19 charts including revenue, MRR, ARR, ARPPU, active/new/cancelled/expired subscriptions and trials, grace period, billing issues, refunds, non-subscriptions, ARPU, and installs. One row per chart and metric. |
| Cohorts     | Daily revenue cohort reports with renewal values preserved in nested data.                                                                                                                                                              |
| Conversions | Daily conversion reports from the first paid period through 6+ months.                                                                                                                                                                  |
| Funnels     | Daily funnel reports with absolute and relative values for each step.                                                                                                                                                                   |
| LTV         | Daily lifetime value reports for revenue, proceeds, and net revenue with nested renewal values.                                                                                                                                         |
| Retention   | Daily subscription retention reports without the trial step.                                                                                                                                                                            |
| Paywalls    | Paywalls configured in your app, including products, state, and deletion status.                                                                                                                                                        |

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new secret API key in your Adapty dashboard under **App settings** > **API keys**, then reconnect.
- If you see a permissions error, ensure you're using a secret API key (not a public SDK key) with the correct app permissions.
- If the start date is rejected, check that it's in `YYYY-MM-DD` format and is before today.

<TroubleshootingLink />
