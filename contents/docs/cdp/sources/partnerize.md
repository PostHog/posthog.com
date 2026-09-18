---
title: Linking Partnerize as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Partnerize
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Partnerize connector syncs your partnership and affiliate marketing data – campaigns, conversions, clicks, and reference catalogs – into PostHog, so you can join partner-driven revenue with your product analytics.

## Prerequisites

You need a Partnerize partner (publisher) account with API access.
The API credentials are available to account users under **Account settings** in the [Partnerize platform](https://console.partnerize.com).

## Adding a data source

<SourceSetupIntro />

The connector needs three values:

1. **User application key** and **User API key**: both are shown under **Account settings** in the Partnerize platform. They are used together as the username and password for the API.
2. **Publisher ID**: the ID of the partner account whose campaigns, conversions, and clicks you want to sync.

## Sync modes

<SyncModes />

The `conversions` and `clicks` tables support incremental syncs using Partnerize's report date filters.
For `conversions`, choosing `last_modified` as the incremental field also picks up status changes (for example pending to approved) on previously synced conversions, so it is the recommended cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect, check that the user application key and user API key are copied exactly from Account settings, and that the publisher ID belongs to an account your user can access.

<TroubleshootingLink />
