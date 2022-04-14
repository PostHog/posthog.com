---
title: How the Sendgrid Connector works
showTitle: true
topics:
    - sendgrid-connector
---

## What does the Sendgrid Connector app do?
The Sendgrid Connector sends event and emails data from PostHog into Sendgrid whenever a user is identified in PostHog.

## What are the requirements for this app?

The Sendgrid Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need Sendgrid access, obviously. 

## How do I install the Sendgrid Connector app?

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'Sendgrid' and select the app, press Install.
3. Add your Sendgrid API key at the configuration step.
4. Enable the app and watch your contacts list get populated in Sendgrid!

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Sendgrid Connector](https://github.com/PostHog/sendgrid-plugin) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), as well as and community member [Jose Fuentes Castillo](https://github.com/j-fuentesg) for creating the Sendgrid Connector. Thank you, all! 

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.