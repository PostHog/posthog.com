---
title: Linking Astronomer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Astronomer
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Astronomer connector syncs platform inventory and deploy history from [Astronomer (Astro)](https://www.astronomer.io/) into the PostHog data warehouse: deployments, deploys, workspaces, and clusters.
This lets you join your Airflow infrastructure data with the rest of your product analytics.

## Prerequisites

You need an Astronomer organization and an API token with read permissions for the tables you want to sync.

To create an API token:

1. Go to your [Astronomer Cloud](https://cloud.astronomer.io/) organization.
2. Navigate to **Organization Settings** > **Access Management** > **API Tokens**.
3. Create a token and grant the permissions for the tables you need:

| Table         | Required permission                                         |
| ------------- | ----------------------------------------------------------- |
| `deployments` | `organization.deployments.get`                              |
| `deploys`     | `deployment.deploys.get` and `organization.deployments.get` |
| `workspaces`  | `organization.workspaces.get`                               |
| `clusters`    | `organization.clusters.get`                                 |

The `deploys` table also requires permission to list deployments because deploy history is fetched per deployment.

## Adding a data source

<SourceSetupIntro />

When linking Astronomer, you'll need:

- **Organization ID**: your Astronomer organization ID (not the full URL).
- **API token**: a bearer token with read permissions for the tables you want to sync.

## Sync modes

<SyncModes />

All Astronomer tables are full refresh. Each sync replaces the contents of the table. The Astronomer API list endpoints don't support filtering by update time, so incremental syncs aren't available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table         | Description                                     | Sync method  |
| ------------- | ----------------------------------------------- | ------------ |
| `deployments` | Airflow environments in your Astro organization | Full refresh |
| `deploys`     | Code and image deploys for each deployment      | Full refresh |
| `workspaces`  | Groups of deployments in your organization      | Full refresh |
| `clusters`    | Kubernetes clusters that host Astro deployments | Full refresh |

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new token and reconnect the source.

- If a table syncs with a permission error, the token is missing the required scope for that table. Check the permissions table above and update the token.

- If you get a 404 error, verify that your organization ID is correct. Enter just the ID, not a full URL.

- The `clusters` table returns only clusters available to your organization. If the table is empty, your organization may not have any dedicated clusters.

<TroubleshootingLink />
