---
title: Linking Whop as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Whop
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Whop connector syncs memberships, payments, members, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Whop company to sync payments, memberships, members, products, promo codes, invoices, refunds, disputes, payouts, financial activity, variants, transfers, reviews, and courses. Create a company API key in the [Developer tab](https://whop.com/dashboard/developer) of your Whop dashboard.

You'll be asked for:

- **API key**: create a company API key in the [Developer tab](https://whop.com/dashboard/developer) of your Whop dashboard. Grant it read access to the resources you want to sync: `company:basic:read`, `member:basic:read`, `payment:basic:read`, `access_pass:basic:read`, `plan:basic:read`, `promo_code:basic:read`, `invoice:basic:read`, `social_account:read`, `payout:withdrawal:read`, `company:balance:read`, `payout:transfer:read`, and `courses:read`, plus `developer:manage_webhook` if you want PostHog to register the webhook for you.
- **Company ID**: the ID of the Whop company to sync, shown in your Whop dashboard URL.

The `payouts`, `financial_activity`, `variants`, `transfers`, `reviews`, and `courses` tables are available on API versions `2026-10-13-1` and `2026-10-29-8`. They aren't available on the `2025-01-01` pin.

## Sync modes

<SyncModes />

Some Whop tables sync incrementally; tables without a supported time filter use full refresh. The `financial_activity` table syncs incrementally on `posted_at`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
