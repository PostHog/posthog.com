---
title: Linking Humanitec as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Humanitec
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Humanitec connector syncs applications, environments, deployments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Humanitec API token and organization ID to pull your Humanitec data.

Create a service user token in your Humanitec organization. In Humanitec, open **Service users**, select a user, then select **Add new API token**. The service user needs read access to the applications and environments you want to sync.

This source connects to the Platform Orchestrator API at `api.humanitec.io`.

You'll be asked for:

- **API token**: A service user token from your Humanitec organization.

- **Organization ID**: Your Humanitec organization identifier (lowercase letters, numbers, and single hyphens).

## Sync modes

<SyncModes />

All Humanitec tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.

- If the token cannot read a resource, check that the service user has the correct roles in your organization.

- If the organization is not found, verify the organization ID and ensure the service user has access to it.

<TroubleshootingLink />
