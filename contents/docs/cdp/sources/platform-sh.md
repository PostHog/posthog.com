---
title: Linking Platform.sh as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PlatformSh
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Platform.sh connector syncs your Platform.sh (or Upsun) organizations, projects, environments, deploy activity, subscriptions, and organization members into PostHog, so you can analyze your deployments and infrastructure alongside your product data.

## Prerequisites

You need a Platform.sh or Upsun account with access to the organizations you want to sync, and the ability to create an API token for your user.

## Adding a data source

<SourceSetupIntro />

When linking Platform.sh, you'll need:

- **API token** – create one in the Console under **My profile** > **API tokens**. See the [Platform.sh docs](https://docs.platform.sh/administration/cli/api-tokens.html) or [Upsun docs](https://docs.upsun.com/administration/cli/api-tokens.html) for a walkthrough. The token has the same access as your user account, so no extra scopes are needed.
- **API endpoint** – pick the product you use: Platform.sh (`api.platform.sh`) or Upsun (`api.upsun.com`). A Platform.sh token doesn't work against the Upsun API, and vice versa.

## Sync modes

<SyncModes />

The activities table syncs incrementally on `created_at`. Platform.sh prunes expired activities from its API, so incremental sync is also what preserves your full deploy history in PostHog beyond the API's retention window. The remaining tables are small lists and sync as full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Activity rows exclude the raw `log` output, and environment rows exclude HTTP basic-auth credentials, so secrets from your Platform.sh account don't land in queryable tables.

## Troubleshooting

- If you see an authentication error, check that the token is valid in the Console and that you picked the API endpoint matching where the token was created (Platform.sh vs. Upsun).
- If recent activity history looks shorter than expected, note that Platform.sh prunes expired activities from its API; PostHog keeps everything it has already synced.

<TroubleshootingLink />
