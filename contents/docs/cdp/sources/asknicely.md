---
title: Linking AskNicely as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Asknicely
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The AskNicely connector syncs your survey response history – NPS, CSAT, and 5-star scores, comments, and contact details – into PostHog, so you can join satisfaction data with product usage and revenue data.

## Prerequisites

You need an AskNicely account with API access. Your API key is available in AskNicely under **Settings > API**.

## Adding a data source

<SourceSetupIntro />

When linking AskNicely, you'll need:

- **Account subdomain** – the first part of your AskNicely URL. If you sign in at `https://yourcompany.asknice.ly`, the subdomain is `yourcompany`.
- **API key** – found in your AskNicely account under **Settings > API**.

## Sync modes

<SyncModes />

For the `responses` table, we recommend incremental sync on the `responded` field: each sync then only fetches responses received since the previous one.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
