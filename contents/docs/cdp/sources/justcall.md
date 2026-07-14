---
title: Linking JustCall as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JustCall
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The JustCall connector syncs your calls, texts, contacts, and phone numbers into PostHog, so you can analyze your communications alongside your product data.

## Prerequisites

You need a JustCall account with an API key and secret. The credentials have read access to your account's calls, texts, contacts, and phone numbers.

## Adding a data source

<SourceSetupIntro />

When linking JustCall, you'll need:

- **API key** – generate it under **Account Settings → Developers (APIs and Webhooks)** in your [JustCall dashboard](https://app.justcall.io/).
- **API secret** – the secret shown alongside the API key under **Account Settings → Developers (APIs and Webhooks)**.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
