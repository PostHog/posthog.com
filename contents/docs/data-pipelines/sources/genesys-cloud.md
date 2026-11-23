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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Genesys Cloud connector syncs your contact center data – conversations, calls, participants, users, user status history, queues, queue members, quality evaluations, evaluation forms, presence definitions, flows, outbound campaigns, wrap-up codes, skills, divisions, teams, groups, external contacts, and external organizations – into PostHog, so you can analyze support and contact center activity alongside your product data.

> **Beta:** This source is in beta. If you have feedback, share it in the [PostHog community](/community).

## Prerequisites

You need a Genesys Cloud account with admin access to create an OAuth client. The OAuth client must use the **Client Credentials** grant type and be assigned a role with the permissions listed below.

## Adding a data source

<SourceSetupIntro />

When linking Genesys Cloud, you'll need:

- **Region** – the Genesys Cloud region where your organization is hosted. Find this in your Genesys Cloud URL (for example, `apps.mypurecloud.com` for US East, `apps.mypurecloud.ie` for Dublin).
- **Client ID** – the OAuth client ID from your Genesys Cloud integration.
- **Client secret** – the OAuth client secret from your Genesys Cloud integration.

### Creating an OAuth client in Genesys Cloud

1. In Genesys Cloud, go to **Admin > Integrations > OAuth**.
2. Click **Add Client**.
3. Give the client a name (for example, "PostHog Data Sync").
4. Under **Grant Types**, select **Client Credentials**.
5. Under **Roles**, assign a role with the permissions your selected tables need (see the table below).
6. Click **Save** and copy the **Client ID** and **Client Secret**.

### Required permissions

Each table requires a specific permission. Assign these to the role used by your OAuth client:

| Table                              | Required permission                          |
| ---------------------------------- | -------------------------------------------- |
| conversations, calls, participants | `analytics:conversationDetail:view`          |
| user_status_history                | `analytics:userDetail:view`                  |
| queues, queue_members              | `routing:queue:view`                         |
| wrapup_codes                       | `routing:wrapupCode:view`                    |
| skills                             | `routing:skill:view`                         |
| teams                              | `groups:team:view`                           |
| external_contacts                  | `externalContacts:contact:view`              |
| external_organizations             | `externalContacts:externalOrganization:view` |
| evaluations                        | `quality:evaluation:view`                    |
| evaluation_forms                   | `quality:evaluationForm:view`                |
| presence_definitions               | `presence:presenceDefinition:view`           |
| flows                              | `architect:flow:view`                        |
| outbound_campaigns                 | `outbound:campaign:view`                     |
| users, divisions, groups           | No specific permission required              |

## Sync modes

<SyncModes />

The following tables support incremental syncing:

- **conversations**, **calls**, **participants** – use `conversationStart` as the replication key
- **user_status_history** – uses `startTime` as the replication key

All other tables (users, queues, queue_members, wrapup_codes, skills, divisions, teams, groups, external_organizations, external_contacts, evaluations, evaluation_forms, flows, presence_definitions, outbound_campaigns) use full table refresh because the Genesys Cloud API doesn't support server-side time filtering for these endpoints.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Connection fails with "rejected the client ID and secret"** – Check that the OAuth client uses the **Client Credentials** grant type and belongs to the selected region. The client ID and secret are region-specific.
- **Sync fails with "403 Forbidden"** – The OAuth client's role is missing a permission required by one of the selected tables. Add the permission to the role, or deselect the table.
- **Sync fails with "Unknown Genesys Cloud region"** – Select the correct region for your Genesys Cloud organization, then reconnect.

<TroubleshootingLink />
