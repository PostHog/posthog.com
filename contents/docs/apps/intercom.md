---
title: Intercom Connector
github: https://github.com/posthog/posthog-intercom-plugin
installUrl: https://app.posthog.com/project/apps?name=Intercom
thumbnail: ../../apps/thumbnails/intercom.png
topics:
    - intercom
---

### What does the Intercom Connector app do?

The Intercom Connectors sends specified event data from PostHog to Intercom whenever an event matches a user who has been identified by their email address.

### What are the requirements for this app?

Using this app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install this app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Intercom' and select the app, press 'Install'.
3. Follow the steps below to configure the app.

### How do I configure the Intercom Connector for PostHog?

After you've pressed 'Install', you need to add your Intercom API key at the configuration step, as well as add triggering events you want to send to Intercom.

-   Intercom API Key (required): you can get this one from the [Intercom Developer Hub](https://developers.intercom.com/building-apps/), by creating a new app and receiving an API Key
-   Triggering events (required): A comma-separated list of PostHog events you want to send to Intercom (e.g.: `$identify,mycustomevent` ).

Additionally, you can set the following optional parameters:

-   Emails domain to skip (optional): A comma-separated list of email domains to ignore and not send events for in Intercom (e.g. `posthog.com,dev.posthog.com`).
-   Send events to European data storage (optional, default: False): Send events to api.eu.intercom.com, if you are using Intercom's European Data Hosting.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Intercom Connector app](https://github.com/posthog/posthog-intercom-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Emanuele Capparelli](https://github.com/kappa90) for his work creating this app. Thank you, Emanuele!

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/posthog/posthog-intercom-plugin) to let us know!

### Where can I find out more?

Check the [Intercom Developer Hub](https://developers.intercom.com/building-apps/) for more information about connecting services to Intercom.

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
