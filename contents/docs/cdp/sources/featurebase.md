---
title: Linking Featurebase as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Featurebase
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Featurebase connector syncs your customer feedback data – posts, boards, comments, upvoters, changelogs, companies, and contacts – into the PostHog Data warehouse, so you can rank feature demand and join feedback against your product usage data.

## Prerequisites

You need a Featurebase account with access to create an API key. API keys are managed in the Featurebase dashboard.

## Adding a data source

<SourceSetupIntro />

When linking Featurebase, you'll need:

- **API key** – create one in your Featurebase dashboard under **Settings** → **API**.

## Sync modes

<SyncModes />

Posts, comments, and changelogs support incremental sync. Everything else syncs via full refresh.

The `post_voters` table is off by default because it makes one request chain per post – enable it when you want to join upvoters against companies and contacts to rank feature demand by customer.

## Webhooks

PostHog automatically registers a [Featurebase webhook](https://developers.featurebase.app/guides/webhooks) for you using your API key, including its signing secret, so post, comment, and changelog changes stream into the warehouse in real time between scheduled syncs after the initial backfill completes.

Featurebase caps the number of webhooks per organization (10 by default). If registration fails because you're at the cap, remove an unused webhook in Featurebase under **Settings** → **Webhooks**, or set the webhook up manually using the URL PostHog shows and paste its signing secret into the source configuration.

Deleted posts and comments aren't removed by webhooks – run a full refresh to reconcile deletions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an `Invalid API Key` error, your API key is invalid or has been revoked. Create a new key in your Featurebase dashboard under **Settings** → **API**, then reconnect.

<TroubleshootingLink />
