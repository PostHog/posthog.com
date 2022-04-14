---
title: Google Cloud Pub/Sub Connector documentation
showTitle: true
topics:
    - pub-sub
---

## What does the Google Cloud Pub/Sub Connector do?

This app sends events from PostHog to a [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/) topic when they are ingested. It's [used by teams such as Vendasta](https://posthog.com/customers/vendasta). 

## What are the requirements for this app?

The Pub/Sub Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need a Google Cloud Pub/Sub account to connect to. 

## How do I install the Google Cloud Pub/Sub Connector?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Pub/Sub' and select the app, press Install.
3. Upload your Google Cloud key .json file. ([How to get the file.](https://cloud.google.com/pubsub/docs/reference/libraries))
4. Enter your Topic ID.
5. Watch events publish to Topic.

## Where is my Google Cloud key .json file?

You'll need this file to configure the Pub/Sub app for PostHog. You can find out where to find it in [Google's Pub/Sub client libraries documentation](https://cloud.google.com/pubsub/docs/reference/libraries).

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Google Cloud Pub/Sub Connector](https://github.com/vendasta/pubsub-plugin) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog community member [Jesse Redl](https://github.com/vendasta/pubsub-plugin/commits?author=jredl-va) from [Vendasta](https://posthog.com/customers/vendasta) for creating the Pub/Sub Connector. Thanks, Jesse! 

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.