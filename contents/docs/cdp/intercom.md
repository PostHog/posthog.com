---
title: Intercom
github: 'https://github.com/posthog/posthog-intercom-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Intercom'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/intercom.png
tags:
  - intercom
---

Send event data from PostHog to Intercom whenever an event matches a user who has been identified by their email address.

## Requirements

Using this requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Intercom' and select the destination, press 'Install'.
3. Follow the steps below to configure the destination.

> **Important:** Only events that have an `email` property will be sent to Intercom. For more information on how to configure this, take a look at [this section](#setting-up-tracking).

## Configuration

After you've pressed 'Install', you need to add your Intercom API key at the configuration step, as well as add triggering events you want to send to Intercom.

-   **Intercom API Key (required)**: you can get this one from the [Intercom Developer Hub](https://developers.intercom.com/building-apps/), by creating a new app and receiving an API Key
-   **Triggering events (required)**: A comma-separated list of PostHog events you want to send to Intercom (e.g.: `$identify,mycustomevent` ).

## Additional configuration

<AppParameters />

### Setting up tracking

In order for your events to show up in Intercom, they need to have an `email` property so we know which user to connect them to.
The easiest way to do this is with [Super Properties](/docs/integrate/client/js#super-properties), which will add an `email` property on every event.

Add the following code wherever you make an `identify` call with the current user's email address.

```js
posthog.register({
    email: 'hello@posthog.com'
})
```

This will then send this as a property on all future events, including autocaptured events.

> **Note:** Make sure to call `posthog.unregister('email')` whenever a user logs out to clear this property

Currently, [Super Properties](/docs/integrate/client/js#super-properties) are only available in the `posthog-js` library or when using the PostHog snippet.
If you are using a different SDK, you'll need to manually the `email` property for every event that you want to send to Intercom.

## FAQ

### Who created this destination?

We'd like to thank PostHog team member [Emanuele Capparelli](https://github.com/kappa90) for his work creating this destination. Thank you, Emanuele!

### Who maintains this destination?

This destination is maintained by the community. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
