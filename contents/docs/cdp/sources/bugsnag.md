---
title: Linking Bugsnag as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bugsnag
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The BugSnag connector pulls your error-monitoring data into the PostHog Data warehouse, so you can analyze your errors, events, and releases alongside your product data.

## Prerequisites

You need a BugSnag account so you can generate a personal auth token. The token inherits your account's access, so it can read every organization and project you can see.

## Adding a data source

<SourceSetupIntro />

When linking Bugsnag, you'll need:

- **Auth token** – generate a personal auth token in the **My Account** section of your [BugSnag account settings](https://app.bugsnag.com/settings/my-account/).

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your BugSnag auth token may be invalid or revoked. Generate a new personal auth token in your BugSnag account settings, then reconnect.
- If you see a permission error, the token does not have access to the requested data. Check the token's account permissions, then reconnect.

<TroubleshootingLink />
