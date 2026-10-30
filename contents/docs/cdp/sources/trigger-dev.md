---
title: Linking Trigger.dev as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TriggerDev
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Trigger.dev connector syncs your [Trigger.dev](https://trigger.dev) task run history – runs, schedules, and queues – into PostHog, so you can analyze your background job activity alongside your product data. It works with both Trigger.dev Cloud and self-hosted instances.

## Prerequisites

You need a Trigger.dev project and its **secret API key**. API keys are per environment (dev / staging / prod), so one connection syncs one environment. To sync multiple environments, add one source per environment.

## Adding a data source

<SourceSetupIntro />

When linking Trigger.dev, you'll need:

- **Secret API key** – copy the secret key for the environment you want from your [Trigger.dev project's API keys page](https://trigger.dev/docs/apikeys). Secret keys are prefixed with the environment, e.g. `tr_prod_...`.
- **API URL (self-hosted only)** – leave blank for Trigger.dev Cloud. For a self-hosted instance, set it to your API URL (e.g. `https://api.trigger.dev`).

## Sync modes

<SyncModes />

The `runs` table supports incremental sync on its `createdAt` timestamp, so each run only pulls newly created task runs. The `schedules` and `queues` tables use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a 401 error, your secret API key is invalid or belongs to a different environment. Copy the correct key from your [Trigger.dev API keys page](https://trigger.dev/docs/apikeys) and reconnect.
- If you're not seeing the runs you expect, check that the API key is for the same environment (dev / staging / prod) as the runs you're looking for – each key is scoped to a single environment.

<TroubleshootingLink />
