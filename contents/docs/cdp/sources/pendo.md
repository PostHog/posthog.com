---
title: Linking Pendo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pendo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Pendo connector syncs your Pendo product data – features, pages, guides, visitors, and accounts – into PostHog, so you can analyze product engagement alongside your other data.

## Prerequisites

You need a Pendo integration key, which only Pendo admins can create and view. You'll also need to know which data region your subscription uses (US, US1, EU, Japan, or Australia), since the key is specific to that region.

## Adding a data source

<SourceSetupIntro />

When linking Pendo, you'll need:

- **Integration key** – create one in Pendo under **Settings > Integrations > Integration Keys**. Only Pendo admins can view these.
- **Data region** – select the region that matches the domain you log in with (US, US1, EU, Japan, or Australia). The integration key is scoped to a single region.

## Sync modes

<SyncModes />

Every Pendo table is full refresh only. Pendo's list endpoints expose no server-side timestamp filter, and the aggregation endpoint's time filters apply only to event sources, not the visitor and account metadata this source pulls.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
