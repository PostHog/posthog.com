---
title: Linking Segment as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Segment
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Segment connector pulls your Twilio Segment workspace configuration, admin, and metadata into the PostHog Data warehouse via the Segment Public API. It does not connect to the event or Profile data plane.

## Prerequisites

You need a Twilio Segment workspace and a workspace-scoped Public API token, along with the region your workspace lives in.

## Adding a data source

<SourceSetupIntro />

When linking Segment, you'll need:

- **Region** – choose the region your Segment workspace lives in, US (`api.segmentapis.com`) or EU (`eu1.api.segmentapis.com`).
- **Public API token** – create one in your Segment workspace under **Settings → Access Management → Tokens**.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Public API token may be missing or invalid. Create a new Public API token in your Segment workspace settings, then reconnect.
- If you see a forbidden error, your token may be revoked or missing the permissions needed to sync this data. Create a new token with the required access, then reconnect.
- If the connection fails, confirm you selected the region that matches your workspace.

<TroubleshootingLink />
