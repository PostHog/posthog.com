---
title: Linking Azure DevOps as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureDevOps
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Azure DevOps connector syncs your project, build, and work item data into PostHog, so you can analyze your engineering activity alongside your product data.

## Prerequisites

You need an Azure DevOps organization and a personal access token with read scopes for the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Azure DevOps, you'll need:

- **Organization** – the first path segment of your Azure DevOps URL. For `dev.azure.com/myorg`, enter `myorg`.
- **Personal access token** – create one under **User settings → Personal access tokens** with read scopes for the data you want to sync (Work Items, Code, Build, and Project and Team).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
