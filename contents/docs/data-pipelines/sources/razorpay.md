---
title: Linking Razorpay as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Razorpay
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Razorpay connector syncs your payments data – payments, orders, refunds, settlements, subscriptions, payment links, settlement reconciliation, and more – into PostHog, so you can analyze revenue and payment activity alongside your product data.

## Prerequisites

You need a Razorpay account and an API key pair (key ID and key secret). Razorpay issues separate key pairs for test mode (`rzp_test_`) and live mode (`rzp_live_`), so use a live-mode key to sync production data.

## Adding a data source

<SourceSetupIntro />

When linking Razorpay, you'll need:

- **Key ID** and **Key secret** – in your [Razorpay Dashboard](https://dashboard.razorpay.com/), go to **Account & Settings > API keys**, then generate or regenerate a key. Copy both the key ID and the key secret (the secret is only shown once, at generation time).

## Sync modes

<SyncModes />

Razorpay's API filters on creation time only, so incremental syncs pick up newly created records plus a short trailing window of recent ones. Status changes on older records (for example, a payment refunded weeks after it was created) are only captured by a full refresh, so consider an occasional full refresh on mutable tables like payments and settlements. Tables without a creation-time filter (disputes, invoices, payment links, and virtual accounts) sync as full refresh only.

The settlement reconciliation table (`SettlementRecon`) uses monthly pagination and supports incremental sync based on the `settled_at` watermark. It provides one row per settled payment, refund, transfer, or adjustment.

## Configuration

<SourceParameters />

## RazorpayX transactions

To sync RazorpayX bank ledger transactions, provide your **RazorpayX account number** in the source configuration. Find it in the RazorpayX Dashboard under **My Account & Settings** > **Banking**. Live mode and test mode use different numbers. The `RazorpayXTransactions` table won't appear in the schema picker until you enter this field.

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
