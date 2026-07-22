---
title: Linking Codefresh as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Codefresh
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Codefresh connector syncs your CI/CD data – projects, pipelines, builds, images, and more – into PostHog, so you can analyze your delivery pipeline alongside your product data.

## Prerequisites

You need a Codefresh account on the US SaaS host (`g.codefresh.io`) so you can create an API key. EU and self-hosted or on-prem installations are not yet supported.

## Adding a data source

<SourceSetupIntro />

When linking Codefresh, you'll need:

- **API key** – create one in your [Codefresh user settings](https://g.codefresh.io/user/settings). Codefresh API keys are scoped per resource, so grant read access for the resources you want to sync, for example Project (projects), Pipeline (pipelines, triggers), Build (builds, images), and Step Type (step types).

## Sync modes

<SyncModes />

Codefresh tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid or has been revoked, create a new key in your Codefresh user settings, then reconnect.
- If your API key is missing the access scope needed to sync some data, grant the required resource scopes to the key in your Codefresh user settings, then reconnect.

<TroubleshootingLink />
