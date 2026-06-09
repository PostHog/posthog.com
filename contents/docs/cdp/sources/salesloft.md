---
title: Linking Salesloft as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SalesLoft
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Salesloft connector pulls your Salesloft sales engagement data – accounts, people, cadences, activities, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Salesloft.
3. Next, you need an API key from Salesloft. In your [Salesloft account](https://accounts.salesloft.com/oauth/applications), go to **Settings → Integrations → API** and create an API key. Copy the **API key** (a Bearer token).
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Salesloft data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `accounts` | Accounts in your Salesloft instance | Incremental |
| `account_stages` | Account stages | Incremental |
| `actions` | Actions | Incremental |
| `cadences` | Cadences | Incremental |
| `cadence_memberships` | Cadence memberships | Incremental |
| `call_data_records` | Call data records | Incremental |
| `calls` | Call activities | Incremental |
| `crm_activities` | CRM activities | Incremental |
| `emails` | Email activities | Incremental |
| `email_templates` | Email templates | Incremental |
| `notes` | Notes | Incremental |
| `people` | People | Incremental |
| `successes` | Successes | Incremental |
| `team_templates` | Team templates | Incremental |
| `account_tiers` | Account tiers | Full refresh |
| `call_dispositions` | Call dispositions | Full refresh |
| `call_sentiments` | Call sentiments | Full refresh |
| `crm_users` | CRM users | Full refresh |
| `custom_fields` | Custom fields | Full refresh |
| `email_template_attachments` | Email template attachments | Full refresh |
| `groups` | Groups | Full refresh |
| `imports` | Imports | Full refresh |
| `meetings` | Meetings | Full refresh |
| `person_stages` | Person stages | Full refresh |
| `phone_number_assignments` | Phone number assignments | Full refresh |
| `steps` | Cadence steps | Full refresh |
| `team_template_attachments` | Team template attachments | Full refresh |
| `users` | Users | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />
