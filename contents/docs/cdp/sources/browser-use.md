---
title: Linking Browser Use as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BrowserUse
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[Browser Use](https://browser-use.com) Cloud runs hosted AI browser-automation agents. This connector syncs your agent sessions, browser sessions, profiles, workspaces, and per-session agent messages into the PostHog Data warehouse, so you can analyze agent runs, step counts, token usage, and costs alongside the rest of your data.

## Prerequisites

You need a Browser Use Cloud account with an API key. Keys are created self-serve and don't expire.

## Adding a data source

<SourceSetupIntro />

When linking Browser Use, you'll need:

- **API key** – create one at [cloud.browser-use.com/settings](https://cloud.browser-use.com/settings). Keys are prefixed `bu_`.

## Sync modes

<SyncModes />

Browser Use's v3 list endpoints don't support server-side time filtering, so every table syncs with full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `session_messages` table fans out one request per session, so it's off by default. Enable it only if you need per-step agent messages, since it makes many more API calls than the session-level tables.

## Troubleshooting

- If the connection fails with an authentication error, confirm the API key is valid and hasn't been revoked in your [Browser Use account settings](https://cloud.browser-use.com/settings), then reconnect.

<TroubleshootingLink />
