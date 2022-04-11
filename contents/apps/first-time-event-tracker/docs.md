---
title: How the First Time Event Tracker app works
showTitle: true
topics:
    - first-time
---

## How do I install the First Time Event Tracker app?

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'First Time Event Tracker' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

This app will only work on events ingested _after_ the plugin was enabled. 

## How does the First Time Event Tracker app work?

This app adds two new properties to events which you specify:

- `is_event_first_ever`
- `is_event_first_for_user`

## Does this app work retroactively?

No. This app will only work on events ingested _after_ the plugin was enabled. 

This means it will register events as being the first if there were events that occured before it was enabled. To mitigate this, you could consider renaming the relevant events and creating an action that matches both the old event name and the new one.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.