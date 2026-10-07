---
title: Linking The Prompting Company as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PromptingCompany
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Prompting Company connector syncs AI visibility and share of voice analytics data into the PostHog data warehouse, so you can analyze LLM mentions and visibility alongside your product data.

## Prerequisites

- A [Prompting Company](https://app.promptingco.com) account with permission to create an organization API key.
- At least one product set up in The Prompting Company.

## Adding a data source

<SourceSetupIntro />

When linking The Prompting Company, you'll need:

- **API key** – create one in your organization's **Settings > API keys**. Grant the read scopes required for the tables you want to sync (see [required scopes](#required-scopes) below).
- **Product ID** – the product to sync data for (e.g. `product_123`). Find this in your product settings. Content, suggestions, and share of voice use the product ID. Simulation runs cover the whole organization.
- **Analytics start date** – the date to start syncing share of voice data from, in `YYYY-MM-DD` format. Must be today or earlier.

### Required scopes

Each table requires a specific read scope on your API key. Only grant the scopes you need:

| Table                | Required scope     |
| -------------------- | ------------------ |
| `published_content`  | `content:read`     |
| `prompt_suggestions` | `prompts:read`     |
| `simulation_runs`    | `simulations:read` |
| `share_of_voice`     | `analytics:read`   |

## Sync modes

<SyncModes />

| Table                | Sync methods                   |
| -------------------- | ------------------------------ |
| `published_content`  | Full refresh                   |
| `prompt_suggestions` | Full refresh                   |
| `simulation_runs`    | Full refresh                   |
| `share_of_voice`     | Incremental sync, full refresh |

Incremental sync for `share_of_voice` uses the `date` field. Older revised analytics may require a lookback window or a full refresh to stay up to date.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

`simulation_runs` covers the entire organization, regardless of the configured product ID. All other tables use the product ID.

## Troubleshooting

- If you see an authentication error, your API key is invalid or expired. Create a new key in your organization's **Settings > API keys**, then reconnect.
- If you see a permissions error, your API key lacks a required read scope. Check that the key has the correct scopes (`content:read`, `prompts:read`, `simulations:read`, `analytics:read`) for the tables you selected.

<TroubleshootingLink />
