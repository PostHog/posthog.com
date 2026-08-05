---
title: Linking Ticket Tailor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TicketTailor
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Ticket Tailor connector syncs your event ticketing data – events, orders, issued tickets, check-ins, discounts, products, vouchers, and memberships – into PostHog.

## Prerequisites

You need a Ticket Tailor box office and an API key. API keys are scoped to a single box office, so connect one source per box office you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Ticket Tailor, you'll need:

- **API key** – create one under **Settings → API** in your [Ticket Tailor](https://www.tickettailor.com) box office. API keys are scoped to a single box office, so connect one source per box office you want to sync.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If authentication fails, create a new API key under **Settings → API** in your box office, then reconnect.

<TroubleshootingLink />
