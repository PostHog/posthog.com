---
title: Linking Mintlify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mintlify
---

import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

Sync your Mintlify documentation analytics into the PostHog data warehouse, including AI assistant conversations, user feedback, search queries, page views, and visitor metrics. Join docs engagement data with product analytics to understand how documentation drives adoption and activation.

## Prerequisites

- An **admin API key** from Mintlify (starts with `mint_`). Create one in **Settings → Organization → API keys**.
- Your **project ID**, available on the same API keys page.
- A Mintlify **Pro or Enterprise plan**. Analytics endpoints are only available on paid plans.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Mintlify.
3. In Mintlify, go to **Settings → Organization → API keys** and create an admin API key (starts with `mint_`). Copy the key and your project ID from the same page.
4. Back in PostHog, enter the admin API key and project ID, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

## Available tables

| Table                     | Description                                                                              | Sync method  |
| ------------------------- | ---------------------------------------------------------------------------------------- | ------------ |
| `assistant_conversations` | Individual user turns with assistant responses, referenced pages, and resolution status  | Incremental  |
| `feedback`                | User feedback from page ratings, code snippets, and agents, including review status      | Full refresh |
| `searches`                | Search terms with aggregate counts and click statistics                                  | Full refresh |
| `views`                   | Content view counts for each documentation path, split by human and AI traffic           | Full refresh |
| `visitors`                | Approximate distinct visitors for each documentation path, split by human and AI traffic | Full refresh |

**Incremental** tables sync only new or updated records on each run using the `timestamp` field as a cursor. **Full refresh** tables reload all data on each sync.

The `feedback` table uses full refresh because its status can change without a modification timestamp. The `searches`, `views`, and `visitors` tables use full refresh because they contain aggregates rather than individual events.

## Rate limiting

Mintlify's analytics endpoints share a limit of **100 requests per organization per hour**. The source uses maximum page sizes to minimize API calls. If you have a large documentation site with extensive analytics history, syncs may be throttled.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with an **authentication error**, check that you're using an admin API key (starts with `mint_`), not a regular API key, and that it hasn't been regenerated. Create a new admin API key in Mintlify settings and reconnect the source.

If Mintlify returns an **access denied error**, verify your account has a Pro or Enterprise plan. Analytics endpoints are not available on the free plan.

If you see a **project not found error**, verify the project ID matches exactly what's shown on the [Mintlify API keys page](https://app.mintlify.com/settings/organization/api-keys).

For more details on the Mintlify API, see the [official API documentation](https://www.mintlify.com/docs/api/introduction).

<TroubleshootingLink />
