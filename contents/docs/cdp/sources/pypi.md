---
title: Linking PyPI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PyPI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[PyPI](https://pypi.org) (the Python Package Index) hosts metadata for Python packages. This connector pulls project metadata, release files, and known vulnerabilities for the packages you choose into the PostHog Data warehouse, so you can track package details alongside the rest of your data.

## Prerequisites

PyPI's read APIs are public, so **no credentials are required**. You only need the names of the packages you want to track.

## Adding a data source

1. In PostHog, go to the [Sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section.
2. Click **+ New source** and click **Link** next to PyPI.
3. Enter the package names you want to track (see [Configuration](#configuration) below) and click **Next**.
4. Select the tables you want to sync, choose a sync method and frequency, then click **Import**.

Once the syncs are complete, you can start querying this data in PostHog.

PyPI has no list endpoint, so enter the package names you want to track, one per line (or comma-separated). For example:

```
requests
django
posthog
```

Each sync fetches the current metadata for every configured package.

## Sync modes

<SyncModes />

PyPI exposes no server-side "changed since" filter, so all tables sync with full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- Because PyPI's read APIs are unauthenticated, there are no credentials to get wrong. If a table is empty, check that the package names are spelled correctly.
- A package name that doesn't exist on PyPI returns a 404 and is skipped for that package during the sync – the rest of your configured packages still sync.

<TroubleshootingLink />
