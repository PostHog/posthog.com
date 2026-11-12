---
title: Linking Circle as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Circleso
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Circle connector syncs your community data – members, spaces, posts, comments, events, courses, and payments – into PostHog, so you can analyze community engagement alongside your product data.

## Prerequisites

You need a Circle account on the **Business** plan or above. The Admin API is only available on Business and higher-tier plans.

You'll also need an Admin V2 API token. Create one by going to **Settings > Developers > Tokens** in Circle and selecting the **Admin V2** token type.

## Adding a data source

<SourceSetupIntro />

When linking Circle, you'll need:

- **Admin API token** – your Admin V2 API token created in Circle's developer settings.

## API quota

Every request counts toward your Circle plan's monthly Admin API quota (5,000 requests on the Business plan). Each request reads up to 100 records.

Some tables sync per parent record – `space_members` makes one request per space, `space_group_members` makes one request per space group, `event_attendees` makes one request per event, and `form_submissions` makes one request per form. Sync only the tables you need to conserve your quota.

## Sync modes

<SyncModes />

**Note:** All Circle tables sync using full refresh only. Circle's API does not support filtering by update time for most resources, and charge records can be modified by refunds without changing their creation timestamp, so incremental sync would miss these updates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
