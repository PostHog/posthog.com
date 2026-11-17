---
title: Linking HighLevel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: HighLevel
---

The HighLevel connector syncs your CRM, sales, marketing, and payment data – contacts, opportunities, conversations, messages, forms, surveys, payments, and more – from a HighLevel sub-account into PostHog.

To link HighLevel:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to HighLevel.

3. You need a private integration token from HighLevel. In your HighLevel sub-account, go to **Settings** → **Private Integrations**. Create a new private integration and grant it the read scopes for the tables you want to sync. Copy the token (it starts with `pit-`).

4. You also need your Location ID. Find it under **Settings** → **Business Profile**, or in the sub-account URL after `/location/`.

5. Back in PostHog, paste the private integration token and Location ID in the respective fields and click **Next**.

6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using HighLevel data in PostHog.

## Available tables

| Table                | Description                               | Sync method  |
| -------------------- | ----------------------------------------- | ------------ |
| `contacts`           | People and businesses in the CRM          | Incremental  |
| `opportunities`      | Deals in the sales pipelines              | Full refresh |
| `pipelines`          | Sales pipelines and their stages          | Full refresh |
| `calendars`          | Booking calendars                         | Full refresh |
| `calendar_groups`    | Groups that organize calendars            | Full refresh |
| `conversations`      | Conversation threads across channels      | Full refresh |
| `messages`           | Messages for all channels except email    | Incremental  |
| `email_messages`     | Email messages in conversations           | Incremental  |
| `custom_fields`      | Custom fields defined in the sub-account  | Full refresh |
| `tags`               | Tags defined in the sub-account           | Full refresh |
| `forms`              | Forms built in the sub-account            | Full refresh |
| `form_submissions`   | Submissions of forms                      | Incremental  |
| `surveys`            | Surveys built in the sub-account          | Full refresh |
| `survey_submissions` | Submissions of surveys                    | Incremental  |
| `invoices`           | Invoices sent from the sub-account        | Full refresh |
| `transactions`       | Payment transactions                      | Full refresh |
| `orders`             | Orders from funnels, websites, and stores | Full refresh |
| `subscriptions`      | Recurring payment subscriptions           | Full refresh |
| `products`           | Products sold in the sub-account          | Full refresh |
| `workflows`          | Automation workflows                      | Full refresh |
| `campaigns`          | Campaigns                                 | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

The `contacts` table uses a 10-minute lookback window to account for HighLevel's indexing delay. The `messages` and `email_messages` tables track creation time only – delivery status changes after the initial sync aren't picked up by incremental syncs.

## Required scopes

The private integration token needs the following read scopes for the tables you want to sync:

- `calendars.readonly`
- `calendars/groups.readonly`
- `campaigns.readonly`
- `contacts.readonly`
- `conversations.readonly`
- `conversations/message.readonly`
- `forms.readonly`
- `invoices.readonly`
- `locations/customFields.readonly`
- `locations/tags.readonly`
- `opportunities.readonly`
- `payments/orders.readonly`
- `payments/subscriptions.readonly`
- `payments/transactions.readonly`
- `products.readonly`
- `surveys.readonly`
- `workflows.readonly`

You only need to enable the scopes for the tables you plan to sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
