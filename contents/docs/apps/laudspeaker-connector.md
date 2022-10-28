---
title: Laudspeaker Connector
github: https://github.com/PostHog/posthog-laudspeaker-app
installUrl: https://app.posthog.com/project/apps?name=Laudspeaker
thumbnail: ../../apps/thumbnails/laudspeaker-connector.png
topics:
    - laudspeaker-connector
---

### What does the Laudspeaker Connector app do?

The Laudspeaker Connector sends event data from PostHog to Laudspeaker, so it can be used to trigger immediate or time-delayed customer communications across multiple channels, including Slack and email. 

[Laudspeaker](https://laudspeaker.com/) is an open source customer messaging service and an alternative to tools such as Braze or [Customer.io](/apps/customer-io). 

### What are the requirements for this app?

The Laudspeaker Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Lauspeaker Connector?

It is recommended to start by importing PostHog users into Laudspeaker via the event integration on Laudspeaker. More information on this is available in [Laudspeaker's docs](https://laudspeaker.com/docs/).

After configuring PostHog within Laudspeaker, you can install the Laudspeaker Connector in PostHog by following these steps...

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Laudspeaker'
4. Select the app, press 'Install'

To configure the app, you must provide the app with your API for `write-key`. This can be found in the 'Settings' section of Laudspeaker and should be copied into the Laudspeaker Connector configuration in PostHog. 

Finally, you must provide (in PostHog) `[your_server's_url]/events/posthog` for `Lauspeaker URL` (or, if using a Laudspeaker hosted plan, `app.laudspeaker.com/events/posthog`). When this is entered, enable the app in PostHog. 

Other fields (email, phone number, custom) are optional and can be specified if you want to be able to message people from PostHog through those channels with Laudspeaker

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Laudspeaker Connector](https://github.com/PostHog/posthog-laudspeaker-app) is available on GitHub.

### Who maintains this app?

This app is maintained by Laudspeaker. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know - or [contact Laudspeaker directly](https://laudspeaker.com/).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. You can also share feedback with [Laudspeaker](https://laudspeaker.com/)

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
