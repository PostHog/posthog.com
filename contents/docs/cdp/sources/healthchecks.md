---
title: Linking Healthchecks.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Healthchecks
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Healthchecks.io connector syncs your [Healthchecks.io](https://healthchecks.io) cron and scheduled-task monitoring data – checks, notification channels, status flips, and pings – into PostHog, so you can report on the reliability of your background jobs alongside your product data. It works with both Healthchecks.io Cloud and self-hosted deployments.

## Prerequisites

Before connecting Healthchecks.io, you need:

- A Healthchecks.io account (Cloud or self-hosted).
- A **project-scoped API key**, created under **Project settings > API Access**. A read-only key is enough for the `checks`, `channels`, and `flips` tables; syncing the `pings` table requires a full-access (read-write) key.

## Adding a data source

<SourceSetupIntro />

When linking Healthchecks.io, you'll need:

- **API key** – create a project-scoped key under **Project settings > API Access**. Use a read-only key for checks, channels, and flips; use a full-access key if you also want to sync pings.
- **Base URL (self-hosted only)** – leave this blank for Healthchecks.io Cloud. For a self-hosted deployment, set it to your instance URL (e.g. `https://healthchecks.io`). On PostHog Cloud, self-hosted base URLs must use `https`.

## Sync modes

<SyncModes />

The `flips` table (up/down status changes) supports incremental sync on the flip `timestamp`, so each run only pulls new status changes. Because flips are immutable events, they can also be synced append-only. The `checks` and `channels` tables use full refresh. The `pings` table also uses full refresh: the API only returns a plan-bounded window of recent pings (100 on the free plan, 1000 on paid), so the table reflects the currently-retained window.

Note that `flips` retention on Healthchecks.io is plan-limited to roughly the current month plus the two prior months.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized**: your API key is invalid or has been revoked. Create a new key under **Project settings > API Access**, then reconnect.
- **The `pings` table syncs no rows for some checks**: the pings endpoint requires the check's full UUID, which a read-only key does not expose. Use a full-access (read-write) API key to sync pings.
- **"base URL must use https"** (PostHog Cloud): a self-hosted instance URL must use `https` on Cloud. Use `https`, or leave the base URL blank if you're on Healthchecks.io Cloud.

<TroubleshootingLink />
