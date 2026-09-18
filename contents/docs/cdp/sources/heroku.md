---
title: Linking Heroku as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Heroku
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Heroku connector syncs your apps, releases, builds, dynos, add-ons, and other Heroku platform data into PostHog, so you can analyze your deploy history, dyno formations, and add-on spend alongside your product data.

## Prerequisites

You need a Heroku account and an API key. Any Heroku user can generate one, no special account tier is required.

## Adding a data source

<SourceSetupIntro />

When linking Heroku, you'll need:

- **API key** – find it in your [Heroku account settings](https://dashboard.heroku.com/account) under **API Key**, or create a long-lived token with the Heroku CLI: `heroku authorizations:create`.

## Sync modes

<SyncModes />

Heroku's API doesn't support filtering records by when they changed, so every table syncs as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

A few tables only apply to certain accounts:

- **invoices** covers your personal Heroku account. Team invoices aren't included.
- **teams** only returns data for accounts that belong to Heroku Teams or Enterprise.
- **dynos** is a point-in-time snapshot of the processes running when the sync happened.

## Troubleshooting

- If your API key is invalid or has been revoked, generate a new key in your Heroku account settings, then reconnect.
- Heroku rate limits API usage to 4,500 requests per hour per account. Syncs back off and retry automatically, but if other tools share the same account's quota, a sync can take longer than usual.

<TroubleshootingLink />
