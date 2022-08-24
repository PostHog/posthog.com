---
title: First Time Event Tracker
github: https://github.com/PostHog/first-time-event-tracker
installUrl: https://app.posthog.com/project/apps?name=First%20Time%20Event%20Tracker
thumbnail: ../../apps/thumbnails/first-time-event-tracker.png
topics:
    - first-time
---

### What does the First Time Event Tracker do?

This app adds two new properties to events which you specify:

-   `is_event_first_ever`
-   `is_event_first_for_user`

Using these events, you can track if each event is the first time that event has run _for a individual user_, the first time it has run _ever_, both of these, or neither.

### What are the requirements for this app?

The First Time Event Tracker requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the First Time Event Tracker app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'First Time Event Tracker' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

This app will only work on events ingested _after_ the app was enabled.

### Does this app work retroactively?

No. This app will only work on events ingested _after_ the app was enabled.

This means it will register events as being the first if there were events that occurred before it was enabled. To mitigate this, you could consider renaming the relevant events and creating an action that matches both the old event name and the new one.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the First Time Event Tracker](https://github.com/PostHog/first-time-event-tracker) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the First Time Event Tracker. Thanks Yakko!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
