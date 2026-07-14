---
title: Linking Baton as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Hellobaton
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Baton connector syncs your onboarding and implementation data into PostHog, so you can analyze customer onboarding alongside your product data.

## Prerequisites

You need a Baton (Hellobaton) account with API access. The API key inherits your account permissions, so it can read every record you can see.

## Adding a data source

<SourceSetupIntro />

When linking Baton, you'll need:

- **Company instance** – the subdomain of your Baton URL. For `yourcompany.hellobaton.com`, enter `yourcompany`.
- **API key** – generate one in Baton under the **API** section of your account settings.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
