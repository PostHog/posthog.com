---
title: Laudspeaker
github: 'https://github.com/PostHog/posthog-laudspeaker-app'
installUrl: 'https://app.posthog.com/project/apps?name=Laudspeaker'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/cdp/thumbnails/laudspeaker-connector.png
tags:
  - laudspeaker-connector
---

Send event data from PostHog to Laudspeaker, so it can be used to trigger immediate or time-delayed customer communications across multiple channels, including Slack and email. 

[Laudspeaker](https://laudspeaker.com/) is an open source customer messaging service and an alternative to tools such as Braze or [Customer.io](/apps/customer-io). 

## Requirements

This requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

It is recommended to start by importing PostHog users into Laudspeaker via the event integration on Laudspeaker. More information on this is available in [Laudspeaker's docs](https://laudspeaker.com/docs/).

After configuring PostHog within Laudspeaker, you can install the Laudspeaker Connector in PostHog by following these steps...

1. Log in to your PostHog instance
2.  Click "[Data pipeline](https://us.posthog.com/apps)" in the left sidebar
3. Search for 'Laudspeaker'
4. Select the destination, press 'Install'

To configure the destination, you must provide the destination with your API for `write-key`. This can be found in the 'Settings' section of Laudspeaker and should be copied into the Laudspeaker configuration in PostHog. 

Finally, you must provide (in PostHog) `[your_server's_url]/events/posthog` for `Lauspeaker URL` (or, if using a Laudspeaker hosted plan, `app.laudspeaker.com/events/posthog`). When this is entered, enable the destination in PostHog. 

Other fields (email, phone number, custom) are optional and can be specified if you want to be able to message people from PostHog through those channels with Laudspeaker

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/posthog-laudspeaker-app) is available on GitHub.

### Who maintains this destination?

This destination is maintained by the community. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
