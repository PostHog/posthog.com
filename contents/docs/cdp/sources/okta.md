---
title: Linking Okta as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Okta
---

The Okta connector can link users, groups, applications, logs (audit events), group rules, and user types to PostHog.

To link Okta:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Okta.

3. Enter your **Okta domain** (e.g., `your-org.okta.com`).

4. Next, you need an API token from Okta. In the Okta Admin Console, go to **Security** > **API** > **Tokens** and click **Create token**. Give it a descriptive name and copy the token value.

   The token's user should have read access to the resources you want to sync. The following scopes are recommended:
   - `okta.users.read`
   - `okta.groups.read`
   - `okta.apps.read`
   - `okta.logs.read`

5. Back in PostHog, paste the token in the **API token** field and click **Next**.

6. Set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Okta data in PostHog.

## Schemas

The following schemas are available:

| Schema         | Sync mode                 | Description                                                                |
| -------------- | ------------------------- | -------------------------------------------------------------------------- |
| `users`        | Incremental               | Okta user accounts                                                         |
| `groups`       | Incremental               | Okta groups                                                                |
| `applications` | Incremental               | Okta applications and SSO integrations                                     |
| `logs`         | Incremental (append-only) | Okta System Log audit events. Only syncs the last 90 days on initial sync. |
| `group_rules`  | Full refresh              | Group membership rules                                                     |
| `user_types`   | Full refresh              | Custom user type definitions                                               |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
