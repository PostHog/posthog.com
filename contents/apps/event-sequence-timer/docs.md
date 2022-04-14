---
title: How the Event Sequence Timer app works
showTitle: true
topics:
    - event-timer
---

## How do I install the Event Sequence Timer app?

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'Event Sequence Timer' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

## What does the Event Sequence Timer app do?

This app measures the time it takes for a user to perform one event (`EventB`), after an earlier event (`EventA`). 

## How does the Event Sequence Timer show elapsed time?

The Event Sequence Timer app measures time between two events (`EventA` and `EventB`) in milliseconds.

When a sequence is completed, the Event Sequence Timer adds a new property called `time_since_eventA` to `EventB`. You can then use this property in analysis with other PostHog apps. 

## How to configure the Event Sequence Timer app?

First, you must configure the tist of events to track time differences on. This list is specified as follows:

`(eventA,eventB),(eventC,eventD),(eventA,eventD)`

Where the first event in a tuple is the event that "starts the timer" and the second event being the one that "finishes it". In other words, the first event happens before the second.

You can further configure the app using the 'Update timestamp on every new first event?' setting. The default behaviour is 'Yes'. 

If you select 'Yes', the stored timestamp for the first event will always be updated when a new event with the same name comes in (for the same user). This means your second event will always contain the difference between its time and the last time the user triggered the first event.

If you select No, the stored timestamp will only be set once and never updated. This means you will get the difference between the time of the second event and the first time the user triggered the first event.

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Event Sequence Timer](https://github.com/PostHog/event-sequence-timer-plugin) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the Event Sequence Timer. Thanks Yakko! 

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.