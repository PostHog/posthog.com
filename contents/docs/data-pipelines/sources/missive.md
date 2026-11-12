---
title: Linking Missive as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Missive
---

The Missive connector automatically pulls your Missive shared inbox data – conversations, messages, comments, contacts, tasks, and more – into the PostHog data warehouse.

> **Note:** This source is currently in **beta**.

## Prerequisites

Missive API access requires a **Missive Productive plan**. Organizations on other plans cannot create API tokens.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Missive.
3. Create a personal API token in Missive. Go to **Preferences > API** and generate a new token.
4. Back in PostHog, paste the token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Missive data in PostHog.

## Available tables

| Table            | Description                                                                            | Sync method  |
| ---------------- | -------------------------------------------------------------------------------------- | ------------ |
| `conversations`  | Conversations in the All mailbox, grouping messages, comments, and posts of one thread | Incremental  |
| `messages`       | Messages in conversations such as emails, SMS, and chat messages (excludes drafts)     | Incremental  |
| `comments`       | Internal comments that team members add to conversations                               | Incremental  |
| `posts`          | Posts added by integrations and automations                                            | Incremental  |
| `tasks`          | Tasks and tasked conversations                                                         | Incremental  |
| `contacts`       | Contacts across all contact books                                                      | Incremental  |
| `contact_books`  | Contact books (private or shared)                                                      | Full refresh |
| `contact_groups` | Contact groups and organizations in every contact book                                 | Full refresh |
| `organizations`  | Missive organizations the token owner is a member of                                   | Full refresh |
| `users`          | Users in the organizations                                                             | Full refresh |
| `teams`          | Teams in the organizations                                                             | Full refresh |
| `shared_labels`  | Shared labels in the organizations                                                     | Full refresh |
| `responses`      | Canned responses (templates)                                                           | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync behavior

### Personal token scope

Missive API tokens are personal. PostHog syncs only the conversations, contacts, and other data that the token owner can see.

### Conversation merges

When you merge conversations in Missive, the `conversation_id` on related entries (messages, comments, posts) can become stale. The Missive API doesn't signal merges – the merged conversation stops appearing. To correct stale `conversation_id` values after merges, run a full resync of the affected tables.

### Fan-out tables

The `messages`, `comments`, `posts`, `contacts`, and `contact_groups` tables send one API request for each parent conversation or contact book. These tables can take longer to sync in large workspaces.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
