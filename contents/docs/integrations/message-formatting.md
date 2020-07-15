---
title: Message Formatting
sidebar: Docs
showTitle: true
---

Message formatting works the same way whether you are using Slack or Microsoft Teams.

Tokens are in the format `[type.prop]`.

Message format can be customised when editing/creating an Action.

# Default
By default, the message format is
```
[action.name] was triggered by [user.name].
```

# Types

## Action
- `name`: name of triggered action with link.

## Event
- `name`: name of the event which triggered the Action with link.

## User
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
- `initial_referrer`: user's previously visited HREF (`$direct` for direct visits).
