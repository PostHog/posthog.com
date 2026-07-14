---
title: Linking Judge.me Reviews as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JudgeMeReviews
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Judge.me Reviews connector syncs your Judge.me product reviews into PostHog, so you can analyze your reviews alongside your product data.

## Prerequisites

You need a Judge.me account with a private API token and your store's `myshopify.com` shop domain.

## Adding a data source

<SourceSetupIntro />

When linking Judge.me Reviews, you'll need:

- **Shop domain** – your store's `myshopify.com` domain (for example `example.myshopify.com`).
- **Private API token** – find it under **Settings → Integrations → Judge.me API** in the [Judge.me admin](https://judge.me). Use the private token, as the public token cannot read reviews.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If reviews fail to sync, confirm you are using the private API token rather than the public token, which cannot read reviews.

<TroubleshootingLink />
