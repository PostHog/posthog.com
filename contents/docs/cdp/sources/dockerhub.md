---
title: Linking Docker Hub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dockerhub
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Docker Hub connector syncs your container repositories and tags into PostHog, so you can analyze them alongside your product data.

## Prerequisites

You need a Docker Hub account and a personal access token with **Read** access. To import an organization's repositories instead of your own, you'll also need the organization name.

## Adding a data source

<SourceSetupIntro />

When linking Docker Hub, you'll need:

- **Username** – your Docker Hub username.
- **Personal access token** – create a token with **Read** access under **Account settings → Personal access tokens** in [Docker Hub](https://app.docker.com/settings/personal-access-tokens).
- **Namespace** – optional. Set this to an organization name to import that organization's repositories instead of your own. Defaults to your username.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If authentication fails, create a new personal access token with **Read** access under **Account settings → Personal access tokens**, then reconnect.

<TroubleshootingLink />
