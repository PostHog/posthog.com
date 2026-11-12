---
title: Linking SmartRecruiters as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SmartRecruiters
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The SmartRecruiters connector syncs your recruiting data – jobs, candidates, users, offers, reports, and configuration – into PostHog so you can analyze your hiring pipeline alongside your product data.

> **Note:** This source is currently in **beta**.

## Prerequisites

You need a SmartRecruiters account with administrator access. An administrator can create an API key in the [Credential Manager](https://www.smartrecruiters.com/settings/administration/app-management/custom-applications):

1. Select **New Credential**, then **API Key**.
2. Copy the key. It has full read access to your company's jobs, candidates, offers, users, and configuration.

Only keys created by users with the **Admin** system role can list offers.

## Adding a data source

<SourceSetupIntro />

When linking SmartRecruiters, you'll need:

- **API key** – the admin API key you created in the SmartRecruiters Credential Manager.

## Sync modes

<SyncModes />

The **jobs**, **candidates**, and **users** tables support incremental sync using the `updatedOn` field. All other tables use full refresh.

The **offers** table only supports full refresh because the SmartRecruiters API filters offers by creation time, not modification time. Status changes on existing offers are only captured with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
