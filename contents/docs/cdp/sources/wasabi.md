---
title: Linking Wasabi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wasabi
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Wasabi connector syncs sub-account, usage, and billing data from the [Wasabi Account Control API (WACA)](https://docs.wasabi.com/apidocs/account-control-api) into PostHog – sub-accounts, daily storage and data-transfer utilizations (account-level and per-bucket), and sub-account invoices. Use it to track storage spend and usage per sub-account or bucket alongside your product and revenue data.

This connector talks to the Account Control API for Wasabi Control Accounts (partners managing sub-accounts). It does not read objects from your Wasabi buckets – to import files stored in Wasabi, use the S3-compatible bucket options on our [S3 source](/docs/cdp/sources/s3) instead.

## Prerequisites

You need a Wasabi Control Account with Wasabi Account Control API access enabled, and a WACA API key. API access is enabled by Wasabi on request – contact [Wasabi Sales](mailto:sales@wasabi.com) if it isn't active on your account yet.

## Adding a data source

<SourceSetupIntro />

When linking Wasabi, you'll need an **API key**: generate one from your Wasabi Control Account following [Wasabi's guide to generating an Account Control API key](https://docs.wasabi.com/apidocs/rotation-keys).

## Sync modes

<SyncModes />

The `utilizations` and `bucket_utilizations` tables support incremental syncs on `StartTime` – Wasabi computes utilization metrics daily, so each incremental run only fetches days at or after the last synced day. The `accounts` and `sub_account_invoices` tables are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If syncs fail with a permissions error, check that Wasabi Account Control API access is enabled on your Control Account and that the API key is still valid – Wasabi returns a `403 Forbidden` response for invalid or revoked keys.

<TroubleshootingLink />
