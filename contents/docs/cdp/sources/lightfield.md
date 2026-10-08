---
title: Linking Lightfield as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lightfield
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Lightfield connector syncs your CRM data – accounts, contacts, opportunities, meetings, tasks, notes, lists, members, and emails – into PostHog.

## Prerequisites

You need admin access to your Lightfield organization to create an API key. Keys are scoped per resource, so grant the read scope (for example `accounts:read`) for each table you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Lightfield, you'll need:

- **API key** – create one in your Lightfield settings. It starts with `sk_lf_`. Grant the read scope for every table you plan to sync: `accounts:read`, `contacts:read`, `opportunities:read`, `meetings:read`, `tasks:read`, `notes:read`, `lists:read`, `members:read`, and `emails:read`. Tables without their scope show a permission warning in the schema picker.

## Sync modes

<SyncModes />

Lightfield's API doesn't support filtering records by their last update time, so all tables sync with full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Emails sync without the message body, and subjects may be redacted when the connected mailbox only shares metadata.

## Troubleshooting

<TroubleshootingLink />
