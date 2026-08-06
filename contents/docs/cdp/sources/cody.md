---
title: Linking Cody as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cody
beta: true
---

import AlphaRelease from "../_snippets/alpha-release.mdx"
import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Cody connector syncs your team's Sourcegraph Analytics data into the PostHog Data warehouse: per-user usage reports for Cody and Code Search (chats, completions, acceptance rates, searches, code navigation) plus credit consumption. Use it to analyze AI coding assistant adoption and seat utilization alongside your product data.

## Prerequisites

- Cody and Sourcegraph Analytics are available to **Sourcegraph Enterprise** customers.
- Your Sourcegraph account needs access to [Sourcegraph Analytics](https://analytics.sourcegraph.com) for your instance. If you can't sign in there, ask your Sourcegraph contact to link your account to your instance's usage metrics.

## Adding a data source

<SourceSetupIntro />

You need two values to connect:

- **Instance URL** – your Sourcegraph instance's host, e.g. `example.sourcegraphcloud.com`.
- **Access token** – create one on the [Sourcegraph Analytics access tokens page](https://analytics.sourcegraph.com/access-tokens). Tokens are long-lived with an optional expiry.

## Sync modes

<SyncModes />

All Cody tables currently sync as **full refresh**. Sourcegraph refreshes analytics data about once an hour, so recent activity can take up to an hour to appear in a sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Your Sourcegraph Analytics access token is invalid or has expired"** – create a new token on the [access tokens page](https://analytics.sourcegraph.com/access-tokens) and update the source.
- **Empty tables** – check that the instance URL matches your Sourcegraph instance's host exactly, and that usage telemetry is enabled on your instance (self-hosted instances need Sourcegraph 5.9 or later with telemetry fully enabled).

<TroubleshootingLink />
