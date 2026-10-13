---
title: Linking DX as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Getdx
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The DX ([getdx.com](https://getdx.com)) connector syncs developer experience data into PostHog: survey snapshots, teams, users, audit events, and DX Fabric scorecards. DX is a developer experience platform that measures engineering team health through surveys and analytics.

## Prerequisites

You need a [DX](https://getdx.com) account with API access and an organization token. Create the token under **Admin** > **Organization tokens** in DX. The scopes you enable on the token determine which tables you can sync.

## Adding a data source

<SourceSetupIntro />

When linking DX, you'll need:

- **Organization token:** your DX organization API token. See [getting your organization token](#getting-your-organization-token) below.

## Getting your organization token

1. Sign in to your DX account at [app.getdx.com](https://app.getdx.com).
2. Go to **Admin** > **Organization tokens**.
3. Create a new token with the scopes for the tables you want to sync.
4. Copy the token into PostHog.

Token validation calls the `auth.whoami` endpoint and does not require any specific table scopes.

## Token scopes

Different tables require different token scopes:

| Tables                                    | Required scope    |
| ----------------------------------------- | ----------------- |
| `snapshots`, `teams`, `team_audit_events` | `snapshots:read`  |
| `users`                                   | `users:read`      |
| `scorecards`                              | `scorecards:read` |

The `scorecards` table requires a DX Fabric subscription. It syncs both published and draft scorecards.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **snapshots:** survey snapshots with schedules and response counts.
- **teams:** DX teams with hierarchy and manager information.
- **users:** users with roles, custom properties, team/group membership, or entity ownership.
- **team_audit_events:** audit events for changes to DX teams.
- **scorecards:** published and draft DX Fabric scorecards with checks and scoring rules.

## Sync modes

<SyncModes />

All tables use full refresh only. The DX API does not support server-side date filters.

| Table               | Sync modes   |
| ------------------- | ------------ |
| `snapshots`         | Full refresh |
| `teams`             | Full refresh |
| `users`             | Full refresh |
| `team_audit_events` | Full refresh |
| `scorecards`        | Full refresh |

## Troubleshooting

- **Invalid organization token:** the token was deleted or is invalid. Create a new token in DX under **Admin** > **Organization tokens** and update the source credentials.

- **Authentication failed (not_authed or invalid_auth):** check that your organization token is correct and hasn't expired.

- **Access denied (not_authorized):** your token doesn't have the required scopes for the tables you're syncing. Check the [token scopes](#token-scopes) section above.

- **Scorecards table empty or failing:** scorecards require a DX Fabric subscription. Verify your DX account has DX Fabric enabled.

- **Empty tables:** check that data exists in DX first. For example, verify you have snapshots or teams configured in your DX account.

<TroubleshootingLink />
