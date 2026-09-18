---
title: Linking Chargedesk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Chargedesk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The ChargeDesk connector syncs your billing and payments data into PostHog, so you can analyze charges, customers, and subscriptions alongside your product data.

## Prerequisites

You need a ChargeDesk account with API access enabled for the company you want to sync. Each company has its own secret key.

## Adding a data source

<SourceSetupIntro />

When linking Chargedesk, you'll need:

- **Secret API key** – create one in your ChargeDesk account under **Setup → API / Webhooks → Issue New Key**, and make sure API access is enabled for the company.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your secret API key is invalid or has been revoked, issue a new key in your ChargeDesk account (Setup → API / Webhooks), then reconnect.
- If your key does not have API access enabled, enable API access for the company in your ChargeDesk account, then reconnect.

<TroubleshootingLink />
