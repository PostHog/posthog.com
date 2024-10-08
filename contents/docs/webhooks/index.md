---
title: Webhooks
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

[//]: # (Webhooks enable you to receive messages whenever any of your [actions]&#40;/docs/user-guides/actions&#41; trigger. You can receive messages in [Slack]&#40;/docs/webhooks/slack&#41;, [Teams]&#40;/docs/webhooks/microsoft-teams&#41;, [Discord]&#40;/docs/webhooks/discord&#41;, or your own custom webhook endpoint.)

[//]: # ()
[//]: # (> Our new [realtime destinations]&#40;/docs/cdp/destinations&#41; are currently in preview. These provide customizable destinations, more formatting options, a revamped UI, and the ability to send events *or* actions. Learn more about them in the [data pipeline docs]&#40;/docs/cdp/destinations&#41;.)

[//]: # ()
[//]: # (## Message formatting)

[//]: # ()
[//]: # (By default, the webhook message format is:)

[//]: # ()
[//]: # (```)

[//]: # ([action.name] was triggered by [person])

[//]: # (```)

[//]: # ()
[//]: # (The parts in square brackets `[]` are called _message tokens_. You can use tokens to customize your message based on the event that triggered the webhook. There are three types of tokens:)

[//]: # ()
[//]: # (### Event tokens)

[//]: # ()
[//]: # (- `[event]`: Type of the event &#40;a standard one, such as `$pageview`, or custom, such as `completed level`&#41;. This token is formatted as a link to the event that triggered the webhook in PostHog.)

[//]: # (- `[event.link]`: A plain link to the event that triggered the webhook in PostHog.)

[//]: # (- `[event.event]`: Same as `[event]` except not formatted as a link.)

[//]: # (- `[event.uuid]`: ID of the event. Always in UUID format.)

[//]: # (- `[event.distinct_id]`: Person distinct ID associated with the event.)

[//]: # (- `[event.properties.<property_name>]`: Value of property `<property_name>` – e.g., `[event.properties.$os]`, `[event.properties.amountUSD]`, or `[event.properties.object.nested_prop]`.)

[//]: # ()
[//]: # (### Person tokens)

[//]: # ()
[//]: # (- `[person]`: Display name of the person. Based on the Person Display Name preference in Project Settings. If none of the properties from the preference are available, the distinct ID is used. This token is formatted as a link to the person.)

[//]: # (- `[person.link]`: A plain link to the person in PostHog.)

[//]: # (- `[person.properties.<property_name>]`: Value of person `<property_name>` – e.g., `[person.properties.$browser]`, `[person.properties.subscriptionPlan]`, or `[person.properties.object.nested_prop]`.)

[//]: # ()
[//]: # (### Group tokens)

[//]: # ()
[//]: # (Group information can be accessed using the [group key]&#40;/docs/getting-started/group-analytics#how-to-create-groups&#41; tracked against the event.)

[//]: # ()
[//]: # (- `[groups.<group_key>]`: The name of the associated group or the key if there is no associated `name` property. This token is formatted as a link to the group in PostHog.)

[//]: # (- `[groups.<group_key>.properties.<property_name>]`: Value of group `<property_name>` – e.g., `[groups.organization.properties.total_revenue]`)

[//]: # ()
[//]: # (### Action tokens)

[//]: # ()
[//]: # (- `[action.name]`: The name of the triggered action. This token is formatted as a link to the action in PostHog.)

[//]: # (- `[action.link]`: A plain link to the action in PostHog.)
