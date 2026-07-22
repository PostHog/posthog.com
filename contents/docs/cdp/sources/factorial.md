---
title: Linking Factorial as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Factorial
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Factorial connector syncs your HR, time-off, attendance, payroll, and recruiting data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Factorial account with access to create an API key that has read access to your company's data.

## Adding a data source

<SourceSetupIntro />

When linking Factorial, you'll need:

- **API key** – create an API key in your Factorial account under **Settings > API keys** (or **Integrations > Public API**). The key grants read access to your company's data across every supported table.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid or revoked key error, create a new key in your Factorial account settings, then reconnect.
- If access is denied, check the key's permissions, then reconnect.

<TroubleshootingLink />
