---
title: Linking Appfigures as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appfigures
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Appfigures connector syncs your app-store analytics, including products, reviews, sales, revenue, usage, estimates, featured placements, and events, into PostHog, so you can analyze your mobile app performance alongside your product data.

## Prerequisites

You need an Appfigures account with access to the developer portal so you can create an API client and Personal Access Token.

## Adding a data source

<SourceSetupIntro />

When linking Appfigures, you'll need:

- **Personal access token**: create an API client and Personal Access Token at [appfigures.com/developers/keys](https://appfigures.com/developers/keys). When creating the client, grant the data sets you want to sync: `products:read` for products; `public:read` for reviews, ranks, ratings reports, featured placements, ASO keywords, and ASO stats; `private:read` for sales, revenue, subscriptions, ads, ad spend, payments, and usage reports; and `account:read` for events.
- **Estimate product IDs (optional)**: enter comma-separated Appfigures product IDs for the `estimates_report` table, including competitor apps. If left blank, the table covers your own apps.

The `estimates_report` table is off by default because it requires an Appfigures license that includes download and revenue estimates. The `featured` table is off by default because it requires the Public Data API add-on and spends partner credits per product.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid or expired token error, create a new Personal Access Token in your Appfigures developer settings, then reconnect.
- If a table fails with a missing scope error, grant the required data sets to your API client, then reconnect.

<TroubleshootingLink />
