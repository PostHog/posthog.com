---
title: Linking Airbrake as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Airbrake
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Airbrake connector syncs your error monitoring data – projects, error groups, error occurrences (notices), and deploys – into PostHog, so you can track error rates by project and environment over time and correlate error spikes with deploys.

## Prerequisites

You need an Airbrake account with a **user API key**. Every project your user can access is synced.

## Adding a data source

<SourceSetupIntro />

You need your Airbrake user API key. Find it in your Airbrake **User settings** (your profile menu in the Airbrake dashboard). Per-project keys in Airbrake only allow error submission and won't work for syncing data.

## Sync modes

<SyncModes />

The `groups` table supports incremental sync on `createdAt`, which only picks up newly created error groups. Fields that change on existing groups (like `noticeCount`, `resolved`, and `lastNoticeAt`) are only refreshed by a full refresh, so consider scheduling periodic full refreshes if you rely on those fields.

The `notices` table fetches occurrences per error group across every project, making it the most API-expensive table. It is not synced by default and only the most recent pages of history are pulled per group.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Deploy rows don't include a project reference in Airbrake's API, so PostHog adds a `projectId` column to the `deploys` table for joining against `projects`.

## Troubleshooting

If the source fails to connect or a sync stops with an authorization error, your user API key is likely invalid or revoked – generate a new key in your Airbrake user settings and update the source credentials.

<TroubleshootingLink />
