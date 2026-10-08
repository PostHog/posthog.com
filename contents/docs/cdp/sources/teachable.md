---
title: Linking Teachable as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Teachable
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Teachable connector syncs your online school's data – users, courses, course enrollments, sales transactions, and pricing plans – into PostHog, so you can combine course sales and student progress with the rest of your analytics data.

## Prerequisites

- A Teachable school on the [Growth plan](https://teachable.com/pricing) or higher. Teachable only offers API access on these plans.
- Admin access to your school, to create an API key.

## Adding a data source

<SourceSetupIntro />

When linking Teachable, you'll need:

- **API key** – created in your Teachable school admin under **Settings > API**. See [Teachable's API documentation](https://docs.teachable.com/) for details.

## Sync modes

<SyncModes />

Only the `transactions` table supports incremental syncs, since Teachable's API can filter transactions by time. The other tables are synced with a full refresh on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – the API key is invalid or was revoked. Create a new key under **Settings > API** and update the source.
- **403 Forbidden** – your school's plan doesn't include API access. Teachable requires the Growth plan or higher.
- New sales can take up to two minutes to appear in Teachable's API, so a transaction made moments before a sync may only show up on the next run.

<TroubleshootingLink />
