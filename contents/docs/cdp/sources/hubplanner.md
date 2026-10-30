---
title: Linking Hub Planner as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Hubplanner
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Hub Planner connector syncs your resource-scheduling, project-planning, and time-tracking data into PostHog, so you can analyze resourcing alongside your product data.

## Prerequisites

You need a Hub Planner account with admin access so you can generate an API key.

## Adding a data source

<SourceSetupIntro />

When linking Hub Planner, you'll need:

- **API key** – generate a **Read Only** API key in Hub Planner under **Settings → API** (admin access required).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
