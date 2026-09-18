---
title: Linking Octopus Deploy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OctopusDeploy
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Octopus Deploy connector syncs your deployment data – deployments, releases, projects, environments, tasks, and audit events – into PostHog. This is useful for analyzing deployment frequency, change failure rate, and recovery time per project and environment.

## Prerequisites

You need an Octopus Deploy account (Octopus Cloud or self-hosted) and an API key. Self-hosted servers must be reachable from the internet over HTTPS. The API key inherits your user's permissions, so its user needs read access to the spaces you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Octopus Deploy, you'll need:

- **Octopus Deploy URL** – your Octopus Cloud URL (like `https://your-org.octopus.app`) or your self-hosted server's public URL.
- **API key** – created in the Octopus web portal under **your profile > My API Keys**. Click **New API key**, give it a purpose, and copy the generated key (it starts with `API-`).

The connector discovers every space your API key can see and syncs each space-scoped table (projects, deployments, releases, and so on) across all of them, with a `SpaceId` column identifying the space each row belongs to.

## Sync modes

<SyncModes />

Tasks and audit events support incremental syncs. Incremental task syncs filter on completion date, so a task only appears once it finishes. Deployments and releases don't expose a server-side date filter in the Octopus API, so they always sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
