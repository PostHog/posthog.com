---
title: Linking Dub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dub
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Dub connector syncs your link attribution data from [Dub](https://dub.co) into PostHog: short links, click, lead, and sale events, customers, tags, domains, folders, and your partner program's partners, commissions, and payouts.
This lets you join link and affiliate performance with the rest of your product analytics.

## Prerequisites

You need a Dub workspace and a workspace API key.
Some tables need more than the free plan:

- The `click_events`, `lead_events`, and `sale_events` tables require a Dub [Business plan](https://dub.co/pricing) or higher.
- The `payouts` table requires a Business partner program plan or higher.
- The `partners` and `commissions` tables require a [Dub Partners](https://dub.co/partners) program.

Tables your plan can't access show a permission note in the schema picker, so you can leave them unselected.

## Adding a data source

<SourceSetupIntro />

When linking Dub, you'll need:

- **Workspace API key**: create one in your [Dub workspace](https://app.dub.co) under **Settings** > **API Keys**. The key starts with `dub_` and is scoped to a single workspace.

## Sync modes

<SyncModes />

The event tables (`click_events`, `lead_events`, `sale_events`) support incremental syncs on the event timestamp, which we recommend since events are append-only.
All other tables sync as full refresh: the Dub API has no updated-since filter for them, and entities like commissions change status after creation, so a full reload keeps them accurate.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with a permission error, check your Dub plan: event and payout tables need a Business plan or higher, and partner tables need a partner program.
Disable syncing for tables your plan doesn't include.

<TroubleshootingLink />
