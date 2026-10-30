---
title: Linking AirOps as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AirOps
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[AirOps](https://www.airops.com) is a platform for building AI workflows and agents. This connector syncs your AirOps apps and their executions into the PostHog Data warehouse, so you can analyze how your workflows run – credit usage, runtimes, feedback, and error rates – alongside the rest of your product data.

## Prerequisites

- An AirOps workspace.
- A workspace API key, which you can create in your [AirOps workspace settings](https://app.airops.com). Regenerating the key immediately invalidates the previous one.

## Adding a data source

<SourceSetupIntro />

When linking AirOps, you'll need:

- **API key** – create a workspace API key in your [AirOps workspace settings](https://app.airops.com). Regenerating a key immediately invalidates the previous one, so update the source if you rotate it.

## Sync modes

<SyncModes />

AirOps' list endpoints don't expose a server-side timestamp filter, and executions keep mutating after they're created (status transitions, feedback), so every table syncs with full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been regenerated. Create a new workspace API key in your AirOps settings, then reconnect.
- If a connection validates but returns no data, confirm the key's workspace has apps and executions and that the key has permission to read them.

<TroubleshootingLink />
