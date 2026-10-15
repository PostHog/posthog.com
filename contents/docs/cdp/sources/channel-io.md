---
title: Linking Channel.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ChannelIO
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is in alpha. It hasn't been tested against a live Channel.io account yet, so you may run into unexpected issues. Please report any problems you find.

</CalloutBox>

The Channel.io connector syncs your [Channel.io](https://channel.io) (Channel Talk) conversations into the PostHog data warehouse. Import user chats, messages, managers, groups, chat tags, bots and campaigns so you can join support conversations with your product analytics.

## Prerequisites

You need permission to manage API keys in your Channel.io channel.

## Adding a data source

<SourceSetupIntro />

When linking Channel.io, you need:

- **Access key** – the access key of a Channel.io API credential
- **Access secret** – the access secret of the same credential

To get these:

1. Open the Channel desk.
2. Go to **Settings** > **API Key management**.
3. Click **Create new credential** and give it a name.
4. Copy the access key and access secret into PostHog. Channel.io shows the access secret only once.

## Sync modes

<SyncModes />

`user_chats` supports incremental sync on `deskUpdatedAt`, the time of the most recent desk activity in a chat.

`messages` supports incremental sync on `userChatDeskUpdatedAt`. Each incremental sync reads every message of the chats that had desk activity since the last sync.

`managers`, `groups`, `chat_tags`, `bots` and `campaigns` use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid credentials** – create a new credential under **Settings** > **API Key management**, then reconnect the source.
- **Slow syncs** – Channel.io limits API requests per channel, and the user chat list has a stricter limit on non-Enterprise plans. Large first syncs can take a while.
- **No users table** – the Channel.io API has no endpoint that lists all users, so there is no users table. Each user chat includes the `userId` of its user.

<TroubleshootingLink />
