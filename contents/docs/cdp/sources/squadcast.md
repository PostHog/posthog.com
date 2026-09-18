---
title: Linking Squadcast as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Squadcast
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Squadcast (SolarWinds Incident Response) connector syncs your incident response and on-call data into PostHog, so you can analyze incidents, postmortems, and reliability metrics like MTTA and MTTR alongside your product data.

## Prerequisites

You need a Squadcast account and a refresh token. The token inherits your user role, so connect with an account that can read the teams and resources you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Squadcast, you'll need:

- **Refresh token** – generate one from your Squadcast profile page (**Profile → Refresh Token**). PostHog exchanges it for a short-lived access token on each sync.
- **Region** – pick the region your Squadcast account lives in (US or EU).

## Sync modes

<SyncModes />

Incidents and postmortems support incremental sync windowed on their creation date. Changes to incidents created before the incremental cursor (for example a later status change) are only picked up by a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Team-scoped tables (incidents, services, escalation policies, schedules, runbooks, SLOs, and postmortems) are synced for every team your account can access, and each row includes a `team_id` column identifying the owning team. Teams your account can't read are skipped.

## Troubleshooting

- If your refresh token is invalid or expired, generate a new one from your Squadcast profile page, then reconnect.
- If some teams' data is missing, your user role may not have access to those teams. Reconnect with an account that can read them, or ask an admin to grant access.

<TroubleshootingLink />
