---
title: Notification Bar
github: https://github.com/PostHog/notification-bar-app
installUrl: https://app.posthog.com/project/apps?name=Notification-bar
thumbnail: ../../apps/thumbnails/notification-bar.png
topics:
    - notification-bar
---

### What does the Notification Bar do?

The Notification Bar app is a site app which enables you to display a customised banner on your site to notify users about events such as product releases, sales, and events. 

Site apps are a new, big, and currently beta feature which enable you to inject code from PostHog into your website via `posthog-js`.

### What are the requirements for this app?

The Notification Bar requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.41.0](https://posthog.com/blog/the-posthog-array-1-41-0#one-more-thing-site-apps) or later.

Not running 1.41.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need to manually opt in to the site apps feature, as it's currently in beta.

### How do I install the Notification Bar?

First, you need to manually opt in to the site apps beta. You can do this by configuring your `posthog-js` initialization to include `opt_in_site_apps: true`. Please be aware you do this at your own risk.

Once you've opted in, simply visit the 'Apps' page in your PostHog instance, search for 'Notification Bar' and press install. You can then use the blue gear icon to configure the app. 

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Notification Bar](https://github.com/PostHog/notification-bar-app) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Marius Andra](https://github.com/mariusandra) for creating this app. Thanks, Marius!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.