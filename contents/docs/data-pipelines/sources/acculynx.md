---
title: Linking AccuLynx as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Acculynx
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The [AccuLynx](https://acculynx.com) connector syncs your roofing CRM data into the PostHog data warehouse. You can then analyze your jobs, contacts, estimates, financials, supplements, and appointments with your product data.

## Prerequisites

You need an AccuLynx company or location administrator account to create an API key.

## Adding a data source

<SourceSetupIntro />

When you link AccuLynx, you provide:

- **API key** – create it in [AccuLynx API settings](https://my.acculynx.com/apikeys).
- **Appointment start date** (optional) – the first date for the `calendar_appointments` table, in `YYYY-MM-DD` format. The default is `2000-01-01`.
- **Appointment end date** (optional) – the last date for the `calendar_appointments` table, in `YYYY-MM-DD` format. The default is 90 days from today.

The `jobs` table includes leads.

Some tables make an extra request for each parent record. These tables are off by default. Turn on only the tables that you need:

- `job_representatives`, `job_contacts`, `job_custom_fields`, and `financial_amendments` make extra requests for each job.
- `supplement_items` makes extra requests for each supplement.
- `estimate_section_items` makes extra requests for each estimate.

The `calendar_appointments` table is also off by default. It contains only appointments in the date range that you set.

Use the `custom_field_definitions` table to get the label, record type, and options of each custom field in `job_custom_fields`.

## Sync modes

<SyncModes />

All AccuLynx tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get a `401` error, your AccuLynx API key is not valid or is deactivated. Create a new key, then reconnect.
- If you get a `403` error, your AccuLynx API key cannot access the table. Ask your AccuLynx administrator to check the permissions of the key.
- If you get an error that the job date window is too large, too many jobs have the same creation date for the AccuLynx offset limit. Contact support.

<TroubleshootingLink />
