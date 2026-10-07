---
title: Linking Arcade as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Arcade
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Arcade connector syncs data from your [Arcade](https://arcade.software) interactive demo platform into the PostHog data warehouse, so you can analyze demo engagement alongside your product data.

## Prerequisites

- An **Arcade Enterprise** workspace. API access isn't available on other plans.
- An API key created in **Settings > Advanced** in your Arcade dashboard.
- The API key needs different permissions depending on which tables you sync:

| Tables                             | Required permission                          |
| ---------------------------------- | -------------------------------------------- |
| `teams`, `users`                   | **User provisioning** enabled on the API key |
| `flow_engagement`, `company_leads` | **Insights** access enabled on the API key   |

## Adding a data source

<SourceSetupIntro />

You need the following to connect Arcade:

- **API key** – create one in your Arcade dashboard under **Settings > Advanced**.

- **Arcade team ID** – the ID of the team you want to sync. You can find this from Arcade's `GET /teams` API response. See the [Arcade REST API docs](https://docs.arcade.software/kb/leverage/advanced-features/rest-api) for details.

- **Engagement start date** – a date in `YYYY-MM-DD` format. Flow engagement data syncs totals from this date through the time of each sync.

## Sync modes

<SyncModes />

All Arcade tables use full refresh. Each sync replaces the contents of the table. Arcade's aggregate date filters don't provide a reliable row modification cursor, so incremental syncing isn't supported.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication error** – Arcade rejected your API key. Create a new key in **Settings > Advanced** in your Arcade dashboard, then reconnect the source.

- **Plan error** – Arcade API access requires an Enterprise workspace. Check your plan with Arcade.

- **Permission error for teams or users** – Enable **User provisioning** on your Arcade API key, then reconnect.

- **Permission error for engagement data** – Enable **Insights** access on your Arcade API key, then reconnect.

- **Rate limiting** – Arcade limits requests to 100 per minute per IP. The connector handles retries and `Retry-After` headers automatically.

<TroubleshootingLink />
