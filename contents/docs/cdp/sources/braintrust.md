---
title: Linking Braintrust as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Braintrust
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Braintrust connector syncs your LLM evaluation and observability data into PostHog's Data Warehouse, so you can analyze your AI projects, experiments, datasets, prompts, and functions alongside your product data.

## Prerequisites

You need a Braintrust account with permission to create an API key. Give the key read access to the resources you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Braintrust, you'll need:

- **API key** – create one in your [Braintrust organization settings](https://www.braintrust.dev/app/settings). Give it read access to the selected resources.
- **API URL** – your Braintrust API URL, found in **Settings** > **Data plane**. The default is `https://api.braintrust.dev`. Use your regional or self-hosted URL when applicable. The URL must use HTTPS.

## Sync modes

All Braintrust tables use full refresh sync. The Braintrust API doesn't support server-side time filters, so incremental sync isn't available.

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Braintrust tables contain object definitions only. Experiment events, dataset records, and raw traces are outside this connector's scope.

## Troubleshooting

- If you see a 401 authentication error, Braintrust rejected the API key. Check the key in your organization settings, then reconnect.
- If you see a 403 permissions error, the API key can't read the resource. Check its permissions and verify the API URL is correct, then reconnect.
- If the API URL is rejected, make sure it uses HTTPS, doesn't include a path or query string, and resolves to a public IP address.

<TroubleshootingLink />
