---
title: Linking Tremendous as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Tremendous
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Tremendous connector syncs your rewards and payouts data, such as orders, rewards, invoices, and campaigns, into the PostHog Data warehouse, so you can analyze your incentive programs alongside your product data.

## Prerequisites

You need a Tremendous account with access to create an API key. Tremendous has separate sandbox and production environments with separate API keys, and production API access must be approved by Tremendous first.

## Adding a data source

<SourceSetupIntro />

When linking Tremendous, you'll need:

- **Environment** – whether to sync from your **Production** or **Sandbox** Tremendous environment. Make sure the API key you provide matches the selected environment.
- **API key** – create an API key under **Team settings** → **Developers** in [Tremendous](https://www.tremendous.com).

## Sync modes

<SyncModes />

The `orders` table supports incremental syncs on the `created_at` field. All other tables are full refresh only, as the Tremendous API doesn't expose a server-side timestamp filter for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid, revoked, or for the wrong environment. Sandbox and production keys are not interchangeable — generate a key for the selected environment under **Team settings** → **Developers**, then reconnect.

<TroubleshootingLink />
