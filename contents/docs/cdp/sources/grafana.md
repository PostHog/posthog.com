---
title: Linking Grafana as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Grafana
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Grafana connector syncs your Grafana instance's metadata – dashboards, folders, teams, users, data sources, service accounts, alert rules, and annotations – into the PostHog Data warehouse, so you can query your observability setup alongside the rest of your data.

## Prerequisites

- A Grafana Cloud stack or a self-hosted Grafana instance reachable from the public internet.
- Permission to create a service account and token in Grafana (or, for self-hosted OSS, a user account you can authenticate with).

## Adding a data source

<SourceSetupIntro />

When linking Grafana, you'll need:

- **Instance URL** – your Grafana instance's public URL, for example `https://yourstack.grafana.net`.
- **Authentication method** – choose one of the following:
  - **Service account token (recommended)** – in Grafana, go to **Administration** > **Users and access** > **Service accounts**, create a service account, and add a token (it starts with `glsa_`). The Viewer role covers dashboards, folders, and annotations. To sync the remaining tables, grant these extra read permissions: `users:read`, `teams:read`, `datasources:read`, `serviceaccounts:read`, and `alert.provisioning:read`.
  - **Username & password (self-hosted only)** – the username and password of a Grafana user with read access to the data you want to sync. Grafana Cloud doesn't support basic auth on its HTTP API, so use a service account token there.
- **Organization ID (optional)** – if your instance serves multiple organizations, set this to choose which organization to sync.

## Sync modes

<SyncModes />

Only the `annotations` table supports incremental sync (on the `time` field). All other tables are configuration and metadata endpoints without a server-side change cursor, so they sync as full refreshes.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Your Grafana credentials are missing the `<permission>` permission"** – grant the named read permission to your service account in Grafana, then retry. You can also deselect the affected table if you don't need it.
- **Alert state history is missing from the annotations table** – this is expected. The Grafana API returns alert state history entries without a stable identifier, so only user- and API-created annotations are synced.
- **Authentication errors** – your credentials may be invalid or expired. Create a new service account token and reconnect.
- **Host rejected** – use your instance's public URL. Internal or private addresses aren't allowed.

<TroubleshootingLink />
