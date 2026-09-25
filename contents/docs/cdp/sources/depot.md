---
title: Linking Depot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Depot
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Depot connector syncs the Depot CI job attempts of one GitHub repository into the PostHog Data warehouse, with one row per attempt. You can then query how long your CI jobs take, how often they fail, and how often they are retried.

## Prerequisites

You need a Depot organization that runs Depot CI for the repository, and an organization API token for it.

Each source syncs one repository. To sync another repository, add another Depot source.

## Adding a data source

<SourceSetupIntro />

When linking Depot, you'll need:

- **API token**: an organization API token. Create one in the **API Tokens** section of your Depot organization settings.
- **Repository**: the GitHub repository to sync, as `owner/name`, for example `PostHog/posthog`.

PostHog checks both values when you connect by listing the repository's Depot CI runs. If Depot rejects them, the connection fails and shows the reason.

## Sync modes

<SyncModes />

`job_attempts` supports incremental, append only, and full refresh syncs. Incremental and append only syncs use `run_created_at`, the time the run was created, as the cursor.

- The first sync imports runs created in the 7 days before it. Older runs are not imported.
- PostHog imports a run only after its status is `finished`, `failed`, or `cancelled`.
- Each sync stops at the oldest run that is still queued or running. Finished runs created after it wait for a later sync. A run that has been queued for more than 6 hours counts as stuck and does not hold the sync back.
- Incremental and append only syncs read each run once, after it ends. If you re-run a job after PostHog synced its run, the new attempt is not imported. A full refresh reads every run again, so it imports the attempt once the run ends.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Each `job_attempts` row also holds the job, workflow, and run the attempt belongs to, so you can group attempts by workflow or by run without a join. Jobs that never ran, such as skipped jobs and matrix expansion placeholders, have no rows.

## Troubleshooting

- If you see **Enter the repository as owner/name**, enter only the owner and the repository name separated by a slash, for example `PostHog/posthog`. Do not enter a URL.
- If you see a **401** error, or **Depot didn't accept this API token**, the token is wrong or no longer valid. Copy the whole token, or create a new organization API token, then reconnect.
- If you see a **403** error, or **This API token can't read Depot CI runs**, the token can't read Depot CI, for example because it is not an organization API token. Create an organization API token in your Depot organization settings, then reconnect.
- If you see **Couldn't list Depot CI runs**, Depot returned another error for the repository. Check the repository name and try again.
- If a recent run is missing, it is still running, or an older run is still queued or running. Its rows appear on the first sync after those runs end.

<TroubleshootingLink />
