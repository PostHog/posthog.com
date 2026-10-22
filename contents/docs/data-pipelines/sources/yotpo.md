---
title: Linking Yotpo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Yotpo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Yotpo connector syncs your review and email marketing data – product reviews, email analytics, raw email delivery records, and unsubscribers – into PostHog, so you can analyze customer feedback and email engagement alongside your product data.

## Prerequisites

You need a Yotpo account with API access. You'll need your **app key** (also called the store ID) and an **API secret**. Both are available in your [Yotpo account settings](https://settings.yotpo.com/#/general_settings).

## Adding a data source

<SourceSetupIntro />

When linking Yotpo, you'll need:

- **App key (store ID)** – your Yotpo app key, found in your Yotpo account settings under **General Settings**.
- **API secret** – your Yotpo API secret, found in the same settings page.
- **Start date for email data** – a date in `YYYY-MM-DD` format. Email tables (`email_analytics` and `raw_data`) sync data from this date onward. Reviews and unsubscribers sync all available records regardless of this setting.

## Sync modes

<SyncModes />

All Yotpo tables use **full refresh** syncing. Incremental and append-only syncing are not supported because the Yotpo API does not provide reliable timestamp filters or unique keys across all endpoints.

This means every sync re-downloads all data for each table. For the `email_analytics` and `raw_data` tables, the configured start date limits how far back data is fetched.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### "Yotpo rejected the app key or API secret"

Your credentials are incorrect. Double-check your app key and API secret in your [Yotpo account settings](https://settings.yotpo.com/#/general_settings), then reconnect.

### "Yotpo did not return an access token"

The API accepted your credentials but didn't return a token. Verify your API credentials are correct and your Yotpo account has API access enabled, then reconnect.

### 401 or "access token is invalid or expired"

Your access token has expired or been revoked. Check your credentials and reconnect.

### 403 or "denied access to this table"

Your Yotpo account doesn't have permission to access this endpoint. Check your account's API access level.

### Invalid start date

The start date must be in `YYYY-MM-DD` format and cannot be in the future.

<TroubleshootingLink />
