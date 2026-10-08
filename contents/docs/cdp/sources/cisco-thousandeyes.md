---
title: Linking Cisco ThousandEyes as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Thousandeyes
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Cisco ThousandEyes connector syncs network and application monitoring data – tests, agents, alert rules, alerts, and HTTP server results – into the PostHog Data warehouse, so you can correlate network performance with your product analytics.

## Prerequisites

- A Cisco ThousandEyes account with API access.
- Permission to create a User API Token in ThousandEyes.

## Adding a data source

<SourceSetupIntro />

When linking Cisco ThousandEyes, you'll need:

- **API token** – create one in **Manage** > **Account Settings** > **Users and Roles** > **Profile** > **User API Tokens**.
- **Account group ID** (optional) – if your account has multiple account groups, provide the ID to sync data from a specific group. Leave blank to use your default account group.

## Sync modes

<SyncModes />

The `http_server_results` table supports incremental sync on the `date` field. All other tables are full refresh only since they represent current state rather than historical data.

## Syncing data

### Data history

- Alerts and initial HTTP server results cover the last **30 days**.
- Incremental syncs have a maximum lookback of 30 days.
- Sync at least every 30 days to avoid gaps in your data.
- Incremental syncs re-read the last 5 minutes to capture late-arriving measurements.

### HTTP server results

Only live HTTP Server tests are synced. Saved events and other test result types are not included. Each result row is keyed by a combination of `testId`, `agentId`, and `roundId`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"ThousandEyes rejected the API token"** – your token may be invalid, expired, or revoked. Create a new token in **Manage** > **Account Settings** > **Users and Roles** > **Profile** > **User API Tokens**, then reconnect.
- **"ThousandEyes denied access"** – check that your token has the required permissions and that the account group ID (if specified) is correct.
- **Missing recent data** – ensure you're syncing at least every 30 days. The ThousandEyes API only returns data from the last 30 days.
- **HTTP results missing for a test** – only live HTTP Server tests are synced. Saved events, scheduled tests, and other test types don't appear in the `http_server_results` table.

<TroubleshootingLink />
