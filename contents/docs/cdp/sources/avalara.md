---
title: Linking Avalara AvaTax as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Avalara
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Avalara AvaTax connector syncs companies, transactions, nexus, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Avalara AvaTax account to pull tax transactions, companies, nexus, customers and exemption certificates.

Use your AvaTax account ID and a license key (found under Settings > License and API Keys). Generating a new license key immediately revokes the previous one. Sandbox and production credentials only work against their matching environment, so pick the one your account was created in.

You'll be asked for:

- **Environment**: choose between Production and Sandbox.
- **Account ID**
- **License key**

## Sync modes

<SyncModes />

All Avalara AvaTax tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the license key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
