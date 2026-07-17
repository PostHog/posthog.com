---
title: Linking Travis CI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TravisCI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Travis CI connector syncs your CI/CD data – repositories, builds, jobs, and branches – into the PostHog Data Warehouse, so you can analyze build durations, failure rates, and delivery metrics alongside your product data.

## Prerequisites

You need a Travis CI (travis-ci.com) account with an API token. The token can read every repository its owning user has access to, and only those repositories are synced. Self-hosted Travis CI Enterprise instances are not supported.

## Adding a data source

<SourceSetupIntro />

When linking Travis CI, you'll need:

- **API token** – find or generate it in your [Travis CI settings](https://app.travis-ci.com/account/preferences) under **API authentication**, or run `travis token --com` with the Travis CI CLI.

## Sync modes

<SyncModes />

Builds and jobs sync incrementally: each sync pages newest-first and stops at the last synced ID. Builds or jobs that were still running when a sync last saw them keep the state from that sync – run a full refresh to re-pull final states. Repositories and branches are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an "access denied" or authorization error, your Travis CI API token is invalid or has been revoked. Generate a new token in your Travis CI settings, then reconnect.

<TroubleshootingLink />
