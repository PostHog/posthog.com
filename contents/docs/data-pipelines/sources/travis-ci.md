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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Travis CI connector syncs your CI/CD data – repositories, organizations, builds, jobs, branches, and more – into the PostHog Data Warehouse, so you can analyze build durations, failure rates, and delivery metrics alongside your product data.

## Prerequisites

You need a Travis CI (travis-ci.com) account with an API token. The token can read every repository its owning user has access to, and only those repositories are synced. Self-hosted Travis CI Enterprise instances are not supported.

## Adding a data source

<SourceSetupIntro />

When linking Travis CI, you'll need:

- **API token** – find or generate it in your [Travis CI settings](https://app.travis-ci.com/account/preferences) under **API authentication**, or run `travis token --com` with the Travis CI CLI.

## Sync modes

<SyncModes />

Builds and requests sync incrementally on `id`, while jobs and stages sync incrementally on `build_id`. Each sync pages newest-first and stops at the last synced ID. Stages come from the stages embedded in the builds list, without a separate API request per build.

Builds, jobs, stages, or requests that were still running when a sync last saw them keep the state from that sync – run a full refresh to re-pull final states.

Repositories, branches, `crons`, `organizations`, and `caches` are full refresh only. Branches are off by default to avoid the API cost of walking every accessible repository's branch list each sync. The `crons` table is also off by default and walks every accessible repository's cron list each sync.

The `organizations` table syncs the organizations the token's user is a member of on Travis CI.

The `messages` table syncs travis-yml config validation messages embedded in build requests. It syncs incrementally on `request_id` or as full refresh. This table is off by default.

The `caches` table syncs build cache archives for each repository's branches. It requires push access and skips any repository that returns a 403 error. This table is off by default.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an "access denied" or authorization error, your Travis CI API token is invalid or has been revoked. Generate a new token in your Travis CI settings, then reconnect.

<TroubleshootingLink />
