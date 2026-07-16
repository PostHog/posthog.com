---
title: Linking Plaid as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Plaid
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Plaid connector syncs the accounts and transactions of a linked Plaid Item into PostHog, so you can analyze financial data alongside your product data.

## Prerequisites

You need a Plaid account with access to the [Plaid dashboard](https://dashboard.plaid.com/developers/keys) and an access token for the Item you want to sync. The access token is obtained when a user completes Plaid Link, and each token identifies one linked Item (institution connection).

## Adding a data source

<SourceSetupIntro />

When linking Plaid, you'll need:

- **Environment** – choose **Production** or **Sandbox** to match the environment your credentials belong to. Credentials only work against their own environment.
- **Client ID** – found in the [Plaid dashboard](https://dashboard.plaid.com/developers/keys).
- **Secret** – found alongside the client ID in the Plaid dashboard.
- **Access token** – identifies one linked Item, obtained when a user completes Plaid Link. Add one source per Item.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
