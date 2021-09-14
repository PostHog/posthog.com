---
title: Message formatting
sidebar: Docs
showTitle: true
---

Message formatting works the same way whether you are using Slack, Microsoft Teams, or Discord.

Tokens are in the format `[type.property]`.

Message format can be customised when editing/creating an Action.

## Default
By default, the message format is
```
[action.name] was triggered by [user.name].
```

## Types
### Action
#### Allowed properties 

- `name`: name of triggered action with link.

### Event
#### Allowed properties

- `name`: name of the event which triggered the Action with link.

##### Accessing event properties

You can also access any property on the event that triggered the webhook by using `event.properties.your_desired_prop`.

This can be a property set by PostHog, such as `event.properties.ip`, and it can also use any custom properties you set, like `event.properties.username`. 

If a property does not exist on the event, the webhook message will say `undefined` for the property.

For example, the followijg message format:

```
[user.name] triggered [action.name] from [event.properties.country]
```

Would yield the a message like the one below, if the property `country` is not set on the event:

```
John Doe triggered Pageview from undefined
```

### User
#### Allowed properties

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
