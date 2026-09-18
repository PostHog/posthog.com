---
title: Linking PartnerStack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PartnerStack
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The PartnerStack connector syncs your partner program data – partnerships, customers, deals, and leads – into the PostHog Data warehouse, so you can analyze your partner ecosystem alongside your product data.

## Prerequisites

You need a PartnerStack account with access to the Vendor API. You'll need your **public key** and **private key**, which you can find under **Settings → Integrations → PartnerStack API Keys** in [PartnerStack](https://dash.partnerstack.com/).

## Adding a data source

<SourceSetupIntro />

When linking PartnerStack, you'll need:

- **Public key** – your PartnerStack Vendor API public key.
- **Private key** – your PartnerStack Vendor API private key.

Both keys are found under **Settings → Integrations → PartnerStack API Keys** in the [PartnerStack dashboard](https://dash.partnerstack.com/).

## Sync modes

<SyncModes />

All PartnerStack tables are full refresh only, since the API does not support reliable incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authentication error, your PartnerStack API keys may be invalid or have been revoked. Generate a new key pair under **Settings → Integrations → PartnerStack API Keys** in PartnerStack, then reconnect.
- If you get a permission error, your PartnerStack API keys don't have access to the requested data. Check the keys' permissions, then reconnect.

<TroubleshootingLink />
