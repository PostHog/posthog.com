---
title: Linking TestRail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Testrail
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The TestRail connector syncs your test management data — projects, test cases, runs, plans, and results — into the PostHog Data warehouse, so you can analyze QA activity and test outcomes alongside your product data.

## Prerequisites

You need a TestRail Cloud account (a `yourcompany.testrail.io` address; self-hosted TestRail Server instances on custom domains aren't supported yet), and the API must be enabled for your instance under **Administration → Site Settings → API**. Any user can create an API key; the connector reads whatever projects that user can see.

## Adding a data source

<SourceSetupIntro />

When linking TestRail, you'll need:

- **TestRail address** – the first part of your TestRail Cloud host. For `yourcompany.testrail.io`, enter `yourcompany`.
- **Email** – the email address of the TestRail account to connect with.
- **API key** – create one under **My Settings → API keys** in TestRail.

## Sync modes

<SyncModes />

The `cases` table supports incremental syncs on `updated_on`, and `runs`, `plans`, and `results` support incremental syncs on `created_on` — TestRail timestamps are UNIX epoch integers. Two caveats worth knowing:

- Runs and plans have no server-side "updated after" filter, so incremental syncs pick up **new** runs and plans but don't refresh completion state on rows synced earlier. Run a full refresh when you need completion fields (`is_completed`, `completed_on`, pass/fail counts) brought up to date.
- The `runs` table includes both standalone runs and runs inside test plans. On incremental syncs, plan runs are found through their plan's creation time, so a run added later to an old plan only appears on a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"The API is disabled for your installation"** – an administrator needs to enable the API under **Administration → Site Settings → API**.
- **Authentication errors** – your email or API key is invalid or has been revoked. Create a new key under **My Settings → API keys**, then reconnect.
- **Missing users** – listing all users requires a TestRail administrator account. For non-administrator accounts the connector lists users per project, which skips users that only have global access.
- **Rate limits** – TestRail Cloud throttles API traffic. The connector backs off and retries automatically, but very large instances may sync slowly.

<TroubleshootingLink />
