---
title: Linking SolarWinds Service Desk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SolarwindsServiceDesk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SolarWinds Service Desk connector syncs incidents, problems, changes, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your SolarWinds Service Desk JSON web token to pull your service desk data.

You can generate a token in SolarWinds Service Desk under **Setup → Users & Access → Users** - open the user and use **Actions → Generate JSON Web Token**. The token inherits that user's role, so it needs read access to the records you want to sync, and requests stop working if that user is ever disabled.

SolarWinds Service Desk runs independent regional stacks that do not share data - pick the region your account is on.

You'll be asked for:

- **Region**: choose between US (api.samanage.com), EU (apieu.samanage.com) and APJ (apiau.samanage.com).
- **JSON web token**

## Sync modes

<SyncModes />

Some SolarWinds Service Desk tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the JSON web token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
