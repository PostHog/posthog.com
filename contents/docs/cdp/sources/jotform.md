---
title: Linking Jotform as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Jotform
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Jotform connector syncs your forms and submissions into PostHog, so you can analyze your form responses alongside your product data.

## Prerequisites

You need a Jotform account so you can create an API key. A read-only key is enough.

## Adding a data source

<SourceSetupIntro />

When linking Jotform, you'll need:

- **API key** – create one in your [Jotform API settings](https://www.jotform.com/myaccount/api). A read-only key is enough.
- **Region** – pick the region that matches where your Jotform account is hosted (US, EU, or HIPAA).
- **Enterprise domain (optional)** – for Jotform Enterprise, leave the region as US and enter your Enterprise domain here instead.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid or has been revoked, create a new key in your Jotform API settings, then reconnect.
- If your API key does not have permission to read some data, grant it read access in your Jotform API settings, then reconnect.

<TroubleshootingLink />
