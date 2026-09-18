---
title: Linking Apify Dataset as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ApifyDataset
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Apify Dataset connector syncs the rows of an Apify dataset into PostHog, so you can analyze the output of your Apify Actors and web scrapers alongside your product data.

## Prerequisites

You need an Apify account with an API token that has read access to the dataset's storage, and the ID of the dataset you want to import.

## Adding a data source

<SourceSetupIntro />

When linking Apify Dataset, you'll need:

- **API token** – create one in your [Apify account settings](https://console.apify.com/settings/integrations). The token needs read access to the dataset's storage.
- **Dataset ID** – find it in the [Apify Console](https://console.apify.com/storage/datasets), or use the `username~dataset-name` shorthand.

## Sync modes

<SyncModes />

Apify datasets are full refresh only. The whole dataset is re-imported on every sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API token is invalid or has expired, create a new token in your Apify account settings, then reconnect.
- If your token cannot access the dataset, use a token with read access to the dataset's storage, then reconnect.
- If the dataset could not be found, check that the dataset ID is correct and the token can access it.

<TroubleshootingLink />
