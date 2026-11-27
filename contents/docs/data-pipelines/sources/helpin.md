---
title: Linking Helpin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Helpin
---

The Helpin connector syncs your Helpin customer support and project management data – support conversations, CRM contacts, tasks, epics, teams, documents, and more – into the PostHog data warehouse.

## Prerequisites

You need a Helpin workspace with API access enabled. A workspace manager creates a service account under **Settings > MCP access > Service accounts**, then generates a token for it. The token starts with `hmp_` and is shown only once.

Grant the service account read scopes for the tables you want to sync:

- `helpin.support.read` – support conversations, messages, inboxes, and tags
- `helpin.crm.read` – contacts, companies, deals, and pipelines
- `helpin.pm.read` – tasks, epics, sprints, objectives, labels, and workflows
- `helpin.docs.read` – documents
- `helpin.context.read` – teams and members

The service account can be read-only. For self-hosted Helpin instances, you also need the API host URL. It must use HTTPS.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Helpin.
3. Enter your API token (starts with `hmp_`).
4. If you use a self-hosted Helpin instance, enter your API host. Leave this blank for Helpin Cloud.
5. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Helpin data in PostHog.

## Available tables

| Table                           | Description                                                                     | Sync method  |
| ------------------------------- | ------------------------------------------------------------------------------- | ------------ |
| `support_conversations`         | Support conversations in the Helpin inbox, from email, chat, and other channels | Full refresh |
| `support_conversation_messages` | Public messages in each support conversation, oldest first                      | Full refresh |
| `support_inboxes`               | Support inboxes and mailboxes with conversation counts                          | Full refresh |
| `support_tags`                  | Tags for support conversations                                                  | Full refresh |
| `crm_contacts`                  | CRM contacts with custom properties                                             | Full refresh |
| `crm_companies`                 | CRM companies with custom properties                                            | Incremental  |
| `crm_deals`                     | CRM deals with stage name and amount                                            | Full refresh |
| `crm_pipelines`                 | CRM deal pipelines with ordered stages                                          | Full refresh |
| `tasks`                         | Project tasks, including completed and archived tasks                           | Incremental  |
| `epics`                         | Epics with state, owner, dates, health, and progress counts                     | Full refresh |
| `sprints`                       | Sprints with dates, status, and progress counts                                 | Full refresh |
| `objectives`                    | Objectives with type, state, owners, linked epics, and progress                 | Full refresh |
| `labels`                        | Workspace and team labels for tasks, epics, and objectives                      | Full refresh |
| `workflows`                     | The workflow each team uses with ordered states                                 | Full refresh |
| `teams`                         | Teams in the workspace                                                          | Full refresh |
| `members`                       | Active workspace members with roles and teams                                   | Full refresh |
| `documents`                     | Docs documents with status, space, and collection                               | Full refresh |

**Incremental** tables (`tasks` and `crm_companies`) sync only new or updated records based on `updated_at`. These tables re-read at least one day of overlap to account for Helpin's date-based filtering. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
