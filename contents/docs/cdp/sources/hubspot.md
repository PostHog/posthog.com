---
title: Linking Hubspot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Hubspot
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The HubSpot connector syncs your CRM data – contacts, companies, deals, tickets, quotes, emails, and meetings – into PostHog, so you can analyze your sales and marketing data alongside your product data.

## Prerequisites

You need a HubSpot account that you can authorize PostHog to access. The connection uses OAuth, so you don't need to manually create an API key – you'll sign in to HubSpot and grant access during setup.

## Adding a data source

<SourceSetupIntro />

When linking HubSpot, select an existing HubSpot account to link to PostHog or create a new connection:

- **Hubspot account** – Select the HubSpot account you want to link, then follow the prompts to authorize PostHog. This handles authentication via OAuth.

You can optionally enable **Customize synced properties** to control which properties are synced for each schema. See [Configuration](#configuration) below for details.

## Sync modes

<SyncModes />

HubSpot tables support both full refresh and incremental syncing. With incremental sync, the first sync performs a full import to establish a baseline, then subsequent syncs only fetch records modified since the last sync (using the `hs_lastmodifieddate` property, or `lastmodifieddate` for contacts). Incremental syncing is more efficient for large HubSpot portals, and interrupted syncs resume from where they left off.

## Configuration

<SourceParameters />

### Customize synced properties

By default, PostHog syncs a standard set of properties for each HubSpot schema. To control which properties are synced, enable the **Customize synced properties** toggle during setup.

When enabled, a text field appears for each schema (contacts, companies, deals, tickets, quotes, emails, meetings). Enter a comma-separated list of HubSpot property names to sync. Leave a field empty to use the defaults.

The default properties for each schema are:

- **contacts** - `createdate`, `email`, `firstname`, `hs_object_id`, `hs_lead_status`, `lastmodifieddate`, `lastname`, `hs_buying_role`
- **companies** - `createdate`, `domain`, `hs_lastmodifieddate`, `hs_object_id`, `hs_csm_sentiment`, `hs_lead_status`, `name`
- **deals** - `amount`, `closedate`, `createdate`, `dealname`, `dealstage`, `hs_lastmodifieddate`, `hs_object_id`, `pipeline`, `hs_mrr`
- **tickets** - `createdate`, `content`, `hs_lastmodifieddate`, `hs_object_id`, `hs_pipeline`, `hs_pipeline_stage`, `hs_ticket_category`, `hs_ticket_priority`, `subject`
- **quotes** - `hs_createdate`, `hs_expiration_date`, `hs_lastmodifieddate`, `hs_object_id`, `hs_public_url_key`, `hs_status`, `hs_title`
- **emails** - `hs_timestamp`, `hs_lastmodifieddate`, `hs_object_id`, `hs_email_direction`, `hs_email_html`, `hs_email_status`, `hs_email_subject`, `hs_email_text`, `hs_attachment_ids`, `hs_email_headers`
- **meetings** - `hs_timestamp`, `hs_lastmodifieddate`, `hs_object_id`, `hs_meeting_title`, `hs_meeting_body`, `hs_internal_meeting_notes`, `hs_meeting_external_URL`, `hs_meeting_location`, `hs_meeting_start_time`, `hs_meeting_end_time`, `hs_meeting_outcome`, `hs_activity_type`, `hs_attachment_ids`

<CalloutBox icon="IconWarning" title="Changing properties requires a full resync" type="caution">

Changing the synced properties after the initial import requires a full resync of your HubSpot data. Invalid properties are automatically filtered out. If all specified properties are invalid, the defaults are used instead.

</CalloutBox>

## Selecting columns

After the first sync completes, you can select which columns to include in future syncs:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) and click your HubSpot source.
2. Click **Configure** next to any schema.
3. Under **Columns**, select which columns to sync.

Primary keys and internal columns (`_ph_*`, `_dlt_*`) are always synced and cannot be disabled.

<CalloutBox icon="IconInfo" title="Adding columns to existing syncs" type="fyi">

When you add columns to a schema, PostHog prompts you to choose:

- **Sync forward only** - New columns are populated only for future data. Existing rows show `NULL` for the new columns.
- **Full resync** - Triggers a complete resync to backfill the new columns for all rows.

</CalloutBox>

> **Note:** This column selection feature is separate from **Customize synced properties**, which controls which HubSpot properties are fetched from the API during setup. Column selection lets you choose which already-synced columns appear in your warehouse tables after data has been imported.

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
