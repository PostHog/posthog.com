---
title: How the Google Cloud Pub/Sub Connector works
showTitle: true
topics:
    - pub-sub
---

## What does the Google Cloud Pub/Sub app do?
This app sends events from PostHog to a [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/) topic when they are ingested.

## How do I install the Google Cloud Pub/Sub app?

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'Pub/Sub' and select the app, press Install.
3. Upload your Google Cloud key .json file. ([How to get the file.](https://cloud.google.com/pubsub/docs/reference/libraries))
4. Enter your Topic ID.
5. Watch events publish to Topic.

## Where is my Google Cloud key .json file?

You'll need this file to configure the Pub/Sub app for PostHog. You can find out where to find it in [Google's Pub/Sub client libraries documentation](https://cloud.google.com/pubsub/docs/reference/libraries).

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.