---
title: Unduplicator documentation
showTitle: true
topics:
    - unduplicator
---

### What does the Unduplicator do?

This app prevents duplicate events from being ingested into PostHog. It's particularly helpful if you're backfilling information while you're already ingesting ongoing events. 

### How does the Unduplicator work?

The Unduplicator crafts an event UUID based on key properties for the event, so if the event is the same (see below for definition) it'll end with the same UUID.

When events are processed by ClickHouse, the database will automatically dedupe events which have the same `toDate(timestamp)`, `event`, `distinct_id` and `uuid` combo, effectively making sure duplicates are not stored.

The app has two modes, which define what's considered a duplicate event. Either mode will prevent duplicates within a project, though duplicates across projects are still permitted.

- **Event and Timestamp**. An event will be treated as duplicate if the timestamp, event name and user's distinct ID matches exactly, regardless of what internal properties are included.
- **All Properties**. An event will be treated as duplicate only if all properties match exactly, as well as the timestamp, event name and user's distinct ID.

### What are the requirements for this app?

The Unduplicator requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How do I install the Unduplicator app for PostHog?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Unduplicates' 
4. Select the Unduplicator app, press 'Install'.
5. Once the app is installed, press the blue button to configure the app and select which of the de-duplication methods you want to use (described above).

### Is the source code for this app available?

PostHog is open source and so are all apps on the platform. The [source code for the Unduplicator app](https://github.com/paolodamico/posthog-app-unduplicates) is available on GitHub. 

### Who created this app?

We'd like to thank former PostHog team member [Paolo D'Amico](https://github.com/paolodamico) for creating the Unduplicator. We miss you, Paolo!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our FAQ page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.