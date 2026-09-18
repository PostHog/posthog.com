---
title: Linking Gladly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gladly
---

import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Gladly connector pulls your customer service data into the PostHog data warehouse: customers, conversation items, agents, and topics, plus conversations and the lifecycle events behind them.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gladly.
3. In Gladly, go to **Settings** > **API Tokens** and create an API token for an agent with the **API User** permission. Note the agent's email address and the generated token.
4. Back in PostHog, enter your **Organization**, the **Agent email**, and the **API token**. Your organization is the part of your Gladly URL before `.gladly.com` – for `myorg.gladly.com` enter `myorg`, and for `myorg.us-1.gladly.com` enter `myorg.us-1`.
5. Leave **Gladly domain** on **Production (gladly.com)** unless you are connecting a Gladly sandbox, which is served on `gladly.qa`. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gladly data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Gladly has no traditional REST API for bulk data, so these tables come from two different places, and each place has its own limits on how far back you can go.

### Export job tables

`customers`, `conversation_items`, `agents`, and `topics` come from Gladly's scheduled export jobs. Gladly produces JSONL files on an hourly or daily schedule, and PostHog processes them oldest first.

Each row carries `_job_id` and `_job_updated_at` columns injected from the export job that produced it. `_job_updated_at` is the incremental cursor.

Gladly retains export job files for **14 days**. The first sync imports everything within that window. To get history older than 14 days, ask Gladly support to regenerate the past exports.

### Report tables

`conversations`, `conversation_timestamps`, and `contact_timestamps` come from Gladly's reports instead, so the 14-day export window does not limit them. PostHog requests the reports one time window at a time, oldest window first.

- `conversations` holds one row per conversation and backfills two years of history.
- `conversation_timestamps` and `contact_timestamps` hold one row per lifecycle event and backfill 90 days. Both are high volume, so they are unselected by default.

A conversation report row restates in place as the conversation changes – when it closes, for example, or changes assignee. Each incremental sync of `conversations` therefore re-reads a trailing 30 days to pick up those changes. Rows older than that only refresh on a full refresh.

Gladly limits the reports endpoint to 10 requests per minute, so PostHog paces its requests to stay under that. A large backfill takes a while as a result.

Gladly also caps a single report at roughly 100,000 rows and truncates anything past it without saying so. PostHog sizes its report windows to stay clear of that cap, and logs a warning if a window gets close.

The report tables merge on their primary key and cannot run as append only, because PostHog re-reads a report window whenever a sync resumes.

## Troubleshooting

- **"Gladly denied access. Please check that the agent has the API User permission":** the token authenticated, but its agent cannot read the API. Give the agent the **API User** permission under **Settings** > **API Tokens** in Gladly.
- **"Gladly authentication failed":** the agent email or the API token is wrong. Check both, and confirm the token belongs to the agent whose email you entered.
- **"Gladly returned a report without the columns this table syncs on":** the report came back malformed, so there was no data to sync. Re-enable the sync to try again, and contact support if it keeps happening.

<TroubleshootingLink />
