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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

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

The `seasons`, `episodes`, and `cast` tables include a `show_id` column to join them to `shows`. The `episodes` table includes specials. Cast rows also include `person_id` and `character_id`.

These three tables make one request per show on every full refresh, so syncing the full catalog can take a long time.

## Troubleshooting

<TroubleshootingLink />
