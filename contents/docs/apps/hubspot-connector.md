---
title: Hubspot Connector
github: https://github.com/PostHog/hubspot-plugin
installUrl: https://app.posthog.com/project/apps?name=Hubspot
thumbnail: ../../apps/thumbnails/hubspot.svg
tags:
    - hubspot
---

### What is Hubspot?

Hubspot is a full-featured marketing and CRM platform which includes tools for everything from managing inbound leads to building landing pages. As one of the world’s most popular CRM platforms, Hubspot is an essential PostHog integration for many organizations — and is especially popular with marketing teams.

### What does the Hubspot Connector do?

The Hubspot Connector for PostHog sends data from PostHog to Hubspot whenever an `$identify` event occurs. That is, whenever PostHog successfully identifies a user. This is useful for syncing customer information between both PostHog and Hubspot.

### What are the requirements for this app?

The Hubspot Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need a Hubspot account to connect to.

### What information can I push to Hubspot from PostHog?

Currently, this integration supports sending the following data to Hubspot:

-   Email addresses
-   First names
-   Last names
-   Phone numbers
-   Company names
-   Company website URLs

This information can be sent whenever an `$identify` event occurs in PostHog.

No other information can currently be sent to PostHog using this app. If this app exists in a chain where the above information would be filtered out (for example, by using the Property Filter app) then filtered information cannot be sent to Hubspot.

### Configuration

<AppParameters />

### How do I install the Hubspot app on PostHog?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Hubspot'
4. Select the app, press 'Install' and follow the on-screen instructions

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Hubspot Connector](https://github.com/PostHog/hubspot-plugin) is available on GitHub.

### Who created this app?

A lot of people contributed to this app! We'd like to thank...

-   [Kunal](https://github.com/kpthatsme)
-   [Yakko Majuri](https://github.com/yakkomajuri)
-   [Marcus Hyett](https://github.com/marcushyett-ph)
-   [Marius Andra](https://github.com/mariusandra)
-   [Joe Martin](https://github.com/joethreepwood)
-   [Paul D'Ambra](https://github.com/pauldambra) and
-   [OneshotEngineering](https://github.com/oneshot-engineering)

For creating the Hubspot Connector for PostHog. Thanks, all!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
