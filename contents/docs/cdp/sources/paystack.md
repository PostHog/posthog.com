---
title: Linking Paystack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Paystack
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Paystack connector syncs your payments and billing data into PostHog, so you can analyze your transactions and revenue alongside your product data.

## Prerequisites

You need a Paystack account with access to its dashboard so you can retrieve your secret API key.

## Adding a data source

<SourceSetupIntro />

When linking Paystack, you'll need:

- **Secret API key** – find it (it starts with `sk_live_` or `sk_test_`) under **Settings → API Keys & Webhooks** in your [Paystack dashboard](https://dashboard.paystack.com/#/settings/developers). The key has read access to your integration's data.

## Sync modes

<SyncModes />

Paystack tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If authentication fails, check that your secret API key is valid.
- If access is denied, check that your secret API key has the required permissions.

<TroubleshootingLink />
