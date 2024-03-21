---
title: Pineapple Mode
github: 'https://github.com/PostHog/pineapple-mode-app'
installUrl: 'https://app.posthog.com/project/apps?name=pineapple-mode'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/apps/thumbnails/pineapple-mode.png
tags:
  - pineapple-mode
---

Activating Pineapple Mode makes it rain pineapples all over your product or website. Yes, really.

## OK, but why does Pineapple Mode do that?

Pineapple Mode is an example site app. Site apps are a new, big and currently beta feature which enable you to inject code from PostHog into your website via `posthog-js`.

We think site apps are a potentially useful feature for things such as displaying forms, notifications or surveys in your product or website. They're also useful for making it rain pineapples!

## Requirements

Pineapple Mode requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.41.0](https://posthog.com/blog/the-posthog-array-1-41-0#one-more-thing-site-apps) or later.

Not running 1.41.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need to manually opt in to the site apps feature, as it's currently in beta.

## Installation

First, you need to manually opt in to the site apps beta. You can do this by configuring your `posthog-js` initialization to include `opt_in_site_apps: true`. Please be aware you do this at your own risk and, if you get hit on the head by a pineapple, it's not PostHog's fault.

Once you've opted in, simply visit the 'Apps' page in your PostHog instance, search for 'Pineapple Mode' and press install. You may then need to refresh your page. Here's what you should expect:

## FAQ

### Can I make my own site apps?

You certainly can. Check our tutorial about [how to build a site app in PostHog](/tutorials/build-site-app) to get started. 

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
