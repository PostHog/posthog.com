---
title: Linking Pulumi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PulumiCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Pulumi connector syncs stacks, stack updates, deployments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Pulumi Cloud access token and organization name to pull your infrastructure-as-code data.

Create a personal access token from your [Pulumi Cloud access tokens page](https://app.pulumi.com/account/tokens), or an organization access token from your organization's settings. The token inherits its owner's access, so no extra scopes are required.

The organization name is the one shown in your Pulumi Cloud console URL (`app.pulumi.com/<organization>`). Audit logs additionally require a Pulumi Cloud plan with audit logs enabled.

You'll be asked for:

- **Access token**: for example `pul-...`.
- **Organization**: for example `my-org`.

## Sync modes

<SyncModes />

All Pulumi tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
