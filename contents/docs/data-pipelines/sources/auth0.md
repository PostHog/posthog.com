---
title: Linking Auth0 as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Auth0
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Auth0 connector syncs your identity and access management data – users, tenant logs, organizations, roles, clients, connections, actions, log streams, and resource servers – into PostHog, so you can analyze authentication activity alongside your product data.

## Prerequisites

You need an Auth0 account with a **machine-to-machine (M2M) application** authorized for the [Auth0 Management API](https://auth0.com/docs/api/management/v2). No PostHog OAuth app is required – Auth0 uses the client credentials grant to issue tokens directly.

To create one:

1. In the Auth0 dashboard, go to **Applications > Applications** and click **Create Application**.
2. Select **Machine to Machine Applications** and click **Create**.
3. Select **Auth0 Management API** as the API to authorize.
4. Grant the read scopes for each table you want to sync (see [required scopes](#required-scopes) below).
5. Click **Authorize**, then copy the **Domain**, **Client ID**, and **Client Secret** from the application's **Settings** tab.

### Required scopes

Grant the M2M application the read scopes for the tables you plan to sync:

| Table            | Scope                   |
| ---------------- | ----------------------- |
| users            | `read:users`            |
| logs             | `read:logs`             |
| organizations    | `read:organizations`    |
| roles            | `read:roles`            |
| clients          | `read:clients`          |
| connections      | `read:connections`      |
| actions          | `read:actions`          |
| log_streams      | `read:log_streams`      |
| resource_servers | `read:resource_servers` |

You only need to grant scopes for the tables you want to sync. If a scope is missing, PostHog reports which one is needed when the sync runs.

## Adding a data source

<SourceSetupIntro />

When linking Auth0, you'll need:

- **Auth0 domain** – your canonical tenant domain, for example `your-tenant.us.auth0.com`. Use the canonical domain, not a custom domain, because Auth0 only issues Management API tokens for the canonical one.
- **Client ID** – the client ID of your M2M application.
- **Client secret** – the client secret of your M2M application.

## Sync modes

<SyncModes />

The `users` and `logs` tables support incremental sync. All other tables use full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
