---
title: Linking Genesys Cloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GenesysCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Genesys Cloud connector syncs your contact center data into the [PostHog Data Warehouse](/docs/data-warehouse), so you can analyze calls, conversations, agent activity, queue staffing, and quality evaluations alongside your product data.

## Prerequisites

You need an OAuth client that uses the **Client Credentials** grant type. Follow [Genesys Cloud's OAuth client instructions](https://help.mypurecloud.com/articles/create-an-oauth-client/):

1. In Genesys Cloud, go to **Admin > Integrations > OAuth**.
2. Click **Add client**.
3. Enter a name, then select **Client Credentials** as the grant type.
4. On the **Roles** tab, assign a role that has the permissions for the tables you want to sync.
5. Save the client, then copy the **Client ID** and **Client secret** to use in PostHog.

The role needs these permissions:

| Permission                                   | Tables                                       |
| -------------------------------------------- | -------------------------------------------- |
| `analytics:conversationDetail:view`          | `calls`, `conversations`, and `participants` |
| `analytics:userDetail:view`                  | `user_status_history`                        |
| `routing:queue:view`                         | `queues` and `queue_members`                 |
| `quality:evaluation:view`                    | `evaluations`                                |
| `routing:wrapupCode:view`                    | `wrapup_codes`                               |
| `routing:skill:view`                         | `skills`                                     |
| `groups:team:view`                           | `teams`                                      |
| `externalContacts:contact:view`              | `external_contacts`                          |
| `externalContacts:externalOrganization:view` | `external_organizations`                     |

If the role does not have a permission, turn off the tables that need it.

## Adding a data source

<SourceSetupIntro />

When linking Genesys Cloud, enter:

- **Region**: The region that hosts your Genesys Cloud organization, for example `mypurecloud.com` for Americas (US East) or `mypurecloud.ie` for EMEA (Dublin). The region must match the region of your OAuth client.
- **Client ID**: The client ID of your OAuth client.
- **Client secret**: The client secret of your OAuth client.

## Sync modes

- **Full refresh**: Available for every table. PostHog reloads the whole table on each sync.
- **Incremental**: Available for `calls`, `conversations`, and `participants`, which use `conversationStart`, and for `user_status_history`, which uses `startTime`. Each incremental sync reads again from two days before the last synced value, because a conversation can change after it starts.

The first sync and each full refresh of these four tables import the last 365 days of history. See [sync methods](/docs/data-pipelines/sources#sync-methods) for more guidance.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- `calls` contains only voice conversations. `conversations` contains all media types.
- `participants` has one row for each participant in a conversation.
- `users` includes inactive and deleted users, so historical conversations still join to a user.
- `queue_members` has one row for each member of each queue. The `queueId` column identifies the queue.
- `evaluations` contains quality evaluations from all evaluators, including deleted users.

## Troubleshooting

- **Client ID and secret rejected**: Check that the OAuth client uses the **Client Credentials** grant type and belongs to the selected region, then reconnect.
- **Access token rejected (401)**: Check the client ID, client secret, and region, then reconnect.
- **Permission denied (403)**: The role of the OAuth client does not have a permission that the table needs. Add the permission to the role, or turn off the table. See [Prerequisites](#prerequisites) for the permission each table needs.
- **Unknown region**: Select the region that hosts your Genesys Cloud organization, then reconnect.

<TroubleshootingLink />
