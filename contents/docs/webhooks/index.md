---
title: Webhooks
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

Webhooks enable you to receive messages whenever any of your [actions](/docs/user-guides/actions) trigger. You can receive messages in [Slack](/docs/webhooks/slack), [Teams](/docs/webhooks/microsoft-teams), [Discord](/docs/webhooks/discord), or your own custom webhook endpoint.

## Message formatting

By default, the webhook message format is:

```
[action.name] was triggered by [person]
```

The parts in square brackets `[]` are called _message tokens_. You can use tokens to customize your message based on the event that triggered the webhook. There are three types of tokens:

### Event tokens

- `[event]`: Type of the event (a standard one, such as `$pageview`, or custom, such as `completed level`). This token is formatted as a link to the event that triggered the webhook in PostHog.
- `[event.link]`: A plain link to the event that triggered the webhook in PostHog.
- `[event.event]`: Same as `[event]` except not formatted as a link.
- `[event.uuid]`: ID of the event. Always in UUID format.
- `[event.distinct_id]`: Person distinct ID associated with the event.
- `[event.properties.property_name]`: Value of property `property_name` – e.g., `[event.properties.$os]`, `[event.properties.amountUSD]`, or `[event.properties.object.nested_prop]`.

### Person tokens

- `[person]`: Display name of the person. Based on the Person Display Name preference in Project Settings. If none of the properties from the preference are available, the distinct ID is used. This token is formatted as a link to the person.
- `[person.link]`: A plain link to the person in PostHog.
- `[person.properties.property_name]`: Value of person `property_name` – e.g., `[person.properties.$browser]`, `[person.properties.subscriptionPlan]`, or `[person.properties.object.nested_prop]`.

### Action tokens

- `[action.name]`: The name of the triggered action. This token is formatted as a link to the action in PostHog.
- `[action.link]`: A plain link to the action in PostHog.
