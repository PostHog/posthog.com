---
title: Linking Replicate as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Replicate
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[Replicate](https://replicate.com) is a platform for running machine learning models in the cloud. This connector syncs your Replicate account data – predictions, trainings, deployments, the model catalog, hardware, and your account – into the PostHog data warehouse, so you can analyze your ML usage and spend alongside the rest of your data.

## Prerequisites

- A Replicate account.
- A Replicate API token, which you can create in your [Replicate account settings](https://replicate.com/account/api-tokens). It starts with `r8_` and grants access to every table this connector syncs.

## Adding a data source

<SourceSetupIntro />

When linking Replicate, you'll need:

- **API token** – create one under [API tokens](https://replicate.com/account/api-tokens) in your Replicate account settings. It starts with `r8_`.

## Available tables

| Table         | Description                                                            | Sync method                 |
| ------------- | ---------------------------------------------------------------------- | --------------------------- |
| `predictions` | Individual model runs, with input, output, status, and timing         | Incremental on `created_at` |
| `trainings`   | Fine-tuning runs that produce a new model version                      | Full refresh                |
| `deployments` | Private, managed endpoints for running a model with your own scaling   | Full refresh                |
| `models`      | The full public Replicate model catalog (off by default)               | Full refresh                |
| `hardware`    | Hardware SKUs available for running models                             | Full refresh                |
| `account`     | The authenticated Replicate account                                    | Full refresh                |

**Incremental** syncing is only available on the `predictions` table, which is the one endpoint Replicate exposes a server-side timestamp filter (`created_after`) for. Predictions are immutable once terminal, and the input, output, and logs of API-created predictions are removed about an hour after completion (`data_removed=true`), so older rows typically carry metadata only.

**Full refresh** tables reload all data on each sync. Replicate's other list endpoints are cursor-only with no server-side "updated since" filter, so a partial walk would cost the same as a full refresh every run.

The `models` table lists the entire public Replicate model catalog – not just your own models – so it's large and disabled by default. Enable it in the table picker if you want the catalog in your warehouse.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails to validate, confirm your API token is active in your [Replicate account settings](https://replicate.com/account/api-tokens) and that you pasted the full `r8_...` value.
- If a sync stops with an authorization error, your token may have been revoked. Create a new token and reconnect.
- If older `predictions` rows have empty `input`, `output`, or `logs`, that's expected: Replicate removes those fields about an hour after an API-created prediction completes (`data_removed=true`).

<TroubleshootingLink />
