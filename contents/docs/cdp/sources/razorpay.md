---
title: Linking Razorpay as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
sourceId: Razorpay
---

import AlphaRelease from "../_snippets/alpha-release.mdx"
import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Razorpay connector syncs your payments data – payments, orders, refunds, settlements, subscriptions, and more – into PostHog, so you can analyze revenue and payment activity alongside your product data.

## Prerequisites

You need a Razorpay account and an API key pair (key ID and key secret). Razorpay issues separate key pairs for test mode (`rzp_test_`) and live mode (`rzp_live_`), so use a live-mode key to sync production data.

## Adding a data source

<SourceSetupIntro />

When linking Razorpay, you'll need:

- **Key ID** and **Key secret** – in your [Razorpay Dashboard](https://dashboard.razorpay.com/), go to **Account & Settings > API keys**, then generate or regenerate a key. Copy both the key ID and the key secret (the secret is only shown once, at generation time).

## Sync modes

<SyncModes />

Razorpay's API filters on creation time only, so incremental syncs pick up newly created records plus a short trailing window of recent ones. Status changes on older records (for example, a payment refunded weeks after it was created) are only captured by a full refresh, so consider an occasional full refresh on mutable tables like payments and settlements. Tables without a creation-time filter (disputes, invoices, and virtual accounts) sync as full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
