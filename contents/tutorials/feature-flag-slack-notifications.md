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

This tutorial walks through setting up a custom Hog function that listens for feature flag changes and posts rich Slack notifications – including release conditions, variant rollouts, payloads, and who made the change.

## Prerequisites

You need:

- A PostHog account with [Data Pipelines](/docs/cdp) enabled
- A Slack workspace where you can install apps
- A Slack channel to receive notifications

## Step 1: Create a new destination

Go to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations) and click **+ New destination**. Select **Slack** from the list of available destinations and click **Create**.

If you haven't connected your Slack workspace yet, follow the prompts to install the PostHog Slack app and authorize it. Make sure the PostHog app is added to the channel you want to post to.

## Step 2: Configure the event filter

Under **Match event and actions**, you need to configure the destination to listen for the internal `$activity_log_entry_created` event, filtered to only feature flag changes.

1. Select `$activity_log_entry_created` as the event.
2. Add a property filter: `scope` **equals** `FeatureFlag`.

This ensures the destination only fires when someone creates, updates, or deletes a feature flag – not for other activity log entries like dashboard or experiment changes.

## Step 3: Add the custom Hog Code

Click **Show source code** to open the Hog editor. Replace the default implementation with the following code:

```hog
let activity := event.properties.activity
let flagName := event.properties.detail.name
let flagId := event.properties.item_id
let userName := f'{event.properties.user.first_name} {event.properties.user.last_name}'
let userEmail := event.properties.user.email
let changes := event.properties.detail.changes
let timestamp := event.properties.created_at

let flagUrl := f'{project.url}/feature_flags/{flagId}'

let emoji := activity = 'created' ? '🚩' : activity = 'deleted' ? '🗑️' : '✏️'
let actionText := activity = 'created' ? 'created' : activity = 'deleted' ? 'deleted' : 'updated'

let blocks := [
    {
        'type': 'section',
        'text': {
            'type': 'mrkdwn',
            'text': f'{emoji} *{userName}* {actionText} feature flag <{flagUrl}|{flagName}>'
        }
    }
]
```

This sets up the header of the Slack message with the actor, the action, and a link to the flag.

### Adding release condition details

Next, add logic to display what changed when a flag is updated. This includes release conditions, variant rollouts, payloads, and status changes:

```hog
if (activity = 'updated' and notEmpty(changes)) {
    let detailLines := []

    for (let change in changes) {
        if (change.field = 'filters') {
            let groups := change.after.groups
            if (notEmpty(groups)) {
                let groupIndex := 0
                for (let g in groups) {
                    groupIndex := groupIndex + 1
                    let rollout := f'{g.rollout_percentage}%'
                    let conditionText := 'all users'

                    if (notEmpty(g.properties)) {
                        let parts := []
                        for (let prop in g.properties) {
                            if (prop.type = 'flag') {
                                parts := arrayPushBack(parts, f'flag `{prop.label}` = `{prop.value}`')
                            } else {
                                let valStr := typeof(prop.value) = 'array'
                                    ? arrayStringConcat(prop.value, ', ')
                                    : toString(prop.value)
                                parts := arrayPushBack(parts, f'`{prop.key}` {prop.operator} `{valStr}`')
                            }
                        }
                        conditionText := arrayStringConcat(parts, ' AND ')
                    }

                    let variantText := g.variant != null ? f' → variant `{g.variant}`' : ''
                    detailLines := arrayPushBack(
                        detailLines,
                        f'• *Set {groupIndex}:* {rollout} rollout — {conditionText}{variantText}'
                    )
                }
            }

            if (notEmpty(change.after.payloads)) {
                for (let key, val in change.after.payloads) {
                    detailLines := arrayPushBack(detailLines, f'• *Payload* `{key}`: `{val}`')
                }
            }

            // Multivariate variants with before/after comparison
            if (change.after.multivariate != null and notEmpty(change.after.multivariate.variants)) {
                let variantParts := []
                for (let v in change.after.multivariate.variants) {
                    let oldPct := ''
                    if (change.before.multivariate != null and notEmpty(change.before.multivariate.variants)) {
                        for (let ov in change.before.multivariate.variants) {
                            if (ov.key = v.key) {
                                if (ov.rollout_percentage != v.rollout_percentage) {
                                    oldPct := f' (was {ov.rollout_percentage}%)'
                                }
                            }
                        }
                    }
                    variantParts := arrayPushBack(variantParts, f'`{v.key}` {v.rollout_percentage}%{oldPct}')
                }
                let variantsSummary := arrayStringConcat(variantParts, ', ')
                detailLines := arrayPushBack(detailLines, f'• *Variants:* {variantsSummary}')
            }
        } else if (change.field = 'version') {
            detailLines := arrayPushBack(detailLines, f'• *Version:* {change.before} → {change.after}')
        } else if (change.field = 'name') {
            detailLines := arrayPushBack(detailLines, f'• *Renamed:* `{change.before}` → `{change.after}`')
        } else if (change.field = 'active') {
            let statusText := change.after ? 'enabled' : 'disabled'
            detailLines := arrayPushBack(detailLines, f'• *Status:* {statusText}')
        } else if (change.field != 'deleted') {
            detailLines := arrayPushBack(detailLines, f'• *{change.field}:* changed')
        }
    }

    if (notEmpty(detailLines)) {
        blocks := arrayPushBack(blocks, {'type': 'divider'})
        let nl := '\n'
        blocks := arrayPushBack(blocks, {
            'type': 'section',
            'text': {
                'type': 'mrkdwn',
                'text': arrayStringConcat(detailLines, nl)
            }
        })
    }
}
```

### Adding a link button and footer

Finally, add a button to view the flag in PostHog (for non-deleted flags) and a footer with the timestamp and user email:

```hog
if (activity != 'deleted') {
    blocks := arrayPushBack(blocks, {
        'type': 'actions',
        'elements': [
            {
                'type': 'button',
                'text': {'type': 'plain_text', 'text': '🔗 View Flag in PostHog'},
                'url': flagUrl
            }
        ]
    })
}

blocks := arrayPushBack(blocks, {
    'type': 'context',
    'elements': [{'type': 'mrkdwn', 'text': f'📅 {timestamp} • {userEmail}'}]
})

let res := fetch('https://slack.com/api/chat.postMessage', {
    'body': {
        'channel': inputs.channel,
        'icon_emoji': inputs.icon_emoji,
        'username': inputs.username,
        'blocks': blocks,
        'text': f'{userName} {actionText} feature flag: {flagName}'
    },
    'method': 'POST',
    'headers': {
        'Authorization': f'Bearer {inputs.slack_workspace.access_token}',
        'Content-Type': 'application/json'
    }
})

if (res.status != 200 or res.body.ok == false) {
    throw Error(f'Failed to post message to Slack: {res.status}: {res.body}')
}
```

The `text` field serves as a fallback for notifications and accessibility, while `blocks` provides the rich formatting.

## Step 4: Configure inputs

Make sure the following inputs are configured:

| Input | Description |
| --- | --- |
| **Slack workspace** | Your connected Slack workspace |
| **Channel** | The channel to post notifications to (the PostHog app must be a member) |
| **Emoji icon** | Optional. Defaults to `:hedgehog:` |
| **Bot name** | Optional. Defaults to `PostHog` |

## Step 5: Test and enable

Click **Test** to send a sample notification to your Slack channel. If the message appears correctly, click **Create & enable** to activate the destination.

## What the notifications look like

Once enabled, you'll see Slack messages like:

- **Flag created**: `🚩 Jane Doe created feature flag new-checkout-flow` with a link to view the flag.
- **Flag updated**: `✏️ Jane Doe updated feature flag new-checkout-flow` with details about the release conditions, variant changes, and a before/after comparison of rollout percentages.
- **Flag deleted**: `🗑️ Jane Doe deleted feature flag new-checkout-flow` with a timestamp and email.

## Alternative: Create via the API

You can also create this destination programmatically using the PostHog API. Send a `POST` request to `/api/environments/<your_project_id>/hog_functions/` with the full configuration as the request body. This is useful if you want to replicate the setup across multiple projects.

See the [API documentation](https://us.posthog.com/api/schema/swagger-ui/) for the full schema.

## Further reading

- [Activity Logs](/docs/settings/activity-logs)
- [Customizing destinations](/docs/cdp/destinations/customizing-destinations)
- [How to send survey responses to Slack](/tutorials/slack-surveys)

<NewsletterForm />
