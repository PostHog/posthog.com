---
title: Linking TVmaze as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TVMaze
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The TVmaze connector syncs the [TVmaze](https://www.tvmaze.com/) TV show catalog – shows, people (cast and crew), and their last-updated timestamps – into PostHog.

## Prerequisites

None. TVmaze exposes a free public API, so no account, API key, or other credentials are needed.

TVmaze data is licensed [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), which requires attribution to TVmaze and share-alike distribution. Make sure your use of the data complies with the license.

## Adding a data source

<SourceSetupIntro />

TVmaze needs no credentials – just select the tables you want to sync.

## Sync modes

<SyncModes />

TVmaze has no server-side change filter, so every table syncs as a full refresh. The `show_updates` and `person_updates` tables hold a last-updated timestamp per record, which you can query to see what changed between syncs.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The connector doesn't sync per-show child resources like episodes, seasons, or cast: TVmaze allows around 20 requests per 10 seconds, so fetching them for the full catalog of tens of thousands of shows isn't practical.

## Troubleshooting

<TroubleshootingLink />
