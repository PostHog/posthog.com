---
title: Linking SolarWinds Service Desk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SolarwindsServiceDesk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SolarWinds Service Desk connector syncs your service desk data – incidents, problems, changes, releases, solutions, assets, and related records – into PostHog.

## Prerequisites

You need a SolarWinds Service Desk account and a JSON web token generated for a user with read access to the records you want to sync. The token inherits that user's role, and requests stop working if that user is ever disabled. SolarWinds Service Desk runs independent regional stacks that do not share data, so you'll need to know which region your account is on.

## Adding a data source

<SourceSetupIntro />

When linking SolarWinds Service Desk, you'll need:

- **Region** – select the regional stack your account is on. SolarWinds Service Desk runs independent regional stacks that do not share data.
- **JSON web token** – generate one under **Setup → Users & Access → Users**: open the user and use **Actions → Generate JSON Web Token**. The token inherits that user's role, so it needs read access to the records you want to sync, and requests stop working if that user is ever disabled.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If requests stop working, confirm the user the token was generated for is still enabled and still has read access to the records you're syncing.
- If you see no data, confirm you selected the region your account is on, since regional stacks do not share data.

<TroubleshootingLink />
