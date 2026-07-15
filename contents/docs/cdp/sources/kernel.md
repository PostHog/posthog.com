---
title: Linking Kernel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kernel
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Kernel](https://www.onkernel.com) provides cloud browser infrastructure for running browser-automation apps and agents. This connector syncs your Kernel apps, deployments, invocations, browser sessions, and profiles into the PostHog Data warehouse, so you can track your browser-automation activity alongside the rest of your data.

## Prerequisites

- A Kernel account.
- A Kernel API key, which you can create in your [Kernel dashboard](https://dashboard.onkernel.com) under **API keys**. Keys are long-lived and grant organization-wide read access. They start with `sk_`.

## Adding a data source

<SourceSetupIntro />

When linking Kernel, you'll need:

- **API key** – create one under **API keys** in your [Kernel dashboard](https://dashboard.onkernel.com). It starts with `sk_` and grants organization-wide read access.

## Sync modes

<SyncModes />

Every Kernel table is full refresh only for this alpha release. Kernel documents a `since` filter on some endpoints, but it isn't yet used for incremental syncs, so each run reloads the full table.

> **Note:** For your security, credential-bearing fields are stripped before rows land in the warehouse. App and deployment environment variables, and the CDP, WebDriver, and live-view URLs on browser sessions (which embed short-lived access tokens) are not imported.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your [Kernel dashboard](https://dashboard.onkernel.com), then reconnect.
- If some tables sync but others don't, your key may lack access to those resources. The source still connects so you can sync the tables the key can reach.

<TroubleshootingLink />
