---
title: Linking Ashby as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ashby
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Ashby connector syncs your applicant tracking system (ATS) data – candidates, applications, jobs, offers, interviews, and users – into PostHog, so you can analyze your recruiting funnel alongside your product data.

## Prerequisites

You need an Ashby account with admin access so you can create an API key. The key needs read permissions for the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Ashby, you'll need:

- **API key** – create one under **Admin → API Keys** in Ashby. Grant read permissions for the data you want to sync, for example `candidatesRead`, `applicationsRead`, `jobsRead`, `offersRead`, `interviewsRead`, and `usersRead`.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
