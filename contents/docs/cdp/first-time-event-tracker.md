---
title: First Time Event Tracker
github: https://github.com/PostHog/first-time-event-tracker
installUrl: https://app.posthog.com/project/apps?name=First%20Time%20Event%20Tracker
thumbnail: ../../cdp/thumbnails/first-time-event-tracker.png
tags:
    - first-time
---

> 🚧 **Note:** We are currently in the process of reworking our app server and have therefore **disabled new installs of the first time event tracker.** You can still analyze first time events using [HogQL](/docs/hogql).

For example, to get a list of users who completed the `$pageview` event for the first time today, [create an SQL insight](https://app.posthog.com/insights/new) and use the following SQL statement:

```sql
SELECT distinct_id
FROM events
WHERE event = '$pageview'
    AND (distinct_id, timestamp) IN (
        SELECT distinct_id, min(timestamp)
        FROM events
        WHERE event = '$pageview'
        GROUP BY distinct_id
    )
    AND toDate(timestamp) = today()
GROUP BY distinct_id
```

As another example, to get the first ever occurrence of the “user signed up” custom event, use the following SQL statement:

```sql
SELECT 
   distinct_id, 
   min(timestamp) as first_occurrence
FROM events
WHERE event = 'user_signed_up'
GROUP BY distinct_id
ORDER BY first_occurrence
LIMIT 1
```

Either of these can be customized to get different events or properties, such as replacing `distinct_id` with `properties.$current_url` or `count()`. See an example use case in our “[How to analyze first and last touch attribution](/tutorials/first-last-touch-attribution)” tutorial.

If there is functionality around first time event tracking you want but don’t see a way to do, let us know by asking a question in [our community](/questions).

## What does this app do?

This app adds two new properties to events which you specify:

-   `is_event_first_ever`
-   `is_event_first_for_user`

Using these events, you can track if each event is the first time that event has run _for a individual user_, the first time it has run _ever_, both of these, or neither.

> **Note:** For Pageview and Identify events, use the event names `$pageview` and `$identify` respectively.

## Requirements

The First Time Event Tracker requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'First Time Event Tracker' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

This app will only work on events ingested _after_ the app was enabled.

## Does this app work retroactively?

No. This app will only work on events ingested _after_ the app was enabled.

This means it will register events as being the first if there were events that occurred before it was enabled. To mitigate this, you could consider renaming the relevant events and creating an action that matches both the old event name and the new one.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the First Time Event Tracker](https://github.com/PostHog/first-time-event-tracker) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the First Time Event Tracker. Thanks Yakko!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 