---
title: Linking Unstructured as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Unstructured
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Unstructured connector syncs metadata from your [Unstructured](https://unstructured.io) platform account – workflows, job runs, per-job processing details and failed files, notifications, and source/destination connectors – into the PostHog data warehouse so you can monitor document pipeline health alongside the rest of your data.

Unstructured is a document ETL platform that turns raw files (PDFs, Office documents, emails, and more) into RAG-ready structured data.

## Prerequisites

- An [Unstructured platform](https://platform.unstructuredapp.io) account (a free tier is available).
- An Unstructured API key. The key has account-wide read access, so no extra scopes are required.

## Adding a data source

<SourceSetupIntro />

When linking Unstructured, you'll need:

- **API key** – sign in to the [Unstructured platform dashboard](https://platform.unstructuredapp.io), open **API Keys**, and generate a new key. Copy the key and paste it into the **API key** field in PostHog.

Leave **API host** blank unless Unstructured provisioned your account with a custom API URL, in which case enter that origin (for example `https://platform.unstructuredapp.io`).

## Sync modes

<SyncModes />

The `notifications` table supports incremental sync on `created_at`. Every other table syncs as a full refresh: workflows and connectors are mutable configuration objects, and jobs have no server-side time filter. These are low-volume inventory tables, so a full refresh each sync always reflects the current state.

The `job_details` and `job_failed_files` tables make one request for each job on every sync. `job_failed_files` skips jobs that report no failed files. `job_details` is off by default, so turn it on only when you need per-node processing counts.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid API key** – regenerate the key in the Unstructured platform dashboard and reconnect. The key is account-wide, so a valid key can read every table.
- **Custom API host** – if your account uses a custom API URL, make sure the **API host** field matches the origin Unstructured gave you. The scheme is forced to HTTPS.

<TroubleshootingLink />
