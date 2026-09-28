---
title: Linking Gerrit as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gerrit
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Gerrit connector syncs changes, accounts, projects, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Gerrit instance URL and credentials to pull your code review data.

Generate an HTTP password in your Gerrit account under **Settings > HTTP Credentials** (or **HTTP Password** on older versions) and enter it together with your Gerrit username. On public instances you can leave both blank to sync with anonymous read access - you'll only see the changes, accounts, and projects that are publicly visible, and group listing requires an authenticated account.

You'll be asked for:

- **Instance URL**: for example `https://gerrit.example.com`.

## Sync modes

<SyncModes />

Some Gerrit tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the HTTP password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
