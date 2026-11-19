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

The Appfigures connector syncs your app-store analytics – products, reviews, ranks, featured placements, in-app usage, download and revenue estimates, and sales and revenue reports – into PostHog, so you can analyze your mobile app performance alongside your product data.

## Prerequisites

You need an Appfigures account with access to the developer portal so you can create an API client and Personal Access Token.

## Adding a data source

<SourceSetupIntro />

When linking Appfigures, you'll need:

- **Personal access token** – create an API client and Personal Access Token at [appfigures.com/developers/keys](https://appfigures.com/developers/keys). When creating the client, grant the data sets you want to sync:
  - `products:read` for products
  - `public:read` for reviews, ranks, the ratings report, featured placements, and ASO keywords and stats
  - `private:read` for the sales, revenue, subscriptions, ads, ad spend, payments, and usage reports
  - `account:read` for events (the timeline markers that you add in Appfigures)

The estimates report and the featured table do not sync by default. The estimates report needs an Appfigures plan that includes download and revenue estimates. The featured table needs the Appfigures Public Data API add-on.

To get estimates for apps that you do not own, such as competitor apps, enter their Appfigures product IDs, comma-separated, in **Estimate product IDs**. If you leave this field blank, the estimates report covers your own apps.

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
