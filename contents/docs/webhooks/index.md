---
title: Webhooks
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

Webhooks enable you to receive messages whenever any of your [actions](/docs/user-guides/actions) are triggered. You can receive messages in [Slack](/docs/webhooks/slack), [Teams](/docs/webhooks/teams), [Discord](/docs/webhooks/discord), or your own custom webhook endpoint.

## Message formatting

Message tokens are in the format `[type.property]`.

By default, the message format is:
```
[action.name] was triggered by [user.name].
```

You can customize the message when creating or editing actions.

## Token types

### User

- `name`: user's username, email, or distinct ID depending on availability.
- `ip`: IP address used by user when the action was triggered.
- `os`: user's Operating System.
- `browser`: user's Web Browser.
- `browser_version`: version of user's Web Browser.
- `host`: URL of PostHog instance user connected via.
- `time`: timestamp of Event.
- `pathname`: HREF path Action was triggered on.
- `device_id`: ID of user's device.
- `screen_width`: width of user's screen.
- `screen_height`: height of user's screen.
- `initial_referrer`: domain user visited before Event (`$direct` for direct visits).

### Action

- `name`: name of triggered action with link.

### Event

- `name`: name of the event which triggered the Action with link.
- `properties`: See below.

##### Accessing event properties

You can access any property on the event that triggered the webhook by using `event.properties.your_desired_prop`.

This can be a property set by PostHog, such as `event.properties.ip`, or it can be any custom property you set. 

If a property does not exist on the event, the webhook message will say `undefined` for the property.

For example, the following message format:

```
[user.name] triggered [action.name] from [event.properties.country]
```

Would yield the a message like the one below, if the property `country` is not set on the event:

```
John Doe triggered pageview from undefined
```
