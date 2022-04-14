---
title: How the Hubspot Connector app works
showTitle: true
topics:
    - hubspot
---

## What is Hubspot?

Hubspot is a full-featured marketing and CRM platform which includes tools for everything from managing inbound leads to building landing pages. As one of the world’s most popular CRM platforms, Hubspot is an essential PostHog integration for many organizations — and is especially popular with marketing teams.

## How do I install the Hubspot app on PostHog?

1. Log in to your PostHog instance
2. Click 'Plugins' on the left-hand tool bar
3. Search for 'Hubspot' 
4. Select the app, press 'Install' and follow the on-screen instructions

## How does Hubspot integrate with PostHog?

This PostHog plugin enables you to send user contact data to Hubspot whenever an $identify event occurs. That is, whenever PostHog detects the identity of a user, it can forward that identification information to Hubspot.

Currently, this integration supports sending the following data to Hubspot:

* Email addresses
* First names
* Last names
* Phone numbers
* Company names
* Company website URLs

No other information can currently be sent to PostHog using this plugin. If this plugin exists in a [plugin chain](../../../docs/plugins/build#example-of-a-plugin-chain) where the above information would is filtered out (for example, by using the Property Filter plugin) then filtered information cannot be sent to Hubspot.

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Hubspot Connector](https://github.com/PostHog/hubspot-plugin) is available on GitHub. 

## Who created this app?

A lot of people contributed to this app! We'd like to thank...

- [Kunal](https://github.com/kpthatsme)
- [Yakko Majuri](https://github.com/yakkomajuri)
- [Marcus Hyett](https://github.com/marcushyett-ph)
- [Marius Andra](https://github.com/mariusandra)
- [Joe Martin](https://github.com/joethreepwood)
- [Paul D'Ambra](https://github.com/pauldambra) and
- [OneshotEngineering](https://github.com/oneshot-engineering)

For creating the Hubspot Connector for PostHog. Thanks, all!

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.