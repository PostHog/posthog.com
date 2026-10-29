---
title: Linking Stytch as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Stytch
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Stytch connector syncs your authentication data into the PostHog Data warehouse, so you can analyze signup cohorts, authentication method adoption (MFA, OAuth, passkeys), and account security signals alongside your product data.

## Prerequisites

You need a Stytch project and its API credentials: a project ID and a secret. Consumer (B2C) projects sync the `users`, `sessions`, and `rbac_policy` tables; B2B projects also sync `organizations`, `members`, `sso_connections`, `organization_connected_apps`, and `member_connected_apps`.

Stytch's event logs are not available through its API, so they cannot be synced.

## Adding a data source

<SourceSetupIntro />

When linking Stytch, you'll need:

- **Project ID** – find it under [API keys](https://stytch.com/dashboard/api-keys) in your Stytch dashboard.
- **Secret** – from the same API keys page.

Stytch's live and test environments are separate: live credentials (`project-live-...`) sync your live data, while test credentials (`project-test-...`) sync your test environment's data.

## Sync modes

<SyncModes />

The `users` table supports incremental sync on `created_at`. Stytch exposes no updated-at filter, so incremental syncs only pick up newly created users; run a periodic full refresh to capture changes to existing users. All other tables are full refresh only.

Several tables are off by default because of their API cost or because they only apply to certain project types:

| Table                         | Reason                                 | When to enable                                                        |
| ----------------------------- | -------------------------------------- | --------------------------------------------------------------------- |
| `sessions`                    | One API request per user               | When you need active session data and the per-user cost is acceptable |
| `organizations`               | B2B-only                               | When your Stytch project is a B2B project                             |
| `members`                     | B2B-only                               | When your Stytch project is a B2B project                             |
| `rbac_policy`                 | Off by default                         | When you need to resolve role IDs on members or users                 |
| `sso_connections`             | B2B-only; one request per organization | When you need to analyze SSO connection setup across organizations    |
| `organization_connected_apps` | B2B-only; one request per organization | When you need organization-level connected app data                   |
| `member_connected_apps`       | B2B-only; one request per member       | When you need member-level connected app data with granted scopes     |

> **Note:** The `sso_connections` table filters out OIDC client secrets and SAML encryption private keys for security.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your Stytch project ID or secret is invalid. Create a new secret under API keys in your Stytch dashboard, then reconnect.
- If the `organizations`, `members`, `sso_connections`, `organization_connected_apps`, or `member_connected_apps` tables fail to sync, your project is likely a consumer (B2C) project – those tables are only available for Stytch B2B projects.

<TroubleshootingLink />
