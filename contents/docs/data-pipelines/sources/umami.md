---
title: Linking Umami as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Umami
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The [Umami](https://umami.is/) connector syncs websites, sessions, and events into the PostHog data warehouse, so you can analyze them alongside your product data. Both Umami Cloud and self-hosted Umami deployments are supported.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

- **Umami Cloud** – an API key created in your Umami Cloud settings.
- **Self-hosted Umami** – an API key, or a username and password with read access to the websites you want to import. Accounts with two-factor authentication must use an API key.

## Adding a data source

<SourceSetupIntro />

### Umami Cloud

1. Log in to your Umami Cloud dashboard.
2. Go to **Settings** and create an API key.
3. In PostHog, leave the **API URL** field empty (defaults to `https://api.umami.is/v1`). If your Cloud account uses a regional endpoint, enter `https://api.umami.is/v1/us` or `https://api.umami.is/v1/eu`.
4. Enter your **API key**.

### Self-hosted Umami

1. Find your Umami instance's URL (for example, `https://umami.example.com`). PostHog appends `/api` automatically if it isn't included.
2. In PostHog, enter the URL in the **API URL** field.
3. Enter either your **API key**, or your **Username** and **Password**.

You'll be asked for:

- **API URL** (optional) – leave empty for Umami Cloud. Use `https://api.umami.is/v1/us` or `https://api.umami.is/v1/eu` for regional Cloud URLs, or enter your self-hosted Umami URL.
- **API key** (optional) – create one in Umami settings. Leave empty to use a self-hosted username and password.
- **Username** (optional) – for self-hosted instances without an API key.
- **Password** (optional) – for self-hosted instances without an API key.

## Sync modes

<SyncModes />

All Umami tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key or credentials are wrong, expired, or have been revoked. Create new credentials, then reconnect the source.
- If a table syncs no rows, the account may not have access to any websites. Check your permissions in Umami, then reconnect the source.
- If the sync fails with a "capped results" error, Umami truncated the response. Increase the API result limit on your Umami server before syncing.
- If the sync fails with a "date range" error, the Umami server returned unexpected values. Check that your Umami version supports the [date range endpoint](https://docs.umami.is/docs/api-reference/get-website-date-range).
- Accounts with two-factor authentication enabled must use an API key. Username and password authentication doesn't support two-factor authentication.

<TroubleshootingLink />
