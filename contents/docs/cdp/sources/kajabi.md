---
title: Linking Kajabi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kajabi
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, please [let us know](https://posthog.com/questions).

The Kajabi connector syncs your contacts, customers, purchases, offers, products, courses, orders, transactions, and tags into the PostHog data warehouse so you can analyze them alongside your product data.

## Prerequisites

You need a Kajabi account with access to the [Public API settings](https://developers.kajabi.com). Create a **User API Key** and give it read access to the tables you want to sync.

You also need your **Site ID**. Each Kajabi import is scoped to a single site.

## Adding a data source

<SourceSetupIntro />

When linking Kajabi, you'll need:

- **Client ID** – from your Kajabi User API Key.
- **Client secret** – from your Kajabi User API Key.
- **Site ID** – the ID of the Kajabi site you want to import data from.

PostHog authenticates with Kajabi using OAuth2 client credentials. No manual token management is needed after the initial setup.

## Sync modes

<SyncModes />

All Kajabi tables use full refresh sync. Each sync replaces the contents of the table so that updates and deletions to existing records are captured.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with a credentials error, your client ID or client secret is wrong. Create a new User API Key in Kajabi's Public API settings, then reconnect the source.
- If a table fails with a permission error, your API key doesn't have read access to that table. Update its permissions in Kajabi, then reconnect the source.
- If the connection fails with an HTTP error referencing your site ID, double-check the site ID and try again.

<TroubleshootingLink />
