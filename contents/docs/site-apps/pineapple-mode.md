---
title: Pineapple Mode
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/apps/thumbnails/pineapple-mode.png
tags:
  - pineapple-mode
---

Activating pineapple mode makes it rain pineapples all over your product or website. Yes, really.

## OK, but why does Pineapple Mode do that?

Pineapple Mode is an example web script. Web scripts enable you to inject code from PostHog into your website via `posthog-js`.

Web scripts are useful for displaying forms, notifications, or surveys in your product or website. They're also useful for making it rain pineapples!

## Requirements

Pineapple Mode requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.41.0](https://posthog.com/blog/the-posthog-array-1-41-0#one-more-thing-site-apps) or later.

Not running 1.41.0? Find out [how to update your self-hosted PostHog deployment](/docs/runbook/upgrading-posthog)!

You'll also need to opt in to the Web scripts feature by setting `opt_in_site_apps: true` in your posthog-js configuration.

## Installation

First, configure your `posthog-js` initialization to include `opt_in_site_apps: true`. Please be aware that if you get hit on the head by a pineapple, it's not PostHog's fault.

Once you've opted in, visit the [**Web scripts**](https://app.posthog.com/web-scripts) page in PostHog, search for 'Pineapple Mode' and press install. You may then need to refresh your page. Here's what you should expect:

## FAQ

### Can I make my own web scripts?

You certainly can. Check our tutorial about [how to build a web script in PostHog](/tutorials/build-site-app) to get started. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for Pineapple Mode](https://github.com/PostHog/pineapple-mode-app) is available on GitHub.

### Who created this app?

You can blame PostHog team member [Marius Andra](https://github.com/mariusandra) for this one.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
