---
title: How the RudderStack Export app works
showTitle: true
topics:
    - rudderstack
---

## What does the RudderStack Export app do?
The Rudderstack Export app enables you to send events from PostHog, to RudderStack. RudderStack will recognize PostHog as a data source, so you can use RudderStack's data pipeline features to send PostHog event data to other platforms. 

## How do I install the RudderStack Export app?

First, create a PostHog source in your RudderStack dashboard. Need help? Check [RudderStack's documentation](https://www.rudderstack.com/docs) for more information.

Once you've added PostHog as a source, make a note of the `write-key` field and your RudderStack server URL (also called the Data Planer URL).

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'Rudderstack' and select the app, press Install.
3. Follow the on-screen steps to configure the app, entering your `write-key` and server URL information.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.