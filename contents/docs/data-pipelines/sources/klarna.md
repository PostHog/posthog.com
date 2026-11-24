---
title: Linking Klarna as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Klarna
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Klarna connector syncs your settlement data – payouts, transactions, and disputes – into PostHog, so you can reconcile payments, track chargebacks, and analyze revenue alongside your product data.

## Prerequisites

You need a Klarna merchant account with access to the [Merchant Portal](https://portal.klarna.com/) to create an API key. The key needs read access to the [Settlements API](https://docs.klarna.com/acquirer/klarna/api/settlements/). To sync disputes, the key also needs access to the [Disputes API v4](https://docs.klarna.com/acquirer/klarna/api/disputes-api-v4/), which requires separate merchant enrollment.

## Adding a data source

<SourceSetupIntro />

When linking Klarna, you'll need:

- **API key** – create one in your [Klarna Merchant Portal](https://portal.klarna.com/). Grant the key read access to the Settlements API. For disputes, also grant access to the Disputes API.
- **Username (optional)** – for HTTP Basic authentication, enter the UUID supplied with your API key.
- **Region** – select the region for your merchant account: Europe, North America, or Oceania.
- **Environment** – choose Live for production data or Playground for testing.

## Sync modes

<SyncModes />

The `payouts` and `transactions` tables are full refresh only. The Settlements API does not expose filters for incremental syncing, so each sync reloads all data.

The `disputes` table supports incremental sync on the `updated_at` or `created_at` fields. This lets you sync only new or changed disputes instead of reloading everything.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 error:** Klarna rejected your credentials. Reactivate or replace the key in the Merchant Portal.
- **403 error:** Klarna denied access. For payouts and transactions, check that your credentials can read settlements in the selected region. For disputes, verify that your merchant account is [enrolled in the Disputes API v4](https://docs.klarna.com/acquirer/klarna/after-payments/disputes/migration-guide/) and your key has read access.

<TroubleshootingLink />
