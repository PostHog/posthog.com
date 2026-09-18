---
title: Linking Concord as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Concord
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Concord connector pulls your contract lifecycle data into the PostHog Data warehouse, so you can analyze your contracts alongside your product data.

## Prerequisites

You need a Concord account on a paid plan so you can generate an API key.

## Adding a data source

<SourceSetupIntro />

When linking Concord, you'll need:

- **API key** – generate one in your Concord account settings (API key generation requires a paid plan). Concord sends it as an `X-API-KEY` header.
- **Environment** – choose Production or Sandbox to match the Concord environment your API key belongs to.
- **Organization ID** – optional. Leave it blank to use the first organization your API key can access.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Generate a new key in your Concord account settings, then reconnect.
- If a table fails with a permission error, your key may be missing the required access. The events log requires the Administrator role. Adjust the key's access, then reconnect.

<TroubleshootingLink />
