---
title: How the Timestamp Parser works
showTitle: true
topics:
    - timestamp-parser
---

## What does the Timestamp Parser app do?
This app parses events in PostHog into the following time-based categories: 

- Day of the week
- Day of the month
- Month
- Year
- Hour
- Minute

## What are the requirements for this app?

The Timestamp Parser requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

## How do I install the Timestamp Parser app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Timestamp Parser' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Timestamp Parser](https://github.com/PostHog/timestamp-parser-plugin) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) and  community member [Victor Campuzano](https://github.com/vicampuzano) for creating the Timestamp Parser. Thank you, both!

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.