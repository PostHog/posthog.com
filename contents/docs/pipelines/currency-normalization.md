---
title: Currency Normalizer
github: https://github.com/PostHog/currency-normalization-plugin
installUrl: https://app.posthog.com/project/apps?name=Currency%20Normalization
thumbnail: ../../pipelines/thumbnails/currency-normalization.png
tags:
    - currency-normalizer
---

### What does the Currency Normalizer app do?

This app normalizes currencies in events. E.g. amounts in EUR, USD and GBP will all be converted to EUR.

### What are the requirements for this app?

The Currency Normalizer requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Currency Normalizer app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Currency Normalization' and select the app, press Install.
3. Update the required settings (get the API key [here](https://openexchangerates.org/)) and enable the plugin.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Currency Normalizer](https://github.com/PostHog/currency-normalization-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), as well as community member [Leo Mehlig](https://github.com/leoMehlig) for creating the Currency Normalizer.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
