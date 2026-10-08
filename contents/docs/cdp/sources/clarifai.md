---
title: Linking Clarifai as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clarifai
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Clarifai connector syncs your models, workflows, datasets, and concepts into the PostHog data warehouse, so you can analyze your AI/ML infrastructure alongside your product data.

## Prerequisites

- A Clarifai account with at least one app
- A [personal access token](https://docs.clarifai.com/control/authentication/pat/) (PAT) with read access to the resources you want to sync

## Adding a data source

<SourceSetupIntro />

Create a personal access token in Clarifai under **Settings** > **Secrets**. Grant read access for models, workflows, datasets, and concepts. Allow the ListModels, ListWorkflows, ListDatasets, and ListConcepts endpoints. Enter the user ID and app ID of the app owner.

You'll be asked for:

- **Personal access token** - your Clarifai PAT with read access to the resources you want to sync
- **User ID** - the user ID of the app owner (e.g., `example-user`)
- **App ID** - the app ID for the data you want to sync (e.g., `example-app`)
- **API host** (optional) - custom API host if you're using a private Clarifai installation. Defaults to `https://api.clarifai.com`

## Sync modes

<SyncModes />

All Clarifai tables are full refresh. Each sync replaces the contents of the table. This is because Clarifai's list endpoints don't provide a way to filter by modification time.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **models** - Models in the selected Clarifai app, including details of their latest versions.
- **workflows** - Workflows that connect models in the selected Clarifai app.
- **datasets** - Datasets that organize inputs in the selected Clarifai app.
- **concepts** - Concept labels in the selected Clarifai app.

## Troubleshooting

- If the connection fails with an authentication error, the personal access token is invalid or expired. Create a new one under **Settings** > **Secrets** in Clarifai, then reconnect the source.
- If the connection fails with a permission error, the token doesn't have read access to the selected resource. Update the token's permissions to include the required list endpoint.
- If the connection fails with a resource not found error, check that the user ID and app ID are correct and match an existing app.
- If you're using a custom API host, ensure it's a valid HTTPS URL without any path, query parameters, or credentials.

<TroubleshootingLink />
