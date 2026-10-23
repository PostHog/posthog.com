---
title: Linking Freshservice as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Freshservice
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Freshservice connector syncs your ITSM data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Freshservice account, your domain (the subdomain in your Freshservice URL), and your API key.

## Adding a data source

<SourceSetupIntro />

When linking Freshservice, you'll need:

- **Freshservice domain** – the subdomain in your Freshservice URL, e.g. `acme` for `acme.freshservice.com`.
- **API key** – found on your Freshservice profile settings page. Click your profile picture → **Profile settings**; the API key is shown in the right sidebar.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
