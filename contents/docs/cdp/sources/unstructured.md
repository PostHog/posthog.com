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
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Unstructured connector syncs metadata from your [Unstructured](https://unstructured.io) platform account – workflows, job runs, and source/destination connectors – into the PostHog data warehouse so you can monitor document pipeline health alongside the rest of your data.

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

All Unstructured tables sync as full refresh only. The API doesn't expose a reliable server-side incremental filter, and workflows and connectors are mutable configuration objects whose fields (status, schedule, timestamps) change over time. A full refresh each sync is inexpensive for these low-volume inventory tables and always reflects the current state.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid API key** – regenerate the key in the Unstructured platform dashboard and reconnect. The key is account-wide, so a valid key can read every table.
- **Custom API host** – if your account uses a custom API URL, make sure the **API host** field matches the origin Unstructured gave you. The scheme is forced to HTTPS.

<TroubleshootingLink />
