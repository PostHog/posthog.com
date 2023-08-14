---
title: Event Replicator
github: https://github.com/posthog/posthog-plugin-replicator
thumbnail: ../../cdp/thumbnails/replicator.png
tags:
    - replicator
---

import MigratingEvents from "../migrate/snippets/migrating-events.mdx"

> This app is currently unavailable while we develop [a new export system](https://github.com/PostHog/posthog/issues/15997). It will be back again soon!

The Replicator app copies events from one PostHog instance to another, at the moment they are ingested. No changes are made to the events by this app if it runs in isolation.

If this app is deployed in a chain then any changes made to the event data before the Replicator runs will also be copied to the new instance. Otherwise, no changes will be copied.

## Requirements

The Replicator app requires _two_ instances of PostHog running either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

Both versions of PostHog should ideally be running the same version.

## Using the Replicator app

<MigratingEvents/>

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Replicator'
4. Select the app, press 'Install' and follow the on-screen instructions
5. See events come into another PostHog instance, identically to the originals

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Replicator](https://github.com/posthog/posthog-plugin-replicator) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Michael Matloka](https://github.com/Twixes) for creating the Replicator app.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
