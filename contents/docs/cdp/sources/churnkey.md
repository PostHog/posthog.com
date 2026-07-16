---
title: Linking Churnkey as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Churnkey
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Churnkey connector pulls your cancel-flow session data into the PostHog Data warehouse, so you can analyze churn, retention, and cancellation behavior alongside your product data.

## Prerequisites

You need a Churnkey account and a Data API key. The Data API key is distinct from your Cancel Flow API key and is requested from Churnkey support at support@churnkey.co.

## Adding a data source

<SourceSetupIntro />

When linking Churnkey, you'll need:

- **Data API key** – request one from [support@churnkey.co](mailto:support@churnkey.co). This is distinct from your Cancel Flow API key. Once issued, it is shown in Churnkey under **Settings → Account**.
- **App ID** – shown in Churnkey under **Settings → Account**.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, check your Data API key and App ID under **Settings → Account**, then reconnect.
- If you see a forbidden error, confirm you are using a Data API key and not a Cancel Flow key, then reconnect.
- If your App ID is not recognized, check the App ID under **Settings → Account**, then reconnect.

<TroubleshootingLink />
