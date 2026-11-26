---
title: Linking Semaphore (Semaphore CI) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Semaphore
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Semaphore (Semaphore CI) connector syncs workflows, pipelines, deployment targets, organization members, deployment history, and flaky test data into the PostHog Data Warehouse, so you can analyze your CI/CD data alongside your product data.

## Prerequisites

- A Semaphore CI account with API access
- A personal API token with read access to the project you want to sync

## Adding a data source

<SourceSetupIntro />

Enter your Semaphore credentials to automatically pull your CI/CD data.

You can generate a personal API token under **Settings** in your [Semaphore account](https://me.semaphoreci.com/account). The token needs read access to the project you want to sync.

You'll be asked for:

- **API token**: Your personal API token from Semaphore account settings
- **Organization subdomain**: Your organization's subdomain (e.g. `example` for `example.semaphoreci.com`)
- **Project ID**: The UUID of the project you want to import (find this in your Semaphore project settings)

Each connection imports one project. To import multiple projects, create multiple source connections.

## Sync modes

<SyncModes />

| Table                    | Sync mode                   |
| ------------------------ | --------------------------- |
| `workflows`              | Incremental or full refresh |
| `pipelines`              | Full refresh                |
| `deployment_targets`     | Full refresh                |
| `members`                | Full refresh                |
| `deployment_history`     | Full refresh                |
| `flaky_tests`            | Full refresh                |
| `flaky_test_disruptions` | Full refresh                |

The `workflows` table supports incremental sync using the `created_at` timestamp. All other tables use full refresh. The `members` table covers the organization. The `deployment_history`, `flaky_tests`, and `flaky_test_disruptions` tables cover the selected project.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one in your [Semaphore account settings](https://me.semaphoreci.com/account), then reconnect the source.
- If your token doesn't have permission to read the project, check your project permissions in Semaphore and ensure the token has read access.
- If you receive a "project not found" error, verify the organization subdomain and project ID are correct, and that your token has access to the project.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
