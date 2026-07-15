---
title: Linking Browserbase as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Browserbase
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Browserbase](https://www.browserbase.com) is a managed browser infrastructure platform for running headless browsers and agents. This connector syncs your Browserbase sessions and projects into the PostHog Data warehouse, so you can track session usage, resource consumption, and status alongside the rest of your data.

## Prerequisites

- A Browserbase account.
- A Browserbase API key, which you can find in your [Browserbase dashboard](https://www.browserbase.com/settings). API keys are scoped to a single project, so link one source per project you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Browserbase, you'll need:

- **API key** – find it under [Settings](https://www.browserbase.com/settings) in your Browserbase dashboard. It starts with `bb_` and is scoped to a single project.

## Sync modes

<SyncModes />

All Browserbase tables are full refresh only. The list endpoints don't expose a server-side "updated since" filter, so each sync replaces the table with the current data from the API.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails to validate, confirm your API key is active in your [Browserbase dashboard](https://www.browserbase.com/settings) and that you pasted the full `bb_...` value.
- If a table returns no data, remember that keys are scoped to a single project. The source only sees the sessions and projects reachable by that key.

<TroubleshootingLink />
