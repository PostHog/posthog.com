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
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Appfigures connector syncs your app-store analytics – products, reviews, and sales and revenue reports – into PostHog, so you can analyze your mobile app performance alongside your product data.

## Prerequisites

You need an Appfigures account with access to the developer portal so you can create an API client and Personal Access Token.

## Adding a data source

<SourceSetupIntro />

When linking Appfigures, you'll need:

- **Personal access token** – create an API client and Personal Access Token at [appfigures.com/developers/keys](https://appfigures.com/developers/keys). When creating the client, grant the data sets you want to sync: `products:read` for products, `public:read` for reviews, and `private:read` for sales and revenue reports.

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
