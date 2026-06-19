---
title: Linking PandaDoc as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PandaDoc
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The PandaDoc connector syncs your PandaDoc data – documents, templates, forms, contacts, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to PandaDoc.
3. You need an API key from PandaDoc. Go to your [PandaDoc developer dashboard](https://app.pandadoc.com/a/#/settings/api-dashboard/configuration) and copy your API key. Use a production key — sandbox keys are heavily rate limited.
4. Back in PostHog, enter the key in the **API key** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using PandaDoc data in PostHog.

## Available tables

| Table              | Description                          | Sync method  |
| ------------------ | ------------------------------------ | ------------ |
| `documents`        | Documents in your PandaDoc workspace | Incremental  |
| `templates`        | Document templates                   | Full refresh |
| `forms`            | Forms                                | Full refresh |
| `contacts`         | Contacts                             | Full refresh |
| `members`          | Workspace members                    | Full refresh |
| `document_folders` | Document folders                     | Full refresh |
| `template_folders` | Template folders                     | Full refresh |

**Incremental** tables sync only new or updated records on each run. The `documents` table supports `date_modified` and `date_created` as incremental cursor fields. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />
