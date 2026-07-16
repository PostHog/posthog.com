---
title: How to get Slack notifications when Feature Flags change
date: 2026-04-06
author:
  - dylan-martin
showTitle: true
sidebar: Docs
tags:
  - feature flags
  - cdp
---

When you're managing Feature Flags across a team, it's important to know when flags are created, updated, or deleted. PostHog's [Activity Logs](/docs/settings/activity-logs) track these changes, and you can use a custom [Data Pipelines](/docs/cdp/destinations) destination to forward them to Slack in real time.

This tutorial walks through setting up a custom Hog function via the API that listens for feature flag changes and posts rich Slack notifications – including release conditions, variant rollouts, payloads, and who made the change.

> **Note:** This destination triggers on the internal `$activity_log_entry_created` event, which isn't available in the UI event picker yet. You need to create it using the PostHog API.

## Prerequisites

You need:

- A PostHog account with [Data Pipelines](/docs/cdp) enabled
- A Slack workspace connected to PostHog (see [Slack destination docs](/docs/cdp/destinations/slack) for setup)
- A [personal API key](https://us.posthog.com/settings/user-api-keys) with write access
- Your PostHog project ID (found in [project settings](https://us.posthog.com/settings/project))

## How it works

The destination listens for the internal `$activity_log_entry_created` event, filtered to the `FeatureFlag` scope. When someone creates, updates, or deletes a feature flag, the Hog function runs and posts a formatted message to Slack using the [Block Kit](https://api.slack.com/block-kit) API.

The message includes:

- Who made the change and what action they took
- Release condition details (rollout percentages, targeting rules, variants)
- Before/after comparisons for variant rollout changes
- Payload values
- A direct link to the flag in PostHog

## Step 1: Prepare the API request body

The API request creates a Hog function with type `internal_destination`. You need to customize three values in the JSON below:

1. **`slack_workspace` value** – Your Slack integration ID. Find this in PostHog by going to **Data Pipelines** > **Destinations** > creating a new Slack destination > connecting your workspace. The integration ID appears in the URL or you can find it via the API at `/api/environments/<project_id>/integrations/`.
2. **`channel` value** – Your Slack channel ID (e.g., `C0NA9JPU2`). You can find this in Slack by right-clicking a channel > **View channel details** > the ID is at the bottom.
3. **`<project_id>`** in the API URL – Your PostHog project ID.

Save the following JSON to a file called `create_hog_function.json`:

```json
{
  "type": "internal_destination",
  "name": "Feature Flag Change Notifier → Slack",
  "description": "Posts a rich Slack message when a feature flag is created, updated, or deleted.",
  "enabled": true,
  "hog": "let activity := event.properties.activity\nlet flagName := event.properties.detail.name\nlet flagId := event.properties.item_id\nlet userName := f'{event.properties.user.first_name} {event.properties.user.last_name}'\nlet userEmail := event.properties.user.email\nlet changes := event.properties.detail.changes\nlet timestamp := event.properties.created_at\n\nlet flagUrl := f'{project.url}/feature_flags/{flagId}'\n\nlet emoji := activity = 'created' ? '🚩' : activity = 'deleted' ? '🗑️' : '✏️'\nlet actionText := activity = 'created' ? 'created' : activity = 'deleted' ? 'deleted' : 'updated'\n\nlet blocks := [\n    {\n        'type': 'section',\n        'text': {\n            'type': 'mrkdwn',\n            'text': f'{emoji} *{userName}* {actionText} feature flag <{flagUrl}|{flagName}>'\n        }\n    }\n]\n\nif (activity = 'updated' and notEmpty(changes)) {\n    let detailLines := []\n\n    for (let change in changes) {\n        if (change.field = 'filters') {\n            let groups := change.after.groups\n            if (notEmpty(groups)) {\n                let groupIndex := 0\n                for (let g in groups) {\n                    groupIndex := groupIndex + 1\n                    let rollout := f'{g.rollout_percentage}%'\n                    let conditionText := 'all users'\n\n                    if (notEmpty(g.properties)) {\n                        let parts := []\n                        for (let prop in g.properties) {\n                            if (prop.type = 'flag') {\n                                parts := arrayPushBack(parts, f'flag `{prop.label}` = `{prop.value}`')\n                            } else {\n                                let valStr := typeof(prop.value) = 'array' ? arrayStringConcat(prop.value, ', ') : toString(prop.value)\n                                parts := arrayPushBack(parts, f'`{prop.key}` {prop.operator} `{valStr}`')\n                            }\n                        }\n                        conditionText := arrayStringConcat(parts, ' AND ')\n                    }\n\n                    let variantText := g.variant != null ? f' → variant `{g.variant}`' : ''\n                    detailLines := arrayPushBack(detailLines, f'• *Set {groupIndex}:* {rollout} rollout — {conditionText}{variantText}')\n                }\n            }\n\n            if (notEmpty(change.after.payloads)) {\n                for (let key, val in change.after.payloads) {\n                    detailLines := arrayPushBack(detailLines, f'• *Payload* `{key}`: `{val}`')\n                }\n            }\n\n            if (change.after.multivariate != null and notEmpty(change.after.multivariate.variants)) {\n                let variantParts := []\n                for (let v in change.after.multivariate.variants) {\n                    let oldPct := ''\n                    if (change.before.multivariate != null and notEmpty(change.before.multivariate.variants)) {\n                        for (let ov in change.before.multivariate.variants) {\n                            if (ov.key = v.key) {\n                                if (ov.rollout_percentage != v.rollout_percentage) {\n                                    oldPct := f' (was {ov.rollout_percentage}%)'\n                                }\n                            }\n                        }\n                    }\n                    variantParts := arrayPushBack(variantParts, f'`{v.key}` {v.rollout_percentage}%{oldPct}')\n                }\n                let variantsSummary := arrayStringConcat(variantParts, ', ')\n                detailLines := arrayPushBack(detailLines, f'• *Variants:* {variantsSummary}')\n            }\n        } else if (change.field = 'version') {\n            detailLines := arrayPushBack(detailLines, f'• *Version:* {change.before} → {change.after}')\n        } else if (change.field = 'name') {\n            detailLines := arrayPushBack(detailLines, f'• *Renamed:* `{change.before}` → `{change.after}`')\n        } else if (change.field = 'active') {\n            let statusText := change.after ? 'enabled' : 'disabled'\n            detailLines := arrayPushBack(detailLines, f'• *Status:* {statusText}')\n        } else if (change.field != 'deleted') {\n            detailLines := arrayPushBack(detailLines, f'• *{change.field}:* changed')\n        }\n    }\n\n    if (notEmpty(detailLines)) {\n        blocks := arrayPushBack(blocks, {'type': 'divider'})\n        let nl := '\\n'\n        blocks := arrayPushBack(blocks, {\n            'type': 'section',\n            'text': {\n                'type': 'mrkdwn',\n                'text': arrayStringConcat(detailLines, nl)\n            }\n        })\n    }\n}\n\nif (activity != 'deleted') {\n    blocks := arrayPushBack(blocks, {\n        'type': 'actions',\n        'elements': [\n            {\n                'type': 'button',\n                'text': {'type': 'plain_text', 'text': '🔗 View Flag in PostHog'},\n                'url': flagUrl\n            }\n        ]\n    })\n}\n\nblocks := arrayPushBack(blocks, {\n    'type': 'context',\n    'elements': [{'type': 'mrkdwn', 'text': f'📅 {timestamp} • {userEmail}'}]\n})\n\nlet res := fetch('https://slack.com/api/chat.postMessage', {\n    'body': {\n        'channel': inputs.channel,\n        'icon_emoji': inputs.icon_emoji,\n        'username': inputs.username,\n        'blocks': blocks,\n        'text': f'{userName} {actionText} feature flag: {flagName}'\n    },\n    'method': 'POST',\n    'headers': {\n        'Authorization': f'Bearer {inputs.slack_workspace.access_token}',\n        'Content-Type': 'application/json'\n    }\n})\n\nif (res.status != 200 or res.body.ok == false) {\n    throw Error(f'Failed to post message to Slack: {res.status}: {res.body}')\n}",
  "inputs_schema": [
    {
      "type": "integration",
      "key": "slack_workspace",
      "label": "Slack workspace",
      "required": true,
      "secret": false,
      "hidden": false,
      "integration": "slack",
      "requiredScopes": "channels:read groups:read chat:write chat:write.customize"
    },
    {
      "type": "integration_field",
      "key": "channel",
      "label": "Channel to post to",
      "required": true,
      "secret": false,
      "hidden": false,
      "description": "Select the channel to post to (e.g. #general). The PostHog app must be installed in the workspace.",
      "integration_key": "slack_workspace",
      "integration_field": "slack_channel"
    },
    {
      "type": "string",
      "key": "icon_emoji",
      "label": "Emoji icon",
      "required": false,
      "default": ":hedgehog:",
      "secret": false,
      "hidden": false
    },
    {
      "type": "string",
      "key": "username",
      "label": "Bot name",
      "required": false,
      "default": "PostHog",
      "secret": false,
      "hidden": false
    }
  ],
  "inputs": {
    "slack_workspace": {
      "value": "<your_slack_integration_id>"
    },
    "channel": {
      "value": "<your_slack_channel_id>"
    },
    "icon_emoji": null,
    "username": null
  },
  "filters": {
    "source": "events",
    "events": [
      {
        "id": "$activity_log_entry_created",
        "type": "events"
      }
    ],
    "filter_test_accounts": false,
    "properties": [
      {
        "key": "scope",
        "value": ["FeatureFlag"],
        "operator": "exact",
        "type": "event"
      }
    ]
  },
  "icon_url": "/static/services/slack.png",
  "template_id": "template-slack"
}
```

## Step 2: Create the destination via the API

Run the following cURL command, replacing `<your_api_key>` and `<project_id>` with your values:

```bash
curl -X POST "https://us.posthog.com/api/environments/<project_id>/hog_functions/" \
  -H "Authorization: Bearer <your_api_key>" \
  -H "Content-Type: application/json" \
  -d @create_hog_function.json
```

> If you're on PostHog EU, use `eu.posthog.com` instead of `us.posthog.com`.

A successful response returns the created Hog function with an `id` field. The destination is immediately active.

## Step 3: Verify in PostHog

After creating the destination, go to [Data Pipelines > Destinations](https://us.posthog.com/pipeline/destinations) in PostHog. You should see **Feature Flag Change Notifier -> Slack** listed and enabled. You can click into it to test, view Logs, or adjust settings.

To trigger a test notification, create, update, or delete any feature flag in your project.

## Understanding the Hog Code

The Hog function in the JSON above does the following:

1. **Parses the activity log event** – Extracts the action type (`created`, `updated`, `deleted`), flag name, actor, and change details from `event.properties`.

2. **Builds the Slack message header** – Shows who did what with an emoji indicator and a link to the flag in PostHog.

3. **Adds change details for updates** – When a flag is updated, the function iterates through each change and formats it:
   - **Release conditions** – Rollout percentages, targeting rules, and variant assignments for each condition set
   - **Multivariate variants** – Current rollout percentages with before/after comparison when changed
   - **Payloads** – Key-value pairs attached to variants
   - **Status changes** – Whether the flag was enabled or disabled
   - **Renames** – Old and new flag names

4. **Adds a "View Flag" button** – A direct link to the flag in PostHog (omitted for deleted flags).

5. **Posts to Slack** – Sends the message using the Slack `chat.postMessage` API with Block Kit formatting.

## What the notifications look like

Once enabled, you'll see Slack messages like:

- **Flag created**: `🚩 Jane Doe created feature flag new-checkout-flow` with a link to view the flag
- **Flag updated**: `✏️ Jane Doe updated feature flag new-checkout-flow` with details about release conditions, variant changes, and before/after rollout percentages
- **Flag deleted**: `🗑️ Jane Doe deleted feature flag new-checkout-flow` with a timestamp and email

## Customizing the destination

After creating the destination via the API, you can edit it in the PostHog UI. Go to **Data Pipelines** > **Destinations**, click on the destination, and click **Show source code** to modify the Hog code directly.

Common customizations:

- **Filter to specific flags** – Add additional property filters in the `filters` section to only notify for certain flags
- **Change the message format** – Modify the Slack Block Kit blocks in the Hog code
- **Add more change details** – Extend the change parsing logic to surface additional fields

## Further reading

- [Activity Logs](/docs/settings/activity-logs)
- [Customizing destinations](/docs/cdp/destinations/customizing-destinations)
- [How to send survey responses to Slack](/tutorials/slack-surveys)

<NewsletterForm />
