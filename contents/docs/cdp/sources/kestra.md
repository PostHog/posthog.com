---
title: Linking Kestra as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kestra
alpha: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Kestra connector syncs workflow executions, flow definitions, and trigger state from your [Kestra](https://kestra.io/) instance into the PostHog data warehouse, so you can analyze orchestration data alongside your product data.

## Prerequisites

- A Kestra instance that's publicly reachable over HTTPS (Cloud, Enterprise, or self-hosted)
- Your tenant ID – use `main` for Open Source, or your Cloud/Enterprise tenant ID
- Credentials to authenticate (API token or Basic auth – see below)

## Creating credentials

Kestra supports two authentication methods. Choose the one that matches your deployment.

### API token (Cloud or Enterprise)

1. In Kestra, go to **Settings** > **API Tokens**.
2. Create a new token and grant **read** access to flows, executions, and triggers for your tenant.
3. Copy the token – you'll paste it into PostHog when linking the source.

### Basic authentication (self-hosted)

If your self-hosted Kestra instance uses Basic authentication, you can enter your username and password directly in PostHog instead of an API token.

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **Instance URL** – your Kestra HTTPS origin, for example `https://kestra.example.com`. Don't include a path or query string.
- **Tenant ID** – use `main` for Open Source, or your Cloud/Enterprise tenant ID.
- **Authentication** – select **API token** or **Basic authentication** and enter the corresponding credentials.

## Sync modes

<SyncModes />

| Table        | Supported modes             |
| ------------ | --------------------------- |
| `executions` | Incremental or full refresh |
| `flows`      | Full refresh                |
| `triggers`   | Full refresh                |

The `executions` table uses `start_date` as its incremental cursor. By default, each incremental sync re-reads the previous seven days so that recently updated executions are captured. To pick up changes older than seven days, run a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync behavior

- Execution rows use the API's default scope and lightweight response. Full task-run data isn't included.
- Deleted or purged executions can't be recovered from the API. If executions are removed from Kestra, those rows won't reappear in PostHog.
- Offset pagination can shift if records are deleted during a sync, which may cause rows to be skipped or duplicated in that run.

## Troubleshooting

- **"Kestra rejected your credentials"** – your API token or Basic auth details are wrong, expired, or revoked. Create a new token in **Settings** > **API Tokens** (or check your username and password), then reconnect the source.
- **"Kestra denied access"** – your credentials don't have read permission for the selected table. Grant read access in the Kestra tenant, then retry the sync.
- **Older executions aren't updating** – incremental syncs only re-read the last seven days. Run a full refresh to update older execution rows.

<TroubleshootingLink />
