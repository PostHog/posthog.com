---
title: Linking Trigger.dev as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TriggerDev
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The [Trigger.dev](https://trigger.dev) connector syncs your task run history, schedules, and queues into PostHog, so you can analyze background-job execution data alongside your product analytics.

## Prerequisites

You need a Trigger.dev project and a secret API key for the environment you want to sync. API keys are per environment (dev, staging, prod), so one connection syncs one environment. Self-hosted Trigger.dev instances are also supported.

## Adding a data source

<SourceSetupIntro />

When linking Trigger.dev, you'll need:

- **Secret API key** – copy the secret key for the environment you want from your Trigger.dev project's [API keys page](https://trigger.dev/docs/apikeys). Keys are prefixed by environment: `tr_prod_...`, `tr_stg_...`, or `tr_dev_...`.
- **API URL** _(optional)_ – leave blank for Trigger.dev Cloud. If you self-host, set it to your instance's API URL (must be HTTPS).

## Available tables

| Table       | Description                                                  | Sync method                |
| ----------- | ------------------------------------------------------------ | -------------------------- |
| `runs`      | A single execution of a task, with status, timings, and cost | Incremental on `createdAt` |
| `schedules` | Schedules that trigger tasks on recurring cron expressions   | Full refresh               |
| `queues`    | Task queues with live concurrency and depth counters         | Full refresh               |

**Incremental** syncs on the `runs` table use a 3-day lookback window. Runs are created with an immutable `createdAt` timestamp, but fields like `status` and `costInCents` keep updating after creation. The lookback re-reads recently created runs each sync to pick up those late changes. Merge deduplication on the run `id` prevents duplicates.

**Full refresh** tables (`schedules` and `queues`) reload all data on each sync. These are typically small and have no stable timestamp to sync on.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If runs stop syncing with an authorization error, the API key was likely rotated or belongs to a different environment. Generate a fresh secret key for the correct environment and reconnect.
- Each API key is scoped to a single environment (dev, staging, or prod). Make sure you're using the key for the environment you want to sync.

<TroubleshootingLink />
