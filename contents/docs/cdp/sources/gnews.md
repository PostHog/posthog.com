---
title: Linking GNews as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GNews
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The GNews connector syncs articles, top headlines, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your GNews API key to pull worldwide news articles.

You can find your API key in your [GNews dashboard](https://gnews.io/dashboard).

The **Search query** drives the `articles` table (keyword search), and the **Category** drives the `top_headlines` table. GNews caps every query at 1000 articles, and free plans return fewer results per request with truncated content.

You'll be asked for:

- **API key**
- **Search query**: for example `posthog OR analytics`.
- **Category**: choose between General, World, Nation, Business, Technology, Entertainment, Sports, Science and Health.

## Sync modes

<SyncModes />

Some GNews tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
