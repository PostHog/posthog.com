---
title: Linking ActiveCampaign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ActiveCampaign
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The ActiveCampaign connector syncs your CRM and marketing data – contacts, accounts, deals, campaigns, lists, automations, and more – into PostHog.

## Prerequisites

You need an ActiveCampaign account with access to its API URL and account-wide API key, both available under **Settings > Developer**. The API key grants read access to every endpoint.

## Adding a data source

<SourceSetupIntro />

When linking ActiveCampaign, you'll need:

- **API URL** – found in your ActiveCampaign account under **Settings > Developer**. It looks like `https://youraccount.api-us1.com`.
- **API key** – the account-wide key shown alongside the API URL under **Settings > Developer**. It grants read access to every endpoint.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
