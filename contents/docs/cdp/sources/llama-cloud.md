---
title: Linking LlamaCloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LlamaCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The LlamaCloud connector syncs your document-processing data from [LlamaCloud](https://cloud.llamaindex.ai) (LlamaIndex's hosted platform) – parse, extract, classify, split, and spreadsheet jobs, batches, pipelines, projects, files, and usage metrics with credit consumption – into PostHog, so you can analyze your document pipelines and AI costs alongside your product data.

## Prerequisites

You need a LlamaCloud account and an API key. Create one in [LlamaCloud](https://cloud.llamaindex.ai) under **Settings > API Keys**. API keys are scoped to a project and to the region they were created in (North America or Europe).

## Adding a data source

<SourceSetupIntro />

When linking LlamaCloud, you'll need:

- **API key** – the key you created in LlamaCloud (starts with `llx-`).
- **Region** – the region your API key was created in. A key only works against its own region's API, so a key from the wrong region fails validation.

## Sync modes

<SyncModes />

The job tables (`parse_jobs`, `extract_jobs`, `classify_jobs`, `batches`, `split_jobs`, `sheets_jobs`) support incremental sync on `created_at`. Each incremental sync also re-reads a trailing 24-hour window, so status changes to recently created jobs are picked up. Status changes to jobs created earlier than that are only reflected on a full refresh.

The `usage_metrics` table supports incremental sync on `day`, and re-reads the boundary day each sync so its still-accumulating totals stay up to date.

The `projects`, `pipelines`, and `files` tables don't expose a timestamp filter in the LlamaCloud API, so they sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If validation fails with an invalid API key error, check the **Region** setting first: LlamaCloud keys are region-specific, so a key created in the EU region is rejected by the North America API and vice versa.

<TroubleshootingLink />
