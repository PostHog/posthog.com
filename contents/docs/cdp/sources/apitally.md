---
title: Linking Apitally as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Apitally
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Apitally connector syncs your API monitoring and analytics data — apps, consumers, endpoints, traffic metrics, and request logs — into the PostHog Data warehouse, so you can analyze API performance alongside your product data.

## Prerequisites

You need an Apitally account on the **Premium plan**, which includes API access. If you're on a lower tier, you'll need to upgrade before connecting.

## Adding a data source

<SourceSetupIntro />

When linking Apitally, you'll need:

- **API key** – create a team-scoped API key in your Apitally team settings under **API keys**.

## Sync modes

<SyncModes />

The `Traffic` table supports incremental syncs on the `period_end` field, and `RequestLogs` supports incremental syncs on the `timestamp` field. All other tables (`Apps`, `Consumers`, `Endpoints`) are full refresh only, as the Apitally API doesn't expose a server-side timestamp filter for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a **401** authentication error, your API key is invalid or has been revoked. Generate a new key in your Apitally team settings under **API keys**, then reconnect.
- If you see a **403** access denied error, your Apitally plan doesn't include API access. Upgrade to the Premium plan to enable it.

<TroubleshootingLink />
