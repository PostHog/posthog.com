---
title: Event Replicator
layout: app
github: https://github.com/posthog/posthog-plugin-replicator
installUrl: https://app.posthog.com/project/apps?name=Replicator
thumbnail: ../../apps/thumbnails/replicator.png
topics:
    - replicator
---

### What does the Replicator app do?

The Replicator app copies events from one PostHog instance to another, at the moment they are ingested. No changes are made to the events by this app if it runs in isolation.

If this app is deployed in a chain then any changes made to the event data before the Replicator runs will also be copied to the new instance. Otherwise, no changes will be copied.

### What are the requirements for this app?

The Replicator app requires _two_ instances of PostHog running either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

Both versions of PostHog should ideally be running the same version.

### How do I install the PostHog Replicator app?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Replicator'
4. Select the app, press 'Install' and follow the on-screen instructions
5. See events come into another PostHog instance, identically to the originals

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Replicator](https://github.com/posthog/posthog-plugin-replicator) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Michael Matloka](https://github.com/Twixes) for creating the Replicator app.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
